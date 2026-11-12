/* ==========================================================================
   site-90.js —— 全站公共交互
   页头、移动端导航、滚动入场、主视觉视差、纪念章图形、知识足迹（localStorage）
   ========================================================================== */
(function () {
  "use strict";

  var reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var emblemSeq = 0;

  /* ------------------------------ 本地存储 ------------------------------ */
  var NS = "lm90.";
  var store = {
    get: function (key, fallback) {
      try {
        var raw = localStorage.getItem(NS + key);
        if (raw === null) return fallback;
        return JSON.parse(raw);
      } catch (e) {
        return fallback;
      }
    },
    set: function (key, value) {
      try {
        localStorage.setItem(NS + key, JSON.stringify(value));
        return true;
      } catch (e) {
        return false;
      }
    }
  };

  /* ------------------------------ 知识足迹 ------------------------------ */
  var ACHV = [
    { id: "route", name: "路线探索", desc: "探索长征路线全部节点", icon: "map" },
    { id: "figures", name: "英雄档案", desc: "阅读 5 位人物档案", icon: "book" },
    { id: "quiz", name: "知识挑战", desc: "完成一次知识挑战", icon: "star" },
    { id: "message", name: "薪火寄语", desc: "留下一句纪念寄语", icon: "pen" }
  ];

  var state = {
    route: store.get("route", []),
    figures: store.get("figures", []),
    quiz: store.get("quiz", { done: false, best: 0, last: 0 }),
    messages: store.get("messages", [])
  };

  function uniquePush(arr, value) {
    if (arr.indexOf(value) === -1) arr.push(value);
    return arr;
  }

  var LM90 = {
    data: window.LM90_DATA || {},
    store: store,
    reduced: reduced,
    ACHV: ACHV,

    markRoute: function (id) {
      uniquePush(state.route, id);
      store.set("route", state.route);
      document.dispatchEvent(new CustomEvent("lm90:progress"));
    },
    markFigure: function (id) {
      uniquePush(state.figures, id);
      store.set("figures", state.figures);
      document.dispatchEvent(new CustomEvent("lm90:progress"));
    },
    setQuiz: function (score, total) {
      state.quiz.done = true;
      state.quiz.last = score;
      state.quiz.total = total;
      if (score > (state.quiz.best || 0)) state.quiz.best = score;
      store.set("quiz", state.quiz);
      document.dispatchEvent(new CustomEvent("lm90:progress"));
    },
    addMessage: function (msg) {
      state.messages.unshift(msg);
      store.set("messages", state.messages);
      document.dispatchEvent(new CustomEvent("lm90:progress"));
    },
    getMessages: function () { return state.messages; },
    setMessages: function (list) { state.messages = list; store.set("messages", list); },
    removeMessage: function (id) {
      state.messages = state.messages.filter(function (m) { return m.id !== id; });
      store.set("messages", state.messages);
      document.dispatchEvent(new CustomEvent("lm90:progress"));
    },
    quizState: function () { return state.quiz; },
    routeState: function () { return state.route.slice(); },
    figuresState: function () { return state.figures.slice(); },

    achievements: function () {
      var mainIds = (LM90.data.events || []).filter(function (e) { return e.type !== "meet"; }).map(function (e) { return e.id; });
      var routeDone = mainIds.filter(function (id) { return state.route.indexOf(id) !== -1; }).length;
      var figDone = state.figures.length;
      return [
        { id: "route", name: ACHV[0].name, desc: ACHV[0].desc, icon: ACHV[0].icon, earned: routeDone >= mainIds.length, progress: routeDone + "/" + mainIds.length },
        { id: "figures", name: ACHV[1].name, desc: ACHV[1].desc, icon: ACHV[1].icon, earned: figDone >= 5, progress: Math.min(figDone, 5) + "/5" },
        { id: "quiz", name: ACHV[2].name, desc: ACHV[2].desc, icon: ACHV[2].icon, earned: !!state.quiz.done, progress: state.quiz.done ? "已完成" : "未完成" },
        { id: "message", name: ACHV[3].name, desc: ACHV[3].desc, icon: ACHV[3].icon, earned: state.messages.length > 0, progress: state.messages.length > 0 ? "已留下" : "未留下" }
      ];
    },

    /* 纪念章图形（90 周年环形标识） */
    emblem: function (opts) {
      opts = opts || {};
      var cls = opts.className || "lm-emblem";
      var uid = "lmSealArc" + (++emblemSeq);
      return '' +
        '<svg class="' + cls + '" viewBox="0 0 120 120" role="img" aria-label="纪念中国工农红军长征胜利九十周年标识">' +
        '<defs><path id="' + uid + '" d="M60,60 m-44,0 a44,44 0 0,1 88,0"/></defs>' +
        '<circle cx="60" cy="60" r="57" fill="none" stroke="currentColor" stroke-width="0.8" opacity=".45"/>' +
        '<circle cx="60" cy="60" r="51" fill="none" stroke="currentColor" stroke-width="1.8"/>' +
        '<circle cx="60" cy="60" r="47.5" fill="none" stroke="currentColor" stroke-width="0.6" opacity=".55"/>' +
        '<text font-size="7" letter-spacing="1.1" fill="currentColor" font-family="inherit">' +
        '<textPath href="#' + uid + '" startOffset="7%">纪念中国工农红军长征胜利九十周年</textPath></text>' +
        '<text x="60" y="70" text-anchor="middle" font-size="34" font-weight="700" fill="currentColor" font-family="Georgia, serif">90</text>' +
        '<text x="60" y="84" text-anchor="middle" font-size="7.5" letter-spacing="2.2" fill="currentColor" opacity=".9">周年</text>' +
        '<text x="60" y="96" text-anchor="middle" font-size="6.4" letter-spacing="1.6" fill="currentColor" opacity=".75">1936 — 2026</text>' +
        '<g fill="currentColor" opacity=".85">' +
        '<circle cx="35" cy="66" r="1.2"/><circle cx="85" cy="66" r="1.2"/>' +
        '</g>' +
        '</svg>';
    },

    icon: function (name) {
      var p = {
        map: '<path d="M3 6l6-3 6 3 6-3v15l-6 3-6-3-6 3V6z"/><path d="M9 3v15M15 6v15"/>',
        book: '<path d="M4 5a2 2 0 012-2h12v18H6a2 2 0 01-2-2V5z"/><path d="M8 7h6M8 11h6"/>',
        star: '<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/>',
        pen: '<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4z"/>',
        arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
        arrowLeft: '<path d="M19 12H5M11 6l-6 6 6 6"/>',
        up: '<path d="M12 19V5M6 11l6-6 6 6"/>',
        close: '<path d="M6 6l12 12M18 6L6 18"/>',
        external: '<path d="M14 4h6v6M20 4L10 14"/><path d="M20 14v5a1 1 0 01-1 1H5a1 1 0 01-1-1V5a1 1 0 011-1h5"/>',
        check: '<path d="M4 12l5 5L20 6"/>'
      };
      return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (p[name] || "") + "</svg>";
    },

    toast: function (message) {
      var el = document.querySelector(".lm-toast");
      if (!el) {
        el = document.createElement("div");
        el.className = "lm-toast";
        document.body.appendChild(el);
      }
      el.textContent = message;
      el.classList.add("is-show");
      clearTimeout(el._t);
      el._t = setTimeout(function () { el.classList.remove("is-show"); }, 2600);
    }
  };
  window.LM90 = LM90;

  /* ------------------------------ 页头与导航 ------------------------------ */
  function initHeader() {
    var header = document.querySelector(".lm-header");
    if (!header) return;

    var onScroll = function () {
      if (window.scrollY > 30) header.classList.add("is-scrolled");
      else header.classList.remove("is-scrolled");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    var burger = header.querySelector(".lm-burger");
    var nav = header.querySelector(".lm-nav");
    if (!burger || !nav) return;

    var close = function () {
      burger.classList.remove("is-open");
      burger.setAttribute("aria-expanded", "false");
      nav.classList.remove("is-open");
      document.body.classList.remove("is-locked");
    };
    burger.addEventListener("click", function () {
      var open = !nav.classList.contains("is-open");
      burger.classList.toggle("is-open", open);
      burger.setAttribute("aria-expanded", String(open));
      nav.classList.toggle("is-open", open);
      document.body.classList.toggle("is-locked", open);
    });
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) close();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") close();
    });
    window.addEventListener("resize", function () {
      if (window.innerWidth > 1120) close();
    });

    // 当前页面高亮
    var page = document.body.getAttribute("data-page");
    if (page) {
      var link = nav.querySelector('a[data-nav="' + page + '"]');
      if (link) {
        link.classList.add("is-active");
        link.setAttribute("aria-current", "page");
      }
    }
  }

  /* ------------------------------ 纪念章注入 ------------------------------ */
  function initEmblems() {
    document.querySelectorAll("[data-emblem]").forEach(function (el) {
      var cls = el.getAttribute("data-emblem") || "lm-emblem";
      el.innerHTML = LM90.emblem({ className: cls });
    });
  }

  /* ------------------------------ 滚动入场 ------------------------------ */
  function initReveal() {
    var items = document.querySelectorAll("[data-reveal]");
    if (!items.length) return;
    if (reduced || !("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("is-in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -10% 0px", threshold: 0.08 });
    items.forEach(function (el, i) {
      if (!el.style.getPropertyValue("--d")) {
        el.style.setProperty("--d", (i % 6) * 80 + "ms");
      }
      io.observe(el);
    });
  }

  /* ------------------------------ 主视觉视差 ------------------------------ */
  function initParallax() {
    var bg = document.querySelector(".lm-hero__bg");
    if (!bg || reduced) return;
    var ticking = false;
    var update = function () {
      var y = window.scrollY;
      if (y < window.innerHeight * 1.2) {
        bg.style.transform = "translate3d(0," + (y * 0.28) + "px,0)";
      }
      ticking = false;
    };
    window.addEventListener("scroll", function () {
      if (!ticking) { ticking = true; window.requestAnimationFrame(update); }
    }, { passive: true });
  }

  /* ------------------------------ 返回顶部 ------------------------------ */
  function initTop() {
    var btn = document.querySelector(".lm-top");
    if (!btn) return;
    var onScroll = function () {
      btn.classList.toggle("is-show", window.scrollY > 640);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    btn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
    });
  }

  /* ------------------------------ 页脚年份 ------------------------------ */
  function initYear() {
    document.querySelectorAll("[data-year]").forEach(function (el) {
      el.textContent = new Date().getFullYear();
    });
  }

  /* ------------------------------ 折叠面板 ------------------------------ */
  function initAccordion() {
    document.querySelectorAll("[data-acc]").forEach(function (acc) {
      acc.querySelectorAll(".lm-acc__btn").forEach(function (btn) {
        btn.addEventListener("click", function () {
          var item = btn.closest(".lm-acc__item");
          if (!item) return;
          var open = !item.classList.contains("is-open");
          // 同一组内保持单项展开
          acc.querySelectorAll(".lm-acc__item.is-open").forEach(function (other) {
            if (other !== item) {
              other.classList.remove("is-open");
              var b = other.querySelector(".lm-acc__btn");
              if (b) b.setAttribute("aria-expanded", "false");
            }
          });
          item.classList.toggle("is-open", open);
          btn.setAttribute("aria-expanded", String(open));
        });
      });
    });
  }

  /* ------------------------------ 初始化 ------------------------------ */
  function boot() {
    initHeader();
    initEmblems();
    initReveal();
    initParallax();
    initTop();
    initYear();
    initAccordion();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();

/* 2026 第二轮增强：阅读进度与轻量卡片景深（独立增强，不影响原功能） */
(function(){
  var reduced=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var bar=document.querySelector('.lm-reading-progress span');
  if(bar){var progress=function(){var max=document.documentElement.scrollHeight-window.innerHeight;var p=max>0?window.scrollY/max:0;bar.style.transform='scaleX('+Math.max(0,Math.min(1,p))+')'};progress();window.addEventListener('scroll',progress,{passive:true});window.addEventListener('resize',progress,{passive:true})}
  if(!reduced&&window.matchMedia('(pointer:fine)').matches){document.querySelectorAll('[data-tilt]').forEach(function(card){card.addEventListener('pointermove',function(e){var r=card.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;card.style.transform='perspective(900px) rotateX('+(-y*3.5)+'deg) rotateY('+(x*4.5)+'deg) translateY(-3px)'});card.addEventListener('pointerleave',function(){card.style.transform=''})})}
})();
/* Hero cinematic carousel */

/* Contextual deep links: authoritative digital museum + video */
(function(){if(document.body && document.body.dataset.page === 'legacy') return;var museum='museum.html#hall';document.querySelectorAll('.lm-note,.lm-profile__source').forEach(function(el){if(el.querySelector('.lm-deep-link'))return;var a=document.createElement('a');a.className='lm-deep-link';a.href=museum;a.target='_blank';a.rel='noopener';a.textContent='进入数字博物馆 · 深入了解 →';el.appendChild(document.createElement('br'));el.appendChild(a)});})();
/* Timeline: visual story cards with representative imagery and authoritative links */
(function(){var cards=document.querySelectorAll('.lm-tl-item__card');if(!cards.length)return;var imgs=['assets/images/h2.jpg','assets/images/h3.jpg','assets/images/ghlc/zyhy.png','assets/images/h1.jpg'];var video='https://tv.cctv.com/2025/04/17/VIDEk5hmB4WmwaAZPDJ4ERYk250417.shtml';var museum='museum.html#hall';cards.forEach(function(card,i){if(!card.querySelector('img')){var img=document.createElement('img');img.className='lm-tl-media';img.src=imgs[i%imgs.length];img.alt='长征历史节点代表性画面';card.appendChild(img)}var body=card.querySelector('div');if(body&&!body.querySelector('.lm-tl-actions')){var act=document.createElement('div');act.className='lm-tl-actions';act.innerHTML='<a href="'+video+'" target="_blank" rel="noopener">▶ 观看相关影像</a><a href="'+museum+'" target="_blank" rel="noopener">进入数字展馆</a>';body.appendChild(act)}})})();
