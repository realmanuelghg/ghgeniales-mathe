# GHGeniales Mathe V2.9.1 — Release Status

## Current strategy
Work in functional blocks on `v2.9.1-development`; keep `main` on the V2.8 baseline until release candidate approval.

## Completed development foundations
- V2.9.1 specification and skill map
- 42-skill registry and validation scaffold
- Generator and live-code audit scaffolds
- V2.9.1 service-worker strategy
- Stochastik generator families: Ergebnisraum, Ereignisse, Vierfeldertafel, bedingte Wahrscheinlichkeit verstehen, Unabhängigkeit, Statistikinterpretation
- Stochastik competency checks
- Stochastik smoke/package/acceptance test scaffolds
- Analysis/Funktionen generator scaffold
- Analysis quality/blocker audit documentation
- index integration plan

## Not yet release-ready
- New generators are not yet fully wired into the production `index.html` flow.
- Analysis generator family still contains prototype-quality items that require correction and regression testing.
- The 42-skill registry is not yet the sole runtime source of truth.
- Mastery 2.0, fine-grained mistake diagnosis and recommendation scoring are not yet integrated.
- Multi-step task result persistence is not yet integrated.
- FOS short exam blueprint is not yet integrated.
- V2.8 -> V2.9 schema migration is not yet implemented and tested.
- Full regression, mobile/PWA validation and FOS comparison are pending.

## Release gates
A skill becomes production-trainable only after generator + difficulty + rendering + answer checking + progress persistence + regression validation are working.

V2.9.1 release requires:
1. production integration without bypassing the existing answer/progress pipeline;
2. automated generator validation and broad randomized smoke coverage;
3. preservation of V2.8 user data;
4. complete mastery/recommendation/mistake architecture;
5. six-block FOS short exam with 30 points / 25 minutes;
6. offline/PWA validation;
7. FOS task comparison and final V2.8 -> V2.9.1 diff review;
8. PR from `v2.9.1-development` to `main`, followed by live Cloudflare verification before merge.
