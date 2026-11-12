/* ==========================================================================
   quiz-90.js —— 长征知识挑战
   逐题作答、即时解析、成绩评定、纪念章与本地记录
   ========================================================================== */
(function () {
  "use strict";

  var root = document.querySelector("[data-quiz]");
  if (!root) return;

  var QS = (window.LM90_DATA || {}).questions || [];
  var LEVELS = (window.LM90_DATA || {}).badgeLevels || [];
  var startPanel = root.querySelector("[data-quiz-start]");
  var playPanel = root.querySelector("[data-quiz-play]");
  var resultPanel = root.querySelector("[data-quiz-result]");

  var index = 0;
  var score = 0;
  var locked = false;
  var answers = [];
  var history = (window.LM90 && LM90.quizState()) || { done: false, best: 0 };

  function esc(str) {
    return String(str == null ? "" : str).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  function levelFor(s) {
    for (var i = 0; i < LEVELS.length; i++) {
      if (s >= LEVELS[i].min) return LEVELS[i];
    }
    return LEVELS[LEVELS.length - 1];
  }

  function show(panel) {
    [startPanel, playPanel, resultPanel].forEach(function (p) {
      if (p) p.hidden = p !== panel;
    });
  }

  function start() {
    index = 0;
    score = 0;
    locked = false;
    answers = [];
    show(playPanel);
    renderQuestion();
  }

  function renderQuestion() {
    var q = QS[index];
    if (!q) return finish();
    var letters = ["A", "B", "C", "D", "E", "F"];
    root.querySelector("[data-q-step]").innerHTML = "<b>" + (index + 1) + "</b> / " + QS.length;
    root.querySelector("[data-q-bar]").style.width = ((index) / QS.length * 100) + "%";
    root.querySelector("[data-q-text]").textContent = q.q;
    root.querySelector("[data-q-options]").innerHTML = q.opts.map(function (opt, i) {
      return '<button class="lm-opt" type="button" data-opt="' + i + '">' +
        '<span class="lm-opt__key">' + letters[i] + "</span>" +
        "<span>" + esc(opt) + "</span>" +
        '<span class="lm-opt__mark">✓</span></button>';
    }).join("");
    var ex = root.querySelector("[data-q-explain]");
    ex.classList.remove("is-show");
    ex.innerHTML = "";
    var nextBtn = root.querySelector("[data-q-next]");
    nextBtn.hidden = true;
    nextBtn.textContent = index === QS.length - 1 ? "查看成绩" : "下一题";
    locked = false;
  }

  function choose(optIndex, btn) {
    if (locked) return;
    locked = true;
    var q = QS[index];
    var correct = optIndex === q.a;
    if (correct) score++;
    answers.push({ q: q.q, chosen: optIndex, correct: correct, a: q.a, ex: q.ex, src: q.src });

    var options = root.querySelectorAll(".lm-opt");
    Array.prototype.forEach.call(options, function (el, i) {
      el.disabled = true;
      if (i === q.a) el.classList.add("is-correct");
      if (i === optIndex && !correct) el.classList.add("is-wrong");
    });
    var ex = root.querySelector("[data-q-explain]");
    ex.innerHTML = "<b>" + (correct ? "回答正确" : "正确答案：" + q.opts[q.a]) + "</b>　" + esc(q.ex) +
      '<br><span class="muted">依据：' + esc(q.src) + "</span>";
    ex.classList.add("is-show");
    var nextBtn = root.querySelector("[data-q-next]");
    nextBtn.hidden = false;
    nextBtn.focus();
  }

  function next() {
    index++;
    if (index >= QS.length) finish();
    else renderQuestion();
  }

  function finish() {
    if (window.LM90) LM90.setQuiz(score, QS.length);
    var level = levelFor(score);
    show(resultPanel);
    root.querySelector("[data-result-score]").textContent = score;
    root.querySelector("[data-result-total]").textContent = "/ " + QS.length;
    root.querySelector("[data-result-level]").textContent = level.name;
    root.querySelector("[data-result-note]").textContent = level.note;
    var best = Math.max(score, (history && history.best) || 0);
    root.querySelector("[data-result-best]").textContent = best;
    var review = root.querySelector("[data-result-review]");
    review.innerHTML = answers.map(function (a, i) {
      return '<div class="lm-review-item' + (a.correct ? "" : " is-wrong") + '"><i>' + (a.correct ? "✓" : "✕") + "</i><div>" +
        "<b>第 " + (i + 1) + " 题 · " + esc(a.q) + "</b>" +
        "<span>正确答案：" + esc(QS[i].opts[a.a]) + "　" + esc(a.ex) + "</span></div></div>";
    }).join("");
    review.classList.remove("is-show");

    // 纪念卡预览
    var canvas = root.querySelector("[data-quiz-canvas]");
    if (canvas && window.LM90 && LM90.drawSouvenir) {
      LM90.drawSouvenir(canvas, {
        name: "长征知识挑战",
        level: level.name,
        score: score + " / " + QS.length,
        message: level.note,
        date: new Date()
      });
    }
  }

  root.addEventListener("click", function (e) {
    if (e.target.closest("[data-quiz-begin]")) return start();
    var opt = e.target.closest("[data-opt]");
    if (opt) return choose(Number(opt.getAttribute("data-opt")), opt);
    if (e.target.closest("[data-q-next]")) return next();
    if (e.target.closest("[data-quiz-retry]")) return start();
    if (e.target.closest("[data-review-toggle]")) {
      var review = root.querySelector("[data-result-review]");
      review.classList.toggle("is-show");
      return;
    }
    if (e.target.closest("[data-quiz-download]")) {
      var c = root.querySelector("[data-quiz-canvas]");
      if (c && window.LM90 && LM90.downloadCanvas) {
        LM90.downloadCanvas(c, "长征知识挑战纪念章.png");
      }
    }
  });

  if (startPanel) {
    var bestEl = startPanel.querySelector("[data-start-best]");
    if (bestEl) bestEl.textContent = history && history.done ? history.best + " / " + QS.length : "尚未挑战";
  }
  show(startPanel);
})();
