/* GHGeniales Mathe V2.9.1 — isolated mastery core */
(() => {
  const LEVELS = Object.freeze([
    { id:'NEW', label:'Noch nicht geübt' },
    { id:'PRACTICE', label:'Üben' },
    { id:'CONSOLIDATE', label:'Festigen' },
    { id:'STABILIZE', label:'Stabilisieren' },
    { id:'SECURE', label:'Sicher' }
  ]);

  const clamp=(n,min,max)=>Math.min(max,Math.max(min,n));
  const accuracy=results=>{
    if(!Array.isArray(results)||!results.length) return null;
    const valid=results.filter(r=>r&&typeof r.correct==='boolean');
    if(!valid.length) return null;
    return valid.filter(r=>r.correct).length/valid.length;
  };
  const recentAccuracy=(results,n=6)=>accuracy((results||[]).slice(-n));
  const coverage=(results,key)=>{
    const values=new Set((results||[]).map(r=>r&&r[key]).filter(Boolean));
    return values.size;
  };
  const difficultyCoverage=(results)=>coverage(results,'difficulty');
  const variantCoverage=(results)=>coverage(results,'variantId');
  const activeMistakes=mistakes=>Array.isArray(mistakes)?mistakes.filter(m=>m&&!m.resolved):[];

  function scoreMastery(input={}){
    const results=Array.isArray(input.results)?input.results:[];
    if(!results.length) return {score:0,level:'NEW',label:'Noch nicht geübt'};

    const hist=accuracy(results)??0;
    const recent=recentAccuracy(results)??hist;
    const difficulty=Math.min(1,difficultyCoverage(results)/3);
    const variants=Math.min(1,variantCoverage(results)/4);
    const mistakes=Math.min(1,activeMistakes(input.mistakes).length/3);
    const latest=results[results.length-1]?.timestamp;
    const ageDays=Number.isFinite(latest)?Math.max(0,(Date.now()-latest)/86400000):0;
    const recency=Math.exp(-ageDays/21);

    const score=clamp(
      100*(0.30*hist+0.30*recent+0.12*difficulty+0.12*variants+0.10*recency-0.06*mistakes),
      0,100
    );

    let level='PRACTICE';
    if(results.length<2 || score<35) level='PRACTICE';
    else if(score<55) level='CONSOLIDATE';
    else if(score<75) level='STABILIZE';
    else if(score>=85 && recent>=0.85 && variants>=0.5 && difficulty>=0.34 && mistakes===0) level='SECURE';
    else level='STABILIZE';

    const meta=LEVELS.find(x=>x.id===level)||LEVELS[1];
    return {score:Math.round(score*10)/10,level:meta.id,label:meta.label,historicalAccuracy:hist,recentAccuracy:recent,difficultyCoverage:difficulty,variantCoverage:variants,recency,mistakeLoad:mistakes};
  }

  function nextRecommendation(inputs=[]){
    return [...inputs].map(item=>{
      const mastery=scoreMastery(item);
      const due=item.dueAt&&new Date(item.dueAt).getTime()<=Date.now();
      const recencyDrop=mastery.historicalAccuracy!=null&&mastery.recentAccuracy<mastery.historicalAccuracy-0.15;
      const errors=activeMistakes(item.mistakes).length;
      let priority=0;
      if(due) priority+=80;
      if(errors) priority+=25+10*Math.min(errors,3);
      if(recencyDrop) priority+=40;
      priority+=Math.round((1-mastery.variantCoverage)*15);
      priority+=Math.round((1-mastery.difficultyCoverage)*10);
      if(mastery.level==='NEW') priority+=32;
      return {...item,mastery,priority};
    }).sort((a,b)=>b.priority-a.priority);
  }

  globalThis.GHGenialesV291Mastery=Object.freeze({LEVELS,scoreMastery,nextRecommendation,accuracy,recentAccuracy});
})();
