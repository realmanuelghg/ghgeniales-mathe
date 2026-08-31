/* GHGeniales Mathe V2.9.1 — integrated-style Stochastik Kompetenzchecks
 * Pure generators only; the production UI should reuse the existing render/answer pipeline.
 */
(() => {
  const r=(a,b)=>Math.floor(Math.random()*(b-a+1))+a;
  const c=a=>a[Math.floor(Math.random()*a.length)];
  const s=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=r(0,i);[a[i],a[j]]=[a[j],a[i]]}return a;};
  const round=(n,d=3)=>Math.round(n*10**d)/10**d;

  function mc(correct,distractors){
    const vals=[]; const seen=new Set();
    [correct,...distractors].forEach(v=>{const k=String(v);if(!seen.has(k)){seen.add(k);vals.push(v);}});
    let guard=0;
    while(vals.length<4 && guard++<20){const filler=`Option ${vals.length+1}`;if(!seen.has(filler)){seen.add(filler);vals.push(filler);}}
    const options=s(vals.slice(0,4));
    return {options,correctIndex:options.indexOf(correct)};
  }

  function genPfadKompetenzcheck(){
    const pA=c([0.3,0.4,0.5,0.6]);
    const pC_A=c([0.2,0.4,0.6,0.8]);
    const pC_notA=c([0.2,0.4,0.6,0.8]);
    const pNotA=round(1-pA);
    const pathA=round(pA*pC_A);
    const pathNotA=round(pNotA*pC_notA);
    const totalC=round(pathA+pathNotA);
    const asked=c(['path','total','conditional']);

    if(asked==='path'){
      const correct=`${pathA}`;
      const x=mc(correct,[String(round(pA+pC_A)),String(round(pA*pC_notA)),String(round(pC_A))]);
      return {skill:'pfadKompetenzcheck',variant:'path_probability',difficulty:'hard',type:'mc',
        prompt:`Ein Baumdiagramm hat P(A)=${pA}, P(C|A)=${pC_A}. Wie groß ist die Wahrscheinlichkeit des Pfades A → C?`,...x,
        explain:`Entlang eines Pfades wird multipliziert: P(A∩C)=${pA}·${pC_A}=${pathA}.`,
        mistakeTags:['path_mult_add']};
    }
    if(asked==='total'){
      const correct=`${totalC}`;
      const x=mc(correct,[String(round(pathA+pathNotA+pA)),String(round(pC_A+pC_notA)),String(round(pA*totalC))]);
      return {skill:'pfadKompetenzcheck',variant:'total_probability',difficulty:'hard',type:'mc',
        prompt:`Gegeben sind P(A)=${pA}, P(C|A)=${pC_A} und P(C|¬A)=${pC_notA}. Bestimme P(C).`,...x,
        explain:`Addiere die beiden Pfade: ${pA}·${pC_A} + ${pNotA}·${pC_notA} = ${totalC}.`,
        mistakeTags:['total_probability_confused']};
    }
    const pAC=pathA;
    const correct=`${round(pAC/pC_A)}`;
    const x=mc(correct,[String(pC_A),String(pathA),String(round(pAC/(1-pA)))]);
    return {skill:'pfadKompetenzcheck',variant:'conditional_from_path',difficulty:'hard',type:'mc',
      prompt:`Für den Pfad A → C gilt P(A∩C)=${pAC} und P(C|A)=${pC_A}. Bestimme P(A).`,...x,
      explain:`Aus P(A∩C)=P(A)·P(C|A) folgt P(A)=${pAC}/${pC_A}=${correct}.`,
      mistakeTags:['condition_swapped']};
  }

  function genStochKompetenzcheck(){
    const a=r(15,45), b=r(10,35), cCell=r(10,35), d=r(15,45), total=a+b+cCell+d;
    const pBgivenA=round(a/(a+b),3);
    const pAgivenB=round(a/(a+cCell),3);
    const pA=round((a+b)/total,3);
    const independent=Math.abs(round(a/total,3)-round(pA*((a+cCell)/total),3))<0.001;
    const asked=c(['conditionalA','conditionalB','independence']);

    if(asked==='conditionalA'){
      const correct=`${Math.round(pAgivenB*1000)/10} %`;
      const x=mc(correct,[`${Math.round(pBgivenA*1000)/10} %`,`${Math.round(pA*1000)/10} %`,`${Math.round((a/total)*1000)/10} %`]);
      return {skill:'stochKompetenzcheck',variant:'P_A_given_B',difficulty:'hard',type:'mc',
        prompt:`In einer Vierfeldertafel stehen A∩B=${a} und ¬A∩B=${cCell}. Bestimme P(A|B).`,table:{a,b,c:cCell,d,rowA:a+b,rowNotA:cCell+d,total},...x,
        explain:`Die Bezugsmenge ist B: P(A|B)=${a}/(${a}+${cCell})=${correct}.`,
        mistakeTags:['wrong_denominator']};
    }
    if(asked==='conditionalB'){
      const correct=`${Math.round(pBgivenA*1000)/10} %`;
      const x=mc(correct,[`${Math.round(pAgivenB*1000)/10} %`,`${Math.round(((a+cCell)/total)*1000)/10} %`,`${Math.round((b/total)*1000)/10} %`]);
      return {skill:'stochKompetenzcheck',variant:'P_B_given_A',difficulty:'hard',type:'mc',
        prompt:`In einer Vierfeldertafel stehen A∩B=${a} und A∩¬B=${b}. Bestimme P(B|A).`,table:{a,b,c:cCell,d,rowA:a+b,rowNotA:cCell+d,total},...x,
        explain:`Die Bezugsmenge ist A: P(B|A)=${a}/(${a}+${b})=${correct}.`,
        mistakeTags:['wrong_denominator','condition_swapped']};
    }
    const pAraw=(a+b)/total, pB=(a+cCell)/total, pAB=a/total, product=pAraw*pB;
    const exactIndependent=Math.abs(pAB-product)<0.01;
    const correct=exactIndependent?'Ja, A und B sind unabhängig.':'Nein, A und B sind abhängig.';
    const x=mc(correct,[exactIndependent?'Nein, weil P(A∩B) kleiner ist.':'Ja, weil P(A) und P(B) bekannt sind.','Nur bei gleichen Randhäufigkeiten.']);
    return {skill:'stochKompetenzcheck',variant:'independence',difficulty:'hard',type:'mc',
      prompt:`Prüfe die Unabhängigkeit anhand der Vierfeldertafel.`,table:{a,b,c:cCell,d,rowA:a+b,rowNotA:cCell+d,total},...x,
      explain:`Vergleiche P(A∩B)=${round(pAB,3)} mit P(A)·P(B)=${round(product,3)}.`,
      mistakeTags:['independence_wrong_rule']};
  }

  function validate(q){
    const e=[];
    if(!q?.skill)e.push('missing skill');
    if(!q?.variant)e.push('missing variant');
    if(q?.difficulty!=='hard')e.push('expected hard');
    if(q?.type!=='mc')e.push('expected mc');
    if(!Array.isArray(q?.options)||q.options.length!==4)e.push('expected 4 options');
    if(q?.options && new Set(q.options).size!==q.options.length)e.push('duplicate options');
    if(!Number.isInteger(q?.correctIndex)||q.correctIndex<0||q.correctIndex>=4)e.push('invalid correctIndex');
    if(q?.table){const t=q.table;if(t.rowA!==t.a+t.b||t.rowNotA!==t.c+t.d||t.total!==t.rowA+t.rowNotA)e.push('inconsistent table');}
    return {ok:e.length===0,errors:e};
  }

  globalThis.GHGenialesV291StochastikChecks=Object.freeze({genPfadKompetenzcheck,genStochKompetenzcheck,validate});
})();
