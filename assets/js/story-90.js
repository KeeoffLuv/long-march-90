/* ==========================================================================
   story-90.js —— 1936 / 2026 时空对话
   关键词切换 + 可拖动历史/当代画面对比
   ========================================================================== */
(function () {
  "use strict";

  var PAIRS = (window.LM90_DATA || {}).pairs || [];
  var root = document.querySelector("[data-story]");
  if (!root || !PAIRS.length) return;

  var tabs = root.querySelector("[data-story-tabs]");
  var layer1936 = root.querySelector("[data-layer-1936]");
  var layer2026 = root.querySelector("[data-layer-2026]");
  var cell1936 = root.querySelector("[data-cell-1936]");
  var cell2026 = root.querySelector("[data-cell-2026]");
  var range = root.querySelector("[data-compare-range]");
  var handle = root.querySelector("[data-compare-handle]");
  var num = root.querySelector("[data-story-index]");
  var current = 0;

  function esc(str) {
    return String(str == null ? "" : str).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  function pad(n) { return n < 10 ? "0" + n : String(n); }

  function visualMarkup(obj, era) {
    if (era === "2026" && obj.image) {
      return '<div class="lm-compare__portrait-panel">' +
        '<span class="lm-compare__portrait-year" aria-hidden="true">2026</span>' +
        '<figure class="lm-compare__portrait-frame" style="--pos:' + esc(obj.pos || "50% 25%") + ";--zoom:" + esc(obj.zoom || "1.15") + '">' +
        '<img src="' + obj.image + '" alt="' + esc(obj.person || obj.title) + '影像" loading="lazy" decoding="async">' +
        "</figure>" +
        '<div class="lm-compare__portrait-meta"><b>' + esc(obj.person || "") + '</b><span>' + esc(obj.role || "") + '</span></div>' +
        "</div>";
    }
    if (obj.image) {
      return '<img src="' + obj.image + '" alt="' + esc(obj.title) + '" loading="lazy" decoding="async">' +
        '<span class="lm-compare__person">' + (obj.person ? esc(obj.person) : "历史场景") + "</span>";
    }
    return '<div class="lm-compare__plate">' +
      '<span class="lm-compare__plate-kicker">' + (era === "1936" ? "1934 · 湖南汝城沙洲村" : "") + "</span>" +
      '<b>' + esc(obj.plate || obj.title) + "</b>" +
      '<blockquote>' + esc(obj.text) + "</blockquote>" +
      "</div>";
  }

  function updateText() {
    var p = PAIRS[current];
    cell1936.innerHTML =
      '<div class="meta">' + esc(p.y1936.place) + "</div>" +
      "<h4>" + esc(p.y1936.title) + "</h4>" +
      "<p>" + esc(p.y1936.text) + "</p>" +
      '<p class="lm-compare__caption">' + esc(p.y1936.note || "") + "</p>";
    cell2026.innerHTML =
      '<div class="meta">2026 · ' + esc(p.y2026.role) + "</div>" +
      "<h4>" + esc(p.y2026.title) + "</h4>" +
      '<p class="who"><b>' + esc(p.y2026.person) + "</b>　" + esc(p.y2026.text) + "</p>" +
      '<p class="lm-compare__caption">' + esc(p.y2026.note || "") + "</p>";
    if (num) num.textContent = pad(current + 1) + " / " + pad(PAIRS.length);
  }

  function updateVisual() {
    var p = PAIRS[current];
    layer1936.innerHTML = visualMarkup(p.y1936, "1936");
    layer2026.innerHTML = visualMarkup(p.y2026, "2026");
  }

  function select(index, focusTab) {
    current = (index + PAIRS.length) % PAIRS.length;
    updateVisual();
    updateText();
    Array.prototype.forEach.call(tabs.children, function (btn, i) {
      var active = i === current;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-pressed", String(active));
      if (active && focusTab) btn.focus();
    });
  }

  function setSplit(value) {
    var v = Math.max(0, Math.min(100, Number(value)));
    if (layer2026) layer2026.style.clipPath = "inset(0 0 0 " + v + "%)";
    if (handle) handle.style.left = v + "%";
  }

  if (range) {
    setSplit(range.value);
    range.addEventListener("input", function () { setSplit(range.value); });
    range.addEventListener("change", function () { setSplit(range.value); });
  } else {
    setSplit(52);
  }

  if (tabs) {
    tabs.innerHTML = PAIRS.map(function (p, i) {
      return '<button type="button" data-idx="' + i + '" aria-pressed="false"><i>' + pad(i + 1) + "</i>" +
        esc(p.keyword) + " <span class=\"en\">" + esc(p.en) + "</span></button>";
    }).join("");
    tabs.addEventListener("click", function (e) {
      var btn = e.target.closest("button[data-idx]");
      if (btn) select(Number(btn.getAttribute("data-idx")), false);
    });
    tabs.addEventListener("keydown", function (e) {
      if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
      e.preventDefault();
      select(current + (e.key === "ArrowRight" ? 1 : -1), true);
    });
  }

  select(0, false);
})();
