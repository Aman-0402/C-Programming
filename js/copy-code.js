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
