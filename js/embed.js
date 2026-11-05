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

  var CTA_HREF = '#';                      // 버튼 링크 주소

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

  /* ---------- 마크업 (index.html과 동일, 이미지 경로만 BASE 기준) ---------- */
  function markup() {
    return "<div class=\"vp-hero\">\n  <img class=\"vp-hero__bg vp-hero__bg--pc\" src=\"" + BASE + "img/hero_pc.webp\" alt=\"음률 이주성 대표\" width=\"3200\" height=\"1092\">\n  <img class=\"vp-hero__bg vp-hero__bg--mob\" src=\"" + BASE + "img/hero_mob.webp\" alt=\"음률 이주성 대표\" width=\"2160\" height=\"2160\">\n  <div class=\"vp-hero__content\">\n    <div class=\"vp-hero__title\">\n      <div class=\"vp-hero__line vp-hero__line--1\">보이스로</div>\n      <div class=\"vp-hero__line vp-hero__line--2\">\n        <span class=\"vp-swap\">\n          <span class=\"vp-swap__bracket vp-swap__bracket--l\">[</span>\n          <span class=\"vp-swap__slot\"><span class=\"vp-swap__track\">\n            <span class=\"vp-swap__item vp-swap__wave\"><span class=\"vp-swap__bar\">|</span><span class=\"vp-swap__bar\">|</span><span class=\"vp-swap__bar\">|</span><span class=\"vp-swap__bar\">|</span><span class=\"vp-swap__bar\">|</span><span class=\"vp-swap__bar\">|</span><span class=\"vp-swap__bar\">|</span></span>\n            <span class=\"vp-swap__item vp-swap__word vp-swap__word--1\">인생</span>\n            <span class=\"vp-swap__item vp-swap__word vp-swap__word--2\">직업</span>\n            <span class=\"vp-swap__item vp-swap__word vp-swap__word--3\">대학</span>\n          </span></span>\n          <span class=\"vp-swap__bracket vp-swap__bracket--r\">]</span>\n        </span><span class=\"vp-hero__tail\">이 달라진다</span>\n      </div>\n    </div>\n    <div class=\"vp-hero__desc\">회의부터 발표, 일상 속 대화까지<br>목소리 하나로 달라지는 말하기의 순간을 경험해보세요</div>\n    <a class=\"vp-hero__cta\" href=\"#\">보이스 PT 시작하기 <span class=\"vp-hero__arrow\">↗</span></a>\n  </div>\n</div>".replace('href="#"', 'href="' + CTA_HREF + '" target="_top"');
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
