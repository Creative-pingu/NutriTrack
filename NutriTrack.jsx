import { useState, useEffect, useCallback, useRef } from "react";

// FOOD_DB is loaded asynchronously from /NutriTrack/foods.json at app start.
// Use the foodDB state (and allFoods / allFoodsForRender derived values) inside
// the NutriTrack component. Do not reference FOOD_DB anywhere directly.

// Maps a foods.json v1 record (full names) to the internal abbreviation-keyed shape
// the JSX uses throughout. All downstream code is unchanged.
function mapFoodRecord(r) {
  return {
    id:       r.id,
    name:     r.name,
    cat:      r.category,
    source:   r.source  ?? "usda",
    fdc_id:   r.fdc_id  ?? null,
    cal:      r.calories,
    pro:      r.protein,
    carb:     r.carbohydrates,
    fat:      r.fat,
    fib:      r.fibre,
    fibSol:   r.fibre_soluble,
    fibInsol: r.fibre_insoluble,
    fatSat:   r.fat_saturated,
    fatMufa:  r.fat_mufa,
    fatPufa:  r.fat_pufa,
    aaHis:    r.histidine,
    aaIle:    r.isoleucine,
    aaLeu:    r.leucine,
    aaLys:    r.lysine,
    aaMet:    r.methionine,
    aaPhe:    r.phenylalanine,
    aaThr:    r.threonine,
    aaTrp:    r.tryptophan,
    aaVal:    r.valine,
    iron:     r.iron,
    calc:     r.calcium,
    zinc:     r.zinc,
    b12:      r.b12,
    vitD:     r.vitamin_d,
    omega3:   r.omega3,
    iod:      r.iodine,
    sel:      r.selenium,
    mag:      r.magnesium,
    pot:      r.potassium,
    fol:      r.folate,
    sod:      r.sodium,
    vitA:     r.vitamin_a,
    vitC:     r.vitamin_c,
  };
}

// Bump this string whenever you deploy a new foods.json to bust the ATHS cache.
const FOODS_DB_VERSION = "2";

async function loadFoodDB() {
  const resp = await fetch(`/NutriTrack/foods.json?v=${FOODS_DB_VERSION}`);
  if (!resp.ok) throw new Error(`foods.json fetch failed: ${resp.status}`);
  const envelope = await resp.json();
  if (!envelope.schema_version || envelope.schema_version !== 1) {
    throw new Error(`foods.json unexpected schema_version: ${envelope.schema_version}`);
  }
  return envelope.foods.map(mapFoodRecord);
}


// ── WORKER CONFIG ─────────────────────────────────────────────────────────
const WORKER_URL = "https://nutritrack-proxy.nickkropf.workers.dev";
const WORKER_FETCH_CONCURRENCY = 3;
const SUPP_DOSE_UNITS = ["mcg","mg","g","IU","tablet","capsule","ml","tsp","tbsp"];

const UNIT_TO_G = {g:1,gram:1,grams:1,kg:1000,ml:1,milliliter:1,millilitre:1,milliliters:1,millilitres:1,l:1000,liter:1,litre:1,liters:1,litres:1,tsp:5,teaspoon:5,teaspoons:5,tbsp:15,tablespoon:15,tablespoons:15,cup:240,cups:240,oz:28.35,ounce:28.35,ounces:28.35,lb:453.6,pound:453.6,pounds:453.6,whole:1,piece:1,pinch:1};
function toGrams(amount, unit) { const f = UNIT_TO_G[(unit||"g").toLowerCase()] ?? 1; return Math.round(amount * f * 10) / 10; }

const USE_REGEX_PARSER = true;

const TYPICAL_WEIGHT_G = {"onion":110,"onion small":70,"onion medium":110,"onion large":150,"garlic clove":3,"garlic":3,"shallot":30,"spring onion":15,"leek":150,"leek stick":150,"tomato":120,"tomato small":70,"tomato medium":120,"tomato large":180,"cherry tomato":17,"lemon":65,"lime":45,"orange":140,"apple":180,"pear":180,"banana":120,"avocado":150,"potato":170,"sweet potato":180,"carrot":60,"beetroot":150,"bell pepper":120,"capsicum":120,"cucumber":200,"bay leaf":0.5,"thyme sprig":1,"thyme":1,"rosemary sprig":2,"rosemary":2,"parsley sprig":2,"sage leaf":0.3,"chili":5,"chilli":5,"chili pepper":5,"chilli pepper":5};
const COUNT_NOUNS = new Set(["clove","cloves","slice","slices","sprig","sprigs","piece","pieces","head","heads","stalk","stalks","stick","sticks","bunch","bunches"]);
const SIZE_ADJECTIVES = new Set(["small","medium","large"]);
const LEADING_QUALIFIERS = /^(about|approximately|approx\.?|roughly|around|~)\s+/i;
const PREP_MODIFIERS = new Set(["minced","chopped","diced","sliced","crushed","grated","shredded","peeled","cubed","halved","quartered","julienned","mashed","ground","fresh","dried","frozen","raw","cooked","roasted","toasted","finely","coarsely","thinly","thickly","lightly","freshly","optional","divided","softened","melted","chilled","cold","warm","hot"]);
const FOOD_IDENTITY_MODIFIERS = new Set(["vinegar","juice","oil","paste","sauce","powder","extract","syrup","butter","cream","milk","flour","stock","broth","wine"]);

function isModifierMismatch(ingredientName, foodBaseName) {
  const ingTokens = ingredientName.toLowerCase().split(/\s+/).filter(Boolean);
  const foodTokens = foodBaseName.toLowerCase().split(/\s+/).filter(Boolean);
  if (!ingTokens.length) return false;
  const last = ingTokens[ingTokens.length - 1];
  if (!FOOD_IDENTITY_MODIFIERS.has(last)) return false;
  return !foodTokens.includes(last);
}

function fuzzyMatchFood(name, allFoods) {
  if (!name) return null;
  const n = name.toLowerCase().trim();
  let m = allFoods.find(f => f.name.toLowerCase() === n);
  if (m) return m;
  m = allFoods.find(f => f.name.toLowerCase().startsWith(n) && n.length > 3);
  if (m) return m;
  m = allFoods.find(f => {
    const base = f.name.toLowerCase().split(" (")[0];
    if (base.length <= 3 || !n.includes(base) || isModifierMismatch(n, base)) return false;
    return true;
  });
  if (m) return m;
  m = allFoods.find(f => f.name.toLowerCase().includes(n) && n.length > 3);
  if (m) return m;
  m = allFoods.find(f => {
    const SKIP = new Set(["dry","cooked","raw","ground","firm","plain","canned","rolled","per","100ml","abv"]);
    const words = f.name.toLowerCase().replace(/[()]/g,"").split(" ").filter(w => w.length > 3 && !SKIP.has(w));
    if (!words.length || !words.every(w => n.includes(w))) return false;
    const base = f.name.toLowerCase().split(" (")[0];
    return !isModifierMismatch(n, base);
  });
  return m || null;
}

function workerHeaders() { return { "Content-Type": "application/json" }; }
async function workerFetch(path, init) {
  let res;
  try { res = await fetch(`${WORKER_URL}${path}`, init); }
  catch (e) { throw new Error(`network: ${e.message || "fetch failed"}`); }
  let data = null;
  try { data = await res.json(); } catch {}
  if (!res.ok) { const r = (data && (data.reason || data.error || data.detail)) || `http_${res.status}`; throw new Error(`worker_${res.status}: ${r}`); }
  return data;
}
async function fetchHealth() { return workerFetch("/health", { method: "GET", headers: workerHeaders() }); }
async function fetchRecipesList(since) { const body = since ? { since } : {}; return workerFetch("/recipes/list", { method: "POST", headers: workerHeaders(), body: JSON.stringify(body) }); }
async function fetchRecipePage(pageId) { return workerFetch("/recipes/page", { method: "POST", headers: workerHeaders(), body: JSON.stringify({ page_id: pageId }) }); }
async function fetchRecipePagesWithProgress(recipes, onProgress) {
  const results = new Array(recipes.length); let cursor = 0, completed = 0;
  async function worker() { while (true) { const idx = cursor++; if (idx >= recipes.length) return; const r = recipes[idx]; try { const d = await fetchRecipePage(r.id); results[idx] = { ...r, ingredientLines: d.ingredientLines || [], warning: d.warning || null }; } catch (e) { results[idx] = { ...r, ingredientLines: [], error: e.message || "fetch failed" }; } completed++; if (onProgress) onProgress(completed); } }
  const pool = Array.from({ length: Math.min(WORKER_FETCH_CONCURRENCY, recipes.length) }, () => worker());
  await Promise.all(pool); return results;
}
async function parseIngredientsWithClaude(ingredientLines) {
  if (!ingredientLines || !ingredientLines.length) return [];
  const prompt = `Parse these ingredient strings into a JSON array. Return ONLY the JSON array.\nEach object: {"name":string,"amount":number,"unit":string}\nIngredients:\n${ingredientLines.map((l,i)=>`${i+1}. ${l}`).join("\n")}`;
  const res = await fetch("https://api.anthropic.com/v1/messages", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1000, messages: [{ role: "user", content: prompt }] }) });
  const data = await res.json(); const text = (data.content?.[0]?.text || "[]").replace(/```json|```/g,"").trim();
  try { return JSON.parse(text); } catch { return []; }
}
const UNICODE_FRACTIONS = {"\u00BC":0.25,"\u00BD":0.5,"\u00BE":0.75,"\u2153":1/3,"\u2154":2/3,"\u215B":0.125};
const KNOWN_UNITS = new Set(["g","gram","grams","kg","kilogram","kilograms","ml","milliliter","millilitre","milliliters","millilitres","l","liter","litre","liters","litres","tsp","teaspoon","teaspoons","tbsp","tablespoon","tablespoons","tbs","cup","cups","oz","ounce","ounces","lb","lbs","pound","pounds","pinch","pinches","dash","dashes"]);
function normaliseUnit(token) {
  const t = token.toLowerCase();
  if (t==="gram"||t==="grams") return "g"; if (t==="kilogram"||t==="kilograms") return "kg";
  if (t==="milliliter"||t==="millilitre"||t==="milliliters"||t==="millilitres") return "ml";
  if (t==="liter"||t==="litre"||t==="liters"||t==="litres") return "l";
  if (t==="teaspoon"||t==="teaspoons") return "tsp"; if (t==="tablespoon"||t==="tablespoons"||t==="tbs") return "tbsp";
  if (t==="cups") return "cup"; if (t==="ounce"||t==="ounces") return "oz"; if (t==="lbs"||t==="pound"||t==="pounds") return "lb";
  if (t==="pinches") return "pinch"; if (t==="dash"||t==="dashes") return "pinch"; return t;
}
function stripPrepModifiers(tokens) { let arr = tokens.slice(), changed = true; while (changed && arr.length) { changed = false; if (PREP_MODIFIERS.has(arr[arr.length-1].toLowerCase())) { arr = arr.slice(0,-1); changed = true; } if (arr.length && PREP_MODIFIERS.has(arr[0].toLowerCase())) { arr = arr.slice(1); changed = true; } } return arr; }
function singulariseName(name) { const n = name.trim(); if (n.length < 4) return n; if (n.endsWith("ss") || n.endsWith("us")) return n; if (n.endsWith("leaves")) return n.slice(0,-6)+"leaf"; if (n.endsWith("oes") && n.length > 4) return n.slice(0,-2); if (n.endsWith("ies") && n.length > 4) return n.slice(0,-3)+"y"; if (n.endsWith("s")) return n.slice(0,-1); return n; }
function parseQuantity(s) {
  let str = s.trim(); if (!str) return null;
  const fc = str[0]; if (UNICODE_FRACTIONS[fc] !== undefined) return { amount: UNICODE_FRACTIONS[fc], rest: str.slice(1).trim() };
  const ma = str.match(/^(\d+)\s+(\d+)\/(\d+)\b/); if (ma) { const w=parseInt(ma[1]),n=parseInt(ma[2]),d=parseInt(ma[3]); if(d!==0) return { amount: w+n/d, rest: str.slice(ma[0].length).trim() }; }
  const mu = str.match(/^(\d+)\s+([\u00BC-\u00BE\u2153-\u215E])/); if (mu) { const w=parseInt(mu[1]),f=UNICODE_FRACTIONS[mu[2]]; if(f!==undefined) return { amount: w+f, rest: str.slice(mu[0].length).trim() }; }
  const dr = str.match(/^(\d+(?:[.,]\d+)?)\s*[-\u2013\u2014]\s*\d+(?:[.,]\d+)?/); if (dr) return { amount: parseFloat(dr[1].replace(",",".")), rest: str.slice(dr[0].length).trim() };
  const wr = str.match(/^(\d+(?:[.,]\d+)?)\s+to\s+\d+(?:[.,]\d+)?/i); if (wr) return { amount: parseFloat(wr[1].replace(",",".")), rest: str.slice(wr[0].length).trim() };
  const fr = str.match(/^(\d+)\/(\d+)\b/); if (fr) { const n=parseInt(fr[1]),d=parseInt(fr[2]); if(d!==0) return { amount: n/d, rest: str.slice(fr[0].length).trim() }; }
  const nm = str.match(/^(\d+(?:[.,]\d+)?)/); if (nm) return { amount: parseFloat(nm[1].replace(",",".")), rest: str.slice(nm[0].length).trim() };
  return null;
}
function parseIngredientLine(rawLine) {
  if (!rawLine || typeof rawLine !== "string") return null;
  let line = rawLine.replace(/\s+/g," ").trim(); if (!line) return null;
  line = line.replace(LEADING_QUALIFIERS,"").replace(/^~\s*/,"");
  const lp = line.match(/^\(([^)]*)\)\s+/); if (lp) line = lp[1].trim()+" "+line.slice(lp[0].length).trim();
  let parentheticalOverride = null;
  const pm = line.match(/\s*\(([^)]*)\)\s*$/);
  if (pm) { const inner = pm[1].trim(), iq = parseQuantity(inner); if (iq && iq.rest) { const ut = iq.rest.split(/\s+/)[0].toLowerCase().replace(/[.,;:]+$/,""); const OU = new Set(["g","gram","grams","kg","ml","l","oz","ounce","ounces","lb","pound","pounds"]); if (OU.has(ut)) parentheticalOverride = { amount: iq.amount, unit: normaliseUnit(ut) }; } line = line.slice(0, pm.index).trim(); }
  const ac = line.match(/^(.+?[A-Za-z]),\s/); if (ac) line = ac[1].trim(); if (!line) return null;
  let amount, rest, pcu = "";
  const q = parseQuantity(line);
  if (q) { amount = q.amount; rest = q.rest; }
  else { const ft = line.split(/\s+/)[0].toLowerCase().replace(/[.,;:]+$/,""); if (KNOWN_UNITS.has(ft)) { amount = 1; pcu = normaliseUnit(ft); rest = line.slice(line.indexOf(line.split(/\s+/)[0])+line.split(/\s+/)[0].length).trim(); } else return null; }
  if (!rest) return null;
  const tokens = rest.split(/\s+/); if (!tokens.length) return null;
  let unit = pcu, nameTokens = tokens.slice();
  if (!unit) { const fl = tokens[0].toLowerCase(), fs = fl.replace(/[.,;:]+$/,""); if (KNOWN_UNITS.has(fs)) { unit = normaliseUnit(fs); nameTokens = tokens.slice(1); } }
  if (unit && nameTokens.length && nameTokens[0].toLowerCase() === "of") nameTokens = nameTokens.slice(1);
  if (!unit) {
    if (!nameTokens.length) return null;
    let size = ""; if (SIZE_ADJECTIVES.has(nameTokens[0].toLowerCase())) { size = nameTokens[0].toLowerCase(); nameTokens = nameTokens.slice(1); }
    if (!nameTokens.length) return null;
    nameTokens = stripPrepModifiers(nameTokens); if (!nameTokens.length) return null;
    let countNoun = "";
    if (nameTokens.length >= 2 && COUNT_NOUNS.has(nameTokens[nameTokens.length-1].toLowerCase())) { countNoun = nameTokens[nameTokens.length-1].toLowerCase(); nameTokens = nameTokens.slice(0,-1); }
    else if (nameTokens.length >= 2 && COUNT_NOUNS.has(nameTokens[0].toLowerCase())) { countNoun = nameTokens[0].toLowerCase(); nameTokens = nameTokens.slice(1); if (nameTokens.length && nameTokens[0].toLowerCase() === "of") nameTokens = nameTokens.slice(1); }
    if (!nameTokens.length) return null;
    const rawName = nameTokens.join(" ").toLowerCase().trim(), singular = singulariseName(rawName); if (!singular) return null;
    let weight;
    if (countNoun) { const lk = singulariseName(countNoun); weight = TYPICAL_WEIGHT_G[`${singular} ${lk}`] !== undefined ? TYPICAL_WEIGHT_G[`${singular} ${lk}`] : TYPICAL_WEIGHT_G[singular]; }
    else if (size) { weight = TYPICAL_WEIGHT_G[`${singular} ${size}`] !== undefined ? TYPICAL_WEIGHT_G[`${singular} ${size}`] : TYPICAL_WEIGHT_G[singular]; }
    else weight = TYPICAL_WEIGHT_G[singular];
    if (weight === undefined) weight = 100;
    if (parentheticalOverride) return { name: singular, amount: parentheticalOverride.amount, unit: parentheticalOverride.unit };
    return { name: singular, amount: Math.round(amount * weight * 10) / 10, unit: "g" };
  }
  nameTokens = stripPrepModifiers(nameTokens); const name = nameTokens.join(" ").toLowerCase().trim(); if (!name) return null;
  if (parentheticalOverride) return { name, amount: parentheticalOverride.amount, unit: parentheticalOverride.unit };
  return { name, amount, unit };
}
async function parseIngredientsLocal(ingredientLines) { if (!ingredientLines || !ingredientLines.length) return []; return ingredientLines.map(l => { const p = parseIngredientLine(l); return p || { name: (l||"").trim().toLowerCase(), amount: 0, unit: "" }; }); }
async function parseIngredients(ingredientLines) { return USE_REGEX_PARSER ? parseIngredientsLocal(ingredientLines) : parseIngredientsWithClaude(ingredientLines); }
async function parseRecipesFromPasteText(text) {
  const prompt = `Extract all recipes from the following text and return ONLY a JSON array.\nEach recipe: { "title": string, "servings": number, "source": string, "ingredientLines": string[] }\nText:\n${text.slice(0, 8000)}`;
  const res = await fetch("https://api.anthropic.com/v1/messages", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 2000, messages: [{ role: "user", content: prompt }] }) });
  const data = await res.json(); const out = (data.content?.[0]?.text || "[]").replace(/```json|```/g,"").trim();
  try { return JSON.parse(out); } catch { return []; }
}
// ── CONSTANTS ─────────────────────────────────────────────────────────────
// AA_EAR replaced by computeAAGoals(weightKg) — per-kg spreadsheet values
const AA_LABELS = { aaHis:"Histidine", aaIle:"Isoleucine", aaLeu:"Leucine", aaLys:"Lysine", aaMet:"Methionine", aaPhe:"Phenylalanine", aaThr:"Threonine", aaTrp:"Tryptophan", aaVal:"Valine" };
const AA_KEYS   = ["aaHis","aaIle","aaLeu","aaLys","aaMet","aaPhe","aaThr","aaTrp","aaVal"];

const NUTRIENT_META = {
  cal:    { label:"Calories",   unit:"kcal", color:"#F59E0B" },
  pro:    { label:"Protein",    unit:"g",    color:"#3B82F6" },
  carb:   { label:"Carbs",      unit:"g",    color:"#10B981" },
  fat:    { label:"Fat",        unit:"g",    color:"#EF4444" },
  fib:    { label:"Fibre",      unit:"g",    color:"#8B5CF6" },
  iron:   { label:"Iron",       unit:"mg",   color:"#DC2626" },
  calc:   { label:"Calcium",    unit:"mg",   color:"#94A3B8" },
  zinc:   { label:"Zinc",       unit:"mg",   color:"#64748B" },
  b12:    { label:"B12",        unit:"mcg",  color:"#E11D48" },
  vitD:   { label:"Vitamin D",  unit:"mcg",  color:"#FBBF24" },
  omega3: { label:"Omega-3",    unit:"g",    color:"#06B6D4" },
  iod:    { label:"Iodine",     unit:"mcg",  color:"#7C3AED" },
  sel:    { label:"Selenium",   unit:"mcg",  color:"#D97706" },
  mag:    { label:"Magnesium",  unit:"mg",   color:"#059669" },
  pot:    { label:"Potassium",  unit:"mg",   color:"#EA580C" },
  fol:    { label:"Folate",     unit:"mcg",  color:"#16A34A" },
  sod:    { label:"Sodium",     unit:"mg",   color:"#F97316" },
  vitA:   { label:"Vitamin A",  unit:"mcg",  color:"#EAB308" },
  vitC:   { label:"Vitamin C",  unit:"mg",   color:"#84CC16" },
};

const NUTRIENT_ALL_KEYS = ["cal","pro","carb","fat","fib","iron","calc","zinc","b12","vitD","omega3","iod","sel","mag","pot","fol","sod","vitA","vitC"];

// ── Goal computation (spreadsheet formulas, May 2026) ───────────────────
// Source: Nutrient_Tracking_Logic_v1.xlsx
// Protein base: 1g/kg. Dynamic exercise multiplier applied in effectiveGoals (1.0–2.0×).
// Fat: 25% TDEE / 9. Carbs: residual after protein + fat kcal.
// Vegan iron: RDA × 1.8 (non-heme absorption). Vegan zinc: RDA × 1.5 (phytate inhibition).
// Fibre: 14g per 1000 kcal TDEE.
function computeGoals(profile) {
  const wt  = parseFloat(profile?.weightKg) || 70;
  const ht  = parseFloat(profile?.heightCm)  || 170;
  const age = parseFloat(profile?.age)        || 30;
  const male = (profile?.sex || "Male") !== "Female";
  // Mifflin-St Jeor BMR
  const bmr  = (10 * wt) + (6.25 * ht) - (5 * age) + (male ? 5 : -161);
  // TDEE: BMR × 1.1 (TEF/NEAT); Active_Kcal added dynamically via effectiveGoals
  const tdee = Math.round(bmr * 1.1);
  const pro  = Math.round(wt * 1.0);                           // 1g/kg base
  const fat  = Math.round((tdee * 0.25) / 9);                  // 25% TDEE
  const carb = Math.round((tdee - (pro * 4) - (fat * 9)) / 4);// residual
  const fib  = Math.round((tdee / 1000) * 14);                 // 14g/1000kcal
  return {
    cal:  tdee,
    pro,
    carb: Math.max(carb, 50), // floor to avoid negative on high-fat profiles
    fat,
    fib,
    // Vegan-adjusted micros (spreadsheet values)
    iron:   male ? 14.4  : 32.4,   // 8mg/18mg × 1.8
    calc:   1000,
    zinc:   male ? 16.5  : 12.0,   // 11mg/8mg × 1.5
    b12:    2.4,
    vitD:   15,
    omega3: 1.6,
    iod:    150,
    sel:    55,
    mag:    male ? 420   : 320,
    pot:    male ? 3400  : 2600,
    fol:    400,
    sod:    2300,
    vitA:   male ? 900   : 700,
    vitC:   male ? 90    : 75,
  };
}

// Per-kg AA targets from spreadsheet (mg/kg → g for consistency with food DB)
// Met+Cys and Phe+Tyr are combined pools; mapped to aaMet and aaPhe keys respectively.
function computeAAGoals(weightKg) {
  const wt = parseFloat(weightKg) || 70;
  return {
    aaHis: (10  * wt) / 1000,
    aaIle: (20  * wt) / 1000,
    aaLeu: (40  * wt) / 1000,
    aaLys: (38  * wt) / 1000,
    aaMet: (15  * wt) / 1000,  // Met+Cys pool
    aaPhe: (25  * wt) / 1000,  // Phe+Tyr pool
    aaThr: (15  * wt) / 1000,
    aaTrp: (4.8 * wt) / 1000,
    aaVal: (26  * wt) / 1000,
  };
}

const DEFAULT_GOALS   = computeGoals({});
const DEFAULT_PROFILE = { name:"", weightKg:"", heightCm:"", age:"", sex:"" };
const DEFAULT_EX_RATIO = { carb:60, fat:20, pro:20 };
const DEFAULT_SUPPLEMENT_STACKS = [
  { id:"stack_am", name:"AM", items:[] },
  { id:"stack_pm", name:"PM", items:[] },
];

const EXERCISE_ACTIVITIES = [
  { id:"cycling_light",    label:"Cycling",  intensity:"Light",    met:5.8  },
  { id:"cycling_moderate", label:"Cycling",  intensity:"Moderate", met:8.0  },
  { id:"cycling_hard",     label:"Cycling",  intensity:"Hard",     met:10.0 },
  { id:"walking_easy",     label:"Walking",  intensity:"Easy",     met:2.8  },
  { id:"walking_brisk",    label:"Walking",  intensity:"Brisk",    met:3.8  },
  { id:"running_easy",     label:"Running",  intensity:"Easy",     met:8.0  },
  { id:"running_moderate", label:"Running",  intensity:"Moderate", met:10.0 },
  { id:"running_hard",     label:"Running",  intensity:"Hard",     met:12.0 },
];

const MACROS = ["cal","pro","carb","fat","fib"];
const MICROS = ["iron","calc","zinc","b12","vitD","omega3","iod","sel","mag","pot","fol","sod","vitA","vitC"];
const MEALS  = ["Breakfast","Lunch","Dinner","Snack"];

const FIB_SOL_COLOR   = "#8B5CF6";
const FIB_INSOL_COLOR = "#94A3B8";
const FAT_SAT_COLOR   = "#EF4444";
const FAT_MUFA_COLOR  = "#F97316";
const FAT_PUFA_COLOR  = "#06B6D4";

const dateKey = (d) => d.toISOString().slice(0,10);
const today   = () => dateKey(new Date());

const STORAGE_KEYS = {
  logs:             "nt-logs",
  goals:            "nt-goals",
  goalOverrides:    "nt-goal-overrides",
  customFoods:      "nt-custom",
  profile:          "nt-profile",
  exRatio:          "nt-exratio",
  recipes:          "nt-recipes",
  notionStatus:     "nt-notion-status",
  syncQueue:        "nt-sync-queue",
  supplementStacks: "nt-supplement-stacks",
  lastExportedAt:   "nt-last-exported-at",
  lastValidatedAt:  "nt-last-validated-at",
  displayMode:      "nt-display-mode",
};

// ── STORAGE HEALTH THRESHOLDS (Phase 6b) ──────────────────────────────────
// Named constants so band adjustment is a one-line change.
const STORAGE_WARN_PCT  = 70; // yellow above this
const STORAGE_CRIT_PCT  = 90; // red above this

// ── STORAGE ADAPTER (Phase 5.5 fix) ──────────────────────────────────────
// Previous implementation called window.storage.get / window.storage.set,
// which is the artifact-runtime proprietary API. That API does not exist on
// the GitHub Pages harness, so every read silently returned the fallback and
// every write silently no-op'd. Replaced with standard localStorage. The
// async signatures are preserved so no call sites need to change.
//
// Phase 6b: loadData now returns { value, parseError: true } when a key exists
// but contains invalid JSON, so the load useEffect can surface it to the
// validation banner rather than silently swallowing it.
const PARSE_ERROR = Symbol("PARSE_ERROR");
async function loadData(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return fallback;
    return JSON.parse(raw);
  } catch {
    console.warn("[NutriTrack] JSON parse failure on key:", key);
    return PARSE_ERROR;
  }
}
async function saveData(key, val) {
  try {
    localStorage.setItem(key, JSON.stringify(val));
  } catch (e) {
    console.error("saveData failed:", key, e);
  }
}

// ── STORAGE VALIDATION (Phase 6b) ─────────────────────────────────────────
// Shape-only; intentionally not deep. Returns array of failure strings (empty = ok).
function validateStorageShapes({ logs, recipes, customFoods, profile, exRatio, supplementStacks }) {
  const failures = [];
  if (logs == null || typeof logs !== "object" || Array.isArray(logs)) failures.push("logs: expected object");
  if (!Array.isArray(recipes)) failures.push("recipes: expected array");
  else recipes.forEach((r, i) => { if (!r || !r.id || !r.name || !Array.isArray(r.ingredients)) failures.push(`recipes[${i}]: missing id/name/ingredients`); });
  if (!Array.isArray(customFoods)) failures.push("customFoods: expected array");
  if (!profile || typeof profile !== "object" || Array.isArray(profile)) failures.push("profile: expected object");
  if (!exRatio || typeof exRatio !== "object") { failures.push("exRatio: expected object"); }
  else {
    const s = (Number(exRatio.carb)||0) + (Number(exRatio.fat)||0) + (Number(exRatio.pro)||0);
    if (Math.abs(s - 100) > 1) failures.push(`exRatio: values sum to ${s}, expected 100`);
  }
  if (supplementStacks != null && !Array.isArray(supplementStacks)) failures.push("supplementStacks: expected array");
  return failures;
}

// ── STORAGE ESTIMATE (Phase 6b) ───────────────────────────────────────────
// navigator.storage.estimate() reports usage=0 and wildly inflated quota on
// iOS Safari and is therefore not used. Instead we sum the byte lengths of
// all keys we own directly — accurate and synchronous.
function measureLocalStorageBytes() {
  try {
    let total = 0;
    const ownKeys = Object.values(STORAGE_KEYS);
    for (const key of ownKeys) {
      const val = localStorage.getItem(key);
      if (val !== null) total += key.length + val.length; // UTF-16 chars ≈ bytes for ASCII JSON
    }
    return total; // bytes
  } catch { return null; }
}

