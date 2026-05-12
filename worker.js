// nutritrack-proxy — Cloudflare Worker
// Stateless, read-only proxy for the Notion recipe database.
// Phase 5b. See NutriTrack_Phase5b_Handover.md for context.
//
// Endpoints:
//   GET  /health         — connectivity/config test
//   POST /recipes/list   — metadata for all recipes (id, title, servings, source)
//                          body (optional): { since: "ISO-8601 timestamp" }
//                          when "since" is provided, only returns recipes edited after that time
//   POST /recipes/page   — body: { page_id } -> ingredient lines for one recipe
//
// Auth: Origin allowlist + X-NutriTrack-Auth shared-secret header.
// Both checks are required for every endpoint except CORS preflight.

const NOTION_API     = "https://api.notion.com/v1";
const NOTION_VERSION = "2022-06-28";
const VERSION        = "0.2.0";

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "";
    try {
      // CORS preflight — handled before auth so browsers do not choke on it
      if (request.method === "OPTIONS") {
        return handleCors(origin, env);
      }

      // Origin gate
      if (!isOriginAllowed(origin, env)) {
        return jsonResponse({ error: "forbidden", reason: "origin" }, 403, origin, env);
      }

      // Shared-secret gate
      const auth = request.headers.get("X-NutriTrack-Auth") || "";
      if (!env.AUTH_SECRET || auth !== env.AUTH_SECRET) {
        return jsonResponse({ error: "forbidden", reason: "auth" }, 403, origin, env);
      }

      const path = new URL(request.url).pathname;

      if (request.method === "GET" && path === "/health") {
        return jsonResponse({ status: "ok", version: VERSION }, 200, origin, env);
      }

      if (request.method === "POST" && path === "/recipes/list") {
        let body = {};
        try { body = await request.json(); } catch { /* empty body is OK */ }
        const since = (body && typeof body.since === "string" && body.since) || null;
        const data  = await listRecipes(env, since);
        return jsonResponse(data, 200, origin, env);
      }

      if (request.method === "POST" && path === "/recipes/page") {
        let body = {};
        try { body = await request.json(); } catch { /* handled below */ }
        if (!body.page_id || typeof body.page_id !== "string") {
          return jsonResponse({ error: "missing_page_id" }, 400, origin, env);
        }
        const data = await fetchRecipePage(body.page_id, env);
        return jsonResponse(data, 200, origin, env);
      }

      return jsonResponse({ error: "not_found" }, 404, origin, env);
    } catch (err) {
      console.error("Worker error:", err && err.stack || err);
      const msg    = (err && err.message) ? err.message : String(err);
      const status = msg.startsWith("Notion ") ? 502 : 500;
      return jsonResponse(
        { error: status === 502 ? "notion_unreachable" : "internal", detail: msg.slice(0, 500) },
        status, origin, env
      );
    }
  }
};

// ── CORS / response helpers ─────────────────────────────────────────────

function isOriginAllowed(origin, env) {
  if (!origin) return false;
  const list = (env.ALLOWED_ORIGINS || "")
    .split(",").map(s => s.trim()).filter(Boolean);
  if (list.includes("*")) return true;
  return list.includes(origin);
}

function corsHeaders(origin) {
  return {
    "Access-Control-Allow-Origin":  origin,
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, X-NutriTrack-Auth",
    "Access-Control-Max-Age":       "86400",
    "Vary":                          "Origin",
  };
}

function handleCors(origin, env) {
  if (!isOriginAllowed(origin, env)) {
    return new Response(null, { status: 403 });
  }
  return new Response(null, { status: 204, headers: corsHeaders(origin) });
}

function jsonResponse(data, status, origin, env) {
  const headers = { "Content-Type": "application/json" };
  if (origin && isOriginAllowed(origin, env)) {
    Object.assign(headers, corsHeaders(origin));
  }
  return new Response(JSON.stringify(data), { status, headers });
}

// ── Notion fetch with retry ─────────────────────────────────────────────

