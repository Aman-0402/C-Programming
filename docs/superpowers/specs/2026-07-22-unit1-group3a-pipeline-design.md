# Unit 1 / Group 3a: The Pipeline Itself — Design

Status: approved
Date: 2026-07-22
Part of: Interactive C Programming eBook (multi-sub-project build)
Depends on: Unit 1 / Group 2 (docs/superpowers/specs/2026-07-22-unit1-group2-getting-to-know-c-design.md)

## Purpose

First half of Unit 1's compilation-pipeline chapter (originally "Group 3"
in the roadmap, split in two for size — matching the 5-7 topic size of
prior groups). Pays off Group 2's Structure of C Program page, which
deferred "how do I actually compile and run this" with a forward
pointer — this sub-project is where that gets answered.

## Topics covered (in page order)

1. C Compiler
2. Compilation Process
3. Source Code
4. Object Code
5. Executable Code
6. Execution Process

(Remaining Group 3 topics — Debugging, Operating Systems, Interpreter,
Compiler-as-a-general-concept, Assembler, Linker, Loader — are Group
3b, a separate later sub-project. Group 4 — Comments — follows after
that, completing Unit 1.)

## New Recurring Example

A fresh program, `add.c`, introduced on the C Compiler page and traced
through all 6 pages:

```c
#include <stdio.h>

int main() {
    printf("The sum of 5 and 3 is 8\n");
    return 0;
}
```

Deliberately uses only concepts already taught (program structure,
`printf`, `main`, `return`) — no variables or operators, since those
are Unit 2 topics not yet covered. Not a reuse of Group 2's Hello
World example, per explicit direction — a fresh program for this
chapter's own recurring thread.

## Conventions Reused (unchanged from Groups 1-2)

- Full shell markup copied from the established template
  (`pages/unit1/flowcharts.html` / `structure-of-c-program.html`).
- 5 MCQs per page via `js/quiz.js` + a `window.<name>Quiz` array.
- Interview Questions as a click-to-reveal accordion via
  `js/accordion.js` — every question gets a written answer.
- No on-page section table-of-contents.
- No Chapter Summary / Cheat Sheet sections.
- Sections numbered sequentially per page with no gaps (this was a
  review-caught defect in Group 2 — verify it explicitly this time).
- Code blocks use the existing `.code-block`/`.code-block-header`/
  `.copy-btn` chrome (auto-wired by `js/copy-code.js`).

## Content Approach

- **C Compiler:** what a compiler is generally, real-life analogy (a
  translator converting a book into another language), why C needs
  one. Introduces `add.c` as the running example for the chapter.
- **Compilation Process:** the practical payoff of Group 2's deferred
  pointer — real `gcc add.c -o add` commands, and the 4 internal
  stages (preprocessing → compilation → assembly → linking) shown as
  a `.flowchart` pipeline diagram (reusing `css/diagrams.css` classes,
  no new CSS needed).
- **Source Code:** what `add.c` itself is — human-readable, the input
  to the pipeline.
- **Object Code:** the intermediate `add.o` artifact — not yet a
  runnable program, why it exists as a separate step.
- **Executable Code:** the final `add`/`add.exe` — what makes it
  different from object code (linked, complete, runnable).
- **Execution Process:** what happens when you run `./add` — the OS
  loads it into memory, the CPU executes it, output appears. Ends
  with the chapter's mini project.

Each page's Visual Explanation section reuses the same `.flow-box`
pipeline chain (Source → Preprocessor → Compiler → Object Code →
Linker → Executable → Execution), with the current page's stage
visually highlighted — reinforcing the whole journey every time
without duplicating identical prose.

Assembler, Linker, and Loader get only one-line forward-reference
mentions in this sub-project (e.g. "the Linker's exact job is covered
in the next chapter") — their full treatment is Group 3b's job,
matching the same defer-detail pattern Group 2 used for compilation.

## Mini Project (last page: Execution Process)

"Trace Your Own Program." Pick any short C program idea (or reuse
`add.c`), write out — in plain English — what happens to it at each
pipeline stage (source → preprocessed → compiled → assembled →
linked → executed), and predict its console output before running it
mentally. Capstones the "pipeline" chapter the same way Group 1 and
Group 2's mini-projects capstoned theirs.

## Out of Scope (deferred)

- Assembler, Linker, Loader as their own topics (Group 3b).
- Debugging, Operating Systems, Interpreter, general Compiler-concept
  topics (Group 3b).
- Comments (Group 4).
- Unit 2 (not started until all of Unit 1 is complete).
- Populating `window.searchIndex` (still deferred).
