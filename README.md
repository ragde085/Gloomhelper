# Gloomhelper

An unofficial, fan-made **Progressive Web App** companion for the board game
**Gloomhaven** by Cephalofair Games. Gloomhelper helps you keep track of party
progress, character sheets, attack-modifier decks, conditions, elemental
infusions, and a quick rules reference — all in one place, in your browser,
**installable, and fully offline-capable**.

> Game content, names, and mechanics are referenced under fair use for player
> assistance. This project is not affiliated with or endorsed by Cephalofair Games.

## Features

- **Party tracker** — name, reputation, location, prosperity (1–9), achievements
  list, and per-scenario completed/failed log.
- **Character sheets** for the six starting classes (Brute, Tinkerer, Spellweaver,
  Scoundrel, Cragheart, Mindthief). Each sheet tracks:
  - level (HP scales automatically), XP, gold, current/max HP, battle-goal checks
  - the full perk list with clickable tick marks
  - items
  - the full level-X through level-9 ability-card list with lock-by-level and
    "in active deck" toggling
  - active conditions (chips for all 11 Gloomhaven conditions)
  - free-form notes
- **Attack modifier deck** — per-character 20-card deck simulator with:
  - draw, shuffle, full reset
  - bless / curse add and clear
  - automatic flagging when the next round needs a reshuffle (after a `×2` or `×0`)
  - discard pile view
- **Conditions reference** — full descriptions for Stun, Immobilize, Disarm,
  Wound, Poison, Muddle, Curse, Bless, Strengthen, Invisible, Regenerate.
- **Elemental infusion board** — six elements (Fire, Ice, Air, Earth, Light, Dark)
  cycling Strong → Waning → Inert with a single click.
- **Bestiary** — searchable monster reference for the base game (33 standard
  monsters + 9 named bosses). Filter by name and pick a scenario level (0–7);
  the table updates with HP / Move / Attack / Range / extras for both Normal
  and Elite variants. Notes call out immunities and special rules.
