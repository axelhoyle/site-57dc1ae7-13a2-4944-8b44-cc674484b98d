/* =============================================
   SALONG K — script.js
   ============================================= */

(function () {
  'use strict';

  /* ---- Footer year ---- */
  var fy = document.getElementById('footerYear');
  if (fy) fy.textContent = new Date().getFullYear();

  /* ---- Theme toggle ---- */
  var toggleBtn = document.getElementById('themeToggle');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', function () {
      var current = document.documentElement.getAttribute('data-theme');
      var next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) {}
    });
  }

  /* ---- Reduce motion check ---- */
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- Hero parallax (bg layer) ---- */
  var heroBg = document.getElementById('heroBg');
  var ticking = false;

  function updateParallax() {
    if (!heroBg || reducedMotion) return;
    var sy = window.scrollY;
    heroBg.style.transform = 'translateY(' + (sy * 0.35) + 'px)';
    ticking = false;
  }

  if (!reducedMotion) {
    window.addEventListener('scroll', function () {
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    }, { passive: true });

    /* ---- Mousemove parallax ---- */
    document.addEventListener('mousemove', function (e) {
      if (!heroBg || reducedMotion) return;
      var cx = window.innerWidth / 2;
      var cy = window.innerHeight / 2;
      var dx = (e.clientX - cx) / cx;
      var dy = (e.clientY - cy) / cy;
      var sy = window.scrollY;
      heroBg.style.transform =
        'translateY(' + (sy * 0.35 + dy * 10) + 'px) translateX(' + (dx * 8) + 'px)';
    }, { passive: true });
  }

  /* ---- Reveal on scroll ---- */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { revealObserver.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-revealed'); });
  }

  /* ---- Name write-in (logo image scroll reveal) ---- */
  var colorImg = document.querySelector('.name-write-img .color');
  var namePinEl = document.querySelector('.name-pin');

  function updateNameWrite() {
    if (!colorImg || !namePinEl || reducedMotion) return;
    var sy = window.scrollY;
    var threshold = 480;
    var progress = Math.min(Math.max(sy / threshold, 0), 1);
    var rightPct = Math.round((1 - progress) * 100);
    colorImg.style.clipPath = 'inset(0 ' + rightPct + '% 0 0)';
  }

  if (!reducedMotion) {
    window.addEventListener('scroll', function () {
      requestAnimationFrame(updateNameWrite);
    }, { passive: true });
    updateNameWrite();
  } else {
    if (colorImg) colorImg.style.clipPath = 'inset(0 0% 0 0)';
  }

  /* ---- Header scroll class ---- */
  var siteHeader = document.getElementById('siteHeader');
  if (siteHeader) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 40) {
        siteHeader.classList.add('is-scrolled');
      } else {
        siteHeader.classList.remove('is-scrolled');
      }
    }, { passive: true });
  }

})();
