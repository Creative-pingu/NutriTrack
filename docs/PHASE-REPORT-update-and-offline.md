# Phase Report: Update Propagation & Offline Reliability

**Date:** 2026-07-25
**Branch:** `main`
**Phase start (broken state):** `c56d488` (Bump to v55)
**Phase end (current HEAD):** `c8644a7` (Add Settings > About panel)
**Status:** ✅ Complete — app updates propagate, app boots and runs offline, on-device diagnostics added

---

## 1. Problem Statement

Code updates committed to `main` were not reflected in the running app on the production iPhone 16e. The app stalled on a "NutriTrack / Initializing / V54" loading screen and never rendered. The reported symptom ("SW checking / Initializing / V54") pointed at the service worker update pipeline, but investigation revealed a **cascade of compounding bugs** spanning the SW lifecycle, the bootstrap script, the JSX preprocessor, the Babel config, and the offline cache strategy.

---

## 2. Root Causes (in discovery order)

### RC-1 — Service worker unregistered on every page load
`index.html` called `navigator.serviceWorker.getRegistrations()` → `unregister()` on **every load**, then re-registered 3s later. This defeated the Phase 6d update-detection in `NutriTrack.jsx` (`updatefound` / `controllerchange`) — the SW was always wiped before React mounted, so a `waiting` worker could never be detected. Endless unregister → register → unregister cycle.

### RC-2 — Version strings out of sync
The version was hardcoded in four places and had drifted: `index.html` build badge and cache-busters said `v54`, while `sw.js` `CACHE_VERSION` was `v55`. No single source of truth.

### RC-3 — Fatal JavaScript parse error in `index.html`
Three single-quoted string literals in the bootstrap `<script>` contained **raw newline bytes (0x0A)** instead of the `\n` escape sequence:
- `code.split('↵')`
- `}).join('↵')`
- `'Error: ' + e.message + '↵↵' + (e.stack...)`

A raw newline inside a single-quoted JS string is a `SyntaxError`. This killed the **entire** `<script>` block at parse time — so `addStep()`, `startLoading()`, and `navigator.serviceWorker.register()` never executed. The build badge rendered (static HTML, no JS) but nothing else ran. This is why the version appeared to "update" (V54→V55) while the app stayed dead.

### RC-4 — `Object.assign(window, window.lucide)` throwing on Safari
`setupGlobals()` copied hundreds of lucide icon properties onto `window`. On Safari/iOS several `window` properties (`name`, `length`, `status`, `origin`, ...) are non-writable, so `Object.assign` threw `TypeError: Attempted to assign to readonly property`, aborting setup. **The app did not use any lucide icons** (it draws inline `<svg>`), so this was both unused and the cause of failure.

### RC-5 — Broken JSX import/export stripping
The `loadApp()` preprocessor had two bugs:
1. `code.replace(/exports+default/g, ...)` — the regex `exports+` matches `export` + one-or-more `s` (i.e. `exportsdefault`), **not** `export default`. It matched nothing.
2. The fallback line filter removed every line starting with `export `, including `export default function NutriTrack() {` — the declaration opening the ~2400-line component. Stripping it left the function body at module scope → Babel error `return outside of function. (1169:15)`.

### RC-6 — Babel automatic JSX runtime emitted an un-runnable import
The default React preset (automatic runtime) prepended `import { jsx as _jsx, ... } from "react/jsx-runtime"`. With `env` configured `modules: false`, this stayed as a static ES import, which `eval()` cannot execute in script scope → `Unexpected token '{'. import call expects one or two arguments.`

### RC-7 — CDN scripts not cached (offline bootstrap failure)
React, ReactDOM, and Babel were loaded from `unpkg.com` (cross-origin). The SW only handled same-origin requests, so offline the bootstrap died at "React CDN failed" before the app could start.

### RC-8 — `foods.json` offline fallback missed the cache
The SW precached `foods.json` under the bare path `/NutriTrack/foods.json`, but the JSX fetches `/NutriTrack/foods.json?v=3`. The offline fallback `caches.match(request)` matched the full URL including `?v=3`, missing the precached bare-path entry → `loadFoodDB()` threw → "Food database failed to load."

### RC-9 — `index.html` not served when offline
The SW handled `index.html` with a bare `return` (pass-through, no `event.respondWith()`). Online: fine. Offline: no network and nothing served → Safari refused to load the page entirely ("not connected to the internet"). The app never even started.

---

## 3. Fixes Applied

| # | Commit | Fix |
|---|--------|-----|
| 1 | `9465806` | Removed unregister-on-load; register SW once, non-blocking; expose `window._swReady`. Introduced `APP_VERSION` constant; synced v54→v55. |
| 2 | `13e3f97` | Replaced raw newlines in three string literals with proper `\n` escape sequences. Verified with `node --check`. |
| 3 | `de9f556` | Removed lucide CDN load + `Object.assign(window, window.lucide)` (unused). Lowered `checkAllLoaded` threshold 4→3; renumbered step indices. |
| 4 | `e788708` | Replaced crude line filter with precise regex transforms: drop `import {...} from "react"`, convert `export default function` → `function` (preserve declaration), strip bare `export`, append `window._MainApp = NutriTrack`. |
| 5 | `b6142e4` | Switched Babel React preset to `runtime: 'classic'` → JSX compiles to `React.createElement` (React is global), zero static imports. |
| 6 | `9c9a411` | Added `CDN_ASSETS` list to SW; precache best-effort; cache-first fetch handler with background revalidation + `ignoreSearch`. Fixed foods.json fallback to use `ignoreSearch: true`. |
| 7 | `5b13a2b` | Replaced `index.html` pass-through with network-first + cache fallback; cache under both path forms; fallback checks both with `ignoreSearch`. |
| 8 | `74411ee` | Hid `#sw-status`, `#build-info`, `#load-steps` via `display:none`; step transitions now `console.log`; error panel remains visible on failure. |
| 9 | `c8644a7` | Added Settings > About panel (app version, foods DB version, last validation, connection/SW/food-DB status). `index.html` exposes `window.APP_VERSION`. |

