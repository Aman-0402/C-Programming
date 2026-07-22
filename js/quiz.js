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
