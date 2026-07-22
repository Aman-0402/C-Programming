# Foundation Sub-Project Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the folder structure, design system, shared shell navigation (top nav, sidebar, search UI, dark/light mode, breadcrumbs), and homepage for the C Programming eBook site, per `docs/superpowers/specs/2026-07-22-foundation-design.md`.

**Architecture:** Static, no-build-step site. Multiple focused CSS files (tokens/base/layout/components/homepage) and JS files (theme/sidebar/search/main), all vanilla. Dark mode via a `data-theme` attribute driven by CSS custom properties. Shell markup (nav/sidebar/footer) lives only in `index.html` for now — later sub-projects duplicate it into unit pages.

**Tech Stack:** HTML5, CSS3 (custom properties, Grid/Flexbox), vanilla JS (IIFEs, no modules needed yet), Google Fonts CDN, Font Awesome Free CDN.

**Testing approach note:** This is a static site with no test framework and no build step, so classic red/green TDD does not apply. Each task instead follows: write the file with complete content → run an automated syntax check (`node --check` for JS) → open the page in a browser and manually verify the described behavior → commit. This substitutes for the TDD loop while keeping the same discipline of verifying before moving on.

---

## Task 1: Folder scaffold + placeholder unit directories

**Files:**
- Create: `css/.gitkeep` (removed once real CSS files land in Task 2+)
- Create: `js/.gitkeep` (removed once real JS files land in Task 6+)
- Create: `assets/images/.gitkeep`
- Create: `assets/icons/.gitkeep`
- Create: `pages/unit1/.gitkeep`
- Create: `pages/unit2/.gitkeep`
- Create: `pages/unit3/.gitkeep`
- Create: `pages/unit4/.gitkeep`
- Create: `pages/unit5/.gitkeep`

- [ ] **Step 1: Create directories**

Run:
```powershell
New-Item -ItemType Directory -Force css, js, assets/images, assets/icons, pages/unit1, pages/unit2, pages/unit3, pages/unit4, pages/unit5
```

- [ ] **Step 2: Add `.gitkeep` files so git tracks the empty dirs**

Run:
```powershell
New-Item -ItemType File -Force css/.gitkeep, js/.gitkeep, assets/images/.gitkeep, assets/icons/.gitkeep, pages/unit1/.gitkeep, pages/unit2/.gitkeep, pages/unit3/.gitkeep, pages/unit4/.gitkeep, pages/unit5/.gitkeep
```

- [ ] **Step 3: Verify structure**

Run: `Get-ChildItem -Recurse -Directory`
Expected: `css`, `js`, `assets/images`, `assets/icons`, `pages/unit1..5` all listed.

- [ ] **Step 4: Commit**

```bash
git add css/.gitkeep js/.gitkeep assets/images/.gitkeep assets/icons/.gitkeep pages/unit1/.gitkeep pages/unit2/.gitkeep pages/unit3/.gitkeep pages/unit4/.gitkeep pages/unit5/.gitkeep
git commit -m "chore: scaffold project folder structure"
```

---

## Task 2: Design tokens (`css/variables.css`)

**Files:**
- Create: `css/variables.css`
- Delete: `css/.gitkeep` (no longer needed once a real file exists)

- [ ] **Step 1: Write the file**

```css
/* css/variables.css — design tokens: palette, spacing, radius, shadows, theme layer */

:root {
  /* Brand palette (fixed, per spec) */
  --color-primary: #2563EB;
  --color-primary-dark: #1D4ED8;
  --color-primary-light: #60A5FA;
  --color-secondary: #0EA5E9;
  --color-success: #10B981;
  --color-warning: #F59E0B;
  --color-danger: #EF4444;
  --bg-light: #F8FAFC;
  --bg-dark: #0F172A;

  /* Spacing scale */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 24px;
  --space-6: 32px;
  --space-7: 48px;
  --space-8: 64px;

  /* Radius scale */
  --radius-sm: 6px;
  --radius-md: 12px;
  --radius-lg: 20px;
  --radius-full: 999px;

  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(15, 23, 42, 0.06);
  --shadow-md: 0 4px 12px rgba(15, 23, 42, 0.10);
  --shadow-lg: 0 12px 32px rgba(15, 23, 42, 0.16);

  /* Fonts */
  --font-body: 'Inter', system-ui, -apple-system, sans-serif;
  --font-mono: 'JetBrains Mono', 'Consolas', monospace;

  /* Layout */
  --sidebar-width: 280px;
  --sidebar-width-collapsed: 72px;
  --topnav-height: 64px;

  /* Semantic tokens — light theme (default) */
  --bg: var(--bg-light);
  --surface: #FFFFFF;
  --surface-glass: rgba(255, 255, 255, 0.65);
  --text: #0F172A;
  --text-muted: #475569;
  --border: #E2E8F0;
}

[data-theme="dark"] {
  --bg: var(--bg-dark);
  --surface: #1E293B;
  --surface-glass: rgba(30, 41, 59, 0.65);
  --text: #F1F5F9;
  --text-muted: #94A3B8;
  --border: #334155;
}
```

