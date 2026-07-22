# Unit 1 / Group 3a: The Pipeline Itself Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship 6 new Unit 1 topic pages (C Compiler → Execution Process) and update sidebar navigation across every existing page, per `docs/superpowers/specs/2026-07-22-unit1-group3a-pipeline-design.md`.

**Architecture:** No new shared CSS/JS — 100% reuse of existing infrastructure (`css/diagrams.css`, `css/quiz.css`, `js/quiz.js`, `js/accordion.js`, `js/copy-code.js`, and the shell pattern in `pages/unit1/structure-of-c-program.html`). Pure content + one navigation-wiring task, same shape as Group 2's plan.

**Tech Stack:** Same as prior sub-projects — HTML5, CSS3, vanilla JS.

**Testing approach:** Same as prior sub-projects — write file → structural/count verification via `Select-String`/`node --check` → commit. No test framework exists for this static site.

---

## Task 1: Sidebar navigation update (13 existing files) + Structure of C Program footer button

**Files (all modified, none created):**
- `index.html`
- `pages/unit1/evolution-of-programming.html`
- `pages/unit1/programming-languages.html`
- `pages/unit1/problem-solving.html`
- `pages/unit1/sequential-logic.html`
- `pages/unit1/algorithms.html`
- `pages/unit1/pseudocode.html`
- `pages/unit1/flowcharts.html`
- `pages/unit1/introduction-to-c.html`
- `pages/unit1/history-of-c.html`
- `pages/unit1/features-of-c.html`
- `pages/unit1/applications-of-c.html`
- `pages/unit1/structure-of-c-program.html` (also gets the footer button change, see Step 2)

