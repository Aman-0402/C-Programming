# Unit 1 / Group 1: Programming Fundamentals Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship 7 Unit 1 topic pages (Evolution of Programming → Flowcharts) using the full 21-section template, plus shared reusable diagram/quiz/copy-code infrastructure, per `docs/superpowers/specs/2026-07-22-unit1-group1-programming-fundamentals-design.md`.

**Architecture:** Shared CSS/JS infra first (diagrams, quiz engine, copy-code), then the Unit 1 index page, then one topic page per task. Every topic page copies the shell markup pattern from `index.html` (topnav/sidebar/search-panel/footer) plus the new diagram/quiz includes.

**Tech Stack:** HTML5, CSS3, vanilla JS (same as foundation — no new dependencies).

**Content-authoring note (adaptation from strict "no placeholders"):** Tasks 1-4 (shared infra) and Task 6 (the first topic page) contain complete, literal code exactly as an engineer would need. Tasks 7-12 (the remaining 6 topic pages) are **content-authoring** tasks, not pure code tasks — this plan gives each one a complete content brief (analogy, key facts, structure, MCQ topic list, mistakes list, etc.) rather than pre-written prose, because pre-writing ~1,500+ lines of educational HTML per topic inside this plan document would make the plan itself unreviewable. Task 6 is fully written out to lock the exact HTML pattern (section markup, class names, quiz data-array format) that Tasks 7-12 must replicate structurally. Each content-authoring task explicitly says "follow the exact HTML structure/classes from Task 6" so there is no ambiguity about the *shape* of the output, only its *words*.

**Testing approach:** No test framework (static site). Each task: write file(s) → syntax/structure verification → commit. Full visual/interactive browser verification happens once at the end (Task 13) and is a manual step, same as the foundation plan.

---

## Task 1: Diagram building blocks (`css/diagrams.css`)

**Files:**
- Create: `css/diagrams.css`

- [ ] **Step 1: Write the file**

```css
/* css/diagrams.css — HTML/CSS-only flowchart, memory, and timeline diagrams */

.flowchart {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0;
  margin: var(--space-5) 0;
}

.flow-box {
  background: var(--surface);
  border: 2px solid var(--color-primary);
  border-radius: var(--radius-md);
  padding: var(--space-3) var(--space-5);
  text-align: center;
  min-width: 200px;
  font-weight: 600;
}

.flow-box-start,
.flow-box-end {
  border-radius: var(--radius-full);
  background: var(--color-primary);
  color: #fff;
}

.flow-box-decision {
  border-color: var(--color-warning);
  transform: skewX(-6deg);
}

.flow-box-decision span {
  display: inline-block;
  transform: skewX(6deg);
}

.flow-arrow {
  width: 2px;
  height: var(--space-6);
  background: var(--text-muted);
  position: relative;
}

.flow-arrow::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 8px solid var(--text-muted);
}

/* Memory diagram */
.memory-diagram {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
  margin: var(--space-5) 0;
}

.memory-cell {
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  min-width: 80px;
  overflow: hidden;
}

.memory-cell-label {
  background: var(--bg);
  padding: var(--space-1) var(--space-2);
  font-size: 0.75rem;
  color: var(--text-muted);
  text-align: center;
  border-bottom: 1px solid var(--border);
}

.memory-cell-value {
  padding: var(--space-3);
  text-align: center;
  font-family: var(--font-mono);
  font-weight: 600;
}

/* Timeline (for Evolution of Programming etc.) */
.timeline {
  position: relative;
  margin: var(--space-6) 0;
  padding-left: var(--space-6);
  border-left: 2px solid var(--border);
}

.timeline-item {
  position: relative;
  margin-bottom: var(--space-5);
}

.timeline-item::before {
  content: '';
  position: absolute;
  left: calc(-1 * var(--space-6) - 5px);
  top: 4px;
  width: 10px;
  height: 10px;
  border-radius: var(--radius-full);
  background: var(--color-primary);
}

.timeline-item-year {
  font-weight: 700;
  color: var(--color-primary);
  font-size: 0.85rem;
}
```

- [ ] **Step 2: Verify**

Run: `Test-Path css/diagrams.css` → expect `True`.

- [ ] **Step 3: Commit**

```bash
git add css/diagrams.css
git commit -m "feat: add flowchart, memory, and timeline diagram CSS building blocks"
```

---

## Task 2: Quiz styling (`css/quiz.css`)

**Files:**
- Create: `css/quiz.css`

- [ ] **Step 1: Write the file**

```css
/* css/quiz.css — interactive MCQ quiz styling */

.quiz {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: var(--space-5);
  margin: var(--space-5) 0;
}

.quiz-progress {
  font-size: 0.8rem;
  color: var(--text-muted);
  margin-bottom: var(--space-2);
}

.quiz-options {
  list-style: none;
  margin: var(--space-4) 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.quiz-option {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-3);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  cursor: pointer;
}

.quiz-option:hover {
  background: var(--bg);
}

.quiz-option-correct {
  border-color: var(--color-success);
  background: color-mix(in srgb, var(--color-success) 12%, transparent);
}

.quiz-option-incorrect {
  border-color: var(--color-danger);
  background: color-mix(in srgb, var(--color-danger) 12%, transparent);
}

.quiz-feedback {
  margin-top: var(--space-4);
  padding: var(--space-3) var(--space-4);
  border-radius: var(--radius-md);
  font-size: 0.9rem;
}

.quiz-feedback-correct {
  background: color-mix(in srgb, var(--color-success) 12%, transparent);
  color: var(--color-success);
}

.quiz-feedback-incorrect {
  background: color-mix(in srgb, var(--color-danger) 12%, transparent);
  color: var(--color-danger);
}

.quiz-score {
  font-size: 1.1rem;
}
```

- [ ] **Step 2: Verify**

Run: `Test-Path css/quiz.css` → expect `True`.

- [ ] **Step 3: Commit**

```bash
git add css/quiz.css
git commit -m "feat: add interactive quiz styling"
```

---

## Task 3: Quiz engine (`js/quiz.js`)

**Files:**
- Create: `js/quiz.js`

- [ ] **Step 1: Write the file**

```javascript
// js/quiz.js — generic MCQ quiz engine driven by a per-page data array.
//
// Usage on a page:
//   <div class="quiz" data-quiz-source="evolutionQuiz"></div>
//   <script>
//     window.evolutionQuiz = [
//       { question: "...", options: ["A", "B", "C", "D"], correctIndex: 2, explanation: "..." },
//       ...
//     ];
//   </script>
//   <script src="../../js/quiz.js"></script>
(function () {
  function renderResults(quizEl, data, score) {
    quizEl.innerHTML =
      '<div class="quiz-results">' +
      '<h4>Quiz Complete</h4>' +
      '<p class="quiz-score">You scored <strong>' + score + ' / ' + data.length + '</strong></p>' +
      '<button class="btn btn-ghost quiz-retry">Try Again</button>' +
      '</div>';

    quizEl.querySelector('.quiz-retry').addEventListener('click', function () {
      renderQuestion(quizEl, data, 0, 0);
    });
  }

  function renderQuestion(quizEl, data, index, score) {
    var q = data[index];

    quizEl.innerHTML =
      '<div class="quiz-question">' +
      '<p class="quiz-progress">Question ' + (index + 1) + ' of ' + data.length + '</p>' +
      '<h4>' + q.question + '</h4>' +
      '<ul class="quiz-options">' +
      q.options.map(function (opt, i) {
        return '<li><label class="quiz-option"><input type="radio" name="quiz-option" value="' + i + '"> <span>' + opt + '</span></label></li>';
      }).join('') +
      '</ul>' +
      '<button class="btn btn-primary quiz-submit">Submit Answer</button>' +
      '<div class="quiz-feedback" hidden></div>' +
      '</div>';

    var submitBtn = quizEl.querySelector('.quiz-submit');
    var mode = 'answer';

    submitBtn.addEventListener('click', function () {
      if (mode === 'answer') {
        var selected = quizEl.querySelector('input[name="quiz-option"]:checked');
        if (!selected) return;

        var chosen = Number(selected.value);
        var correct = chosen === q.correctIndex;
        if (correct) score++;

        quizEl.querySelectorAll('.quiz-option').forEach(function (optEl, i) {
          optEl.querySelector('input').disabled = true;
          if (i === q.correctIndex) optEl.classList.add('quiz-option-correct');
          else if (i === chosen) optEl.classList.add('quiz-option-incorrect');
        });

        var feedback = quizEl.querySelector('.quiz-feedback');
        feedback.hidden = false;
        feedback.className = 'quiz-feedback ' + (correct ? 'quiz-feedback-correct' : 'quiz-feedback-incorrect');
        feedback.innerHTML = (correct ? '<strong>Correct!</strong> ' : '<strong>Not quite.</strong> ') + q.explanation;

        mode = 'advance';
        submitBtn.textContent = index === data.length - 1 ? 'See Results' : 'Next Question';
      } else if (index === data.length - 1) {
        renderResults(quizEl, data, score);
      } else {
        renderQuestion(quizEl, data, index + 1, score);
      }
    });
  }

  document.querySelectorAll('.quiz').forEach(function (quizEl) {
    var sourceName = quizEl.getAttribute('data-quiz-source');
    var data = window[sourceName];
    if (!Array.isArray(data) || !data.length) return;
    renderQuestion(quizEl, data, 0, 0);
  });
})();
```

- [ ] **Step 2: Syntax check**

Run: `node --check js/quiz.js` → expect no output, exit 0.

- [ ] **Step 3: Commit**

```bash
git add js/quiz.js
git commit -m "feat: add generic interactive MCQ quiz engine"
```

---

## Task 4: Copy-code button behavior (`js/copy-code.js`)

**Files:**
- Create: `js/copy-code.js`

- [ ] **Step 1: Write the file**