- [ ] **Step 2: Delete the now-unneeded gitkeep**

```powershell
Remove-Item css/.gitkeep
```

- [ ] **Step 3: Verify no syntax errors**

Run: `Get-Content css/variables.css | Select-String -Pattern '\{|\}' | Measure-Object`
Expected: runs without error (sanity check the file parses as text; full visual verification happens once `index.html` links it in Task 11).

- [ ] **Step 4: Commit**

```bash
git add css/variables.css
git commit -m "feat: add design tokens (palette, spacing, theme layer)"
```

---

## Task 3: Base styles (`css/base.css`)

**Files:**
- Create: `css/base.css`

- [ ] **Step 1: Write the file**

```css
/* css/base.css — reset + base typography */

*, *::before, *::after {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  font-family: var(--font-body);
  background: var(--bg);
  color: var(--text);
  line-height: 1.6;
  transition: background-color 0.2s ease, color 0.2s ease;
}

h1, h2, h3, h4, h5, h6 {
  margin: 0 0 var(--space-4);
  line-height: 1.25;
  font-weight: 700;
}

h1 { font-size: clamp(2rem, 4vw, 3rem); }
h2 { font-size: clamp(1.5rem, 3vw, 2.25rem); }
h3 { font-size: 1.5rem; }
h4 { font-size: 1.25rem; }

p {
  margin: 0 0 var(--space-4);
  color: var(--text-muted);
}

a {
  color: var(--color-primary);
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

code, pre {
  font-family: var(--font-mono);
}

img {
  max-width: 100%;
  display: block;
}

ul, ol {
  padding-left: var(--space-5);
}

button {
  font-family: inherit;
  cursor: pointer;
}

::selection {
  background: var(--color-primary-light);
  color: #0F172A;
}
```

- [ ] **Step 2: Verify**

Run: `Test-Path css/base.css`
Expected: `True`

- [ ] **Step 3: Commit**

```bash
git add css/base.css
git commit -m "feat: add base reset and typography styles"
```

---

## Task 4: Shell layout (`css/layout.css`)

**Files:**
- Create: `css/layout.css`

- [ ] **Step 1: Write the file**

```css
/* css/layout.css — page shell: topnav, sidebar, content grid, footer */

.shell {
  display: grid;
  grid-template-columns: var(--sidebar-width) 1fr;
  min-height: 100vh;
  transition: grid-template-columns 0.2s ease;
}

.shell[data-sidebar-collapsed="true"] {
  grid-template-columns: var(--sidebar-width-collapsed) 1fr;
}

/* Top nav */
.topnav {
  position: sticky;
  top: 0;
  z-index: 40;
  grid-column: 1 / -1;
  height: var(--topnav-height);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 var(--space-5);
  background: var(--surface-glass);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border);
}

.topnav-left {
  display: flex;
  align-items: center;
  gap: var(--space-4);
}

.topnav-right {
  display: flex;
  align-items: center;
  gap: var(--space-3);
}

.logo {
  font-weight: 800;
  font-size: 1.1rem;
  color: var(--text);
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.breadcrumbs {
  font-size: 0.85rem;
  color: var(--text-muted);
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.breadcrumbs a {
  color: var(--text-muted);
}

.progress-bar {
  position: fixed;
  top: var(--topnav-height);
  left: 0;
  height: 3px;
  width: 0%;
  background: linear-gradient(90deg, var(--color-primary), var(--color-secondary));
  z-index: 41;
  transition: width 0.1s ease-out;
}

/* Sidebar */
.sidebar {
  grid-row: 2;
  border-right: 1px solid var(--border);
  background: var(--surface);
  padding: var(--space-5) var(--space-3);
  overflow-y: auto;
}

.shell[data-sidebar-collapsed="true"] .sidebar-label {
  display: none;
}

.sidebar-unit {
  margin-bottom: var(--space-4);
}

.sidebar-unit-title {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--text-muted);
  padding: var(--space-2) var(--space-3);
}

.sidebar-link {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-2) var(--space-3);
  border-radius: var(--radius-sm);
  color: var(--text);
  font-size: 0.9rem;
}

.sidebar-link:hover {
  background: var(--bg);
  text-decoration: none;
}

.sidebar-link.active {
  background: var(--color-primary);
  color: #fff;
}

/* Content */
.content {
  grid-row: 2;
  padding: var(--space-6) var(--space-6) var(--space-8);
}

/* Footer */
.site-footer {
  grid-column: 1 / -1;
  border-top: 1px solid var(--border);
  padding: var(--space-6);
  text-align: center;
  color: var(--text-muted);
  font-size: 0.85rem;
}

/* Mobile */
.mobile-menu-toggle {
  display: none;
}

@media (max-width: 900px) {
  .shell {
    grid-template-columns: 1fr;
  }

  .sidebar {
    position: fixed;
    top: var(--topnav-height);
    left: 0;
    bottom: 0;
    width: var(--sidebar-width);
    transform: translateX(-100%);
    transition: transform 0.2s ease;
    z-index: 39;
  }

  .sidebar.mobile-open {
    transform: translateX(0);
    box-shadow: var(--shadow-lg);
  }

  .mobile-menu-toggle {
    display: inline-flex;
  }

  .breadcrumbs {
    display: none;
  }
}
```

