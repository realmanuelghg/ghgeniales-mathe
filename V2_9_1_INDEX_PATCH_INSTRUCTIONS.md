# V2.9.1 — index.html Integrationsauftrag für Codex

## Ziel
Die isolierten V2.9.1-Bausteine in den bestehenden V2.8-App-Flow integrieren, ohne die bestehende UI, Persistenz und Lernlogik unnötig zu duplizieren.

## Vor dem Patch
- aktuellen Branch `v2.9.1-development` auschecken
- `index.html` als alleinige Produktionsquelle behandeln
- keine komplette Datei-Neuerstellung aus Fremdinhalt
- bestehende V2.8-Funktionen erhalten

## Einzubindende Module
1. `v2_9_1_registry.js`
2. `v2_9_1_runtime.js`
3. `v2_9_1_stochastik_ergebnisraum.js`
4. `v2_9_1_stochastik_ereignisse.js`
5. `v2_9_1_stochastik_vierfeldertafel.js`
6. `v2_9_1_stochastik_bedingte_wk.js`
7. `v2_9_1_stochastik_unabhaengigkeit.js`
8. `v2_9_1_stochastik_statistikinterpretation.js`
9. `v2_9_1_stochastik_kompetenzchecks.js`
10. `v2_9_1_analysis_funktionen.js` nach bestandenem Analysis-Gate
11. `v2_9_1_mastery_core.js` nach bestandenem Mastery-Gate

## Integrationsregeln
- Bestehendes `buildMC`, `recordAttempt`, `newQuestion`, `renderQuestion`, `TOPICS`, Persistenz und Routing wiederverwenden.
- Keine zweite parallele Stats-/Fehler-/XP-Datenbank anlegen.
- Neue Skills erst in `TOPICS`/Lernplan anzeigen, wenn Generator und Difficulty vorhanden sind.
- Neue MC-Generatoren müssen vor Verwendung validiert werden.
- Fehler-Tags aus Generatoren in den bestehenden Fehlerspeicher übernehmen.
- Keine globale Funktion überschreiben, sofern eine bestehende V2.8-Funktion erweitert werden kann.
- `APP_VERSION` auf `2.9.1` anheben und sichtbare Versionsstellen konsistent aktualisieren.
- Service Worker unverändert nur in der bereits geprüften V2.9.1-Version weiterverwenden.

## Stochastik-Integration
Die neuen Stochastik-Skills werden in fachlichen Gruppen dargestellt. Mindestens:
- Grundlagen: Ergebnisraum, Ereignisse
- Darstellung: Vierfeldertafel, Pfad
- Bedingungen: bedingte Wahrscheinlichkeit, Unabhängigkeit
- Interpretation: Statistikinterpretation
- Checks: Pfad-Kompetenzcheck, Stochastik-Kompetenzcheck

## Release-Gate danach
1. `v2_9_1_release_gate_runner.html` muss PASS erreichen.
2. Alle bestehenden V2.8-Generatoren müssen weiter funktionieren.
3. Mindestens 100 Läufe pro neuer Generator ohne Strukturfehler.
4. Keine doppelten MC-Optionen.
5. Kein ungültiger `correctIndex`.
6. Keine Datenverluste bei bestehenden Local-Storage-Keys.
7. Offline-App muss weiter starten.

## Nicht Teil dieses Patches
- noch kein finaler Merge nach `main`
- noch kein PR
- keine Löschung historischer Changelogs
- keine Änderung der 12.-Klasse-Inhalte über Strukturvorbereitung hinaus