**Total diff:** 3 files, +133 / −11 lines across the phase.

---

## 4. Verification Performed

- **Syntax validation:** every `index.html` and `sw.js` edit verified with `node --check`.
- **Babel transform:** the real `@babel/standalone@8.0.4` was run locally against the processed `NutriTrack.jsx` after the RC-5 and RC-6 fixes — confirmed 0 static imports, 1035 `React.createElement` calls, output passes `node --check`.
- **Version sync:** `CACHE_VERSION` (sw.js), `APP_VERSION` (index.html), and build badge confirmed in sync at each bump. `?v=` cache-buster on the JSX fetch now derives from `APP_VERSION` to prevent drift.
- **On-device:** confirmed by the user — V55 then V56 then V58 propagated; app renders; offline loads after one online precache load.

---

## 5. Current Architecture (post-fix)

### Update flow
1. `index.html` loads network-first (SW never caches it as stale; fresh shell every online load; cached copy served offline).
2. SW registers once per load, non-blocking; sets `window._swReady`.
3. `sw.js` installs with `skipWaiting()`; activates with `clients.claim()`; deletes old caches on `CACHE_VERSION` bump.
4. `NutriTrack.jsx` Phase 6d detects `reg.waiting` → shows update banner → `postMessage({type:"SKIP_WAITING"})` → `controllerchange` → reload. This now works because the SW is no longer unregistered on load.

### Offline flow
- **index.html:** network-first, cache fallback (both `/NutriTrack/` and `/NutriTrack/index.html` keys).
- **CDN scripts (React/ReactDOM/Babel):** precached best-effort at install; cache-first with background revalidation; `ignoreSearch` so `?v=4` cache-busters don't fragment the cache.
- **foods.json:** network-first, cache fallback with `ignoreSearch: true`.
- **NutriTrack.jsx + icons:** cache-first (`ignoreSearch: true`), network fallback.

### Diagnostics
- Loading screen: clean splash ("NutriTrack / Loading…"); step checklist hidden, logged to console; error panel visible on failure.
- Settings > About: app version, foods DB version, last validation timestamp, connection/SW/food-DB status (color-coded).

---

## 6. Decisions & Trade-offs

- **Kept the `if (!loaded) return` startup gate** in `NutriTrack.jsx`. It prevents rendering the main UI before `localStorage` data loads, which avoids flashing default state and avoids the save-effects overwriting stored data with defaults. Intentional, kept.
- **lucide removed entirely** rather than fixed in place. The app draws inline SVGs and never used lucide, so removing it saved ~700KB and eliminated the Safari `Object.assign` failure. No feature regression.
- **Babel classic runtime** chosen over automatic. The app runs via `eval()` in script scope, where static imports are invalid. Classic runtime compiles to `React.createElement` (React is global), producing zero imports. This is the correct choice for an eval-based bootstrap.
- **CDN scripts cached best-effort** at install (individual `cache.add`, not `addAll`) so a single unpkg failure doesn't block SW install. The app boots offline only after **one prior online load** — a cold first-ever install with no network cannot cache them. This is an unavoidable constraint of loading React/Babel from a CDN.
- **Version centralization:** `APP_VERSION` in `index.html` and `CACHE_VERSION` in `sw.js` are kept in sync manually with a code comment flagging the relationship. `sw.js` is a standalone script and cannot import the const. On each release, both must be bumped together.

---

## 7. Outstanding Items / Recommendations for Architect

1. **CDN dependency for cold installs.** A first-ever load with no network cannot bootstrap (React/Babel from unpkg). If true zero-network cold install matters, consider vendoring React/ReactDOM/Babel into the repo (same-origin, precacheable). Trade-off: larger repo, but eliminates the CDN failure mode and the cross-origin caching complexity. The current CDN approach is acceptable if "online once, then offline" is the operational model.

2. **Manual version sync.** `APP_VERSION` (index.html) and `CACHE_VERSION` (sw.js) must be bumped together on every release. A pre-commit hook or a build step that derives both from a single source would prevent drift. Low priority — the comment documents it and drift is now caught quickly via the About panel.

3. **No automated tests.** All fixes were verified manually (node --check, local Babel transform, on-device). The bootstrap pipeline (`index.html` script → JSX preprocessing → Babel transform → eval) has no regression tests. A CI step that runs `node --check` on `index.html`/`sw.js` and a local Babel transform smoke test on `NutriTrack.jsx` would catch the RC-3/RC-5/RC-6 classes of bugs before deploy. Recommend adding this to any future CI.

4. **Phase 6m (SW fix) is validated.** The project summary lists Phase 6m (SW fix) as "in validation" — this phase resolves it. The update pipeline now works end-to-end (skipWaiting → controllerchange → reload). Phase 6n (multi-select) can proceed.

5. **`test.html`** still exists in the repo root with a stale 2026-07-25 timestamp. It was a manual GitHub Pages connectivity probe and is no longer needed. Consider removing in a future cleanup commit.
