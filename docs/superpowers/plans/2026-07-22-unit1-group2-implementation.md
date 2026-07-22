# Unit 1 / Group 2: Getting to Know C Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship 5 new Unit 1 topic pages (Introduction to C → Structure of C Program) and update sidebar navigation across every existing page, per `docs/superpowers/specs/2026-07-22-unit1-group2-getting-to-know-c-design.md`.

**Architecture:** No new shared CSS/JS — 100% reuse of Group 1's infrastructure (`css/diagrams.css`, `css/quiz.css`, `js/quiz.js`, `js/accordion.js`, `js/copy-code.js`, and the shell pattern locked in `pages/unit1/evolution-of-programming.html`). This sub-project is pure content + one navigation-wiring task.

**Tech Stack:** Same as Group 1 — HTML5, CSS3, vanilla JS.

**Testing approach:** Same as prior sub-projects — write file → structural/count verification via `Select-String`/`node --check` → commit. No test framework exists for this static site.

---

## Task 1: Sidebar navigation update (13 existing files) + Flowcharts footer button

**Files (all modified, none created):**
- `index.html`
- `pages/unit1/evolution-of-programming.html`
- `pages/unit1/programming-languages.html`
- `pages/unit1/problem-solving.html`
- `pages/unit1/sequential-logic.html`
- `pages/unit1/algorithms.html`
- `pages/unit1/pseudocode.html`
- `pages/unit1/flowcharts.html` (also gets the footer button change, see Step 2)

