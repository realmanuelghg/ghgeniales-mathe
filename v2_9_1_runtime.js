/* GHGeniales Mathe V2.9.1 runtime bridge. Transitional integration layer for development. */
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
  async function loadScript(src){
    return new Promise((resolve,reject)=>{
      const s=document.createElement('script'); s.src=src; s.async=false;
      s.onload=resolve; s.onerror=()=>reject(new Error(`Load failed: ${src}`));
      document.head.appendChild(s);
    });
  }
  async function boot(){
    for(const src of MODULES){ try{ await loadScript(src); }catch(e){ console.warn('[V2.9.1]',e.message); } }
    for(let i=0;i<120;i++){
      if(window.TOPICS && window.DIFFICULTY_BY_ID) break;
      await wait(50);
    }
    if(!window.TOPICS) return;
    const add=(cat,id,name,gen,difficulty='medium')=>{
      if(typeof gen!=='function') return false;
      const list=window.TOPICS[cat]?.subtypes; if(!list) return false;
      if(!list.some(x=>x.id===id)) list.push({id,name,gen,difficulty});
      if(window.DIFFICULTY_BY_ID) window.DIFFICULTY_BY_ID[id]=difficulty;
      return true;
    };
    const loaded=[];
    if(add('stochastik','ergebnisraum','Ergebnisraum',window.GHGenialesV291Stochastik?.genErgebnisraum,'easy')) loaded.push('ergebnisraum');
    if(add('stochastik','ereignisse','Ereignisse',window.GHGenialesV291Ereignisse?.genEreignisse,'medium')) loaded.push('ereignisse');
    if(add('stochastik','vierfeldertafel','Vierfeldertafel',window.GHGenialesV291Vierfeldertafel?.genVierfeldertafel,'medium')) loaded.push('vierfeldertafel');
    if(add('stochastik','bedingteWkVerstehen','Bedingte Wahrscheinlichkeit verstehen',window.GHGenialesV291BedingteWk?.genBedingteWkVerstehen,'medium')) loaded.push('bedingteWkVerstehen');
    if(add('stochastik','unabhaengigkeitVerstehen','Unabhängigkeit verstehen',window.GHGenialesV291Unabhaengigkeit?.genUnabhaengigkeitBedingt,'medium')) loaded.push('unabhaengigkeitVerstehen');
    if(add('stochastik','statistikInterpretation','Statistik interpretieren',window.GHGenialesV291StatistikInterpretation?.genStatistikInterpretation,'hard')) loaded.push('statistikInterpretation');
    if(add('stochastik','pfadKompetenzcheck','Pfad-Kompetenzcheck',window.GHGenialesV291StochastikChecks?.genPfadKompetenzcheck,'hard')) loaded.push('pfadKompetenzcheck');
    if(add('stochastik','stochKompetenzcheck','Stochastik-Kompetenzcheck',window.GHGenialesV291StochastikChecks?.genStochKompetenzcheck,'hard')) loaded.push('stochKompetenzcheck');
    if(typeof window.render==='function') window.render();
    window.GHGenialesV291Runtime=Object.freeze({loaded,integrated:loaded.length});
    console.info('[V2.9.1] runtime bridge integrated', loaded);
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',boot,{once:true});
  else boot();
})();
