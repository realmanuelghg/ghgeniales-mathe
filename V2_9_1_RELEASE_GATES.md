# GHGeniales Mathe V2.9.1 — Release Gates

## Gate A — Foundations
- [x] V2.9.1 specification
- [x] 42-skill map/registry
- [x] validation/audit tooling
- [x] service-worker target defined

## Gate B — Generator families
- [x] Stochastik development families prepared
- [x] Analysis development family prepared
- [ ] all required generators corrected and validated
- [ ] all 42 skills have production-ready generator coverage or an explicit variant mapping

## Gate C — Integration
- [ ] new generators integrated into production `index.html`
- [ ] existing answer/check/progress flows reused
- [ ] no parallel persistence path
- [ ] no regression in existing 24 V2.8 generator types

## Gate D — Learning system
- [ ] mastery 2.0 integrated
- [ ] mistake tags integrated
- [ ] recommendation engine integrated
- [ ] recent-performance and coverage signals verified

## Gate E — Exam
- [ ] six-block FOS short exam implemented
- [ ] 30 points / 25 minutes
- [ ] part points and skill attribution verified
- [ ] review/debrief preserved

## Gate F — Data/PWA
- [ ] schemaVersion 2 export/import
- [ ] V2.8 migration verified
- [ ] no destructive import behavior
- [ ] V2.9.1 offline navigation verified

## Gate G — Final QA
- [ ] generator stress tests
- [ ] full regression
- [ ] mobile checks
- [ ] browser/PWA checks
- [ ] FOS task comparison
- [ ] PR diff reviewed
- [ ] Cloudflare live deployment checked

## Release rule
Do not merge V2.9.1 into `main` until every mandatory gate above is checked. `main` remains the V2.8 safety baseline until then.
