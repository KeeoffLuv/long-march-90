/* ==========================================================================
   map-90.js —— 长征路线交互地图
   数据：window.LM90_DATA.events + window.LM_CHINA_GEO（省级边界简化数据）
   说明：坐标为真实经纬度的示意性投影，路线按中央红军主要节点连接；
        会师地单独标识，不与中央红军路线连成一线，避免混淆不同方面军的行军轨迹。
   ========================================================================== */
(function () {
  "use strict";

  var DATA = (window.LM90_DATA || {}).events || [];
  var GEO = window.LM_CHINA_GEO || null;

  var VIEW = { w: 1000, h: 760, pad: 46 };
  var BOUNDS = { lonMin: 97.4, lonMax: 119.2, latMin: 24.0, latMax: 41.4 };

  var KEY_PROVINCES = ["江西省", "湖南省", "广西壮族自治区", "贵州省", "云南省", "四川省", "甘肃省", "陕西省", "宁夏回族自治区"];
  var PROVINCE_LABELS = [
    { n: "陕西", lon: 109.2, lat: 35.6 },
    { n: "宁夏", lon: 106.2, lat: 37.3 },
    { n: "甘肃", lon: 100.6, lat: 37.6 },
    { n: "四川", lon: 102.4, lat: 31.4 },
    { n: "云南", lon: 101.4, lat: 25.1 },
    { n: "贵州", lon: 106.4, lat: 26.7 },
    { n: "湖南", lon: 111.9, lat: 27.4 },
    { n: "江西", lon: 115.9, lat: 27.7 },
    { n: "广西", lon: 108.7, lat: 24.6 }
  ];

  var proj = (function () {
    var k = Math.cos(31 * Math.PI / 180);
    var bw = (BOUNDS.lonMax - BOUNDS.lonMin) * k;
    var bh = BOUNDS.latMax - BOUNDS.latMin;
    var s = Math.min((VIEW.w - VIEW.pad * 2) / bw, (VIEW.h - VIEW.pad * 2) / bh);
    var ox = (VIEW.w - bw * s) / 2;
    var oy = (VIEW.h - bh * s) / 2;
    return {
      s: s,
      x: function (lon) { return ox + (lon - BOUNDS.lonMin) * k * s; },
      y: function (lat) { return oy + (BOUNDS.latMax - lat) * s; }
    };
  })();

  function esc(str) {
    return String(str == null ? "" : str).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  /* ------------------------------ 省级边界路径 ------------------------------ */
  function provincePaths() {
    if (!GEO || !GEO.features) return "";
    var out = [];
    GEO.features.forEach(function (f) {
      var name = f.n;
      var isKey = KEY_PROVINCES.indexOf(name) !== -1;
      var d = "";
      (f.p || []).forEach(function (poly) {
        (poly || []).forEach(function (ring) {
          var started = false;
          for (var i = 0; i < ring.length; i++) {
            var lon = ring[i][0], lat = ring[i][1];
            if (lon < BOUNDS.lonMin - 1 || lon > BOUNDS.lonMax + 1 || lat < BOUNDS.latMin - 1 || lat > BOUNDS.latMax + 1) {
              started = false;
              continue;
            }
            var x = proj.x(lon).toFixed(1), y = proj.y(lat).toFixed(1);
            d += (started ? "L" : "M") + x + " " + y;
            started = true;
          }
          if (d) d += "Z";
        });
      });
      if (d) {
        out.push('<path class="province' + (isKey ? " is-key" : "") + '" d="' + d + '" data-province="' + esc(name) + '"/>');
      }
    });
    return out.join("");
  }

  /* ------------------------------ 经纬网格 ------------------------------ */
  function graticule() {
    var d = "";
    [100, 105, 110, 115].forEach(function (lon) {
      var x = proj.x(lon);
      d += "M" + x + " " + proj.y(BOUNDS.latMax) + "V" + proj.y(BOUNDS.latMin);
    });
    [25, 30, 35, 40].forEach(function (lat) {
      var y = proj.y(lat);
      d += "M" + proj.x(BOUNDS.lonMin) + " " + y + "H" + proj.x(BOUNDS.lonMax);
    });
    return '<path class="graticule" d="' + d + '"/>';
  }

  /* ------------------------------ 主路线 ------------------------------ */
  function mainEvents() {
    return DATA.filter(function (e) { return e.type !== "meet"; });
  }

  function routePoints() {
    return mainEvents().map(function (e) {
      return { x: proj.x(e.lon), y: proj.y(e.lat) };
    });
  }

  function routePath(points) {
    if (!points.length) return "";
    var d = "M" + points[0].x.toFixed(1) + " " + points[0].y.toFixed(1);
    for (var i = 1; i < points.length; i++) {
      d += "L" + points[i].x.toFixed(1) + " " + points[i].y.toFixed(1);
    }
    return d;
  }

  function cumulative(points) {
    var arr = [0];
    for (var i = 1; i < points.length; i++) {
      var dx = points[i].x - points[i - 1].x;
      var dy = points[i].y - points[i - 1].y;
      arr.push(arr[i - 1] + Math.sqrt(dx * dx + dy * dy));
    }
    return arr;
  }

  var SHORT = {
    yudu: "于都", xiangjiang: "湘江", tongdao: "通道", liping: "黎平", houchang: "猴场",
    zunyi: "遵义", chishui: "四渡赤水", jinshajiang: "金沙江", anshunchang: "安顺场",
    luding: "泸定桥", jiajinshan: "夹金山", maogong: "懋功", caodi: "草地",
    ejie: "俄界", lazikou: "腊子口", hadapu: "哈达铺", wuqi: "吴起",
    huining: "会宁", jiangtaibao: "将台堡", shanchengbao: "山城堡"
  };

  function labelFor(e) {
    var anchor = e.lalign || "start";
    var dx = e.ldx == null ? 14 : e.ldx;
    var dy = e.ldy == null ? 4 : e.ldy;
    return '<text class="label" x="' + dx + '" y="' + dy +
      '" text-anchor="' + anchor + '">' + esc(SHORT[e.id] || e.title) + "</text>";
  }

  function nodeMarkup(e, index, activeId, mode) {
    var x = proj.x(e.lon), y = proj.y(e.lat);
    var isActive = e.id === activeId;
    var isMeet = e.type === "meet";
    var cls = "node" + (isActive ? " is-active" : "") + (e.major ? "" : " is-minor") + (isMeet ? " meet-node" : "");
    var label = labelFor(e);
    var pos = ' transform="translate(' + x.toFixed(1) + "," + y.toFixed(1) + ')"';
    var inner =
      '<circle class="pulse" r="9"/>' +
      '<circle class="ring" r="7.5"/>' +
      '<circle class="dot" r="' + (isMeet ? 5.4 : 4.4) + '"/>' +
      '<circle class="hit" r="16"/>' +
      label;
    if (mode === "mini") {
      var href = "about.html?stop=" + encodeURIComponent(e.id) + "#atlas";
      return '<a class="' + cls + '" href="' + href + '"' + pos + ' aria-label="' + esc(e.date + " " + e.title + "，" + e.place) + '">' + inner + "</a>";
    }
    return '<g class="' + cls + '" data-id="' + esc(e.id) + '"' + pos + ' tabindex="0" role="button" aria-label="' +
      esc(e.date + " " + e.title + "，" + e.place) + '">' + inner + "</g>";
  }

  function meetNote() {
    var hn = DATA.filter(function (e) { return e.id === "huining"; })[0];
    if (!hn) return "";
    var x = proj.x(hn.lon) - 6;
    var y = proj.y(hn.lat) - 26;
    return '<text class="meet-label" x="' + x.toFixed(1) + '" y="' + y.toFixed(1) +
      '" text-anchor="end">1936.10 三大主力会师</text>';
  }

  function legend() {
    return '' +
      '<g transform="translate(30,32)">' +
      '<rect x="0" y="0" width="176" height="74" fill="rgba(18,14,11,.72)" stroke="rgba(213,173,96,.28)"/>' +
      '<line x1="12" y1="20" x2="42" y2="20" stroke="#C43A3C" stroke-width="3" stroke-linecap="round"/>' +
      '<text class="legend-text" x="50" y="24">中央红军长征路线</text>' +
      '<circle cx="20" cy="42" r="5" fill="#E8C98A" stroke="#7C1419" stroke-width="1.6"/>' +
      '<text class="legend-text" x="50" y="46">三大主力会师地</text>' +
      '<line x1="12" y1="62" x2="42" y2="62" stroke="rgba(213,173,96,.5)" stroke-width="1.6" stroke-dasharray="3 6"/>' +
      '<text class="legend-text" x="50" y="66">路线示意（非精确测绘）</text>' +
      "</g>";
  }

  function compass() {
    var x = VIEW.w - 46, y = 52;
    return '<g transform="translate(' + x + "," + y + ')" opacity=".7">' +
      '<path d="M0 -18 L7 12 L0 6 L-7 12 Z" fill="#E8C98A"/>' +
      '<text x="0" y="30" text-anchor="middle" class="compass">N</text>' +
      "</g>";
  }

  /* ------------------------------ 渲染 ------------------------------ */
  function renderMap(host, opts) {
    opts = opts || {};
    var mode = opts.mode || "mini";
    var activeId = opts.activeId || "";
    var points = routePoints();
    var cum = cumulative(points);
    var total = cum[cum.length - 1] || 1;

    var nodes = DATA.map(function (e, i) { return nodeMarkup(e, i, activeId, mode); }).join("");
    var svg =
      '<svg viewBox="0 0 ' + VIEW.w + " " + VIEW.h + '" role="img" aria-label="中央红军长征路线示意图">' +
      graticule() +
      provincePaths() +
      PROVINCE_LABELS.map(function (p) {
        return '<text class="province-label" x="' + proj.x(p.lon).toFixed(1) + '" y="' + proj.y(p.lat).toFixed(1) + '">' + p.n + "</text>";
      }).join("") +
      '<path class="route-ghost" d="' + routePath(points) + '"/>' +
      '<path class="route-under" d="' + routePath(points) + '"/>' +
      '<path class="route-base" d="' + routePath(points) + '"/>' +
      '<path class="route-line" d="' + routePath(points) + '" data-route-line style="stroke-dasharray:' + total.toFixed(1) + ";stroke-dashoffset:" + (mode === "mini" ? 0 : total.toFixed(1)) + '"/>' +
      nodes +
      meetNote() +
      legend() +
      compass() +
      "</svg>";

    host.classList.add("lm-map");
    host.innerHTML = svg;
    host._total = total;
    host._cum = cum;
    return host;
  }

  /* ------------------------------ 完整交互地图（about.html） ------------------------------ */
  function initAtlas() {
    var root = document.querySelector("[data-lm-atlas]");
    if (!root) return;
    var mapHost = root.querySelector("[data-lm-map]");
    var panel = root.querySelector("[data-atlas-panel]");
    var chips = document.querySelector("[data-lm-nodes]");
    var bar = root.querySelector("[data-atlas-progress]");
    var counter = root.querySelector("[data-atlas-count]");
    var prevBtn = root.querySelector("[data-atlas-prev]");
    var nextBtn = root.querySelector("[data-atlas-next]");
    if (!mapHost || !panel) return;

    var current = 0;
    var params = new URLSearchParams(location.search);
    var stopId = params.get("stop");
    if (stopId) {
      var found = DATA.findIndex(function (e) { return e.id === stopId; });
      if (found >= 0) current = found;
    }

    renderMap(mapHost, { mode: "full", activeId: DATA[current] && DATA[current].id });

    function pad(n) { return n < 10 ? "0" + n : String(n); }

    function panelMarkup(e) {
      var fig = e.image
        ? '<figure class="lm-atlas__figure"><img src="' + e.image + '" alt="' + esc(e.imageNote || e.title) + '"' +
          (e.photoUrl ? ' data-history-photo="' + esc(e.photoUrl) + '" data-fallback-src="' + e.image + '"' : '') + '>' +
          '<figcaption>' + esc(e.imageNote || "") +
          (e.photoSource ? ' · <a class="lm-atlas__photo-source" href="' + esc(e.photoSource) + '" target="_blank" rel="noopener noreferrer">图片来源 ↗</a>' : '') +
          "</figcaption></figure>"
        : '<div class="lm-atlas__plate"><b>' + esc(e.year) + "</b><div><span>历史档案</span><strong>第 " +
          esc(e.no) + " 站 · " + esc(e.place) + "</strong></div></div>";
      return '' +
        '<div class="lm-atlas__date">' + esc(e.date) + "</div>" +
        '<div class="lm-atlas__place">' + esc(e.place) + " · 第 " + (e.no || "") + " 站</div>" +
        '<h3 class="lm-atlas__title">' + esc(e.title) + "</h3>" +
        '<p class="lm-atlas__text">' + esc(e.summary) + "</p>" +
        '<div class="lm-atlas__sig"><b>历史意义</b><br>' + esc(e.sig) + "</div>" +
        fig +
        '<div class="lm-atlas__foot">' +
        '<span class="lm-atlas__count">' + (current + 1) + " / " + DATA.length + "</span>" +
        '<div class="lm-atlas__nav">' +
        '<button class="lm-icon-btn" type="button" data-atlas-prev-inner aria-label="上一站">' + LM90.icon("arrowLeft") + "</button>" +
        '<button class="lm-icon-btn" type="button" data-atlas-next-inner aria-label="下一站">' + LM90.icon("arrow") + "</button>" +
        "</div></div>";
    }

    function updatePanel() {
      var e = DATA[current];
      panel.innerHTML = panelMarkup(e);
      var innerPrev = panel.querySelector("[data-atlas-prev-inner]");
      var innerNext = panel.querySelector("[data-atlas-next-inner]");
      if (innerPrev) innerPrev.addEventListener("click", function () { go(current - 1); });
      if (innerNext) innerNext.addEventListener("click", function () { go(current + 1); });
      if (counter) counter.textContent = pad(current + 1) + " / " + DATA.length;
      if (chips) {
        Array.prototype.forEach.call(chips.children, function (btn, i) {
          btn.classList.toggle("is-active", i === current);
          btn.setAttribute("aria-pressed", String(i === current));
        });
        var activeBtn = chips.children[current];
        if (activeBtn && chips.scrollWidth > chips.clientWidth) {
          var left = activeBtn.offsetLeft - chips.clientWidth / 2 + activeBtn.offsetWidth / 2;
          chips.scrollTo({ left: Math.max(0, left), behavior: LM90.reduced ? "auto" : "smooth" });
        }
      }
      if (bar) {
        var mainIdx = -1;
        var main = DATA.filter(function (x) { return x.type !== "meet"; });
        main.forEach(function (ev, i) { if (ev.id === e.id) mainIdx = i; });
        var total = mapHost._cum ? mapHost._cum[mapHost._cum.length - 1] : 1;
        var frac = mainIdx >= 0 && mapHost._cum ? mapHost._cum[mainIdx] / total : 1;
        bar.style.width = (frac * 100).toFixed(2) + "%";
        var line = mapHost.querySelector("[data-route-line]");
        if (line) line.style.strokeDashoffset = (total - total * frac).toFixed(1);
      }
      LM90.markRoute(e.id);
      if (e.id === "huining" || e.id === "jiangtaibao" || e.id === "shanchengbao") {
        // 会师节点不改变中央红军路线进度，保持完整显示
        if (bar) bar.style.width = "100%";
        var line2 = mapHost.querySelector("[data-route-line]");
        if (line2) line2.style.strokeDashoffset = "0";
      }
    }

    function setActiveNode() {
      Array.prototype.forEach.call(mapHost.querySelectorAll(".node"), function (g) {
        g.classList.toggle("is-active", g.getAttribute("data-id") === DATA[current].id);
      });
    }

    function go(index) {
      current = (index + DATA.length) % DATA.length;
      setActiveNode();
      updatePanel();
    }

    mapHost.addEventListener("click", function (e) {
      var node = e.target.closest(".node");
      if (!node) return;
      var id = node.getAttribute("data-id");
      var idx = DATA.findIndex(function (x) { return x.id === id; });
      if (idx >= 0) go(idx);
    });
    mapHost.addEventListener("keydown", function (e) {
      var node = e.target.closest(".node");
      if (!node) return;
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        node.click();
      }
    });

    if (prevBtn) prevBtn.addEventListener("click", function () { go(current - 1); });
    if (nextBtn) nextBtn.addEventListener("click", function () { go(current + 1); });

    if (chips) {
      chips.innerHTML = DATA.map(function (e, i) {
        return '<button type="button" data-idx="' + i + '" aria-pressed="false"><i>' + (e.no || pad(i + 1)) +
          "</i>" + esc(e.title) + "</button>";
      }).join("");
      chips.addEventListener("click", function (e) {
        var btn = e.target.closest("button[data-idx]");
        if (!btn) return;
        go(Number(btn.getAttribute("data-idx")));
      });
    }

    if (!stopId || DATA.findIndex(function (e) { return e.id === stopId; }) < 0) {
      // 首次进入直接显示第一站，便于评委快速理解交互
      go(current);
    } else {
      go(current);
      var atlas = document.getElementById("atlas");
      if (atlas && location.hash === "#atlas") {
        setTimeout(function () { atlas.scrollIntoView({ behavior: "auto", block: "start" }); }, 60);
      }
    }
  }

  /* ------------------------------ 首页缩略地图 ------------------------------ */
  function initMini() {
    document.querySelectorAll("[data-lm-mini]").forEach(function (host) {
      renderMap(host, { mode: "mini" });
      var line = host.querySelector("[data-route-line]");
      if (line && !LM90.reduced) {
        var total = Number(host._total || 1);
        line.style.strokeDasharray = total;
        line.style.strokeDashoffset = total;
        requestAnimationFrame(function () {
          setTimeout(function () { line.style.strokeDashoffset = "0"; }, 260);
        });
      }
    });
  }

  function boot() {
    initMini();
    initAtlas();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
