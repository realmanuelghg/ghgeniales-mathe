# GHGeniales Mathe V2.9.1 — index.html Integrationsplan

## Ziel
Die drei neuen Stochastik-Generatoren `ergebnisraum`, `ereignisse` und `vierfeldertafel` werden in die bestehende V2.8-App integriert, ohne die bestehende Aufgaben-, Fortschritts-, Fehler- oder Prüfungslogik zu umgehen.

## Warum kein Vollersatz der 142-KB-index.html
Die GitHub-Contents-Schnittstelle erlaubt hier den sicheren Austausch einer ganzen Datei, aber keinen kleinen Inline-Patch. Ein Vollersatz auf Basis eines unvollständigen oder veralteten Ausschnitts birgt unnötiges Regressionsrisiko. Die Integration soll deshalb in einer Umgebung mit echtem Git-Patch erfolgen (z. B. Codex/Checkout).

## Exakte Integrationspunkte

### 1. Generatorfunktionen
Die drei vorhandenen Entwicklungsdateien liefern reine Generatoren:
- `v2_9_1_stochastik_ergebnisraum.js`
- `v2_9_1_stochastik_ereignisse.js`
- `v2_9_1_stochastik_vierfeldertafel.js`

Bei der Übernahme in `index.html` sollen die Funktionen nicht als separate Browser-Dateien nachgeladen werden. Sie sollen in den bestehenden Generatorbereich integriert oder über eine bewusst unterstützte Modulstruktur geladen werden.

### 2. TOPICS
Unter `stochastik.subtypes` ergänzen:
- `ergebnisraum`
- `ereignisse`
- `vierfeldertafel`

Jeder Eintrag benötigt mindestens `id`, `name`, `gen` und danach eine gültige Difficulty-Zuordnung.

### 3. Difficulty
Die drei neuen Skills bekommen zunächst explizite Einträge in `DIFFICULTY_BY_ID`. Difficulty darf nicht implizit auf `medium` fallen, wenn der Skill Teil des produktiven Lernplans ist.

### 4. Registry
`v2_9_1_registry.js` bleibt kanonische Beschreibungsebene. Die Produktions-App soll nur Skills als trainierbar darstellen, die tatsächlich einen gültigen Generator besitzen.

### 5. Rendering
Bestehende `renderQuestion()`-Unterstützung für `mc`, `numeric`, `tree` und `table` wiederverwenden. Keine zweite parallele Antwortlogik einführen.

### 6. Ergebnisprüfung
Bestehende `submitMC()` / `submitTyped()` / `checkQuestion()`-Logik weiterverwenden. Für neue Generatoren müssen die Rückgabeformate mit dem bestehenden Vertrag kompatibel sein.

### 7. Fortschritt
`recordAttempt()` weiterhin zentral verwenden. Keine eigene Local-Storage-Struktur für die neuen Generatoren.

### 8. Fehlerdiagnose
`mistakeTags` bei den neuen Generatoren zunächst als Metadaten mitführen. Die bestehende V2.8-Fehlerbank speichert aktuell subtype-bezogen; die feinere Tag-basierte Speicherung kommt mit Mastery/Fehlerdiagnose und darf nicht halb integriert werden.

### 9. Roadmap
Die entsprechenden 11.-Klasse-Kompetenzen werden erst als trainierbar markiert, wenn Generator + Difficulty + Rendering + Ergebnisprüfung funktionieren.

### 10. Prüfung
Die drei neuen Skills dürfen erst in die Prüfungsauswahl gelangen, wenn der normale Aufgabenfluss nachweislich stabil läuft. Danach müssen sie gezielt in kuratierte Prüfungsblöcke überführt werden; die V2.8-Zufallsauswahl ist kein langfristiger Prüfungsblueprint.

## Integrations-Reihenfolge
1. `ergebnisraum`
2. Smoke-Test im normalen Aufgabenfluss
3. `ereignisse`
4. Smoke-Test
5. `vierfeldertafel`
6. Smoke-Test
7. Registry-/Generator-Coverage-Audit
8. erst danach weitere Stochastik-Kompetenzen

## Akzeptanzkriterien
- Keine Regression bei allen 24 V2.8-Generatoren.
- Alle drei neuen Generatoren erzeugen über viele Läufe gültige Aufgaben.
- MC-Optionen sind eindeutig.
- `correctIndex` ist immer korrekt.
- Tabellen haben konsistente Summen und keine ungültigen Bezugsgruppen.
- Numerische Toleranzen sind nachvollziehbar.
- KaTeX-Darstellung bleibt funktionsfähig.
- Fortschritt und Fehlerspeicher funktionieren unverändert.
- Mobile Darstellung bleibt bedienbar.
- V2.8 `main` bleibt bis zum fertigen PR unangetastet.
