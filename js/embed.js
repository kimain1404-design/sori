/* =========================================================
   VOICE PT — Section 01 Hero 임베드용 스크립트
   다른 사이트(빌더, 쇼핑몰 등)에 붙일 때 사용합니다.

   붙여 넣을 코드:
   <div data-voicept-hero></div>
   <script src="https://kimain1404-design.github.io/sori/js/embed.js"></script>

   - 히어로를 Shadow DOM 안에 그려서, 사이트의 h1·p·span·i 등
     기존 스타일이 섞이지 않습니다.
   - 마크업을 스크립트가 만들기 때문에, 편집기가 svg·빈 태그를
     지워도 영향을 받지 않습니다.
   ========================================================= */
(function () {
  'use strict';

  /* ---------- 파일 위치 ---------- */
  var FALLBACK_BASE = 'https://kimain1404-design.github.io/sori/';
  var script = document.currentScript;
  var BASE = (script && script.src && /js\/embed\.js/.test(script.src))
    ? script.src.replace(/js\/embed\.js.*$/, '')
    : FALLBACK_BASE;

  var WORDS = '인생,직업,대학';
  var CTA_HREF = '#';                      // 버튼 링크 주소
  var TIMING = { intro: 1400, word: 2200, leave: 600 };

  /* ---------- 폰트: Shadow DOM 안의 @font-face는 동작하지 않아 문서에 등록 ---------- */
  function injectFonts() {
    if (document.getElementById('vp-hero-fonts')) return;
    var weights = [['3Light', 300], ['4Regular', 400], ['5Medium', 500], ['6SemiBold', 600], ['7Bold', 700]];
    var css = weights.map(function (w) {
      return '@font-face{font-family:"Paperlogy";font-weight:' + w[1] +
        ';font-style:normal;font-display:swap;src:url("' + BASE + 'fonts/Paperlogy-' + w[0] +
        '.woff2") format("woff2");}';
    }).join('');
    var style = document.createElement('style');
    style.id = 'vp-hero-fonts';
    style.textContent = css;
    (document.head || document.documentElement).appendChild(style);
  }

  /* ---------- 마크업 ---------- */
  function markup() {
    return '' +
      '<section class="vp-hero" aria-labelledby="vp-hero-title">' +
        '<picture class="vp-hero__bg">' +
          '<source media="(max-width: 767px)" srcset="' + BASE + 'img/hero_mob.webp">' +
          '<img src="' + BASE + 'img/hero_pc.webp" alt="음률 이주성 대표" width="3200" height="1092">' +
        '</picture>' +
        '<div class="vp-hero__content">' +
          '<h1 class="vp-hero__title" id="vp-hero-title">' +
            '<span class="vp-hero__line vp-hero__line--1">보이스로</span>' +
            '<span class="vp-hero__line vp-hero__line--2">' +
              '<span class="vp-swap" data-words="' + WORDS + '" aria-hidden="true">' +
                '<span class="vp-swap__bracket">[</span>' +
                '<span class="vp-swap__slot"><span class="vp-swap__track">' +
                  '<span class="vp-swap__item vp-swap__wave is-active">' +
                    '<i></i><i></i><i></i><i></i><i></i><i></i><i></i>' +
                  '</span>' +
                '</span></span>' +
                '<span class="vp-swap__bracket">]</span>' +
              '</span><span class="vp-hero__tail">이 달라진다</span>' +
            '</span>' +
            '<span class="vp-sr-only">보이스로 ' + WORDS.split(',').join(', ') + '이 달라진다</span>' +
          '</h1>' +
          '<p class="vp-hero__desc">회의부터 발표, 일상 속 대화까지<br>목소리 하나로 달라지는 말하기의 순간을 경험해보세요</p>' +
          '<a class="vp-hero__cta" href="' + CTA_HREF + '" target="_top">보이스 PT 시작하기 ' +
            '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M8.5 7H17v8.5"/></svg></a>' +
        '</div>' +
      '</section>';
  }

  /* ---------- [ ] 단어 회전 ---------- */
  function initSwap(root) {
    var track = root.querySelector('.vp-swap__track');
    var wave = root.querySelector('.vp-swap__wave');
    var words = (root.getAttribute('data-words') || '').split(',')
      .map(function (w) { return w.trim(); }).filter(Boolean);
    if (!track || !wave || !words.length) return;

    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    var wordEls = words.map(function (text) {
      var el = document.createElement('span');
      el.className = 'vp-swap__item vp-swap__word';
      el.textContent = text;
      track.appendChild(el);
      return el;
    });
    var sequence = [wave].concat(wordEls);
    var current = wave, step = 0, timer = null;

    function show(next) {
      if (next === current) return;
      var prev = current;
      prev.classList.remove('is-active');
      prev.classList.add('is-leaving');
      setTimeout(function () { prev.classList.remove('is-leaving'); }, TIMING.leave);
      next.classList.remove('is-leaving');
      void next.offsetWidth;
      next.classList.add('is-active');
      current = next;
    }
    function holdTime(el) {
      if (reduceMotion.matches) return el === wave ? 0 : 2200;
      return el === wave ? TIMING.intro : TIMING.word;
    }
    function tick() {
      step = step + 1 >= sequence.length ? 1 : step + 1;
      show(sequence[step]);
      schedule();
    }
    function schedule() {
      clearTimeout(timer);
      timer = setTimeout(tick, holdTime(current));
    }
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) clearTimeout(timer); else schedule();
    });
    schedule();
  }

  /* ---------- 히어로 하나 그리기 ---------- */
  function mount(host) {
    if (host.__vpMounted) return;
    host.__vpMounted = true;

    var shadow = host.attachShadow ? host.attachShadow({ mode: 'open' }) : null;
    var root = shadow || host;

    // 사이트 스타일이 상속되지 않도록 초기화
    var reset = document.createElement('style');
    reset.textContent =
      ':host{all:initial;display:block;width:100%;}' +
      '.vp-hero{opacity:0;transition:opacity .3s ease;}' +
      '.vp-hero.is-loaded{opacity:1;}';
    root.appendChild(reset);

    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = BASE + 'css/hero.css';
    root.appendChild(link);

    var wrap = document.createElement('div');
    wrap.innerHTML = markup();
    var hero = wrap.firstChild;
    root.appendChild(hero);

    var started = false;
    function start() {
      if (started) return;
      started = true;
      hero.classList.add('is-loaded');
      var ready = document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve();
      ready.then(function () { initSwap(hero.querySelector('.vp-swap')); });
    }
    link.addEventListener('load', start);
    link.addEventListener('error', start);
    setTimeout(start, 3000);   // 네트워크가 느릴 때 대비
  }

  function init() {
    injectFonts();
    var hosts = document.querySelectorAll('[data-voicept-hero]');
    if (!hosts.length && script && script.parentNode) {
      // 자리 표시 div가 없으면 스크립트 바로 앞에 생성
      var div = document.createElement('div');
      div.setAttribute('data-voicept-hero', '');
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