```javascript
// js/copy-code.js — wires every .copy-btn inside a .code-block to clipboard copy
(function () {
  document.querySelectorAll('.code-block').forEach(function (block) {
    var btn = block.querySelector('.copy-btn');
    var codeEl = block.querySelector('pre');
    if (!btn || !codeEl) return;

    var originalLabel = btn.textContent;

    btn.addEventListener('click', function () {
      navigator.clipboard.writeText(codeEl.textContent).then(function () {
        btn.textContent = 'Copied!';
        setTimeout(function () {
          btn.textContent = originalLabel;
        }, 1500);
      });
    });
  });
})();
```

- [ ] **Step 2: Syntax check**

Run: `node --check js/copy-code.js` → expect no output, exit 0.

- [ ] **Step 3: Commit**

```bash
git add js/copy-code.js
git commit -m "feat: add clipboard copy behavior for code blocks"
```

---

## Task 5: Unit 1 index page + sidebar expansion

**Files:**
- Create: `pages/unit1/index.html`
- Modify: `index.html` (homepage) — expand the Unit 1 sidebar entry

**Context:** The homepage sidebar currently has one link per unit (`<div class="sidebar-unit">...<a class="sidebar-link" href="pages/unit1/index.html">...`). This task expands Unit 1's entry into a nested list of its 7 topic links (the rest of Unit 1's 21 topics will be added to this same list by later sub-projects — leave room, don't rebuild this block later). Units 2-5 stay as single collapsed links, unchanged.

- [ ] **Step 1: Create `pages/unit1/index.html`**

This is a new page using the same shell pattern as the homepage (topnav/sidebar/search-panel/footer/scripts), but with unit-overview content instead of the homepage hero. Write the full file:

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Unit 1: Programming Fundamentals &amp; C Basics — C Programming eBook</title>
<meta name="description" content="Unit 1 of the interactive C Programming eBook: programming fundamentals, algorithms, pseudocode, flowcharts, and the basics of C.">

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">

<link rel="stylesheet" href="../../css/variables.css">
<link rel="stylesheet" href="../../css/base.css">
<link rel="stylesheet" href="../../css/layout.css">
<link rel="stylesheet" href="../../css/components.css">

<script>
  (function () {
    var saved = localStorage.getItem('theme');
    var theme = saved || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', theme);
  })();
</script>
</head>
<body>

<div class="progress-bar" id="progress-bar"></div>

<div class="shell" id="shell">

  <nav class="topnav">
    <div class="topnav-left">
      <button class="icon-btn mobile-menu-toggle" id="mobile-menu-toggle" aria-label="Toggle menu">
        <i class="fa-solid fa-bars"></i>
      </button>
      <a href="../../index.html" class="logo">
        <i class="fa-solid fa-code" style="color: var(--color-primary);"></i>
        C Programming eBook
      </a>
      <div class="breadcrumbs">
        <a href="../../index.html">Home</a>
        <span>/</span>
        <span>Unit 1</span>
      </div>
    </div>
    <div class="topnav-right">
      <button class="icon-btn" id="search-open" aria-label="Search">
        <i class="fa-solid fa-magnifying-glass"></i>
      </button>
      <button class="icon-btn" id="theme-toggle" aria-label="Toggle dark mode" aria-pressed="false">
        <i class="fa-solid fa-sun icon-sun"></i>
        <i class="fa-solid fa-moon icon-moon"></i>
      </button>
    </div>
  </nav>

  <aside class="sidebar">
    <button class="icon-btn" id="sidebar-collapse" aria-label="Collapse sidebar" style="margin-bottom: var(--space-4);">
      <i class="fa-solid fa-angles-left"></i>
    </button>

    <div class="sidebar-unit">
      <div class="sidebar-unit-title"><span class="sidebar-label">Unit 1</span></div>
      <a class="sidebar-link active" href="index.html"><i class="fa-solid fa-book"></i><span class="sidebar-label">Unit 1 Overview</span></a>
      <a class="sidebar-link" href="evolution-of-programming.html"><i class="fa-solid fa-clock-rotate-left"></i><span class="sidebar-label">Evolution of Programming</span></a>
      <a class="sidebar-link" href="programming-languages.html"><i class="fa-solid fa-language"></i><span class="sidebar-label">Programming Languages</span></a>
      <a class="sidebar-link" href="problem-solving.html"><i class="fa-solid fa-puzzle-piece"></i><span class="sidebar-label">Problem Solving</span></a>
      <a class="sidebar-link" href="sequential-logic.html"><i class="fa-solid fa-list-ol"></i><span class="sidebar-label">Sequential Logic</span></a>
      <a class="sidebar-link" href="algorithms.html"><i class="fa-solid fa-diagram-project"></i><span class="sidebar-label">Algorithms</span></a>
      <a class="sidebar-link" href="pseudocode.html"><i class="fa-solid fa-file-lines"></i><span class="sidebar-label">Pseudocode</span></a>
      <a class="sidebar-link" href="flowcharts.html"><i class="fa-solid fa-sitemap"></i><span class="sidebar-label">Flowcharts</span></a>
    </div>
    <div class="sidebar-unit">
      <div class="sidebar-unit-title"><span class="sidebar-label">Unit 2</span></div>
      <a class="sidebar-link" href="../unit2/index.html"><i class="fa-solid fa-book"></i><span class="sidebar-label">C Building Blocks &amp; Data Types</span></a>
    </div>
    <div class="sidebar-unit">
      <div class="sidebar-unit-title"><span class="sidebar-label">Unit 3</span></div>
      <a class="sidebar-link" href="../unit3/index.html"><i class="fa-solid fa-book"></i><span class="sidebar-label">Control Statements</span></a>
    </div>
    <div class="sidebar-unit">
      <div class="sidebar-unit-title"><span class="sidebar-label">Unit 4</span></div>
      <a class="sidebar-link" href="../unit4/index.html"><i class="fa-solid fa-book"></i><span class="sidebar-label">Strings, Functions &amp; Pointers</span></a>
    </div>
    <div class="sidebar-unit">
      <div class="sidebar-unit-title"><span class="sidebar-label">Unit 5</span></div>
      <a class="sidebar-link" href="../unit5/index.html"><i class="fa-solid fa-book"></i><span class="sidebar-label">Structures, Files &amp; Memory Management</span></a>
    </div>
  </aside>

  <main class="content">
    <section class="hero" style="padding-top: var(--space-6);">
      <span class="badge hero-badge"><i class="fa-solid fa-layer-group"></i> Unit 1 of 5</span>
      <h1>Programming Fundamentals &amp; C Basics</h1>
      <p class="lead">Before writing a single line of C, you need to think like a programmer. This unit covers how programming works, how to break problems down, and how to plan a solution before touching code.</p>
    </section>

    <section class="section" style="margin-top: var(--space-6);">
      <h2 class="section-title">Programming Fundamentals</h2>
      <div class="unit-grid">
        <div class="card unit-card">
          <div class="unit-card-number"><i class="fa-solid fa-clock-rotate-left"></i></div>
          <h3>Evolution of Programming</h3>
          <p>How we went from wiring machines by hand to writing readable code.</p>
          <a href="evolution-of-programming.html" class="btn btn-ghost">Start <i class="fa-solid fa-arrow-right"></i></a>
        </div>
        <div class="card unit-card">
          <div class="unit-card-number"><i class="fa-solid fa-language"></i></div>
          <h3>Programming Languages</h3>
          <p>What a programming language is, and why C sits between low-level and high-level.</p>
          <a href="programming-languages.html" class="btn btn-ghost">Start <i class="fa-solid fa-arrow-right"></i></a>
        </div>
        <div class="card unit-card">
          <div class="unit-card-number"><i class="fa-solid fa-puzzle-piece"></i></div>
          <h3>Problem Solving</h3>
          <p>The mental habit every programmer needs before writing code.</p>
          <a href="problem-solving.html" class="btn btn-ghost">Start <i class="fa-solid fa-arrow-right"></i></a>
        </div>
        <div class="card unit-card">
          <div class="unit-card-number"><i class="fa-solid fa-list-ol"></i></div>
          <h3>Sequential Logic</h3>
          <p>Why computers do exactly what you tell them, in exactly the order you tell them.</p>
          <a href="sequential-logic.html" class="btn btn-ghost">Start <i class="fa-solid fa-arrow-right"></i></a>
        </div>
        <div class="card unit-card">
          <div class="unit-card-number"><i class="fa-solid fa-diagram-project"></i></div>
          <h3>Algorithms</h3>
          <p>Turning a plan into precise, ordered steps a computer can follow.</p>
          <a href="algorithms.html" class="btn btn-ghost">Start <i class="fa-solid fa-arrow-right"></i></a>
        </div>
        <div class="card unit-card">
          <div class="unit-card-number"><i class="fa-solid fa-file-lines"></i></div>
          <h3>Pseudocode</h3>
          <p>Writing an algorithm in plain English before writing real code.</p>
          <a href="pseudocode.html" class="btn btn-ghost">Start <i class="fa-solid fa-arrow-right"></i></a>
        </div>
        <div class="card unit-card">
          <div class="unit-card-number"><i class="fa-solid fa-sitemap"></i></div>
          <h3>Flowcharts</h3>
          <p>Drawing a plan as a picture, so anyone can follow the logic at a glance.</p>
          <a href="flowcharts.html" class="btn btn-ghost">Start <i class="fa-solid fa-arrow-right"></i></a>
        </div>
      </div>
    </section>
  </main>

  <footer class="site-footer">
    <p>Built for absolute beginners. &copy; 2026 C Programming eBook.</p>
  </footer>

</div>

<div class="search-panel" id="search-panel" data-open="false">
  <div class="search-panel-inner">
    <div class="search-input-row">
      <i class="fa-solid fa-magnifying-glass" style="color: var(--text-muted);"></i>
      <input type="text" id="search-input" placeholder="Search topics... (Ctrl+K)">
      <button class="icon-btn" id="search-close" aria-label="Close search"><i class="fa-solid fa-xmark"></i></button>
    </div>
    <ul class="search-results" id="search-results"></ul>
  </div>
