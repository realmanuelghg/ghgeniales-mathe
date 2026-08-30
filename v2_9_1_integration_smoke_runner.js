/* v2.9.1 integrated smoke test */
(() => {
  const ids = [
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
    const out=[];
    const add=(name,ok,detail='')=>out.push({name,ok,detail});
    add('TOPICS exists',!!window.TOPICS?.stochastik);
    for(const [id,obj,fnName] of ids){
      const fn=window[obj]?.[fnName];
      add(`${id}: loaded`,typeof fn==='function');
      if(typeof fn!=='function') continue;
      let error='';
      for(let i=0;i<iterations;i++){
        try{
          const q=fn();
          if(q?.skill!==id){error=`wrong skill: ${q?.skill}`;break;}
          if(typeof q?.explain!=='string'||!q.explain){error='missing explanation';break;}
          if(q.type==='mc' && (!Array.isArray(q.options)||q.options.length!==4||new Set(q.options).size!==4||!Number.isInteger(q.correctIndex)||q.correctIndex<0||q.correctIndex>=4)){error='MC contract failed';break;}
        }catch(e){error=e?.message||String(e);break;}
      }
      add(`${id}: ${iterations} runs`,!error,error);
      add(`${id}: registered`,!!window.TOPICS?.stochastik?.subtypes?.some(s=>s.id===id));
    }
    return out;
  };
})();
