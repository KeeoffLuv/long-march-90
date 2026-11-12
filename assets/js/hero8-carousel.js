/* 方案四：自动轮播历史背景；右侧90周年徽章与红绸始终固定 */
(function () {
  'use strict';
  var stage = document.querySelector('[data-hero8]');
  if (!stage) return;
  var slides = Array.prototype.slice.call(stage.querySelectorAll('.lm-v8-slide'));
  if (!slides.length) return;
  var current = 0;
  var timer = null;
  var reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function display(index) {
    current = (index + slides.length) % slides.length;
    slides.forEach(function (slide, i) {
      var active = i === current;
      slide.classList.toggle('is-active', active);
      slide.setAttribute('aria-hidden', String(!active));
    });
  }
  function stop() { if (timer !== null) { clearInterval(timer); timer = null; } }
  function start() {
    stop();
    if (document.hidden || reducedMotion || slides.length < 2) return;
    timer = setInterval(function () { display(current + 1); }, 6200);
  }
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) stop(); else start();
  });
  if (window.matchMedia) {
    var preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (preference.addEventListener) preference.addEventListener('change', function () {
      reducedMotion = preference.matches; start();
    });
  }
  display(0);
  start();
})();
