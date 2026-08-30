# V2.9.1 Runtime Integration Check

## Purpose

This file records the current hard gate between isolated V2.9.1 modules and the production `index.html`.

## Current facts

- `index.html` remains the V2.8.0 monolith and is **not yet** the final V2.9.1 integration target.
- The V2.9.1 runtime/bridge files exist on `v2.9.1-development` and are intended to be loaded only where the host application explicitly opts into them.
- `sw.js` already uses the V2.9.1 cache name and network-first navigation strategy.
- The shared core contract exists in `v2_9_1_core_contract.js` and defines question validation, five mastery stages, prioritization, V2.8 migration, and the six-block exam blueprint.

## Required end-to-end path before release

1. Production `index.html` loads the V2.9.1 runtime in a deterministic order.
2. New skills are registered from one canonical registry, not duplicated in a second topic system.
3. A generated question passes the shared contract before becoming trainable.
4. The existing answer pipeline remains the single source of truth for attempts and correctness.
5. Failed attempts can carry diagnostic tags into the existing mistake bank.
6. Mastery is computed from the same persisted stats and mistake data.
7. Recommendations use the same mastery/priority result and do not maintain a second XP/stat store.
8. V2.8 backup data migrates to `schemaVersion: 2` without losing existing values.
9. The exam uses the six-block blueprint and persists results through the same exam history path.
10. Offline navigation works with the V2.9.1 app shell.

## Release rule

No PR to `main` until the complete path can be exercised in one browser session and the regression suite confirms that V2.8 functionality remains intact.
