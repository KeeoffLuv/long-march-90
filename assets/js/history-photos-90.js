/* 长征历史影像：原始公开来源图片优先，网络不可达则保留本地主题画面。 */
(function(){
  function loadHistoricalPhoto(img){
    var photo=img.getAttribute('data-history-photo');
    if(!photo || img.dataset.photoRequestStarted==='yes')return;
    img.dataset.photoRequestStarted='yes';
    var wrap=img.closest('.thumb, .spirit-v2__photo');
    var tag=wrap && wrap.querySelector('span');
    var original=tag?tag.textContent:'';
    var probe=new Image();
    probe.onload=function(){
      if(probe.naturalWidth<30||probe.naturalHeight<30)return;
      img.src=photo; img.dataset.photoLoaded='online';
      if(tag && wrap.classList.contains('thumb')) tag.textContent=original;
    };
    probe.onerror=function(){
      img.dataset.photoLoaded='fallback';
      if(tag && wrap.classList.contains('thumb'))tag.textContent='本地主题画面 · 点击来源看史料';
      if(wrap)wrap.classList.add('is-photo-fallback');
    };
    probe.src=photo;
  }
  document.querySelectorAll('img[data-history-photo]').forEach(loadHistoricalPhoto);
  var atlas=document.querySelector('[data-atlas-panel]');
  if(atlas && typeof MutationObserver !== 'undefined') {
    new MutationObserver(function(){atlas.querySelectorAll('img[data-history-photo]').forEach(loadHistoricalPhoto)}).observe(atlas,{subtree:true,childList:true});
  }
})();
