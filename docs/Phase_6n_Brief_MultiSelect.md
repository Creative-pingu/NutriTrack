# Phase 6n — Multi-Select Logging (Architect Brief)

**Status:** Draft for dev chat
**Date:** 2026-05-26
**Author:** Architect
**Preceded by:** Phase 6m (SW update pipeline — ✅ complete per `docs/PHASE-REPORT-update-and-offline.md`)
**Follows:** Phase 6l (servings + recents — ✅ complete)

> This brief is grounded in committed code on `main` as of `nutritrack-v58`.
> Line references are to `NutriTrack.jsx` unless noted. Verify against current
> HEAD before implementing; if lines drift, the *named symbols* are the contract.

---

## 1. Goal

Let a user select multiple foods in one search session, enter a quantity for
each (pre-filled from last-logged amount), assign a single meal to the whole
batch, and commit all entries in one action.

This replaces the current single-food-at-a-time loop
(tap food → log-amount → commit → back to search) for the case where a user is
logging a full meal's worth of foods.

---

## 2. Locked Design Decisions (do not re-litigate)

These were confirmed with the product owner and are non-negotiable for this phase:

1. **Explicit toggle** on the food-search screen to enter/exit multi-select mode.
   Default is OFF (single-select behavior unchanged).
2. **One meal for the whole batch.** A single meal selector on the batch-review
   screen; every entry in the batch gets that meal. No per-food meal override.
3. **Per-food quantity entry**, pre-filled from the food's last-logged amount
   (`recents[].lastAmount`) when available, else the existing default of `100`.
4. **Single commit** writes all batch entries to `logs[currentDate]` in one
   `setLogs` call, then updates recents for each food.
5. **Cart is session-only.** No new persistence key. The in-progress batch lives
   in React state and is discarded on navigation away / app close. (See §6 for
   the rationale and the recovery question.)

---

## 3. Integration Surface (current code)

Implement against these exact symbols. Do not invent parallel structures.

| Concern | Symbol | Location | Notes |
|---|---|---|---|
| Search screen view | `view === "add"` | `NutriTrack.jsx:1402` | Multi-select toggle lives here |
| Add-mode tabs | `addMode` (`"food"` etc.) | `NutriTrack.jsx:1406` | Toggle is orthogonal to `addMode`; only applies when `addMode==="food"` |
| Search input | `searchTerm` / `searchRef` | `NutriTrack.jsx:545, 1423` | Debounced → `debouncedSearchTerm` (line 545 area) |
| Food list filter | `filteredFoods` | `NutriTrack.jsx:1170` | `allFoods.filter(...)`; recents rendered above (line 1435) |
| Single log commit | `addEntry()` | `NutriTrack.jsx:881-889` | The pattern to batch-ify |
| Quick-log (pre-fill pattern) | `quickLogRecent()` | `NutriTrack.jsx:894-903` | Reuse its `recent.lastAmount` / `recent.lastMeal` lookup |
| Recents upsert | `upsertRecent(foodId, foodName, amount, mealUsed)` | `NutriTrack.jsx:872-877` | Call once per committed food; it caps at 10 |
| Recents shape | `[{ foodId, foodName, lastAmount, lastMeal, loggedAt }]` | `NutriTrack.jsx:517` | `lastAmount` is the pre-fill source |
| Food snapshot | `buildFoodSnapshot(food)` | `NutriTrack.jsx:438` | MUST capture per food at commit time |
| Meal state | `meal` / `setMeal` | `NutriTrack.jsx:552` | `MEALS = ["Breakfast","Lunch","Dinner","Snack"]` (line 324); pills via `S.pill(meal===m)` |
| Logs shape | `logs[currentDate]` array | `NutriTrack.jsx:886` | Entries: `{ id, foodId, foodName, amount, meal, time, snapshot }` |
| Navigation | `setView(name)` | throughout | New batch-review view name TBD by dev (suggest `"batchReview"`) |

---

## 4. Proposed State Additions

Minimal, local to the `NutriTrack` component:

```
const [multiSelect,  setMultiSelect]  = useState(false); // toggle on search screen
const [batch,        setBatch]        = useState([]);    // [{ food, amount }]
```

