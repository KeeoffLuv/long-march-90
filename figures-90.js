/* ==========================================================================
   figures-90.js —— 长征群英·人物档案
   卡片渲染、分类筛选、档案弹窗、阅读进度与知识足迹
   ========================================================================== */
(function () {
  "use strict";

  var DATA = (window.LM90_DATA || {}).figures || [];
  var root = document.querySelector("[data-figures]");
  if (!root) return;

  var grid = root.querySelector("[data-figure-grid]");
  var chips = root.querySelector("[data-figure-filters]");
  var progressText = root.querySelector("[data-fig-progress]");
  var progressBar = root.querySelector("[data-fig-ring]");
  var read = (window.LM90 && LM90.figuresState()) || [];
  var filter = "all";

  function esc(str) {
    return String(str == null ? "" : str).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  var CAT_LABEL = { leader: "领袖", general: "将领", martyr: "英烈", brave: "勇士", ally: "同行者" };

  function cardMarkup(f) {
    var isRead = read.indexOf(f.id) !== -1;
    var portrait = f.portrait
      ? '<img src="' + f.portrait + '" alt="' + esc(f.name) + '历史影像" loading="lazy" decoding="async">'
      : '<span class="lm-archive__glyph" aria-hidden="true">' + esc(f.glyph) + '</span>' +
        '<span class="lm-archive__noimg">暂无影像 · 档案编号 ' + esc(f.no) + "</span>";
    return '' +
      '<button class="lm-archive' + (isRead ? " is-read" : "") + '" type="button" data-id="' + esc(f.id) + '" data-cat="' + esc(f.cat) + '" aria-label="打开 ' + esc(f.name) + ' 人物档案">' +
      '<span class="lm-archive__top">' +
      '<span class="lm-archive__no">' + esc(f.no) + "</span>" +
      '<span class="lm-archive__tag">' + esc(CAT_LABEL[f.cat] || f.tag) + "</span>" +
      "</span>" +
      '<span class="lm-archive__portrait' + ((f.id === 'liuzhidan' || f.id === 'chenshuxiang') ? ' lm-archive__portrait--full' : '') + '">' + portrait + "</span>" +
      '<span class="lm-archive__name">' + esc(f.name) + "</span>" +
      '<span class="lm-archive__role">' + esc(f.years) + " · " + esc(f.role) + "</span>" +
      '<span class="lm-archive__line">' + esc(f.story) + "</span>" +
      '<span class="lm-archive__foot"><span>阅读档案</span>' + LM90.icon("arrow") + "</span>" +
      "</button>";
  }


  function openFromHash() {
    var hash = (location.hash || '').replace(/^#/, '');
    if (!hash || hash.indexOf('fig-') !== 0) return;
    var id = hash.slice(4);
    if (DATA.some(function (f) { return f.id === id; })) openModal(id);
  }

  function render() {
    var list = DATA.filter(function (f) { return filter === "all" || f.cat === filter; });
    grid.innerHTML = list.map(cardMarkup).join("");
    updateProgress();
  }

  function updateProgress() {
    var total = DATA.length;
    var count = read.length;
    if (progressText) progressText.innerHTML = "已阅读 <b>" + count + "</b> / " + total + " 位";
    if (progressBar) {
      var c = 2 * Math.PI * 15;
      var frac = Math.min(1, count / total);
      progressBar.style.strokeDasharray = c.toFixed(1);
      progressBar.style.strokeDashoffset = (c * (1 - frac)).toFixed(1);
    }
  }

  /* ------------------------------ 档案弹窗 ------------------------------ */
  var modal = null;
  var lastFocus = null;
  var current = -1;

  function profileMarkup(f) {
    var portrait = f.portrait
      ? '<img src="' + f.portrait + '" alt="' + esc(f.name) + '历史影像" loading="lazy" decoding="async">'
      : '<span class="glyph" aria-hidden="true">' + esc(f.glyph) + '</span><span class="noimg">公开影像暂缺</span>';
    var facts = (f.facts || []).map(function (pair) {
      return "<div><dt>" + esc(pair[0]) + "</dt><dd>" + esc(pair[1]) + "</dd></div>";
    }).join("");
    return '' +
      '<div class="lm-profile">' +
      '<aside class="lm-profile__side">' +
      '<div class="lm-profile__portrait' + ((f.id === 'liuzhidan' || f.id === 'chenshuxiang') ? ' lm-profile__portrait--full' : '') + '">' + portrait + "</div>" +
      '<div class="lm-profile__no">档案编号 ' + esc(f.no) + "</div>" +
      '<div class="lm-profile__stamp" aria-hidden="true">长征<br>档案</div>' +
      "</aside>" +
      '<div class="lm-profile__main">' +
      '<span class="lm-profile__tag">' + esc(CAT_LABEL[f.cat] || f.tag) + " · " + esc(f.years) + "</span>" +
      '<h2 class="lm-profile__name" id="lmProfileName">' + esc(f.name) + "</h2>" +
      '<p class="lm-profile__role">' + esc(f.role) + "</p>" +
      '<dl class="lm-profile__facts">' + facts + "</dl>" +
      '<h3 class="lm-profile__h4">长征经历</h3>' +
      '<p class="lm-profile__text">' + esc(f.story) + "</p>" +
      '<p class="lm-profile__source">资料来源：' + esc(f.source) + '。</p>' +
      '<div class="lm-profile__media"><a href="' + esc(f.mediaUrl || "https://tv.cctv.com/2025/04/17/VIDEk5hmB4WmwaAZPDJ4ERYk250417.shtml") + '" target="_blank" rel="noopener">▶ ' + esc(f.mediaTitle || "观看长征影像") + '</a><a href="about.html?figure=' + encodeURIComponent(f.name) + '&fid=' + encodeURIComponent(f.id) + '#' + esc(f.routeNode || "timeline") + '">定位并高亮相关长征节点</a></div>' +
      '<div class="lm-profile__nav">' +
      '<button type="button" data-profile-prev>' + LM90.icon("arrowLeft") + " 上一位</button>" +
      '<button type="button" data-profile-next>下一位 ' + LM90.icon("arrow") + "</button>" +
      "</div></div></div>";
  }

  function openModal(id) {
    current = DATA.findIndex(function (f) { return f.id === id; });
    if (current < 0) return;
    var f = DATA[current];

    lastFocus = document.activeElement;
    if (!modal) {
      modal = document.createElement("div");
      modal.className = "lm-modal";
      modal.setAttribute("data-figure-modal", "");
      modal.innerHTML = '<div class="lm-modal__panel" role="dialog" aria-modal="true" aria-labelledby="lmProfileName">' +
        '<button class="lm-modal__close" type="button" aria-label="关闭档案">' + LM90.icon("close") + "</button>" +
        '<div data-profile-body></div></div>';
      document.body.appendChild(modal);
      modal.addEventListener("click", function (e) {
        if (e.target === modal || e.target.closest(".lm-modal__close")) closeModal();
        var prev = e.target.closest("[data-profile-prev]");
        var next = e.target.closest("[data-profile-next]");
        if (prev) step(-1);
        if (next) step(1);
      });
      document.addEventListener("keydown", function (e) {
        if (!modal || !modal.classList.contains("is-open")) return;
        if (e.key === "Escape") closeModal();
        if (e.key === "Tab") trap(e);
      });
    }
    modal.querySelector("[data-profile-body]").innerHTML = profileMarkup(f);
    modal.classList.add("is-open");
    document.body.classList.add("is-locked");
    requestAnimationFrame(function () { modal.querySelector(".lm-modal__close").focus(); });

    if (read.indexOf(f.id) === -1) {
      read.push(f.id);
      LM90.markFigure(f.id);
      var card = grid.querySelector('[data-id="' + f.id + '"]');
      if (card) card.classList.add("is-read");
      updateProgress();
    }
  }

  function step(dir) {
    var next = (current + dir + DATA.length) % DATA.length;
    openModal(DATA[next].id);
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove("is-open");
    document.body.classList.remove("is-locked");
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  function trap(e) {
    var panel = modal.querySelector(".lm-modal__panel");
    var focusables = panel.querySelectorAll("button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])");
    if (!focusables.length) return;
    var first = focusables[0];
    var last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  /* ------------------------------ 事件绑定 ------------------------------ */
  grid.addEventListener("click", function (e) {
    var card = e.target.closest(".lm-archive");
    if (card) openModal(card.getAttribute("data-id"));
  });

  if (chips) {
    chips.addEventListener("click", function (e) {
      var btn = e.target.closest("button[data-filter]");
      if (!btn) return;
      filter = btn.getAttribute("data-filter");
      Array.prototype.forEach.call(chips.children, function (b) {
        b.classList.toggle("is-active", b === btn);
        b.setAttribute("aria-pressed", String(b === btn));
      });
      render();
    });
  }

  render();
  openFromHash();
  window.addEventListener("hashchange", openFromHash);
})();
