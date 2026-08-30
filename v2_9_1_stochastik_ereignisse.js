/* V2.9.1 development generator family: Ereignisse */
(() => {
  const r=(a,b)=>Math.floor(Math.random()*(b-a+1))+a;
  const c=a=>a[Math.floor(Math.random()*a.length)];
  const s=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=r(0,i);[a[i],a[j]]=[a[j],a[i]]}return a};
  const mc=(correct,distractors)=>{
    const unique=[correct,...distractors].filter((v,i,a)=>a.indexOf(v)===i);
    while(unique.length<4) unique.push(`Weitere Aussage ${unique.length+1}`);
    const options=s(unique.slice(0,4));
    return {options,correctIndex:options.indexOf(correct)};
  };

  function genEreignisse(){
    const mode=c(['intersection','union','complement','text_to_symbol','venn']);
    if(mode==='intersection'){
      const correct='A ∩ B: A und B treten beide ein.';
      const x=mc(correct,[
        'A ∪ B: A oder B tritt ein.',
        'Ā: A tritt nicht ein.',
        'A \ B: A tritt ein, B aber nicht.'
      ]);
      return {skill:'ereignisse',variant:'intersection',difficulty:'easy',type:'mc',
        prompt:'Welche Bedeutung hat A ∩ B?',...x,explain:'Der Schnitt A ∩ B enthält genau die Ergebnisse, in denen sowohl A als auch B eintreten.',
        mistakeTags:['intersection_confused']};
    }
    if(mode==='union'){
      const correct='A ∪ B: A oder B (oder beide) treten ein.';
      const x=mc(correct,[
        'A ∩ B: A und B treten beide ein.',
        'Ā: A tritt nicht ein.',
        'A \ B: A tritt ein, B aber nicht.'
      ]);
      return {skill:'ereignisse',variant:'union',difficulty:'easy',type:'mc',
        prompt:'Welche Bedeutung hat A ∪ B?',...x,explain:'Die Vereinigung A ∪ B enthält alle Ergebnisse, bei denen A oder B oder beide eintreten.',
        mistakeTags:['union_confused']};
    }
    if(mode==='complement'){
      const correct='A tritt nicht ein.';
      const x=mc(correct,['A und B treten beide ein.','A oder B tritt ein.','A tritt ein, B aber nicht.']);
      return {skill:'ereignisse',variant:'complement',difficulty:'easy',type:'mc',
        prompt:'Ein Ereignis A beschreibt „Eine zufällig ausgewählte Person hat Merkmal A“. Was beschreibt das Gegenereignis Ā?',...x,
        explain:'Das Gegenereignis enthält genau die Ergebnisse, in denen A nicht eintritt.',mistakeTags:['complement_confused']};
    }
    if(mode==='text_to_symbol'){
      const correct='A ∩ B';
      const x=mc(correct,['A ∪ B','Ā','A \ B']);
      return {skill:'ereignisse',variant:'text_to_symbol',difficulty:'medium',type:'mc',
        prompt:'Welche Schreibweise passt zu: „A und B treten gleichzeitig ein“?',...x,
        explain:'„Und“ entspricht dem Schnitt: A ∩ B.',mistakeTags:['intersection_confused']};
    }
    const correct='Der markierte Bereich innerhalb beider Kreise: A ∩ B.';
    const x=mc(correct,['Die gesamte Fläche beider Kreise: A ∪ B.','Alles außerhalb von A: Ā.','Nur A ohne Überschneidung mit B: A \ B.']);
    return {skill:'ereignisse',variant:'venn',difficulty:'medium',type:'mc',
      prompt:'In einem Venn-Diagramm ist ausschließlich die Überlappung der Kreise A und B markiert. Welches Ereignis ist dargestellt?',...x,
      explain:'Die Überlappung beider Mengen entspricht dem Schnitt A ∩ B.',mistakeTags:['intersection_confused']};
  }

  function validateEreignisse(q){
    const e=[];
    if(q?.skill!=='ereignisse')e.push('wrong skill');
    if(q?.type!=='mc')e.push('expected mc');
    if(!q?.variant)e.push('missing variant');
    if(!q?.prompt)e.push('missing prompt');
    if(!Array.isArray(q?.options)||q.options.length!==4)e.push('expected 4 options');
    else if(new Set(q.options).size!==4)e.push('duplicate options');
    if(!Number.isInteger(q?.correctIndex)||q.correctIndex<0||q.correctIndex>=q.options.length)e.push('invalid correctIndex');
    if(!q?.explain)e.push('missing explain');
    return {ok:e.length===0,errors:e};
  }

  globalThis.GHGenialesV291Ereignisse=Object.freeze({genEreignisse,validateEreignisse});
})();
