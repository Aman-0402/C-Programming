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

## Progress

- **Foundation** — done. Design system, shell (sidebar/floating
  controls/search), homepage.
- **Unit 1 — fully complete.** All 28 topics across `pages/unit1/`, from
  `evolution-of-programming.html` through `multi-line-comments.html`.
  Built in 5 sub-projects: Group 1 (Programming Fundamentals, 7 topics,
  pseudocode/plain-English only), Group 2 (Getting to Know C, 5 topics,
  first real C syntax — Hello World), Group 3a (The Pipeline Itself, 6
  topics, the `add.c` example traced through real `gcc` compilation),
  Group 3b (Translators & Support Concepts, 7 topics — Assembler,
  Linker, Loader, Interpreter, Compilers & Interpreters, Operating
  Systems, Debugging), Group 4 (Comments, 3 topics, Unit 1's closing
  capstone). Sidebar's Unit 1 accordion holds all 28 links; prev/next
  chain runs unbroken end to end.
- **Unit 2 — C Building Blocks & Data Types, in progress.** 36 raw
  syllabus topics, decomposed into 5 groups (~7 topics each, same
  rhythm as Unit 1): **G1** Tokens & Naming (Tokens, Keywords,
  Identifiers, Naming Rules, Variables, Constants, Values). **G2**
  Scope & Data Types (Scope, Binding, Storage Classes, Integer/Float/
  Char Types, Strings). **G3** Values & Basic Operators (L-value,
  R-value, Type Conversion, Operators overview, Arithmetic, Relational,
  Logical). **G4** Advanced Operators (Conditional, Bitwise, Assignment,
  Comma, Arrow, `sizeof`, Precedence, Associativity). **G5**
  Increment/Decrement/Notation + I/O (Increment, Decrement, Hungarian
  Notation, Input, Output, `printf()`, `scanf()`). Build one group at a
  time, same spec→plan→execute→review cycle as every Unit 1 group.
  `pages/unit2/` is still a placeholder directory until G1 ships.

## Folder structure

```
/
├── index.html          homepage
├── AGENTS.md
├── css/                 variables.css (tokens) → base.css (reset/type)
│                         → layout.css (shell, sticky sidebar, floating
│                         controls) → components.css (buttons/cards/
│                         search/interview-accordion) → diagrams.css
│                         (flowchart/memory/timeline shapes) →
│                         quiz.css (MCQ widget) → homepage.css
├── js/                   theme.js, sidebar.js, search.js, main.js,
│                         quiz.js, copy-code.js, accordion.js — each
│                         one IIFE, no build/bundler, loaded via plain
│                         <script> tags in document order
├── assets/images/, assets/icons/
├── pages/unit1/          7 topic pages + unit2..5/ placeholders
│                         (unit1 has NO index.html — see below)
└── docs/superpowers/     specs/ and plans/ from the brainstorming and
                          writing-plans skills
```

## Important caveat: duplicated shell markup

There is no templating engine. The sidebar, floating theme-toggle,
floating social links, and search panel markup in `index.html` must be
copied into every new page (unit pages, topic pages) rather than
included from one source. **When the shell changes, every page that
has a copy needs the same edit.** The current topic-page template to
copy from is `pages/unit1/evolution-of-programming.html` — it sets the
exact structure (head link order, shell markup, quiz data-array
format, script tag order) that every later topic page replicates.

There is **no top navbar** — it was removed. The theme toggle and
social links (GitHub/LinkedIn) are `position: fixed` buttons floating
top-right, independent of any nav bar (see `.theme-toggle-float` /
`.social-float` in `css/layout.css`).

## Sidebar

- **Sticky**, not scroll-with-page: `position: sticky; top: 0; height:
  100vh` with its own `overflow-y: auto` (see `.sidebar` in
  `css/layout.css`). Don't reintroduce `grid-row: 2` — content and
  sidebar both use `grid-row: 1` since the navbar row was removed.
