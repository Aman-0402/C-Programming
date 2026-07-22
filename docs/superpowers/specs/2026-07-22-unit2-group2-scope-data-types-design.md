# Unit 2 / Group 2: Scope & Data Types — Design (Fast-Track)

Status: approved
Date: 2026-07-22
Depends on: Unit 2 / Group 1 (docs/superpowers/specs/2026-07-22-unit2-group1-tokens-naming-design.md)

## Topics (in page order)

1. Scope
2. Binding
3. Storage Classes
4. Integer Types
5. Floating Point Types
6. Character Type
7. Strings

## New Recurring Example

Introduced on Integer Types, extended through Floating Point Types,
Character Type, and Strings:

```c
#include <stdio.h>

int main() {
    int age = 20;
    float height = 5.9;
    char grade = 'A';
    char name[] = "Alex";

    printf("Name: %s\n", name);
    printf("Age: %d\n", age);
    printf("Height: %.1f\n", height);
    printf("Grade: %c\n", grade);

    return 0;
}
```

`add.c` (Unit 1/G1's legacy example) stays referenced for the
int-only topics (Scope, Binding, Storage Classes) where a data-type
variety isn't needed.

## Conventions Reused (verbatim, unchanged)

- Shell/head/script pattern copied from the most recent approved page
  (`pages/unit2/values.html`).
- 5 MCQs/page via `js/quiz.js`, 6-item interview accordion via
  `js/accordion.js`.
- Sequential `<h2>` numbering per page, no gaps — verify explicitly.
- No on-page TOC, no Chapter Summary/Cheat Sheet.
- `.flow-arrow` divs stay empty.
- Mini project only on the last page (Strings): build a small profile
  program of the reader's own choosing using all 4 data types covered.
- Sidebar submenu grows to 14 links (Unit 2's accordion) — every
  existing page (homepage + all Unit 1 + all Unit 2 G1 pages) needs
  the update.

## Out of Scope

- Groups 3-5 of Unit 2.
- Unit 3+.
- `window.searchIndex` population (still deferred).
