# V2.9.1 – aktueller Integrationsstand

## Branch
- `v2.9.1-development`
- Basis `main` / V2.8.0
- `main` bleibt unangetastet.

## Bereits vorhanden
- V2.9.1-Spezifikation und Skill-Mapping
- 42er-Registry + Registry-Audit
- Generator-Audit und Smoke-Tests
- neue Stochastik-Generatorfamilien
- Analysis-Generatorfamilie als Entwicklungsstand
- Mastery-Core
- Backup-/Migrationsplan
- FOS-Kurzprüfungs-Blueprint
- Release-Gates
- V2.9.1 Service Worker
- Runtime-/Integrations-Bridge

## Kritischer offener Punkt
`index.html` ist der V2.8-Monolith und wurde bisher bewusst nicht blind komplett ersetzt. Die produktive Verdrahtung muss als echter, nachvollziehbarer Git-Patch erfolgen.

## Release-Reihenfolge
1. Stochastik + Analysis in die reale Aufgaben-/Antwort-/Persistenzpipeline integrieren.
2. Mastery, Fehlerdiagnose und Empfehlung an die bestehende Persistenz hängen.
3. Mehrschrittmodell und FOS-Kurzprüfung integrieren.
4. V2.8→V2.9.1-Datenmigration und Backup-Schema aktivieren.
5. UI/Navigation und mobile Regression.
6. mathematische Generatorregression + Gesamt-Smoke-Test.
7. Vergleich mit realen/offiziellen FOS-Materialien.
8. Release Candidate, PR, Live-Test, erst dann Merge.

## Keine Abkürzungen
Neue Skills dürfen nicht als trainierbar erscheinen, solange Generator, Difficulty, Rendering, Antwortprüfung und Fortschrittspfad nicht vollständig funktionieren.