- **Items** — the base-game item catalog (#001 onward) with filters for slot
  type and shop prosperity tier. Each card lists slot, gold cost, prosperity
  unlock, use type (spent / consumed / persistent), and a short effect blurb.
- **Searchable quick-rules reference** covering the round structure, attacks,
  resting, looting, leveling, retirement, prosperity, and more.
- **History & lore** of Gloomhaven, the races, and the mercenary trade.
- **Save data export & import** — JSON file, clipboard, or paste; replace or merge.
- **Installable PWA** with full offline support, app icon, and standalone window.

## Run it as a web app

Gloomhelper has no backend, no build step, and no runtime dependencies. It is a
pure client-side app delivered as static HTML/CSS/JS.

### Option A — Run from any static host

Serve the repository folder over HTTP from anywhere — GitHub Pages, Netlify,
Vercel, your own nginx, `python3 -m http.server`, etc. The PWA features
(installation, offline cache, service worker) require **HTTPS or `localhost`**.

```sh
git clone https://github.com/ragde085/Gloomhelper.git
cd Gloomhelper
python3 -m http.server 8000
# open http://localhost:8000
```

### Option B — Open the file directly

You can also open `index.html` in any modern browser (`file://`). Everything
works **except** the offline service worker (browsers disallow service workers
on `file://`). The status badge in the top bar will tell you so.

### Install as an app

When the app is served over HTTPS or `localhost` in a supporting browser
(Chrome, Edge, Brave, Samsung Internet, recent Firefox/Safari):

1. The top-bar shows an **⤓ Install** button when the browser allows it.
   Click it to install Gloomhelper as a standalone app on your device.
2. Or use your browser's "Install app" / "Add to Home Screen" menu.

Once installed, Gloomhelper launches in its own window with no browser chrome,
runs entirely offline, and shows up in your OS app launcher / home screen.

The top-bar **offline badge** reports the current state:

| Badge text                       | Meaning                                                 |
| -------------------------------- | ------------------------------------------------------- |
| `✓ offline ready`                | Service worker active; the app works offline now.       |
| `✓ offline ready (reload)`       | Service worker just installed; reload to activate.      |
| `⚠ open via http:// for offline` | Loaded via `file://`; offline cache is unavailable.     |
| `⚠ no offline support`           | Browser doesn't support service workers.                |
| `⚠ offline unavailable`          | Service worker registration failed (see DevTools).      |

## Saving, exporting, and importing data

All your data is stored in `localStorage` under the key `gloomhelper.state.v1`,
so it survives reloads and offline sessions but stays local to that browser /
installation. Use the export / import tools to back up, share, or migrate.

### Export

Available from the **top bar** (`⬇ Export`) and from **Settings → Export Save Data**:

- **Download JSON file** — saves a `gloomhelper-<party>-<timestamp>.json` file.
- **Copy JSON to clipboard** — copies the full payload as a string.
- **Show JSON in textbox** — falls back to a read-only text area for manual
  copying (useful on browsers without clipboard access).

### Import

Available from the **top bar** (`⬆ Import`) and from **Settings → Import Save Data**:

- **Choose JSON file** — read directly from a saved export.
- **Paste JSON** — paste the contents of an export and apply.
- **Replace** vs **Merge** mode:
  - *Replace* overwrites your current save.
  - *Merge* keeps current party data, appends unique achievements & scenarios,
    adds characters by new id, and unions decks/elements.
- The importer validates the shape, rejects malformed payloads with a clear error,
  and previews a summary (e.g. *"3 character(s), 7 scenario(s)"*) before applying.

### Reset

**Settings → Reset All Data** wipes the local save. Always export first.

### Save file format

```jsonc
{
  "format": "gloomhelper.save.v1",
  "appVersion": "0.2.0",
  "exportedAt": "2026-04-25T05:00:00.000Z",
  "state": {
    "party":     { "name": "...", "reputation": 0, "location": "...",
                   "prosperity": 1, "achievements": [], "scenarios": [] },
    "characters": [ /* per-character sheets */ ],
    "decks":      { /* per-character modifier decks */ },
    "elements":   { "Fire": "inert", /* ... */ },
    "activeModTarget": null,
    "savedAt":    "..."
  }
}
```

Raw `state`-only JSON (without the envelope) is also accepted for backward
compatibility.

## Project layout

```
Gloomhelper/
├── index.html              # App shell + tab markup, PWA meta tags
├── styles.css              # Single stylesheet
├── app.js                  # All app logic (vanilla JS)
├── service-worker.js       # Offline cache (cache-first, app-shell fallback)
├── manifest.webmanifest    # PWA manifest
├── icons/
│   ├── icon.svg            # Standard maskable+any icon
│   └── icon-maskable.svg   # Maskable-safe icon (Android adaptive)
├── data/
│   ├── characters.js       # Class data: HP table, perks, full card lists
│   ├── conditions.js       # Status condition reference
│   ├── elements.js         # Elemental infusion definitions
│   ├── modifiers.js        # Standard 20-card attack modifier deck + bless/curse
│   ├── monsters.js         # Bestiary: per-level Normal/Elite stats for all base monsters + bosses
│   ├── items.js            # Item catalog: slot, cost, prosperity, use, effect
│   ├── rules.js            # Quick rules reference entries
│   └── history.js          # Lore / history copy
└── LICENSE
```

No frameworks. No build tools. No external runtime dependencies.

### Game data files

All Gloomhaven content the app references lives under `data/`. Each file
exposes a single `window.GH_*` global so it's trivial to extend or replace.

| File                  | Global         | Contents                                                    |
| --------------------- | -------------- | ----------------------------------------------------------- |
| `data/characters.js`  | `GH_CLASSES`   | Six starting classes — HP table by level, hand size, perks, full level-X→9 ability cards |
| `data/monsters.js`    | `GH_MONSTERS`  | Base-game bestiary: name, category, per-level Normal/Elite `[HP, Move, Attack, Range, extras]`, special notes |
| `data/items.js`       | `GH_ITEMS`     | Base-game items — id, name, slot, cost, prosperity, use type, effect summary |
| `data/conditions.js`  | `GH_CONDITIONS`| All 11 status conditions with short and long descriptions   |
| `data/elements.js`    | `GH_ELEMENTS`  | Six elemental infusions with symbol, color, and descriptions|
| `data/modifiers.js`   | `GH_BASE_DECK`, `GH_BLESS`, `GH_CURSE` | Standard 20-card attack modifier deck + bless/curse cards |
| `data/rules.js`       | `GH_RULES`     | Quick-reference rule entries (round, attacks, resting, …)   |
| `data/history.js`     | `GH_HISTORY`   | Lore / history HTML                                         |

To extend (e.g. add unlockable classes, new monsters, custom items), drop
new entries into the relevant array — no other code changes are needed.

> Stat lines for monsters and items are reproduced from the publicly
> published Gloomhaven Monster Stat Cards and Item Reference Cards for
> fair-use player reference.

## Updating the cached app

When you change any precached file, bump `CACHE_VERSION` in `service-worker.js`
so installed clients fetch the new version on their next visit. The app shows a
"Update available — reload to apply" toast when a new service worker has
installed in the background.

## Browser support

Tested on recent Chrome, Edge, Firefox, and Safari. The PWA features need:

- `localStorage`
- `serviceWorker` registration over HTTPS or `localhost`
- ES2018+ syntax
- Clipboard API (with a textbox fallback)
- `FileReader` API for imports

## Roadmap ideas

- Unlockable classes beyond the starting six
- Monster / boss stat tracker with scaling by scenario level
- Character-by-character export ("share my Brute")
- Battle-goal card draws
- City & road event helpers
- Optional cloud sync (e.g. via a Gist or user-supplied URL)

PRs and suggestions welcome.

## License

See [LICENSE](./LICENSE).
