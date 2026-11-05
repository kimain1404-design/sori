/* =========================================================
   VOICE PT — [ ] 단어 회전 인터랙션
   흐름: 파형(목소리, 처음 1회) → 인생 → 직업 → 대학 → 인생 … 반복
   - [ ] 사이 폭은 고정, 단어·파형은 가운데 정렬
   - 탭이 안 보일 때 일시정지, 다시 보이면 이어서 재생
   - prefers-reduced-motion 이면 움직임 없이 단어만 교체
   ========================================================= */
(function () {
  'use strict';

  var TIMING = {
    intro: 1400,     // 처음 파형이 보이는 시간
    word: 2200,      // 단어가 머무는 시간
    leave: 600       // 퇴장 애니메이션 정리 시간
  };

  function initSwap(root) {
    var slot = root.querySelector('.vp-swap__track');
    var wave = root.querySelector('.vp-swap__wave');
    var words = (root.getAttribute('data-words') || '')
      .split(',')
      .map(function (w) { return w.trim(); })
      .filter(Boolean);
    if (!slot || !wave || !words.length) return;

    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    // 단어 요소 생성
    var wordEls = words.map(function (text) {
      var el = document.createElement('span');
      el.className = 'vp-swap__item vp-swap__word';
      el.textContent = text;
      slot.appendChild(el);
      return el;
    });

    // 재생 순서: wave(처음 1회) → word0 → word1 → word2 → word0 …
    var sequence = [wave].concat(wordEls);

    var current = wave;
    var step = 0;          // sequence 인덱스 (0 = 처음 파형)
    var timer = null;
    var leaveTimers = [];

    function show(next) {
      if (next === current) return;
      var prev = current;

      prev.classList.remove('is-active');
      prev.classList.add('is-leaving');
      leaveTimers.push(setTimeout(function () {
        prev.classList.remove('is-leaving');
      }, TIMING.leave));

      // 들어올 요소를 아래(초기 위치)에서 시작시키기 위해 한 프레임 쉬고 활성화
      next.classList.remove('is-leaving');
      void next.offsetWidth;
      next.classList.add('is-active');

      current = next;
    }

    function holdTime(el) {
      if (reduceMotion.matches) return el === wave ? 0 : 2200;
      if (el === wave) return TIMING.intro;
      return TIMING.word;
    }

    function tick() {
      // 마지막 단어 다음에는 파형(0)을 건너뛰고 첫 단어(1)로
      step = step + 1 >= sequence.length ? 1 : step + 1;
      var next = sequence[step];
      show(next);
      schedule();
    }

    function schedule() {
      clearTimeout(timer);
      timer = setTimeout(tick, holdTime(current));
    }

    function pause() {
      clearTimeout(timer);
      timer = null;
    }

    // 탭 비활성화 시 일시정지
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) pause();
      else schedule();
    });

    // 폰트 로드 후 폭 측정 → 시작
    var ready = document.fonts && document.fonts.ready
      ? document.fonts.ready
      : Promise.resolve();
    ready.then(function () {
      schedule();
    });
  }

  function init() {
    var swaps = document.querySelectorAll('.vp-swap[data-words]');
    Array.prototype.forEach.call(swaps, initSwap);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
