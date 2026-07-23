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

## Current mode: user-authored content replacement (active, ongoing)

The project has pivoted away from AI-generated topic content. The user
now pastes their own raw material (Markdown-ish, with code blocks,
tables, MCQs, interview Qs) **one topic at a time**, in official
syllabus order, and each message fully replaces the AI-authored content
for that topic. This is the live workflow — expect it to continue
until every unit is done.

**Per-topic procedure:**

1. User pastes content labeled like `Unit N – Topic M: <Title>`.
2. Check whether the content maps to exactly one existing sidebar
   topic, or spans several existing pages (this has happened
   repeatedly in Unit 1 — one user "topic" often covers what used to
   be 2–8 separate AI-authored pages). If it spans more than one
   existing page, **ask the user via AskUserQuestion** whether to
   merge them into a single page (keeping one canonical URL, deleting
   the others) or keep them separate — do not assume.
3. Rewrite: `<title>`/meta description, `<h1>`, and the full body,
   following the **user's own heading structure verbatim** — do not
   force their content into the old 21-section template. Reuse
   existing site components wherever the content matches them (see
   below). Regenerate the `window.<name>Quiz` array from the user's
   MCQs (keep the existing variable name if the page already had one).
   Regenerate the interview-question accordion from the user's
   questions — if the user splits them Beginner/Intermediate (or
   similar), use `<h3>` subheadings inside the `#interview` section
   instead of the old Easy/Medium/Hard/HR/Conceptual/Scenario
   six-category scheme.
4. **Never leave numbered `<h2>` headings** (e.g. `<h2>1. Title</h2>`)
   — strip any leading number-dot prefix. This was an explicit
   site-wide cleanup (commit `2cb5884`) and keeps recurring by accident
   whenever the user's source material itself uses numbered sections —
   always `perl -pi -e 's{<h2>\d+\.\s*}{<h2>}g'` after drafting.
5. When merging pages: delete the extra file(s) via `git rm`, sweep
   the sidebar `<a class="sidebar-link">` block for that topic across
   **every** page that has a copy (`index.html`, all of
   `pages/unit1/*.html`, all of `pages/unit2/*.html`, with the right
   `../unit1/` or `pages/unit1/` href prefix per file), and fix the
   prev/next `topic-nav-footer` links on the pages immediately
   before/after the merged range (their labels go stale even when
   hrefs still resolve).
6. Verify before committing: `grep -c "question:"` (expect 5),
   `grep -o '<h2>[^<]*</h2>'` (no leading numbers, no gaps), sidebar
   link count (`grep -c 'sidebar-link" href="pages/unit1/' index.html`
   or the unit2 equivalent), and that no stale filename references to
   any just-deleted page remain anywhere (`grep -rl <old-filename>
  . --include=*.html`).
7. Commit with a plain descriptive message (see git rules below) —
   one commit per topic (or per merge), no push unless asked.

## Progress

- **Foundation** — done. Design system, shell (sidebar/floating
  controls/search), homepage.
- **Unit 1 — content fully replaced with user-authored material,
  reduced from 28 AI-authored topics down to 12.** Every page in
  `pages/unit1/` now holds the user's own material, topic by topic, in
  official syllabus order. Six merges happened along the way (each
  confirmed with the user first):
  - `evolution-of-programming.html` ← merged with the old
    `programming-languages.html` (deleted).
  - `problem-solving.html` ← merged with the old
    `sequential-logic.html` (deleted).
  - `introduction-to-c.html` ← merged with the old `history-of-c.html`,
    `features-of-c.html`, `applications-of-c.html`, `c-compiler.html`
    (all four deleted) — title became "Introduction to C Program and C
    Compilers".
  - `compilation-process.html` ← merged with the old `source-code.html`,
    `object-code.html`, `executable-code.html`, `execution-process.html`,
    `assembler.html`, `linker.html`, `loader.html` (all seven deleted) —
    title became "Compilation (Source Code → Object Code → Executable
    Code)".
  - `interpreter.html` ← merged with the old
    `compilers-and-interpreters.html` (deleted) — title became
    "Interpreters, Linkers, and Loaders" (re-covers linker/loader as
    review since those moved into the compilation-process merge above).
  - `debugging.html` ← renamed in place (no file merge) to "Execution
    and Debugging" — content now covers program execution *and*
    debugging together; sidebar label updated site-wide.
  - `comments.html` ← merged with the old `single-line-comments.html`
    and `multi-line-comments.html` (both deleted) — title became
    "Single-Line and Multi-Line Comments", the closing topic of Unit 1.
  - `algorithms.html`, `pseudocode.html`, `flowcharts.html`,
    `structure-of-c-program.html`, `operating-systems.html` were
    replaced 1:1, no merge needed.
  - Final Unit 1 topic list/order (12): Evolution of Programming &
    Languages → Problem Solving & Sequential Logic → Algorithms →
    Pseudocode → Flowcharts → Introduction to C Program and C Compilers
    → Structure of C Program → Compilation (Source Code → Object Code
    → Executable Code) → Interpreters, Linkers, and Loaders →
    Operating Systems → Execution and Debugging → Single-Line and
    Multi-Line Comments.
