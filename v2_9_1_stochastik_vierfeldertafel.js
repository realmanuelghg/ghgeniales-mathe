/* V2.9.1 development generator family: Vierfeldertafel */
(() => {
  const r=(a,b)=>Math.floor(Math.random()*(b-a+1))+a;
  const c=a=>a[Math.floor(Math.random()*a.length)];
  const s=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=r(0,i);[a[i],a[j]]=[a[j],a[i]]}return a};
  const gcd=(a,b)=>{a=Math.abs(a);b=Math.abs(b);while(b){[a,b]=[b,a%b]}return a||1};
  const pct=(n,d)=>Math.round((100*n/d)*10)/10;
  const tableHtml=t=>`A/B | B | ¬B | Σ\nA | ${t.a} | ${t.b} | ${t.rowA}\n¬A | ${t.c} | ${t.d} | ${t.rowNotA}\nΣ | ${t.a+t.c} | ${t.b+t.d} | ${t.total}`;
  const mc=(correct,distractors)=>{
    const u=[correct,...distractors].filter((v,i,a)=>a.indexOf(v)===i);
    while(u.length<4)u.push(`Weitere Option ${u.length+1}`);
    const options=s(u.slice(0,4));
    return {options,correctIndex:options.indexOf(correct)};
  };

  function makeTable(){
    const a=r(20,70), b=r(15,60), c=r(15,55), d=r(20,70);
    const total=a+b+c+d;
    return {a,b,c,d,rowA:a+b,rowNotA:c+d,total};
  }

  function genVierfeldertafel(){
    const mode=c(['read_cell','complete','union','conditional','interpret']);
    const t=makeTable();

    if(mode==='read_cell'){
      const correct=String(t.a);
      const x=mc(correct,[String(t.b),String(t.c),String(t.rowA)]);
      return {skill:'vierfeldertafel',variant:'read_cell',difficulty:'medium',type:'mc',
        prompt:'Welche absolute Häufigkeit gehört zum Schnitt A ∩ B?',table:t,...x,
        explain:`A ∩ B ist das gemeinsame Tabellenfeld. Hier beträgt die Häufigkeit ${t.a}.`,
        mistakeTags:['intersection_confused']};
    }

    if(mode==='complete'){
      // One cell is omitted. The remaining values are enough to reconstruct it.
      const missing='d';
      const shown={a:t.a,b:t.b,c:t.c,rowA:t.rowA,rowNotA:t.rowNotA,colB:t.a+t.c,colNotB:t.b+t.d,total:t.total};
      const correct=String(t.d);
      const x=mc(correct,[String(t.rowNotA),String(t.b),String(t.total-t.c)]);
      return {skill:'vierfeldertafel',variant:'complete_table',difficulty:'medium',type:'mc',
        prompt:`Ergänze das fehlende Feld ¬A ∩ ¬B. Gegeben sind A∩B=${t.a}, A∩¬B=${t.b}, ¬A∩B=${t.c}, sowie die Randhäufigkeiten ¬A=${t.rowNotA} und Gesamt=${t.total}.`,
        formula:`d = ${t.rowNotA} − ${t.c} = ?`,...x,correctValue:t.d,explain:`In der Zeile ¬A müssen die beiden Felder zusammen ${t.rowNotA} ergeben. Daher d=${t.rowNotA}-${t.c}=${t.d}.`,
        mistakeTags:['wrong_margin']};
    }

    if(mode==='union'){
      const correct=String(t.a+t.b+t.c);
      const x=mc(correct,[String(t.a+t.b),String(t.a+t.c),String(t.total-t.d)]);
      return {skill:'vierfeldertafel',variant:'union',difficulty:'medium',type:'mc',
        prompt:'Wie groß ist die absolute Häufigkeit des Ereignisses A ∪ B?',table:t,...x,
        explain:`A ∪ B umfasst alle Felder außer ¬A ∩ ¬B. Also ${t.total}-${t.d}=${t.a+t.b+t.c}.`,
        mistakeTags:['union_confused']};
    }

    if(mode==='conditional'){
      const g=gcd(t.a,t.a+t.c);
      const exact=`${t.a}/${t.a+t.c}`;
      const correct=pct(t.a,t.a+t.c).toFixed(1)+' %';
      const x=mc(correct,[pct(t.a,t.total).toFixed(1)+' %',pct(t.a,t.rowA).toFixed(1)+' %',pct(t.a,t.b+t.d).toFixed(1)+' %']);
      return {skill:'vierfeldertafel',variant:'conditional',difficulty:'hard',type:'mc',
        prompt:'Bestimme P(A|B).',table:t,formula:`P(A|B) = ${exact} = ?`,...x,
        explain:`Bei P(A|B) betrachtet man nur die Fälle mit B. Daher ${t.a}/${t.a+t.c} = ${correct}.`,
        mistakeTags:['wrong_denominator']};
    }

    const shareB=pct(t.a+t.c,t.total).toFixed(1);
    const shareABgivenB=pct(t.a,t.a+t.c).toFixed(1);
    const correct=`Unter den B-Fällen liegt der Anteil von A bei ${shareABgivenB} %.`;
    const x=mc(correct,[`Insgesamt liegt der Anteil von A bei ${pct(t.rowA,t.total).toFixed(1)} %.`,`Unter den A-Fällen liegt der Anteil von B bei ${pct(t.a,t.rowA).toFixed(1)} %.`,`Der Anteil von B beträgt insgesamt ${shareB} % und beschreibt automatisch P(A|B).`]);
    return {skill:'vierfeldertafel',variant:'interpret',difficulty:'hard',type:'mc',
      prompt:'Welche Aussage beschreibt P(A|B) in dieser Vierfeldertafel korrekt?',table:t,...x,
      explain:`P(A|B) betrachtet ausschließlich die B-Gruppe als Bezugsmenge. Der Anteil von A darin beträgt ${shareABgivenB} %.`,
      mistakeTags:['condition_swapped']};
  }

  function validateVierfeldertafel(q){
    const e=[];
    if(q?.skill!=='vierfeldertafel')e.push('wrong skill');
    if(!q?.variant)e.push('missing variant');
    if(!['mc'].includes(q?.type))e.push('expected mc');
    if(!Array.isArray(q?.options)||q.options.length!==4)e.push('expected 4 options');
    else if(new Set(q.options).size!==4)e.push('duplicate options');
    if(!Number.isInteger(q?.correctIndex)||q.correctIndex<0||q.correctIndex>=q.options.length)e.push('invalid correctIndex');
    const t=q?.table;
    if(t){
      if([t.a,t.b,t.c,t.d,t.rowA,t.rowNotA,t.total].some(v=>!Number.isFinite(v)||v<0))e.push('invalid table values');
      if(t.rowA!==t.a+t.b||t.rowNotA!==t.c+t.d||t.total!==t.rowA+t.rowNotA)e.push('inconsistent table');
    }
    return {ok:e.length===0,errors:e};
  }

  globalThis.GHGenialesV291Vierfeldertafel=Object.freeze({genVierfeldertafel,validateVierfeldertafel});
})();