- [ ] **Step 2: Verify**

Run: `Test-Path css/layout.css`
Expected: `True`

- [ ] **Step 3: Commit**

```bash
git add css/layout.css
git commit -m "feat: add shell layout styles (topnav, sidebar, content grid)"
```

---

## Task 5: Component styles (`css/components.css`)

**Files:**
- Create: `css/components.css`

- [ ] **Step 1: Write the file**

```css
/* css/components.css — buttons, cards, badges, code chrome, search panel */

/* Buttons */
.btn {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-5);
  border-radius: var(--radius-md);
  border: 1px solid transparent;
  font-weight: 600;
  font-size: 0.95rem;
  transition: transform 0.15s ease, box-shadow 0.15s ease, background-color 0.15s ease;
}

.btn:hover {
  text-decoration: none;
  transform: translateY(-2px);
}

.btn-primary {
  background: var(--color-primary);
  color: #fff;
  box-shadow: var(--shadow-md);
}

.btn-primary:hover {
  background: var(--color-primary-dark);
  box-shadow: var(--shadow-lg);
}

.btn-ghost {
  background: transparent;
  color: var(--text);
  border-color: var(--border);
}

.btn-ghost:hover {
  background: var(--surface);
}

.icon-btn {
  width: 40px;
  height: 40px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-full);
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--text);
}

.icon-btn:hover {
  background: var(--bg);
}

/* Cards */
.card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: var(--space-5);
  box-shadow: var(--shadow-sm);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
}

.glass-card {
  background: var(--surface-glass);
  backdrop-filter: blur(16px);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
}

/* Badge */
.badge {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  padding: 2px 10px;
  border-radius: var(--radius-full);
  font-size: 0.75rem;
  font-weight: 600;
  background: color-mix(in srgb, var(--color-primary) 15%, transparent);
  color: var(--color-primary);
}

.badge-success { background: color-mix(in srgb, var(--color-success) 15%, transparent); color: var(--color-success); }
.badge-warning { background: color-mix(in srgb, var(--color-warning) 15%, transparent); color: var(--color-warning); }

/* Code block chrome */
.code-block {
  background: #0F172A;
  color: #E2E8F0;
  border-radius: var(--radius-md);
  overflow: hidden;
  margin: var(--space-4) 0;
}

.code-block-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-2) var(--space-4);
  background: rgba(255, 255, 255, 0.05);
  font-size: 0.8rem;
  color: #94A3B8;
}

.code-block pre {
  margin: 0;
  padding: var(--space-4);
  overflow-x: auto;
  font-size: 0.9rem;
}

.copy-btn {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: #E2E8F0;
  border-radius: var(--radius-sm);
  padding: var(--space-1) var(--space-3);
  font-size: 0.75rem;
}

.copy-btn:hover {
  background: rgba(255, 255, 255, 0.1);
}

/* Search panel */
.search-panel {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.5);
  display: none;
  align-items: flex-start;
  justify-content: center;
  padding-top: 12vh;
  z-index: 100;
}

.search-panel[data-open="true"] {
  display: flex;
}

.search-panel-inner {
  width: min(600px, 90vw);
  background: var(--surface);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  overflow: hidden;
}

.search-input-row {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-4);
  border-bottom: 1px solid var(--border);
}

.search-input-row input {
  flex: 1;
  border: none;
  outline: none;
  font-size: 1rem;
  background: transparent;
  color: var(--text);
}

.search-results {
  list-style: none;
  margin: 0;
  padding: var(--space-2) 0;
  max-height: 50vh;
  overflow-y: auto;
}

.search-results li {
  padding: var(--space-3) var(--space-4);
}

.search-results li:hover {
  background: var(--bg);
}

.search-empty {
  color: var(--text-muted);
  font-size: 0.9rem;
}

/* Feature grid */
.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: var(--space-5);
}

/* Progress / theme toggle icon swap */
[data-theme="dark"] .icon-sun { display: none; }
[data-theme="light"] .icon-moon,
:root:not([data-theme]) .icon-moon { display: none; }
```

