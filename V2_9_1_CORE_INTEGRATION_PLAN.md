# V2.9.1 Core Integration Plan

## Goal
Connect the existing V2.8 answer/persistence pipeline to the new V2.9.1 contract without creating a second stats/XP/mistake system.

## Integration order
1. Load `v2_9_1_core_contract.js` before app bootstrap.
2. Keep the legacy V2.8 `recordAttempt()` as the single persistence entry point during migration.
3. On each attempt, derive V2.9.1 mastery from the existing `stats[subtypeId]` and `mistakeBank[subtypeId]`.
4. Add `schemaVersion: 2` only to exported backup envelopes; do not rewrite LocalStorage blindly.
5. Replace the 10-random-task exam with the six-block blueprint only after the generator registry has coverage for every referenced skill.
6. Add new skills to the visible topic UI only after generator + answer + progress + mastery paths are proven.
7. Remove the development bridge before final release; production should use direct integration.

## Hard safety gates
- No destructive migration.
- No duplicate XP/stats/mistake persistence.
- No skill becomes trainable without a valid generator.
- Existing V2.8 topics remain usable.
- Exam must total exactly 30 points and 25 minutes.
- All registry IDs and referenced exam skills must resolve before release.
