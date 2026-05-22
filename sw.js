// NutriTrack Service Worker — Phase 6f
//
// ── IMPORTANT: bump CACHE_VERSION on every deploy that changes any precached asset ──
const CACHE_VERSION = "nutritrack-v26";

// Full app shell — all assets needed for offline cold start.
// Paths are relative to the GitHub Pages subpath /NutriTrack/.
// NOTE: foods.json is intentionally excluded — it uses a network-first
// strategy (see fetch handler below) so updates are always picked up.
const PRECACHE_ASSETS = [
  "/NutriTrack/",
  "/NutriTrack/index.html",
  "/NutriTrack/NutriTrack.jsx",
  // JSZip from unpkg — precached so export works offline
  "https://unpkg.com/react@18/umd/react.production.min.js",
  "https://unpkg.com/react-dom@18/umd/react-dom.production.min.js",
  "https://unpkg.com/@babel/standalone/babel.min.js",
  "https://unpkg.com/lucide@0.344.0",
  // Icons
  "/NutriTrack/icons/icon-192.png",
  "/NutriTrack/icons/icon-512.png",
  "/NutriTrack/icons/apple-touch-icon.png",
];

// The Cloudflare Worker origin — never intercept these requests.
const WORKER_ORIGIN = "https://nutritrack-proxy.nickkropf.workers.dev";

// ── INSTALL: precache all app-shell assets ─────────────────────────────
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_VERSION).then(cache => cache.addAll(PRECACHE_ASSETS))
    // Do NOT call self.skipWaiting() here — we wait for the user's "Reload" tap.
  );
});

// ── ACTIVATE: delete old cache versions, claim clients ────────────────
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(k => k !== CACHE_VERSION)
          .map(k => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

// ── SKIP_WAITING: triggered by the in-app "Reload" button ─────────────
self.addEventListener("message", event => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

// ── FETCH: routing strategy ────────────────────────────────────────────
self.addEventListener("fetch", event => {
  const { request } = event;
  const url = new URL(request.url);

  // 1. Cloudflare Worker requests — network-only, never cache.
  if (request.url.startsWith(WORKER_ORIGIN)) {
    return; // fall through to browser default (network)
  }

  // 2. Non-GET requests — pass through.
  if (request.method !== "GET") {
    return;
  }

  // 3. foods.json — network-first, fall back to cache.
  //    Kept separate from the precache so updates are always fetched when online.
  //    The ?v=... query string from the JSX is honoured (no ignoreSearch).
  if (url.pathname === "/NutriTrack/foods.json") {
    event.respondWith(
      fetch(request)
        .then(response => {
          if (response.ok) {
            const clone = response.clone();
            caches.open(CACHE_VERSION).then(cache => cache.put(request, clone));
          }
          return response;
        })
        .catch(() => caches.match(request))
    );
    return;
  }

  // 4. App-shell assets (same-origin under /NutriTrack/ OR cross-origin CDN precache)
  //    Strategy: cache-first, fall back to network.
  const isPrecached = PRECACHE_ASSETS.some(asset => {
    // Match by full URL or by pathname (ignores query strings like ?v=...)
    if (asset.startsWith("http")) return request.url === asset;
    return url.pathname === asset || url.pathname.startsWith(asset);
  });

  if (isPrecached) {
    event.respondWith(
      caches.match(request, { ignoreSearch: true }).then(cached => {
        if (cached) return cached;
        return fetch(request).then(response => {
          if (response.ok) {
            const clone = response.clone();
            caches.open(CACHE_VERSION).then(cache => cache.put(request, clone));
          }
          return response;
        });
      })
    );
    return;
  }

  // 5. Everything else same-origin — network-first, fall back to cache.
  if (url.origin === self.location.origin) {
    event.respondWith(
      fetch(request)
        .then(response => {
          if (response.ok) {
            const clone = response.clone();
            caches.open(CACHE_VERSION).then(cache => cache.put(request, clone));
          }
          return response;
        })
        .catch(() => caches.match(request, { ignoreSearch: true }))
    );
  }
});