function calcRecipeNutritionPerServing(ingredients, servings, allFoods) {
  const t = {}; Object.keys(NUTRIENT_META).forEach(k => t[k] = 0);
  ingredients.forEach(ing => { const food = allFoods.find(f => f.id === ing.foodId); if (!food) return; const m = ing.amount_g / 100; Object.keys(NUTRIENT_META).forEach(k => { t[k] += (food[k] ?? 0) * m; }); });
  const s = Math.max(parseFloat(servings) || 1, 0.1); const ps = {}; Object.keys(t).forEach(k => ps[k] = t[k] / s); return ps;
}
function computeEntryNutrition(derivedIngredients, allFoods) {
  const t = {}; Object.keys(NUTRIENT_META).forEach(k => t[k] = 0);
  (derivedIngredients || []).forEach(ing => {
    const m = ing.amount_g / 100;
    if (ing.snapshot) { Object.keys(NUTRIENT_META).forEach(k => { t[k] += (ing.snapshot[k] ?? 0) * m; }); }
    else { const food = allFoods.find(f => f.id === ing.foodId); if (!food) return; Object.keys(NUTRIENT_META).forEach(k => { t[k] += (food[k] ?? 0) * m; }); }
  });
  return t;
}
// Phase 5.8 — nutrient-value snapshot helpers
const FOOD_SUBTYPE_KEYS = ["fibSol","fibInsol","fatSat","fatMufa","fatPufa","aaHis","aaIle","aaLeu","aaLys","aaMet","aaPhe","aaThr","aaTrp","aaVal"];
function buildFoodSnapshot(food) {
  const snap = {};
  [...Object.keys(NUTRIENT_META), ...FOOD_SUBTYPE_KEYS].forEach(k => { if (food[k] !== undefined) snap[k] = food[k]; });
  return snap;
}
function suppItemSummary(items) {
  if (!items || !items.length) return "No items";
  return items.slice(0,3).map(i => `${i.name} ${i.dose_amount}${i.dose_unit}`).join(", ") + (items.length > 3 ? ` +${items.length-3} more` : "");
}
// ── COMPONENTS ────────────────────────────────────────────────────────────
function Ring({ value, max, size=52, stroke=5, color, nullArc=0, simplified=false, children }) {
  const r = (size - stroke) / 2, circ = 2 * Math.PI * r, pct = Math.min(value / (max || 1), 1);
  // nullArc: fraction of the full circle representing estimated unknown contribution
  // Only rendered when: nullArc > 0, confirmed arc < 1 (not over goal), not simplified mode
  const showNull = !simplified && nullArc > 0 && pct < 1;
  const nullStart = pct;           // null arc starts right where confirmed arc ends
  const nullLen   = Math.min(nullArc, 1 - pct); // clamp so it doesn't overshoot
  return (
    <svg width={size} height={size} style={{ display:"block" }}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#1e293b" strokeWidth={stroke}/>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={stroke}
        strokeDasharray={circ} strokeDashoffset={circ*(1-pct)} strokeLinecap="round"
        transform={`rotate(-90 ${size/2} ${size/2})`} style={{ transition:"stroke-dashoffset 0.5s ease" }}/>
      {showNull && (
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#64748b" strokeWidth={stroke}
          strokeDasharray={`${circ*nullLen} ${circ*(1-nullLen)}`}
          strokeDashoffset={circ*(1-nullStart)}
          strokeLinecap="butt"
          transform={`rotate(-90 ${size/2} ${size/2})`}
          opacity={0.6}/>
      )}
      {children}
    </svg>
  );
}

