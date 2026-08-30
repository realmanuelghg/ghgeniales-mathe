/* GHGeniales Mathe V2.9.1 – Stochastik: Unabhängigkeit */
(() => {
  const r=(a,b)=>Math.floor(Math.random()*(b-a+1))+a;
  const c=a=>a[Math.floor(Math.random()*a.length)];
  const s=a=>{const x=a.slice();for(let i=x.length-1;i>0;i--){const j=r(0,i);[x[i],x[j]]=[x[j],x[i]]}return x};
  const round2=n=>Math.round(n*100)/100;

  function independentCase(){
    const pA=c([0.2,0.25,0.4,0.5,0.6,0.75]);
    const pB=c([0.2,0.25,0.4,0.5,0.6,0.75]);
    return {pA,pB,pAB:round2(pA*pB),independent:true};
  }

  function dependentCase(){
    const pA=c([0.2,0.25,0.4,0.5,0.6,0.75]);
    const pB=c([0.2,0.25,0.4,0.5,0.6,0.75]);
    const lo=Math.max(0,pA+pB-1), hi=Math.min(pA,pB), base=pA*pB;
    const candidates=[round2(lo+0.2*(hi-lo)),round2(lo+0.5*(hi-lo)),round2(lo+0.8*(hi-lo))]
      .filter(v=>v>=lo && v<=hi && Math.abs(v-base)>0.01);
    const pAB=candidates.length?c(candidates):round2(lo);
    return {pA,pB,pAB,independent:false};
  }

  function genUnabhaengigkeit(){
    const data=Math.random()<0.5?independentCase():dependentCase();
    const product=round2(data.pA*data.pB);
    const correct=data.independent?'Unabhängig':'Abhängig';
    const options=s([correct,'Unabhängig, weil P(A) und P(B) beide bekannt sind','Abhängig, weil P(A∩B) immer kleiner als P(A) ist','Nur unabhängig, wenn P(A)=P(B)'].filter((v,i,a)=>a.indexOf(v)===i));
    // The fourth option is not always a good distractor when the true answer is dependent,
    // but it remains mathematically distinct from the correct criterion.
    return {
      skill:'unabhaengigkeit', variant:'intersection_rule', difficulty:'medium', type:'mc',
      prompt:`Prüfe, ob A und B stochastisch unabhängig sind. Gegeben sind ${tex(`P(A)=${data.pA}`)}, ${tex(`P(B)=${data.pB}`)} und ${tex(`P(A\\cap B)=${data.pAB}`)}.`,
      formula:tex(`P(A)\\cdot P(B)=${product}`), options, correctIndex:options.indexOf(correct),
      explain:data.independent
        ?`Bei Unabhängigkeit gilt ${tex(`P(A\\cap B)=P(A)\\cdot P(B)`)}. Hier gilt ${tex(`${data.pAB}=${data.pA}\\cdot${data.pB}=${product}`)}.`
        :`Hier müsste bei Unabhängigkeit ${tex(`P(A\\cap B)=P(A)\\cdot P(B)=${product}`)} gelten. Tatsächlich ist ${tex(`P(A\\cap B)=${data.pAB}`)}.`,
      mistakeTags:['independence_wrong_rule']
    };
  }

  function genUnabhaengigkeitBedingt(){
    const pA=c([0.2,0.25,0.4,0.5,0.6,0.75]);
    const pB=c([0.2,0.25,0.4,0.5,0.6,0.75]);
    const independent=Math.random()<0.5;
    const pAB=independent?round2(pA*pB):round2(Math.max(0.05,Math.min(pA,pB)*0.8));
    const pGiven=round2(pAB/pB);
    const correct=independent?'Unabhängig':'Abhängig';
    const distractors=[
      independent?'Abhängig, weil P(A|B) kleiner als 1 ist.':'Unabhängig, weil P(A) und P(B) beide zwischen 0 und 1 liegen.',
      `Unabhängig nur, wenn P(A) = P(B) = ${pA}`
    ];
    const options=s([correct,...distractors]);
    return {
      skill:'unabhaengigkeit', variant:'conditional_rule', difficulty:'hard', type:'mc',
      prompt:`Es gilt ${tex(`P(A)=${pA}`)}, ${tex(`P(B)=${pB}`)} und ${tex(`P(A|B)=${pGiven}`)}. Was folgt daraus?`,
      options, correctIndex:options.indexOf(correct),
      explain:independent
        ?`Für Unabhängigkeit genügt hier ${tex(`P(A|B)=P(A)`)}. Es gilt ${tex(`${pGiven}=${pA}`)}.`
        :`Hier ist ${tex(`P(A|B)=${pGiven}`)} nicht gleich ${tex(`P(A)=${pA}`)}. Die Ereignisse beeinflussen sich also.` ,
      mistakeTags:['independence_wrong_rule']
    };
  }

  function tex(s){return `\\(${s}\\)`;}

  function validateUnabhaengigkeit(q){
    const e=[];
    if(q?.skill!=='unabhaengigkeit')e.push('wrong skill');
    if(!q?.variant)e.push('missing variant');
    if(q?.type!=='mc')e.push('expected mc');
    if(!Array.isArray(q?.options)||q.options.length!==4)e.push('expected 4 options');
    else if(new Set(q.options).size!==4)e.push('duplicate options');
    if(!Number.isInteger(q?.correctIndex)||q.correctIndex<0||q.correctIndex>=q.options.length)e.push('invalid correctIndex');
    return {ok:e.length===0,errors:e};
  }

  globalThis.GHGenialesV291Unabhaengigkeit=Object.freeze({genUnabhaengigkeit,genUnabhaengigkeitBedingt,validateUnabhaengigkeit});
})();
