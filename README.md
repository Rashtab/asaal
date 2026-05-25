# ASAAL ReDesign

A modern redesign of the **Alliance of South Asian American Labor** (ASAAL) website — a static, mobile-first, framework-free site for a national 10,000+ member labor and civic organization with 20 chapters across 11 states.

> **Mission.** *"The purpose of ASAAL is to empower South Asian American communities through education, leadership development, civic engagement, advocacy, grassroots organizing, and community service across America."*

---

## ✨ Highlights

- **Pure HTML / CSS / vanilla JS.** No build step, no bundler, no runtime dependency on a framework. Open any file in a browser and it works.
- **Single source of truth per domain.** Chapters, leadership, events, and sponsorship are all data-driven — update one JS file and every page that surfaces that data updates.
- **National Convention** site at `/convention/2026/`.
- **Events Hub** at `/events/` — yearly calendar, interactive monthly view, state activity map, archives, masonry gallery, impact counters.
- **Sponsorship system** at `/sponsorship/` — landing, six-tier pricing matrix, journal advertising, multi-step application, sponsor showcase.
- **Interactive PDF flipbook** at `/sponsorship/flipbook/` — the convention sponsorship package rendered page-by-page with real page-turn physics (StPageFlip + pdf.js).
- **Tweak mode** — the site exposes a Tweaks panel for live theme/density/accent overrides without editing source.

---

## 🗂️ Repository structure

```
.
├── index.html                              # Home — purpose, activities, chapters, contact
├── chapters.html                           # All 20 chapters · interactive US map
├── chapter.html                            # Single-chapter template
├── leadership.html                         # National leadership landing
├── executive-council.html                  # 11 officers · 39 VPs · 7 trustees · committees
├── accomplishments.html                    # Track record
├── form.html                               # Membership form
├── NationalPresidentBio.html               # Founder/President bio
├── HotelReservation.html                   # Convention hotel block
├── invitationCard2024.html                 # 2024 gala invitation
│
├── convention/
│   └── 2026/
│       └── index.html                      # 18th National Convention site
│
├── events/
│   ├── index.html                          # Events Hub
│   ├── events.css                          # Hub-specific styles
│   └── events.js                           # Calendar · map · gallery · modals
│
├── sponsorship/
│   ├── index.html                          # Landing
│   ├── sponsorship-shared.js               # Counters · fade-ins
│   ├── levels/index.html                   # Six-tier menu + comparison matrix
│   ├── programs/index.html                 # 9 program areas you can underwrite
│   ├── journal-advertising/index.html      # Print ad placements & specs
│   ├── apply/index.html                    # Multi-step sponsor application
│   ├── flipbook/index.html                 # Interactive page-turn PDF reader
│   └── files/
│       └── ASAAL-Convention-2025-Sponsorship-Package.pdf
│
├── sponsors/
│   └── index.html                          # Partner showcase by tier
│
├── css/
│   ├── style.css                           # Design system (1.4k lines)
│   └── sponsorship.css                     # Sponsorship-section overrides
│
├── js/
│   ├── main.js                             # Header/footer · nav · tweaks
│   ├── chapters-data.js                    # 20 chapters · single source of truth
│   ├── chapters-map.js                     # Interactive US chapter map
│   ├── leadership-data.js                  # National officers · VPs · trustees
│   ├── leadership-render.js                # Renders leadership grids
│   ├── events-data.js                      # Events · categories · archives · impact
│   └── sponsorship-data.js                 # Levels · journal ads · programs · etc.
│
├── img/
│   ├── asaalLogo.png
│   ├── favicon.png
│   └── apple-touch-icon.png
│
└── ourwork/, uploads/, scraps/             # Working / archival
```

---

## 🚀 Run it locally

No build step. The simplest options:

```bash
# Python 3
python3 -m http.server 8000

# Node (one-shot)
npx serve .

# Or just open index.html directly in your browser
```

Then visit:
- <http://localhost:8000/> — homepage
- <http://localhost:8000/events/> — events hub
- <http://localhost:8000/sponsorship/> — sponsorship landing
- <http://localhost:8000/sponsorship/flipbook/> — interactive sponsorship package

