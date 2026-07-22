# Unit 2 / Group 1: Tokens & Naming — Design (Fast-Track)

Status: approved
Date: 2026-07-22
Depends on: Unit 1 (fully complete)

## Purpose

First Unit 2 sub-project. Establishes the pattern for pages/unit2/,
converts Unit 2's sidebar placeholder into an accordion (matching
Unit 1's), and evolves the recurring `add.c` example to use real
variables — the exact concept this group teaches.

## Topics (in page order)

1. Tokens
2. Keywords
3. Identifiers
4. Naming Rules
5. Variables
6. Constants
7. Values

## New Recurring Example

Introduced on the Variables page, reused on Constants/Values:

```c
#include <stdio.h>

int main() {
    int a = 5;
    int b = 3;
    int sum = a + b;
    printf("The sum of %d and %d is %d\n", a, b, sum);
    return 0;
}
```

Same output as Unit 1's `add.c` ("The sum of 5 and 3 is 8"), now using
declared variables instead of a hardcoded string. Constants page adds
a `const` variant; Values page discusses what's actually stored in
`a`, `b`, and `sum` at runtime.

## Sidebar Change

Unit 2's current placeholder (`<a href="pages/unit2/index.html">C
Building Blocks & Data Types</a>`) becomes an accordion toggle +
submenu, identical pattern to Unit 1's (`#unit2-toggle` /
`#unit2-submenu`), across all existing files (homepage + all 28 Unit 1
pages) plus the 7 new pages. No `pages/unit2/index.html` overview page
— matches Unit 1's decision to skip that pattern entirely.

## Conventions Reused (verbatim, unchanged)

- Shell/head/script pattern copied from the most recent approved page
  (`pages/unit1/multi-line-comments.html`).
- 5 MCQs/page via `js/quiz.js`.
- 6-item interview accordion via `js/accordion.js`, every question
  answered.
- Sequential `<h2>` numbering per page, no gaps — verify explicitly.
- No on-page TOC, no Chapter Summary/Cheat Sheet.
- `.flow-arrow` divs stay empty, no stray glyphs.
- Mini project only on the last page (Values): declare variables and
  constants for a small program idea of the reader's choosing.

## Out of Scope

- Groups 2-5 of Unit 2 (Scope/Data Types, Operators, Advanced
  Operators, Increment/Decrement/I-O).
- Unit 3+.
- `window.searchIndex` population (still deferred).
