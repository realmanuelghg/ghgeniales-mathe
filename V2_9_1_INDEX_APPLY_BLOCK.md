# V2.9.1 – Apply Block for index.html

## Ziel
Die neue Stochastik-Pipeline wird innerhalb des bestehenden Hauptscripts von `index.html` integriert, damit sie Zugriff auf die vorhandenen lexikalischen Referenzen wie `TOPICS`, `DIFFICULTY_BY_ID` und `render()` hat.

## Sicherer Patchpunkt
Direkt vor dem bestehenden Block:

```text
updateStatbar();
render();
```

Dort soll Codex die V2.9.1-Lade-/Registrierungsfunktion einsetzen und anschließend den bestehenden `updateStatbar(); render();`-Aufruf unverändert erhalten.

## Zu ladende Module
1. `./v2_9_1_stochastik_ergebnisraum.js`
2. `./v2_9_1_stochastik_ereignisse.js`
3. `./v2_9_1_stochastik_vierfeldertafel.js`
4. `./v2_9_1_stochastik_bedingte_wk.js`
5. `./v2_9_1_stochastik_unabhaengigkeit.js`
6. `./v2_9_1_stochastik_statistikinterpretation.js`
7. `./v2_9_1_stochastik_kompetenzchecks.js`

## Registrieren
Nur Generatoren registrieren, deren Funktion tatsächlich vorhanden ist. Neue Einträge:

- `ergebnisraum` → `GHGenialesV291Stochastik.genErgebnisraum` → easy
- `ereignisse` → `GHGenialesV291Ereignisse.genEreignisse` → medium
- `vierfeldertafel` → `GHGenialesV291Vierfeldertafel.genVierfeldertafel` → medium
- `bedingteWkVerstehen` → `GHGenialesV291BedingteWk.genBedingteWkVerstehen` → medium
- `unabhaengigkeitVerstehen` → `GHGenialesV291Unabhaengigkeit.genUnabhaengigkeitBedingt` → medium
- `statistikInterpretation` → `GHGenialesV291StatistikInterpretation.genStatistikInterpretation` → hard
- `pfadKompetenzcheck` → `GHGenialesV291StochastikChecks.genPfadKompetenzcheck` → hard
- `stochKompetenzcheck` → `GHGenialesV291StochastikChecks.genStochKompetenzcheck` → hard

## Sicherheitsregeln
- Keine zweite Stats-/XP-/Fehlerspeicherlogik erzeugen.
- Keine vorhandene V2.8-Funktion entfernen.
- Keine globale `TOPICS`-Variable voraussetzen; innerhalb des Hauptscripts die bestehenden Referenzen verwenden.
- Bei fehlendem Generator nichts registrieren.
- Nach erfolgreicher Registrierung `render()` genau über den bestehenden Renderer neu ausführen.
- Bei Ladefehlern App weiterhin normal benutzbar lassen.

## Danach testen
1. Neue Stochastik-Chips erscheinen.
2. Jede neue Kompetenz erzeugt Aufgaben.
3. Antwortprüfung verwendet die bestehende Pipeline.
4. Bestehender Fortschritt bleibt erhalten.
5. Keine JavaScript-Konsolefehler beim normalen App-Start.
6. V2.8-Kompetenzen funktionieren unverändert.
