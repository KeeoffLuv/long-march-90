/* 人物档案 → 长征大事记：精确锚点定位与醒目高亮 */
(function () {
  'use strict';
  var params = new URLSearchParams(window.location.search);
  var figure = params.get('figure');
  var anchor = decodeURIComponent((window.location.hash || '').slice(1));
  if (!figure || !anchor) return;
  var item = document.getElementById(anchor);
  if (!item || !item.classList.contains('lm-tl-item')) return;
  var card = item.querySelector('.lm-tl-item__card');
  if (!card) return;

  var content = card.firstElementChild;
  var badge = document.createElement('span');
  badge.className = 'lm-figure-target-caption';
  badge.textContent = '已定位 · ' + figure + ' 相关长征节点';
  badge.setAttribute('role', 'status');
  if (content) content.insertBefore(badge, content.firstChild);
  var id = params.get('fid');
  if (id && /^[A-Za-z0-9_-]+$/.test(id) && content) {
    var back = document.createElement('a');
    back.className = 'lm-figure-return';
    back.href = 'activity%20copy.html#fig-' + encodeURIComponent(id);
    back.textContent = '← 返回 ' + figure + ' 的人物档案 · 继续阅读下一位';
    back.setAttribute('aria-label', '返回人物档案并继续阅读下一位人物');
    if (badge.nextSibling) content.insertBefore(back, badge.nextSibling);
    else content.appendChild(back);
  }

  item.classList.add('is-figure-target', 'is-in');

  function alignItem() {
    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    item.scrollIntoView({behavior: reduceMotion ? 'auto' : 'smooth', block: 'center'});
  }
  // 图片与地图渲染完成后再次定位，避免锚点被布局变化推走。
  if (document.readyState === 'complete') {
    requestAnimationFrame(function () { requestAnimationFrame(alignItem); });
  } else {
    window.addEventListener('load', function () {
      requestAnimationFrame(function () { requestAnimationFrame(alignItem); });
    }, {once: true});
  }
})();
