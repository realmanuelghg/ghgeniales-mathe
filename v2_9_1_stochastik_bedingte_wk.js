/* V2.9.1 development generator family: Bedingte Wahrscheinlichkeit verstehen */
(() => {
  const r=(a,b)=>Math.floor(Math.random()*(b-a+1))+a;
  const c=a=>a[Math.floor(Math.random()*a.length)];
  const s=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=r(0,i);[a[i],a[j]]=[a[j],a[i]]}return a};
  const pct=(n,d)=>Math.round((100*n/d)*10)/10;
  const mc=(correct,distractors)=>{
    const u=[correct,...distractors].filter((v,i,a)=>a.indexOf(v)===i);
    let g=0; while(u.length<4 && g<12){u.push(`Weitere Option ${u.length+1}`);g++;}
    const options=s(u.slice(0,4));
    return {options,correctIndex:options.indexOf(correct)};
  };
  const makeTable=()=>{
    const a=r(20,60), b=r(10,45), c=r(10,45), d=r(20,60);
    return {a,b,c,d,rowA:a+b,rowNotA:c+d,colB:a+c,colNotB:b+d,total:a+b+c+d};
  };

  function genBedingteWkVerstehen(){
    const t=makeTable();
    const mode=c(['formula_meaning','swap_conditions','table_meaning','context_meaning']);

    if(mode==='formula_meaning'){
      const value=pct(t.a,t.a+t.c).toFixed(1);
      const correct=`Unter den B-Fällen beträgt der Anteil von A ${value} %.`;
      const x=mc(correct,[
        `Unter den A-Fällen beträgt der Anteil von B ${pct(t.a,t.rowA).toFixed(1)} %.`,
        `In der Gesamtgruppe beträgt der Anteil von A ${pct(t.rowA,t.total).toFixed(1)} %.`,
        `P(A|B) bedeutet den Anteil von B unter den A-Fällen.`
      ]);
      return {skill:'bedingteWkVerstehen',variant:'formula_meaning',difficulty:'medium',type:'mc',
        prompt:'Was bedeutet die bedingte Wahrscheinlichkeit P(A|B) inhaltlich?',formula:'P(A|B)',table:t,...x,
        mistakeTags:['condition_swapped'],
        explain:`Bei P(A|B) wird nur die Teilmenge B betrachtet. Darin liegt der Anteil von A bei ${value} %.`};
    }

    if(mode==='swap_conditions'){
      const ab=pct(t.a,t.a+t.c).toFixed(1);
      const ba=pct(t.a,t.rowA).toFixed(1);
      const correct=`P(A|B) = ${ab} %`;
      const x=mc(correct,[`P(B|A) = ${ba} %`,`P(A) = ${pct(t.rowA,t.total).toFixed(1)} %`,`P(A∩B) = ${pct(t.a,t.total).toFixed(1)} %`]);
      return {skill:'bedingteWkVerstehen',variant:'condition_swap',difficulty:'medium',type:'mc',
        prompt:'Welche Aussage ist für diese Daten korrekt?',table:t,...x,
        mistakeTags:['condition_swapped'],
        explain:`P(A|B) verwendet B als Bezugsmenge: ${t.a}/${t.a+t.c} = ${ab} %. P(B|A) wäre dagegen ${ba} %.`};
    }

    if(mode==='table_meaning'){
      const correct=`P(A|B) = ${t.a}/${t.a+t.c}`;
      const x=mc(correct,[`P(A|B) = ${t.a}/${t.rowA}`,`P(A|B) = ${t.a}/${t.total}`,`P(A|B) = ${t.a+t.b}/${t.total}`]);
      return {skill:'bedingteWkVerstehen',variant:'table_denominator',difficulty:'hard',type:'mc',
        prompt:'Welche Darstellung berechnet P(A|B) korrekt?',table:t,...x,
        mistakeTags:['wrong_denominator'],
        explain:`Bei P(A|B) ist B die Bedingung. Deshalb ist P(B)=(${t.a}+${t.c})/${t.total} der passende Nenner.`};
    }

    const share=pct(t.a,t.a+t.c).toFixed(1);
    const correct=`Von den Personen mit B haben ${share} % auch A.`;
    const x=mc(correct,[
      `Von den Personen mit A haben ${pct(t.a,t.rowA).toFixed(1)} % auch B.`,
      `Insgesamt haben ${pct(t.rowA,t.total).toFixed(1)} % A.`,
      `Insgesamt haben ${pct(t.a+t.c,t.total).toFixed(1)} % B; das ist automatisch P(A|B).`
    ]);
    return {skill:'bedingteWkVerstehen',variant:'context_interpretation',difficulty:'hard',type:'mc',table:t,
      prompt:'Welche Formulierung beschreibt P(A|B) korrekt?',...x,
      mistakeTags:['condition_swapped'],
      explain:`Die Bedingung B legt die Bezugsgruppe fest. In dieser Gruppe wird anschließend der Anteil von A bestimmt: ${share} %.`};
  }

  function validateBedingteWkVerstehen(q){
    const e=[];
    if(q?.skill!=='bedingteWkVerstehen')e.push('wrong skill');
    if(!q?.variant)e.push('missing variant');
    if(q?.type!=='mc')e.push('expected mc');
    if(!Array.isArray(q?.options)||q.options.length!==4)e.push('expected 4 options');
    else if(new Set(q.options).size!==4)e.push('duplicate options');
    if(!Number.isInteger(q?.correctIndex)||q.correctIndex<0||q.correctIndex>=4)e.push('invalid correctIndex');
    const t=q?.table;
    if(t && (t.a+t.c<=0 || t.rowA<=0 || t.total<=0))e.push('degenerate table');
    return {ok:e.length===0,errors:e};
  }

  globalThis.GHGenialesV291BedingteWk=Object.freeze({genBedingteWkVerstehen,validateBedingteWkVerstehen});
})();
