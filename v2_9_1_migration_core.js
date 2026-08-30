/* GHGeniales Mathe V2.9.1 — non-destructive V2.8 -> V2.9.1 migration core */
(() => {
  const VERSION = '2';
  const KEYS = Object.freeze({
    stats:'kk_stats_v2', mistakeBank:'kk_mistakebank_v2', streak:'kk_streak_v2', progress:'kk_progress_v1',
    achievements:'kk_achievements_v1', exams:'kk_exams_v1', theme:'kk_theme_v1'
  });
  function clone(v){ return v == null ? v : JSON.parse(JSON.stringify(v)); }
  function parseJSON(raw, fallback){ try{return raw == null ? clone(fallback) : JSON.parse(raw);}catch{return clone(fallback);} }
  function normalizeAttempts(v){ return Math.max(0, Number(v)||0); }
  function migrate(payload){
    const source = payload && payload.data && typeof payload.data==='object' ? payload.data : {};
    const out = {};
    for(const [name,key] of Object.entries(KEYS)){
      if(Object.prototype.hasOwnProperty.call(source,key)) out[key] = source[key];
    }
    const rawProgress=parseJSON(out[KEYS.progress],{});
    const rawStreak=parseJSON(out[KEYS.streak],{});
    const rawStats=parseJSON(out[KEYS.stats],{});
    const rawMistakes=parseJSON(out[KEYS.mistakeBank],{});
    const rawExams=parseJSON(out[KEYS.exams],[]);
    const migratedProgress={xp:Math.max(0,Number(rawProgress.xp)||0),totalAttempts:normalizeAttempts(rawProgress.totalAttempts),totalCorrect:normalizeAttempts(rawProgress.totalCorrect),dailyBest:Math.max(0,Number(rawProgress.dailyBest)||0),...rawProgress};
    migratedProgress.schemaVersion=VERSION;
    migratedProgress.totalAttempts=Math.max(migratedProgress.totalAttempts,migratedProgress.totalCorrect);
    const migratedStreak={current:Math.max(0,Number(rawStreak.current)||0),best:Math.max(0,Number(rawStreak.best)||0),todayCount:Math.max(0,Number(rawStreak.todayCount)||0),todayDate:rawStreak.todayDate||'',...rawStreak};
    const migratedExams=Array.isArray(rawExams)?rawExams.slice(0,50):[];
    return {schemaVersion:VERSION,app:'GHGeniales Mathe',fromVersion:payload?.version||'2.8.0',migratedAt:new Date().toISOString(),data:{...out,[KEYS.progress]:JSON.stringify(migratedProgress),[KEYS.streak]:JSON.stringify(migratedStreak),[KEYS.stats]:JSON.stringify(rawStats),[KEYS.mistakeBank]:JSON.stringify(rawMistakes),[KEYS.exams]:JSON.stringify(migratedExams)}};
  }
  function validate(result){
    const e=[]; if(result?.schemaVersion!==VERSION)e.push('missing schemaVersion 2'); if(!result?.data)e.push('missing data');
    if(result?.data){ if(!(KEYS.progress in result.data))e.push('progress lost'); if(!(KEYS.stats in result.data))e.push('stats lost'); if(!(KEYS.mistakeBank in result.data))e.push('mistake bank lost'); if(!(KEYS.exams in result.data))e.push('exam history lost'); }
    return {ok:e.length===0,errors:e};
  }
  globalThis.GHGenialesV291Migration=Object.freeze({KEYS,migrate,validate});
})();
