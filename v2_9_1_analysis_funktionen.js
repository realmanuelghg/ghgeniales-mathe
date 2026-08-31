/* GHGeniales Mathe V2.9.1 — Analysis/Funktionen development generators */
(() => {
  const r=(a,b)=>Math.floor(Math.random()*(b-a+1))+a;
  const c=a=>a[Math.floor(Math.random()*a.length)];
  const s=a=>{const x=a.slice();for(let i=x.length-1;i>0;i--){const j=r(0,i);[x[i],x[j]]=[x[j],x[i]]}return x};
  const tex=x=>`\\(${x}\\)`;
  const mc=(correct,distractors,n=4)=>{
    const seen=new Set([String(correct)]), pool=[];
    for(const d of distractors||[]){const k=String(d);if(!seen.has(k)){seen.add(k);pool.push(d)}}
    let guard=0; while(pool.length<n-1 && guard<30){const d=`Weitere Option ${pool.length+2}`;if(!seen.has(d)){seen.add(d);pool.push(d)}guard++;}
    const options=s([correct,...pool.slice(0,n-1)]);
    return {options,correctIndex:options.indexOf(correct)};
  };
  const fmt=n=>String(n).replace(/\.0+$/,'');
  const signLabel=v=>v>0?'+':'-';
  const poly=(terms)=>terms.filter(([a])=>a!==0).sort((x,y)=>y[1]-x[1]).map(([a,e],i)=>{
    const abs=Math.abs(a),coef=(abs===1&&e>0?'':String(abs)),xp=e===0?'':(e===1?'x':`x^${e}`),t=coef+xp;
    return i===0?(a<0?'-':'')+t:(a<0?' - ':' + ')+t;
  }).join('')||'0';
  const evalPoly=(terms,x)=>terms.reduce((sum,[a,e])=>sum+a*Math.pow(x,e),0);

  function genGlobalverlauf(){
    const odd=Math.random()<0.5, deg=c(odd?[3,5]:[2,4]);
    const lead=c([-4,-2,2,3,4]);
    const lower=deg>1?[[r(-4,4),deg-1]]:[];
    const f=poly([[lead,deg],...lower]);
    const correct=odd
      ?(lead>0?'links unten, rechts oben':'links oben, rechts unten')
      :(lead>0?'beide Enden oben':'beide Enden unten');
    const pool=odd
      ?(lead>0?['links oben, rechts unten','beide Enden oben','beide Enden unten']:['links unten, rechts oben','beide Enden oben','beide Enden unten'])
      :(lead>0?['beide Enden unten','links unten, rechts oben','links oben, rechts unten']:['beide Enden oben','links unten, rechts oben','links oben, rechts unten']);
    return {skill:'globalverlauf',variant:'degree_lead',difficulty:deg===5?'hard':'medium',type:'mc',prompt:'Wie verhält sich der Graph für x → ±∞?',formula:tex(`f(x)=${f}`),...mc(correct,pool,4),explain:`Für das Verhalten im Unendlichen sind Grad ${deg} und Leitkoeffizient ${lead} entscheidend.`,mistakeTags:['wrong_end_behavior']};
  }

  function genVorzeichenverlauf(){
    const a=c([-1,1]);
    const candidates=[-5,-4,-3,-2,-1,1,2,3,4,5];
    const roots=s(candidates).slice(0,3).sort((x,y)=>x-y);
    const terms=[[a,3],[-a*(roots[0]+roots[1]+roots[2]),2],[a*(roots[0]*roots[1]+roots[0]*roots[2]+roots[1]*roots[2]),1],[-a*roots[0]*roots[1]*roots[2],0]];
    const intervals=[`${roots[0]-2}, ${roots[0]}`,`${roots[0]}, ${roots[1]}`,`${roots[1]}, ${roots[2]}`,`${roots[2]}, ${roots[2]+2}`];
    const labels=intervals.map((_,i)=>{
      const x=[roots[0]-1,(roots[0]+roots[1])/2,(roots[1]+roots[2])/2,roots[2]+1][i];
      return `${intervals[i]}: ${signLabel(Math.sign(evalPoly(terms,x)))}`;
    });
    const correct=c(labels);
    return {skill:'vorzeichenverlauf',variant:'interval_sign',difficulty:'hard',type:'mc',prompt:'Welches Vorzeichen besitzt f(x) im angegebenen Intervall?',formula:tex(`f(x)=${poly(terms)}`),...mc(correct,[...labels.filter(x=>x!==correct),'Alle Intervalle positiv','Alle Intervalle negativ'],4),explain:`Die drei Nullstellen sind ${roots.join(', ')}. Da sie einfach sind, wechselt das Vorzeichen an jeder Nullstelle.`,mistakeTags:['sign_chart_error']};
  }

  function genPolynomUngleichung(){
    const a=c([-1,1]), p=r(-4,-1), q=r(1,4), op=c(['>','≥','<','≤']);
    const f=`${a<0?'-':''}(x${p<0?`+${-p}`:`-${p}`})(x${q<0?`+${-q}`:`-${q}`})`;
    const positive=op==='>'||op==='≥', inclusive=op==='≥'||op==='≤';
    let core;
    if(positive) core=a>0?`x < ${p} oder x > ${q}`:`${p} < x < ${q}`;
    else core=a>0?`${p} < x < ${q}`:`x < ${p} oder x > ${q}`;
    const correct=core+(inclusive?' (Randpunkte eingeschlossen)':' (Randpunkte ausgeschlossen)');
    const distractors=[
      a>0?`${p} < x < ${q}`:`x < ${p} oder x > ${q}`,
      `${p} < x und x < ${q}`,
      `Keine reelle Lösung`
    ];
    return {skill:'polynomUngleichung',variant:'factor_sign',difficulty:'hard',type:'mc',prompt:`Löse die Ungleichung:`,formula:tex(`${f} ${op} 0`),...mc(correct,distractors,4),explain:`Nullstellen: ${p} und ${q}. Nutze die Vorzeichentabelle; bei ≥/≤ werden Nullstellen als Randpunkte eingeschlossen.`,mistakeTags:['inequality_sign_error']};
  }

  function genWertemenge(){
    const h=r(-4,4), k=r(-5,6), a=c([-2,-1,1,2]), bounded=Math.random()<0.55;
    const f=x=>a*Math.pow(x-h,2)+k;
    if(!bounded){
      const correct=a>0?`[${k}, ∞)`:`(-∞, ${k}]`;
      const distractors=a>0?[`(-∞, ${k}]`,`[${k+2}, ∞)`,`R`]:[`[${k}, ∞)`,`(-∞, ${k-2}]`,`R`];
      return {skill:'wertemenge',variant:'unbounded_domain',difficulty:'medium',type:'mc',prompt:'Bestimme die Wertemenge von f für D=ℝ.',formula:tex(`f(x)=${a}(x-${h})^2+${k}`),...mc(correct,distractors),explain:`Der Scheitelwert ${k} ist bei D=ℝ der Extremwert der gesamten Parabel.` ,mistakeTags:['range_confused']};
    }
    const left=-4,right=5;
    const samples=[[left,f(left)],[right,f(right)]];
    if(h>=left && h<=right) samples.push([h,f(h)]);
    const ys=samples.map(x=>x[1]);
    const min=Math.min(...ys),max=Math.max(...ys);
    const correct=`[${fmt(min)}, ${fmt(max)}]`;
    const distractors=[`[${fmt(k)}, ${fmt(Math.max(f(left),f(right)))}]`,`(-∞, ${fmt(max)}]`,`[${fmt(min)}, ∞)`];
    return {skill:'wertemenge',variant:'bounded_domain',difficulty:'medium',type:'mc',prompt:`Bestimme die Wertemenge für x ∈ [${left}; ${right}].`,formula:tex(`f(x)=${a}(x-${h})^2+${k}`),...mc(correct,distractors),explain:`Bei beschränktem Definitionsbereich zählen nur tatsächlich erreichbare Werte. Deshalb werden die Randpunkte und – falls im Intervall – der Scheitel geprüft.`,mistakeTags:['range_confused']};
  }

  function genDarstellungswechsel(){
    const h=r(-3,3), k=r(-4,5), a=c([-2,-1,1,2]);
    const correct=tex(`${a===1?'':a===-1?'-':a}(x${h<0?`+${-h}`:h>0?`-${h}`:''})^2${k<0?`-${-k}`:k>0?`+${k}`:''}`);
    const distractors=[tex(`${a===1?'':a===-1?'-':a}(x${h<0?`-${-h}`:h>0?`+${h}`:''})^2${k<0?`-${-k}`:k>0?`+${k}`:''}`),tex(`${-a}(x${h<0?`+${-h}`:h>0?`-${h}`:''})^2${k<0?`-${-k}`:k>0?`+${k}`:''}`),tex(`${a===1?'':a}(x${h<0?`+${-h}`:h>0?`-${h}`:''})^2${k===0?'':k>0?`-${k}`:`+${-k}`}`)];
    return {skill:'darstellungswechsel',variant:'property_to_vertex_form',difficulty:'medium',type:'mc',prompt:`Welcher Funktionsterm gehört zu einer Parabel mit Scheitel S(${h}|${k}) und Streckfaktor ${a}?`,...mc(correct,distractors),explain:`In der Scheitelpunktform ${tex('f(x)=a(x-h)^2+k')} stehen Scheitel und Streckfaktor direkt im Term.`,mistakeTags:['vertex_sign_swap']};
  }

  function genFunktionstermAusInformationen(){
    const r1=r(-4,-1), r2=r(1,4), x0=c([-2,-1,1,2]), a=c([-3,-2,-1,1,2,3]);
    const y0=a*(x0-r1)*(x0-r2);
    const factor=(root)=>root<0?`x+${-root}`:`x-${root}`;
    const correct=tex(`${a}(${factor(r1)})(${factor(r2)})`);
    const distractors=[tex(`${-a}(${factor(r1)})(${factor(r2)})`),tex(`${a}(${factor(-r1)})(${factor(r2)})`),tex(`${a}(${factor(r1)})(${factor(-r2)})`)];
    return {skill:'funktionstermAusInformationen',variant:'roots_and_point',difficulty:'hard',type:'mc',prompt:`Der Graph besitzt die Nullstellen x=${r1} und x=${r2} und geht durch P(${x0}|${y0}). Welcher Term passt?`,...mc(correct,distractors),explain:`Aus den Nullstellen folgt ${tex('f(x)=a(x-x_1)(x-x_2)')}. Einsetzen des Punktes ergibt hier a=${a}.`,mistakeTags:['factor_sign_error']};
  }

  function genParameterEigenschaft(){
    const x0=c([-3,-2,-1,1,2,3]), b=r(-3,3), y0=r(-6,8);
    // f_a(x)=x²+bx+a through P(x0|y0) => a=y0-x0²-bx0.
    const a=y0-x0*x0-b*x0;
    const correct=String(a);
    const d=[String(a+1),String(-a),String(a-b)];
    return {skill:'parameterEigenschaft',variant:'point_condition',difficulty:'hard',type:'mc',prompt:`Für welchen Parameter a geht der Graph von ${tex(`f_a(x)=x^2+${b}x+a`)} durch den Punkt P(${x0}|${y0})?`,...mc(correct,d),explain:`Punkt einsetzen: ${tex(`${y0}=${x0}^2+${b}\\cdot${x0}+a`)}. Daher ${tex(`a=${y0}-${x0}^2-${b}\\cdot${x0}=${a}`)}.`,mistakeTags:['parameter_condition_error']};
  }

  function genSchnittBeruehrpunkt(){
    const h=r(-3,3), k=r(-3,4);
    const mode=c(['none','touch','two']);
    let f,g,correct,explain,variant;
    if(mode==='none'){
      f=`f(x)=(x-${h})^2+${k+2}`;
      g=`g(x)=(x-${h})^2+${k}`;
      correct='kein gemeinsamer Punkt';
      variant='no_intersection';
      explain='Nach Gleichsetzen entsteht 2 = 0. Das ist unmöglich, also gibt es keinen gemeinsamen Punkt.';
    } else if(mode==='touch'){
      f=`f(x)=(x-${h})^2+${k}`;
      g=`g(x)=${k}`;
      correct='ein gemeinsamer Punkt';
      variant='tangent_contact';
      explain=`Die Gerade g ist die waagrechte Tangente an f im Scheitelpunkt (${h}|${k}). Beim Gleichsetzen bleibt (x-${h})²=0, also genau eine doppelte Lösung.`;
    } else {
      f=`f(x)=x^2+${k}`;
      g=`g(x)=${k+4}`;
      correct='zwei gemeinsame Punkte';
      variant='two_intersections';
      explain='Nach Gleichsetzen entsteht x²=4 mit den zwei Lösungen x=-2 und x=2.';
    }
    return {skill:'schnittBeruehrpunkt',variant,difficulty:'hard',type:'mc',prompt:'Wie viele gemeinsame Punkte besitzen die beiden Graphen?',formula:tex(`${f}\\qquad ${g}`),...mc(correct,['kein gemeinsamer Punkt','ein gemeinsamer Punkt','zwei gemeinsame Punkte','unendlich viele gemeinsame Punkte'].filter(x=>x!==correct),4),explain,mistakeTags:['intersection_count_error']};
  }

  function genAbleitungsgraph(){
    const mode=c(['rising','falling','extremum']);
    const correct=mode==='extremum'?'Am Extrempunkt von f ist f′(x)=0.':mode==='rising'?'In einem Bereich mit f′(x)>0 steigt f.':'In einem Bereich mit f′(x)<0 fällt f.';
    const pool=['Am Extrempunkt von f ist f′(x)=0.','In einem Bereich mit f′(x)>0 steigt f.','In einem Bereich mit f′(x)<0 fällt f.','f′(x) ist unabhängig vom Steigungsverhalten von f.'];
    return {skill:'ableitungsgraph',variant:'derivative_sign',difficulty:'hard',type:'mc',prompt:'Welche Aussage über f und f′ ist korrekt?',...mc(correct,pool.filter(x=>x!==correct),4),explain:'Die Ableitung beschreibt die Tangentensteigung. Positives f′ bedeutet steigend, negatives f′ bedeutet fallend; an einem glatten Extrempunkt ist f′=0.',mistakeTags:['derivative_graph_confused']};
  }

  function genKruemmung(){
    const a=c([-3,-2,2,3]), second=2*a;
    const correct=second>0?'f′′(x)>0: nach oben gekrümmt.':'f′′(x)<0: nach unten gekrümmt.';
    const other=second>0?'f′′(x)<0: nach unten gekrümmt.':'f′′(x)>0: nach oben gekrümmt.';
    return {skill:'kruemmung',variant:'second_derivative_sign',difficulty:'medium',type:'mc',prompt:`Welche Aussage passt zu ${tex(`f(x)=${a}x^2`)}?`,formula:tex(`f''(x)=${second}`),...mc(correct,[other,'f′′(x)=0 bedeutet automatisch Wendepunkt','f′′(x) beschreibt hier nur die Nullstellen.'],4),explain:`Das Vorzeichen der zweiten Ableitung bestimmt hier das Krümmungsverhalten.`,mistakeTags:['curvature_sign_error']};
  }

  function genKurvendiskussionVerknuepft(){
    const h=r(-3,3), k=r(-2,4), a=c([-2,-1,1,2]);
    const f=`${a}(x-${h})^2+${k}`;
    const increasing=a>0;
    const correct=`Scheitel S(${h}|${k}) · ${increasing?'Minimum':'Maximum'} · ${increasing?'fallend links / steigend rechts':'steigend links / fallend rechts'}`;
    const pool=[
      `Scheitel S(${h}|${k}) · ${increasing?'Minimum':'Maximum'} · ${increasing?'fallend links / steigend rechts':'steigend links / fallend rechts'}`,
      `Scheitel S(${-h}|${k}) · ${increasing?'Maximum':'Minimum'} · überall steigend`,
      `Wendepunkt bei x=${h} · keine Monotonie`,
      `Extrempunkt bei x=0 · ${increasing?'steigend':'fallend'} überall`
    ];
    return {skill:'kurvendiskussionVerknuepft',variant:'quadratic_chain',difficulty:'hard',type:'mc',prompt:'Welche Kombination von Aussagen ist vollständig korrekt?',formula:tex(`f(x)=${f}`),...mc(correct,pool.slice(1),4),explain:`Die Scheitelpunktform liefert sofort S(${h}|${k}). Das Vorzeichen von a bestimmt Minimum/Maximum und das Monotonieverhalten. Eine Parabel besitzt hier keinen Wendepunkt.`,mistakeTags:['mixed_curve_reasoning']};
  }

  globalThis.GHGenialesV291Analysis=Object.freeze({
    genGlobalverlauf,genVorzeichenverlauf,genPolynomUngleichung,genWertemenge,genDarstellungswechsel,
    genFunktionstermAusInformationen,genParameterEigenschaft,genSchnittBeruehrpunkt,genAbleitungsgraph,
    genKruemmung,genKurvendiskussionVerknuepft
  });
})();
