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