</div>

<script src="../../js/theme.js"></script>
<script src="../../js/sidebar.js"></script>
<script src="../../js/search.js"></script>
<script src="../../js/main.js"></script>
</body>
</html>
```

- [ ] **Step 2: Delete the now-unneeded gitkeep**

```powershell
Remove-Item pages/unit1/.gitkeep
```

- [ ] **Step 3: Update homepage sidebar in `index.html`**

Find the Unit 1 `.sidebar-unit` block in `index.html` (created in the foundation sub-project):

```html
    <div class="sidebar-unit">
      <div class="sidebar-unit-title"><span class="sidebar-label">Unit 1</span></div>
      <a class="sidebar-link" href="pages/unit1/index.html"><i class="fa-solid fa-book"></i><span class="sidebar-label">Programming Fundamentals &amp; C Basics</span></a>
    </div>
```

Replace it with:

```html
    <div class="sidebar-unit">
      <div class="sidebar-unit-title"><span class="sidebar-label">Unit 1</span></div>
      <a class="sidebar-link" href="pages/unit1/index.html"><i class="fa-solid fa-book"></i><span class="sidebar-label">Unit 1 Overview</span></a>
      <a class="sidebar-link" href="pages/unit1/evolution-of-programming.html"><i class="fa-solid fa-clock-rotate-left"></i><span class="sidebar-label">Evolution of Programming</span></a>
      <a class="sidebar-link" href="pages/unit1/programming-languages.html"><i class="fa-solid fa-language"></i><span class="sidebar-label">Programming Languages</span></a>
      <a class="sidebar-link" href="pages/unit1/problem-solving.html"><i class="fa-solid fa-puzzle-piece"></i><span class="sidebar-label">Problem Solving</span></a>
      <a class="sidebar-link" href="pages/unit1/sequential-logic.html"><i class="fa-solid fa-list-ol"></i><span class="sidebar-label">Sequential Logic</span></a>
      <a class="sidebar-link" href="pages/unit1/algorithms.html"><i class="fa-solid fa-diagram-project"></i><span class="sidebar-label">Algorithms</span></a>
      <a class="sidebar-link" href="pages/unit1/pseudocode.html"><i class="fa-solid fa-file-lines"></i><span class="sidebar-label">Pseudocode</span></a>
      <a class="sidebar-link" href="pages/unit1/flowcharts.html"><i class="fa-solid fa-sitemap"></i><span class="sidebar-label">Flowcharts</span></a>
    </div>
