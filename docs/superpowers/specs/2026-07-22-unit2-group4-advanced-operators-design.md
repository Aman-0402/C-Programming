# Unit 2 / Group 4: Advanced Operators — Design (Fast-Track)

Status: approved
Date: 2026-07-22
Depends on: Unit 2 / Group 3 (docs/superpowers/specs/2026-07-22-unit2-group3-values-operators-design.md)

## Topics (in page order)

1. Assignment Operators
2. Comma Operator
3. sizeof Operator
4. Conditional (Ternary) Operator
5. Bitwise Operators
6. Operator Precedence
7. Associativity
8. Arrow Operator

## Example Reuse

Extends `add.c`'s `a = 5, b = 3`:

- Assignment: `int total = 0; total += a;` (compound assignment)
- Comma: `int i = 0, j = 5;` (declaration usage)
- sizeof: `sizeof(a)`, `sizeof(int)`
- Conditional: `int max = (a > b) ? a : b;`
- Bitwise: `a & b`, `a | b`, `a ^ b`, `~a`, `a << 1`, `a >> 1`
- Precedence/Associativity: conceptual, tracing `sum = a + b * 2`-style expressions

**Arrow operator (`->`) is a conceptual preview only** — no real running
code, since it requires pointers and structs, not taught until Unit
4/5. Explains what it's for and points forward, per explicit decision.

## Conventions Reused (verbatim, unchanged)

- Shell/head/script pattern copied from `pages/unit2/logical-operators.html`.
- 5 MCQs/page, 6-item interview accordion, sequential `<h2>` numbering
  (verify explicitly), no TOC/summary/cheat-sheet, empty flow-arrows.
- Mini project on Associativity (last page with real practice code —
  Arrow, immediately after, is conceptual-only and unsuitable for a
  hands-on capstone).
- Sidebar submenu grows to 29 links — every existing page (50 total)
  needs the update.

## Out of Scope

- Group 5 of Unit 2 (final group).
- Unit 3+.
- Real Arrow operator code (deferred to Unit 4/5 when pointers/structs
  are taught).
- `window.searchIndex` population.
