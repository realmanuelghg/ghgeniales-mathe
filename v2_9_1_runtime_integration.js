/* GHGeniales Mathe V2.9.1 — in-page integration bootstrap.
 * The legacy app keeps TOPICS/DIFFICULTY_BY_ID in lexical scope, so this
 * bootstrap intentionally receives those references from inside index.html.
 * It loads the new generator modules, attaches validated generators to the
 * existing registry, and then asks the existing renderer to refresh.
 */
(() => {
  const MODULES = [
    './v2_9_1_stochastik_ergebnisraum.js',
    './v2_9_1_stochastik_ereignisse.js',
    './v2_9_1_stochastik_vierfeldertafel.js',
    './v2_9_1_stochastik_bedingte_wk.js',
    './v2_9_1_stochastik_unabhaengigkeit.js',
    './v2_9_1_stochastik_statistikinterpretation.js',
    './v2_9_1_stochastik_kompetenzchecks.js'
  ];

  const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

  function loadScript(src){
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.async = false;
      script.onload = resolve;
      script.onerror = () => reject(new Error(`Load failed: ${src}`));
      document.head.appendChild(script);
    });
  }

  function addSkill(topics, difficultyById, catKey, id, name, gen, difficulty='medium'){
    if(typeof gen !== 'function') return false;
    const list = topics?.[catKey]?.subtypes;
    if(!Array.isArray(list)) return false;
    if(!list.some(item => item.id === id)) list.push({id, name, gen, difficulty});
    if(difficultyById) difficultyById[id] = difficulty;
    return true;
  }

  async function bootstrap(env){
    if(!env || !env.TOPICS || !env.DIFFICULTY_BY_ID) return {ok:false,loaded:[],error:'missing app references'};

    const errors = [];
    for(const src of MODULES){
      try { await loadScript(src); }
      catch(error){ errors.push(error.message); }
    }

    const loaded = [];
    const stoch = [
      ['ergebnisraum','Ergebnisraum',globalThis.GHGenialesV291Stochastik?.genErgebnisraum,'easy'],
      ['ereignisse','Ereignisse',globalThis.GHGenialesV291Ereignisse?.genEreignisse,'medium'],
      ['vierfeldertafel','Vierfeldertafel',globalThis.GHGenialesV291Vierfeldertafel?.genVierfeldertafel,'medium'],
      ['bedingteWkVerstehen','Bedingte Wahrscheinlichkeit verstehen',globalThis.GHGenialesV291BedingteWk?.genBedingteWkVerstehen,'medium'],
      ['unabhaengigkeitVerstehen','Unabhängigkeit verstehen',globalThis.GHGenialesV291Unabhaengigkeit?.genUnabhaengigkeitBedingt,'medium'],
      ['statistikInterpretation','Statistik interpretieren',globalThis.GHGenialesV291StatistikInterpretation?.genStatistikInterpretation,'hard'],
      ['pfadKompetenzcheck','Pfad-Kompetenzcheck',globalThis.GHGenialesV291StochastikChecks?.genPfadKompetenzcheck,'hard'],
      ['stochKompetenzcheck','Stochastik-Kompetenzcheck',globalThis.GHGenialesV291StochastikChecks?.genStochKompetenzcheck,'hard']
    ];

    for(const [id,name,gen,difficulty] of stoch){
      if(addSkill(env.TOPICS,env.DIFFICULTY_BY_ID,'stochastik',id,name,gen,difficulty)) loaded.push(id);
    }

    if(typeof env.render === 'function' && loaded.length) env.render();
    const result = {ok:loaded.length === stoch.length, loaded, errors};
    globalThis.GHGenialesV291Runtime = Object.freeze(result);
    return result;
  }

  globalThis.GHGenialesV291Bootstrap = bootstrap;
})();
