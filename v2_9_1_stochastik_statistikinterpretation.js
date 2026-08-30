/* GHGeniales Mathe V2.9.1 — Statistikinterpretation */
(() => {
  const pick = a => a[Math.floor(Math.random()*a.length)];
  const r = (a,b) => Math.floor(Math.random()*(b-a+1))+a;
  const shuffle = a => { const x=a.slice(); for(let i=x.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1)); [x[i],x[j]]=[x[j],x[i]];} return x; };
  const mc = (correct, distractors) => { const all=[]; for(const x of [correct,...distractors]) if(!all.includes(x)) all.push(x); while(all.length<4) all.push(`Weitere Aussage ${all.length+1}`); const options=shuffle(all.slice(0,4)); return {options,correctIndex:options.indexOf(correct)}; };

  function genStatistikInterpretation(){
    const mode=pick(['sample_vs_population','association_not_causation','relative_frequency','conditional_statement']);

    if(mode==='sample_vs_population'){
      const sample=r(80,220), favorable=r(Math.floor(sample*0.4),Math.floor(sample*0.8));
      const pct=(100*favorable/sample).toFixed(1);
      const correct=`In der Stichprobe beträgt der Anteil etwa ${pct} %. Daraus folgt nicht automatisch derselbe exakte Anteil in der gesamten Population.`;
      const x=mc(correct,[
        `Genau ${pct} % der gesamten Population haben sicher das Merkmal.`,
        `Die Stichprobe beweist, dass niemand außerhalb der Stichprobe das Merkmal hat.`,
        `Eine Stichprobe kann grundsätzlich keine Information über eine Population liefern.`
      ]);
      return {skill:'statistikInterpretation',variant:'sample_vs_population',difficulty:'medium',type:'mc',
        prompt:`Eine Stichprobe mit ${sample} Personen enthält ${favorable} Personen mit Merkmal A. Welche Aussage ist statistisch angemessen?`,
        ...x,
        explain:`In der Stichprobe liegt der beobachtete Anteil bei ${favorable}/${sample} ≈ ${pct} %. Das ist eine Stichprobeninformation und keine exakte Aussage über jede Person der Population.`,
        mistakeTags:['sample_overgeneralization']};
    }

    if(mode==='association_not_causation'){
      const correct='Ein beobachteter statistischer Zusammenhang beweist allein noch keine Kausalität.';
      const x=mc(correct,[
        'Sobald zwei Merkmale gemeinsam auftreten, verursacht eines sicher das andere.',
        'Korrelation und Kausalität bedeuten immer dasselbe.',
        'Ein Zusammenhang ist nur dann möglich, wenn eine Variable die andere direkt verursacht.'
      ]);
      return {skill:'statistikInterpretation',variant:'association_not_causation',difficulty:'hard',type:'mc',
        prompt:'Zwei Merkmale zeigen in einer Untersuchung einen statistischen Zusammenhang. Welche Aussage ist korrekt?',
        ...x,
        explain:'Ein Zusammenhang kann viele Ursachen haben, etwa Zufall, gemeinsame Einflussfaktoren oder eine echte Ursache-Wirkungs-Beziehung. Aus dem Zusammenhang allein folgt keine Kausalität.',
        mistakeTags:['correlation_causation']};
    }

    if(mode==='relative_frequency'){
      const n=r(100,1000), k=r(Math.floor(n*0.2),Math.floor(n*0.8)), p=(100*k/n).toFixed(1);
      const correct=`Die relative Häufigkeit beträgt ${p} %.`;
      const x=mc(correct,[
        `Die relative Häufigkeit beträgt ${k} %.`,
        `Die relative Häufigkeit beträgt ${n} %.`,
        `Die relative Häufigkeit beträgt ${(100*n/k).toFixed(1)} %.`
      ]);
      return {skill:'statistikInterpretation',variant:'relative_frequency',difficulty:'easy',type:'mc',
        prompt:`Bei ${n} Beobachtungen tritt Ereignis A ${k}-mal auf. Welche relative Häufigkeit gehört dazu?`,
        ...x,
        explain:`Relative Häufigkeit = absolute Häufigkeit / Gesamtzahl = ${k}/${n} ≈ ${p} %.`,
        mistakeTags:['absolute_relative_confused']};
    }

    const pA=pick([0.2,0.25,0.4,0.5,0.6,0.75]), pB=pick([0.25,0.4,0.5,0.6,0.8]);
    const correct=`P(A|B) beschreibt die Wahrscheinlichkeit von A unter der Bedingung, dass B bereits eingetreten ist.`;
    const x=mc(correct,[
      `P(A|B) beschreibt die Wahrscheinlichkeit von B unter der Bedingung A.`,
      `P(A|B) ist immer gleich P(A)+P(B).`,
      `P(A|B) kann nur berechnet werden, wenn A und B unabhängig sind.`
    ]);
    return {skill:'statistikInterpretation',variant:'conditional_statement',difficulty:'medium',type:'mc',
      prompt:`Gegeben seien ${`P(A)=${pA}`} und ${`P(B)=${pB}`}. Welche Aussage beschreibt ${'P(A|B)'} korrekt?`,
      ...x,
      explain:'Bei einer bedingten Wahrscheinlichkeit ist B die Bezugsbedingung: Man betrachtet nur die Fälle, in denen B eingetreten ist, und fragt darin nach A.',
      mistakeTags:['condition_swapped']};
  }

  function validate(q){
    const e=[];
    if(q?.skill!=='statistikInterpretation') e.push('wrong skill');
    if(!q?.variant) e.push('missing variant');
    if(q?.type!=='mc') e.push('expected mc');
    if(!Array.isArray(q?.options)||q.options.length!==4)e.push('expected 4 options');
    else if(new Set(q.options).size!==4)e.push('duplicate options');
    if(!Number.isInteger(q?.correctIndex)||q.correctIndex<0||q.correctIndex>=q.options.length)e.push('invalid correctIndex');
    return {ok:e.length===0,errors:e};
  }

  globalThis.GHGenialesV291StatistikInterpretation=Object.freeze({genStatistikInterpretation,validate});
})();