```

- [ ] **Step 4: Verify**

Run: `Test-Path pages/unit1/index.html` → expect `True`.
Run: `Select-String -Path index.html -Pattern 'evolution-of-programming.html'` → expect one match.

- [ ] **Step 5: Commit**

```bash
git add pages/unit1/index.html index.html
git rm pages/unit1/.gitkeep
git commit -m "feat: add Unit 1 overview page and expand sidebar with topic links"
```

---

## Task 6: Topic page — Evolution of Programming (pattern-setting page)

**Files:**
- Create: `pages/unit1/evolution-of-programming.html`

**Context:** This page is written out in full and establishes the exact HTML structure (section IDs, heading pattern, in-page nav, prev/next footer, quiz data-array format) that Tasks 7-12 must replicate. Its content: what programming looked like before high-level languages (punch cards, machine code, assembly) up through today, told as a story/timeline — no code syntax, no memory diagrams (nothing to show memory of yet).

- [ ] **Step 1: Write the file**

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Evolution of Programming — Unit 1 — C Programming eBook</title>
<meta name="description" content="How programming evolved from punch cards and machine code to the high-level languages we use today.">

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">

<link rel="stylesheet" href="../../css/variables.css">
<link rel="stylesheet" href="../../css/base.css">
<link rel="stylesheet" href="../../css/layout.css">
<link rel="stylesheet" href="../../css/components.css">
<link rel="stylesheet" href="../../css/diagrams.css">
<link rel="stylesheet" href="../../css/quiz.css">

<script>
  (function () {
    var saved = localStorage.getItem('theme');
    var theme = saved || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', theme);
  })();
</script>

<style>
  .topic-layout { display: grid; grid-template-columns: 1fr 220px; gap: var(--space-6); align-items: start; }
  .topic-toc { position: sticky; top: calc(var(--topnav-height) + var(--space-4)); border: 1px solid var(--border); border-radius: var(--radius-md); padding: var(--space-4); font-size: 0.85rem; }
  .topic-toc a { display: block; padding: var(--space-1) 0; color: var(--text-muted); }
  .topic-toc a:hover { color: var(--color-primary); text-decoration: none; }
  .topic-section { margin-bottom: var(--space-7); scroll-margin-top: calc(var(--topnav-height) + var(--space-3)); }
  .topic-nav-footer { display: flex; justify-content: space-between; margin-top: var(--space-7); gap: var(--space-4); }
  .mistake-list li, .best-practice-list li { margin-bottom: var(--space-2); }
  @media (max-width: 1000px) { .topic-layout { grid-template-columns: 1fr; } .topic-toc { position: static; } }
</style>
</head>
<body>

<div class="progress-bar" id="progress-bar"></div>

<div class="shell" id="shell">

  <nav class="topnav">
    <div class="topnav-left">
      <button class="icon-btn mobile-menu-toggle" id="mobile-menu-toggle" aria-label="Toggle menu">
        <i class="fa-solid fa-bars"></i>
      </button>
      <a href="../../index.html" class="logo">
        <i class="fa-solid fa-code" style="color: var(--color-primary);"></i>
        C Programming eBook
      </a>
      <div class="breadcrumbs">
        <a href="../../index.html">Home</a>
        <span>/</span>
        <a href="index.html">Unit 1</a>
        <span>/</span>
        <span>Evolution of Programming</span>
      </div>
    </div>
    <div class="topnav-right">
      <button class="icon-btn" id="search-open" aria-label="Search">
        <i class="fa-solid fa-magnifying-glass"></i>
      </button>
      <button class="icon-btn" id="theme-toggle" aria-label="Toggle dark mode" aria-pressed="false">
        <i class="fa-solid fa-sun icon-sun"></i>
        <i class="fa-solid fa-moon icon-moon"></i>
      </button>
    </div>
  </nav>

  <aside class="sidebar">
    <button class="icon-btn" id="sidebar-collapse" aria-label="Collapse sidebar" style="margin-bottom: var(--space-4);">
      <i class="fa-solid fa-angles-left"></i>
    </button>

    <div class="sidebar-unit">
      <div class="sidebar-unit-title"><span class="sidebar-label">Unit 1</span></div>
      <a class="sidebar-link" href="index.html"><i class="fa-solid fa-book"></i><span class="sidebar-label">Unit 1 Overview</span></a>
      <a class="sidebar-link active" href="evolution-of-programming.html"><i class="fa-solid fa-clock-rotate-left"></i><span class="sidebar-label">Evolution of Programming</span></a>
      <a class="sidebar-link" href="programming-languages.html"><i class="fa-solid fa-language"></i><span class="sidebar-label">Programming Languages</span></a>
      <a class="sidebar-link" href="problem-solving.html"><i class="fa-solid fa-puzzle-piece"></i><span class="sidebar-label">Problem Solving</span></a>
      <a class="sidebar-link" href="sequential-logic.html"><i class="fa-solid fa-list-ol"></i><span class="sidebar-label">Sequential Logic</span></a>
      <a class="sidebar-link" href="algorithms.html"><i class="fa-solid fa-diagram-project"></i><span class="sidebar-label">Algorithms</span></a>
      <a class="sidebar-link" href="pseudocode.html"><i class="fa-solid fa-file-lines"></i><span class="sidebar-label">Pseudocode</span></a>
      <a class="sidebar-link" href="flowcharts.html"><i class="fa-solid fa-sitemap"></i><span class="sidebar-label">Flowcharts</span></a>
    </div>
    <div class="sidebar-unit">
      <div class="sidebar-unit-title"><span class="sidebar-label">Unit 2</span></div>
      <a class="sidebar-link" href="../unit2/index.html"><i class="fa-solid fa-book"></i><span class="sidebar-label">C Building Blocks &amp; Data Types</span></a>
    </div>
    <div class="sidebar-unit">
      <div class="sidebar-unit-title"><span class="sidebar-label">Unit 3</span></div>
      <a class="sidebar-link" href="../unit3/index.html"><i class="fa-solid fa-book"></i><span class="sidebar-label">Control Statements</span></a>
    </div>
    <div class="sidebar-unit">
      <div class="sidebar-unit-title"><span class="sidebar-label">Unit 4</span></div>
      <a class="sidebar-link" href="../unit4/index.html"><i class="fa-solid fa-book"></i><span class="sidebar-label">Strings, Functions &amp; Pointers</span></a>
    </div>
    <div class="sidebar-unit">
      <div class="sidebar-unit-title"><span class="sidebar-label">Unit 5</span></div>
      <a class="sidebar-link" href="../unit5/index.html"><i class="fa-solid fa-book"></i><span class="sidebar-label">Structures, Files &amp; Memory Management</span></a>
    </div>
  </aside>

  <main class="content">
    <div class="topic-layout">
      <div>
        <h1>Evolution of Programming</h1>
        <p class="lead">Before you write your first line of C, it helps to know why programming languages exist at all — and why they had to evolve.</p>

        <section class="topic-section" id="introduction">
          <h2>1. What Is It?</h2>
          <p>"Programming" means giving a computer step-by-step instructions to do a task. But computers only understand electrical signals — patterns of on and off (1s and 0s). Every programming language, from the very first to C to modern languages, exists to close the gap between "what a human can easily write" and "what a machine can actually run."</p>
          <p>The evolution of programming is the story of that gap slowly closing.</p>
        </section>

        <section class="topic-section" id="why">
          <h2>2. Why Do We Need to Know This?</h2>
          <p>Understanding where programming came from explains <em>why C looks the way it does.</em> C was designed in the 1970s as a bridge between low-level machine efficiency and human-readable structure. Knowing the "before" makes the "why" of C's design click into place instead of feeling arbitrary.</p>
        </section>

        <section class="topic-section" id="real-life">
          <h2>3. Real-Life Example</h2>
          <p>Think about how humans gave instructions over time: cave paintings → written language → the printing press → typewriters → word processors. Each step made communicating ideas faster and less error-prone. Programming followed the exact same pattern — from physically wiring circuits, to punching holes in cards, to typing readable words like <code>if</code> and <code>while</code>.</p>
        </section>

        <section class="topic-section" id="visual">
          <h2>4. Visual Explanation</h2>
          <div class="timeline">
            <div class="timeline-item">
              <div class="timeline-item-year">1940s</div>
              <h4>Machine Code</h4>
              <p>Programmers flipped physical switches or wired plugboards to represent raw binary instructions. Extremely slow and error-prone — one wrong wire meant starting over.</p>
            </div>
            <div class="timeline-item">
              <div class="timeline-item-year">1950s</div>
              <h4>Assembly Language</h4>
              <p>Short human-readable codes (like <code>MOV</code>, <code>ADD</code>) replaced raw binary. Still tied directly to one specific machine's hardware.</p>
            </div>
            <div class="timeline-item">
              <div class="timeline-item-year">1957</div>
              <h4>FORTRAN</h4>
              <p>One of the first "high-level" languages — closer to math notation than hardware instructions.</p>
            </div>
            <div class="timeline-item">
              <div class="timeline-item-year">1972</div>
              <h4>C is Born</h4>
              <p>Dennis Ritchie creates C at Bell Labs — fast like assembly, but readable and portable like a high-level language.</p>
            </div>
            <div class="timeline-item">
              <div class="timeline-item-year">Today</div>
              <h4>Modern Languages</h4>
              <p>Python, JavaScript, and others build on ideas C introduced, trading some speed for even more readability.</p>
            </div>
          </div>
        </section>

        <section class="topic-section" id="mistakes">
          <h2>10. Common Mistakes</h2>
          <ul class="mistake-list">
            <li>Thinking older languages were "worse" rather than suited to the hardware constraints of their time.</li>
            <li>Assuming a computer understands English or math notation directly — it only ever runs binary machine code; every language is translated down to that.</li>
            <li>Confusing "high-level" (closer to human language) with "better" — high-level languages trade some raw speed for readability.</li>
          </ul>
        </section>

        <section class="topic-section" id="debugging">
          <h2>11. Debugging Tips</h2>
          <p>Not applicable in the classic sense yet — there's no code to run in this topic. The habit to build now: whenever you hit unfamiliar terminology later in the course, ask "what problem did this solve, and what came before it?" That question resolves most confusion about language design choices.</p>
        </section>

        <section class="topic-section" id="best-practices">
          <h2>12. Best Practices</h2>
          <ul class="best-practice-list">
            <li>Learn the "why" behind a language feature, not just the syntax — it sticks longer and transfers to other languages.</li>
            <li>When learning C, remember it was designed for control and speed close to the hardware — that explains many of its quirks later in the course (manual memory management, pointers, no built-in string type).</li>
          </ul>
        </section>

        <section class="topic-section" id="interview">
          <h2>13. Interview Questions</h2>
          <p><strong>Easy:</strong> What is machine code?</p>
          <p><strong>Easy:</strong> Name one language that came before C.</p>
          <p><strong>Medium:</strong> Why did assembly language replace raw machine code?</p>
          <p><strong>Medium:</strong> What problem was C designed to solve?</p>
          <p><strong>Hard:</strong> Why do modern high-level languages still ultimately get translated to machine code?</p>
          <p><strong>HR:</strong> Why are you interested in learning a 50-year-old language like C in a modern industry?</p>
          <p><strong>Conceptual:</strong> What does "closer to the hardware" mean?</p>
          <p><strong>Scenario-based:</strong> You need to write firmware for a tiny embedded sensor with almost no memory. Would you reach for C or a very high-level language, and why?</p>
        </section>

        <section class="topic-section" id="mcq">
          <h2>14. MCQs</h2>
          <div class="quiz" data-quiz-source="evolutionQuiz"></div>
        </section>

        <section class="topic-section" id="exercises">
          <h2>15. Programming Exercises</h2>
          <p><strong>Easy:</strong> Write (in your own words, no code) a one-paragraph timeline of programming from machine code to today.</p>
          <p><strong>Medium:</strong> Research and name two programming languages created after C, and one idea each borrowed from C.</p>
          <p><strong>Hard:</strong> Explain, in plain English, why a language "close to the hardware" like C is still used today for operating systems, despite dozens of newer languages existing.</p>
        </section>

        <section class="topic-section" id="assignments">
          <h2>16. Assignments</h2>
          <p>Create a simple hand-drawn or digital timeline (5+ entries) of programming's evolution, including at least one entry before 1950 and one after 2000.</p>
        </section>

        <section class="topic-section" id="summary">
          <h2>18. Chapter Summary</h2>
          <p>Programming evolved from physically wiring machines, to punch cards and raw binary, to assembly, to high-level languages like C — each step closing the gap between human thinking and machine execution. C sits at a unique point in that history: readable enough for humans, close enough to hardware to stay fast.</p>
        </section>

        <section class="topic-section" id="cheatsheet">
          <h2>19. Cheat Sheet</h2>
          <ul>
            <li><strong>Machine code</strong> — raw binary instructions, one specific CPU.</li>
            <li><strong>Assembly</strong> — short human-readable mnemonics for machine code.</li>
            <li><strong>High-level language</strong> — human-readable code translated down to machine code (e.g. C, Python).</li>
            <li><strong>C (1972)</strong> — bridges low-level speed and high-level readability.</li>
          </ul>
        </section>

        <section class="topic-section" id="faq">
          <h2>20. FAQs</h2>
          <p><strong>Q: Is C outdated?</strong><br>A: No — it's still the backbone of operating systems, embedded devices, and other performance-critical software.</p>
          <p><strong>Q: Do I need to learn assembly before C?</strong><br>A: No. Knowing it exists is enough context to understand why C was designed the way it was.</p>
        </section>

        <section class="topic-section" id="takeaways">
          <h2>21. Key Takeaways</h2>
          <ul>
            <li>Every programming language exists to close the gap between human thinking and machine binary.</li>
            <li>C was designed in 1972 to be fast like assembly, but readable and portable like a high-level language.</li>
            <li>Understanding this history explains many of C's later design choices.</li>
          </ul>
        </section>

        <div class="topic-nav-footer">
          <span></span>
          <a href="programming-languages.html" class="btn btn-primary">Next: Programming Languages <i class="fa-solid fa-arrow-right"></i></a>
        </div>
      </div>

      <nav class="topic-toc" aria-label="On this page">
        <strong>On This Page</strong>
        <a href="#introduction">What Is It?</a>
        <a href="#why">Why Learn This?</a>
        <a href="#real-life">Real-Life Example</a>
        <a href="#visual">Timeline</a>
        <a href="#mistakes">Common Mistakes</a>
        <a href="#debugging">Debugging Tips</a>
        <a href="#best-practices">Best Practices</a>
        <a href="#interview">Interview Questions</a>
        <a href="#mcq">MCQs</a>
        <a href="#exercises">Exercises</a>
        <a href="#assignments">Assignments</a>
        <a href="#summary">Summary</a>
        <a href="#cheatsheet">Cheat Sheet</a>
        <a href="#faq">FAQs</a>
        <a href="#takeaways">Key Takeaways</a>
      </nav>
    </div>
  </main>

  <footer class="site-footer">
    <p>Built for absolute beginners. &copy; 2026 C Programming eBook.</p>
  </footer>

</div>

<div class="search-panel" id="search-panel" data-open="false">
  <div class="search-panel-inner">
    <div class="search-input-row">
      <i class="fa-solid fa-magnifying-glass" style="color: var(--text-muted);"></i>
      <input type="text" id="search-input" placeholder="Search topics... (Ctrl+K)">
      <button class="icon-btn" id="search-close" aria-label="Close search"><i class="fa-solid fa-xmark"></i></button>
    </div>
    <ul class="search-results" id="search-results"></ul>
  </div>
</div>

<script>
window.evolutionQuiz = [
  { question: "What does 'machine code' consist of?", options: ["English words", "Raw binary instructions", "Mathematical formulas", "Pictures"], correctIndex: 1, explanation: "Machine code is the raw sequence of 1s and 0s a specific CPU can execute directly." },
  { question: "What was the main limitation of programming with plugboards/switches?", options: ["Too fast", "Too readable", "Extremely slow and error-prone", "Used too much memory"], correctIndex: 2, explanation: "Physically wiring or switching circuits for every instruction was slow, tedious, and easy to get wrong." },
  { question: "What replaced raw binary machine code with short readable mnemonics?", options: ["Assembly language", "Python", "Flowcharts", "Pseudocode"], correctIndex: 0, explanation: "Assembly language introduced mnemonics like MOV and ADD in place of raw binary opcodes." },
  { question: "Assembly language is tied to:", options: ["No hardware at all", "One specific machine's hardware", "Only web browsers", "Only mobile phones"], correctIndex: 1, explanation: "Assembly instructions map directly to one CPU architecture's instruction set." },
  { question: "Which language, released in 1957, was one of the first high-level languages?", options: ["C", "FORTRAN", "Java", "Assembly"], correctIndex: 1, explanation: "FORTRAN (1957) was among the first languages to read more like math notation than raw hardware instructions." },
  { question: "In what year was C created?", options: ["1957", "1965", "1972", "1991"], correctIndex: 2, explanation: "Dennis Ritchie created C in 1972 at Bell Labs." },
  { question: "Who created the C programming language?", options: ["Dennis Ritchie", "James Gosling", "Guido van Rossum", "Ada Lovelace"], correctIndex: 0, explanation: "Dennis Ritchie designed C at Bell Labs in the early 1970s." },
  { question: "What made C different from earlier high-level languages?", options: ["It was slower than assembly", "It combined hardware-level speed with human readability", "It had no syntax rules", "It could only run on one computer"], correctIndex: 1, explanation: "C was designed to be nearly as fast as assembly while staying readable and portable across machines." },
  { question: "A 'high-level' programming language is best described as:", options: ["Harder to read than machine code", "Closer to human language, translated down to machine code", "A language with no rules", "The fastest possible code"], correctIndex: 1, explanation: "High-level languages read closer to human language and are translated (compiled/interpreted) down to machine code." },
  { question: "Why do modern languages like Python still eventually run as machine code?", options: ["They don't; computers understand Python directly", "Because every program must ultimately be translated to instructions the CPU understands", "Because Python is a type of machine code", "This is false, only C becomes machine code"], correctIndex: 1, explanation: "No matter how high-level a language is, it must be translated down to the binary machine code the physical CPU can execute." },
  { question: "What is the biggest practical benefit of high-level languages over assembly?", options: ["They run without any translation", "Readability and portability across different hardware", "They use less memory than machine code", "They eliminate the need for logic"], correctIndex: 1, explanation: "High-level languages are easier to read/write and can often run on multiple hardware platforms with little or no change." },
  { question: "Which of these is closest in age to C (created around the same era)?", options: ["JavaScript (1995)", "Python (1991)", "FORTRAN (1957)", "Java (1995)"], correctIndex: 2, explanation: "FORTRAN (1957) predates C but both are from an earlier generation than Python, Java, or JavaScript." },
  { question: "Why is C still used today for operating systems?", options: ["It's the newest language available", "It offers a strong balance of speed and low-level hardware control", "It's easier than Python", "It has built-in web support"], correctIndex: 1, explanation: "C's closeness to hardware and performance make it well suited for OS-level and embedded programming." },
  { question: "What best describes the overall trend in programming's evolution?", options: ["Languages became less readable over time", "Languages became closer to human thinking while staying translatable to machine code", "Languages stopped needing translation to run", "Hardware became irrelevant to programming"], correctIndex: 1, explanation: "The trend has been toward more human-readable languages, while a compiler/interpreter still bridges to the hardware." },
  { question: "What is a plugboard, in the context of early computing?", options: ["A modern keyboard", "A physical panel wired by hand to configure a computer's operations", "A software debugging tool", "An early programming language"], correctIndex: 1, explanation: "Early computers like ENIAC were programmed by physically wiring plugboards to configure operations." },
  { question: "Which statement about assembly language is true?", options: ["It has no relationship to machine code", "It is a direct, readable stand-in for machine code instructions", "It is identical across all CPU types", "It was invented after C"], correctIndex: 1, explanation: "Assembly gives each machine code instruction a short readable name (mnemonic), tied to a specific CPU architecture." },
  { question: "Understanding programming's history mainly helps you:", options: ["Memorize dates for a test only", "Understand why C's design choices exist", "Avoid ever learning new languages", "Skip learning syntax entirely"], correctIndex: 1, explanation: "Knowing what problem each generation of languages solved makes C's specific design choices make sense rather than feel arbitrary." },
  { question: "What does 'portable' mean when describing a language like C?", options: ["It can be carried in a bag", "Code can run on different machines/hardware with little or no change", "It only works on portable devices", "It has no rules"], correctIndex: 1, explanation: "Portability means the same source code can be compiled and run on different hardware/operating systems." },
  { question: "Before high-level languages, why was writing software so slow?", options: ["Programmers had to think in terms of raw hardware instructions or wiring", "There were too many high-level languages to choose from", "Computers were too fast to keep up with", "Software didn't exist yet"], correctIndex: 0, explanation: "Working directly in machine code or physical wiring required painstaking, error-prone, hardware-specific work." },
  { question: "Which best completes: 'Every programming language, no matter how modern, ultimately...'", options: ["avoids using the CPU", "gets translated down to machine code the CPU can run", "is written directly in English", "removes the need for a compiler or interpreter"], correctIndex: 1, explanation: "All programming languages, high or low level, are eventually translated into the machine code their target CPU executes." }
];
</script>
<script src="../../js/theme.js"></script>
<script src="../../js/sidebar.js"></script>
<script src="../../js/search.js"></script>
<script src="../../js/main.js"></script>
<script src="../../js/quiz.js"></script>
<script src="../../js/copy-code.js"></script>
</body>
</html>
```