- [ ] **Step 2: Verify**

Run: `Test-Path css/components.css`
Expected: `True`

- [ ] **Step 3: Commit**

```bash
git add css/components.css
git commit -m "feat: add component styles (buttons, cards, code chrome, search panel)"
```

---

## Task 6: Homepage styles (`css/homepage.css`)

**Files:**
- Create: `css/homepage.css`

- [ ] **Step 1: Write the file**

```css
/* css/homepage.css — hero, stats strip, unit cards */

.hero {
  text-align: center;
  padding: var(--space-8) var(--space-5);
  max-width: 800px;
  margin: 0 auto;
}

.hero-badge {
  margin-bottom: var(--space-4);
}

.hero p.lead {
  font-size: 1.15rem;
  max-width: 600px;
  margin: 0 auto var(--space-6);
}

.hero-actions {
  display: flex;
  gap: var(--space-4);
  justify-content: center;
  flex-wrap: wrap;
}

.hero-actions .btn-primary {
  animation: pulse-glow 2.4s ease-in-out infinite;
}

@keyframes pulse-glow {
  0%, 100% { box-shadow: var(--shadow-md); }
  50% { box-shadow: 0 0 0 8px color-mix(in srgb, var(--color-primary) 12%, transparent); }
}

.stats-strip {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: var(--space-5);
  max-width: 900px;
  margin: var(--space-7) auto;
}

.stat {
  text-align: center;
}

.stat-value {
  font-size: 2rem;
  font-weight: 800;
  color: var(--color-primary);
}

.stat-label {
  font-size: 0.85rem;
  color: var(--text-muted);
}

.section {
  max-width: 1100px;
  margin: var(--space-8) auto;
  padding: 0 var(--space-5);
}

.section-title {
  text-align: center;
  margin-bottom: var(--space-6);
}

.unit-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--space-5);
}

.unit-card-number {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: var(--radius-full);
  background: var(--color-primary);
  color: #fff;
  font-weight: 700;
  margin-bottom: var(--space-3);
}

.unit-card h3 {
  margin-bottom: var(--space-2);
}

.unit-card .topic-count {
  font-size: 0.8rem;
  color: var(--text-muted);
  margin-bottom: var(--space-4);
}
```

- [ ] **Step 2: Verify**

Run: `Test-Path css/homepage.css`
Expected: `True`

- [ ] **Step 3: Commit**

```bash
git add css/homepage.css
git commit -m "feat: add homepage-specific styles"
```

---

## Task 7: Theme toggle (`js/theme.js`)

**Files:**
- Create: `js/theme.js`
- Delete: `js/.gitkeep`

- [ ] **Step 1: Write the file**

```javascript
// js/theme.js — dark/light toggle button wiring (initial theme is set inline in <head> to avoid flash)
(function () {
  const toggle = document.getElementById('theme-toggle');
  if (!toggle) return;

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    toggle.setAttribute('aria-pressed', String(theme === 'dark'));
  }

  toggle.addEventListener('click', function () {
    const current = document.documentElement.getAttribute('data-theme') || 'light';
    applyTheme(current === 'dark' ? 'light' : 'dark');
  });
})();
```

- [ ] **Step 2: Delete gitkeep**

```powershell
Remove-Item js/.gitkeep
```

- [ ] **Step 3: Syntax check**

Run: `node --check js/theme.js`
Expected: no output, exit code 0.

- [ ] **Step 4: Commit**

```bash
git add js/theme.js
git commit -m "feat: add dark/light theme toggle wiring"
```

---

## Task 8: Sidebar behavior (`js/sidebar.js`)

**Files:**
- Create: `js/sidebar.js`

- [ ] **Step 1: Write the file**

