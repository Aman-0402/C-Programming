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
