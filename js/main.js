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
