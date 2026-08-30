# GHGeniales Mathe V2.9.1 — Mastery & Migration Contract

## Ziel
Das V2.8-Lernmodell wird in V2.9.1 erweitert, ohne bestehende Lerndaten zu verlieren oder fehlende historische Details zu erfinden.

## Mastery-Stufen
- NEW — Noch nicht geübt
- PRACTICE — Üben
- CONSOLIDATE — Festigen
- STABILIZE — Stabilisieren
- SECURE — Sicher

## Mastery-Signale
Mastery darf nicht allein aus Gesamtquote und Versuchszahl bestehen. Berücksichtigt werden:
1. historische Leistung
2. aktuelle Leistung / Recency
3. Schwierigkeitsabdeckung
4. Variantenabdeckung
5. aktive Fehlerbilder
6. Wiederholungsfälligkeit

XP, Level, Streak und Achievements sind davon getrennt.

## Ergebnisdaten
Neue Resultate sollen mindestens Skill, Variante, Korrektheit, Zeitstempel und soweit belastbar Fehler-Tags enthalten. Bei nicht diagnostizierbaren Fehlern bleiben mistakeTags leer.

## Migration V2.8 -> V2.9.1
Bestehende V2.8-Schlüssel und ihre Inhalte werden übernommen. Die Migration darf keine historischen Difficulty-/Varianteninformationen erfinden, die V2.8 nicht gespeichert hat.

Empfohlenes Backup-Schema:
```json
{
  "app": "GHGeniales Mathe",
  "schemaVersion": 2,
  "appVersion": "2.9.1",
  "exportedAt": "...",
  "data": {
    "stats": {},
    "mastery": {},
    "mistakes": {},
    "progress": {},
    "exams": [],
    "settings": {}
  }
}
```

## Akzeptanzkriterien
- V2.8-Stats, Fehler, XP, Streak, Achievements, Prüfungsverlauf und Theme bleiben erhalten.
- Import eines älteren Backups ist rückwärtskompatibel.
- Migration ist idempotent.
- Ungültige oder unbekannte Felder werden nicht stillschweigend als gültige Lernhistorie interpretiert.
- Mastery-Anzeige darf erst auf neue Stufen wechseln, wenn die zugrunde liegende Evidenz ausgewertet wird.
