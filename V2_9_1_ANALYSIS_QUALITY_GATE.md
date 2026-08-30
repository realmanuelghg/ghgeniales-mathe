# V2.9.1 Analysis Quality Gate

## Release status
The new Analysis/Funktionen generator family is development-only and is **not release-ready** yet.

## Mandatory corrections before integration

1. `vorzeichenverlauf` must generate three distinct simple roots. The current prototype can accidentally duplicate the third root, which would invalidate the explanation about simple-root sign changes.
2. `polynomUngleichung` must express inclusive endpoints explicitly for `>=`/`<=` and exclusive endpoints for `>`/`<`. The displayed solution must remain mathematically consistent with the generated factorization.
3. `wertemenge` on a bounded interval must evaluate the vertex only when it lies in the domain; otherwise only the relevant endpoints determine the extrema.
4. `parameterEigenschaft` is only a placeholder prototype. It must be replaced by a mathematically complete parameter condition with a unique, checked solution. It must not be released in its current form.
5. `schnittBeruehrpunkt` currently demonstrates parallel translated parabolas, not an actual intersection/berührung distinction. It needs genuine cases with 0/1/2 intersections and at least one tangent-contact case.
6. `ableitungsgraph` currently uses text assertions rather than actual graph evidence. A release version must either provide a graph-based selection or clearly be a conceptual MC generator without pretending to be a graph-reading task.
7. `kruemmung` must use the exact terminology/convention of the Bavarian FOS curriculum and should include a real distinction between `f''=0` and an actual inflection point.
8. `kurvendiskussionVerknuepft` must become a real multi-step task or a validated sequence of subskills; the current single-MC prototype is not sufficient.

## Regression requirements

Before any production integration:
- At least 1,000 generated tasks per generator family.
- No generator throws.
- Every MC task has four unique options and a valid `correctIndex`.
- Every explanation matches the generated values.
- Every claimed solution is independently recomputable from the generated parameters.
- Edge cases are explicitly tested.
- Existing V2.8 generator regression remains green.

## Integration rule
No new Analysis skill is allowed to become trainable in the UI merely because a registry entry exists. It becomes trainable only after generator validation, rendering compatibility, answer checking, persistence integration, and regression testing pass.
