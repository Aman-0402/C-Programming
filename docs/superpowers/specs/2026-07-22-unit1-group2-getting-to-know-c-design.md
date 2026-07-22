# Unit 1 / Group 2: Getting to Know C — Design

Status: approved
Date: 2026-07-22
Part of: Interactive C Programming eBook (multi-sub-project build)
Depends on: Unit 1 / Group 1 (docs/superpowers/specs/2026-07-22-unit1-group1-programming-fundamentals-design.md)

## Purpose

Second Unit 1 content sub-project. Ships the 5 "Getting to Know C"
topics — the reader's first exposure to C itself, culminating in the
first real C code they'll see in this course. Reuses all Group 1
shared infrastructure (quiz engine, diagram CSS, interview accordion,
copy-code) with no new shared CSS/JS additions.

## Topics covered (in page order)

1. Introduction to C
2. History of C
3. Features of C
4. Applications
5. Structure of C Program

(Remaining Unit 1 topics — the compilation pipeline and comments —
are separate later sub-projects, Groups 3-4, per the roadmap. Unit 2
does not start until all of Unit 1 is done, since Unit 2 assumes the
reader has already seen a basic C program's structure.)

## File Names

```
pages/unit1/introduction-to-c.html
pages/unit1/history-of-c.html
pages/unit1/features-of-c.html
pages/unit1/applications-of-c.html
pages/unit1/structure-of-c-program.html
```

## Conventions Reused (unchanged from Group 1)

- Full shell markup copied from the established template
  (`pages/unit1/evolution-of-programming.html`): head link order,
  topnav-free shell (sticky sidebar, floating theme-toggle/social
  links), search panel, footer.
- 5 MCQs per page via `js/quiz.js` + a `window.<name>Quiz` array
  (`{ question, options: [4], correctIndex, explanation }`).
- Interview Questions as a click-to-reveal accordion via
  `js/accordion.js` (`.interview-item`/`.interview-question`/
  `.interview-answer`) — every question gets a written answer.
- No on-page section table-of-contents.
- No Chapter Summary / Cheat Sheet sections.
- 21-section master template, sections skipped (not stubbed) when not
  applicable to a given topic.
- Sections numbered sequentially per page with no gaps, same as
  Group 1's renumbering.

## Content Approach

**Topics 1-4 (Introduction, History, Features, Applications):**
conceptual, no real C code yet.
- Introduction to C: what C is, why it's foundational, real-life
  analogy (a "root" language many others borrow from).
- History of C: `.timeline` (reused class from `css/diagrams.css`) —
  Dennis Ritchie / Bell Labs 1972 through modern standards (C89/ANSI,
  C99, C11, C17/C23).
- Features of C: `.feature-grid`/`.card` (reused from
  `css/components.css`) — simplicity, portability, speed, structured/
  modular design via functions, low-level access, rich standard
  library.
- Applications: `.feature-grid`/`.card` — operating system kernels,
  embedded systems, game engines, compilers/interpreters for other
  languages, device drivers.

**Topic 5 (Structure of C Program) — the pivot point of the chapter:**
- First real C code appears here: a Hello World program in a
  `.code-block` (reused chrome, copy button wired automatically by
  `js/copy-code.js`).
- Visual Explanation: labeled diagram of the program's parts
  (preprocessor directive, `main()` function, statements, `return`)
  using `.flow-box`-style labeled blocks or a simple annotated code
  layout — no new CSS classes needed, reuse what exists.
- Dry Run: traces execution top-to-bottom (preprocessor directive
  included first, then `main()` starts, each statement runs in order,
  `return 0` ends the program) and states the exact output.
- Common Mistakes: missing semicolon, missing `return 0;`, case
  sensitivity (`main` vs `Main`), forgetting `#include <stdio.h>`
  before using `printf`.
- Explicitly defers "how do I actually compile and run this" to the
  not-yet-built compilation-pipeline group (Group 3) — a one-line
  forward pointer only, no compile/run instructions in this topic, per
  your decision.
- **Mini Project** (chapter capstone, this page only): "Write your
  first C program" — print your name and one fact about yourself,
  applying the exact structure just taught.

## Navigation Updates Required

- Sidebar's Unit 1 submenu grows from 7 links to 12. Every existing
  page that has the sidebar (homepage + 7 Group 1 topic pages) needs
  its submenu updated to include the 5 new links, alongside the 5 new
  pages themselves — 13 files touched for sidebar consistency.
- `pages/unit1/flowcharts.html`'s end-of-chapter footer button changes
  from "Back to Unit 1" (`btn-primary` linking to
  `evolution-of-programming.html`) back to a normal "Next: <topic>"
  pattern, now pointing to `introduction-to-c.html`.
- Prev/next chain: `flowcharts.html` → `introduction-to-c.html` →
  `history-of-c.html` → `features-of-c.html` → `applications-of-c.html`
  → `structure-of-c-program.html` (last page — no "next" link yet,
  since Group 3 doesn't exist; same "no next page" pattern Group 1's
  last page used, adapted since this is no longer the end of Unit 1).

## Out of Scope (deferred)

- How to compile/run a C program (Group 3: C Compiler, Compilation
  Process, Source/Object/Executable Code, Execution Process,
  Debugging, OS, Interpreter, Assembler, Linker, Loader).
- Comments (Group 4).
- Unit 2 (not started until all of Unit 1 is complete).
- Populating `window.searchIndex` (still deferred, per Group 1's spec).
