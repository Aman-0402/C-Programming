# Unit 1 / Group 1: Programming Fundamentals — Design

Status: approved
Date: 2026-07-22
Part of: Interactive C Programming eBook (multi-sub-project build)
Depends on: Foundation sub-project (docs/superpowers/specs/2026-07-22-foundation-design.md)

## Purpose

First content sub-project. Ships 7 of Unit 1's 28 topics — the
"Programming Fundamentals" cluster that comes before any real C syntax
is introduced — using the full 21-section template from the master
project brief. Also introduces shared reusable infrastructure (diagram
CSS, quiz engine, copy-code behavior) that every later topic-group
sub-project will reuse without rebuilding.

## Topics covered (in page order)

1. Evolution of Programming
2. Programming Languages
3. Problem Solving
4. Sequential Logic
5. Algorithms
6. Pseudocode
7. Flowcharts

(Remaining Unit 1 topics — Introduction to C, compilation pipeline,
comments — are separate later sub-projects per the roadmap.)

## New Shared Infrastructure (reused by all future units, not just this one)

- `css/diagrams.css` — flowchart boxes/arrows, memory-diagram cells,
  timeline/step blocks. Implements the master spec's "HTML/CSS
  illustration, no images" requirement for Visual Explanation, Flow
  Diagram, and Memory Diagram sections.
- `css/quiz.css` — MCQ option list styling, selected/correct/incorrect
  states (`--color-success` / `--color-danger`), score-tally box.
- `js/quiz.js` — generic interactive quiz engine. Reads a `quizData`
  array defined in a small inline `<script>` per page
  (`{ question, options: [4 strings], correctIndex, explanation }`),
  renders radio-button options + a submit button, shows instant
  correct/incorrect feedback with the explanation, tallies score at
  the end with a "Try Again" reset. One engine file, many data arrays.
- `js/copy-code.js` — wires every `.copy-btn` inside a `.code-block` to
  `navigator.clipboard.writeText(...)`, flips the button label to
  "Copied!" for 1.5s, then reverts.

## Page Structure

```
pages/unit1/
├── index.html                      (unit overview: 7 topic cards)
├── evolution-of-programming.html
├── programming-languages.html
├── problem-solving.html
├── sequential-logic.html
├── algorithms.html
├── pseudocode.html
└── flowcharts.html
```

Each topic page:
- Reuses the shared shell markup (topnav, sidebar, search panel,
  footer) copy-pasted per the documented AGENTS.md caveat, plus new
  `<link>`s for `css/diagrams.css` and `css/quiz.css` and new
  `<script>`s for `js/quiz.js` and `js/copy-code.js`.
- Adds a sticky in-page "on this page" section-jump nav (anchor links
  to each of its sections).
- Ends with prev/next links walking through the 7 topics in the order
  listed above (first page has no "prev", last has no "next" — links
  instead to the Unit 1 index or the not-yet-built Group 2 landing,
  whichever exists at build time — see Task-level detail in the plan).
- Runs the full 21-section template; sections that don't apply to a
  conceptual (pre-syntax) topic are skipped outright, not stubbed with
  placeholder content (e.g. "Evolution of Programming" has no memory
  diagram or syntax section).

**Sidebar update:** the shared sidebar's Unit 1 entry expands from one
link into a nested list of the 7 topic links (this sub-project's
topics only — the other 21 Unit 1 topics get added to this same nested
list by their own later sub-projects). This requires editing the
sidebar copy in `index.html` (homepage) and in all 8 new Unit 1 pages
identically.

## Content Rules

- Every hard concept: real-life analogy first, then the term.
- "Step-by-step Code" sections use pseudocode / plain-English algorithm
  steps inside the existing `.code-block` chrome — no real C, since C
  syntax isn't introduced until the next sub-project (Group 2).
- MCQs: minimum 20 per topic, each with 4 options, one correct answer,
  and an explanation — rendered through `js/quiz.js`, not static text.
- Interview questions cover Easy / Medium / Hard / HR / Conceptual /
  Scenario-based, per the master spec.
- Exercises cover Easy / Medium / Hard.
- One mini project at the end of the 7th page (Flowcharts), scoped to
  the whole "Programming Fundamentals" chapter rather than per-topic,
  per the master spec's "one mini project after each major chapter."

## Out of Scope (deferred)

- Real C syntax/compilable code (starts in the Group 2 sub-project:
  "Getting to Know C").
- Populating `window.searchIndex` (still deferred — a dedicated search
  sub-project will backfill it once more content exists, to avoid
  touching the same array from every content sub-project ad hoc).
- The rest of Unit 1 (21 remaining topics — Groups 2-4, per the earlier
  scope-decomposition decision).
- Any cross-unit "next unit" navigation beyond Unit 1's own topics.