```javascript
// js/sidebar.js — collapsible sidebar, active-link highlight, mobile toggle
(function () {
  const shell = document.querySelector('.shell');
  const sidebar = document.querySelector('.sidebar');
  const collapseBtn = document.getElementById('sidebar-collapse');
  const hamburger = document.getElementById('mobile-menu-toggle');
  if (!shell || !sidebar) return;

  if (localStorage.getItem('sidebarCollapsed') === 'true') {
    shell.setAttribute('data-sidebar-collapsed', 'true');
  }

  if (collapseBtn) {
    collapseBtn.addEventListener('click', function () {
      const collapsed = shell.getAttribute('data-sidebar-collapsed') === 'true';
      shell.setAttribute('data-sidebar-collapsed', String(!collapsed));
      localStorage.setItem('sidebarCollapsed', String(!collapsed));
    });
  }

  if (hamburger) {
    hamburger.addEventListener('click', function () {
      sidebar.classList.toggle('mobile-open');
    });
  }

  const currentFile = window.location.pathname.split('/').pop() || 'index.html';
  sidebar.querySelectorAll('a[href]').forEach(function (link) {
    const linkFile = link.getAttribute('href').split('/').pop();
    if (linkFile === currentFile) {
      link.classList.add('active');
    }
  });
})();
```

- [ ] **Step 2: Syntax check**

Run: `node --check js/sidebar.js`
Expected: no output, exit code 0.

- [ ] **Step 3: Commit**

```bash
git add js/sidebar.js
git commit -m "feat: add sidebar collapse, mobile toggle, active-link highlight"
```

---

## Task 9: Search panel UI (`js/search.js`)

**Files:**
- Create: `js/search.js`

- [ ] **Step 1: Write the file**

```javascript
// js/search.js — search overlay UI. window.searchIndex starts empty; later
// sub-projects populate it with { title, description, url } entries.
(function () {
  window.searchIndex = window.searchIndex || [];

  const openBtn = document.getElementById('search-open');
  const panel = document.getElementById('search-panel');
  const closeBtn = document.getElementById('search-close');
  const input = document.getElementById('search-input');
  const results = document.getElementById('search-results');
  if (!panel || !input || !results) return;

  function render(query) {
    const q = query.trim().toLowerCase();

    if (!window.searchIndex.length) {
      results.innerHTML = '<li class="search-empty">Search index not available yet — content is still being added.</li>';
      return;
    }

    const matches = window.searchIndex.filter(function (item) {
      return item.title.toLowerCase().includes(q) || item.description.toLowerCase().includes(q);
    });

    results.innerHTML = matches.length
      ? matches.map(function (m) {
          return '<li><a href="' + m.url + '">' + m.title + '</a><p>' + m.description + '</p></li>';
        }).join('')
      : '<li class="search-empty">No results found.</li>';
  }

  function openPanel() {
    panel.setAttribute('data-open', 'true');
    input.value = '';
    input.focus();
    render('');
  }

  function closePanel() {
    panel.setAttribute('data-open', 'false');
  }

  if (openBtn) openBtn.addEventListener('click', openPanel);
  if (closeBtn) closeBtn.addEventListener('click', closePanel);
  input.addEventListener('input', function (e) { render(e.target.value); });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closePanel();
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      openPanel();
    }
  });

  panel.addEventListener('click', function (e) {
    if (e.target === panel) closePanel();
  });
})();
```

- [ ] **Step 2: Syntax check**

Run: `node --check js/search.js`
Expected: no output, exit code 0.

- [ ] **Step 3: Commit**

```bash
git add js/search.js
git commit -m "feat: add search panel UI with empty index stub"
```

---

## Task 10: Shared init (`js/main.js`)

**Files:**
- Create: `js/main.js`

- [ ] **Step 1: Write the file**

```javascript
// js/main.js — scroll progress bar + mobile nav backdrop close
(function () {
  const bar = document.getElementById('progress-bar');

  function updateProgress() {
    if (!bar) return;
    const scrollTop = window.scrollY;
    const height = document.documentElement.scrollHeight - window.innerHeight;
    const pct = height > 0 ? (scrollTop / height) * 100 : 0;
    bar.style.width = pct + '%';
  }

  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();

  const sidebar = document.querySelector('.sidebar');
  document.addEventListener('click', function (e) {
    if (!sidebar || !sidebar.classList.contains('mobile-open')) return;
    if (!sidebar.contains(e.target) && !e.target.closest('#mobile-menu-toggle')) {
      sidebar.classList.remove('mobile-open');
    }
  });
})();
```

