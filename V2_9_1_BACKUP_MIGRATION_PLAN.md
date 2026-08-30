# GHGeniales Mathe V2.9.1 — Backup & Migration Contract

## Ziel
V2.8-Daten müssen beim Wechsel auf V2.9.1 vollständig erhalten bleiben. `schemaVersion` wird von `appVersion` getrennt.

## Exportformat
```json
{
  "app": "GHGeniales Mathe",
  "schemaVersion": 2,
  "appVersion": "2.9.1",
  "exportedAt": "ISO-8601",
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

## Migration V2.8 → V2.9.1
- vorhandene Statistik-, Fehler-, XP-, Streak-, Achievement-, Prüfungs- und Theme-Daten bleiben erhalten
- vorhandene `subtypeId`-Daten werden auf die kanonischen Skill-IDs gemappt
- historische Ergebnisse ohne bekannte Variante/Difficulty werden als historische Evidenz übernommen; fehlende Informationen werden nicht erfunden
- unbekannte/ungültige Felder werden ignoriert statt den gesamten Import zu verwerfen
- Import wird vor dem Schreiben validiert
- Migration ist idempotent: derselbe Backup-Stand darf nicht bei erneutem Import doppelt gezählt werden

## Sicherheitsanforderungen
- niemals `localStorage.clear()` im Importpfad
- vor Import optionaler Snapshot des aktuellen Datenstands
- ungültiges JSON oder inkompatibles Schema darf keine bestehenden Daten überschreiben
- Versionsprüfung erlaubt bekannte ältere Schemas und lehnt unbekannte zukünftige Schemas kontrolliert ab

## Release-Gate
Backup/Migration gilt erst als fertig, wenn ein V2.8-Backup auf einem V2.9.1-Teststand importiert werden kann und dabei Stats, Fehler, XP, Streak, Achievements, Prüfungsverlauf und Theme nachweislich erhalten bleiben.
