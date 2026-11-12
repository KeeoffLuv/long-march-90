/* VR：手动加载，单击直接请求全屏；离开区域或关闭全屏后卸载媒体。 */
(function () {
  'use strict';
  var URL = 'https://www.kuleiman.com/kuleiman/120363/index.html';
  var players = Array.prototype.slice.call(document.querySelectorAll('[data-vr-player]'));
  if (!players.length) return;

  function isFullscreen(host) {
    return document.fullscreenElement === host || document.webkitFullscreenElement === host;
  }
  function stop(host) {
    if (host.dataset.vrActive !== 'true') return;
    host.dataset.vrActive = 'false';
    var frame = host.querySelector('iframe[data-vr-frame]');
    if (frame) { frame.removeAttribute('src'); frame.remove(); }
    var poster = host.querySelector('.vr-activation');
    var stopButton = host.querySelector('.vr-stop');
    if (poster) poster.hidden = false;
    if (stopButton) stopButton.hidden = true;
  }
  function close(host) {
    stop(host);
    if (isFullscreen(host)) {
      var exit = document.exitFullscreen || document.webkitExitFullscreen;
      if (exit) { try { var p=exit.call(document); if (p && p.catch) p.catch(function () {}); } catch(e) {} }
    }
  }
  var observer = 'IntersectionObserver' in window ? new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.target.dataset.vrLaunching !== 'true' && !isFullscreen(entry.target) && (!entry.isIntersecting || entry.intersectionRatio < 0.12)) {
        stop(entry.target);
      }
    });
  }, {threshold: [0, 0.12, 0.35]}) : null;

  function start(host) {
    if (document.hidden || host.dataset.vrActive === 'true') return;
    host.dataset.vrActive = 'true';
    var frame = document.createElement('iframe');
    frame.dataset.vrFrame = '';
    frame.title = '中央红军长征出发纪念馆VR全景';
    frame.allow = 'fullscreen; accelerometer; gyroscope; autoplay';
    frame.setAttribute('allowfullscreen', '');
    frame.referrerPolicy = 'strict-origin-when-cross-origin';
    frame.src = URL;
    host.insertBefore(frame, host.firstChild);
    var poster = host.querySelector('.vr-activation');
    var stopButton = host.querySelector('.vr-stop');
    if (poster) poster.hidden = true;
    if (stopButton) stopButton.hidden = false;
  }
  function launch(host) {
    host.dataset.vrLaunching = 'true';
    // 全屏请求必须直接发生在用户点击事件内，不能等滚动或iframe加载完成。
    var request = host.requestFullscreen || host.webkitRequestFullscreen;
    if (request) {
      try {
        var promise = request.call(host);
        if (promise && promise.then) {
          promise.then(function () { host.dataset.vrLaunching = 'false'; }, function () {
            host.dataset.vrLaunching = 'false';
            // 受浏览器或本地文件安全限制时仍可进行行内参观。
            host.scrollIntoView({behavior: 'smooth', block: 'center'});
          });
        } else { host.dataset.vrLaunching = 'false'; }
      } catch(e) {
        host.dataset.vrLaunching = 'false';
        host.scrollIntoView({behavior: 'smooth', block: 'center'});
      }
    } else {
      host.dataset.vrLaunching = 'false';
      host.scrollIntoView({behavior: 'smooth', block: 'center'});
    }
    start(host);
  }
  players.forEach(function (host) {
    host.dataset.vrActive = 'false';
    var launchButton = host.querySelector('[data-vr-start]');
    var stopButton = host.querySelector('.vr-stop');
    if (launchButton) launchButton.addEventListener('click', function () { launch(host); });
    if (stopButton) stopButton.addEventListener('click', function () { close(host); });
    if (observer) observer.observe(host);
  });
  document.querySelectorAll('[data-vr-shortcut]').forEach(function (button) {
    button.addEventListener('click', function () {
      var id = button.getAttribute('aria-controls');
      var host = id && document.getElementById(id);
      if (host) launch(host);
    });
  });
  function stopAll() {players.forEach(stop);}
  document.addEventListener('fullscreenchange', function () {
    players.forEach(function (host) {
      if (host.dataset.vrActive === 'true' && !isFullscreen(host)) stop(host);
    });
  });
  document.addEventListener('webkitfullscreenchange', function () {
    players.forEach(function (host) {
      if (host.dataset.vrActive === 'true' && !isFullscreen(host)) stop(host);
    });
  });
  document.addEventListener('visibilitychange', function () { if (document.hidden) stopAll(); });
  window.addEventListener('pagehide', stopAll);
  window.addEventListener('beforeunload', stopAll);
  if (!observer) window.addEventListener('scroll', function () {
    players.forEach(function (host) {
      var r = host.getBoundingClientRect();
      if (!isFullscreen(host) && (r.bottom < 0 || r.top > innerHeight)) stop(host);
    });
  }, {passive:true});
})();
