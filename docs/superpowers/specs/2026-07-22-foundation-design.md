# Foundation Sub-Project Design

Status: approved
Date: 2026-07-22
Part of: Interactive C Programming eBook (multi-sub-project build)

## Purpose

First sub-project of the C Programming eBook site. Establishes folder
structure, design system, homepage, and shared shell navigation
(sidebar, top nav, search UI, dark/light mode, breadcrumbs). No lesson
content — that starts with the Unit 1 sub-project, which will reuse
this foundation.

## Constraints

- Vanilla HTML5 / CSS3 / JavaScript only. No frameworks (React, Vue,
  Angular, Bootstrap, Tailwind, Node.js build step).
- Must run by opening `index.html` directly in a browser — no build
  step, no bundler.
- Exceptions allowed: Google Fonts `<link>` and Font Awesome Free CDN
  `<link>` (fonts/icons, not JS/CSS frameworks).
- No templating engine exists, so shared shell markup (top nav,
  sidebar, footer) is duplicated across every HTML page. This is the
  one manual-sync point future work must watch: changing the shell
  means editing it in every page that has it.

## Folder Structure

```
/
├── index.html                 (homepage)
├── AGENTS.md                  (repo conventions for future agent sessions)
├── css/
│   ├── variables.css          (design tokens: palette, spacing, radius,
│   │                            shadows, light+dark theme via CSS vars)
│   ├── base.css                (reset, typography, base elements)
│   ├── layout.css              (shell: sidebar, topnav, content grid,
│   │                            breadcrumbs, footer)
│   ├── components.css          (cards, buttons, badges, code-block
│   │                            chrome, progress bar, search panel)
│   └── homepage.css            (homepage-specific styles)
├── js/
│   ├── theme.js                 (dark/light toggle, localStorage persistence)
│   ├── sidebar.js                (collapsible sidebar, active-link highlight,
│   │                              mobile hamburger)
│   ├── search.js                  (search panel UI; exposes empty
│   │                              `searchIndex` array + render function,
│   │                              to be populated once content exists)
│   └── main.js                    (shared init: breadcrumbs, scroll
│                                    progress bar, mobile nav wiring)
├── assets/
│   ├── images/
│   └── icons/                     (custom SVGs beyond Font Awesome)
└── pages/
    └── unit1/ .. unit5/            (placeholder dirs with .gitkeep;
                                      filled in by later sub-projects)
```

## Design System

`css/variables.css` defines CSS custom properties for the given
palette:

| Token | Value |
|---|---|
| `--color-primary` | `#2563EB` |
| `--color-secondary` | `#0EA5E9` |
| `--color-success` | `#10B981` |
| `--color-warning` | `#F59E0B` |
| `--color-danger` | `#EF4444` |
| `--bg-light` | `#F8FAFC` |
| `--bg-dark` | `#0F172A` |

Plus derived shades, a spacing scale, radius scale, and shadow tokens.

Dark mode is implemented as a `[data-theme="dark"]` attribute on
`<html>`, toggled by `theme.js` and persisted to `localStorage`.
Components must reference **semantic** tokens (`--bg`, `--surface`,
`--text`, `--border`, `--text-muted`) rather than raw palette values,
so the dark override block only needs to redefine the semantic layer.

## Fonts / Icons

- Google Fonts: Inter (body/UI), JetBrains Mono (code blocks).
- Font Awesome Free via CDN `<link>` for all icons (sidebar, toggle,
  search, bookmarks, nav).

## Shell Components

Present on every page (duplicated markup per the constraint above):

- **Top nav** — sticky, logo, breadcrumbs, search-open icon, dark/light
  toggle, scroll-based reading progress bar.
- **Sidebar** — collapsible, Unit 1–5 tree navigation, collapse state
  persisted, mobile hamburger trigger.
- **Search panel** — overlay triggered from top nav; input box +
  results area. `search.js` ships a real render/filter function
  wired to an empty `searchIndex` array, so later sub-projects only
  need to populate the array, not rebuild the UI.
- **Footer** — minimal, links back to homepage sections.

## Homepage (`index.html`)

- Hero section: glassmorphism card, animated CTA button.
- Feature grid: "why this course" highlights.
- 5 unit-overview cards: title, topic count, short description,
  "Start Unit" button linking to `pages/unitN/index.html` (target
  doesn't exist yet — expected; filled in by the Unit 1 sub-project
  onward).
- Stats strip: topic/MCQ counts shown honestly (e.g. "Coming soon"
  where the real count is currently zero, not a fabricated number).
- Footer.

## AGENTS.md

New file at repo root documenting: vanilla-only constraint, folder
conventions above, the shell-markup-duplication caveat, design token
names, how dark mode works, the phase-by-phase workflow rule from the
project brief, and the git commit rule (no co-author trailers, no AI
attribution).

## Out of Scope (deferred to later sub-projects)

- Any Unit 1–5 lesson content.
- Functional search indexing.
- Code playground, quiz system, bookmarks persistence beyond UI shell.
- Print stylesheet, keyboard navigation beyond basic focus states.
