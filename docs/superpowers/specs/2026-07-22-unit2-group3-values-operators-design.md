# Unit 2 / Group 3: Values & Basic Operators — Design (Fast-Track)

Status: approved
Date: 2026-07-22
Depends on: Unit 2 / Group 2 (docs/superpowers/specs/2026-07-22-unit2-group2-scope-data-types-design.md)

## Topics (in page order)

1. L-value
2. R-value
3. Type Conversion
4. Operators (overview)
5. Arithmetic Operators
6. Relational Operators
7. Logical Operators

## Example Reuse (no new recurring program)

L-value, R-value, Type Conversion, and Operators-overview are
conceptual — reference `add.c`'s `a`, `b`, `sum` (Unit 2/G1's example).

Arithmetic/Relational/Logical get concrete extensions of `add.c`'s
`a = 5, b = 3`:

```c
int diff = a - b;
int product = a * b;
int quotient = a / b;
int remainder = a % b;
```

```c
int isGreater = (a > b);   // relational, prints as 0/1 with %d
```

```c
int bothPositive = (a > 0) && (b > 0);   // logical
```

## Conventions Reused (verbatim, unchanged)

- Shell/head/script pattern copied from the most recent approved page
  (`pages/unit2/strings.html`).
- 5 MCQs/page, 6-item interview accordion, sequential `<h2>` numbering
  (verify explicitly), no TOC/summary/cheat-sheet, empty flow-arrows.
- Mini project on the last page (Logical Operators): combine
  relational + logical operators into a small decision-check program
  (e.g. checking if a number is in a valid range).
- Sidebar submenu grows to 21 links — every existing page (43 total)
  needs the update.

## Out of Scope

- Groups 4-5 of Unit 2.
- Unit 3+.
- `window.searchIndex` population.
