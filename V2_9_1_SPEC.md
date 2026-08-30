# GHGeniales Mathe – V2.9.1 Spezifikation

## Ziel

V2.9.1 entwickelt GHGeniales Mathe von einer Sammlung einzelner Aufgaben zu einem kompetenzorientierten, FOS-nahen Lernsystem.

Leitidee:

**Situation → Darstellung → Berechnung → Interpretation → Begründung**

## Architekturprinzipien

- Kompetenz (Skill), Aufgabenvariante, konkrete Aufgabe, Ergebnis, Fehlerbild und Mastery sind getrennte Ebenen.
- Ein Skill kann mehrere Aufgabengattungen und mehrere Schwierigkeitsstufen besitzen.
- Mehrschrittaufgaben speichern Teilergebnisse und Teilkompetenzen getrennt.
- Fehlerdiagnosen sind mögliche Fehlermuster und keine behaupteten psychologischen Gewissheiten.
- XP, Level, Streak und Achievements sind Motivationselemente und kein Kompetenznachweis.
- Local-first bleibt erhalten; keine Datenbank und keine KI-Abhängigkeit.

## 42 trainierbare Kompetenzknoten

### Algebra/Funktionen (15)

1. `binomExpand`
2. `binomFactor`
3. `linGleichung`
4. `quadGleichung`
5. `bruchKuerzen`
6. `lineareEigenschaften`
7. `scheitelpunkt`
8. `lineareTerm`
9. `schnittpunktGeraden`
10. `darstellungswechsel`
11. `globalverlauf`
12. `vorzeichenverlauf`
13. `polynomUngleichung`
14. `wertemenge`
15. `funktionstermAusInformationen`

### Analysis (13)

16. `ableiten`
17. `nullstellen`
18. `extrempunkte`
19. `wendepunkt`
20. `symmetrie`
21. `monotonie`
22. `differenzenquotient`
23. `tangentensteigung`
24. `parameterEigenschaft`
25. `schnittBeruehrpunkt`
26. `ableitungsgraph`
27. `kruemmung`
28. `kurvendiskussionVerknuepft`

### Stochastik (14)

29. `kombinatorik`
30. `pfadregel`
31. `bedingteWk`
32. `zufallsexperiment`
33. `laplace`
34. `unabhaengigkeit`
35. `kombiTyp`
36. `ergebnisraum`
37. `ereignisse`
38. `vierfeldertafel`
39. `bedingteWkVerstehen`
40. `pfadKompetenzcheck`
41. `stochKompetenzcheck`
42. `statistikInterpretation`

## Varianten statt Generator-Sprawl

Mehrere Aufgabenvarianten gehören zu einem Skill, statt für jede Variante einen eigenen Skill anzulegen.

Beispiele:

- `unabhaengigkeit`: Produktregel, bedingte Wahrscheinlichkeit, Vierfeldertafel, Baum, Sachkontext.
- `kombinatorik`: Permutation, Variation, Kombination, allgemeines Zählprinzip und passende Wiederholungsvarianten.
- `extrempunkte`: Kandidat, Art, Koordinaten, Begründung über Vorzeichenwechsel bzw. zweite Ableitung.
- `darstellungswechsel`: Term ↔ Graph ↔ Tabelle ↔ Beschreibung.

## Fehler-Tags

Stochastik-Beispiele:

- `condition_swapped`
- `wrong_denominator`
- `intersection_confused`
- `union_confused`
- `complement_confused`
- `path_mult_add`
- `total_probability_confused`
- `independence_wrong_rule`
- `laplace_assumed`
- `absolute_relative_confused`
- `sample_bias`
- `correlation_as_causation`
- `order_ignored`
- `replacement_misread`

Analysis-/Algebra-Beispiele werden analog stabil benannt.

## Mastery

Sichtbare Stufen:

- Noch nicht geübt
- Üben
- Festigen
- Stabilisieren
- Sicher

Mastery soll nicht mehr nur aus Gesamtquote und Versuchszahl bestehen. Berücksichtigt werden:

- historische Leistung
- aktuelle Leistung
- Aktualität
- Difficulty-Coverage
- Varianten-Coverage
- aktive Fehlermuster
- Wiederholungsfälligkeit

Einzelne Fehler setzen Mastery nicht komplett zurück; aktuelle Einbrüche dürfen aber nicht durch alte gute Werte verdeckt werden.

## Wiederholung / Empfehlung

Priorität:

1. fällige Wiederholung
2. aktueller Leistungsabfall / aktuelle Schwäche
3. aktives Fehlermuster
4. fehlende Kompetenz-/Variantenabdeckung
5. Exploration ungetesteter Themen

## Mehrschrittaufgaben

Mehrschrittaufgaben besitzen:

- übergeordneten Skill
- geordnete Schritte
- Teilkompetenzen
- Teilpunkte
- getrennte Ergebnisse
- optionale Fehlermuster je Schritt

Eine Gesamtaufgabe darf die Kompetenz eines einzelnen Teilschrittes nicht überschreiben.

## FOS-Kurzprüfung

- 6 bewusst zusammengestellte Aufgabenblöcke
- 30 Punkte
- 25 Minuten
- Analysis + Stochastik
- echte Mehrschrittstruktur
- Teilpunkte
- Nachbesprechung

