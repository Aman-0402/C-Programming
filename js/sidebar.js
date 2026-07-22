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

  sidebar.querySelectorAll('a[href]').forEach(function (link) {
    if (link.pathname === window.location.pathname) {
      link.classList.add('active');
    }
  });

  sidebar.querySelectorAll('.sidebar-toggle').forEach(function (toggle) {
    const submenu = document.getElementById(toggle.id.replace('-toggle', '-submenu'));
    if (!submenu) return;

    if (submenu.querySelector('.active')) {
      submenu.classList.add('open');
      toggle.setAttribute('aria-expanded', 'true');
    }

    toggle.addEventListener('click', function () {
      const open = submenu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
  });
})();
