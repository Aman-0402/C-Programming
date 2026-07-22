# AGENTS.md — C Programming Interactive eBook

## What this project is

A free interactive C Programming eBook for absolute beginners, built as
a static website. See `docs/superpowers/specs/` for the full design
history and `docs/superpowers/plans/` for implementation plans.

## Hard constraints

- **Vanilla HTML5 / CSS3 / JavaScript only.** No React, Vue, Angular,
  Bootstrap, Tailwind, Node.js build step, or any other framework.
- **No build step.** The site must run by opening `index.html` directly
  in a browser.
- Allowed external dependencies (fonts/icons only, not frameworks):
  Google Fonts (Inter, JetBrains Mono), Font Awesome Free via CDN.

## Folder structure

```
/
├── index.html          homepage
├── css/                 variables.css (tokens) → base.css (reset/type)
│                         → layout.css (shell) → components.css (UI
│                         pieces) → homepage.css (page-specific)
├── js/                   theme.js, sidebar.js, search.js, main.js
│                         (each one IIFE, no build/bundler, loaded via
│                         plain <script> tags in document order)
├── assets/images/, assets/icons/
├── pages/unit1..unit5/   unit content, added by later sub-projects
└── docs/superpowers/     specs/ and plans/ from the brainstorming and
                          writing-plans skills
```

## Important caveat: duplicated shell markup

There is no templating engine. The top nav, sidebar, search panel, and
footer markup in `index.html` must be copied into every new page (unit
pages, topic pages) rather than included from one source. **When the
shell changes, every page that has a copy needs the same edit.** If
this becomes unmanageable, consider a lightweight client-side include
mechanism — but that decision needs its own design discussion, not a
silent workaround.

## Design tokens

Defined in `css/variables.css`. Components must use the **semantic**
layer (`--bg`, `--surface`, `--text`, `--text-muted`, `--border`,
`--surface-glass`), never raw hex codes or the brand palette variables
directly — that's what makes dark mode a single attribute swap.

Dark mode: `<html data-theme="dark">`, toggled by `js/theme.js`,
persisted via `localStorage.theme`. The initial value is set by an
inline `<script>` in `<head>` (before `js/theme.js` loads) to avoid a
flash of the wrong theme on page load — keep that inline script when
copying the shell into new pages.

## Search

`js/search.js` renders results from `window.searchIndex` (array of
`{ title, description, url }`). It is currently empty by design —
populate it once unit content pages exist, no UI changes needed.

## Workflow rules (from the project brief)

- Work phase-by-phase / sub-project by sub-project. Do not jump ahead.
- After each sub-project: verify functionality, review code quality,
  commit with a clear message, and push only when asked.
- Git commits must **not** include `Co-Authored-By` trailers or any AI
  attribution — commits should read as authored by the repo owner.

## Commands

No package manager, no build, no test runner yet. To sanity-check JS
syntax: `node --check js/<file>.js`. To preview: open `index.html` in
a browser, or `Start-Process index.html` in PowerShell.