- [ ] **Step 2: Syntax check**

Run: `node --check js/main.js`
Expected: no output, exit code 0.

- [ ] **Step 3: Commit**

```bash
git add js/main.js
git commit -m "feat: add scroll progress bar and mobile nav close-on-outside-click"
```

---

## Task 11: Homepage (`index.html`)

**Files:**
- Create: `index.html`

- [ ] **Step 1: Write the file**

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Learn C Programming — Interactive eBook</title>
<meta name="description" content="A free, beginner-friendly, interactive C Programming eBook. Learn from absolute basics to advanced topics with real-life analogies, dry runs, and practice.">

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">

<link rel="stylesheet" href="css/variables.css">
<link rel="stylesheet" href="css/base.css">
<link rel="stylesheet" href="css/layout.css">
<link rel="stylesheet" href="css/components.css">
<link rel="stylesheet" href="css/homepage.css">

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
      <a href="index.html" class="logo">
        <i class="fa-solid fa-code" style="color: var(--color-primary);"></i>
        C Programming eBook
      </a>
      <div class="breadcrumbs">
        <a href="index.html">Home</a>
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
      <a class="sidebar-link" href="pages/unit1/index.html"><i class="fa-solid fa-book"></i><span class="sidebar-label">Programming Fundamentals &amp; C Basics</span></a>
    </div>
    <div class="sidebar-unit">
      <div class="sidebar-unit-title"><span class="sidebar-label">Unit 2</span></div>
      <a class="sidebar-link" href="pages/unit2/index.html"><i class="fa-solid fa-book"></i><span class="sidebar-label">C Building Blocks &amp; Data Types</span></a>
    </div>
    <div class="sidebar-unit">
      <div class="sidebar-unit-title"><span class="sidebar-label">Unit 3</span></div>
      <a class="sidebar-link" href="pages/unit3/index.html"><i class="fa-solid fa-book"></i><span class="sidebar-label">Control Statements</span></a>
    </div>
    <div class="sidebar-unit">
      <div class="sidebar-unit-title"><span class="sidebar-label">Unit 4</span></div>
      <a class="sidebar-link" href="pages/unit4/index.html"><i class="fa-solid fa-book"></i><span class="sidebar-label">Strings, Functions &amp; Pointers</span></a>
    </div>
    <div class="sidebar-unit">
      <div class="sidebar-unit-title"><span class="sidebar-label">Unit 5</span></div>
      <a class="sidebar-link" href="pages/unit5/index.html"><i class="fa-solid fa-book"></i><span class="sidebar-label">Structures, Files &amp; Memory Management</span></a>
    </div>
  </aside>

  <main class="content">

    <section class="hero">
      <span class="badge hero-badge"><i class="fa-solid fa-star"></i> 100% Free &middot; Beginner Friendly</span>
      <h1>Learn C Programming, From Zero to Advanced</h1>
      <p class="lead">An interactive eBook that explains every concept with real-life analogies, visual diagrams, dry runs, and hands-on practice — built for people who have never written a single line of code.</p>
      <div class="hero-actions">
        <a href="pages/unit1/index.html" class="btn btn-primary"><i class="fa-solid fa-play"></i> Start Learning</a>
        <a href="#units" class="btn btn-ghost">Browse Units</a>
      </div>
    </section>

    <div class="stats-strip">
      <div class="stat"><div class="stat-value">5</div><div class="stat-label">Units</div></div>
      <div class="stat"><div class="stat-value">140+</div><div class="stat-label">Topics Planned</div></div>
      <div class="stat"><div class="stat-value">Coming Soon</div><div class="stat-label">Practice MCQs</div></div>
      <div class="stat"><div class="stat-value">Coming Soon</div><div class="stat-label">Code Playground</div></div>
    </div>

    <section class="section">
      <h2 class="section-title">Why Learn Here?</h2>
      <div class="feature-grid">
        <div class="card">
          <i class="fa-solid fa-lightbulb" style="color: var(--color-primary); font-size: 1.5rem;"></i>
          <h3>Real-Life Analogies</h3>
          <p>Every hard concept starts with an everyday example before any code appears.</p>
        </div>
        <div class="card">
          <i class="fa-solid fa-diagram-project" style="color: var(--color-secondary); font-size: 1.5rem;"></i>
          <h3>Visual Diagrams</h3>
          <p>Memory, flow, and structure diagrams built with plain HTML and CSS — no static images to go stale.</p>
        </div>
        <div class="card">
          <i class="fa-solid fa-shoe-prints" style="color: var(--color-success); font-size: 1.5rem;"></i>
          <h3>Step-by-Step Dry Runs</h3>
          <p>Watch variable values and memory change line by line, not just the final output.</p>
        </div>
        <div class="card">
          <i class="fa-solid fa-list-check" style="color: var(--color-warning); font-size: 1.5rem;"></i>
          <h3>Practice That Sticks</h3>
          <p>MCQs, interview questions, and mini projects reinforce every unit as it's added.</p>
        </div>
      </div>
    </section>

    <section class="section" id="units">
      <h2 class="section-title">Course Units</h2>
      <div class="unit-grid">
        <div class="card unit-card">
          <div class="unit-card-number">1</div>
          <h3>Programming Fundamentals &amp; C Basics</h3>
          <div class="topic-count">28 topics</div>
          <p>Algorithms, pseudocode, flowcharts, and how C source becomes a running program.</p>
          <a href="pages/unit1/index.html" class="btn btn-ghost">Start Unit <i class="fa-solid fa-arrow-right"></i></a>
        </div>
        <div class="card unit-card">
          <div class="unit-card-number">2</div>
          <h3>C Building Blocks &amp; Data Types</h3>
          <div class="topic-count">36 topics</div>
          <p>Tokens, variables, data types, operators, and your first input/output programs.</p>
          <a href="pages/unit2/index.html" class="btn btn-ghost">Start Unit <i class="fa-solid fa-arrow-right"></i></a>
        </div>
        <div class="card unit-card">
          <div class="unit-card-number">3</div>
          <h3>Control Statements</h3>
          <div class="topic-count">15 topics</div>
          <p>Decisions, loops, nested logic, and arrays — the building blocks of real programs.</p>
          <a href="pages/unit3/index.html" class="btn btn-ghost">Start Unit <i class="fa-solid fa-arrow-right"></i></a>
        </div>
        <div class="card unit-card">
          <div class="unit-card-number">4</div>
          <h3>Strings, Functions &amp; Pointers</h3>
          <div class="topic-count">34 topics</div>
          <p>String handling, reusable functions, recursion, and your first pointers.</p>
          <a href="pages/unit4/index.html" class="btn btn-ghost">Start Unit <i class="fa-solid fa-arrow-right"></i></a>
        </div>
        <div class="card unit-card">
          <div class="unit-card-number">5</div>
          <h3>Structures, Files &amp; Memory Management</h3>
          <div class="topic-count">30 topics</div>
          <p>Structures, unions, file handling, and dynamic memory allocation.</p>
          <a href="pages/unit5/index.html" class="btn btn-ghost">Start Unit <i class="fa-solid fa-arrow-right"></i></a>
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