**Context:** Every one of these files has a `<div class="sidebar-submenu" id="unit1-submenu">` block ending with a link to `structure-of-c-program.html` (or `pages/unit1/structure-of-c-program.html` in `index.html`'s case) immediately before the submenu's closing `</div>`. This step adds 6 new links after it, in all 13 files.

- [ ] **Step 1: Insert 6 new sidebar links in every file**

In **`index.html`**, find:
```html
      <a class="sidebar-link" href="pages/unit1/structure-of-c-program.html"><i class="fa-solid fa-code"></i><span class="sidebar-label">Structure of C Program</span></a>
      </div>
```
Replace with:
```html
      <a class="sidebar-link" href="pages/unit1/structure-of-c-program.html"><i class="fa-solid fa-code"></i><span class="sidebar-label">Structure of C Program</span></a>
      <a class="sidebar-link" href="pages/unit1/c-compiler.html"><i class="fa-solid fa-gears"></i><span class="sidebar-label">C Compiler</span></a>
      <a class="sidebar-link" href="pages/unit1/compilation-process.html"><i class="fa-solid fa-arrows-turn-right"></i><span class="sidebar-label">Compilation Process</span></a>
      <a class="sidebar-link" href="pages/unit1/source-code.html"><i class="fa-solid fa-file-code"></i><span class="sidebar-label">Source Code</span></a>
      <a class="sidebar-link" href="pages/unit1/object-code.html"><i class="fa-solid fa-cube"></i><span class="sidebar-label">Object Code</span></a>
      <a class="sidebar-link" href="pages/unit1/executable-code.html"><i class="fa-solid fa-play"></i><span class="sidebar-label">Executable Code</span></a>
      <a class="sidebar-link" href="pages/unit1/execution-process.html"><i class="fa-solid fa-microchip"></i><span class="sidebar-label">Execution Process</span></a>
      </div>
```

In **each of the 12 files under `pages/unit1/`** (all 12 existing topic pages), find:
```html
      <a class="sidebar-link" href="structure-of-c-program.html"><i class="fa-solid fa-code"></i><span class="sidebar-label">Structure of C Program</span></a>
      </div>
```
Replace with (note: on `structure-of-c-program.html` itself, this line additionally carries the `active` class — preserve `class="sidebar-link active"` on that one file's line, don't strip it):
```html
      <a class="sidebar-link" href="structure-of-c-program.html"><i class="fa-solid fa-code"></i><span class="sidebar-label">Structure of C Program</span></a>
      <a class="sidebar-link" href="c-compiler.html"><i class="fa-solid fa-gears"></i><span class="sidebar-label">C Compiler</span></a>
      <a class="sidebar-link" href="compilation-process.html"><i class="fa-solid fa-arrows-turn-right"></i><span class="sidebar-label">Compilation Process</span></a>
      <a class="sidebar-link" href="source-code.html"><i class="fa-solid fa-file-code"></i><span class="sidebar-label">Source Code</span></a>
      <a class="sidebar-link" href="object-code.html"><i class="fa-solid fa-cube"></i><span class="sidebar-label">Object Code</span></a>
      <a class="sidebar-link" href="executable-code.html"><i class="fa-solid fa-play"></i><span class="sidebar-label">Executable Code</span></a>
      <a class="sidebar-link" href="execution-process.html"><i class="fa-solid fa-microchip"></i><span class="sidebar-label">Execution Process</span></a>
      </div>
```

- [ ] **Step 2: Change Structure of C Program's footer from an empty "Next" placeholder to a real link**

In `pages/unit1/structure-of-c-program.html`, find:
```html
        <div class="topic-nav-footer">
          <a href="applications-of-c.html" class="btn btn-ghost"><i class="fa-solid fa-arrow-left"></i> Previous: Applications</a>
          <span></span>
        </div>
```
Replace with:
```html
        <div class="topic-nav-footer">
          <a href="applications-of-c.html" class="btn btn-ghost"><i class="fa-solid fa-arrow-left"></i> Previous: Applications</a>
          <a href="c-compiler.html" class="btn btn-primary">Next: C Compiler <i class="fa-solid fa-arrow-right"></i></a>
        </div>
```

- [ ] **Step 3: Verify**

Run (PowerShell):
```powershell
$files = @('index.html','pages\unit1\evolution-of-programming.html','pages\unit1\programming-languages.html','pages\unit1\problem-solving.html','pages\unit1\sequential-logic.html','pages\unit1\algorithms.html','pages\unit1\pseudocode.html','pages\unit1\flowcharts.html','pages\unit1\introduction-to-c.html','pages\unit1\history-of-c.html','pages\unit1\features-of-c.html','pages\unit1\applications-of-c.html','pages\unit1\structure-of-c-program.html')
foreach ($f in $files) {
  $c = Get-Content $f -Raw
  $ok = ($c -match 'c-compiler\.html') -and ($c -match 'compilation-process\.html') -and ($c -match 'source-code\.html') -and ($c -match 'object-code\.html') -and ($c -match 'executable-code\.html') -and ($c -match 'execution-process\.html')
  Write-Output "$f : $ok"
}
```
Expect `True` for all 13. Also run: `Select-String -Path pages\unit1\structure-of-c-program.html -Pattern '<span></span>'` → expect **no match** (empty placeholder replaced with a real link).

- [ ] **Step 4: Commit**

```bash
git add index.html pages/unit1/evolution-of-programming.html pages/unit1/programming-languages.html pages/unit1/problem-solving.html pages/unit1/sequential-logic.html pages/unit1/algorithms.html pages/unit1/pseudocode.html pages/unit1/flowcharts.html pages/unit1/introduction-to-c.html pages/unit1/history-of-c.html pages/unit1/features-of-c.html pages/unit1/applications-of-c.html pages/unit1/structure-of-c-program.html
git commit -m "feat: wire Group 3a sidebar links and update Structure of C Program footer nav"
```

---

## Task 2: Topic page — C Compiler

**Files:**
- Create: `pages/unit1/c-compiler.html`

**Instructions:** Read `pages/unit1/structure-of-c-program.html` in full and copy its exact structure: `<head>` link order, shell markup (sticky sidebar with the now-18-link Unit 1 submenu, floating theme-toggle, floating social links, search panel, footer, NO top navbar), numbered `<h2>N. Title</h2>` section pattern with NO gaps, quiz `<div class="quiz" data-quiz-source="...">` + `window.<name>Quiz` array format, interview-accordion pattern (`.interview-item`/`.interview-question`/`.interview-answer` — every question needs a written answer), `.code-block`/`.code-block-header`/`.copy-btn` chrome, and the closing script tag order (quiz-data script, theme.js, sidebar.js, search.js, main.js, quiz.js, copy-code.js, accordion.js, all `../../` paths).

**IMPORTANT — section numbering:** A prior sub-project had a defect where two pages kept gapped numbering (e.g. jumping from 4 straight to 10) instead of renumbering sequentially. Your page's `<h2>` numbers MUST run 1, 2, 3, 4, 5... with no gaps and no duplicates, based on however many sections you actually include — verify this yourself before committing.

Sidebar: full 18-link Unit 1 submenu (copy from structure-of-c-program.html, all 18 topic links including this sub-project's own 6), `active` class on this page's own link (`c-compiler.html`).

Title: `<title>C Compiler — Unit 1 — C Programming eBook</title>`.

Footer nav: Prev → `structure-of-c-program.html` (label "Previous: Structure of C Program"), Next → `compilation-process.html` (label "Next: Compilation Process").

Quiz array name: `window.cCompilerQuiz`, `data-quiz-source="cCompilerQuiz"`.

Sections (skip sections not applicable — this topic introduces a new recurring example but doesn't yet need a full dry-run/mini-project):

- **What Is It? (`#introduction`):** A compiler is a program that translates human-readable source code (like C) into machine code the computer's CPU can actually execute. Without a compiler, C source code is just text a computer can't run directly.
- **Why Do We Need to Know This? (`#why`):** Understanding what a compiler actually does demystifies the step between "writing code" and "running a program" — a step every C programmer relies on every single time, whether they think about it or not.
- **Real-Life Example (`#real-life`):** Like a professional translator converting a novel from one language to another — the meaning must stay exactly the same, but the words change form entirely so a different "reader" (in this case, the CPU) can understand it.
- **Visual Explanation (`#visual`):** Introduce `add.c` as the chapter's recurring example, in a `.code-block`:
  ```c
  #include <stdio.h>

  int main() {
      printf("The sum of 5 and 3 is 8\n");
      return 0;
  }
  ```
  Then a simple `.flowchart` with 3 `.flow-box` elements: "Source Code (add.c)" → "Compiler" → "Machine Code (runnable program)", with a one-line caption noting this exact journey is unpacked step-by-step across the rest of this chapter.
- **Common Mistakes (`#mistakes`):** Assuming the compiler "runs" the program (it doesn't — it translates it; running is a separate later step); assuming compilers are unique to C (every compiled language has one, e.g. C++, Rust, Go); confusing a compiler with an IDE or text editor (the editor is where you write code, the compiler is what translates it).
- **Debugging Tips (`#debugging`):** When the compiler reports an error, it's telling you your source code couldn't be translated — not that your logic is wrong. Compiler errors are almost always about syntax (missing semicolons, unmatched braces, misspelled keywords), not about what the program does.
- **Best Practices (`#best-practices`):** Read compiler error messages carefully — they usually point to the exact line and reason translation failed; fix the first reported error first, since one early mistake can cause a cascade of confusing follow-on errors.
- **Interview Questions (`#interview`):** Build 6 accordion items (Easy/Medium/Hard/HR/Conceptual/Scenario), each with a real written answer:
  - Easy: "What does a compiler do?" → Translates human-readable source code into machine code the CPU can execute.
  - Medium: "Is a compiler the same thing as a text editor?" → No — an editor is where you write code; a compiler is a separate program that translates that code afterward.
  - Hard: "Why can't a CPU run C source code directly?" → CPUs only understand their own binary machine instructions; C source code is human-readable text with no meaning to the hardware until translated.
  - HR: "Have you used a compiler before, even without realizing it?" → No fixed answer — encourage reflecting on any prior experience running code in any language, since most involve a compiler or interpreter behind the scenes.
  - Conceptual: "Is every programming language compiled?" → No — some languages are interpreted instead (previewed here, covered in a later topic); C is a compiled language.
  - Scenario: "You write correct C logic, but the compiler reports an error before you even run the program — what does this tell you?" → The problem is a translation/syntax issue the compiler caught, not necessarily a logic problem — the program never even go far enough to run.
  Write out full, clear answers (2-3 sentences each) — don't leave placeholders.
- **MCQs (`#mcq`):** `<div class="quiz" data-quiz-source="cCompilerQuiz"></div>` plus `window.cCompilerQuiz` array with EXACTLY 5 questions (schema: `{question, options: [4 strings], correctIndex, explanation}`), covering: what a compiler does, compiler vs. editor, why CPUs need translated code, and compiled vs. interpreted (at a conceptual preview level only). Ensure every `correctIndex` actually points to the factually correct option, and every explanation is accurate.
- **Programming Exercises (`#exercises`):** Easy: in your own words, explain what a compiler does in one sentence. Medium: name two other compiled programming languages besides C. Hard: research what "gcc" stands for and what it is.
- **Assignments (`#assignments`):** Write a short paragraph explaining the compiler's role using the translator analogy from this page, in your own words.
- **FAQs (`#faq`):** "Do I need to install a compiler myself?" (Yes — a C compiler like GCC or Clang must be installed separately; it doesn't come built into most operating systems.) "Is the compiler part of C, or a separate tool?" (Separate — the compiler is a tool that understands the C language's rules, but it isn't part of the language itself.)
- **Key Takeaways (`#takeaways`):** 3 bullets: a compiler translates source code into machine code; it doesn't run the program, only prepares it; `add.c` is this chapter's example, and its full journey is unpacked across the next several pages.

## Verification

- Run: `(Select-String -Path pages/unit1/c-compiler.html -Pattern 'question:').Count` → expect `5`.
- Run: `Select-String -Path pages/unit1/c-compiler.html -Pattern 'cCompilerQuiz'` → expect at least 2 matches.
- Run: `(Select-String -Path pages/unit1/c-compiler.html -Pattern 'class="interview-question"').Count` and confirm it equals the `.interview-answer` count → both `6`.
- Verify `<h2>` numbers run 1..N sequentially with no gaps.

## Commit

```bash
git add pages/unit1/c-compiler.html
git commit -m "feat: add C Compiler topic page"
```

---

## Task 3: Topic page — Compilation Process

**Files:**
- Create: `pages/unit1/compilation-process.html`

**Instructions:** Same skeleton rule as Task 2. Prev → `c-compiler.html` (label "Previous: C Compiler"), Next → `source-code.html` (label "Next: Source Code"). Quiz array: `window.compilationProcessQuiz`, `data-quiz-source="compilationProcessQuiz"`. **This page needs a `.code-block` for the real `gcc` command** — check `pages/unit1/algorithms.html` or `structure-of-c-program.html` for the exact `.code-block`/`.code-block-header`/`.copy-btn` markup to copy.

Sections:

- **What Is It? (`#introduction`):** The compilation process is the sequence of internal stages a compiler runs your source code through to produce a final executable: preprocessing, compilation (translation to assembly), assembly (translation to object code), and linking (combining object code into one executable).
- **Why Do We Need to Know This? (`#why`):** This is the practical payoff of the entire "Getting to Know C" chapter — you now get to actually turn `add.c` into a running program, using a real command.
- **Real-Life Example (`#real-life`):** Like an assembly line in a factory — raw material (source code) moves through several distinct stations (preprocessing, compiling, assembling, linking), each transforming it a bit further, until a finished product (the executable) comes out the other end.
- **Visual Explanation (`#visual`):** A `.flowchart` with 5 `.flow-box` elements in sequence: "Source Code (add.c)" → "Preprocessing" → "Compilation (to assembly)" → "Assembly (to object code)" → "Linking (to executable)", each connected by `.flow-arrow`. Caption noting that Assembler and Linker each get their own full topic in the next sub-project — this page is the overview.
- **Syntax (`#syntax`):** Explain the real compile command: `gcc add.c -o add` — `gcc` is the compiler program being invoked, `add.c` is the source file, `-o add` names the output executable `add`.
- **Step-by-Step Code (`#steps`):** In a `.code-block` (with header + copy button):
  ```
  gcc add.c -o add
  ```
  Explain: this single command runs all 4 internal stages automatically, ending with a runnable file named `add` in the current directory.
- **Dry Run (`#dryrun`):** Trace what happens when that command runs: (1) preprocessing expands `#include <stdio.h>`, (2) compilation translates the expanded code into assembly instructions, (3) assembly converts that into object code (`add.o`, an intermediate file, possibly deleted automatically after this single-command build), (4) linking combines the object code with the C standard library's own compiled code (so `printf` actually works) into the final executable `add`.
- **Common Mistakes (`#mistakes`):** Assuming "compiling" only means one single step (it's actually 4 internal stages); forgetting the `-o outputname` flag (without it, GCC uses a default output name rather than the one you might expect); trying to run the source file directly (`add.c`) instead of the compiled executable (`add`).
- **Debugging Tips (`#debugging`):** If `gcc` reports an error, it will usually mention which stage failed — most beginner errors happen during the compilation stage (a syntax mistake in your source code).
- **Best Practices (`#best-practices`):** Always recompile after making changes to source code — the executable is a snapshot from the last time you compiled, not a live reflection of your source file.
- **Interview Questions (`#interview`):** Build 6 accordion items (Easy/Medium/Hard/HR/Conceptual/Scenario), each with a real written answer:
  - Easy: "What are the 4 internal stages of the compilation process?" → Preprocessing, compilation, assembly, linking.
  - Medium: "What does the `-o` flag do in `gcc add.c -o add`?" → It names the resulting output executable file (here, `add`), instead of using a default name.
  - Hard: "Why is linking a separate stage from compilation?" → Because your program needs to be combined with pre-compiled library code (like the code that implements `printf`), which isn't part of your own source file.
  - HR: "Describe your understanding of what happens when you compile a program." → No fixed answer — a strong response walks through the 4 stages in their own words.
  - Conceptual: "Why do you need to recompile after changing source code?" → The executable is a fixed snapshot produced from an earlier version of the source; it won't reflect any changes until compiled again.
  - Scenario: "You run `add.c` directly instead of the compiled `add` file — what goes wrong?" → Source code isn't executable — you get an error, since the operating system doesn't know how to directly run C source text.
  Write out full, clear answers (2-3 sentences each) — don't leave placeholders.
- **MCQs (`#mcq`):** `<div class="quiz" data-quiz-source="compilationProcessQuiz"></div>` plus `window.compilationProcessQuiz` array with EXACTLY 5 questions covering: the 4 stages, the `gcc`/`-o` command syntax, and why recompilation is needed after source changes. Ensure every `correctIndex` actually points to the factually correct option, and every explanation is accurate.
- **Programming Exercises (`#exercises`):** Easy: write out (from memory) the 4 stages of compilation in order. Medium: write the exact `gcc` command to compile a file named `hello.c` into an executable named `hello`. Hard: research what happens if you run `gcc add.c` without the `-o` flag — what's the default output filename on Linux/macOS?
- **Assignments (`#assignments`):** Write out the full `gcc` command you'd use to compile a program called `myprogram.c` into an executable called `myprogram`, and explain each part of the command in your own words.
- **FAQs (`#faq`):** "Do I need to run all 4 stages manually?" (No — a single `gcc` command runs all of them automatically; understanding the stages just helps you understand what's happening and interpret errors.) "Does every C compiler use the same command as gcc?" (No — other compilers like Clang have their own command syntax, though many core ideas are similar.)
- **Key Takeaways (`#takeaways`):** 3 bullets: compilation is 4 internal stages (preprocessing, compilation, assembly, linking), all run by one command like `gcc add.c -o add`; the process transforms readable source code into a runnable executable; recompiling is required after any source change.

## Verification

- Run: `(Select-String -Path pages/unit1/compilation-process.html -Pattern 'question:').Count` → expect `5`.
- Run: `Select-String -Path pages/unit1/compilation-process.html -Pattern 'compilationProcessQuiz'` → expect at least 2 matches.
- Run: `Select-String -Path pages/unit1/compilation-process.html -Pattern 'gcc add.c'` → expect at least 1 match.
- Confirm `.interview-question`/`.interview-answer` counts both `6`, and `<h2>` numbers sequential with no gaps.

## Commit

```bash
git add pages/unit1/compilation-process.html
git commit -m "feat: add Compilation Process topic page"
```

---

## Task 4: Topic page — Source Code

**Files:**
- Create: `pages/unit1/source-code.html`

**Instructions:** Same skeleton rule. Prev → `compilation-process.html` (label "Previous: Compilation Process"), Next → `object-code.html` (label "Next: Object Code"). Quiz array: `window.sourceCodeQuiz`, `data-quiz-source="sourceCodeQuiz"`.

Sections:

- **What Is It? (`#introduction`):** Source code is the human-readable text a programmer writes — like `add.c` — following a programming language's rules (syntax). It's the very first artifact in the compilation pipeline, and the only one a person is expected to read and write directly.
- **Why Do We Need to Know This? (`#why`):** Recognizing what makes something "source code" (versus object code or an executable) clarifies exactly which files in a project you should be editing, and which ones are just compiler output you shouldn't touch by hand.
- **Real-Life Example (`#real-life`):** Like a handwritten recipe before it's ever cooked — readable, editable, and meaningful to a person, but not yet a finished dish (the analogy carries through: source code is the recipe, the executable is the finished dish).
- **Visual Explanation (`#visual`):** Show `add.c`'s full text again in a `.code-block`, labeled "Source Code," with a short annotation pointing out its `.c` file extension and that every character in it is meant for both the compiler and a human reader.
- **Common Mistakes (`#mistakes`):** Assuming source code and object code are interchangeable terms; forgetting that source code must be saved with the correct file extension (`.c` for C) for tools to recognize it properly; editing generated/compiled files instead of the original source (any changes would be lost on the next recompile).
- **Debugging Tips (`#debugging`):** If something about your program's behavior seems wrong, the fix always happens in the source code — never in the compiled output, which is regenerated from source every time you compile.
- **Best Practices (`#best-practices`):** Keep source code organized in clearly named files; use the standard `.c` extension so tools and other developers immediately recognize the file type.
- **Interview Questions (`#interview`):** Build 6 accordion items (Easy/Medium/Hard/HR/Conceptual/Scenario), each with a real written answer:
  - Easy: "What is source code?" → The human-readable text a programmer writes in a programming language, before compilation.
  - Medium: "What file extension does C source code typically use?" → `.c`
  - Hard: "Why should you never directly edit a compiled output file instead of the source?" → Because compiled files are regenerated from source every time you compile — any manual edits to them would be lost and wouldn't reflect your actual source code.
  - HR: "How do you keep your own code files organized?" → No fixed answer — a strong response reflects genuine, sensible file-naming/organization habits.
  - Conceptual: "Is source code something a computer can run directly?" → No — it must first be translated (compiled) into machine code before a computer can execute it.
  - Scenario: "You accidentally edit a compiled executable file directly instead of the .c source file — what happens the next time you compile?" → Your edits are lost, since compiling regenerates the executable fresh from the actual source code file.
  Write out full, clear answers (2-3 sentences each) — don't leave placeholders.
- **MCQs (`#mcq`):** `<div class="quiz" data-quiz-source="sourceCodeQuiz"></div>` plus `window.sourceCodeQuiz` array with EXACTLY 5 questions covering: definition of source code, the `.c` extension, why it must be compiled before running, and the recipe/finished-dish analogy. Ensure every `correctIndex` actually points to the factually correct option, and every explanation is accurate.
- **Programming Exercises (`#exercises`):** Easy: name the file extension used for C source code. Medium: explain in your own words why source code alone can't run on a computer. Hard: research one other language's typical source file extension (e.g. `.py` for Python, `.java` for Java) and compare it to C's `.c`.
- **Assignments (`#assignments`):** Write a one-paragraph explanation of the difference between source code and a finished, runnable program, using the recipe/dish analogy from this page.
- **FAQs (`#faq`):** "Can source code be written in any text editor?" (Yes — source code is plain text; any text editor works, though code-aware editors add helpful features.) "Is source code the same as a 'script'?" (Related but not identical — "script" often implies interpreted code run directly, while C source code must be compiled first.)
- **Key Takeaways (`#takeaways`):** 3 bullets: source code is the human-readable, human-written starting point of the pipeline; it must be compiled before it can run; always edit the source, never the compiled output.

## Verification

- Run: `(Select-String -Path pages/unit1/source-code.html -Pattern 'question:').Count` → expect `5`.
- Run: `Select-String -Path pages/unit1/source-code.html -Pattern 'sourceCodeQuiz'` → expect at least 2 matches.
- Confirm `.interview-question`/`.interview-answer` counts both `6`, and `<h2>` numbers sequential with no gaps.

## Commit

```bash
git add pages/unit1/source-code.html
git commit -m "feat: add Source Code topic page"
```

---

## Task 5: Topic page — Object Code

**Files:**
- Create: `pages/unit1/object-code.html`

**Instructions:** Same skeleton rule. Prev → `source-code.html` (label "Previous: Source Code"), Next → `executable-code.html` (label "Next: Executable Code"). Quiz array: `window.objectCodeQuiz`, `data-quiz-source="objectCodeQuiz"`.

Sections:

- **What Is It? (`#introduction`):** Object code is the intermediate machine-code translation of your source file — produced after the compilation and assembly stages, but before linking. It's not yet a complete, runnable program.
- **Why Do We Need to Know This? (`#why`):** Understanding object code explains why "compiling" isn't a single instant step, and clarifies what those `.o`/`.obj` files you may see in a project folder actually are.
- **Real-Life Example (`#real-life`):** Like a car engine built and tested on its own, before it's installed into a finished car — functional as a component, but not yet something you can drive.
- **Visual Explanation (`#visual`):** A `.flow-box` sequence: "add.c (Source Code)" → "Compiler + Assembler" → "add.o (Object Code)" → (labeled, not yet connected further) "Not Yet Runnable" — with a caption that linking (next topic) is what turns this into something runnable.
- **Common Mistakes (`#mistakes`):** Assuming object code is the finished program (it isn't runnable on its own yet); trying to "run" a `.o`/`.obj` file directly (this fails — it's an intermediate artifact, not an executable); assuming object code is human-readable (it's binary machine code, not text).
- **Debugging Tips (`#debugging`):** If you ever see file names ending in `.o` or `.obj` in a project directory, these are typically object code — safe to delete and regenerate, since they're recreated automatically from source code every time you compile.
- **Best Practices (`#best-practices`):** Don't manually edit or rely on object code files directly — treat them as disposable, regeneratable build artifacts, not something to manage by hand.
- **Interview Questions (`#interview`):** Build 6 accordion items (Easy/Medium/Hard/HR/Conceptual/Scenario), each with a real written answer:
  - Easy: "What is object code?" → The intermediate machine-code translation of source code, produced before linking, not yet a complete runnable program.
  - Medium: "Can you run an object code file (like `add.o`) directly?" → No — it isn't a complete executable yet; it still needs to go through linking.
  - Hard: "Why isn't object code considered a finished program?" → Because it may reference external code (like standard library functions such as `printf`) that hasn't been combined in yet — that combination happens during linking.
  - HR: "Have you ever seen `.o` or `.obj` files in a project before?" → No fixed answer — encourage reflecting on any past experience noticing build artifacts in a folder.
  - Conceptual: "Is object code human-readable?" → No — it's binary machine code, not readable text like source code.
  - Scenario: "You find a `.o` file in your project folder and aren't sure if it's safe to delete — what should you do?" → It's generally safe to delete, since object code is a regeneratable build artifact recreated automatically the next time you compile.
  Write out full, clear answers (2-3 sentences each) — don't leave placeholders.
- **MCQs (`#mcq`):** `<div class="quiz" data-quiz-source="objectCodeQuiz"></div>` plus `window.objectCodeQuiz` array with EXACTLY 5 questions covering: definition of object code, why it's not yet runnable, the `.o`/`.obj` extension, and its relationship to linking. Ensure every `correctIndex` actually points to the factually correct option, and every explanation is accurate.
- **Programming Exercises (`#exercises`):** Easy: name the typical file extension for object code on Linux/macOS (`.o`) and Windows (`.obj`). Medium: explain in your own words why object code alone can't run yet. Hard: research the `gcc -c` flag and what kind of output it produces (object code only, without linking).
- **Assignments (`#assignments`):** Write a short explanation of the difference between source code, object code, and an executable, using the car-engine analogy from this page.
- **FAQs (`#faq`):** "Do I need to manage object code files myself?" (No — they're intermediate build artifacts automatically created and used by the compiler/linker; you generally don't need to touch them directly.) "Is object code the same across different operating systems?" (No — object code format and conventions can differ between platforms, which is part of why compiled programs aren't automatically cross-platform.)
- **Key Takeaways (`#takeaways`):** 3 bullets: object code is an intermediate, not-yet-runnable translation of source code; it typically has a `.o`/`.obj` extension and is a disposable build artifact; linking (next topic) is what turns it into a complete executable.

## Verification

- Run: `(Select-String -Path pages/unit1/object-code.html -Pattern 'question:').Count` → expect `5`.
- Run: `Select-String -Path pages/unit1/object-code.html -Pattern 'objectCodeQuiz'` → expect at least 2 matches.
- Confirm `.interview-question`/`.interview-answer` counts both `6`, and `<h2>` numbers sequential with no gaps.

## Commit

```bash
git add pages/unit1/object-code.html
git commit -m "feat: add Object Code topic page"
```

---

## Task 6: Topic page — Executable Code

**Files:**
- Create: `pages/unit1/executable-code.html`

**Instructions:** Same skeleton rule. Prev → `object-code.html` (label "Previous: Object Code"), Next → `execution-process.html` (label "Next: Execution Process"). Quiz array: `window.executableCodeQuiz`, `data-quiz-source="executableCodeQuiz"`.

Sections:

- **What Is It? (`#introduction`):** Executable code is the final, complete, runnable output of the compilation pipeline — produced after linking combines your object code with any needed library code. This is the actual file you run (e.g. `add` or `add.exe`).
- **Why Do We Need to Know This? (`#why`):** This is the artifact that actually matters to an end user — everything earlier in the pipeline (source, object code) exists purely to produce this final, runnable result.
- **Real-Life Example (`#real-life`):** Like the finished car, fully assembled and ready to drive — the engine (object code) and every other component (library code) have now been combined into one complete, usable whole.
- **Visual Explanation (`#visual`):** A `.flow-box` sequence: "add.o (Object Code)" → "Linker" → "add (Executable Code)" → labeled "Ready to Run" — visually completing the pipeline chain shown across this chapter's pages.
- **Common Mistakes (`#mistakes`):** Confusing the executable with the source file (they have different names/extensions and very different contents); forgetting that an executable is platform-specific (an executable built on Windows generally won't run on macOS/Linux without rebuilding); assuming the executable updates itself automatically when source code changes (it doesn't — recompiling is required).
- **Debugging Tips (`#debugging`):** If running a program shows old/unexpected behavior after changing source code, the most likely cause is forgetting to recompile — the executable is still the old version.
- **Best Practices (`#best-practices`):** Always recompile before testing after any source code change; keep executables out of version control when possible, since they're regeneratable from source (a detail worth knowing even at this early stage).
- **Interview Questions (`#interview`):** Build 6 accordion items (Easy/Medium/Hard/HR/Conceptual/Scenario), each with a real written answer:
  - Easy: "What is executable code?" → The final, complete, runnable output of the compilation pipeline, produced after linking.
  - Medium: "What produces executable code from object code?" → The linker, which combines object code with any needed library code.
  - Hard: "Why might an executable built on one operating system fail to run on another?" → Executables are platform-specific — they're built to match a particular operating system's and CPU's expectations, so they generally require rebuilding for a different platform.
  - HR: "Describe the moment you first successfully ran a program you compiled yourself." → No fixed answer (or, if not yet experienced, describe what they expect that moment to feel like) — encourages genuine reflection.
  - Conceptual: "Is the executable the same thing as the source code, just renamed?" → No — it's a completely different, binary machine-code file produced through several transformation stages, not simply a renamed copy of the source.
  - Scenario: "You change your source code but forget to recompile before running the program again — what do you actually see?" → The old behavior — the executable still reflects the previous, unchanged version of the compiled program.
  Write out full, clear answers (2-3 sentences each) — don't leave placeholders.
- **MCQs (`#mcq`):** `<div class="quiz" data-quiz-source="executableCodeQuiz"></div>` plus `window.executableCodeQuiz` array with EXACTLY 5 questions covering: definition of executable code, the linker's role in producing it, platform-specificity, and why recompiling is needed after changes. Ensure every `correctIndex` actually points to the factually correct option, and every explanation is accurate.
- **Programming Exercises (`#exercises`):** Easy: name what produces executable code (the linker). Medium: explain in your own words why an executable built on Windows won't run on macOS without rebuilding. Hard: research the typical executable file extension on Windows (`.exe`) versus Linux/macOS (often no extension at all) and why that difference exists.
- **Assignments (`#assignments`):** Write a short paragraph tracing `add.c`'s full journey from source code to executable code, using the terms covered across this chapter so far (source code, object code, executable code).
- **FAQs (`#faq`):** "Can I share my executable with someone on a different operating system?" (Generally no, not directly — they'd typically need to compile the source code themselves on their own system, or you'd need to build a version specifically for their platform.) "Is the executable the only file I need to share to give someone my program?" (Usually yes, for a simple standalone program like this course's examples — more complex programs may depend on additional external files.)
- **Key Takeaways (`#takeaways`):** 3 bullets: executable code is the final, runnable output of the pipeline, produced by the linker; it's platform-specific and must be rebuilt for different operating systems; recompiling after any source change is required to keep the executable up to date.

## Verification

- Run: `(Select-String -Path pages/unit1/executable-code.html -Pattern 'question:').Count` → expect `5`.
- Run: `Select-String -Path pages/unit1/executable-code.html -Pattern 'executableCodeQuiz'` → expect at least 2 matches.
- Confirm `.interview-question`/`.interview-answer` counts both `6`, and `<h2>` numbers sequential with no gaps.

## Commit

```bash
git add pages/unit1/executable-code.html
git commit -m "feat: add Executable Code topic page"
```

---

## Task 7: Topic page — Execution Process (+ chapter mini project)

**Files:**
- Create: `pages/unit1/execution-process.html`

**Instructions:** Same skeleton rule. Prev → `executable-code.html` (label "Previous: Executable Code"). This is the **last page in this sub-project** — Group 3b (Assembler, Linker, Loader, etc.) doesn't exist yet, so the footer's "Next" slot should be an empty `<span></span>`, same pattern `structure-of-c-program.html` used before this task's Step 2 filled it in (don't link "Next" to a non-existent page). Quiz array: `window.executionProcessQuiz`, `data-quiz-source="executionProcessQuiz"`.

**This page includes a Mini Project section** (chapter-level, only on this page, same pattern as `flowcharts.html` and `structure-of-c-program.html` used for their own chapter capstones).

Sections:

- **What Is It? (`#introduction`):** Execution is what happens when you actually run the compiled executable — the operating system loads it into memory, and the CPU begins carrying out its instructions one by one, producing whatever output the program is designed to produce.
- **Why Do We Need to Know This? (`#why`):** This is the final step of the entire journey `add.c` has taken across this chapter — from readable text, through several transformation stages, to actually appearing as output on a screen.
- **Real-Life Example (`#real-life`):** Like finally starting the finished, assembled car's engine and driving it — every earlier step (building, assembling, testing) existed to make this moment possible.
- **Visual Explanation (`#visual`):** A `.flowchart` completing the full pipeline shown across this chapter: "Source Code" → "Preprocessing" → "Compilation" → "Assembly" → "Linking" → "Executable" → "Execution (Running)" → "Output: The sum of 5 and 3 is 8" — the entire journey in one diagram.
- **Dry Run (`#dryrun`):** Trace what happens when you run `./add` (or `add.exe`): (1) the operating system loads the executable into memory, (2) the CPU begins executing its instructions starting at `main()`, (3) the `printf` statement runs, sending "The sum of 5 and 3 is 8" to the screen, (4) `return 0;` signals successful completion, (5) the operating system reclaims the program's memory. State the exact final output: `The sum of 5 and 3 is 8`.
- **Common Mistakes (`#mistakes`):** Assuming "execution" and "compilation" are the same step (compilation happens once, ahead of time; execution happens every time you run the program); forgetting that a program must finish compiling successfully before it can ever be executed; assuming a program automatically re-reads its own source code while running (it doesn't — it runs whatever was compiled, regardless of any later source changes).
- **Debugging Tips (`#debugging`):** If a program compiles successfully but behaves unexpectedly when run, the bug is a logic issue happening during execution — not a compilation problem, since compilation already succeeded.
- **Best Practices (`#best-practices`):** Always test-run your program after compiling, not just check that it compiled without errors — a successful compile only means the syntax was valid, not that the program behaves correctly.
- **Interview Questions (`#interview`):** Build 6 accordion items (Easy/Medium/Hard/HR/Conceptual/Scenario), each with a real written answer:
  - Easy: "What happens during the execution process?" → The operating system loads the executable into memory, and the CPU runs its instructions, producing output.
  - Medium: "What's the difference between compilation and execution?" → Compilation happens once ahead of time, translating source code into an executable; execution happens every time you actually run that executable.
  - Hard: "Why can a program that compiles successfully still misbehave when executed?" → Compilation only verifies the code translates correctly (valid syntax); it doesn't verify the program's logic is correct, which only shows up when the program actually runs.
  - HR: "Describe, step by step, what happens when you double-click or run a compiled program." → No fixed answer — a strong response walks through loading, execution, and output in their own words.
  - Conceptual: "Does a running program re-read its original source code file?" → No — it runs entirely from the compiled executable; changes to the source file have no effect until recompiled.
  - Scenario: "Your program compiles with no errors, but prints the wrong output — what stage does this problem belong to?" → Execution (a logic error), not compilation, since compilation already succeeded.
  Write out full, clear answers (2-3 sentences each) — don't leave placeholders.
- **MCQs (`#mcq`):** `<div class="quiz" data-quiz-source="executionProcessQuiz"></div>` plus `window.executionProcessQuiz` array with EXACTLY 5 questions covering: what happens during execution, compilation vs. execution timing, why compile-time success doesn't guarantee correct runtime behavior, and reading `add.c`'s final dry-run output. Ensure every `correctIndex` actually points to the factually correct option, and every explanation is accurate.
- **Programming Exercises (`#exercises`):** Easy: state, from memory, what the operating system does at the start of execution (loads the executable into memory). Medium: explain in your own words why a program can compile successfully but still have bugs. Hard: trace, in writing, what you'd expect to happen if `add.c`'s `printf` line were changed to print a different sentence, from source code all the way through to final output.
- **Assignments (`#assignments`):** Write a complete, step-by-step trace of `add.c`'s entire journey, from source code through every pipeline stage in this chapter, ending in its final printed output.
- **Mini Project (`#miniproject`) — chapter-level, only on this page:** Title it "Trace Your Own Program." Instructions: pick any short C program idea (or reuse `add.c`), and write out — in plain English, stage by stage — what happens to it through the full pipeline: source code → preprocessing → compilation → assembly → linking → executable → execution. Predict its exact console output before "running" it mentally. Write this as a clear, encouraging project brief (a few sentences), noting this capstones the "Pipeline" chapter — the reader now understands the complete journey from writing code to seeing it run.
- **FAQs (`#faq`):** "Does a program need to be recompiled every time it's run?" (No — only when the source code changes; the same compiled executable can be run many times without recompiling.) "What happens to a program's memory after it finishes running?" (The operating system reclaims it, making it available for other programs.)
- **Key Takeaways (`#takeaways`):** 3 bullets: execution is the final stage where the OS loads and the CPU runs the compiled executable; compiling successfully doesn't guarantee correct behavior at runtime; you've now traced a program's complete journey from source code to running output.

## Verification

- Run: `(Select-String -Path pages/unit1/execution-process.html -Pattern 'question:').Count` → expect `5`.
- Run: `Select-String -Path pages/unit1/execution-process.html -Pattern 'executionProcessQuiz'` → expect at least 2 matches.
- Run: `Select-String -Path pages/unit1/execution-process.html -Pattern 'miniproject'` → expect at least 1 match.
- Run: `Select-String -Path pages/unit1/execution-process.html -Pattern 'Next:'` → expect NO match (last page, no "Next" link).
- Confirm `.interview-question`/`.interview-answer` counts both `6`, and `<h2>` numbers sequential with no gaps.

## Commit

```bash
git add pages/unit1/execution-process.html
git commit -m "feat: add Execution Process topic page with chapter mini project"
```

---

## Task 8: Final verification pass

- [ ] **Step 1: Sidebar consistency across all 19 files**

```powershell
$files = @('index.html','pages\unit1\evolution-of-programming.html','pages\unit1\programming-languages.html','pages\unit1\problem-solving.html','pages\unit1\sequential-logic.html','pages\unit1\algorithms.html','pages\unit1\pseudocode.html','pages\unit1\flowcharts.html','pages\unit1\introduction-to-c.html','pages\unit1\history-of-c.html','pages\unit1\features-of-c.html','pages\unit1\applications-of-c.html','pages\unit1\structure-of-c-program.html','pages\unit1\c-compiler.html','pages\unit1\compilation-process.html','pages\unit1\source-code.html','pages\unit1\object-code.html','pages\unit1\executable-code.html','pages\unit1\execution-process.html')
foreach ($f in $files) {
  $c = Get-Content $f -Raw
  $ok = ($c -match 'c-compiler\.html') -and ($c -match 'compilation-process\.html') -and ($c -match 'source-code\.html') -and ($c -match 'object-code\.html') -and ($c -match 'executable-code\.html') -and ($c -match 'execution-process\.html') -and ($c -match 'evolution-of-programming\.html') -and ($c -match 'structure-of-c-program\.html')
  Write-Output "$f : $ok"
}
```
Expect `True` for all 19.

- [ ] **Step 2: Prev/next chain unbroken across the full 18-topic sequence**

```powershell
$order = @('evolution-of-programming.html','programming-languages.html','problem-solving.html','sequential-logic.html','algorithms.html','pseudocode.html','flowcharts.html','introduction-to-c.html','history-of-c.html','features-of-c.html','applications-of-c.html','structure-of-c-program.html','c-compiler.html','compilation-process.html','source-code.html','object-code.html','executable-code.html','execution-process.html')
for ($i = 0; $i -lt $order.Length - 1; $i++) {
  $current = "pages\unit1\$($order[$i])"
  $next = $order[$i + 1]
  $ok = (Get-Content $current -Raw) -match [regex]::Escape($next)
  Write-Output "$($order[$i]) -> $next : $ok"
}
```
Expect `True` for all 17 pairs.

- [ ] **Step 3: MCQ counts for the 6 new pages**

```powershell
$pages = @('c-compiler.html','compilation-process.html','source-code.html','object-code.html','executable-code.html','execution-process.html')
foreach ($p in $pages) {
  $count = (Select-String -Path "pages\unit1\$p" -Pattern 'question:').Count
  Write-Output "$p : $count questions"
}
```
Expect `5` for every page.

- [ ] **Step 4: Interview accordion counts match on the 6 new pages**

```powershell
foreach ($p in $pages) {
  $q = (Select-String -Path "pages\unit1\$p" -Pattern 'class="interview-question"').Count
  $a = (Select-String -Path "pages\unit1\$p" -Pattern 'class="interview-answer"').Count
  Write-Output "$p : questions=$q answers=$a"
}
```
Expect `$q` to equal `$a` for every page, both `6`.

- [ ] **Step 5: Section numbering has no gaps on the 6 new pages**

```powershell
foreach ($p in $pages) {
  $nums = Select-String -Path "pages\unit1\$p" -Pattern '<h2>(\d+)\.' -AllMatches | ForEach-Object { $_.Matches } | ForEach-Object { [int]$_.Groups[1].Value }
  $expected = 1..($nums.Count)
  $isSequential = -not (Compare-Object $nums $expected)
  Write-Output "$p : sections=$($nums.Count) sequential=$isSequential"
}
```
Expect `sequential=True` for every page — this was a known defect in a prior sub-project, verify it did not recur.

- [ ] **Step 6: `git status` clean, `git log` sanity check**

Run: `git status --short` → expect clean.
Run: `git log --oneline -15` → confirm all 8 task commits from this plan are present in order.

- [ ] **Step 7: Manual browser check (documented as a follow-up, not automatable here)**

Note in the final report that a human should open `index.html`, expand the Unit 1 sidebar accordion, and click through all 18 topics in order, confirming: sidebar links resolve correctly, prev/next buttons chain through the full sequence without dead ends, quizzes render and score correctly on the 6 new pages, the interview-question accordions expand/collapse, and the Compilation Process page's copy-code button works on the `gcc` command example.

- [ ] **Step 8: Commit any fixes found during verification**

```bash
git add -A
git commit -m "fix: address issues found during Unit1 Group3a verification pass"
```
(Skip if nothing needed fixing.)

---

## Self-Review Notes

- **Spec coverage:** sidebar/navigation wiring (Task 1), all 6 topic pages matching the design spec's per-topic breakdown (Tasks 2-7), mini project on the last page only (Task 7), full-chain verification (Task 8). Matches the approved design spec section-by-section.
- **Deferred items confirmed out of scope, per spec:** Assembler/Linker/Loader as their own topics, Debugging/OS/Interpreter/general-Compiler-concept topics (Group 3b), Comments (Group 4), Unit 2, `window.searchIndex` population — none appear in this plan.
- **Type/interface consistency:** every new quiz array follows the same `{question, options, correctIndex, explanation}` schema consumed by the existing `js/quiz.js` — no new engine needed. Every interview accordion follows the existing `.interview-item`/`.interview-question`/`.interview-answer` + `js/accordion.js` pattern. Section numbering explicitly called out as a must-verify item in every task, since it was a real defect caught in the prior sub-project's review.
