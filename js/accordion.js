// js/accordion.js — generic click-to-expand Q&A accordion (interview questions, etc.)
(function () {
  document.querySelectorAll('.interview-question').forEach(function (btn) {
    var answer = btn.nextElementSibling;
    if (!answer) return;

    btn.addEventListener('click', function () {
      var open = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!open));
      answer.hidden = open;
    });
  });
})();
