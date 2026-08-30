/* GHGeniales Mathe V2.9.1 — shared core contract for staged integration.
 * This file deliberately does not mutate the legacy app. It gives Codex one
 * stable adapter contract for Registry → Generator → Attempt → Mastery → Backup → Exam.
 */
(() => {
  const REQUIRED_TYPES = new Set(['mc','numeric','set']);
  const MASTERIES = ['Noch nicht geübt','Üben','Festigen','Stabilisieren','Sicher'];

  function assertQuestion(question, skillId){
    const errors=[];
    if(!question || typeof question !== 'object') errors.push('question missing');
    if(skillId && question?.skill && question.skill!==skillId) errors.push('skill mismatch');
    if(!REQUIRED_TYPES.has(question?.type)) errors.push('invalid type');
    if(!question?.prompt) errors.push('missing prompt');
    if(question?.type==='mc'){
      if(!Array.isArray(question.options) || question.options.length!==4) errors.push('MC must have 4 options');
      else if(new Set(question.options.map(String)).size!==4) errors.push('MC options must be unique');
      if(!Number.isInteger(question.correctIndex) || question.correctIndex<0 || question.correctIndex>=question.options?.length) errors.push('invalid correctIndex');
    }
    if(question?.type==='numeric' && (!Number.isFinite(question.correct) || !Number.isFinite(question.tol) || question.tol<0)) errors.push('invalid numeric answer');
    if(question?.type==='set' && (!Array.isArray(question.correct) || !question.correct.length || question.correct.some(v=>!Number.isFinite(v)))) errors.push('invalid set answer');
    return {ok:errors.length===0,errors};
  }

  function masteryFromStats(stats, mistake, now=Date.now()){
    const attempts=Number(stats?.attempts)||0;
    const correct=Number(stats?.correct)||0;
    const acc=attempts ? correct/attempts : 0;
    const recent=Array.isArray(stats?.recent) ? stats.recent.slice(0,6) : [];
    const recentAcc=recent.length ? recent.filter(x=>x?.correct).length/recent.length : acc;
    const due=!!(mistake && !mistake.resolved && mistake.nextReviewAt && mistake.nextReviewAt<=now);
    if(attempts===0) return {stage:0,label:MASTERIES[0],score:0,reason:'no attempts'};
    if(due) return {stage:1,label:MASTERIES[1],score:Math.max(0,recentAcc*.7),reason:'review due'};
    if(mistake && !mistake.resolved && mistake.misses>0) return {stage:1,label:MASTERIES[1],score:Math.max(0,recentAcc*.75),reason:'active mistake'};
    if(attempts>=5 && acc>=0.85 && recentAcc>=0.8) return {stage:4,label:MASTERIES[4],score:Math.min(1,acc*.6+recentAcc*.4),reason:'stable high performance'};
    if(acc>=0.8 && recentAcc>=0.75) return {stage:3,label:MASTERIES[3],score:acc*.6+recentAcc*.4,reason:'good recent performance'};
    if(acc>=0.65 || recentAcc>=0.65) return {stage:2,label:MASTERIES[2],score:acc*.5+recentAcc*.5,reason:'needs consolidation'};
    return {stage:1,label:MASTERIES[1],score:acc*.5+recentAcc*.5,reason:'needs practice'};
  }

  function priority(stats, mistake, mastery, now=Date.now()){
    const attempts=Number(stats?.attempts)||0;
    const acc=attempts ? (Number(stats?.correct)||0)/attempts : 0;
    const recent=Array.isArray(stats?.recent) ? stats.recent.slice(0,6) : [];
    const recentAcc=recent.length ? recent.filter(x=>x?.correct).length/recent.length : acc;
    const due=!!(mistake && !mistake.resolved && mistake.nextReviewAt && mistake.nextReviewAt<=now);
    const age=stats?.lastAttemptAt ? Math.min(1,(now-stats.lastAttemptAt)/(7*86400000)) : 1;
    let score=0;
    score += due ? 100 : 0;
    score += mistake && !mistake.resolved ? 45 : 0;
    score += (1-acc)*35;
    score += (1-recentAcc)*30;
    score += age*10;
    score += attempts===0 ? 20 : Math.max(0,8-Math.min(8,attempts));
    score += mastery?.stage===1 ? 10 : 0;
    return score;
  }

  function migrateV28Payload(payload){
    const source=payload && typeof payload==='object' ? payload : {};
    const data=source.data && typeof source.data==='object' ? source.data : {};
    return {
      schemaVersion:2,
      app:'GHGeniales Mathe',
      sourceVersion:source.version || '2.8.0',
      exportedAt:source.exportedAt || null,
      migratedAt:new Date().toISOString(),
      data:{...data}
    };
  }

  function examBlueprint(){
    return [
      {id:'stoch-path',area:'stochastik',skills:['pfadKompetenzcheck','ergebnisraum'],points:5},
      {id:'stoch-table',area:'stochastik',skills:['vierfeldertafel','bedingteWkVerstehen'],points:5},
      {id:'stoch-independence',area:'stochastik',skills:['unabhaengigkeit','stochKompetenzcheck'],points:5},
      {id:'analysis-core',area:'analysis',skills:['ableiten','extrempunkte','monotonie'],points:5},
      {id:'analysis-global',area:'analysis',skills:['wendepunkt','globalverhalten','vorzeichenverlauf'],points:5},
      {id:'analysis-model',area:'analysis',skills:['parameteraufgabe','schnittBeruehrung'],points:5}
    ];
  }

  globalThis.GHGenialesV291Core=Object.freeze({
    MASTERIES,
    REQUIRED_TYPES,
    assertQuestion,
    masteryFromStats,
    priority,
    migrateV28Payload,
    examBlueprint
  });
})();