- **Unit 2 — C Building Blocks & Data Types, user-content replacement
  in progress.** 29 AI-authored pages still exist in `pages/unit2/`
  (see folder structure below); being replaced topic by topic in
  syllabus order, same procedure as Unit 1. Done so far:
  `tokens.html` ("C Tokens"), `keywords.html` ("Keywords in C") — both
  1:1 replacements, no merge needed. Everything else in
  `pages/unit2/*.html` still holds the **old AI-generated content**
  (the `add.c`/`profile.c` running-example material, 21-section
  template) and should be treated as not-yet-updated, not as final.
- The pre-pivot Unit 2 build notes (G1–G5 groups, the `add.c`/
  `profile.c` recurring examples, the old 21-section template) describe
  the *original AI-authored* version of Unit 2 that is now being
  overwritten page by page. Don't use those old examples as a
  reference for new content — follow whatever the user pastes.

## Folder structure

```text
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
├── pages/unit1/          12 topic pages, user-authored content (see
│                         Progress above for the full merge history)
├── pages/unit2/          29 topic pages; only tokens.html and
│                         keywords.html are user-authored so far, the
│                         rest still hold pre-pivot AI-generated content
└── docs/superpowers/     specs/ and plans/ from the brainstorming and
                          writing-plans skills (describe the OLD
                          AI-authored build; superseded by the current
                          user-content-replacement workflow above)
```

## Important caveat: duplicated shell markup

There is no templating engine. The sidebar, floating theme-toggle,
floating social links, and search panel markup in `index.html` must be
copied into every new page (unit pages, topic pages) rather than
included from one source. **When the shell changes, every page that
has a copy needs the same edit.** When merging or renaming a topic, the
sidebar `<a class="sidebar-link">` line for it must be swept across
**every** page in the site, not just the page being edited.

There is **no top navbar** — it was removed. The theme toggle and
social links (GitHub/LinkedIn) are `position: fixed` buttons floating
top-right, independent of any nav bar (see `.theme-toggle-float` /
`.social-float` in `css/layout.css`).

## Sidebar

- **Sticky**, not scroll-with-page: `position: sticky; top: 0; height:
  100vh` with its own `overflow-y: auto` (see `.sidebar` in
  `css/layout.css`). Don't reintroduce `grid-row: 2` — content and
  sidebar both use `grid-row: 1` since the navbar row was removed.
- **Both Unit 1 and Unit 2 are accordions**, not links to an overview
  page — `<button class="sidebar-link sidebar-toggle" id="unit1-toggle">`
  / `id="unit2-toggle"` expanding `<div class="sidebar-submenu"
  id="unit1-submenu">` / `id="unit2-submenu">`. `js/sidebar.js`
  auto-opens whichever submenu contains the active link.
- Units 3-5 remain single collapsed links to their own not-yet-built
  `index.html` placeholders — don't build the accordion pattern for
  them until each unit actually has multiple topic pages.
