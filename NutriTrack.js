// NutriTrack - Pre-compiled by Babel (nutritrack-v75)
// Built from NutriTrack.jsx on 2026-08-22T02:49:51.020Z
// React and ReactDOM are UMD globals loaded from CDN
function _regeneratorValues(e) { if (null != e) { var t = e["function" == typeof Symbol && Symbol.iterator || "@@iterator"], r = 0; if (t) return t.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) return { next: function next() { return e && r >= e.length && (e = void 0), { value: e && e[r++], done: !e }; } }; } throw new TypeError(_typeof(e) + " is not iterable"); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n7 = 0, F = function F() {}; return { s: F, n: function n() { return _n7 >= r.length ? { done: !0 } : { done: !1, value: r[_n7++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
// FOOD_DB is loaded asynchronously from /NutriTrack/foods.json at app start.
// Use the foodDB state (and allFoods / allFoodsForRender derived values) inside
// the NutriTrack component. Do not reference FOOD_DB anywhere directly.
// test
// Maps a foods.json v1 record (full names) to the internal abbreviation-keyed shape
// the JSX uses throughout. All downstream code is unchanged.
function mapFoodRecord(r) {
  var _r$source, _r$fdc_id, _r$alcohol, _r$water, _r$servings;
  return {
    id: r.id,
    name: r.name,
    cat: r.category,
    source: (_r$source = r.source) !== null && _r$source !== void 0 ? _r$source : "usda",
    fdc_id: (_r$fdc_id = r.fdc_id) !== null && _r$fdc_id !== void 0 ? _r$fdc_id : null,
    cal: r.calories,
    pro: r.protein,
    carb: r.carbohydrates,
    fat: r.fat,
    fib: r.fibre,
    alc: (_r$alcohol = r.alcohol) !== null && _r$alcohol !== void 0 ? _r$alcohol : 0,
    // Phase 11: alcohol grams per 100g/ml
    water: (_r$water = r.water) !== null && _r$water !== void 0 ? _r$water : 0,
    // Phase 11: water grams per 100g/ml (logged as ml)
    fibSol: r.fibre_soluble,
    fibInsol: r.fibre_insoluble,
    fatSat: r.fat_saturated,
    fatMufa: r.fat_mufa,
    fatPufa: r.fat_pufa,
    aaHis: r.histidine,
    aaIle: r.isoleucine,
    aaLeu: r.leucine,
    aaLys: r.lysine,
    aaMet: r.methionine,
    aaPhe: r.phenylalanine,
    aaThr: r.threonine,
    aaTrp: r.tryptophan,
    aaVal: r.valine,
    iron: r.iron,
    calc: r.calcium,
    zinc: r.zinc,
    b12: r.b12,
    vitD: r.vitamin_d,
    omega3: r.omega3,
    iod: r.iodine,
    sel: r.selenium,
    mag: r.magnesium,
    pot: r.potassium,
    fol: r.folate,
    sod: r.sodium,
    vitA: r.vitamin_a,
    vitC: r.vitamin_c,
    servings: (_r$servings = r.servings) !== null && _r$servings !== void 0 ? _r$servings : null // optional [{ label, grams }] for preset chips (W0)
  };
}

// App version, exposed by index.html (window.APP_VERSION). Used by the
// Settings > About panel for on-device diagnostics. Falls back if the
// global isn't set (e.g. running outside the deployed shell).
var APP_VERSION = typeof window !== "undefined" && window.APP_VERSION || "unknown";

// Bump this string whenever you deploy a new foods.json to bust the ATHS cache.
var FOODS_DB_VERSION = "5"; // Bumped for Phase 11.5;
function loadFoodDB() {
  return _loadFoodDB.apply(this, arguments);
} // ── WORKER CONFIG ─────────────────────────────────────────────────────────
function _loadFoodDB() {
  _loadFoodDB = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7() {
    var resp, envelope;
    return _regenerator().w(function (_context7) {
      while (1) switch (_context7.n) {
        case 0:
          _context7.n = 1;
          return fetch("./foods.json?v=".concat(FOODS_DB_VERSION));
        case 1:
          resp = _context7.v;
          if (resp.ok) {
            _context7.n = 2;
            break;
          }
          throw new Error("foods.json fetch failed: ".concat(resp.status));
        case 2:
          _context7.n = 3;
          return resp.json();
        case 3:
          envelope = _context7.v;
          if (!(!envelope.schema_version || envelope.schema_version !== 1)) {
            _context7.n = 4;
            break;
          }
          throw new Error("foods.json unexpected schema_version: ".concat(envelope.schema_version));
        case 4:
          return _context7.a(2, envelope.foods.map(mapFoodRecord));
      }
    }, _callee7);
  }));
  return _loadFoodDB.apply(this, arguments);
}
var WORKER_URL = "https://nutritrack-proxy.nickkropf.workers.dev";
var WORKER_FETCH_CONCURRENCY = 3;
var SUPP_DOSE_UNITS = ["mcg", "mg", "g", "IU", "tablet", "capsule", "ml", "tsp", "tbsp"];
var UNIT_TO_G = {
  g: 1,
  gram: 1,
  grams: 1,
  kg: 1000,
  ml: 1,
  milliliter: 1,
  millilitre: 1,
  milliliters: 1,
  millilitres: 1,
  l: 1000,
  liter: 1,
  litre: 1,
  liters: 1,
  litres: 1,
  tsp: 5,
  teaspoon: 5,
  teaspoons: 5,
  tbsp: 15,
  tablespoon: 15,
  tablespoons: 15,
  cup: 240,
  cups: 240,
  oz: 28.35,
  ounce: 28.35,
  ounces: 28.35,
  lb: 453.6,
  pound: 453.6,
  pounds: 453.6,
  whole: 1,
  piece: 1,
  pinch: 1
};
function toGrams(amount, unit) {
  var _UNIT_TO_G$toLowerCas;
  var f = (_UNIT_TO_G$toLowerCas = UNIT_TO_G[(unit || "g").toLowerCase()]) !== null && _UNIT_TO_G$toLowerCas !== void 0 ? _UNIT_TO_G$toLowerCas : 1;
  return Math.round(amount * f * 10) / 10;
}
var TYPICAL_WEIGHT_G = {
  "onion": 110,
  "onion small": 70,
  "onion medium": 110,
  "onion large": 150,
  "garlic clove": 3,
  "garlic": 3,
  "shallot": 30,
  "spring onion": 15,
  "leek": 150,
  "leek stick": 150,
  "tomato": 120,
  "tomato small": 70,
  "tomato medium": 120,
  "tomato large": 180,
  "cherry tomato": 17,
  "lemon": 65,
  "lime": 45,
  "orange": 140,
  "apple": 180,
  "pear": 180,
  "banana": 120,
  "avocado": 150,
  "potato": 170,
  "sweet potato": 180,
  "carrot": 60,
  "beetroot": 150,
  "bell pepper": 120,
  "capsicum": 120,
  "cucumber": 200,
  "bay leaf": 0.5,
  "thyme sprig": 1,
  "thyme": 1,
  "rosemary sprig": 2,
  "rosemary": 2,
  "parsley sprig": 2,
  "sage leaf": 0.3,
  "chili": 5,
  "chilli": 5,
  "chili pepper": 5,
  "chilli pepper": 5
};
var COUNT_NOUNS = new Set(["clove", "cloves", "slice", "slices", "sprig", "sprigs", "piece", "pieces", "head", "heads", "stalk", "stalks", "stick", "sticks", "bunch", "bunches"]);
var SIZE_ADJECTIVES = new Set(["small", "medium", "large"]);
var LEADING_QUALIFIERS = /^(about|approximately|approx\.?|roughly|around|~)\s+/i;
var PREP_MODIFIERS = new Set(["minced", "chopped", "diced", "sliced", "crushed", "grated", "shredded", "peeled", "cubed", "halved", "quartered", "julienned", "mashed", "ground", "fresh", "dried", "frozen", "raw", "cooked", "roasted", "toasted", "finely", "coarsely", "thinly", "thickly", "lightly", "freshly", "optional", "divided", "softened", "melted", "chilled", "cold", "warm", "hot"]);
var FOOD_IDENTITY_MODIFIERS = new Set(["vinegar", "juice", "oil", "paste", "sauce", "powder", "extract", "syrup", "butter", "cream", "milk", "flour", "stock", "broth", "wine"]);
function isModifierMismatch(ingredientName, foodBaseName) {
  var ingTokens = ingredientName.toLowerCase().split(/\s+/).filter(Boolean);
  var foodTokens = foodBaseName.toLowerCase().split(/\s+/).filter(Boolean);
  if (!ingTokens.length) return false;
  var last = ingTokens[ingTokens.length - 1];
  if (!FOOD_IDENTITY_MODIFIERS.has(last)) return false;
  return !foodTokens.includes(last);
}
function fuzzyMatchFood(name, allFoods) {
  if (!name) return null;
  var n = name.toLowerCase().trim();
  var m = allFoods.find(function (f) {
    return f.name.toLowerCase() === n;
  });
  if (m) return m;
  m = allFoods.find(function (f) {
    return f.name.toLowerCase().startsWith(n) && n.length > 3;
  });
  if (m) return m;
  m = allFoods.find(function (f) {
    var base = f.name.toLowerCase().split(" (")[0];
    if (base.length <= 3 || !n.includes(base) || isModifierMismatch(n, base)) return false;
    return true;
  });
  if (m) return m;
  m = allFoods.find(function (f) {
    return f.name.toLowerCase().includes(n) && n.length > 3;
  });
  if (m) return m;
  m = allFoods.find(function (f) {
    var SKIP = new Set(["dry", "cooked", "raw", "ground", "firm", "plain", "canned", "rolled", "per", "100ml", "abv"]);
    var words = f.name.toLowerCase().replace(/[()]/g, "").split(" ").filter(function (w) {
      return w.length > 3 && !SKIP.has(w);
    });
    if (!words.length || !words.every(function (w) {
      return n.includes(w);
    })) return false;
    var base = f.name.toLowerCase().split(" (")[0];
    return !isModifierMismatch(n, base);
  });
  return m || null;
}
function workerHeaders() {
  return {
    "Content-Type": "application/json"
  };
}
function workerFetch(_x, _x2) {
  return _workerFetch.apply(this, arguments);
}
function _workerFetch() {
  _workerFetch = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8(path, init) {
    var res, data, r, _t0, _t1;
    return _regenerator().w(function (_context8) {
      while (1) switch (_context8.p = _context8.n) {
        case 0:
          _context8.p = 0;
          _context8.n = 1;
          return fetch("".concat(WORKER_URL).concat(path), init);
        case 1:
          res = _context8.v;
          _context8.n = 3;
          break;
        case 2:
          _context8.p = 2;
          _t0 = _context8.v;
          throw new Error("network: ".concat(_t0.message || "fetch failed"));
        case 3:
          data = null;
          _context8.p = 4;
          _context8.n = 5;
          return res.json();
        case 5:
          data = _context8.v;
          _context8.n = 7;
          break;
        case 6:
          _context8.p = 6;
          _t1 = _context8.v;
        case 7:
          if (res.ok) {
            _context8.n = 8;
            break;
          }
          r = data && (data.reason || data.error || data.detail) || "http_".concat(res.status);
          throw new Error("worker_".concat(res.status, ": ").concat(r));
        case 8:
          return _context8.a(2, data);
      }
    }, _callee8, null, [[4, 6], [0, 2]]);
  }));
  return _workerFetch.apply(this, arguments);
}
function fetchHealth() {
  return _fetchHealth.apply(this, arguments);
}
function _fetchHealth() {
  _fetchHealth = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9() {
    return _regenerator().w(function (_context9) {
      while (1) switch (_context9.n) {
        case 0:
          return _context9.a(2, workerFetch("/health", {
            method: "GET",
            headers: workerHeaders()
          }));
      }
    }, _callee9);
  }));
  return _fetchHealth.apply(this, arguments);
}
function fetchRecipesList(_x3) {
  return _fetchRecipesList.apply(this, arguments);
}
function _fetchRecipesList() {
  _fetchRecipesList = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0(since) {
    var body;
    return _regenerator().w(function (_context0) {
      while (1) switch (_context0.n) {
        case 0:
          body = since ? {
            since: since
          } : {};
          return _context0.a(2, workerFetch("/recipes/list", {
            method: "POST",
            headers: workerHeaders(),
            body: JSON.stringify(body)
          }));
      }
    }, _callee0);
  }));
  return _fetchRecipesList.apply(this, arguments);
}
function fetchRecipePage(_x4) {
  return _fetchRecipePage.apply(this, arguments);
}
function _fetchRecipePage() {
  _fetchRecipePage = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee1(pageId) {
    return _regenerator().w(function (_context1) {
      while (1) switch (_context1.n) {
        case 0:
          return _context1.a(2, workerFetch("/recipes/page", {
            method: "POST",
            headers: workerHeaders(),
            body: JSON.stringify({
              page_id: pageId
            })
          }));
      }
    }, _callee1);
  }));
  return _fetchRecipePage.apply(this, arguments);
}
function fetchRecipePagesWithProgress(_x5, _x6) {
  return _fetchRecipePagesWithProgress.apply(this, arguments);
}
function _fetchRecipePagesWithProgress() {
  _fetchRecipePagesWithProgress = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee11(recipes, onProgress) {
    var results, cursor, completed, worker, _worker, pool;
    return _regenerator().w(function (_context11) {
      while (1) switch (_context11.n) {
        case 0:
          _worker = function _worker3() {
            _worker = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee10() {
              var idx, r, d, _t10;
              return _regenerator().w(function (_context10) {
                while (1) switch (_context10.p = _context10.n) {
                  case 0:
                    if (!true) {
                      _context10.n = 6;
                      break;
                    }
                    idx = cursor++;
                    if (!(idx >= recipes.length)) {
                      _context10.n = 1;
                      break;
                    }
                    return _context10.a(2);
                  case 1:
                    r = recipes[idx];
                    _context10.p = 2;
                    _context10.n = 3;
                    return fetchRecipePage(r.id);
                  case 3:
                    d = _context10.v;
                    results[idx] = _objectSpread(_objectSpread({}, r), {}, {
                      ingredientLines: d.ingredientLines || [],
                      warning: d.warning || null
                    });
                    _context10.n = 5;
                    break;
                  case 4:
                    _context10.p = 4;
                    _t10 = _context10.v;
                    results[idx] = _objectSpread(_objectSpread({}, r), {}, {
                      ingredientLines: [],
                      error: _t10.message || "fetch failed"
                    });
                  case 5:
                    completed++;
                    if (onProgress) onProgress(completed);
                    _context10.n = 0;
                    break;
                  case 6:
                    return _context10.a(2);
                }
              }, _callee10, null, [[2, 4]]);
            }));
            return _worker.apply(this, arguments);
          };
          worker = function _worker2() {
            return _worker.apply(this, arguments);
          };
          results = new Array(recipes.length);
          cursor = 0, completed = 0;
          pool = Array.from({
            length: Math.min(WORKER_FETCH_CONCURRENCY, recipes.length)
          }, function () {
            return worker();
          });
          _context11.n = 1;
          return Promise.all(pool);
        case 1:
          return _context11.a(2, results);
      }
    }, _callee11);
  }));
  return _fetchRecipePagesWithProgress.apply(this, arguments);
}
var UNICODE_FRACTIONS = {
  "\xBC": 0.25,
  "\xBD": 0.5,
  "\xBE": 0.75,
  "\u2153": 1 / 3,
  "\u2154": 2 / 3,
  "\u215B": 0.125
};
var KNOWN_UNITS = new Set(["g", "gram", "grams", "kg", "kilogram", "kilograms", "ml", "milliliter", "millilitre", "milliliters", "millilitres", "l", "liter", "litre", "liters", "litres", "tsp", "teaspoon", "teaspoons", "tbsp", "tablespoon", "tablespoons", "tbs", "cup", "cups", "oz", "ounce", "ounces", "lb", "lbs", "pound", "pounds", "pinch", "pinches", "dash", "dashes"]);
function normaliseUnit(token) {
  var t = token.toLowerCase();
  if (t === "gram" || t === "grams") return "g";
  if (t === "kilogram" || t === "kilograms") return "kg";
  if (t === "milliliter" || t === "millilitre" || t === "milliliters" || t === "millilitres") return "ml";
  if (t === "liter" || t === "litre" || t === "liters" || t === "litres") return "l";
  if (t === "teaspoon" || t === "teaspoons") return "tsp";
  if (t === "tablespoon" || t === "tablespoons" || t === "tbs") return "tbsp";
  if (t === "cups") return "cup";
  if (t === "ounce" || t === "ounces") return "oz";
  if (t === "lbs" || t === "pound" || t === "pounds") return "lb";
  if (t === "pinches") return "pinch";
  if (t === "dash" || t === "dashes") return "pinch";
  return t;
}
function stripPrepModifiers(tokens) {
  var arr = tokens.slice(),
    changed = true;
  while (changed && arr.length) {
    changed = false;
    if (PREP_MODIFIERS.has(arr[arr.length - 1].toLowerCase())) {
      arr = arr.slice(0, -1);
      changed = true;
    }
    if (arr.length && PREP_MODIFIERS.has(arr[0].toLowerCase())) {
      arr = arr.slice(1);
      changed = true;
    }
  }
  return arr;
}
function singulariseName(name) {
  var n = name.trim();
  if (n.length < 4) return n;
  if (n.endsWith("ss") || n.endsWith("us")) return n;
  if (n.endsWith("leaves")) return n.slice(0, -6) + "leaf";
  if (n.endsWith("oes") && n.length > 4) return n.slice(0, -2);
  if (n.endsWith("ies") && n.length > 4) return n.slice(0, -3) + "y";
  if (n.endsWith("s")) return n.slice(0, -1);
  return n;
}
function parseQuantity(s) {
  var str = s.trim();
  if (!str) return null;
  var fc = str[0];
  if (UNICODE_FRACTIONS[fc] !== undefined) return {
    amount: UNICODE_FRACTIONS[fc],
    rest: str.slice(1).trim()
  };
  var ma = str.match(/^(\d+)\s+(\d+)\/(\d+)\b/);
  if (ma) {
    var w = parseInt(ma[1]),
      n = parseInt(ma[2]),
      d = parseInt(ma[3]);
    if (d !== 0) return {
      amount: w + n / d,
      rest: str.slice(ma[0].length).trim()
    };
  }
  var mu = str.match(/^(\d+)\s+([\u00BC-\u00BE\u2153-\u215E])/);
  if (mu) {
    var _w = parseInt(mu[1]),
      f = UNICODE_FRACTIONS[mu[2]];
    if (f !== undefined) return {
      amount: _w + f,
      rest: str.slice(mu[0].length).trim()
    };
  }
  var dr = str.match(/^(\d+(?:[.,]\d+)?)\s*[-\u2013\u2014]\s*\d+(?:[.,]\d+)?/);
  if (dr) return {
    amount: parseFloat(dr[1].replace(",", ".")),
    rest: str.slice(dr[0].length).trim()
  };
  var wr = str.match(/^(\d+(?:[.,]\d+)?)\s+to\s+\d+(?:[.,]\d+)?/i);
  if (wr) return {
    amount: parseFloat(wr[1].replace(",", ".")),
    rest: str.slice(wr[0].length).trim()
  };
  var fr = str.match(/^(\d+)\/(\d+)\b/);
  if (fr) {
    var _n = parseInt(fr[1]),
      _d = parseInt(fr[2]);
    if (_d !== 0) return {
      amount: _n / _d,
      rest: str.slice(fr[0].length).trim()
    };
  }
  var nm = str.match(/^(\d+(?:[.,]\d+)?)/);
  if (nm) return {
    amount: parseFloat(nm[1].replace(",", ".")),
    rest: str.slice(nm[0].length).trim()
  };
  return null;
}
function parseIngredientLine(rawLine) {
  if (!rawLine || typeof rawLine !== "string") return null;
  var line = rawLine.replace(/\s+/g, " ").trim();
  if (!line) return null;
  line = line.replace(LEADING_QUALIFIERS, "").replace(/^~\s*/, "");
  var lp = line.match(/^\(([^)]*)\)\s+/);
  if (lp) line = lp[1].trim() + " " + line.slice(lp[0].length).trim();
  var parentheticalOverride = null;
  var pm = line.match(/\s*\(([^)]*)\)\s*$/);
  if (pm) {
    var inner = pm[1].trim(),
      iq = parseQuantity(inner);
    if (iq && iq.rest) {
      var ut = iq.rest.split(/\s+/)[0].toLowerCase().replace(/[.,;:]+$/, "");
      var OU = new Set(["g", "gram", "grams", "kg", "ml", "l", "oz", "ounce", "ounces", "lb", "pound", "pounds"]);
      if (OU.has(ut)) parentheticalOverride = {
        amount: iq.amount,
        unit: normaliseUnit(ut)
      };
    }
    line = line.slice(0, pm.index).trim();
  }
  var ac = line.match(/^(.+?[A-Za-z]),\s/);
  if (ac) line = ac[1].trim();
  if (!line) return null;
  var amount,
    rest,
    pcu = "";
  var q = parseQuantity(line);
  if (q) {
    amount = q.amount;
    rest = q.rest;
  } else {
    var ft = line.split(/\s+/)[0].toLowerCase().replace(/[.,;:]+$/, "");
    if (KNOWN_UNITS.has(ft)) {
      amount = 1;
      pcu = normaliseUnit(ft);
      rest = line.slice(line.indexOf(line.split(/\s+/)[0]) + line.split(/\s+/)[0].length).trim();
    } else return null;
  }
  if (!rest) return null;
  var tokens = rest.split(/\s+/);
  if (!tokens.length) return null;
  var unit = pcu,
    nameTokens = tokens.slice();
  if (!unit) {
    var fl = tokens[0].toLowerCase(),
      fs = fl.replace(/[.,;:]+$/, "");
    if (KNOWN_UNITS.has(fs)) {
      unit = normaliseUnit(fs);
      nameTokens = tokens.slice(1);
    }
  }
  if (unit && nameTokens.length && nameTokens[0].toLowerCase() === "of") nameTokens = nameTokens.slice(1);
  if (!unit) {
    if (!nameTokens.length) return null;
    var size = "";
    if (SIZE_ADJECTIVES.has(nameTokens[0].toLowerCase())) {
      size = nameTokens[0].toLowerCase();
      nameTokens = nameTokens.slice(1);
    }
    if (!nameTokens.length) return null;
    nameTokens = stripPrepModifiers(nameTokens);
    if (!nameTokens.length) return null;
    var countNoun = "";
    if (nameTokens.length >= 2 && COUNT_NOUNS.has(nameTokens[nameTokens.length - 1].toLowerCase())) {
      countNoun = nameTokens[nameTokens.length - 1].toLowerCase();
      nameTokens = nameTokens.slice(0, -1);
    } else if (nameTokens.length >= 2 && COUNT_NOUNS.has(nameTokens[0].toLowerCase())) {
      countNoun = nameTokens[0].toLowerCase();
      nameTokens = nameTokens.slice(1);
      if (nameTokens.length && nameTokens[0].toLowerCase() === "of") nameTokens = nameTokens.slice(1);
    }
    if (!nameTokens.length) return null;
    var rawName = nameTokens.join(" ").toLowerCase().trim(),
      singular = singulariseName(rawName);
    if (!singular) return null;
    var weight;
    if (countNoun) {
      var lk = singulariseName(countNoun);
      weight = TYPICAL_WEIGHT_G["".concat(singular, " ").concat(lk)] !== undefined ? TYPICAL_WEIGHT_G["".concat(singular, " ").concat(lk)] : TYPICAL_WEIGHT_G[singular];
    } else if (size) {
      weight = TYPICAL_WEIGHT_G["".concat(singular, " ").concat(size)] !== undefined ? TYPICAL_WEIGHT_G["".concat(singular, " ").concat(size)] : TYPICAL_WEIGHT_G[singular];
    } else weight = TYPICAL_WEIGHT_G[singular];
    if (weight === undefined) weight = 100;
    if (parentheticalOverride) return {
      name: singular,
      amount: parentheticalOverride.amount,
      unit: parentheticalOverride.unit
    };
    return {
      name: singular,
      amount: Math.round(amount * weight * 10) / 10,
      unit: "g"
    };
  }
  nameTokens = stripPrepModifiers(nameTokens);
  var name = nameTokens.join(" ").toLowerCase().trim();
  if (!name) return null;
  if (parentheticalOverride) return {
    name: name,
    amount: parentheticalOverride.amount,
    unit: parentheticalOverride.unit
  };
  return {
    name: name,
    amount: amount,
    unit: unit
  };
}
function parseIngredientsLocal(_x7) {
  return _parseIngredientsLocal.apply(this, arguments);
}
function _parseIngredientsLocal() {
  _parseIngredientsLocal = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee12(ingredientLines) {
    return _regenerator().w(function (_context12) {
      while (1) switch (_context12.n) {
        case 0:
          if (!(!ingredientLines || !ingredientLines.length)) {
            _context12.n = 1;
            break;
          }
          return _context12.a(2, []);
        case 1:
          return _context12.a(2, ingredientLines.map(function (l) {
            var p = parseIngredientLine(l);
            return p || {
              name: (l || "").trim().toLowerCase(),
              amount: 0,
              unit: ""
            };
          }));
      }
    }, _callee12);
  }));
  return _parseIngredientsLocal.apply(this, arguments);
}
function parseIngredients(_x8) {
  return _parseIngredients.apply(this, arguments);
} // Phase 7a: local-only recipe splitter. No external calls; full privacy.
// Splits pasted text into recipes on markdown headings (#/##/###) or lines
// ending in a colon, then collects the non-blank lines that follow as
// ingredient lines. Returns the same shape the Claude call returned:
// [{ title, servings, source, ingredientLines }].
function _parseIngredients() {
  _parseIngredients = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee13(ingredientLines) {
    return _regenerator().w(function (_context13) {
      while (1) switch (_context13.n) {
        case 0:
          return _context13.a(2, parseIngredientsLocal(ingredientLines));
      }
    }, _callee13);
  }));
  return _parseIngredients.apply(this, arguments);
}
function parseServingsFromTitle(title) {
  var m = title.match(/\((?:serves?|servings?)\s*([\d./]+)\)/i);
  if (m) {
    var v = parseQuantity(m[1]);
    if (v && v.amount) return Math.max(1, Math.round(v.amount));
  }
  var m2 = title.match(/(?:serves?|servings?)\s*([\d./]+)/i);
  if (m2) {
    var _v = parseQuantity(m2[1]);
    if (_v && _v.amount) return Math.max(1, Math.round(_v.amount));
  }
  return 4;
}
function parseRecipesFromPasteText(_x9) {
  return _parseRecipesFromPasteText.apply(this, arguments);
} // ── CONSTANTS ─────────────────────────────────────────────────────────────
// AA_EAR replaced by computeAAGoals(weightKg) — per-kg spreadsheet values
function _parseRecipesFromPasteText() {
  _parseRecipesFromPasteText = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee14(text) {
    var rawLines, recipes, current, isHeading, isIngredientLike, pushCurrent, _iterator5, _step5, _loop3, _ret2, lines, _t11;
    return _regenerator().w(function (_context15) {
      while (1) switch (_context15.p = _context15.n) {
        case 0:
          rawLines = (text || "").split(/\r?\n/);
          recipes = [];
          current = null;
          isHeading = function isHeading(line) {
            return /^(?:#{1,6}\s+|\s*\*\s+)/.test(line) || /:$/.test(line.trim());
          };
          isIngredientLike = function isIngredientLike(line) {
            var q = parseQuantity(line.replace(/^[\u2022\-\u2013\u2014\*]\s*/, "").trim());
            return !!q || KNOWN_UNITS.has(line.trim().split(/\s+/)[0].toLowerCase().replace(/[.,;:]+$/, ""));
          };
          pushCurrent = function pushCurrent() {
            if (current && current.ingredientLines.length) recipes.push(current);
          };
          _iterator5 = _createForOfIteratorHelper(rawLines);
          _context15.p = 1;
          _loop3 = /*#__PURE__*/_regenerator().m(function _loop3() {
            var line, t, cleaned, title, sv;
            return _regenerator().w(function (_context14) {
              while (1) switch (_context14.n) {
                case 0:
                  line = _step5.value;
                  t = line.trim();
                  if (t) {
                    _context14.n = 1;
                    break;
                  }
                  return _context14.a(2, 0);
                case 1:
                  cleaned = t.replace(/^[\u2022\-\u2013\u2014\*#]\s*/, "").replace(/#+\s*$/, "").trim();
                  if (!(isHeading(t) && (!isIngredientLike(t) || recipes.length === 0 && !(current && current.ingredientLines.length)))) {
                    _context14.n = 3;
                    break;
                  }
                  title = cleaned.replace(/:$/, "").trim();
                  if (title) {
                    _context14.n = 2;
                    break;
                  }
                  return _context14.a(2, 0);
                case 2:
                  pushCurrent();
                  current = {
                    title: title,
                    servings: parseServingsFromTitle(title),
                    source: "pasted",
                    ingredientLines: []
                  };
                  return _context14.a(2, 0);
                case 3:
                  // Standalone "serves/servings N" line before any ingredients -> servings count.
                  sv = cleaned.match(/^(?:serves?|servings?)\s*([\d./]+)$/i);
                  if (!(sv && current && !current.ingredientLines.length)) {
                    _context14.n = 4;
                    break;
                  }
                  current.servings = function () {
                    var v = parseQuantity(sv[1]);
                    return v && v.amount ? Math.max(1, Math.round(v.amount)) : current.servings;
                  }();
                  return _context14.a(2, 0);
                case 4:
                  if (!current) current = {
                    title: "Pasted recipe",
                    servings: 4,
                    source: "pasted",
                    ingredientLines: []
                  };
                  current.ingredientLines.push(cleaned);
                case 5:
                  return _context14.a(2);
              }
            }, _loop3);
          });
          _iterator5.s();
        case 2:
          if ((_step5 = _iterator5.n()).done) {
            _context15.n = 5;
            break;
          }
          return _context15.d(_regeneratorValues(_loop3()), 3);
        case 3:
          _ret2 = _context15.v;
          if (!(_ret2 === 0)) {
            _context15.n = 4;
            break;
          }
          return _context15.a(3, 4);
        case 4:
          _context15.n = 2;
          break;
        case 5:
          _context15.n = 7;
          break;
        case 6:
          _context15.p = 6;
          _t11 = _context15.v;
          _iterator5.e(_t11);
        case 7:
          _context15.p = 7;
          _iterator5.f();
          return _context15.f(7);
        case 8:
          pushCurrent();
          // Fallback: no recognisable structure -> treat the whole paste as one recipe.
          if (!(!recipes.length && rawLines.some(function (l) {
            return l && l.trim();
          }))) {
            _context15.n = 9;
            break;
          }
          lines = rawLines.map(function (l) {
            return l.trim();
          }).filter(Boolean);
          return _context15.a(2, [{
            title: "Pasted recipe",
            servings: 4,
            source: "pasted",
            ingredientLines: lines
          }]);
        case 9:
          return _context15.a(2, recipes);
      }
    }, _callee14, null, [[1, 6, 7, 8]]);
  }));
  return _parseRecipesFromPasteText.apply(this, arguments);
}
var AA_LABELS = {
  aaHis: "Histidine",
  aaIle: "Isoleucine",
  aaLeu: "Leucine",
  aaLys: "Lysine",
  aaMet: "Methionine",
  aaPhe: "Phenylalanine",
  aaThr: "Threonine",
  aaTrp: "Tryptophan",
  aaVal: "Valine"
};
var AA_KEYS = ["aaHis", "aaIle", "aaLeu", "aaLys", "aaMet", "aaPhe", "aaThr", "aaTrp", "aaVal"];
var NUTRIENT_META = {
  cal: {
    label: "Calories",
    unit: "kcal",
    color: "#F59E0B"
  },
  pro: {
    label: "Protein",
    unit: "g",
    color: "#3B82F6"
  },
  carb: {
    label: "Carbs",
    unit: "g",
    color: "#10B981"
  },
  fat: {
    label: "Fat",
    unit: "g",
    color: "#EF4444"
  },
  fib: {
    label: "Fibre",
    unit: "g",
    color: "#8B5CF6"
  },
  iron: {
    label: "Iron",
    unit: "mg",
    color: "#DC2626"
  },
  calc: {
    label: "Calcium",
    unit: "mg",
    color: "#94A3B8"
  },
  zinc: {
    label: "Zinc",
    unit: "mg",
    color: "#64748B"
  },
  b12: {
    label: "B12",
    unit: "mcg",
    color: "#E11D48"
  },
  vitD: {
    label: "Vitamin D",
    unit: "mcg",
    color: "#FBBF24"
  },
  omega3: {
    label: "Omega-3",
    unit: "g",
    color: "#06B6D4"
  },
  iod: {
    label: "Iodine",
    unit: "mcg",
    color: "#7C3AED"
  },
  sel: {
    label: "Selenium",
    unit: "mcg",
    color: "#D97706"
  },
  mag: {
    label: "Magnesium",
    unit: "mg",
    color: "#059669"
  },
  pot: {
    label: "Potassium",
    unit: "mg",
    color: "#EA580C"
  },
  fol: {
    label: "Folate",
    unit: "mcg",
    color: "#16A34A"
  },
  sod: {
    label: "Sodium",
    unit: "mg",
    color: "#F97316"
  },
  vitA: {
    label: "Vitamin A",
    unit: "mcg",
    color: "#EAB308"
  },
  vitC: {
    label: "Vitamin C",
    unit: "mg",
    color: "#84CC16"
  },
  alc: {
    label: "Alcohol",
    unit: "g",
    color: "#F87171"
  },
  // Phase 11: alcohol grams; calories (g x 7) added to daily total
  water: {
    label: "Water",
    unit: "ml",
    color: "#38BDF8"
  } // Phase 11: water content (g/100g logged as ml); has its own goal
};
var NUTRIENT_ALL_KEYS = ["cal", "pro", "carb", "fat", "fib", "alc", "water", "iron", "calc", "zinc", "b12", "vitD", "omega3", "iod", "sel", "mag", "pot", "fol", "sod", "vitA", "vitC"];

// ── Goal computation (spreadsheet formulas, May 2026) ───────────────────
// Source: Nutrient_Tracking_Logic_v1.xlsx
// Protein base: 1g/kg. Dynamic exercise multiplier applied in effectiveGoals (1.0–2.0×).
// Fat: 25% TDEE / 9. Carbs: residual after protein + fat kcal.
// Vegan iron: RDA × 1.8 (non-heme absorption). Vegan zinc: RDA × 1.5 (phytate inhibition).
// Fibre: 14g per 1000 kcal TDEE.
function computeGoals(profile) {
  var wt = parseFloat(profile === null || profile === void 0 ? void 0 : profile.weightKg) || 70;
  var ht = parseFloat(profile === null || profile === void 0 ? void 0 : profile.heightCm) || 170;
  var age = parseFloat(profile === null || profile === void 0 ? void 0 : profile.age) || 30;
  var male = ((profile === null || profile === void 0 ? void 0 : profile.sex) || "Male") !== "Female";
  // Mifflin-St Jeor BMR
  var bmr = 10 * wt + 6.25 * ht - 5 * age + (male ? 5 : -161);
  // TDEE: BMR × 1.1 (TEF/NEAT); Active_Kcal added dynamically via effectiveGoals
  var tdee = Math.round(bmr * 1.1);
  var pro = Math.round(wt * 1.0); // 1g/kg base
  var fat = Math.round(tdee * 0.25 / 9); // 25% TDEE
  var carb = Math.round((tdee - pro * 4 - fat * 9) / 4); // residual
  var fib = Math.round(tdee / 1000 * 14); // 14g/1000kcal
  return {
    cal: tdee,
    pro: pro,
    carb: Math.max(carb, 50),
    // floor to avoid negative on high-fat profiles
    fat: fat,
    fib: fib,
    // Vegan-adjusted micros (spreadsheet values)
    iron: male ? 14.4 : 32.4,
    // 8mg/18mg × 1.8
    calc: 1000,
    zinc: male ? 16.5 : 12.0,
    // 11mg/8mg × 1.5
    b12: 2.4,
    vitD: 15,
    omega3: 1.6,
    iod: 150,
    sel: 55,
    mag: male ? 420 : 320,
    pot: male ? 3400 : 2600,
    fol: 400,
    sod: 2300,
    vitA: male ? 900 : 700,
    vitC: male ? 90 : 75,
    water: 2500 // Phase 11: water (ml) — endurance cycling hydration baseline
  };
}

// Per-kg AA targets from spreadsheet (mg/kg → g for consistency with food DB)
// Met+Cys and Phe+Tyr are combined pools; mapped to aaMet and aaPhe keys respectively.
function computeAAGoals(weightKg) {
  var wt = parseFloat(weightKg) || 70;
  return {
    aaHis: 10 * wt / 1000,
    aaIle: 20 * wt / 1000,
    aaLeu: 40 * wt / 1000,
    aaLys: 38 * wt / 1000,
    aaMet: 15 * wt / 1000,
    // Met+Cys pool
    aaPhe: 25 * wt / 1000,
    // Phe+Tyr pool
    aaThr: 15 * wt / 1000,
    aaTrp: 4.8 * wt / 1000,
    aaVal: 26 * wt / 1000
  };
}
var DEFAULT_GOALS = computeGoals({});
var DEFAULT_PROFILE = {
  name: "",
  weightKg: "",
  heightCm: "",
  age: "",
  sex: ""
};
var DEFAULT_EX_RATIO = {
  carb: 60,
  fat: 20,
  pro: 20
};
var DEFAULT_SUPPLEMENT_STACKS = [{
  id: "stack_am",
  name: "AM",
  items: []
}, {
  id: "stack_pm",
  name: "PM",
  items: []
}];
var EXERCISE_ACTIVITIES = [{
  id: "cycling_light",
  label: "Cycling",
  intensity: "Light",
  met: 5.8
}, {
  id: "cycling_moderate",
  label: "Cycling",
  intensity: "Moderate",
  met: 8.0
}, {
  id: "cycling_hard",
  label: "Cycling",
  intensity: "Hard",
  met: 10.0
}, {
  id: "walking_easy",
  label: "Walking",
  intensity: "Easy",
  met: 2.8
}, {
  id: "walking_brisk",
  label: "Walking",
  intensity: "Brisk",
  met: 3.8
}, {
  id: "running_easy",
  label: "Running",
  intensity: "Easy",
  met: 8.0
}, {
  id: "running_moderate",
  label: "Running",
  intensity: "Moderate",
  met: 10.0
}, {
  id: "running_hard",
  label: "Running",
  intensity: "Hard",
  met: 12.0
}];
var MACROS = ["cal", "pro", "carb", "fat", "fib"];
var MICROS = ["iron", "calc", "zinc", "b12", "vitD", "omega3", "iod", "sel", "mag", "pot", "fol", "sod", "vitA", "vitC"];
var MEALS = ["Breakfast", "Lunch", "Dinner", "Snack"];

// ── Phase 11a: Water & Alcohol tracking ────────────────────────────────
// Alcohol calorie formula: volume_ml × ABV% × 7.89 kcal per g of alcohol.
// Brief specifies volume × abv% × 7.89 treating ABV as a fraction; ABV is entered
// as a percentage (e.g. 5) so we divide by 100 before applying the factor.
var ALCOHOL_KCAL_FACTOR = 7.89;
var alcoholCalories = function alcoholCalories(volumeMl, abvPercent) {
  var v = parseFloat(volumeMl) || 0;
  var a = parseFloat(abvPercent) || 0;
  return Math.round(v * (a / 100) * ALCOHOL_KCAL_FACTOR * 10) / 10;
};
// Drink categories with default ABV (brief 11a: beer 5%, wine 12%, spirits 40%).
var ALCOHOL_CATEGORIES = [{
  id: "beer",
  label: "Beer",
  abv: 5
}, {
  id: "wine",
  label: "Wine",
  abv: 12
}, {
  id: "spirits",
  label: "Spirits",
  abv: 40
}, {
  id: "cider",
  label: "Cider",
  abv: 5
}, {
  id: "cocktail",
  label: "Cocktail",
  abv: 15
}];
var WATER_UNITS = ["ml", "glass", "bottle"];
var WATER_UNIT_TO_ML = {
  ml: 1,
  glass: 250,
  bottle: 500
};
var waterAmountMl = function waterAmountMl(amount, unit) {
  var _WATER_UNIT_TO_ML;
  return Math.round((parseFloat(amount) || 0) * ((_WATER_UNIT_TO_ML = WATER_UNIT_TO_ML[unit || "ml"]) !== null && _WATER_UNIT_TO_ML !== void 0 ? _WATER_UNIT_TO_ML : 1));
};

// ── Phase 11b: Traffic-light system ───────────────────────────────
// Green < 100% of target, Yellow 100–120%, Red > 120% (brief 11b).
var TRAFFIC_GREEN_PCT = 100;
var TRAFFIC_RED_PCT = 120;
var TRAFFIC_COLORS = {
  green: "#22c55e",
  yellow: "#eab308",
  red: "#ef4444"
};
var trafficLevel = function trafficLevel(pct) {
  return pct > TRAFFIC_RED_PCT ? "red" : pct >= TRAFFIC_GREEN_PCT ? "yellow" : "green";
};
var trafficColor = function trafficColor(pct) {
  return TRAFFIC_COLORS[trafficLevel(pct)];
};
// Short explanation shown by the info button per nutrient (brief 11b).
var NUTRIENT_EXPLANATIONS = {
  cal: "Exceeding calorie targets regularly leads to unwanted weight gain. For endurance cycling, match intake to your ride intensity.",
  pro: "Too little protein impairs recovery; excess is generally unused. Aim for the target range around long rides.",
  carb: "Carbs fuel riding. Going under target limits endurance; going far over can displace other nutrients.",
  fat: "Fat is essential but calorie-dense. High excess can slow recovery and shift the macro balance.",
  fib: "Fibre supports gut health. Sudden large excesses during a ride can cause GI discomfort.",
  iron: "Low iron reduces oxygen transport and endurance. Excess iron is hard to excrete and can be toxic.",
  calc: "Calcium supports bone strength for riding. Chronic excess can impair other mineral absorption.",
  zinc: "Zinc supports immunity and recovery. Excess can interfere with copper and iron absorption.",
  b12: "B12 is critical for vegans and endurance. Very high intakes are usually harmless but unneeded.",
  vitD: "Vitamin D supports bone and immune function. Excess over long periods can cause toxicity.",
  omega3: "Omega-3 supports recovery and inflammation control. Very high doses can thin the blood.",
  iod: "Iodine supports thyroid function central to metabolism. Both low and high intake disrupt it.",
  sel: "Selenium is an antioxidant. Excess over time can cause selenosis (hair/nail changes).",
  mag: "Magnesium supports muscle function and sleep. Large excess can cause GI upset.",
  pot: "Potassium balances fluids and cramping. Very high intake can affect heart rhythm.",
  fol: "Folate supports blood and cell repair. Excess is generally excreted but masks B12 deficiency signs.",
  sod: "Sodium is lost in sweat during rides. Chronic excess raises blood pressure in sensitive people.",
  vitA: "Vitamin A supports vision and immunity. Excess (retinol form) can be toxic over time.",
  vitC: "Vitamin C supports immunity and iron absorption. Excess is excreted but can cause GI upset."
};
// ── Phase 11b: WHO Recommended and Optimal goal presets ────────
// WHO base RDAs (population averages). Optimal scales RDAs for active endurance
// athletes (higher protein, antioxidant vitamins, electrolytes).
var WHO_GOALS = {
  cal: 2000,
  pro: 50,
  carb: 260,
  fat: 70,
  fib: 25,
  water: 2500,
  iron: 14,
  calc: 1000,
  zinc: 11,
  b12: 2.4,
  vitD: 15,
  omega3: 1.6,
  iod: 150,
  sel: 55,
  mag: 400,
  pot: 3510,
  fol: 400,
  sod: 2000,
  vitA: 900,
  vitC: 90
};
var OPTIMAL_GOALS = {
  cal: 2800,
  pro: 90,
  carb: 400,
  fat: 85,
  fib: 38,
  water: 3500,
  iron: 18,
  calc: 1200,
  zinc: 15,
  b12: 3.0,
  vitD: 25,
  omega3: 3.0,
  iod: 200,
  sel: 75,
  mag: 500,
  pot: 4000,
  fol: 600,
  sod: 2300,
  vitA: 1000,
  vitC: 120
};
var FIB_SOL_COLOR = "#8B5CF6";
var FIB_INSOL_COLOR = "#94A3B8";
var FAT_SAT_COLOR = "#EF4444";
var FAT_MUFA_COLOR = "#F97316";
var FAT_PUFA_COLOR = "#06B6D4";
var dateKey = function dateKey(d) {
  return d.toISOString().slice(0, 10);
};
var today = function today() {
  return dateKey(new Date());
};
var STORAGE_KEYS = {
  logs: "nt-logs",
  goals: "nt-goals",
  goalOverrides: "nt-goal-overrides",
  customFoods: "nt-custom",
  profile: "nt-profile",
  exRatio: "nt-exratio",
  recipes: "nt-recipes",
  notionStatus: "nt-notion-status",
  syncQueue: "nt-sync-queue",
  supplementStacks: "nt-supplement-stacks",
  lastExportedAt: "nt-last-exported-at",
  lastValidatedAt: "nt-last-validated-at",
  displayMode: "nt-display-mode",
  energyUnit: "nt-energy-unit",
  // W4
  recents: "nt-recents",
  // W1 — recently logged foods
  errorLogs: "nt-error-logs" // Phase 8 — local-only post-mortem error logs (R8)
};

// ── STORAGE HEALTH THRESHOLDS (Phase 6b) ──────────────────────────────────
// Named constants so band adjustment is a one-line change.
var STORAGE_WARN_PCT = 70; // yellow above this
var STORAGE_CRIT_PCT = 90; // red above this

// ── CENTRALIZED ERROR HANDLING (Phase 8 / A2 / R8) ────────────────────────────
// Translates technical error messages (worker_502: notion_unreachable,
// network: fetch failed, foods.json fetch failed: 404, ...) into short,
// user-friendly, actionable strings. Every UI error path should route through
// friendlyError() so the surface language stays consistent and recoverable.
//
// mapError returns { message, type } where type is one of "network" | "worker"
// | "fooddb" | "storage" | "sw" | "parse" | "unknown". friendlyError() returns
// just the message string for inline use. Both also log the raw error to the
// local-only nt-error-logs ring buffer (capped, never transmitted) for
// post-mortem analysis. Debug messages (prefixed with [debug]) are NOT logged.
var ERROR_LOG_CAP = 50;
function pushErrorLog(entry) {
  try {
    var raw = localStorage.getItem(STORAGE_KEYS.errorLogs);
    var arr = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(arr)) return;
    arr.push(entry);
    while (arr.length > ERROR_LOG_CAP) arr.shift();
    localStorage.setItem(STORAGE_KEYS.errorLogs, JSON.stringify(arr));
  } catch (_unused) {/* logging must never throw into the UI */}
}
function mapError(err, context) {
  var raw = err && (err.message || String(err)) || "";
  var ctx = context || "unknown";
  var ts = new Date().toISOString();
  // Don't log debug-injected entries (Phase 6b corruption tests).
  var isDebug = /\[debug\]/i.test(raw);
  var type = "unknown";
  var message = "Something went wrong. Please try again.";

  // fooddb is checked BEFORE network: "foods.json fetch failed: 404" contains
  // "fetch failed", which would otherwise mis-classify a DB load failure as a
  // connectivity error. More specific patterns first.
  if (/foods\.json/i.test(raw) && /404/.test(raw)) {
    type = "fooddb";
    message = "The food database is missing. Please reload the app.";
  } else if (/foods\.json/i.test(raw)) {
    type = "fooddb";
    message = "The food database could not be loaded. Please reload the app.";
  } else if (/worker_502/i.test(raw) || /notion_unreachable/i.test(raw)) {
    type = "worker";
    message = "Recipe sync is unavailable right now. Please try again later.";
  } else if (/worker_403/i.test(raw)) {
    type = "worker";
    message = "The recipe sync service rejected this app. Sync will be available after the next update.";
  } else if (/^worker_/i.test(raw)) {
    type = "worker";
    message = "The recipe sync service is unavailable. Please try again later.";
  } else if (/^network:/i.test(raw) || /fetch failed/i.test(raw) || /Failed to fetch/i.test(raw)) {
    type = "network";
    message = "No internet connection. Some features are limited. Check your connection and retry.";
  } else if (/storage|quota|exceeded/i.test(raw)) {
    type = "storage";
    message = "Data could not be saved (storage full). Please export your data and clear old browser data, then retry.";
  } else if (/parsing|parse failed/i.test(raw) || /No recipes found/i.test(raw) || /No parseable/i.test(raw)) {
    type = "parse";
    message = "Could not parse the recipe text. Check the format and try again.";
  }
  if (!isDebug) {
    pushErrorLog({
      ts: ts,
      context: ctx,
      type: type,
      raw: raw.slice(0, 500)
    });
  }
  return {
    type: type,
    message: message
  };
}
function friendlyError(err, context) {
  return mapError(err, context).message;
}

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
var PARSE_ERROR = Symbol("PARSE_ERROR");
function loadData(_x0, _x1) {
  return _loadData.apply(this, arguments);
}
function _loadData() {
  _loadData = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee15(key, fallback) {
    var raw, _t12;
    return _regenerator().w(function (_context16) {
      while (1) switch (_context16.p = _context16.n) {
        case 0:
          _context16.p = 0;
          raw = localStorage.getItem(key);
          if (!(raw === null)) {
            _context16.n = 1;
            break;
          }
          return _context16.a(2, fallback);
        case 1:
          return _context16.a(2, JSON.parse(raw));
        case 2:
          _context16.p = 2;
          _t12 = _context16.v;
          console.warn("[NutriTrack] JSON parse failure on key:", key);
          return _context16.a(2, PARSE_ERROR);
      }
    }, _callee15, null, [[0, 2]]);
  }));
  return _loadData.apply(this, arguments);
}
function saveData(_x10, _x11) {
  return _saveData.apply(this, arguments);
} // Helper function to show save notifications on screen
function _saveData() {
  _saveData = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee16(key, val) {
    var _JSON$stringify, _JSON$stringify2, size;
    return _regenerator().w(function (_context17) {
      while (1) switch (_context17.n) {
        case 0:
          try {
            localStorage.setItem(key, JSON.stringify(val));
            console.log("[NutriTrack] Saved successfully:", key, "(" + (((_JSON$stringify = JSON.stringify(val)) === null || _JSON$stringify === void 0 ? void 0 : _JSON$stringify.length) || 0) + " bytes)");

            // Show visible notification for mobile users without console access
            try {
              size = ((_JSON$stringify2 = JSON.stringify(val)) === null || _JSON$stringify2 === void 0 ? void 0 : _JSON$stringify2.length) || 0;
              showSaveNotification('Saved: ' + key + ' (' + size + ' bytes)', '#388e3c');
            } catch (e) {
              console.warn("[NutriTrack] Notification display failed:", e);
            }
          } catch (e) {
            console.error("[NutriTrack] saveData failed:", key, e);
            try {
              showSaveNotification('FAILED to save: ' + key, '#d32f2f');
            } catch (e2) {
              console.error("[NutriTrack] Error notification failed:", e2);
            }
          }
        case 1:
          return _context17.a(2);
      }
    }, _callee16);
  }));
  return _saveData.apply(this, arguments);
}
function showSaveNotification(message, backgroundColor) {
  var notification = document.createElement('div');
  notification.textContent = message;
  notification.style.cssText = "\n    position: fixed;\n    bottom: 20px;\n    right: 20px;\n    background: ".concat(backgroundColor, ";\n    color: white;\n    padding: 12px 16px;\n    border-radius: 4px;\n    font-family: -apple-system, BlinkMacSystemFont, sans-serif;\n    font-size: 14px;\n    z-index: 99999;\n    box-shadow: 0 2px 10px rgba(0,0,0,0.3);\n    max-width: 300px;\n  ");
  notification.id = 'nt-save-notification';
  document.body.appendChild(notification);
  setTimeout(function () {
    notification.style.opacity = '0';
    notification.style.transition = 'opacity 0.3s';
    setTimeout(function () {
      return notification.remove();
    }, 300);
  }, 2000);
}

// ── STORAGE VALIDATION (Phase 6b) ─────────────────────────────────────────
// Shape-only; intentionally not deep. Returns array of failure strings (empty = ok).
function validateStorageShapes(_ref) {
  var logs = _ref.logs,
    recipes = _ref.recipes,
    customFoods = _ref.customFoods,
    profile = _ref.profile,
    exRatio = _ref.exRatio,
    supplementStacks = _ref.supplementStacks,
    recents = _ref.recents;
  var failures = [];
  if (logs == null || _typeof(logs) !== "object" || Array.isArray(logs)) failures.push("logs: expected object");
  if (!Array.isArray(recipes)) failures.push("recipes: expected array");else recipes.forEach(function (r, i) {
    if (!r || !r.id || !r.name || !Array.isArray(r.ingredients)) failures.push("recipes[".concat(i, "]: missing id/name/ingredients"));
  });
  if (!Array.isArray(customFoods)) failures.push("customFoods: expected array");
  if (!profile || _typeof(profile) !== "object" || Array.isArray(profile)) failures.push("profile: expected object");
  if (!exRatio || _typeof(exRatio) !== "object") {
    failures.push("exRatio: expected object");
  } else {
    var s = (Number(exRatio.carb) || 0) + (Number(exRatio.fat) || 0) + (Number(exRatio.pro) || 0);
    if (Math.abs(s - 100) > 1) failures.push("exRatio: values sum to ".concat(s, ", expected 100"));
  }
  if (supplementStacks != null && !Array.isArray(supplementStacks)) failures.push("supplementStacks: expected array");
  if (recents != null && !Array.isArray(recents)) failures.push("recents: expected array");
  return failures;
}

// ── STORAGE ESTIMATE (Phase 6b) ───────────────────────────────────────────
// navigator.storage.estimate() reports usage=0 and wildly inflated quota on
// iOS Safari and is therefore not used. Instead we sum the byte lengths of
// all keys we own directly — accurate and synchronous.
function measureLocalStorageBytes() {
  try {
    var total = 0;
    var ownKeys = Object.values(STORAGE_KEYS);
    for (var _i = 0, _ownKeys = ownKeys; _i < _ownKeys.length; _i++) {
      var key = _ownKeys[_i];
      var val = localStorage.getItem(key);
      if (val !== null) total += key.length + val.length; // UTF-16 chars ≈ bytes for ASCII JSON
    }
    return total; // bytes
  } catch (_unused2) {
    return null;
  }
}
function calcRecipeNutritionPerServing(ingredients, servings, allFoods) {
  var t = {};
  Object.keys(NUTRIENT_META).forEach(function (k) {
    return t[k] = 0;
  });
  ingredients.forEach(function (ing) {
    var food = allFoods.find(function (f) {
      return f.id === ing.foodId;
    });
    if (!food) return;
    var m = ing.amount_g / 100;
    Object.keys(NUTRIENT_META).forEach(function (k) {
      var _food$k;
      t[k] += ((_food$k = food[k]) !== null && _food$k !== void 0 ? _food$k : 0) * m;
    });
  });
  var s = Math.max(parseFloat(servings) || 1, 0.1);
  var ps = {};
  Object.keys(t).forEach(function (k) {
    return ps[k] = t[k] / s;
  });
  return ps;
}
function computeEntryNutrition(derivedIngredients, allFoods) {
  var t = {};
  Object.keys(NUTRIENT_META).forEach(function (k) {
    return t[k] = 0;
  });
  (derivedIngredients || []).forEach(function (ing) {
    var m = ing.amount_g / 100;
    if (ing.snapshot) {
      Object.keys(NUTRIENT_META).forEach(function (k) {
        var _ing$snapshot$k;
        t[k] += ((_ing$snapshot$k = ing.snapshot[k]) !== null && _ing$snapshot$k !== void 0 ? _ing$snapshot$k : 0) * m;
      });
    } else {
      var food = allFoods.find(function (f) {
        return f.id === ing.foodId;
      });
      if (!food) return;
      Object.keys(NUTRIENT_META).forEach(function (k) {
        var _food$k2;
        t[k] += ((_food$k2 = food[k]) !== null && _food$k2 !== void 0 ? _food$k2 : 0) * m;
      });
    }
  });
  return t;
}
// Phase 5.8 — nutrient-value snapshot helpers
var FOOD_SUBTYPE_KEYS = ["fibSol", "fibInsol", "fatSat", "fatMufa", "fatPufa", "aaHis", "aaIle", "aaLeu", "aaLys", "aaMet", "aaPhe", "aaThr", "aaTrp", "aaVal"];
function buildFoodSnapshot(food) {
  var snap = {};
  [].concat(_toConsumableArray(Object.keys(NUTRIENT_META)), FOOD_SUBTYPE_KEYS).forEach(function (k) {
    if (food[k] !== undefined) snap[k] = food[k];
  });
  return snap;
}
function suppItemSummary(items) {
  if (!items || !items.length) return "No items";
  return items.slice(0, 3).map(function (i) {
    return "".concat(i.name, " ").concat(i.dose_amount).concat(i.dose_unit);
  }).join(", ") + (items.length > 3 ? " +".concat(items.length - 3, " more") : "");
}

// ── Phase 9 (A8) — Custom food promotion to foods.json schema v1 ────────
// Custom foods are stored internally with the abbreviation keys the JSX uses
// (cal, pro, carb, ...). To promote a custom food into the main foods.json we
// must emit the long-name schema v1 shape (calories, protein, ...). Every
// nutrient field required by foods.json schema v1 must be present in the
// exported patch — missing values are explicitly `null`, never omitted, so the
// patch merges cleanly without silent schema drift.
// Order mirrors mapFoodRecord() / foods.json column order for readability.
var CUSTOM_FOOD_TO_DB = [["cal", "calories"], ["pro", "protein"], ["carb", "carbohydrates"], ["fat", "fat"], ["fib", "fibre"], ["alc", "alcohol"],
// Phase 11
["water", "water"],
// Phase 11
["fibSol", "fibre_soluble"], ["fibInsol", "fibre_insoluble"], ["fatSat", "fat_saturated"], ["fatMufa", "fat_mufa"], ["fatPufa", "fat_pufa"], ["aaHis", "histidine"], ["aaIle", "isoleucine"], ["aaLeu", "leucine"], ["aaLys", "lysine"], ["aaMet", "methionine"], ["aaPhe", "phenylalanine"], ["aaThr", "threonine"], ["aaTrp", "tryptophan"], ["aaVal", "valine"], ["iron", "iron"], ["calc", "calcium"], ["zinc", "zinc"], ["b12", "b12"], ["vitD", "vitamin_d"], ["omega3", "omega3"], ["iod", "iodine"], ["sel", "selenium"], ["mag", "magnesium"], ["pot", "potassium"], ["fol", "folate"], ["sod", "sodium"], ["vitA", "vitamin_a"], ["vitC", "vitamin_c"]];
// Numeric nutrient keys: stored as numbers or null (unknown). Empty/missing
// string inputs from the form are normalized to 0 at save time, but legacy
// custom foods (pre-Phase-9) only carry the 19 NUTRIENT_META keys, so the
// 14 subtype keys are absent and must be normalized to null on migration.
var CUSTOM_NUMERIC_KEYS = [].concat(_toConsumableArray(Object.keys(NUTRIENT_META)), FOOD_SUBTYPE_KEYS);

// Convert one internal custom food record to foods.json schema v1. All
// nutrient fields are present (value or null). Non-nutrient metadata
// (id/name/source/fdc_id/servings) is filled with sensible defaults.
function customFoodToDbRecord(food) {
  var _food$fdc_id;
  var record = {
    id: (food.id || "").replace(/^custom_/, "custom_"),
    name: food.name || "Unnamed custom food",
    category: food.cat || "Other",
    source: food.source || "user",
    fdc_id: (_food$fdc_id = food.fdc_id) !== null && _food$fdc_id !== void 0 ? _food$fdc_id : null
  };
  var _iterator = _createForOfIteratorHelper(CUSTOM_FOOD_TO_DB),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var _step$value = _slicedToArray(_step.value, 2),
        shortKey = _step$value[0],
        longKey = _step$value[1];
      var v = food[shortKey];
      if (typeof v === "number" && !Number.isNaN(v)) record[longKey] = v;else record[longKey] = null;
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  record.servings = Array.isArray(food.servings) && food.servings.length ? food.servings : null;
  return record;
}

// Build a JSON patch array (RFC 6902 "add" ops) that, when applied to
// foods.json, appends the promoted custom food(s). Each op targets
// /foods/<index> so the patch is position-independent of any manual edits
// the maintainer makes first — it appends at the end of the foods array.
// The envelope carries schema_version 1 to match the deployed foods.json.
function buildCustomFoodPatch(foods /* internal custom-food records */) {
  var ops = [];
  var records = (foods || []).filter(function (f) {
    return f && !f.deleted;
  }).map(customFoodToDbRecord);
  records.forEach(function (rec, i) {
    ops.push({
      op: "add",
      path: "/foods/-",
      value: rec
    });
  });
  return {
    schema_version: 1,
    basis: "per_100g",
    patch: ops,
    exported_at: new Date().toISOString()
  };
}

// One-time migration: ensure every custom food record carries ALL numeric
// nutrient keys. Pre-Phase-9 records only had NUTRIENT_META keys; missing
// subtype keys are filled with null so buildFoodSnapshot and export are
// consistent. Returns { foods: migrated[], changed: boolean }.
function migrateCustomFoods(rawFoods) {
  if (!Array.isArray(rawFoods)) return {
    foods: [],
    changed: false
  };
  var changed = false;
  var foods = rawFoods.map(function (f) {
    if (!f || _typeof(f) !== "object") {
      changed = true;
      return null;
    }
    var out = _objectSpread({}, f);
    var _iterator2 = _createForOfIteratorHelper(CUSTOM_NUMERIC_KEYS),
      _step2;
    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var k = _step2.value;
        if (out[k] === undefined) {
          out[k] = null;
          changed = true;
        } else if (out[k] === "" || typeof out[k] === "string" && out[k].trim() === "") {
          out[k] = null;
          changed = true;
        }
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
    return out;
  }).filter(Boolean);
  return {
    foods: foods,
    changed: changed
  };
}
// ── COMPONENTS ────────────────────────────────────────────────────────────
function Ring(_ref2) {
  var value = _ref2.value,
    max = _ref2.max,
    _ref2$size = _ref2.size,
    size = _ref2$size === void 0 ? 52 : _ref2$size,
    _ref2$stroke = _ref2.stroke,
    stroke = _ref2$stroke === void 0 ? 5 : _ref2$stroke,
    color = _ref2.color,
    _ref2$nullArc = _ref2.nullArc,
    nullArc = _ref2$nullArc === void 0 ? 0 : _ref2$nullArc,
    _ref2$simplified = _ref2.simplified,
    simplified = _ref2$simplified === void 0 ? false : _ref2$simplified,
    children = _ref2.children;
  var r = (size - stroke) / 2,
    circ = 2 * Math.PI * r,
    pct = Math.min(value / (max || 1), 1);
  // nullArc: fraction of the full circle representing estimated unknown contribution
  // Only rendered when: nullArc > 0, confirmed arc < 1 (not over goal), not simplified mode
  var showNull = !simplified && nullArc > 0 && pct < 1;
  var nullStart = pct; // null arc starts right where confirmed arc ends
  var nullLen = Math.min(nullArc, 1 - pct); // clamp so it doesn't overshoot
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    style: {
      display: "block"
    }
  }, /*#__PURE__*/React.createElement("circle", {
    cx: size / 2,
    cy: size / 2,
    r: r,
    fill: "none",
    stroke: "#1e293b",
    strokeWidth: stroke
  }), /*#__PURE__*/React.createElement("circle", {
    cx: size / 2,
    cy: size / 2,
    r: r,
    fill: "none",
    stroke: color,
    strokeWidth: stroke,
    strokeDasharray: circ,
    strokeDashoffset: circ * (1 - pct),
    strokeLinecap: "round",
    transform: "rotate(-90 ".concat(size / 2, " ").concat(size / 2, ")"),
    style: {
      transition: "stroke-dashoffset 0.5s ease"
    }
  }), showNull && /*#__PURE__*/React.createElement("circle", {
    cx: size / 2,
    cy: size / 2,
    r: r,
    fill: "none",
    stroke: "#64748b",
    strokeWidth: stroke,
    strokeDasharray: "".concat(circ * nullLen, " ").concat(circ * (1 - nullLen)),
    strokeDashoffset: circ * (1 - nullStart),
    strokeLinecap: "butt",
    transform: "rotate(-90 ".concat(size / 2, " ").concat(size / 2, ")"),
    opacity: 0.6
  }), children);
}
function SwipeableEntry(_ref3) {
  var children = _ref3.children,
    onDelete = _ref3.onDelete;
  var _useState = useState(0),
    _useState2 = _slicedToArray(_useState, 2),
    offsetX = _useState2[0],
    setOffsetX = _useState2[1];
  var startX = useRef(null);
  var DEL = 60;
  var onTouchStart = function onTouchStart(e) {
    startX.current = e.touches[0].clientX;
  };
  var onTouchMove = function onTouchMove(e) {
    if (startX.current === null) return;
    var dx = e.touches[0].clientX - startX.current;
    if (dx < 0) setOffsetX(Math.max(dx, -DEL - 20));
  };
  var onTouchEnd = function onTouchEnd() {
    setOffsetX(offsetX < -DEL ? -DEL : 0);
    startX.current = null;
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      right: 0,
      top: 0,
      bottom: 0,
      width: DEL,
      background: "#ef4444",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "0 8px 8px 0"
    },
    onClick: function onClick() {
      setOffsetX(0);
      onDelete();
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "#fff",
      fontSize: 18,
      fontWeight: 700
    }
  }, "\uD83D\uDDD1")), /*#__PURE__*/React.createElement("div", {
    style: {
      transform: "translateX(".concat(offsetX, "px)"),
      transition: startX.current ? "none" : "transform 0.2s ease",
      background: "#0a0f1a",
      position: "relative",
      zIndex: 1
    },
    onTouchStart: onTouchStart,
    onTouchMove: onTouchMove,
    onTouchEnd: onTouchEnd
  }, children));
}
// ── MAIN APP ──────────────────────────────────────────────────────────────
function NutriTrack() {
  // ── FOOD DB (async-loaded from /NutriTrack/foods.json) ────────────────
  var _useState3 = useState([]),
    _useState4 = _slicedToArray(_useState3, 2),
    foodDB = _useState4[0],
    setFoodDB = _useState4[1]; // loaded array
  var _useState5 = useState("loading"),
    _useState6 = _slicedToArray(_useState5, 2),
    foodDBStatus = _useState6[0],
    setFoodDBStatus = _useState6[1]; // "loading" | "ready" | "error"

  var _useState7 = useState("log"),
    _useState8 = _slicedToArray(_useState7, 2),
    view = _useState8[0],
    setView = _useState8[1];
  var _useState9 = useState({}),
    _useState0 = _slicedToArray(_useState9, 2),
    logs = _useState0[0],
    setLogs = _useState0[1];
  var _useState1 = useState(DEFAULT_GOALS),
    _useState10 = _slicedToArray(_useState1, 2),
    goals = _useState10[0],
    setGoals = _useState10[1];
  var _useState11 = useState({}),
    _useState12 = _slicedToArray(_useState11, 2),
    goalOverrides = _useState12[0],
    setGoalOverrides = _useState12[1];
  var _useState13 = useState([]),
    _useState14 = _slicedToArray(_useState13, 2),
    customFoods = _useState14[0],
    setCustomFoods = _useState14[1];
  var _useState15 = useState(DEFAULT_PROFILE),
    _useState16 = _slicedToArray(_useState15, 2),
    profile = _useState16[0],
    setProfile = _useState16[1];
  var _useState17 = useState(DEFAULT_EX_RATIO),
    _useState18 = _slicedToArray(_useState17, 2),
    exRatio = _useState18[0],
    setExRatio = _useState18[1];
  var _useState19 = useState([]),
    _useState20 = _slicedToArray(_useState19, 2),
    recipes = _useState20[0],
    setRecipes = _useState20[1];
  var _useState21 = useState(DEFAULT_SUPPLEMENT_STACKS),
    _useState22 = _slicedToArray(_useState21, 2),
    supplementStacks = _useState22[0],
    setSupplementStacks = _useState22[1];
  var _useState23 = useState(today()),
    _useState24 = _slicedToArray(_useState23, 2),
    currentDate = _useState24[0],
    setCurrentDate = _useState24[1];
  var _useState25 = useState(false),
    _useState26 = _slicedToArray(_useState25, 2),
    loaded = _useState26[0],
    setLoaded = _useState26[1];

  // Export
  var _useState27 = useState(null),
    _useState28 = _slicedToArray(_useState27, 2),
    lastExportedAt = _useState28[0],
    setLastExportedAt = _useState28[1];
  var _useState29 = useState(null),
    _useState30 = _slicedToArray(_useState29, 2),
    exportConfirm = _useState30[0],
    setExportConfirm = _useState30[1]; // null or { csvRows, jsonEntries, dateRange }

  // Recents (W1)
  var _useState31 = useState([]),
    _useState32 = _slicedToArray(_useState31, 2),
    recents = _useState32[0],
    setRecents = _useState32[1]; // [{ foodId, foodName, lastAmount, lastMeal, loggedAt }]

  // Storage health (Phase 6b)
  var _useState33 = useState(null),
    _useState34 = _slicedToArray(_useState33, 2),
    storageEstimate = _useState34[0],
    setStorageEstimate = _useState34[1]; // null | { usageBytes, quotaBytes }
  var _useState35 = useState(false),
    _useState36 = _slicedToArray(_useState35, 2),
    validationWarning = _useState36[0],
    setValidationWarning = _useState36[1]; // show banner?
  var _useState37 = useState(false),
    _useState38 = _slicedToArray(_useState37, 2),
    validationDismissed = _useState38[0],
    setValidationDismissed = _useState38[1]; // session-only dismiss
  var _useState39 = useState(false),
    _useState40 = _slicedToArray(_useState39, 2),
    dbgCorruptUsed = _useState40[0],
    setDbgCorruptUsed = _useState40[1]; // one-use-per-session
  var _useState41 = useState(false),
    _useState42 = _slicedToArray(_useState41, 2),
    dbgShapeUsed = _useState42[0],
    setDbgShapeUsed = _useState42[1];

  // Phase 6d — PWA / offline
  var _useState43 = useState(typeof navigator !== "undefined" ? navigator.onLine : true),
    _useState44 = _slicedToArray(_useState43, 2),
    isOnline = _useState44[0],
    setIsOnline = _useState44[1];
  var _useState45 = useState(false),
    _useState46 = _slicedToArray(_useState45, 2),
    swUpdateReady = _useState46[0],
    setSwUpdateReady = _useState46[1];
  var swRegRef = useRef(null);

  // Notion sync
  var _useState47 = useState(null),
    _useState48 = _slicedToArray(_useState47, 2),
    lastSyncedAt = _useState48[0],
    setLastSyncedAt = _useState48[1];
  var _useState49 = useState([]),
    _useState50 = _slicedToArray(_useState49, 2),
    syncQueue = _useState50[0],
    setSyncQueue = _useState50[1];
  var _useState51 = useState(null),
    _useState52 = _slicedToArray(_useState51, 2),
    notionSyncMsg = _useState52[0],
    setNotionSyncMsg = _useState52[1];
  var _useState53 = useState(false),
    _useState54 = _slicedToArray(_useState53, 2),
    syncInProgress = _useState54[0],
    setSyncInProgress = _useState54[1];
  var _useState55 = useState(null),
    _useState56 = _slicedToArray(_useState55, 2),
    syncProgress = _useState56[0],
    setSyncProgress = _useState56[1];
  var _useState57 = useState([]),
    _useState58 = _slicedToArray(_useState57, 2),
    syncReviewData = _useState58[0],
    setSyncReviewData = _useState58[1];
  var _useState59 = useState(""),
    _useState60 = _slicedToArray(_useState59, 2),
    pasteText = _useState60[0],
    setPasteText = _useState60[1];
  var _useState61 = useState(""),
    _useState62 = _slicedToArray(_useState61, 2),
    parserTestText = _useState62[0],
    setParserTestText = _useState62[1];
  var _useState63 = useState(0),
    _useState64 = _slicedToArray(_useState63, 2),
    errorLogsVersion = _useState64[0],
    setErrorLogsVersion = _useState64[1]; // bump to force Error logs viewer re-render after clear/inject
  var _useState65 = useState(null),
    _useState66 = _slicedToArray(_useState65, 2),
    notionIngPick = _useState66[0],
    setNotionIngPick = _useState66[1];
  var _useState67 = useState(""),
    _useState68 = _slicedToArray(_useState67, 2),
    notionIngSearch = _useState68[0],
    setNotionIngSearch = _useState68[1];

  // Food add/edit
  var _useState69 = useState("food"),
    _useState70 = _slicedToArray(_useState69, 2),
    addMode = _useState70[0],
    setAddMode = _useState70[1];
  var _useState71 = useState(""),
    _useState72 = _slicedToArray(_useState71, 2),
    searchTerm = _useState72[0],
    setSearchTerm = _useState72[1];
  var _useState73 = useState(""),
    _useState74 = _slicedToArray(_useState73, 2),
    debouncedSearchTerm = _useState74[0],
    setDebouncedSearchTerm = _useState74[1];
  var searchDebounceRef = useRef(null);
  var _useState75 = useState(null),
    _useState76 = _slicedToArray(_useState75, 2),
    selectedFood = _useState76[0],
    setSelectedFood = _useState76[1];
  var _useState77 = useState("100"),
    _useState78 = _slicedToArray(_useState77, 2),
    amount = _useState78[0],
    setAmount = _useState78[1];
  var _useState79 = useState(null),
    _useState80 = _slicedToArray(_useState79, 2),
    servingUnit = _useState80[0],
    setServingUnit = _useState80[1]; // index into food.servings, or null
  var _useState81 = useState("1"),
    _useState82 = _slicedToArray(_useState81, 2),
    servingQty = _useState82[0],
    setServingQty = _useState82[1]; // multiplier string
  var _useState83 = useState("Breakfast"),
    _useState84 = _slicedToArray(_useState83, 2),
    meal = _useState84[0],
    setMeal = _useState84[1];
  var _useState85 = useState(null),
    _useState86 = _slicedToArray(_useState85, 2),
    editingEntryId = _useState86[0],
    setEditingEntryId = _useState86[1];
  var _useState87 = useState(null),
    _useState88 = _slicedToArray(_useState87, 2),
    detailNutrient = _useState88[0],
    setDetailNutrient = _useState88[1];

  // Phase 6n — multi-select batch logging (session-only, no persistence; see brief §2.5/§6)
  var _useState89 = useState(false),
    _useState90 = _slicedToArray(_useState89, 2),
    multiSelect = _useState90[0],
    setMultiSelect = _useState90[1]; // toggle on food search screen
  var _useState91 = useState([]),
    _useState92 = _slicedToArray(_useState91, 2),
    batch = _useState92[0],
    setBatch = _useState92[1]; // [{ food, amount }]  amount is a string

  // Logged-entry editing (Phase 5.7)
  var _useState93 = useState(null),
    _useState94 = _slicedToArray(_useState93, 2),
    editingLogEntry = _useState94[0],
    setEditingLogEntry = _useState94[1]; // full entry object
  var _useState95 = useState("1"),
    _useState96 = _slicedToArray(_useState95, 2),
    editLogServings = _useState96[0],
    setEditLogServings = _useState96[1];
  var _useState97 = useState("Breakfast"),
    _useState98 = _slicedToArray(_useState97, 2),
    editLogMeal = _useState98[0],
    setEditLogMeal = _useState98[1];
  var _useState99 = useState("60"),
    _useState100 = _slicedToArray(_useState99, 2),
    editLogDuration = _useState100[0],
    setEditLogDuration = _useState100[1];
  var _useState101 = useState(""),
    _useState102 = _slicedToArray(_useState101, 2),
    editLogBurn = _useState102[0],
    setEditLogBurn = _useState102[1];
  var _useState103 = useState([]),
    _useState104 = _slicedToArray(_useState103, 2),
    editLogSuppItems = _useState104[0],
    setEditLogSuppItems = _useState104[1];
  var _useState105 = useState(false),
    _useState106 = _slicedToArray(_useState105, 2),
    showDeletedFoods = _useState106[0],
    setShowDeletedFoods = _useState106[1];
  // W5 — Simplified/Advanced display toggle
  var _useState107 = useState("advanced"),
    _useState108 = _slicedToArray(_useState107, 2),
    displayMode = _useState108[0],
    setDisplayMode = _useState108[1]; // "advanced" | "simplified"
  // W4 — kcal / kJ energy unit toggle
  var _useState109 = useState("kcal"),
    _useState110 = _slicedToArray(_useState109, 2),
    energyUnit = _useState110[0],
    setEnergyUnit = _useState110[1]; // "kcal" | "kJ"
  // W3 — exercise edit: activity ID being edited
  var _useState111 = useState(EXERCISE_ACTIVITIES[0].id),
    _useState112 = _slicedToArray(_useState111, 2),
    editLogActivityId = _useState112[0],
    setEditLogActivityId = _useState112[1];
  // W2 — null arc tap explanation panel
  var _useState113 = useState(null),
    _useState114 = _slicedToArray(_useState113, 2),
    nullPanelKey = _useState114[0],
    setNullPanelKey = _useState114[1]; // nutrient key | null

  // Exercise
  var _useState115 = useState(EXERCISE_ACTIVITIES[0].id),
    _useState116 = _slicedToArray(_useState115, 2),
    exActivity = _useState116[0],
    setExActivity = _useState116[1];
  var _useState117 = useState("60"),
    _useState118 = _slicedToArray(_useState117, 2),
    exDuration = _useState118[0],
    setExDuration = _useState118[1];
  var _useState119 = useState(""),
    _useState120 = _slicedToArray(_useState119, 2),
    exBurnEdit = _useState120[0],
    setExBurnEdit = _useState120[1];

  // Custom food
  var _useState121 = useState({
      name: "",
      cat: "Other",
      cal: "",
      pro: "",
      carb: "",
      fat: "",
      fib: "",
      alc: "",
      water: "",
      iron: "",
      calc: "",
      zinc: "",
      b12: "",
      vitD: "",
      omega3: "",
      iod: "",
      sel: "",
      mag: "",
      pot: "",
      fol: "",
      sod: "",
      vitA: "",
      vitC: ""
    }),
    _useState122 = _slicedToArray(_useState121, 2),
    cf = _useState122[0],
    setCf = _useState122[1];
  var _useState123 = useState(null),
    _useState124 = _slicedToArray(_useState123, 2),
    customFoodExportMsg = _useState124[0],
    setCustomFoodExportMsg = _useState124[1];
  // Phase 9: editing an existing custom food (null = creating a new one);
  // simple/advanced input mode for the custom-food form (simple = the 6
  // values typically printed on a food package; advanced = all 19 fields).
  var _useState125 = useState(null),
    _useState126 = _slicedToArray(_useState125, 2),
    editingCustomFoodId = _useState126[0],
    setEditingCustomFoodId = _useState126[1];
  var _useState127 = useState("simple"),
    _useState128 = _slicedToArray(_useState127, 2),
    cfMode = _useState128[0],
    setCfMode = _useState128[1];

  // Recipe creation
  var _useState129 = useState({
      name: "",
      source: "",
      servings: "4",
      ingredients: []
    }),
    _useState130 = _slicedToArray(_useState129, 2),
    recipeInProgress = _useState130[0],
    setRecipeInProgress = _useState130[1];
  var _useState131 = useState(null),
    _useState132 = _slicedToArray(_useState131, 2),
    editingRecipeId = _useState132[0],
    setEditingRecipeId = _useState132[1];
  var _useState133 = useState(""),
    _useState134 = _slicedToArray(_useState133, 2),
    recipeIngSearch = _useState134[0],
    setRecipeIngSearch = _useState134[1];
  var _useState135 = useState(null),
    _useState136 = _slicedToArray(_useState135, 2),
    recipeIngSelected = _useState136[0],
    setRecipeIngSelected = _useState136[1];
  var _useState137 = useState("100"),
    _useState138 = _slicedToArray(_useState137, 2),
    recipeIngAmount = _useState138[0],
    setRecipeIngAmount = _useState138[1];
  var _useState139 = useState(null),
    _useState140 = _slicedToArray(_useState139, 2),
    recipeIngServingUnit = _useState140[0],
    setRecipeIngServingUnit = _useState140[1]; // index into food.servings
  var _useState141 = useState("1"),
    _useState142 = _slicedToArray(_useState141, 2),
    recipeIngServingQty = _useState142[0],
    setRecipeIngServingQty = _useState142[1];

  // Recipe log
  var _useState143 = useState(null),
    _useState144 = _slicedToArray(_useState143, 2),
    selectedRecipe = _useState144[0],
    setSelectedRecipe = _useState144[1];
  var _useState145 = useState("servings"),
    _useState146 = _slicedToArray(_useState145, 2),
    recipeLogMode = _useState146[0],
    setRecipeLogMode = _useState146[1];
  var _useState147 = useState("1"),
    _useState148 = _slicedToArray(_useState147, 2),
    recipeLogServings = _useState148[0],
    setRecipeLogServings = _useState148[1];
  var _useState149 = useState(""),
    _useState150 = _slicedToArray(_useState149, 2),
    recipeLogGrams = _useState150[0],
    setRecipeLogGrams = _useState150[1];
  var _useState151 = useState("Breakfast"),
    _useState152 = _slicedToArray(_useState151, 2),
    recipeLogMeal = _useState152[0],
    setRecipeLogMeal = _useState152[1];
  var _useState153 = useState("recipeDetail"),
    _useState154 = _slicedToArray(_useState153, 2),
    recipeLogReturn = _useState154[0],
    setRecipeLogReturn = _useState154[1];
  var _useState155 = useState([]),
    _useState156 = _slicedToArray(_useState155, 2),
    recipeLogReviewIngredients = _useState156[0],
    setRecipeLogReviewIngredients = _useState156[1];
  // Phase 10: add ingredients directly on the recipe log review page.
  var _useState157 = useState(false),
    _useState158 = _slicedToArray(_useState157, 2),
    reviewAddOpen = _useState158[0],
    setReviewAddOpen = _useState158[1];
  var _useState159 = useState("100"),
    _useState160 = _slicedToArray(_useState159, 2),
    reviewAddAmount = _useState160[0],
    setReviewAddAmount = _useState160[1];

  // Supplement stack editor
  var _useState161 = useState(null),
    _useState162 = _slicedToArray(_useState161, 2),
    editingStackId = _useState162[0],
    setEditingStackId = _useState162[1];
  var _useState163 = useState(""),
    _useState164 = _slicedToArray(_useState163, 2),
    stackEditorName = _useState164[0],
    setStackEditorName = _useState164[1];
  var _useState165 = useState([]),
    _useState166 = _slicedToArray(_useState165, 2),
    stackEditorItems = _useState166[0],
    setStackEditorItems = _useState166[1];

  // Supplement item editor
  var _useState167 = useState(null),
    _useState168 = _slicedToArray(_useState167, 2),
    editingItemIdx = _useState168[0],
    setEditingItemIdx = _useState168[1];
  var _useState169 = useState({
      name: "",
      dose_amount: "",
      dose_unit: "mcg",
      nutrients: {}
    }),
    _useState170 = _slicedToArray(_useState169, 2),
    itemEditorData = _useState170[0],
    setItemEditorData = _useState170[1];
  var _useState171 = useState("b12"),
    _useState172 = _slicedToArray(_useState171, 2),
    itemNutKey = _useState172[0],
    setItemNutKey = _useState172[1];
  var _useState173 = useState(""),
    _useState174 = _slicedToArray(_useState173, 2),
    itemNutVal = _useState174[0],
    setItemNutVal = _useState174[1];

  // Supplement log confirmation
  var _useState175 = useState(null),
    _useState176 = _slicedToArray(_useState175, 2),
    suppLogStack = _useState176[0],
    setSuppLogStack = _useState176[1];
  var _useState177 = useState([]),
    _useState178 = _slicedToArray(_useState177, 2),
    suppLogItems = _useState178[0],
    setSuppLogItems = _useState178[1];

  // One-off supplement
  // Phase 11b: traffic-light info tooltip state (nutrient key or null)
  var _useState179 = useState(null),
    _useState180 = _slicedToArray(_useState179, 2),
    trafficInfoKey = _useState180[0],
    setTrafficInfoKey = _useState180[1];
  var _useState181 = useState({
      name: "",
      dose_amount: "",
      dose_unit: "mcg",
      nutrients: {}
    }),
    _useState182 = _slicedToArray(_useState181, 2),
    oneOffData = _useState182[0],
    setOneOffData = _useState182[1];
  var _useState183 = useState("b12"),
    _useState184 = _slicedToArray(_useState183, 2),
    oneOffNutKey = _useState184[0],
    setOneOffNutKey = _useState184[1];
  var _useState185 = useState(""),
    _useState186 = _slicedToArray(_useState185, 2),
    oneOffNutVal = _useState186[0],
    setOneOffNutVal = _useState186[1];
  var searchRef = useRef(null);
  var recipeIngRef = useRef(null);
  var corruptedKeys = useRef(new Set()); // Phase 6b: keys that failed JSON.parse — never overwrite

  // ── LOAD ─────────────────────────────────────────────────────────────
  useEffect(function () {
    _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
      var l, g, go, c, p, er, rc, ns, sq, ss, le, dm, eu, re, parseErrors, resolve, safeL, safeC, migratedCustom, safeCf, safeP, safeEr, safeRc, safeSs, computedOnLoad, safeG, safeGo, safeNs, safeSq, safeLe, safeDm, safeEu, safeRe, shapeFailures, allFailures;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.n) {
          case 0:
            _context.n = 1;
            return loadData(STORAGE_KEYS.logs, {});
          case 1:
            l = _context.v;
            _context.n = 2;
            return loadData(STORAGE_KEYS.goals, DEFAULT_GOALS);
          case 2:
            g = _context.v;
            _context.n = 3;
            return loadData(STORAGE_KEYS.goalOverrides, {});
          case 3:
            go = _context.v;
            _context.n = 4;
            return loadData(STORAGE_KEYS.customFoods, []);
          case 4:
            c = _context.v;
            _context.n = 5;
            return loadData(STORAGE_KEYS.profile, DEFAULT_PROFILE);
          case 5:
            p = _context.v;
            _context.n = 6;
            return loadData(STORAGE_KEYS.exRatio, DEFAULT_EX_RATIO);
          case 6:
            er = _context.v;
            _context.n = 7;
            return loadData(STORAGE_KEYS.recipes, []);
          case 7:
            rc = _context.v;
            _context.n = 8;
            return loadData(STORAGE_KEYS.notionStatus, {
              lastSyncedAt: null
            });
          case 8:
            ns = _context.v;
            _context.n = 9;
            return loadData(STORAGE_KEYS.syncQueue, []);
          case 9:
            sq = _context.v;
            _context.n = 10;
            return loadData(STORAGE_KEYS.supplementStacks, DEFAULT_SUPPLEMENT_STACKS);
          case 10:
            ss = _context.v;
            _context.n = 11;
            return loadData(STORAGE_KEYS.lastExportedAt, null);
          case 11:
            le = _context.v;
            _context.n = 12;
            return loadData(STORAGE_KEYS.displayMode, "advanced");
          case 12:
            dm = _context.v;
            _context.n = 13;
            return loadData(STORAGE_KEYS.energyUnit, "kcal");
          case 13:
            eu = _context.v;
            _context.n = 14;
            return loadData(STORAGE_KEYS.recents, []);
          case 14:
            re = _context.v;
            // W1
            // Recompute goals from stored profile so they're always fresh on load
            // Phase 6b — detect parse errors or shape failures
            // Keys that returned PARSE_ERROR are replaced with their fallback for
            // the rest of the load, but the banner is shown unconditionally.
            parseErrors = [];
            resolve = function resolve(val, fallback, name, storageKey) {
              if (val === PARSE_ERROR) {
                parseErrors.push("".concat(name, ": invalid JSON (corrupted value)"));
                corruptedKeys.current.add(storageKey); // never overwrite this key
                return fallback;
              }
              return val;
            };
            safeL = resolve(l, {}, "logs", STORAGE_KEYS.logs);
            safeC = resolve(c, [], "customFoods", STORAGE_KEYS.customFoods); // Phase 9 (A8) — one-time migration: backfill all numeric nutrient
            // keys (incl. fibre/fat subtypes + amino acids) as null on legacy
            // custom-food records so export + buildFoodSnapshot stay consistent.
            migratedCustom = migrateCustomFoods(safeC);
            safeCf = migratedCustom.foods;
            if (migratedCustom.changed && !corruptedKeys.current.has(STORAGE_KEYS.customFoods)) {
              saveData(STORAGE_KEYS.customFoods, safeCf);
            }
            safeP = resolve(p, DEFAULT_PROFILE, "profile", STORAGE_KEYS.profile);
            safeEr = resolve(er, DEFAULT_EX_RATIO, "exRatio", STORAGE_KEYS.exRatio);
            safeRc = resolve(rc, [], "recipes", STORAGE_KEYS.recipes);
            safeSs = resolve(ss, DEFAULT_SUPPLEMENT_STACKS, "supplementStacks", STORAGE_KEYS.supplementStacks);
            computedOnLoad = computeGoals(safeP);
            safeG = resolve(g, DEFAULT_GOALS, "goals", STORAGE_KEYS.goals);
            safeGo = resolve(go, {}, "goalOverrides", STORAGE_KEYS.goalOverrides);
            safeNs = resolve(ns, {
              lastSyncedAt: null
            }, "notionStatus", STORAGE_KEYS.notionStatus);
            safeSq = resolve(sq, [], "syncQueue", STORAGE_KEYS.syncQueue);
            safeLe = resolve(le, null, "lastExportedAt", STORAGE_KEYS.lastExportedAt);
            safeDm = resolve(dm, "advanced", "displayMode", STORAGE_KEYS.displayMode);
            safeEu = resolve(eu, "kcal", "energyUnit", STORAGE_KEYS.energyUnit); // W4
            safeRe = resolve(re, [], "recents", STORAGE_KEYS.recents); // W1
            setLogs(safeL);
            setGoals(_objectSpread(_objectSpread(_objectSpread({}, computedOnLoad), safeG), computedOnLoad));
            setGoalOverrides(safeGo);
            setCustomFoods(safeCf);
            setProfile(safeP);
            setExRatio(safeEr);
            setRecipes(safeRc);
            setLastSyncedAt(safeNs.lastSyncedAt);
            setSyncQueue(safeSq);
            setSupplementStacks(safeSs);
            setLastExportedAt(safeLe);
            setDisplayMode(safeDm === "simplified" ? "simplified" : "advanced");
            setEnergyUnit(safeEu === "kJ" ? "kJ" : "kcal"); // W4
            setRecents(Array.isArray(safeRe) ? safeRe : []); // W1

            // Shape validation (runs on the resolved safe values)
            shapeFailures = validateStorageShapes({
              logs: safeL,
              recipes: safeRc,
              customFoods: safeCf,
              profile: safeP,
              exRatio: safeEr,
              supplementStacks: safeSs,
              recents: safeRe
            });
            allFailures = [].concat(parseErrors, _toConsumableArray(shapeFailures));
            if (allFailures.length > 0) {
              allFailures.forEach(function (f) {
                return console.warn("[NutriTrack] Storage validation failure:", f);
              });
              setValidationWarning(true);
            }
            saveData(STORAGE_KEYS.lastValidatedAt, new Date().toISOString());

            // Phase 6b — storage byte count (direct localStorage measure, iOS-safe)
            setStorageEstimate(measureLocalStorageBytes());
            setLoaded(true);
          case 15:
            return _context.a(2);
        }
      }, _callee);
    }))();
  }, []);
  useEffect(function () {
    if (loaded && !corruptedKeys.current.has(STORAGE_KEYS.logs)) saveData(STORAGE_KEYS.logs, logs);
  }, [logs, loaded]);
  useEffect(function () {
    if (loaded && !corruptedKeys.current.has(STORAGE_KEYS.goals)) saveData(STORAGE_KEYS.goals, goals);
  }, [goals, loaded]);
  useEffect(function () {
    if (loaded && !corruptedKeys.current.has(STORAGE_KEYS.goalOverrides)) saveData(STORAGE_KEYS.goalOverrides, goalOverrides);
  }, [goalOverrides, loaded]);
  useEffect(function () {
    if (loaded && !corruptedKeys.current.has(STORAGE_KEYS.customFoods)) saveData(STORAGE_KEYS.customFoods, customFoods);
  }, [customFoods, loaded]);
  useEffect(function () {
    if (!loaded || corruptedKeys.current.has(STORAGE_KEYS.profile)) return;
    saveData(STORAGE_KEYS.profile, profile);
    // Recompute base goals whenever profile fields change
    setGoals(computeGoals(profile));
  }, [profile, loaded]);
  useEffect(function () {
    if (loaded && !corruptedKeys.current.has(STORAGE_KEYS.exRatio)) saveData(STORAGE_KEYS.exRatio, exRatio);
  }, [exRatio, loaded]);
  useEffect(function () {
    if (loaded && !corruptedKeys.current.has(STORAGE_KEYS.recipes)) saveData(STORAGE_KEYS.recipes, recipes);
  }, [recipes, loaded]);
  useEffect(function () {
    if (loaded && !corruptedKeys.current.has(STORAGE_KEYS.syncQueue)) saveData(STORAGE_KEYS.syncQueue, syncQueue);
  }, [syncQueue, loaded]);
  useEffect(function () {
    if (loaded && !corruptedKeys.current.has(STORAGE_KEYS.supplementStacks)) saveData(STORAGE_KEYS.supplementStacks, supplementStacks);
  }, [supplementStacks, loaded]);
  useEffect(function () {
    if (loaded && !corruptedKeys.current.has(STORAGE_KEYS.lastExportedAt) && lastExportedAt !== null) saveData(STORAGE_KEYS.lastExportedAt, lastExportedAt);
  }, [lastExportedAt, loaded]);
  useEffect(function () {
    if (loaded && !corruptedKeys.current.has(STORAGE_KEYS.displayMode)) saveData(STORAGE_KEYS.displayMode, displayMode);
  }, [displayMode, loaded]);
  useEffect(function () {
    if (loaded && !corruptedKeys.current.has(STORAGE_KEYS.energyUnit)) saveData(STORAGE_KEYS.energyUnit, energyUnit);
  }, [energyUnit, loaded]); // W4
  useEffect(function () {
    if (loaded && !corruptedKeys.current.has(STORAGE_KEYS.recents)) saveData(STORAGE_KEYS.recents, recents);
  }, [recents, loaded]); // W1

  // Phase 6f — load food DB from external JSON asset
  useEffect(function () {
    var cancelled = false;
    loadFoodDB().then(function (data) {
      if (!cancelled) {
        setFoodDB(data);
        setFoodDBStatus("ready");
      }
    })["catch"](function () {
      if (!cancelled) setFoodDBStatus("error");
    });
    return function () {
      cancelled = true;
    };
  }, []);

  // App-wide select-on-focus: when any number/text/search input gains
  // focus, select its full value so edits start from the end (easy
  // delete/replace) instead of the caret landing at the left edge.
  // Uses focusin (bubbles) so dynamically rendered inputs are covered.
  useEffect(function () {
    var onSelectFocus = function onSelectFocus(e) {
      var t = e.target;
      if (t && t.tagName === "INPUT" && typeof t.select === "function" && (t.type === "number" || t.type === "text" || t.type === "search" || t.type === "")) {
        try {
          t.select();
        } catch (_) {}
      }
    };
    document.addEventListener("focusin", onSelectFocus);
    return function () {
      return document.removeEventListener("focusin", onSelectFocus);
    };
  }, []);

  // Phase 6b — refresh storage byte count when Settings page is opened (not on every save)
  useEffect(function () {
    if (view === "settings") setStorageEstimate(measureLocalStorageBytes());
  }, [view]);

  // allFoodsForRender: includes soft-deleted custom foods so historical log entries still resolve
  // Phase 8 (A1 / R7) — hybrid online/offline detection.
  // navigator.onLine is unreliable in iOS PWA standalone mode, so we combine it
  // with a real Worker /health probe. Strategy:
  //   1. navigator.onLine is the fast gate (instant, but may lie on iOS).
  //   2. If navigator claims online, probe Worker /health with a short 1000ms
  //      timeout (down from 4000ms) so the UX reflects reality within ~2s.
  //   3. On a probe failure/timeout while navigator claims online, fall back to
  //      the last known cached state rather than flipping straight to offline
  //      (avoids flicker on a single hiccup; a genuine outage is confirmed by
  //      the next poll).
  //   4. If navigator explicitly reports offline, trust it immediately.
  // The last-known state is cached in localStorage so a cold start resolves
  // instantly before the first probe completes.
  useEffect(function () {
    var LAST_ONLINE_KEY = "nt-last-online";
    var PROBE_TIMEOUT_MS = 1000; // A1: 4000ms -> 1000ms

    var readCached = function readCached() {
      try {
        var raw = localStorage.getItem(LAST_ONLINE_KEY);
        if (raw === null) return null;
        var v = JSON.parse(raw);
        return _typeof(v) === "object" && v ? Boolean(v.online) : null;
      } catch (_unused3) {
        return null;
      }
    };
    var writeCached = function writeCached(online) {
      try {
        localStorage.setItem(LAST_ONLINE_KEY, JSON.stringify({
          online: online,
          ts: Date.now()
        }));
      } catch (_unused4) {/* cache write must never throw */}
    };

    // A 502/503 from the Worker means the Worker itself is up but its upstream
    // (Notion) is unreachable — that is a sync outage, NOT a connectivity
    // outage, so we keep reporting online and let the sync UI surface the error.
    var probe = function probe() {
      // Step 1: navigator.onLine fast gate.
      if (typeof navigator !== "undefined" && navigator.onLine === false) {
        setIsOnline(false);
        writeCached(false);
        return Promise.resolve(false);
      }
      // Step 2: confirm with a real /health fetch.
      return new Promise(function (resolve) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "".concat(WORKER_URL, "/health"), true);
        xhr.timeout = PROBE_TIMEOUT_MS;
        xhr.onload = function () {
          var ok = xhr.status >= 200 && xhr.status < 500;
          // Step 3: on a transient failure, fall back to last-known state
          // rather than forcing offline (genuine outage confirmed on next poll).
          var next = ok ? true : readCached() === true;
          setIsOnline(next);
          writeCached(next);
          resolve(next);
        };
        xhr.onerror = function () {
          var next = readCached() === true;
          setIsOnline(next);
          writeCached(next);
          resolve(next);
        };
        xhr.ontimeout = function () {
          var next = readCached() === true;
          setIsOnline(next);
          writeCached(next);
          resolve(next);
        };
        xhr.send();
      });
    };
    var onOnline = function onOnline() {
      setIsOnline(true);
      writeCached(true);
      probe();
    };
    var onOffline = function onOffline() {
      setIsOnline(false);
      writeCached(false);
    };
    window.addEventListener("online", onOnline);
    window.addEventListener("offline", onOffline);
    // Probe on mount so initial state is accurate (within ~1s).
    probe();
    // Poll every 5s to catch transitions iOS misses.
    var interval = setInterval(probe, 5000);
    return function () {
      window.removeEventListener("online", onOnline);
      window.removeEventListener("offline", onOffline);
      clearInterval(interval);
    };
  }, []);

  // Phase 6d — SW update detection
  useEffect(function () {
    if (!("serviceWorker" in navigator)) return;
    (window._swReady || navigator.serviceWorker.getRegistration()).then(function (reg) {
      if (!reg) return;
      swRegRef.current = reg;
      if (reg.waiting) setSwUpdateReady(true);
      reg.addEventListener("updatefound", function () {
        var sw = reg.installing;
        if (!sw) return;
        sw.addEventListener("statechange", function () {
          if (sw.state === "installed" && navigator.serviceWorker.controller) {
            swRegRef.current = reg;
            setSwUpdateReady(true);
          }
        });
      });
    });
    navigator.serviceWorker.addEventListener("controllerchange", function () {
      window.location.reload();
    });
  }, []);

  // allFoodsForRender: includes soft-deleted custom foods so historical log entries still resolve
  var allFoodsForRender = useMemo(function () {
    return [].concat(_toConsumableArray(foodDB), _toConsumableArray(customFoods));
  }, [foodDB, customFoods]);
  // allFoods: excludes soft-deleted custom foods — used for search, recipe creation, matching
  var allFoods = useMemo(function () {
    return [].concat(_toConsumableArray(foodDB), _toConsumableArray(customFoods.filter(function (f) {
      return !f.deleted;
    })));
  }, [foodDB, customFoods]);
  var dayLog = logs[currentDate] || [];

  // ── DAILY TOTALS ─────────────────────────────────────────────────────
  var totals = useMemo(function () {
    var t = {};
    Object.keys(NUTRIENT_META).forEach(function (k) {
      return t[k] = 0;
    });
    dayLog.forEach(function (e) {
      if (e.type === "exercise" || e.type === "water" || e.type === "alcohol") return; // legacy 11a entry types (no longer created); skip defensively
      if (e.type === "supplement") {
        (e.items || []).forEach(function (item) {
          Object.keys(item.nutrients || {}).forEach(function (k) {
            var _item$nutrients$k;
            if (NUTRIENT_META[k]) t[k] += (_item$nutrients$k = item.nutrients[k]) !== null && _item$nutrients$k !== void 0 ? _item$nutrients$k : 0;
          });
        });
        return;
      }
      if (e.type === "recipe") {
        (e.derivedIngredients || []).forEach(function (ing) {
          var m = ing.amount_g / 100;
          if (ing.snapshot) {
            Object.keys(NUTRIENT_META).forEach(function (k) {
              var _ing$snapshot$k2;
              t[k] += ((_ing$snapshot$k2 = ing.snapshot[k]) !== null && _ing$snapshot$k2 !== void 0 ? _ing$snapshot$k2 : 0) * m;
            });
          } else {
            var food = allFoodsForRender.find(function (f) {
              return f.id === ing.foodId;
            });
            if (!food) return;
            Object.keys(NUTRIENT_META).forEach(function (k) {
              var _food$k3;
              t[k] += ((_food$k3 = food[k]) !== null && _food$k3 !== void 0 ? _food$k3 : 0) * m;
            });
          }
        });
        return;
      }
      var m = e.amount / 100;
      if (e.snapshot) {
        Object.keys(NUTRIENT_META).forEach(function (k) {
          var _e$snapshot$k;
          t[k] += ((_e$snapshot$k = e.snapshot[k]) !== null && _e$snapshot$k !== void 0 ? _e$snapshot$k : 0) * m;
        });
      } else {
        var food = allFoodsForRender.find(function (f) {
          return f.id === e.foodId;
        });
        if (!food) return;
        Object.keys(NUTRIENT_META).forEach(function (k) {
          var _food$k4;
          t[k] += ((_food$k4 = food[k]) !== null && _food$k4 !== void 0 ? _food$k4 : 0) * m;
        });
      }
    });
    // Phase 11: alcohol calories (g x 7) added on top of food calories (drink calories now exclude alcohol).
    t.cal = Math.round((t.cal + t.alc * 7) * 10) / 10;
    return t;
  }, [dayLog, allFoodsForRender]);
  var exerciseBurn = dayLog.filter(function (e) {
    return e.type === "exercise";
  }).reduce(function (s, e) {
    return s + (e.calories_burned || 0);
  }, 0);
  var ratioSum = exRatio.carb + exRatio.fat + exRatio.pro || 100;

  // Merge: computed goals < stored goals < manual overrides
  var resolvedGoals = useMemo(function () {
    return _objectSpread(_objectSpread({}, goals), goalOverrides);
  }, [goals, goalOverrides]);

  // Dynamic protein multiplier: scales 1.0× (no exercise) → 2.0× (burn ≈ TDEE)
  // Clamped to [1.0, 2.0]. Formula: 1 + (burn / TDEE).
  var tdeeBase = resolvedGoals.cal || 2000;
  var proMultiplier = Math.min(2.0, 1.0 + exerciseBurn / tdeeBase);
  var proBase = goals.pro || 70; // computed base before overrides so multiplier applies to formula value

  var effectiveGoals = useMemo(function () {
    return exerciseBurn > 0 ? _objectSpread(_objectSpread({}, resolvedGoals), {}, {
      cal: resolvedGoals.cal + exerciseBurn,
      carb: resolvedGoals.carb + Math.round(exerciseBurn * (exRatio.carb / ratioSum) / 4),
      fat: resolvedGoals.fat + Math.round(exerciseBurn * (exRatio.fat / ratioSum) / 9),
      pro: goalOverrides.pro != null ? resolvedGoals.pro // user has manually set protein — don't scale
      : Math.round(proBase * proMultiplier)
    }) : resolvedGoals;
  }, [resolvedGoals, exerciseBurn, exRatio, ratioSum, goalOverrides, proBase, proMultiplier]);
  var pct = function pct(k) {
    return Math.round(totals[k] / (effectiveGoals[k] || 1) * 100);
  };
  var handleMacroTap = function handleMacroTap(k) {
    if (k === "cal") setView("calDetail");
    if (k === "fib") setView("fibDetail");
    if (k === "fat") setView("fatDetail");
    if (k === "pro") setView("proDetail");
  };

  // W2 — memoized null arc computation. Runs only when dayLog or DB changes, not on every render.
  // null = genuine data gap (post-W0); 0.0 = confirmed absent. Only null triggers indicator.
  var nullData = useMemo(function () {
    var ALL_KEYS = [].concat(MACROS, MICROS);
    var foodsByKey = {};
    var arcByKey = {};
    ALL_KEYS.forEach(function (k) {
      var goal = effectiveGoals[k] || 1;
      var nonNullVals = allFoodsForRender.map(function (f) {
        return f[k];
      }).filter(function (v) {
        return v != null && v > 0;
      });
      nonNullVals.sort(function (a, b) {
        return a - b;
      });
      var median = nonNullVals.length > 0 ? nonNullVals[Math.floor(nonNullVals.length / 2)] : null;
      var totalWeight = dayLog.filter(function (e) {
        return e.type === "food" || e.type === "recipe";
      }).reduce(function (s, e) {
        return e.type === "recipe" ? s + (e.derivedIngredients || []).reduce(function (a, i) {
          return a + i.amount_g;
        }, 0) : s + (e.amount || 0);
      }, 0);
      var nullFoods = [];
      var estTotal = 0;
      dayLog.forEach(function (e) {
        var _allFoodsForRender$fi2;
        if (e.type === "exercise" || e.type === "supplement") return;
        if (e.type === "recipe") {
          (e.derivedIngredients || []).forEach(function (ing) {
            var _allFoodsForRender$fi;
            var val = ing.snapshot ? ing.snapshot[k] : (_allFoodsForRender$fi = allFoodsForRender.find(function (f) {
              return f.id === ing.foodId;
            })) === null || _allFoodsForRender$fi === void 0 ? void 0 : _allFoodsForRender$fi[k];
            if (val === null) {
              var est = median != null ? ing.amount_g / 100 * median : totalWeight > 0 ? ing.amount_g / totalWeight * goal * 0.1 : 0;
              if (est / goal >= 0.05) {
                nullFoods.push(ing.foodName);
                estTotal += est;
              }
            }
          });
          return;
        }
        var val = e.snapshot ? e.snapshot[k] : (_allFoodsForRender$fi2 = allFoodsForRender.find(function (f) {
          return f.id === e.foodId;
        })) === null || _allFoodsForRender$fi2 === void 0 ? void 0 : _allFoodsForRender$fi2[k];
        if (val === null) {
          var est = median != null ? (e.amount || 0) / 100 * median : totalWeight > 0 ? (e.amount || 0) / totalWeight * goal * 0.1 : 0;
          if (est / goal >= 0.05) {
            nullFoods.push(e.foodName || "Unknown");
            estTotal += est;
          }
        }
      });
      if (nullFoods.length) {
        foodsByKey[k] = _toConsumableArray(new Set(nullFoods));
        arcByKey[k] = Math.min(estTotal / goal, 1);
      }
    });
    return {
      foodsByKey: foodsByKey,
      arcByKey: arcByKey
    };
  }, [dayLog, allFoodsForRender, effectiveGoals]);

  // ── FOOD ACTIONS ──────────────────────────────────────────────────────
  // Reset serving unit/qty picker whenever a new food is selected
  useEffect(function () {
    setServingUnit(null);
    setServingQty("1");
  }, [selectedFood]);
  // Phase 6n: leaving the food add-mode abandons any half-built batch (brief §5.5)
  useEffect(function () {
    if (addMode !== "food" && (multiSelect || batch.length)) {
      setMultiSelect(false);
      setBatch([]);
    }
  }, [addMode]);
  useEffect(function () {
    setRecipeIngServingUnit(null);
    setRecipeIngServingQty("1");
  }, [recipeIngSelected]);
  // Called after any food log commit. Upserts foodId at top, caps at 10.
  var upsertRecent = function upsertRecent(foodId, foodName, amount, mealUsed) {
    setRecents(function (prev) {
      var filtered = prev.filter(function (r) {
        return r.foodId !== foodId;
      });
      var entry = {
        foodId: foodId,
        foodName: foodName,
        lastAmount: amount,
        lastMeal: mealUsed,
        loggedAt: new Date().toISOString()
      };
      return [entry].concat(_toConsumableArray(filtered)).slice(0, 10);
    });
  };
  var addEntry = function addEntry() {
    if (!selectedFood || !amount) return;
    if (editingEntryId) {
      setLogs(function (prev) {
        return _objectSpread(_objectSpread({}, prev), {}, _defineProperty({}, currentDate, (prev[currentDate] || []).map(function (e) {
          return e.id === editingEntryId ? _objectSpread(_objectSpread({}, e), {}, {
            foodId: selectedFood.id,
            foodName: selectedFood.name,
            amount: parseFloat(amount),
            meal: meal
          }) : e;
        })));
      });
      setEditingEntryId(null);
    } else {
      setLogs(function (prev) {
        return _objectSpread(_objectSpread({}, prev), {}, _defineProperty({}, currentDate, [].concat(_toConsumableArray(prev[currentDate] || []), [{
          id: Date.now().toString(),
          foodId: selectedFood.id,
          foodName: selectedFood.name,
          amount: parseFloat(amount),
          meal: meal,
          time: new Date().toISOString(),
          snapshot: buildFoodSnapshot(selectedFood)
        }])));
      });
      upsertRecent(selectedFood.id, selectedFood.name, parseFloat(amount), meal);
    }
    setSelectedFood(null);
    setAmount("100");
    setSearchTerm("");
    setView("log");
  };

  // Quick-log a recent food at its lastAmount/lastMeal without opening the amount screen
  var quickLogRecent = function quickLogRecent(recent) {
    var food = allFoods.find(function (f) {
      return f.id === recent.foodId;
    });
    if (!food) return;
    var mealToUse = recent.lastMeal || meal;
    setLogs(function (prev) {
      return _objectSpread(_objectSpread({}, prev), {}, _defineProperty({}, currentDate, [].concat(_toConsumableArray(prev[currentDate] || []), [{
        id: Date.now().toString(),
        foodId: food.id,
        foodName: food.name,
        amount: recent.lastAmount,
        meal: mealToUse,
        time: new Date().toISOString(),
        snapshot: buildFoodSnapshot(food)
      }])));
    });
    upsertRecent(food.id, food.name, recent.lastAmount, mealToUse);
  };
  var removeEntry = function removeEntry(id) {
    return setLogs(function (prev) {
      return _objectSpread(_objectSpread({}, prev), {}, _defineProperty({}, currentDate, (prev[currentDate] || []).filter(function (e) {
        return e.id !== id;
      })));
    });
  };
  var startEditEntry = function startEditEntry(entry) {
    var food = allFoods.find(function (f) {
      return f.id === entry.foodId;
    });
    if (!food) return;
    setSelectedFood(food);
    setAmount(String(entry.amount));
    setMeal(entry.meal);
    setEditingEntryId(entry.id);
    setAddMode("food");
    setView("add");
  };

  // ── PHASE 6n: MULTI-SELECT BATCH ──────────────────────────────────────────
  // Add a food to the in-progress batch. Pre-fill amount from last-logged
  // recent (brief §4); fall back to "100" (matches single-select default).
  var addFoodToBatch = function addFoodToBatch(food) {
    var last = recents.find(function (r) {
      return r.foodId === food.id;
    });
    var initialAmount = last ? String(last.lastAmount) : "100";
    setBatch(function (prev) {
      return prev.some(function (b) {
        return b.food.id === food.id;
      }) ? prev : [].concat(_toConsumableArray(prev), [{
        food: food,
        amount: initialAmount
      }]);
    });
  };
  var removeFoodFromBatch = function removeFoodFromBatch(idx) {
    return setBatch(function (prev) {
      return prev.filter(function (_, i) {
        return i !== idx;
      });
    });
  };
  var setBatchAmount = function setBatchAmount(idx, amount) {
    return setBatch(function (prev) {
      return prev.map(function (b, i) {
        return i === idx ? _objectSpread(_objectSpread({}, b), {}, {
          amount: amount
        }) : b;
      });
    });
  };

  // Toggle multi-select off must clear the cart (brief §5.5 / scenario 5).
  var toggleMultiSelect = function toggleMultiSelect() {
    if (multiSelect) {
      setMultiSelect(false);
      setBatch([]);
    } // turning OFF -> discard in-progress cart
    else setMultiSelect(true);
  };

  // Commit the whole batch in a single setLogs update (brief §5.3).
  // One shared meal + timestamp for all entries (brief §2). Each entry gets a
  // distinct indexed id to avoid Date.now() collisions in a tight loop (§5.1).
  // Snapshot is captured at commit time per food (§5.2). One upsertRecent per
  // food AFTER the setLogs call, preserving last-added-at-top order (§5.4).
  var commitBatch = function commitBatch() {
    if (!batch.length) return;
    var committedAt = new Date().toISOString();
    var entries = batch.map(function (b, i) {
      return {
        id: "".concat(Date.now(), "-").concat(i),
        foodId: b.food.id,
        foodName: b.food.name,
        amount: parseFloat(b.amount) || 0,
        meal: meal,
        time: committedAt,
        snapshot: buildFoodSnapshot(b.food)
      };
    });
    setLogs(function (prev) {
      return _objectSpread(_objectSpread({}, prev), {}, _defineProperty({}, currentDate, [].concat(_toConsumableArray(prev[currentDate] || []), _toConsumableArray(entries))));
    });
    batch.forEach(function (b) {
      return upsertRecent(b.food.id, b.food.name, parseFloat(b.amount) || 0, meal);
    });
    setBatch([]);
    setMultiSelect(false);
    setSearchTerm("");
    setView("log");
  };

  // ── EXERCISE ──────────────────────────────────────────────────────────
  var addExercise = function addExercise(burnOverride) {
    var act = EXERCISE_ACTIVITIES.find(function (a) {
      return a.id === exActivity;
    });
    var wt = parseFloat(profile.weightKg) || 70,
      dur = parseFloat(exDuration) || 0;
    var auto = Math.round(act.met * wt * (dur / 60));
    var burn = burnOverride !== undefined ? burnOverride : auto;
    setLogs(function (prev) {
      return _objectSpread(_objectSpread({}, prev), {}, _defineProperty({}, currentDate, [].concat(_toConsumableArray(prev[currentDate] || []), [{
        id: Date.now().toString(),
        type: "exercise",
        activity: act.label + " - " + act.intensity,
        duration_min: dur,
        calories_burned: burn,
        time: new Date().toISOString()
      }])));
    });
    setExActivity(EXERCISE_ACTIVITIES[0].id);
    setExDuration("60");
    setExBurnEdit("");
    setView("log");
  };

  // ── RECIPE ACTIONS ────────────────────────────────────────────────────
  var startNewRecipe = function startNewRecipe() {
    setRecipeInProgress({
      name: "",
      source: "",
      servings: "4",
      ingredients: []
    });
    setEditingRecipeId(null);
    setView("recipeCreate");
  };
  var startEditRecipe = function startEditRecipe(r) {
    setRecipeInProgress({
      name: r.name,
      source: r.source || "",
      servings: String(r.servings),
      ingredients: _toConsumableArray(r.ingredients)
    });
    setEditingRecipeId(r.id);
    setView("recipeCreate");
  };
  var saveRecipe = function saveRecipe() {
    if (!recipeInProgress.name.trim() || !recipeInProgress.ingredients.length) return;
    var s = parseFloat(recipeInProgress.servings) || 1,
      n = calcRecipeNutritionPerServing(recipeInProgress.ingredients, s, allFoods);
    var rec = {
      name: recipeInProgress.name.trim(),
      source: recipeInProgress.source.trim(),
      servings: s,
      ingredients: recipeInProgress.ingredients,
      nutrition_per_serving: n
    };
    if (editingRecipeId) setRecipes(function (prev) {
      return prev.map(function (r) {
        return r.id === editingRecipeId ? _objectSpread(_objectSpread({}, r), rec) : r;
      });
    });else setRecipes(function (prev) {
      return [].concat(_toConsumableArray(prev), [_objectSpread({
        id: "recipe_".concat(Date.now())
      }, rec)]);
    });
    setEditingRecipeId(null);
    setView("recipes");
  };
  var deleteRecipe = function deleteRecipe(id) {
    setRecipes(function (prev) {
      return prev.filter(function (r) {
        return r.id !== id;
      });
    });
    setView("recipes");
  };
  var addIngredientToRecipe = function addIngredientToRecipe() {
    if (!recipeIngSelected || !recipeIngAmount) return;
    setRecipeInProgress(function (prev) {
      return _objectSpread(_objectSpread({}, prev), {}, {
        ingredients: [].concat(_toConsumableArray(prev.ingredients), [{
          foodId: recipeIngSelected.id,
          foodName: recipeIngSelected.name,
          amount_g: parseFloat(recipeIngAmount) || 100
        }])
      });
    });
    setRecipeIngSelected(null);
    setRecipeIngSearch("");
    setRecipeIngAmount("100");
    setView("recipeCreate");
  };
  var removeIngFromRecipe = function removeIngFromRecipe(idx) {
    return setRecipeInProgress(function (prev) {
      return _objectSpread(_objectSpread({}, prev), {}, {
        ingredients: prev.ingredients.filter(function (_, i) {
          return i !== idx;
        })
      });
    });
  };
  // Phase 10 (V4): edit an existing ingredient's amount in place, without
  // having to remove and re-add it. Floors at 1g so a stray edit can't zero
  // the ingredient out.
  var updateIngAmountInRecipe = function updateIngAmountInRecipe(idx, raw) {
    var g = parseFloat(raw);
    var amt = !isNaN(g) && g > 0 ? Math.round(g * 10) / 10 : 1;
    setRecipeInProgress(function (prev) {
      return _objectSpread(_objectSpread({}, prev), {}, {
        ingredients: prev.ingredients.map(function (ing, i) {
          return i === idx ? _objectSpread(_objectSpread({}, ing), {}, {
            amount_g: amt
          }) : ing;
        })
      });
    });
  };
  var logRecipe = function logRecipe() {
    if (!selectedRecipe) return;
    var rs = Math.max(Number(selectedRecipe.servings) || 1, 0.01),
      tw = (selectedRecipe.ingredients || []).reduce(function (s, i) {
        return s + (Number(i.amount_g) || 0);
      }, 0);
    var frac, sl;
    if (recipeLogMode === "servings") {
      sl = parseFloat(recipeLogServings) || 1;
      frac = sl / rs;
    } else {
      var g = parseFloat(recipeLogGrams) || 0;
      frac = tw > 0 ? g / tw : 0;
      sl = Math.round(frac * rs * 10) / 10;
    }
    if (frac <= 0) return;
    var di = (selectedRecipe.ingredients || []).map(function (ing) {
      var food = allFoods.find(function (f) {
        return f.id === ing.foodId;
      });
      var rawAmt = (Number(ing.amount_g) || 0) * frac;
      var amt = rawAmt > 0 ? Math.max(Math.round(rawAmt * 10) / 10, 0.1) : 0.1; // floor at 0.1g — never 0
      return _objectSpread({
        foodId: ing.foodId,
        foodName: ing.foodName,
        amount_g: amt
      }, food ? {
        snapshot: buildFoodSnapshot(food)
      } : {});
    });
    setRecipeLogReviewIngredients(di);
    setView("recipeLogReview");
  };
  var commitLogRecipe = function commitLogRecipe(finalDI) {
    if (!selectedRecipe || !finalDI.length) return;
    var rs = Math.max(Number(selectedRecipe.servings) || 1, 0.01);
    var sl;
    if (recipeLogMode === "servings") {
      sl = parseFloat(recipeLogServings) || 1;
    } else {
      var tw = selectedRecipe.ingredients.reduce(function (s, i) {
        return s + i.amount_g;
      }, 0);
      var g = parseFloat(recipeLogGrams) || 0;
      sl = Math.round((tw > 0 ? g / tw : 0) * rs * 10) / 10;
    }
    setLogs(function (prev) {
      return _objectSpread(_objectSpread({}, prev), {}, _defineProperty({}, currentDate, [].concat(_toConsumableArray(prev[currentDate] || []), [{
        id: Date.now().toString(),
        type: "recipe",
        recipeId: selectedRecipe.id,
        recipeName: selectedRecipe.name,
        servings: Math.round(sl * 10) / 10,
        meal: recipeLogMeal,
        time: new Date().toISOString(),
        derivedIngredients: finalDI
      }])));
    });
    setView("log");
    setRecipeLogServings("1");
    setRecipeLogGrams("");
    setRecipeLogMode("servings");
    setSelectedRecipe(null);
    setRecipeLogReturn("recipeDetail");
    setRecipeLogReviewIngredients([]);
  };
  // Phase 10: add an extra ingredient while reviewing a recipe log.
  // Pushes into the review list only — the saved recipe is never touched.
  var addIngredientToReview = function addIngredientToReview(food) {
    var g = parseFloat(reviewAddAmount);
    var amt = !isNaN(g) && g > 0 ? Math.round(g * 10) / 10 : 100;
    var snap = buildFoodSnapshot(food);
    setRecipeLogReviewIngredients(function (prev) {
      return [].concat(_toConsumableArray(prev), [{
        foodId: food.id,
        foodName: food.name,
        amount_g: amt,
        snapshot: snap
      }]);
    });
    setReviewAddAmount("100");
    setRecipeIngSearch("");
    setReviewAddOpen(false);
  };

  // ── SUPPLEMENT ACTIONS ────────────────────────────────────────────────
  var openStackEditor = function openStackEditor(stack) {
    if (stack) {
      setEditingStackId(stack.id);
      setStackEditorName(stack.name);
      setStackEditorItems(stack.items.map(function (i) {
        return _objectSpread(_objectSpread({}, i), {}, {
          nutrients: _objectSpread({}, i.nutrients)
        });
      }));
    } else {
      setEditingStackId(null);
      setStackEditorName("");
      setStackEditorItems([]);
    }
    setView("stackEditor");
  };
  var saveStack = function saveStack() {
    if (!stackEditorName.trim()) return;
    var stack = {
      id: editingStackId || "stack_".concat(Date.now()),
      name: stackEditorName.trim(),
      items: stackEditorItems
    };
    if (editingStackId) setSupplementStacks(function (prev) {
      return prev.map(function (s) {
        return s.id === editingStackId ? stack : s;
      });
    });else setSupplementStacks(function (prev) {
      return [].concat(_toConsumableArray(prev), [stack]);
    });
    setView("settings");
  };
  var deleteStack = function deleteStack(id) {
    setSupplementStacks(function (prev) {
      return prev.filter(function (s) {
        return s.id !== id;
      });
    });
    setView("settings");
  };
  var openItemEditor = function openItemEditor(idx) {
    if (idx !== null && idx !== undefined) {
      var item = stackEditorItems[idx];
      setEditingItemIdx(idx);
      setItemEditorData({
        name: item.name,
        dose_amount: String(item.dose_amount),
        dose_unit: item.dose_unit,
        nutrients: _objectSpread({}, item.nutrients)
      });
    } else {
      setEditingItemIdx(null);
      setItemEditorData({
        name: "",
        dose_amount: "",
        dose_unit: "mcg",
        nutrients: {}
      });
    }
    setItemNutKey("b12");
    setItemNutVal("");
    setView("itemEditor");
  };
  var saveItem = function saveItem() {
    var item = {
      name: itemEditorData.name.trim(),
      dose_amount: parseFloat(itemEditorData.dose_amount) || 0,
      dose_unit: itemEditorData.dose_unit,
      nutrients: _objectSpread({}, itemEditorData.nutrients)
    };
    if (!item.name) return;
    if (editingItemIdx !== null && editingItemIdx !== undefined) setStackEditorItems(function (prev) {
      return prev.map(function (x, i) {
        return i === editingItemIdx ? item : x;
      });
    });else setStackEditorItems(function (prev) {
      return [].concat(_toConsumableArray(prev), [item]);
    });
    setView("stackEditor");
  };
  var removeItemFromStack = function removeItemFromStack(idx) {
    return setStackEditorItems(function (prev) {
      return prev.filter(function (_, i) {
        return i !== idx;
      });
    });
  };
  var addNutrientToItem = function addNutrientToItem() {
    var val = parseFloat(itemNutVal);
    if (!itemNutKey || isNaN(val)) return;
    setItemEditorData(function (prev) {
      return _objectSpread(_objectSpread({}, prev), {}, {
        nutrients: _objectSpread(_objectSpread({}, prev.nutrients), {}, _defineProperty({}, itemNutKey, val))
      });
    });
    setItemNutVal("");
  };
  var removeNutrientFromItem = function removeNutrientFromItem(key) {
    setItemEditorData(function (prev) {
      var n = _objectSpread({}, prev.nutrients);
      delete n[key];
      return _objectSpread(_objectSpread({}, prev), {}, {
        nutrients: n
      });
    });
  };
  var openSuppLogConfirm = function openSuppLogConfirm(stack) {
    setSuppLogStack(stack);
    setSuppLogItems(stack.items.map(function (item) {
      return _objectSpread(_objectSpread({}, item), {}, {
        checked: true,
        doseOverride: ""
      });
    }));
    setView("suppLogConfirm");
  };
  var logSuppStack = function logSuppStack() {
    if (!suppLogStack) return;
    var items = suppLogItems.filter(function (i) {
      return i.checked;
    }).map(function (i) {
      var d = parseFloat(i.doseOverride);
      return {
        name: i.name,
        dose_amount: !isNaN(d) && i.doseOverride.trim() != "" ? d : i.dose_amount,
        dose_unit: i.dose_unit,
        nutrients: _objectSpread({}, i.nutrients)
      };
    });
    if (!items.length) {
      setView("add");
      return;
    }
    var suppSnapshot = {};
    items.forEach(function (item) {
      Object.keys(item.nutrients || {}).forEach(function (k) {
        var _suppSnapshot$k, _item$nutrients$k2;
        suppSnapshot[k] = ((_suppSnapshot$k = suppSnapshot[k]) !== null && _suppSnapshot$k !== void 0 ? _suppSnapshot$k : 0) + ((_item$nutrients$k2 = item.nutrients[k]) !== null && _item$nutrients$k2 !== void 0 ? _item$nutrients$k2 : 0);
      });
    });
    setLogs(function (prev) {
      return _objectSpread(_objectSpread({}, prev), {}, _defineProperty({}, currentDate, [].concat(_toConsumableArray(prev[currentDate] || []), [{
        id: Date.now().toString(),
        type: "supplement",
        stackId: suppLogStack.id,
        stackName: suppLogStack.name,
        items: items,
        time: new Date().toISOString(),
        meal: "",
        snapshot: suppSnapshot
      }])));
    });
    setSuppLogStack(null);
    setSuppLogItems([]);
    setView("log");
  };
  var addNutrientToOneOff = function addNutrientToOneOff() {
    var val = parseFloat(oneOffNutVal);
    if (!oneOffNutKey || isNaN(val)) return;
    setOneOffData(function (prev) {
      return _objectSpread(_objectSpread({}, prev), {}, {
        nutrients: _objectSpread(_objectSpread({}, prev.nutrients), {}, _defineProperty({}, oneOffNutKey, val))
      });
    });
    setOneOffNutVal("");
  };
  var removeNutrientFromOneOff = function removeNutrientFromOneOff(key) {
    setOneOffData(function (prev) {
      var n = _objectSpread({}, prev.nutrients);
      delete n[key];
      return _objectSpread(_objectSpread({}, prev), {}, {
        nutrients: n
      });
    });
  };
  var logOneOff = function logOneOff() {
    if (!oneOffData.name.trim()) return;
    var item = {
      name: oneOffData.name.trim(),
      dose_amount: parseFloat(oneOffData.dose_amount) || 0,
      dose_unit: oneOffData.dose_unit,
      nutrients: _objectSpread({}, oneOffData.nutrients)
    };
    setLogs(function (prev) {
      return _objectSpread(_objectSpread({}, prev), {}, _defineProperty({}, currentDate, [].concat(_toConsumableArray(prev[currentDate] || []), [{
        id: Date.now().toString(),
        type: "supplement",
        stackId: null,
        stackName: "One-off",
        items: [item],
        time: new Date().toISOString(),
        meal: "",
        snapshot: _objectSpread({}, item.nutrients)
      }])));
    });
    setOneOffData({
      name: "",
      dose_amount: "",
      dose_unit: "mcg",
      nutrients: {}
    });
    setOneOffNutKey("b12");
    setOneOffNutVal("");
    setView("log");
  };
  var changeDate = function changeDate(delta) {
    var d = new Date(currentDate);
    d.setDate(d.getDate() + delta);
    setCurrentDate(dateKey(d));
  };
  var resetCfForm = function resetCfForm() {
    setCf({
      name: "",
      cat: "Other",
      cal: "",
      pro: "",
      carb: "",
      fat: "",
      fib: "",
      alc: "",
      water: "",
      iron: "",
      calc: "",
      zinc: "",
      b12: "",
      vitD: "",
      omega3: "",
      iod: "",
      sel: "",
      mag: "",
      pot: "",
      fol: "",
      sod: "",
      vitA: "",
      vitC: ""
    });
    setEditingCustomFoodId(null);
    setCfMode("simple");
  };
  var openEditCustomFood = function openEditCustomFood(food) {
    // Load an existing custom food into the form for editing. Preserve any
    // saved subtype values so they round-trip; the form only edits the 19
    // NUTRIENT_META keys; subtypes stay as stored (or null).
    var vals = {};
    Object.keys(NUTRIENT_META).forEach(function (k) {
      vals[k] = food[k] === null || food[k] === undefined ? "" : String(food[k]);
    });
    setCf(_objectSpread({
      name: food.name || "",
      cat: food.cat || "Other"
    }, vals));
    setEditingCustomFoodId(food.id);
    setCfMode("advanced"); // editing surfaces all fields
    setView("customAdd");
  };
  var saveCustomFood = function saveCustomFood() {
    if (!cf.name.trim() || !cf.cal) return;
    // Phase 9 (A8): custom foods are schema-complete — all NUTRIENT_META
    // keys are captured from the form, and the 14 subtype keys (fibre/fat
    // subtypes + amino acids) the form does not collect are set to null
    // (unknown), matching foods.json convention. When editing, preserve
    // any previously-saved subtype values rather than blanking them.
    var id = editingCustomFoodId || "custom_".concat(Date.now());
    var existing = editingCustomFoodId ? customFoods.find(function (f) {
      return f.id === editingCustomFoodId;
    }) : null;
    var subtypes = Object.fromEntries(FOOD_SUBTYPE_KEYS.map(function (k) {
      var _existing$k;
      return [k, existing ? (_existing$k = existing[k]) !== null && _existing$k !== void 0 ? _existing$k : null : null];
    }));
    var savedFood = _objectSpread(_objectSpread(_objectSpread({}, existing), {}, {
      // preserve deleted flag, servings, etc. when editing
      id: id,
      name: cf.name.trim(),
      cat: cf.cat || "Other"
    }, Object.fromEntries(Object.keys(NUTRIENT_META).map(function (k) {
      return [k, parseFloat(cf[k]) || 0];
    }))), subtypes);
    if (editingCustomFoodId) {
      setCustomFoods(function (prev) {
        return prev.map(function (f) {
          return f.id === editingCustomFoodId ? savedFood : f;
        });
      });
    } else {
      setCustomFoods(function (prev) {
        return [].concat(_toConsumableArray(prev), [savedFood]);
      });
    }
    resetCfForm();
    setView("manageCustomFoods");
  };
  var softDeleteCustomFood = function softDeleteCustomFood(id) {
    return setCustomFoods(function (prev) {
      return prev.map(function (f) {
        return f.id === id ? _objectSpread(_objectSpread({}, f), {}, {
          deleted: true
        }) : f;
      });
    });
  };
  var restoreCustomFood = function restoreCustomFood(id) {
    return setCustomFoods(function (prev) {
      return prev.map(function (f) {
        return f.id === id ? _objectSpread(_objectSpread({}, f), {}, {
          deleted: false
        }) : f;
      });
    });
  };

  // Open edit views for logged entries
  var openEditRecipeEntry = function openEditRecipeEntry(entry) {
    setEditingLogEntry(entry);
    setEditLogServings(String(entry.servings));
    setEditLogMeal(entry.meal || "Breakfast");
    setView("editLoggedRecipe");
  };
  var openEditExerciseEntry = function openEditExerciseEntry(entry) {
    setEditingLogEntry(entry);
    setEditLogDuration(String(entry.duration_min));
    setEditLogBurn("");
    var matched = EXERCISE_ACTIVITIES.find(function (a) {
      return a.label + " - " + a.intensity === entry.activity;
    });
    setEditLogActivityId(matched ? matched.id : EXERCISE_ACTIVITIES[0].id);
    setView("editLoggedExercise");
  };
  var openEditSuppEntry = function openEditSuppEntry(entry) {
    setEditingLogEntry(entry);
    setEditLogSuppItems((entry.items || []).map(function (i) {
      return _objectSpread(_objectSpread({}, i), {}, {
        doseOverride: ""
      });
    }));
    setView("editLoggedSupp");
  };

  // Save edits back to log
  var saveEditedRecipeEntry = function saveEditedRecipeEntry() {
    if (!editingLogEntry) return;
    var recipe = recipes.find(function (r) {
      return r.id === editingLogEntry.recipeId;
    });
    var servings = parseFloat(editLogServings) || 1;
    var di = editingLogEntry.derivedIngredients;
    var origServings = editingLogEntry.servings || 1;
    if (di && di.length > 0) {
      // Scale the logged derivedIngredients proportionally — preserves any log-time removals
      if (servings !== origServings) {
        var scale = servings / origServings;
        di = di.map(function (ing) {
          return _objectSpread(_objectSpread({}, ing), {}, {
            amount_g: Math.round(ing.amount_g * scale * 10) / 10
          });
        });
      }
    } else if (recipe) {
      // Fallback for old log entries that predate W1 (no derivedIngredients saved)
      var rs = Math.max(Number(recipe.servings) || 1, 0.01);
      var frac = servings / rs;
      di = recipe.ingredients.map(function (ing) {
        var origIng = (editingLogEntry.derivedIngredients || []).find(function (d) {
          return d.foodId === ing.foodId;
        });
        return _objectSpread({
          foodId: ing.foodId,
          foodName: ing.foodName,
          amount_g: Math.round(ing.amount_g * frac * 10) / 10
        }, origIng !== null && origIng !== void 0 && origIng.snapshot ? {
          snapshot: origIng.snapshot
        } : {});
      });
    }
    setLogs(function (prev) {
      return _objectSpread(_objectSpread({}, prev), {}, _defineProperty({}, currentDate, (prev[currentDate] || []).map(function (e) {
        return e.id === editingLogEntry.id ? _objectSpread(_objectSpread({}, e), {}, {
          servings: Math.round(servings * 10) / 10,
          meal: editLogMeal,
          derivedIngredients: di
        }) : e;
      })));
    });
    setEditingLogEntry(null);
    setView("log");
  };
  var saveEditedExerciseEntry = function saveEditedExerciseEntry() {
    if (!editingLogEntry) return;
    var dur = parseFloat(editLogDuration) || 0;
    var act = EXERCISE_ACTIVITIES.find(function (a) {
      return a.id === editLogActivityId;
    }) || EXERCISE_ACTIVITIES[0];
    var wt = parseFloat(profile === null || profile === void 0 ? void 0 : profile.weightKg) || 70;
    var burn = editLogBurn !== "" ? parseInt(editLogBurn) || 0 : Math.round(act.met * wt * (dur / 60));
    setLogs(function (prev) {
      return _objectSpread(_objectSpread({}, prev), {}, _defineProperty({}, currentDate, (prev[currentDate] || []).map(function (e) {
        return e.id === editingLogEntry.id ? _objectSpread(_objectSpread({}, e), {}, {
          activity: act.label + " - " + act.intensity,
          duration_min: dur,
          calories_burned: burn
        }) : e;
      })));
    });
    setEditingLogEntry(null);
    setView("log");
  };
  var saveEditedSuppEntry = function saveEditedSuppEntry() {
    if (!editingLogEntry) return;
    var items = editLogSuppItems.map(function (i) {
      var newDose = parseFloat(i.doseOverride);
      var hasOverride = !isNaN(newDose) && i.doseOverride.trim() !== "";
      var finalDose = hasOverride ? newDose : i.dose_amount;
      // Rescale nutrients proportionally to dose change
      var scaleFactor = i.dose_amount > 0 && hasOverride ? newDose / i.dose_amount : 1;
      var nutrients = Object.fromEntries(Object.entries(i.nutrients || {}).map(function (_ref5) {
        var _ref6 = _slicedToArray(_ref5, 2),
          k = _ref6[0],
          v = _ref6[1];
        return [k, Math.round(v * scaleFactor * 1000) / 1000];
      }));
      return {
        name: i.name,
        dose_amount: finalDose,
        dose_unit: i.dose_unit,
        nutrients: nutrients
      };
    });
    setLogs(function (prev) {
      return _objectSpread(_objectSpread({}, prev), {}, _defineProperty({}, currentDate, (prev[currentDate] || []).map(function (e) {
        return e.id === editingLogEntry.id ? _objectSpread(_objectSpread({}, e), {}, {
          items: items
        }) : e;
      })));
    });
    setEditingLogEntry(null);
    setView("log");
  };
  // ── NOTION SYNC ───────────────────────────────────────────────────────
  var buildReviewData = function buildReviewData(parsedRecipes) {
    var review = parsedRecipes.map(function (r) {
      var existing = recipes.find(function (rec) {
        return rec.name.toLowerCase().trim() === (r.title || "").toLowerCase().trim();
      });
      return {
        title: r.title || "Untitled",
        servings: r.servings || 4,
        source: r.source || "",
        ingredients: (r.ingredients || []).map(function (ing) {
          var match = fuzzyMatchFood(ing.name, allFoods);
          return {
            raw: "".concat(ing.amount, " ").concat(ing.unit, " ").concat(ing.name),
            name: ing.name,
            amount: ing.amount,
            unit: ing.unit,
            amount_g: toGrams(ing.amount, ing.unit),
            match: match,
            skipped: !match
          };
        }),
        duplicateAction: existing ? null : "import",
        existingId: (existing === null || existing === void 0 ? void 0 : existing.id) || null,
        imported: false
      };
    });
    setSyncReviewData(review);
    setNotionSyncMsg(null);
    setSyncInProgress(false);
    setView("notionReview");
  };
  var handleTestConnection = /*#__PURE__*/function () {
    var _ref7 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
      var data, _t;
      return _regenerator().w(function (_context2) {
        while (1) switch (_context2.p = _context2.n) {
          case 0:
            setNotionSyncMsg({
              type: "info",
              text: "Testing connection…"
            });
            _context2.p = 1;
            _context2.n = 2;
            return fetchHealth();
          case 2:
            data = _context2.v;
            setNotionSyncMsg({
              type: "info",
              text: "\u2713 Connected to Worker (v".concat(data.version || "?", ")")
            });
            setTimeout(function () {
              return setNotionSyncMsg(null);
            }, 4000);
            _context2.n = 4;
            break;
          case 3:
            _context2.p = 3;
            _t = _context2.v;
            setNotionSyncMsg({
              type: "error",
              text: friendlyError(_t, "testConnection")
            });
            setTimeout(function () {
              return setNotionSyncMsg(null);
            }, 8000);
          case 4:
            return _context2.a(2);
        }
      }, _callee2, null, [[1, 3]]);
    }));
    return function handleTestConnection() {
      return _ref7.apply(this, arguments);
    };
  }();
  var handleResetSyncHistory = function handleResetSyncHistory() {
    setLastSyncedAt(null);
    saveData(STORAGE_KEYS.notionStatus, {
      lastSyncedAt: null
    });
    setNotionSyncMsg({
      type: "info",
      text: "Sync history cleared."
    });
    setTimeout(function () {
      return setNotionSyncMsg(null);
    }, 4000);
  };
  var handleWorkerSync = /*#__PURE__*/function () {
    var _ref8 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
      var lr, rl, fa, enriched, usable, skipped, parsed, i, r, ing, _t2, _t3;
      return _regenerator().w(function (_context3) {
        while (1) switch (_context3.p = _context3.n) {
          case 0:
            if (navigator.onLine) {
              _context3.n = 1;
              break;
            }
            setSyncQueue(function (prev) {
              return [].concat(_toConsumableArray(prev), [{
                id: Date.now().toString(),
                captured_time: new Date().toISOString(),
                status: "pending"
              }]);
            });
            setNotionSyncMsg({
              type: "info",
              text: "Offline. Sync queued."
            });
            setTimeout(function () {
              return setNotionSyncMsg(null);
            }, 4000);
            return _context3.a(2);
          case 1:
            setSyncInProgress(true);
            setSyncProgress({
              phase: "connecting",
              current: 0,
              total: 0
            });
            setNotionSyncMsg(null);
            _context3.p = 2;
            setSyncProgress({
              phase: "listing",
              current: 0,
              total: 0
            });
            _context3.n = 3;
            return fetchRecipesList(lastSyncedAt);
          case 3:
            lr = _context3.v;
            rl = lr.recipes || [], fa = lr.fetched_at || new Date().toISOString();
            if (rl.length) {
              _context3.n = 4;
              break;
            }
            setLastSyncedAt(fa);
            saveData(STORAGE_KEYS.notionStatus, {
              lastSyncedAt: fa
            });
            setSyncInProgress(false);
            setSyncProgress(null);
            setNotionSyncMsg({
              type: "info",
              text: lastSyncedAt ? "No new recipes since last sync." : "No recipes found."
            });
            setTimeout(function () {
              return setNotionSyncMsg(null);
            }, 5000);
            return _context3.a(2);
          case 4:
            setSyncProgress({
              phase: "fetching",
              current: 0,
              total: rl.length
            });
            _context3.n = 5;
            return fetchRecipePagesWithProgress(rl, function (c) {
              return setSyncProgress({
                phase: "fetching",
                current: c,
                total: rl.length
              });
            });
          case 5:
            enriched = _context3.v;
            usable = enriched.filter(function (r) {
              return r.ingredientLines && r.ingredientLines.length;
            }), skipped = enriched.length - usable.length;
            if (usable.length) {
              _context3.n = 6;
              break;
            }
            setSyncInProgress(false);
            setSyncProgress(null);
            setNotionSyncMsg({
              type: "error",
              text: "No parseable ingredient tables found."
            });
            setTimeout(function () {
              return setNotionSyncMsg(null);
            }, 6000);
            return _context3.a(2);
          case 6:
            setSyncProgress({
              phase: "parsing",
              current: 0,
              total: usable.length
            });
            parsed = [];
            i = 0;
          case 7:
            if (!(i < usable.length)) {
              _context3.n = 13;
              break;
            }
            r = usable[i];
            _context3.p = 8;
            _context3.n = 9;
            return parseIngredients(r.ingredientLines);
          case 9:
            ing = _context3.v;
            parsed.push(_objectSpread(_objectSpread({}, r), {}, {
              ingredients: ing
            }));
            _context3.n = 11;
            break;
          case 10:
            _context3.p = 10;
            _t2 = _context3.v;
            parsed.push(_objectSpread(_objectSpread({}, r), {}, {
              ingredients: []
            }));
          case 11:
            setSyncProgress({
              phase: "parsing",
              current: i + 1,
              total: usable.length
            });
          case 12:
            i++;
            _context3.n = 7;
            break;
          case 13:
            buildReviewData(parsed);
            setLastSyncedAt(fa);
            saveData(STORAGE_KEYS.notionStatus, {
              lastSyncedAt: fa
            });
            if (skipped > 0) setNotionSyncMsg({
              type: "info",
              text: "".concat(parsed.length, " recipe").concat(parsed.length === 1 ? "" : "s", " for review. ").concat(skipped, " skipped.")
            });
            setSyncProgress(null);
            _context3.n = 15;
            break;
          case 14:
            _context3.p = 14;
            _t3 = _context3.v;
            setNotionSyncMsg({
              type: "error",
              text: friendlyError(_t3, "workerSync")
            });
            setSyncInProgress(false);
            setSyncProgress(null);
            setTimeout(function () {
              return setNotionSyncMsg(null);
            }, 8000);
          case 15:
            return _context3.a(2);
        }
      }, _callee3, null, [[8, 10], [2, 14]]);
    }));
    return function handleWorkerSync() {
      return _ref8.apply(this, arguments);
    };
  }();
  var handlePasteSync = /*#__PURE__*/function () {
    var _ref9 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5() {
      var rr, parsed, _t8;
      return _regenerator().w(function (_context5) {
        while (1) switch (_context5.p = _context5.n) {
          case 0:
            if (pasteText.trim()) {
              _context5.n = 1;
              break;
            }
            return _context5.a(2);
          case 1:
            setSyncInProgress(true);
            setNotionSyncMsg({
              type: "info",
              text: "Parsing pasted content…"
            });
            _context5.p = 2;
            _context5.n = 3;
            return parseRecipesFromPasteText(pasteText);
          case 3:
            rr = _context5.v;
            if (rr.length) {
              _context5.n = 4;
              break;
            }
            setNotionSyncMsg({
              type: "error",
              text: "No recipes found."
            });
            setSyncInProgress(false);
            setTimeout(function () {
              return setNotionSyncMsg(null);
            }, 5000);
            return _context5.a(2);
          case 4:
            _context5.n = 5;
            return Promise.all(rr.map(/*#__PURE__*/function () {
              var _ref0 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(r) {
                var _t4, _t5, _t6, _t7;
                return _regenerator().w(function (_context4) {
                  while (1) switch (_context4.n) {
                    case 0:
                      _t4 = _objectSpread;
                      _t5 = _objectSpread({}, r);
                      _t6 = {};
                      _context4.n = 1;
                      return parseIngredients(r.ingredientLines);
                    case 1:
                      _t7 = _context4.v;
                      return _context4.a(2, _t4(_t5, _t6, {
                        ingredients: _t7
                      }));
                  }
                }, _callee4);
              }));
              return function (_x12) {
                return _ref0.apply(this, arguments);
              };
            }()));
          case 5:
            parsed = _context5.v;
            buildReviewData(parsed);
            _context5.n = 7;
            break;
          case 6:
            _context5.p = 6;
            _t8 = _context5.v;
            setNotionSyncMsg({
              type: "error",
              text: friendlyError(_t8, "pasteSync")
            });
            setSyncInProgress(false);
            setTimeout(function () {
              return setNotionSyncMsg(null);
            }, 4000);
          case 7:
            return _context5.a(2);
        }
      }, _callee5, null, [[2, 6]]);
    }));
    return function handlePasteSync() {
      return _ref9.apply(this, arguments);
    };
  }();
  var handleParserTest = /*#__PURE__*/function () {
    var _ref1 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6() {
      var lines, ing, _t9;
      return _regenerator().w(function (_context6) {
        while (1) switch (_context6.p = _context6.n) {
          case 0:
            if (parserTestText.trim()) {
              _context6.n = 1;
              break;
            }
            return _context6.a(2);
          case 1:
            setSyncInProgress(true);
            _context6.p = 2;
            lines = parserTestText.split(/\r?\n/).map(function (l) {
              return l.trim();
            }).filter(Boolean);
            _context6.n = 3;
            return parseIngredients(lines);
          case 3:
            ing = _context6.v;
            buildReviewData([{
              title: "Parser Test",
              servings: 1,
              source: "regex parser test",
              ingredientLines: lines,
              ingredients: ing
            }]);
            _context6.n = 5;
            break;
          case 4:
            _context6.p = 4;
            _t9 = _context6.v;
            setNotionSyncMsg({
              type: "error",
              text: friendlyError(_t9, "parserTest")
            });
            setSyncInProgress(false);
          case 5:
            return _context6.a(2);
        }
      }, _callee6, null, [[2, 4]]);
    }));
    return function handleParserTest() {
      return _ref1.apply(this, arguments);
    };
  }();
  var importRecipe = function importRecipe(idx) {
    var r = syncReviewData[idx];
    if (r.duplicateAction === "skip" || r.imported) return;
    var ingredients = r.ingredients.filter(function (i) {
      return i.match && !i.skipped;
    }).map(function (i) {
      return {
        foodId: i.match.id,
        foodName: i.match.name,
        amount_g: i.amount_g
      };
    });
    if (!ingredients.length) return;
    var s = Math.max(r.servings || 1, 0.1),
      nutrition = calcRecipeNutritionPerServing(ingredients, s, allFoods);
    var name = r.duplicateAction === "copy" ? "".concat(r.title, " (imported)") : r.title;
    var newRec = {
      id: r.duplicateAction === "overwrite" && r.existingId ? r.existingId : "recipe_".concat(Date.now(), "_").concat(idx),
      name: name,
      source: r.source,
      servings: s,
      ingredients: ingredients,
      nutrition_per_serving: nutrition
    };
    if (r.duplicateAction === "overwrite" && r.existingId) setRecipes(function (prev) {
      return prev.map(function (rec) {
        return rec.id === r.existingId ? newRec : rec;
      });
    });else setRecipes(function (prev) {
      return [].concat(_toConsumableArray(prev), [newRec]);
    });
    setSyncReviewData(function (prev) {
      return prev.map(function (item, i) {
        return i === idx ? _objectSpread(_objectSpread({}, item), {}, {
          imported: true
        }) : item;
      });
    });
  };
  var importAllReady = function importAllReady() {
    syncReviewData.forEach(function (_, idx) {
      var r = syncReviewData[idx];
      if (!r.imported && r.duplicateAction !== null && r.duplicateAction !== "skip") importRecipe(idx);
    });
    setSyncQueue([]);
    setPasteText("");
    setView("settings");
    setNotionSyncMsg({
      type: "info",
      text: "Import complete ✓"
    });
    setTimeout(function () {
      return setNotionSyncMsg(null);
    }, 3000);
  };
  var clearSyncQueue = function clearSyncQueue() {
    setSyncQueue([]);
    setNotionSyncMsg({
      type: "info",
      text: "Queue cleared."
    });
    setTimeout(function () {
      return setNotionSyncMsg(null);
    }, 3000);
  };
  var filteredFoods = debouncedSearchTerm.length > 0 ? allFoods.filter(function (f) {
    return f.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase());
  }) : allFoods;
  var groupedByCategory = filteredFoods.reduce(function (acc, f) {
    if (!acc[f.cat]) acc[f.cat] = [];
    acc[f.cat].push(f);
    return acc;
  }, {});
  var filteredIngFoods = recipeIngSearch.length > 0 ? allFoods.filter(function (f) {
    return f.name.toLowerCase().includes(recipeIngSearch.toLowerCase());
  }) : allFoods;
  var groupedIngByCategory = filteredIngFoods.reduce(function (acc, f) {
    if (!acc[f.cat]) acc[f.cat] = [];
    acc[f.cat].push(f);
    return acc;
  }, {});
  var formatDate = function formatDate(ds) {
    var d = new Date(ds + "T12:00:00");
    return d.toLocaleDateString("en-GB", {
      weekday: "short",
      month: "short",
      day: "numeric"
    });
  };
  if (!loaded) return /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#0a0f1a",
      color: "#e2e8f0",
      height: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 28,
      fontWeight: 700,
      letterSpacing: "-0.02em"
    }
  }, "NutriTrack"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: "#64748b",
      marginTop: 6
    }
  }, "Loading\u2026")));
  // ── STYLES ────────────────────────────────────────────────────────────
  var S = {
    app: {
      background: "#0a0f1a",
      color: "#e2e8f0",
      minHeight: "100vh",
      fontFamily: "'DM Sans', system-ui, sans-serif",
      paddingBottom: 150,
      paddingTop: "env(safe-area-inset-top, 0px)"
    },
    header: {
      padding: "16px 20px 8px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
    },
    section: {
      padding: "0 20px"
    },
    card: {
      background: "#111827",
      borderRadius: 14,
      padding: 16,
      marginBottom: 10,
      border: "1px solid #1e293b"
    },
    macroGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(5, 1fr)",
      gap: 6,
      padding: "12px 20px"
    },
    macroItem: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 4,
      cursor: "pointer"
    },
    macroLabel: {
      fontSize: 10,
      color: "#94a3b8",
      fontWeight: 500
    },
    macroVal: {
      fontSize: 11,
      fontWeight: 700,
      color: "#e2e8f0"
    },
    mealHdr: {
      fontSize: 13,
      fontWeight: 700,
      color: "#94a3b8",
      textTransform: "uppercase",
      letterSpacing: "0.05em"
    },
    entry: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "10px 12px",
      borderBottom: "1px solid #1e293b"
    },
    entryName: {
      fontSize: 14,
      fontWeight: 500,
      color: "#e2e8f0"
    },
    entryDet: {
      fontSize: 12,
      color: "#64748b"
    },
    entryCal: {
      fontSize: 13,
      fontWeight: 600,
      color: "#f59e0b"
    },
    delBtn: {
      background: "none",
      border: "none",
      color: "#ef4444",
      fontSize: 16,
      cursor: "pointer",
      padding: "4px 8px"
    },
    fab: {
      position: "fixed",
      bottom: "calc(88px + env(safe-area-inset-bottom, 0px))",
      right: "calc(20px + env(safe-area-inset-right, 0px))",
      width: 52,
      height: 52,
      borderRadius: 16,
      background: "#3b82f6",
      border: "none",
      color: "#fff",
      fontSize: 28,
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: "0 4px 20px rgba(59,130,246,0.4)",
      zIndex: 100
    },
    nav: {
      position: "fixed",
      bottom: 0,
      left: 0,
      right: 0,
      background: "#111827",
      borderTop: "1px solid #1e293b",
      display: "flex",
      justifyContent: "space-around",
      padding: "8px 0",
      paddingBottom: "calc(8px + env(safe-area-inset-bottom, 0px))",
      zIndex: 100
    },
    navBtn: function navBtn(a) {
      return {
        background: "none",
        border: "none",
        color: a ? "#3b82f6" : "#64748b",
        fontSize: 11,
        fontWeight: 600,
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
        padding: "4px 10px"
      };
    },
    input: {
      width: "100%",
      background: "#1e293b",
      border: "1px solid #334155",
      borderRadius: 10,
      padding: "12px 14px",
      color: "#e2e8f0",
      fontSize: 15,
      outline: "none",
      boxSizing: "border-box"
    },
    srchItem: {
      padding: "12px 0",
      borderBottom: "1px solid #1e293b",
      cursor: "pointer"
    },
    pill: function pill(a) {
      return {
        padding: "6px 14px",
        borderRadius: 20,
        border: a ? "1px solid #3b82f6" : "1px solid #334155",
        background: a ? "#1d4ed8" : "transparent",
        color: a ? "#fff" : "#94a3b8",
        fontSize: 13,
        cursor: "pointer"
      };
    },
    microRow: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "6px 0",
      cursor: "pointer"
    },
    microBar: {
      height: 4,
      borderRadius: 2,
      background: "#1e293b",
      flex: 1,
      margin: "0 8px",
      position: "relative",
      overflow: "hidden"
    },
    label: {
      fontSize: 12,
      color: "#94a3b8",
      fontWeight: 600,
      display: "block",
      marginBottom: 6
    },
    cfRow: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "8px 0",
      borderBottom: "1px solid #1e293b"
    },
    modePicker: {
      display: "flex",
      background: "#0a0f1a",
      borderRadius: 10,
      padding: 4,
      marginBottom: 16
    },
    modeTab: function modeTab(a) {
      return {
        flex: 1,
        padding: "8px 0",
        borderRadius: 8,
        border: "none",
        cursor: "pointer",
        fontSize: 13,
        fontWeight: 600,
        background: a ? "#1d4ed8" : "transparent",
        color: a ? "#fff" : "#64748b"
      };
    },
    suppRow: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "10px 0",
      borderBottom: "1px solid #1e293b"
    }
  };
  var RECIPE_VIEWS = ["recipes", "recipeCreate", "recipeIngAdd", "recipeDetail", "recipeLog", "recipeLogReview"];

  // ── DISPLAY HELPERS ───────────────────────────────────────────────────
  // W0: 1 dp for all non-cal nutrient values; null → "–" (no crash)
  var n1 = function n1(v) {
    return v == null ? "–" : Number(v).toFixed(1);
  };
  // W4: energy formatting — kcal stays integer (Math.round), kJ uses toFixed(1)
  var energyLabel = energyUnit === "kJ" ? "kJ" : "kcal";
  var fmtE = function fmtE(kcal) {
    return energyUnit === "kJ" ? (kcal * 4.184).toFixed(1) : String(Math.round(kcal));
  };
  var BottomNav = function BottomNav() {
    return /*#__PURE__*/React.createElement("div", {
      style: S.nav
    }, /*#__PURE__*/React.createElement("button", {
      style: S.navBtn(view === "log"),
      onClick: function onClick() {
        return setView("log");
      }
    }, "     ", /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 18
      }
    }, "\uD83D\uDCCB"), "Log     "), /*#__PURE__*/React.createElement("button", {
      style: S.navBtn(view === "goals"),
      onClick: function onClick() {
        return setView("goals");
      }
    }, "   ", /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 18
      }
    }, "\uD83C\uDFAF"), "Goals   "), /*#__PURE__*/React.createElement("button", {
      style: S.navBtn(RECIPE_VIEWS.includes(view)),
      onClick: function onClick() {
        return setView("recipes");
      }
    }, " ", /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 18
      }
    }, "\uD83D\uDCD6"), "Recipes "), /*#__PURE__*/React.createElement("button", {
      style: S.navBtn(view === "settings"),
      onClick: function onClick() {
        return setView("settings");
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 18
      }
    }, "\u2699\uFE0F"), "Settings"));
  };

  // Helper: supplement contribution to one nutrient key for detail views
  var suppContrib = function suppContrib(entry, k) {
    return (entry.items || []).reduce(function (s, item) {
      var _k;
      return s + ((_k = (item.nutrients || {})[k]) !== null && _k !== void 0 ? _k : 0);
    }, 0);
  };
  var recipeSubtotal = function recipeSubtotal(e, field) {
    return (e.derivedIngredients || []).reduce(function (s, ing) {
      if (ing.snapshot && ing.snapshot[field] !== undefined) return s + (ing.snapshot[field] || 0) * ing.amount_g / 100;
      var f = allFoodsForRender.find(function (x) {
        return x.id === ing.foodId;
      });
      return s + (f ? (f[field] || 0) * ing.amount_g / 100 : 0);
    }, 0);
  };
  var globalBanners = ReactDOM.createPortal(/*#__PURE__*/React.createElement(React.Fragment, null, swUpdateReady && /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#1e3a5f",
      borderBottom: "1px solid #3b82f6",
      padding: "10px 14px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: 8,
      flexShrink: 0,
      zIndex: 200
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: "#93c5fd",
      lineHeight: 1.5,
      flex: 1
    }
  }, "Update available \u2014 close and reopen the app to update."), /*#__PURE__*/React.createElement("button", {
    style: {
      background: "#3b82f6",
      border: "none",
      borderRadius: 8,
      color: "#fff",
      fontSize: 12,
      fontWeight: 700,
      cursor: "pointer",
      padding: "6px 12px",
      flexShrink: 0
    },
    onClick: function onClick() {
      // Phase 9 (R4/R10) — apply the SW update with a graceful
      // fallback. Ask the waiting SW to skip waiting; if the new
      // controller never takes over (activation failure / no waiting
      // worker / SW disabled), fall back to a hard reload so the
      // banner never strands the user on a stale build.
      var reg = swRegRef.current;
      var applyViaController = function applyViaController() {
        if (reg && reg.waiting) reg.waiting.postMessage({
          type: "SKIP_WAITING"
        });
      };
      if (!("serviceWorker" in navigator) || !navigator.serviceWorker.controller || !reg || !reg.waiting) {
        window.location.reload();
        return;
      }
      var reloaded = false;
      var fallback = setTimeout(function () {
        if (!reloaded) {
          reloaded = true;
          window.location.reload();
        }
      }, 4000);
      var _onControllerChange = function onControllerChange() {
        clearTimeout(fallback);
        navigator.serviceWorker.removeEventListener("controllerchange", _onControllerChange);
        if (!reloaded) {
          reloaded = true;
          window.location.reload();
        }
      };
      navigator.serviceWorker.addEventListener("controllerchange", _onControllerChange);
      applyViaController();
    }
  }, "OK")), !isOnline && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      background: "#1a1a2e",
      borderBottom: "1px solid #475569",
      padding: "10px 14px",
      paddingTop: "calc(10px + env(safe-area-inset-top, 0px))",
      fontSize: 12,
      color: "#94a3b8",
      zIndex: 200,
      boxShadow: "0 2px 8px rgba(0,0,0,0.3)"
    }
  }, "Offline \u2014 Notion sync unavailable."), /*#__PURE__*/React.createElement("div", {
    style: {
      height: "calc(40px + env(safe-area-inset-top, 0px))",
      flexShrink: 0
    }
  }))), document.body);
  // ── LOG VIEW ──────────────────────────────────────────────────────────
  if (view === "log") {
    var grouped = {};
    MEALS.forEach(function (m) {
      return grouped[m] = [];
    });
    dayLog.forEach(function (e) {
      if (e.type === "exercise" || e.type === "supplement" || e.type === "water" || e.type === "alcohol") return;
      if (!grouped[e.meal]) grouped[e.meal] = [];
      grouped[e.meal].push(e);
    });
    var suppEntries = dayLog.filter(function (e) {
      return e.type === "supplement";
    });
    var info = "ⓘ"; // ⓘ = circled-i info glyph, used by traffic-light info buttons in this view
    // Phase 11: water total (ml) and alcohol total (g) computed from the food model (food.water/food.alc per 100g).
    // Note: water values are mostly null (unknown) except for explicit entries like "Water".
    var waterTotalMl = Math.round(dayLog.reduce(function (s, e) {
      var _allFoodsForRender$fi4;
      if (e.type === "exercise" || e.type == "supplement" || e.type == "water" || e.type == "alcohol") return s;
      if (e.type == "recipe") return s + (e.derivedIngredients || []).reduce(function (a, ing) {
        var _allFoodsForRender$fi3;
        var m = ing.amount_g / 100;
        var v = ing.snapshot ? ing.snapshot.water : (_allFoodsForRender$fi3 = allFoodsForRender.find(function (f) {
          return f.id === ing.foodId;
        })) === null || _allFoodsForRender$fi3 === void 0 ? void 0 : _allFoodsForRender$fi3.water;
        return a + (typeof v == "number" ? v : 0) * m;
      }, 0);
      var m = (e.amount || 0) / 100;
      var v = e.snapshot ? e.snapshot.water : (_allFoodsForRender$fi4 = allFoodsForRender.find(function (f) {
        return f.id === e.foodId;
      })) === null || _allFoodsForRender$fi4 === void 0 ? void 0 : _allFoodsForRender$fi4.water;
      return s + (typeof v == "number" ? v : 0) * m;
    }, 0));
    var alcTotalG = Math.round((totals.alc || 0) * 10) / 10;
    return /*#__PURE__*/React.createElement("div", {
      style: S.app
    }, globalBanners, validationWarning && !validationDismissed && /*#__PURE__*/React.createElement("div", {
      style: {
        background: "#1c1000",
        border: "1px solid #92400e",
        padding: "10px 14px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        gap: 8,
        flexShrink: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: "#fbbf24",
        lineHeight: 1.5,
        flex: 1
      }
    }, "\u26A0\uFE0F Some data didn't load as expected. We recommend exporting your current data before continuing \u2014 open Settings \u2192 Export Data."), /*#__PURE__*/React.createElement("button", {
      style: {
        background: "none",
        border: "none",
        color: "#92400e",
        fontSize: 18,
        cursor: "pointer",
        padding: "0 2px",
        lineHeight: 1,
        flexShrink: 0
      },
      onClick: function onClick() {
        return setValidationDismissed(true);
      }
    }, "\xD7")), /*#__PURE__*/React.createElement("div", {
      style: S.header
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 12
      }
    }, /*#__PURE__*/React.createElement("button", {
      style: {
        background: "none",
        border: "none",
        color: "#94a3b8",
        fontSize: 24,
        minWidth: 44,
        minHeight: 44,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "4px 10px",
        cursor: "pointer"
      },
      onClick: function onClick() {
        return changeDate(-1);
      }
    }, "\u2039"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 15,
        fontWeight: 600,
        color: "#e2e8f0",
        letterSpacing: "-0.01em"
      }
    }, formatDate(currentDate), currentDate === today() && /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 10,
        color: "#3b82f6",
        fontWeight: 600,
        marginLeft: 6
      }
    }, "TODAY")), /*#__PURE__*/React.createElement("button", {
      style: {
        background: "none",
        border: "none",
        color: "#94a3b8",
        fontSize: 24,
        minWidth: 44,
        minHeight: 44,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "4px 10px",
        cursor: "pointer"
      },
      onClick: function onClick() {
        return changeDate(1);
      }
    }, "\u203A"))), /*#__PURE__*/React.createElement("div", {
      style: S.macroGrid
    }, MACROS.map(function (k) {
      var arc = nullData.arcByKey[k] || 0;
      var hasNull = !!nullData.foodsByKey[k];
      return /*#__PURE__*/React.createElement("div", {
        key: k,
        style: S.macroItem,
        onClick: function onClick() {
          if (hasNull) {
            setNullPanelKey(nullPanelKey === k ? null : k);
          } else {
            handleMacroTap(k);
          }
        }
      }, /*#__PURE__*/React.createElement(Ring, {
        value: totals[k],
        max: effectiveGoals[k],
        color: NUTRIENT_META[k].color,
        size: 48,
        stroke: 4,
        nullArc: arc,
        simplified: displayMode === "simplified"
      }, /*#__PURE__*/React.createElement("text", {
        x: "50%",
        y: "50%",
        textAnchor: "middle",
        dy: "0.35em",
        fill: trafficColor(pct(k)),
        fontSize: 10,
        fontWeight: 700
      }, pct(k), "%")), /*#__PURE__*/React.createElement("div", {
        style: S.macroLabel
      }, NUTRIENT_META[k].label, hasNull && /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 9,
          marginLeft: 2,
          color: "#94a3b8"
        }
      }, "?")), /*#__PURE__*/React.createElement("div", {
        style: S.macroVal
      }, k === "cal" ? fmtE(totals[k]) : n1(totals[k]), /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 9,
          color: "#64748b"
        }
      }, k === "cal" ? energyLabel : NUTRIENT_META[k].unit)));
    })), nullPanelKey && MACROS.includes(nullPanelKey) && /*#__PURE__*/React.createElement("div", {
      style: {
        margin: "0 16px 4px",
        background: "#0f1a2e",
        border: "1px solid #1d4ed8",
        borderRadius: 10,
        padding: "10px 14px",
        fontSize: 12,
        color: "#93c5fd",
        lineHeight: 1.5
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontWeight: 700,
        marginBottom: 4
      }
    }, NUTRIENT_META[nullPanelKey].label, " may be higher than shown."), /*#__PURE__*/React.createElement("div", {
      style: {
        color: "#7dd3fc",
        marginBottom: 6
      }
    }, (nullData.foodsByKey[nullPanelKey] || []).length, " food", (nullData.foodsByKey[nullPanelKey] || []).length === 1 ? "" : "s", " had no data: ", (nullData.foodsByKey[nullPanelKey] || []).join(", "), "."), /*#__PURE__*/React.createElement("div", {
      style: {
        color: "#475569",
        marginBottom: 6
      }
    }, "The grey arc shows an estimate based on typical values."), /*#__PURE__*/React.createElement("button", {
      style: {
        background: "none",
        border: "none",
        color: "#60a5fa",
        fontSize: 12,
        cursor: "pointer",
        padding: 0,
        textDecoration: "underline"
      },
      onClick: function onClick(e) {
        e.stopPropagation();
        setNullPanelKey(null);
        handleMacroTap(nullPanelKey);
      }
    }, "View full detail \u2192")), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "8px 20px 0"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 8,
        flex: 1,
        background: "#08151f",
        border: "1px solid #0c4a6e",
        borderRadius: 10,
        padding: "8px 12px"
      }
    }, /*#__PURE__*/React.createElement(Ring, {
      value: waterTotalMl,
      max: effectiveGoals.water || 2500,
      color: NUTRIENT_META.water.color,
      size: 36,
      stroke: 4
    }, /*#__PURE__*/React.createElement("text", {
      x: "50%",
      y: "50%",
      textAnchor: "middle",
      dy: "0.35em",
      fill: NUTRIENT_META.water.color,
      fontSize: 9,
      fontWeight: 700
    }, Math.min(999, Math.round(waterTotalMl / (effectiveGoals.water || 2500) * 100)), "%")), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        fontWeight: 700,
        color: "#7dd3fc",
        textTransform: "uppercase",
        letterSpacing: "0.05em"
      }
    }, "\uD83D\uDCA7 Water"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: "#e2e8f0",
        fontWeight: 600
      }
    }, fmtE(waterTotalMl), " ", /*#__PURE__*/React.createElement("span", {
      style: {
        color: "#64748b",
        fontWeight: 400
      }
    }, "ml"), " ", /*#__PURE__*/React.createElement("span", {
      style: {
        color: "#475569"
      }
    }, "/ ", fmtE(effectiveGoals.water || 2500), " ml")))), alcTotalG > 0 && /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 8,
        background: "#1f1208",
        border: "1px solid #92400e",
        borderRadius: 10,
        padding: "8px 12px"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        fontWeight: 700,
        color: "#fcd34d",
        textTransform: "uppercase",
        letterSpacing: "0.05em"
      }
    }, "\uD83C\uDF7E Alcohol"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: "#fbbf24",
        fontWeight: 600
      }
    }, n1(alcTotalG), " ", /*#__PURE__*/React.createElement("span", {
      style: {
        color: "#64748b",
        fontWeight: 400
      }
    }, "g"), " ", /*#__PURE__*/React.createElement("span", {
      style: {
        color: "#f59e0b"
      }
    }, "\xB7 ", fmtE(Math.round(alcTotalG * 7 * 10) / 10), " ", energyLabel))))), exerciseBurn > 0 && /*#__PURE__*/React.createElement("div", {
      style: {
        margin: "0 20px 8px",
        background: "#0f2d1a",
        border: "1px solid #16a34a",
        borderRadius: 10,
        padding: "8px 14px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 13,
        color: "#4ade80"
      }
    }, "\uD83C\uDFC3 ", fmtE(exerciseBurn), " ", energyLabel, " burned today"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 11,
        color: "#166534"
      }
    }, "goals adjusted")), /*#__PURE__*/React.createElement("div", {
      style: S.section
    }, /*#__PURE__*/React.createElement("div", {
      style: S.card
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 8
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        fontWeight: 700,
        color: "#94a3b8",
        letterSpacing: "0.05em",
        textTransform: "uppercase"
      }
    }, "Micronutrients"), /*#__PURE__*/React.createElement("button", {
      style: {
        background: "none",
        border: "none",
        color: "#64748b",
        fontSize: 16,
        cursor: "pointer",
        padding: "0 4px",
        lineHeight: 1
      },
      onClick: function onClick() {
        return setTrafficInfoKey(trafficInfoKey === "__info" ? null : "__info");
      }
    }, info)), trafficInfoKey === "__info" && /*#__PURE__*/React.createElement("div", {
      style: {
        margin: "0 0 10px",
        background: "#0a0f1a",
        border: "1px solid #334155",
        borderRadius: 8,
        padding: "10px 12px",
        fontSize: 11,
        color: "#94a3b8",
        lineHeight: 1.6
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 10,
        alignItems: "center",
        marginBottom: 4
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: TRAFFIC_COLORS.green,
        fontWeight: 700
      }
    }, "Green"), /*#__PURE__*/React.createElement("span", null, "< 100% target"), /*#__PURE__*/React.createElement("span", {
      style: {
        color: TRAFFIC_COLORS.yellow,
        fontWeight: 700,
        marginLeft: 8
      }
    }, "Yellow"), /*#__PURE__*/React.createElement("span", null, "100\u2013120%"), /*#__PURE__*/React.createElement("span", {
      style: {
        color: TRAFFIC_COLORS.red,
        fontWeight: 700,
        marginLeft: 8
      }
    }, "Red"), /*#__PURE__*/React.createElement("span", null, "> 120%")), /*#__PURE__*/React.createElement("div", {
      style: {
        color: "#64748b"
      }
    }, "Tap any nutrient name for detail. Tap ", info, " on a row for why exceeding the limit matters."), /*#__PURE__*/React.createElement("button", {
      style: {
        background: "none",
        border: "none",
        color: "#60a5fa",
        fontSize: 11,
        cursor: "pointer",
        padding: "4px 0 0",
        textDecoration: "underline"
      },
      onClick: function onClick(e) {
        e.stopPropagation();
        setTrafficInfoKey(null);
      }
    }, "Close")), MICROS.map(function (k) {
      var p = pct(k),
        meta = NUTRIENT_META[k],
        hasNull = !!nullData.foodsByKey[k];
      var arc = nullData.arcByKey[k] || 0;
      var confirmedPct = Math.min(p, 100);
      var nullWidth = Math.min(arc * 100, 100 - confirmedPct);
      return /*#__PURE__*/React.createElement("div", {
        key: k
      }, /*#__PURE__*/React.createElement("div", {
        style: S.microRow,
        onClick: function onClick() {
          if (hasNull) {
            setNullPanelKey(nullPanelKey === k ? null : k);
          } else {
            setDetailNutrient(k);
            setView("detail");
          }
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 12,
          color: "#e2e8f0",
          width: 80,
          fontWeight: 500
        }
      }, meta.label), /*#__PURE__*/React.createElement("button", {
        style: {
          background: "none",
          border: "none",
          color: trafficInfoKey === k ? "#60a5fa" : "#475569",
          fontSize: 13,
          cursor: "pointer",
          padding: "0 6px 0 0",
          lineHeight: 1,
          flexShrink: 0
        },
        onClick: function onClick(e) {
          e.stopPropagation();
          setTrafficInfoKey(trafficInfoKey === k ? null : k);
        }
      }, info), /*#__PURE__*/React.createElement("div", {
        style: S.microBar
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          position: "absolute",
          left: 0,
          top: 0,
          height: "100%",
          width: "".concat(confirmedPct, "%"),
          background: trafficColor(p),
          borderRadius: 2,
          transition: "width 0.5s ease"
        }
      }), hasNull && displayMode === "advanced" && nullWidth > 0 && /*#__PURE__*/React.createElement("div", {
        style: {
          position: "absolute",
          left: "".concat(confirmedPct, "%"),
          top: 0,
          height: "100%",
          width: "".concat(nullWidth, "%"),
          background: "repeating-linear-gradient(90deg,#475569 0px,#475569 3px,transparent 3px,transparent 6px)",
          borderRadius: 2,
          opacity: 0.7
        }
      })), /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 11,
          color: trafficColor(p),
          width: 32,
          textAlign: "right"
        }
      }, p, "%"), hasNull && /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 11,
          color: "#64748b",
          marginLeft: 2
        }
      }, "?")), hasNull && nullPanelKey === k && /*#__PURE__*/React.createElement("div", {
        style: {
          background: "#0f1a2e",
          border: "1px solid #1d4ed8",
          borderRadius: 8,
          padding: "8px 10px",
          margin: "2px 0 6px",
          fontSize: 12,
          color: "#93c5fd",
          lineHeight: 1.5
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontWeight: 700,
          marginBottom: 4
        }
      }, meta.label, " may be higher than shown."), /*#__PURE__*/React.createElement("div", {
        style: {
          color: "#7dd3fc",
          marginBottom: 4
        }
      }, nullData.foodsByKey[k].length, " food", nullData.foodsByKey[k].length === 1 ? "" : "s", " had no data: ", nullData.foodsByKey[k].join(", "), "."), displayMode === "advanced" && /*#__PURE__*/React.createElement("div", {
        style: {
          color: "#475569",
          marginBottom: 4
        }
      }, "The grey segment shows an estimate based on typical values."), /*#__PURE__*/React.createElement("button", {
        style: {
          background: "none",
          border: "none",
          color: "#60a5fa",
          fontSize: 12,
          cursor: "pointer",
          padding: 0,
          textDecoration: "underline"
        },
        onClick: function onClick(e) {
          e.stopPropagation();
          setNullPanelKey(null);
          setDetailNutrient(k);
          setView("detail");
        }
      }, "View full detail \u2192")), trafficInfoKey === k && /*#__PURE__*/React.createElement("div", {
        style: {
          background: "#0a0f1a",
          border: "1px solid #334155",
          borderRadius: 8,
          padding: "8px 10px",
          margin: "2px 0 6px",
          fontSize: 11,
          color: "#94a3b8",
          lineHeight: 1.5
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontWeight: 700,
          marginBottom: 4,
          color: "#cbd5e1"
        }
      }, meta.label, " \xB7 ", trafficLevel(p)), /*#__PURE__*/React.createElement("div", {
        style: {
          color: "#64748b"
        }
      }, NUTRIENT_EXPLANATIONS[k] || "No info available."), /*#__PURE__*/React.createElement("button", {
        style: {
          background: "none",
          border: "none",
          color: "#60a5fa",
          fontSize: 11,
          cursor: "pointer",
          padding: "4px 0 0",
          textDecoration: "underline"
        },
        onClick: function onClick(e) {
          e.stopPropagation();
          setTrafficInfoKey(null);
        }
      }, "Close")));
    }))), /*#__PURE__*/React.createElement("div", {
      style: _objectSpread(_objectSpread({}, S.section), {}, {
        paddingBottom: 240
      })
    }, MEALS.map(function (m) {
      var entries = grouped[m];
      if (!entries.length) return null;
      var mealCals = entries.reduce(function (sum, e) {
        var _e$snapshot$cal;
        if (e.type === "recipe") return sum + computeEntryNutrition(e.derivedIngredients || [], allFoodsForRender).cal;
        if (e.snapshot) return sum + ((_e$snapshot$cal = e.snapshot.cal) !== null && _e$snapshot$cal !== void 0 ? _e$snapshot$cal : 0) * e.amount / 100;
        var f = allFoodsForRender.find(function (x) {
          return x.id === e.foodId;
        });
        return sum + (f ? f.cal * e.amount / 100 : 0);
      }, 0);
      return /*#__PURE__*/React.createElement("div", {
        key: m
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          margin: "12px 0 4px"
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: S.mealHdr
      }, m), /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 12,
          color: "#f59e0b",
          fontWeight: 600
        }
      }, fmtE(mealCals), " ", energyLabel)), entries.map(function (e) {
        var _e$snapshot$cal2;
        if (e.type === "recipe") {
          var nut = computeEntryNutrition(e.derivedIngredients || [], allFoodsForRender);
          return /*#__PURE__*/React.createElement(SwipeableEntry, {
            key: e.id,
            onDelete: function onDelete() {
              return removeEntry(e.id);
            }
          }, /*#__PURE__*/React.createElement("div", {
            style: S.entry,
            onClick: function onClick() {
              return openEditRecipeEntry(e);
            }
          }, /*#__PURE__*/React.createElement("div", {
            style: {
              flex: 1
            }
          }, /*#__PURE__*/React.createElement("div", {
            style: _objectSpread(_objectSpread({}, S.entryName), {}, {
              color: "#a78bfa"
            })
          }, "\uD83D\uDCD6 ", e.recipeName), /*#__PURE__*/React.createElement("div", {
            style: S.entryDet
          }, e.servings, " ", e.servings === 1 ? "serving" : "servings", " \xB7 tap to edit")), /*#__PURE__*/React.createElement("div", {
            style: {
              display: "flex",
              alignItems: "center"
            }
          }, /*#__PURE__*/React.createElement("span", {
            style: S.entryCal
          }, fmtE(nut.cal), " ", energyLabel), /*#__PURE__*/React.createElement("button", {
            style: S.delBtn,
            onClick: function onClick(ev) {
              ev.stopPropagation();
              removeEntry(e.id);
            }
          }, "\xD7"))));
        }
        var f = allFoodsForRender.find(function (x) {
          return x.id === e.foodId;
        });
        return /*#__PURE__*/React.createElement(SwipeableEntry, {
          key: e.id,
          onDelete: function onDelete() {
            return removeEntry(e.id);
          }
        }, /*#__PURE__*/React.createElement("div", {
          style: S.entry
        }, /*#__PURE__*/React.createElement("div", {
          style: {
            flex: 1,
            cursor: "pointer"
          },
          onClick: function onClick() {
            return startEditEntry(e);
          }
        }, /*#__PURE__*/React.createElement("div", {
          style: S.entryName
        }, e.foodName), /*#__PURE__*/React.createElement("div", {
          style: S.entryDet
        }, e.amount, "g \xB7 tap to edit")), /*#__PURE__*/React.createElement("div", {
          style: {
            display: "flex",
            alignItems: "center"
          }
        }, /*#__PURE__*/React.createElement("span", {
          style: S.entryCal
        }, e.snapshot ? fmtE(((_e$snapshot$cal2 = e.snapshot.cal) !== null && _e$snapshot$cal2 !== void 0 ? _e$snapshot$cal2 : 0) * e.amount / 100) : f ? fmtE(f.cal * e.amount / 100) : "-", " ", e.snapshot || f ? energyLabel : ""), /*#__PURE__*/React.createElement("button", {
          style: S.delBtn,
          onClick: function onClick() {
            return removeEntry(e.id);
          }
        }, "\xD7"))));
      }));
    }), dayLog.filter(function (e) {
      return e.type !== "exercise" && e.type !== "supplement" && e.type !== "water" && e.type !== "alcohol";
    }).length === 0 && !suppEntries.length && /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: "center",
        padding: "40px 0",
        color: "#475569"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 32,
        marginBottom: 8
      }
    }, "\uD83E\uDD57"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 14
      }
    }, "No food logged today"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: "#64748b"
      }
    }, "Tap + to add your first meal")), suppEntries.length > 0 && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        margin: "12px 0 4px"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: S.mealHdr
    }, "Supplements")), suppEntries.map(function (e) {
      return /*#__PURE__*/React.createElement(SwipeableEntry, {
        key: e.id,
        onDelete: function onDelete() {
          return removeEntry(e.id);
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: _objectSpread(_objectSpread({}, S.entry), {}, {
          background: "#0f0a1e"
        }),
        onClick: function onClick() {
          return openEditSuppEntry(e);
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          flex: 1
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 14,
          fontWeight: 500,
          color: "#c4b5fd"
        }
      }, "\uD83D\uDC8A ", e.stackName), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 12,
          color: "#64748b"
        }
      }, suppItemSummary(e.items), " \xB7 tap to edit")), /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          alignItems: "center"
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 12,
          color: "#64748b",
          marginRight: 4
        }
      }, new Date(e.time).toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit"
      })), /*#__PURE__*/React.createElement("button", {
        style: S.delBtn,
        onClick: function onClick(ev) {
          ev.stopPropagation();
          removeEntry(e.id);
        }
      }, "\xD7"))));
    })), dayLog.filter(function (e) {
      return e.type === "exercise";
    }).length > 0 && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        margin: "12px 0 4px"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: S.mealHdr
    }, "Exercise"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12,
        color: "#4ade80",
        fontWeight: 600
      }
    }, "\u2212", fmtE(exerciseBurn), " ", energyLabel)), dayLog.filter(function (e) {
      return e.type === "exercise";
    }).map(function (e) {
      return /*#__PURE__*/React.createElement(SwipeableEntry, {
        key: e.id,
        onDelete: function onDelete() {
          return removeEntry(e.id);
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: _objectSpread(_objectSpread({}, S.entry), {}, {
          background: "#0a0f1a"
        }),
        onClick: function onClick() {
          return openEditExerciseEntry(e);
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          flex: 1
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 14,
          fontWeight: 500,
          color: "#4ade80"
        }
      }, e.activity), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 12,
          color: "#64748b"
        }
      }, e.duration_min, " min \xB7 tap to edit")), /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          alignItems: "center"
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 13,
          fontWeight: 600,
          color: "#4ade80"
        }
      }, "\u2212", fmtE(e.calories_burned), " ", energyLabel), /*#__PURE__*/React.createElement("button", {
        style: S.delBtn,
        onClick: function onClick(ev) {
          ev.stopPropagation();
          removeEntry(e.id);
        }
      }, "\xD7"))));
    }))), /*#__PURE__*/React.createElement("button", {
      style: S.fab,
      onClick: function onClick() {
        setEditingEntryId(null);
        setAddMode("food");
        if (multiSelect) {
          setMultiSelect(false);
          setBatch([]);
        }
        setView("add");
        setTimeout(function () {
          var _searchRef$current;
          return (_searchRef$current = searchRef.current) === null || _searchRef$current === void 0 ? void 0 : _searchRef$current.focus();
        }, 100);
      }
    }, "+"), /*#__PURE__*/React.createElement("button", {
      style: _objectSpread(_objectSpread({}, S.fab), {}, {
        right: "calc(84px + env(safe-area-inset-right, 0px))",
        background: "#16a34a",
        fontSize: 22
      }),
      onClick: function onClick() {
        return setView("exercise");
      }
    }, "\uD83C\uDFC3"), /*#__PURE__*/React.createElement(BottomNav, null));
  }
  // ── ADD SCREEN (Food / Recipe / Supplement) ───────────────────────────
  if (view === "add") {
    var ModePicker = function ModePicker() {
      return /*#__PURE__*/React.createElement("div", {
        style: S.modePicker
      }, [["food", "🍎 Food"], ["recipe", "📖 Recipe"], ["supplement", "💊 Supps"]].map(function (_ref10) {
        var _ref11 = _slicedToArray(_ref10, 2),
          m = _ref11[0],
          label = _ref11[1];
        return /*#__PURE__*/React.createElement("button", {
          key: m,
          style: S.modeTab(addMode === m),
          onClick: function onClick() {
            setAddMode(m);
            setSelectedFood(null);
            setSearchTerm("");
          }
        }, label);
      }));
    };
    if (addMode === "food") {
      return /*#__PURE__*/React.createElement("div", {
        style: S.app
      }, /*#__PURE__*/React.createElement("div", {
        style: S.header
      }, /*#__PURE__*/React.createElement("button", {
        style: {
          background: "none",
          border: "none",
          color: "#94a3b8",
          fontSize: 15,
          cursor: "pointer"
        },
        onClick: function onClick() {
          setView("log");
          setSelectedFood(null);
          setSearchTerm("");
          setEditingEntryId(null);
          if (multiSelect) {
            setMultiSelect(false);
            setBatch([]);
          }
        }
      }, "\u2190 Back"), /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 15,
          fontWeight: 700
        }
      }, selectedFood ? editingEntryId ? "Edit Entry" : "Log Amount" : "Add Food"), !selectedFood ? /*#__PURE__*/React.createElement("button", {
        style: {
          background: "none",
          border: "none",
          color: "#3b82f6",
          fontSize: 13,
          cursor: "pointer",
          fontWeight: 600
        },
        onClick: function onClick() {
          resetCfForm();
          setView("customAdd");
        }
      }, "+ Custom") : /*#__PURE__*/React.createElement("div", {
        style: {
          width: 64
        }
      })), /*#__PURE__*/React.createElement("div", {
        style: S.section
      }, !selectedFood && /*#__PURE__*/React.createElement(ModePicker, null), !selectedFood ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("input", {
        ref: searchRef,
        style: S.input,
        placeholder: "Search foods\u2026",
        value: searchTerm,
        onChange: function onChange(e) {
          var v = e.target.value;
          setSearchTerm(v);
          clearTimeout(searchDebounceRef.current);
          searchDebounceRef.current = setTimeout(function () {
            return setDebouncedSearchTerm(v);
          }, 300);
        },
        autoFocus: true
      }), customFoods.length > 0 && /*#__PURE__*/React.createElement("div", {
        style: {
          textAlign: "right",
          marginTop: 4,
          marginBottom: 2
        }
      }, /*#__PURE__*/React.createElement("button", {
        style: {
          background: "none",
          border: "none",
          color: "#64748b",
          fontSize: 11,
          cursor: "pointer",
          textDecoration: "underline"
        },
        onClick: function onClick() {
          return setView("manageCustomFoods");
        }
      }, "Manage custom foods")), /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 8,
          marginTop: 8,
          marginBottom: 2
        }
      }, /*#__PURE__*/React.createElement("button", {
        style: {
          display: "flex",
          alignItems: "center",
          gap: 8,
          background: "none",
          border: "none",
          color: multiSelect ? "#3b82f6" : "#64748b",
          fontSize: 12,
          fontWeight: 600,
          cursor: "pointer",
          padding: 0
        },
        onClick: toggleMultiSelect
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          width: 34,
          height: 20,
          borderRadius: 10,
          background: multiSelect ? "#1d4ed8" : "#334155",
          position: "relative",
          transition: "background 0.15s",
          flexShrink: 0
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          position: "absolute",
          top: 2,
          left: multiSelect ? 16 : 2,
          width: 16,
          height: 16,
          borderRadius: 8,
          background: "#fff",
          transition: "left 0.15s"
        }
      })), "Multi-Select", multiSelect ? " ON" : ""), multiSelect && batch.length > 0 && /*#__PURE__*/React.createElement("button", {
        style: {
          background: "#16a34a",
          border: "none",
          borderRadius: 8,
          color: "#fff",
          fontSize: 12,
          fontWeight: 700,
          padding: "6px 12px",
          cursor: "pointer"
        },
        onClick: function onClick() {
          return setView("batchReview");
        }
      }, "Review batch (", batch.length, ") \u2192")), multiSelect && /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 11,
          color: "#64748b",
          marginBottom: 6
        }
      }, "Tap foods to add them to the batch. Quantities are entered on the review screen."), /*#__PURE__*/React.createElement("div", {
        style: {
          marginTop: 12,
          maxHeight: "calc(100vh - 220px)",
          overflowY: "auto"
        }
      }, foodDBStatus === "loading" && /*#__PURE__*/React.createElement("div", {
        style: {
          padding: "32px 0",
          textAlign: "center",
          color: "#64748b",
          fontSize: 13
        }
      }, "Loading food database\u2026"), foodDBStatus === "error" && /*#__PURE__*/React.createElement("div", {
        style: {
          padding: "24px 12px",
          textAlign: "center",
          color: "#ef4444",
          fontSize: 13
        }
      }, "The food database could not be loaded. Please reload the app."), foodDBStatus === "ready" && function () {
        // W1 — Recents section (only when search box is empty)
        var visibleRecents = debouncedSearchTerm.length === 0 ? recents.filter(function (r) {
          return allFoods.some(function (f) {
            return f.id === r.foodId;
          });
        }) : [];
        return visibleRecents.length > 0 ? /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
          style: {
            fontSize: 11,
            fontWeight: 700,
            color: "#475569",
            padding: "10px 0 4px",
            letterSpacing: "0.05em",
            textTransform: "uppercase"
          }
        }, "Recent"), visibleRecents.map(function (r) {
          var food = allFoods.find(function (f) {
            return f.id === r.foodId;
          });
          if (!food) return null;
          return /*#__PURE__*/React.createElement("div", {
            key: r.foodId,
            style: _objectSpread(_objectSpread({}, S.srchItem), {}, {
              display: "flex",
              alignItems: "center",
              gap: 8
            }),
            onClick: function onClick() {
              return multiSelect ? addFoodToBatch(food) : (setSelectedFood(food), setAmount(String(r.lastAmount)), setMeal(r.lastMeal || meal));
            }
          }, /*#__PURE__*/React.createElement("div", {
            style: {
              flex: 1,
              minWidth: 0
            }
          }, /*#__PURE__*/React.createElement("div", {
            style: {
              fontSize: 14,
              fontWeight: 500,
              color: "#e2e8f0",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap"
            }
          }, r.foodName), /*#__PURE__*/React.createElement("div", {
            style: {
              fontSize: 11,
              color: "#64748b"
            }
          }, r.lastAmount, "g \xB7 ", r.lastMeal)), !multiSelect && /*#__PURE__*/React.createElement("button", {
            style: {
              background: "#1d4ed8",
              border: "none",
              borderRadius: 8,
              color: "#fff",
              fontSize: 11,
              fontWeight: 700,
              padding: "6px 10px",
              cursor: "pointer",
              flexShrink: 0,
              whiteSpace: "nowrap"
            },
            onClick: function onClick(e) {
              e.stopPropagation();
              quickLogRecent(r);
            }
          }, "\u26A1 Log"));
        })) : null;
      }(), foodDBStatus === "ready" && function () {
        var mr = debouncedSearchTerm.length > 0 ? recipes.filter(function (r) {
          return r.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase());
        }) : recipes;
        if (!mr.length) return null;
        return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
          style: {
            fontSize: 11,
            fontWeight: 700,
            color: "#475569",
            padding: "10px 0 4px",
            letterSpacing: "0.05em",
            textTransform: "uppercase"
          }
        }, "Recipes"), mr.map(function (r) {
          var _n$cal;
          var n = r.nutrition_per_serving || {};
          return /*#__PURE__*/React.createElement("div", {
            key: r.id,
            style: _objectSpread(_objectSpread({}, S.srchItem), {}, {
              paddingBottom: 10
            }),
            onClick: function onClick() {
              setSelectedRecipe(r);
              setRecipeLogReturn("add");
              setRecipeLogServings("1");
              setRecipeLogGrams("");
              setRecipeLogMode("servings");
              setRecipeLogMeal(meal);
              setView("recipeLog");
            }
          }, /*#__PURE__*/React.createElement("span", {
            style: {
              fontSize: 12,
              color: "#a78bfa",
              "float": "right"
            }
          }, fmtE((_n$cal = n.cal) !== null && _n$cal !== void 0 ? _n$cal : 0), " ", energyLabel, "/srv"), /*#__PURE__*/React.createElement("div", {
            style: {
              fontSize: 14,
              fontWeight: 500,
              color: "#a78bfa"
            }
          }, "\uD83D\uDCD6 ", r.name), /*#__PURE__*/React.createElement("div", {
            style: {
              fontSize: 11,
              color: "#475569"
            }
          }, r.servings, " ", r.servings === 1 ? "serving" : "servings", " \xB7 ", r.ingredients.length, " ingredients"));
        }));
      }(), Object.entries(groupedByCategory).map(function (_ref12) {
        var _ref13 = _slicedToArray(_ref12, 2),
          cat = _ref13[0],
          foods = _ref13[1];
        return /*#__PURE__*/React.createElement("div", {
          key: cat
        }, /*#__PURE__*/React.createElement("div", {
          style: {
            fontSize: 11,
            fontWeight: 700,
            color: "#475569",
            padding: "10px 0 4px",
            letterSpacing: "0.05em",
            textTransform: "uppercase"
          }
        }, cat), foods.map(function (f) {
          var inBatch = multiSelect && batch.some(function (b) {
            return b.food.id === f.id;
          });
          return /*#__PURE__*/React.createElement("div", {
            key: f.id,
            style: _objectSpread(_objectSpread({}, S.srchItem), {}, {
              contentVisibility: "auto",
              containIntrinsicSize: "0 48px"
            }, multiSelect ? {
              display: "flex",
              alignItems: "center",
              gap: 8
            } : {}),
            onClick: function onClick() {
              return multiSelect ? addFoodToBatch(f) : setSelectedFood(f);
            }
          }, multiSelect && /*#__PURE__*/React.createElement("span", {
            style: {
              width: 20,
              height: 20,
              borderRadius: 6,
              border: "1px solid ".concat(inBatch ? "#16a34a" : "#334155"),
              background: inBatch ? "#16a34a" : "transparent",
              color: "#fff",
              fontSize: 13,
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0
            }
          }, inBatch ? "✓" : ""), /*#__PURE__*/React.createElement("div", {
            style: {
              flex: 1,
              minWidth: 0
            }
          }, /*#__PURE__*/React.createElement("span", {
            style: {
              fontSize: 12,
              color: "#f59e0b",
              "float": "right"
            }
          }, fmtE(f.cal), " ", energyLabel, "/100g"), /*#__PURE__*/React.createElement("div", {
            style: {
              fontSize: 14,
              fontWeight: 500,
              color: inBatch ? "#86efac" : "#e2e8f0"
            }
          }, f.name), f.source && f.source !== "usda" && /*#__PURE__*/React.createElement("div", {
            style: {
              fontSize: 11,
              color: "#475569",
              marginTop: 1
            }
          }, "Source: ", f.source.toUpperCase())));
        }));
      }), filteredFoods.length === 0 && recipes.filter(function (r) {
        return r.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase());
      }).length === 0 && debouncedSearchTerm.length > 0 && /*#__PURE__*/React.createElement("div", {
        style: {
          padding: 20,
          textAlign: "center",
          color: "#475569",
          fontSize: 14
        }
      }, "No results for \"", debouncedSearchTerm, "\""))) : /*#__PURE__*/React.createElement("div", {
        style: S.card
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 16,
          fontWeight: 700,
          marginBottom: 4
        }
      }, selectedFood.name), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 12,
          color: "#64748b",
          marginBottom: 16
        }
      }, selectedFood.cat), /*#__PURE__*/React.createElement("label", {
        style: S.label
      }, "Amount (g / ml)"), /*#__PURE__*/React.createElement("input", {
        style: S.input,
        type: "number",
        value: amount,
        onChange: function onChange(e) {
          setAmount(e.target.value);
          setServingUnit(null);
        },
        inputMode: "numeric"
      }), selectedFood.servings && selectedFood.servings.length > 0 && function () {
        var su = servingUnit;
        var qty = parseInt(servingQty, 10) || 1;
        return /*#__PURE__*/React.createElement("div", {
          style: {
            marginTop: 8,
            background: "#0f172a",
            borderRadius: 10,
            padding: "10px 12px",
            marginBottom: 4
          }
        }, /*#__PURE__*/React.createElement("div", {
          style: {
            fontSize: 11,
            color: "#64748b",
            marginBottom: 6
          }
        }, "Serving unit"), /*#__PURE__*/React.createElement("div", {
          style: {
            display: "flex",
            gap: 6,
            flexWrap: "wrap",
            marginBottom: su != null ? 10 : 0
          }
        }, selectedFood.servings.map(function (s, i) {
          return /*#__PURE__*/React.createElement("button", {
            key: s.label,
            style: S.pill(su === i),
            onClick: function onClick() {
              var newIdx = su === i ? null : i;
              setServingUnit(newIdx);
              if (newIdx != null) setAmount(String(Math.round((parseInt(servingQty, 10) || 1) * s.grams)));
            }
          }, s.label);
        })), su != null && /*#__PURE__*/React.createElement("div", {
          style: {
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginTop: 4
          }
        }, /*#__PURE__*/React.createElement("button", {
          style: {
            width: 34,
            height: 34,
            borderRadius: 8,
            border: "1px solid #334155",
            background: "#1e293b",
            color: "#e2e8f0",
            fontSize: 20,
            lineHeight: 1,
            cursor: "pointer",
            flexShrink: 0
          },
          onClick: function onClick() {
            var next = Math.max(1, qty - 1);
            setServingQty(String(next));
            setAmount(String(Math.round(next * selectedFood.servings[su].grams)));
          }
        }, "\u2212"), /*#__PURE__*/React.createElement("input", {
          type: "number",
          inputMode: "numeric",
          value: servingQty,
          onChange: function onChange(e) {
            setServingQty(e.target.value);
            var n = parseInt(e.target.value, 10);
            if (n > 0) setAmount(String(Math.round(n * selectedFood.servings[su].grams)));
          },
          style: _objectSpread(_objectSpread({}, S.input), {}, {
            width: 60,
            textAlign: "center",
            marginBottom: 0,
            padding: "6px 8px"
          })
        }), /*#__PURE__*/React.createElement("button", {
          style: {
            width: 34,
            height: 34,
            borderRadius: 8,
            border: "1px solid #334155",
            background: "#1e293b",
            color: "#e2e8f0",
            fontSize: 20,
            lineHeight: 1,
            cursor: "pointer",
            flexShrink: 0
          },
          onClick: function onClick() {
            var next = qty + 1;
            setServingQty(String(next));
            setAmount(String(Math.round(next * selectedFood.servings[su].grams)));
          }
        }, "+"), /*#__PURE__*/React.createElement("span", {
          style: {
            fontSize: 12,
            color: "#64748b",
            marginLeft: 2
          }
        }, "\xD7 ", selectedFood.servings[su].grams, "g = ", /*#__PURE__*/React.createElement("b", {
          style: {
            color: "#e2e8f0"
          }
        }, Math.round(qty * selectedFood.servings[su].grams), "g"))));
      }(), /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          gap: 6,
          marginTop: 8,
          flexWrap: "wrap",
          marginBottom: 16
        }
      }, [25, 50, 100, 150, 200, 250].map(function (q) {
        return /*#__PURE__*/React.createElement("button", {
          key: q,
          style: S.pill(amount === String(q) && servingUnit == null),
          onClick: function onClick() {
            setAmount(String(q));
            setServingUnit(null);
          }
        }, q);
      })), /*#__PURE__*/React.createElement("label", {
        style: S.label
      }, "Meal"), /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          gap: 6,
          flexWrap: "wrap",
          marginBottom: 12
        }
      }, MEALS.map(function (m) {
        return /*#__PURE__*/React.createElement("button", {
          key: m,
          style: S.pill(meal === m),
          onClick: function onClick() {
            return setMeal(m);
          }
        }, m);
      })), /*#__PURE__*/React.createElement("div", {
        style: {
          background: "#0a0f1a",
          borderRadius: 10,
          padding: 12,
          marginBottom: 16
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 11,
          fontWeight: 700,
          color: "#475569",
          marginBottom: 8,
          textTransform: "uppercase"
        }
      }, "Preview"), /*#__PURE__*/React.createElement("div", {
        style: {
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 8
        }
      }, ["cal", "pro", "carb", "fat", "fib", "alc"].map(function (k) {
        var _selectedFood$k;
        var val = ((_selectedFood$k = selectedFood[k]) !== null && _selectedFood$k !== void 0 ? _selectedFood$k : 0) * (parseFloat(amount) || 0) / 100;
        return /*#__PURE__*/React.createElement("div", {
          key: k,
          style: {
            textAlign: "center"
          }
        }, /*#__PURE__*/React.createElement("div", {
          style: {
            fontSize: 16,
            fontWeight: 700,
            color: NUTRIENT_META[k].color
          }
        }, k === "cal" ? fmtE(val) : n1(val)), /*#__PURE__*/React.createElement("div", {
          style: {
            fontSize: 10,
            color: "#64748b"
          }
        }, k === "cal" ? energyLabel : NUTRIENT_META[k].label));
      })), MICROS.some(function (k) {
        return selectedFood[k] != null;
      }) && /*#__PURE__*/React.createElement("div", {
        style: {
          marginTop: 10,
          borderTop: "1px solid #1e293b",
          paddingTop: 8
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 10,
          fontWeight: 700,
          color: "#475569",
          marginBottom: 6,
          textTransform: "uppercase"
        }
      }, "Micros"), /*#__PURE__*/React.createElement("div", {
        style: {
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "4px 12px"
        }
      }, MICROS.map(function (k) {
        var base = selectedFood[k];
        if (base == null) return null;
        var sv = base * (parseFloat(amount) || 0) / 100;
        return /*#__PURE__*/React.createElement("div", {
          key: k,
          style: {
            display: "flex",
            justifyContent: "space-between",
            fontSize: 11
          }
        }, /*#__PURE__*/React.createElement("span", {
          style: {
            color: "#94a3b8"
          }
        }, NUTRIENT_META[k].label), /*#__PURE__*/React.createElement("span", {
          style: {
            color: NUTRIENT_META[k].color,
            fontWeight: 600
          }
        }, n1(sv), /*#__PURE__*/React.createElement("span", {
          style: {
            color: "#64748b"
          }
        }, " ", NUTRIENT_META[k].unit)));
      })))), /*#__PURE__*/React.createElement("button", {
        style: {
          width: "100%",
          padding: 14,
          borderRadius: 12,
          border: "none",
          background: "#3b82f6",
          color: "#fff",
          fontSize: 15,
          fontWeight: 700,
          cursor: "pointer"
        },
        onClick: addEntry
      }, editingEntryId ? "Save Changes" : "Add to " + meal))));
    }
    if (addMode === "recipe") {
      return /*#__PURE__*/React.createElement("div", {
        style: S.app
      }, /*#__PURE__*/React.createElement("div", {
        style: S.header
      }, /*#__PURE__*/React.createElement("button", {
        style: {
          background: "none",
          border: "none",
          color: "#94a3b8",
          fontSize: 15,
          cursor: "pointer"
        },
        onClick: function onClick() {
          setView("log");
          setSearchTerm("");
        }
      }, "\u2190 Back"), /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 15,
          fontWeight: 700
        }
      }, "Log Recipe"), /*#__PURE__*/React.createElement("div", {
        style: {
          width: 64
        }
      })), /*#__PURE__*/React.createElement("div", {
        style: S.section
      }, /*#__PURE__*/React.createElement(ModePicker, null), !recipes.length ? /*#__PURE__*/React.createElement("div", {
        style: {
          textAlign: "center",
          padding: "40px 0",
          color: "#475569"
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 32,
          marginBottom: 8
        }
      }, "\uD83D\uDCD6"), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 14,
          color: "#64748b"
        }
      }, "No recipes yet"), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 12,
          marginTop: 4
        }
      }, "Go to Recipes tab to create one")) : /*#__PURE__*/React.createElement("div", null, recipes.map(function (r) {
        var _n$cal2;
        var n = r.nutrition_per_serving || {};
        return /*#__PURE__*/React.createElement("div", {
          key: r.id,
          style: _objectSpread(_objectSpread({}, S.card), {}, {
            cursor: "pointer",
            marginBottom: 8
          }),
          onClick: function onClick() {
            setSelectedRecipe(r);
            setRecipeLogReturn("add");
            setRecipeLogServings("1");
            setRecipeLogGrams("");
            setRecipeLogMode("servings");
            setRecipeLogMeal(meal);
            setView("recipeLog");
          }
        }, /*#__PURE__*/React.createElement("div", {
          style: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }
        }, /*#__PURE__*/React.createElement("div", {
          style: {
            flex: 1
          }
        }, /*#__PURE__*/React.createElement("div", {
          style: {
            fontSize: 15,
            fontWeight: 700,
            color: "#a78bfa",
            marginBottom: 2
          }
        }, "\uD83D\uDCD6 ", r.name), /*#__PURE__*/React.createElement("div", {
          style: {
            fontSize: 12,
            color: "#475569"
          }
        }, r.servings, " ", r.servings === 1 ? "serving" : "servings", " \xB7 ", r.ingredients.length, " ingredients")), /*#__PURE__*/React.createElement("div", {
          style: {
            textAlign: "right"
          }
        }, /*#__PURE__*/React.createElement("div", {
          style: {
            fontSize: 14,
            fontWeight: 700,
            color: NUTRIENT_META.cal.color
          }
        }, fmtE((_n$cal2 = n.cal) !== null && _n$cal2 !== void 0 ? _n$cal2 : 0)), /*#__PURE__*/React.createElement("div", {
          style: {
            fontSize: 10,
            color: "#64748b"
          }
        }, energyLabel, "/srv"))));
      }))));
    }
    if (addMode === "supplement") {
      return /*#__PURE__*/React.createElement("div", {
        style: S.app
      }, /*#__PURE__*/React.createElement("div", {
        style: S.header
      }, /*#__PURE__*/React.createElement("button", {
        style: {
          background: "none",
          border: "none",
          color: "#94a3b8",
          fontSize: 15,
          cursor: "pointer"
        },
        onClick: function onClick() {
          return setView("log");
        }
      }, "\u2190 Back"), /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 15,
          fontWeight: 700
        }
      }, "Log Supplement"), /*#__PURE__*/React.createElement("div", {
        style: {
          width: 64
        }
      })), /*#__PURE__*/React.createElement("div", {
        style: _objectSpread(_objectSpread({}, S.section), {}, {
          paddingBottom: 40
        })
      }, /*#__PURE__*/React.createElement(ModePicker, null), !supplementStacks.length ? /*#__PURE__*/React.createElement("div", {
        style: {
          textAlign: "center",
          padding: "30px 0",
          color: "#475569"
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 32,
          marginBottom: 8
        }
      }, "\uD83D\uDC8A"), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 14,
          color: "#64748b"
        }
      }, "No stacks set up yet"), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 12,
          marginTop: 4
        }
      }, "Go to Settings \u2192 Supplements to create one")) : /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 12,
          color: "#64748b",
          marginBottom: 10
        }
      }, "Tap a stack to log it"), supplementStacks.map(function (stack) {
        return /*#__PURE__*/React.createElement("div", {
          key: stack.id,
          style: _objectSpread(_objectSpread({}, S.card), {}, {
            cursor: "pointer",
            marginBottom: 8
          }),
          onClick: function onClick() {
            return openSuppLogConfirm(stack);
          }
        }, /*#__PURE__*/React.createElement("div", {
          style: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }
        }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
          style: {
            fontSize: 15,
            fontWeight: 700,
            color: "#c4b5fd"
          }
        }, "\uD83D\uDC8A ", stack.name), /*#__PURE__*/React.createElement("div", {
          style: {
            fontSize: 12,
            color: "#64748b",
            marginTop: 2
          }
        }, stack.items.length === 0 ? "No items" : "".concat(stack.items.length, " item").concat(stack.items.length === 1 ? "" : "s", ": ").concat(suppItemSummary(stack.items)))), /*#__PURE__*/React.createElement("div", {
          style: {
            color: "#475569",
            fontSize: 18,
            paddingLeft: 8
          }
        }, "\u203A")));
      })), /*#__PURE__*/React.createElement("div", {
        style: {
          marginTop: 16
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 13,
          fontWeight: 700,
          color: "#94a3b8",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          marginBottom: 10
        }
      }, "Log a one-off"), /*#__PURE__*/React.createElement("div", {
        style: S.card
      }, /*#__PURE__*/React.createElement("label", {
        style: S.label
      }, "Supplement name"), /*#__PURE__*/React.createElement("input", {
        style: _objectSpread(_objectSpread({}, S.input), {}, {
          marginBottom: 12
        }),
        placeholder: "e.g. Creatine",
        value: oneOffData.name,
        onChange: function onChange(e) {
          return setOneOffData(function (p) {
            return _objectSpread(_objectSpread({}, p), {}, {
              name: e.target.value
            });
          });
        }
      }), /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          gap: 8,
          marginBottom: 12
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          flex: 1
        }
      }, /*#__PURE__*/React.createElement("label", {
        style: S.label
      }, "Dose"), /*#__PURE__*/React.createElement("input", {
        style: S.input,
        type: "number",
        inputMode: "decimal",
        placeholder: "e.g. 5",
        value: oneOffData.dose_amount,
        onChange: function onChange(e) {
          return setOneOffData(function (p) {
            return _objectSpread(_objectSpread({}, p), {}, {
              dose_amount: e.target.value
            });
          });
        }
      })), /*#__PURE__*/React.createElement("div", {
        style: {
          width: 90
        }
      }, /*#__PURE__*/React.createElement("label", {
        style: S.label
      }, "Unit"), /*#__PURE__*/React.createElement("select", {
        style: _objectSpread(_objectSpread({}, S.input), {}, {
          padding: "11px 8px"
        }),
        value: oneOffData.dose_unit,
        onChange: function onChange(e) {
          return setOneOffData(function (p) {
            return _objectSpread(_objectSpread({}, p), {}, {
              dose_unit: e.target.value
            });
          });
        }
      }, SUPP_DOSE_UNITS.map(function (u) {
        return /*#__PURE__*/React.createElement("option", {
          key: u
        }, u);
      })))), Object.keys(oneOffData.nutrients).length > 0 && /*#__PURE__*/React.createElement("div", {
        style: {
          marginBottom: 12
        }
      }, Object.entries(oneOffData.nutrients).map(function (_ref14) {
        var _NUTRIENT_META$k, _NUTRIENT_META$k2;
        var _ref15 = _slicedToArray(_ref14, 2),
          k = _ref15[0],
          v = _ref15[1];
        return /*#__PURE__*/React.createElement("div", {
          key: k,
          style: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "4px 0",
            borderBottom: "1px solid #1e293b"
          }
        }, /*#__PURE__*/React.createElement("span", {
          style: {
            fontSize: 13,
            color: "#e2e8f0"
          }
        }, ((_NUTRIENT_META$k = NUTRIENT_META[k]) === null || _NUTRIENT_META$k === void 0 ? void 0 : _NUTRIENT_META$k.label) || k), /*#__PURE__*/React.createElement("div", {
          style: {
            display: "flex",
            alignItems: "center",
            gap: 8
          }
        }, /*#__PURE__*/React.createElement("span", {
          style: {
            fontSize: 13,
            color: "#a78bfa",
            fontWeight: 600
          }
        }, v, " ", ((_NUTRIENT_META$k2 = NUTRIENT_META[k]) === null || _NUTRIENT_META$k2 === void 0 ? void 0 : _NUTRIENT_META$k2.unit) || ""), /*#__PURE__*/React.createElement("button", {
          style: {
            background: "none",
            border: "none",
            color: "#ef4444",
            fontSize: 14,
            cursor: "pointer",
            padding: "0 4px"
          },
          onClick: function onClick() {
            return removeNutrientFromOneOff(k);
          }
        }, "\xD7")));
      })), /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          gap: 6,
          marginBottom: 12
        }
      }, /*#__PURE__*/React.createElement("select", {
        style: _objectSpread(_objectSpread({}, S.input), {}, {
          flex: 1,
          padding: "8px 10px",
          fontSize: 13
        }),
        value: oneOffNutKey,
        onChange: function onChange(e) {
          return setOneOffNutKey(e.target.value);
        }
      }, NUTRIENT_ALL_KEYS.map(function (k) {
        return /*#__PURE__*/React.createElement("option", {
          key: k,
          value: k
        }, NUTRIENT_META[k].label, " (", NUTRIENT_META[k].unit, ")");
      })), /*#__PURE__*/React.createElement("input", {
        style: _objectSpread(_objectSpread({}, S.input), {}, {
          width: 80,
          padding: "8px 10px",
          fontSize: 13
        }),
        type: "number",
        inputMode: "decimal",
        placeholder: "0",
        value: oneOffNutVal,
        onChange: function onChange(e) {
          return setOneOffNutVal(e.target.value);
        }
      }), /*#__PURE__*/React.createElement("button", {
        style: {
          background: "#1d4ed8",
          border: "none",
          color: "#fff",
          borderRadius: 10,
          padding: "8px 14px",
          fontSize: 13,
          fontWeight: 600,
          cursor: "pointer",
          whiteSpace: "nowrap"
        },
        onClick: addNutrientToOneOff
      }, "+ Add")), /*#__PURE__*/React.createElement("button", {
        style: {
          width: "100%",
          padding: 14,
          borderRadius: 12,
          border: "none",
          background: oneOffData.name.trim() ? "#7c3aed" : "#1e293b",
          color: oneOffData.name.trim() ? "#fff" : "#64748b",
          fontSize: 15,
          fontWeight: 700,
          cursor: oneOffData.name.trim() ? "pointer" : "default"
        },
        disabled: !oneOffData.name.trim(),
        onClick: logOneOff
      }, "Log one-off")))));
    }
  }

  // ── PHASE 6n: BATCH REVIEW (multi-select commit screen) ──────────────────
  if (view === "batchReview") {
    var totalCal = batch.reduce(function (sum, b) {
      var _b$food$cal;
      return sum + ((_b$food$cal = b.food.cal) !== null && _b$food$cal !== void 0 ? _b$food$cal : 0) * (parseFloat(b.amount) || 0) / 100;
    }, 0);
    return /*#__PURE__*/React.createElement("div", {
      style: S.app
    }, /*#__PURE__*/React.createElement("div", {
      style: S.header
    }, /*#__PURE__*/React.createElement("button", {
      style: {
        background: "none",
        border: "none",
        color: "#94a3b8",
        fontSize: 15,
        cursor: "pointer"
      },
      onClick: function onClick() {
        setBatch([]);
        setMultiSelect(false);
        setView("add");
        setTimeout(function () {
          var _searchRef$current2;
          return (_searchRef$current2 = searchRef.current) === null || _searchRef$current2 === void 0 ? void 0 : _searchRef$current2.focus();
        }, 100);
      }
    }, "\u2190 Back"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 15,
        fontWeight: 700
      }
    }, "Batch \xB7 ", batch.length, " ", batch.length === 1 ? "food" : "foods"), /*#__PURE__*/React.createElement("button", {
      style: {
        background: "none",
        border: "none",
        color: "#3b82f6",
        fontSize: 13,
        cursor: "pointer",
        fontWeight: 600
      },
      onClick: function onClick() {
        setBatch([]);
        setMultiSelect(false);
        setView("add");
        setTimeout(function () {
          var _searchRef$current3;
          return (_searchRef$current3 = searchRef.current) === null || _searchRef$current3 === void 0 ? void 0 : _searchRef$current3.focus();
        }, 100);
      }
    }, "+ Add")), /*#__PURE__*/React.createElement("div", {
      style: S.section
    }, batch.length === 0 ? /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "32px 0",
        textAlign: "center",
        color: "#64748b",
        fontSize: 14
      }
    }, "Batch is empty. Go back and tap foods to add them.") : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: "#64748b",
        marginBottom: 8
      }
    }, "Enter the amount (g / ml) for each food. Quantities were pre-filled from your last log where available."), /*#__PURE__*/React.createElement("div", {
      style: {
        marginBottom: 12
      }
    }, batch.map(function (b, idx) {
      var _b$food$cal2;
      var cal = ((_b$food$cal2 = b.food.cal) !== null && _b$food$cal2 !== void 0 ? _b$food$cal2 : 0) * (parseFloat(b.amount) || 0) / 100;
      return /*#__PURE__*/React.createElement("div", {
        key: b.food.id,
        style: _objectSpread(_objectSpread({}, S.card), {}, {
          marginBottom: 8,
          padding: "10px 12px"
        })
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          alignItems: "center",
          gap: 8
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          flex: 1,
          minWidth: 0
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 14,
          fontWeight: 500,
          color: "#e2e8f0",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap"
        }
      }, b.food.name), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 11,
          color: "#64748b"
        }
      }, b.food.cat, " \xB7 ", fmtE(cal), " ", energyLabel)), /*#__PURE__*/React.createElement("button", {
        style: {
          background: "none",
          border: "none",
          color: "#ef4444",
          fontSize: 18,
          cursor: "pointer",
          flexShrink: 0,
          padding: "0 4px"
        },
        onClick: function onClick() {
          return removeFoodFromBatch(idx);
        },
        "aria-label": "Remove from batch"
      }, "\xD7")), /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          alignItems: "center",
          gap: 6,
          marginTop: 8
        }
      }, /*#__PURE__*/React.createElement("input", {
        type: "number",
        inputMode: "numeric",
        value: b.amount,
        onChange: function onChange(e) {
          return setBatchAmount(idx, e.target.value);
        },
        style: _objectSpread(_objectSpread({}, S.input), {}, {
          width: 90,
          textAlign: "center",
          marginBottom: 0,
          padding: "8px 10px"
        })
      }), /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 13,
          color: "#64748b"
        }
      }, "g / ml")));
    })), /*#__PURE__*/React.createElement("div", {
      style: S.card
    }, /*#__PURE__*/React.createElement("label", {
      style: S.label
    }, "Meal (applies to all foods in batch)"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 6,
        flexWrap: "wrap",
        marginBottom: 12
      }
    }, MEALS.map(function (m) {
      return /*#__PURE__*/React.createElement("button", {
        key: m,
        style: S.pill(meal === m),
        onClick: function onClick() {
          return setMeal(m);
        }
      }, m);
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        background: "#0a0f1a",
        borderRadius: 10,
        padding: 12,
        marginBottom: 12
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        fontSize: 13
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: "#94a3b8"
      }
    }, "Batch total"), /*#__PURE__*/React.createElement("span", {
      style: {
        color: "#f59e0b",
        fontWeight: 700
      }
    }, fmtE(totalCal), " ", energyLabel))), /*#__PURE__*/React.createElement("button", {
      style: {
        width: "100%",
        padding: 14,
        borderRadius: 12,
        border: "none",
        background: "#16a34a",
        color: "#fff",
        fontSize: 15,
        fontWeight: 700,
        cursor: "pointer"
      },
      onClick: commitBatch
    }, "Log All (", batch.length, ") to ", meal)))), /*#__PURE__*/React.createElement(BottomNav, null));
  }
  // ── SUPPLEMENT LOG CONFIRMATION ─────────────────────────────────────
  if (view === "suppLogConfirm" && suppLogStack) {
    var checkedCount = suppLogItems.filter(function (i) {
      return i.checked;
    }).length;
    return /*#__PURE__*/React.createElement("div", {
      style: S.app
    }, /*#__PURE__*/React.createElement("div", {
      style: S.header
    }, /*#__PURE__*/React.createElement("button", {
      style: {
        background: "none",
        border: "none",
        color: "#94a3b8",
        fontSize: 15,
        cursor: "pointer"
      },
      onClick: function onClick() {
        setSuppLogStack(null);
        setSuppLogItems([]);
        setView("add");
      }
    }, "\u2190 Back"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 15,
        fontWeight: 700
      }
    }, "Log ", suppLogStack.name), /*#__PURE__*/React.createElement("div", {
      style: {
        width: 48
      }
    })), /*#__PURE__*/React.createElement("div", {
      style: S.section
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: "#64748b",
        marginBottom: 12
      }
    }, "Uncheck items you didn't take. Tap dose to override."), /*#__PURE__*/React.createElement("div", {
      style: S.card
    }, suppLogItems.length === 0 ? /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: "center",
        padding: "20px 0",
        color: "#475569",
        fontSize: 13
      }
    }, "This stack has no items. Edit it in Settings \u2192 Supplements.") : suppLogItems.map(function (item, idx) {
      return /*#__PURE__*/React.createElement("div", {
        key: idx,
        style: _objectSpread(_objectSpread({}, S.suppRow), {}, {
          opacity: item.checked ? 1 : 0.4
        })
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          alignItems: "center",
          gap: 10,
          flex: 1
        }
      }, /*#__PURE__*/React.createElement("input", {
        type: "checkbox",
        checked: item.checked,
        onChange: function onChange(e) {
          return setSuppLogItems(function (prev) {
            return prev.map(function (x, i) {
              return i === idx ? _objectSpread(_objectSpread({}, x), {}, {
                checked: e.target.checked
              }) : x;
            });
          });
        },
        style: {
          width: 18,
          height: 18,
          accentColor: "#7c3aed",
          cursor: "pointer"
        }
      }), /*#__PURE__*/React.createElement("div", {
        style: {
          flex: 1
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 14,
          fontWeight: 500,
          color: "#e2e8f0"
        }
      }, item.name), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 12,
          color: "#64748b",
          marginTop: 2
        }
      }, "Default: ", item.dose_amount, item.dose_unit))), /*#__PURE__*/React.createElement("div", {
        style: {
          width: 90
        }
      }, /*#__PURE__*/React.createElement("input", {
        style: _objectSpread(_objectSpread({}, S.input), {}, {
          width: "100%",
          padding: "6px 8px",
          fontSize: 13,
          textAlign: "right"
        }),
        type: "number",
        inputMode: "decimal",
        placeholder: String(item.dose_amount),
        value: item.doseOverride,
        onChange: function onChange(e) {
          return setSuppLogItems(function (prev) {
            return prev.map(function (x, i) {
              return i === idx ? _objectSpread(_objectSpread({}, x), {}, {
                doseOverride: e.target.value
              }) : x;
            });
          });
        }
      }), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 10,
          color: "#475569",
          textAlign: "right",
          marginTop: 2
        }
      }, item.dose_unit)));
    })), /*#__PURE__*/React.createElement("button", {
      style: {
        width: "100%",
        padding: 14,
        borderRadius: 12,
        border: "none",
        marginTop: 8,
        background: checkedCount > 0 ? "#7c3aed" : "#1e293b",
        color: checkedCount > 0 ? "#fff" : "#64748b",
        fontSize: 15,
        fontWeight: 700,
        cursor: checkedCount > 0 ? "pointer" : "default"
      },
      disabled: checkedCount === 0,
      onClick: logSuppStack
    }, "Log ", checkedCount, " item", checkedCount === 1 ? "" : "s", " \u2014 ", suppLogStack.name)));
  }

  // ── STACK EDITOR ──────────────────────────────────────────────────────
  if (view === "stackEditor") {
    var canSave = stackEditorName.trim().length > 0;
    return /*#__PURE__*/React.createElement("div", {
      style: S.app
    }, /*#__PURE__*/React.createElement("div", {
      style: S.header
    }, /*#__PURE__*/React.createElement("button", {
      style: {
        background: "none",
        border: "none",
        color: "#94a3b8",
        fontSize: 15,
        cursor: "pointer"
      },
      onClick: function onClick() {
        return setView("settings");
      }
    }, "\u2190 Back"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 15,
        fontWeight: 700
      }
    }, editingStackId ? "Edit Stack" : "New Stack"), /*#__PURE__*/React.createElement("button", {
      style: {
        background: "none",
        border: "none",
        fontSize: 13,
        fontWeight: 700,
        cursor: canSave ? "pointer" : "default",
        color: canSave ? "#3b82f6" : "#334155"
      },
      onClick: saveStack,
      disabled: !canSave
    }, "Save")), /*#__PURE__*/React.createElement("div", {
      style: S.section
    }, /*#__PURE__*/React.createElement("div", {
      style: S.card
    }, /*#__PURE__*/React.createElement("label", {
      style: S.label
    }, "Stack name"), /*#__PURE__*/React.createElement("input", {
      style: _objectSpread(_objectSpread({}, S.input), {}, {
        marginBottom: 8
      }),
      placeholder: "e.g. AM, PM, Pre-ride",
      value: stackEditorName,
      onChange: function onChange(e) {
        return setStackEditorName(e.target.value);
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 6,
        flexWrap: "wrap"
      }
    }, ["AM", "PM", "Pre-ride", "Post-ride", "Evening"].map(function (n) {
      return /*#__PURE__*/React.createElement("button", {
        key: n,
        style: S.pill(stackEditorName === n),
        onClick: function onClick() {
          return setStackEditorName(n);
        }
      }, n);
    }))), /*#__PURE__*/React.createElement("div", {
      style: S.card
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        fontWeight: 700,
        color: "#94a3b8",
        textTransform: "uppercase",
        letterSpacing: "0.05em"
      }
    }, "Items ", stackEditorItems.length > 0 ? "(".concat(stackEditorItems.length, ")") : ""), /*#__PURE__*/React.createElement("button", {
      style: {
        background: "#1d4ed8",
        border: "none",
        color: "#fff",
        borderRadius: 8,
        padding: "6px 12px",
        fontSize: 12,
        fontWeight: 600,
        cursor: "pointer"
      },
      onClick: function onClick() {
        return openItemEditor(null);
      }
    }, "+ Add item")), stackEditorItems.length === 0 ? /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: "center",
        padding: "20px 0",
        color: "#475569",
        fontSize: 13
      }
    }, "No items yet \u2014 tap + Add item") : stackEditorItems.map(function (item, idx) {
      return /*#__PURE__*/React.createElement("div", {
        key: idx,
        style: {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 0",
          borderBottom: idx < stackEditorItems.length - 1 ? "1px solid #1e293b" : "none"
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          flex: 1,
          cursor: "pointer"
        },
        onClick: function onClick() {
          return openItemEditor(idx);
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 14,
          fontWeight: 500,
          color: "#e2e8f0"
        }
      }, item.name), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 12,
          color: "#64748b"
        }
      }, item.dose_amount, item.dose_unit, Object.keys(item.nutrients).length > 0 && /*#__PURE__*/React.createElement("span", {
        style: {
          color: "#a78bfa",
          marginLeft: 6
        }
      }, "\xB7 ", Object.keys(item.nutrients).length, " nutrient", Object.keys(item.nutrients).length === 1 ? "" : "s"))), /*#__PURE__*/React.createElement("button", {
        style: {
          background: "none",
          border: "none",
          color: "#ef4444",
          fontSize: 18,
          cursor: "pointer",
          padding: "4px 8px"
        },
        onClick: function onClick() {
          return removeItemFromStack(idx);
        }
      }, "\xD7"));
    })), editingStackId && /*#__PURE__*/React.createElement("button", {
      style: {
        width: "100%",
        padding: 14,
        borderRadius: 12,
        border: "1px solid #ef4444",
        background: "transparent",
        color: "#ef4444",
        fontSize: 14,
        fontWeight: 600,
        cursor: "pointer",
        marginBottom: 20
      },
      onClick: function onClick() {
        return deleteStack(editingStackId);
      }
    }, "Delete Stack")));
  }

  // ── ITEM EDITOR ───────────────────────────────────────────────────────
  if (view === "itemEditor") {
    var _canSave = itemEditorData.name.trim().length > 0;
    return /*#__PURE__*/React.createElement("div", {
      style: S.app
    }, /*#__PURE__*/React.createElement("div", {
      style: S.header
    }, /*#__PURE__*/React.createElement("button", {
      style: {
        background: "none",
        border: "none",
        color: "#94a3b8",
        fontSize: 15,
        cursor: "pointer"
      },
      onClick: function onClick() {
        return setView("stackEditor");
      }
    }, "\u2190 Back"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 15,
        fontWeight: 700
      }
    }, editingItemIdx !== null && editingItemIdx !== undefined ? "Edit Item" : "New Item"), /*#__PURE__*/React.createElement("button", {
      style: {
        background: "none",
        border: "none",
        fontSize: 13,
        fontWeight: 700,
        cursor: _canSave ? "pointer" : "default",
        color: _canSave ? "#3b82f6" : "#334155"
      },
      onClick: saveItem,
      disabled: !_canSave
    }, "Save")), /*#__PURE__*/React.createElement("div", {
      style: S.section
    }, /*#__PURE__*/React.createElement("div", {
      style: S.card
    }, /*#__PURE__*/React.createElement("label", {
      style: S.label
    }, "Supplement name"), /*#__PURE__*/React.createElement("input", {
      style: _objectSpread(_objectSpread({}, S.input), {}, {
        marginBottom: 12
      }),
      placeholder: "e.g. Vitamin B12",
      value: itemEditorData.name,
      onChange: function onChange(e) {
        return setItemEditorData(function (p) {
          return _objectSpread(_objectSpread({}, p), {}, {
            name: e.target.value
          });
        });
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 8,
        marginBottom: 4
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1
      }
    }, /*#__PURE__*/React.createElement("label", {
      style: S.label
    }, "Dose amount"), /*#__PURE__*/React.createElement("input", {
      style: S.input,
      type: "number",
      inputMode: "decimal",
      placeholder: "e.g. 1000",
      value: itemEditorData.dose_amount,
      onChange: function onChange(e) {
        return setItemEditorData(function (p) {
          return _objectSpread(_objectSpread({}, p), {}, {
            dose_amount: e.target.value
          });
        });
      }
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        width: 100
      }
    }, /*#__PURE__*/React.createElement("label", {
      style: S.label
    }, "Unit"), /*#__PURE__*/React.createElement("select", {
      style: _objectSpread(_objectSpread({}, S.input), {}, {
        padding: "11px 8px"
      }),
      value: itemEditorData.dose_unit,
      onChange: function onChange(e) {
        return setItemEditorData(function (p) {
          return _objectSpread(_objectSpread({}, p), {}, {
            dose_unit: e.target.value
          });
        });
      }
    }, SUPP_DOSE_UNITS.map(function (u) {
      return /*#__PURE__*/React.createElement("option", {
        key: u
      }, u);
    }))))), /*#__PURE__*/React.createElement("div", {
      style: S.card
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        fontWeight: 700,
        color: "#94a3b8",
        textTransform: "uppercase",
        letterSpacing: "0.05em",
        marginBottom: 4
      }
    }, "Nutrient contributions"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: "#475569",
        marginBottom: 12
      }
    }, "Optional. Only add if this supplement provides trackable nutrients."), Object.keys(itemEditorData.nutrients).length > 0 && /*#__PURE__*/React.createElement("div", {
      style: {
        marginBottom: 12
      }
    }, Object.entries(itemEditorData.nutrients).map(function (_ref16) {
      var _NUTRIENT_META$k3, _NUTRIENT_META$k4;
      var _ref17 = _slicedToArray(_ref16, 2),
        k = _ref17[0],
        v = _ref17[1];
      return /*#__PURE__*/React.createElement("div", {
        key: k,
        style: {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "6px 0",
          borderBottom: "1px solid #1e293b"
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 13,
          color: "#e2e8f0"
        }
      }, ((_NUTRIENT_META$k3 = NUTRIENT_META[k]) === null || _NUTRIENT_META$k3 === void 0 ? void 0 : _NUTRIENT_META$k3.label) || k), /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          alignItems: "center",
          gap: 8
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 13,
          color: "#a78bfa",
          fontWeight: 600
        }
      }, v, " ", ((_NUTRIENT_META$k4 = NUTRIENT_META[k]) === null || _NUTRIENT_META$k4 === void 0 ? void 0 : _NUTRIENT_META$k4.unit) || ""), /*#__PURE__*/React.createElement("button", {
        style: {
          background: "none",
          border: "none",
          color: "#ef4444",
          fontSize: 14,
          cursor: "pointer",
          padding: "0 4px"
        },
        onClick: function onClick() {
          return removeNutrientFromItem(k);
        }
      }, "\xD7")));
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 6,
        marginBottom: 4
      }
    }, /*#__PURE__*/React.createElement("select", {
      style: _objectSpread(_objectSpread({}, S.input), {}, {
        flex: 1,
        padding: "8px 10px",
        fontSize: 13
      }),
      value: itemNutKey,
      onChange: function onChange(e) {
        return setItemNutKey(e.target.value);
      }
    }, NUTRIENT_ALL_KEYS.map(function (k) {
      return /*#__PURE__*/React.createElement("option", {
        key: k,
        value: k
      }, NUTRIENT_META[k].label, " (", NUTRIENT_META[k].unit, ")");
    })), /*#__PURE__*/React.createElement("input", {
      style: _objectSpread(_objectSpread({}, S.input), {}, {
        width: 80,
        padding: "8px 10px",
        fontSize: 13
      }),
      type: "number",
      inputMode: "decimal",
      placeholder: "0",
      value: itemNutVal,
      onChange: function onChange(e) {
        return setItemNutVal(e.target.value);
      }
    }), /*#__PURE__*/React.createElement("button", {
      style: {
        background: "#1d4ed8",
        border: "none",
        color: "#fff",
        borderRadius: 10,
        padding: "8px 14px",
        fontSize: 13,
        fontWeight: 600,
        cursor: "pointer",
        whiteSpace: "nowrap"
      },
      onClick: addNutrientToItem
    }, "+ Add")), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: "#475569",
        marginTop: 4
      }
    }, "e.g. select \"B12 (mcg)\", enter 1000, tap + Add"))));
  }
  // ── RECIPES LIBRARY ───────────────────────────────────────────────────
  if (view === "recipes") {
    return /*#__PURE__*/React.createElement("div", {
      style: S.app
    }, /*#__PURE__*/React.createElement("div", {
      style: S.header
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 17,
        fontWeight: 700
      }
    }, "Recipes"), /*#__PURE__*/React.createElement("button", {
      style: {
        background: "#3b82f6",
        border: "none",
        color: "#fff",
        borderRadius: 10,
        padding: "8px 16px",
        fontSize: 13,
        fontWeight: 700,
        cursor: "pointer"
      },
      onClick: startNewRecipe
    }, "+ New")), /*#__PURE__*/React.createElement("div", {
      style: _objectSpread(_objectSpread({}, S.section), {}, {
        paddingBottom: 20
      })
    }, recipes.length === 0 ? /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: "center",
        padding: "60px 0",
        color: "#475569"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 40,
        marginBottom: 12
      }
    }, "\uD83D\uDCD6"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 15,
        fontWeight: 600,
        color: "#64748b",
        marginBottom: 6
      }
    }, "No recipes yet"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13
      }
    }, "Tap + New to create your first recipe")) : /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 8
      }
    }, recipes.map(function (r) {
      var n = r.nutrition_per_serving || {};
      return /*#__PURE__*/React.createElement("div", {
        key: r.id,
        style: _objectSpread(_objectSpread({}, S.card), {}, {
          cursor: "pointer"
        }),
        onClick: function onClick() {
          setSelectedRecipe(r);
          setView("recipeDetail");
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start"
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          flex: 1
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 15,
          fontWeight: 700,
          color: "#e2e8f0",
          marginBottom: 2
        }
      }, r.name), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 12,
          color: "#475569",
          marginBottom: 8
        }
      }, r.servings, " ", r.servings === 1 ? "serving" : "servings", r.source ? " \xB7 ".concat(r.source) : "", " \xB7 ", r.ingredients.length, " ingredients"), /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          gap: 12
        }
      }, [{
        k: "cal",
        l: energyLabel
      }, {
        k: "pro",
        l: "pro"
      }, {
        k: "carb",
        l: "carb"
      }, {
        k: "fat",
        l: "fat"
      }].map(function (_ref18) {
        var _n$k, _n$k2;
        var k = _ref18.k,
          l = _ref18.l;
        return /*#__PURE__*/React.createElement("div", {
          key: k,
          style: {
            textAlign: "center"
          }
        }, /*#__PURE__*/React.createElement("div", {
          style: {
            fontSize: 13,
            fontWeight: 700,
            color: NUTRIENT_META[k].color
          }
        }, k === "cal" ? fmtE((_n$k = n[k]) !== null && _n$k !== void 0 ? _n$k : 0) : n1((_n$k2 = n[k]) !== null && _n$k2 !== void 0 ? _n$k2 : 0)), /*#__PURE__*/React.createElement("div", {
          style: {
            fontSize: 10,
            color: "#64748b"
          }
        }, l, "/srv"));
      }))), /*#__PURE__*/React.createElement("div", {
        style: {
          color: "#475569",
          fontSize: 18,
          paddingLeft: 8
        }
      }, "\u203A")));
    }))), /*#__PURE__*/React.createElement(BottomNav, null));
  }

  // ── RECIPE DETAIL ─────────────────────────────────────────────────────
  if (view === "recipeDetail" && selectedRecipe) {
    var r = selectedRecipe,
      n = r.nutrition_per_serving || {};
    return /*#__PURE__*/React.createElement("div", {
      style: S.app
    }, /*#__PURE__*/React.createElement("div", {
      style: S.header
    }, /*#__PURE__*/React.createElement("button", {
      style: {
        background: "none",
        border: "none",
        color: "#94a3b8",
        fontSize: 15,
        cursor: "pointer"
      },
      onClick: function onClick() {
        return setView("recipes");
      }
    }, "\u2190 Back"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 15,
        fontWeight: 700,
        flex: 1,
        textAlign: "center",
        marginRight: 48
      }
    }, r.name), /*#__PURE__*/React.createElement("button", {
      style: {
        background: "none",
        border: "none",
        color: "#3b82f6",
        fontSize: 13,
        fontWeight: 600,
        cursor: "pointer"
      },
      onClick: function onClick() {
        return startEditRecipe(r);
      }
    }, "Edit")), /*#__PURE__*/React.createElement("div", {
      style: S.section
    }, r.source ? /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: "#475569",
        marginBottom: 12,
        paddingTop: 2
      }
    }, "Source: ", r.source) : null, /*#__PURE__*/React.createElement("div", {
      style: S.card
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        fontWeight: 700,
        color: "#475569",
        marginBottom: 12,
        textTransform: "uppercase",
        letterSpacing: "0.05em"
      }
    }, "Per serving (", r.servings, " total)"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(5,1fr)",
        gap: 8,
        marginBottom: 12
      }
    }, MACROS.map(function (k) {
      var _n$k3, _n$k4;
      return /*#__PURE__*/React.createElement("div", {
        key: k,
        style: {
          textAlign: "center"
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 15,
          fontWeight: 700,
          color: NUTRIENT_META[k].color
        }
      }, k === "cal" ? fmtE((_n$k3 = n[k]) !== null && _n$k3 !== void 0 ? _n$k3 : 0) : n1((_n$k4 = n[k]) !== null && _n$k4 !== void 0 ? _n$k4 : 0)), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 10,
          color: "#64748b"
        }
      }, k === "cal" ? energyLabel : NUTRIENT_META[k].label));
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        borderTop: "1px solid #1e293b",
        paddingTop: 10
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        fontWeight: 700,
        color: "#475569",
        marginBottom: 8,
        textTransform: "uppercase",
        letterSpacing: "0.04em"
      }
    }, "Key micros / serving"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "4px 16px"
      }
    }, ["iron", "calc", "zinc", "b12", "omega3", "fol"].map(function (k) {
      var _n$k5;
      return /*#__PURE__*/React.createElement("div", {
        key: k,
        style: {
          display: "flex",
          justifyContent: "space-between",
          fontSize: 12
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          color: "#94a3b8"
        }
      }, NUTRIENT_META[k].label), /*#__PURE__*/React.createElement("span", {
        style: {
          color: NUTRIENT_META[k].color,
          fontWeight: 600
        }
      }, n1((_n$k5 = n[k]) !== null && _n$k5 !== void 0 ? _n$k5 : null), NUTRIENT_META[k].unit));
    })))), /*#__PURE__*/React.createElement("div", {
      style: S.card
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        fontWeight: 700,
        color: "#94a3b8",
        marginBottom: 10,
        textTransform: "uppercase",
        letterSpacing: "0.05em"
      }
    }, "Ingredients (", r.ingredients.length, ")"), r.ingredients.map(function (ing, i) {
      var food = allFoods.find(function (f) {
          return f.id === ing.foodId;
        }),
        ingCal = food ? fmtE(food.cal * ing.amount_g / 100) : "?";
      return /*#__PURE__*/React.createElement("div", {
        key: i,
        style: {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "8px 0",
          borderBottom: i < r.ingredients.length - 1 ? "1px solid #1e293b" : "none"
        }
      }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 13,
          color: "#e2e8f0"
        }
      }, ing.foodName), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 11,
          color: "#64748b"
        }
      }, ing.amount_g, "g")), /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 12,
          color: "#f59e0b",
          fontWeight: 600
        }
      }, ingCal, " ", energyLabel));
    })), /*#__PURE__*/React.createElement("button", {
      style: {
        width: "100%",
        padding: 14,
        borderRadius: 12,
        border: "none",
        background: "#3b82f6",
        color: "#fff",
        fontSize: 15,
        fontWeight: 700,
        cursor: "pointer",
        marginBottom: 10
      },
      onClick: function onClick() {
        setRecipeLogServings("1");
        setRecipeLogGrams("");
        setRecipeLogMode("servings");
        setRecipeLogMeal("Breakfast");
        setView("recipeLog");
      }
    }, "Log Recipe"), /*#__PURE__*/React.createElement("button", {
      style: {
        width: "100%",
        padding: 14,
        borderRadius: 12,
        border: "1px solid #ef4444",
        background: "transparent",
        color: "#ef4444",
        fontSize: 14,
        fontWeight: 600,
        cursor: "pointer",
        marginBottom: 20
      },
      onClick: function onClick() {
        return deleteRecipe(r.id);
      }
    }, "Delete Recipe")), /*#__PURE__*/React.createElement(BottomNav, null));
  }

  // ── RECIPE LOG ────────────────────────────────────────────────────────
  if (view === "recipeLog" && selectedRecipe) {
    var _perServingNut$cal;
    var _r = selectedRecipe,
      rs = Math.max(Number(_r.servings) || 1, 0.01),
      tw = (_r.ingredients || []).reduce(function (s, i) {
        return s + (Number(i.amount_g) || 0);
      }, 0);
    var frac = 0;
    if (recipeLogMode === "servings") frac = (parseFloat(recipeLogServings) || 0) / rs;else {
      var g = parseFloat(recipeLogGrams) || 0;
      frac = tw > 0 ? g / tw : 0;
    }
    var previewNut = {};
    Object.keys(NUTRIENT_META).forEach(function (k) {
      return previewNut[k] = 0;
    });
    _r.ingredients.forEach(function (ing) {
      var food = allFoods.find(function (f) {
        return f.id === ing.foodId;
      });
      if (!food) return;
      var m = ing.amount_g * frac / 100;
      Object.keys(NUTRIENT_META).forEach(function (k) {
        var _food$k5;
        previewNut[k] += ((_food$k5 = food[k]) !== null && _food$k5 !== void 0 ? _food$k5 : 0) * m;
      });
    });
    var perServingNut = {};
    Object.keys(NUTRIENT_META).forEach(function (k) {
      return perServingNut[k] = 0;
    });
    _r.ingredients.forEach(function (ing) {
      var food = allFoods.find(function (f) {
        return f.id === ing.foodId;
      });
      if (!food) return;
      var m = ing.amount_g / rs / 100;
      Object.keys(NUTRIENT_META).forEach(function (k) {
        var _food$k6;
        perServingNut[k] += ((_food$k6 = food[k]) !== null && _food$k6 !== void 0 ? _food$k6 : 0) * m;
      });
    });
    var canLog = frac > 0;
    return /*#__PURE__*/React.createElement("div", {
      style: S.app
    }, /*#__PURE__*/React.createElement("div", {
      style: S.header
    }, /*#__PURE__*/React.createElement("button", {
      style: {
        background: "none",
        border: "none",
        color: "#94a3b8",
        fontSize: 15,
        cursor: "pointer"
      },
      onClick: function onClick() {
        return setView(recipeLogReturn);
      }
    }, "\u2190 Back"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 15,
        fontWeight: 700
      }
    }, "Log Recipe"), /*#__PURE__*/React.createElement("div", {
      style: {
        width: 48
      }
    })), /*#__PURE__*/React.createElement("div", {
      style: _objectSpread(_objectSpread({}, S.section), {}, {
        paddingBottom: 80
      })
    }, /*#__PURE__*/React.createElement("div", {
      style: S.card
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        background: "#0a0f1a",
        borderRadius: 10,
        padding: 4,
        marginBottom: 16
      }
    }, [["servings", "By Servings"], ["grams", "By Weight"]].map(function (_ref19) {
      var _ref20 = _slicedToArray(_ref19, 2),
        mode = _ref20[0],
        label = _ref20[1];
      return /*#__PURE__*/React.createElement("button", {
        key: mode,
        style: {
          flex: 1,
          padding: "8px 0",
          borderRadius: 8,
          border: "none",
          cursor: "pointer",
          fontSize: 13,
          fontWeight: 600,
          background: recipeLogMode === mode ? "#1d4ed8" : "transparent",
          color: recipeLogMode === mode ? "#fff" : "#64748b"
        },
        onClick: function onClick() {
          return setRecipeLogMode(mode);
        }
      }, label);
    })), recipeLogMode === "servings" ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("label", {
      style: S.label
    }, "Servings to log \u2014 1 serving = ", fmtE((_perServingNut$cal = perServingNut.cal) !== null && _perServingNut$cal !== void 0 ? _perServingNut$cal : 0), " ", energyLabel), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: "#475569",
        marginBottom: 8
      }
    }, "Recipe has ", _r.servings, " ", _r.servings === 1 ? "serving" : "servings", " total"), /*#__PURE__*/React.createElement("input", {
      style: S.input,
      type: "number",
      inputMode: "decimal",
      value: recipeLogServings,
      onChange: function onChange(e) {
        return setRecipeLogServings(e.target.value);
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 6,
        marginTop: 8,
        flexWrap: "wrap"
      }
    }, _toConsumableArray(new Set([0.5].concat(_toConsumableArray(Array.from({
      length: _r.servings
    }, function (_, i) {
      return i + 1;
    }))))).map(function (q) {
      return /*#__PURE__*/React.createElement("button", {
        key: q,
        style: S.pill(recipeLogServings === String(q)),
        onClick: function onClick() {
          return setRecipeLogServings(String(q));
        }
      }, q === 0.5 ? "½" : q);
    }))) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("label", {
      style: S.label
    }, "Weight (g) \u2014 recipe ingredients total ", tw, "g"), /*#__PURE__*/React.createElement("input", {
      style: S.input,
      type: "number",
      inputMode: "numeric",
      value: recipeLogGrams,
      onChange: function onChange(e) {
        return setRecipeLogGrams(e.target.value);
      },
      placeholder: "e.g. ".concat(Math.round(tw / _r.servings))
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 6,
        marginTop: 8,
        flexWrap: "wrap"
      }
    }, [0.5, 1, 1.5].map(function (mult) {
      var q = Math.round(tw * mult / _r.servings);
      return q > 0 ? /*#__PURE__*/React.createElement("button", {
        key: mult,
        style: S.pill(recipeLogGrams === String(q)),
        onClick: function onClick() {
          return setRecipeLogGrams(String(q));
        }
      }, q, "g") : null;
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: "#475569",
        marginTop: 8
      }
    }, "Based on raw ingredient weights")), /*#__PURE__*/React.createElement("div", {
      style: {
        background: "#0a0f1a",
        borderRadius: 10,
        padding: 12,
        margin: "16px 0"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        fontWeight: 700,
        color: "#475569",
        marginBottom: 8,
        textTransform: "uppercase"
      }
    }, "Preview"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(5,1fr)",
        gap: 6
      }
    }, ["cal", "pro", "carb", "fat", "fib", "alc"].map(function (k) {
      var _previewNut$k, _previewNut$k2;
      return /*#__PURE__*/React.createElement("div", {
        key: k,
        style: {
          textAlign: "center"
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 14,
          fontWeight: 700,
          color: NUTRIENT_META[k].color
        }
      }, k === "cal" ? fmtE((_previewNut$k = previewNut[k]) !== null && _previewNut$k !== void 0 ? _previewNut$k : 0) : n1((_previewNut$k2 = previewNut[k]) !== null && _previewNut$k2 !== void 0 ? _previewNut$k2 : null)), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 10,
          color: "#64748b"
        }
      }, k === "cal" ? energyLabel : NUTRIENT_META[k].label));
    }))), /*#__PURE__*/React.createElement("label", {
      style: S.label
    }, "Meal"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 6,
        flexWrap: "wrap",
        marginBottom: 12
      }
    }, MEALS.map(function (m) {
      return /*#__PURE__*/React.createElement("button", {
        key: m,
        style: S.pill(recipeLogMeal === m),
        onClick: function onClick() {
          return setRecipeLogMeal(m);
        }
      }, m);
    })), /*#__PURE__*/React.createElement("button", {
      style: {
        width: "100%",
        padding: 14,
        borderRadius: 12,
        border: "none",
        background: canLog ? "#3b82f6" : "#1e293b",
        color: canLog ? "#fff" : "#64748b",
        fontSize: 15,
        fontWeight: 700,
        cursor: "pointer"
      },
      disabled: !canLog,
      onClick: logRecipe
    }, "Add to ", recipeLogMeal))), /*#__PURE__*/React.createElement(BottomNav, null));
  }

  // ── RECIPE LOG REVIEW (W1) ────────────────────────────────────────────
  // Shown after quantity picker; user adjusts ingredients before committing.
  // The saved recipe definition is never touched here.
  if (view === "recipeLogReview" && selectedRecipe) {
    var hasAny = recipeLogReviewIngredients.some(function (ing) {
      return ing.amount_g > 0;
    });
    var nut = computeEntryNutrition(recipeLogReviewIngredients, allFoodsForRender);
    return /*#__PURE__*/React.createElement("div", {
      style: S.app
    }, /*#__PURE__*/React.createElement("div", {
      style: S.header
    }, /*#__PURE__*/React.createElement("button", {
      style: {
        background: "none",
        border: "none",
        color: "#94a3b8",
        fontSize: 15,
        cursor: "pointer"
      },
      onClick: function onClick() {
        return setView("recipeLog");
      }
    }, "\u2190 Back"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 15,
        fontWeight: 700
      }
    }, "Review Ingredients"), /*#__PURE__*/React.createElement("div", {
      style: {
        width: 48
      }
    })), /*#__PURE__*/React.createElement("div", {
      style: _objectSpread(_objectSpread({}, S.section), {}, {
        paddingBottom: 80
      })
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        background: "#1a0a2e",
        border: "1px solid #7c3aed",
        borderRadius: 8,
        padding: "8px 12px",
        marginBottom: 12,
        fontSize: 12,
        color: "#a78bfa"
      }
    }, "Step 2 of 2 \u2014 ", recipeLogReviewIngredients.length, " ingredient", recipeLogReviewIngredients.length === 1 ? "" : "s", " \xB7 adjust or tap Add to confirm"), /*#__PURE__*/React.createElement("div", {
      style: S.card
    }, recipeLogReviewIngredients.length === 0 ? /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: "center",
        padding: "20px 0",
        color: "#ef4444",
        fontSize: 13
      }
    }, "All ingredients removed \u2014 restore at least one.") : recipeLogReviewIngredients.map(function (ing, idx) {
      var food = allFoodsForRender.find(function (f) {
        return f.id === ing.foodId;
      });
      var ingCal = food ? fmtE(food.cal * ing.amount_g / 100) : "?";
      return /*#__PURE__*/React.createElement("div", {
        key: idx,
        style: {
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "10px 0",
          borderBottom: idx < recipeLogReviewIngredients.length - 1 ? "1px solid #1e293b" : "none"
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          flex: 1,
          minWidth: 0
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 13,
          color: "#e2e8f0",
          fontWeight: 500,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap"
        }
      }, ing.foodName), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 11,
          color: "#64748b"
        }
      }, ingCal, " ", energyLabel)), /*#__PURE__*/React.createElement("input", {
        style: _objectSpread(_objectSpread({}, S.input), {}, {
          width: 72,
          padding: "6px 8px",
          fontSize: 13,
          textAlign: "right",
          flexShrink: 0
        }),
        type: "number",
        inputMode: "decimal",
        value: String(ing.amount_g),
        onChange: function onChange(e) {
          var v = Math.max(0, parseFloat(e.target.value) || 0);
          setRecipeLogReviewIngredients(function (prev) {
            return prev.map(function (x, i) {
              return i === idx ? _objectSpread(_objectSpread({}, x), {}, {
                amount_g: v
              }) : x;
            });
          });
        }
      }), /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 11,
          color: "#64748b",
          flexShrink: 0
        }
      }, "g"), /*#__PURE__*/React.createElement("button", {
        style: {
          background: "none",
          border: "none",
          color: "#ef4444",
          fontSize: 20,
          cursor: "pointer",
          padding: "4px 6px",
          flexShrink: 0,
          lineHeight: 1
        },
        onClick: function onClick() {
          return setRecipeLogReviewIngredients(function (prev) {
            return prev.filter(function (_, i) {
              return i !== idx;
            });
          });
        }
      }, "\xD7"));
    })), /*#__PURE__*/React.createElement("button", {
      style: {
        width: "100%",
        padding: "10px 0",
        borderRadius: 10,
        border: "1px solid #1e293b",
        background: "transparent",
        color: "#3b82f6",
        fontSize: 13,
        fontWeight: 600,
        cursor: "pointer",
        marginBottom: 8
      },
      onClick: function onClick() {
        setReviewAddOpen(function (o) {
          return !o;
        });
        setRecipeIngSearch("");
        setReviewAddAmount("100");
      }
    }, "+ Add ingredient"), reviewAddOpen && /*#__PURE__*/React.createElement("div", {
      style: _objectSpread(_objectSpread({}, S.card), {}, {
        marginBottom: 12
      })
    }, /*#__PURE__*/React.createElement("input", {
      style: S.input,
      placeholder: "Search foods\u2026",
      value: recipeIngSearch,
      onChange: function onChange(e) {
        return setRecipeIngSearch(e.target.value);
      },
      autoFocus: true
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 8,
        display: "flex",
        alignItems: "center",
        gap: 8
      }
    }, /*#__PURE__*/React.createElement("input", {
      style: _objectSpread(_objectSpread({}, S.input), {}, {
        width: 100,
        marginBottom: 0
      }),
      type: "number",
      inputMode: "decimal",
      value: reviewAddAmount,
      onChange: function onChange(e) {
        return setReviewAddAmount(e.target.value);
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12,
        color: "#64748b"
      }
    }, "g")), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 10,
        maxHeight: 260,
        overflowY: "auto"
      }
    }, Object.entries(groupedIngByCategory).map(function (_ref21) {
      var _ref22 = _slicedToArray(_ref21, 2),
        cat = _ref22[0],
        foods = _ref22[1];
      return /*#__PURE__*/React.createElement("div", {
        key: cat
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 11,
          fontWeight: 700,
          color: "#475569",
          padding: "8px 0 4px",
          letterSpacing: "0.05em",
          textTransform: "uppercase"
        }
      }, cat), foods.map(function (f) {
        return /*#__PURE__*/React.createElement("div", {
          key: f.id,
          style: _objectSpread(_objectSpread({}, S.srchItem), {}, {
            contentVisibility: "auto",
            containIntrinsicSize: "0 44px"
          }),
          onClick: function onClick() {
            return addIngredientToReview(f);
          }
        }, /*#__PURE__*/React.createElement("span", {
          style: {
            fontSize: 12,
            color: "#f59e0b",
            "float": "right"
          }
        }, fmtE(f.cal), " ", energyLabel, "/100g"), /*#__PURE__*/React.createElement("div", {
          style: {
            fontSize: 14,
            fontWeight: 500,
            color: "#e2e8f0"
          }
        }, f.name));
      }));
    }), filteredIngFoods.length === 0 && /*#__PURE__*/React.createElement("div", {
      style: {
        padding: 16,
        textAlign: "center",
        color: "#475569",
        fontSize: 13
      }
    }, "No foods found for \"", recipeIngSearch, "\""))), /*#__PURE__*/React.createElement("div", {
      style: {
        background: "#0a0f1a",
        borderRadius: 10,
        padding: 12,
        margin: "12px 0"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        fontWeight: 700,
        color: "#475569",
        marginBottom: 8,
        textTransform: "uppercase"
      }
    }, "Preview"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(5,1fr)",
        gap: 6
      }
    }, MACROS.map(function (k) {
      var _nut$k, _nut$k2;
      return /*#__PURE__*/React.createElement("div", {
        key: k,
        style: {
          textAlign: "center"
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 14,
          fontWeight: 700,
          color: NUTRIENT_META[k].color
        }
      }, k === "cal" ? fmtE((_nut$k = nut[k]) !== null && _nut$k !== void 0 ? _nut$k : 0) : n1((_nut$k2 = nut[k]) !== null && _nut$k2 !== void 0 ? _nut$k2 : null)), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 10,
          color: "#64748b"
        }
      }, k === "cal" ? energyLabel : NUTRIENT_META[k].label));
    }))), !hasAny && recipeLogReviewIngredients.length > 0 && /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: "#ef4444",
        textAlign: "center",
        marginBottom: 8
      }
    }, "All quantities are zero \u2014 set at least one above 0."), /*#__PURE__*/React.createElement("button", {
      style: {
        width: "100%",
        padding: 14,
        borderRadius: 12,
        border: "none",
        background: hasAny ? "#3b82f6" : "#1e293b",
        color: hasAny ? "#fff" : "#64748b",
        fontSize: 15,
        fontWeight: 700,
        cursor: hasAny ? "pointer" : "default",
        marginBottom: 20
      },
      disabled: !hasAny,
      onClick: function onClick() {
        return commitLogRecipe(recipeLogReviewIngredients.filter(function (ing) {
          return ing.amount_g > 0;
        }));
      }
    }, "Add to ", recipeLogMeal)), /*#__PURE__*/React.createElement(BottomNav, null));
  }

  // ── RECIPE CREATE / EDIT ──────────────────────────────────────────────
  if (view === "recipeCreate") {
    var curServings = parseFloat(recipeInProgress.servings) || 1;
    var _previewNut = recipeInProgress.ingredients.length > 0 ? calcRecipeNutritionPerServing(recipeInProgress.ingredients, curServings, allFoods) : null;
    var _canSave2 = recipeInProgress.name.trim().length > 0 && recipeInProgress.ingredients.length > 0;
    return /*#__PURE__*/React.createElement("div", {
      style: S.app
    }, /*#__PURE__*/React.createElement("div", {
      style: S.header
    }, /*#__PURE__*/React.createElement("button", {
      style: {
        background: "none",
        border: "none",
        color: "#94a3b8",
        fontSize: 15,
        cursor: "pointer"
      },
      onClick: function onClick() {
        setEditingRecipeId(null);
        setView("recipes");
      }
    }, "\u2190 Back"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 15,
        fontWeight: 700
      }
    }, editingRecipeId ? "Edit Recipe" : "New Recipe"), /*#__PURE__*/React.createElement("button", {
      style: {
        background: "none",
        border: "none",
        fontSize: 13,
        fontWeight: 700,
        cursor: "pointer",
        color: _canSave2 ? "#3b82f6" : "#334155"
      },
      onClick: saveRecipe,
      disabled: !_canSave2
    }, "Save")), /*#__PURE__*/React.createElement("div", {
      style: S.section
    }, /*#__PURE__*/React.createElement("div", {
      style: S.card
    }, /*#__PURE__*/React.createElement("label", {
      style: S.label
    }, "Recipe name *"), /*#__PURE__*/React.createElement("input", {
      style: _objectSpread(_objectSpread({}, S.input), {}, {
        marginBottom: 12
      }),
      placeholder: "e.g. Red Lentil Dal",
      value: recipeInProgress.name,
      onChange: function onChange(e) {
        return setRecipeInProgress(function (p) {
          return _objectSpread(_objectSpread({}, p), {}, {
            name: e.target.value
          });
        });
      }
    }), /*#__PURE__*/React.createElement("label", {
      style: S.label
    }, "Number of servings"), /*#__PURE__*/React.createElement("input", {
      style: _objectSpread(_objectSpread({}, S.input), {}, {
        marginBottom: 6
      }),
      type: "number",
      inputMode: "decimal",
      value: recipeInProgress.servings,
      onChange: function onChange(e) {
        return setRecipeInProgress(function (p) {
          return _objectSpread(_objectSpread({}, p), {}, {
            servings: e.target.value
          });
        });
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 6,
        marginTop: 6,
        flexWrap: "wrap"
      }
    }, [1, 2, 3, 4, 6, 8].map(function (n) {
      return /*#__PURE__*/React.createElement("button", {
        key: n,
        style: S.pill(recipeInProgress.servings === String(n)),
        onClick: function onClick() {
          return setRecipeInProgress(function (p) {
            return _objectSpread(_objectSpread({}, p), {}, {
              servings: String(n)
            });
          });
        }
      }, n);
    }))), _previewNut && /*#__PURE__*/React.createElement("div", {
      style: _objectSpread(_objectSpread({}, S.card), {}, {
        background: "#0a0f1a"
      })
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        fontWeight: 700,
        color: "#475569",
        marginBottom: 8,
        textTransform: "uppercase",
        letterSpacing: "0.05em"
      }
    }, "Per serving preview"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(5,1fr)",
        gap: 6
      }
    }, ["cal", "pro", "carb", "fat", "fib", "alc"].map(function (k) {
      var _previewNut$k3, _previewNut$k4;
      return /*#__PURE__*/React.createElement("div", {
        key: k,
        style: {
          textAlign: "center"
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 14,
          fontWeight: 700,
          color: NUTRIENT_META[k].color
        }
      }, k === "cal" ? fmtE((_previewNut$k3 = _previewNut[k]) !== null && _previewNut$k3 !== void 0 ? _previewNut$k3 : 0) : n1((_previewNut$k4 = _previewNut[k]) !== null && _previewNut$k4 !== void 0 ? _previewNut$k4 : null)), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 10,
          color: "#64748b"
        }
      }, k === "cal" ? energyLabel : NUTRIENT_META[k].label));
    }))), /*#__PURE__*/React.createElement("div", {
      style: S.card
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        fontWeight: 700,
        color: "#94a3b8",
        textTransform: "uppercase",
        letterSpacing: "0.05em"
      }
    }, "Ingredients ", recipeInProgress.ingredients.length > 0 ? "(".concat(recipeInProgress.ingredients.length, ")") : ""), /*#__PURE__*/React.createElement("button", {
      style: {
        background: "#1d4ed8",
        border: "none",
        color: "#fff",
        borderRadius: 8,
        padding: "6px 12px",
        fontSize: 12,
        fontWeight: 600,
        cursor: "pointer"
      },
      onClick: function onClick() {
        setRecipeIngSearch("");
        setRecipeIngSelected(null);
        setRecipeIngAmount("100");
        setView("recipeIngAdd");
        setTimeout(function () {
          var _recipeIngRef$current;
          return (_recipeIngRef$current = recipeIngRef.current) === null || _recipeIngRef$current === void 0 ? void 0 : _recipeIngRef$current.focus();
        }, 100);
      }
    }, "+ Add")), recipeInProgress.ingredients.length === 0 ? /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: "center",
        padding: "20px 0",
        color: "#475569",
        fontSize: 13
      }
    }, "No ingredients yet \u2014 tap + Add") : recipeInProgress.ingredients.map(function (ing, i) {
      var food = allFoods.find(function (f) {
          return f.id === ing.foodId;
        }),
        ingCal = food ? fmtE(food.cal * ing.amount_g / 100) : 0;
      return /*#__PURE__*/React.createElement("div", {
        key: i,
        style: {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "8px 0",
          borderBottom: i < recipeInProgress.ingredients.length - 1 ? "1px solid #1e293b" : "none"
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          flex: 1,
          minWidth: 0
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 13,
          color: "#e2e8f0",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis"
        }
      }, ing.foodName), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 11,
          color: "#64748b"
        }
      }, ingCal, " ", energyLabel)), /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          alignItems: "center",
          gap: 6,
          flexShrink: 0
        }
      }, /*#__PURE__*/React.createElement("input", {
        style: _objectSpread(_objectSpread({}, S.input), {}, {
          width: 64,
          textAlign: "center",
          padding: "6px 8px",
          marginBottom: 0
        }),
        type: "number",
        inputMode: "decimal",
        value: ing.amount_g,
        onFocus: function onFocus(e) {
          return e.target.select();
        },
        onChange: function onChange(e) {
          return updateIngAmountInRecipe(i, e.target.value);
        }
      }), /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 12,
          color: "#64748b"
        }
      }, "g"), /*#__PURE__*/React.createElement("button", {
        style: {
          background: "none",
          border: "none",
          color: "#ef4444",
          fontSize: 18,
          cursor: "pointer",
          padding: "4px 8px"
        },
        onClick: function onClick() {
          return removeIngFromRecipe(i);
        }
      }, "\xD7")));
    })), !_canSave2 && /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: "#475569",
        textAlign: "center",
        paddingBottom: 20
      }
    }, recipeInProgress.name.trim() === "" ? "Add a recipe name to save" : "Add at least one ingredient to save")), /*#__PURE__*/React.createElement(BottomNav, null));
  }

  // ── RECIPE INGREDIENT ADD ─────────────────────────────────────────────
  if (view === "recipeIngAdd") {
    return /*#__PURE__*/React.createElement("div", {
      style: S.app
    }, /*#__PURE__*/React.createElement("div", {
      style: S.header
    }, /*#__PURE__*/React.createElement("button", {
      style: {
        background: "none",
        border: "none",
        color: "#94a3b8",
        fontSize: 15,
        cursor: "pointer"
      },
      onClick: function onClick() {
        setRecipeIngSelected(null);
        setRecipeIngSearch("");
        setView("recipeCreate");
      }
    }, "\u2190 Back"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 15,
        fontWeight: 700
      }
    }, recipeIngSelected ? "Set Amount" : "Add Ingredient"), !recipeIngSelected ? /*#__PURE__*/React.createElement("button", {
      style: {
        background: "none",
        border: "none",
        color: "#3b82f6",
        fontSize: 13,
        cursor: "pointer",
        fontWeight: 600
      },
      onClick: function onClick() {
        resetCfForm();
        setView("customAdd");
      }
    }, "+ Custom") : /*#__PURE__*/React.createElement("div", {
      style: {
        width: 64
      }
    })), !recipeIngSelected ? /*#__PURE__*/React.createElement("div", {
      style: S.section
    }, /*#__PURE__*/React.createElement("input", {
      ref: recipeIngRef,
      style: S.input,
      placeholder: "Search foods\u2026",
      value: recipeIngSearch,
      onChange: function onChange(e) {
        return setRecipeIngSearch(e.target.value);
      },
      autoFocus: true
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 12,
        maxHeight: "calc(100vh - 160px)",
        overflowY: "auto"
      }
    }, Object.entries(groupedIngByCategory).map(function (_ref23) {
      var _ref24 = _slicedToArray(_ref23, 2),
        cat = _ref24[0],
        foods = _ref24[1];
      return /*#__PURE__*/React.createElement("div", {
        key: cat
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 11,
          fontWeight: 700,
          color: "#475569",
          padding: "10px 0 4px",
          letterSpacing: "0.05em",
          textTransform: "uppercase"
        }
      }, cat), foods.map(function (f) {
        return /*#__PURE__*/React.createElement("div", {
          key: f.id,
          style: _objectSpread(_objectSpread({}, S.srchItem), {}, {
            contentVisibility: "auto",
            containIntrinsicSize: "0 48px"
          }),
          onClick: function onClick() {
            return setRecipeIngSelected(f);
          }
        }, /*#__PURE__*/React.createElement("span", {
          style: {
            fontSize: 12,
            color: "#f59e0b",
            "float": "right"
          }
        }, fmtE(f.cal), " ", energyLabel, "/100g"), /*#__PURE__*/React.createElement("div", {
          style: {
            fontSize: 14,
            fontWeight: 500,
            color: "#e2e8f0"
          }
        }, f.name), f.source && f.source !== "usda" && /*#__PURE__*/React.createElement("div", {
          style: {
            fontSize: 11,
            color: "#475569",
            marginTop: 1
          }
        }, "Source: ", f.source.toUpperCase()));
      }));
    }), filteredIngFoods.length === 0 && /*#__PURE__*/React.createElement("div", {
      style: {
        padding: 20,
        textAlign: "center",
        color: "#475569",
        fontSize: 14
      }
    }, "No foods found for \"", recipeIngSearch, "\""))) : /*#__PURE__*/React.createElement("div", {
      style: S.section
    }, /*#__PURE__*/React.createElement("div", {
      style: S.card
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 16,
        fontWeight: 700,
        marginBottom: 4
      }
    }, recipeIngSelected.name), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: "#64748b",
        marginBottom: 16
      }
    }, recipeIngSelected.cat), /*#__PURE__*/React.createElement("label", {
      style: S.label
    }, "Amount (g)"), /*#__PURE__*/React.createElement("input", {
      style: S.input,
      type: "number",
      inputMode: "numeric",
      value: recipeIngAmount,
      onChange: function onChange(e) {
        setRecipeIngAmount(e.target.value);
        setRecipeIngServingUnit(null);
      }
    }), recipeIngSelected.servings && recipeIngSelected.servings.length > 0 && function () {
      var su = recipeIngServingUnit;
      var qty = parseInt(recipeIngServingQty, 10) || 1;
      return /*#__PURE__*/React.createElement("div", {
        style: {
          marginTop: 8,
          background: "#0f172a",
          borderRadius: 10,
          padding: "10px 12px",
          marginBottom: 4
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 11,
          color: "#64748b",
          marginBottom: 6
        }
      }, "Serving unit"), /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          gap: 6,
          flexWrap: "wrap",
          marginBottom: su != null ? 10 : 0
        }
      }, recipeIngSelected.servings.map(function (s, i) {
        return /*#__PURE__*/React.createElement("button", {
          key: s.label,
          style: S.pill(su === i),
          onClick: function onClick() {
            var newIdx = su === i ? null : i;
            setRecipeIngServingUnit(newIdx);
            if (newIdx != null) setRecipeIngAmount(String(Math.round((parseInt(recipeIngServingQty, 10) || 1) * s.grams)));
          }
        }, s.label);
      })), su != null && /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginTop: 4
        }
      }, /*#__PURE__*/React.createElement("button", {
        style: {
          width: 34,
          height: 34,
          borderRadius: 8,
          border: "1px solid #334155",
          background: "#1e293b",
          color: "#e2e8f0",
          fontSize: 20,
          lineHeight: 1,
          cursor: "pointer",
          flexShrink: 0
        },
        onClick: function onClick() {
          var next = Math.max(1, qty - 1);
          setRecipeIngServingQty(String(next));
          setRecipeIngAmount(String(Math.round(next * recipeIngSelected.servings[su].grams)));
        }
      }, "\u2212"), /*#__PURE__*/React.createElement("input", {
        type: "number",
        inputMode: "numeric",
        value: recipeIngServingQty,
        onChange: function onChange(e) {
          setRecipeIngServingQty(e.target.value);
          var n = parseInt(e.target.value, 10);
          if (n > 0) setRecipeIngAmount(String(Math.round(n * recipeIngSelected.servings[su].grams)));
        },
        style: _objectSpread(_objectSpread({}, S.input), {}, {
          width: 60,
          textAlign: "center",
          marginBottom: 0,
          padding: "6px 8px"
        })
      }), /*#__PURE__*/React.createElement("button", {
        style: {
          width: 34,
          height: 34,
          borderRadius: 8,
          border: "1px solid #334155",
          background: "#1e293b",
          color: "#e2e8f0",
          fontSize: 20,
          lineHeight: 1,
          cursor: "pointer",
          flexShrink: 0
        },
        onClick: function onClick() {
          var next = qty + 1;
          setRecipeIngServingQty(String(next));
          setRecipeIngAmount(String(Math.round(next * recipeIngSelected.servings[su].grams)));
        }
      }, "+"), /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 12,
          color: "#64748b",
          marginLeft: 2
        }
      }, "\xD7 ", recipeIngSelected.servings[su].grams, "g = ", /*#__PURE__*/React.createElement("b", {
        style: {
          color: "#e2e8f0"
        }
      }, Math.round(qty * recipeIngSelected.servings[su].grams), "g"))));
    }(), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 6,
        marginTop: 8,
        flexWrap: "wrap",
        marginBottom: 16
      }
    }, [25, 50, 100, 150, 200, 250, 300, 400, 500].map(function (q) {
      return /*#__PURE__*/React.createElement("button", {
        key: q,
        style: S.pill(recipeIngAmount === String(q) && recipeIngServingUnit == null),
        onClick: function onClick() {
          setRecipeIngAmount(String(q));
          setRecipeIngServingUnit(null);
        }
      }, q);
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        background: "#0a0f1a",
        borderRadius: 10,
        padding: 12,
        marginBottom: 16
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        fontWeight: 700,
        color: "#475569",
        marginBottom: 8,
        textTransform: "uppercase"
      }
    }, "Preview"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(5,1fr)",
        gap: 6
      }
    }, MACROS.map(function (k) {
      var _recipeIngSelected$k;
      var val = ((_recipeIngSelected$k = recipeIngSelected[k]) !== null && _recipeIngSelected$k !== void 0 ? _recipeIngSelected$k : 0) * (parseFloat(recipeIngAmount) || 0) / 100;
      return /*#__PURE__*/React.createElement("div", {
        key: k,
        style: {
          textAlign: "center"
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 14,
          fontWeight: 700,
          color: NUTRIENT_META[k].color
        }
      }, k === "cal" ? fmtE(val) : n1(val)), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 10,
          color: "#64748b"
        }
      }, k === "cal" ? energyLabel : NUTRIENT_META[k].label));
    }))), /*#__PURE__*/React.createElement("button", {
      style: {
        width: "100%",
        padding: 14,
        borderRadius: 12,
        border: "none",
        background: (parseFloat(recipeIngAmount) || 0) > 0 ? "#3b82f6" : "#1e293b",
        color: (parseFloat(recipeIngAmount) || 0) > 0 ? "#fff" : "#64748b",
        fontSize: 15,
        fontWeight: 700,
        cursor: "pointer"
      },
      disabled: (parseFloat(recipeIngAmount) || 0) <= 0,
      onClick: addIngredientToRecipe
    }, "Add to Recipe"))), /*#__PURE__*/React.createElement(BottomNav, null));
  }
  // ── EXERCISE ──────────────────────────────────────────────────────────
  if (view === "exercise") {
    var wt = parseFloat(profile.weightKg) || 70,
      act = EXERCISE_ACTIVITIES.find(function (a) {
        return a.id === exActivity;
      });
    var dur = parseFloat(exDuration) || 0,
      autoBurn = Math.round(act.met * wt * (dur / 60));
    var burn = exBurnEdit !== "" ? parseInt(exBurnEdit) || 0 : autoBurn;
    var actGroups = EXERCISE_ACTIVITIES.reduce(function (acc, a) {
      if (!acc[a.label]) acc[a.label] = [];
      acc[a.label].push(a);
      return acc;
    }, {});
    return /*#__PURE__*/React.createElement("div", {
      style: S.app
    }, /*#__PURE__*/React.createElement("div", {
      style: S.header
    }, /*#__PURE__*/React.createElement("button", {
      style: {
        background: "none",
        border: "none",
        color: "#94a3b8",
        fontSize: 15,
        cursor: "pointer"
      },
      onClick: function onClick() {
        return setView("log");
      }
    }, "\u2190 Back"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 15,
        fontWeight: 700
      }
    }, "Log Exercise"), /*#__PURE__*/React.createElement("div", {
      style: {
        width: 48
      }
    })), /*#__PURE__*/React.createElement("div", {
      style: S.section
    }, !profile.weightKg && /*#__PURE__*/React.createElement("div", {
      style: {
        background: "#2d1f00",
        border: "1px solid #f59e0b",
        borderRadius: 10,
        padding: "10px 14px",
        marginBottom: 12,
        fontSize: 12,
        color: "#f59e0b"
      }
    }, "No weight set in Settings \u2014 using 70kg default"), /*#__PURE__*/React.createElement("div", {
      style: S.card
    }, /*#__PURE__*/React.createElement("label", {
      style: S.label
    }, "Activity"), Object.entries(actGroups).map(function (_ref25) {
      var _ref26 = _slicedToArray(_ref25, 2),
        grp = _ref26[0],
        acts = _ref26[1];
      return /*#__PURE__*/React.createElement("div", {
        key: grp,
        style: {
          marginBottom: 10
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 11,
          color: "#475569",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          marginBottom: 6
        }
      }, grp), /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          gap: 6,
          flexWrap: "wrap"
        }
      }, acts.map(function (a) {
        return /*#__PURE__*/React.createElement("button", {
          key: a.id,
          style: S.pill(exActivity === a.id),
          onClick: function onClick() {
            setExActivity(a.id);
            setExBurnEdit("");
          }
        }, a.intensity);
      })));
    }), /*#__PURE__*/React.createElement("label", {
      style: _objectSpread(_objectSpread({}, S.label), {}, {
        marginTop: 8
      })
    }, "Duration (minutes)"), /*#__PURE__*/React.createElement("input", {
      style: S.input,
      type: "number",
      inputMode: "numeric",
      value: exDuration,
      onChange: function onChange(e) {
        setExDuration(e.target.value);
        setExBurnEdit("");
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 6,
        marginTop: 8,
        flexWrap: "wrap",
        marginBottom: 16
      }
    }, [30, 45, 60, 90, 120, 180].map(function (d) {
      return /*#__PURE__*/React.createElement("button", {
        key: d,
        style: S.pill(exDuration === String(d) && exBurnEdit === ""),
        onClick: function onClick() {
          setExDuration(String(d));
          setExBurnEdit("");
        }
      }, d);
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        background: "#0a0f1a",
        borderRadius: 10,
        padding: 14,
        marginBottom: 16
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        fontWeight: 700,
        color: "#475569",
        marginBottom: 10,
        textTransform: "uppercase"
      }
    }, "Estimated Burn"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 12
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 32,
        fontWeight: 700,
        color: "#4ade80"
      }
    }, fmtE(burn)), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: "#64748b"
      }
    }, energyLabel, /*#__PURE__*/React.createElement("br", null), act.label, " \xB7 ", act.intensity, /*#__PURE__*/React.createElement("br", null), dur, " min @ MET ", act.met)), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 12
      }
    }, /*#__PURE__*/React.createElement("label", {
      style: S.label
    }, "Override (optional)"), /*#__PURE__*/React.createElement("input", {
      style: S.input,
      type: "number",
      inputMode: "numeric",
      placeholder: "Auto: " + autoBurn + " " + energyLabel,
      value: exBurnEdit,
      onChange: function onChange(e) {
        return setExBurnEdit(e.target.value);
      }
    }))), /*#__PURE__*/React.createElement("button", {
      style: {
        width: "100%",
        padding: 14,
        borderRadius: 12,
        border: "none",
        background: dur > 0 ? "#16a34a" : "#1e293b",
        color: dur > 0 ? "#fff" : "#64748b",
        fontSize: 15,
        fontWeight: 700,
        cursor: "pointer"
      },
      disabled: dur <= 0,
      onClick: function onClick() {
        return addExercise(exBurnEdit !== "" ? parseInt(exBurnEdit) || autoBurn : undefined);
      }
    }, "Log Exercise"))));
  }

  // ── CUSTOM FOOD ───────────────────────────────────────────────────────
  if (view === "customAdd") {
    // Phase 9: simple mode shows the 6 values typically printed on a food
    // package; advanced mode shows all 19 NUTRIENT_META fields. The 14
    // subtype keys are never edited in the form (saved as null / preserved).
    var simpleFields = [{
      k: "cal",
      l: "Calories (kcal)"
    }, {
      k: "pro",
      l: "Protein (g)"
    }, {
      k: "carb",
      l: "Carbs (g)"
    }, {
      k: "fat",
      l: "Fat (g)"
    }, {
      k: "fib",
      l: "Fibre (g)"
    }, {
      k: "alc",
      l: "Alcohol (g)"
    }, {
      k: "water",
      l: "Water (ml)"
    }, {
      k: "sod",
      l: "Sodium (mg)"
    }];
    var advancedFields = [{
      k: "cal",
      l: "Calories (kcal)"
    }, {
      k: "pro",
      l: "Protein (g)"
    }, {
      k: "carb",
      l: "Carbs (g)"
    }, {
      k: "fat",
      l: "Fat (g)"
    }, {
      k: "fib",
      l: "Fibre (g)"
    }, {
      k: "alc",
      l: "Alcohol (g)"
    }, {
      k: "water",
      l: "Water (ml)"
    }, {
      k: "iron",
      l: "Iron (mg)"
    }, {
      k: "calc",
      l: "Calcium (mg)"
    }, {
      k: "zinc",
      l: "Zinc (mg)"
    }, {
      k: "b12",
      l: "B12 (mcg)"
    }, {
      k: "vitD",
      l: "Vitamin D (mcg)"
    }, {
      k: "omega3",
      l: "Omega-3 (g)"
    }, {
      k: "iod",
      l: "Iodine (mcg)"
    }, {
      k: "sel",
      l: "Selenium (mcg)"
    }, {
      k: "mag",
      l: "Magnesium (mg)"
    }, {
      k: "pot",
      l: "Potassium (mg)"
    }, {
      k: "fol",
      l: "Folate (mcg)"
    }, {
      k: "sod",
      l: "Sodium (mg)"
    }, {
      k: "vitA",
      l: "Vitamin A (mcg)"
    }, {
      k: "vitC",
      l: "Vitamin C (mg)"
    }];
    var fields = cfMode === "simple" ? simpleFields : advancedFields;
    var isEditing = !!editingCustomFoodId;
    return /*#__PURE__*/React.createElement("div", {
      style: S.app
    }, /*#__PURE__*/React.createElement("div", {
      style: S.header
    }, /*#__PURE__*/React.createElement("button", {
      style: {
        background: "none",
        border: "none",
        color: "#94a3b8",
        fontSize: 15,
        cursor: "pointer"
      },
      onClick: function onClick() {
        resetCfForm();
        setView("manageCustomFoods");
      }
    }, "\u2190 Back"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 15,
        fontWeight: 700
      }
    }, isEditing ? "Edit Custom Food" : "Add Custom Food"), /*#__PURE__*/React.createElement("div", {
      style: {
        width: 48
      }
    })), /*#__PURE__*/React.createElement("div", {
      style: S.section
    }, /*#__PURE__*/React.createElement("div", {
      style: S.card
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: "#64748b",
        marginBottom: 12
      }
    }, "All values per 100g or 100ml. Missing values are saved as 0; subtypes the form does not collect are saved as null (unknown) and can be added later via promotion to foods.json."), /*#__PURE__*/React.createElement("label", {
      style: S.label
    }, "Food name *"), /*#__PURE__*/React.createElement("input", {
      style: _objectSpread(_objectSpread({}, S.input), {}, {
        marginBottom: 12
      }),
      placeholder: "e.g. Alpro Oat Yogurt",
      value: cf.name,
      onChange: function onChange(e) {
        return setCf(function (p) {
          return _objectSpread(_objectSpread({}, p), {}, {
            name: e.target.value
          });
        });
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 8,
        marginBottom: 12
      }
    }, [["simple", "Simple"], ["advanced", "Advanced"]].map(function (_ref27) {
      var _ref28 = _slicedToArray(_ref27, 2),
        val = _ref28[0],
        label = _ref28[1];
      return /*#__PURE__*/React.createElement("button", {
        key: val,
        style: {
          flex: 1,
          padding: "8px 0",
          borderRadius: 8,
          border: "none",
          background: cfMode === val ? "#3b82f6" : "#1e293b",
          color: cfMode === val ? "#fff" : "#64748b",
          fontSize: 12,
          fontWeight: 700,
          cursor: "pointer"
        },
        onClick: function onClick() {
          return setCfMode(val);
        }
      }, label);
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: "#475569",
        marginBottom: 8
      }
    }, cfMode === "simple" ? "Standard values found on a food package." : "All 19 nutrient fields."), fields.map(function (_ref29) {
      var k = _ref29.k,
        l = _ref29.l;
      return /*#__PURE__*/React.createElement("div", {
        key: k,
        style: S.cfRow
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 13,
          color: "#e2e8f0",
          width: 160
        }
      }, l), /*#__PURE__*/React.createElement("input", {
        style: _objectSpread(_objectSpread({}, S.input), {}, {
          width: 90,
          textAlign: "right",
          padding: "8px 12px"
        }),
        type: "number",
        inputMode: "decimal",
        placeholder: "0",
        value: cf[k],
        onChange: function onChange(e) {
          return setCf(function (p) {
            return _objectSpread(_objectSpread({}, p), {}, _defineProperty({}, k, e.target.value));
          });
        }
      }));
    }), /*#__PURE__*/React.createElement("button", {
      style: {
        width: "100%",
        marginTop: 16,
        padding: 14,
        borderRadius: 12,
        border: "none",
        background: cf.name.trim() && cf.cal ? "#3b82f6" : "#1e293b",
        color: cf.name.trim() && cf.cal ? "#fff" : "#64748b",
        fontSize: 15,
        fontWeight: 700,
        cursor: "pointer"
      },
      onClick: saveCustomFood,
      disabled: !cf.name.trim() || !cf.cal
    }, isEditing ? "Save Changes" : "Save Food"))));
  }

  // ── GOALS ─────────────────────────────────────────────────────────────
  if (view === "goals") {
    var _wt = parseFloat(profile.weightKg) || 70;
    var ht = parseFloat(profile.heightCm) || 170;
    var hasProfile = !!(profile.weightKg && profile.heightCm && profile.age && profile.sex);
    var proMultiplierDisplay = Math.min(2.0, 1.0 + exerciseBurn / (resolvedGoals.cal || 2000));
    var sections = [{
      title: "Macros",
      keys: MACROS
    }, {
      title: "Micros",
      keys: MICROS
    }, {
      title: "Hydration",
      keys: ["water"]
    }];
    return /*#__PURE__*/React.createElement("div", {
      style: S.app
    }, /*#__PURE__*/React.createElement("div", {
      style: S.header
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 17,
        fontWeight: 700
      }
    }, "Daily Goals")), /*#__PURE__*/React.createElement("div", {
      style: S.section
    }, !hasProfile && /*#__PURE__*/React.createElement("div", {
      style: {
        background: "#1c1200",
        border: "1px solid #854d0e",
        borderRadius: 10,
        padding: "10px 14px",
        marginBottom: 12,
        fontSize: 12,
        color: "#fbbf24"
      }
    }, "\u26A0\uFE0F Complete your profile (Settings \u2192 Profile) for accurate auto-computed goals."), /*#__PURE__*/React.createElement("details", {
      style: {
        marginBottom: 12
      }
    }, /*#__PURE__*/React.createElement("summary", {
      style: {
        listStyle: "none",
        outline: "none",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px 14px",
        background: "#0f172a",
        borderRadius: 10,
        border: "1px solid #1e293b",
        userSelect: "none"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 13,
        fontWeight: 600,
        color: "#94a3b8"
      }
    }, "How goals are calculated"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 16,
        color: "#475569",
        fontWeight: 700,
        lineHeight: 1
      }
    }, "\u24D8")), /*#__PURE__*/React.createElement("div", {
      style: {
        background: "#0f172a",
        borderRadius: "0 0 10px 10px",
        padding: "10px 14px 12px",
        border: "1px solid #1e293b",
        borderTop: "none",
        marginTop: -1
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: "#64748b",
        lineHeight: 1.6,
        marginBottom: hasProfile ? 10 : 0
      }
    }, "Goals are computed from your profile using BMR/TDEE formulas and vegan-adjusted RDAs. Override any value by typing in the field \u2014 it highlights in amber. Tap \u21BA to restore."), hasProfile && /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "8px 10px",
        background: "#0a0f1a",
        borderRadius: 8,
        fontSize: 12,
        color: "#94a3b8"
      }
    }, /*#__PURE__*/React.createElement("div", null, "BMR: ", fmtE(10 * _wt + 6.25 * ht - 5 * (parseFloat(profile.age) || 30) + (profile.sex !== "Female" ? 5 : -161)), " ", energyLabel, " \xB7 TDEE base: ", fmtE(goals.cal), " ", energyLabel), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 4
      }
    }, "Protein base: ", goals.pro, "g (", _wt, "kg \xD7 1g/kg)", exerciseBurn > 0 && /*#__PURE__*/React.createElement("span", {
      style: {
        color: "#4ade80"
      }
    }, " \u2192 ", Math.round(goals.pro * proMultiplierDisplay), "g today (", proMultiplierDisplay.toFixed(2), "\xD7 multiplier)")), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 4,
        color: "#64748b"
      }
    }, "Fat: ", goals.fat, "g (25% TDEE \xF7 9) \xB7 Carbs: ", goals.carb, "g (residual) \xB7 Fibre: ", goals.fib, "g (14g/1000kcal)")))), /*#__PURE__*/React.createElement("div", {
      style: _objectSpread(_objectSpread({}, S.card), {}, {
        marginTop: 12
      })
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        fontWeight: 700,
        color: "#94a3b8",
        marginBottom: 8,
        textTransform: "uppercase",
        letterSpacing: "0.05em"
      }
    }, "Goal Presets"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: "#64748b",
        marginBottom: 10,
        lineHeight: 1.5
      }
    }, "Apply a preset to override all goals. WHO = population RDAs. Optimal = endurance-athlete levels. Your profile-based values are restored with the reset button below."), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 8
      }
    }, /*#__PURE__*/React.createElement("button", {
      style: {
        flex: 1,
        padding: 12,
        borderRadius: 10,
        border: "1px solid #1e293b",
        background: "#0f172a",
        color: "#e2e8f0",
        fontSize: 13,
        fontWeight: 600,
        cursor: "pointer"
      },
      onClick: function onClick() {
        return setGoalOverrides(_objectSpread({}, WHO_GOALS));
      }
    }, "WHO Recommended"), /*#__PURE__*/React.createElement("button", {
      style: {
        flex: 1,
        padding: 12,
        borderRadius: 10,
        border: "1px solid #1e293b",
        background: "#0f172a",
        color: "#e2e8f0",
        fontSize: 13,
        fontWeight: 600,
        cursor: "pointer"
      },
      onClick: function onClick() {
        return setGoalOverrides(_objectSpread({}, OPTIMAL_GOALS));
      }
    }, "Optimal (Athlete)"))), sections.map(function (_ref30) {
      var title = _ref30.title,
        keys = _ref30.keys;
      return /*#__PURE__*/React.createElement("div", {
        key: title,
        style: _objectSpread(_objectSpread({}, S.card), {}, {
          marginTop: 12
        })
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 13,
          fontWeight: 700,
          color: "#94a3b8",
          marginBottom: 12,
          textTransform: "uppercase",
          letterSpacing: "0.05em"
        }
      }, title), keys.map(function (k) {
        var _goals$k;
        var meta = NUTRIENT_META[k];
        var computed = (_goals$k = goals[k]) !== null && _goals$k !== void 0 ? _goals$k : 0;
        var override = goalOverrides[k];
        var hasOverride = override != null;
        return /*#__PURE__*/React.createElement("div", {
          key: k,
          style: {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "10px 0",
            borderBottom: "1px solid #1e293b"
          }
        }, /*#__PURE__*/React.createElement("div", {
          style: {
            flex: 1
          }
        }, /*#__PURE__*/React.createElement("div", {
          style: {
            fontSize: 14,
            fontWeight: 500,
            color: "#e2e8f0"
          }
        }, meta.label), /*#__PURE__*/React.createElement("div", {
          style: {
            fontSize: 11,
            color: hasOverride ? "#f59e0b" : "#475569"
          }
        }, meta.unit, hasOverride && " · override")), /*#__PURE__*/React.createElement("div", {
          style: {
            display: "flex",
            alignItems: "center",
            gap: 6
          }
        }, hasOverride && /*#__PURE__*/React.createElement("button", {
          style: {
            background: "none",
            border: "1px solid #334155",
            color: "#475569",
            fontSize: 11,
            cursor: "pointer",
            padding: "3px 7px",
            borderRadius: 6
          },
          onClick: function onClick() {
            return setGoalOverrides(function (p) {
              var n = _objectSpread({}, p);
              delete n[k];
              return n;
            });
          }
        }, "\u21BA ", computed), /*#__PURE__*/React.createElement("input", {
          style: _objectSpread(_objectSpread({}, S.input), {}, {
            width: 90,
            textAlign: "right",
            padding: "8px 12px",
            borderColor: hasOverride ? "#f59e0b" : "#1e293b"
          }),
          type: "number",
          inputMode: "decimal",
          placeholder: String(computed),
          value: hasOverride ? String(override) : "",
          onChange: function onChange(e) {
            var v = e.target.value;
            if (v === "") setGoalOverrides(function (p) {
              var n = _objectSpread({}, p);
              delete n[k];
              return n;
            });else setGoalOverrides(function (p) {
              return _objectSpread(_objectSpread({}, p), {}, _defineProperty({}, k, parseFloat(v) || 0));
            });
          }
        })));
      }));
    }), Object.keys(goalOverrides).length > 0 && /*#__PURE__*/React.createElement("button", {
      style: {
        width: "100%",
        padding: 12,
        borderRadius: 10,
        border: "1px solid #334155",
        background: "transparent",
        color: "#ef4444",
        fontSize: 13,
        fontWeight: 600,
        cursor: "pointer",
        marginTop: 12,
        marginBottom: 4
      },
      onClick: function onClick() {
        return setGoalOverrides({});
      }
    }, "Reset all overrides to computed values"), /*#__PURE__*/React.createElement("div", {
      style: _objectSpread(_objectSpread({}, S.card), {}, {
        marginTop: 12
      })
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        fontWeight: 700,
        color: "#94a3b8",
        marginBottom: 8,
        textTransform: "uppercase",
        letterSpacing: "0.05em"
      }
    }, "Exercise Refuel Ratio"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: "#475569",
        marginBottom: 12
      }
    }, "How exercise calories are split across macros. Must sum to 100. Protein uses a dynamic 1\xD7\u20132\xD7 multiplier instead."), [{
      key: "carb",
      label: "Carbs (%)",
      color: NUTRIENT_META.carb.color
    }, {
      key: "fat",
      label: "Fat (%)",
      color: NUTRIENT_META.fat.color
    }, {
      key: "pro",
      label: "Protein (%)",
      color: NUTRIENT_META.pro.color
    }].map(function (_ref31) {
      var key = _ref31.key,
        label = _ref31.label,
        color = _ref31.color;
      return /*#__PURE__*/React.createElement("div", {
        key: key,
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "8px 0",
          borderBottom: "1px solid #1e293b"
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          alignItems: "center",
          gap: 8
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          width: 10,
          height: 10,
          borderRadius: 2,
          background: color,
          flexShrink: 0
        }
      }), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 14,
          fontWeight: 500,
          color: "#e2e8f0"
        }
      }, label)), /*#__PURE__*/React.createElement("input", {
        style: _objectSpread(_objectSpread({}, S.input), {}, {
          width: 70,
          textAlign: "right",
          padding: "8px 12px"
        }),
        type: "number",
        inputMode: "numeric",
        value: exRatio[key],
        onChange: function onChange(e) {
          return setExRatio(function (prev) {
            return _objectSpread(_objectSpread({}, prev), {}, _defineProperty({}, key, parseInt(e.target.value) || 0));
          });
        }
      }));
    }), function () {
      var s = exRatio.carb + exRatio.fat + exRatio.pro,
        ok = s === 100;
      return /*#__PURE__*/React.createElement("div", {
        style: {
          padding: "8px 0",
          fontSize: 13,
          fontWeight: 600,
          color: ok ? "#10b981" : "#ef4444",
          textAlign: "right"
        }
      }, "Sum: ", s, " ", ok ? "✓" : "needs to equal 100");
    }())), /*#__PURE__*/React.createElement(BottomNav, null));
  }
  // ── EXPORT ────────────────────────────────────────────────────────────
  var handleExportData = function handleExportData() {
    var exportedAt = new Date();
    var exportDateStr = dateKey(exportedAt);

    // ── Gather all days that have at least one non-exercise entry ──────
    // (exercise entries contribute to exercise_kcal column but we still
    //  include days that have only exercise + no food if exercise_kcal > 0)
    var allDayKeys = Object.keys(logs).filter(function (dk) {
      return (logs[dk] || []).length > 0;
    }).sort();

    // ── Build per-day nutrient totals (food only, supplements separate) ─
    var csvRows = [];
    var _iterator3 = _createForOfIteratorHelper(allDayKeys),
      _step3;
    try {
      var _loop = function _loop() {
        var _food$water;
        var dk = _step3.value;
        var dayEntries = logs[dk] || [];
        // Food nutrients (excludes supplements and exercise)
        var food = {};
        NUTRIENT_ALL_KEYS.forEach(function (k) {
          return food[k] = 0;
        });
        // Supplement nutrients — keyed by nutrient key
        var supp = {};
        NUTRIENT_ALL_KEYS.forEach(function (k) {
          return supp[k] = 0;
        });
        // Exercise kcal
        var exercise_kcal = 0;
        var _iterator4 = _createForOfIteratorHelper(dayEntries),
          _step4;
        try {
          var _loop2 = function _loop2() {
              var e = _step4.value;
              if (e.type === "exercise") {
                exercise_kcal += e.calories_burned || 0;
                return 0; // continue
              }
              if (e.type === "supplement") {
                (e.items || []).forEach(function (item) {
                  Object.keys(item.nutrients || {}).forEach(function (k) {
                    var _item$nutrients$k3;
                    if (NUTRIENT_ALL_KEYS.includes(k)) supp[k] += (_item$nutrients$k3 = item.nutrients[k]) !== null && _item$nutrients$k3 !== void 0 ? _item$nutrients$k3 : 0;
                  });
                });
                return 0; // continue
              }
              // Phase 11: legacy 11a water/alcohol entry types are skipped (no longer created).
              if (e.type === "water" || e.type === "alcohol") return 0; // continue
              // food or recipe
              if (e.type === "recipe") {
                (e.derivedIngredients || []).forEach(function (ing) {
                  var m = ing.amount_g / 100;
                  if (ing.snapshot) {
                    NUTRIENT_ALL_KEYS.forEach(function (k) {
                      var _ing$snapshot$k3;
                      food[k] += ((_ing$snapshot$k3 = ing.snapshot[k]) !== null && _ing$snapshot$k3 !== void 0 ? _ing$snapshot$k3 : 0) * m;
                    });
                  } else {
                    var f = allFoods.find(function (x) {
                      return x.id === ing.foodId;
                    });
                    if (!f) return;
                    NUTRIENT_ALL_KEYS.forEach(function (k) {
                      var _f$k;
                      food[k] += ((_f$k = f[k]) !== null && _f$k !== void 0 ? _f$k : 0) * m;
                    });
                  }
                });
              } else {
                var m = (e.amount || 0) / 100;
                if (e.snapshot) {
                  NUTRIENT_ALL_KEYS.forEach(function (k) {
                    var _e$snapshot$k2;
                    food[k] += ((_e$snapshot$k2 = e.snapshot[k]) !== null && _e$snapshot$k2 !== void 0 ? _e$snapshot$k2 : 0) * m;
                  });
                } else {
                  var f = allFoods.find(function (x) {
                    return x.id === e.foodId;
                  });
                  if (!f) return 0; // continue
                  NUTRIENT_ALL_KEYS.forEach(function (k) {
                    var _f$k2;
                    food[k] += ((_f$k2 = f[k]) !== null && _f$k2 !== void 0 ? _f$k2 : 0) * m;
                  });
                }
              }
            },
            _ret;
          for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
            _ret = _loop2();
            if (_ret === 0) continue;
          }
          // Phase 11: add alcohol calories (g x 7) so exported cal matches the displayed total.
        } catch (err) {
          _iterator4.e(err);
        } finally {
          _iterator4.f();
        }
        food.cal = Math.round((food.cal + food.alc * 7) * 10) / 10;

        // Only include the day if there is something logged
        var hasFood = NUTRIENT_ALL_KEYS.some(function (k) {
          return food[k] > 0;
        });
        var hasSupp = NUTRIENT_ALL_KEYS.some(function (k) {
          return supp[k] > 0;
        });
        if (!hasFood && !hasSupp && exercise_kcal === 0) return 1; // continue

        // Round helper — empty string for true zero (no entry vs logged zero)
        var fmt = function fmt(v) {
          return v === 0 ? "" : String(Math.round(v * 1000) / 1000);
        };
        csvRows.push({
          date: dk,
          cal: fmt(food.cal),
          protein_g: fmt(food.pro),
          carbs_g: fmt(food.carb),
          fat_g: fmt(food.fat),
          fibre_g: fmt(food.fib),
          alcohol_g: fmt(food.alc),
          // Phase 11
          water_ml: fmt((_food$water = food.water) !== null && _food$water !== void 0 ? _food$water : 0),
          // Phase 11
          iron_mg: fmt(food.iron),
          calcium_mg: fmt(food.calc),
          zinc_mg: fmt(food.zinc),
          b12_mcg: fmt(food.b12),
          vitD_mcg: fmt(food.vitD),
          omega3_g: fmt(food.omega3),
          iodine_mcg: fmt(food.iod),
          selenium_mcg: fmt(food.sel),
          magnesium_mg: fmt(food.mag),
          potassium_mg: fmt(food.pot),
          folate_mcg: fmt(food.fol),
          // Supplement columns — separate from food totals (council-mandated)
          supp_b12_mcg: fmt(supp.b12),
          supp_vitD_mcg: fmt(supp.vitD),
          supp_iron_mg: fmt(supp.iron),
          supp_iodine_mcg: fmt(supp.iod),
          supp_omega3_g: fmt(supp.omega3),
          // Additional supplement nutrients that the system can track
          supp_cal_kcal: fmt(supp.cal),
          supp_protein_g: fmt(supp.pro),
          supp_zinc_mg: fmt(supp.zinc),
          supp_calc_mg: fmt(supp.calc),
          supp_mag_mg: fmt(supp.mag),
          supp_pot_mg: fmt(supp.pot),
          supp_fol_mcg: fmt(supp.fol),
          supp_sel_mcg: fmt(supp.sel),
          exercise_kcal: fmt(exercise_kcal)
        });
      };
      for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
        if (_loop()) continue;
      }

      // ── Build CSV string ───────────────────────────────────────────────
    } catch (err) {
      _iterator3.e(err);
    } finally {
      _iterator3.f();
    }
    var csvEscape = function csvEscape(v) {
      var s = String(v);
      return s.includes(",") || s.includes('"') || s.includes('\n') ? "\"".concat(s.replace(/"/g, '""'), "\"") : s;
    };
    var csvHeaders = ["date", "cal", "protein_g", "carbs_g", "fat_g", "fibre_g", "alcohol_g", "water_ml", "iron_mg", "calcium_mg", "zinc_mg", "b12_mcg", "vitD_mcg", "omega3_g", "iodine_mcg", "selenium_mcg", "magnesium_mg", "potassium_mg", "folate_mcg", "supp_b12_mcg", "supp_vitD_mcg", "supp_iron_mg", "supp_iodine_mcg", "supp_omega3_g", "supp_cal_kcal", "supp_protein_g", "supp_zinc_mg", "supp_calc_mg", "supp_mag_mg", "supp_pot_mg", "supp_fol_mcg", "supp_sel_mcg", "exercise_kcal"];
    var csvBody = [csvHeaders.join(",")].concat(_toConsumableArray(csvRows.map(function (row) {
      return csvHeaders.map(function (h) {
        var _row$h;
        return csvEscape((_row$h = row[h]) !== null && _row$h !== void 0 ? _row$h : "");
      }).join(",");
    }))).join("\n");

    // ── Build JSON object ──────────────────────────────────────────────
    var jsonObj = {
      version: "1.0",
      exported_at: exportedAt.toISOString(),
      logs: logs,
      recipes: recipes,
      customFoods: customFoods,
      profile: profile,
      exRatio: exRatio,
      supplementStacks: supplementStacks,
      notionStatus: {
        lastSyncedAt: lastSyncedAt
      }
    };

    // ── Bundle both files into a single zip and trigger one download ───
    var zipFilename = "nutritrack-".concat(exportDateStr, ".zip");
    var csvFilename = "nutritrack-daily-".concat(exportDateStr, ".csv");
    var jsonFilename = "nutritrack-full-".concat(exportDateStr, ".json");
    var sortedDays = allDayKeys.filter(function (dk) {
      return csvRows.find(function (r) {
        return r.date === dk;
      });
    });
    var doZipDownload = function doZipDownload(JSZip) {
      var zip = new JSZip();
      zip.file(csvFilename, csvBody);
      zip.file(jsonFilename, JSON.stringify(jsonObj, null, 2));
      zip.generateAsync({
        type: "blob"
      }).then(function (blob) {
        var url = URL.createObjectURL(blob);
        var a = document.createElement("a");
        a.href = url;
        a.download = zipFilename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setTimeout(function () {
          return URL.revokeObjectURL(url);
        }, 10000);
        // ── Persist timestamp & show confirmation only on success ──────
        var isoNow = exportedAt.toISOString();
        setLastExportedAt(isoNow);
        saveData(STORAGE_KEYS.lastExportedAt, isoNow);
        setExportConfirm({
          zipFile: zipFilename,
          csvFile: csvFilename,
          jsonFile: jsonFilename,
          csvRows: csvRows.length,
          jsonEntries: Object.values(logs).flat().length,
          dateFrom: sortedDays.length > 0 ? sortedDays[0] : null,
          dateTo: sortedDays.length > 0 ? sortedDays[sortedDays.length - 1] : null
        });
      });
    };

    // Load JSZip from cdnjs if not already present, then zip
    if (window.JSZip) {
      doZipDownload(window.JSZip);
    } else {
      var script = document.createElement("script");
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js";
      script.integrity = "sha384-rRoXxn2yHlrZYB587Ki9RO1tONhLdM6XfORg7Rw4uwH4/Fh/5nP7IUX91bkaKUgs";
      script.crossOrigin = "anonymous";
      script.onload = function () {
        return doZipDownload(window.JSZip);
      };
      script.onerror = function () {
        return alert("Export failed: JSZip could not be loaded. Connect to the internet and try again.");
      };
      document.head.appendChild(script);
    }
  };

  // ── SETTINGS ──────────────────────────────────────────────────────────
  if (view === "settings") {
    var formatSyncTime = function formatSyncTime(iso) {
      if (!iso) return "Never";
      var d = new Date(iso);
      return d.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short"
      }) + " at " + d.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit"
      });
    };
    return /*#__PURE__*/React.createElement("div", {
      style: S.app
    }, globalBanners, /*#__PURE__*/React.createElement("div", {
      style: S.header
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 17,
        fontWeight: 700
      }
    }, "Settings")), /*#__PURE__*/React.createElement("div", {
      style: S.section
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        fontWeight: 700,
        color: "#94a3b8",
        textTransform: "uppercase",
        letterSpacing: "0.05em",
        marginBottom: 10,
        marginTop: 4
      }
    }, "Profile"), /*#__PURE__*/React.createElement("div", {
      style: S.card
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: "#64748b",
        marginBottom: 16
      }
    }, "Used to personalise exercise calorie burn estimates."), /*#__PURE__*/React.createElement("label", {
      style: S.label
    }, "Weight (kg)"), /*#__PURE__*/React.createElement("input", {
      style: _objectSpread(_objectSpread({}, S.input), {}, {
        marginBottom: 4
      }),
      type: "number",
      inputMode: "decimal",
      placeholder: "e.g. 75",
      value: profile.weightKg,
      onChange: function onChange(e) {
        return setProfile(function (p) {
          return _objectSpread(_objectSpread({}, p), {}, {
            weightKg: e.target.value
          });
        });
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: "#475569",
        marginBottom: 12
      }
    }, "Used to calculate your BMR and adjust calorie goals."), /*#__PURE__*/React.createElement("label", {
      style: S.label
    }, "Height (cm)"), /*#__PURE__*/React.createElement("input", {
      style: _objectSpread(_objectSpread({}, S.input), {}, {
        marginBottom: 16
      }),
      type: "number",
      inputMode: "decimal",
      placeholder: "e.g. 175",
      value: profile.heightCm || "",
      onChange: function onChange(e) {
        return setProfile(function (p) {
          return _objectSpread(_objectSpread({}, p), {}, {
            heightCm: e.target.value
          });
        });
      }
    }), /*#__PURE__*/React.createElement("label", {
      style: S.label
    }, "Age"), /*#__PURE__*/React.createElement("input", {
      style: _objectSpread(_objectSpread({}, S.input), {}, {
        marginBottom: 4
      }),
      type: "number",
      inputMode: "numeric",
      placeholder: "e.g. 30",
      value: profile.age,
      onChange: function onChange(e) {
        return setProfile(function (p) {
          return _objectSpread(_objectSpread({}, p), {}, {
            age: e.target.value
          });
        });
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: "#475569",
        marginBottom: 12
      }
    }, "Used in the Mifflin-St Jeor BMR formula."), /*#__PURE__*/React.createElement("label", {
      style: S.label
    }, "Sex"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 8,
        flexWrap: "wrap",
        marginBottom: 4
      }
    }, ["Male", "Female", "Other", "Prefer not to say"].map(function (opt) {
      return /*#__PURE__*/React.createElement("button", {
        key: opt,
        style: S.pill(profile.sex === opt),
        onClick: function onClick() {
          return setProfile(function (p) {
            return _objectSpread(_objectSpread({}, p), {}, {
              sex: opt
            });
          });
        }
      }, opt);
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: "#475569"
      }
    }, "Used in the BMR formula (different constants for male/female).")), profile.weightKg && /*#__PURE__*/React.createElement("div", {
      style: _objectSpread(_objectSpread({}, S.card), {}, {
        background: "#0f172a"
      })
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        fontWeight: 700,
        color: "#94a3b8",
        marginBottom: 10,
        textTransform: "uppercase",
        letterSpacing: "0.05em"
      }
    }, "Summary"), profile.weightKg && /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 14,
        color: "#e2e8f0",
        marginBottom: 4
      }
    }, "\u2696\uFE0F ", profile.weightKg, " kg"), profile.heightCm && /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 14,
        color: "#e2e8f0",
        marginBottom: 4
      }
    }, "\uD83D\uDCCF ", profile.heightCm, " cm"), profile.age && /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 14,
        color: "#e2e8f0",
        marginBottom: 4
      }
    }, "\uD83C\uDF82 ", profile.age, " years old"), profile.sex && /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 14,
        color: "#e2e8f0",
        marginBottom: 4
      }
    }, "\u26A7 ", profile.sex), (!profile.weightKg || !profile.heightCm) && /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: "#f59e0b",
        marginTop: 6
      }
    }, "\u26A0\uFE0F Add weight and height to enable accurate goal computation")), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        fontWeight: 700,
        color: "#94a3b8",
        textTransform: "uppercase",
        letterSpacing: "0.05em",
        marginBottom: 10,
        marginTop: 16
      }
    }, "Display"), /*#__PURE__*/React.createElement("div", {
      style: S.card
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: "#64748b",
        marginBottom: 14
      }
    }, "Advanced mode shows data-quality indicators (e.g. unknown-contribution arcs on nutrient rings). Simplified mode hides these \u2014 tap a ring to see details."), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 8
      }
    }, [["advanced", "Advanced"], ["simplified", "Simplified"]].map(function (_ref32) {
      var _ref33 = _slicedToArray(_ref32, 2),
        val = _ref33[0],
        label = _ref33[1];
      return /*#__PURE__*/React.createElement("button", {
        key: val,
        style: {
          flex: 1,
          padding: "10px 0",
          borderRadius: 10,
          border: "none",
          background: displayMode === val ? "#3b82f6" : "#1e293b",
          color: displayMode === val ? "#fff" : "#64748b",
          fontSize: 13,
          fontWeight: 700,
          cursor: "pointer"
        },
        onClick: function onClick() {
          return setDisplayMode(val);
        }
      }, label);
    }))), /*#__PURE__*/React.createElement("div", {
      style: S.card
    }, /*#__PURE__*/React.createElement("label", {
      style: S.label
    }, "Energy unit"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 8,
        marginBottom: 4
      }
    }, [["kcal", "kcal"], ["kJ", "kJ"]].map(function (_ref34) {
      var _ref35 = _slicedToArray(_ref34, 2),
        val = _ref35[0],
        label = _ref35[1];
      return /*#__PURE__*/React.createElement("button", {
        key: val,
        style: {
          flex: 1,
          padding: "10px 0",
          borderRadius: 10,
          border: "none",
          background: energyUnit === val ? "#3b82f6" : "#1e293b",
          color: energyUnit === val ? "#fff" : "#64748b",
          fontSize: 13,
          fontWeight: 700,
          cursor: "pointer"
        },
        onClick: function onClick() {
          return setEnergyUnit(val);
        }
      }, label);
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: "#475569"
      }
    }, "Converts all energy displays. Internal values stay in kcal. (1 kcal = 4.184 kJ)")), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        fontWeight: 700,
        color: "#94a3b8",
        textTransform: "uppercase",
        letterSpacing: "0.05em",
        marginBottom: 10,
        marginTop: 16
      }
    }, "Supplements"), /*#__PURE__*/React.createElement("div", {
      style: S.card
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: "#64748b",
        marginBottom: 12
      }
    }, "Define supplement stacks to log quickly. Nutrient contributions are added to daily totals."), supplementStacks.map(function (stack) {
      return /*#__PURE__*/React.createElement("div", {
        key: stack.id,
        style: {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 0",
          borderBottom: "1px solid #1e293b",
          cursor: "pointer"
        },
        onClick: function onClick() {
          return openStackEditor(stack);
        }
      }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 14,
          fontWeight: 600,
          color: "#c4b5fd"
        }
      }, "\uD83D\uDC8A ", stack.name), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 12,
          color: "#64748b",
          marginTop: 2
        }
      }, stack.items.length === 0 ? "Empty — tap to add items" : "".concat(stack.items.length, " item").concat(stack.items.length === 1 ? "" : "s"))), /*#__PURE__*/React.createElement("div", {
        style: {
          color: "#475569",
          fontSize: 16
        }
      }, "\u203A"));
    }), /*#__PURE__*/React.createElement("button", {
      style: {
        width: "100%",
        marginTop: 12,
        padding: 10,
        borderRadius: 10,
        border: "1px dashed #334155",
        background: "transparent",
        color: "#94a3b8",
        fontSize: 13,
        fontWeight: 600,
        cursor: "pointer"
      },
      onClick: function onClick() {
        return openStackEditor(null);
      }
    }, "+ Add stack")), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        fontWeight: 700,
        color: "#94a3b8",
        textTransform: "uppercase",
        letterSpacing: "0.05em",
        marginBottom: 10,
        marginTop: 16
      }
    }, "Notion Recipe Import"), /*#__PURE__*/React.createElement("div", {
      style: S.card
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        paddingBottom: 12,
        marginBottom: 12,
        borderBottom: "1px solid #1e293b"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 13,
        color: "#94a3b8"
      }
    }, "Last synced"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 13,
        color: lastSyncedAt ? "#10b981" : "#475569",
        fontWeight: 600
      }
    }, formatSyncTime(lastSyncedAt))), syncQueue.length > 0 && /*#__PURE__*/React.createElement("div", {
      style: {
        background: "#1c1a00",
        border: "1px solid #854d0e",
        borderRadius: 10,
        padding: "10px 14px",
        marginBottom: 12,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        color: "#fbbf24",
        fontWeight: 600
      }
    }, "\u23F3 ", syncQueue.length, " ", syncQueue.length === 1 ? "request" : "requests", " queued"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: "#78716c",
        marginTop: 2
      }
    }, "Will process when back online")), /*#__PURE__*/React.createElement("button", {
      style: {
        background: "none",
        border: "1px solid #854d0e",
        borderRadius: 8,
        color: "#f59e0b",
        fontSize: 11,
        fontWeight: 600,
        padding: "4px 10px",
        cursor: "pointer"
      },
      onClick: clearSyncQueue
    }, "Clear")), notionSyncMsg && /*#__PURE__*/React.createElement("div", {
      style: {
        background: notionSyncMsg.type === "error" ? "#2d0f0f" : "#0f1f2d",
        border: "1px solid ".concat(notionSyncMsg.type === "error" ? "#7f1d1d" : "#1d4ed8"),
        borderRadius: 10,
        padding: "10px 14px",
        marginBottom: 12,
        fontSize: 13,
        color: notionSyncMsg.type === "error" ? "#fca5a5" : "#93c5fd"
      }
    }, notionSyncMsg.text), syncProgress && /*#__PURE__*/React.createElement("div", {
      style: {
        background: "#0f1f2d",
        border: "1px solid #1d4ed8",
        borderRadius: 10,
        padding: "12px 14px",
        marginBottom: 12
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        color: "#93c5fd",
        fontWeight: 600,
        marginBottom: 6
      }
    }, syncProgress.phase === "connecting" && "Connecting to Notion…", syncProgress.phase === "listing" && "Looking for new and changed recipes…", syncProgress.phase === "fetching" && "Fetching ".concat(syncProgress.current, " of ").concat(syncProgress.total, " recipes\u2026"), syncProgress.phase === "parsing" && "Parsing ingredients (".concat(syncProgress.current, " of ").concat(syncProgress.total, ")\u2026")), syncProgress.total > 0 && /*#__PURE__*/React.createElement("div", {
      style: {
        height: 6,
        borderRadius: 3,
        background: "#1e293b",
        overflow: "hidden"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        height: "100%",
        background: "#3b82f6",
        borderRadius: 3,
        width: "".concat(Math.round(syncProgress.current / Math.max(syncProgress.total, 1) * 100), "%"),
        transition: "width 0.3s ease"
      }
    }))), /*#__PURE__*/React.createElement("button", {
      style: {
        width: "100%",
        padding: 14,
        borderRadius: 12,
        border: "none",
        background: syncInProgress || !isOnline ? "#1e293b" : "#7c3aed",
        color: syncInProgress || !isOnline ? "#64748b" : "#fff",
        fontSize: 15,
        fontWeight: 700,
        cursor: syncInProgress || !isOnline ? "default" : "pointer",
        marginBottom: 8
      },
      disabled: syncInProgress || !isOnline,
      onClick: handleWorkerSync
    }, syncInProgress ? "Syncing…" : lastSyncedAt ? "Sync new and changed recipes" : "Sync all recipes from Notion"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 8,
        marginBottom: 14
      }
    }, /*#__PURE__*/React.createElement("button", {
      style: {
        flex: 1,
        padding: "10px 12px",
        borderRadius: 10,
        border: "1px solid #334155",
        background: "transparent",
        color: syncInProgress || !isOnline ? "#475569" : "#94a3b8",
        fontSize: 12,
        fontWeight: 600,
        cursor: syncInProgress || !isOnline ? "default" : "pointer"
      },
      disabled: syncInProgress || !isOnline,
      onClick: handleTestConnection
    }, "Test connection"), lastSyncedAt && /*#__PURE__*/React.createElement("button", {
      style: {
        flex: 1,
        padding: "10px 12px",
        borderRadius: 10,
        border: "1px solid #334155",
        background: "transparent",
        color: syncInProgress ? "#475569" : "#94a3b8",
        fontSize: 12,
        fontWeight: 600,
        cursor: syncInProgress ? "default" : "pointer"
      },
      disabled: syncInProgress,
      onClick: handleResetSyncHistory
    }, "Reset sync history")), /*#__PURE__*/React.createElement("details", {
      style: {
        marginTop: 6
      }
    }, /*#__PURE__*/React.createElement("summary", {
      style: {
        fontSize: 12,
        color: "#64748b",
        cursor: "pointer",
        padding: "8px 0",
        listStyle: "none",
        outline: "none",
        userSelect: "none"
      }
    }, "\u25B8 Manual import (fallback)"), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 8
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        background: "#451a03",
        border: "1px solid #92400e",
        borderRadius: 8,
        padding: "10px 12px",
        marginBottom: 10,
        fontSize: 12,
        color: "#fcd34d",
        lineHeight: 1.5
      }
    }, "\u26A0\uFE0F Paste-based import is parsed locally on-device. Use markdown headings (#) or a title followed by a colon to split multiple recipes. Nothing is sent to any server."), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: "#64748b",
        marginBottom: 8,
        lineHeight: 1.5
      }
    }, "Paste ingredient text from any source."), /*#__PURE__*/React.createElement("textarea", {
      style: {
        width: "100%",
        background: "#1e293b",
        border: "1px solid #334155",
        borderRadius: 10,
        padding: "12px 14px",
        color: "#e2e8f0",
        fontSize: 13,
        outline: "none",
        boxSizing: "border-box",
        minHeight: 100,
        resize: "vertical",
        fontFamily: "inherit"
      },
      placeholder: "e.g.\n50 g of flour\n1 tsp cornstarch",
      value: pasteText,
      onChange: function onChange(e) {
        return setPasteText(e.target.value);
      }
    }), /*#__PURE__*/React.createElement("button", {
      style: {
        width: "100%",
        marginTop: 8,
        padding: 12,
        borderRadius: 10,
        border: "1px solid #334155",
        background: pasteText.trim() && !syncInProgress ? "transparent" : "#0f1729",
        color: pasteText.trim() && !syncInProgress ? "#94a3b8" : "#475569",
        fontSize: 13,
        fontWeight: 600,
        cursor: pasteText.trim() && !syncInProgress ? "pointer" : "default"
      },
      disabled: !pasteText.trim() || syncInProgress,
      onClick: handlePasteSync
    }, syncInProgress ? "Working…" : "Parse pasted text"))), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: "#334155",
        textAlign: "center",
        marginTop: 14
      }
    }, recipes.length, " ", recipes.length === 1 ? "recipe" : "recipes", " stored locally")), function () {
      var bytes = storageEstimate; // number | null
      var usageStr = bytes == null ? null : bytes < 1024 ? "".concat(bytes, " bytes") : bytes < 1024 * 1024 ? "".concat((bytes / 1024).toFixed(1), " KB") : "".concat((bytes / 1024 / 1024).toFixed(2), " MB");
      // Thresholds vs a 5 MB practical localStorage cap (conservative iOS estimate)
      var CAP_BYTES = 5 * 1024 * 1024;
      var pct = bytes != null ? bytes / CAP_BYTES * 100 : null;
      var status = pct == null ? "unknown" : pct >= STORAGE_CRIT_PCT ? "red" : pct >= STORAGE_WARN_PCT ? "yellow" : "green";
      var statusColor = {
        green: "#10b981",
        yellow: "#f59e0b",
        red: "#ef4444",
        unknown: "#64748b"
      }[status];
      var statusText = {
        green: "Storage healthy",
        yellow: "Storage approaching limit — consider exporting and reviewing data",
        red: "Storage near full — export now",
        unknown: "Storage usage unavailable"
      }[status];
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 13,
          fontWeight: 700,
          color: "#94a3b8",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          marginBottom: 10,
          marginTop: 16
        }
      }, "Storage"), /*#__PURE__*/React.createElement("div", {
        style: S.card
      }, bytes != null ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 13,
          color: "#94a3b8",
          marginBottom: 8
        }
      }, "Using ", /*#__PURE__*/React.createElement("span", {
        style: {
          color: "#e2e8f0",
          fontWeight: 600
        }
      }, usageStr), " of NutriTrack data ", /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 11,
          color: "#475569"
        }
      }, "(vs 5 MB cap)")), /*#__PURE__*/React.createElement("div", {
        style: {
          height: 6,
          borderRadius: 3,
          background: "#1e293b",
          overflow: "hidden",
          marginBottom: 10
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          height: "100%",
          background: statusColor,
          borderRadius: 3,
          width: "".concat(Math.min(pct, 100), "%"),
          transition: "width 0.4s ease"
        }
      })), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 13,
          color: statusColor,
          fontWeight: 600
        }
      }, statusText), status === "red" && /*#__PURE__*/React.createElement("button", {
        style: {
          width: "100%",
          marginTop: 10,
          padding: 12,
          borderRadius: 10,
          border: "none",
          background: "#0f766e",
          color: "#fff",
          fontSize: 14,
          fontWeight: 700,
          cursor: "pointer"
        },
        onClick: handleExportData
      }, "Export now")) : /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 13,
          color: "#64748b"
        }
      }, "Storage usage information not available on this device.")));
    }(), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        fontWeight: 700,
        color: "#94a3b8",
        textTransform: "uppercase",
        letterSpacing: "0.05em",
        marginBottom: 10,
        marginTop: 16
      }
    }, "Developer"), validationWarning && /*#__PURE__*/React.createElement("div", {
      style: {
        background: "#1c1000",
        border: "1px solid #92400e",
        borderRadius: 12,
        padding: "12px 14px",
        marginBottom: 10
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        color: "#fbbf24",
        fontWeight: 600,
        marginBottom: 6
      }
    }, "\u26A0\uFE0F Storage validation warning"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: "#92400e",
        marginBottom: 10,
        lineHeight: 1.5
      }
    }, function () {
      var hasUnparseable = Object.values(STORAGE_KEYS).some(function (k) {
        try {
          var _r2 = localStorage.getItem(k);
          if (_r2 === null) return false;
          JSON.parse(_r2);
          return false;
        } catch (_unused6) {
          return true;
        }
      });
      return hasUnparseable ? "A storage key contains invalid data. Tap below to remove only the bad key and reload. Your other data is untouched." : "A storage key has an unexpected shape. Your data is intact — tap below to reload and clear the warning.";
    }()), /*#__PURE__*/React.createElement("button", {
      style: {
        width: "100%",
        padding: 10,
        borderRadius: 10,
        border: "none",
        background: "#7c2d12",
        color: "#fed7aa",
        fontSize: 13,
        fontWeight: 700,
        cursor: "pointer"
      },
      onClick: function onClick() {
        // If a backup exists from the inject, restore it first.
        // nt-logs-backup is intentionally excluded from STORAGE_KEYS — it is a
        // debug-only ephemeral key. Including it would cause the corruptedKeys guard,
        // storage indicator, and export bundle to treat it as app data.
        var backup = localStorage.getItem("nt-logs-backup");
        if (backup !== null) {
          localStorage.setItem(STORAGE_KEYS.logs, backup);
          localStorage.removeItem("nt-logs-backup");
        }
        // Remove any keys that are genuinely unparseable
        var unparseable = Object.values(STORAGE_KEYS).filter(function (k) {
          try {
            var _r3 = localStorage.getItem(k);
            if (_r3 === null) return false;
            JSON.parse(_r3);
            return false;
          } catch (_unused7) {
            return true;
          }
        });
        unparseable.forEach(function (k) {
          return localStorage.removeItem(k);
        });
        // Fix any shape mismatches by resetting to correct empty shape
        // (covers leftover inject artifacts from previous sessions)
        var logsRaw = localStorage.getItem(STORAGE_KEYS.logs);
        if (logsRaw !== null) {
          try {
            var v = JSON.parse(logsRaw);
            if (Array.isArray(v)) localStorage.setItem(STORAGE_KEYS.logs, "{}");
          } catch (_unused8) {/* already handled above */}
        }
        var recipesRaw = localStorage.getItem(STORAGE_KEYS.recipes);
        if (recipesRaw !== null) {
          try {
            var _v2 = JSON.parse(recipesRaw);
            if (!Array.isArray(_v2)) localStorage.setItem(STORAGE_KEYS.recipes, "[]");
          } catch (_unused9) {/* already handled above */}
        }
        var customRaw = localStorage.getItem(STORAGE_KEYS.customFoods);
        if (customRaw !== null) {
          try {
            var _v3 = JSON.parse(customRaw);
            if (!Array.isArray(_v3)) localStorage.setItem(STORAGE_KEYS.customFoods, "[]");
          } catch (_unused0) {/* already handled above */}
        }
        window.location.reload();
      }
    }, function () {
      var hasUnparseable = Object.values(STORAGE_KEYS).some(function (k) {
        try {
          var _r4 = localStorage.getItem(k);
          if (_r4 === null) return false;
          JSON.parse(_r4);
          return false;
        } catch (_unused1) {
          return true;
        }
      });
      return hasUnparseable ? "Clear corrupted key and reload" : "Reload and clear warning";
    }())), /*#__PURE__*/React.createElement("details", null, /*#__PURE__*/React.createElement("summary", {
      style: {
        fontSize: 12,
        color: "#475569",
        cursor: "pointer",
        padding: "4px 0",
        listStyle: "none",
        outline: "none",
        userSelect: "none",
        marginBottom: 8
      }
    }, "\u25B8 Debug tools"), /*#__PURE__*/React.createElement("div", {
      style: S.card
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: "#64748b",
        marginBottom: 12,
        lineHeight: 1.5
      }
    }, "One-use-per-session failure injection for testing the storage validation banner. Each inject backs up the current value so recovery can restore it."), /*#__PURE__*/React.createElement("button", {
      style: {
        width: "100%",
        marginBottom: 8,
        padding: 10,
        borderRadius: 10,
        border: "1px solid #334155",
        background: dbgCorruptUsed ? "#0f1729" : "transparent",
        color: dbgCorruptUsed ? "#475569" : "#94a3b8",
        fontSize: 13,
        fontWeight: 600,
        cursor: dbgCorruptUsed ? "default" : "pointer"
      },
      disabled: dbgCorruptUsed,
      onClick: function onClick() {
        if (dbgCorruptUsed) return;
        var current = localStorage.getItem(STORAGE_KEYS.logs);
        if (current !== null) localStorage.setItem("nt-logs-backup", current);
        localStorage.setItem(STORAGE_KEYS.logs, "!!NOT_JSON!!");
        setDbgCorruptUsed(true);
        console.log("[NutriTrack][debug] Corrupted value injected into nt-logs. Backup saved to nt-logs-backup. Reload to see validation banner.");
      }
    }, dbgCorruptUsed ? "Corrupt inject — used ✓" : "Inject corrupted value"), /*#__PURE__*/React.createElement("button", {
      style: {
        width: "100%",
        padding: 10,
        borderRadius: 10,
        border: "1px solid #334155",
        background: dbgShapeUsed ? "#0f1729" : "transparent",
        color: dbgShapeUsed ? "#475569" : "#94a3b8",
        fontSize: 13,
        fontWeight: 600,
        cursor: dbgShapeUsed ? "default" : "pointer"
      },
      disabled: dbgShapeUsed,
      onClick: function onClick() {
        if (dbgShapeUsed) return;
        var current = localStorage.getItem(STORAGE_KEYS.logs);
        if (current !== null) localStorage.setItem("nt-logs-backup", current);
        localStorage.setItem(STORAGE_KEYS.logs, JSON.stringify([]));
        setDbgShapeUsed(true);
        console.log("[NutriTrack][debug] Shape mismatch injected into nt-logs. Backup saved to nt-logs-backup. Reload to see validation banner.");
      }
    }, dbgShapeUsed ? "Shape inject — used ✓" : "Inject shape mismatch"), localStorage.getItem("nt-logs-backup") !== null && /*#__PURE__*/React.createElement("button", {
      style: {
        width: "100%",
        marginTop: 8,
        padding: 10,
        borderRadius: 10,
        border: "1px solid #334155",
        background: "#0a2010",
        color: "#4ade80",
        fontSize: 13,
        fontWeight: 600,
        cursor: "pointer"
      },
      onClick: function onClick() {
        var backup = localStorage.getItem("nt-logs-backup");
        if (backup !== null) {
          localStorage.setItem(STORAGE_KEYS.logs, backup);
          localStorage.removeItem("nt-logs-backup");
        }
        window.location.reload();
      }
    }, "\u21A9 Restore nt-logs from backup and reload"), /*#__PURE__*/React.createElement("div", {
      style: {
        borderTop: "1px solid #1e293b",
        marginTop: 12,
        paddingTop: 12
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: "#475569",
        fontWeight: 600,
        marginBottom: 6,
        textTransform: "uppercase",
        letterSpacing: "0.04em"
      }
    }, "Storage key readout"), Object.entries(STORAGE_KEYS).map(function (_ref36) {
      var _ref37 = _slicedToArray(_ref36, 2),
        name = _ref37[0],
        key = _ref37[1];
      var raw = localStorage.getItem(key);
      var status, preview;
      if (raw === null) {
        status = "missing";
        preview = "—";
      } else {
        try {
          var v = JSON.parse(raw);
          var t = Array.isArray(v) ? "array" : _typeof(v);
          status = "ok";
          preview = "".concat(t, " \xB7 ").concat(raw.length, " chars");
        } catch (_unused10) {
          status = "error";
          preview = raw.slice(0, 30);
        }
      }
      return /*#__PURE__*/React.createElement("div", {
        key: key,
        style: {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          padding: "3px 0",
          borderBottom: "1px solid #0f172a"
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 11,
          color: "#64748b",
          fontFamily: "monospace"
        }
      }, key), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 11,
          color: status === "error" ? "#ef4444" : status === "missing" ? "#334155" : "#94a3b8",
          fontFamily: "monospace",
          textAlign: "right",
          maxWidth: "55%",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap"
        }
      }, preview));
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        borderTop: "1px solid #1e293b",
        marginTop: 12,
        paddingTop: 12
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: "#64748b",
        marginBottom: 8,
        lineHeight: 1.5
      }
    }, "Test regex ingredient parser \u2014 paste lines (one per line)."), /*#__PURE__*/React.createElement("textarea", {
      style: {
        width: "100%",
        background: "#1e293b",
        border: "1px solid #334155",
        borderRadius: 10,
        padding: "12px 14px",
        color: "#e2e8f0",
        fontSize: 13,
        outline: "none",
        boxSizing: "border-box",
        minHeight: 80,
        resize: "vertical",
        fontFamily: "inherit"
      },
      placeholder: "200g cherry tomatoes\n1 capsicum\n2 medium onions",
      value: parserTestText,
      onChange: function onChange(e) {
        return setParserTestText(e.target.value);
      }
    }), /*#__PURE__*/React.createElement("button", {
      style: {
        width: "100%",
        marginTop: 8,
        padding: 10,
        borderRadius: 10,
        border: "1px solid #334155",
        background: parserTestText.trim() && !syncInProgress ? "transparent" : "#0f1729",
        color: parserTestText.trim() && !syncInProgress ? "#94a3b8" : "#475569",
        fontSize: 13,
        fontWeight: 600,
        cursor: parserTestText.trim() && !syncInProgress ? "pointer" : "default"
      },
      disabled: !parserTestText.trim() || syncInProgress,
      onClick: handleParserTest
    }, syncInProgress ? "Working…" : "Run parser")), /*#__PURE__*/React.createElement("div", {
      style: {
        borderTop: "1px solid #1e293b",
        marginTop: 12,
        paddingTop: 12
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: "#475569",
        fontWeight: 600,
        marginBottom: 4,
        textTransform: "uppercase",
        letterSpacing: "0.04em"
      }
    }, "Inject test error"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: "#64748b",
        marginBottom: 8,
        lineHeight: 1.5
      }
    }, "Surfaces the friendly error message (and logs it) for each error type. Works offline \u2014 no network needed."), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 6
      }
    }, /*#__PURE__*/React.createElement("button", {
      style: {
        padding: 8,
        borderRadius: 8,
        border: "1px solid #334155",
        background: "#0f1729",
        color: "#94a3b8",
        fontSize: 11,
        fontWeight: 600,
        cursor: "pointer"
      },
      onClick: function onClick() {
        setNotionSyncMsg({
          type: "error",
          text: friendlyError(new Error("network: fetch failed"), "injectTest")
        });
        setErrorLogsVersion(function (v) {
          return v + 1;
        });
      }
    }, "network"), /*#__PURE__*/React.createElement("button", {
      style: {
        padding: 8,
        borderRadius: 8,
        border: "1px solid #334155",
        background: "#0f1729",
        color: "#94a3b8",
        fontSize: 11,
        fontWeight: 600,
        cursor: "pointer"
      },
      onClick: function onClick() {
        setNotionSyncMsg({
          type: "error",
          text: friendlyError(new Error("worker_502: notion_unreachable"), "injectTest")
        });
        setErrorLogsVersion(function (v) {
          return v + 1;
        });
      }
    }, "worker_502"), /*#__PURE__*/React.createElement("button", {
      style: {
        padding: 8,
        borderRadius: 8,
        border: "1px solid #334155",
        background: "#0f1729",
        color: "#94a3b8",
        fontSize: 11,
        fontWeight: 600,
        cursor: "pointer"
      },
      onClick: function onClick() {
        setNotionSyncMsg({
          type: "error",
          text: friendlyError(new Error("worker_403: forbidden"), "injectTest")
        });
        setErrorLogsVersion(function (v) {
          return v + 1;
        });
      }
    }, "worker_403"), /*#__PURE__*/React.createElement("button", {
      style: {
        padding: 8,
        borderRadius: 8,
        border: "1px solid #334155",
        background: "#0f1729",
        color: "#94a3b8",
        fontSize: 11,
        fontWeight: 600,
        cursor: "pointer"
      },
      onClick: function onClick() {
        setNotionSyncMsg({
          type: "error",
          text: friendlyError(new Error("foods.json fetch failed: 404"), "injectTest")
        });
        setErrorLogsVersion(function (v) {
          return v + 1;
        });
      }
    }, "fooddb 404"), /*#__PURE__*/React.createElement("button", {
      style: {
        padding: 8,
        borderRadius: 8,
        border: "1px solid #334155",
        background: "#0f1729",
        color: "#94a3b8",
        fontSize: 11,
        fontWeight: 600,
        cursor: "pointer"
      },
      onClick: function onClick() {
        setNotionSyncMsg({
          type: "error",
          text: friendlyError(new Error("QuotaExceededError"), "injectTest")
        });
        setErrorLogsVersion(function (v) {
          return v + 1;
        });
      }
    }, "storage quota"), /*#__PURE__*/React.createElement("button", {
      style: {
        padding: 8,
        borderRadius: 8,
        border: "1px solid #334155",
        background: "#0f1729",
        color: "#94a3b8",
        fontSize: 11,
        fontWeight: 600,
        cursor: "pointer"
      },
      onClick: function onClick() {
        setNotionSyncMsg({
          type: "error",
          text: friendlyError(new Error("No recipes found."), "injectTest")
        });
        setErrorLogsVersion(function (v) {
          return v + 1;
        });
      }
    }, "parse")), notionSyncMsg && notionSyncMsg.type === "error" && /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 8,
        background: "#2d0f0f",
        border: "1px solid #7f1d1d",
        borderRadius: 8,
        padding: "8px 10px",
        fontSize: 11,
        color: "#fca5a5",
        lineHeight: 1.4
      }
    }, notionSyncMsg.text), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 10,
        color: "#475569",
        marginTop: 6
      }
    }, "Logged to Settings \u2192 About \u2192 Error logs.")))), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        fontWeight: 700,
        color: "#94a3b8",
        textTransform: "uppercase",
        letterSpacing: "0.05em",
        marginBottom: 10,
        marginTop: 16
      }
    }, "Custom Foods"), /*#__PURE__*/React.createElement("div", {
      style: S.card
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: "#64748b",
        marginBottom: 14,
        lineHeight: 1.5
      }
    }, "Create, edit, and promote your own foods. Custom foods are stored on this device and can be exported as a foods.json-schema patch to merge into the main database."), /*#__PURE__*/React.createElement("button", {
      style: {
        width: "100%",
        padding: 14,
        borderRadius: 12,
        border: "none",
        background: "#3b82f6",
        color: "#fff",
        fontSize: 15,
        fontWeight: 700,
        cursor: "pointer",
        marginBottom: 10
      },
      onClick: function onClick() {
        resetCfForm();
        setView("manageCustomFoods");
      }
    }, "Manage custom foods"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: "#475569",
        textAlign: "center"
      }
    }, customFoods.filter(function (f) {
      return !f.deleted;
    }).length, " active custom food", customFoods.filter(function (f) {
      return !f.deleted;
    }).length === 1 ? "" : "s")), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        fontWeight: 700,
        color: "#94a3b8",
        textTransform: "uppercase",
        letterSpacing: "0.05em",
        marginBottom: 10,
        marginTop: 16
      }
    }, "Export Data"), /*#__PURE__*/React.createElement("div", {
      style: S.card
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: "#64748b",
        marginBottom: 14,
        lineHeight: 1.5
      }
    }, "Exports all logs, recipes, and profile data as a CSV (daily totals, doctor-readable) and JSON (full log, re-importable) to the Files app."), /*#__PURE__*/React.createElement("button", {
      style: {
        width: "100%",
        padding: 14,
        borderRadius: 12,
        border: "none",
        background: "#0f766e",
        color: "#fff",
        fontSize: 15,
        fontWeight: 700,
        cursor: "pointer",
        marginBottom: 10
      },
      onClick: handleExportData
    }, "Export Data"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: "#475569",
        textAlign: "center"
      }
    }, "Last exported: ", /*#__PURE__*/React.createElement("span", {
      style: {
        color: lastExportedAt ? "#10b981" : "#64748b",
        fontWeight: 600
      }
    }, lastExportedAt ? function () {
      var d = new Date(lastExportedAt);
      return d.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric"
      }) + " at " + d.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit"
      });
    }() : "Never")), exportConfirm && /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 14,
        background: "#0a1a14",
        border: "1px solid #065f46",
        borderRadius: 10,
        padding: "12px 14px"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        fontWeight: 700,
        color: "#34d399"
      }
    }, "\u2713 Export complete"), /*#__PURE__*/React.createElement("button", {
      style: {
        background: "none",
        border: "none",
        color: "#475569",
        fontSize: 16,
        cursor: "pointer",
        padding: "0 4px",
        lineHeight: 1
      },
      onClick: function onClick() {
        return setExportConfirm(null);
      }
    }, "\xD7")), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: "#6ee7b7",
        marginBottom: 4
      }
    }, "\uD83D\uDDDC ", exportConfirm.zipFile), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: "#475569",
        marginBottom: 10
      }
    }, "Contains: ", exportConfirm.csvFile, " + ", exportConfirm.jsonFile), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "4px 12px"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: "#94a3b8"
      }
    }, "Date range"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: "#e2e8f0",
        fontWeight: 600
      }
    }, exportConfirm.dateFrom ? "".concat(exportConfirm.dateFrom, " \u2192 ").concat(exportConfirm.dateTo) : "No days logged"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: "#94a3b8"
      }
    }, "CSV rows"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: "#e2e8f0",
        fontWeight: 600
      }
    }, exportConfirm.csvRows, " day", exportConfirm.csvRows === 1 ? "" : "s"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: "#94a3b8"
      }
    }, "JSON entries"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: "#e2e8f0",
        fontWeight: 600
      }
    }, exportConfirm.jsonEntries, " log", exportConfirm.jsonEntries === 1 ? "" : "s")))), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        fontWeight: 700,
        color: "#94a3b8",
        textTransform: "uppercase",
        letterSpacing: "0.05em",
        marginBottom: 10,
        marginTop: 16
      }
    }, "About"), /*#__PURE__*/React.createElement("div", {
      style: S.card
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "4px 12px"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: "#94a3b8"
      }
    }, "App version"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: "#e2e8f0",
        fontWeight: 600,
        fontFamily: "monospace"
      }
    }, APP_VERSION), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: "#94a3b8"
      }
    }, "Foods DB version"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: "#e2e8f0",
        fontWeight: 600,
        fontFamily: "monospace"
      }
    }, FOODS_DB_VERSION), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: "#94a3b8"
      }
    }, "Last validated"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: "#e2e8f0",
        fontWeight: 600
      }
    }, function () {
      var v = localStorage.getItem(STORAGE_KEYS.lastValidatedAt);
      return v ? new Date(v).toLocaleString("en-GB", {
        day: "numeric",
        month: "short",
        hour: "2-digit",
        minute: "2-digit"
      }) : "never";
    }()), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: "#94a3b8"
      }
    }, "Connection"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: isOnline ? "#10b981" : "#f59e0b",
        fontWeight: 600
      }
    }, isOnline ? "online" : "offline"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: "#94a3b8"
      }
    }, "Service worker"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: "#e2e8f0",
        fontWeight: 600,
        fontFamily: "monospace"
      }
    }, "serviceWorker" in navigator ? "supported" : "unsupported"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: "#94a3b8"
      }
    }, "Food database"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: foodDBStatus === "ready" ? "#10b981" : foodDBStatus === "error" ? "#ef4444" : "#f59e0b",
        fontWeight: 600
      }
    }, foodDBStatus)), function () {
      void errorLogsVersion; // re-read localStorage whenever logs are cleared/injected
      var logs = [];
      try {
        var raw = localStorage.getItem(STORAGE_KEYS.errorLogs);
        logs = raw ? JSON.parse(raw) : [];
        if (!Array.isArray(logs)) logs = [];
      } catch (_unused11) {
        logs = [];
      }
      return /*#__PURE__*/React.createElement("details", {
        style: {
          marginTop: 12,
          fontSize: 11
        }
      }, /*#__PURE__*/React.createElement("summary", {
        style: {
          color: "#64748b",
          cursor: "pointer",
          padding: "4px 0",
          listStyle: "none",
          outline: "none",
          userSelect: "none"
        }
      }, "\u25B8 Error logs (", logs.length, ")"), /*#__PURE__*/React.createElement("div", {
        style: {
          marginTop: 8
        }
      }, logs.length === 0 ? /*#__PURE__*/React.createElement("div", {
        style: {
          color: "#64748b",
          padding: "6px 0"
        }
      }, "No errors recorded. Logs are stored only on this device and never transmitted.") : /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          flexDirection: "column",
          gap: 6,
          maxHeight: 160,
          overflowY: "auto"
        }
      }, logs.slice().reverse().map(function (l, i) {
        return /*#__PURE__*/React.createElement("div", {
          key: i,
          style: {
            background: "#1e293b",
            borderRadius: 6,
            padding: "6px 8px",
            fontFamily: "monospace",
            fontSize: 10,
            color: "#94a3b8",
            lineHeight: 1.4
          }
        }, /*#__PURE__*/React.createElement("div", {
          style: {
            color: "#e2e8f0"
          }
        }, l.ts ? new Date(l.ts).toLocaleString("en-GB", {
          day: "numeric",
          month: "short",
          hour: "2-digit",
          minute: "2-digit"
        }) : "?", " \xB7 ", l.context || "unknown", " \xB7 ", l.type || "unknown"), /*#__PURE__*/React.createElement("div", {
          style: {
            color: "#64748b",
            marginTop: 2,
            wordBreak: "break-word"
          }
        }, l.raw || ""));
      })), logs.length > 0 && /*#__PURE__*/React.createElement("button", {
        style: {
          marginTop: 8,
          background: "none",
          border: "1px solid #334155",
          borderRadius: 6,
          color: "#94a3b8",
          fontSize: 10,
          fontWeight: 600,
          padding: "4px 8px",
          cursor: "pointer"
        },
        onClick: function onClick() {
          try {
            localStorage.removeItem(STORAGE_KEYS.errorLogs);
          } catch (_unused12) {}
          setErrorLogsVersion(function (v) {
            return v + 1;
          });
        }
      }, "Clear logs")));
    }(), /*#__PURE__*/React.createElement("div", {
      style: {
        borderTop: "1px solid #1e293b",
        marginTop: 12,
        paddingTop: 12,
        fontSize: 11,
        color: "#475569",
        lineHeight: 1.5
      }
    }, "NutriTrack \u2014 offline-first nutrition tracking. All data is stored locally on this device. Use Export Data above to back up before clearing browser data."))), /*#__PURE__*/React.createElement(BottomNav, null));
  }
  // ── NOTION REVIEW ─────────────────────────────────────────────────────
  if (view === "notionReview") {
    var allResolved = syncReviewData.every(function (r) {
      return r.duplicateAction !== null;
    });
    var readyCount = syncReviewData.filter(function (r) {
      return !r.imported && r.duplicateAction !== null && r.duplicateAction !== "skip";
    }).length;
    return /*#__PURE__*/React.createElement("div", {
      style: S.app
    }, /*#__PURE__*/React.createElement("div", {
      style: S.header
    }, /*#__PURE__*/React.createElement("button", {
      style: {
        background: "none",
        border: "none",
        color: "#94a3b8",
        fontSize: 15,
        cursor: "pointer"
      },
      onClick: function onClick() {
        setView("settings");
        setSyncReviewData([]);
      }
    }, "\u2190 Back"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 15,
        fontWeight: 700
      }
    }, "Review Import"), /*#__PURE__*/React.createElement("button", {
      style: {
        background: "none",
        border: "none",
        fontSize: 13,
        fontWeight: 700,
        cursor: allResolved && readyCount > 0 ? "pointer" : "default",
        color: allResolved && readyCount > 0 ? "#7c3aed" : "#334155"
      },
      disabled: !allResolved || readyCount === 0,
      onClick: importAllReady
    }, "Import All (", readyCount, ")")), /*#__PURE__*/React.createElement("div", {
      style: _objectSpread(_objectSpread({}, S.section), {}, {
        paddingBottom: 40
      })
    }, syncReviewData.length === 0 && /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: "center",
        padding: "40px 0",
        color: "#475569"
      }
    }, "No recipes to review."), syncReviewData.map(function (r, rIdx) {
      var skippedCount = r.ingredients.filter(function (i) {
          return i.skipped;
        }).length,
        matchedCount = r.ingredients.filter(function (i) {
          return i.match && !i.skipped;
        }).length;
      return /*#__PURE__*/React.createElement("div", {
        key: rIdx,
        style: _objectSpread(_objectSpread({}, S.card), {}, {
          marginBottom: 12,
          opacity: r.imported ? 0.5 : 1
        })
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 8
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          flex: 1
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 15,
          fontWeight: 700,
          color: r.imported ? "#10b981" : "#e2e8f0"
        }
      }, r.imported && "✓ ", r.title), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 12,
          color: "#475569",
          marginTop: 2
        }
      }, r.servings, " serving", r.servings === 1 ? "" : "s", r.source ? " \xB7 ".concat(r.source) : ""))), r.existingId && !r.imported && /*#__PURE__*/React.createElement("div", {
        style: {
          background: "#1c1200",
          border: "1px solid #92400e",
          borderRadius: 10,
          padding: "10px 12px",
          marginBottom: 10
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 12,
          color: "#fbbf24",
          fontWeight: 600,
          marginBottom: 8
        }
      }, "\u26A0\uFE0F \"", r.title, "\" already exists locally."), /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          gap: 6,
          flexWrap: "wrap"
        }
      }, [["overwrite", "Overwrite"], ["copy", "Save as copy"], ["skip", "Skip"]].map(function (_ref38) {
        var _ref39 = _slicedToArray(_ref38, 2),
          action = _ref39[0],
          label = _ref39[1];
        return /*#__PURE__*/React.createElement("button", {
          key: action,
          style: _objectSpread(_objectSpread({}, S.pill(r.duplicateAction === action)), {}, {
            background: r.duplicateAction === action ? action === "skip" ? "#7f1d1d" : action === "overwrite" ? "#1d4ed8" : "#14532d" : "transparent",
            borderColor: r.duplicateAction === action ? action === "skip" ? "#ef4444" : action === "overwrite" ? "#3b82f6" : "#22c55e" : "#334155",
            color: r.duplicateAction === action ? "#fff" : "#94a3b8"
          }),
          onClick: function onClick() {
            return setSyncReviewData(function (prev) {
              return prev.map(function (item, i) {
                return i === rIdx ? _objectSpread(_objectSpread({}, item), {}, {
                  duplicateAction: action
                }) : item;
              });
            });
          }
        }, label);
      }))), /*#__PURE__*/React.createElement("div", {
        style: {
          marginBottom: r.imported ? 0 : 10
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 11,
          fontWeight: 700,
          color: "#475569",
          marginBottom: 6,
          textTransform: "uppercase",
          letterSpacing: "0.04em"
        }
      }, "Ingredients \u2014 ", matchedCount, " matched", skippedCount > 0 ? ", ".concat(skippedCount, " skipped") : ""), r.ingredients.map(function (ing, iIdx) {
        var _ing$match;
        return /*#__PURE__*/React.createElement("div", {
          key: iIdx,
          style: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "6px 0",
            borderBottom: iIdx < r.ingredients.length - 1 ? "1px solid #1e293b" : "none"
          }
        }, /*#__PURE__*/React.createElement("div", {
          style: {
            flex: 1
          }
        }, ing.match && !ing.skipped ? /*#__PURE__*/React.createElement("div", {
          style: {
            fontSize: 13,
            color: "#4ade80"
          }
        }, "\u2713 ", ing.match.name) : ing.skipped && !ing.match ? /*#__PURE__*/React.createElement("div", {
          style: {
            fontSize: 13,
            color: "#64748b"
          }
        }, "\u2298 ", ing.name, " ", /*#__PURE__*/React.createElement("span", {
          style: {
            fontSize: 11
          }
        }, "(no match)")) : ing.skipped ? /*#__PURE__*/React.createElement("div", {
          style: {
            fontSize: 13,
            color: "#64748b",
            textDecoration: "line-through"
          }
        }, ((_ing$match = ing.match) === null || _ing$match === void 0 ? void 0 : _ing$match.name) || ing.name) : /*#__PURE__*/React.createElement("div", {
          style: {
            fontSize: 13,
            color: "#fbbf24"
          }
        }, "\u26A0 ", ing.name), /*#__PURE__*/React.createElement("div", {
          style: {
            fontSize: 11,
            color: "#475569"
          }
        }, ing.amount_g, "g")), /*#__PURE__*/React.createElement("div", {
          style: {
            display: "flex",
            gap: 6,
            alignItems: "center"
          }
        }, !r.imported && !ing.skipped && !ing.match && /*#__PURE__*/React.createElement("button", {
          style: {
            background: "#1d2d3a",
            border: "1px solid #334155",
            borderRadius: 8,
            color: "#93c5fd",
            fontSize: 11,
            fontWeight: 600,
            padding: "3px 8px",
            cursor: "pointer"
          },
          onClick: function onClick() {
            setNotionIngPick({
              recipeIdx: rIdx,
              ingIdx: iIdx
            });
            setNotionIngSearch("");
            setView("notionIngPick");
          }
        }, "Pick"), !r.imported && /*#__PURE__*/React.createElement("button", {
          style: {
            background: "none",
            border: "none",
            color: ing.skipped ? "#475569" : "#64748b",
            fontSize: 11,
            cursor: "pointer",
            padding: "2px 4px"
          },
          onClick: function onClick() {
            return setSyncReviewData(function (prev) {
              return prev.map(function (item, ri) {
                return ri !== rIdx ? item : _objectSpread(_objectSpread({}, item), {}, {
                  ingredients: item.ingredients.map(function (x, ii) {
                    return ii !== iIdx ? x : _objectSpread(_objectSpread({}, x), {}, {
                      skipped: !x.skipped
                    });
                  })
                });
              });
            });
          }
        }, ing.skipped ? "Restore" : "Skip")));
      })), !r.imported && r.duplicateAction !== null && r.duplicateAction !== "skip" && /*#__PURE__*/React.createElement("button", {
        style: {
          width: "100%",
          padding: 10,
          borderRadius: 10,
          border: "none",
          background: matchedCount > 0 ? "#7c3aed" : "#1e293b",
          color: matchedCount > 0 ? "#fff" : "#64748b",
          fontSize: 13,
          fontWeight: 700,
          cursor: matchedCount > 0 ? "pointer" : "default"
        },
        disabled: matchedCount === 0,
        onClick: function onClick() {
          return importRecipe(rIdx);
        }
      }, "Import \"", r.title, "\""), r.imported && /*#__PURE__*/React.createElement("div", {
        style: {
          textAlign: "center",
          fontSize: 13,
          color: "#10b981",
          fontWeight: 600
        }
      }, "\u2713 Imported"), r.duplicateAction === "skip" && /*#__PURE__*/React.createElement("div", {
        style: {
          textAlign: "center",
          fontSize: 13,
          color: "#475569"
        }
      }, "Skipped"));
    }), syncReviewData.some(function (r) {
      return r.imported;
    }) && /*#__PURE__*/React.createElement("button", {
      style: {
        width: "100%",
        padding: 14,
        borderRadius: 12,
        border: "none",
        background: "#7c3aed",
        color: "#fff",
        fontSize: 15,
        fontWeight: 700,
        cursor: "pointer",
        marginTop: 4
      },
      onClick: importAllReady
    }, "Done \u2014 Save & Finish")), /*#__PURE__*/React.createElement(BottomNav, null));
  }

  // ── NOTION INGREDIENT PICKER ──────────────────────────────────────────
  if (view === "notionIngPick" && notionIngPick) {
    var _syncReviewData$notio;
    var filteredNotionFoods = notionIngSearch.length > 0 ? allFoods.filter(function (f) {
      return f.name.toLowerCase().includes(notionIngSearch.toLowerCase());
    }) : allFoods;
    var groupedNotionFoods = filteredNotionFoods.reduce(function (acc, f) {
      if (!acc[f.cat]) acc[f.cat] = [];
      acc[f.cat].push(f);
      return acc;
    }, {});
    var currentIng = (_syncReviewData$notio = syncReviewData[notionIngPick.recipeIdx]) === null || _syncReviewData$notio === void 0 ? void 0 : _syncReviewData$notio.ingredients[notionIngPick.ingIdx];
    return /*#__PURE__*/React.createElement("div", {
      style: S.app
    }, /*#__PURE__*/React.createElement("div", {
      style: S.header
    }, /*#__PURE__*/React.createElement("button", {
      style: {
        background: "none",
        border: "none",
        color: "#94a3b8",
        fontSize: 15,
        cursor: "pointer"
      },
      onClick: function onClick() {
        setNotionIngPick(null);
        setView("notionReview");
      }
    }, "\u2190 Back"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 15,
        fontWeight: 700
      }
    }, "Match Ingredient"), /*#__PURE__*/React.createElement("div", {
      style: {
        width: 48
      }
    })), /*#__PURE__*/React.createElement("div", {
      style: S.section
    }, currentIng && /*#__PURE__*/React.createElement("div", {
      style: {
        background: "#1c1200",
        border: "1px solid #92400e",
        borderRadius: 10,
        padding: "10px 14px",
        marginBottom: 12,
        fontSize: 13,
        color: "#fbbf24"
      }
    }, "Matching: ", /*#__PURE__*/React.createElement("strong", null, currentIng.name), " (", currentIng.amount_g, "g)"), /*#__PURE__*/React.createElement("input", {
      style: _objectSpread(_objectSpread({}, S.input), {}, {
        marginBottom: 12
      }),
      placeholder: "Search foods\u2026",
      value: notionIngSearch,
      onChange: function onChange(e) {
        return setNotionIngSearch(e.target.value);
      },
      autoFocus: true
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        maxHeight: "calc(100vh - 220px)",
        overflowY: "auto"
      }
    }, Object.entries(groupedNotionFoods).map(function (_ref40) {
      var _ref41 = _slicedToArray(_ref40, 2),
        cat = _ref41[0],
        foods = _ref41[1];
      return /*#__PURE__*/React.createElement("div", {
        key: cat
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 11,
          fontWeight: 700,
          color: "#475569",
          padding: "10px 0 4px",
          letterSpacing: "0.05em",
          textTransform: "uppercase"
        }
      }, cat), foods.map(function (f) {
        return /*#__PURE__*/React.createElement("div", {
          key: f.id,
          style: S.srchItem,
          onClick: function onClick() {
            setSyncReviewData(function (prev) {
              return prev.map(function (item, ri) {
                return ri !== notionIngPick.recipeIdx ? item : _objectSpread(_objectSpread({}, item), {}, {
                  ingredients: item.ingredients.map(function (ing, ii) {
                    return ii !== notionIngPick.ingIdx ? ing : _objectSpread(_objectSpread({}, ing), {}, {
                      match: f,
                      skipped: false
                    });
                  })
                });
              });
            });
            setNotionIngPick(null);
            setView("notionReview");
          }
        }, /*#__PURE__*/React.createElement("span", {
          style: {
            fontSize: 12,
            color: "#f59e0b",
            "float": "right"
          }
        }, fmtE(f.cal), " ", energyLabel, "/100g"), /*#__PURE__*/React.createElement("div", {
          style: {
            fontSize: 14,
            fontWeight: 500,
            color: "#e2e8f0"
          }
        }, f.name));
      }));
    }), filteredNotionFoods.length === 0 && /*#__PURE__*/React.createElement("div", {
      style: {
        padding: 20,
        textAlign: "center",
        color: "#475569",
        fontSize: 14
      }
    }, "No foods found for \"", notionIngSearch, "\""))));
  }
  // ── DETAIL VIEWS ──────────────────────────────────────────────────────
  if (view === "proDetail") {
    var aaTotals = {};
    AA_KEYS.forEach(function (k) {
      aaTotals[k] = 0;
    });
    dayLog.forEach(function (e) {
      if (e.type === "exercise" || e.type === "supplement") return;
      if (e.type === "recipe") {
        (e.derivedIngredients || []).forEach(function (ing) {
          var m = ing.amount_g / 100;
          if (ing.snapshot) {
            AA_KEYS.forEach(function (k) {
              var _ing$snapshot$k4;
              aaTotals[k] += ((_ing$snapshot$k4 = ing.snapshot[k]) !== null && _ing$snapshot$k4 !== void 0 ? _ing$snapshot$k4 : 0) * m;
            });
          } else {
            var f = allFoods.find(function (x) {
              return x.id === ing.foodId;
            });
            if (!f) return;
            AA_KEYS.forEach(function (k) {
              var _f$k3;
              aaTotals[k] += ((_f$k3 = f[k]) !== null && _f$k3 !== void 0 ? _f$k3 : 0) * m;
            });
          }
        });
        return;
      }
      var m = e.amount / 100;
      if (e.snapshot) {
        AA_KEYS.forEach(function (k) {
          var _e$snapshot$k3;
          aaTotals[k] += ((_e$snapshot$k3 = e.snapshot[k]) !== null && _e$snapshot$k3 !== void 0 ? _e$snapshot$k3 : 0) * m;
        });
      } else {
        var f = allFoods.find(function (x) {
          return x.id === e.foodId;
        });
        if (!f) return;
        AA_KEYS.forEach(function (k) {
          var _f$k4;
          aaTotals[k] += ((_f$k4 = f[k]) !== null && _f$k4 !== void 0 ? _f$k4 : 0) * m;
        });
      }
    });
    var aaGoals = computeAAGoals(profile.weightKg);
    // Apply same exercise multiplier as protein goal
    var scaledAAGoals = Object.fromEntries(Object.entries(aaGoals).map(function (_ref42) {
      var _ref43 = _slicedToArray(_ref42, 2),
        k = _ref43[0],
        v = _ref43[1];
      return [k, v * proMultiplier];
    }));
    var limitingKey = "aaLys",
      lowestPct = Infinity;
    AA_KEYS.forEach(function (k) {
      var p = aaTotals[k] / scaledAAGoals[k] * 100;
      if (p < lowestPct) {
        lowestPct = p;
        limitingKey = k;
      }
    });
    var proCont = dayLog.flatMap(function (e) {
      var _e$snapshot$pro, _allFoods$find$pro, _allFoods$find;
      if (e.type === "exercise") return [];
      if (e.type === "supplement") {
        var v = suppContrib(e, "pro");
        return v > 0 ? [{
          name: "\uD83D\uDC8A ".concat(e.stackName),
          label: "supplement",
          value: v,
          isSupp: true
        }] : [];
      }
      if (e.type === "recipe") {
        var _n2 = computeEntryNutrition(e.derivedIngredients || [], allFoods);
        return _n2.pro ? [{
          name: "\uD83D\uDCD6 ".concat(e.recipeName),
          label: "".concat(e.servings, " srv"),
          value: _n2.pro
        }] : [];
      }
      var val = e.snapshot ? ((_e$snapshot$pro = e.snapshot.pro) !== null && _e$snapshot$pro !== void 0 ? _e$snapshot$pro : 0) * e.amount / 100 : ((_allFoods$find$pro = (_allFoods$find = allFoods.find(function (x) {
        return x.id === e.foodId;
      })) === null || _allFoods$find === void 0 ? void 0 : _allFoods$find.pro) !== null && _allFoods$find$pro !== void 0 ? _allFoods$find$pro : 0) * e.amount / 100;
      return val ? [{
        name: e.foodName,
        label: "".concat(e.amount, "g"),
        value: val
      }] : [];
    }).sort(function (a, b) {
      return b.value - a.value;
    });
    return /*#__PURE__*/React.createElement("div", {
      style: S.app
    }, /*#__PURE__*/React.createElement("div", {
      style: S.header
    }, /*#__PURE__*/React.createElement("button", {
      style: {
        background: "none",
        border: "none",
        color: "#94a3b8",
        fontSize: 15,
        cursor: "pointer"
      },
      onClick: function onClick() {
        return setView("log");
      }
    }, "\u2190 Back"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 15,
        fontWeight: 700
      }
    }, "Protein"), /*#__PURE__*/React.createElement("div", {
      style: {
        width: 48
      }
    })), /*#__PURE__*/React.createElement("div", {
      style: S.section
    }, /*#__PURE__*/React.createElement("div", {
      style: _objectSpread(_objectSpread({}, S.card), {}, {
        textAlign: "center"
      })
    }, function () {
      var k = "pro",
        goal = effectiveGoals[k] || 1,
        nv = allFoodsForRender.map(function (f) {
          return f[k];
        }).filter(function (v) {
          return v != null && v > 0;
        }).sort(function (a, b) {
          return a - b;
        }),
        med = nv.length ? nv[Math.floor(nv.length / 2)] : null;
      var est = 0;
      dayLog.forEach(function (e) {
        var _allFoodsForRender$fi6;
        if (e.type === "exercise" || e.type === "supplement") return;
        if (e.type === "recipe") {
          (e.derivedIngredients || []).forEach(function (ing) {
            var _allFoodsForRender$fi5;
            var v = ing.snapshot ? ing.snapshot[k] : (_allFoodsForRender$fi5 = allFoodsForRender.find(function (f) {
              return f.id === ing.foodId;
            })) === null || _allFoodsForRender$fi5 === void 0 ? void 0 : _allFoodsForRender$fi5[k];
            if (v === null || v === undefined) est += med != null ? ing.amount_g / 100 * med : 0;
          });
          return;
        }
        var v = e.snapshot ? e.snapshot[k] : (_allFoodsForRender$fi6 = allFoodsForRender.find(function (f) {
          return f.id === e.foodId;
        })) === null || _allFoodsForRender$fi6 === void 0 ? void 0 : _allFoodsForRender$fi6[k];
        if (v === null || v === undefined) est += med != null ? (e.amount || 0) / 100 * med : 0;
      });
      var arc = Math.min(est / goal, 1);
      return /*#__PURE__*/React.createElement(Ring, {
        value: totals.pro,
        max: effectiveGoals.pro,
        size: 100,
        stroke: 8,
        color: NUTRIENT_META.pro.color,
        nullArc: arc,
        simplified: displayMode === "simplified"
      }, /*#__PURE__*/React.createElement("text", {
        x: "50%",
        y: "45%",
        textAnchor: "middle",
        fill: "#e2e8f0",
        fontSize: 18,
        fontWeight: 700
      }, n1(totals.pro)), /*#__PURE__*/React.createElement("text", {
        x: "50%",
        y: "62%",
        textAnchor: "middle",
        fill: "#64748b",
        fontSize: 10
      }, "/ ", effectiveGoals.pro, "g"));
    }(), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 12,
        fontSize: 14,
        color: pct("pro") >= 100 ? "#10b981" : pct("pro") >= 60 ? "#f59e0b" : "#ef4444"
      }
    }, pct("pro"), "% of daily goal")), /*#__PURE__*/React.createElement("div", {
      style: S.card
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        fontWeight: 700,
        color: "#94a3b8",
        marginBottom: 4,
        textTransform: "uppercase",
        letterSpacing: "0.05em"
      }
    }, "Essential Amino Acids"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: "#475569",
        marginBottom: 14
      }
    }, "targets for ", parseFloat(profile.weightKg) || 70, "kg", proMultiplier > 1 && /*#__PURE__*/React.createElement("span", {
      style: {
        color: "#4ade80"
      }
    }, " \xB7 ", proMultiplier.toFixed(2), "\xD7 exercise scaling")), AA_KEYS.map(function (k) {
      var val = aaTotals[k],
        ear = scaledAAGoals[k],
        bp = Math.min(val / ear * 100, 100),
        rp = Math.round(val / ear * 100),
        isLimit = k === limitingKey,
        col = rp >= 100 ? "#10b981" : rp >= 60 ? "#3B82F6" : rp >= 30 ? "#f59e0b" : "#ef4444";
      return /*#__PURE__*/React.createElement("div", {
        key: k,
        style: {
          marginBottom: 10
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 4
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          alignItems: "center",
          gap: 6
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 13,
          color: "#e2e8f0",
          fontWeight: isLimit ? 700 : 400
        }
      }, AA_LABELS[k]), isLimit && /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 9,
          fontWeight: 700,
          color: "#f59e0b",
          background: "rgba(245,158,11,0.15)",
          borderRadius: 4,
          padding: "1px 5px"
        }
      }, "LIMITING")), /*#__PURE__*/React.createElement("div", {
        style: {
          textAlign: "right"
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 12,
          fontWeight: 600,
          color: col
        }
      }, rp, "%"), /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 10,
          color: "#475569",
          marginLeft: 5
        }
      }, n1(val), "g / ", n1(ear), "g"))), /*#__PURE__*/React.createElement("div", {
        style: {
          height: 6,
          borderRadius: 3,
          background: "#1e293b",
          overflow: "hidden"
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          height: "100%",
          width: "".concat(bp, "%"),
          background: col,
          borderRadius: 3,
          transition: "width 0.5s ease"
        }
      })));
    })), proCont.length > 0 && /*#__PURE__*/React.createElement("div", {
      style: S.card
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        fontWeight: 700,
        color: "#94a3b8",
        marginBottom: 10,
        textTransform: "uppercase",
        letterSpacing: "0.05em"
      }
    }, "Today's Sources"), proCont.map(function (c, i) {
      return /*#__PURE__*/React.createElement("div", {
        key: i,
        style: {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "7px 0",
          borderBottom: i < proCont.length - 1 ? "1px solid #1e293b" : "none",
          background: c.isSupp ? "rgba(167,139,250,0.05)" : "transparent",
          borderRadius: c.isSupp ? 6 : 0
        }
      }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 13,
          color: c.isSupp ? "#c4b5fd" : "#e2e8f0"
        }
      }, c.name), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 11,
          color: "#64748b"
        }
      }, c.label)), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 13,
          fontWeight: 600,
          color: NUTRIENT_META.pro.color
        }
      }, n1(c.value), "g"));
    }))));
  }
  if (view === "calDetail") {
    var proK = totals.pro * 4,
      carbK = totals.carb * 4,
      fatK = totals.fat * 9,
      alcK = totals.alc * 7,
      totK = proK + carbK + fatK + alcK;
    var calCont = dayLog.flatMap(function (e) {
      var _e$snapshot$cal3, _allFoods$find$cal, _allFoods$find2;
      if (e.type === "exercise") return [];
      if (e.type === "supplement") {
        var v = suppContrib(e, "cal");
        return v > 0 ? [{
          name: "\uD83D\uDC8A ".concat(e.stackName),
          label: "supplement",
          value: v,
          isSupp: true
        }] : [];
      }
      if (e.type === "recipe") {
        var _n3 = computeEntryNutrition(e.derivedIngredients || [], allFoods);
        return _n3.cal ? [{
          name: "\uD83D\uDCD6 ".concat(e.recipeName),
          label: "".concat(e.servings, " srv"),
          value: _n3.cal
        }] : [];
      }
      var val = e.snapshot ? ((_e$snapshot$cal3 = e.snapshot.cal) !== null && _e$snapshot$cal3 !== void 0 ? _e$snapshot$cal3 : 0) * e.amount / 100 : ((_allFoods$find$cal = (_allFoods$find2 = allFoods.find(function (x) {
        return x.id === e.foodId;
      })) === null || _allFoods$find2 === void 0 ? void 0 : _allFoods$find2.cal) !== null && _allFoods$find$cal !== void 0 ? _allFoods$find$cal : 0) * e.amount / 100;
      return val ? [{
        name: e.foodName,
        label: "".concat(e.amount, "g"),
        value: val
      }] : [];
    }).sort(function (a, b) {
      return b.value - a.value;
    });
    return /*#__PURE__*/React.createElement("div", {
      style: S.app
    }, /*#__PURE__*/React.createElement("div", {
      style: S.header
    }, /*#__PURE__*/React.createElement("button", {
      style: {
        background: "none",
        border: "none",
        color: "#94a3b8",
        fontSize: 15,
        cursor: "pointer"
      },
      onClick: function onClick() {
        return setView("log");
      }
    }, "\u2190 Back"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 15,
        fontWeight: 700
      }
    }, "Calories"), /*#__PURE__*/React.createElement("div", {
      style: {
        width: 48
      }
    })), /*#__PURE__*/React.createElement("div", {
      style: S.section
    }, /*#__PURE__*/React.createElement("div", {
      style: _objectSpread(_objectSpread({}, S.card), {}, {
        textAlign: "center"
      })
    }, function () {
      var k = "cal",
        goal = effectiveGoals[k] || 1,
        nv = allFoodsForRender.map(function (f) {
          return f[k];
        }).filter(function (v) {
          return v != null && v > 0;
        }).sort(function (a, b) {
          return a - b;
        }),
        med = nv.length ? nv[Math.floor(nv.length / 2)] : null;
      var est = 0;
      dayLog.forEach(function (e) {
        var _allFoodsForRender$fi8;
        if (e.type === "exercise" || e.type === "supplement") return;
        if (e.type === "recipe") {
          (e.derivedIngredients || []).forEach(function (ing) {
            var _allFoodsForRender$fi7;
            var v = ing.snapshot ? ing.snapshot[k] : (_allFoodsForRender$fi7 = allFoodsForRender.find(function (f) {
              return f.id === ing.foodId;
            })) === null || _allFoodsForRender$fi7 === void 0 ? void 0 : _allFoodsForRender$fi7[k];
            if (v === null || v === undefined) est += med != null ? ing.amount_g / 100 * med : 0;
          });
          return;
        }
        var v = e.snapshot ? e.snapshot[k] : (_allFoodsForRender$fi8 = allFoodsForRender.find(function (f) {
          return f.id === e.foodId;
        })) === null || _allFoodsForRender$fi8 === void 0 ? void 0 : _allFoodsForRender$fi8[k];
        if (v === null || v === undefined) est += med != null ? (e.amount || 0) / 100 * med : 0;
      });
      var arc = Math.min(est / goal, 1);
      return /*#__PURE__*/React.createElement(Ring, {
        value: totals.cal,
        max: effectiveGoals.cal,
        size: 100,
        stroke: 8,
        color: NUTRIENT_META.cal.color,
        nullArc: arc,
        simplified: displayMode === "simplified"
      }, /*#__PURE__*/React.createElement("text", {
        x: "50%",
        y: "45%",
        textAnchor: "middle",
        fill: "#e2e8f0",
        fontSize: 18,
        fontWeight: 700
      }, Math.round(totals.cal)), /*#__PURE__*/React.createElement("text", {
        x: "50%",
        y: "62%",
        textAnchor: "middle",
        fill: "#64748b",
        fontSize: 10
      }, "/ ", fmtE(effectiveGoals.cal), " ", energyLabel));
    }(), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 12,
        fontSize: 14,
        color: pct("cal") >= 100 ? "#10b981" : pct("cal") >= 60 ? "#f59e0b" : "#ef4444"
      }
    }, pct("cal"), "% of daily goal")), /*#__PURE__*/React.createElement("div", {
      style: S.card
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        fontWeight: 700,
        color: "#94a3b8",
        marginBottom: 12,
        textTransform: "uppercase",
        letterSpacing: "0.05em"
      }
    }, "Calorie Breakdown"), totK > 0 ? /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        height: 14,
        borderRadius: 7,
        overflow: "hidden",
        marginBottom: 16,
        gap: 1
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: "".concat(proK / totK * 100, "%"),
        background: NUTRIENT_META.pro.color
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        width: "".concat(carbK / totK * 100, "%"),
        background: NUTRIENT_META.carb.color
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        width: "".concat(fatK / totK * 100, "%"),
        background: NUTRIENT_META.fat.color
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        width: "".concat(alcK / totK * 100, "%"),
        background: NUTRIENT_META.alc.color
      }
    })) : /*#__PURE__*/React.createElement("div", {
      style: {
        height: 14,
        borderRadius: 7,
        background: "#1e293b",
        marginBottom: 16
      }
    }), [{
      key: "pro",
      label: "Protein",
      kcal: proK,
      grams: totals.pro,
      mult: "×4"
    }, {
      key: "carb",
      label: "Carbs",
      kcal: carbK,
      grams: totals.carb,
      mult: "×4"
    }, {
      key: "fat",
      label: "Fat",
      kcal: fatK,
      grams: totals.fat,
      mult: "×9"
    }, {
      key: "alc",
      label: "Alcohol",
      kcal: alcK,
      grams: totals.alc,
      mult: "×7"
    }].map(function (_ref44, i) {
      var key = _ref44.key,
        label = _ref44.label,
        kcal = _ref44.kcal,
        grams = _ref44.grams,
        mult = _ref44.mult;
      return /*#__PURE__*/React.createElement("div", {
        key: key,
        style: {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 0",
          borderBottom: i < 3 ? "1px solid #1e293b" : "none"
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          alignItems: "center",
          gap: 10
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          width: 12,
          height: 12,
          borderRadius: 3,
          background: NUTRIENT_META[key].color,
          flexShrink: 0
        }
      }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 14,
          color: "#e2e8f0",
          fontWeight: 500
        }
      }, label), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 11,
          color: "#64748b"
        }
      }, n1(grams), "g ", mult))), /*#__PURE__*/React.createElement("div", {
        style: {
          textAlign: "right"
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 15,
          fontWeight: 700,
          color: NUTRIENT_META[key].color
        }
      }, fmtE(kcal), " ", energyLabel), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 11,
          color: "#64748b"
        }
      }, totK > 0 ? Math.round(kcal / totK * 100) : 0, "%")));
    })), calCont.length > 0 && /*#__PURE__*/React.createElement("div", {
      style: S.card
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        fontWeight: 700,
        color: "#94a3b8",
        marginBottom: 10,
        textTransform: "uppercase",
        letterSpacing: "0.05em"
      }
    }, "Today's Sources"), calCont.map(function (c, i) {
      return /*#__PURE__*/React.createElement("div", {
        key: i,
        style: {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "7px 0",
          borderBottom: i < calCont.length - 1 ? "1px solid #1e293b" : "none",
          background: c.isSupp ? "rgba(167,139,250,0.05)" : "transparent",
          borderRadius: c.isSupp ? 6 : 0
        }
      }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 13,
          color: c.isSupp ? "#c4b5fd" : "#e2e8f0"
        }
      }, c.name), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 11,
          color: "#64748b"
        }
      }, c.label)), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 13,
          fontWeight: 600,
          color: NUTRIENT_META.cal.color
        }
      }, fmtE(c.value), " ", energyLabel));
    }))));
  }
  if (view === "fibDetail") {
    var fibSol = dayLog.reduce(function (s, e) {
      var _e$snapshot$fibSol, _f$fibSol;
      if (e.type === "exercise" || e.type === "supplement") return s;
      if (e.type === "recipe") return s + recipeSubtotal(e, "fibSol");
      if (e.snapshot) return s + ((_e$snapshot$fibSol = e.snapshot.fibSol) !== null && _e$snapshot$fibSol !== void 0 ? _e$snapshot$fibSol : 0) * e.amount / 100;
      var f = allFoods.find(function (x) {
        return x.id === e.foodId;
      });
      return s + (f ? ((_f$fibSol = f.fibSol) !== null && _f$fibSol !== void 0 ? _f$fibSol : 0) * e.amount / 100 : 0);
    }, 0);
    var fibInsol = dayLog.reduce(function (s, e) {
      var _e$snapshot$fibInsol, _f$fibInsol;
      if (e.type === "exercise" || e.type === "supplement") return s;
      if (e.type === "recipe") return s + recipeSubtotal(e, "fibInsol");
      if (e.snapshot) return s + ((_e$snapshot$fibInsol = e.snapshot.fibInsol) !== null && _e$snapshot$fibInsol !== void 0 ? _e$snapshot$fibInsol : 0) * e.amount / 100;
      var f = allFoods.find(function (x) {
        return x.id === e.foodId;
      });
      return s + (f ? ((_f$fibInsol = f.fibInsol) !== null && _f$fibInsol !== void 0 ? _f$fibInsol : 0) * e.amount / 100 : 0);
    }, 0);
    var fibT = fibSol + fibInsol;
    var fibCont = dayLog.flatMap(function (e) {
      var _f$fibSol2, _f$fibInsol2;
      if (e.type === "exercise" || e.type === "supplement") return [];
      if (e.type === "recipe") {
        var _n4 = computeEntryNutrition(e.derivedIngredients || [], allFoods);
        if (!_n4.fib) return [];
        return [{
          name: "\uD83D\uDCD6 ".concat(e.recipeName),
          label: "".concat(e.servings, " srv"),
          total: _n4.fib,
          sol: recipeSubtotal(e, "fibSol"),
          insol: recipeSubtotal(e, "fibInsol")
        }];
      }
      if (e.snapshot) {
        var _e$snapshot$fib, _e$snapshot$fibSol2, _e$snapshot$fibInsol2;
        var t = ((_e$snapshot$fib = e.snapshot.fib) !== null && _e$snapshot$fib !== void 0 ? _e$snapshot$fib : 0) * e.amount / 100;
        if (!t) return [];
        return [{
          name: e.foodName,
          label: "".concat(e.amount, "g"),
          total: t,
          sol: ((_e$snapshot$fibSol2 = e.snapshot.fibSol) !== null && _e$snapshot$fibSol2 !== void 0 ? _e$snapshot$fibSol2 : 0) * e.amount / 100,
          insol: ((_e$snapshot$fibInsol2 = e.snapshot.fibInsol) !== null && _e$snapshot$fibInsol2 !== void 0 ? _e$snapshot$fibInsol2 : 0) * e.amount / 100
        }];
      }
      var f = allFoods.find(function (x) {
        return x.id === e.foodId;
      });
      if (!f || !f.fib) return [];
      return [{
        name: e.foodName,
        label: "".concat(e.amount, "g"),
        total: f.fib * e.amount / 100,
        sol: ((_f$fibSol2 = f.fibSol) !== null && _f$fibSol2 !== void 0 ? _f$fibSol2 : 0) * e.amount / 100,
        insol: ((_f$fibInsol2 = f.fibInsol) !== null && _f$fibInsol2 !== void 0 ? _f$fibInsol2 : 0) * e.amount / 100
      }];
    }).sort(function (a, b) {
      return b.total - a.total;
    });
    return /*#__PURE__*/React.createElement("div", {
      style: S.app
    }, /*#__PURE__*/React.createElement("div", {
      style: S.header
    }, /*#__PURE__*/React.createElement("button", {
      style: {
        background: "none",
        border: "none",
        color: "#94a3b8",
        fontSize: 15,
        cursor: "pointer"
      },
      onClick: function onClick() {
        return setView("log");
      }
    }, "\u2190 Back"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 15,
        fontWeight: 700
      }
    }, "Fibre"), /*#__PURE__*/React.createElement("div", {
      style: {
        width: 48
      }
    })), /*#__PURE__*/React.createElement("div", {
      style: S.section
    }, /*#__PURE__*/React.createElement("div", {
      style: _objectSpread(_objectSpread({}, S.card), {}, {
        textAlign: "center"
      })
    }, function () {
      var k = "fib",
        goal = effectiveGoals[k] || 1,
        nv = allFoodsForRender.map(function (f) {
          return f[k];
        }).filter(function (v) {
          return v != null && v > 0;
        }).sort(function (a, b) {
          return a - b;
        }),
        med = nv.length ? nv[Math.floor(nv.length / 2)] : null;
      var est = 0;
      dayLog.forEach(function (e) {
        var _allFoodsForRender$fi0;
        if (e.type === "exercise" || e.type === "supplement") return;
        if (e.type === "recipe") {
          (e.derivedIngredients || []).forEach(function (ing) {
            var _allFoodsForRender$fi9;
            var v = ing.snapshot ? ing.snapshot[k] : (_allFoodsForRender$fi9 = allFoodsForRender.find(function (f) {
              return f.id === ing.foodId;
            })) === null || _allFoodsForRender$fi9 === void 0 ? void 0 : _allFoodsForRender$fi9[k];
            if (v === null || v === undefined) est += med != null ? ing.amount_g / 100 * med : 0;
          });
          return;
        }
        var v = e.snapshot ? e.snapshot[k] : (_allFoodsForRender$fi0 = allFoodsForRender.find(function (f) {
          return f.id === e.foodId;
        })) === null || _allFoodsForRender$fi0 === void 0 ? void 0 : _allFoodsForRender$fi0[k];
        if (v === null || v === undefined) est += med != null ? (e.amount || 0) / 100 * med : 0;
      });
      var arc = Math.min(est / goal, 1);
      return /*#__PURE__*/React.createElement(Ring, {
        value: totals.fib,
        max: effectiveGoals.fib,
        size: 100,
        stroke: 8,
        color: NUTRIENT_META.fib.color,
        nullArc: arc,
        simplified: displayMode === "simplified"
      }, /*#__PURE__*/React.createElement("text", {
        x: "50%",
        y: "45%",
        textAnchor: "middle",
        fill: "#e2e8f0",
        fontSize: 18,
        fontWeight: 700
      }, n1(totals.fib)), /*#__PURE__*/React.createElement("text", {
        x: "50%",
        y: "62%",
        textAnchor: "middle",
        fill: "#64748b",
        fontSize: 10
      }, "/ ", effectiveGoals.fib, "g"));
    }(), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 12,
        fontSize: 14,
        color: pct("fib") >= 100 ? "#10b981" : pct("fib") >= 60 ? "#f59e0b" : "#ef4444"
      }
    }, pct("fib"), "% of daily goal")), /*#__PURE__*/React.createElement("div", {
      style: S.card
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        fontWeight: 700,
        color: "#94a3b8",
        marginBottom: 12,
        textTransform: "uppercase",
        letterSpacing: "0.05em"
      }
    }, "Fibre Types"), fibT > 0 ? /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        height: 14,
        borderRadius: 7,
        overflow: "hidden",
        marginBottom: 14,
        gap: 1
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: "".concat(fibSol / fibT * 100, "%"),
        background: FIB_SOL_COLOR
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        width: "".concat(fibInsol / fibT * 100, "%"),
        background: FIB_INSOL_COLOR
      }
    })) : /*#__PURE__*/React.createElement("div", {
      style: {
        height: 14,
        borderRadius: 7,
        background: "#1e293b",
        marginBottom: 14
      }
    }), [{
      label: "Soluble",
      value: fibSol,
      color: FIB_SOL_COLOR,
      note: "Slows digestion, feeds gut bacteria, helps lower cholesterol"
    }, {
      label: "Insoluble",
      value: fibInsol,
      color: FIB_INSOL_COLOR,
      note: "Adds bulk, speeds gut transit, supports bowel regularity"
    }].map(function (_ref45, i) {
      var label = _ref45.label,
        value = _ref45.value,
        color = _ref45.color,
        note = _ref45.note;
      return /*#__PURE__*/React.createElement("div", {
        key: label,
        style: {
          padding: "10px 0",
          borderBottom: i === 0 ? "1px solid #1e293b" : "none"
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          alignItems: "center",
          gap: 10
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          width: 12,
          height: 12,
          borderRadius: 3,
          background: color
        }
      }), /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 14,
          color: "#e2e8f0",
          fontWeight: 500
        }
      }, label)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 15,
          fontWeight: 700,
          color: color
        }
      }, n1(value), "g"), /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 11,
          color: "#64748b",
          marginLeft: 6
        }
      }, fibT > 0 ? Math.round(value / fibT * 100) : 0, "%"))), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 11,
          color: "#475569",
          marginTop: 4,
          paddingLeft: 22
        }
      }, note));
    })), fibCont.length > 0 && /*#__PURE__*/React.createElement("div", {
      style: S.card
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        fontWeight: 700,
        color: "#94a3b8",
        marginBottom: 10,
        textTransform: "uppercase",
        letterSpacing: "0.05em"
      }
    }, "Today's Sources"), fibCont.map(function (c, i) {
      return /*#__PURE__*/React.createElement("div", {
        key: i,
        style: {
          padding: "8px 0",
          borderBottom: i < fibCont.length - 1 ? "1px solid #1e293b" : "none"
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }
      }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 13,
          color: "#e2e8f0"
        }
      }, c.name), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 11,
          color: "#64748b"
        }
      }, c.label)), /*#__PURE__*/React.createElement("div", {
        style: {
          textAlign: "right"
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 13,
          fontWeight: 600,
          color: NUTRIENT_META.fib.color
        }
      }, n1(c.total), "g"), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 10,
          color: "#64748b"
        }
      }, n1(c.sol), " sol / ", n1(c.insol), " insol"))));
    })), /*#__PURE__*/React.createElement("div", {
      style: S.card
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        fontWeight: 700,
        color: "#94a3b8",
        marginBottom: 10,
        textTransform: "uppercase",
        letterSpacing: "0.05em"
      }
    }, "Top Sources (per 100g)"), _toConsumableArray(allFoods).sort(function (a, b) {
      var _b$fib, _a$fib;
      return ((_b$fib = b.fib) !== null && _b$fib !== void 0 ? _b$fib : 0) - ((_a$fib = a.fib) !== null && _a$fib !== void 0 ? _a$fib : 0);
    }).slice(0, 8).map(function (f, i) {
      var _f$fib, _f$fibSol3, _f$fibInsol3;
      return /*#__PURE__*/React.createElement("div", {
        key: f.id,
        style: {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "7px 0",
          borderBottom: i < 7 ? "1px solid #1e293b" : "none"
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 13,
          color: "#e2e8f0"
        }
      }, f.name), /*#__PURE__*/React.createElement("div", {
        style: {
          textAlign: "right"
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 13,
          fontWeight: 600,
          color: NUTRIENT_META.fib.color
        }
      }, n1((_f$fib = f.fib) !== null && _f$fib !== void 0 ? _f$fib : null), "g"), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 10,
          color: "#64748b"
        }
      }, n1((_f$fibSol3 = f.fibSol) !== null && _f$fibSol3 !== void 0 ? _f$fibSol3 : null), " sol / ", n1((_f$fibInsol3 = f.fibInsol) !== null && _f$fibInsol3 !== void 0 ? _f$fibInsol3 : null), " insol")));
    }))));
  }
  if (view === "fatDetail") {
    var fatSat = dayLog.reduce(function (s, e) {
      var _e$snapshot$fatSat, _f$fatSat;
      if (e.type === "exercise" || e.type === "supplement") return s;
      if (e.type === "recipe") return s + recipeSubtotal(e, "fatSat");
      if (e.snapshot) return s + ((_e$snapshot$fatSat = e.snapshot.fatSat) !== null && _e$snapshot$fatSat !== void 0 ? _e$snapshot$fatSat : 0) * e.amount / 100;
      var f = allFoods.find(function (x) {
        return x.id === e.foodId;
      });
      return s + (f ? ((_f$fatSat = f.fatSat) !== null && _f$fatSat !== void 0 ? _f$fatSat : 0) * e.amount / 100 : 0);
    }, 0);
    var fatMufa = dayLog.reduce(function (s, e) {
      var _e$snapshot$fatMufa, _f$fatMufa;
      if (e.type === "exercise" || e.type === "supplement") return s;
      if (e.type === "recipe") return s + recipeSubtotal(e, "fatMufa");
      if (e.snapshot) return s + ((_e$snapshot$fatMufa = e.snapshot.fatMufa) !== null && _e$snapshot$fatMufa !== void 0 ? _e$snapshot$fatMufa : 0) * e.amount / 100;
      var f = allFoods.find(function (x) {
        return x.id === e.foodId;
      });
      return s + (f ? ((_f$fatMufa = f.fatMufa) !== null && _f$fatMufa !== void 0 ? _f$fatMufa : 0) * e.amount / 100 : 0);
    }, 0);
    var fatPufa = dayLog.reduce(function (s, e) {
      var _e$snapshot$fatPufa, _f$fatPufa;
      if (e.type === "exercise" || e.type === "supplement") return s;
      if (e.type === "recipe") return s + recipeSubtotal(e, "fatPufa");
      if (e.snapshot) return s + ((_e$snapshot$fatPufa = e.snapshot.fatPufa) !== null && _e$snapshot$fatPufa !== void 0 ? _e$snapshot$fatPufa : 0) * e.amount / 100;
      var f = allFoods.find(function (x) {
        return x.id === e.foodId;
      });
      return s + (f ? ((_f$fatPufa = f.fatPufa) !== null && _f$fatPufa !== void 0 ? _f$fatPufa : 0) * e.amount / 100 : 0);
    }, 0);
    var fatT = fatSat + fatMufa + fatPufa;
    var fatCont = dayLog.flatMap(function (e) {
      var _f$fatSat2, _f$fatMufa2, _f$fatPufa2;
      if (e.type === "exercise" || e.type === "supplement") return [];
      if (e.type === "recipe") {
        var _n5 = computeEntryNutrition(e.derivedIngredients || [], allFoods);
        if (!_n5.fat) return [];
        return [{
          name: "\uD83D\uDCD6 ".concat(e.recipeName),
          label: "".concat(e.servings, " srv"),
          total: _n5.fat,
          sat: recipeSubtotal(e, "fatSat"),
          mufa: recipeSubtotal(e, "fatMufa"),
          pufa: recipeSubtotal(e, "fatPufa")
        }];
      }
      if (e.snapshot) {
        var _e$snapshot$fat, _e$snapshot$fatSat2, _e$snapshot$fatMufa2, _e$snapshot$fatPufa2;
        var t = ((_e$snapshot$fat = e.snapshot.fat) !== null && _e$snapshot$fat !== void 0 ? _e$snapshot$fat : 0) * e.amount / 100;
        if (!t) return [];
        return [{
          name: e.foodName,
          label: "".concat(e.amount, "g"),
          total: t,
          sat: ((_e$snapshot$fatSat2 = e.snapshot.fatSat) !== null && _e$snapshot$fatSat2 !== void 0 ? _e$snapshot$fatSat2 : 0) * e.amount / 100,
          mufa: ((_e$snapshot$fatMufa2 = e.snapshot.fatMufa) !== null && _e$snapshot$fatMufa2 !== void 0 ? _e$snapshot$fatMufa2 : 0) * e.amount / 100,
          pufa: ((_e$snapshot$fatPufa2 = e.snapshot.fatPufa) !== null && _e$snapshot$fatPufa2 !== void 0 ? _e$snapshot$fatPufa2 : 0) * e.amount / 100
        }];
      }
      var f = allFoods.find(function (x) {
        return x.id === e.foodId;
      });
      if (!f || !f.fat) return [];
      return [{
        name: e.foodName,
        label: "".concat(e.amount, "g"),
        total: f.fat * e.amount / 100,
        sat: ((_f$fatSat2 = f.fatSat) !== null && _f$fatSat2 !== void 0 ? _f$fatSat2 : 0) * e.amount / 100,
        mufa: ((_f$fatMufa2 = f.fatMufa) !== null && _f$fatMufa2 !== void 0 ? _f$fatMufa2 : 0) * e.amount / 100,
        pufa: ((_f$fatPufa2 = f.fatPufa) !== null && _f$fatPufa2 !== void 0 ? _f$fatPufa2 : 0) * e.amount / 100
      }];
    }).sort(function (a, b) {
      return b.total - a.total;
    });
    return /*#__PURE__*/React.createElement("div", {
      style: S.app
    }, /*#__PURE__*/React.createElement("div", {
      style: S.header
    }, /*#__PURE__*/React.createElement("button", {
      style: {
        background: "none",
        border: "none",
        color: "#94a3b8",
        fontSize: 15,
        cursor: "pointer"
      },
      onClick: function onClick() {
        return setView("log");
      }
    }, "\u2190 Back"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 15,
        fontWeight: 700
      }
    }, "Fat"), /*#__PURE__*/React.createElement("div", {
      style: {
        width: 48
      }
    })), /*#__PURE__*/React.createElement("div", {
      style: S.section
    }, /*#__PURE__*/React.createElement("div", {
      style: _objectSpread(_objectSpread({}, S.card), {}, {
        textAlign: "center"
      })
    }, function () {
      var k = "fat",
        goal = effectiveGoals[k] || 1,
        nv = allFoodsForRender.map(function (f) {
          return f[k];
        }).filter(function (v) {
          return v != null && v > 0;
        }).sort(function (a, b) {
          return a - b;
        }),
        med = nv.length ? nv[Math.floor(nv.length / 2)] : null;
      var est = 0;
      dayLog.forEach(function (e) {
        var _allFoodsForRender$fi10;
        if (e.type === "exercise" || e.type === "supplement") return;
        if (e.type === "recipe") {
          (e.derivedIngredients || []).forEach(function (ing) {
            var _allFoodsForRender$fi1;
            var v = ing.snapshot ? ing.snapshot[k] : (_allFoodsForRender$fi1 = allFoodsForRender.find(function (f) {
              return f.id === ing.foodId;
            })) === null || _allFoodsForRender$fi1 === void 0 ? void 0 : _allFoodsForRender$fi1[k];
            if (v === null || v === undefined) est += med != null ? ing.amount_g / 100 * med : 0;
          });
          return;
        }
        var v = e.snapshot ? e.snapshot[k] : (_allFoodsForRender$fi10 = allFoodsForRender.find(function (f) {
          return f.id === e.foodId;
        })) === null || _allFoodsForRender$fi10 === void 0 ? void 0 : _allFoodsForRender$fi10[k];
        if (v === null || v === undefined) est += med != null ? (e.amount || 0) / 100 * med : 0;
      });
      var arc = Math.min(est / goal, 1);
      return /*#__PURE__*/React.createElement(Ring, {
        value: totals.fat,
        max: effectiveGoals.fat,
        size: 100,
        stroke: 8,
        color: NUTRIENT_META.fat.color,
        nullArc: arc,
        simplified: displayMode === "simplified"
      }, /*#__PURE__*/React.createElement("text", {
        x: "50%",
        y: "45%",
        textAnchor: "middle",
        fill: "#e2e8f0",
        fontSize: 18,
        fontWeight: 700
      }, n1(totals.fat)), /*#__PURE__*/React.createElement("text", {
        x: "50%",
        y: "62%",
        textAnchor: "middle",
        fill: "#64748b",
        fontSize: 10
      }, "/ ", effectiveGoals.fat, "g"));
    }(), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 12,
        fontSize: 14,
        color: pct("fat") >= 100 ? "#10b981" : pct("fat") >= 60 ? "#f59e0b" : "#ef4444"
      }
    }, pct("fat"), "% of daily goal")), /*#__PURE__*/React.createElement("div", {
      style: S.card
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        fontWeight: 700,
        color: "#94a3b8",
        marginBottom: 12,
        textTransform: "uppercase",
        letterSpacing: "0.05em"
      }
    }, "Fat Types"), fatT > 0 ? /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        height: 14,
        borderRadius: 7,
        overflow: "hidden",
        marginBottom: 14,
        gap: 1
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: "".concat(fatSat / fatT * 100, "%"),
        background: FAT_SAT_COLOR
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        width: "".concat(fatMufa / fatT * 100, "%"),
        background: FAT_MUFA_COLOR
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        width: "".concat(fatPufa / fatT * 100, "%"),
        background: FAT_PUFA_COLOR
      }
    })) : /*#__PURE__*/React.createElement("div", {
      style: {
        height: 14,
        borderRadius: 7,
        background: "#1e293b",
        marginBottom: 14
      }
    }), [{
      label: "Saturated",
      value: fatSat,
      color: FAT_SAT_COLOR,
      note: "Limit where possible — raises LDL cholesterol"
    }, {
      label: "Monounsaturated",
      value: fatMufa,
      color: FAT_MUFA_COLOR,
      note: "Heart-healthy — oleic acid from avocado, olive oil, nuts"
    }, {
      label: "Polyunsaturated",
      value: fatPufa,
      color: FAT_PUFA_COLOR,
      note: "Includes omega-3 & omega-6 — essential, anti-inflammatory"
    }].map(function (_ref46, i) {
      var label = _ref46.label,
        value = _ref46.value,
        color = _ref46.color,
        note = _ref46.note;
      return /*#__PURE__*/React.createElement("div", {
        key: label,
        style: {
          padding: "10px 0",
          borderBottom: i < 2 ? "1px solid #1e293b" : "none"
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          alignItems: "center",
          gap: 10
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          width: 12,
          height: 12,
          borderRadius: 3,
          background: color
        }
      }), /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 14,
          color: "#e2e8f0",
          fontWeight: 500
        }
      }, label)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 15,
          fontWeight: 700,
          color: color
        }
      }, n1(value), "g"), /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 11,
          color: "#64748b",
          marginLeft: 6
        }
      }, fatT > 0 ? Math.round(value / fatT * 100) : 0, "%"))), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 11,
          color: "#475569",
          marginTop: 4,
          paddingLeft: 22
        }
      }, note));
    })), fatCont.length > 0 && /*#__PURE__*/React.createElement("div", {
      style: S.card
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        fontWeight: 700,
        color: "#94a3b8",
        marginBottom: 10,
        textTransform: "uppercase",
        letterSpacing: "0.05em"
      }
    }, "Today's Sources"), fatCont.map(function (c, i) {
      return /*#__PURE__*/React.createElement("div", {
        key: i,
        style: {
          padding: "8px 0",
          borderBottom: i < fatCont.length - 1 ? "1px solid #1e293b" : "none"
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }
      }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 13,
          color: "#e2e8f0"
        }
      }, c.name), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 11,
          color: "#64748b"
        }
      }, c.label)), /*#__PURE__*/React.createElement("div", {
        style: {
          textAlign: "right"
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 13,
          fontWeight: 600,
          color: NUTRIENT_META.fat.color
        }
      }, n1(c.total), "g"), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 10,
          color: "#64748b"
        }
      }, n1(c.sat), " sat \xB7 ", n1(c.mufa), " mufa \xB7 ", n1(c.pufa), " pufa"))));
    })), /*#__PURE__*/React.createElement("div", {
      style: S.card
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        fontWeight: 700,
        color: "#94a3b8",
        marginBottom: 10,
        textTransform: "uppercase",
        letterSpacing: "0.05em"
      }
    }, "Top Sources (per 100g)"), _toConsumableArray(allFoods).sort(function (a, b) {
      var _b$fat, _a$fat;
      return ((_b$fat = b.fat) !== null && _b$fat !== void 0 ? _b$fat : 0) - ((_a$fat = a.fat) !== null && _a$fat !== void 0 ? _a$fat : 0);
    }).slice(0, 8).map(function (f, i) {
      var _f$fat, _f$fatSat3, _f$fatMufa3, _f$fatPufa3;
      return /*#__PURE__*/React.createElement("div", {
        key: f.id,
        style: {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "7px 0",
          borderBottom: i < 7 ? "1px solid #1e293b" : "none"
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 13,
          color: "#e2e8f0"
        }
      }, f.name), /*#__PURE__*/React.createElement("div", {
        style: {
          textAlign: "right"
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 13,
          fontWeight: 600,
          color: NUTRIENT_META.fat.color
        }
      }, n1((_f$fat = f.fat) !== null && _f$fat !== void 0 ? _f$fat : null), "g"), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 10,
          color: "#64748b"
        }
      }, n1((_f$fatSat3 = f.fatSat) !== null && _f$fatSat3 !== void 0 ? _f$fatSat3 : null), " sat \xB7 ", n1((_f$fatMufa3 = f.fatMufa) !== null && _f$fatMufa3 !== void 0 ? _f$fatMufa3 : null), " mufa \xB7 ", n1((_f$fatPufa3 = f.fatPufa) !== null && _f$fatPufa3 !== void 0 ? _f$fatPufa3 : null), " pufa")));
    }))));
  }
  if (view === "detail" && detailNutrient) {
    var k = detailNutrient,
      meta = NUTRIENT_META[k];
    var cont = dayLog.flatMap(function (e) {
      var _e$snapshot$k4, _allFoods$find$k, _allFoods$find3;
      if (e.type === "exercise") return [];
      if (e.type === "supplement") {
        var v = suppContrib(e, k);
        return v > 0 ? [{
          name: "\uD83D\uDC8A ".concat(e.stackName),
          label: "supplement",
          value: v,
          isSupp: true
        }] : [];
      }
      if (e.type === "recipe") {
        var _n6 = computeEntryNutrition(e.derivedIngredients || [], allFoods);
        return _n6[k] ? [{
          name: "\uD83D\uDCD6 ".concat(e.recipeName),
          label: "".concat(e.servings, " srv"),
          value: _n6[k]
        }] : [];
      }
      var val = e.snapshot ? ((_e$snapshot$k4 = e.snapshot[k]) !== null && _e$snapshot$k4 !== void 0 ? _e$snapshot$k4 : 0) * e.amount / 100 : ((_allFoods$find$k = (_allFoods$find3 = allFoods.find(function (x) {
        return x.id === e.foodId;
      })) === null || _allFoods$find3 === void 0 ? void 0 : _allFoods$find3[k]) !== null && _allFoods$find$k !== void 0 ? _allFoods$find$k : 0) * e.amount / 100;
      return val ? [{
        name: e.foodName,
        label: "".concat(e.amount, "g"),
        value: val
      }] : [];
    }).sort(function (a, b) {
      return b.value - a.value;
    });
    return /*#__PURE__*/React.createElement("div", {
      style: S.app
    }, /*#__PURE__*/React.createElement("div", {
      style: S.header
    }, /*#__PURE__*/React.createElement("button", {
      style: {
        background: "none",
        border: "none",
        color: "#94a3b8",
        fontSize: 15,
        cursor: "pointer"
      },
      onClick: function onClick() {
        return setView("log");
      }
    }, "\u2190 Back"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 15,
        fontWeight: 700
      }
    }, meta.label), /*#__PURE__*/React.createElement("div", {
      style: {
        width: 48
      }
    })), /*#__PURE__*/React.createElement("div", {
      style: S.section
    }, /*#__PURE__*/React.createElement("div", {
      style: _objectSpread(_objectSpread({}, S.card), {}, {
        textAlign: "center"
      })
    }, function () {
      var goal = goals[k] || 1,
        nv = allFoodsForRender.map(function (f) {
          return f[k];
        }).filter(function (v) {
          return v != null && v > 0;
        }).sort(function (a, b) {
          return a - b;
        }),
        med = nv.length ? nv[Math.floor(nv.length / 2)] : null;
      var est = 0;
      dayLog.forEach(function (e) {
        var _allFoodsForRender$fi12;
        if (e.type === "exercise" || e.type === "supplement") return;
        if (e.type === "recipe") {
          (e.derivedIngredients || []).forEach(function (ing) {
            var _allFoodsForRender$fi11;
            var v = ing.snapshot ? ing.snapshot[k] : (_allFoodsForRender$fi11 = allFoodsForRender.find(function (f) {
              return f.id === ing.foodId;
            })) === null || _allFoodsForRender$fi11 === void 0 ? void 0 : _allFoodsForRender$fi11[k];
            if (v === null || v === undefined) est += med != null ? ing.amount_g / 100 * med : 0;
          });
          return;
        }
        var v = e.snapshot ? e.snapshot[k] : (_allFoodsForRender$fi12 = allFoodsForRender.find(function (f) {
          return f.id === e.foodId;
        })) === null || _allFoodsForRender$fi12 === void 0 ? void 0 : _allFoodsForRender$fi12[k];
        if (v === null || v === undefined) est += med != null ? (e.amount || 0) / 100 * med : 0;
      });
      var arc = Math.min(est / goal, 1);
      return /*#__PURE__*/React.createElement(Ring, {
        value: totals[k],
        max: goals[k],
        size: 100,
        stroke: 8,
        color: meta.color,
        nullArc: arc,
        simplified: displayMode === "simplified"
      }, /*#__PURE__*/React.createElement("text", {
        x: "50%",
        y: "45%",
        textAnchor: "middle",
        fill: "#e2e8f0",
        fontSize: 18,
        fontWeight: 700
      }, n1(totals[k])), /*#__PURE__*/React.createElement("text", {
        x: "50%",
        y: "62%",
        textAnchor: "middle",
        fill: "#64748b",
        fontSize: 10
      }, "/ ", goals[k], " ", meta.unit));
    }(), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 12,
        fontSize: 14,
        color: pct(k) >= 100 ? "#10b981" : pct(k) >= 60 ? "#f59e0b" : "#ef4444"
      }
    }, pct(k), "% of daily goal")), cont.length > 0 && /*#__PURE__*/React.createElement("div", {
      style: S.card
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        fontWeight: 700,
        color: "#94a3b8",
        marginBottom: 10,
        textTransform: "uppercase"
      }
    }, "Today's Sources"), cont.map(function (c, i) {
      return /*#__PURE__*/React.createElement("div", {
        key: i,
        style: {
          display: "flex",
          justifyContent: "space-between",
          padding: "6px 0",
          borderBottom: "1px solid #1e293b",
          background: c.isSupp ? "rgba(167,139,250,0.05)" : "transparent",
          borderRadius: c.isSupp ? 6 : 0
        }
      }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 13,
          color: c.isSupp ? "#c4b5fd" : "#e2e8f0"
        }
      }, c.name), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 11,
          color: "#64748b"
        }
      }, c.label)), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 13,
          fontWeight: 600,
          color: meta.color
        }
      }, n1(c.value), " ", meta.unit));
    })), /*#__PURE__*/React.createElement("div", {
      style: S.card
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        fontWeight: 700,
        color: "#94a3b8",
        marginBottom: 10,
        textTransform: "uppercase"
      }
    }, "Top Sources (per 100g)"), _toConsumableArray(allFoods).sort(function (a, b) {
      var _b$k, _a$k;
      return ((_b$k = b[k]) !== null && _b$k !== void 0 ? _b$k : 0) - ((_a$k = a[k]) !== null && _a$k !== void 0 ? _a$k : 0);
    }).slice(0, 8).map(function (f, i) {
      var _f$k5;
      return /*#__PURE__*/React.createElement("div", {
        key: f.id,
        style: {
          display: "flex",
          justifyContent: "space-between",
          padding: "6px 0",
          borderBottom: "1px solid #1e293b"
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 13,
          color: "#e2e8f0"
        }
      }, f.name), /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 13,
          fontWeight: 600,
          color: meta.color
        }
      }, n1((_f$k5 = f[k]) !== null && _f$k5 !== void 0 ? _f$k5 : null), " ", meta.unit));
    }))));
  }

  // ── EDIT LOGGED RECIPE ────────────────────────────────────────────────
  if (view === "editLoggedRecipe" && editingLogEntry) {
    var recipe = recipes.find(function (r) {
      return r.id === editingLogEntry.recipeId;
    });
    var servings = parseFloat(editLogServings) || 1;
    var previewDI = editingLogEntry.derivedIngredients || [];
    if (previewDI.length > 0) {
      // Scale derivedIngredients proportionally — preserves log-time removals
      var origServings = editingLogEntry.servings || 1;
      var scale = servings / origServings;
      previewDI = previewDI.map(function (ing) {
        return _objectSpread(_objectSpread({}, ing), {}, {
          amount_g: Math.round(ing.amount_g * scale * 10) / 10
        });
      });
    } else if (recipe) {
      // Fallback for old log entries that predate W1 (no derivedIngredients saved)
      var _rs = Math.max(Number(recipe.servings) || 1, 0.01);
      var _frac = servings / _rs;
      previewDI = recipe.ingredients.map(function (ing) {
        return {
          foodId: ing.foodId,
          foodName: ing.foodName,
          amount_g: Math.round(ing.amount_g * _frac * 10) / 10
        };
      });
    }
    var _nut = computeEntryNutrition(previewDI, allFoodsForRender);
    return /*#__PURE__*/React.createElement("div", {
      style: S.app
    }, /*#__PURE__*/React.createElement("div", {
      style: S.header
    }, /*#__PURE__*/React.createElement("button", {
      style: {
        background: "none",
        border: "none",
        color: "#94a3b8",
        fontSize: 15,
        cursor: "pointer"
      },
      onClick: function onClick() {
        setEditingLogEntry(null);
        setView("log");
      }
    }, "\u2190 Back"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 15,
        fontWeight: 700
      }
    }, "Edit Log Entry"), /*#__PURE__*/React.createElement("button", {
      style: {
        background: "none",
        border: "none",
        color: "#3b82f6",
        fontSize: 13,
        fontWeight: 700,
        cursor: "pointer"
      },
      onClick: saveEditedRecipeEntry
    }, "Save")), /*#__PURE__*/React.createElement("div", {
      style: S.section
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 14,
        fontWeight: 600,
        color: "#a78bfa",
        marginBottom: 12
      }
    }, "\uD83D\uDCD6 ", editingLogEntry.recipeName), /*#__PURE__*/React.createElement("div", {
      style: S.card
    }, /*#__PURE__*/React.createElement("label", {
      style: S.label
    }, "Servings"), /*#__PURE__*/React.createElement("input", {
      style: _objectSpread(_objectSpread({}, S.input), {}, {
        marginBottom: 8
      }),
      type: "number",
      inputMode: "decimal",
      value: editLogServings,
      onChange: function onChange(e) {
        return setEditLogServings(e.target.value);
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 6,
        flexWrap: "wrap",
        marginBottom: 16
      }
    }, [0.5, 1, 1.5, 2, 3, 4].map(function (q) {
      return /*#__PURE__*/React.createElement("button", {
        key: q,
        style: S.pill(editLogServings === String(q)),
        onClick: function onClick() {
          return setEditLogServings(String(q));
        }
      }, q === 0.5 ? "½" : q);
    })), /*#__PURE__*/React.createElement("label", {
      style: S.label
    }, "Meal"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 6,
        flexWrap: "wrap",
        marginBottom: 16
      }
    }, MEALS.map(function (m) {
      return /*#__PURE__*/React.createElement("button", {
        key: m,
        style: S.pill(editLogMeal === m),
        onClick: function onClick() {
          return setEditLogMeal(m);
        }
      }, m);
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        background: "#0a0f1a",
        borderRadius: 10,
        padding: 12
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        fontWeight: 700,
        color: "#475569",
        marginBottom: 8,
        textTransform: "uppercase"
      }
    }, "Preview at ", n1(servings), " serving", servings === 1 ? "" : "s"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(5,1fr)",
        gap: 6
      }
    }, MACROS.map(function (k) {
      var _nut$k3, _nut$k4;
      return /*#__PURE__*/React.createElement("div", {
        key: k,
        style: {
          textAlign: "center"
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 14,
          fontWeight: 700,
          color: NUTRIENT_META[k].color
        }
      }, k === "cal" ? fmtE((_nut$k3 = _nut[k]) !== null && _nut$k3 !== void 0 ? _nut$k3 : 0) : n1((_nut$k4 = _nut[k]) !== null && _nut$k4 !== void 0 ? _nut$k4 : null)), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 10,
          color: "#64748b"
        }
      }, k === "cal" ? energyLabel : NUTRIENT_META[k].label));
    })))), /*#__PURE__*/React.createElement("div", {
      style: S.card
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        fontWeight: 700,
        color: "#94a3b8",
        marginBottom: 10,
        textTransform: "uppercase",
        letterSpacing: "0.05em"
      }
    }, "Ingredients at this serving"), previewDI.map(function (ing, i) {
      return /*#__PURE__*/React.createElement("div", {
        key: i,
        style: {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "7px 0",
          borderBottom: i < previewDI.length - 1 ? "1px solid #1e293b" : "none"
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 13,
          color: "#e2e8f0"
        }
      }, ing.foodName), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 12,
          color: "#64748b"
        }
      }, ing.amount_g, "g"));
    }), previewDI.length === 0 && /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        color: "#475569",
        textAlign: "center",
        padding: "12px 0"
      }
    }, "No ingredient data captured at log time"))));
  }

  // ── EDIT LOGGED EXERCISE ──────────────────────────────────────────────
  if (view === "editLoggedExercise" && editingLogEntry) {
    var _dur = parseFloat(editLogDuration) || 0;
    var _act = EXERCISE_ACTIVITIES.find(function (a) {
      return a.id === editLogActivityId;
    }) || EXERCISE_ACTIVITIES[0];
    var _wt2 = parseFloat(profile === null || profile === void 0 ? void 0 : profile.weightKg) || 70;
    var _autoBurn = Math.round(_act.met * _wt2 * (_dur / 60));
    var previewBurn = editLogBurn !== "" ? parseInt(editLogBurn) || 0 : _autoBurn;
    var _actGroups = EXERCISE_ACTIVITIES.reduce(function (acc, a) {
      if (!acc[a.label]) acc[a.label] = [];
      acc[a.label].push(a);
      return acc;
    }, {});
    return /*#__PURE__*/React.createElement("div", {
      style: S.app
    }, /*#__PURE__*/React.createElement("div", {
      style: S.header
    }, /*#__PURE__*/React.createElement("button", {
      style: {
        background: "none",
        border: "none",
        color: "#94a3b8",
        fontSize: 15,
        cursor: "pointer"
      },
      onClick: function onClick() {
        setEditingLogEntry(null);
        setView("log");
      }
    }, "\u2190 Back"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 15,
        fontWeight: 700
      }
    }, "Edit Exercise"), /*#__PURE__*/React.createElement("button", {
      style: {
        background: "none",
        border: "none",
        color: "#3b82f6",
        fontSize: 13,
        fontWeight: 700,
        cursor: "pointer"
      },
      onClick: saveEditedExerciseEntry
    }, "Save")), /*#__PURE__*/React.createElement("div", {
      style: S.section
    }, !profile.weightKg && /*#__PURE__*/React.createElement("div", {
      style: {
        background: "#2d1f00",
        border: "1px solid #f59e0b",
        borderRadius: 10,
        padding: "10px 14px",
        marginBottom: 12,
        fontSize: 12,
        color: "#f59e0b"
      }
    }, "No weight set in Settings \u2014 using 70kg default"), /*#__PURE__*/React.createElement("div", {
      style: S.card
    }, /*#__PURE__*/React.createElement("label", {
      style: S.label
    }, "Activity"), Object.entries(_actGroups).map(function (_ref47) {
      var _ref48 = _slicedToArray(_ref47, 2),
        grp = _ref48[0],
        acts = _ref48[1];
      return /*#__PURE__*/React.createElement("div", {
        key: grp,
        style: {
          marginBottom: 10
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 11,
          color: "#475569",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          marginBottom: 6
        }
      }, grp), /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          gap: 6,
          flexWrap: "wrap"
        }
      }, acts.map(function (a) {
        return /*#__PURE__*/React.createElement("button", {
          key: a.id,
          style: S.pill(editLogActivityId === a.id),
          onClick: function onClick() {
            setEditLogActivityId(a.id);
            setEditLogBurn("");
          }
        }, a.intensity);
      })));
    }), /*#__PURE__*/React.createElement("label", {
      style: _objectSpread(_objectSpread({}, S.label), {}, {
        marginTop: 8
      })
    }, "Duration (minutes)"), /*#__PURE__*/React.createElement("input", {
      style: _objectSpread(_objectSpread({}, S.input), {}, {
        marginBottom: 8
      }),
      type: "number",
      inputMode: "numeric",
      value: editLogDuration,
      onChange: function onChange(e) {
        setEditLogDuration(e.target.value);
        setEditLogBurn("");
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 6,
        flexWrap: "wrap",
        marginBottom: 16
      }
    }, [30, 45, 60, 90, 120, 180].map(function (d) {
      return /*#__PURE__*/React.createElement("button", {
        key: d,
        style: S.pill(editLogDuration === String(d) && editLogBurn === ""),
        onClick: function onClick() {
          setEditLogDuration(String(d));
          setEditLogBurn("");
        }
      }, d);
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        background: "#0a0f1a",
        borderRadius: 10,
        padding: 14,
        marginBottom: 16
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        fontWeight: 700,
        color: "#475569",
        marginBottom: 10,
        textTransform: "uppercase"
      }
    }, "Estimated Burn"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 12
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 32,
        fontWeight: 700,
        color: "#4ade80"
      }
    }, fmtE(previewBurn)), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: "#64748b"
      }
    }, energyLabel, /*#__PURE__*/React.createElement("br", null), _act.label, " \xB7 ", _act.intensity, /*#__PURE__*/React.createElement("br", null), _dur, " min @ MET ", _act.met)), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 12
      }
    }, /*#__PURE__*/React.createElement("label", {
      style: S.label
    }, "Override (optional)"), /*#__PURE__*/React.createElement("input", {
      style: S.input,
      type: "number",
      inputMode: "numeric",
      placeholder: "Auto: " + _autoBurn + " " + energyLabel,
      value: editLogBurn,
      onChange: function onChange(e) {
        return setEditLogBurn(e.target.value);
      }
    }))), /*#__PURE__*/React.createElement("button", {
      style: {
        width: "100%",
        padding: 14,
        borderRadius: 12,
        border: "none",
        background: _dur > 0 ? "#16a34a" : "#1e293b",
        color: _dur > 0 ? "#fff" : "#64748b",
        fontSize: 15,
        fontWeight: 700,
        cursor: _dur > 0 ? "pointer" : "default"
      },
      disabled: _dur <= 0,
      onClick: saveEditedExerciseEntry
    }, "Save Changes"))));
  }

  // ── EDIT LOGGED SUPPLEMENT ────────────────────────────────────────────
  if (view === "editLoggedSupp" && editingLogEntry) {
    return /*#__PURE__*/React.createElement("div", {
      style: S.app
    }, /*#__PURE__*/React.createElement("div", {
      style: S.header
    }, /*#__PURE__*/React.createElement("button", {
      style: {
        background: "none",
        border: "none",
        color: "#94a3b8",
        fontSize: 15,
        cursor: "pointer"
      },
      onClick: function onClick() {
        setEditingLogEntry(null);
        setView("log");
      }
    }, "\u2190 Back"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 15,
        fontWeight: 700
      }
    }, "Edit Supplement Log"), /*#__PURE__*/React.createElement("button", {
      style: {
        background: "none",
        border: "none",
        color: "#3b82f6",
        fontSize: 13,
        fontWeight: 700,
        cursor: "pointer"
      },
      onClick: saveEditedSuppEntry
    }, "Save")), /*#__PURE__*/React.createElement("div", {
      style: S.section
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 14,
        fontWeight: 600,
        color: "#c4b5fd",
        marginBottom: 12
      }
    }, "\uD83D\uDC8A ", editingLogEntry.stackName), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: "#64748b",
        marginBottom: 10
      }
    }, "Adjust doses. Tap a dose field to override."), /*#__PURE__*/React.createElement("div", {
      style: S.card
    }, editLogSuppItems.map(function (item, idx) {
      return /*#__PURE__*/React.createElement("div", {
        key: idx,
        style: _objectSpread({}, S.suppRow)
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          flex: 1
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 14,
          fontWeight: 500,
          color: "#e2e8f0"
        }
      }, item.name), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 12,
          color: "#64748b",
          marginTop: 2
        }
      }, "Logged: ", item.dose_amount, item.dose_unit)), /*#__PURE__*/React.createElement("div", {
        style: {
          width: 100
        }
      }, /*#__PURE__*/React.createElement("input", {
        style: _objectSpread(_objectSpread({}, S.input), {}, {
          width: "100%",
          padding: "6px 8px",
          fontSize: 13,
          textAlign: "right"
        }),
        type: "number",
        inputMode: "decimal",
        placeholder: String(item.dose_amount),
        value: item.doseOverride,
        onChange: function onChange(e) {
          return setEditLogSuppItems(function (prev) {
            return prev.map(function (x, i) {
              return i === idx ? _objectSpread(_objectSpread({}, x), {}, {
                doseOverride: e.target.value
              }) : x;
            });
          });
        }
      }), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 10,
          color: "#475569",
          textAlign: "right",
          marginTop: 2
        }
      }, item.dose_unit)));
    })), /*#__PURE__*/React.createElement("button", {
      style: {
        width: "100%",
        padding: 14,
        borderRadius: 12,
        border: "none",
        background: "#7c3aed",
        color: "#fff",
        fontSize: 15,
        fontWeight: 700,
        cursor: "pointer",
        marginTop: 8
      },
      onClick: saveEditedSuppEntry
    }, "Save Changes")));
  }

  // ── MANAGE CUSTOM FOODS ───────────────────────────────────────────────
  if (view === "manageCustomFoods") {
    var active = customFoods.filter(function (f) {
      return !f.deleted;
    });
    var deleted = customFoods.filter(function (f) {
      return f.deleted;
    });
    return /*#__PURE__*/React.createElement("div", {
      style: S.app
    }, /*#__PURE__*/React.createElement("div", {
      style: S.header
    }, /*#__PURE__*/React.createElement("button", {
      style: {
        background: "none",
        border: "none",
        color: "#94a3b8",
        fontSize: 15,
        cursor: "pointer"
      },
      onClick: function onClick() {
        return setView("add");
      }
    }, "\u2190 Back"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 15,
        fontWeight: 700
      }
    }, "Custom Foods"), /*#__PURE__*/React.createElement("button", {
      style: {
        background: "none",
        border: "none",
        color: "#3b82f6",
        fontSize: 13,
        fontWeight: 600,
        cursor: "pointer"
      },
      onClick: function onClick() {
        resetCfForm();
        setView("customAdd");
      }
    }, "+ New"), /*#__PURE__*/React.createElement("button", {
      style: {
        background: "none",
        border: "none",
        color: active.length === 0 ? "#1e293b" : "#3b82f6",
        fontSize: 13,
        fontWeight: 600,
        cursor: active.length === 0 ? "default" : "pointer"
      },
      onClick: function onClick() {
        var envelope = buildCustomFoodPatch(customFoods);
        var blob = new Blob([JSON.stringify(envelope, null, 2)], {
          type: "application/json"
        });
        var url = URL.createObjectURL(blob);
        var a = document.createElement("a");
        a.href = url;
        a.download = "nutritrack-custom-foods-patch-".concat(new Date().toISOString().slice(0, 10), ".json");
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setTimeout(function () {
          return URL.revokeObjectURL(url);
        }, 10000);
        setCustomFoodExportMsg("Patch exported — append each entry to the foods array in foods.json.");
        setTimeout(function () {
          return setCustomFoodExportMsg(null);
        }, 6000);
      },
      disabled: active.length === 0
    }, "Export patch")), /*#__PURE__*/React.createElement("div", {
      style: S.section
    }, customFoodExportMsg && /*#__PURE__*/React.createElement("div", {
      style: {
        background: "#052e1a",
        border: "1px solid #10b981",
        borderRadius: 10,
        padding: "10px 14px",
        marginBottom: 12,
        fontSize: 12,
        color: "#34d399"
      }
    }, "\u2713 ", customFoodExportMsg), /*#__PURE__*/React.createElement("div", {
      style: _objectSpread(_objectSpread({}, S.card), {}, {
        marginBottom: 12
      })
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: "#94a3b8",
        lineHeight: 1.6
      }
    }, /*#__PURE__*/React.createElement("strong", {
      style: {
        color: "#e2e8f0"
      }
    }, "Promote to foods.json:"), " Export a JSON patch of your active custom foods. Every nutrient field (macros, fibre/fat subtypes, amino acids, micronutrients) is included \u2014 unknown values are ", /*#__PURE__*/React.createElement("code", {
      style: {
        color: "#cbd5e1"
      }
    }, "null"), ", matching foods.json schema v1. Apply by appending each entry to the ", /*#__PURE__*/React.createElement("code", {
      style: {
        color: "#cbd5e1"
      }
    }, "foods"), " array in foods.json.")), active.length === 0 && deleted.length === 0 && /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: "center",
        padding: "40px 0",
        color: "#475569"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 32,
        marginBottom: 8
      }
    }, "\uD83E\uDD58"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 14
      }
    }, "No custom foods yet")), active.length > 0 && /*#__PURE__*/React.createElement("div", {
      style: S.card
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        fontWeight: 700,
        color: "#94a3b8",
        marginBottom: 10,
        textTransform: "uppercase",
        letterSpacing: "0.05em"
      }
    }, "Active (", active.length, ")"), active.map(function (f, i) {
      return /*#__PURE__*/React.createElement("div", {
        key: f.id,
        style: {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 0",
          borderBottom: i < active.length - 1 ? "1px solid #1e293b" : "none"
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          flex: 1,
          minWidth: 0
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 14,
          fontWeight: 500,
          color: "#e2e8f0"
        }
      }, f.name), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 11,
          color: "#64748b"
        }
      }, f.cat, " \xB7 ", fmtE(f.cal), " ", energyLabel, "/100g")), /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          gap: 6,
          flexShrink: 0
        }
      }, /*#__PURE__*/React.createElement("button", {
        style: {
          background: "none",
          border: "1px solid #3b82f6",
          borderRadius: 8,
          color: "#3b82f6",
          fontSize: 12,
          fontWeight: 600,
          padding: "4px 10px",
          cursor: "pointer"
        },
        onClick: function onClick() {
          return openEditCustomFood(f);
        }
      }, "Edit"), /*#__PURE__*/React.createElement("button", {
        style: {
          background: "none",
          border: "1px solid #ef4444",
          borderRadius: 8,
          color: "#ef4444",
          fontSize: 12,
          fontWeight: 600,
          padding: "4px 10px",
          cursor: "pointer"
        },
        onClick: function onClick() {
          return softDeleteCustomFood(f.id);
        }
      }, "Delete")));
    })), deleted.length > 0 && /*#__PURE__*/React.createElement("div", {
      style: _objectSpread(_objectSpread({}, S.card), {}, {
        marginTop: 12,
        opacity: 0.7
      })
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        fontWeight: 700,
        color: "#64748b",
        marginBottom: 10,
        textTransform: "uppercase",
        letterSpacing: "0.05em"
      }
    }, "Deleted (", deleted.length, ")"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: "#475569",
        marginBottom: 10
      }
    }, "Deleted foods are hidden from search but historical log entries still display correctly."), deleted.map(function (f, i) {
      return /*#__PURE__*/React.createElement("div", {
        key: f.id,
        style: {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 0",
          borderBottom: i < deleted.length - 1 ? "1px solid #1e293b" : "none"
        }
      }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 14,
          fontWeight: 500,
          color: "#64748b",
          textDecoration: "line-through"
        }
      }, f.name), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 11,
          color: "#475569"
        }
      }, f.cat, " \xB7 ", fmtE(f.cal), " ", energyLabel, "/100g")), /*#__PURE__*/React.createElement("button", {
        style: {
          background: "none",
          border: "1px solid #3b82f6",
          borderRadius: 8,
          color: "#3b82f6",
          fontSize: 12,
          fontWeight: 600,
          padding: "4px 10px",
          cursor: "pointer"
        },
        onClick: function onClick() {
          return restoreCustomFood(f.id);
        }
      }, "Restore"));
    }))));
  }
  return null;
}
window.NutriTrack = NutriTrack;
window._MainApp = (typeof NutriTrack !== "undefined" ? NutriTrack : null);
