/* Integrated smoke runner used by v2_9_1_integrated_smoke_test.html */
(() => {
  const expected=[
    ['ergebnisraum','GHGenialesV291Stochastik','genErgebnisraum'],
    ['ereignisse','GHGenialesV291Ereignisse','genEreignisse'],
    ['vierfeldertafel','GHGenialesV291Vierfeldertafel','genVierfeldertafel'],
    ['bedingteWkVerstehen','GHGenialesV291BedingteWk','genBedingteWkVerstehen'],
    ['unabhaengigkeitVerstehen','GHGenialesV291Unabhaengigkeit','genUnabhaengigkeitBedingt'],
    ['statistikInterpretation','GHGenialesV291StatistikInterpretation','genStatistikInterpretation'],
    ['pfadKompetenzcheck','GHGenialesV291StochastikChecks','genPfadKompetenzcheck'],
    ['stochKompetenzcheck','GHGenialesV291StochastikChecks','genStochKompetenzcheck']
  ];
  window.GHGenialesV291RunIntegratedSmoke=function(iterations=200){
    const out=[]; const push=(name,ok,detail='')=>out.push({name,ok,detail});
    push('TOPICS.stochastik exists',!!window.TOPICS?.stochastik);
    for(const [id,obj,fnName] of expected){
      const fn=window[obj]?.[fnName]; push(id+': generator loaded',typeof fn==='function'); if(typeof fn!=='function') continue;
      let err='';
      for(let i=0;i<iterations;i++){
        try{const q=fn(); if(q?.skill!==id){err='wrong skill';break;} if(typeof q?.explain!=='string'||!q.explain){err='missing explain';break;} if(q.type==='mc'&&(!Array.isArray(q.options)||q.options.length!==4||new Set(q.options).size!==4||!Number.isInteger(q.correctIndex)||q.correctIndex<0||q.correctIndex>=4)){err='MC contract failed';break;}}catch(e){err=e?.message||String(e);break;}
      }
      push(id+': '+iterations+' runs',!err,err);
      push(id+': registered',!!window.TOPICS?.stochastik?.subtypes?.some(s=>s.id===id));
    }
    return out;
  };
})();