<script src="js/theme.js"></script>
<script src="js/sidebar.js"></script>
<script src="js/search.js"></script>
<script src="js/main.js"></script>
</body>
</html>
```

- [ ] **Step 2: Verify page loads without errors**

Run:
```powershell
Start-Process "index.html"
```
Expected: Default browser opens the homepage. Open DevTools console (F12) and confirm zero errors. Visually confirm: hero section renders, 5 unit cards show, stats strip shows, sidebar lists 5 units.

- [ ] **Step 3: Manually verify interactive behavior**

In the browser:
1. Click the moon/sun icon in the top nav → page switches to dark background, icon swaps. Reload the page → dark mode persists.
2. Click the search icon (or press Ctrl+K) → search overlay opens with "Search index not available yet" message. Press Escape → it closes.
3. Click the collapse icon in the sidebar → sidebar narrows, labels hide. Reload → collapsed state persists.
4. Resize the browser window below ~900px width → sidebar hides, hamburger icon appears in top nav; clicking it slides the sidebar in.
5. Scroll the page → the thin progress bar under the top nav fills left-to-right.

Expected: all five behaviors work as described, no console errors.

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "feat: add homepage with hero, unit cards, and shell nav wiring"
```

---

## Task 12: `AGENTS.md`

**Files:**
- Create: `AGENTS.md`

- [ ] **Step 1: Write the file**

