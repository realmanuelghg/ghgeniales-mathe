# V2.9.1 Analysis — Blocker-Checks vor Integration

Die Analyse-Generatoren werden erst in `index.html` integriert, wenn diese Punkte erfüllt sind.

## Festgestellte Korrekturen

1. `vorzeichenverlauf`: alle drei Nullstellen müssen garantiert verschieden sein. Danach dürfen nur offene Intervalle zwischen den drei einfachen Nullstellen abgefragt werden.
2. `polynomUngleichung`: `>`/`<` und `≥`/`≤` müssen getrennt behandelt werden; Randpunkte dürfen nur bei nicht-strikten Ungleichungen eingeschlossen werden.
3. `wertemenge`: bei beschränktem Definitionsbereich darf der Scheitelwert nur einbezogen werden, wenn die Scheitelstelle tatsächlich im Definitionsintervall liegt.
4. `parameterEigenschaft`: nur Bedingungen verwenden, die den Parameter tatsächlich bestimmen; die aktuelle Point-Condition-Variante wird als gültige Ersatzvariante verwendet.
5. `schnittBeruehrpunkt`: echter Berührfall muss genau einen gemeinsamen Punkt mit gleicher Tangentensteigung erzeugen. Identische Funktionen sind kein Berührpunkt-Szenario, sondern unendlich viele gemeinsame Punkte.
6. `kurvendiskussionVerknuepft`: keine Aussage darf einen Wendepunkt aus `f'(x)=0` ableiten; Extrempunkt/Monotonie müssen zur konkret erzeugten Funktion passen.

## Gate

Keine Integration in die produktive `index.html`, bevor der Sammeltest diese Blocker nicht mit wiederholten Läufen abdeckt.

Die isolierte Generatorstruktur bleibt bewusst erhalten, damit Fehler vor dem großen App-Diff gefunden werden.
