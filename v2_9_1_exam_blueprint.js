/* GHGeniales Mathe V2.9.1 — FOS short exam blueprint */
(() => {
  const BLOCKS = Object.freeze([
    {id:'stoch-basic',points:5,skills:['zufallsexperiment','ergebnisraum','ereignisse']},
    {id:'tree-path',points:5,skills:['pfadregel','pfadKompetenzcheck']},
    {id:'conditional',points:5,skills:['bedingteWkVerstehen','vierfeldertafel','unabhaengigkeit']},
    {id:'analysis-differential',points:5,skills:['ableiten','differenzenquotient','tangentensteigung']},
    {id:'analysis-curve',points:5,skills:['nullstellen','extrempunkte','wendepunkt','monotonie']},
    {id:'integrated',points:5,skills:['stochKompetenzcheck','statistikInterpretation','kombiTyp']}
  ]);
  function validate(){
    const errors=[]; if(BLOCKS.length!==6) errors.push('expected 6 blocks');
    const total=BLOCKS.reduce((n,b)=>n+b.points,0); if(total!==30) errors.push('expected 30 points');
    const ids=new Set(BLOCKS.map(b=>b.id)); if(ids.size!==BLOCKS.length) errors.push('duplicate block ids');
    BLOCKS.forEach(b=>{if(!b.skills?.length)errors.push(`${b.id}: no skills`);});
    return {ok:errors.length===0,errors,totalPoints:total,blockCount:BLOCKS.length};
  }
  function buildSession(){ return {durationSec:25*60,blocks:BLOCKS.map(b=>({...b,done:false,pointsEarned:0}))}; }
  globalThis.GHGenialesV291ExamBlueprint=Object.freeze({BLOCKS,validate,buildSession});
})();
