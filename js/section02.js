/* VOICE PT — Section 02 모션
   라이브클래스 iframe 안에서도, 바깥 페이지를 스크롤해 섹션이 보일 때 재생됩니다. */
(function () {
  var L = [6, 22, 52, 82, 28, 56, 30, 44, 76, 104, 64, 48, 92, 104, 26, 54, 0];
  var R = [0, 26, 58, 98, 40, 64, 104, 46, 86, 60, 30, 42, 74, 26, 58, 30, 8];
  function build(el, arr, side) {
    var html = "",
      n = arr.length;
    arr.forEach(function (h, idx) {
      var i = side === "l" ? idx : n + idx;
      if (h === 0) {
        html += '<i class="dash" style="--h:4;--i:' + i + '"></i>';
        return;
      }
      if (h <= 8) {
        html += '<i class="dot" style="--h:6;--i:' + i + '"></i>';
        return;
      }
      var lo = (0.25 + Math.random() * 0.45).toFixed(2),
        t = (0.55 + Math.random() * 0.7).toFixed(2);
      html += '<i style="--h:' + h + ";--i:" + i + ";--lo:" + lo + ";--t:" + t + 's"></i>';
    });
    el.innerHTML = html;
  }
  document.querySelectorAll(".wave").forEach(function (w) {
    build(w, w.dataset.side === "l" ? L : R, w.dataset.side);
  });

  document.querySelectorAll(".divider path").forEach(function (p) {
    p.style.setProperty("--len", p.getTotalLength() + 2);
  });

  var root = document.documentElement;
  var io = new IntersectionObserver(
    function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add("in");
        if (e.target.classList.contains("voice")) {
          setTimeout(function () {
            e.target.classList.add("live");
          }, 1300);
        }
        io.unobserve(e.target);
      });
    },
    { threshold: 0.25, rootMargin: "0px 0px -8% 0px" },
  );

  // 상단(말풍선·카드): 섹션이 화면에 보이기 시작하면 재생
  var heroIo = new IntersectionObserver(
    function (es) {
      if (!es[0].isIntersecting) return;
      root.classList.add("play");
      heroIo.disconnect();
    },
    { threshold: 0.15 },
  );

  function start() {
    document.querySelectorAll("[data-r]").forEach(function (el) {
      io.observe(el);
    });
    heroIo.observe(document.querySelector(".hero"));
  }
  var conn = document.querySelector(".connector"),
    bgEl = document.querySelector(".s2__bg"),
    arc = document.querySelector(".s2__arc");
  function splitLine() {
    var arcTop = bgEl.getBoundingClientRect().top + arc.offsetTop;
    var r = conn.getBoundingClientRect();
    var s = Math.max(0, Math.min(r.height, arcTop - r.top));
    conn.style.setProperty("--split", s + "px");
  }
  splitLine();
  window.addEventListener("resize", splitLine);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(splitLine);
  start();
})();
