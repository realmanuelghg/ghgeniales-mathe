/* GHGeniales Mathe V2.9.1 — Analysis/Funktionen development generators */
(() => {
  const r=(a,b)=>Math.floor(Math.random()*(b-a+1))+a;
  const c=a=>a[Math.floor(Math.random()*a.length)];
  const s=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=r(0,i);[a[i],a[j]]=[a[j],a[i]]}return a};
  const mc=(correct,distractors,n=4)=>{
    const pool=[];const seen=new Set([String(correct)]);
    for(const d of distractors||[]){const k=String(d);if(!seen.has(k)){seen.add(k);pool.push(d)}}
    while(pool.length<n-1)pool.push(`Weitere Option ${pool.length+1}`);
    const options=s([correct,...pool.slice(0,n-1)]);
    return {options,correctIndex:options.indexOf(correct)};
  };
  const poly=(terms)=>terms.filter(([a])=>a!==0).sort((x,y)=>y[1]-x[1]).map(([a,e],i)=>{
    const abs=Math.abs(a),lead=(abs===1&&e>0?'':String(abs)),x=e===0?'':(e===1?'x':`x^${e}`),t=lead+x;
    return i===0?(a<0?'-':'')+t:(a<0?' - ':' + ')+t;
  }).join('')||'0';
  const tex=(x)=>`\\(${x}\\)`;
  const coeffEval=(terms,x)=>terms.reduce((sum,[a,e])=>sum+a*Math.pow(x,e),0);

  function genGlobalverlauf(){
    const odd=Math.random()<0.5,deg=odd?c([1,3,5]):c([2,4,6]);
    const lead=c([-4,-2,2,3,4]);
    const f=poly([[lead,deg],[r(-4,4),Math.max(0,deg-1)]]);
    const correct=odd?(lead>0?'links unten, rechts oben':'links oben, rechts unten'):(lead>0?'beide Enden oben':'beide Enden unten');
    const wrong=odd?[lead>0?'links oben, rechts unten':'links unten, rechts oben','beide Enden oben','beide Enden unten']:[lead>0?'links unten, rechts oben':'links oben, rechts unten','beide Enden unten','beide Enden oben'];
    const x=mc(correct,wrong,3);
    return {skill:'globalverlauf',variant:'degree_lead',difficulty:deg>=5?'hard':'medium',type:'mc',prompt:'Wie verhält sich der Graph für x → ±∞?',formula:tex(`f(x)=${f}`),...x,explain:`Entscheidend sind Grad ${deg} und Leitkoeffizient ${lead}. Bei ${odd?'ungeradem':'geradem'} Grad ergibt sich der angegebene Globalverlauf.`,mistakeTags:['wrong_end_behavior']};
  }

  function genVorzeichenverlauf(){
    const a=c([-1,1]); const r1=r(-4,0),r2=r(1,4),r3=c([r(-4,0),r(1,4)]);
    const roots=[r1,r2,r3].sort((x,y)=>x-y);
    const terms=[[a,3],[-a*(roots[0]+roots[1]+roots[2]),2],[a*(roots[0]*roots[1]+roots[0]*roots[2]+roots[1]*roots[2]),1],[-a*roots[0]*roots[1]*roots[2],0]];
    const f=poly(terms);
    const test=(lo,hi)=>{const x=(lo+hi)/2;return Math.sign(coeffEval(terms,x));};
    const intervals=[`${-Infinity}, ${roots[0]}`,`${roots[0]}, ${roots[1]}`,`${roots[1]}, ${roots[2]}`,`${roots[2]}, ${Infinity}`];
    const sig=[test(roots[0]-2,roots[0]),test(roots[0],roots[1]),test(roots[1],roots[2]),test(roots[2],roots[2]+2)];
    const labels=sig.map(v=>v>0?'+':'-');
    const wanted=c(labels.map((v,i)=>`${intervals[i]}: ${v}`));
    const distractors=[`Alle Intervalle positiv`,`Alle Intervalle negativ`,`Nur bei den Nullstellen ist f(x)>0`];
    const x=mc(wanted,distractors,4);
    return {skill:'vorzeichenverlauf',variant:'interval_sign',difficulty:'hard',type:'mc',prompt:'Welches Vorzeichen besitzt f(x) im angegebenen Intervall?',formula:tex(`f(x)=${f}`),...x,explain:`Die Nullstellen sind ${roots.join(', ')}. Zwischen ihnen wechselt das Vorzeichen an jeder einfachen Nullstelle.`,mistakeTags:['sign_chart_error']};
  }

  function genPolynomUngleichung(){
    const a=c([-1,1]); const p=r(-4,0),q=r(1,4); const op=c(['>','≥','<','≤']);
    const f=`${a===-1?'-':''}(x${p<0?`+${-p}`:`-${p}`})(x${q<0?`+${-q}`:`-${q}`})`;
    const sign=a>0?['+','-','+']:['-','+','-'];
    const positive=op.includes('>');
    let solution;
    if(positive){solution=a>0?`x < ${p} oder x > ${q}`:`${p} < x < ${q}`} else {solution=a>0?`${p} < x < ${q}`:`x < ${p} oder x > ${q}`}
    const correct=solution + (op.includes('=')?' (Randpunkte eingeschlossen)':'');
    const x=mc(correct,[`x < ${p} und x > ${q}`,`${p} < x und x < ${q} immer`, 'Keine reelle Lösung']);
    return {skill:'polynomUngleichung',variant:'factor_sign',difficulty:'hard',type:'mc',prompt:`Löse die Ungleichung ${op}:`,formula:tex(`${f} ${op} 0`),...x,explain:`Nutze Nullstellen ${p} und ${q} und eine Vorzeichentabelle. Das Vorzeichen außerhalb bzw. zwischen den Nullstellen hängt vom Leitkoeffizienten ab.`,mistakeTags:['inequality_sign_error']};
  }

  function genWertemenge(){
    const h=r(-4,4),k=r(-5,6),a=c([-2,-1,1,2]);
    const bounded=Math.random()<0.55; let domain=[-4,5];
    let min,max;
    if(bounded){const vals=[a*Math.pow(domain[0]-h,2)+k,a*Math.pow(domain[1]-h,2)+k,k];min=Math.min(...vals);max=Math.max(...vals);}
    const correct=bounded?`[${Math.min(min,max)}, ${Math.max(min,max)}]`:(a>0?`[${k}, ∞)`:`(-∞, ${k}]`);
    const distractors=bounded?[`[${k}, ∞)`,`(-∞, ${k}]`,`[${k}, ${Math.max(min,max)+Math.abs(k)+2}]`]:[a>0?`(-∞, ${k}]`:`[${k}, ∞)`,`[${k-2}, ∞)`,`R`];
    const x=mc(correct,distractors,4);
    return {skill:'wertemenge',variant:bounded?'bounded_domain':'parabola_range',difficulty:'medium',type:'mc',prompt:bounded?`Bestimme die Wertemenge für x ∈ [${domain[0]},${domain[1]}].`:'Bestimme die Wertemenge.',formula:tex(`f(x)=${a===-1?'-':a===1?'':a}(x${h<0?`+${-h}`:h>0?`-${h}`:''})^2${k<0?`-${-k}`:k>0?`+${k}`:''}`),...x,explain:bounded?'Bei einer beschränkten Definitionsmenge müssen Randpunkte und ggf. der Scheitel berücksichtigt werden.':'Bei einer nach oben geöffneten Parabel liegt das Minimum im Scheitel, bei einer nach unten geöffneten das Maximum.' ,mistakeTags:['range_confused']};
  }

  function genDarstellungswechsel(){
    const h=r(-3,3),k=r(-4,5),a=c([-2,-1,1,2]);
    const correct=tex(`${a===1?'':a===-1?'-':a}(x${h<0?`+${-h}`:h>0?`-${h}`:''})^2${k<0?`-${-k}`:k>0?`+${k}`:''}`);
    const distractors=[tex(`${a===1?'':a}(x${h<0?`-${-h}`:h>0?`+${h}`:''})^2${k<0?`-${-k}`:k>0?`+${k}`:''}`),tex(`${a===1?'':a}(x${h<0?`+${-h}`:h>0?`-${h}`:''})^2${k===0?'':k>0?`-${k}`:`+${-k}`}`),tex(`${-a}(x${h<0?`+${-h}`:h>0?`-${h}`:''})^2${k===0?'':k>0?`+${k}`:`-${-k}`}`)];
    const x=mc(correct,distractors,4);
    return {skill:'darstellungswechsel',variant:'property_to_vertex_form',difficulty:'medium',type:'mc',prompt:`Welcher Funktionsterm gehört zu einer Parabel mit Scheitel S(${h}|${k}) und Streckfaktor ${a}?`,...x,explain:`In Scheitelpunktform ${tex('f(x)=a(x-h)^2+k')} stehen h und k direkt für den Scheitelpunkt.`,mistakeTags:['vertex_sign_swap']};
  }

  function genFunktionstermAusInformationen(){
    const r1=r(-4,0),r2=r(1,4),x0=r(-2,2); const base=(x)=>(x-r1)*(x-r2); let y=base(x0); while(y===0){x0=r(-2,2);y=base(x0)} const a=c([-3,-2,-1,1,2,3]); const y0=a*y; const correct=tex(`${a}(x${r1<0?`+${-r1}`:`-${r1}`})(x${r2<0?`+${-r2}`:`-${r2}`})`); const distractors=[tex(`${-a}(x${r1<0?`+${-r1}`:`-${r1}`})(x${r2<0?`+${-r2}`:`-${r2}`})`),tex(`${a}(x${r1>0?`+${r1}`:`-${r1}`})(x${r2>0?`+${r2}`:`-${r2}`})`),tex(`${a}(x${r1<0?`-${-r1}`:`+${r1}`})(x${r2<0?`-${-r2}`:`+${r2}`})`)]; const x=mc(correct,distractors,4); return {skill:'funktionstermAusInformationen',variant:'roots_and_point',difficulty:'hard',type:'mc',prompt:`Der Graph besitzt die Nullstellen x=${r1} und x=${r2} und geht durch P(${x0}|${y0}). Welcher Term passt?`,...x,explain:`Mit den Nullstellen lautet die faktorisierten Form ${tex('f(x)=a(x-x_1)(x-x_2)')}. Einsetzen von P bestimmt a=${a}.`,mistakeTags:['factor_sign_error']};
  }

  function genParameterEigenschaft(){
    const x0=r(-3,3),b=r(-3,3); const m=c([-4,-2,2,4]); const a=(m-b)/(2*x0||2); const aa=Number.isFinite(a)&&a!==0?a:c([-3,-2,1,2,3]); const f=tex(`f_a(x)=x^2+${b}x+a`); const correct=String(b===m?aa:aa); const x=mc(correct,[String(aa+1),String(-aa),String(aa+2)]); return {skill:'parameterEigenschaft',variant:'tangent_slope',difficulty:'hard',type:'mc',prompt:`Für welchen Parameter a besitzt der Graph ${tex(`f_a(x)=x^2+${b}x+a`)} an einer gewählten Stelle die vorgegebene Bedingung? (vereinfachte Parameterprüfung)`,formula:tex(`f'_a(x)=2x+${b}`),...x,explain:`Die Ableitung eines Terms x^2+bx+a ist 2x+b; der additive Parameter a beeinflusst die Steigung nicht. In dieser Variante dient die Aufgabe als Verständnischeck: a wird durch die Punkthöhenbedingung festgelegt.`,mistakeTags:['parameter_role_confused']};
  }

  function genSchnittBeruehrpunkt(){
    const h=r(-3,3),k=r(-3,4); const a=c([-2,-1,1,2]); const g=tex(`g(x)=${a}(x-${h})^2+${k}`); const f=tex(`f(x)=${a}(x-${h})^2+${k+2}`); const correct='Kein gemeinsamer Punkt'; const x=mc(correct,['Ein Schnittpunkt','Zwei Schnittpunkte','Unendlich viele Schnittpunkte']); return {skill:'schnittBeruehrpunkt',variant:'intersection_vs_touch',difficulty:'hard',type:'mc',prompt:'Wie viele gemeinsame Punkte besitzen die beiden Graphen?',formula:tex(`${f}\\qquad ${g}`),...x,explain:`Die Graphen haben gleiche Form und gleiche Steigung, sind aber vertikal um 2 verschoben. Daher gibt es keinen gemeinsamen Punkt.`,mistakeTags:['intersection_count_error']};
  }

  function genAbleitungsgraph(){
    const typ=c(['fallend','steigend','extremum']);
    const options=['Der passende f\'‑Graph ist positiv genau dort, wo f steigt.','f\' hat seine Nullstelle beim Extrempunkt von f.','f\' ist überall positiv unabhängig von f.'];
    const correct=typ==='extremum'?options[1]:options[0]; const x=mc(correct,options.filter(v=>v!==correct),3);
    return {skill:'ableitungsgraph',variant:'graph_interpretation',difficulty:'hard',type:'mc',prompt:`Welche Aussage beschreibt den Zusammenhang zwischen f und f' am besten, wenn f ${typ==='extremum'?'einen Extrempunkt besitzt':'in einem Bereich steigt'}?`,...x,explain:typ==='extremum'?'Am lokalen Extrempunkt ist die Tangentensteigung null, daher liegt dort typischerweise eine Nullstelle von f\'.':'Positive Werte von f\' entsprechen positiven Tangentensteigungen, also steigendem f.',mistakeTags:['derivative_graph_confused']};
  }

  function genKruemmung(){
    const a=c([-3,-2,2,3]), x0=r(-3,3); const second=2*a; const correct=second>0?'f ist dort nach oben gekrümmt (f''>0).':'f ist dort nach unten gekrümmt (f''<0).'; const x=mc(correct,[second>0?'f ist dort nach unten gekrümmt (f''<0).':'f ist dort nach oben gekrümmt (f''>0).','f''=0 bedeutet automatisch Wendepunkt']); return {skill:'kruemmung',variant:'second_derivative_sign',difficulty:'medium',type:'mc',prompt:`Welche Aussage zur Krümmung passt bei ${tex(`f(x)=${a}x^2`)}?`,formula:tex(`f''(x)=${second}`),...x,explain:`Das Vorzeichen von f'' entscheidet über das Krümmungsverhalten. Hier ist f''=${second}.`,mistakeTags:['curvature_sign_error']};
  }

  function genKurvendiskussionVerknuepft(){
    const h=r(-3,3),k=r(-2,4); const a=1; const f=tex(`f(x)=(x-${h})^2+${k}`); const steps=[`Nullstelle(n) bestimmen`,`Scheitelpunkt S(${h}|${k})`,`Monotonie: fallend für x<${h}, steigend für x>${h}`]; return {skill:'kurvendiskussionVerknuepft',variant:'quadratic_chain',difficulty:'hard',type:'mc',prompt:'Welche Kombination von Aussagen zur Funktion ist vollständig korrekt?',formula:f,...mc(steps.join(' · '),['Nullstelle aus dem Scheitelpunkt ablesen, Monotonie überall steigend.','Extrempunkt bei x=0 und keine Monotonieaussage möglich.','Wendepunkt bei x='+h+', weil f\'(x)=0.']),explain:`Eine zusammenhängende Untersuchung verbindet Scheitelpunkt, Nullstellen und Monotonie. Bei einer Parabel gibt es keinen Wendepunkt.`,mistakeTags:['mixed_curve_reasoning']};
  }

  globalThis.GHGenialesV291Analysis=Object.freeze({
    genGlobalverlauf,genVorzeichenverlauf,genPolynomUngleichung,genWertemenge,genDarstellungswechsel,
    genFunktionstermAusInformationen,genParameterEigenschaft,genSchnittBeruehrpunkt,genAbleitungsgraph,
    genKruemmung,genKurvendiskussionVerknuepft
  });
})();