- [ ] **Step 2: Verify**

Run: `Select-String -Path pages/unit1/evolution-of-programming.html -Pattern 'evolutionQuiz' | Measure-Object` → expect at least 2 matches (declaration + `data-quiz-source` reference).
Run: `node --check` is not applicable to HTML — instead confirm the inline `<script>` block is valid JS by extracting it isn't necessary; just visually confirm the array has 20 entries (count `question:` occurrences): `(Select-String -Path pages/unit1/evolution-of-programming.html -Pattern 'question:').Count` → expect `20`.

- [ ] **Step 3: Commit**

```bash
git add pages/unit1/evolution-of-programming.html
git commit -m "feat: add Evolution of Programming topic page (pattern-setting)"
```

---

## Task 7: Topic page — Programming Languages

**Files:**
- Create: `pages/unit1/programming-languages.html`

**Instructions:** Copy the exact HTML skeleton from Task 6 (head links, shell markup, sidebar with `active` moved to this page's link, topic-toc nav, script tags, `<style>` block) — same structure, same classes, same section ID pattern (`#introduction`, `#why`, `#real-life`, `#visual`, etc.), same footer nav-link pattern. Only the `<title>`, breadcrumb text, `<h1>`, body content, quiz array (`window.programmingLanguagesQuiz`), and prev/next footer links change. Prev link goes to `evolution-of-programming.html`, next link goes to `problem-solving.html`.

**Content brief:**

- **What Is It? (#introduction):** A programming language is a formal set of words/symbols/rules for writing instructions a computer can (eventually) execute. Distinguish three tiers: machine language (binary, tier 0), low-level (assembly — close to hardware), high-level (C, Python, Java — closer to human language). Name where C sits: often called a "middle-level" language — high-level syntax, but with low-level capabilities (direct memory access, pointers) that most high-level languages hide.
- **Why Learn This? (#why):** Every language trades off differently between speed/control (low-level) and ease/readability (high-level). Understanding this spectrum tells a learner what to expect from C — power and control, at the cost of more responsibility (no automatic memory cleanup, no built-in bounds checking).
- **Real-Life Example (#real-life):** Compare to human communication tiers: pointing/gestures (machine code — most primitive but universally "understood" by the hardware), a shorthand code language only insiders know (assembly), and a fully written, grammatically structured language anyone literate can read (high-level language).
- **Visual Explanation (#visual):** Use `.flowchart`/`.flow-box` markup (from `css/diagrams.css`, same classes as Task 6's timeline but here use flow-boxes) to show a 3-tier vertical stack: "Machine Language (binary)" → "Low-Level Language (Assembly)" → "High-Level Language (C, Python, Java...)", each box captioned with one property (speed, readability, portability).
- **Common Mistakes (#mistakes):** Assuming "high-level" always means "better"; confusing "compiled" vs "interpreted" as a language-tier distinction rather than an execution-strategy distinction; thinking C is "low-level" the same way assembly is (it isn't — it's portable and structured, unlike raw assembly).
- **Debugging Tips (#debugging):** Not applicable yet (no executable code in this topic) — note that the *habit* to build is checking which "tier" an error message is coming from later in the course (compiler error vs. runtime crash) — a preview of a distinction covered fully in the compilation-pipeline sub-project.
- **Best Practices (#best-practices):** Pick the right tool for the job — don't assume one language tier is always correct; when learning C specifically, expect to manage details (memory, types) that higher-level languages handle automatically.
- **Interview Questions (#interview):** Include at least one each of Easy/Medium/Hard/HR/Conceptual/Scenario-based, e.g. Easy: "What is a programming language?"; Medium: "What's the difference between a low-level and high-level language?"; Hard: "Why is C sometimes called a 'middle-level' language?"; HR: "Why did you choose to start with C instead of a more modern language?"; Conceptual: "What does 'closer to the hardware' mean in practice?"; Scenario: "You're asked to write a device driver — would you reach for Python or C, and why?"
- **MCQs (#mcq):** `window.programmingLanguagesQuiz`, exactly 20 questions, same `{question, options[4], correctIndex, explanation}` schema as Task 6, covering: machine/low/high-level distinctions, where C sits, compiled vs interpreted (conceptually, not deeply — full treatment comes later), portability, readability vs. control trade-offs, and at least 3 questions testing the "why C is called middle-level" concept specifically.
- **Exercises (#exercises):** Easy: classify 5 given languages (C, Python, Assembly, Java, machine code) into low/middle/high-level. Medium: explain in your own words why C gives more control than Python. Hard: research one real-world system (e.g. Linux kernel, an embedded thermostat) and explain why C was likely chosen over a higher-level language.
- **Assignments (#assignments):** Write a half-page comparison of any two languages the learner has heard of (even if never used), describing which is higher/lower level and why.
- **Chapter Summary (#summary):** Programming languages form a spectrum from raw machine binary to human-readable high-level code; C sits in an unusual "middle" position, offering high-level structure with low-level control — which is exactly why it's taught before other languages in this course.
- **Cheat Sheet (#cheatsheet):** Bullet list: Machine language / Low-level (Assembly) / High-level (Python, Java) / Middle-level (C) definitions in one line each.
- **FAQs (#faq):** "Is C hard because it's low-level?" (Not exactly — it's middle-level; hard because it gives you more responsibility, not because it's unreadable.) "Should I learn assembly before C?" (No, not required.)
- **Key Takeaways (#takeaways):** 3 bullets: language tiers exist on a spectrum; C is deliberately in the middle; this trade-off (control vs. convenience) explains most of what makes C distinct later in the course.

No mini-project on this page (mini-project is scoped to the end of the group, on the Flowcharts page per the spec).

- [ ] **Step 1: Write the file** following the skeleton and content brief above.

- [ ] **Step 2: Verify**

Run: `(Select-String -Path pages/unit1/programming-languages.html -Pattern 'question:').Count` → expect `20`.
Run: `Select-String -Path pages/unit1/programming-languages.html -Pattern 'programmingLanguagesQuiz' | Measure-Object` → expect at least 2 matches.

- [ ] **Step 3: Commit**

```bash
git add pages/unit1/programming-languages.html
git commit -m "feat: add Programming Languages topic page"
```

---

## Task 8: Topic page — Problem Solving

**Files:**
- Create: `pages/unit1/problem-solving.html`

**Instructions:** Same skeleton/structure rule as Task 7. Prev link → `programming-languages.html`, next link → `sequential-logic.html`. Quiz array: `window.problemSolvingQuiz`.

**Content brief:**

- **What Is It? (#introduction):** Problem solving in programming means: understand the problem, break it into smaller steps, plan a solution, then implement it — coding is the *last* step, not the first. Introduce the 4-stage framework: Understand → Plan → Divide (into sub-problems) → Solve each sub-problem.
- **Why Learn This? (#why):** Beginners' most common failure isn't syntax — it's trying to write code before they understand the problem. This habit prevents the single biggest source of beginner frustration.
- **Real-Life Example (#real-life):** Planning a trip: you don't start packing before deciding a destination, a budget, and a route. Same structure: understand the goal → plan the approach → break into smaller tasks (book transport, pack, arrange accommodation) → do each one.
- **Visual Explanation (#visual):** Use `.flowchart`/`.flow-box` to show the 4-stage loop: Understand → Plan → Divide → Solve, with an arrow looping back from "Solve" to "Understand" labeled "if the result doesn't match the goal, re-check."
- **Common Mistakes (#mistakes):** Jumping straight to code without understanding the problem; not breaking a big problem into smaller ones; assuming the first idea is the only approach.
- **Debugging Tips (#debugging):** When stuck, go back one stage — re-read the problem statement, not the code, first.
- **Best Practices (#best-practices):** Restate the problem in your own words before solving it; write down inputs and expected outputs before attempting a solution; solve a smaller/simpler version of the problem first if stuck.
- **Interview Questions (#interview):** Easy: "What are the steps of problem solving in programming?" Medium: "Why is understanding the problem more important than writing code quickly?" Hard: "How would you break down 'sort a list of names alphabetically' into smaller sub-problems?" HR: "Tell me about a time you solved a difficult problem — what was your approach?" Conceptual: "What does 'decomposition' mean in problem solving?" Scenario: "A user reports your program gives the wrong output sometimes — what's your first step?"
- **MCQs (#mcq):** `window.problemSolvingQuiz`, 20 questions covering: the 4-stage framework, why coding-first is a mistake, decomposition, restating problems, and interpreting requirements.
- **Exercises (#exercises):** Easy: write the 4 stages from memory. Medium: break "plan a birthday party" into at least 5 sub-problems. Hard: take "find the largest number in a list of 10 numbers" and write out Understand/Plan/Divide/Solve for it in plain English (no code — Sequential Logic/Algorithms topics build on this).
- **Assignments (#assignments):** Pick any everyday task (making a sandwich, doing laundry) and write it out using the 4-stage framework.
- **Chapter Summary (#summary):** Problem solving is a repeatable 4-stage process — Understand, Plan, Divide, Solve — that should happen before any code is written; this habit is what separates confident programmers from ones who get stuck immediately.
- **Cheat Sheet (#cheatsheet):** One line per stage with a one-sentence description.
- **FAQs (#faq):** "Do I have to follow these 4 stages formally every time?" (Not rigidly, but internalizing the habit prevents most beginner mistakes.) "What if I can't break the problem down?" (Try solving a smaller/simpler version first.)
- **Key Takeaways (#takeaways):** 3 bullets on the 4-stage framework, decomposition, and coding being the last step not the first.

No mini-project (scoped to Flowcharts page).

- [ ] **Step 1: Write the file** following the skeleton and content brief.

- [ ] **Step 2: Verify**

Run: `(Select-String -Path pages/unit1/problem-solving.html -Pattern 'question:').Count` → expect `20`.

- [ ] **Step 3: Commit**

```bash
git add pages/unit1/problem-solving.html
git commit -m "feat: add Problem Solving topic page"
```

---

## Task 9: Topic page — Sequential Logic

**Files:**
- Create: `pages/unit1/sequential-logic.html`

**Instructions:** Same skeleton rule. Prev → `problem-solving.html`, next → `algorithms.html`. Quiz array: `window.sequentialLogicQuiz`.

**Content brief:**

- **What Is It? (#introduction):** Sequential logic means a computer executes instructions one at a time, strictly in the order they're written (top to bottom), unless explicitly told otherwise (a concept previewed here, formally taught in Unit 3's control statements). No instruction runs "early" or "out of order" on its own.
- **Why Learn This? (#why):** Beginners often assume a computer "figures out" what they meant. It doesn't — it does exactly what's written, in exactly that order. Internalizing this prevents a huge class of beginner debugging confusion later.
- **Real-Life Example (#real-life):** A recipe: you can't "bake the cake" before "mixing the batter," even if you meant to. Steps run in the order written, every time.
- **Visual Explanation (#visual):** `.flowchart` with 4 stacked `.flow-box` elements labeled "Step 1: Get 2 numbers", "Step 2: Add them", "Step 3: Store the result", "Step 4: Display the result", connected top-to-bottom by `.flow-arrow`, showing strict one-direction order.
- **Common Mistakes (#mistakes):** Writing steps in the wrong order and expecting the "obvious" intended order to run anyway; assuming a computer can infer missing steps; forgetting a step and assuming it happens "automatically."
- **Debugging Tips (#debugging):** When output is wrong, trace execution top-to-bottom exactly as written — don't assume any step was skipped or reordered by the computer itself.
- **Best Practices (#best-practices):** Write steps in the exact order they must happen; double check ordering dependencies (e.g. you must have a value before you can use it).
- **Interview Questions (#interview):** Easy: "What does 'sequential execution' mean?" Medium: "Why can't a computer run steps out of order on its own?" Hard: "What has to change in a program's logic to make it NOT purely sequential?" (Preview answer: conditionals/loops, covered later.) HR: "Describe a time following steps in the wrong order caused a problem." Conceptual: "Is sequential logic unique to programming?" Scenario: "Your program adds two numbers before asking the user for them — what's wrong, and why?"
- **MCQs (#mcq):** `window.sequentialLogicQuiz`, 20 questions on: definition of sequential execution, order dependency, why computers don't "guess" order, and simple ordering-mistake scenarios.
- **Exercises (#exercises):** Easy: number these 4 out-of-order recipe steps correctly. Medium: identify the ordering bug in a 5-step plain-English "algorithm" provided in the exercise text. Hard: write a strictly ordered 6-step plain-English procedure for "make a phone call," making sure every step's inputs are available by the time it runs.
- **Assignments (#assignments):** Write any 5-step daily routine (e.g. getting ready for school/work) as strictly ordered steps, and identify one step that would break the whole routine if it ran too early.
- **Chapter Summary (#summary):** Computers execute instructions one at a time, strictly in the order written; this is "sequential logic," and it's the default behavior every program has until you introduce decisions or repetition (covered in Unit 3).
- **Cheat Sheet (#cheatsheet):** "Sequential = top to bottom, one at a time, no skipping, no reordering."
- **FAQs (#faq):** "Can a computer ever run steps out of order?" (Only if the program logic explicitly tells it to — via conditionals/loops/jumps, not on its own.) "Is sequential logic still relevant once I learn loops/conditionals?" (Yes — it's the default; loops/conditionals are controlled deviations from it.)
- **Key Takeaways (#takeaways):** 3 bullets: strict top-to-bottom execution, no automatic reordering, this is the foundation control statements later modify.

No mini-project.

- [ ] **Step 1: Write the file** following the skeleton and content brief.

- [ ] **Step 2: Verify**

Run: `(Select-String -Path pages/unit1/sequential-logic.html -Pattern 'question:').Count` → expect `20`.

- [ ] **Step 3: Commit**

```bash
git add pages/unit1/sequential-logic.html
git commit -m "feat: add Sequential Logic topic page"
```

---

## Task 10: Topic page — Algorithms

**Files:**
- Create: `pages/unit1/algorithms.html`

**Instructions:** Same skeleton rule. Prev → `sequential-logic.html`, next → `pseudocode.html`. Quiz array: `window.algorithmsQuiz`. This page's "Step-by-step Code" section (#steps, a new section not present in Task 6-9 since they had no procedure to show) uses the `.code-block` chrome with plain-English/pseudocode steps (per the spec's decision), and gets a Dry Run section (#dryrun) since it has an actual procedure to trace.

**Content brief:**

- **What Is It? (#introduction):** An algorithm is a finite, precise, ordered set of steps to solve a problem or complete a task — the output of the "Plan" and "Divide" stages from Problem Solving, made rigorous enough that a computer (not just a human) could follow it exactly.
- **Why Learn This? (#why):** Every program is an implementation of an algorithm. Learning to design an algorithm in plain steps first — before any C syntax — means the syntax (taught starting next sub-project) only has to represent an idea you already have clearly, instead of inventing the idea and the syntax at the same time.
- **Real-Life Example (#real-life):** A recipe is an algorithm: precise ordered steps ("preheat oven to 350°F," not "make it hot-ish") with clear inputs (ingredients) and a clear output (the finished dish).
- **Visual Explanation (#visual):** `.flowchart` showing the algorithm "find the largest of two numbers": Start → "Get number A and B" → decision box "Is A > B?" (`.flow-box-decision`) → two branches → "Largest is A" / "Largest is B" → "Display result" → End.
- **Syntax (#syntax — reuse as "Algorithm-Writing Conventions" since there's no C syntax yet):** Explain the conventions used when writing algorithms in this course: numbered steps, "Start"/"End" markers, one action per step, decisions written as "If [condition], then... else...".
- **Step-by-step Code (#steps):** In a `.code-block`, write the "find the largest of two numbers" algorithm as numbered plain-English steps: `Step 1: Start`, `Step 2: Input two numbers, A and B`, `Step 3: If A > B, go to Step 4, else go to Step 5`, `Step 4: Display A as the largest, go to Step 6`, `Step 5: Display B as the largest`, `Step 6: End`. Explain each step's purpose in prose immediately after the block.
- **Dry Run (#dryrun):** Table showing two example runs — A=8,B=3 (traces through: A>B true → displays 8) and A=2,B=9 (traces through: A>B false → displays 9) — showing which step executes each time and why.
- **Common Mistakes (#mistakes):** Writing vague, unmeasurable steps ("make it work"); missing an end condition (infinite/undefined algorithm); skipping the decision's "else" branch.
- **Debugging Tips (#debugging):** If an algorithm gives the wrong answer, dry-run it by hand with a simple example first — most "logic bugs" are visible without ever writing real code.
- **Best Practices (#best-practices):** Keep each step small and singular; always account for every branch of a decision; test your algorithm by hand with at least 2 different inputs before trusting it.
- **Interview Questions (#interview):** Easy: "What is an algorithm?" Medium: "What's the difference between an algorithm and a program?" (Algorithm = the plan; program = the plan implemented in a specific language.) Hard: "Why must an algorithm be finite?" HR: "Describe an everyday process you could turn into an algorithm." Conceptual: "Can two different algorithms solve the same problem?" (Yes — this previews efficiency/complexity ideas taught in later, more advanced material.) Scenario: "Design (in plain steps) an algorithm to check if a number is even or odd."
- **MCQs (#mcq):** `window.algorithmsQuiz`, 20 questions covering: definition, algorithm vs. program, finiteness, decision branches, dry-running by hand, and reading the "largest of two numbers" example.
- **Exercises (#exercises):** Easy: write an algorithm (plain steps) to check if a number is even or odd. Medium: write an algorithm to find the largest of THREE numbers. Hard: write an algorithm to check whether a given year is a leap year (include the real divisibility rule: divisible by 4, but not by 100 unless also by 400).
- **Assignments (#assignments):** Write and hand-dry-run (with 2 sample inputs) an algorithm for "calculate the average of 5 numbers."
- **Chapter Summary (#summary):** An algorithm is a precise, finite, ordered set of steps solving a specific problem — the output of problem-solving made rigorous enough to eventually become real code; dry-running an algorithm by hand catches most logic errors before any syntax is involved.
- **Cheat Sheet (#cheatsheet):** "Algorithm = Start → numbered steps → decisions cover every branch → End. Always dry-run with real numbers before trusting it."
- **FAQs (#faq):** "Is an algorithm the same as code?" (No — code is one specific implementation of an algorithm in a specific language.) "Can one problem have multiple correct algorithms?" (Yes.)
- **Key Takeaways (#takeaways):** 3 bullets: algorithms are precise/finite/ordered; dry-running by hand catches logic errors early; an algorithm is language-independent, code is the C-specific implementation of it.

No mini-project (scoped to Flowcharts page).

- [ ] **Step 1: Write the file** following the skeleton and content brief, including the two extra sections (#steps, #dryrun) and their corresponding entries in the `.topic-toc` nav.

- [ ] **Step 2: Verify**

Run: `(Select-String -Path pages/unit1/algorithms.html -Pattern 'question:').Count` → expect `20`.
Run: `Select-String -Path pages/unit1/algorithms.html -Pattern 'flow-box-decision'` → expect at least 1 match (decision diamond present).

- [ ] **Step 3: Commit**

```bash
git add pages/unit1/algorithms.html
git commit -m "feat: add Algorithms topic page"
```

---

## Task 11: Topic page — Pseudocode

**Files:**
- Create: `pages/unit1/pseudocode.html`

**Instructions:** Same skeleton rule. Prev → `algorithms.html`, next → `flowcharts.html`. Quiz array: `window.pseudocodeQuiz`. Include a `.code-block` "Step-by-step Code" section (#steps) since pseudocode IS code-like text.

**Content brief:**

- **What Is It? (#introduction):** Pseudocode is an algorithm written in structured, code-like plain English — using keywords like `START`, `INPUT`, `IF...THEN...ELSE`, `WHILE`, `DISPLAY`, `END` — without following any real programming language's exact syntax rules. It's a bridge between the numbered-step algorithms from the previous topic and real C code (next sub-project).
- **Why Learn This? (#why):** Pseudocode lets you plan a program's logic without worrying about C's punctuation rules (semicolons, braces, exact keyword names) yet — separating "getting the logic right" from "getting the syntax right," which is especially valuable for beginners who tend to get stuck on syntax before logic is even solid.
- **Real-Life Example (#real-life):** A movie script's stage directions ("ENTER: Character walks to the door, opens it, exits") — structured, precise, but not written in a formal legal/technical language. Pseudocode is that same idea applied to programming logic.
- **Visual Explanation (#visual):** Simple side-by-side `.flow-box` comparison (not a flowchart — a static 2-column layout using `.card` or similar) showing the SAME logic three ways: "Plain algorithm step" vs. "Pseudocode" vs. "Real C (preview only, not yet taught)" for one line, e.g. "Step: check if A is greater than B" / `IF A > B THEN` / `if (a > b) {` — to make the bridge concrete (label the C column "Preview — taught next sub-project").
- **Syntax (#syntax):** List the common pseudocode keywords/conventions used in this course: `START`/`END`, `INPUT`/`DISPLAY`, `IF...THEN...ELSE...ENDIF`, `WHILE...ENDWHILE`, `FOR...ENDFOR`, indentation to show nesting.
- **Step-by-step Code (#steps):** In a `.code-block`, write the "largest of two numbers" example (same problem as the Algorithms page, now in pseudocode form) — `START`, `INPUT A, B`, `IF A > B THEN`, `  DISPLAY A`, `ELSE`, `  DISPLAY B`, `ENDIF`, `END` — explain each line.
- **Dry Run (#dryrun):** Same style dry-run table as the Algorithms page but tracing the pseudocode line-by-line for A=8,B=3 and A=2,B=9.
- **Common Mistakes (#mistakes):** Forgetting `ENDIF`/`ENDWHILE` closing keywords; mixing up pseudocode with real syntax (e.g. adding semicolons that don't belong in pseudocode); writing pseudocode so vague it doesn't actually resolve the logic.
- **Debugging Tips (#debugging):** Read pseudocode aloud as plain instructions to a friend — if it doesn't make unambiguous sense out loud, it needs to be more precise.
- **Best Practices (#best-practices):** Keep indentation consistent to show nested logic; use the same keyword set consistently (don't invent new ones mid-way); always close what you open (`IF`→`ENDIF`, `WHILE`→`ENDWHILE`).
- **Interview Questions (#interview):** Easy: "What is pseudocode?" Medium: "Why use pseudocode instead of writing real code directly?" Hard: "What's the risk of skipping pseudocode and writing C directly for a complex problem?" HR: "How do you personally plan out a solution before coding?" Conceptual: "Is pseudocode language-specific?" (No — it's meant to be language-agnostic.) Scenario: "Convert this real-life instruction into pseudocode: 'If it's raining, take an umbrella, otherwise wear sunglasses.'"
- **MCQs (#mcq):** `window.pseudocodeQuiz`, 20 questions on: definition, purpose, common keywords, `IF/ENDIF` structure, and reading/writing simple pseudocode snippets.
- **Exercises (#exercises):** Easy: write pseudocode to check if a number is positive or negative. Medium: write pseudocode for the "largest of three numbers" problem (building on the Algorithms page exercise). Hard: write pseudocode for the leap-year check (same problem as the Algorithms page hard exercise), now in structured pseudocode form.
- **Assignments (#assignments):** Convert the assignment from the Problem Solving page (the everyday task broken into steps) into properly formatted pseudocode using this page's keyword conventions.
- **Chapter Summary (#summary):** Pseudocode is structured, code-like plain English that separates planning a program's logic from writing its exact syntax — a bridge between an algorithm's numbered steps and real C code.
- **Cheat Sheet (#cheatsheet):** One-line reference for each keyword: `START/END`, `INPUT/DISPLAY`, `IF/THEN/ELSE/ENDIF`, `WHILE/ENDWHILE`, `FOR/ENDFOR`.
- **FAQs (#faq):** "Is pseudocode checked by a compiler?" (No — it's for humans only, never run by a computer.) "Do all courses/companies use the exact same pseudocode keywords?" (No — conventions vary; the important part is being unambiguous and consistent within one document.)
- **Key Takeaways (#takeaways):** 3 bullets: pseudocode separates logic from syntax; it uses a small consistent keyword set; it's the last planning step before real C code starts next.

No mini-project.

- [ ] **Step 1: Write the file** following the skeleton and content brief.

- [ ] **Step 2: Verify**

Run: `(Select-String -Path pages/unit1/pseudocode.html -Pattern 'question:').Count` → expect `20`.

- [ ] **Step 3: Commit**

```bash
git add pages/unit1/pseudocode.html
git commit -m "feat: add Pseudocode topic page"
```

---

## Task 12: Topic page — Flowcharts (+ chapter mini project)

**Files:**
- Create: `pages/unit1/flowcharts.html`

**Instructions:** Same skeleton rule. Prev → `pseudocode.html`. This is the last page in the group, so there is **no "Next" topic link** — instead the "Next" button in `.topic-nav-footer` links back to `index.html` (Unit 1 overview) labeled "Back to Unit 1 Overview" (Group 2's first page doesn't exist yet, so linking there would 404 — link forward to it once Group 2 ships, not now). Quiz array: `window.flowchartsQuiz`. This page includes section **17 (Mini Project)**, which the other 6 pages skip per the spec (mini project is once per chapter, placed on the group's last page).

**Content brief:**

- **What Is It? (#introduction):** A flowchart is a diagram that represents an algorithm's steps as connected shapes — ovals for start/end, rectangles for actions/steps, diamonds for decisions, arrows for flow direction. It's the visual counterpart to pseudocode: same logic, drawn instead of written.
- **Why Learn This? (#why):** Some people (and some problems) are easier to reason about visually than as text. Flowcharts also make it trivial to spot missing branches or dead ends in logic — a decision diamond with only one arrow leaving it is an obvious, visible bug.
- **Real-Life Example (#real-life):** A subway/metro map is a flowchart-like diagram: stations (steps), junctions (decisions — "change lines here"), and lines (arrows) showing every possible route, all understandable at a glance without reading a paragraph of directions.
- **Visual Explanation + Flow Diagram (#visual — combine sections 4 and 6 since they'd be identical content for this specific topic):** A legend showing each `.flow-box` variant and what it means: oval/`.flow-box-start`/`.flow-box-end` = Start/End, rectangle/`.flow-box` = Process/Action, skewed/`.flow-box-decision` = Decision (Yes/No branches), arrow/`.flow-arrow` = flow direction. Then the full flowchart for "largest of two numbers" (same problem as Algorithms/Pseudocode pages) fully drawn with the legend's shapes, so the reader sees the exact same logic in its 3rd and final representation (algorithm → pseudocode → flowchart).
- **Syntax (#syntax — reframed as "Flowchart Symbol Rules"):** One flowchart rule set: exactly one Start and one End; every decision diamond has exactly two labeled arrows leaving it (commonly "Yes"/"No"); arrows only flow in the direction of execution (no unlabeled loops back without a reason).
- **Common Mistakes (#mistakes):** Missing one branch of a decision diamond; multiple "Start" or no "End"; arrows that don't clearly show direction; boxes with more than one action crammed into them (should be split into separate steps).
- **Debugging Tips (#debugging):** If a flowchart "looks right" but the algorithm still fails, check every decision diamond has both branches actually leading somewhere — a dangling branch is the most common flowchart-logic bug.
- **Best Practices (#best-practices):** One action per box; label every decision branch explicitly (Yes/No, or the actual condition outcome); keep the whole flowchart readable top-to-bottom or left-to-right consistently, not zig-zagging.
- **Interview Questions (#interview):** Easy: "What shape represents a decision in a flowchart?" Medium: "Why must a decision diamond always have two labeled branches?" Hard: "How would you flowchart a process with 3 possible outcomes, not just 2?" (Preview: chained decisions, formally covered as if-else-if in Unit 3.) HR: "Do you prefer planning visually (flowcharts) or in writing (pseudocode)? Why?" Conceptual: "What's the relationship between an algorithm, pseudocode, and a flowchart?" Scenario: "Draw (describe in words) a flowchart for 'is a number even or odd?'"
- **MCQs (#mcq):** `window.flowchartsQuiz`, 20 questions on: shape meanings (oval/rectangle/diamond/arrow), decision-branch rules, common flowchart mistakes, and the algorithm→pseudocode→flowchart relationship.
- **Exercises (#exercises):** Easy: describe in words the flowchart for "check if a number is positive or negative." Medium: describe the flowchart for "largest of three numbers" (same problem as earlier pages, now as a flowchart). Hard: describe the flowchart for the leap-year check (same recurring problem, now in its 3rd representation).
- **Assignments (#assignments):** Take the pseudocode from the previous page's assignment and describe it as a flowchart (in words: box by box, decision by decision).
- **Mini Project (#miniproject) — chapter-level, only on this page:** "Plan a Real-World Process, Three Ways." Pick a real task (e.g. making tea, checking out a library book, or crossing a busy road safely). Produce: (1) a numbered plain-English algorithm (per the Algorithms page's conventions), (2) the same logic in pseudocode (per the Pseudocode page's keywords), (3) a description of the same logic as a flowchart (per this page's shape rules) — demonstrating all three representations taught in this chapter describe the exact same underlying logic.
- **Chapter Summary (#summary):** A flowchart is the visual representation of an algorithm's logic — same underlying reasoning as plain algorithm steps or pseudocode, just drawn instead of written. Across this chapter, one recurring example (largest of two numbers) was represented three ways: numbered steps, pseudocode, and a flowchart — proving they're three views of the same idea.
- **Cheat Sheet (#cheatsheet):** Shape legend in one line each: Oval=Start/End, Rectangle=Process, Diamond=Decision, Arrow=Flow direction. Plus the one hard rule: every decision needs two labeled branches.
- **FAQs (#faq):** "Do I need special software to draw flowcharts?" (No — pen and paper or a plain diagram is enough; this course draws them in HTML/CSS for the web page, but by hand is just as valid.) "Which is 'better,' pseudocode or a flowchart?" (Neither — pick whichever helps you reason about a specific problem; some people/problems suit one better than the other.)
- **Key Takeaways (#takeaways):** 3 bullets: flowcharts are algorithms drawn as shapes; every decision needs two labeled branches; algorithm/pseudocode/flowchart are three representations of the same logic, and this chapter is complete once you can move between all three.

- [ ] **Step 1: Write the file** following the skeleton and content brief, including the Mini Project section (#miniproject) with its own entry in `.topic-toc`, and the "Back to Unit 1 Overview" footer link instead of a "Next Topic" link.

- [ ] **Step 2: Verify**

Run: `(Select-String -Path pages/unit1/flowcharts.html -Pattern 'question:').Count` → expect `20`.
Run: `Select-String -Path pages/unit1/flowcharts.html -Pattern 'miniproject'` → expect at least 2 matches (section id + toc link).

- [ ] **Step 3: Commit**

```bash
git add pages/unit1/flowcharts.html
git commit -m "feat: add Flowcharts topic page with chapter mini project"
```

---

## Task 13: Sidebar consistency check + final verification

**Files:** none created; verification only.

- [ ] **Step 1: Confirm every page's sidebar is identical in content**

Run (PowerShell): compare the sidebar block across all 8 new/modified pages by extracting the `<aside class="sidebar">...</aside>` region and diffing:

```powershell
$files = @('index.html','pages\unit1\index.html','pages\unit1\evolution-of-programming.html','pages\unit1\programming-languages.html','pages\unit1\problem-solving.html','pages\unit1\sequential-logic.html','pages\unit1\algorithms.html','pages\unit1\pseudocode.html','pages\unit1\flowcharts.html')
foreach ($f in $files) {
  $content = Get-Content $f -Raw
  $hasAllLinks = ($content -match 'evolution-of-programming\.html') -and ($content -match 'programming-languages\.html') -and ($content -match 'problem-solving\.html') -and ($content -match 'sequential-logic\.html') -and ($content -match 'algorithms\.html') -and ($content -match 'pseudocode\.html') -and ($content -match 'flowcharts\.html')
  Write-Output "$f : $hasAllLinks"
}
```

Expected: `True` for every file (each page's sidebar links to all 7 topics, regardless of which page you're on — only the `active` class position differs, which this check doesn't need to verify).

- [ ] **Step 2: Confirm prev/next chain is unbroken**

Run: for each consecutive pair in the 7-topic order, confirm page N links forward to page N+1 and page N+1 links back to page N:

```powershell
$order = @('evolution-of-programming.html','programming-languages.html','problem-solving.html','sequential-logic.html','algorithms.html','pseudocode.html','flowcharts.html')
for ($i = 0; $i -lt $order.Length - 1; $i++) {
  $current = "pages\unit1\$($order[$i])"
  $next = $order[$i + 1]
  $forwardLinkExists = (Get-Content $current -Raw) -match [regex]::Escape($next)
  Write-Output "$($order[$i]) -> $next : $forwardLinkExists"
}
```

Expected: `True` for all 6 pairs.

- [ ] **Step 3: Confirm every quiz has exactly 20 questions**

```powershell
$pages = @('evolution-of-programming.html','programming-languages.html','problem-solving.html','sequential-logic.html','algorithms.html','pseudocode.html','flowcharts.html')
foreach ($p in $pages) {
  $count = (Select-String -Path "pages\unit1\$p" -Pattern 'question:').Count
  Write-Output "$p : $count questions"
}
```

Expected: `20` for every page.

- [ ] **Step 4: `git status` clean, `git log` sanity check**

Run: `git status --short` → expect clean.
Run: `git log --oneline -20` → confirm all commits from this plan are present in order.

- [ ] **Step 5: Manual browser check (documented as a follow-up, not automatable here)**

Note in the final report that a human should open `pages/unit1/index.html` and click through all 7 topics, confirming: sidebar navigation works, in-page TOC jump-links scroll correctly, prev/next buttons chain through all 7 pages, quizzes render and score correctly (try answering a few questions right and wrong), and copy-code buttons on the Algorithms/Pseudocode pages actually copy to clipboard.

- [ ] **Step 6: Commit any fixes found during verification**

```bash
git add -A
git commit -m "fix: address issues found during Unit1 Group1 verification pass"
```
(Skip if nothing needed fixing.)

---

## Self-Review Notes

- **Spec coverage:** shared infra (diagrams/quiz/copy-code — Tasks 1-4), Unit 1 index + sidebar expansion (Task 5), all 7 topic pages with full 21-section template minus inapplicable sections (Tasks 6-12), chapter mini project on the last page (Task 12), prev/next chain and sidebar consistency verified (Task 13). Matches the approved design spec section-by-section.
- **Deferred items confirmed out of scope, per spec:** real C syntax (starts next sub-project), populating `window.searchIndex`, the other 21 Unit 1 topics (Groups 2-4), cross-unit navigation — none of these appear in this plan.
- **Type/interface consistency:** every topic page uses the same quiz data shape (`{question, options, correctIndex, explanation}`) consumed by the one `js/quiz.js` engine from Task 3 — verified the schema is identical across Tasks 6-12's content briefs. Every page links the same 4 new/existing CSS files and 6 script tags in the same order.