- **Active-link matching** compares `link.pathname` (resolved full
  path) against `location.pathname`, not basenames — multiple sidebar
  links share the basename `index.html` (Units 3-5's placeholders), so
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

Each topic page (e.g. `pages/unit1/*.html`, `pages/unit2/*.html`) now
follows **the user's own content structure/headings**, not a fixed
template — see "Current mode" above. Reusable site components to map
the user's material onto wherever it fits:

- **Diagrams**: `css/diagrams.css` — `.flowchart`/`.flow-box`/
  `.flow-box-start`/`.flow-box-end`/`.flow-box-decision`/`.flow-arrow`
  for any "Step 1 → Step 2 → ..." or process-flow content (arrows are
  empty `<div class="flow-arrow"></div>`, never stray glyphs);
  `.flow-branch-row`/`.flow-branch-col`/`.flow-branch-label` for
  Yes/No decision branches (see `flowcharts.html` for the pattern);
  `.memory-diagram`/`.memory-cell`/`.memory-cell-label`/
  `.memory-cell-value` for RAM/variable-storage illustrations;
  `.timeline`/`.timeline-item`/`.timeline-item-year` for chronological
  content.
- **Comparison tables**: plain `<table>` (no class) works site-wide
  with no extra CSS needed for simple cases (see e.g.
  `structure-of-c-program.html`'s Dry Run table). For side-by-side
  comparison tables specifically, add a small local `.compare-table`
  CSS block to the page's `<style>` if it isn't already there
  (`width:100%; border-collapse:collapse` + bordered `th`/`td` + a
  subtle `th` background) — this has been copy-pasted onto most
  Unit 1 pages now; check for it before re-adding.
- **MCQs**: `css/quiz.css` + `js/quiz.js`. Each page defines a
  `window.<name>Quiz` array (`{ question, options: [4 strings],
  correctIndex, explanation }`) and a `<div class="quiz"
  data-quiz-source="<name>Quiz">`. **Always exactly 5 questions per
  topic**, taken directly from the user's provided MCQs (rewrite
  distractor text as needed for the widget's format, but don't invent
  new questions). The widget renders one question at a time with a
  "Question X of 5" progress line and a Next/Try Again flow — this is
  correct, expected behavior, not a bug (a user has asked about this
  before).
- **Interview Questions**: click-to-reveal accordion, not static text.
  `css/components.css` (`.interview-item`/`.interview-question`/
  `.interview-answer`) + `js/accordion.js`. If the user's questions are
  split into groups (e.g. Beginner/Intermediate), render each group
  under its own `<h3>` inside the `#interview` section; otherwise a
  flat list of `.interview-item`s is fine. Every question needs a
  written answer synthesized from the user's material — don't ship a
  question without one.
- **Code blocks**: `.code-block`/`.code-block-header`/`.copy-btn` +
  `js/copy-code.js` wires the copy button to the clipboard
  automatically — no per-page JS needed. `copy-btn` and
  `interview-question` buttons intentionally have no `type="button"`
  attribute site-wide (pre-existing pattern, not a bug to fix).
- **No leading numbers on `<h2>` headings**, anywhere, ever — see step
  4 of the per-topic procedure above.
- No on-page section table-of-contents, no Chapter Summary/Cheat Sheet
  sections — both were built once, then removed per user request;
  don't re-add either.

## Search

`js/search.js` renders results from `window.searchIndex` (array of
`{ title, description, url }`). It is currently empty by design —
populate it once more content exists, no UI changes needed. The
search-open button was removed along with the navbar; the search
overlay is still reachable via `Ctrl/Cmd+K`.

## Workflow rules (from the project brief)

- Work topic-by-topic, in the order the user pastes content (which
  follows the official syllabus order). Do not get ahead of the user
  or invent content for topics not yet provided.
- When a user's pasted topic content spans multiple existing
  AI-authored pages, always confirm the merge scope with
  AskUserQuestion before deleting/merging anything — don't assume.
- After each topic (or merge): verify (MCQ count, heading numbering,
  sidebar link counts, no stale filename references), then commit with
  a clear message. Push only when asked.
- Git commits must **not** include `Co-Authored-By` trailers or any AI
  attribution — commits should read as authored by the repo owner.

## Commands

No package manager, no build, no test runner yet. To sanity-check JS
syntax: `node --check js/<file>.js`. To preview: open `index.html` in
a browser, or `Start-Process index.html` in PowerShell. No
browser-automation/screenshot tool is available in this environment —
visual/interactive verification (theme toggle, accordions, quiz
scoring, responsive breakpoints) is a manual human step, not something
an agent here can self-verify.
