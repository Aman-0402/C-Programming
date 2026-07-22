# Unit 1 / Group 3b + Group 4 — Design (Fast-Track)

Status: approved (compressed process, per explicit user direction to move fast)
Date: 2026-07-22
Depends on: Group 3a (docs/superpowers/specs/2026-07-22-unit1-group3a-pipeline-design.md)

## Purpose

Finishes Unit 1. Two sub-projects built back to back, same session, same
established conventions — no new design discussion since every pattern
(shell, quiz, accordion, numbering, diagrams) is already locked in from
Groups 1-3a.

## Group 3b — Translators & Support Concepts (7 topics, 19th-25th overall)

Order (narrative, not spec's raw list order — deepens Group 3a's stages
then widens out to system-level context):

1. **Assembler** — `assembler.html` — deepens the "assembly" stage from
   Compilation Process: converts assembly instructions to object code.
2. **Linker** — `linker.html` — deepens the "linking" stage: combines
   object code + library code into the executable.
3. **Loader** — `loader.html` — deepens Execution Process: the OS
   component that loads an executable into memory to run it.
4. **Interpreter** — `interpreter.html` — contrasts with compilers:
   translates and executes line-by-line, no separate executable
   produced.
5. **Compilers & Interpreters (compared)** — `compilers-and-interpreters.html`
   — the syllabus's standalone generic "Compiler" topic, deduped with
   Interpreter into one direct comparison page (both translate code,
   different strategy/tradeoffs) rather than a near-duplicate of the
   already-shipped C Compiler page.
6. **Operating Systems** — `operating-systems.html` — ties Loader and
   Execution Process together: the OS's role in running any program,
   not just C ones.
7. **Debugging** — `debugging.html` — practical capstone. Carries this
   group's mini project: "find and fix 3 planted bugs" using everything
   learned across the Pipeline + Translators chapters.

Recurring example: still `add.c` where relevant (e.g. Assembler/Linker/
Loader tracing its continued journey); Debugging introduces small
broken variants of it to fix.

## Group 4 — Comments (3 topics, 26th-28th overall, finishes Unit 1)

1. **Comments** — `comments.html` — what/why of comments in general.
2. **Single Line Comments** — `single-line-comments.html` — `//` syntax.
3. **Multi Line Comments** — `multi-line-comments.html` — `/* */` syntax.
   Carries Unit 1's final mini project: "document add.c with both
   comment styles" — a fitting close to the whole unit.

## Conventions (unchanged, verbatim reuse)

- Shell/head/script pattern copied from `pages/unit1/execution-process.html`
  (most recent approved page).
- 5 MCQs/page via `js/quiz.js`, `window.<name>Quiz` arrays.
- 6-item interview accordion via `js/accordion.js`, every question
  answered.
- Sequential `<h2>` numbering per page, no gaps — verify explicitly
  every time (this has been the one recurring defect across prior
  sub-projects).
- No on-page TOC, no Chapter Summary/Cheat Sheet.
- `.flow-arrow` divs stay empty (`<div class="flow-arrow"></div>`) —
  no stray glyphs, per the fix applied in Group 3a's review.
- Mini project only on each group's last page (Debugging for 3b;
  Multi Line Comments for Group 4 — also Unit 1's final capstone).
- Sidebar submenu grows to 25 links after 3b, 28 after Group 4 — every
  existing page needs the update each time, same as before.

## Out of Scope

- Unit 2 (starts only after this — Unit 1 will be fully complete).
- `window.searchIndex` population (still deferred).
