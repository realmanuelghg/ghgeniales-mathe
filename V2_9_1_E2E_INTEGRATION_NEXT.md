# V2.9.1 E2E integration next block

## Objective
Move from staged V2.9.1 modules into one verified application flow without duplicating legacy persistence logic.

## Required end-to-end path
1. Load app shell and V2.9.1 runtime modules.
2. Resolve a registered skill and generator.
3. Generate a valid question.
4. Render using the existing app renderer.
5. Accept the existing answer interaction.
6. Route the result through the existing attempt/stat persistence path.
7. Record error metadata when incorrect.
8. Update V2.9.1 mastery from persisted stats and recent results.
9. Recompute recommendation priority.
10. Preserve/export the same state through schemaVersion 2 migration.
11. Use the six-block FOS exam blueprint without bypassing persistence.

## Safety gates
- Do not replace the full index.html unless the exact current blob is available and a full-file replacement is verified.
- Do not create a second XP/streak/stats store.
- A skill is not trainable unless generator + difficulty + rendering + answer validation + persistence all work.
- The transition layer is development-only until browser-level end-to-end validation succeeds.
- Keep main untouched until all release gates pass.

## Current reality
The current GitHub integration branch contains 58+ commits ahead of main, while index.html itself has not yet been safely rewritten. The next production task is therefore an exact integration patch in the main application script, followed by a browser E2E run.
