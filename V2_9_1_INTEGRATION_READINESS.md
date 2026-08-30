# V2.9.1 Integration Readiness

## Ziel
Vor dem produktiven Patch von `index.html` müssen alle neuen Bausteine einen klaren Integrationsvertrag besitzen.

## Bereits vorbereitete Entwicklungsbausteine
- 42-Skill-Registry und Validierung
- Generator-Audits und Smoke-Tests
- neue Stochastik-Generatorfamilien
- Analysis/Funktionen-Generatorfamilie mit Quality Gate
- Mastery-Kern und Migrationsplan
- FOS-Kurzprüfungs-Blueprint
- V2.9.1-Service-Worker mit Network-first Navigation

## Integrationsreihenfolge
1. Registry + Difficulty + Generator-Abdeckung als gemeinsamer App-Vertrag
2. Stochastik-End-to-end: Aufgabe → Rendering → Antwortprüfung → `recordAttempt()`
3. Analysis/Funktionen End-to-end
4. Mastery/Empfehlung an bestehende Persistenz anbinden
5. Backup/Import mit `schemaVersion: 2` und V2.8-Migration
6. FOS-Kurzprüfung auf Blueprint-/Mehrschrittmodell umstellen
7. vollständige Regression gegen alle 24 V2.8-Generatoren
8. PWA/Offline-Test
9. FOS-/Abituraufgabenvergleich
10. Release Candidate und PR

## Harte Regel
Neue Skills werden erst als `available/trainable` sichtbar, wenn Generator, Difficulty, Rendering, Ergebnisprüfung und Fortschrittspfad funktionieren. Entwicklungsdateien bleiben aus dem Produktionspfad heraus, bis dieser Gate erfüllt ist.

## Sicherheitsregeln
- `main` bleibt bis zum finalen PR unangetastet.
- Keine zweite parallele Local-Storage-Logik.
- Keine pauschale Fehlerdiagnose ohne ausreichende Evidenz.
- Keine vollständige Ersetzung der monolithischen `index.html` mit einem unvollständigen Stand.
- Kein Release ohne mathematischen Generator-Test und Datenmigrations-Test.
