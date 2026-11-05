/* =========================================================
   VOICE PT — Section 02 (음률 보이스 PT 소개) 임베드용 스크립트

   붙여 넣을 코드:
   <div data-voicept-s2></div>
   <script src="https://kimain1404-design.github.io/sori/js/embed-section02.js"></script>

   - Section 01(embed.js)과 같은 방식으로 Shadow DOM 안에 그려서
     사이트의 기존 스타일이 섞이지 않습니다.
   - 섹션이 화면에 들어올 때 모션이 시작됩니다.
   - 문구를 고칠 때는 아래 MARKUP 안의 글자만 바꾸면 됩니다.
   ========================================================= */
(function () {
  'use strict';

  /* ---------- 파일 위치 ---------- */
  var FALLBACK_BASE = 'https://kimain1404-design.github.io/sori/';
  var script = document.currentScript;
  var BASE = (script && script.src && /js\/embed-section02\.js/.test(script.src))
    ? script.src.replace(/js\/embed-section02\.js.*$/, '')
    : FALLBACK_BASE;

  var FONT_CSS = 'https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css';

  /* ---------- 마크업 ---------- */
  var MARKUP = "<div class=\"vp-s2\">\n<section class=\"s2\" id=\"section02\" aria-labelledby=\"s2-title\">\n  <div class=\"s2__bg\" aria-hidden=\"true\">\n    <img class=\"s2__bg-photo\" src=\"{{BASE}}img/section02/hero-mic.jpg\" alt=\"\" width=\"2017\" height=\"449\" />\n    <div class=\"s2__arc\"></div>\n  </div>\n\n  <div class=\"wrap\">\n    <div class=\"hero\">\n      <p class=\"bubble bubble--1\">\n        <span class=\"bubble__in\">목소리가 작아서 발표나 면접이 두려우신가요?</span>\n      </p>\n      <p class=\"bubble bubble--2\">\n        <span class=\"bubble__in\">웅얼거리는 발음 때문에 자꾸 되물어보나요?</span>\n      </p>\n      <p class=\"bubble bubble--3\">\n        <span class=\"bubble__in\">학원 갈 시간이 없어서 목소리 교정을 미루고 계신가요?</span>\n      </p>\n\n      <div class=\"card\">\n        <img class=\"card__photo\" src=\"{{BASE}}img/section02/hero-mic.jpg\" alt=\"\" width=\"2017\" height=\"449\" />\n        <div class=\"card__shade\"></div>\n        <h2 class=\"hero__title\" id=\"s2-title\">\n          <span class=\"line\"><span>하고 싶은 말은 있는데</span></span>\n          <span class=\"line\"><span>생각만큼 전해지지 않나요?</span></span>\n        </h2>\n      </div>\n    </div>\n\n    <div class=\"connector\" aria-hidden=\"true\">\n      <span class=\"connector__bar\"></span><span class=\"connector__dot\"></span>\n    </div>\n\n    <div class=\"lead\" data-r>\n      <p class=\"lead__q rv\">내 목소리가 답답했던 순간들</p>\n      <p class=\"lead__a rv\" style=\"--d: 0.15s\">\n        <span class=\"chunk\">이제는</span\n        ><span class=\"hl\"\n          ><span class=\"hl__bg\"></span><span class=\"hl__txt\">음률 보이스 PT</span></span\n        ><span class=\"chunk\">로</span> <br class=\"mo\" /><span class=\"chunk\"\n          >달라질 차례입니다.</span\n        >\n      </p>\n    </div>\n\n    <div class=\"voice\" data-r aria-hidden=\"true\">\n      <div class=\"voice__glow\"></div>\n      <div class=\"voice__row\">\n        <div class=\"wave\" data-side=\"l\"></div>\n        <div class=\"mic\">\n          <picture\n            ><source srcset=\"{{BASE}}img/section02/mic.webp\" type=\"image/webp\" />\n            <img src=\"{{BASE}}img/section02/mic.png\" alt=\"\" width=\"820\" height=\"1007\"\n          /></picture>\n        </div>\n        <div class=\"wave\" data-side=\"r\"></div>\n      </div>\n    </div>\n\n    <div class=\"divider\" data-r aria-hidden=\"true\">\n      <svg viewBox=\"0 0 1325 36\" preserveAspectRatio=\"none\">\n        <path d=\"M618 1 L0 1\" />\n        <path d=\"M707 1 L1325 1\" />\n        <path d=\"M618 1 L662.5 35 L707 1\" />\n      </svg>\n    </div>\n\n    <div class=\"learn\" data-r>\n      <h3 class=\"learn__title rv\">\n        <span class=\"learn__brand\">음률 보이스 PT</span>\n        <span class=\"learn__rest\"\n          >[<span class=\"talk\" aria-hidden=\"true\"\n            ><svg viewBox=\"0 0 86 58\">\n              <g fill=\"#5b92f6\">\n                <ellipse cx=\"22\" cy=\"34\" rx=\"18\" ry=\"16\" />\n                <ellipse cx=\"38\" cy=\"22\" rx=\"20\" ry=\"18\" />\n                <ellipse cx=\"58\" cy=\"21\" rx=\"20\" ry=\"17\" />\n                <ellipse cx=\"70\" cy=\"33\" rx=\"14\" ry=\"14\" />\n                <ellipse cx=\"46\" cy=\"40\" rx=\"26\" ry=\"14\" />\n                <path d=\"M58 44 L80 57 L70 38 Z\" />\n              </g>\n              <circle class=\"d\" cx=\"34\" cy=\"32\" r=\"3.2\" fill=\"#fff\" />\n              <circle class=\"d\" cx=\"45\" cy=\"32\" r=\"3.2\" fill=\"#fff\" />\n              <circle class=\"d\" cx=\"56\" cy=\"32\" r=\"3.2\" fill=\"#fff\" /></svg></span\n          >]이런 걸 배울거예요</span\n        >\n      </h3>\n      <p class=\"learn__sub rv\" style=\"--d: 0.15s\">\n        말하는 요령을 넘어 <br class=\"mo\" />목소리를 쓰는 기본부터 대화 스킬까지\n      </p>\n    </div>\n\n    <div class=\"cards\" data-r>\n      <div class=\"tile\" tabindex=\"0\" style=\"--k: 0\" role=\"img\" aria-label=\"발성 VOICE\">\n        <img\n          class=\"tile__img\"\n          src=\"{{BASE}}img/section02/card-voice.jpg\"\n          alt=\"\"\n          loading=\"lazy\"\n          width=\"639\"\n          height=\"1010\"\n        /><span class=\"tile__veil\"></span>\n      </div>\n      <div class=\"tile\" tabindex=\"0\" style=\"--k: 1\" role=\"img\" aria-label=\"몸짓 GESTURE\">\n        <img\n          class=\"tile__img\"\n          src=\"{{BASE}}img/section02/card-gesture.jpg\"\n          alt=\"\"\n          loading=\"lazy\"\n          width=\"639\"\n          height=\"1010\"\n        /><span class=\"tile__veil\"></span>\n      </div>\n      <div class=\"tile\" tabindex=\"0\" style=\"--k: 2\" role=\"img\" aria-label=\"전문적인 TECHNICAL\">\n        <img\n          class=\"tile__img\"\n          src=\"{{BASE}}img/section02/card-technical.jpg\"\n          alt=\"\"\n          loading=\"lazy\"\n          width=\"639\"\n          height=\"1010\"\n        /><span class=\"tile__veil\"></span>\n      </div>\n    </div>\n  </div>\n</section>\n</div>";

  /* ---------- 음파 막대 높이 (시안 px) ---------- */
  var WAVE_L = [6, 22, 52, 82, 28, 56, 30, 44, 76, 104, 64, 48, 92, 104, 26, 54, 0];
  var WAVE_R = [0, 26, 58, 98, 40, 64, 104, 46, 86, 60, 30, 42, 74, 26, 58, 30, 8];

  /* ---------- 폰트: Shadow DOM 안의 @font-face는 동작하지 않아 문서에 등록 ---------- */
  function injectFont() {
    if (document.getElementById('vp-s2-font')) return;
    var link = document.createElement('link');
    link.id = 'vp-s2-font';
    link.rel = 'stylesheet';
    link.href = FONT_CSS;
    (document.head || document.documentElement).appendChild(link);
  }

  function buildWave(el, arr, side) {
    var html = '', n = arr.length;
    arr.forEach(function (h, idx) {
      var i = side === 'l' ? idx : n + idx;
      if (h === 0) { html += '<i class="dash" style="--h:4;--i:' + i + '"></i>'; return; }
      if (h <= 8) { html += '<i class="dot" style="--h:6;--i:' + i + '"></i>'; return; }
      var lo = (0.25 + Math.random() * 0.45).toFixed(2);
      var t = (0.55 + Math.random() * 0.7).toFixed(2);
      html += '<i style="--h:' + h + ';--i:' + i + ';--lo:' + lo + ';--t:' + t + 's"></i>';
    });
    el.innerHTML = html;
  }

  /* ---------- 모션 연결 ---------- */
  function initMotion(wrap) {
    wrap.querySelectorAll('.wave').forEach(function (w) {
      buildWave(w, w.getAttribute('data-side') === 'l' ? WAVE_L : WAVE_R, w.getAttribute('data-side'));
    });
    wrap.querySelectorAll('.divider path').forEach(function (p) {
      p.style.setProperty('--len', p.getTotalLength() + 2);
    });

    // 연결선: 아치 위는 흰색, 아래는 검정
    var conn = wrap.querySelector('.connector');
    var bgEl = wrap.querySelector('.s2__bg');
    var arc = wrap.querySelector('.s2__arc');
    function splitLine() {
      var arcTop = bgEl.getBoundingClientRect().top + arc.offsetTop;
      var r = conn.getBoundingClientRect();
      var s = Math.max(0, Math.min(r.height, arcTop - r.top));
      conn.style.setProperty('--split', s + 'px');
    }
    splitLine();
    if (window.ResizeObserver) new ResizeObserver(splitLine).observe(wrap);
    else window.addEventListener('resize', splitLine);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(splitLine);

    if (!('IntersectionObserver' in window)) {
      wrap.classList.add('is-play');
      wrap.querySelectorAll('[data-r]').forEach(function (el) { el.classList.add('in', 'live'); });
      return;
    }

    // 상단(말풍선·카드): 섹션이 보이기 시작하면 바로 재생
    var heroIo = new IntersectionObserver(function (es) {
      if (es[0].isIntersecting) {
        wrap.classList.add('is-play');
        heroIo.disconnect();
      }
    }, { threshold: 0.15 });
    heroIo.observe(wrap.querySelector('.hero'));

    // 나머지: 각 블록이 화면에 들어올 때
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add('in');
        if (e.target.classList.contains('voice')) {
          setTimeout(function () { e.target.classList.add('live'); }, 1300);
        }
        io.unobserve(e.target);
      });
    }, { threshold: 0.25, rootMargin: '0px 0px -8% 0px' });
    wrap.querySelectorAll('[data-r]').forEach(function (el) { io.observe(el); });
  }

  /* ---------- 섹션 하나 그리기 ---------- */
  function mount(host) {
    if (host.__vpS2Mounted) return;
    host.__vpS2Mounted = true;

    var shadow = host.attachShadow ? host.attachShadow({ mode: 'open' }) : null;
    var root = shadow || host;

    var pre = document.createElement('style');
    pre.textContent = ':host{all:initial;display:block;width:100%;}' +
      '.vp-s2{opacity:0;transition:opacity .3s ease;}.vp-s2.is-loaded{opacity:1;}';
    root.appendChild(pre);

    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = BASE + 'css/section02.css';
    root.appendChild(link);

    var holder = document.createElement('div');
    holder.innerHTML = MARKUP.split('{{BASE}}').join(BASE);
    var wrap = holder.firstElementChild;
    wrap.classList.add('is-js');
    root.appendChild(wrap);

    var started = false;
    function start() {
      if (started) return;
      started = true;
      wrap.classList.add('is-loaded');
      requestAnimationFrame(function () { initMotion(wrap); });
    }
    link.addEventListener('load', start);
    link.addEventListener('error', start);
    setTimeout(start, 3000); // 네트워크가 느릴 때 대비
  }

  function init() {
    injectFont();
    var hosts = document.querySelectorAll('[data-voicept-s2]');
    if (!hosts.length && script && script.parentNode) {
      var div = document.createElement('div');
      div.setAttribute('data-voicept-s2', '');
      script.parentNode.insertBefore(div, script);
      hosts = [div];
    }
    Array.prototype.forEach.call(hosts, mount);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