**Context:** Every one of these files has a `<div class="sidebar-submenu" id="unit1-submenu">` block ending with a link to `flowcharts.html` (or `pages/unit1/flowcharts.html` in `index.html`'s case) immediately before the submenu's closing `</div>`. This step adds 5 new links after the Flowcharts link, in all 13 files.

- [ ] **Step 1: Insert 5 new sidebar links in every file**

In **`index.html`**, find:
```html
      <a class="sidebar-link" href="pages/unit1/flowcharts.html"><i class="fa-solid fa-sitemap"></i><span class="sidebar-label">Flowcharts</span></a>
      </div>
```
Replace with:
```html
      <a class="sidebar-link" href="pages/unit1/flowcharts.html"><i class="fa-solid fa-sitemap"></i><span class="sidebar-label">Flowcharts</span></a>
      <a class="sidebar-link" href="pages/unit1/introduction-to-c.html"><i class="fa-solid fa-c"></i><span class="sidebar-label">Introduction to C</span></a>
      <a class="sidebar-link" href="pages/unit1/history-of-c.html"><i class="fa-solid fa-scroll"></i><span class="sidebar-label">History of C</span></a>
      <a class="sidebar-link" href="pages/unit1/features-of-c.html"><i class="fa-solid fa-star"></i><span class="sidebar-label">Features of C</span></a>
      <a class="sidebar-link" href="pages/unit1/applications-of-c.html"><i class="fa-solid fa-industry"></i><span class="sidebar-label">Applications</span></a>
      <a class="sidebar-link" href="pages/unit1/structure-of-c-program.html"><i class="fa-solid fa-code"></i><span class="sidebar-label">Structure of C Program</span></a>
      </div>
```

In **each of the 7 files under `pages/unit1/`** (`evolution-of-programming.html`, `programming-languages.html`, `problem-solving.html`, `sequential-logic.html`, `algorithms.html`, `pseudocode.html`, `flowcharts.html`), find:
```html
      <a class="sidebar-link" href="flowcharts.html"><i class="fa-solid fa-sitemap"></i><span class="sidebar-label">Flowcharts</span></a>
      </div>
```
Replace with (note: on `flowcharts.html` itself, this link additionally carries the `active` class — preserve `class="sidebar-link active"` on that one file's Flowcharts line, don't strip it):
```html
      <a class="sidebar-link" href="flowcharts.html"><i class="fa-solid fa-sitemap"></i><span class="sidebar-label">Flowcharts</span></a>
      <a class="sidebar-link" href="introduction-to-c.html"><i class="fa-solid fa-c"></i><span class="sidebar-label">Introduction to C</span></a>
      <a class="sidebar-link" href="history-of-c.html"><i class="fa-solid fa-scroll"></i><span class="sidebar-label">History of C</span></a>
      <a class="sidebar-link" href="features-of-c.html"><i class="fa-solid fa-star"></i><span class="sidebar-label">Features of C</span></a>
      <a class="sidebar-link" href="applications-of-c.html"><i class="fa-solid fa-industry"></i><span class="sidebar-label">Applications</span></a>
      <a class="sidebar-link" href="structure-of-c-program.html"><i class="fa-solid fa-code"></i><span class="sidebar-label">Structure of C Program</span></a>
      </div>
```

- [ ] **Step 2: Change Flowcharts' footer button from "Back to Unit 1" to "Next: Introduction to C"**

In `pages/unit1/flowcharts.html`, find:
```html
          <a href="evolution-of-programming.html" class="btn btn-primary">Back to Unit 1 <i class="fa-solid fa-arrow-right"></i></a>
```
Replace with:
```html
          <a href="introduction-to-c.html" class="btn btn-primary">Next: Introduction to C <i class="fa-solid fa-arrow-right"></i></a>
```

- [ ] **Step 3: Verify**

Run (PowerShell):
```powershell
$files = @('index.html','pages\unit1\evolution-of-programming.html','pages\unit1\programming-languages.html','pages\unit1\problem-solving.html','pages\unit1\sequential-logic.html','pages\unit1\algorithms.html','pages\unit1\pseudocode.html','pages\unit1\flowcharts.html')
foreach ($f in $files) {
  $c = Get-Content $f -Raw
  $ok = ($c -match 'introduction-to-c\.html') -and ($c -match 'history-of-c\.html') -and ($c -match 'features-of-c\.html') -and ($c -match 'applications-of-c\.html') -and ($c -match 'structure-of-c-program\.html')
  Write-Output "$f : $ok"
}
```
Expect `True` for all 8. Also run: `Select-String -Path pages\unit1\flowcharts.html -Pattern 'Back to Unit 1'` → expect **no match** (fully replaced).

- [ ] **Step 4: Commit**

```bash
git add index.html pages/unit1/evolution-of-programming.html pages/unit1/programming-languages.html pages/unit1/problem-solving.html pages/unit1/sequential-logic.html pages/unit1/algorithms.html pages/unit1/pseudocode.html pages/unit1/flowcharts.html
git commit -m "feat: wire Group 2 sidebar links and update Flowcharts footer nav"
```

---

## Task 2: Topic page — Introduction to C

**Files:**
- Create: `pages/unit1/introduction-to-c.html`

**Instructions:** Read `pages/unit1/evolution-of-programming.html` in full and copy its exact structure: `<head>` link order, shell markup (topnav-free — sticky sidebar with the now-12-link Unit 1 submenu, floating theme-toggle, floating social links, search panel, footer), the numbered `<h2>N. Title</h2>` section pattern, quiz `<div class="quiz" data-quiz-source="...">` + `window.<name>Quiz` array format, interview-accordion pattern (`.interview-item`/`.interview-question`/`.interview-answer` — every question needs a written answer, not just the question), and the closing script tag order (quiz-data script, theme.js, sidebar.js, search.js, main.js, quiz.js, copy-code.js, accordion.js — all `../../` paths).

Sidebar: use the now-12-link Unit 1 submenu (same list Task 1 wired into every other file), with `active` class on this page's own link (`introduction-to-c.html`).

Breadcrumb equivalent / title: `<title>Introduction to C — Unit 1 — C Programming eBook</title>`.

Footer nav: Prev → `flowcharts.html` (label "Previous: Flowcharts"), Next → `history-of-c.html` (label "Next: History of C").

Quiz array name: `window.introductionToCQuiz`, `data-quiz-source="introductionToCQuiz"`.

Sections (skip 5-9, 17 — conceptual, no code/dry-run/mini-project on this page):

- **1. What Is It? (`#introduction`):** C is a general-purpose, procedural programming language — one of the most influential languages ever created, and the direct or indirect ancestor of many modern languages (C++, C#, Java, JavaScript, Python's own interpreter is written in C). Learning C means learning the language many other languages borrow their core ideas from.
- **2. Why Do We Need to Know This? (`#why`):** Nearly every other popular language borrows syntax or concepts from C (curly braces, semicolons, `if`/`for`/`while` structure). Learning C first makes picking up other languages later noticeably easier, and gives you a mental model of how computers actually execute code.
- **3. Real-Life Example (`#real-life`):** Think of C like Latin: a language most people don't speak day-to-day anymore, but whose vocabulary and grammar quietly live on inside many modern languages. Learning it reveals patterns you'll recognize everywhere else.
- **4. Visual Explanation (`#visual`):** A simple `.feature-grid`/`.card` layout of 4-5 well-known languages/technologies (C++, C#, Java, Python's CPython interpreter, Objective-C) each with a one-line note on what they borrowed or inherited from C (syntax, the interpreter itself, memory model concepts, etc.) — visually establishing "C is everywhere, even when it's invisible."
- **10. Common Mistakes (`#mistakes`):** Assuming C is "outdated" because it's old; assuming a language being simple/old means it's easy to master (C's simplicity is deceptive — it gives you a small number of powerful, sharp tools); confusing C with C++ or C# (related history, but different languages with different rules).
- **11. Debugging Tips (`#debugging`):** Not applicable yet (no code on this page) — the habit to build now: when starting to learn any new language later, ask "what does this borrow from C?" — it shortcuts a lot of confusion.
- **12. Best Practices (`#best-practices`):** Approach C expecting to learn fundamentals, not just syntax — the goal is understanding how computers actually run programs, not memorizing keywords.
- **13. Interview Questions (`#interview`):** Easy: "What kind of language is C (general-purpose, procedural)?" Medium: "Name two modern languages influenced by C." Hard: "Why does learning C make learning other languages easier?" HR: "Why are you starting your programming journey with C?" Conceptual: "What does it mean for a language to be an 'ancestor' of others?" Scenario: "A friend says C is 'useless' because it's old — how would you respond?" — write a real answer for each.
- **14. MCQs (`#mcq`):** `window.introductionToCQuiz`, exactly 5 questions (schema: `{question, options: [4], correctIndex, explanation}`), covering: what kind of language C is, its influence on other languages, and the "old but not outdated" distinction.
- **15. Programming Exercises (`#exercises`):** Easy: list 3 languages you've heard of and guess (research if needed) whether each was influenced by C. Medium: write a short paragraph on why "old" doesn't mean "irrelevant" for a programming language, using C as the example. Hard: research one specific syntax feature (e.g. curly-brace blocks, semicolons) and trace which languages besides C use it.
- **16. Assignments (`#assignments`):** Write a half-page reflection on why you're learning C, and what you hope to understand by the end of this course.
- **20. FAQs (`#faq`):** "Do I need to learn C before other languages?" (Not strictly required, but it builds fundamentals that make other languages easier.) "Is C only useful for old systems?" (No — it's still actively used for operating systems, embedded devices, and performance-critical software today.)
- **21. Key Takeaways (`#takeaways`):** 3 bullets: C is a foundational, influential language; many modern languages borrow from it; learning C builds transferable fundamentals, not just C-specific syntax.

- [ ] **Step 1: Write the file** following the skeleton and content brief above.
- [ ] **Step 2: Verify**

Run: `(Select-String -Path pages/unit1/introduction-to-c.html -Pattern 'question:').Count` → expect `5`.
Run: `Select-String -Path pages/unit1/introduction-to-c.html -Pattern 'introductionToCQuiz'` → expect at least 2 matches.
Run: `(Select-String -Path pages/unit1/introduction-to-c.html -Pattern 'class="interview-question"').Count` → expect `6` (one per interview question), and confirm an equal count of `class="interview-answer"`.

- [ ] **Step 3: Commit**

```bash
git add pages/unit1/introduction-to-c.html
git commit -m "feat: add Introduction to C topic page"
```

---

## Task 3: Topic page — History of C

**Files:**
- Create: `pages/unit1/history-of-c.html`

**Instructions:** Same skeleton rule as Task 2 (copy structure from `evolution-of-programming.html`, 12-link sidebar with `active` on this page). Prev → `introduction-to-c.html` (label "Previous: Introduction to C"), Next → `features-of-c.html` (label "Next: Features of C"). Quiz array: `window.historyOfCQuiz`, `data-quiz-source="historyOfCQuiz"`.

Sections (skip 5-9, 17):

- **1. What Is It? (`#introduction`):** The story of how C came to be — created to solve a real, practical problem (rewriting the Unix operating system in a portable language), not as an academic exercise.
- **2. Why Do We Need to Know This? (`#why`):** Knowing C's origin explains many of its design choices: it was built by systems programmers, for systems programming, which is why it prioritizes speed and direct hardware access over built-in safety nets.
- **3. Real-Life Example (`#real-life`):** Comparable to knowing a tool's origin story — a chef's knife was designed for precision and control, not to prevent every possible cut. Understanding why C was built the way it was explains why it expects care from the programmer.
- **4. Visual Explanation (`#visual`):** `.timeline` (reused from `css/diagrams.css`) with entries: **1969-1970** — Ken Thompson creates B (a predecessor language) at Bell Labs. **1972** — Dennis Ritchie develops C at Bell Labs, evolving from B, to rewrite Unix. **1978** — "The C Programming Language" (K&R) book published, becoming the de facto standard for years. **1989/1990** — ANSI C (C89) / ISO C (C90), the first formal standard. **1999** — C99 adds new features (e.g. `//` comments, better variable declarations). **2011** — C11 modernizes further (better Unicode/threading support). **2018/2023** — C17 and C23 continue refining the standard.
- **10. Common Mistakes (`#mistakes`):** Assuming C hasn't changed since 1972 (it has — through several ANSI/ISO standard revisions); confusing "C" with "C++" as if C++ were just a newer version of C, rather than a related-but-distinct language; assuming Unix and C history are unrelated (they're deeply intertwined).
- **11. Debugging Tips (`#debugging`):** Not applicable yet — the habit to build: when a C feature seems inconsistent with something you read elsewhere, check which C standard (C89, C99, C11...) is being discussed, since behavior/features can differ by standard.
- **12. Best Practices (`#best-practices`):** When learning or reading C code/tutorials, note which standard they assume — this course teaches modern, standard C, but older resources may show slightly different conventions.
- **13. Interview Questions (`#interview`):** Easy: "Who created C, and where?" Medium: "What operating system was C originally created to help rewrite?" Hard: "Why does C's design favor speed and hardware access over built-in safety?" HR: "Why do you think understanding a language's history is useful?" Conceptual: "What is a 'standard' (like C99 or C11) in the context of a programming language?" Scenario: "You read two tutorials that show slightly different C syntax — what's the most likely explanation?" — write a real answer for each.
- **14. MCQs (`#mcq`):** `window.historyOfCQuiz`, exactly 5 questions covering: Dennis Ritchie/Bell Labs/1972, the Unix connection, and standardization (ANSI C/C99/C11 existing as a concept).
- **15. Programming Exercises (`#exercises`):** Easy: write the year and creator of C from memory. Medium: research what "B" (C's predecessor language) was and one way it differed from C. Hard: research one feature added in C99 or C11 and explain in your own words what problem it solved.
- **16. Assignments (`#assignments`):** Create your own simple timeline (at least 4 entries) of C's history, from its creation through at least one modern standard revision.
- **20. FAQs (`#faq`):** "Is C still being updated?" (Yes — the most recent standard is C23; C continues to evolve, just slowly and conservatively.) "Was C the first programming language?" (No — many languages, including B, FORTRAN, and assembly, came before it; C was influential, not first.)
- **21. Key Takeaways (`#takeaways`):** 3 bullets: C was created in 1972 by Dennis Ritchie to help rewrite Unix; its design priorities (speed, hardware access) come directly from that systems-programming origin; C has continued to evolve through ANSI/ISO standards, it isn't frozen in 1972.

- [ ] **Step 1: Write the file** following the skeleton and content brief.
- [ ] **Step 2: Verify**

Run: `(Select-String -Path pages/unit1/history-of-c.html -Pattern 'question:').Count` → expect `5`.
Run: `Select-String -Path pages/unit1/history-of-c.html -Pattern 'historyOfCQuiz'` → expect at least 2 matches.
Run: `Select-String -Path pages/unit1/history-of-c.html -Pattern 'timeline-item'` → expect at least 6 matches (6 timeline entries).

- [ ] **Step 3: Commit**

```bash
git add pages/unit1/history-of-c.html
git commit -m "feat: add History of C topic page"
```

---

## Task 4: Topic page — Features of C

**Files:**
- Create: `pages/unit1/features-of-c.html`

**Instructions:** Same skeleton rule. Prev → `history-of-c.html` (label "Previous: History of C"), Next → `applications-of-c.html` (label "Next: Applications"). Quiz array: `window.featuresOfCQuiz`, `data-quiz-source="featuresOfCQuiz"`.

Sections (skip 5-9, 17):

- **1. What Is It? (`#introduction`):** C's features are the specific design properties that made it so influential and durable: it's simple, fast, portable across hardware, and gives direct control over memory — a combination few languages, even today, fully replicate.
- **2. Why Do We Need to Know This? (`#why`):** Knowing C's core features up front sets accurate expectations for the rest of this course — you'll see these exact properties (speed, portability, direct memory access, a small core language plus a rich standard library) show up again and again as specific topics.
- **3. Real-Life Example (`#real-life`):** Like a Swiss Army knife that's deliberately minimal — a small number of sharp, general-purpose tools, rather than one bulky tool for every specific job. C gives you a small set of powerful building blocks and expects you to combine them yourself.
- **4. Visual Explanation (`#visual`):** `.feature-grid`/`.card` grid (reused from `css/components.css`) with 6 cards: **Simplicity** (small set of keywords and rules), **Portability** (same source code compiles on many different machines/operating systems), **Speed** (compiles to efficient machine code, minimal runtime overhead), **Structured Programming** (code organized into functions/blocks, not just jumps), **Low-Level Access** (direct memory access via pointers), **Rich Standard Library** (built-in functions for I/O, strings, math, etc. via headers like `stdio.h`).
- **10. Common Mistakes (`#mistakes`):** Assuming "simple" means "limited" (C's simplicity is about the language's core, not what you can build with it); assuming portability means zero changes are ever needed across platforms (mostly true, but some platform-specific details can still differ); underestimating how much power "low-level access" actually hands you (and the responsibility that comes with it).
- **11. Debugging Tips (`#debugging`):** Not applicable yet — the habit to build: when something in C feels unusually manual compared to a higher-level language, it's very likely a direct consequence of one of these features (usually low-level access or the deliberately small standard library) — recognizing which feature explains the behavior speeds up understanding.
- **12. Best Practices (`#best-practices`):** Learn each feature as a trade-off, not just a fact — e.g. low-level access means power AND responsibility (manual memory management); keep this framing in mind throughout the rest of the course.
- **13. Interview Questions (`#interview`):** Easy: "Name two key features of C." Medium: "What does 'portability' mean for a language like C?" Hard: "How does C's 'low-level access' feature relate to its speed?" HR: "Which feature of C do you find most interesting, and why?" Conceptual: "What's the difference between a language's core/keywords and its standard library?" Scenario: "You need code that runs efficiently on both a desktop and a tiny embedded device — which C feature makes this realistic?" — write a real answer for each.
- **14. MCQs (`#mcq`):** `window.featuresOfCQuiz`, exactly 5 questions covering the 6 features above (simplicity, portability, speed, structured programming, low-level access, standard library).
- **15. Programming Exercises (`#exercises`):** Easy: list the 6 features of C from memory with a one-line description each. Medium: pick any 2 features and explain, in your own words, how they connect (e.g. how simplicity supports portability). Hard: research one real system (e.g. an embedded thermostat or a game engine) and identify which 2-3 C features most likely made it the right choice.
- **16. Assignments (`#assignments`):** Write a short comparison: pick a language you've heard of (any language) and compare it to C on at least 3 of the 6 features discussed.
- **20. FAQs (`#faq`):** "Does C have all the features of modern languages?" (No — it deliberately lacks many conveniences (e.g. automatic memory management) modern languages provide, trading them for speed and control.) "Is C's standard library enough for everything?" (For core tasks yes, but many real projects use additional external libraries beyond the standard one.)
- **21. Key Takeaways (`#takeaways`):** 3 bullets: C's core features are simplicity, portability, speed, structured programming, low-level access, and a standard library; each feature is a deliberate trade-off, not a limitation; these features explain most of what makes C distinct from higher-level languages.

- [ ] **Step 1: Write the file** following the skeleton and content brief.
- [ ] **Step 2: Verify**

Run: `(Select-String -Path pages/unit1/features-of-c.html -Pattern 'question:').Count` → expect `5`.
Run: `Select-String -Path pages/unit1/features-of-c.html -Pattern 'featuresOfCQuiz'` → expect at least 2 matches.
Run: `(Select-String -Path pages/unit1/features-of-c.html -Pattern 'class="card"').Count` → expect at least `6`.

- [ ] **Step 3: Commit**

```bash
git add pages/unit1/features-of-c.html
git commit -m "feat: add Features of C topic page"
```

---

## Task 5: Topic page — Applications

**Files:**
- Create: `pages/unit1/applications-of-c.html`

**Instructions:** Same skeleton rule. Prev → `features-of-c.html` (label "Previous: Features of C"), Next → `structure-of-c-program.html` (label "Next: Structure of C Program"). Quiz array: `window.applicationsQuiz`, `data-quiz-source="applicationsQuiz"`.

Sections (skip 5-9, 17):

- **1. What Is It? (`#introduction`):** Where C is actually used today — not a historical footnote, but the backbone of software that has to be fast, reliable, and close to the hardware.
- **2. Why Do We Need to Know This? (`#why`):** Seeing concrete, current applications of C answers the natural "why does this matter to me" question before diving into syntax — this isn't a purely academic exercise.
- **3. Real-Life Example (`#real-life`):** The device you're reading this on almost certainly runs an operating system with a C-written kernel underneath it (Linux, Windows, and macOS/iOS's XNU kernel are all C or C-based at their core) — C is invisibly present in nearly every piece of modern technology.
- **4. Visual Explanation (`#visual`):** `.feature-grid`/`.card` grid with 6 cards: **Operating System Kernels** (Linux, parts of Windows and macOS), **Embedded Systems** (microcontrollers in appliances, cars, medical devices), **Game Engines** (performance-critical engine cores), **Compilers & Interpreters** (many other languages' own compilers/interpreters are written in C), **Device Drivers** (hardware-specific low-level code), **Databases** (core engines of systems like SQLite, and parts of MySQL/PostgreSQL).
- **10. Common Mistakes (`#mistakes`):** Assuming C is only used for "old" legacy systems; assuming C isn't used in "modern" tech like game engines or databases; underestimating how much invisible infrastructure (OS kernels, interpreters for other languages) is C under the hood.
- **11. Debugging Tips (`#debugging`):** Not applicable yet — the habit to build: when curious how a piece of software works "under the hood," it's often worth checking whether C (or a C-based technology) sits at its core.
- **12. Best Practices (`#best-practices`):** When motivation dips during syntax-heavy lessons later in the course, come back to this page's list — it's a concrete reminder of what these fundamentals eventually make possible.
- **13. Interview Questions (`#interview`):** Easy: "Name one operating system with a C-written kernel." Medium: "Why is C commonly used for embedded systems?" Hard: "Why are many other programming languages' interpreters or compilers themselves written in C?" HR: "Which real-world application of C interests you most, and why?" Conceptual: "What does 'close to the hardware' have to do with C being chosen for a given application?" Scenario: "You're building software for a pacemaker with strict, predictable timing requirements — would C be a reasonable choice, and why?" — write a real answer for each.
- **14. MCQs (`#mcq`):** `window.applicationsQuiz`, exactly 5 questions covering the 6 application areas above and why C suits them.
- **15. Programming Exercises (`#exercises`):** Easy: list 3 applications of C from memory. Medium: pick one application area (e.g. embedded systems) and explain in your own words which C features (from the previous topic) make it a good fit. Hard: research one specific real-world example (e.g. the Linux kernel, SQLite, or a specific game engine) and summarize why C was chosen for it.
- **16. Assignments (`#assignments`):** Write a short paragraph connecting a device or piece of software you personally use every day to C, using what you've learned about its applications.
- **20. FAQs (`#faq`):** "Is C used for web development?" (Rarely directly, but web browsers and many web servers/interpreters are themselves implemented in C.) "Will I be building operating systems as a beginner?" (Not right away — but understanding C is the same foundation used for exactly that kind of work.)
- **21. Key Takeaways (`#takeaways`):** 3 bullets: C sits invisibly at the core of operating systems, embedded devices, game engines, and other languages' own tooling; its applications directly follow from the features covered in the previous topic; this isn't legacy trivia — it's actively relevant infrastructure today.

- [ ] **Step 1: Write the file** following the skeleton and content brief.
- [ ] **Step 2: Verify**

Run: `(Select-String -Path pages/unit1/applications-of-c.html -Pattern 'question:').Count` → expect `5`.
Run: `Select-String -Path pages/unit1/applications-of-c.html -Pattern 'applicationsQuiz'` → expect at least 2 matches.

- [ ] **Step 3: Commit**

```bash
git add pages/unit1/applications-of-c.html
git commit -m "feat: add Applications of C topic page"
```

---

## Task 6: Topic page — Structure of C Program (+ chapter mini project)

**Files:**
- Create: `pages/unit1/structure-of-c-program.html`

**Instructions:** Same skeleton rule. Prev → `applications-of-c.html` (label "Previous: Applications"). This is the **last page in the group** — no "Next" topic exists yet (Group 3 isn't built), so the footer's "Next" slot should be a disabled-look note or simply omitted (use an empty `<span></span>` on that side, matching the pattern `evolution-of-programming.html` itself used for its own missing "Prev" slot as the first page in Group 1). Quiz array: `window.structureOfCProgramQuiz`, `data-quiz-source="structureOfCProgramQuiz"`.

**This page uses sections 5, 6, 8, 9, and 17 that earlier pages in this group skipped** (it's the first page with real code). Use the master numbering scheme adapted to this page's actual section set — renumber sequentially with no gaps at the end, exactly like Group 1's pages did (e.g. if this page ends up with 16 total sections, they're numbered 1-16 in order, not using the original template's raw numbers).

Sections to include:

- **What Is It? (`#introduction`):** Every C program follows the same basic skeleton: a preprocessor directive (like `#include <stdio.h>`), a `main()` function (where execution starts), one or more statements inside it, and a `return` statement ending it. Learning this skeleton means you can read (and start writing) any C program's basic shape.
- **Why Do We Need to Know This? (`#why`):** Every single C program you will ever write or read follows this same structure — understanding it once means never being confused by "where does this program start" again.
- **Real-Life Example (`#real-life`):** Like the standard structure of a formal letter (heading, greeting, body, closing) — once you know the expected parts and their order, reading or writing any new letter (or C program) becomes much less intimidating.
- **Visual Explanation (`#visual`):** A labeled breakdown of the Hello World program (see Step-by-Step Code below) — for each part (`#include <stdio.h>`, `int main() {`, the `printf(...)` line, `return 0;`, `}`), a short one-line label explaining what it is, laid out using `.card` or simple labeled `<div>` blocks (reuse existing classes, no new CSS needed).
- **Syntax (`#syntax`):** Explain the 4 core parts in order: (1) **Preprocessor directive** — `#include <stdio.h>` tells the compiler to bring in the standard input/output library, needed for `printf`. (2) **`main()` function** — every C program has exactly one `main()` function; this is where execution starts. (3) **Statements** — the actual instructions inside `main()`, each ending in a semicolon. (4) **`return 0;`** — signals the program finished successfully.
- **Step-by-Step Code (`#steps`):** In a `.code-block` (with header + copy button):
  ```c
  #include <stdio.h>

  int main() {
      printf("Hello, World!\n");
      return 0;
  }
  ```
  Explain each line in prose immediately after: the `#include` line, the `int main() {` opening, the `printf(...)` statement (prints text to the screen), `return 0;` (ends the program successfully), and the closing `}`.
- **Dry Run (`#dryrun`):** Trace execution top-to-bottom: the preprocessor directive is processed first (bringing in `printf`'s definition), then `main()` begins, then the `printf` statement runs and displays `Hello, World!` to the screen, then `return 0;` ends the program. State the exact output: `Hello, World!`. Include a one-line forward pointer: "You'll learn exactly how this source code becomes a running program in the next chapter — for now, focus on what the code means."
- **Common Mistakes (`#mistakes`):** Forgetting the semicolon at the end of a statement; forgetting `return 0;`; case sensitivity (`main` is not the same as `Main` or `MAIN` — C is case-sensitive throughout); forgetting `#include <stdio.h>` before using `printf` (the compiler won't know what `printf` is).
- **Debugging Tips (`#debugging`):** If a program "does nothing" or produces a confusing error, check the basics first: is every statement's semicolon present, are the curly braces `{ }` balanced, is `main` spelled and cased correctly, are needed `#include` lines present.
- **Best Practices (`#best-practices`):** Always match every opening `{` with a closing `}`; always end statements with a semicolon; always include the headers (like `stdio.h`) needed for the functions you use.
- **Interview Questions (`#interview`):** Easy: "What are the 4 basic parts of a C program's structure?" Medium: "What does `#include <stdio.h>` do?" Hard: "Why must every C program have exactly one `main()` function?" HR: "Describe the first program you'd want to write once you understand this structure." Conceptual: "Why does C care about the difference between `main` and `Main`?" Scenario: "Your program won't compile and the error mentions `printf` is undefined — what's the most likely missing piece?" — write a real answer for each.
- **MCQs (`#mcq`):** `window.structureOfCProgramQuiz`, exactly 5 questions covering: the 4 structural parts, what `#include` does, why `main()` is required, case sensitivity, and reading the Hello World example's output.
- **Programming Exercises (`#exercises`):** Easy: from memory, list the 4 parts of a C program's structure in order. Medium: identify what's wrong with a given broken version of the Hello World program (e.g. missing semicolon) shown in the exercise text. Hard: write out (by hand, no need to run it) a modified version of Hello World that prints your own name instead.
- **Assignments (`#assignments`):** Write out, from memory, the full Hello World program structure, then modify it to print two lines of text instead of one.
- **Mini Project (`#miniproject`) — chapter-level, only on this page:** "Write Your First C Program." Write a complete C program (following the exact structure just taught) that prints your name and one fact about yourself, each on its own line, using two `printf` statements. Include the `#include`, `main()`, both `printf` statements, and `return 0;`. This capstones the "Getting to Know C" chapter — the reader has gone from "what is C" to writing an actual (if simple) C program.
- **FAQs (`#faq`):** "Do I need to memorize this exact structure?" (You'll internalize it naturally through practice — for now, recognizing the 4 parts when you see them is enough.) "What does the `\n` inside the printf string do?" (It's previewed here as "starts a new line" — full string/escape-sequence details are covered in a later unit.)
- **Key Takeaways (`#takeaways`):** 3 bullets: every C program shares the same basic structure (preprocessor directive, `main()`, statements, return); this structure is the foundation for everything else in the course; you've now written your first real C program.

- [ ] **Step 1: Write the file** following the skeleton and content brief, including the Mini Project section and its `#miniproject` id, with sequential renumbering across the full section set (no gaps).
- [ ] **Step 2: Verify**

Run: `(Select-String -Path pages/unit1/structure-of-c-program.html -Pattern 'question:').Count` → expect `5`.
Run: `Select-String -Path pages/unit1/structure-of-c-program.html -Pattern 'structureOfCProgramQuiz'` → expect at least 2 matches.
Run: `Select-String -Path pages/unit1/structure-of-c-program.html -Pattern 'miniproject'` → expect at least 1 match.
Run: `Select-String -Path pages/unit1/structure-of-c-program.html -Pattern '#include'` → expect at least 1 match (the code block).
Run: `Select-String -Path pages/unit1/structure-of-c-program.html -Pattern 'Back to Unit 1|Next:'` → confirm the footer nav has a Prev link only (no broken "Next" link to a non-existent page).

- [ ] **Step 3: Commit**

```bash
git add pages/unit1/structure-of-c-program.html
git commit -m "feat: add Structure of C Program topic page with chapter mini project"
```

---

## Task 7: Final verification pass

- [ ] **Step 1: Sidebar consistency across all 18 files**

```powershell
$files = @('index.html','pages\unit1\evolution-of-programming.html','pages\unit1\programming-languages.html','pages\unit1\problem-solving.html','pages\unit1\sequential-logic.html','pages\unit1\algorithms.html','pages\unit1\pseudocode.html','pages\unit1\flowcharts.html','pages\unit1\introduction-to-c.html','pages\unit1\history-of-c.html','pages\unit1\features-of-c.html','pages\unit1\applications-of-c.html','pages\unit1\structure-of-c-program.html')
foreach ($f in $files) {
  $c = Get-Content $f -Raw
  $ok = ($c -match 'introduction-to-c\.html') -and ($c -match 'history-of-c\.html') -and ($c -match 'features-of-c\.html') -and ($c -match 'applications-of-c\.html') -and ($c -match 'structure-of-c-program\.html') -and ($c -match 'evolution-of-programming\.html') -and ($c -match 'flowcharts\.html')
  Write-Output "$f : $ok"
}
```
Expect `True` for all 13.

- [ ] **Step 2: Prev/next chain unbroken across the full 12-topic sequence**

```powershell
$order = @('evolution-of-programming.html','programming-languages.html','problem-solving.html','sequential-logic.html','algorithms.html','pseudocode.html','flowcharts.html','introduction-to-c.html','history-of-c.html','features-of-c.html','applications-of-c.html','structure-of-c-program.html')
for ($i = 0; $i -lt $order.Length - 1; $i++) {
  $current = "pages\unit1\$($order[$i])"
  $next = $order[$i + 1]
  $ok = (Get-Content $current -Raw) -match [regex]::Escape($next)
  Write-Output "$($order[$i]) -> $next : $ok"
}
```
Expect `True` for all 11 pairs.

- [ ] **Step 3: MCQ counts for the 5 new pages**

```powershell
$pages = @('introduction-to-c.html','history-of-c.html','features-of-c.html','applications-of-c.html','structure-of-c-program.html')
foreach ($p in $pages) {
  $count = (Select-String -Path "pages\unit1\$p" -Pattern 'question:').Count
  Write-Output "$p : $count questions"
}
```
Expect `5` for every page.

- [ ] **Step 4: Interview accordion counts match on the 5 new pages**

```powershell
foreach ($p in $pages) {
  $q = (Select-String -Path "pages\unit1\$p" -Pattern 'class="interview-question"').Count
  $a = (Select-String -Path "pages\unit1\$p" -Pattern 'class="interview-answer"').Count
  Write-Output "$p : questions=$q answers=$a"
}
```
Expect `$q` to equal `$a` for every page (every question has an answer).

- [ ] **Step 5: `git status` clean, `git log` sanity check**

Run: `git status --short` → expect clean.
Run: `git log --oneline -15` → confirm all 7 task commits from this plan are present in order.

- [ ] **Step 6: Manual browser check (documented as a follow-up, not automatable here)**

Note in the final report that a human should open `index.html`, expand the Unit 1 sidebar accordion, and click through all 12 topics in order, confirming: sidebar links resolve correctly, prev/next buttons chain through the full sequence without dead ends, quizzes render and score correctly on the 5 new pages, the interview-question accordions expand/collapse, and the Structure of C Program page's copy-code button works on the Hello World example.

- [ ] **Step 7: Commit any fixes found during verification**

```bash
git add -A
git commit -m "fix: address issues found during Unit1 Group2 verification pass"
```
(Skip if nothing needed fixing.)

---

## Self-Review Notes

- **Spec coverage:** sidebar/navigation wiring (Task 1), all 5 topic pages with content matching the design spec's per-topic breakdown (Tasks 2-6), mini project on the last page only (Task 6), full-chain verification (Task 7). Matches the approved design spec section-by-section.
- **Deferred items confirmed out of scope, per spec:** how to compile/run C (Group 3), comments (Group 4), Unit 2, `window.searchIndex` population — none appear in this plan.
- **Type/interface consistency:** every new quiz array follows the same `{question, options, correctIndex, explanation}` schema consumed by the existing `js/quiz.js` — no new engine needed. Every interview accordion follows the existing `.interview-item`/`.interview-question`/`.interview-answer` + `js/accordion.js` pattern — no new component needed.