Nicht als vollständige Fachabiturprüfung bezeichnen.

## Backup / Migration

- `schemaVersion: 2`
- V2.8-Daten erhalten
- App-Version und Datenschema getrennt behandeln
- fehlende historische Detaildaten nicht erfinden

## PWA

Service-Worker-Version:

`ghgeniales-mathe-v2-9-1`

Navigation: network-first mit Offline-Fallback auf `./index.html`.

Andere GET-Requests: cache-first.

## Qualitätsregeln

Ein neuer Generator wird nur akzeptiert, wenn:

1. die Aufgabe die vorgesehene Kompetenz wirklich misst,
2. sie nicht trivial durch Raten lösbar ist,
3. typische Fehler sinnvoll diagnostizierbar sind,
4. eine Folgeaufgabe nach einem Fehler pädagogisch sinnvoll ist,
5. ungültige Zufallskonstellationen ausgeschlossen sind,
6. mathematische Lösung und Erklärung konsistent sind.

## V2.9.1 Auditbefunde – Algebra/Funktionen aus V2.8

Die bestehenden V2.8-Generatoren sind grundsätzlich brauchbar, aber für den V2.9-Ausbau sind folgende Punkte verbindlich:

### `genBinomExpand`
- Mathematische Grundfälle sind korrekt aufgebaut.
- Antwortmöglichkeiten werden über `buildMC` gegen Duplikate abgesichert.
- V2.9 soll die Varianten nicht unnötig vergrößern; die bestehende Generatorfamilie bleibt Basis.

### `genBinomFactor`
- Grundidee korrekt.
- Für die V2.9-Qualität reicht „rückwärts binomische Formel erkennen“ allein nicht als breites Faktorisierungstraining.
- Spätere Varianten sollten echtes Faktorisieren und unterschiedliche Strukturen abdecken.

### `genLinGleichung`
- Konstruktion garantiert eine eindeutige Lösung, da die x-Koeffizienten bewusst verschieden gewählt werden.
- Mathematische Lösung ist konsistent.
- Didaktisch noch stark prozedural; V2.9 soll nicht nur mehr Gleichungen erzeugen, sondern gezielte Varianten/Fehlerbilder ermöglichen.

### `genQuadGleichung`
- Rechnerisch konsistent für die erzeugten Fälle.
- Aktuell werden ausschließlich quadratische Gleichungen mit zwei verschiedenen ganzzahligen reellen Lösungen erzeugt.
- Dadurch fehlen wichtige Randfälle: doppelte Nullstelle, keine reelle Lösung und bewusst gemischte Aufgabentypen.
- V2.9 soll den Generator nicht nur vervielfachen, sondern die Fallunterscheidung fachlich erweitern.

### `genBruchKuerzen`
- Enthält bereits einen fachlich guten Hinweis auf die ursprüngliche Definitionsausschlussbedingung `x ≠ a`.
- Die Distraktoren sind jedoch relativ leicht zu entlarven; die Aufgabe misst damit eher Erkennen der dritten binomischen Formel als robustes Bruchtermverständnis.
- V2.9 soll mindestens alternative Strukturen und echte Definitions-/Kürzungsentscheidungen ergänzen.

### `genLineareEigenschaften`
- Grundsätzlich korrekt.
- Randfall `x0 = 0` kann einen identischen Distraktor erzeugen; `buildMC` verhindert die finale Dublette, aber das zeigt, dass Distraktorlogik noch robuster gestaltet werden sollte.
- Für V2.9 keine große Architekturänderung nötig, aber Variantencoverage erhöhen.

### `genScheitelpunkt`
- Mathematisch korrekt.
- Bei bestimmten Randwerten können Distraktoren mit der richtigen Antwort kollidieren; `buildMC` fängt dies ab.
- Didaktisch sollte später auch die Verbindung Scheitelpunkt ↔ Öffnungsrichtung ↔ Wertemenge trainiert werden.

### `genLinearTermAufstellen`
- Konstruktion mit zwei Punkten ist mathematisch konsistent.
- Die Aufgabe bleibt Multiple Choice und prüft dadurch vor allem Auswahl statt eigenständiges Aufstellen.
- V2.9 soll mindestens einen echten numerischen Eingabepfad als Variante ergänzen.

### `genSchnittpunktGeraden`
- Mathematisch konsistente Konstruktion.
- Einzelne Distraktoren können bei Randwerten degenerieren; `buildMC` füllt nötigenfalls Ersatzoptionen.
- V2.9 soll Schnittpunktkompetenz stärker mit Gleichsetzen, Interpretation und später Berührbedingungen verbinden.

## Konsequenz für die Implementierung

V2.9 soll die bestehenden Algebra-Generatoren nicht einfach durch viele weitere ähnliche Items aufblasen.

Stattdessen:

- bestehende Generatoren als belastbare Basis erhalten,
- typische Randfälle bewusst ergänzen,
- MC und numerische Aufgaben besser mischen,
- Darstellungswechsel einführen,
- Fehlermuster explizit annotieren,
- Kompetenzvarianten statt Generator-Sprawl verwenden.