async function notionFetch(path, env, options = {}) {
  const url  = `${NOTION_API}${path}`;
  const init = {
    method: options.method || "GET",
    headers: {
      "Authorization":  `Bearer ${env.NOTION_TOKEN}`,
      "Notion-Version": NOTION_VERSION,
      "Content-Type":   "application/json",
    },
  };
  if (options.body) init.body = JSON.stringify(options.body);

  let lastErr;
  for (let attempt = 0; attempt < 4; attempt++) {
    const res = await fetch(url, init);
    if (res.ok) return res.json();

    if (res.status === 429) {
      const retryAfter = parseInt(res.headers.get("Retry-After") || "1", 10);
      await sleep(Math.min(Math.max(retryAfter, 1), 10) * 1000);
      lastErr = new Error("Notion 429 (rate limited)");
      continue;
    }

    if (res.status >= 500 && res.status < 600) {
      const backoff = Math.min(2 ** attempt * 500, 4000);
      await sleep(backoff);
      lastErr = new Error(`Notion ${res.status}`);
      continue;
    }

    const text = await res.text().catch(() => "");
    throw new Error(`Notion ${res.status}: ${text.slice(0, 200)}`);
  }
  throw lastErr || new Error("Notion request failed after retries");
}

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

// ── Property extraction (robust to Notion property name variation) ──────

function extractTitle(properties) {
  for (const key of Object.keys(properties || {})) {
    const prop = properties[key];
    if (prop && prop.type === "title") {
      const text = (prop.title || []).map(rt => rt.plain_text || "").join("").trim();
      return text || "Untitled";
    }
  }
  return "Untitled";
}

function extractNumber(properties, names) {
  for (const name of names) {
    const prop = properties && properties[name];
    if (prop && prop.type === "number" && typeof prop.number === "number") {
      return prop.number;
    }
  }
  return null;
}

function extractUrl(properties, names) {
  for (const name of names) {
    const prop = properties && properties[name];
    if (prop && prop.type === "url" && prop.url) return prop.url;
  }
  return "";
}

function extractCellText(cell) {
  return (cell || []).map(rt => rt.plain_text || "").join("").trim();
}

// ── Endpoint: list all recipes (metadata only) ──────────────────────────

async function listRecipes(env, since) {
  if (!env.NOTION_DB_ID) throw new Error("NOTION_DB_ID env var not set");

  const recipes = [];
  let cursor    = undefined;
  const MAX_PAGES = 20;

  // Build base query body — add filter only if "since" is present.
  // Notion built-in timestamp filters use the "timestamp" + "last_edited_time" shape.
  const baseBody = { page_size: 100 };
  if (since) {
    baseBody.filter = {
      timestamp: "last_edited_time",
      last_edited_time: { after: since },
    };
  }

  for (let page = 0; page < MAX_PAGES; page++) {
    const body = { ...baseBody };
    if (cursor) body.start_cursor = cursor;

    const data = await notionFetch(
      `/databases/${env.NOTION_DB_ID}/query`,
      env,
      { method: "POST", body }
    );

    for (const r of (data.results || [])) {
      const props = r.properties || {};
      recipes.push({
        id:               r.id,
        title:            extractTitle(props),
        servings:         extractNumber(props, ["Servings", "servings"]),
        source:           extractUrl(props,    ["URL", "Source", "Link", "url"]),
        last_edited_time: r.last_edited_time || null,
      });
    }

    if (!data.has_more) break;
    cursor = data.next_cursor;
  }

  return {
    status:     "ok",
    fetched_at: new Date().toISOString(),
    since:      since || null,
    count:      recipes.length,
    recipes,
  };
}

// ── Endpoint: fetch ingredient lines for one recipe page ────────────────

async function fetchRecipePage(pageId, env) {
  const blocksData = await notionFetch(
    `/blocks/${pageId}/children?page_size=100`,
    env
  );
  const blocks     = blocksData.results || [];
  const tableBlock = blocks.find(b => b.type === "table");

  if (!tableBlock) {
    return {
      status:          "ok",
      page_id:         pageId,
      ingredientLines: [],
      warning:         "no_table_block",
    };
  }

  const rowsData = await notionFetch(
    `/blocks/${tableBlock.id}/children?page_size=100`,
    env
  );
  const rows = rowsData.results || [];

  const ingredientLines = rows
    .slice(1)
    .map(row => extractCellText(row.table_row && row.table_row.cells && row.table_row.cells[0]))
    .filter(Boolean);

  return {
    status:          "ok",
    page_id:         pageId,
    ingredientLines,
    ...(rowsData.has_more ? { warning: "table_truncated_at_100_rows" } : {}),
  };
}