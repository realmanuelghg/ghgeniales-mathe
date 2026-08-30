# GHGeniales Mathe – V2.9.1 Skill Map

This document maps the 42 V2.9.1 competence nodes to the existing V2.8 learning-plan structure and to the planned task families.

## Ground rules

- Existing V2.8 IDs remain stable.
- A competence is considered trainable only when a validated generator/variant exists.
- Roadmap entries without a trainable ID remain explicitly unimplemented instead of being shown as complete/trainable.
- One competence may have multiple task variants; variants do not become additional skill IDs.
- Multi-step tasks record their sub-skills separately.

## 42 competence nodes

### Algebra / functions (15)

| ID | Current V2.8 state | V2.9.1 role | Planned variants | Initial difficulty |
|---|---|---|---|---|
| `binomExpand` | exists | keep | square expansion, difference of squares | easy |
| `binomFactor` | exists | keep | reverse binomial identities | easy |
| `linGleichung` | exists | keep | integer linear equations, controlled negative coefficients | easy |
| `quadGleichung` | exists | improve | two roots, repeated root, no real roots where pedagogically appropriate | medium |
| `bruchKuerzen` | exists | improve | factor/cancel, domain restriction, less-trivial distractors | medium |
| `lineareEigenschaften` | exists | keep/improve | slope, intercept, zero, graph interpretation | easy |
| `scheitelpunkt` | exists | keep | vertex form, graph interpretation | easy |
| `lineareTerm` | exists | improve | point-point, point-slope; reduce MC-only dependence over time | medium |
| `schnittpunktGeraden` | exists | keep/improve | two lines, coordinate interpretation | medium |
| `darstellungswechsel` | new | new | term↔graph, graph↔term, table↔graph, description↔term | medium |
| `globalverlauf` | new | new | degree/leading coefficient, term↔end behavior, graph interpretation | medium |
| `vorzeichenverlauf` | new | new | factor form, zeros/multiplicity, sign intervals | medium |
| `polynomUngleichung` | new | new | term-based, graph-based, strict/non-strict boundaries | medium |
| `wertemenge` | new | new | vertex, bounded domain, graph reading | medium |
| `funktionstermAusInformationen` | new | new | zeros+point, point+slope, vertex/shape information | medium/hard |

### Analysis (13)

| ID | Current V2.8 state | V2.9.1 role | Planned variants | Initial difficulty |
|---|---|---|---|---|
| `ableiten` | exists | improve | power/sum/factor rules, controlled sign traps | easy |
| `nullstellen` | exists | improve | factorized polynomials, multiplicity, interpretation | hard |
| `extrempunkte` | exists | improve | candidate, type, coordinates, justification | hard |
| `wendepunkt` | exists | improve | candidate vs true inflection, coordinates | medium |
| `symmetrie` | exists | improve | term, graph, restricted-domain awareness | medium |
| `monotonie` | exists | improve | derivative sign, intervals, link to extrema | medium |
| `differenzenquotient` | exists | improve | calculation, secant interpretation, context | medium |
| `tangentensteigung` | exists | improve | local rate, compare slopes, tangent interpretation | medium |
| `parameterEigenschaft` | new | new | point condition, derivative condition, symmetry/shape condition | hard |
| `schnittBeruehrpunkt` | new | new | intersection, parameterized touching point | hard |
| `ableitungsgraph` | new | new | f→f' graph selection, sign/zero reasoning | medium/hard |
| `kruemmung` | new | new | sign of second derivative, graph interpretation, inflection distinction | medium/hard |
| `kurvendiskussionVerknuepft` | new | new | connected multi-step analysis, separate sub-skill results | hard |

### Stochastics (14)

