/* ==========================================================================
   souvenir.js —— 薪火寄语墙 & 纪念卡（Canvas 生成、下载）
   ========================================================================== */
(function () {
  "use strict";

  function esc(str) {
    return String(str == null ? "" : str).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  function drawSpaced(ctx, text, x, y, spacing) {
    var chars = String(text).split("");
    var widths = chars.map(function (c) { return ctx.measureText(c).width; });
    var total = widths.reduce(function (a, b) { return a + b; }, 0) + spacing * (chars.length - 1);
    var cursor = x - total / 2;
    ctx.textAlign = "left";
    chars.forEach(function (c, i) {
      ctx.fillText(c, cursor, y);
      cursor += widths[i] + spacing;
    });
    ctx.textAlign = "center";
  }

  function wrapText(ctx, text, maxWidth) {
    var chars = String(text).split("");
    var lines = [];
    var line = "";
    chars.forEach(function (c) {
      var test = line + c;
      if (ctx.measureText(test).width > maxWidth && line) {
        lines.push(line);
        line = c;
      } else {
        line = test;
      }
    });
    if (line) lines.push(line);
    return lines;
  }

  function drawSouvenir(canvas, opts) {
    if (!canvas) return;
    opts = opts || {};
    var W = 1080, H = 1440;
    canvas.width = W;
    canvas.height = H;
    var ctx = canvas.getContext("2d");
    if (!ctx) return;

    // 背景
    var bg = ctx.createLinearGradient(0, 0, W, H);
    bg.addColorStop(0, "#7C1419");
    bg.addColorStop(0.55, "#5E1014");
    bg.addColorStop(1, "#3E0A0D");
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    var glow = ctx.createRadialGradient(W / 2, 180, 40, W / 2, 180, 720);
    glow.addColorStop(0, "rgba(232,201,138,.24)");
    glow.addColorStop(1, "rgba(232,201,138,0)");
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, W, H);

    // 细纹理
    ctx.save();
    ctx.globalAlpha = 0.05;
    ctx.strokeStyle = "#F7E5BD";
    for (var i = -H; i < W; i += 26) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i + H, H);
      ctx.stroke();
    }
    ctx.restore();

    // 金色边框
    ctx.strokeStyle = "rgba(213,173,96,.85)";
    ctx.lineWidth = 3;
    ctx.strokeRect(34, 34, W - 68, H - 68);
    ctx.strokeStyle = "rgba(213,173,96,.35)";
    ctx.lineWidth = 1;
    ctx.strokeRect(48, 48, W - 96, H - 96);

    // 四角装饰
    var corners = [[34, 34, 1, 1], [W - 34, 34, -1, 1], [34, H - 34, 1, -1], [W - 34, H - 34, -1, -1]];
    ctx.strokeStyle = "#E8C98A";
    ctx.lineWidth = 2;
    corners.forEach(function (c) {
      ctx.beginPath();
      ctx.moveTo(c[0], c[1] + 46 * c[3]);
      ctx.lineTo(c[0], c[1]);
      ctx.lineTo(c[0] + 46 * c[2], c[1]);
      ctx.stroke();
    });

    // 顶部年份
    ctx.fillStyle = "#E8C98A";
    ctx.font = '600 26px "Songti SC", "SimSun", serif';
    drawSpaced(ctx, "1936  —  2026", W / 2, 116, 10);

    // 纪念章
    var cx = W / 2, cy = 288, r = 104;
    ctx.strokeStyle = "rgba(232,201,138,.95)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.stroke();
    ctx.strokeStyle = "rgba(232,201,138,.4)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(cx, cy, r - 12, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fillStyle = "#F7E5BD";
    ctx.font = '700 92px Georgia, "Times New Roman", serif';
    ctx.textAlign = "center";
    ctx.fillText("90", cx, cy + 26);
    ctx.fillStyle = "#E8C98A";
    ctx.font = '400 20px "Songti SC", "SimSun", serif';
    ctx.fillText("周  年", cx, cy + 62);
    // 五角星
    ctx.save();
    ctx.translate(cx, cy - 64);
    ctx.fillStyle = "#E8C98A";
    ctx.beginPath();
    for (var s = 0; s < 5; s++) {
      var ang = -Math.PI / 2 + s * Math.PI * 2 / 5;
      var ang2 = ang + Math.PI / 5;
      ctx.lineTo(Math.cos(ang) * 11, Math.sin(ang) * 11);
      ctx.lineTo(Math.cos(ang2) * 4.5, Math.sin(ang2) * 4.5);
    }
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    // 标题
    ctx.fillStyle = "#FAEBCB";
    ctx.font = '700 58px "Songti SC", "STSong", "SimSun", serif';
    drawSpaced(ctx, "征途不息 · 薪火相传", W / 2, 500, 4);
    ctx.fillStyle = "rgba(240,222,188,.85)";
    ctx.font = '400 25px "Songti SC", "SimSun", serif';
    ctx.fillText("纪念中国工农红军长征胜利九十周年", W / 2, 552);

    // 金色分隔
    ctx.strokeStyle = "rgba(213,173,96,.55)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(180, 594);
    ctx.lineTo(490, 594);
    ctx.moveTo(590, 594);
    ctx.lineTo(900, 594);
    ctx.stroke();
    ctx.fillStyle = "#E8C98A";
    ctx.beginPath();
    ctx.arc(W / 2, 594, 4, 0, Math.PI * 2);
    ctx.fill();

    // 授予信息
    ctx.fillStyle = "rgba(232,201,138,.8)";
    ctx.font = '400 20px "PingFang SC", "Microsoft YaHei", sans-serif';
    drawSpaced(ctx, "授  予", W / 2, 660, 6);

    ctx.fillStyle = "#FFF3D8";
    ctx.font = '700 52px "Songti SC", "STSong", serif';
    ctx.fillText(opts.level || opts.name || "长征精神传承者", W / 2, 730);

    if (opts.score) {
      ctx.fillStyle = "#E8C98A";
      ctx.font = '400 26px "PingFang SC", "Microsoft YaHei", sans-serif';
      ctx.fillText("知识挑战成绩　" + opts.score, W / 2, 780);
    }

    // 寄语正文
    var message = opts.message || "把青春写在祖国大地上，把信仰走在脚下的路上。";
    ctx.fillStyle = "rgba(247,229,189,.94)";
    ctx.font = '400 30px "Songti SC", "STSong", "SimSun", serif';
    var lines = wrapText(ctx, "“" + message + "”", 800).slice(0, 5);
    var startY = opts.score ? 850 : 830;
    lines.forEach(function (line, i) {
      ctx.fillText(line, W / 2, startY + i * 50);
    });

    // 署名与日期
    if (opts.author) {
      ctx.fillStyle = "#E8C98A";
      ctx.font = '400 24px "PingFang SC", "Microsoft YaHei", sans-serif';
      ctx.fillText("—— " + opts.author, W / 2, 1120);
    }
    var d = opts.date instanceof Date ? opts.date : new Date();
    var dateStr = d.getFullYear() + " 年 " + (d.getMonth() + 1) + " 月 " + d.getDate() + " 日";
    ctx.fillStyle = "rgba(240,222,188,.7)";
    ctx.font = '400 21px "Songti SC", "SimSun", serif';
    ctx.fillText(dateStr, W / 2, 1190);

    // 底部
    ctx.fillStyle = "rgba(232,201,138,.65)";
    ctx.font = '400 18px "PingFang SC", "Microsoft YaHei", sans-serif';
    drawSpaced(ctx, "重走长征路 · 奋进新征程", W / 2, 1290, 4);

    // 印章
    ctx.save();
    ctx.translate(W - 128, H - 140);
    ctx.rotate(-6 * Math.PI / 180);
    ctx.strokeStyle = "rgba(247,229,189,.75)";
    ctx.lineWidth = 2;
    ctx.strokeRect(-44, -44, 88, 88);
    ctx.fillStyle = "rgba(247,229,189,.9)";
    ctx.font = '700 30px "Songti SC", "STSong", serif';
    ctx.textAlign = "center";
    ctx.fillText("长", 0, -6);
    ctx.fillText("征", 0, 30);
    ctx.restore();
    ctx.textAlign = "center";
  }

  function downloadCanvas(canvas, filename) {
    if (!canvas) return;
    try {
      var url = canvas.toDataURL("image/png");
      var a = document.createElement("a");
      a.href = url;
      a.download = filename || "纪念卡.png";
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (e) {
      if (window.LM90) LM90.toast("当前浏览器不支持直接下载，请右键保存图片");
    }
  }

  if (window.LM90) {
    LM90.drawSouvenir = drawSouvenir;
    LM90.downloadCanvas = downloadCanvas;
  }

  /* ==========================================================================
     寄语墙
     ========================================================================== */
  var wallRoot = document.querySelector("[data-wall]");

  /* 知识足迹（在所有包含 data-achv 的页面生效） */
  function renderAchievements() {
    document.querySelectorAll("[data-achv]").forEach(function (host) {
      if (!window.LM90) return;
      host.innerHTML = LM90.achievements().map(function (a) {
        return '<div class="lm-achv__item' + (a.earned ? " is-earned" : "") + '">' +
          '<div class="lm-achv__icon">' + LM90.icon(a.icon) + "</div>" +
          "<b>" + esc(a.name) + "</b><span>" + (a.earned ? "已获得" : a.progress) + "</span></div>";
      }).join("");
    });
  }

  // 仅在四项足迹全部获得时显示祝贺，否则继续提供学习引导。
  function renderCompletionMessage() {
    var pending = document.querySelector("[data-achv-pending]");
    var completed = document.querySelector("[data-achv-completed]");
    if (!pending || !completed || !window.LM90) return;
    var achievements = LM90.achievements();
    var allDone = achievements.length === 4 && achievements.every(function (a) { return a.earned; });
    pending.hidden = allDone;
    completed.hidden = !allDone;
  }

  function renderProgress() {
    renderAchievements();
    renderCompletionMessage();
  }
  renderProgress();
  document.addEventListener("lm90:progress", renderProgress);
  // 切回页面时重新读取状态，以兼容用户在其他标签页完成任务。
  window.addEventListener("pageshow", renderProgress);

  if (!wallRoot) return;

  var listEl = wallRoot.querySelector("[data-wall-list]");
  var form = wallRoot.querySelector("[data-wall-form]");
  var canvas = wallRoot.querySelector("[data-souvenir-canvas]");
  var counter = wallRoot.querySelector("[data-wall-count]");
  var emptyEl = wallRoot.querySelector("[data-wall-empty]");
  var samplesEl = wallRoot.querySelector("[data-wall-samples]");

  var SAMPLES = [
    { id: "sample-1", name: "一名青年学生", identity: "示例寄语", text: "把长征精神写进今天的课堂，也写进明天的路上。", time: "示例", sample: true },
    { id: "sample-2", name: "一位参观者", identity: "示例寄语", text: "走过地图上的每一个节点，才懂得“万水千山”四个字有多重。", time: "示例", sample: true },
    { id: "sample-3", name: "一名党员", identity: "示例寄语", text: "信仰不是一句口号，而是一次次在困难面前的选择。", time: "示例", sample: true }
  ];

  if (samplesEl) {
    samplesEl.innerHTML = SAMPLES.map(function (m) {
      return '<article class="lm-msg lm-msg--sample">' +
        '<p class="lm-msg__text">' + esc(m.text) + '</p>' +
        '<div class="lm-msg__foot"><span class="lm-msg__who"><span class="lm-msg__seal">示例</span>' +
        esc(m.name) + '</span></div></article>';
    }).join('');
  }

  function timeText(ts) {
    var d = new Date(ts);
    var pad = function (n) { return n < 10 ? "0" + n : n; };
    return d.getFullYear() + "." + pad(d.getMonth() + 1) + "." + pad(d.getDate()) + " " + pad(d.getHours()) + ":" + pad(d.getMinutes());
  }

  function renderWall() {
    var messages = window.LM90 ? LM90.getMessages() : [];
    listEl.innerHTML = messages.map(function (m) {
      var seal = m.sample ? "示例" : "薪火";
      return '<article class="lm-msg">' +
        '<p class="lm-msg__text">' + esc(m.text) + "</p>" +
        '<div class="lm-msg__foot">' +
        '<span class="lm-msg__who"><span class="lm-msg__seal">' + seal + "</span>" +
        esc(m.name || "匿名") + '<span class="muted">' + esc(m.identity || "") + "</span></span>" +
        "<span>" + esc(m.time) + "</span>" +
        (m.sample ? "" : '<button class="lm-msg__del" type="button" data-del="' + esc(m.id) + '" aria-label="删除这条寄语">删除</button>') +
        "</div></article>";
    }).join("");
    if (emptyEl) emptyEl.hidden = messages.length > 0;
    var latest = messages[0];
    if (canvas && window.LM90 && LM90.drawSouvenir) {
      LM90.drawSouvenir(canvas, {
        level: "薪火寄语",
        message: latest ? latest.text : "把青春写在祖国大地上，把信仰走在脚下的路上。",
        author: latest ? latest.name : "征途不息 · 薪火相传",
        date: new Date()
      });
    }
  }

  function updateCount() {
    if (!counter || !form) return;
    var ta = form.querySelector("textarea");
    counter.textContent = ta.value.length + " / 60";
  }

  if (form) {
    var ta = form.querySelector("textarea");
    if (ta) {
      ta.addEventListener("input", updateCount);
      updateCount();
    }
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = form.querySelector('[name="name"]').value.trim();
      var identity = form.querySelector('[name="identity"]').value.trim();
      var text = ta.value.trim();
      if (!name) {
        LM90.toast("请留下您的称呼");
        form.querySelector('[name="name"]').focus();
        return;
      }
      if (text.length < 4) {
        LM90.toast("寄语至少写 4 个字");
        ta.focus();
        return;
      }
      if (text.length > 60) {
        LM90.toast("寄语请控制在 60 字以内");
        ta.focus();
        return;
      }
      LM90.addMessage({
        id: "m-" + Date.now(),
        name: name.slice(0, 12),
        identity: identity.slice(0, 16),
        text: text.slice(0, 60),
        time: timeText(Date.now())
      });
      renderWall();
      LM90.toast("寄语已收进薪火墙，感谢您的参与");
      form.reset();
      updateCount();
    });
  }

  listEl.addEventListener("click", function (e) {
    var btn = e.target.closest("[data-del]");
    if (!btn) return;
    if (!window.confirm("确定删除这条寄语吗？")) return;
    LM90.removeMessage(btn.getAttribute("data-del"));
    renderWall();
  });

  var dl = wallRoot.querySelector("[data-souvenir-download]");
  if (dl) {
    dl.addEventListener("click", function () {
      if (canvas) LM90.downloadCanvas(canvas, "薪火寄语纪念卡.png");
    });
  }

  renderWall();
})();
