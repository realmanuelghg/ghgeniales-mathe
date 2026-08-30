/* V2.9.1 development generator: Ergebnisraum */
(() => {
  const r=(a,b)=>Math.floor(Math.random()*(b-a+1))+a;
  const c=a=>a[Math.floor(Math.random()*a.length)];
  const s=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=r(0,i);[a[i],a[j]]=[a[j],a[i]]}return a};
  const mc=(correct,d)=>{const u=[correct,...d].filter((v,i,a)=>a.indexOf(v)===i).slice(0,4);while(u.length<4)u.push(`Weitere Option ${u.length+1}`);const o=s(u);return{options:o,correctIndex:o.indexOf(correct)}};
  function genErgebnisraum(){
    const mode=c(['coin2','die2','elementary']);
    if(mode==='coin2'){
      const correct='4', x=mc(correct,['2','3','8']);
      return {skill:'ergebnisraum',variant:'cardinality',difficulty:'easy',type:'mc',prompt:'Eine faire Münze wird zweimal geworfen. Wie viele Elementarereignisse besitzt der Ergebnisraum?',formula:'Ω = {KK, KZ, ZK, ZZ}',...x,correctValue:4,mistakeTags:['order_ignored'],explain:'Bei zwei Würfen zählt die Reihenfolge. Es gibt KK, KZ, ZK und ZZ – also 4 Elementarereignisse.'};
    }
    if(mode==='die2'){
      const n=4, correct='16', x=mc(correct,['4','8','12']);
      return {skill:'ergebnisraum',variant:'cardinality',difficulty:'medium',type:'mc',prompt:'Ein vierseitiger Würfel wird zweimal geworfen. Wie viele mögliche Ergebnisse besitzt der Ergebnisraum?',formula:'|Ω| = 4 · 4 = ?',...x,correctValue:16,mistakeTags:['order_ignored'],explain:'Für den ersten Wurf gibt es 4 Möglichkeiten und für den zweiten ebenfalls 4. Daher 4 · 4 = 16 geordnete Ergebnisse.'};
    }
    const correct='KZ', x=mc(correct,['mindestens ein Kopf','KK oder ZZ','zwei Würfe']);
    return {skill:'ergebnisraum',variant:'elementary_event',difficulty:'medium',type:'mc',prompt:'Eine Münze wird zweimal geworfen. Welches ist ein einzelnes Elementarereignis?',formula:'Ω = {KK, KZ, ZK, ZZ}',...x,correctValue:correct,mistakeTags:['order_ignored'],explain:'Ein Elementarereignis ist ein einzelnes konkretes Ergebnis. KZ ist genau ein solches Ergebnis; die anderen Antworten fassen mehrere Ergebnisse zusammen.'};
  }
  function validateErgebnisraum(q){
    const e=[]; if(q?.skill!=='ergebnisraum')e.push('wrong skill'); if(q?.type!=='mc')e.push('expected mc'); if(!q?.prompt)e.push('missing prompt');
    if(!Array.isArray(q?.options)||q.options.length!==4)e.push('expected 4 options'); else if(new Set(q.options).size!==4)e.push('duplicate options');
    if(!Number.isInteger(q?.correctIndex)||q.correctIndex<0||q.correctIndex>=q.options.length)e.push('invalid correctIndex');
    return {ok:!e.length,errors:e};
  }
  globalThis.GHGenialesV291Stochastik=Object.freeze({genErgebnisraum,validateErgebnisraum});
})();