```markdown
# AGENTS.md — C Programming Interactive eBook

## What this project is

A free interactive C Programming eBook for absolute beginners, built as
a static website. See `docs/superpowers/specs/` for the full design
history and `docs/superpowers/plans/` for implementation plans.

## Hard constraints

- **Vanilla HTML5 / CSS3 / JavaScript only.** No React, Vue, Angular,
  Bootstrap, Tailwind, Node.js build step, or any other framework.
- **No build step.** The site must run by opening `index.html` directly
  in a browser.
- Allowed external dependencies (fonts/icons only, not frameworks):
  Google Fonts (Inter, JetBrains Mono), Font Awesome Free via CDN.

## Folder structure

```
/
├── index.html          homepage
├── css/                 variables.css (tokens) → base.css (reset/type)
│                         → layout.css (shell) → components.css (UI
│                         pieces) → homepage.css (page-specific)
├── js/                   theme.js, sidebar.js, search.js, main.js
│                         (each one IIFE, no build/bundler, loaded via
│                         plain <script> tags in document order)
├── assets/images/, assets/icons/
├── pages/unit1..unit5/   unit content, added by later sub-projects
└── docs/superpowers/     specs/ and plans/ from the brainstorming and
                          writing-plans skills
```

## Important caveat: duplicated shell markup

There is no templating engine. The top nav, sidebar, search panel, and
footer markup in `index.html` must be copied into every new page (unit
pages, topic pages) rather than included from one source. **When the
shell changes, every page that has a copy needs the same edit.** If
this becomes unmanageable, consider a lightweight client-side include
mechanism — but that decision needs its own design discussion, not a
silent workaround.

## Design tokens

Defined in `css/variables.css`. Components must use the **semantic**
layer (`--bg`, `--surface`, `--text`, `--text-muted`, `--border`,
`--surface-glass`), never raw hex codes or the brand palette variables
directly — that's what makes dark mode a single attribute swap.

Dark mode: `<html data-theme="dark">`, toggled by `js/theme.js`,
persisted via `localStorage.theme`. The initial value is set by an
inline `<script>` in `<head>` (before `js/theme.js` loads) to avoid a
flash of the wrong theme on page load — keep that inline script when
copying the shell into new pages.

## Search

`js/search.js` renders results from `window.searchIndex` (array of
`{ title, description, url }`). It is currently empty by design —
populate it once unit content pages exist, no UI changes needed.

## Workflow rules (from the project brief)

- Work phase-by-phase / sub-project by sub-project. Do not jump ahead.
- After each sub-project: verify functionality, review code quality,
  commit with a clear message, and push only when asked.
- Git commits must **not** include `Co-Authored-By` trailers or any AI
  attribution — commits should read as authored by the repo owner.

## Commands

No package manager, no build, no test runner yet. To sanity-check JS
syntax: `node --check js/<file>.js`. To preview: open `index.html` in
a browser, or `Start-Process index.html` in PowerShell.
```

- [ ] **Step 2: Verify**

Run: `Test-Path AGENTS.md`
Expected: `True`

- [ ] **Step 3: Commit**

```bash
git add AGENTS.md
git commit -m "docs: add AGENTS.md with project conventions"
```

---

## Task 13: Final verification pass

- [ ] **Step 1: Confirm full file tree matches the design**

Run: `Get-ChildItem -Recurse -File | Select-Object FullName`
Expected: `index.html`, `AGENTS.md`, 5 files under `css/`, 4 files under `js/`, `.gitkeep` files under `assets/images`, `assets/icons`, `pages/unit1..5`, plus the spec and plan under `docs/superpowers/`.

- [ ] **Step 2: Re-open homepage and re-run the 5 interactive checks from Task 11 Step 3**

Confirm dark mode persistence, search overlay, sidebar collapse persistence, mobile hamburger, and scroll progress bar all still work together (no conflicts between scripts).

- [ ] **Step 3: Check responsive breakpoints**

In DevTools device toolbar, check widths 375px (mobile), 768px (tablet), 1440px (desktop). Expected: no horizontal scrollbar at any width, sidebar behavior switches correctly at the 900px breakpoint.

- [ ] **Step 4: Final commit if any fixes were needed during verification**

```bash
git add -A
git commit -m "fix: address issues found during foundation verification pass"
```
(Skip this step if verification found nothing to fix.)

---

## Self-Review Notes

- **Spec coverage:** folder structure (Task 1), design tokens/light+dark (Task 2), base styles (Task 3), shell layout incl. sidebar/topnav/breadcrumbs/footer (Task 4), components incl. code chrome/search panel/badges (Task 5), homepage styles (Task 6), theme/sidebar/search/main JS (Tasks 7–10), homepage content with hero/features/unit cards/stats (Task 11), AGENTS.md (Task 12), verification (Task 13). All spec sections covered.
- **Deferred items confirmed out of scope per spec:** functional search indexing, unit content, playground, quiz system, print stylesheet — none appear in this plan, matching the spec's "Out of Scope" section.
