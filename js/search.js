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