- **Unit 1 is an accordion**, not a link to an overview page. There is
  no `pages/unit1/index.html` — it was deleted. The "Unit 1" entry is
  a `<button class="sidebar-link sidebar-toggle" id="unit1-toggle">`
  that expands/collapses a `<div class="sidebar-submenu"
  id="unit1-submenu">` wrapping the 7 topic links. `js/sidebar.js`
  auto-opens the submenu on load if one of its links is the active
  page. Former links to the old overview page (homepage hero/card,
  every sidebar, Flowcharts' end-of-chapter button) now point to
  `evolution-of-programming.html` (the first topic) instead.
- Units 2-5 remain single collapsed links to their own not-yet-built
  `index.html` placeholders — don't build the accordion pattern for
  them until each unit actually has multiple topic pages.
- **Active-link matching** compares `link.pathname` (resolved full
  path) against `location.pathname`, not basenames — multiple sidebar
  links share the basename `index.html` (Units 2-5's placeholders), so
  basename-only matching produces false positives. Don't regress this.
- **Logo text must stay wrapped in `<span class="sidebar-label">`**
  (inside `.sidebar-logo`) — the collapsed-sidebar CSS rule
  (`[data-sidebar-collapsed="true"] .sidebar-label { display: none;
  }`) depends on it. Un-wrapping it causes the logo text to overflow
  and wrap badly in the collapsed 72px icon rail.

## Design tokens

Defined in `css/variables.css`. Components must use the **semantic**
layer (`--bg`, `--surface`, `--text`, `--text-muted`, `--border`,
`--surface-glass`), never raw hex codes or the brand palette variables
directly — that's what makes dark mode a single attribute swap. (One
sanctioned exception: `.code-block` chrome is deliberately always dark
regardless of page theme — see the comment in `css/components.css`.)

Dark mode: `<html data-theme="dark">`, toggled by `js/theme.js`,
persisted via `localStorage.theme`. The initial value is set by an
inline `<script>` in `<head>` (before `js/theme.js` loads) to avoid a
flash of the wrong theme on page load — keep that inline script when
copying the shell into new pages.

## Topic page pattern (per-topic content pages)

Each topic page (e.g. `pages/unit1/*.html`) follows the master brief's
21-section template, skipping sections that don't apply to a given
topic (documented per-page, not stubbed with placeholder content).
Reusable pieces:

- **Diagrams**: `css/diagrams.css` — `.flowchart`/`.flow-box`/
  `.flow-box-decision`/`.flow-arrow` for flow diagrams, `.memory-*` for
  memory diagrams, `.timeline*` for chronological content. HTML/CSS
  only, no images, per the master spec.
- **MCQs**: `css/quiz.css` + `js/quiz.js`. Each page defines a
  `window.<name>Quiz` array (`{ question, options: [4 strings],
  correctIndex, explanation }`) and a `<div class="quiz"
  data-quiz-source="<name>Quiz">`. **5 questions per topic** (not the
  master brief's literal "20 minimum" — trimmed per explicit user
  direction: min 2, max 5, picked for quality/diversity over volume).
- **Interview Questions**: click-to-reveal accordion, not static text.
  `css/components.css` (`.interview-item`/`.interview-question`/
  `.interview-answer`) + `js/accordion.js`. Every question needs a
  written answer — don't ship a question without one.
- **Code blocks**: `.code-block`/`.code-block-header`/`.copy-btn` +
  `js/copy-code.js` wires the copy button to the clipboard
  automatically — no per-page JS needed.
- No on-page section table-of-contents (was built, then removed per
  user request) — don't re-add a `.topic-toc` sidebar.
- No Chapter Summary / Cheat Sheet sections — removed per user
  request; section numbering was renumbered sequentially afterward
  with no gaps. If the master brief's checklist is used as a
  reference, treat those two sections as out of scope until told
  otherwise.

## Search

`js/search.js` renders results from `window.searchIndex` (array of
`{ title, description, url }`). It is currently empty by design —
populate it once more content exists, no UI changes needed. The
search-open button was removed along with the navbar; the search
overlay is still reachable via `Ctrl/Cmd+K`.

## Workflow rules (from the project brief)

- Work phase-by-phase / sub-project by sub-project. Do not jump ahead.
  (Unit ordering matters: Unit 2 depends on Unit 1 introducing C
  syntax first — don't build later units out of order.)
- After each sub-project: verify functionality, review code quality,
  commit with a clear message, and push only when asked.
- Git commits must **not** include `Co-Authored-By` trailers or any AI
  attribution — commits should read as authored by the repo owner.

## Commands

No package manager, no build, no test runner yet. To sanity-check JS
syntax: `node --check js/<file>.js`. To preview: open `index.html` in
a browser, or `Start-Process index.html` in PowerShell. No
browser-automation/screenshot tool is available in this environment —
visual/interactive verification (theme toggle, accordions, quiz
scoring, responsive breakpoints) is a manual human step after each
sub-project, not something an agent here can self-verify.
