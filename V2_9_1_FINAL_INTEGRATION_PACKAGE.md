# GHGeniales Mathe V2.9.1 — Final Integration Package

## Status
Development branch only. `main` remains V2.8 baseline.

## Purpose
This file defines the exact final integration order for the V2.9.1 modular development assets into the existing monolithic `index.html` without creating a second application architecture.

## Integration order
1. Load/inline the tested V2.9.1 registry metadata where the app initializes its topic registry.
2. Integrate new Stochastik generators and register their subtype entries: `ergebnisraum`, `ereignisse`, `vierfeldertafel`, plus the validated conditional-probability, independence, statistics and competency-check families.
3. Integrate Analysis generators and register only generators that pass the quality gate.
4. Wire every new subtype through the existing question rendering and answer-checking paths.
5. Keep `recordAttempt()` and the existing persistence path as the single source of truth until the Mastery migration is introduced.
6. Add schema migration and Mastery calculation behind compatibility-preserving adapters.
7. Replace exam selection with the curated six-block FOS short-exam blueprint while preserving the existing review UI.
8. Run the complete registry, generator, regression, migration, exam and PWA checks.
9. Only after all gates pass, open the PR to `main`.

## Hard rules
- No parallel answer-checking system.
- No duplicated LocalStorage system for V2.9.1 skills.
- No new skill becomes visible in the learner UI until generator + difficulty + rendering + validation + progress integration are all valid.
- No production inclusion of development-only test HTML files.
- Preserve historical V2.8 changelogs.
- Never claim live deployment success without an actual live check.

## Release gate sequence
### Gate A — Generator correctness
All generator families pass repeated randomized validation. No duplicate MC choices, invalid indices, impossible probability tables, or non-solvable cases.

### Gate B — Registry coverage
All intended trainable skills map to a valid generator and valid difficulty. No orphan skill IDs.

### Gate C — App integration
New skills can be selected, rendered, answered, graded, recorded and repeated through the normal app path.

### Gate D — Mastery and migration
V2.8 data survives migration, and Mastery works without inventing missing historical evidence.

### Gate E — Exam
Six curated blocks, 30 points, 25 minutes, multi-step scoring, skill-level post-review.

### Gate F — PWA
V2.9.1 cache, navigation network-first, offline fallback, and asset loading all verified.

### Gate G — FOS comparison
Finished task families are compared with public official FOS/ISB material for content coverage, structure, interpretation and multi-step reasoning.

### Gate H — RC
Clean diff against current `main`; no accidental history/changelog/config regressions.

## Current blocker
The remaining high-risk operation is the actual patch of the ~142 KB `index.html`. The GitHub Contents API available here performs complete-file replacement, not line-level patching. The safe path is therefore to apply the prepared integration package through a real Git checkout/Codex patch workflow, then review the resulting diff before merge.

## Done when
The branch can be opened as a working V2.9.1 app, all release gates pass, and the PR diff contains only intentional release changes.
