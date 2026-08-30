# V2.9.1 — Next implementation blocks

## Completed in development branch
- Specification / 42-skill map / registry
- Generator audits and acceptance gates
- V2.9.1 service worker strategy
- Stochastik generators: Ergebnisraum, Ereignisse, Vierfeldertafel
- Stochastik generator smoke tests
- Stochastik: bedingte Wahrscheinlichkeit verstehen
- Stochastik: Unabhängigkeit
- Stochastik: Pfad-Kompetenzcheck + Stochastik-Kompetenzcheck

## Remaining before release
1. Integrate the tested Stochastik generators into index.html through a real Git patch/checkout.
2. Add remaining Stochastik coverage: refined combination variants and statistical interpretation.
3. Implement the 13 Analysis/Funktions competency nodes and their generator variants.
4. Implement shared result metadata, mistake tags, variant coverage and the five-stage mastery model.
5. Implement skill-aware recommendation priority and spaced review migration.
6. Implement robust V2.8 -> V2.9.1 schema migration and backups with schemaVersion: 2.
7. Replace the current 10-random-task exam flow with six curated blocks / 30 points / 25 minutes, preserving review.
8. Add multi-step result storage and per-step scoring/skill attribution.
9. Run full generator, registry, regression, migration, mobile and PWA checks.
10. Compare the release candidate with official FOS / ISB task structures and adjust task variety before PR.
11. Create PR v2.9.1-development -> main only after release gates pass.
12. Verify Cloudflare deployment after merge and perform live smoke test.

## Release rule
Nothing reaches main merely because a feature exists. A feature is release-ready only when generator validity, rendering, answer checking, persistence, regression coverage and mobile usability are all verified.
