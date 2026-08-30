# GHGeniales Mathe V2.9.1 – Stochastik Acceptance Checklist

This checklist is the gate for integrating the new Stochastik generator families into `index.html`.

## Generator coverage

- [ ] `ergebnisraum` – result space and elementary events
- [ ] `ereignisse` – intersection, union, complement, interpretation
- [ ] `vierfeldertafel` – read, complete, union, conditional probability, interpretation
- [ ] `bedingteWkVerstehen` – meaning of conditional probability
- [ ] `unabhaengigkeit` – computational independence check
- [ ] `pfadKompetenzcheck` – multi-step tree competency
- [ ] `stochKompetenzcheck` – multi-step table competency
- [ ] `kombiTyp` / `kombinatorik` – problem type and calculation variants
- [ ] `statistikInterpretation` – critical interpretation of statistical claims

## Mathematical validity

Every generated task must satisfy:

1. All probabilities are in [0,1].
2. All counts are non-negative integers where counts are used.
3. All table margins equal the corresponding cell sums.
4. Conditional denominators are strictly positive.
5. Independence tasks use a mathematically feasible intersection range.
6. Every MC task has unique options and a valid `correctIndex`.
7. Explanations agree with the generated values.
8. Rounded display values do not change the intended answer.
9. Random generation never creates an unsolvable or contradictory task.

## Pedagogical validity

Every task should answer yes to all four questions:

- Does it measure the intended competency?
- Can it not be solved by guessing from the wording?
- Does a wrong answer correspond to a meaningful possible misconception?
- Would a follow-up task after the mistake plausibly help learning?

## Integration requirements

- [ ] No duplicate answer / result logic outside the existing app flow.
- [ ] Existing `renderQuestion`, `submitMC`, `submitTyped` and `recordAttempt` remain the central path.
- [ ] New skills are hidden from the learner until generator + Difficulty + rendering + answer validation are wired.
- [ ] New skills do not enter exam selection before the normal exercise flow is stable.
- [ ] V2.8 generator behavior remains unchanged unless explicitly audited and approved.

## Regression gate

Before merging into `main`:

- Run 1,000+ generations per stochastic family.
- Run the existing V2.8 generator smoke coverage.
- Test mobile layout and KaTeX rendering.
- Test local progress + mistake storage.
- Test backup export/import.
- Test offline startup after Service Worker update.

## Release rule

A Stochastik family is considered production-ready only when all applicable boxes above are checked. A partial family must remain a development-only asset.