| ID | Current V2.8 state | V2.9.1 role | Planned variants | Initial difficulty |
|---|---|---|---|---|
| `kombinatorik` | exists | improve | permutation, variation, combination, basic repetition variants | easy/medium |
| `pfadregel` | exists | improve | path, total probability, missing branch probability | medium |
| `bedingteWk` | exists | improve | P(A|B), P(B|A), intersection, table/tree/text | medium |
| `zufallsexperiment` | exists | improve | recognition, equal vs unequal probabilities | easy |
| `laplace` | exists | improve | recognize Laplace, calculate, non-Laplace traps | easy |
| `unabhaengigkeit` | exists | improve | product criterion, conditional criterion, table/tree | medium |
| `kombiTyp` | exists | improve | situation→problem type, then optional follow-up calculation | medium |
| `ergebnisraum` | new | new | small sample spaces, ordered pairs, cardinality | easy/medium |
| `ereignisse` | new | new | intersection, union, complement, Venn/text/symbol conversion | medium |
| `vierfeldertafel` | new | new | complete table, read counts, union/intersection, conditional probability | medium |
| `bedingteWkVerstehen` | new | new | interpretation of notation, condition swap diagnosis | medium |
| `pfadKompetenzcheck` | new | new | tree completion→path→total→conditional→interpretation | hard |
| `stochKompetenzcheck` | new | new | four-field table→conditional→independence→interpretation | hard |
| `statistikInterpretation` | new | new | sampling bias, misleading percentages, correlation/causation, contextual conclusions | medium/hard |

## Existing V2.8 roadmap mapping

The current roadmap contains trainable IDs plus explicitly unimplemented placeholders. V2.9.1 should extend the same structure instead of replacing it with a flat list.

### Roadmap area 1 – Linear / quadratic functions

- `lineareEigenschaften` → trainable
- `scheitelpunkt` → trainable
- `lineareTerm` → trainable
- `linGleichung` → trainable
- `schnittpunktGeraden` → trainable
- parameter tasks → map to `parameterEigenschaft`
- inequalities → map to `polynomUngleichung` for polynomial cases; keep broader linear/quadratic inequality coverage as variants where appropriate
- modelling → cross-cutting; not a standalone skill

### Roadmap area 2 – Whole rational functions

- `nullstellen` → trainable
- `binomFactor` → trainable support skill
- polynomial division/substitution → still not a dedicated V2.9.1 skill; do not mark as fully trainable unless an actual validated task family exists
- `symmetrie` → trainable
- global behavior → `globalverlauf`
- polynomial inequalities → `polynomUngleichung`
- intersections/touching → `schnittBeruehrpunkt`

### Roadmap area 3 – Differential calculus

- `differenzenquotient` → trainable
- `tangentensteigung` → trainable
- `ableiten` → trainable
- `monotonie` → trainable
- `extrempunkte` → trainable
- `wendepunkt` + `kruemmung` → linked skills
- sign table/sketch → cross-cutting; partly represented through `vorzeichenverlauf` and `darstellungswechsel`
- applications → cross-cutting; represented through variants, not a separate skill ID

### Roadmap area 4 – Probability foundations

- `zufallsexperiment` → trainable
- frequency → task variant inside stochastics/statistical interpretation; if later needed as its own stable skill it must be introduced deliberately, not by an accidental ID
- `laplace` → trainable
- `ereignisse` → new trainable
- `pfadregel` → trainable
- `vierfeldertafel` → new trainable

### Roadmap area 5 – Conditional probability / independence

- `bedingteWk` → trainable
- `unabhaengigkeit` → trainable
- statistical misconceptions → `bedingteWkVerstehen` + `statistikInterpretation`

### Roadmap area 6 – Combinatorics

- `kombiTyp` → trainable
- `kombinatorik` → trainable
- application tasks → `kombinatorik` / `statistikInterpretation` variants as appropriate

## Data-model implications

For V2.9.1, a result should be attributable to a stable skill ID and, where applicable, a variant ID. Example:

```js
{
  skillId: 'vierfeldertafel',
  variantId: 'conditional_reading',
  correct: false,
  difficulty: 'medium',
  mistakeTags: ['wrong_denominator']
}
```

For a multi-step item:

```js
{
  skillId: 'stochKompetenzcheck',
  type: 'multi',
  steps: [
    { skillId: 'vierfeldertafel', ... },
    { skillId: 'bedingteWk', ... },
    { skillId: 'unabhaengigkeit', ... }
  ]
}
```

## V2.9.1 validation rule

A skill must never become visibly trainable merely because it exists in the registry. It must have:

1. a valid generator/variant,
2. a valid answer contract,
3. a correct solution,
4. a coherent explanation,
5. valid difficulty metadata,
6. regression coverage,
7. no known invalid random edge cases.

This rule is especially important for the new roadmap entries so that the UI never promises training that the underlying app cannot actually deliver.
