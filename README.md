# Trinkgeld-Rechner

Eine einzelne, schlichte Single-Page-Web-App, die aus Betrag, Trinkgeld-Prozent und
Personenzahl live das Trinkgeld, den Gesamtbetrag und den Betrag pro Person berechnet.
Die Werte werden in ganzen Cent gerundet und in deutscher Währungsschreibweise mit
Komma, zwei Nachkommastellen und Euro-Zeichen angezeigt. Bei ungültigen Eingaben
erscheint statt der Ergebnisse eine verständliche deutsche Fehlermeldung. Es gibt
kein Routing und keine weiteren Ansichten.

## Tech-Stack

- **Sprache**: TypeScript (strict)
- **Framework**: React 18
- **Build/Tooling**: Vite
- **Runtime**: Node.js mit npm
- **Tests**: Vitest (`npm test`)
- **Styling**: reines CSS
- **Datenbank**: keine

## Installation

```bash
npm install
```

## Entwicklung starten

```bash
npm run dev
```

Danach die angezeigte Adresse (standardmäßig `http://localhost:5173`) im Browser öffnen.

## Produktions-Build

```bash
npm run build
```

Der Build landet in `dist/`. Zum lokalen Ansehen des gebauten Stands:

```bash
npm run preview
```

## Bedienung

Die Seite zeigt zwei Blöcke: **Eingaben** und **Ergebnis**.

- **Betrag (€)** – Rechnungsbetrag, z. B. `25,50`
- **Trinkgeld (%)** – Prozentsatz, z. B. `10`
- **Personenzahl** – Anzahl der Personen, mindestens `1`

Sobald Betrag, Trinkgeld-Prozent und Personenzahl gültig eingegeben sind, werden die
drei Ergebniswerte **Trinkgeld**, **Gesamt** und **Betrag pro Person** live
aktualisiert – ohne Klick auf einen Button. Vor der ersten Eingabe zeigt jedes
Ergebnis einen neutralen Platzhalter (`—`). Bei ungültigen Eingaben (leer, keine
Zahl, negativ oder Personenzahl kleiner 1) erscheint an der Stelle der Ergebnisse eine
deutsche Fehlermeldung, und es wird kein Ergebniswert angezeigt.

## Tests

```bash
npm test
```

## Funktionen

- Drei kontrollierte Eingabefelder mit React-State
- Live-Berechnung von Trinkgeld, Gesamt und Betrag pro Person
- Berechnung in ganzen Cent mit kaufmännischer Rundung
- Deutsche Währungsausgabe (Komma, zwei Nachkommastellen, `€`)
- Neutraler Startzustand ohne Fehlermeldung
- Deutsche Fehlermeldung bei ungültigen Eingaben
- Eine einzige Ansicht ohne Routing
