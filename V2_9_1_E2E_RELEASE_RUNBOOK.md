# V2.9.1 — End-to-End Release Runbook

## Ziel
Ein einziger prüfbarer Ablauf für den Übergang von den isolierten V2.9.1-Bausteinen zur produktiven App.

## Reihenfolge
1. `index.html` auf V2.9.1 patchen; keine parallele Stats-/XP-/Mistake-Logik.
2. Neue Registry-Skills in die bestehende Auswahl aufnehmen.
3. Alle neuen Generatoren über den bestehenden `render()`/`submitMC()`/`submitTyped()`-Pfad laufen lassen.
4. `recordAttempt()` um Mastery, Fehler-Tags und Recent-Leistung erweitern.
5. Tagesempfehlung auf den gemeinsamen Mastery-/Priority-Kern umstellen.
6. Backup/Import auf `schemaVersion: 2` migrieren; V2.8-Daten verlustfrei übernehmen.
7. Prüfungsmodus auf sechs kuratierte 5-Punkte-Blöcke / 30 Punkte / 25 Minuten umstellen.
8. Nachbesprechung pro Block/Teilkompetenz erhalten.
9. `APP_VERSION` und sichtbare Version auf 2.9.1 setzen.
10. Offline-Shell und Runtime-Dateien prüfen.

## Nicht freigeben solange
- neue Skills nur über einen Workaround statt über den echten App-Pfad auftauchen;
- eine Kompetenz ohne validen Generator/Difficulty trainierbar ist;
- Migration vorhandene V2.8-Daten verändert oder verwirft;
- Prüfung weiterhin 10 zufällige Einzelaufgaben statt 6 Blöcke verwendet;
- Registry-/Generator-/Antworttests Fehler zeigen;
- `index.html` nicht auf echte End-to-End-Funktion geprüft wurde.

## Abschluss
`main` vergleichen → vollständige Regression → FOS-Aufgabenvergleich → RC → PR → Cloudflare-Live-Test → erst dann Merge.