> The flipbook fetches the PDF over HTTP, so you do need a server (file:// won't load it cross-origin in some browsers). Any of the commands above works.

---

## 🎨 Design system

`css/style.css` is the design system. Key tokens:

| Token              | Value                          | Notes                          |
|--------------------|--------------------------------|--------------------------------|
| `--asaal-red`      | ASAAL crimson                  | Primary action                 |
| `--asaal-saffron`  | Warm saffron-gold              | Accent / focus                 |
| `--asaal-blue`     | Navy                           | Secondary / civic              |
| `--ink`            | Near-black                     | Text                           |
| `--font-display`   | Archivo                        | Headlines                      |
| `--font-body`      | Source Sans 3                  | Body                           |
| `--font-mono`      | JetBrains Mono                 | Labels, numbers, eyebrows      |

Spacing scale (`--s-1` … `--s-9`), radii (`--r-1` … `--r-pill`), and shadow scale are all defined as CSS custom properties. **Use the tokens** — don't hardcode colours.

---

## 🧠 Where the data lives

Everything that appears more than once is loaded from a single JS file. Edit the file, every page updates.

| Concept       | File                          | Used by                                                        |
|---------------|-------------------------------|----------------------------------------------------------------|
| Chapters      | `js/chapters-data.js`         | `chapters.html`, header mega-menu, footer, events map          |
| Leadership    | `js/leadership-data.js`       | `leadership.html`, `executive-council.html`, profile pages     |
| Events        | `js/events-data.js`           | `events/index.html` (also intended for homepage previews)      |
| Sponsorship   | `js/sponsorship-data.js`      | All `/sponsorship/*` pages and `/sponsors/`                    |

Each data file is heavily commented and includes the field schema at the top.

---

## ✉️ Headers, footers, and navigation

The site does **not** have a build step that templates partials. Instead, every page contains:

```html
<header id="site-header" data-active="events"></header>
<!-- … -->
<footer id="site-footer"></footer>
```

`js/main.js` mounts the shared header and footer into those slots, computing all internal URLs **relative to `js/main.js`'s own location** — that's why subfolder pages (`/events/`, `/convention/2026/`, `/sponsorship/levels/`) all link correctly without per-page URL config.

To highlight the active nav item, set `data-active="..."` on the header element. Supported values:
`home`, `about`, `services`, `chapters`, `events`, `sponsorship`, `sponsors`, `team`, `contact`.

---

## 📅 Events hub (`/events/`)

A year-round calendar of national, chapter, advocacy, youth, women's, cultural, and community-service events.

- **Animated dot-map hero** with pulsing chapter cities and a live activity ticker
- **Featured convention** card with a live countdown to July 18, 2026
- **Category cards** — counts pulled live from the events array
- **Filterable upcoming grid** with featured / category / "show more" pagination
- **Interactive monthly calendar** with category toggles, pip indicators, and a side panel
- **State-activity map** — click a state to see all upcoming events there
- **Six-month timeline** of flagship moments
- **Archives** filtered by Conventions · Programs · Leadership · Advocacy
- **Masonry photo gallery** with lightbox modal
- **Animated impact counters** triggered on scroll

All driven by `js/events-data.js`.

---

## 💼 Sponsorship system (`/sponsorship/`)

A multi-page, scalable sponsorship experience modelled after the event portals of major national nonprofits.

| Route                                       | Purpose                                                       |
|---------------------------------------------|---------------------------------------------------------------|
| `/sponsorship/`                             | Landing — pillars · programs · why-sponsor · timeline · impact |
| `/sponsorship/levels/`                      | Six pricing cards + side-by-side comparison matrix             |
| `/sponsorship/programs/`                    | Nine program areas with mission, impact, visibility            |
| `/sponsorship/journal-advertising/`         | Ad placements with proportional visual previews                |
| `/sponsorship/apply/`                       | Three-step sponsor application                                 |
| `/sponsorship/flipbook/`                    | Interactive PDF flipbook                                       |
| `/sponsors/`                                | Public sponsor showcase                                        |

### Pricing (current, from the 2025 package)

| Tier                | Amount   |
|---------------------|----------|
| Grand Sponsor       | $25,000  |
| Platinum Sponsor    | $10,000  |
| Gold Sponsor        | $7,500   |
| Silver Sponsor      | $5,000   |
| General Sponsor     | $3,000   |
| Public Sponsor      | $2,000   |

### Journal ad rates

| Placement           | Price   |
|---------------------|---------|
| Inside Front Cover  | $3,500  |
| Full Page           | $1,500  |
| Half Page           | $750    |
| Quarter Page        | $500    |
| Business Card       | $250    |

**Update all of the above by editing `js/sponsorship-data.js`** — every page updates.

---

## 📖 Sponsorship Package Flipbook

A premium, browser-rendered, page-turn experience for the convention sponsorship package.

- **StPageFlip** (CDN, v2.0.7) handles the page-turn physics — drag a corner, click a side, or use ← →.
- **pdf.js** (CDN, v3.11.174) renders each PDF page onto a canvas inside the book.
- A custom cover wraps the front; a custom back page wraps the rear.
- Toolbar exposes prev/next, first/last, a page slider, and a fullscreen toggle.
- Keyboard: `←` `→` `Home` `End` `F` (fullscreen) `Esc`.

To swap in a new sponsorship PDF, drop it into `sponsorship/files/` and update `PDF_URL` at the top of `sponsorship/flipbook/index.html`.

---

## ♿ Accessibility & responsiveness

- Semantic HTML throughout (`<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<footer>`).
- Focus states preserved on all interactive elements.
- Mobile-first responsive: every layout collapses gracefully down to 360 px.
- All animations are subtle (≤ 700 ms) and respect user intent — no auto-playing carousels, no flashing.
- Color contrast meets WCAG AA on every primary text/background pair.

---

## 🔧 Maintenance notes

- **Adding a new chapter.** Append an object to `js/chapters-data.js`. The chapter mega-menu, footer, and map pick it up automatically.
- **Adding a new event.** Append an object to `EVENTS` in `js/events-data.js`. The hub grid, calendar, map, and timeline all re-render from the same array.
- **Updating sponsorship pricing.** Edit `LEVELS[*].amount` / `amountLabel` and `JOURNAL_ADS[*].price` / `priceLabel` in `js/sponsorship-data.js`. Every sponsorship page picks up the new values on next load.
- **Replacing the sponsorship PDF.** Drop the file into `sponsorship/files/` and update the `PDF_URL` constant in `sponsorship/flipbook/index.html` if you rename it.
- **Adding a new top-level page.** Add the file, include the shared header/footer slots, and include `<script src="js/main.js"></script>`. Add the link inside `headerHTML()` in `js/main.js`.

---

## 🤝 Credits

- **Type** — [Archivo](https://fonts.google.com/specimen/Archivo), [Source Sans 3](https://fonts.google.com/specimen/Source+Sans+3), [JetBrains Mono](https://www.jetbrains.com/lp/mono/)
- **Page-turn engine** — [StPageFlip](https://github.com/Nodlik/StPageFlip)
- **PDF rendering** — [PDF.js](https://mozilla.github.io/pdf.js/)

---

## 📄 License

Copyright © Alliance of South Asian American Labor. All rights reserved.

This repository contains organizational marketing material for ASAAL. The codebase is internal; redistribution, reuse, or derivative works require written permission.