- `batch` items carry the *resolved food object* and a string `amount` (matching
  the existing `amount` state's string-then-`parseFloat` convention).
- **Do not** add a `STORAGE_KEYS` entry or persist `batch`. (See §6.)
- Clear `batch` on: toggle off, commit, and Back navigation from the review screen.

### Pre-fill logic (per batch item when added)
```
const last = recents.find(r => r.foodId === food.id);
const initialAmount = last ? String(last.lastAmount) : "100";
```
This mirrors `quickLogRecent` (line 899) and the recents-tap handler (line 1445).

---

## 5. Hard Constraints & Bug Traps

### 5.1 ⚠️ Batch entry ID collisions (must handle)
`addEntry()` (line 886) and the supplement loggers (lines 999, 1008) use
`Date.now().toString()` for entry IDs. Generating N of these in a tight loop
within the same millisecond **will collide**, producing duplicate keys and
React/render corruption of the log list.

**Required:** batch commit must produce distinct IDs. Use one of:
- `${Date.now()}-${i}` for index `i` in the batch, or
- a monotonic counter appended, or
- `crypto.randomUUID()` if you confirm Safari/iOS-16e support (it is supported,
  but the existing codebase does not use it — prefer the indexed suffix for
  consistency with current ID style).

This is the single highest-risk bug in the phase. Add it to the validation matrix.

### 5.2 Snapshot at commit, not at selection
`buildFoodSnapshot(food)` must be called **at batch-commit time** for each food,
not when the food is added to the cart. Food objects are immutable references in
`foodDB`/`customFoods`, so timing is safe either way, but matching `addEntry`'s
"snapshot on commit" invariant keeps historical entries durable and consistent.

### 5.3 Single `setLogs` call
Append all batch entries in one `setLogs(prev => ...)` update. Do not loop
`setLogs` N times — that causes N re-renders, N recents effects, and risks
partial commits if the app is backgrounded mid-loop.

### 5.4 Recents: one `upsertRecent` per food
Call `upsertRecent(...)` once per committed food **after** the `setLogs` call,
not inside it. Order within the batch determines recents ordering (last-added
food bubbles to top). This matches single-log behavior.

### 5.5 Toggle scope
Multi-select toggle only applies when `addMode === "food"`. If the user switches
`addMode` (e.g. to recipe/supplement), exit multi-select and clear `batch` — do
not let a half-built food batch linger across add-modes.

### 5.6 `index.html` / `sw.js` / `CACHE_VERSION`
This phase touches only `NutriTrack.jsx` (and possibly the SW version string if
you bump). **If you bump `CACHE_VERSION` in `sw.js`, also bump `APP_VERSION` in
`index.html`** — version drift was a confirmed Phase 6m root cause (RC-2 in the
phase report). `index.html` must never be added to `PRECACHE_ASSETS`.

---

## 6. Open Question for Product Owner (architect to raise)

**Cart recovery across app suspension.** iOS can evict a standalone PWA from
memory at any time. A user mid-batch who gets interrupted (bike break, phone
call) will lose the in-progress cart because it is session-only (§2.5).

- **Option A (current brief):** Accept the loss. Rationale: batches are small
  (typically <10 foods), re-adding is cheap, and persistence adds a storage
  key + migration surface. Recovery is a known, acceptable cost.
- **Option B:** Persist `batch` to a new `nt-batch` key (add to `STORAGE_KEYS`,
  load in `loadAll`, save in an effect). Survives suspension. Costs one more
  key to validate/migrate.

**Architect recommendation: Option A** for 6n. If field use shows mid-batch loss
is painful, promote to a follow-up. This keeps 6n to one deliverable, no new
persistence. **Needs Nick's confirmation before dev starts.**

---

## 7. Validation Matrix (device: iPhone 16e)

Run on the harness URL after deploy. Each must pass before marking 6n complete.

| # | Scenario | Expected |
|---|---|---|
| 1 | Toggle ON, tap 3 foods, enter amounts, commit to Lunch | 3 entries appear in Lunch group on log screen |
| 2 | Batch with default amounts (no last-logged) | Each pre-fills to `100`, editable |
| 3 | Batch where 2 foods have recents | Those 2 pre-fill with `lastAmount`; 3rd pre-fills `100` |
| 4 | Commit batch, then check recents | All batch foods appear in recents, last-added at top, capped at 10 |
| 5 | Toggle OFF mid-batch | Cart cleared, search returns to single-select; no stale entries |
| 6 | Back from batch-review | Cart cleared, returns to search, no partial log entries |
| 7 | Batch of 1 food | Works identically to single-select commit (degenerate case) |
| 8 | **Batch of 8 foods committed rapidly** | All 8 distinct IDs, no React key warnings, all 8 render in log |
| 9 | Commit batch → background app → reopen | Log entries persist (recents + logs are durable); cart state per §6 |
| 10 | Toggle ON, switch `addMode` away from food | Multi-select exits, cart cleared |
| 11 | Offline (airplane mode) batch commit | Commit succeeds, entries persist, recents update |
| 12 | Post-deploy SW update banner | New `NutriTrack.jsx` triggers `updatefound`→banner (6m pipeline intact) |

Scenario **8 is the ID-collision regression test** — do not skip it.

---

## 8. Out of Scope for 6n

- Per-food meal override (locked: one meal per batch).
- Cart persistence / recovery (§6, deferred unless Nick overrides).
- Editing a batch entry's food after adding (remove + re-add is the escape hatch).
- Multi-select for recipes/supplements (food only this phase).
- Nutrient RDA / colour coding / info modals (separate major phase).

---

## 9. Definition of Done

- All §7 validation scenarios pass on device.
- No new `STORAGE_KEYS` entry (per §6 Option A, if confirmed).
- `CACHE_VERSION` / `APP_VERSION` bumped together if either changed.
- No React key warnings in console for batch commits.
- Existing single-select flow (toggle OFF) behavior unchanged — scenarios that
  don't touch multi-select must behave exactly as pre-6n.