function SwipeableEntry({ children, onDelete }) {
  const [offsetX, setOffsetX] = useState(0);
  const startX = useRef(null);
  const DEL = 60;
  const onTouchStart = e => { startX.current = e.touches[0].clientX; };
  const onTouchMove  = e => { if (startX.current === null) return; const dx = e.touches[0].clientX - startX.current; if (dx < 0) setOffsetX(Math.max(dx, -DEL-20)); };
  const onTouchEnd   = () => { setOffsetX(offsetX < -DEL ? -DEL : 0); startX.current = null; };
  return (
    <div style={{ position:"relative", overflow:"hidden" }}>
      <div style={{ position:"absolute", right:0, top:0, bottom:0, width:DEL, background:"#ef4444", display:"flex", alignItems:"center", justifyContent:"center", borderRadius:"0 8px 8px 0" }}
        onClick={() => { setOffsetX(0); onDelete(); }}>
        <span style={{ color:"#fff", fontSize:18, fontWeight:700 }}>🗑</span>
      </div>
      <div style={{ transform:`translateX(${offsetX}px)`, transition:startX.current?"none":"transform 0.2s ease", background:"#0a0f1a", position:"relative", zIndex:1 }}
        onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
        {children}
      </div>
    </div>
  );
}
// ── MAIN APP ──────────────────────────────────────────────────────────────
export default function NutriTrack() {
  // ── FOOD DB (async-loaded from /NutriTrack/foods.json) ────────────────
  const [foodDB,       setFoodDB]       = useState([]);          // loaded array
  const [foodDBStatus, setFoodDBStatus] = useState("loading");   // "loading" | "ready" | "error"

  const [view,             setView]             = useState("log");
  const [logs,             setLogs]             = useState({});
  const [goals,            setGoals]            = useState(DEFAULT_GOALS);
  const [goalOverrides,    setGoalOverrides]    = useState({});
  const [customFoods,      setCustomFoods]      = useState([]);
  const [profile,          setProfile]          = useState(DEFAULT_PROFILE);
  const [exRatio,          setExRatio]          = useState(DEFAULT_EX_RATIO);
  const [recipes,          setRecipes]          = useState([]);
  const [supplementStacks, setSupplementStacks] = useState(DEFAULT_SUPPLEMENT_STACKS);
  const [currentDate,      setCurrentDate]      = useState(today());
  const [loaded,           setLoaded]           = useState(false);

  // Export
  const [lastExportedAt, setLastExportedAt] = useState(null);
  const [exportConfirm,  setExportConfirm]  = useState(null); // null or { csvRows, jsonEntries, dateRange }

  // Storage health (Phase 6b)
  const [storageEstimate,     setStorageEstimate]     = useState(null); // null | { usageBytes, quotaBytes }
  const [validationWarning,   setValidationWarning]   = useState(false); // show banner?
  const [validationDismissed, setValidationDismissed] = useState(false); // session-only dismiss
  const [dbgCorruptUsed,      setDbgCorruptUsed]      = useState(false); // one-use-per-session
  const [dbgShapeUsed,        setDbgShapeUsed]        = useState(false);

  // Phase 6d — PWA / offline
  const [isOnline,      setIsOnline]      = useState(typeof navigator !== "undefined" ? navigator.onLine : true);
  const [swUpdateReady, setSwUpdateReady] = useState(false);
  const swRegRef = useRef(null);

  // Notion sync
  const [lastSyncedAt,   setLastSyncedAt]   = useState(null);
  const [syncQueue,      setSyncQueue]      = useState([]);
  const [notionSyncMsg,  setNotionSyncMsg]  = useState(null);
  const [syncInProgress, setSyncInProgress] = useState(false);
  const [syncProgress,   setSyncProgress]   = useState(null);
  const [syncReviewData, setSyncReviewData] = useState([]);
  const [pasteText,      setPasteText]      = useState("");
  const [parserTestText, setParserTestText] = useState("");
  const [notionIngPick,  setNotionIngPick]  = useState(null);
  const [notionIngSearch,setNotionIngSearch]= useState("");

  // Food add/edit
  const [addMode,        setAddMode]        = useState("food");
  const [searchTerm,     setSearchTerm]     = useState("");
  const [selectedFood,   setSelectedFood]   = useState(null);
  const [amount,         setAmount]         = useState("100");
  const [meal,           setMeal]           = useState("Breakfast");
  const [editingEntryId, setEditingEntryId] = useState(null);
  const [detailNutrient, setDetailNutrient] = useState(null);

  // Logged-entry editing (Phase 5.7)
  const [editingLogEntry,     setEditingLogEntry]     = useState(null); // full entry object
  const [editLogServings,     setEditLogServings]     = useState("1");
  const [editLogMeal,         setEditLogMeal]         = useState("Breakfast");
  const [editLogDuration,     setEditLogDuration]     = useState("60");
  const [editLogBurn,         setEditLogBurn]         = useState("");
  const [editLogSuppItems,    setEditLogSuppItems]    = useState([]);
  const [showDeletedFoods,    setShowDeletedFoods]    = useState(false);
  // W5 — Simplified/Advanced display toggle
  const [displayMode,         setDisplayMode]         = useState("advanced"); // "advanced" | "simplified"
  // W3 — exercise edit: activity ID being edited
  const [editLogActivityId,   setEditLogActivityId]   = useState(EXERCISE_ACTIVITIES[0].id);
  // W2 — null arc tap explanation panel
  const [nullPanelKey,        setNullPanelKey]        = useState(null); // nutrient key | null

  // Exercise
  const [exActivity,  setExActivity]  = useState(EXERCISE_ACTIVITIES[0].id);
  const [exDuration,  setExDuration]  = useState("60");
  const [exBurnEdit,  setExBurnEdit]  = useState("");

  // Custom food
  const [cf, setCf] = useState({ name:"", cat:"Other", cal:"", pro:"", carb:"", fat:"", fib:"", iron:"", calc:"", zinc:"", b12:"", vitD:"", omega3:"", iod:"", sel:"", mag:"", pot:"", fol:"" });

  // Recipe creation
  const [recipeInProgress,  setRecipeInProgress]  = useState({ name:"", source:"", servings:"4", ingredients:[] });
  const [editingRecipeId,   setEditingRecipeId]   = useState(null);
  const [recipeIngSearch,   setRecipeIngSearch]   = useState("");
  const [recipeIngSelected, setRecipeIngSelected] = useState(null);
  const [recipeIngAmount,   setRecipeIngAmount]   = useState("100");

  // Recipe log
  const [selectedRecipe,    setSelectedRecipe]    = useState(null);
  const [recipeLogMode,     setRecipeLogMode]     = useState("servings");
  const [recipeLogServings, setRecipeLogServings] = useState("1");
  const [recipeLogGrams,    setRecipeLogGrams]    = useState("");
  const [recipeLogMeal,     setRecipeLogMeal]     = useState("Breakfast");
  const [recipeLogReturn,   setRecipeLogReturn]   = useState("recipeDetail");

  // Supplement stack editor
  const [editingStackId,   setEditingStackId]   = useState(null);
  const [stackEditorName,  setStackEditorName]  = useState("");
  const [stackEditorItems, setStackEditorItems] = useState([]);

  // Supplement item editor
  const [editingItemIdx,  setEditingItemIdx]  = useState(null);
  const [itemEditorData,  setItemEditorData]  = useState({ name:"", dose_amount:"", dose_unit:"mcg", nutrients:{} });
  const [itemNutKey,      setItemNutKey]      = useState("b12");
  const [itemNutVal,      setItemNutVal]      = useState("");

  // Supplement log confirmation
  const [suppLogStack, setSuppLogStack] = useState(null);
  const [suppLogItems, setSuppLogItems] = useState([]);

  // One-off supplement
  const [oneOffData,   setOneOffData]   = useState({ name:"", dose_amount:"", dose_unit:"mcg", nutrients:{} });
  const [oneOffNutKey, setOneOffNutKey] = useState("b12");
  const [oneOffNutVal, setOneOffNutVal] = useState("");

  const searchRef      = useRef(null);
  const recipeIngRef   = useRef(null);
  const corruptedKeys  = useRef(new Set()); // Phase 6b: keys that failed JSON.parse — never overwrite

  // ── LOAD ─────────────────────────────────────────────────────────────
  useEffect(() => {
    (async () => {
      const l  = await loadData(STORAGE_KEYS.logs,             {});
      const g  = await loadData(STORAGE_KEYS.goals,            DEFAULT_GOALS);
      const go = await loadData(STORAGE_KEYS.goalOverrides,    {});
      const c  = await loadData(STORAGE_KEYS.customFoods,      []);
      const p  = await loadData(STORAGE_KEYS.profile,          DEFAULT_PROFILE);
      const er = await loadData(STORAGE_KEYS.exRatio,          DEFAULT_EX_RATIO);
      const rc = await loadData(STORAGE_KEYS.recipes,          []);
      const ns = await loadData(STORAGE_KEYS.notionStatus,     { lastSyncedAt: null });
      const sq = await loadData(STORAGE_KEYS.syncQueue,        []);
      const ss = await loadData(STORAGE_KEYS.supplementStacks, DEFAULT_SUPPLEMENT_STACKS);
      const le = await loadData(STORAGE_KEYS.lastExportedAt,   null);
      const dm = await loadData(STORAGE_KEYS.displayMode,      "advanced");
      // Recompute goals from stored profile so they're always fresh on load
      // Phase 6b — detect parse errors or shape failures
      // Keys that returned PARSE_ERROR are replaced with their fallback for
      // the rest of the load, but the banner is shown unconditionally.
      const parseErrors = [];
      const resolve = (val, fallback, name, storageKey) => {
        if (val === PARSE_ERROR) {
          parseErrors.push(`${name}: invalid JSON (corrupted value)`);
          corruptedKeys.current.add(storageKey); // never overwrite this key
          return fallback;
        }
        return val;
      };
      const safeL  = resolve(l,  {},                        "logs",             STORAGE_KEYS.logs);
      const safeC  = resolve(c,  [],                        "customFoods",      STORAGE_KEYS.customFoods);
      const safeP  = resolve(p,  DEFAULT_PROFILE,           "profile",          STORAGE_KEYS.profile);
      const safeEr = resolve(er, DEFAULT_EX_RATIO,          "exRatio",          STORAGE_KEYS.exRatio);
      const safeRc = resolve(rc, [],                        "recipes",          STORAGE_KEYS.recipes);
      const safeSs = resolve(ss, DEFAULT_SUPPLEMENT_STACKS, "supplementStacks", STORAGE_KEYS.supplementStacks);

      const computedOnLoad = computeGoals(safeP);
      setLogs(safeL); setGoals({ ...computedOnLoad, ...(g === PARSE_ERROR ? {} : g), ...computedOnLoad }); setGoalOverrides(go === PARSE_ERROR ? {} : go); setCustomFoods(safeC); setProfile(safeP); setExRatio(safeEr); setRecipes(safeRc);
      setLastSyncedAt((ns === PARSE_ERROR ? { lastSyncedAt: null } : ns).lastSyncedAt); setSyncQueue(sq === PARSE_ERROR ? [] : sq); setSupplementStacks(safeSs); setLastExportedAt(le === PARSE_ERROR ? null : le);
      setDisplayMode(dm === PARSE_ERROR ? "advanced" : (dm === "simplified" ? "simplified" : "advanced"));

      // Shape validation (runs on the resolved safe values)
      const shapeFailures = validateStorageShapes({ logs: safeL, recipes: safeRc, customFoods: safeC, profile: safeP, exRatio: safeEr, supplementStacks: safeSs });
      const allFailures = [...parseErrors, ...shapeFailures];
      if (allFailures.length > 0) {
        allFailures.forEach(f => console.warn("[NutriTrack] Storage validation failure:", f));
        setValidationWarning(true);
      }
      saveData(STORAGE_KEYS.lastValidatedAt, new Date().toISOString());

      // Phase 6b — storage byte count (direct localStorage measure, iOS-safe)
      setStorageEstimate(measureLocalStorageBytes());

      setLoaded(true);
    })();
  }, []);

  useEffect(() => { if (loaded && !corruptedKeys.current.has(STORAGE_KEYS.logs))             saveData(STORAGE_KEYS.logs,             logs);             }, [logs,             loaded]);
  useEffect(() => { if (loaded && !corruptedKeys.current.has(STORAGE_KEYS.goals))            saveData(STORAGE_KEYS.goals,            goals);            }, [goals,            loaded]);
  useEffect(() => { if (loaded && !corruptedKeys.current.has(STORAGE_KEYS.goalOverrides))    saveData(STORAGE_KEYS.goalOverrides,    goalOverrides);    }, [goalOverrides,    loaded]);
  useEffect(() => { if (loaded && !corruptedKeys.current.has(STORAGE_KEYS.customFoods))      saveData(STORAGE_KEYS.customFoods,      customFoods);      }, [customFoods,      loaded]);
  useEffect(() => {
    if (!loaded || corruptedKeys.current.has(STORAGE_KEYS.profile)) return;
    saveData(STORAGE_KEYS.profile, profile);
    // Recompute base goals whenever profile fields change
    setGoals(computeGoals(profile));
  }, [profile, loaded]);
  useEffect(() => { if (loaded && !corruptedKeys.current.has(STORAGE_KEYS.exRatio))          saveData(STORAGE_KEYS.exRatio,          exRatio);          }, [exRatio,          loaded]);
  useEffect(() => { if (loaded && !corruptedKeys.current.has(STORAGE_KEYS.recipes))          saveData(STORAGE_KEYS.recipes,          recipes);          }, [recipes,          loaded]);
  useEffect(() => { if (loaded && !corruptedKeys.current.has(STORAGE_KEYS.syncQueue))        saveData(STORAGE_KEYS.syncQueue,        syncQueue);        }, [syncQueue,        loaded]);
  useEffect(() => { if (loaded && !corruptedKeys.current.has(STORAGE_KEYS.supplementStacks)) saveData(STORAGE_KEYS.supplementStacks, supplementStacks); }, [supplementStacks, loaded]);
  useEffect(() => { if (loaded && lastExportedAt !== null) saveData(STORAGE_KEYS.lastExportedAt, lastExportedAt); }, [lastExportedAt, loaded]);
  useEffect(() => { if (loaded) saveData(STORAGE_KEYS.displayMode, displayMode); }, [displayMode, loaded]);

  // Phase 6f — load food DB from external JSON asset
  useEffect(() => {
    let cancelled = false;
    loadFoodDB()
      .then(data => { if (!cancelled) { setFoodDB(data); setFoodDBStatus("ready"); } })
      .catch(() => { if (!cancelled) setFoodDBStatus("error"); });
    return () => { cancelled = true; };
  }, []);

  // Phase 6b — refresh storage byte count after any save
  useEffect(() => {
    if (!loaded) return;
    setStorageEstimate(measureLocalStorageBytes());
  }, [logs, goals, goalOverrides, customFoods, profile, exRatio, recipes, syncQueue, supplementStacks, lastExportedAt, displayMode, loaded]);

  // allFoodsForRender: includes soft-deleted custom foods so historical log entries still resolve
  // Phase 6d — online/offline detection
  // navigator.onLine lies in iOS standalone mode; we probe with a real fetch.
  useEffect(() => {
    const probe = () => new Promise(resolve => {
      const xhr = new XMLHttpRequest();
      xhr.open("GET", `${WORKER_URL}/health`, true);
      xhr.timeout = 4000;
      xhr.onload  = () => resolve(xhr.status >= 200 && xhr.status < 500);
      xhr.onerror   = () => resolve(false);
      xhr.ontimeout = () => resolve(false);
      xhr.send();
    }).then(online => setIsOnline(online));

    const onOnline  = () => { setIsOnline(true);  probe(); };
    const onOffline = () => { setIsOnline(false); };
    window.addEventListener("online",  onOnline);
    window.addEventListener("offline", onOffline);
    // Probe on mount so initial state is accurate
    probe();
    // Poll every 10s to catch transitions iOS misses
    const interval = setInterval(probe, 5000);
    return () => {
      window.removeEventListener("online",  onOnline);
      window.removeEventListener("offline", onOffline);
      clearInterval(interval);
    };
  }, []);

  // Phase 6d — SW update detection
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;
    navigator.serviceWorker.getRegistration().then(reg => {
      if (!reg) return;
      swRegRef.current = reg;
      if (reg.waiting) setSwUpdateReady(true);
      reg.addEventListener("updatefound", () => {
        const sw = reg.installing;
        if (!sw) return;
        sw.addEventListener("statechange", () => {
          if (sw.state === "installed" && navigator.serviceWorker.controller) {
            swRegRef.current = reg;
            setSwUpdateReady(true);
          }
        });
      });
    });
    navigator.serviceWorker.addEventListener("controllerchange", () => {
      window.location.reload();
    });
  }, []);

  // allFoodsForRender: includes soft-deleted custom foods so historical log entries still resolve
  const allFoodsForRender = [...foodDB, ...customFoods];
  // allFoods: excludes soft-deleted custom foods — used for search, recipe creation, matching
  const allFoods = [...foodDB, ...customFoods.filter(f => !f.deleted)];
  const dayLog   = logs[currentDate] || [];

  // ── DAILY TOTALS ─────────────────────────────────────────────────────
  const dailyTotals = useCallback(() => {
    const t = {}; Object.keys(NUTRIENT_META).forEach(k => t[k] = 0);
    dayLog.forEach(e => {
      if (e.type === "exercise") return;
      if (e.type === "supplement") {
        (e.items || []).forEach(item => {
          Object.keys(item.nutrients || {}).forEach(k => { if (NUTRIENT_META[k]) t[k] += (item.nutrients[k] ?? 0); });
        });
        return;
      }
      if (e.type === "recipe") {
        (e.derivedIngredients || []).forEach(ing => {
          const m = ing.amount_g / 100;
          if (ing.snapshot) { Object.keys(NUTRIENT_META).forEach(k => { t[k] += (ing.snapshot[k] ?? 0) * m; }); }
          else { const food = allFoodsForRender.find(f => f.id === ing.foodId); if (!food) return; Object.keys(NUTRIENT_META).forEach(k => { t[k] += (food[k] ?? 0) * m; }); }
        });
        return;
      }
      const m = e.amount / 100;
      if (e.snapshot) { Object.keys(NUTRIENT_META).forEach(k => { t[k] += (e.snapshot[k] ?? 0) * m; }); }
      else { const food = allFoodsForRender.find(f => f.id === e.foodId); if (!food) return; Object.keys(NUTRIENT_META).forEach(k => { t[k] += (food[k] ?? 0) * m; }); }
    });
    return t;
  }, [dayLog, allFoodsForRender]);

  const totals = dailyTotals();
  const exerciseBurn = dayLog.filter(e => e.type === "exercise").reduce((s,e) => s + (e.calories_burned||0), 0);
  const ratioSum = (exRatio.carb + exRatio.fat + exRatio.pro) || 100;

  // Merge: computed goals < stored goals < manual overrides
  const resolvedGoals = { ...goals, ...goalOverrides };

  // Dynamic protein multiplier: scales 1.0× (no exercise) → 2.0× (burn ≈ TDEE)
  // Clamped to [1.0, 2.0]. Formula: 1 + (burn / TDEE).
  const tdeeBase = resolvedGoals.cal || 2000;
  const proMultiplier = Math.min(2.0, 1.0 + exerciseBurn / tdeeBase);
  const proBase = goals.pro || 70; // computed base before overrides so multiplier applies to formula value

  const effectiveGoals = exerciseBurn > 0 ? { ...resolvedGoals,
    cal:  resolvedGoals.cal  + exerciseBurn,
    carb: resolvedGoals.carb + Math.round(exerciseBurn * (exRatio.carb / ratioSum) / 4),
    fat:  resolvedGoals.fat  + Math.round(exerciseBurn * (exRatio.fat  / ratioSum) / 9),
    pro:  goalOverrides.pro != null
            ? resolvedGoals.pro  // user has manually set protein — don't scale
            : Math.round(proBase * proMultiplier),
  } : resolvedGoals;
  const pct = k => Math.round((totals[k] / (effectiveGoals[k] || 1)) * 100);
  const handleMacroTap = k => { if (k==="cal") setView("calDetail"); if (k==="fib") setView("fibDetail"); if (k==="fat") setView("fatDetail"); if (k==="pro") setView("proDetail"); };

  // W2 — memoized null arc computation. Runs only when dayLog or DB changes, not on every render.
  // null = genuine data gap (post-W0); 0.0 = confirmed absent. Only null triggers indicator.
  const nullData = useMemo(() => {
    const ALL_KEYS = [...MACROS, ...MICROS];
    const foodsByKey = {};
    const arcByKey   = {};
    ALL_KEYS.forEach(k => {
      const goal = effectiveGoals[k] || 1;
      const nonNullVals = allFoodsForRender.map(f => f[k]).filter(v => v != null && v > 0);
      nonNullVals.sort((a,b) => a-b);
      const median = nonNullVals.length > 0 ? nonNullVals[Math.floor(nonNullVals.length/2)] : null;
      const totalWeight = dayLog.filter(e=>e.type==="food"||e.type==="recipe")
        .reduce((s,e)=>e.type==="recipe"?s+(e.derivedIngredients||[]).reduce((a,i)=>a+i.amount_g,0):s+(e.amount||0),0);
      const nullFoods = []; let estTotal = 0;
      dayLog.forEach(e => {
        if (e.type==="exercise"||e.type==="supplement") return;
        if (e.type==="recipe") {
          (e.derivedIngredients||[]).forEach(ing => {
            const val = ing.snapshot ? ing.snapshot[k] : (allFoodsForRender.find(f=>f.id===ing.foodId)?.[k]);
            if (val === null || val === undefined) {
              const est = median != null ? (ing.amount_g/100)*median : (totalWeight>0?(ing.amount_g/totalWeight)*goal*0.1:0);
              if (est/goal >= 0.05) { nullFoods.push(ing.foodName); estTotal += est; }
            }
          }); return;
        }
        const val = e.snapshot ? e.snapshot[k] : (allFoodsForRender.find(f=>f.id===e.foodId)?.[k]);
        if (val === null || val === undefined) {
          const est = median != null ? ((e.amount||0)/100)*median : (totalWeight>0?((e.amount||0)/totalWeight)*goal*0.1:0);
          if (est/goal >= 0.05) { nullFoods.push(e.foodName||"Unknown"); estTotal += est; }
        }
      });
      if (nullFoods.length) { foodsByKey[k]=[...new Set(nullFoods)]; arcByKey[k]=Math.min(estTotal/goal,1); }
    });
    return { foodsByKey, arcByKey };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dayLog, allFoodsForRender, effectiveGoals]);

  // ── FOOD ACTIONS ──────────────────────────────────────────────────────
  const addEntry = () => {
    if (!selectedFood || !amount) return;
    if (editingEntryId) {
      setLogs(prev => ({ ...prev, [currentDate]: (prev[currentDate]||[]).map(e => e.id === editingEntryId ? { ...e, foodId:selectedFood.id, foodName:selectedFood.name, amount:parseFloat(amount), meal } : e) }));
      setEditingEntryId(null);
    } else {
      setLogs(prev => ({ ...prev, [currentDate]: [...(prev[currentDate]||[]), { id:Date.now().toString(), foodId:selectedFood.id, foodName:selectedFood.name, amount:parseFloat(amount), meal, time:new Date().toISOString(), snapshot:buildFoodSnapshot(selectedFood) }] }));
    }
    setSelectedFood(null); setAmount("100"); setSearchTerm(""); setView("log");
  };
  const removeEntry    = id => setLogs(prev => ({ ...prev, [currentDate]: (prev[currentDate]||[]).filter(e => e.id !== id) }));
  const startEditEntry = entry => { const food = allFoods.find(f => f.id === entry.foodId); if (!food) return; setSelectedFood(food); setAmount(String(entry.amount)); setMeal(entry.meal); setEditingEntryId(entry.id); setAddMode("food"); setView("add"); };

  // ── EXERCISE ──────────────────────────────────────────────────────────
  const addExercise = burnOverride => {
    const act = EXERCISE_ACTIVITIES.find(a => a.id === exActivity);
    const wt = parseFloat(profile.weightKg) || 70, dur = parseFloat(exDuration) || 0;
    const auto = Math.round(act.met * wt * (dur / 60));
    const burn = burnOverride !== undefined ? burnOverride : auto;
    setLogs(prev => ({ ...prev, [currentDate]: [...(prev[currentDate]||[]), { id:Date.now().toString(), type:"exercise", activity:act.label+" - "+act.intensity, duration_min:dur, calories_burned:burn, time:new Date().toISOString() }] }));
    setExActivity(EXERCISE_ACTIVITIES[0].id); setExDuration("60"); setExBurnEdit(""); setView("log");
  };

  // ── RECIPE ACTIONS ────────────────────────────────────────────────────
  const startNewRecipe  = () => { setRecipeInProgress({ name:"", source:"", servings:"4", ingredients:[] }); setEditingRecipeId(null); setView("recipeCreate"); };
  const startEditRecipe = r   => { setRecipeInProgress({ name:r.name, source:r.source||"", servings:String(r.servings), ingredients:[...r.ingredients] }); setEditingRecipeId(r.id); setView("recipeCreate"); };
  const saveRecipe = () => {
    if (!recipeInProgress.name.trim() || !recipeInProgress.ingredients.length) return;
    const s = parseFloat(recipeInProgress.servings) || 1, n = calcRecipeNutritionPerServing(recipeInProgress.ingredients, s, allFoods);
    const rec = { name:recipeInProgress.name.trim(), source:recipeInProgress.source.trim(), servings:s, ingredients:recipeInProgress.ingredients, nutrition_per_serving:n };
    if (editingRecipeId) setRecipes(prev => prev.map(r => r.id === editingRecipeId ? { ...r, ...rec } : r));
    else setRecipes(prev => [...prev, { id:`recipe_${Date.now()}`, ...rec }]);
    setEditingRecipeId(null); setView("recipes");
  };
  const deleteRecipe = id => { setRecipes(prev => prev.filter(r => r.id !== id)); setView("recipes"); };
  const addIngredientToRecipe = () => { if (!recipeIngSelected || !recipeIngAmount) return; setRecipeInProgress(prev => ({ ...prev, ingredients:[...prev.ingredients, { foodId:recipeIngSelected.id, foodName:recipeIngSelected.name, amount_g:parseFloat(recipeIngAmount)||100 }] })); setRecipeIngSelected(null); setRecipeIngSearch(""); setRecipeIngAmount("100"); setView("recipeCreate"); };
  const removeIngFromRecipe = idx => setRecipeInProgress(prev => ({ ...prev, ingredients:prev.ingredients.filter((_,i) => i !== idx) }));
  const logRecipe = () => {
    if (!selectedRecipe) return;
    const rs = Math.max(Number(selectedRecipe.servings)||1,0.01), tw = (selectedRecipe.ingredients||[]).reduce((s,i)=>s+(Number(i.amount_g)||0),0);
    let frac, sl;
    if (recipeLogMode==="servings") { sl=parseFloat(recipeLogServings)||1; frac=sl/rs; }
    else { const g=parseFloat(recipeLogGrams)||0; frac=tw>0?g/tw:0; sl=Math.round(frac*rs*10)/10; }
    if (frac <= 0) return;
    const di = (selectedRecipe.ingredients||[]).map(ing => {
      const food = allFoods.find(f => f.id === ing.foodId);
      const rawAmt = (Number(ing.amount_g)||0) * frac;
      const amt = rawAmt > 0 ? Math.max(Math.round(rawAmt * 10) / 10, 0.1) : 0.1; // floor at 0.1g — never 0
      return { foodId:ing.foodId, foodName:ing.foodName, amount_g:amt, ...(food ? { snapshot:buildFoodSnapshot(food) } : {}) };
    });
    setRecipeLogReviewIngredients(di);
    setView("recipeLogReview");
  };
  const commitLogRecipe = (finalDI) => {
    if (!selectedRecipe || !finalDI.length) return;
    const rs = Math.max(Number(selectedRecipe.servings)||1,0.01);
    let sl;
    if (recipeLogMode==="servings") { sl=parseFloat(recipeLogServings)||1; }
    else { const tw=selectedRecipe.ingredients.reduce((s,i)=>s+i.amount_g,0); const g=parseFloat(recipeLogGrams)||0; sl=Math.round((tw>0?g/tw:0)*rs*10)/10; }
    setLogs(prev => ({ ...prev, [currentDate]: [...(prev[currentDate]||[]), {
      id:Date.now().toString(), type:"recipe", recipeId:selectedRecipe.id, recipeName:selectedRecipe.name,
      servings:Math.round(sl*10)/10, meal:recipeLogMeal, time:new Date().toISOString(), derivedIngredients:finalDI
    }]}));
    setView("log");
    setRecipeLogServings("1"); setRecipeLogGrams(""); setRecipeLogMode("servings");
    setSelectedRecipe(null); setRecipeLogReturn("recipeDetail"); setRecipeLogReviewIngredients([]);
  };

  // ── SUPPLEMENT ACTIONS ────────────────────────────────────────────────
  const openStackEditor = stack => {
    if (stack) { setEditingStackId(stack.id); setStackEditorName(stack.name); setStackEditorItems(stack.items.map(i => ({ ...i, nutrients:{...i.nutrients} }))); }
    else { setEditingStackId(null); setStackEditorName(""); setStackEditorItems([]); }
    setView("stackEditor");
  };
  const saveStack = () => {
    if (!stackEditorName.trim()) return;
    const stack = { id:editingStackId||`stack_${Date.now()}`, name:stackEditorName.trim(), items:stackEditorItems };
    if (editingStackId) setSupplementStacks(prev => prev.map(s => s.id===editingStackId ? stack : s));
    else setSupplementStacks(prev => [...prev, stack]);
    setView("settings");
  };
  const deleteStack = id => { setSupplementStacks(prev => prev.filter(s => s.id !== id)); setView("settings"); };

  const openItemEditor = idx => {
    if (idx !== null && idx !== undefined) { const item = stackEditorItems[idx]; setEditingItemIdx(idx); setItemEditorData({ name:item.name, dose_amount:String(item.dose_amount), dose_unit:item.dose_unit, nutrients:{...item.nutrients} }); }
    else { setEditingItemIdx(null); setItemEditorData({ name:"", dose_amount:"", dose_unit:"mcg", nutrients:{} }); }
    setItemNutKey("b12"); setItemNutVal(""); setView("itemEditor");
  };
  const saveItem = () => {
    const item = { name:itemEditorData.name.trim(), dose_amount:parseFloat(itemEditorData.dose_amount)||0, dose_unit:itemEditorData.dose_unit, nutrients:{...itemEditorData.nutrients} };
    if (!item.name) return;
    if (editingItemIdx !== null && editingItemIdx !== undefined) setStackEditorItems(prev => prev.map((x,i) => i===editingItemIdx ? item : x));
    else setStackEditorItems(prev => [...prev, item]);
    setView("stackEditor");
  };
  const removeItemFromStack  = idx => setStackEditorItems(prev => prev.filter((_,i) => i !== idx));
  const addNutrientToItem    = () => { const val = parseFloat(itemNutVal); if (!itemNutKey || isNaN(val)) return; setItemEditorData(prev => ({ ...prev, nutrients:{...prev.nutrients,[itemNutKey]:val} })); setItemNutVal(""); };
  const removeNutrientFromItem = key => { setItemEditorData(prev => { const n={...prev.nutrients}; delete n[key]; return {...prev,nutrients:n}; }); };

  const openSuppLogConfirm = stack => { setSuppLogStack(stack); setSuppLogItems(stack.items.map(item => ({ ...item, checked:true, doseOverride:"" }))); setView("suppLogConfirm"); };
  const logSuppStack = () => {
    if (!suppLogStack) return;
    const items = suppLogItems.filter(i => i.checked).map(i => { const d = parseFloat(i.doseOverride); return { name:i.name, dose_amount:(!isNaN(d)&&i.doseOverride.trim()!="")?d:i.dose_amount, dose_unit:i.dose_unit, nutrients:{...i.nutrients} }; });
    if (!items.length) { setView("add"); return; }
    const suppSnapshot = {}; items.forEach(item => { Object.keys(item.nutrients || {}).forEach(k => { suppSnapshot[k] = (suppSnapshot[k] ?? 0) + (item.nutrients[k] ?? 0); }); });
    setLogs(prev => ({ ...prev, [currentDate]: [...(prev[currentDate]||[]), { id:Date.now().toString(), type:"supplement", stackId:suppLogStack.id, stackName:suppLogStack.name, items, time:new Date().toISOString(), meal:"", snapshot:suppSnapshot }] }));
    setSuppLogStack(null); setSuppLogItems([]); setView("log");
  };

  const addNutrientToOneOff    = () => { const val = parseFloat(oneOffNutVal); if (!oneOffNutKey || isNaN(val)) return; setOneOffData(prev => ({ ...prev, nutrients:{...prev.nutrients,[oneOffNutKey]:val} })); setOneOffNutVal(""); };
  const removeNutrientFromOneOff = key => { setOneOffData(prev => { const n={...prev.nutrients}; delete n[key]; return {...prev,nutrients:n}; }); };
  const logOneOff = () => {
    if (!oneOffData.name.trim()) return;
    const item = { name:oneOffData.name.trim(), dose_amount:parseFloat(oneOffData.dose_amount)||0, dose_unit:oneOffData.dose_unit, nutrients:{...oneOffData.nutrients} };
    setLogs(prev => ({ ...prev, [currentDate]: [...(prev[currentDate]||[]), { id:Date.now().toString(), type:"supplement", stackId:null, stackName:"One-off", items:[item], time:new Date().toISOString(), meal:"", snapshot:{...item.nutrients} }] }));
    setOneOffData({ name:"", dose_amount:"", dose_unit:"mcg", nutrients:{} }); setOneOffNutKey("b12"); setOneOffNutVal(""); setView("log");
  };

  const changeDate = delta => { const d = new Date(currentDate); d.setDate(d.getDate()+delta); setCurrentDate(dateKey(d)); };

  const saveCustomFood = () => {
    if (!cf.name.trim() || !cf.cal) return;
    const newFood = { id:`custom_${Date.now()}`, name:cf.name.trim(), cat:cf.cat||"Other", ...Object.fromEntries(Object.keys(NUTRIENT_META).map(k => [k, parseFloat(cf[k])||0])) };
    setCustomFoods(prev => [...prev, newFood]);
    setCf({ name:"", cat:"Other", cal:"", pro:"", carb:"", fat:"", fib:"", iron:"", calc:"", zinc:"", b12:"", vitD:"", omega3:"", iod:"", sel:"", mag:"", pot:"", fol:"" });
    setView("add");
  };

  const softDeleteCustomFood = id => setCustomFoods(prev => prev.map(f => f.id === id ? { ...f, deleted: true } : f));
  const restoreCustomFood    = id => setCustomFoods(prev => prev.map(f => f.id === id ? { ...f, deleted: false } : f));

  // Open edit views for logged entries
  const openEditRecipeEntry = entry => {
    setEditingLogEntry(entry);
    setEditLogServings(String(entry.servings));
    setEditLogMeal(entry.meal || "Breakfast");
    setView("editLoggedRecipe");
  };
  const openEditExerciseEntry = entry => {
    setEditingLogEntry(entry);
    setEditLogDuration(String(entry.duration_min));
    setEditLogBurn("");
    const matched = EXERCISE_ACTIVITIES.find(a => (a.label + " - " + a.intensity) === entry.activity);
    setEditLogActivityId(matched ? matched.id : EXERCISE_ACTIVITIES[0].id);
    setView("editLoggedExercise");
  };
  const openEditSuppEntry = entry => {
    setEditingLogEntry(entry);
    setEditLogSuppItems((entry.items || []).map(i => ({ ...i, doseOverride: "" })));
    setView("editLoggedSupp");
  };

  // Save edits back to log
  const saveEditedRecipeEntry = () => {
    if (!editingLogEntry) return;
    const recipe = recipes.find(r => r.id === editingLogEntry.recipeId);
    const servings = parseFloat(editLogServings) || 1;
    let di = editingLogEntry.derivedIngredients;
    // Recompute derivedIngredients if recipe still exists and servings changed
    if (recipe) {
      const rs = Math.max(Number(recipe.servings) || 1, 0.01);
      const frac = servings / rs;
      di = recipe.ingredients.map(ing => { const origIng = (editingLogEntry.derivedIngredients || []).find(d => d.foodId === ing.foodId); return { foodId: ing.foodId, foodName: ing.foodName, amount_g: Math.round(ing.amount_g * frac * 10) / 10, ...(origIng?.snapshot ? { snapshot: origIng.snapshot } : {}) }; });
    }
    setLogs(prev => ({ ...prev, [currentDate]: (prev[currentDate] || []).map(e =>
      e.id === editingLogEntry.id ? { ...e, servings: Math.round(servings * 10) / 10, meal: editLogMeal, derivedIngredients: di } : e
    )}));
    setEditingLogEntry(null); setView("log");
  };
  const saveEditedExerciseEntry = () => {
    if (!editingLogEntry) return;
    const dur = parseFloat(editLogDuration) || 0;
    const act = EXERCISE_ACTIVITIES.find(a => a.id === editLogActivityId) || EXERCISE_ACTIVITIES[0];
    const wt  = parseFloat(profile?.weightKg) || 70;
    const burn = editLogBurn !== "" ? (parseInt(editLogBurn) || 0) : Math.round(act.met * wt * (dur / 60));
    setLogs(prev => ({ ...prev, [currentDate]: (prev[currentDate] || []).map(e =>
      e.id === editingLogEntry.id
        ? { ...e, activity: act.label + " - " + act.intensity, duration_min: dur, calories_burned: burn }
        : e
    )}));
    setEditingLogEntry(null); setView("log");
  };
  const saveEditedSuppEntry = () => {
    if (!editingLogEntry) return;
    const items = editLogSuppItems.map(i => {
      const newDose = parseFloat(i.doseOverride);
      const hasOverride = !isNaN(newDose) && i.doseOverride.trim() !== "";
      const finalDose = hasOverride ? newDose : i.dose_amount;
      // Rescale nutrients proportionally to dose change
      const scaleFactor = (i.dose_amount > 0 && hasOverride) ? (newDose / i.dose_amount) : 1;
      const nutrients = Object.fromEntries(
        Object.entries(i.nutrients || {}).map(([k, v]) => [k, Math.round(v * scaleFactor * 1000) / 1000])
      );
      return { name: i.name, dose_amount: finalDose, dose_unit: i.dose_unit, nutrients };
    });
    setLogs(prev => ({ ...prev, [currentDate]: (prev[currentDate] || []).map(e =>
      e.id === editingLogEntry.id ? { ...e, items } : e
    )}));
    setEditingLogEntry(null); setView("log");
  };
  // ── NOTION SYNC ───────────────────────────────────────────────────────
  const buildReviewData = parsedRecipes => {
    const review = parsedRecipes.map(r => {
      const existing = recipes.find(rec => rec.name.toLowerCase().trim() === (r.title||"").toLowerCase().trim());
      return { title:r.title||"Untitled", servings:r.servings||4, source:r.source||"",
        ingredients:(r.ingredients||[]).map(ing => { const match = fuzzyMatchFood(ing.name, allFoods); return { raw:`${ing.amount} ${ing.unit} ${ing.name}`, name:ing.name, amount:ing.amount, unit:ing.unit, amount_g:toGrams(ing.amount,ing.unit), match, skipped:!match }; }),
        duplicateAction: existing ? null : "import", existingId: existing?.id||null, imported: false };
    });
    setSyncReviewData(review); setNotionSyncMsg(null); setSyncInProgress(false); setView("notionReview");
  };

  const handleTestConnection = async () => {
    setNotionSyncMsg({ type:"info", text:"Testing connection…" });
    try { const data = await fetchHealth(); setNotionSyncMsg({ type:"info", text:`✓ Connected to Worker (v${data.version||"?"})` }); setTimeout(() => setNotionSyncMsg(null), 4000); }
    catch (err) { const msg = err.message||""; let f = msg.includes("worker_403")?"Worker rejected. Check ALLOWED_ORIGINS.":msg.startsWith("network:")?"Could not reach Worker. Are you online?": `Connection failed: ${msg}`; setNotionSyncMsg({ type:"error", text:f }); setTimeout(() => setNotionSyncMsg(null), 8000); }
  };

  const handleResetSyncHistory = () => { setLastSyncedAt(null); saveData(STORAGE_KEYS.notionStatus,{lastSyncedAt:null}); setNotionSyncMsg({type:"info",text:"Sync history cleared."}); setTimeout(()=>setNotionSyncMsg(null),4000); };

  const handleWorkerSync = async () => {
    if (!navigator.onLine) { setSyncQueue(prev=>[...prev,{id:Date.now().toString(),captured_time:new Date().toISOString(),status:"pending"}]); setNotionSyncMsg({type:"info",text:"Offline. Sync queued."}); setTimeout(()=>setNotionSyncMsg(null),4000); return; }
    setSyncInProgress(true); setSyncProgress({phase:"connecting",current:0,total:0}); setNotionSyncMsg(null);
    try {
      setSyncProgress({phase:"listing",current:0,total:0});
      const lr = await fetchRecipesList(lastSyncedAt); const rl = lr.recipes||[], fa = lr.fetched_at||new Date().toISOString();
      if (!rl.length) { setLastSyncedAt(fa); saveData(STORAGE_KEYS.notionStatus,{lastSyncedAt:fa}); setSyncInProgress(false); setSyncProgress(null); setNotionSyncMsg({type:"info",text:lastSyncedAt?"No new recipes since last sync.":"No recipes found."}); setTimeout(()=>setNotionSyncMsg(null),5000); return; }
      setSyncProgress({phase:"fetching",current:0,total:rl.length});
      const enriched = await fetchRecipePagesWithProgress(rl, c => setSyncProgress({phase:"fetching",current:c,total:rl.length}));
      const usable = enriched.filter(r=>r.ingredientLines&&r.ingredientLines.length), skipped = enriched.length-usable.length;
      if (!usable.length) { setSyncInProgress(false); setSyncProgress(null); setNotionSyncMsg({type:"error",text:"No parseable ingredient tables found."}); setTimeout(()=>setNotionSyncMsg(null),6000); return; }
      setSyncProgress({phase:"parsing",current:0,total:usable.length});
      const parsed = [];
      for (let i=0; i<usable.length; i++) { const r=usable[i]; try { const ing=await parseIngredients(r.ingredientLines); parsed.push({...r,ingredients:ing}); } catch { parsed.push({...r,ingredients:[]}); } setSyncProgress({phase:"parsing",current:i+1,total:usable.length}); }
      buildReviewData(parsed); setLastSyncedAt(fa); saveData(STORAGE_KEYS.notionStatus,{lastSyncedAt:fa});
      if (skipped>0) setNotionSyncMsg({type:"info",text:`${parsed.length} recipe${parsed.length===1?"":"s"} for review. ${skipped} skipped.`});
      setSyncProgress(null);
    } catch (err) {
      const msg=err.message||""; let f=msg.includes("worker_403")?"Worker rejected. Check ALLOWED_ORIGINS.":msg.includes("worker_502")?"Notion unreachable.":msg.startsWith("network:")?"Lost connection.":`Sync failed: ${msg}`;
      setNotionSyncMsg({type:"error",text:f}); setSyncInProgress(false); setSyncProgress(null); setTimeout(()=>setNotionSyncMsg(null),8000);
    }
  };

  const handlePasteSync = async () => {
    if (!pasteText.trim()) return; setSyncInProgress(true); setNotionSyncMsg({type:"info",text:"Parsing pasted content…"});
    try { const rr=await parseRecipesFromPasteText(pasteText); if(!rr.length){setNotionSyncMsg({type:"error",text:"No recipes found."});setSyncInProgress(false);setTimeout(()=>setNotionSyncMsg(null),5000);return;} const parsed=await Promise.all(rr.map(async r=>({...r,ingredients:await parseIngredients(r.ingredientLines)}))); buildReviewData(parsed); }
    catch { setNotionSyncMsg({type:"error",text:"Parsing failed."}); setSyncInProgress(false); setTimeout(()=>setNotionSyncMsg(null),4000); }
  };

  const handleParserTest = async () => {
    if (!parserTestText.trim()) return; setSyncInProgress(true);
    try { const lines=parserTestText.split(/\r?\n/).map(l=>l.trim()).filter(Boolean); const ing=await parseIngredients(lines); buildReviewData([{title:"Parser Test",servings:1,source:"regex parser test",ingredientLines:lines,ingredients:ing}]); }
    catch (err) { setNotionSyncMsg({type:"error",text:`Parser failed: ${err.message||"unknown"}`}); setSyncInProgress(false); }
  };

  const importRecipe = idx => {
    const r = syncReviewData[idx]; if (r.duplicateAction==="skip"||r.imported) return;
    const ingredients = r.ingredients.filter(i=>i.match&&!i.skipped).map(i=>({foodId:i.match.id,foodName:i.match.name,amount_g:i.amount_g}));
    if (!ingredients.length) return;
    const s=Math.max(r.servings||1,0.1), nutrition=calcRecipeNutritionPerServing(ingredients,s,allFoods);
    const name = r.duplicateAction==="copy"?`${r.title} (imported)`:r.title;
    const newRec = {id:(r.duplicateAction==="overwrite"&&r.existingId)?r.existingId:`recipe_${Date.now()}_${idx}`,name,source:r.source,servings:s,ingredients,nutrition_per_serving:nutrition};
    if (r.duplicateAction==="overwrite"&&r.existingId) setRecipes(prev=>prev.map(rec=>rec.id===r.existingId?newRec:rec));
    else setRecipes(prev=>[...prev,newRec]);
    setSyncReviewData(prev=>prev.map((item,i)=>i===idx?{...item,imported:true}:item));
  };

  const importAllReady = () => { syncReviewData.forEach((_,idx)=>{const r=syncReviewData[idx];if(!r.imported&&r.duplicateAction!==null&&r.duplicateAction!=="skip")importRecipe(idx);}); setSyncQueue([]); setPasteText(""); setView("settings"); setNotionSyncMsg({type:"info",text:"Import complete ✓"}); setTimeout(()=>setNotionSyncMsg(null),3000); };
  const clearSyncQueue = () => { setSyncQueue([]); setNotionSyncMsg({type:"info",text:"Queue cleared."}); setTimeout(()=>setNotionSyncMsg(null),3000); };

  const filteredFoods = searchTerm.length>0 ? allFoods.filter(f=>f.name.toLowerCase().includes(searchTerm.toLowerCase())) : allFoods;
  const groupedByCategory = filteredFoods.reduce((acc,f)=>{if(!acc[f.cat])acc[f.cat]=[];acc[f.cat].push(f);return acc;},{});
  const filteredIngFoods = recipeIngSearch.length>0 ? allFoods.filter(f=>f.name.toLowerCase().includes(recipeIngSearch.toLowerCase())) : allFoods;
  const groupedIngByCategory = filteredIngFoods.reduce((acc,f)=>{if(!acc[f.cat])acc[f.cat]=[];acc[f.cat].push(f);return acc;},{});
  const formatDate = ds => { const d=new Date(ds+"T12:00:00"); return d.toLocaleDateString("en-GB",{weekday:"short",month:"short",day:"numeric"}); };

  if (!loaded) return (
    <div style={{background:"#0a0f1a",color:"#e2e8f0",height:"100vh",display:"flex",alignItems:"center",justifyContent:"center"}}>
      <div style={{textAlign:"center"}}><div style={{fontSize:28,fontWeight:700,letterSpacing:"-0.02em"}}>NutriTrack</div><div style={{fontSize:13,color:"#64748b",marginTop:6}}>Loading…</div></div>
    </div>
  );
  // ── STYLES ────────────────────────────────────────────────────────────
  const S = {
    app:       { background:"#0a0f1a", color:"#e2e8f0", minHeight:"100vh", fontFamily:"'DM Sans', system-ui, sans-serif", paddingBottom:80, paddingTop:"env(safe-area-inset-top, 0px)" },
    header:    { padding:"16px 20px 8px", display:"flex", alignItems:"center", justifyContent:"space-between" },
    section:   { padding:"0 20px" },
    card:      { background:"#111827", borderRadius:14, padding:16, marginBottom:10, border:"1px solid #1e293b" },
    macroGrid: { display:"grid", gridTemplateColumns:"repeat(5, 1fr)", gap:6, padding:"12px 20px" },
    macroItem: { display:"flex", flexDirection:"column", alignItems:"center", gap:4, cursor:"pointer" },
    macroLabel:{ fontSize:10, color:"#94a3b8", fontWeight:500 },
    macroVal:  { fontSize:11, fontWeight:700, color:"#e2e8f0" },
    mealHdr:   { fontSize:13, fontWeight:700, color:"#94a3b8", textTransform:"uppercase", letterSpacing:"0.05em" },
    entry:     { display:"flex", justifyContent:"space-between", alignItems:"center", padding:"10px 12px", borderBottom:"1px solid #1e293b" },
    entryName: { fontSize:14, fontWeight:500, color:"#e2e8f0" },
    entryDet:  { fontSize:12, color:"#64748b" },
    entryCal:  { fontSize:13, fontWeight:600, color:"#f59e0b" },
    delBtn:    { background:"none", border:"none", color:"#ef4444", fontSize:16, cursor:"pointer", padding:"4px 8px" },
    fab:       { position:"fixed", bottom:"calc(88px + env(safe-area-inset-bottom, 0px))", right:"calc(20px + env(safe-area-inset-right, 0px))", width:52, height:52, borderRadius:16, background:"#3b82f6", border:"none", color:"#fff", fontSize:28, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 4px 20px rgba(59,130,246,0.4)", zIndex:100 },
    nav:       { position:"fixed", bottom:0, left:0, right:0, background:"#111827", borderTop:"1px solid #1e293b", display:"flex", justifyContent:"space-around", padding:"8px 0", paddingBottom:"calc(8px + env(safe-area-inset-bottom, 0px))", zIndex:100 },
    navBtn:  a => ({ background:"none", border:"none", color:a?"#3b82f6":"#64748b", fontSize:11, fontWeight:600, cursor:"pointer", display:"flex", flexDirection:"column", alignItems:"center", gap:2, padding:"4px 10px" }),
    input:     { width:"100%", background:"#1e293b", border:"1px solid #334155", borderRadius:10, padding:"12px 14px", color:"#e2e8f0", fontSize:15, outline:"none", boxSizing:"border-box" },
    srchItem:  { padding:"12px 0", borderBottom:"1px solid #1e293b", cursor:"pointer" },
    pill:    a => ({ padding:"6px 14px", borderRadius:20, border:a?"1px solid #3b82f6":"1px solid #334155", background:a?"#1d4ed8":"transparent", color:a?"#fff":"#94a3b8", fontSize:13, cursor:"pointer" }),
    microRow:  { display:"flex", justifyContent:"space-between", alignItems:"center", padding:"6px 0", cursor:"pointer" },
    microBar:  { height:4, borderRadius:2, background:"#1e293b", flex:1, margin:"0 8px", position:"relative", overflow:"hidden" },
    label:     { fontSize:12, color:"#94a3b8", fontWeight:600, display:"block", marginBottom:6 },
    cfRow:     { display:"flex", alignItems:"center", justifyContent:"space-between", padding:"8px 0", borderBottom:"1px solid #1e293b" },
    modePicker:{ display:"flex", background:"#0a0f1a", borderRadius:10, padding:4, marginBottom:16 },
    modeTab: a => ({ flex:1, padding:"8px 0", borderRadius:8, border:"none", cursor:"pointer", fontSize:13, fontWeight:600, background:a?"#1d4ed8":"transparent", color:a?"#fff":"#64748b" }),
    suppRow:   { display:"flex", justifyContent:"space-between", alignItems:"center", padding:"10px 0", borderBottom:"1px solid #1e293b" },
  };

  const RECIPE_VIEWS = ["recipes","recipeCreate","recipeIngAdd","recipeDetail","recipeLog","recipeLogReview"];
  const BottomNav = () => (
    <div style={S.nav}>
      <button style={S.navBtn(view==="log")}                   onClick={() => setView("log")}>     <span style={{fontSize:18}}>📋</span>Log     </button>
      <button style={S.navBtn(view==="goals")}                 onClick={() => setView("goals")}>   <span style={{fontSize:18}}>🎯</span>Goals   </button>
      <button style={S.navBtn(RECIPE_VIEWS.includes(view))}    onClick={() => setView("recipes")}> <span style={{fontSize:18}}>📖</span>Recipes </button>
      <button style={S.navBtn(view==="settings")}              onClick={() => setView("settings")}><span style={{fontSize:18}}>⚙️</span>Settings</button>
    </div>
  );

  // Helper: supplement contribution to one nutrient key for detail views
  const suppContrib = (entry, k) => (entry.items||[]).reduce((s,item) => s + ((item.nutrients||{})[k]??0), 0);
  const recipeSubtotal = (e, field) => (e.derivedIngredients||[]).reduce((s,ing) => { if (ing.snapshot && ing.snapshot[field] !== undefined) return s + (ing.snapshot[field]||0) * ing.amount_g / 100; const f=allFoodsForRender.find(x=>x.id===ing.foodId); return s+(f?(f[field]||0)*ing.amount_g/100:0); }, 0);

  const globalBanners = (<>
    {swUpdateReady && (
      <div style={{background:"#1e3a5f",borderBottom:"1px solid #3b82f6",padding:"10px 14px",display:"flex",justifyContent:"space-between",alignItems:"center",gap:8,flexShrink:0,zIndex:200}}>
        <div style={{fontSize:12,color:"#93c5fd",lineHeight:1.5,flex:1}}>Update available — close and reopen the app to update.</div>
        <button style={{background:"#3b82f6",border:"none",borderRadius:8,color:"#fff",fontSize:12,fontWeight:700,cursor:"pointer",padding:"6px 12px",flexShrink:0}}
          onClick={() => { const reg = swRegRef.current; if (reg && reg.waiting) reg.waiting.postMessage({type:"SKIP_WAITING"}); }}>
          OK
        </button>
      </div>
    )}
    {!isOnline && (
      <div style={{background:"#1a1a2e",borderBottom:"1px solid #475569",padding:"10px 14px",fontSize:12,color:"#94a3b8",flexShrink:0,zIndex:199}}>
        Offline — Notion sync unavailable.
      </div>
    )}
  </>);
  // ── LOG VIEW ──────────────────────────────────────────────────────────
  if (view === "log") {
    const grouped = {}; MEALS.forEach(m => grouped[m] = []);
    dayLog.forEach(e => { if (e.type==="exercise"||e.type==="supplement") return; if (!grouped[e.meal]) grouped[e.meal]=[]; grouped[e.meal].push(e); });
    const suppEntries = dayLog.filter(e => e.type === "supplement");
    return (
      <div style={S.app}>
        {globalBanners}
        {validationWarning && !validationDismissed && (
          <div style={{background:"#1c1000",border:"1px solid #92400e",padding:"10px 14px",display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:8,flexShrink:0}}>
            <div style={{fontSize:12,color:"#fbbf24",lineHeight:1.5,flex:1}}>⚠️ Some data didn't load as expected. We recommend exporting your current data before continuing — open Settings → Export Data.</div>
            <button style={{background:"none",border:"none",color:"#92400e",fontSize:18,cursor:"pointer",padding:"0 2px",lineHeight:1,flexShrink:0}} onClick={()=>setValidationDismissed(true)}>×</button>
          </div>
        )}
        <div style={S.header}>
          <div style={{display:"flex",alignItems:"center",gap:12}}>
            <button style={{background:"none",border:"none",color:"#94a3b8",fontSize:20,padding:"4px 8px",cursor:"pointer"}} onClick={() => changeDate(-1)}>‹</button>
            <span style={{fontSize:15,fontWeight:600,color:"#e2e8f0",letterSpacing:"-0.01em"}}>{formatDate(currentDate)}{currentDate===today()&&<span style={{fontSize:10,color:"#3b82f6",fontWeight:600,marginLeft:6}}>TODAY</span>}</span>
            <button style={{background:"none",border:"none",color:"#94a3b8",fontSize:20,padding:"4px 8px",cursor:"pointer"}} onClick={() => changeDate(1)}>›</button>
          </div>
        </div>
        <div style={S.macroGrid}>
          {MACROS.map(k => {
            const arc = nullData.arcByKey[k] || 0;
            const hasNull = !!nullData.foodsByKey[k];
            return (
              <div key={k} style={S.macroItem} onClick={() => {
                if (hasNull) { setNullPanelKey(nullPanelKey===k ? null : k); }
                else { handleMacroTap(k); }
              }}>
                <Ring value={totals[k]} max={effectiveGoals[k]} color={NUTRIENT_META[k].color}
                  size={48} stroke={4} nullArc={arc} simplified={displayMode==="simplified"}>
                  <text x="50%" y="50%" textAnchor="middle" dy="0.35em" fill={NUTRIENT_META[k].color} fontSize={10} fontWeight={700}>{pct(k)}%</text>
                </Ring>
                <div style={S.macroLabel}>{NUTRIENT_META[k].label}{hasNull&&<span style={{fontSize:9,marginLeft:2,color:"#94a3b8"}}>?</span>}</div>
                <div style={S.macroVal}>{Math.round(totals[k])}<span style={{fontSize:9,color:"#64748b"}}>{NUTRIENT_META[k].unit}</span></div>
              </div>
            );
          })}
        </div>
        {/* W2 — null explanation panel for macro rings */}
        {nullPanelKey && MACROS.includes(nullPanelKey) && (
          <div style={{margin:"0 16px 4px",background:"#0f1a2e",border:"1px solid #1d4ed8",borderRadius:10,padding:"10px 14px",fontSize:12,color:"#93c5fd",lineHeight:1.5}}>
            <div style={{fontWeight:700,marginBottom:4}}>{NUTRIENT_META[nullPanelKey].label} may be higher than shown.</div>
            <div style={{color:"#7dd3fc",marginBottom:6}}>{(nullData.foodsByKey[nullPanelKey]||[]).length} food{(nullData.foodsByKey[nullPanelKey]||[]).length===1?"":"s"} had no data: {(nullData.foodsByKey[nullPanelKey]||[]).join(", ")}.</div>
            <div style={{color:"#475569",marginBottom:6}}>The grey arc shows an estimate based on typical values.</div>
            <button style={{background:"none",border:"none",color:"#60a5fa",fontSize:12,cursor:"pointer",padding:0,textDecoration:"underline"}} onClick={e=>{e.stopPropagation();setNullPanelKey(null);handleMacroTap(nullPanelKey);}}>View full detail →</button>
          </div>
        )}
        {exerciseBurn > 0 && (
          <div style={{margin:"0 20px 8px",background:"#0f2d1a",border:"1px solid #16a34a",borderRadius:10,padding:"8px 14px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
            <span style={{fontSize:13,color:"#4ade80"}}>🏃 {exerciseBurn} kcal burned today</span>
            <span style={{fontSize:11,color:"#166534"}}>goals adjusted</span>
          </div>
        )}
        <div style={S.section}>
          <div style={S.card}>
            <div style={{fontSize:13,fontWeight:700,color:"#94a3b8",marginBottom:8,letterSpacing:"0.05em",textTransform:"uppercase"}}>Micronutrients</div>
            {MICROS.map(k => {
              const p=pct(k), meta=NUTRIENT_META[k], hasNull=!!nullData.foodsByKey[k];
              const arc = nullData.arcByKey[k] || 0;
              const confirmedPct = Math.min(p, 100);
              const nullWidth = Math.min(arc*100, 100-confirmedPct);
              return (
                <div key={k}>
                  <div style={S.microRow} onClick={() => {
                    if (hasNull) { setNullPanelKey(nullPanelKey===k?null:k); }
                    else { setDetailNutrient(k); setView("detail"); }
                  }}>
                    <span style={{fontSize:12,color:"#e2e8f0",width:80,fontWeight:500}}>{meta.label}</span>
                    <div style={S.microBar}>
                      <div style={{position:"absolute",left:0,top:0,height:"100%",width:`${confirmedPct}%`,background:meta.color,borderRadius:2,transition:"width 0.5s ease"}}/>
                      {hasNull && displayMode==="advanced" && nullWidth > 0 && (
                        <div style={{position:"absolute",left:`${confirmedPct}%`,top:0,height:"100%",width:`${nullWidth}%`,background:"repeating-linear-gradient(90deg,#475569 0px,#475569 3px,transparent 3px,transparent 6px)",borderRadius:2,opacity:0.7}}/>
                      )}
                    </div>
                    <span style={{fontSize:11,color:p>=100?"#10b981":p>=60?"#f59e0b":"#ef4444",width:32,textAlign:"right"}}>{p}%</span>
                    {hasNull && <span style={{fontSize:11,color:"#64748b",marginLeft:2}}>?</span>}
                  </div>
                  {hasNull && nullPanelKey===k && (
                    <div style={{background:"#0f1a2e",border:"1px solid #1d4ed8",borderRadius:8,padding:"8px 10px",margin:"2px 0 6px",fontSize:12,color:"#93c5fd",lineHeight:1.5}}>
                      <div style={{fontWeight:700,marginBottom:4}}>{meta.label} may be higher than shown.</div>
                      <div style={{color:"#7dd3fc",marginBottom:4}}>{nullData.foodsByKey[k].length} food{nullData.foodsByKey[k].length===1?"":"s"} had no data: {nullData.foodsByKey[k].join(", ")}.</div>
                      {displayMode==="advanced" && <div style={{color:"#475569",marginBottom:4}}>The grey segment shows an estimate based on typical values.</div>}
                      <button style={{background:"none",border:"none",color:"#60a5fa",fontSize:12,cursor:"pointer",padding:0,textDecoration:"underline"}} onClick={e=>{e.stopPropagation();setNullPanelKey(null);setDetailNutrient(k);setView("detail");}}>View full detail →</button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        <div style={{...S.section,paddingBottom:240}}>
          {MEALS.map(m => {
            const entries = grouped[m]; if (!entries.length) return null;
            const mealCals = entries.reduce((sum,e) => { if(e.type==="recipe") return sum+computeEntryNutrition(e.derivedIngredients||[],allFoodsForRender).cal; if(e.snapshot) return sum+(e.snapshot.cal??0)*e.amount/100; const f=allFoodsForRender.find(x=>x.id===e.foodId); return sum+(f?f.cal*e.amount/100:0); }, 0);
            return (
              <div key={m}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",margin:"12px 0 4px"}}>
                  <div style={S.mealHdr}>{m}</div>
                  <span style={{fontSize:12,color:"#f59e0b",fontWeight:600}}>{Math.round(mealCals)} kcal</span>
                </div>
                {entries.map(e => {
                  if (e.type === "recipe") { const nut=computeEntryNutrition(e.derivedIngredients||[],allFoodsForRender); return (
                    <SwipeableEntry key={e.id} onDelete={() => removeEntry(e.id)}>
                      <div style={S.entry} onClick={() => openEditRecipeEntry(e)}><div style={{flex:1}}><div style={{...S.entryName,color:"#a78bfa"}}>📖 {e.recipeName}</div><div style={S.entryDet}>{e.servings} {e.servings===1?"serving":"servings"} · tap to edit</div></div>
                      <div style={{display:"flex",alignItems:"center"}}><span style={S.entryCal}>{Math.round(nut.cal)} kcal</span><button style={S.delBtn} onClick={ev => { ev.stopPropagation(); removeEntry(e.id); }}>×</button></div></div>
                    </SwipeableEntry>); }
                  const f = allFoodsForRender.find(x => x.id === e.foodId);
                  return (
                    <SwipeableEntry key={e.id} onDelete={() => removeEntry(e.id)}>
                      <div style={S.entry}><div style={{flex:1,cursor:"pointer"}} onClick={() => startEditEntry(e)}><div style={S.entryName}>{e.foodName}</div><div style={S.entryDet}>{e.amount}g · tap to edit</div></div>
                      <div style={{display:"flex",alignItems:"center"}}><span style={S.entryCal}>{e.snapshot?Math.round((e.snapshot.cal??0)*e.amount/100):f?Math.round(f.cal*e.amount/100):"-"} kcal</span><button style={S.delBtn} onClick={() => removeEntry(e.id)}>×</button></div></div>
                    </SwipeableEntry>);
                })}
              </div>
            );
          })}
          {dayLog.filter(e=>e.type!=="exercise"&&e.type!=="supplement").length===0 && !suppEntries.length && (
            <div style={{textAlign:"center",padding:"40px 0",color:"#475569"}}><div style={{fontSize:32,marginBottom:8}}>🥗</div><div style={{fontSize:14}}>No food logged today</div><div style={{fontSize:12,color:"#64748b"}}>Tap + to add your first meal</div></div>
          )}
          {suppEntries.length > 0 && (
            <div>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",margin:"12px 0 4px"}}><div style={S.mealHdr}>Supplements</div></div>
              {suppEntries.map(e => (
                <SwipeableEntry key={e.id} onDelete={() => removeEntry(e.id)}>
                  <div style={{...S.entry,background:"#0f0a1e"}} onClick={() => openEditSuppEntry(e)}>
                    <div style={{flex:1}}><div style={{fontSize:14,fontWeight:500,color:"#c4b5fd"}}>💊 {e.stackName}</div><div style={{fontSize:12,color:"#64748b"}}>{suppItemSummary(e.items)} · tap to edit</div></div>
                    <div style={{display:"flex",alignItems:"center"}}><span style={{fontSize:12,color:"#64748b",marginRight:4}}>{new Date(e.time).toLocaleTimeString("en-GB",{hour:"2-digit",minute:"2-digit"})}</span><button style={S.delBtn} onClick={ev => { ev.stopPropagation(); removeEntry(e.id); }}>×</button></div>
                  </div>
                </SwipeableEntry>
              ))}
            </div>
          )}
          {dayLog.filter(e=>e.type==="exercise").length > 0 && (
            <div>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",margin:"12px 0 4px"}}><div style={S.mealHdr}>Exercise</div><span style={{fontSize:12,color:"#4ade80",fontWeight:600}}>−{exerciseBurn} kcal</span></div>
              {dayLog.filter(e=>e.type==="exercise").map(e => (
                <SwipeableEntry key={e.id} onDelete={() => removeEntry(e.id)}>
                  <div style={{...S.entry,background:"#0a0f1a"}} onClick={() => openEditExerciseEntry(e)}><div style={{flex:1}}><div style={{fontSize:14,fontWeight:500,color:"#4ade80"}}>{e.activity}</div><div style={{fontSize:12,color:"#64748b"}}>{e.duration_min} min · tap to edit</div></div>
                  <div style={{display:"flex",alignItems:"center"}}><span style={{fontSize:13,fontWeight:600,color:"#4ade80"}}>−{e.calories_burned} kcal</span><button style={S.delBtn} onClick={ev => { ev.stopPropagation(); removeEntry(e.id); }}>×</button></div></div>
                </SwipeableEntry>
              ))}
            </div>
          )}
        </div>
        <button style={S.fab} onClick={() => { setEditingEntryId(null); setAddMode("food"); setView("add"); setTimeout(()=>searchRef.current?.focus(),100); }}>+</button>
        <button style={{...S.fab,right:"calc(84px + env(safe-area-inset-right, 0px))",background:"#16a34a",fontSize:22}} onClick={() => setView("exercise")}>🏃</button>
        <BottomNav/>
      </div>
    );
  }
  // ── ADD SCREEN (Food / Recipe / Supplement) ───────────────────────────
  if (view === "add") {
    const ModePicker = () => (
      <div style={S.modePicker}>
        {[["food","🍎 Food"],["recipe","📖 Recipe"],["supplement","💊 Supps"]].map(([m,label]) => (
          <button key={m} style={S.modeTab(addMode===m)} onClick={() => { setAddMode(m); setSelectedFood(null); setSearchTerm(""); }}>{label}</button>
        ))}
      </div>
    );

    if (addMode === "food") {
      return (
        <div style={S.app}>
          <div style={S.header}>
            <button style={{background:"none",border:"none",color:"#94a3b8",fontSize:15,cursor:"pointer"}} onClick={() => { setView("log"); setSelectedFood(null); setSearchTerm(""); setEditingEntryId(null); }}>← Back</button>
            <span style={{fontSize:15,fontWeight:700}}>{selectedFood?(editingEntryId?"Edit Entry":"Log Amount"):"Add Food"}</span>
            {!selectedFood ? <button style={{background:"none",border:"none",color:"#3b82f6",fontSize:13,cursor:"pointer",fontWeight:600}} onClick={() => setView("customAdd")}>+ Custom</button> : <div style={{width:64}}/>}
          </div>
          <div style={S.section}>
            {!selectedFood && <ModePicker/>}
            {!selectedFood ? (
              <>
                <input ref={searchRef} style={S.input} placeholder="Search foods…" value={searchTerm} onChange={e=>setSearchTerm(e.target.value)} autoFocus/>
                {customFoods.length > 0 && (
                  <div style={{textAlign:"right",marginTop:4,marginBottom:2}}>
                    <button style={{background:"none",border:"none",color:"#64748b",fontSize:11,cursor:"pointer",textDecoration:"underline"}} onClick={() => setView("manageCustomFoods")}>Manage custom foods</button>
                  </div>
                )}
                <div style={{marginTop:12,maxHeight:"calc(100vh - 220px)",overflowY:"auto"}}>
                  {foodDBStatus === "loading" && <div style={{padding:"32px 0",textAlign:"center",color:"#64748b",fontSize:13}}>Loading food database…</div>}
                  {foodDBStatus === "error" && <div style={{padding:"24px 12px",textAlign:"center",color:"#ef4444",fontSize:13}}>Food database failed to load. Try restarting the app.</div>}
                  {foodDBStatus === "ready" && (() => {
                    const mr = searchTerm.length>0 ? recipes.filter(r=>r.name.toLowerCase().includes(searchTerm.toLowerCase())) : recipes;
                    if (!mr.length) return null;
                    return (<div><div style={{fontSize:11,fontWeight:700,color:"#475569",padding:"10px 0 4px",letterSpacing:"0.05em",textTransform:"uppercase"}}>Recipes</div>
                      {mr.map(r => { const n=r.nutrition_per_serving||{}; return (
                        <div key={r.id} style={{...S.srchItem,paddingBottom:10}} onClick={() => { setSelectedRecipe(r); setRecipeLogReturn("add"); setRecipeLogServings("1"); setRecipeLogGrams(""); setRecipeLogMode("servings"); setRecipeLogMeal(meal); setView("recipeLog"); }}>
                          <span style={{fontSize:12,color:"#a78bfa",float:"right"}}>{Math.round(n.cal??0)} kcal/srv</span>
                          <div style={{fontSize:14,fontWeight:500,color:"#a78bfa"}}>📖 {r.name}</div>
                          <div style={{fontSize:11,color:"#475569"}}>{r.servings} {r.servings===1?"serving":"servings"} · {r.ingredients.length} ingredients</div>
                        </div>); })}
                    </div>);
                  })()}
                  {Object.entries(groupedByCategory).map(([cat,foods]) => (
                    <div key={cat}><div style={{fontSize:11,fontWeight:700,color:"#475569",padding:"10px 0 4px",letterSpacing:"0.05em",textTransform:"uppercase"}}>{cat}</div>
                      {foods.map(f => (<div key={f.id} style={{...S.srchItem,contentVisibility:"auto",containIntrinsicSize:"0 48px"}} onClick={() => setSelectedFood(f)}><span style={{fontSize:12,color:"#f59e0b",float:"right"}}>{f.cal} kcal/100g</span><div style={{fontSize:14,fontWeight:500,color:"#e2e8f0"}}>{f.name}</div>{f.source&&f.source!=="usda"&&<div style={{fontSize:11,color:"#475569",marginTop:1}}>Source: {f.source.toUpperCase()}</div>}</div>))}
                    </div>
                  ))}
                  {filteredFoods.length===0 && recipes.filter(r=>r.name.toLowerCase().includes(searchTerm.toLowerCase())).length===0 && searchTerm.length>0 && <div style={{padding:20,textAlign:"center",color:"#475569",fontSize:14}}>No results for "{searchTerm}"</div>}
                </div>
              </>
            ) : (
              <div style={S.card}>
                <div style={{fontSize:16,fontWeight:700,marginBottom:4}}>{selectedFood.name}</div>
                <div style={{fontSize:12,color:"#64748b",marginBottom:16}}>{selectedFood.cat}</div>
                <label style={S.label}>Amount (g / ml)</label>
                <input style={S.input} type="number" value={amount} onChange={e=>setAmount(e.target.value)} inputMode="numeric"/>
                <div style={{display:"flex",gap:6,marginTop:8,flexWrap:"wrap",marginBottom:16}}>
                  {[25,50,100,150,200,250].map(q => <button key={q} style={S.pill(amount===String(q))} onClick={() => setAmount(String(q))}>{q}</button>)}
                </div>
                <label style={S.label}>Meal</label>
                <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:12}}>
                  {MEALS.map(m => <button key={m} style={S.pill(meal===m)} onClick={() => setMeal(m)}>{m}</button>)}
                </div>
                <div style={{background:"#0a0f1a",borderRadius:10,padding:12,marginBottom:16}}>
                  <div style={{fontSize:11,fontWeight:700,color:"#475569",marginBottom:8,textTransform:"uppercase"}}>Preview</div>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8}}>
                    {MACROS.map(k => { const val=(selectedFood[k]??0)*(parseFloat(amount)||0)/100; return (<div key={k} style={{textAlign:"center"}}><div style={{fontSize:16,fontWeight:700,color:NUTRIENT_META[k].color}}>{Math.round(val*10)/10}</div><div style={{fontSize:10,color:"#64748b"}}>{NUTRIENT_META[k].label}</div></div>); })}
                  </div>
                </div>
                <button style={{width:"100%",padding:14,borderRadius:12,border:"none",background:"#3b82f6",color:"#fff",fontSize:15,fontWeight:700,cursor:"pointer"}} onClick={addEntry}>{editingEntryId?"Save Changes":"Add to "+meal}</button>
              </div>
            )}
          </div>
        </div>
      );
    }

    if (addMode === "recipe") {
      return (
        <div style={S.app}>
          <div style={S.header}>
            <button style={{background:"none",border:"none",color:"#94a3b8",fontSize:15,cursor:"pointer"}} onClick={() => { setView("log"); setSearchTerm(""); }}>← Back</button>
            <span style={{fontSize:15,fontWeight:700}}>Log Recipe</span><div style={{width:64}}/>
          </div>
          <div style={S.section}><ModePicker/>
            {!recipes.length ? (
              <div style={{textAlign:"center",padding:"40px 0",color:"#475569"}}><div style={{fontSize:32,marginBottom:8}}>📖</div><div style={{fontSize:14,color:"#64748b"}}>No recipes yet</div><div style={{fontSize:12,marginTop:4}}>Go to Recipes tab to create one</div></div>
            ) : (
              <div>{recipes.map(r => { const n=r.nutrition_per_serving||{}; return (
                <div key={r.id} style={{...S.card,cursor:"pointer",marginBottom:8}} onClick={() => { setSelectedRecipe(r); setRecipeLogReturn("add"); setRecipeLogServings("1"); setRecipeLogGrams(""); setRecipeLogMode("servings"); setRecipeLogMeal(meal); setView("recipeLog"); }}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <div style={{flex:1}}><div style={{fontSize:15,fontWeight:700,color:"#a78bfa",marginBottom:2}}>📖 {r.name}</div><div style={{fontSize:12,color:"#475569"}}>{r.servings} {r.servings===1?"serving":"servings"} · {r.ingredients.length} ingredients</div></div>
                    <div style={{textAlign:"right"}}><div style={{fontSize:14,fontWeight:700,color:NUTRIENT_META.cal.color}}>{Math.round(n.cal??0)}</div><div style={{fontSize:10,color:"#64748b"}}>kcal/srv</div></div>
                  </div>
                </div>); })}
              </div>
            )}
          </div>
        </div>
      );
    }

    if (addMode === "supplement") {
      return (
        <div style={S.app}>
          <div style={S.header}>
            <button style={{background:"none",border:"none",color:"#94a3b8",fontSize:15,cursor:"pointer"}} onClick={() => setView("log")}>← Back</button>
            <span style={{fontSize:15,fontWeight:700}}>Log Supplement</span><div style={{width:64}}/>
          </div>
          <div style={{...S.section,paddingBottom:40}}>
            <ModePicker/>
            {!supplementStacks.length ? (
              <div style={{textAlign:"center",padding:"30px 0",color:"#475569"}}><div style={{fontSize:32,marginBottom:8}}>💊</div><div style={{fontSize:14,color:"#64748b"}}>No stacks set up yet</div><div style={{fontSize:12,marginTop:4}}>Go to Settings → Supplements to create one</div></div>
            ) : (
              <div>
                <div style={{fontSize:12,color:"#64748b",marginBottom:10}}>Tap a stack to log it</div>
                {supplementStacks.map(stack => (
                  <div key={stack.id} style={{...S.card,cursor:"pointer",marginBottom:8}} onClick={() => openSuppLogConfirm(stack)}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                      <div><div style={{fontSize:15,fontWeight:700,color:"#c4b5fd"}}>💊 {stack.name}</div>
                        <div style={{fontSize:12,color:"#64748b",marginTop:2}}>{stack.items.length===0?"No items":`${stack.items.length} item${stack.items.length===1?"":"s"}: ${suppItemSummary(stack.items)}`}</div></div>
                      <div style={{color:"#475569",fontSize:18,paddingLeft:8}}>›</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div style={{marginTop:16}}>
              <div style={{fontSize:13,fontWeight:700,color:"#94a3b8",textTransform:"uppercase",letterSpacing:"0.05em",marginBottom:10}}>Log a one-off</div>
              <div style={S.card}>
                <label style={S.label}>Supplement name</label>
                <input style={{...S.input,marginBottom:12}} placeholder="e.g. Creatine" value={oneOffData.name} onChange={e=>setOneOffData(p=>({...p,name:e.target.value}))}/>
                <div style={{display:"flex",gap:8,marginBottom:12}}>
                  <div style={{flex:1}}><label style={S.label}>Dose</label><input style={S.input} type="number" inputMode="decimal" placeholder="e.g. 5" value={oneOffData.dose_amount} onChange={e=>setOneOffData(p=>({...p,dose_amount:e.target.value}))}/></div>
                  <div style={{width:90}}><label style={S.label}>Unit</label><select style={{...S.input,padding:"11px 8px"}} value={oneOffData.dose_unit} onChange={e=>setOneOffData(p=>({...p,dose_unit:e.target.value}))}>{SUPP_DOSE_UNITS.map(u=><option key={u}>{u}</option>)}</select></div>
                </div>
                {Object.keys(oneOffData.nutrients).length > 0 && (
                  <div style={{marginBottom:12}}>{Object.entries(oneOffData.nutrients).map(([k,v]) => (
                    <div key={k} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"4px 0",borderBottom:"1px solid #1e293b"}}>
                      <span style={{fontSize:13,color:"#e2e8f0"}}>{NUTRIENT_META[k]?.label||k}</span>
                      <div style={{display:"flex",alignItems:"center",gap:8}}><span style={{fontSize:13,color:"#a78bfa",fontWeight:600}}>{v} {NUTRIENT_META[k]?.unit||""}</span><button style={{background:"none",border:"none",color:"#ef4444",fontSize:14,cursor:"pointer",padding:"0 4px"}} onClick={()=>removeNutrientFromOneOff(k)}>×</button></div>
                    </div>))}
                  </div>
                )}
                <div style={{display:"flex",gap:6,marginBottom:12}}>
                  <select style={{...S.input,flex:1,padding:"8px 10px",fontSize:13}} value={oneOffNutKey} onChange={e=>setOneOffNutKey(e.target.value)}>
                    {NUTRIENT_ALL_KEYS.map(k=><option key={k} value={k}>{NUTRIENT_META[k].label} ({NUTRIENT_META[k].unit})</option>)}
                  </select>
                  <input style={{...S.input,width:80,padding:"8px 10px",fontSize:13}} type="number" inputMode="decimal" placeholder="0" value={oneOffNutVal} onChange={e=>setOneOffNutVal(e.target.value)}/>
                  <button style={{background:"#1d4ed8",border:"none",color:"#fff",borderRadius:10,padding:"8px 14px",fontSize:13,fontWeight:600,cursor:"pointer",whiteSpace:"nowrap"}} onClick={addNutrientToOneOff}>+ Add</button>
                </div>
                <button style={{width:"100%",padding:14,borderRadius:12,border:"none",background:oneOffData.name.trim()?"#7c3aed":"#1e293b",color:oneOffData.name.trim()?"#fff":"#64748b",fontSize:15,fontWeight:700,cursor:oneOffData.name.trim()?"pointer":"default"}} disabled={!oneOffData.name.trim()} onClick={logOneOff}>Log one-off</button>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
  // ── SUPPLEMENT LOG CONFIRMATION ───────────────────────────────────────
  if (view === "suppLogConfirm" && suppLogStack) {
    const checkedCount = suppLogItems.filter(i=>i.checked).length;
    return (
      <div style={S.app}>
        <div style={S.header}>
          <button style={{background:"none",border:"none",color:"#94a3b8",fontSize:15,cursor:"pointer"}} onClick={() => { setSuppLogStack(null); setSuppLogItems([]); setView("add"); }}>← Back</button>
          <span style={{fontSize:15,fontWeight:700}}>Log {suppLogStack.name}</span><div style={{width:48}}/>
        </div>
        <div style={S.section}>
          <div style={{fontSize:12,color:"#64748b",marginBottom:12}}>Uncheck items you didn't take. Tap dose to override.</div>
          <div style={S.card}>
            {suppLogItems.length===0 ? (
              <div style={{textAlign:"center",padding:"20px 0",color:"#475569",fontSize:13}}>This stack has no items. Edit it in Settings → Supplements.</div>
            ) : suppLogItems.map((item,idx) => (
              <div key={idx} style={{...S.suppRow,opacity:item.checked?1:0.4}}>
                <div style={{display:"flex",alignItems:"center",gap:10,flex:1}}>
                  <input type="checkbox" checked={item.checked} onChange={e=>setSuppLogItems(prev=>prev.map((x,i)=>i===idx?{...x,checked:e.target.checked}:x))} style={{width:18,height:18,accentColor:"#7c3aed",cursor:"pointer"}}/>
                  <div style={{flex:1}}>
                    <div style={{fontSize:14,fontWeight:500,color:"#e2e8f0"}}>{item.name}</div>
                    <div style={{fontSize:12,color:"#64748b",marginTop:2}}>Default: {item.dose_amount}{item.dose_unit}</div>
                  </div>
                </div>
                <div style={{width:90}}>
                  <input style={{...S.input,width:"100%",padding:"6px 8px",fontSize:13,textAlign:"right"}} type="number" inputMode="decimal" placeholder={String(item.dose_amount)} value={item.doseOverride}
                    onChange={e=>setSuppLogItems(prev=>prev.map((x,i)=>i===idx?{...x,doseOverride:e.target.value}:x))}/>
                  <div style={{fontSize:10,color:"#475569",textAlign:"right",marginTop:2}}>{item.dose_unit}</div>
                </div>
              </div>
            ))}
          </div>
          <button style={{width:"100%",padding:14,borderRadius:12,border:"none",marginTop:8,background:checkedCount>0?"#7c3aed":"#1e293b",color:checkedCount>0?"#fff":"#64748b",fontSize:15,fontWeight:700,cursor:checkedCount>0?"pointer":"default"}} disabled={checkedCount===0} onClick={logSuppStack}>
            Log {checkedCount} item{checkedCount===1?"":"s"} — {suppLogStack.name}
          </button>
        </div>
      </div>
    );
  }

  // ── STACK EDITOR ──────────────────────────────────────────────────────
  if (view === "stackEditor") {
    const canSave = stackEditorName.trim().length > 0;
    return (
      <div style={S.app}>
        <div style={S.header}>
          <button style={{background:"none",border:"none",color:"#94a3b8",fontSize:15,cursor:"pointer"}} onClick={() => setView("settings")}>← Back</button>
          <span style={{fontSize:15,fontWeight:700}}>{editingStackId?"Edit Stack":"New Stack"}</span>
          <button style={{background:"none",border:"none",fontSize:13,fontWeight:700,cursor:canSave?"pointer":"default",color:canSave?"#3b82f6":"#334155"}} onClick={saveStack} disabled={!canSave}>Save</button>
        </div>
        <div style={S.section}>
          <div style={S.card}>
            <label style={S.label}>Stack name</label>
            <input style={{...S.input,marginBottom:8}} placeholder="e.g. AM, PM, Pre-ride" value={stackEditorName} onChange={e=>setStackEditorName(e.target.value)}/>
            <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
              {["AM","PM","Pre-ride","Post-ride","Evening"].map(n => (<button key={n} style={S.pill(stackEditorName===n)} onClick={()=>setStackEditorName(n)}>{n}</button>))}
            </div>
          </div>
          <div style={S.card}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
              <div style={{fontSize:13,fontWeight:700,color:"#94a3b8",textTransform:"uppercase",letterSpacing:"0.05em"}}>Items {stackEditorItems.length>0?`(${stackEditorItems.length})`:""}</div>
              <button style={{background:"#1d4ed8",border:"none",color:"#fff",borderRadius:8,padding:"6px 12px",fontSize:12,fontWeight:600,cursor:"pointer"}} onClick={() => openItemEditor(null)}>+ Add item</button>
            </div>
            {stackEditorItems.length===0 ? (
              <div style={{textAlign:"center",padding:"20px 0",color:"#475569",fontSize:13}}>No items yet — tap + Add item</div>
            ) : stackEditorItems.map((item,idx) => (
              <div key={idx} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 0",borderBottom:idx<stackEditorItems.length-1?"1px solid #1e293b":"none"}}>
                <div style={{flex:1,cursor:"pointer"}} onClick={() => openItemEditor(idx)}>
                  <div style={{fontSize:14,fontWeight:500,color:"#e2e8f0"}}>{item.name}</div>
                  <div style={{fontSize:12,color:"#64748b"}}>{item.dose_amount}{item.dose_unit}{Object.keys(item.nutrients).length>0&&<span style={{color:"#a78bfa",marginLeft:6}}>· {Object.keys(item.nutrients).length} nutrient{Object.keys(item.nutrients).length===1?"":"s"}</span>}</div>
                </div>
                <button style={{background:"none",border:"none",color:"#ef4444",fontSize:18,cursor:"pointer",padding:"4px 8px"}} onClick={() => removeItemFromStack(idx)}>×</button>
              </div>
            ))}
          </div>
          {editingStackId && (<button style={{width:"100%",padding:14,borderRadius:12,border:"1px solid #ef4444",background:"transparent",color:"#ef4444",fontSize:14,fontWeight:600,cursor:"pointer",marginBottom:20}} onClick={() => deleteStack(editingStackId)}>Delete Stack</button>)}
        </div>
      </div>
    );
  }

  // ── ITEM EDITOR ───────────────────────────────────────────────────────
  if (view === "itemEditor") {
    const canSave = itemEditorData.name.trim().length > 0;
    return (
      <div style={S.app}>
        <div style={S.header}>
          <button style={{background:"none",border:"none",color:"#94a3b8",fontSize:15,cursor:"pointer"}} onClick={() => setView("stackEditor")}>← Back</button>
          <span style={{fontSize:15,fontWeight:700}}>{editingItemIdx!==null&&editingItemIdx!==undefined?"Edit Item":"New Item"}</span>
          <button style={{background:"none",border:"none",fontSize:13,fontWeight:700,cursor:canSave?"pointer":"default",color:canSave?"#3b82f6":"#334155"}} onClick={saveItem} disabled={!canSave}>Save</button>
        </div>
        <div style={S.section}>
          <div style={S.card}>
            <label style={S.label}>Supplement name</label>
            <input style={{...S.input,marginBottom:12}} placeholder="e.g. Vitamin B12" value={itemEditorData.name} onChange={e=>setItemEditorData(p=>({...p,name:e.target.value}))}/>
            <div style={{display:"flex",gap:8,marginBottom:4}}>
              <div style={{flex:1}}><label style={S.label}>Dose amount</label><input style={S.input} type="number" inputMode="decimal" placeholder="e.g. 1000" value={itemEditorData.dose_amount} onChange={e=>setItemEditorData(p=>({...p,dose_amount:e.target.value}))}/></div>
              <div style={{width:100}}><label style={S.label}>Unit</label><select style={{...S.input,padding:"11px 8px"}} value={itemEditorData.dose_unit} onChange={e=>setItemEditorData(p=>({...p,dose_unit:e.target.value}))}>{SUPP_DOSE_UNITS.map(u=><option key={u}>{u}</option>)}</select></div>
            </div>
          </div>
          <div style={S.card}>
            <div style={{fontSize:13,fontWeight:700,color:"#94a3b8",textTransform:"uppercase",letterSpacing:"0.05em",marginBottom:4}}>Nutrient contributions</div>
            <div style={{fontSize:11,color:"#475569",marginBottom:12}}>Optional. Only add if this supplement provides trackable nutrients.</div>
            {Object.keys(itemEditorData.nutrients).length > 0 && (
              <div style={{marginBottom:12}}>{Object.entries(itemEditorData.nutrients).map(([k,v]) => (
                <div key={k} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"6px 0",borderBottom:"1px solid #1e293b"}}>
                  <span style={{fontSize:13,color:"#e2e8f0"}}>{NUTRIENT_META[k]?.label||k}</span>
                  <div style={{display:"flex",alignItems:"center",gap:8}}><span style={{fontSize:13,color:"#a78bfa",fontWeight:600}}>{v} {NUTRIENT_META[k]?.unit||""}</span><button style={{background:"none",border:"none",color:"#ef4444",fontSize:14,cursor:"pointer",padding:"0 4px"}} onClick={()=>removeNutrientFromItem(k)}>×</button></div>
                </div>))}
              </div>
            )}
            <div style={{display:"flex",gap:6,marginBottom:4}}>
              <select style={{...S.input,flex:1,padding:"8px 10px",fontSize:13}} value={itemNutKey} onChange={e=>setItemNutKey(e.target.value)}>
                {NUTRIENT_ALL_KEYS.map(k=><option key={k} value={k}>{NUTRIENT_META[k].label} ({NUTRIENT_META[k].unit})</option>)}
              </select>
              <input style={{...S.input,width:80,padding:"8px 10px",fontSize:13}} type="number" inputMode="decimal" placeholder="0" value={itemNutVal} onChange={e=>setItemNutVal(e.target.value)}/>
              <button style={{background:"#1d4ed8",border:"none",color:"#fff",borderRadius:10,padding:"8px 14px",fontSize:13,fontWeight:600,cursor:"pointer",whiteSpace:"nowrap"}} onClick={addNutrientToItem}>+ Add</button>
            </div>
            <div style={{fontSize:11,color:"#475569",marginTop:4}}>e.g. select "B12 (mcg)", enter 1000, tap + Add</div>
          </div>
        </div>
      </div>
    );
  }
  // ── RECIPES LIBRARY ───────────────────────────────────────────────────
  if (view === "recipes") {
    return (
      <div style={S.app}>
        <div style={S.header}><span style={{fontSize:17,fontWeight:700}}>Recipes</span><button style={{background:"#3b82f6",border:"none",color:"#fff",borderRadius:10,padding:"8px 16px",fontSize:13,fontWeight:700,cursor:"pointer"}} onClick={startNewRecipe}>+ New</button></div>
        <div style={{...S.section,paddingBottom:20}}>
          {recipes.length===0 ? (<div style={{textAlign:"center",padding:"60px 0",color:"#475569"}}><div style={{fontSize:40,marginBottom:12}}>📖</div><div style={{fontSize:15,fontWeight:600,color:"#64748b",marginBottom:6}}>No recipes yet</div><div style={{fontSize:13}}>Tap + New to create your first recipe</div></div>
          ) : (<div style={{marginTop:8}}>{recipes.map(r => { const n=r.nutrition_per_serving||{}; return (
            <div key={r.id} style={{...S.card,cursor:"pointer"}} onClick={() => { setSelectedRecipe(r); setView("recipeDetail"); }}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                <div style={{flex:1}}>
                  <div style={{fontSize:15,fontWeight:700,color:"#e2e8f0",marginBottom:2}}>{r.name}</div>
                  <div style={{fontSize:12,color:"#475569",marginBottom:8}}>{r.servings} {r.servings===1?"serving":"servings"}{r.source?` · ${r.source}`:""} · {r.ingredients.length} ingredients</div>
                  <div style={{display:"flex",gap:12}}>{[{k:"cal",l:"kcal"},{k:"pro",l:"pro"},{k:"carb",l:"carb"},{k:"fat",l:"fat"}].map(({k,l}) => (<div key={k} style={{textAlign:"center"}}><div style={{fontSize:13,fontWeight:700,color:NUTRIENT_META[k].color}}>{Math.round((n[k]??0)*10)/10}</div><div style={{fontSize:10,color:"#64748b"}}>{l}/srv</div></div>))}</div>
                </div>
                <div style={{color:"#475569",fontSize:18,paddingLeft:8}}>›</div>
              </div>
            </div>); })}</div>
          )}
        </div>
        <BottomNav/>
      </div>
    );
  }

  // ── RECIPE DETAIL ─────────────────────────────────────────────────────
  if (view === "recipeDetail" && selectedRecipe) {
    const r=selectedRecipe, n=r.nutrition_per_serving||{};
    return (
      <div style={S.app}>
        <div style={S.header}><button style={{background:"none",border:"none",color:"#94a3b8",fontSize:15,cursor:"pointer"}} onClick={()=>setView("recipes")}>← Back</button><span style={{fontSize:15,fontWeight:700,flex:1,textAlign:"center",marginRight:48}}>{r.name}</span><button style={{background:"none",border:"none",color:"#3b82f6",fontSize:13,fontWeight:600,cursor:"pointer"}} onClick={()=>startEditRecipe(r)}>Edit</button></div>
        <div style={S.section}>
          {r.source?<div style={{fontSize:12,color:"#475569",marginBottom:12,paddingTop:2}}>Source: {r.source}</div>:null}
          <div style={S.card}><div style={{fontSize:11,fontWeight:700,color:"#475569",marginBottom:12,textTransform:"uppercase",letterSpacing:"0.05em"}}>Per serving ({r.servings} total)</div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:8,marginBottom:12}}>{MACROS.map(k=>(<div key={k} style={{textAlign:"center"}}><div style={{fontSize:15,fontWeight:700,color:NUTRIENT_META[k].color}}>{Math.round((n[k]??0)*10)/10}</div><div style={{fontSize:10,color:"#64748b"}}>{NUTRIENT_META[k].label}</div></div>))}</div>
            <div style={{borderTop:"1px solid #1e293b",paddingTop:10}}><div style={{fontSize:11,fontWeight:700,color:"#475569",marginBottom:8,textTransform:"uppercase",letterSpacing:"0.04em"}}>Key micros / serving</div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"4px 16px"}}>{["iron","calc","zinc","b12","omega3","fol"].map(k=>(<div key={k} style={{display:"flex",justifyContent:"space-between",fontSize:12}}><span style={{color:"#94a3b8"}}>{NUTRIENT_META[k].label}</span><span style={{color:NUTRIENT_META[k].color,fontWeight:600}}>{Math.round((n[k]??0)*10)/10}{NUTRIENT_META[k].unit}</span></div>))}</div>
            </div>
          </div>
          <div style={S.card}><div style={{fontSize:13,fontWeight:700,color:"#94a3b8",marginBottom:10,textTransform:"uppercase",letterSpacing:"0.05em"}}>Ingredients ({r.ingredients.length})</div>
            {r.ingredients.map((ing,i)=>{ const food=allFoods.find(f=>f.id===ing.foodId),ingCal=food?Math.round(food.cal*ing.amount_g/100):0; return (<div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 0",borderBottom:i<r.ingredients.length-1?"1px solid #1e293b":"none"}}><div><div style={{fontSize:13,color:"#e2e8f0"}}>{ing.foodName}</div><div style={{fontSize:11,color:"#64748b"}}>{ing.amount_g}g</div></div><span style={{fontSize:12,color:"#f59e0b",fontWeight:600}}>{ingCal} kcal</span></div>); })}
          </div>
          <button style={{width:"100%",padding:14,borderRadius:12,border:"none",background:"#3b82f6",color:"#fff",fontSize:15,fontWeight:700,cursor:"pointer",marginBottom:10}} onClick={()=>{setRecipeLogServings("1");setRecipeLogGrams("");setRecipeLogMode("servings");setRecipeLogMeal("Breakfast");setView("recipeLog");}}>Log Recipe</button>
          <button style={{width:"100%",padding:14,borderRadius:12,border:"1px solid #ef4444",background:"transparent",color:"#ef4444",fontSize:14,fontWeight:600,cursor:"pointer",marginBottom:20}} onClick={()=>deleteRecipe(r.id)}>Delete Recipe</button>
        </div>
        <BottomNav/>
      </div>
    );
  }

  // ── RECIPE LOG ────────────────────────────────────────────────────────
  if (view === "recipeLog" && selectedRecipe) {
    const r=selectedRecipe, rs=Math.max(Number(r.servings)||1,0.01), tw=(r.ingredients||[]).reduce((s,i)=>s+(Number(i.amount_g)||0),0);
    let frac=0; if(recipeLogMode==="servings") frac=(parseFloat(recipeLogServings)||0)/rs; else { const g=parseFloat(recipeLogGrams)||0; frac=tw>0?g/tw:0; }
    const previewNut={}; Object.keys(NUTRIENT_META).forEach(k=>previewNut[k]=0);
    r.ingredients.forEach(ing=>{const food=allFoods.find(f=>f.id===ing.foodId);if(!food)return;const m=(ing.amount_g*frac)/100;Object.keys(NUTRIENT_META).forEach(k=>{previewNut[k]+=(food[k]??0)*m;});});
    const perServingNut={}; Object.keys(NUTRIENT_META).forEach(k=>perServingNut[k]=0);
    r.ingredients.forEach(ing=>{const food=allFoods.find(f=>f.id===ing.foodId);if(!food)return;const m=(ing.amount_g/rs)/100;Object.keys(NUTRIENT_META).forEach(k=>{perServingNut[k]+=(food[k]??0)*m;});});
    const canLog=frac>0;
    return (
      <div style={S.app}>
        <div style={S.header}><button style={{background:"none",border:"none",color:"#94a3b8",fontSize:15,cursor:"pointer"}} onClick={()=>setView(recipeLogReturn)}>← Back</button><span style={{fontSize:15,fontWeight:700}}>Log Recipe</span><div style={{width:48}}/></div>
        <div style={{...S.section,paddingBottom:80}}>
          <div style={S.card}>
            <div style={{display:"flex",background:"#0a0f1a",borderRadius:10,padding:4,marginBottom:16}}>
              {[["servings","By Servings"],["grams","By Weight"]].map(([mode,label])=>(<button key={mode} style={{flex:1,padding:"8px 0",borderRadius:8,border:"none",cursor:"pointer",fontSize:13,fontWeight:600,background:recipeLogMode===mode?"#1d4ed8":"transparent",color:recipeLogMode===mode?"#fff":"#64748b"}} onClick={()=>setRecipeLogMode(mode)}>{label}</button>))}
            </div>
            {recipeLogMode==="servings"?(<>
              <label style={S.label}>Servings to log — 1 serving = {Math.round(perServingNut.cal??0)} kcal</label>
              <div style={{fontSize:11,color:"#475569",marginBottom:8}}>Recipe has {r.servings} {r.servings===1?"serving":"servings"} total</div>
              <input style={S.input} type="number" inputMode="decimal" value={recipeLogServings} onChange={e=>setRecipeLogServings(e.target.value)}/>
              <div style={{display:"flex",gap:6,marginTop:8,flexWrap:"wrap"}}>{[...new Set([0.5,...Array.from({length:r.servings},(_,i)=>i+1)])].map(q=>(<button key={q} style={S.pill(recipeLogServings===String(q))} onClick={()=>setRecipeLogServings(String(q))}>{q===0.5?"½":q}</button>))}</div>
            </>):(<>
              <label style={S.label}>Weight (g) — recipe ingredients total {tw}g</label>
              <input style={S.input} type="number" inputMode="numeric" value={recipeLogGrams} onChange={e=>setRecipeLogGrams(e.target.value)} placeholder={`e.g. ${Math.round(tw/r.servings)}`}/>
              <div style={{display:"flex",gap:6,marginTop:8,flexWrap:"wrap"}}>{[0.5,1,1.5].map(mult=>{const q=Math.round(tw*mult/r.servings);return q>0?<button key={mult} style={S.pill(recipeLogGrams===String(q))} onClick={()=>setRecipeLogGrams(String(q))}>{q}g</button>:null;})}</div>
              <div style={{fontSize:11,color:"#475569",marginTop:8}}>Based on raw ingredient weights</div>
            </>)}
            <div style={{background:"#0a0f1a",borderRadius:10,padding:12,margin:"16px 0"}}><div style={{fontSize:11,fontWeight:700,color:"#475569",marginBottom:8,textTransform:"uppercase"}}>Preview</div><div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:6}}>{MACROS.map(k=>(<div key={k} style={{textAlign:"center"}}><div style={{fontSize:14,fontWeight:700,color:NUTRIENT_META[k].color}}>{Math.round((previewNut[k]??0)*10)/10}</div><div style={{fontSize:10,color:"#64748b"}}>{NUTRIENT_META[k].label}</div></div>))}</div></div>
            <label style={S.label}>Meal</label>
            <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:12}}>{MEALS.map(m=><button key={m} style={S.pill(recipeLogMeal===m)} onClick={()=>setRecipeLogMeal(m)}>{m}</button>)}</div>
            <button style={{width:"100%",padding:14,borderRadius:12,border:"none",background:canLog?"#3b82f6":"#1e293b",color:canLog?"#fff":"#64748b",fontSize:15,fontWeight:700,cursor:"pointer"}} disabled={!canLog} onClick={logRecipe}>Add to {recipeLogMeal}</button>
          </div>
        </div>
        <BottomNav/>
      </div>
    );
  }

  // ── RECIPE LOG REVIEW (W1) ────────────────────────────────────────────
  // Shown after quantity picker; user adjusts ingredients before committing.
  // The saved recipe definition is never touched here.
  if (view === "recipeLogReview" && selectedRecipe) {
    const hasAny = recipeLogReviewIngredients.some(ing => ing.amount_g > 0);
    const nut = computeEntryNutrition(recipeLogReviewIngredients, allFoodsForRender);
    return (
      <div style={S.app}>
        <div style={S.header}>
          <button style={{background:"none",border:"none",color:"#94a3b8",fontSize:15,cursor:"pointer"}} onClick={() => setView("recipeLog")}>← Back</button>
          <span style={{fontSize:15,fontWeight:700}}>Review Ingredients</span>
          <div style={{width:48}}/>
        </div>
        <div style={{...S.section,paddingBottom:80}}>
          <div style={{background:"#1a0a2e",border:"1px solid #7c3aed",borderRadius:8,padding:"8px 12px",marginBottom:12,fontSize:12,color:"#a78bfa"}}>
            Step 2 of 2 — {recipeLogReviewIngredients.length} ingredient{recipeLogReviewIngredients.length===1?"":"s"} · adjust or tap Add to confirm
          </div>
          <div style={S.card}>
            {recipeLogReviewIngredients.length === 0 ? (
              <div style={{textAlign:"center",padding:"20px 0",color:"#ef4444",fontSize:13}}>All ingredients removed — restore at least one.</div>
            ) : recipeLogReviewIngredients.map((ing, idx) => {
              const food = allFoodsForRender.find(f => f.id === ing.foodId);
              const ingCal = food ? Math.round(food.cal * ing.amount_g / 100) : 0;
              return (
                <div key={idx} style={{display:"flex",alignItems:"center",gap:8,padding:"10px 0",borderBottom:idx<recipeLogReviewIngredients.length-1?"1px solid #1e293b":"none"}}>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontSize:13,color:"#e2e8f0",fontWeight:500,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{ing.foodName}</div>
                    <div style={{fontSize:11,color:"#64748b"}}>{ingCal} kcal</div>
                  </div>
                  <input
                    style={{...S.input,width:72,padding:"6px 8px",fontSize:13,textAlign:"right",flexShrink:0}}
                    type="number" inputMode="decimal" value={String(ing.amount_g)}
                    onChange={e => {
                      const v = Math.max(0, parseFloat(e.target.value) || 0);
                      setRecipeLogReviewIngredients(prev => prev.map((x,i) => i===idx ? {...x, amount_g:v} : x));
                    }}/>
                  <span style={{fontSize:11,color:"#64748b",flexShrink:0}}>g</span>
                  <button
                    style={{background:"none",border:"none",color:"#ef4444",fontSize:20,cursor:"pointer",padding:"4px 6px",flexShrink:0,lineHeight:1}}
                    onClick={() => setRecipeLogReviewIngredients(prev => prev.filter((_,i)=>i!==idx))}>×</button>
                </div>
              );
            })}
          </div>
          <div style={{background:"#0a0f1a",borderRadius:10,padding:12,margin:"12px 0"}}>
            <div style={{fontSize:11,fontWeight:700,color:"#475569",marginBottom:8,textTransform:"uppercase"}}>Preview</div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:6}}>
              {MACROS.map(k => (<div key={k} style={{textAlign:"center"}}><div style={{fontSize:14,fontWeight:700,color:NUTRIENT_META[k].color}}>{Math.round((nut[k]??0)*10)/10}</div><div style={{fontSize:10,color:"#64748b"}}>{NUTRIENT_META[k].label}</div></div>))}
            </div>
          </div>
          {!hasAny && recipeLogReviewIngredients.length > 0 && (
            <div style={{fontSize:12,color:"#ef4444",textAlign:"center",marginBottom:8}}>All quantities are zero — set at least one above 0.</div>
          )}
          <button
            style={{width:"100%",padding:14,borderRadius:12,border:"none",background:hasAny?"#3b82f6":"#1e293b",color:hasAny?"#fff":"#64748b",fontSize:15,fontWeight:700,cursor:hasAny?"pointer":"default",marginBottom:20}}
            disabled={!hasAny}
            onClick={() => commitLogRecipe(recipeLogReviewIngredients.filter(ing => ing.amount_g > 0))}>
            Add to {recipeLogMeal}
          </button>
        </div>
        <BottomNav/>
      </div>
    );
  }

  // ── RECIPE CREATE / EDIT ──────────────────────────────────────────────
  if (view === "recipeCreate") {
    const curServings=parseFloat(recipeInProgress.servings)||1;
    const previewNut=recipeInProgress.ingredients.length>0?calcRecipeNutritionPerServing(recipeInProgress.ingredients,curServings,allFoods):null;
    const canSave=recipeInProgress.name.trim().length>0&&recipeInProgress.ingredients.length>0;
    return (
      <div style={S.app}>
        <div style={S.header}><button style={{background:"none",border:"none",color:"#94a3b8",fontSize:15,cursor:"pointer"}} onClick={()=>{setEditingRecipeId(null);setView("recipes");}}>← Back</button><span style={{fontSize:15,fontWeight:700}}>{editingRecipeId?"Edit Recipe":"New Recipe"}</span><button style={{background:"none",border:"none",fontSize:13,fontWeight:700,cursor:"pointer",color:canSave?"#3b82f6":"#334155"}} onClick={saveRecipe} disabled={!canSave}>Save</button></div>
        <div style={S.section}>
          <div style={S.card}>
            <label style={S.label}>Recipe name *</label><input style={{...S.input,marginBottom:12}} placeholder="e.g. Red Lentil Dal" value={recipeInProgress.name} onChange={e=>setRecipeInProgress(p=>({...p,name:e.target.value}))}/>
            <label style={S.label}>Source (optional)</label><input style={{...S.input,marginBottom:12}} placeholder="e.g. Mum's recipe" value={recipeInProgress.source} onChange={e=>setRecipeInProgress(p=>({...p,source:e.target.value}))}/>
            <label style={S.label}>Number of servings</label><input style={{...S.input,marginBottom:6}} type="number" inputMode="decimal" value={recipeInProgress.servings} onChange={e=>setRecipeInProgress(p=>({...p,servings:e.target.value}))}/>
            <div style={{display:"flex",gap:6,marginTop:6,flexWrap:"wrap"}}>{[1,2,3,4,6,8].map(n=><button key={n} style={S.pill(recipeInProgress.servings===String(n))} onClick={()=>setRecipeInProgress(p=>({...p,servings:String(n)}))}>{n}</button>)}</div>
          </div>
          {previewNut&&(<div style={{...S.card,background:"#0a0f1a"}}><div style={{fontSize:11,fontWeight:700,color:"#475569",marginBottom:8,textTransform:"uppercase",letterSpacing:"0.05em"}}>Per serving preview</div><div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:6}}>{MACROS.map(k=>(<div key={k} style={{textAlign:"center"}}><div style={{fontSize:14,fontWeight:700,color:NUTRIENT_META[k].color}}>{Math.round((previewNut[k]??0)*10)/10}</div><div style={{fontSize:10,color:"#64748b"}}>{NUTRIENT_META[k].label}</div></div>))}</div></div>)}
          <div style={S.card}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}><div style={{fontSize:13,fontWeight:700,color:"#94a3b8",textTransform:"uppercase",letterSpacing:"0.05em"}}>Ingredients {recipeInProgress.ingredients.length>0?`(${recipeInProgress.ingredients.length})`:""}</div><button style={{background:"#1d4ed8",border:"none",color:"#fff",borderRadius:8,padding:"6px 12px",fontSize:12,fontWeight:600,cursor:"pointer"}} onClick={()=>{setRecipeIngSearch("");setRecipeIngSelected(null);setRecipeIngAmount("100");setView("recipeIngAdd");setTimeout(()=>recipeIngRef.current?.focus(),100);}}>+ Add</button></div>
            {recipeInProgress.ingredients.length===0?(<div style={{textAlign:"center",padding:"20px 0",color:"#475569",fontSize:13}}>No ingredients yet — tap + Add</div>):recipeInProgress.ingredients.map((ing,i)=>{const food=allFoods.find(f=>f.id===ing.foodId),ingCal=food?Math.round(food.cal*ing.amount_g/100):0;return(<div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 0",borderBottom:i<recipeInProgress.ingredients.length-1?"1px solid #1e293b":"none"}}><div style={{flex:1}}><div style={{fontSize:13,color:"#e2e8f0"}}>{ing.foodName}</div><div style={{fontSize:11,color:"#64748b"}}>{ing.amount_g}g · {ingCal} kcal</div></div><button style={{background:"none",border:"none",color:"#ef4444",fontSize:18,cursor:"pointer",padding:"4px 8px"}} onClick={()=>removeIngFromRecipe(i)}>×</button></div>);})}
          </div>
          {!canSave&&(<div style={{fontSize:12,color:"#475569",textAlign:"center",paddingBottom:20}}>{recipeInProgress.name.trim()===""?"Add a recipe name to save":"Add at least one ingredient to save"}</div>)}
        </div>
        <BottomNav/>
      </div>
    );
  }

  // ── RECIPE INGREDIENT ADD ─────────────────────────────────────────────
  if (view === "recipeIngAdd") {
    return (
      <div style={S.app}>
        <div style={S.header}><button style={{background:"none",border:"none",color:"#94a3b8",fontSize:15,cursor:"pointer"}} onClick={()=>{setRecipeIngSelected(null);setRecipeIngSearch("");setView("recipeCreate");}}>← Back</button><span style={{fontSize:15,fontWeight:700}}>{recipeIngSelected?"Set Amount":"Add Ingredient"}</span>{!recipeIngSelected?<button style={{background:"none",border:"none",color:"#3b82f6",fontSize:13,cursor:"pointer",fontWeight:600}} onClick={()=>setView("customAdd")}>+ Custom</button>:<div style={{width:64}}/>}</div>
        {!recipeIngSelected ? (
          <div style={S.section}>
            <input ref={recipeIngRef} style={S.input} placeholder="Search foods…" value={recipeIngSearch} onChange={e=>setRecipeIngSearch(e.target.value)} autoFocus/>
            <div style={{marginTop:12,maxHeight:"calc(100vh - 160px)",overflowY:"auto"}}>
              {Object.entries(groupedIngByCategory).map(([cat,foods])=>(<div key={cat}><div style={{fontSize:11,fontWeight:700,color:"#475569",padding:"10px 0 4px",letterSpacing:"0.05em",textTransform:"uppercase"}}>{cat}</div>{foods.map(f=>(<div key={f.id} style={{...S.srchItem,contentVisibility:"auto",containIntrinsicSize:"0 48px"}} onClick={()=>setRecipeIngSelected(f)}><span style={{fontSize:12,color:"#f59e0b",float:"right"}}>{f.cal} kcal/100g</span><div style={{fontSize:14,fontWeight:500,color:"#e2e8f0"}}>{f.name}</div>{f.source&&f.source!=="usda"&&<div style={{fontSize:11,color:"#475569",marginTop:1}}>Source: {f.source.toUpperCase()}</div>}</div>))}</div>))}
              {filteredIngFoods.length===0&&<div style={{padding:20,textAlign:"center",color:"#475569",fontSize:14}}>No foods found for "{recipeIngSearch}"</div>}
            </div>
          </div>
        ) : (
          <div style={S.section}>
            <div style={S.card}>
              <div style={{fontSize:16,fontWeight:700,marginBottom:4}}>{recipeIngSelected.name}</div><div style={{fontSize:12,color:"#64748b",marginBottom:16}}>{recipeIngSelected.cat}</div>
              <label style={S.label}>Amount (g)</label>
              <input style={S.input} type="number" inputMode="numeric" value={recipeIngAmount} onChange={e=>setRecipeIngAmount(e.target.value)}/>
              <div style={{display:"flex",gap:6,marginTop:8,flexWrap:"wrap",marginBottom:16}}>{[25,50,100,150,200,250,300,400,500].map(q=><button key={q} style={S.pill(recipeIngAmount===String(q))} onClick={()=>setRecipeIngAmount(String(q))}>{q}</button>)}</div>
              <div style={{background:"#0a0f1a",borderRadius:10,padding:12,marginBottom:16}}><div style={{fontSize:11,fontWeight:700,color:"#475569",marginBottom:8,textTransform:"uppercase"}}>Preview</div><div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:6}}>{MACROS.map(k=>{const val=(recipeIngSelected[k]??0)*(parseFloat(recipeIngAmount)||0)/100;return(<div key={k} style={{textAlign:"center"}}><div style={{fontSize:14,fontWeight:700,color:NUTRIENT_META[k].color}}>{Math.round(val*10)/10}</div><div style={{fontSize:10,color:"#64748b"}}>{NUTRIENT_META[k].label}</div></div>);})}</div></div>
              <button style={{width:"100%",padding:14,borderRadius:12,border:"none",background:(parseFloat(recipeIngAmount)||0)>0?"#3b82f6":"#1e293b",color:(parseFloat(recipeIngAmount)||0)>0?"#fff":"#64748b",fontSize:15,fontWeight:700,cursor:"pointer"}} disabled={(parseFloat(recipeIngAmount)||0)<=0} onClick={addIngredientToRecipe}>Add to Recipe</button>
            </div>
          </div>
        )}
        <BottomNav/>
      </div>
    );
  }
  // ── EXERCISE ──────────────────────────────────────────────────────────
  if (view === "exercise") {
    const wt=parseFloat(profile.weightKg)||70, act=EXERCISE_ACTIVITIES.find(a=>a.id===exActivity);
    const dur=parseFloat(exDuration)||0, autoBurn=Math.round(act.met*wt*(dur/60));
    const burn=exBurnEdit!==""?parseInt(exBurnEdit)||0:autoBurn;
    const actGroups=EXERCISE_ACTIVITIES.reduce((acc,a)=>{if(!acc[a.label])acc[a.label]=[];acc[a.label].push(a);return acc;},{});
    return (
      <div style={S.app}>
        <div style={S.header}><button style={{background:"none",border:"none",color:"#94a3b8",fontSize:15,cursor:"pointer"}} onClick={()=>setView("log")}>← Back</button><span style={{fontSize:15,fontWeight:700}}>Log Exercise</span><div style={{width:48}}/></div>
        <div style={S.section}>
          {!profile.weightKg&&<div style={{background:"#2d1f00",border:"1px solid #f59e0b",borderRadius:10,padding:"10px 14px",marginBottom:12,fontSize:12,color:"#f59e0b"}}>No weight set in Settings — using 70kg default</div>}
          <div style={S.card}>
            <label style={S.label}>Activity</label>
            {Object.entries(actGroups).map(([grp,acts])=>(<div key={grp} style={{marginBottom:10}}><div style={{fontSize:11,color:"#475569",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.05em",marginBottom:6}}>{grp}</div><div style={{display:"flex",gap:6,flexWrap:"wrap"}}>{acts.map(a=><button key={a.id} style={S.pill(exActivity===a.id)} onClick={()=>{setExActivity(a.id);setExBurnEdit("");}}>{a.intensity}</button>)}</div></div>))}
            <label style={{...S.label,marginTop:8}}>Duration (minutes)</label>
            <input style={S.input} type="number" inputMode="numeric" value={exDuration} onChange={e=>{setExDuration(e.target.value);setExBurnEdit("");}}/>
            <div style={{display:"flex",gap:6,marginTop:8,flexWrap:"wrap",marginBottom:16}}>{[30,45,60,90,120,180].map(d=><button key={d} style={S.pill(exDuration===String(d)&&exBurnEdit==="")} onClick={()=>{setExDuration(String(d));setExBurnEdit("");}}>{d}</button>)}</div>
            <div style={{background:"#0a0f1a",borderRadius:10,padding:14,marginBottom:16}}>
              <div style={{fontSize:11,fontWeight:700,color:"#475569",marginBottom:10,textTransform:"uppercase"}}>Estimated Burn</div>
              <div style={{display:"flex",alignItems:"center",gap:12}}><div style={{fontSize:32,fontWeight:700,color:"#4ade80"}}>{burn}</div><div style={{fontSize:12,color:"#64748b"}}>kcal<br/>{act.label} · {act.intensity}<br/>{dur} min @ MET {act.met}</div></div>
              <div style={{marginTop:12}}><label style={S.label}>Override (optional)</label><input style={S.input} type="number" inputMode="numeric" placeholder={"Auto: "+autoBurn+" kcal"} value={exBurnEdit} onChange={e=>setExBurnEdit(e.target.value)}/></div>
            </div>
            <button style={{width:"100%",padding:14,borderRadius:12,border:"none",background:dur>0?"#16a34a":"#1e293b",color:dur>0?"#fff":"#64748b",fontSize:15,fontWeight:700,cursor:"pointer"}} disabled={dur<=0} onClick={()=>addExercise(exBurnEdit!==""?parseInt(exBurnEdit)||autoBurn:undefined)}>Log Exercise</button>
          </div>
        </div>
      </div>
    );
  }

  // ── CUSTOM FOOD ───────────────────────────────────────────────────────
  if (view === "customAdd") {
    const fields=[{k:"cal",l:"Calories (kcal)"},{k:"pro",l:"Protein (g)"},{k:"carb",l:"Carbs (g)"},{k:"fat",l:"Fat (g)"},{k:"fib",l:"Fibre (g)"},{k:"iron",l:"Iron (mg)"},{k:"calc",l:"Calcium (mg)"},{k:"zinc",l:"Zinc (mg)"},{k:"b12",l:"B12 (mcg)"},{k:"vitD",l:"Vitamin D (mcg)"},{k:"omega3",l:"Omega-3 (g)"},{k:"iod",l:"Iodine (mcg)"},{k:"sel",l:"Selenium (mcg)"},{k:"mag",l:"Magnesium (mg)"},{k:"pot",l:"Potassium (mg)"},{k:"fol",l:"Folate (mcg)"}];
    return (
      <div style={S.app}>
        <div style={S.header}><button style={{background:"none",border:"none",color:"#94a3b8",fontSize:15,cursor:"pointer"}} onClick={()=>setView("add")}>← Back</button><span style={{fontSize:15,fontWeight:700}}>Add Custom Food</span><div style={{width:48}}/></div>
        <div style={S.section}><div style={S.card}>
          <div style={{fontSize:12,color:"#64748b",marginBottom:12}}>All values per 100g or 100ml.</div>
          <label style={S.label}>Food name *</label><input style={{...S.input,marginBottom:12}} placeholder="e.g. Alpro Oat Yogurt" value={cf.name} onChange={e=>setCf(p=>({...p,name:e.target.value}))}/>
          {fields.map(({k,l})=>(<div key={k} style={S.cfRow}><span style={{fontSize:13,color:"#e2e8f0",width:160}}>{l}</span><input style={{...S.input,width:90,textAlign:"right",padding:"8px 12px"}} type="number" inputMode="decimal" placeholder="0" value={cf[k]} onChange={e=>setCf(p=>({...p,[k]:e.target.value}))}/></div>))}
          <button style={{width:"100%",marginTop:16,padding:14,borderRadius:12,border:"none",background:cf.name.trim()&&cf.cal?"#3b82f6":"#1e293b",color:cf.name.trim()&&cf.cal?"#fff":"#64748b",fontSize:15,fontWeight:700,cursor:"pointer"}} onClick={saveCustomFood} disabled={!cf.name.trim()||!cf.cal}>Save Food</button>
        </div></div>
      </div>
    );
  }

  // ── GOALS ─────────────────────────────────────────────────────────────
  if (view === "goals") {
    const wt  = parseFloat(profile.weightKg) || 70;
    const ht  = parseFloat(profile.heightCm)  || 170;
    const hasProfile = !!(profile.weightKg && profile.heightCm && profile.age && profile.sex);
    const proMultiplierDisplay = Math.min(2.0, 1.0 + exerciseBurn / (resolvedGoals.cal || 2000));
    const sections = [{ title:"Macros", keys:MACROS }, { title:"Micros", keys:MICROS }];
    return (
      <div style={S.app}>
        <div style={S.header}><span style={{fontSize:17,fontWeight:700}}>Daily Goals</span></div>
        <div style={S.section}>
          {!hasProfile && (
            <div style={{background:"#1c1200",border:"1px solid #854d0e",borderRadius:10,padding:"10px 14px",marginBottom:12,fontSize:12,color:"#fbbf24"}}>
              ⚠️ Complete your profile (Settings → Profile) for accurate auto-computed goals.
            </div>
          )}
          <details style={{marginBottom:12}}>
            <summary style={{listStyle:"none",outline:"none",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 14px",background:"#0f172a",borderRadius:10,border:"1px solid #1e293b",userSelect:"none"}}>
              <span style={{fontSize:13,fontWeight:600,color:"#94a3b8"}}>How goals are calculated</span>
              <span style={{fontSize:16,color:"#475569",fontWeight:700,lineHeight:1}}>ⓘ</span>
            </summary>
            <div style={{background:"#0f172a",borderRadius:"0 0 10px 10px",padding:"10px 14px 12px",border:"1px solid #1e293b",borderTop:"none",marginTop:-1}}>
              <div style={{fontSize:12,color:"#64748b",lineHeight:1.6,marginBottom:hasProfile?10:0}}>Goals are computed from your profile using BMR/TDEE formulas and vegan-adjusted RDAs. Override any value by typing in the field — it highlights in amber. Tap ↺ to restore.</div>
              {hasProfile && (
                <div style={{padding:"8px 10px",background:"#0a0f1a",borderRadius:8,fontSize:12,color:"#94a3b8"}}>
                  <div>BMR: {Math.round((10*wt)+(6.25*ht)-(5*(parseFloat(profile.age)||30))+((profile.sex!=="Female")?5:-161))} kcal · TDEE base: {goals.cal} kcal</div>
                  <div style={{marginTop:4}}>Protein base: {goals.pro}g ({wt}kg × 1g/kg){exerciseBurn>0&&<span style={{color:"#4ade80"}}> → {Math.round(goals.pro*proMultiplierDisplay)}g today ({proMultiplierDisplay.toFixed(2)}× multiplier)</span>}</div>
                  <div style={{marginTop:4,color:"#64748b"}}>Fat: {goals.fat}g (25% TDEE ÷ 9) · Carbs: {goals.carb}g (residual) · Fibre: {goals.fib}g (14g/1000kcal)</div>
                </div>
              )}
            </div>
          </details>
          {sections.map(({ title, keys }) => (
            <div key={title} style={{...S.card,marginTop:12}}>
              <div style={{fontSize:13,fontWeight:700,color:"#94a3b8",marginBottom:12,textTransform:"uppercase",letterSpacing:"0.05em"}}>{title}</div>
              {keys.map(k => {
                const meta = NUTRIENT_META[k];
                const computed = goals[k] ?? 0;
                const override = goalOverrides[k];
                const hasOverride = override != null;
                return (
                  <div key={k} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 0",borderBottom:"1px solid #1e293b"}}>
                    <div style={{flex:1}}>
                      <div style={{fontSize:14,fontWeight:500,color:"#e2e8f0"}}>{meta.label}</div>
                      <div style={{fontSize:11,color:hasOverride?"#f59e0b":"#475569"}}>{meta.unit}{hasOverride&&" · override"}</div>
                    </div>
                    <div style={{display:"flex",alignItems:"center",gap:6}}>
                      {hasOverride && (
                        <button style={{background:"none",border:"1px solid #334155",color:"#475569",fontSize:11,cursor:"pointer",padding:"3px 7px",borderRadius:6}} onClick={() => setGoalOverrides(p => { const n={...p}; delete n[k]; return n; })}>↺ {computed}</button>
                      )}
                      <input
                        style={{...S.input,width:90,textAlign:"right",padding:"8px 12px",borderColor:hasOverride?"#f59e0b":"#1e293b"}}
                        type="number" inputMode="decimal"
                        placeholder={String(computed)}
                        value={hasOverride ? String(override) : ""}
                        onChange={e => {
                          const v = e.target.value;
                          if (v === "") setGoalOverrides(p => { const n={...p}; delete n[k]; return n; });
                          else setGoalOverrides(p => ({ ...p, [k]: parseFloat(v) || 0 }));
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
          {Object.keys(goalOverrides).length > 0 && (
            <button style={{width:"100%",padding:12,borderRadius:10,border:"1px solid #334155",background:"transparent",color:"#ef4444",fontSize:13,fontWeight:600,cursor:"pointer",marginTop:12,marginBottom:4}} onClick={() => setGoalOverrides({})}>Reset all overrides to computed values</button>
          )}
          <div style={{...S.card,marginTop:12}}>
            <div style={{fontSize:13,fontWeight:700,color:"#94a3b8",marginBottom:8,textTransform:"uppercase",letterSpacing:"0.05em"}}>Exercise Refuel Ratio</div>
            <div style={{fontSize:11,color:"#475569",marginBottom:12}}>How exercise calories are split across macros. Must sum to 100. Protein uses a dynamic 1×–2× multiplier instead.</div>
            {[{key:"carb",label:"Carbs (%)",color:NUTRIENT_META.carb.color},{key:"fat",label:"Fat (%)",color:NUTRIENT_META.fat.color},{key:"pro",label:"Protein (%)",color:NUTRIENT_META.pro.color}].map(({key,label,color})=>(<div key={key} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"8px 0",borderBottom:"1px solid #1e293b"}}><div style={{display:"flex",alignItems:"center",gap:8}}><div style={{width:10,height:10,borderRadius:2,background:color,flexShrink:0}}/><div style={{fontSize:14,fontWeight:500,color:"#e2e8f0"}}>{label}</div></div><input style={{...S.input,width:70,textAlign:"right",padding:"8px 12px"}} type="number" inputMode="numeric" value={exRatio[key]} onChange={e=>setExRatio(prev=>({...prev,[key]:parseInt(e.target.value)||0}))}/></div>))}
            {(()=>{const s=exRatio.carb+exRatio.fat+exRatio.pro,ok=s===100;return(<div style={{padding:"8px 0",fontSize:13,fontWeight:600,color:ok?"#10b981":"#ef4444",textAlign:"right"}}>Sum: {s} {ok?"✓":"needs to equal 100"}</div>);})()}
          </div>
        </div>
        <BottomNav/>
      </div>
    );
  }
  // ── EXPORT ────────────────────────────────────────────────────────────
  const handleExportData = () => {
    const exportedAt = new Date();
    const exportDateStr = dateKey(exportedAt);

    // ── Gather all days that have at least one non-exercise entry ──────
    // (exercise entries contribute to exercise_kcal column but we still
    //  include days that have only exercise + no food if exercise_kcal > 0)
    const allDayKeys = Object.keys(logs).filter(dk => (logs[dk]||[]).length > 0).sort();

    // ── Build per-day nutrient totals (food only, supplements separate) ─
    const csvRows = [];
    for (const dk of allDayKeys) {
      const dayEntries = logs[dk] || [];
      // Food nutrients (excludes supplements and exercise)
      const food = {}; NUTRIENT_ALL_KEYS.forEach(k => food[k] = 0);
      // Supplement nutrients — keyed by nutrient key
      const supp = {}; NUTRIENT_ALL_KEYS.forEach(k => supp[k] = 0);
      // Exercise kcal
      let exercise_kcal = 0;

      for (const e of dayEntries) {
        if (e.type === "exercise") {
          exercise_kcal += (e.calories_burned || 0);
          continue;
        }
        if (e.type === "supplement") {
          (e.items || []).forEach(item => {
            Object.keys(item.nutrients || {}).forEach(k => {
              if (NUTRIENT_ALL_KEYS.includes(k)) supp[k] += (item.nutrients[k] ?? 0);
            });
          });
          continue;
        }
        // food or recipe
        if (e.type === "recipe") {
          (e.derivedIngredients || []).forEach(ing => {
            const m = ing.amount_g / 100;
            if (ing.snapshot) { NUTRIENT_ALL_KEYS.forEach(k => { food[k] += (ing.snapshot[k] ?? 0) * m; }); }
            else { const f = allFoods.find(x => x.id === ing.foodId); if (!f) return; NUTRIENT_ALL_KEYS.forEach(k => { food[k] += (f[k] ?? 0) * m; }); }
          });
        } else {
          const m = (e.amount || 0) / 100;
          if (e.snapshot) { NUTRIENT_ALL_KEYS.forEach(k => { food[k] += (e.snapshot[k] ?? 0) * m; }); }
          else { const f = allFoods.find(x => x.id === e.foodId); if (!f) continue; NUTRIENT_ALL_KEYS.forEach(k => { food[k] += (f[k] ?? 0) * m; }); }
        }
      }

      // Only include the day if there is something logged
      const hasFood = NUTRIENT_ALL_KEYS.some(k => food[k] > 0);
      const hasSupp = NUTRIENT_ALL_KEYS.some(k => supp[k] > 0);
      if (!hasFood && !hasSupp && exercise_kcal === 0) continue;

      // Round helper — empty string for true zero (no entry vs logged zero)
      const fmt = v => v === 0 ? "" : String(Math.round(v * 1000) / 1000);

      csvRows.push({
        date:         dk,
        cal:          fmt(food.cal),
        protein_g:    fmt(food.pro),
        carbs_g:      fmt(food.carb),
        fat_g:        fmt(food.fat),
        fibre_g:      fmt(food.fib),
        iron_mg:      fmt(food.iron),
        calcium_mg:   fmt(food.calc),
        zinc_mg:      fmt(food.zinc),
        b12_mcg:      fmt(food.b12),
        vitD_mcg:     fmt(food.vitD),
        omega3_g:     fmt(food.omega3),
        iodine_mcg:   fmt(food.iod),
        selenium_mcg: fmt(food.sel),
        magnesium_mg: fmt(food.mag),
        potassium_mg: fmt(food.pot),
        folate_mcg:   fmt(food.fol),
        // Supplement columns — separate from food totals (council-mandated)
        supp_b12_mcg:   fmt(supp.b12),
        supp_vitD_mcg:  fmt(supp.vitD),
        supp_iron_mg:   fmt(supp.iron),
        supp_iodine_mcg:fmt(supp.iod),
        supp_omega3_g:  fmt(supp.omega3),
        // Additional supplement nutrients that the system can track
        supp_cal_kcal:  fmt(supp.cal),
        supp_protein_g: fmt(supp.pro),
        supp_zinc_mg:   fmt(supp.zinc),
        supp_calc_mg:   fmt(supp.calc),
        supp_mag_mg:    fmt(supp.mag),
        supp_pot_mg:    fmt(supp.pot),
        supp_fol_mcg:   fmt(supp.fol),
        supp_sel_mcg:   fmt(supp.sel),
        exercise_kcal:  fmt(exercise_kcal),
      });
    }

    // ── Build CSV string ───────────────────────────────────────────────
    const csvEscape = v => { const s = String(v); return s.includes(",") || s.includes('"') || s.includes('\n') ? `"${s.replace(/"/g, '""')}"` : s; };
    const csvHeaders = ["date","cal","protein_g","carbs_g","fat_g","fibre_g","iron_mg","calcium_mg","zinc_mg","b12_mcg","vitD_mcg","omega3_g","iodine_mcg","selenium_mcg","magnesium_mg","potassium_mg","folate_mcg","supp_b12_mcg","supp_vitD_mcg","supp_iron_mg","supp_iodine_mcg","supp_omega3_g","supp_cal_kcal","supp_protein_g","supp_zinc_mg","supp_calc_mg","supp_mag_mg","supp_pot_mg","supp_fol_mcg","supp_sel_mcg","exercise_kcal"];
    const csvBody = [csvHeaders.join(","), ...csvRows.map(row => csvHeaders.map(h => csvEscape(row[h] ?? "")).join(","))].join("\n");

    // ── Build JSON object ──────────────────────────────────────────────
    const jsonObj = {
      version: "1.0",
      exported_at: exportedAt.toISOString(),
      logs,
      recipes,
      customFoods,
      profile,
      exRatio,
      supplementStacks,
      notionStatus: { lastSyncedAt },
    };

    // ── Bundle both files into a single zip and trigger one download ───
    const zipFilename = `nutritrack-${exportDateStr}.zip`;
    const csvFilename  = `nutritrack-daily-${exportDateStr}.csv`;
    const jsonFilename = `nutritrack-full-${exportDateStr}.json`;

    const sortedDays = allDayKeys.filter(dk => csvRows.find(r => r.date === dk));

    const doZipDownload = (JSZip) => {
      const zip = new JSZip();
      zip.file(csvFilename,  csvBody);
      zip.file(jsonFilename, JSON.stringify(jsonObj, null, 2));
      zip.generateAsync({ type: "blob" }).then(blob => {
        const url = URL.createObjectURL(blob);
        const a   = document.createElement("a");
        a.href = url; a.download = zipFilename;
        document.body.appendChild(a); a.click();
        document.body.removeChild(a);
        setTimeout(() => URL.revokeObjectURL(url), 10000);
        // ── Persist timestamp & show confirmation only on success ──────
        const isoNow = exportedAt.toISOString();
        setLastExportedAt(isoNow);
        saveData(STORAGE_KEYS.lastExportedAt, isoNow);
        setExportConfirm({
          zipFile:     zipFilename,
          csvFile:     csvFilename,
          jsonFile:    jsonFilename,
          csvRows:     csvRows.length,
          jsonEntries: Object.values(logs).flat().length,
          dateFrom:    sortedDays.length > 0 ? sortedDays[0] : null,
          dateTo:      sortedDays.length > 0 ? sortedDays[sortedDays.length - 1] : null,
        });
      });
    };

    // Load JSZip from cdnjs if not already present, then zip
    if (window.JSZip) {
      doZipDownload(window.JSZip);
    } else {
      const script = document.createElement("script");
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js";
      script.onload = () => doZipDownload(window.JSZip);
      script.onerror = () => alert("Export failed: JSZip could not be loaded. Connect to the internet and try again.");
      document.head.appendChild(script);
    }
  };

  // ── SETTINGS ──────────────────────────────────────────────────────────
  if (view === "settings") {
    const formatSyncTime = iso => { if(!iso)return"Never"; const d=new Date(iso); return d.toLocaleDateString("en-GB",{day:"numeric",month:"short"})+" at "+d.toLocaleTimeString("en-GB",{hour:"2-digit",minute:"2-digit"}); };
    return (
      <div style={S.app}>
        {globalBanners}
        <div style={S.header}><span style={{fontSize:17,fontWeight:700}}>Settings</span></div>
        <div style={S.section}>

          {/* Profile */}
          <div style={{fontSize:13,fontWeight:700,color:"#94a3b8",textTransform:"uppercase",letterSpacing:"0.05em",marginBottom:10,marginTop:4}}>Profile</div>
          <div style={S.card}>
            <div style={{fontSize:12,color:"#64748b",marginBottom:16}}>Used to personalise exercise calorie burn estimates.</div>
            <label style={S.label}>Name</label><input style={{...S.input,marginBottom:16}} placeholder="e.g. Nick" value={profile.name} onChange={e=>setProfile(p=>({...p,name:e.target.value}))}/>
            <label style={S.label}>Weight (kg)</label><input style={{...S.input,marginBottom:16}} type="number" inputMode="decimal" placeholder="e.g. 75" value={profile.weightKg} onChange={e=>setProfile(p=>({...p,weightKg:e.target.value}))}/>
            <label style={S.label}>Height (cm)</label><input style={{...S.input,marginBottom:16}} type="number" inputMode="decimal" placeholder="e.g. 175" value={profile.heightCm||""} onChange={e=>setProfile(p=>({...p,heightCm:e.target.value}))}/>
            <label style={S.label}>Age</label><input style={{...S.input,marginBottom:16}} type="number" inputMode="numeric" placeholder="e.g. 30" value={profile.age} onChange={e=>setProfile(p=>({...p,age:e.target.value}))}/>
            <label style={S.label}>Sex</label>
            <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>{["Male","Female","Other","Prefer not to say"].map(opt=>(<button key={opt} style={S.pill(profile.sex===opt)} onClick={()=>setProfile(p=>({...p,sex:opt}))}>{opt}</button>))}</div>
          </div>
          {(profile.name||profile.weightKg)&&(<div style={{...S.card,background:"#0f172a"}}><div style={{fontSize:13,fontWeight:700,color:"#94a3b8",marginBottom:10,textTransform:"uppercase",letterSpacing:"0.05em"}}>Summary</div>{profile.name&&<div style={{fontSize:14,color:"#e2e8f0",marginBottom:4}}>👤 {profile.name}</div>}{profile.weightKg&&<div style={{fontSize:14,color:"#e2e8f0",marginBottom:4}}>⚖️ {profile.weightKg} kg</div>}{profile.heightCm&&<div style={{fontSize:14,color:"#e2e8f0",marginBottom:4}}>📏 {profile.heightCm} cm</div>}{profile.age&&<div style={{fontSize:14,color:"#e2e8f0",marginBottom:4}}>🎂 {profile.age} years old</div>}{profile.sex&&<div style={{fontSize:14,color:"#e2e8f0",marginBottom:4}}>⚧ {profile.sex}</div>}{(!profile.weightKg||!profile.heightCm)&&<div style={{fontSize:12,color:"#f59e0b",marginTop:6}}>⚠️ Add weight and height to enable accurate goal computation</div>}</div>)}

          {/* Display Mode (W5) */}
          <div style={{fontSize:13,fontWeight:700,color:"#94a3b8",textTransform:"uppercase",letterSpacing:"0.05em",marginBottom:10,marginTop:16}}>Display</div>
          <div style={S.card}>
            <div style={{fontSize:12,color:"#64748b",marginBottom:14}}>Advanced mode shows data-quality indicators (e.g. unknown-contribution arcs on nutrient rings). Simplified mode hides these — tap a ring to see details.</div>
            <div style={{display:"flex",gap:8}}>
              {[["advanced","Advanced"],["simplified","Simplified"]].map(([val,label])=>(
                <button key={val} style={{flex:1,padding:"10px 0",borderRadius:10,border:"none",background:displayMode===val?"#3b82f6":"#1e293b",color:displayMode===val?"#fff":"#64748b",fontSize:13,fontWeight:700,cursor:"pointer"}} onClick={()=>setDisplayMode(val)}>{label}</button>
              ))}
            </div>
          </div>

          {/* Supplements */}
          <div style={{fontSize:13,fontWeight:700,color:"#94a3b8",textTransform:"uppercase",letterSpacing:"0.05em",marginBottom:10,marginTop:16}}>Supplements</div>
          <div style={S.card}>
            <div style={{fontSize:12,color:"#64748b",marginBottom:12}}>Define supplement stacks to log quickly. Nutrient contributions are added to daily totals.</div>
            {supplementStacks.map(stack=>(
              <div key={stack.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 0",borderBottom:"1px solid #1e293b",cursor:"pointer"}} onClick={()=>openStackEditor(stack)}>
                <div><div style={{fontSize:14,fontWeight:600,color:"#c4b5fd"}}>💊 {stack.name}</div><div style={{fontSize:12,color:"#64748b",marginTop:2}}>{stack.items.length===0?"Empty — tap to add items":`${stack.items.length} item${stack.items.length===1?"":"s"}`}</div></div>
                <div style={{color:"#475569",fontSize:16}}>›</div>
              </div>
            ))}
            <button style={{width:"100%",marginTop:12,padding:10,borderRadius:10,border:"1px dashed #334155",background:"transparent",color:"#94a3b8",fontSize:13,fontWeight:600,cursor:"pointer"}} onClick={()=>openStackEditor(null)}>+ Add stack</button>
          </div>

          {/* Notion Sync */}
          <div style={{fontSize:13,fontWeight:700,color:"#94a3b8",textTransform:"uppercase",letterSpacing:"0.05em",marginBottom:10,marginTop:16}}>Notion Recipe Import</div>
          <div style={S.card}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",paddingBottom:12,marginBottom:12,borderBottom:"1px solid #1e293b"}}><span style={{fontSize:13,color:"#94a3b8"}}>Last synced</span><span style={{fontSize:13,color:lastSyncedAt?"#10b981":"#475569",fontWeight:600}}>{formatSyncTime(lastSyncedAt)}</span></div>
            {syncQueue.length>0&&(<div style={{background:"#1c1a00",border:"1px solid #854d0e",borderRadius:10,padding:"10px 14px",marginBottom:12,display:"flex",justifyContent:"space-between",alignItems:"center"}}><div><div style={{fontSize:13,color:"#fbbf24",fontWeight:600}}>⏳ {syncQueue.length} {syncQueue.length===1?"request":"requests"} queued</div><div style={{fontSize:11,color:"#78716c",marginTop:2}}>Will process when back online</div></div><button style={{background:"none",border:"1px solid #854d0e",borderRadius:8,color:"#f59e0b",fontSize:11,fontWeight:600,padding:"4px 10px",cursor:"pointer"}} onClick={clearSyncQueue}>Clear</button></div>)}
            {notionSyncMsg&&(<div style={{background:notionSyncMsg.type==="error"?"#2d0f0f":"#0f1f2d",border:`1px solid ${notionSyncMsg.type==="error"?"#7f1d1d":"#1d4ed8"}`,borderRadius:10,padding:"10px 14px",marginBottom:12,fontSize:13,color:notionSyncMsg.type==="error"?"#fca5a5":"#93c5fd"}}>{notionSyncMsg.text}</div>)}
            {syncProgress&&(<div style={{background:"#0f1f2d",border:"1px solid #1d4ed8",borderRadius:10,padding:"12px 14px",marginBottom:12}}><div style={{fontSize:13,color:"#93c5fd",fontWeight:600,marginBottom:6}}>{syncProgress.phase==="connecting"&&"Connecting to Notion…"}{syncProgress.phase==="listing"&&"Looking for new and changed recipes…"}{syncProgress.phase==="fetching"&&`Fetching ${syncProgress.current} of ${syncProgress.total} recipes…`}{syncProgress.phase==="parsing"&&`Parsing ingredients (${syncProgress.current} of ${syncProgress.total})…`}</div>{syncProgress.total>0&&(<div style={{height:6,borderRadius:3,background:"#1e293b",overflow:"hidden"}}><div style={{height:"100%",background:"#3b82f6",borderRadius:3,width:`${Math.round((syncProgress.current/Math.max(syncProgress.total,1))*100)}%`,transition:"width 0.3s ease"}}/></div>)}</div>)}
            <button style={{width:"100%",padding:14,borderRadius:12,border:"none",background:(syncInProgress||!isOnline)?"#1e293b":"#7c3aed",color:(syncInProgress||!isOnline)?"#64748b":"#fff",fontSize:15,fontWeight:700,cursor:(syncInProgress||!isOnline)?"default":"pointer",marginBottom:8}} disabled={syncInProgress||!isOnline} onClick={handleWorkerSync}>{syncInProgress?"Syncing…":(lastSyncedAt?"Sync new and changed recipes":"Sync all recipes from Notion")}</button>
            <div style={{display:"flex",gap:8,marginBottom:14}}>
              <button style={{flex:1,padding:"10px 12px",borderRadius:10,border:"1px solid #334155",background:"transparent",color:(syncInProgress||!isOnline)?"#475569":"#94a3b8",fontSize:12,fontWeight:600,cursor:(syncInProgress||!isOnline)?"default":"pointer"}} disabled={syncInProgress||!isOnline} onClick={handleTestConnection}>Test connection</button>
              {lastSyncedAt&&(<button style={{flex:1,padding:"10px 12px",borderRadius:10,border:"1px solid #334155",background:"transparent",color:syncInProgress?"#475569":"#94a3b8",fontSize:12,fontWeight:600,cursor:syncInProgress?"default":"pointer"}} disabled={syncInProgress} onClick={handleResetSyncHistory}>Reset sync history</button>)}
            </div>
            <details style={{marginTop:6}}>
              <summary style={{fontSize:12,color:"#64748b",cursor:"pointer",padding:"8px 0",listStyle:"none",outline:"none",userSelect:"none"}}>▸ Manual import (fallback)</summary>
              <div style={{marginTop:8}}><div style={{background:"#451a03",border:"1px solid #92400e",borderRadius:8,padding:"10px 12px",marginBottom:10,fontSize:12,color:"#fcd34d",lineHeight:1.5}}>⚠️ Paste-based import requires Claude API access, which is not available in the deployed app. Use "Sync from Notion" instead. This feature will be migrated to the regex parser in a future update.</div><div style={{fontSize:11,color:"#64748b",marginBottom:8,lineHeight:1.5}}>Paste ingredient text from any source.</div>
                <textarea style={{width:"100%",background:"#1e293b",border:"1px solid #334155",borderRadius:10,padding:"12px 14px",color:"#e2e8f0",fontSize:13,outline:"none",boxSizing:"border-box",minHeight:100,resize:"vertical",fontFamily:"inherit"}} placeholder={"e.g.\n50 g of flour\n1 tsp cornstarch"} value={pasteText} onChange={e=>setPasteText(e.target.value)}/>
                <button style={{width:"100%",marginTop:8,padding:12,borderRadius:10,border:"1px solid #334155",background:pasteText.trim()&&!syncInProgress?"transparent":"#0f1729",color:pasteText.trim()&&!syncInProgress?"#94a3b8":"#475569",fontSize:13,fontWeight:600,cursor:pasteText.trim()&&!syncInProgress?"pointer":"default"}} disabled={!pasteText.trim()||syncInProgress} onClick={handlePasteSync}>{syncInProgress?"Working…":"Parse pasted text"}</button>
              </div>
            </details>
            <div style={{fontSize:11,color:"#334155",textAlign:"center",marginTop:14}}>{recipes.length} {recipes.length===1?"recipe":"recipes"} stored locally</div>
          </div>

          {/* Storage Health (Phase 6b) */}
          {(()=>{
            const bytes    = storageEstimate; // number | null
            const usageStr = bytes == null    ? null
              : bytes < 1024        ? `${bytes} bytes`
              : bytes < 1024 * 1024 ? `${(bytes / 1024).toFixed(1)} KB`
              :                       `${(bytes / 1024 / 1024).toFixed(2)} MB`;
            // Thresholds vs a 5 MB practical localStorage cap (conservative iOS estimate)
            const CAP_BYTES = 5 * 1024 * 1024;
            const pct    = bytes != null ? (bytes / CAP_BYTES) * 100 : null;
            const status = pct == null ? "unknown" : pct >= STORAGE_CRIT_PCT ? "red" : pct >= STORAGE_WARN_PCT ? "yellow" : "green";
            const statusColor = { green:"#10b981", yellow:"#f59e0b", red:"#ef4444", unknown:"#64748b" }[status];
            const statusText  = { green:"Storage healthy", yellow:"Storage approaching limit — consider exporting and reviewing data", red:"Storage near full — export now", unknown:"Storage usage unavailable" }[status];
            return (
              <>
                <div style={{fontSize:13,fontWeight:700,color:"#94a3b8",textTransform:"uppercase",letterSpacing:"0.05em",marginBottom:10,marginTop:16}}>Storage</div>
                <div style={S.card}>
                  {bytes != null ? (
                    <>
                      <div style={{fontSize:13,color:"#94a3b8",marginBottom:8}}>Using <span style={{color:"#e2e8f0",fontWeight:600}}>{usageStr}</span> of NutriTrack data <span style={{fontSize:11,color:"#475569"}}>(vs 5 MB cap)</span></div>
                      <div style={{height:6,borderRadius:3,background:"#1e293b",overflow:"hidden",marginBottom:10}}>
                        <div style={{height:"100%",background:statusColor,borderRadius:3,width:`${Math.min(pct,100)}%`,transition:"width 0.4s ease"}}/>
                      </div>
                      <div style={{fontSize:13,color:statusColor,fontWeight:600}}>{statusText}</div>
                      {status==="red"&&(<button style={{width:"100%",marginTop:10,padding:12,borderRadius:10,border:"none",background:"#0f766e",color:"#fff",fontSize:14,fontWeight:700,cursor:"pointer"}} onClick={handleExportData}>Export now</button>)}
                    </>
                  ) : (
                    <div style={{fontSize:13,color:"#64748b"}}>Storage usage information not available on this device.</div>
                  )}
                </div>
              </>
            );
          })()}

          {/* Developer (Phase 6b debug) */}
          <div style={{fontSize:13,fontWeight:700,color:"#94a3b8",textTransform:"uppercase",letterSpacing:"0.05em",marginBottom:10,marginTop:16}}>Developer</div>
          {validationWarning && (
            <div style={{background:"#1c1000",border:"1px solid #92400e",borderRadius:12,padding:"12px 14px",marginBottom:10}}>
              <div style={{fontSize:13,color:"#fbbf24",fontWeight:600,marginBottom:6}}>⚠️ Storage validation warning</div>
              <div style={{fontSize:12,color:"#92400e",marginBottom:10,lineHeight:1.5}}>
                {(()=>{
                  const hasUnparseable = Object.values(STORAGE_KEYS).some(k => {
                    try { const r = localStorage.getItem(k); if (r === null) return false; JSON.parse(r); return false; }
                    catch { return true; }
                  });
                  return hasUnparseable
                    ? "A storage key contains invalid data. Tap below to remove only the bad key and reload. Your other data is untouched."
                    : "A storage key has an unexpected shape. Your data is intact — tap below to reload and clear the warning.";
                })()}
              </div>
              <button
                style={{width:"100%",padding:10,borderRadius:10,border:"none",background:"#7c2d12",color:"#fed7aa",fontSize:13,fontWeight:700,cursor:"pointer"}}
                onClick={()=>{
                  // If a backup exists from the inject, restore it first
                  const backup = localStorage.getItem("nt-logs-backup");
                  if (backup !== null) {
                    localStorage.setItem(STORAGE_KEYS.logs, backup);
                    localStorage.removeItem("nt-logs-backup");
                  }
                  // Remove any keys that are genuinely unparseable
                  const unparseable = Object.values(STORAGE_KEYS).filter(k => {
                    try { const r = localStorage.getItem(k); if (r === null) return false; JSON.parse(r); return false; }
                    catch { return true; }
                  });
                  unparseable.forEach(k => localStorage.removeItem(k));
                  // Fix any shape mismatches by resetting to correct empty shape
                  // (covers leftover inject artifacts from previous sessions)
                  const logsRaw = localStorage.getItem(STORAGE_KEYS.logs);
                  if (logsRaw !== null) {
                    try { const v = JSON.parse(logsRaw); if (Array.isArray(v)) localStorage.setItem(STORAGE_KEYS.logs, "{}"); }
                    catch { /* already handled above */ }
                  }
                  const recipesRaw = localStorage.getItem(STORAGE_KEYS.recipes);
                  if (recipesRaw !== null) {
                    try { const v = JSON.parse(recipesRaw); if (!Array.isArray(v)) localStorage.setItem(STORAGE_KEYS.recipes, "[]"); }
                    catch { /* already handled above */ }
                  }
                  const customRaw = localStorage.getItem(STORAGE_KEYS.customFoods);
                  if (customRaw !== null) {
                    try { const v = JSON.parse(customRaw); if (!Array.isArray(v)) localStorage.setItem(STORAGE_KEYS.customFoods, "[]"); }
                    catch { /* already handled above */ }
                  }
                  window.location.reload();
                }}>
                {(()=>{
                  const hasUnparseable = Object.values(STORAGE_KEYS).some(k => {
                    try { const r = localStorage.getItem(k); if (r === null) return false; JSON.parse(r); return false; }
                    catch { return true; }
                  });
                  return hasUnparseable ? "Clear corrupted key and reload" : "Reload and clear warning";
                })()}
              </button>
            </div>
          )}
          <details>
            <summary style={{fontSize:12,color:"#475569",cursor:"pointer",padding:"4px 0",listStyle:"none",outline:"none",userSelect:"none",marginBottom:8}}>▸ Debug tools</summary>
            <div style={S.card}>
              <div style={{fontSize:12,color:"#64748b",marginBottom:12,lineHeight:1.5}}>One-use-per-session failure injection for testing the storage validation banner. Each inject backs up the current value so recovery can restore it.</div>
              <button
                style={{width:"100%",marginBottom:8,padding:10,borderRadius:10,border:"1px solid #334155",background:dbgCorruptUsed?"#0f1729":"transparent",color:dbgCorruptUsed?"#475569":"#94a3b8",fontSize:13,fontWeight:600,cursor:dbgCorruptUsed?"default":"pointer"}}
                disabled={dbgCorruptUsed}
                onClick={()=>{
                  if (dbgCorruptUsed) return;
                  const current = localStorage.getItem(STORAGE_KEYS.logs);
                  if (current !== null) localStorage.setItem("nt-logs-backup", current);
                  localStorage.setItem(STORAGE_KEYS.logs, "!!NOT_JSON!!");
                  setDbgCorruptUsed(true);
                  console.log("[NutriTrack][debug] Corrupted value injected into nt-logs. Backup saved to nt-logs-backup. Reload to see validation banner.");
                }}>
                {dbgCorruptUsed ? "Corrupt inject — used ✓" : "Inject corrupted value"}
              </button>
              <button
                style={{width:"100%",padding:10,borderRadius:10,border:"1px solid #334155",background:dbgShapeUsed?"#0f1729":"transparent",color:dbgShapeUsed?"#475569":"#94a3b8",fontSize:13,fontWeight:600,cursor:dbgShapeUsed?"default":"pointer"}}
                disabled={dbgShapeUsed}
                onClick={()=>{
                  if (dbgShapeUsed) return;
                  const current = localStorage.getItem(STORAGE_KEYS.logs);
                  if (current !== null) localStorage.setItem("nt-logs-backup", current);
                  localStorage.setItem(STORAGE_KEYS.logs, JSON.stringify([]));
                  setDbgShapeUsed(true);
                  console.log("[NutriTrack][debug] Shape mismatch injected into nt-logs. Backup saved to nt-logs-backup. Reload to see validation banner.");
                }}>
                {dbgShapeUsed ? "Shape inject — used ✓" : "Inject shape mismatch"}
              </button>
              {localStorage.getItem("nt-logs-backup") !== null && (
                <button
                  style={{width:"100%",marginTop:8,padding:10,borderRadius:10,border:"1px solid #334155",background:"#0a2010",color:"#4ade80",fontSize:13,fontWeight:600,cursor:"pointer"}}
                  onClick={()=>{
                    const backup = localStorage.getItem("nt-logs-backup");
                    if (backup !== null) {
                      localStorage.setItem(STORAGE_KEYS.logs, backup);
                      localStorage.removeItem("nt-logs-backup");
                    }
                    window.location.reload();
                  }}>
                  ↩ Restore nt-logs from backup and reload
                </button>
              )}
              <div style={{borderTop:"1px solid #1e293b",marginTop:12,paddingTop:12}}>
                <div style={{fontSize:11,color:"#475569",fontWeight:600,marginBottom:6,textTransform:"uppercase",letterSpacing:"0.04em"}}>Storage key readout</div>
                {Object.entries(STORAGE_KEYS).map(([name, key]) => {
                  const raw = localStorage.getItem(key);
                  let status, preview;
                  if (raw === null) { status = "missing"; preview = "—"; }
                  else { try { const v = JSON.parse(raw); const t = Array.isArray(v) ? "array" : typeof v; status = "ok"; preview = `${t} · ${raw.length} chars`; } catch { status = "error"; preview = raw.slice(0,30); } }
                  return (
                    <div key={key} style={{display:"flex",justifyContent:"space-between",alignItems:"baseline",padding:"3px 0",borderBottom:"1px solid #0f172a"}}>
                      <div style={{fontSize:11,color:"#64748b",fontFamily:"monospace"}}>{key}</div>
                      <div style={{fontSize:11,color:status==="error"?"#ef4444":status==="missing"?"#334155":"#94a3b8",fontFamily:"monospace",textAlign:"right",maxWidth:"55%",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{preview}</div>
                    </div>
                  );
                })}
              </div>
              <div style={{borderTop:"1px solid #1e293b",marginTop:12,paddingTop:12}}>
                <div style={{fontSize:11,color:"#64748b",marginBottom:8,lineHeight:1.5}}>Test regex ingredient parser — paste lines (one per line).</div>
                <textarea style={{width:"100%",background:"#1e293b",border:"1px solid #334155",borderRadius:10,padding:"12px 14px",color:"#e2e8f0",fontSize:13,outline:"none",boxSizing:"border-box",minHeight:80,resize:"vertical",fontFamily:"inherit"}} placeholder={"200g cherry tomatoes\n1 capsicum\n2 medium onions"} value={parserTestText} onChange={e=>setParserTestText(e.target.value)}/>
                <button style={{width:"100%",marginTop:8,padding:10,borderRadius:10,border:"1px solid #334155",background:parserTestText.trim()&&!syncInProgress?"transparent":"#0f1729",color:parserTestText.trim()&&!syncInProgress?"#94a3b8":"#475569",fontSize:13,fontWeight:600,cursor:parserTestText.trim()&&!syncInProgress?"pointer":"default"}} disabled={!parserTestText.trim()||syncInProgress} onClick={handleParserTest}>{syncInProgress?"Working…":"Run parser"}</button>
              </div>
            </div>
          </details>

          {/* Export Data */}
          <div style={{fontSize:13,fontWeight:700,color:"#94a3b8",textTransform:"uppercase",letterSpacing:"0.05em",marginBottom:10,marginTop:16}}>Export Data</div>
          <div style={S.card}>
            <div style={{fontSize:12,color:"#64748b",marginBottom:14,lineHeight:1.5}}>Exports all logs, recipes, and profile data as a CSV (daily totals, doctor-readable) and JSON (full log, re-importable) to the Files app.</div>
            <button style={{width:"100%",padding:14,borderRadius:12,border:"none",background:"#0f766e",color:"#fff",fontSize:15,fontWeight:700,cursor:"pointer",marginBottom:10}} onClick={handleExportData}>Export Data</button>
            <div style={{fontSize:12,color:"#475569",textAlign:"center"}}>Last exported: <span style={{color:lastExportedAt?"#10b981":"#64748b",fontWeight:600}}>{lastExportedAt ? (() => { const d=new Date(lastExportedAt); return d.toLocaleDateString("en-GB",{day:"numeric",month:"short",year:"numeric"})+" at "+d.toLocaleTimeString("en-GB",{hour:"2-digit",minute:"2-digit"}); })() : "Never"}</span></div>
            {exportConfirm && (
              <div style={{marginTop:14,background:"#0a1a14",border:"1px solid #065f46",borderRadius:10,padding:"12px 14px"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
                  <div style={{fontSize:13,fontWeight:700,color:"#34d399"}}>✓ Export complete</div>
                  <button style={{background:"none",border:"none",color:"#475569",fontSize:16,cursor:"pointer",padding:"0 4px",lineHeight:1}} onClick={() => setExportConfirm(null)}>×</button>
                </div>
                <div style={{fontSize:12,color:"#6ee7b7",marginBottom:4}}>🗜 {exportConfirm.zipFile}</div>
                <div style={{fontSize:11,color:"#475569",marginBottom:10}}>Contains: {exportConfirm.csvFile} + {exportConfirm.jsonFile}</div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"4px 12px"}}>
                  <div style={{fontSize:11,color:"#94a3b8"}}>Date range</div>
                  <div style={{fontSize:11,color:"#e2e8f0",fontWeight:600}}>{exportConfirm.dateFrom ? `${exportConfirm.dateFrom} → ${exportConfirm.dateTo}` : "No days logged"}</div>
                  <div style={{fontSize:11,color:"#94a3b8"}}>CSV rows</div>
                  <div style={{fontSize:11,color:"#e2e8f0",fontWeight:600}}>{exportConfirm.csvRows} day{exportConfirm.csvRows===1?"":"s"}</div>
                  <div style={{fontSize:11,color:"#94a3b8"}}>JSON entries</div>
                  <div style={{fontSize:11,color:"#e2e8f0",fontWeight:600}}>{exportConfirm.jsonEntries} log{exportConfirm.jsonEntries===1?"":"s"}</div>
                </div>
              </div>
            )}
          </div>

        </div>
        <BottomNav/>
      </div>
    );
  }
  // ── NOTION REVIEW ─────────────────────────────────────────────────────
  if (view === "notionReview") {
    const allResolved=syncReviewData.every(r=>r.duplicateAction!==null);
    const readyCount=syncReviewData.filter(r=>!r.imported&&r.duplicateAction!==null&&r.duplicateAction!=="skip").length;
    return (
      <div style={S.app}>
        <div style={S.header}><button style={{background:"none",border:"none",color:"#94a3b8",fontSize:15,cursor:"pointer"}} onClick={()=>{setView("settings");setSyncReviewData([]);}}>← Back</button><span style={{fontSize:15,fontWeight:700}}>Review Import</span><button style={{background:"none",border:"none",fontSize:13,fontWeight:700,cursor:allResolved&&readyCount>0?"pointer":"default",color:allResolved&&readyCount>0?"#7c3aed":"#334155"}} disabled={!allResolved||readyCount===0} onClick={importAllReady}>Import All ({readyCount})</button></div>
        <div style={{...S.section,paddingBottom:40}}>
          {syncReviewData.length===0&&(<div style={{textAlign:"center",padding:"40px 0",color:"#475569"}}>No recipes to review.</div>)}
          {syncReviewData.map((r,rIdx)=>{
            const skippedCount=r.ingredients.filter(i=>i.skipped).length, matchedCount=r.ingredients.filter(i=>i.match&&!i.skipped).length;
            return (<div key={rIdx} style={{...S.card,marginBottom:12,opacity:r.imported?0.5:1}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8}}><div style={{flex:1}}><div style={{fontSize:15,fontWeight:700,color:r.imported?"#10b981":"#e2e8f0"}}>{r.imported&&"✓ "}{r.title}</div><div style={{fontSize:12,color:"#475569",marginTop:2}}>{r.servings} serving{r.servings===1?"":"s"}{r.source?` · ${r.source}`:""}</div></div></div>
              {r.existingId&&!r.imported&&(<div style={{background:"#1c1200",border:"1px solid #92400e",borderRadius:10,padding:"10px 12px",marginBottom:10}}><div style={{fontSize:12,color:"#fbbf24",fontWeight:600,marginBottom:8}}>⚠️ "{r.title}" already exists locally.</div><div style={{display:"flex",gap:6,flexWrap:"wrap"}}>{[["overwrite","Overwrite"],["copy","Save as copy"],["skip","Skip"]].map(([action,label])=>(<button key={action} style={{...S.pill(r.duplicateAction===action),background:r.duplicateAction===action?(action==="skip"?"#7f1d1d":action==="overwrite"?"#1d4ed8":"#14532d"):"transparent",borderColor:r.duplicateAction===action?(action==="skip"?"#ef4444":action==="overwrite"?"#3b82f6":"#22c55e"):"#334155",color:r.duplicateAction===action?"#fff":"#94a3b8"}} onClick={()=>setSyncReviewData(prev=>prev.map((item,i)=>i===rIdx?{...item,duplicateAction:action}:item))}>{label}</button>))}</div></div>)}
              <div style={{marginBottom:r.imported?0:10}}><div style={{fontSize:11,fontWeight:700,color:"#475569",marginBottom:6,textTransform:"uppercase",letterSpacing:"0.04em"}}>Ingredients — {matchedCount} matched{skippedCount>0?`, ${skippedCount} skipped`:""}</div>
                {r.ingredients.map((ing,iIdx)=>(<div key={iIdx} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"6px 0",borderBottom:iIdx<r.ingredients.length-1?"1px solid #1e293b":"none"}}><div style={{flex:1}}>{ing.match&&!ing.skipped?(<div style={{fontSize:13,color:"#4ade80"}}>✓ {ing.match.name}</div>):ing.skipped&&!ing.match?(<div style={{fontSize:13,color:"#64748b"}}>⊘ {ing.name} <span style={{fontSize:11}}>(no match)</span></div>):ing.skipped?(<div style={{fontSize:13,color:"#64748b",textDecoration:"line-through"}}>{ing.match?.name||ing.name}</div>):(<div style={{fontSize:13,color:"#fbbf24"}}>⚠ {ing.name}</div>)}<div style={{fontSize:11,color:"#475569"}}>{ing.amount_g}g</div></div>
                  <div style={{display:"flex",gap:6,alignItems:"center"}}>
                    {!r.imported&&!ing.skipped&&!ing.match&&(<button style={{background:"#1d2d3a",border:"1px solid #334155",borderRadius:8,color:"#93c5fd",fontSize:11,fontWeight:600,padding:"3px 8px",cursor:"pointer"}} onClick={()=>{setNotionIngPick({recipeIdx:rIdx,ingIdx:iIdx});setNotionIngSearch("");setView("notionIngPick");}}>Pick</button>)}
                    {!r.imported&&(<button style={{background:"none",border:"none",color:ing.skipped?"#475569":"#64748b",fontSize:11,cursor:"pointer",padding:"2px 4px"}} onClick={()=>setSyncReviewData(prev=>prev.map((item,ri)=>ri!==rIdx?item:{...item,ingredients:item.ingredients.map((x,ii)=>ii!==iIdx?x:{...x,skipped:!x.skipped})}))}>
                      {ing.skipped?"Restore":"Skip"}</button>)}
                  </div>
                </div>))}
              </div>
              {!r.imported&&r.duplicateAction!==null&&r.duplicateAction!=="skip"&&(<button style={{width:"100%",padding:10,borderRadius:10,border:"none",background:matchedCount>0?"#7c3aed":"#1e293b",color:matchedCount>0?"#fff":"#64748b",fontSize:13,fontWeight:700,cursor:matchedCount>0?"pointer":"default"}} disabled={matchedCount===0} onClick={()=>importRecipe(rIdx)}>Import "{r.title}"</button>)}
              {r.imported&&<div style={{textAlign:"center",fontSize:13,color:"#10b981",fontWeight:600}}>✓ Imported</div>}
              {r.duplicateAction==="skip"&&<div style={{textAlign:"center",fontSize:13,color:"#475569"}}>Skipped</div>}
            </div>);
          })}
          {syncReviewData.some(r=>r.imported)&&(<button style={{width:"100%",padding:14,borderRadius:12,border:"none",background:"#7c3aed",color:"#fff",fontSize:15,fontWeight:700,cursor:"pointer",marginTop:4}} onClick={importAllReady}>Done — Save & Finish</button>)}
        </div>
        <BottomNav/>
      </div>
    );
  }

  // ── NOTION INGREDIENT PICKER ──────────────────────────────────────────
  if (view === "notionIngPick" && notionIngPick) {
    const filteredNotionFoods=notionIngSearch.length>0?allFoods.filter(f=>f.name.toLowerCase().includes(notionIngSearch.toLowerCase())):allFoods;
    const groupedNotionFoods=filteredNotionFoods.reduce((acc,f)=>{if(!acc[f.cat])acc[f.cat]=[];acc[f.cat].push(f);return acc;},{});
    const currentIng=syncReviewData[notionIngPick.recipeIdx]?.ingredients[notionIngPick.ingIdx];
    return (
      <div style={S.app}>
        <div style={S.header}><button style={{background:"none",border:"none",color:"#94a3b8",fontSize:15,cursor:"pointer"}} onClick={()=>{setNotionIngPick(null);setView("notionReview");}}>← Back</button><span style={{fontSize:15,fontWeight:700}}>Match Ingredient</span><div style={{width:48}}/></div>
        <div style={S.section}>
          {currentIng&&(<div style={{background:"#1c1200",border:"1px solid #92400e",borderRadius:10,padding:"10px 14px",marginBottom:12,fontSize:13,color:"#fbbf24"}}>Matching: <strong>{currentIng.name}</strong> ({currentIng.amount_g}g)</div>)}
          <input style={{...S.input,marginBottom:12}} placeholder="Search foods…" value={notionIngSearch} onChange={e=>setNotionIngSearch(e.target.value)} autoFocus/>
          <div style={{maxHeight:"calc(100vh - 220px)",overflowY:"auto"}}>
            {Object.entries(groupedNotionFoods).map(([cat,foods])=>(<div key={cat}><div style={{fontSize:11,fontWeight:700,color:"#475569",padding:"10px 0 4px",letterSpacing:"0.05em",textTransform:"uppercase"}}>{cat}</div>{foods.map(f=>(<div key={f.id} style={S.srchItem} onClick={()=>{setSyncReviewData(prev=>prev.map((item,ri)=>ri!==notionIngPick.recipeIdx?item:{...item,ingredients:item.ingredients.map((ing,ii)=>ii!==notionIngPick.ingIdx?ing:{...ing,match:f,skipped:false})}));setNotionIngPick(null);setView("notionReview");}}><span style={{fontSize:12,color:"#f59e0b",float:"right"}}>{f.cal} kcal/100g</span><div style={{fontSize:14,fontWeight:500,color:"#e2e8f0"}}>{f.name}</div></div>))}</div>))}
            {filteredNotionFoods.length===0&&(<div style={{padding:20,textAlign:"center",color:"#475569",fontSize:14}}>No foods found for "{notionIngSearch}"</div>)}
          </div>
        </div>
      </div>
    );
  }
  // ── DETAIL VIEWS ──────────────────────────────────────────────────────
  if (view === "proDetail") {
    const aaTotals={}; AA_KEYS.forEach(k=>{aaTotals[k]=0;});
    dayLog.forEach(e=>{if(e.type==="exercise"||e.type==="supplement")return;if(e.type==="recipe"){(e.derivedIngredients||[]).forEach(ing=>{const m=ing.amount_g/100;if(ing.snapshot){AA_KEYS.forEach(k=>{aaTotals[k]+=(ing.snapshot[k]??0)*m;});}else{const f=allFoods.find(x=>x.id===ing.foodId);if(!f)return;AA_KEYS.forEach(k=>{aaTotals[k]+=(f[k]??0)*m;});}});return;}const m=e.amount/100;if(e.snapshot){AA_KEYS.forEach(k=>{aaTotals[k]+=(e.snapshot[k]??0)*m;});}else{const f=allFoods.find(x=>x.id===e.foodId);if(!f)return;AA_KEYS.forEach(k=>{aaTotals[k]+=(f[k]??0)*m;});}});
    const aaGoals = computeAAGoals(profile.weightKg);
    // Apply same exercise multiplier as protein goal
    const scaledAAGoals = Object.fromEntries(Object.entries(aaGoals).map(([k,v]) => [k, v * proMultiplier]));
    let limitingKey="aaLys",lowestPct=Infinity; AA_KEYS.forEach(k=>{const p=(aaTotals[k]/scaledAAGoals[k])*100;if(p<lowestPct){lowestPct=p;limitingKey=k;}});
    const proCont=dayLog.flatMap(e=>{if(e.type==="exercise")return[];if(e.type==="supplement"){const v=suppContrib(e,"pro");return v>0?[{name:`💊 ${e.stackName}`,label:"supplement",value:v,isSupp:true}]:[]; }if(e.type==="recipe"){const n=computeEntryNutrition(e.derivedIngredients||[],allFoods);return n.pro?[{name:`📖 ${e.recipeName}`,label:`${e.servings} srv`,value:n.pro}]:[];}const val=e.snapshot?(e.snapshot.pro??0)*e.amount/100:(allFoods.find(x=>x.id===e.foodId)?.pro??0)*e.amount/100;return val?[{name:e.foodName,label:`${e.amount}g`,value:val}]:[];}).sort((a,b)=>b.value-a.value);
    return (
      <div style={S.app}>
        <div style={S.header}><button style={{background:"none",border:"none",color:"#94a3b8",fontSize:15,cursor:"pointer"}} onClick={()=>setView("log")}>← Back</button><span style={{fontSize:15,fontWeight:700}}>Protein</span><div style={{width:48}}/></div>
        <div style={S.section}>
          <div style={{...S.card,textAlign:"center"}}>{(()=>{const k="pro",goal=effectiveGoals[k]||1,nv=allFoodsForRender.map(f=>f[k]).filter(v=>v!=null&&v>0).sort((a,b)=>a-b),med=nv.length?nv[Math.floor(nv.length/2)]:null;let est=0;dayLog.forEach(e=>{if(e.type==="exercise"||e.type==="supplement")return;if(e.type==="recipe"){(e.derivedIngredients||[]).forEach(ing=>{const v=ing.snapshot?ing.snapshot[k]:(allFoodsForRender.find(f=>f.id===ing.foodId)?.[k]);if(v===null||v===undefined)est+=med!=null?(ing.amount_g/100)*med:0;});return;}const v=e.snapshot?e.snapshot[k]:(allFoodsForRender.find(f=>f.id===e.foodId)?.[k]);if(v===null||v===undefined)est+=med!=null?((e.amount||0)/100)*med:0;});const arc=Math.min(est/goal,1);return(<Ring value={totals.pro} max={effectiveGoals.pro} size={100} stroke={8} color={NUTRIENT_META.pro.color} nullArc={arc} simplified={displayMode==="simplified"}><text x="50%" y="45%" textAnchor="middle" fill="#e2e8f0" fontSize={18} fontWeight={700}>{Math.round(totals.pro*10)/10}</text><text x="50%" y="62%" textAnchor="middle" fill="#64748b" fontSize={10}>/ {effectiveGoals.pro}g</text></Ring>);})()}<div style={{marginTop:12,fontSize:14,color:pct("pro")>=100?"#10b981":pct("pro")>=60?"#f59e0b":"#ef4444"}}>{pct("pro")}% of daily goal</div></div>
          <div style={S.card}><div style={{fontSize:13,fontWeight:700,color:"#94a3b8",marginBottom:4,textTransform:"uppercase",letterSpacing:"0.05em"}}>Essential Amino Acids</div><div style={{fontSize:11,color:"#475569",marginBottom:14}}>targets for {parseFloat(profile.weightKg)||70}kg{proMultiplier>1&&<span style={{color:"#4ade80"}}> · {proMultiplier.toFixed(2)}× exercise scaling</span>}</div>
            {AA_KEYS.map(k=>{const val=aaTotals[k],ear=scaledAAGoals[k],bp=Math.min((val/ear)*100,100),rp=Math.round((val/ear)*100),isLimit=k===limitingKey,col=rp>=100?"#10b981":rp>=60?"#3B82F6":rp>=30?"#f59e0b":"#ef4444";return(<div key={k} style={{marginBottom:10}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}><div style={{display:"flex",alignItems:"center",gap:6}}><span style={{fontSize:13,color:"#e2e8f0",fontWeight:isLimit?700:400}}>{AA_LABELS[k]}</span>{isLimit&&<span style={{fontSize:9,fontWeight:700,color:"#f59e0b",background:"rgba(245,158,11,0.15)",borderRadius:4,padding:"1px 5px"}}>LIMITING</span>}</div><div style={{textAlign:"right"}}><span style={{fontSize:12,fontWeight:600,color:col}}>{rp}%</span><span style={{fontSize:10,color:"#475569",marginLeft:5}}>{Math.round(val*100)/100}g / {Math.round(ear*100)/100}g</span></div></div><div style={{height:6,borderRadius:3,background:"#1e293b",overflow:"hidden"}}><div style={{height:"100%",width:`${bp}%`,background:col,borderRadius:3,transition:"width 0.5s ease"}}/></div></div>);})}
          </div>
          {proCont.length>0&&(<div style={S.card}><div style={{fontSize:13,fontWeight:700,color:"#94a3b8",marginBottom:10,textTransform:"uppercase",letterSpacing:"0.05em"}}>Today's Sources</div>{proCont.map((c,i)=>(<div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"7px 0",borderBottom:i<proCont.length-1?"1px solid #1e293b":"none",background:c.isSupp?"rgba(167,139,250,0.05)":"transparent",borderRadius:c.isSupp?6:0}}><div><div style={{fontSize:13,color:c.isSupp?"#c4b5fd":"#e2e8f0"}}>{c.name}</div><div style={{fontSize:11,color:"#64748b"}}>{c.label}</div></div><div style={{fontSize:13,fontWeight:600,color:NUTRIENT_META.pro.color}}>{Math.round(c.value*10)/10}g</div></div>))}</div>)}
        </div>
      </div>
    );
  }

  if (view === "calDetail") {
    const proK=totals.pro*4,carbK=totals.carb*4,fatK=totals.fat*9,totK=proK+carbK+fatK;
    const calCont=dayLog.flatMap(e=>{if(e.type==="exercise")return[];if(e.type==="supplement"){const v=suppContrib(e,"cal");return v>0?[{name:`💊 ${e.stackName}`,label:"supplement",value:v,isSupp:true}]:[]; }if(e.type==="recipe"){const n=computeEntryNutrition(e.derivedIngredients||[],allFoods);return n.cal?[{name:`📖 ${e.recipeName}`,label:`${e.servings} srv`,value:n.cal}]:[];}const val=e.snapshot?(e.snapshot.cal??0)*e.amount/100:(allFoods.find(x=>x.id===e.foodId)?.cal??0)*e.amount/100;return val?[{name:e.foodName,label:`${e.amount}g`,value:val}]:[];}).sort((a,b)=>b.value-a.value);
    return (
      <div style={S.app}>
        <div style={S.header}><button style={{background:"none",border:"none",color:"#94a3b8",fontSize:15,cursor:"pointer"}} onClick={()=>setView("log")}>← Back</button><span style={{fontSize:15,fontWeight:700}}>Calories</span><div style={{width:48}}/></div>
        <div style={S.section}>
          <div style={{...S.card,textAlign:"center"}}>{(()=>{const k="cal",goal=effectiveGoals[k]||1,nv=allFoodsForRender.map(f=>f[k]).filter(v=>v!=null&&v>0).sort((a,b)=>a-b),med=nv.length?nv[Math.floor(nv.length/2)]:null;let est=0;dayLog.forEach(e=>{if(e.type==="exercise"||e.type==="supplement")return;if(e.type==="recipe"){(e.derivedIngredients||[]).forEach(ing=>{const v=ing.snapshot?ing.snapshot[k]:(allFoodsForRender.find(f=>f.id===ing.foodId)?.[k]);if(v===null||v===undefined)est+=med!=null?(ing.amount_g/100)*med:0;});return;}const v=e.snapshot?e.snapshot[k]:(allFoodsForRender.find(f=>f.id===e.foodId)?.[k]);if(v===null||v===undefined)est+=med!=null?((e.amount||0)/100)*med:0;});const arc=Math.min(est/goal,1);return(<Ring value={totals.cal} max={effectiveGoals.cal} size={100} stroke={8} color={NUTRIENT_META.cal.color} nullArc={arc} simplified={displayMode==="simplified"}><text x="50%" y="45%" textAnchor="middle" fill="#e2e8f0" fontSize={18} fontWeight={700}>{Math.round(totals.cal)}</text><text x="50%" y="62%" textAnchor="middle" fill="#64748b" fontSize={10}>/ {effectiveGoals.cal} kcal</text></Ring>);})()}<div style={{marginTop:12,fontSize:14,color:pct("cal")>=100?"#10b981":pct("cal")>=60?"#f59e0b":"#ef4444"}}>{pct("cal")}% of daily goal</div></div>
          <div style={S.card}><div style={{fontSize:13,fontWeight:700,color:"#94a3b8",marginBottom:12,textTransform:"uppercase",letterSpacing:"0.05em"}}>Calorie Breakdown</div>
            {totK>0?(<div style={{display:"flex",height:14,borderRadius:7,overflow:"hidden",marginBottom:16,gap:1}}><div style={{width:`${(proK/totK)*100}%`,background:NUTRIENT_META.pro.color}}/><div style={{width:`${(carbK/totK)*100}%`,background:NUTRIENT_META.carb.color}}/><div style={{width:`${(fatK/totK)*100}%`,background:NUTRIENT_META.fat.color}}/></div>):<div style={{height:14,borderRadius:7,background:"#1e293b",marginBottom:16}}/>}
            {[{key:"pro",label:"Protein",kcal:proK,grams:totals.pro,mult:"×4"},{key:"carb",label:"Carbs",kcal:carbK,grams:totals.carb,mult:"×4"},{key:"fat",label:"Fat",kcal:fatK,grams:totals.fat,mult:"×9"}].map(({key,label,kcal,grams,mult},i)=>(<div key={key} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 0",borderBottom:i<2?"1px solid #1e293b":"none"}}><div style={{display:"flex",alignItems:"center",gap:10}}><div style={{width:12,height:12,borderRadius:3,background:NUTRIENT_META[key].color,flexShrink:0}}/><div><div style={{fontSize:14,color:"#e2e8f0",fontWeight:500}}>{label}</div><div style={{fontSize:11,color:"#64748b"}}>{Math.round(grams*10)/10}g {mult}</div></div></div><div style={{textAlign:"right"}}><div style={{fontSize:15,fontWeight:700,color:NUTRIENT_META[key].color}}>{Math.round(kcal)} kcal</div><div style={{fontSize:11,color:"#64748b"}}>{totK>0?Math.round((kcal/totK)*100):0}%</div></div></div>))}
          </div>
          {calCont.length>0&&(<div style={S.card}><div style={{fontSize:13,fontWeight:700,color:"#94a3b8",marginBottom:10,textTransform:"uppercase",letterSpacing:"0.05em"}}>Today's Sources</div>{calCont.map((c,i)=>(<div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"7px 0",borderBottom:i<calCont.length-1?"1px solid #1e293b":"none",background:c.isSupp?"rgba(167,139,250,0.05)":"transparent",borderRadius:c.isSupp?6:0}}><div><div style={{fontSize:13,color:c.isSupp?"#c4b5fd":"#e2e8f0"}}>{c.name}</div><div style={{fontSize:11,color:"#64748b"}}>{c.label}</div></div><div style={{fontSize:13,fontWeight:600,color:NUTRIENT_META.cal.color}}>{Math.round(c.value)} kcal</div></div>))}</div>)}
        </div>
      </div>
    );
  }

  if (view === "fibDetail") {
    const fibSol=dayLog.reduce((s,e)=>{if(e.type==="exercise"||e.type==="supplement")return s;if(e.type==="recipe")return s+recipeSubtotal(e,"fibSol");if(e.snapshot)return s+(e.snapshot.fibSol??0)*e.amount/100;const f=allFoods.find(x=>x.id===e.foodId);return s+(f?(f.fibSol??0)*e.amount/100:0);},0);
    const fibInsol=dayLog.reduce((s,e)=>{if(e.type==="exercise"||e.type==="supplement")return s;if(e.type==="recipe")return s+recipeSubtotal(e,"fibInsol");if(e.snapshot)return s+(e.snapshot.fibInsol??0)*e.amount/100;const f=allFoods.find(x=>x.id===e.foodId);return s+(f?(f.fibInsol??0)*e.amount/100:0);},0);
    const fibT=fibSol+fibInsol;
    const fibCont=dayLog.flatMap(e=>{if(e.type==="exercise"||e.type==="supplement")return[];if(e.type==="recipe"){const n=computeEntryNutrition(e.derivedIngredients||[],allFoods);if(!n.fib)return[];return[{name:`📖 ${e.recipeName}`,label:`${e.servings} srv`,total:n.fib,sol:recipeSubtotal(e,"fibSol"),insol:recipeSubtotal(e,"fibInsol")}];}if(e.snapshot){const t=(e.snapshot.fib??0)*e.amount/100;if(!t)return[];return[{name:e.foodName,label:`${e.amount}g`,total:t,sol:(e.snapshot.fibSol??0)*e.amount/100,insol:(e.snapshot.fibInsol??0)*e.amount/100}];}const f=allFoods.find(x=>x.id===e.foodId);if(!f||!f.fib)return[];return[{name:e.foodName,label:`${e.amount}g`,total:f.fib*e.amount/100,sol:(f.fibSol??0)*e.amount/100,insol:(f.fibInsol??0)*e.amount/100}];}).sort((a,b)=>b.total-a.total);
    return (
      <div style={S.app}>
        <div style={S.header}><button style={{background:"none",border:"none",color:"#94a3b8",fontSize:15,cursor:"pointer"}} onClick={()=>setView("log")}>← Back</button><span style={{fontSize:15,fontWeight:700}}>Fibre</span><div style={{width:48}}/></div>
        <div style={S.section}>
          <div style={{...S.card,textAlign:"center"}}>{(()=>{const k="fib",goal=effectiveGoals[k]||1,nv=allFoodsForRender.map(f=>f[k]).filter(v=>v!=null&&v>0).sort((a,b)=>a-b),med=nv.length?nv[Math.floor(nv.length/2)]:null;let est=0;dayLog.forEach(e=>{if(e.type==="exercise"||e.type==="supplement")return;if(e.type==="recipe"){(e.derivedIngredients||[]).forEach(ing=>{const v=ing.snapshot?ing.snapshot[k]:(allFoodsForRender.find(f=>f.id===ing.foodId)?.[k]);if(v===null||v===undefined)est+=med!=null?(ing.amount_g/100)*med:0;});return;}const v=e.snapshot?e.snapshot[k]:(allFoodsForRender.find(f=>f.id===e.foodId)?.[k]);if(v===null||v===undefined)est+=med!=null?((e.amount||0)/100)*med:0;});const arc=Math.min(est/goal,1);return(<Ring value={totals.fib} max={effectiveGoals.fib} size={100} stroke={8} color={NUTRIENT_META.fib.color} nullArc={arc} simplified={displayMode==="simplified"}><text x="50%" y="45%" textAnchor="middle" fill="#e2e8f0" fontSize={18} fontWeight={700}>{Math.round(totals.fib*10)/10}</text><text x="50%" y="62%" textAnchor="middle" fill="#64748b" fontSize={10}>/ {effectiveGoals.fib}g</text></Ring>);})()}<div style={{marginTop:12,fontSize:14,color:pct("fib")>=100?"#10b981":pct("fib")>=60?"#f59e0b":"#ef4444"}}>{pct("fib")}% of daily goal</div></div>
          <div style={S.card}><div style={{fontSize:13,fontWeight:700,color:"#94a3b8",marginBottom:12,textTransform:"uppercase",letterSpacing:"0.05em"}}>Fibre Types</div>
            {fibT>0?(<div style={{display:"flex",height:14,borderRadius:7,overflow:"hidden",marginBottom:14,gap:1}}><div style={{width:`${(fibSol/fibT)*100}%`,background:FIB_SOL_COLOR}}/><div style={{width:`${(fibInsol/fibT)*100}%`,background:FIB_INSOL_COLOR}}/></div>):<div style={{height:14,borderRadius:7,background:"#1e293b",marginBottom:14}}/>}
            {[{label:"Soluble",value:fibSol,color:FIB_SOL_COLOR,note:"Slows digestion, feeds gut bacteria, helps lower cholesterol"},{label:"Insoluble",value:fibInsol,color:FIB_INSOL_COLOR,note:"Adds bulk, speeds gut transit, supports bowel regularity"}].map(({label,value,color,note},i)=>(<div key={label} style={{padding:"10px 0",borderBottom:i===0?"1px solid #1e293b":"none"}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><div style={{display:"flex",alignItems:"center",gap:10}}><div style={{width:12,height:12,borderRadius:3,background:color}}/><span style={{fontSize:14,color:"#e2e8f0",fontWeight:500}}>{label}</span></div><div><span style={{fontSize:15,fontWeight:700,color}}>{Math.round(value*10)/10}g</span><span style={{fontSize:11,color:"#64748b",marginLeft:6}}>{fibT>0?Math.round((value/fibT)*100):0}%</span></div></div><div style={{fontSize:11,color:"#475569",marginTop:4,paddingLeft:22}}>{note}</div></div>))}
          </div>
          {fibCont.length>0&&(<div style={S.card}><div style={{fontSize:13,fontWeight:700,color:"#94a3b8",marginBottom:10,textTransform:"uppercase",letterSpacing:"0.05em"}}>Today's Sources</div>{fibCont.map((c,i)=>(<div key={i} style={{padding:"8px 0",borderBottom:i<fibCont.length-1?"1px solid #1e293b":"none"}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><div><div style={{fontSize:13,color:"#e2e8f0"}}>{c.name}</div><div style={{fontSize:11,color:"#64748b"}}>{c.label}</div></div><div style={{textAlign:"right"}}><div style={{fontSize:13,fontWeight:600,color:NUTRIENT_META.fib.color}}>{Math.round(c.total*10)/10}g</div><div style={{fontSize:10,color:"#64748b"}}>{Math.round(c.sol*10)/10} sol / {Math.round(c.insol*10)/10} insol</div></div></div></div>))}</div>)}
          <div style={S.card}><div style={{fontSize:13,fontWeight:700,color:"#94a3b8",marginBottom:10,textTransform:"uppercase",letterSpacing:"0.05em"}}>Top Sources (per 100g)</div>{[...allFoods].sort((a,b)=>(b.fib??0)-(a.fib??0)).slice(0,8).map((f,i)=>(<div key={f.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"7px 0",borderBottom:i<7?"1px solid #1e293b":"none"}}><span style={{fontSize:13,color:"#e2e8f0"}}>{f.name}</span><div style={{textAlign:"right"}}><div style={{fontSize:13,fontWeight:600,color:NUTRIENT_META.fib.color}}>{Math.round((f.fib??0)*10)/10}g</div><div style={{fontSize:10,color:"#64748b"}}>{Math.round((f.fibSol??0)*10)/10} sol / {Math.round((f.fibInsol??0)*10)/10} insol</div></div></div>))}</div>
        </div>
      </div>
    );
  }

  if (view === "fatDetail") {
    const fatSat=dayLog.reduce((s,e)=>{if(e.type==="exercise"||e.type==="supplement")return s;if(e.type==="recipe")return s+recipeSubtotal(e,"fatSat");if(e.snapshot)return s+(e.snapshot.fatSat??0)*e.amount/100;const f=allFoods.find(x=>x.id===e.foodId);return s+(f?(f.fatSat??0)*e.amount/100:0);},0);
    const fatMufa=dayLog.reduce((s,e)=>{if(e.type==="exercise"||e.type==="supplement")return s;if(e.type==="recipe")return s+recipeSubtotal(e,"fatMufa");if(e.snapshot)return s+(e.snapshot.fatMufa??0)*e.amount/100;const f=allFoods.find(x=>x.id===e.foodId);return s+(f?(f.fatMufa??0)*e.amount/100:0);},0);
    const fatPufa=dayLog.reduce((s,e)=>{if(e.type==="exercise"||e.type==="supplement")return s;if(e.type==="recipe")return s+recipeSubtotal(e,"fatPufa");if(e.snapshot)return s+(e.snapshot.fatPufa??0)*e.amount/100;const f=allFoods.find(x=>x.id===e.foodId);return s+(f?(f.fatPufa??0)*e.amount/100:0);},0);
    const fatT=fatSat+fatMufa+fatPufa;
    const fatCont=dayLog.flatMap(e=>{if(e.type==="exercise"||e.type==="supplement")return[];if(e.type==="recipe"){const n=computeEntryNutrition(e.derivedIngredients||[],allFoods);if(!n.fat)return[];return[{name:`📖 ${e.recipeName}`,label:`${e.servings} srv`,total:n.fat,sat:recipeSubtotal(e,"fatSat"),mufa:recipeSubtotal(e,"fatMufa"),pufa:recipeSubtotal(e,"fatPufa")}];}if(e.snapshot){const t=(e.snapshot.fat??0)*e.amount/100;if(!t)return[];return[{name:e.foodName,label:`${e.amount}g`,total:t,sat:(e.snapshot.fatSat??0)*e.amount/100,mufa:(e.snapshot.fatMufa??0)*e.amount/100,pufa:(e.snapshot.fatPufa??0)*e.amount/100}];}const f=allFoods.find(x=>x.id===e.foodId);if(!f||!f.fat)return[];return[{name:e.foodName,label:`${e.amount}g`,total:f.fat*e.amount/100,sat:(f.fatSat??0)*e.amount/100,mufa:(f.fatMufa??0)*e.amount/100,pufa:(f.fatPufa??0)*e.amount/100}];}).sort((a,b)=>b.total-a.total);
    return (
      <div style={S.app}>
        <div style={S.header}><button style={{background:"none",border:"none",color:"#94a3b8",fontSize:15,cursor:"pointer"}} onClick={()=>setView("log")}>← Back</button><span style={{fontSize:15,fontWeight:700}}>Fat</span><div style={{width:48}}/></div>
        <div style={S.section}>
          <div style={{...S.card,textAlign:"center"}}>{(()=>{const k="fat",goal=effectiveGoals[k]||1,nv=allFoodsForRender.map(f=>f[k]).filter(v=>v!=null&&v>0).sort((a,b)=>a-b),med=nv.length?nv[Math.floor(nv.length/2)]:null;let est=0;dayLog.forEach(e=>{if(e.type==="exercise"||e.type==="supplement")return;if(e.type==="recipe"){(e.derivedIngredients||[]).forEach(ing=>{const v=ing.snapshot?ing.snapshot[k]:(allFoodsForRender.find(f=>f.id===ing.foodId)?.[k]);if(v===null||v===undefined)est+=med!=null?(ing.amount_g/100)*med:0;});return;}const v=e.snapshot?e.snapshot[k]:(allFoodsForRender.find(f=>f.id===e.foodId)?.[k]);if(v===null||v===undefined)est+=med!=null?((e.amount||0)/100)*med:0;});const arc=Math.min(est/goal,1);return(<Ring value={totals.fat} max={effectiveGoals.fat} size={100} stroke={8} color={NUTRIENT_META.fat.color} nullArc={arc} simplified={displayMode==="simplified"}><text x="50%" y="45%" textAnchor="middle" fill="#e2e8f0" fontSize={18} fontWeight={700}>{Math.round(totals.fat*10)/10}</text><text x="50%" y="62%" textAnchor="middle" fill="#64748b" fontSize={10}>/ {effectiveGoals.fat}g</text></Ring>);})()}<div style={{marginTop:12,fontSize:14,color:pct("fat")>=100?"#10b981":pct("fat")>=60?"#f59e0b":"#ef4444"}}>{pct("fat")}% of daily goal</div></div>
          <div style={S.card}><div style={{fontSize:13,fontWeight:700,color:"#94a3b8",marginBottom:12,textTransform:"uppercase",letterSpacing:"0.05em"}}>Fat Types</div>
            {fatT>0?(<div style={{display:"flex",height:14,borderRadius:7,overflow:"hidden",marginBottom:14,gap:1}}><div style={{width:`${(fatSat/fatT)*100}%`,background:FAT_SAT_COLOR}}/><div style={{width:`${(fatMufa/fatT)*100}%`,background:FAT_MUFA_COLOR}}/><div style={{width:`${(fatPufa/fatT)*100}%`,background:FAT_PUFA_COLOR}}/></div>):<div style={{height:14,borderRadius:7,background:"#1e293b",marginBottom:14}}/>}
            {[{label:"Saturated",value:fatSat,color:FAT_SAT_COLOR,note:"Limit where possible — raises LDL cholesterol"},{label:"Monounsaturated",value:fatMufa,color:FAT_MUFA_COLOR,note:"Heart-healthy — oleic acid from avocado, olive oil, nuts"},{label:"Polyunsaturated",value:fatPufa,color:FAT_PUFA_COLOR,note:"Includes omega-3 & omega-6 — essential, anti-inflammatory"}].map(({label,value,color,note},i)=>(<div key={label} style={{padding:"10px 0",borderBottom:i<2?"1px solid #1e293b":"none"}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><div style={{display:"flex",alignItems:"center",gap:10}}><div style={{width:12,height:12,borderRadius:3,background:color}}/><span style={{fontSize:14,color:"#e2e8f0",fontWeight:500}}>{label}</span></div><div><span style={{fontSize:15,fontWeight:700,color}}>{Math.round(value*10)/10}g</span><span style={{fontSize:11,color:"#64748b",marginLeft:6}}>{fatT>0?Math.round((value/fatT)*100):0}%</span></div></div><div style={{fontSize:11,color:"#475569",marginTop:4,paddingLeft:22}}>{note}</div></div>))}
          </div>
          {fatCont.length>0&&(<div style={S.card}><div style={{fontSize:13,fontWeight:700,color:"#94a3b8",marginBottom:10,textTransform:"uppercase",letterSpacing:"0.05em"}}>Today's Sources</div>{fatCont.map((c,i)=>(<div key={i} style={{padding:"8px 0",borderBottom:i<fatCont.length-1?"1px solid #1e293b":"none"}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><div><div style={{fontSize:13,color:"#e2e8f0"}}>{c.name}</div><div style={{fontSize:11,color:"#64748b"}}>{c.label}</div></div><div style={{textAlign:"right"}}><div style={{fontSize:13,fontWeight:600,color:NUTRIENT_META.fat.color}}>{Math.round(c.total*10)/10}g</div><div style={{fontSize:10,color:"#64748b"}}>{Math.round(c.sat*10)/10} sat · {Math.round(c.mufa*10)/10} mufa · {Math.round(c.pufa*10)/10} pufa</div></div></div></div>))}</div>)}
          <div style={S.card}><div style={{fontSize:13,fontWeight:700,color:"#94a3b8",marginBottom:10,textTransform:"uppercase",letterSpacing:"0.05em"}}>Top Sources (per 100g)</div>{[...allFoods].sort((a,b)=>(b.fat??0)-(a.fat??0)).slice(0,8).map((f,i)=>(<div key={f.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"7px 0",borderBottom:i<7?"1px solid #1e293b":"none"}}><span style={{fontSize:13,color:"#e2e8f0"}}>{f.name}</span><div style={{textAlign:"right"}}><div style={{fontSize:13,fontWeight:600,color:NUTRIENT_META.fat.color}}>{Math.round((f.fat??0)*10)/10}g</div><div style={{fontSize:10,color:"#64748b"}}>{Math.round((f.fatSat??0)*10)/10} sat · {Math.round((f.fatMufa??0)*10)/10} mufa · {Math.round((f.fatPufa??0)*10)/10} pufa</div></div></div>))}</div>
        </div>
      </div>
    );
  }

  if (view === "detail" && detailNutrient) {
    const k=detailNutrient, meta=NUTRIENT_META[k];
    const cont=dayLog.flatMap(e=>{if(e.type==="exercise")return[];if(e.type==="supplement"){const v=suppContrib(e,k);return v>0?[{name:`💊 ${e.stackName}`,label:"supplement",value:v,isSupp:true}]:[]; }if(e.type==="recipe"){const n=computeEntryNutrition(e.derivedIngredients||[],allFoods);return n[k]?[{name:`📖 ${e.recipeName}`,label:`${e.servings} srv`,value:n[k]}]:[];}const val=e.snapshot?(e.snapshot[k]??0)*e.amount/100:(allFoods.find(x=>x.id===e.foodId)?.[k]??0)*e.amount/100;return val?[{name:e.foodName,label:`${e.amount}g`,value:val}]:[];}).sort((a,b)=>b.value-a.value);
    return (
      <div style={S.app}>
        <div style={S.header}><button style={{background:"none",border:"none",color:"#94a3b8",fontSize:15,cursor:"pointer"}} onClick={()=>setView("log")}>← Back</button><span style={{fontSize:15,fontWeight:700}}>{meta.label}</span><div style={{width:48}}/></div>
        <div style={S.section}>
          <div style={{...S.card,textAlign:"center"}}>{(()=>{const goal=goals[k]||1,nv=allFoodsForRender.map(f=>f[k]).filter(v=>v!=null&&v>0).sort((a,b)=>a-b),med=nv.length?nv[Math.floor(nv.length/2)]:null;let est=0;dayLog.forEach(e=>{if(e.type==="exercise"||e.type==="supplement")return;if(e.type==="recipe"){(e.derivedIngredients||[]).forEach(ing=>{const v=ing.snapshot?ing.snapshot[k]:(allFoodsForRender.find(f=>f.id===ing.foodId)?.[k]);if(v===null||v===undefined)est+=med!=null?(ing.amount_g/100)*med:0;});return;}const v=e.snapshot?e.snapshot[k]:(allFoodsForRender.find(f=>f.id===e.foodId)?.[k]);if(v===null||v===undefined)est+=med!=null?((e.amount||0)/100)*med:0;});const arc=Math.min(est/goal,1);return(<Ring value={totals[k]} max={goals[k]} size={100} stroke={8} color={meta.color} nullArc={arc} simplified={displayMode==="simplified"}><text x="50%" y="45%" textAnchor="middle" fill="#e2e8f0" fontSize={18} fontWeight={700}>{Math.round(totals[k]*10)/10}</text><text x="50%" y="62%" textAnchor="middle" fill="#64748b" fontSize={10}>/ {goals[k]} {meta.unit}</text></Ring>);})()}<div style={{marginTop:12,fontSize:14,color:pct(k)>=100?"#10b981":pct(k)>=60?"#f59e0b":"#ef4444"}}>{pct(k)}% of daily goal</div></div>
          {cont.length>0&&(<div style={S.card}><div style={{fontSize:13,fontWeight:700,color:"#94a3b8",marginBottom:10,textTransform:"uppercase"}}>Today's Sources</div>{cont.map((c,i)=>(<div key={i} style={{display:"flex",justifyContent:"space-between",padding:"6px 0",borderBottom:"1px solid #1e293b",background:c.isSupp?"rgba(167,139,250,0.05)":"transparent",borderRadius:c.isSupp?6:0}}><div><div style={{fontSize:13,color:c.isSupp?"#c4b5fd":"#e2e8f0"}}>{c.name}</div><div style={{fontSize:11,color:"#64748b"}}>{c.label}</div></div><div style={{fontSize:13,fontWeight:600,color:meta.color}}>{Math.round(c.value*10)/10} {meta.unit}</div></div>))}</div>)}
          <div style={S.card}><div style={{fontSize:13,fontWeight:700,color:"#94a3b8",marginBottom:10,textTransform:"uppercase"}}>Top Sources (per 100g)</div>{[...allFoods].sort((a,b)=>(b[k]??0)-(a[k]??0)).slice(0,8).map((f,i)=>(<div key={f.id} style={{display:"flex",justifyContent:"space-between",padding:"6px 0",borderBottom:"1px solid #1e293b"}}><span style={{fontSize:13,color:"#e2e8f0"}}>{f.name}</span><span style={{fontSize:13,fontWeight:600,color:meta.color}}>{Math.round((f[k]??0)*10)/10} {meta.unit}</span></div>))}</div>
        </div>
      </div>
    );
  }

  // ── EDIT LOGGED RECIPE ────────────────────────────────────────────────
  if (view === "editLoggedRecipe" && editingLogEntry) {
    const recipe = recipes.find(r => r.id === editingLogEntry.recipeId);
    const servings = parseFloat(editLogServings) || 1;
    let previewDI = editingLogEntry.derivedIngredients || [];
    if (recipe) {
      const rs = Math.max(Number(recipe.servings) || 1, 0.01);
      const frac = servings / rs;
      previewDI = recipe.ingredients.map(ing => ({ foodId: ing.foodId, foodName: ing.foodName, amount_g: Math.round(ing.amount_g * frac * 10) / 10 }));
    }
    const nut = computeEntryNutrition(previewDI, allFoodsForRender);
    return (
      <div style={S.app}>
        <div style={S.header}>
          <button style={{background:"none",border:"none",color:"#94a3b8",fontSize:15,cursor:"pointer"}} onClick={() => { setEditingLogEntry(null); setView("log"); }}>← Back</button>
          <span style={{fontSize:15,fontWeight:700}}>Edit Log Entry</span>
          <button style={{background:"none",border:"none",color:"#3b82f6",fontSize:13,fontWeight:700,cursor:"pointer"}} onClick={saveEditedRecipeEntry}>Save</button>
        </div>
        <div style={S.section}>
          <div style={{fontSize:14,fontWeight:600,color:"#a78bfa",marginBottom:12}}>📖 {editingLogEntry.recipeName}</div>
          <div style={S.card}>
            <label style={S.label}>Servings</label>
            <input style={{...S.input,marginBottom:8}} type="number" inputMode="decimal" value={editLogServings} onChange={e => setEditLogServings(e.target.value)}/>
            <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:16}}>
              {[0.5,1,1.5,2,3,4].map(q => <button key={q} style={S.pill(editLogServings===String(q))} onClick={() => setEditLogServings(String(q))}>{q===0.5?"½":q}</button>)}
            </div>
            <label style={S.label}>Meal</label>
            <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:16}}>
              {MEALS.map(m => <button key={m} style={S.pill(editLogMeal===m)} onClick={() => setEditLogMeal(m)}>{m}</button>)}
            </div>
            <div style={{background:"#0a0f1a",borderRadius:10,padding:12}}>
              <div style={{fontSize:11,fontWeight:700,color:"#475569",marginBottom:8,textTransform:"uppercase"}}>Preview at {Math.round(servings*10)/10} serving{servings===1?"":"s"}</div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:6}}>
                {MACROS.map(k => (<div key={k} style={{textAlign:"center"}}><div style={{fontSize:14,fontWeight:700,color:NUTRIENT_META[k].color}}>{Math.round((nut[k]??0)*10)/10}</div><div style={{fontSize:10,color:"#64748b"}}>{NUTRIENT_META[k].label}</div></div>))}
              </div>
            </div>
          </div>
          <div style={S.card}>
            <div style={{fontSize:13,fontWeight:700,color:"#94a3b8",marginBottom:10,textTransform:"uppercase",letterSpacing:"0.05em"}}>Ingredients at this serving</div>
            {previewDI.map((ing, i) => (
              <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"7px 0",borderBottom:i<previewDI.length-1?"1px solid #1e293b":"none"}}>
                <div style={{fontSize:13,color:"#e2e8f0"}}>{ing.foodName}</div>
                <div style={{fontSize:12,color:"#64748b"}}>{ing.amount_g}g</div>
              </div>
            ))}
            {previewDI.length === 0 && <div style={{fontSize:13,color:"#475569",textAlign:"center",padding:"12px 0"}}>No ingredient data captured at log time</div>}
          </div>
        </div>
      </div>
    );
  }

  // ── EDIT LOGGED EXERCISE ──────────────────────────────────────────────
  if (view === "editLoggedExercise" && editingLogEntry) {
    const dur     = parseFloat(editLogDuration) || 0;
    const act     = EXERCISE_ACTIVITIES.find(a => a.id === editLogActivityId) || EXERCISE_ACTIVITIES[0];
    const wt      = parseFloat(profile?.weightKg) || 70;
    const autoBurn = Math.round(act.met * wt * (dur / 60));
    const previewBurn = editLogBurn !== "" ? (parseInt(editLogBurn) || 0) : autoBurn;
    const actGroups = EXERCISE_ACTIVITIES.reduce((acc,a) => { if (!acc[a.label]) acc[a.label]=[]; acc[a.label].push(a); return acc; }, {});
    return (
      <div style={S.app}>
        <div style={S.header}>
          <button style={{background:"none",border:"none",color:"#94a3b8",fontSize:15,cursor:"pointer"}} onClick={() => { setEditingLogEntry(null); setView("log"); }}>← Back</button>
          <span style={{fontSize:15,fontWeight:700}}>Edit Exercise</span>
          <button style={{background:"none",border:"none",color:"#3b82f6",fontSize:13,fontWeight:700,cursor:"pointer"}} onClick={saveEditedExerciseEntry}>Save</button>
        </div>
        <div style={S.section}>
          {!profile.weightKg && <div style={{background:"#2d1f00",border:"1px solid #f59e0b",borderRadius:10,padding:"10px 14px",marginBottom:12,fontSize:12,color:"#f59e0b"}}>No weight set in Settings — using 70kg default</div>}
          <div style={S.card}>
            <label style={S.label}>Activity</label>
            {Object.entries(actGroups).map(([grp,acts]) => (
              <div key={grp} style={{marginBottom:10}}>
                <div style={{fontSize:11,color:"#475569",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.05em",marginBottom:6}}>{grp}</div>
                <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                  {acts.map(a => <button key={a.id} style={S.pill(editLogActivityId===a.id)} onClick={() => { setEditLogActivityId(a.id); setEditLogBurn(""); }}>{a.intensity}</button>)}
                </div>
              </div>
            ))}
            <label style={{...S.label,marginTop:8}}>Duration (minutes)</label>
            <input style={{...S.input,marginBottom:8}} type="number" inputMode="numeric" value={editLogDuration}
              onChange={e => { setEditLogDuration(e.target.value); setEditLogBurn(""); }}/>
            <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:16}}>
              {[30,45,60,90,120,180].map(d => <button key={d} style={S.pill(editLogDuration===String(d)&&editLogBurn==="")} onClick={() => { setEditLogDuration(String(d)); setEditLogBurn(""); }}>{d}</button>)}
            </div>
            <div style={{background:"#0a0f1a",borderRadius:10,padding:14,marginBottom:16}}>
              <div style={{fontSize:11,fontWeight:700,color:"#475569",marginBottom:10,textTransform:"uppercase"}}>Estimated Burn</div>
              <div style={{display:"flex",alignItems:"center",gap:12}}>
                <div style={{fontSize:32,fontWeight:700,color:"#4ade80"}}>{previewBurn}</div>
                <div style={{fontSize:12,color:"#64748b"}}>kcal<br/>{act.label} · {act.intensity}<br/>{dur} min @ MET {act.met}</div>
              </div>
              <div style={{marginTop:12}}>
                <label style={S.label}>Override (optional)</label>
                <input style={S.input} type="number" inputMode="numeric" placeholder={"Auto: "+autoBurn+" kcal"} value={editLogBurn} onChange={e => setEditLogBurn(e.target.value)}/>
              </div>
            </div>
            <button style={{width:"100%",padding:14,borderRadius:12,border:"none",background:dur>0?"#16a34a":"#1e293b",color:dur>0?"#fff":"#64748b",fontSize:15,fontWeight:700,cursor:dur>0?"pointer":"default"}} disabled={dur<=0} onClick={saveEditedExerciseEntry}>Save Changes</button>
          </div>
        </div>
      </div>
    );
  }

  // ── EDIT LOGGED SUPPLEMENT ────────────────────────────────────────────
  if (view === "editLoggedSupp" && editingLogEntry) {
    return (
      <div style={S.app}>
        <div style={S.header}>
          <button style={{background:"none",border:"none",color:"#94a3b8",fontSize:15,cursor:"pointer"}} onClick={() => { setEditingLogEntry(null); setView("log"); }}>← Back</button>
          <span style={{fontSize:15,fontWeight:700}}>Edit Supplement Log</span>
          <button style={{background:"none",border:"none",color:"#3b82f6",fontSize:13,fontWeight:700,cursor:"pointer"}} onClick={saveEditedSuppEntry}>Save</button>
        </div>
        <div style={S.section}>
          <div style={{fontSize:14,fontWeight:600,color:"#c4b5fd",marginBottom:12}}>💊 {editingLogEntry.stackName}</div>
          <div style={{fontSize:12,color:"#64748b",marginBottom:10}}>Adjust doses. Tap a dose field to override.</div>
          <div style={S.card}>
            {editLogSuppItems.map((item, idx) => (
              <div key={idx} style={{...S.suppRow}}>
                <div style={{flex:1}}>
                  <div style={{fontSize:14,fontWeight:500,color:"#e2e8f0"}}>{item.name}</div>
                  <div style={{fontSize:12,color:"#64748b",marginTop:2}}>Logged: {item.dose_amount}{item.dose_unit}</div>
                </div>
                <div style={{width:100}}>
                  <input style={{...S.input,width:"100%",padding:"6px 8px",fontSize:13,textAlign:"right"}} type="number" inputMode="decimal"
                    placeholder={String(item.dose_amount)} value={item.doseOverride}
                    onChange={e => setEditLogSuppItems(prev => prev.map((x,i) => i===idx ? {...x, doseOverride: e.target.value} : x))}/>
                  <div style={{fontSize:10,color:"#475569",textAlign:"right",marginTop:2}}>{item.dose_unit}</div>
                </div>
              </div>
            ))}
          </div>
          <button style={{width:"100%",padding:14,borderRadius:12,border:"none",background:"#7c3aed",color:"#fff",fontSize:15,fontWeight:700,cursor:"pointer",marginTop:8}} onClick={saveEditedSuppEntry}>Save Changes</button>
        </div>
      </div>
    );
  }

  // ── MANAGE CUSTOM FOODS ───────────────────────────────────────────────
  if (view === "manageCustomFoods") {
    const active  = customFoods.filter(f => !f.deleted);
    const deleted = customFoods.filter(f =>  f.deleted);
    return (
      <div style={S.app}>
        <div style={S.header}>
          <button style={{background:"none",border:"none",color:"#94a3b8",fontSize:15,cursor:"pointer"}} onClick={() => setView("add")}>← Back</button>
          <span style={{fontSize:15,fontWeight:700}}>Custom Foods</span>
          <button style={{background:"none",border:"none",color:"#3b82f6",fontSize:13,fontWeight:600,cursor:"pointer"}} onClick={() => setView("customAdd")}>+ New</button>
        </div>
        <div style={S.section}>
          {active.length === 0 && deleted.length === 0 && (
            <div style={{textAlign:"center",padding:"40px 0",color:"#475569"}}><div style={{fontSize:32,marginBottom:8}}>🥘</div><div style={{fontSize:14}}>No custom foods yet</div></div>
          )}
          {active.length > 0 && (
            <div style={S.card}>
              <div style={{fontSize:13,fontWeight:700,color:"#94a3b8",marginBottom:10,textTransform:"uppercase",letterSpacing:"0.05em"}}>Active ({active.length})</div>
              {active.map((f, i) => (
                <div key={f.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 0",borderBottom:i<active.length-1?"1px solid #1e293b":"none"}}>
                  <div>
                    <div style={{fontSize:14,fontWeight:500,color:"#e2e8f0"}}>{f.name}</div>
                    <div style={{fontSize:11,color:"#64748b"}}>{f.cat} · {f.cal} kcal/100g</div>
                  </div>
                  <button style={{background:"none",border:"1px solid #ef4444",borderRadius:8,color:"#ef4444",fontSize:12,fontWeight:600,padding:"4px 10px",cursor:"pointer"}} onClick={() => softDeleteCustomFood(f.id)}>Delete</button>
                </div>
              ))}
            </div>
          )}
          {deleted.length > 0 && (
            <div style={{...S.card,marginTop:12,opacity:0.7}}>
              <div style={{fontSize:13,fontWeight:700,color:"#64748b",marginBottom:10,textTransform:"uppercase",letterSpacing:"0.05em"}}>Deleted ({deleted.length})</div>
              <div style={{fontSize:11,color:"#475569",marginBottom:10}}>Deleted foods are hidden from search but historical log entries still display correctly.</div>
              {deleted.map((f, i) => (
                <div key={f.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 0",borderBottom:i<deleted.length-1?"1px solid #1e293b":"none"}}>
                  <div>
                    <div style={{fontSize:14,fontWeight:500,color:"#64748b",textDecoration:"line-through"}}>{f.name}</div>
                    <div style={{fontSize:11,color:"#475569"}}>{f.cat} · {f.cal} kcal/100g</div>
                  </div>
                  <button style={{background:"none",border:"1px solid #3b82f6",borderRadius:8,color:"#3b82f6",fontSize:12,fontWeight:600,padding:"4px 10px",cursor:"pointer"}} onClick={() => restoreCustomFood(f.id)}>Restore</button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  return null;
}
