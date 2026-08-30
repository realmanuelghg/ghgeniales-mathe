/*
 * GHGeniales Mathe V2.9.1 – competence registry foundation.
 *
 * This file is intentionally side-effect free. It defines the canonical
 * competence metadata and validation helpers that will be wired into the
 * application once the registry/data model is integrated into index.html.
 *
 * Do not treat a registry entry as trainable unless a real generator is
 * attached and passes the validation contract described below.
 */
(() => {
  const SKILL = (id, name, area, group, config = {}) => ({
    id,
    name,
    area,
    group,
    variants: config.variants || [],
    difficulty: config.difficulty || ['easy', 'medium'],
    answerTypes: config.answerTypes || [],
    mistakeTags: config.mistakeTags || [],
    multiStep: !!config.multiStep,
    trainableIn291: !!config.trainableIn291,
    legacySubtype: config.legacySubtype || null
  });

  const skills = [
    // Algebra / functions (15)
    SKILL('binomExpand', 'Binomische Formeln anwenden', 'algebra', 'grundlagen', {
      difficulty: ['easy'], answerTypes: ['mc'], trainableIn291: true, legacySubtype: 'binomExpand'
    }),
    SKILL('binomFactor', 'Terme faktorisieren', 'algebra', 'grundlagen', {
      difficulty: ['easy'], answerTypes: ['mc'], trainableIn291: true, legacySubtype: 'binomFactor'
    }),
    SKILL('linGleichung', 'Lineare Gleichungen lösen', 'algebra', 'gleichungen', {
      difficulty: ['easy'], answerTypes: ['numeric'], trainableIn291: true, legacySubtype: 'linGleichung'
    }),
    SKILL('quadGleichung', 'Quadratische Gleichungen lösen', 'algebra', 'gleichungen', {
      difficulty: ['medium'], answerTypes: ['set'], trainableIn291: true, legacySubtype: 'quadGleichung'
    }),
    SKILL('bruchKuerzen', 'Bruchterme umformen und kürzen', 'algebra', 'grundlagen', {
      difficulty: ['medium'], answerTypes: ['mc'], trainableIn291: true, legacySubtype: 'bruchKuerzen'
    }),
    SKILL('lineareEigenschaften', 'Eigenschaften linearer Funktionen', 'algebra', 'lineare-funktionen', {
      difficulty: ['easy', 'medium'], answerTypes: ['mc'], trainableIn291: true, legacySubtype: 'lineareEigenschaften'
    }),
    SKILL('scheitelpunkt', 'Scheitelpunkt bestimmen', 'algebra', 'quadratische-funktionen', {
      difficulty: ['easy'], answerTypes: ['mc'], trainableIn291: true, legacySubtype: 'scheitelpunkt'
    }),
    SKILL('lineareTerm', 'Geradenterm aus Informationen aufstellen', 'algebra', 'lineare-funktionen', {
      difficulty: ['medium'], answerTypes: ['mc', 'numeric'], trainableIn291: true, legacySubtype: 'lineareTerm'
    }),
    SKILL('schnittpunktGeraden', 'Schnittpunkt zweier Geraden bestimmen', 'algebra', 'lineare-funktionen', {
      difficulty: ['medium'], answerTypes: ['mc', 'numeric'], trainableIn291: true, legacySubtype: 'schnittpunktGeraden'
    }),
    SKILL('darstellungswechsel', 'Term, Graph, Tabelle und Beschreibung ineinander übersetzen', 'algebra', 'darstellungen', {
      variants: ['term_to_graph', 'graph_to_term', 'table_to_graph', 'graph_to_property', 'text_to_term'],
      difficulty: ['medium', 'hard'], answerTypes: ['mc'], trainableIn291: false
    }),
    SKILL('globalverlauf', 'Globalverhalten für x → ±∞ bestimmen und begründen', 'algebra', 'ganzrational', {
      variants: ['term_to_end_behavior', 'graph_to_end_behavior', 'end_behavior_to_term'],
      difficulty: ['medium'], answerTypes: ['mc'], trainableIn291: false
    }),
    SKILL('vorzeichenverlauf', 'Vorzeichenbereiche einer ganzrationalen Funktion bestimmen', 'algebra', 'ganzrational', {
      variants: ['sign_chart', 'interval_positive', 'interval_negative'],
      difficulty: ['medium', 'hard'], answerTypes: ['mc', 'set'], trainableIn291: false
    }),
    SKILL('polynomUngleichung', 'Ganzrationale Ungleichungen lösen und graphisch deuten', 'algebra', 'ganzrational', {
      variants: ['term_to_solution', 'graph_to_solution', 'boundary_inclusion'],
      difficulty: ['medium', 'hard'], answerTypes: ['set', 'mc'], trainableIn291: false
    }),
    SKILL('wertemenge', 'Wertemenge bestimmen', 'algebra', 'ganzrational', {
      variants: ['unrestricted_domain', 'bounded_domain'],
      difficulty: ['medium', 'hard'], answerTypes: ['interval', 'mc'], trainableIn291: false
    }),
    SKILL('funktionstermAusInformationen', 'Funktionsterm aus Nullstellen, Punkten oder Eigenschaften bestimmen', 'algebra', 'aufstellen', {
      variants: ['roots_and_point', 'graph_information', 'property_and_point'],
      difficulty: ['medium', 'hard'], answerTypes: ['mc', 'text'], trainableIn291: false
    }),

    // Analysis (13)
    SKILL('ableiten', 'Polynomfunktionen ableiten', 'analysis', 'ableitung', {
      difficulty: ['easy'], answerTypes: ['mc'], trainableIn291: true, legacySubtype: 'ableiten'
    }),
    SKILL('nullstellen', 'Nullstellen bestimmen', 'analysis', 'funktionsanalyse', {
      variants: ['linear', 'quadratic', 'factorized_polynomial', 'multiplicity'],
      difficulty: ['medium', 'hard'], answerTypes: ['set'], trainableIn291: true, legacySubtype: 'nullstellen'
    }),
    SKILL('extrempunkte', 'Extrempunkte bestimmen und begründen', 'analysis', 'funktionsanalyse', {
      variants: ['candidate', 'classification', 'coordinates', 'f_prime_sign', 'f_double_prime'],
      difficulty: ['medium', 'hard'], answerTypes: ['mc', 'numeric'], trainableIn291: true, legacySubtype: 'extrempunkte'
    }),
    SKILL('wendepunkt', 'Wendepunkte bestimmen und begründen', 'analysis', 'funktionsanalyse', {
      variants: ['candidate', 'true_inflection', 'coordinates'],
      difficulty: ['medium', 'hard'], answerTypes: ['numeric', 'mc'], trainableIn291: true, legacySubtype: 'wendepunkt'
    }),
    SKILL('symmetrie', 'Symmetrie untersuchen', 'analysis', 'funktionen', {
      variants: ['term', 'graph', 'functional_equation'],
      difficulty: ['medium'], answerTypes: ['mc'], trainableIn291: true, legacySubtype: 'symmetrie'
    }),
    SKILL('monotonie', 'Monotonieverhalten bestimmen', 'analysis', 'funktionsanalyse', {
      variants: ['sign_of_derivative', 'intervals', 'relation_to_extrema'],
      difficulty: ['medium'], answerTypes: ['mc'], trainableIn291: true, legacySubtype: 'monotonie'
    }),
    SKILL('differenzenquotient', 'Differenzenquotient und mittlere Änderungsrate', 'analysis', 'aenderungsraten', {
      variants: ['calculate', 'geometric_meaning', 'context'],
      difficulty: ['medium'], answerTypes: ['numeric', 'mc'], trainableIn291: true, legacySubtype: 'differenzenquotient'
    }),
    SKILL('tangentensteigung', 'Tangentensteigung / lokale Änderungsrate', 'analysis', 'aenderungsraten', {
      variants: ['calculate', 'interpret', 'compare_slopes'],
      difficulty: ['medium'], answerTypes: ['numeric', 'mc'], trainableIn291: true, legacySubtype: 'tangentensteigung'
    }),
    SKILL('parameterEigenschaft', 'Parameter mit Funktionseigenschaften verknüpfen', 'analysis', 'parameter', {
      variants: ['point_condition', 'slope_condition', 'extremum_condition', 'inflection_condition', 'symmetry_condition'],
      difficulty: ['hard'], answerTypes: ['numeric', 'mc'], trainableIn291: false
    }),
    SKILL('schnittBeruehrpunkt', 'Schnitt- und Berührpunkte bestimmen', 'analysis', 'relationen', {
      variants: ['intersection', 'tangency'],
      difficulty: ['medium', 'hard'], answerTypes: ['numeric', 'set'], trainableIn291: false
    }),
    SKILL('ableitungsgraph', 'Zusammenhang zwischen f und f\' verstehen', 'analysis', 'ableitung', {
      variants: ['graph_to_derivative', 'derivative_sign', 'extrema_from_derivative'],
      difficulty: ['medium', 'hard'], answerTypes: ['mc'], trainableIn291: false
    }),
    SKILL('kruemmung', 'Krümmungsverhalten untersuchen', 'analysis', 'ableitung', {
      variants: ['second_derivative_sign', 'graph_to_curvature', 'inflection_relation'],
      difficulty: ['medium', 'hard'], answerTypes: ['mc'], trainableIn291: false
    }),
    SKILL('kurvendiskussionVerknuepft', 'Mehrschrittige vollständige Funktionsuntersuchung', 'analysis', 'mehrschritt', {
      variants: ['guided', 'mixed', 'context'],
      difficulty: ['hard'], answerTypes: ['multi'], multiStep: true, trainableIn291: false
    }),

    // Stochastik (14)
    SKILL('kombinatorik', 'Kombinatorische Anzahlen berechnen', 'stochastik', 'kombinatorik', {
      variants: ['permutation', 'variation', 'combination', 'general_counting', 'with_repetition'],
      difficulty: ['easy', 'medium'], answerTypes: ['numeric', 'mc'], trainableIn291: true, legacySubtype: 'kombinatorik'
    }),
    SKILL('pfadregel', 'Pfad- und Gesamtwahrscheinlichkeiten berechnen', 'stochastik', 'baumdiagramme', {
      variants: ['path_product', 'tree_reading', 'missing_probability', 'total_probability'],
      difficulty: ['medium', 'hard'], answerTypes: ['numeric', 'mc'], trainableIn291: true, legacySubtype: 'pfadregel'
    }),
    SKILL('bedingteWk', 'Bedingte Wahrscheinlichkeiten berechnen', 'stochastik', 'bedingt', {
      variants: ['A_given_B', 'B_given_A', 'intersection_from_conditional', 'table', 'tree'],
      difficulty: ['medium'], answerTypes: ['numeric'], trainableIn291: true, legacySubtype: 'bedingteWk'
    }),
    SKILL('zufallsexperiment', 'Zufallsexperimente erkennen', 'stochastik', 'grundlagen', {
      difficulty: ['easy', 'medium'], answerTypes: ['mc'], trainableIn291: true, legacySubtype: 'zufallsexperiment'
    }),
    SKILL('laplace', 'Laplace-Experimente erkennen und Wahrscheinlichkeiten berechnen', 'stochastik', 'grundlagen', {
      variants: ['recognize', 'calculate', 'non_laplace_trap'],
      difficulty: ['easy', 'medium'], answerTypes: ['numeric', 'mc'], trainableIn291: true, legacySubtype: 'laplace'
    }),
    SKILL('unabhaengigkeit', 'Stochastische Unabhängigkeit rechnerisch prüfen', 'stochastik', 'bedingt', {
      variants: ['product_rule', 'conditional_probability', 'table', 'tree', 'context'],
      difficulty: ['medium', 'hard'], answerTypes: ['mc', 'numeric'], trainableIn291: true, legacySubtype: 'unabhaengigkeit'
    }),
    SKILL('kombiTyp', 'Kombinatorischen Problemtyp erkennen', 'stochastik', 'kombinatorik', {
      variants: ['permutation', 'variation_without_repetition', 'variation_with_repetition', 'combination', 'counting_principle'],
      difficulty: ['medium'], answerTypes: ['mc'], trainableIn291: true, legacySubtype: 'kombiTyp'
    }),
    SKILL('ergebnisraum', 'Ergebnisraum und Elementarereignisse bestimmen', 'stochastik', 'grundlagen', {
      variants: ['enumerate', 'cardinality', 'elementary_event'],
      difficulty: ['easy', 'medium'], answerTypes: ['mc', 'numeric', 'set'], trainableIn291: false
    }),
    SKILL('ereignisse', 'Ereignisse, Gegenereignis, Schnitt und Vereinigung verstehen', 'stochastik', 'grundlagen', {
      variants: ['intersection', 'union', 'complement', 'venn', 'text_to_symbol'],
      difficulty: ['easy', 'medium'], answerTypes: ['mc'], trainableIn291: false
    }),
    SKILL('vierfeldertafel', 'Vierfeldertafeln lesen, ergänzen und auswerten', 'stochastik', 'bedingt', {
      variants: ['complete_table', 'read_cell', 'union', 'conditional', 'interpret'],
      difficulty: ['medium', 'hard'], answerTypes: ['numeric', 'mc'], trainableIn291: false
    }),
    SKILL('bedingteWkVerstehen', 'Bedeutung von P(A|B) verstehen und interpretieren', 'stochastik', 'bedingt', {
      variants: ['formula_meaning', 'text_meaning', 'condition_swap', 'table_interpretation'],
      difficulty: ['medium'], answerTypes: ['mc'], trainableIn291: false
    }),
    SKILL('pfadKompetenzcheck', 'Baumdiagramm → Pfadregel → Gesamt-/bedingte Wahrscheinlichkeit', 'stochastik', 'mehrschritt', {
      variants: ['guided', 'text_to_tree', 'reverse_condition'],
      difficulty: ['hard'], answerTypes: ['multi'], multiStep: true, trainableIn291: false
    }),
    SKILL('stochKompetenzcheck', 'Vierfeldertafel → bedingte Wk. → Unabhängigkeit → Interpretation', 'stochastik', 'mehrschritt', {
      variants: ['guided', 'interpretive', 'context'],
      difficulty: ['hard'], answerTypes: ['multi'], multiStep: true, trainableIn291: false
    }),
    SKILL('statistikInterpretation', 'Statistische Aussagen kritisch beurteilen', 'stochastik', 'statistik', {
      variants: ['correlation_causation', 'sample_bias', 'misleading_percentages', 'conditional_misread'],
      difficulty: ['medium', 'hard'], answerTypes: ['mc'], trainableIn291: false
    })
  ];

  const SKILLS = Object.freeze(Object.fromEntries(skills.map(skill => [skill.id, Object.freeze(skill)])));

  function validateSkillRegistry(registry = SKILLS) {
    const ids = Object.keys(registry);
    const errors = [];
    const validAreas = new Set(['algebra', 'analysis', 'stochastik']);
    const validAnswerTypes = new Set(['mc', 'numeric', 'set', 'interval', 'text', 'multi']);
    const validDifficulty = new Set(['easy', 'medium', 'hard']);

    if(ids.length !== 42) errors.push(`Expected 42 skills, found ${ids.length}.`);

    ids.forEach(id => {
      const s = registry[id];
      if(!s || s.id !== id) errors.push(`Invalid/mismatched skill object: ${id}`);
      if(!validAreas.has(s.area)) errors.push(`Invalid area for ${id}: ${s.area}`);
      if(!s.name || typeof s.name !== 'string') errors.push(`Missing name for ${id}`);
      if(!Array.isArray(s.variants) || s.variants.some(v => typeof v !== 'string' || !v)) errors.push(`Invalid variants for ${id}`);
      if(!Array.isArray(s.difficulty) || s.difficulty.length === 0 || s.difficulty.some(d => !validDifficulty.has(d))) errors.push(`Invalid difficulty for ${id}`);
      if(!Array.isArray(s.answerTypes) || s.answerTypes.length === 0 || s.answerTypes.some(t => !validAnswerTypes.has(t))) errors.push(`Invalid answerTypes for ${id}`);
      if(!Array.isArray(s.mistakeTags)) errors.push(`Invalid mistakeTags for ${id}`);
      if(s.multiStep && !s.answerTypes.includes('multi')) errors.push(`Multi-step skill ${id} must expose answerType multi.`);
    });

    return {ok: errors.length === 0, count: ids.length, errors};
  }

  // Expose a single namespace so the later index.html integration does not
  // leak global helper functions.
  globalThis.GHGenialesV291 = Object.freeze({
    version: '2.9.1',
    skills: SKILLS,
    validateSkillRegistry
  });
})();
