/*
 * GHGeniales Mathe V2.9.1 – generator coverage audit helpers.
 *
 * This file intentionally does not modify the V2.8 application. It can be
 * loaded by development tooling to compare the canonical skill registry with
 * the currently attached production generators once the registry is wired in.
 */
(() => {
  const REQUIRED_LEGACY = [
    'binomExpand','binomFactor','linGleichung','quadGleichung','bruchKuerzen',
    'lineareEigenschaften','scheitelpunkt','lineareTerm','schnittpunktGeraden',
    'ableiten','nullstellen','extrempunkte','wendepunkt','symmetrie','monotonie',
    'differenzenquotient','tangentensteigung','kombinatorik','pfadregel',
    'bedingteWk','zufallsexperiment','laplace','unabhaengigkeit','kombiTyp'
  ];

  function collectGeneratorIds(topics) {
    return Object.values(topics || {}).flatMap(category =>
      (category.subtypes || []).map(subtype => subtype.id)
    );
  }

  function audit(topics, registry) {
    const generatorIds = collectGeneratorIds(topics);
    const generatorSet = new Set(generatorIds);
    const registryValues = Object.values(registry || {});
    const missingLegacy = REQUIRED_LEGACY.filter(id => !generatorSet.has(id));
    const registeredWithGenerator = registryValues.filter(skill =>
      skill.legacySubtype && generatorSet.has(skill.legacySubtype)
    );
    const duplicateGenerators = generatorIds.filter((id, i) => generatorIds.indexOf(id) !== i);

    return Object.freeze({
      registryCount: registryValues.length,
      generatorCount: generatorIds.length,
      legacyExpected: REQUIRED_LEGACY.length,
      legacyCovered: REQUIRED_LEGACY.length - missingLegacy.length,
      missingLegacy: Object.freeze(missingLegacy),
      duplicateGenerators: Object.freeze([...new Set(duplicateGenerators)]),
      registryLegacyCovered: registeredWithGenerator.length,
      ok: missingLegacy.length === 0 && duplicateGenerators.length === 0
    });
  }

  globalThis.GHGenialesV291GeneratorAudit = Object.freeze({audit});
})();
