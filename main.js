/* Third Sourcers — interactions */
(function () {
  'use strict';

  // Theme Toggle
  var themeToggle = document.getElementById('themeToggle');
  var htmlElement = document.documentElement;
  
  // Check for saved theme preference or system preference
  var savedTheme = null;
  try { savedTheme = localStorage.getItem('theme'); } catch (e) {}
  var systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme) {
    htmlElement.setAttribute('data-theme', savedTheme);
  } else if (systemPrefersDark) {
    htmlElement.setAttribute('data-theme', 'dark');
  }
  
  function toggleTheme() {
    var currentTheme = htmlElement.getAttribute('data-theme');
    var newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    htmlElement.setAttribute('data-theme', newTheme);
    try { localStorage.setItem('theme', newTheme); } catch (e) {}
  }
  
  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }

  // Accordions (process steps + FAQ): one open at a time
  document.querySelectorAll('[data-acc]').forEach(function (acc) {
    var items = acc.querySelectorAll('.acc-item');
    items.forEach(function (item) {
      var btn = item.querySelector('button');
      btn.addEventListener('click', function () {
        var wasOpen = item.classList.contains('open');
        items.forEach(function (i) {
          i.classList.remove('open');
          i.querySelector('button').setAttribute('aria-expanded', 'false');
          var pm = i.querySelector('.pm'); if (pm) pm.textContent = '+';
        });
        if (!wasOpen) {
          item.classList.add('open');
          btn.setAttribute('aria-expanded', 'true');
          var pm = item.querySelector('.pm'); if (pm) pm.textContent = '\u2212';
        }
      });
    });
  });

  // Back to top
  var toTop = document.getElementById('toTop');
  if (toTop) {
    toTop.addEventListener('click', function () { window.scrollTo({ top: 0 }); });
    window.addEventListener('scroll', function () {
      toTop.classList.toggle('show', window.scrollY > 900);
    }, { passive: true });
  }

  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Scroll progress bar + gentle parallax on illustrations (one rAF per frame)
  var progress = document.getElementById('scrollProgress');
  var parallax = reduceMotion ? [] : Array.prototype.slice.call(document.querySelectorAll('[data-parallax]'));
  var ticking = false;
  function frame() {
    ticking = false;
    var h = document.documentElement.scrollHeight - window.innerHeight;
    if (progress) progress.style.setProperty('--p', h > 0 ? (window.scrollY / h).toFixed(4) : 0);
    var vh = window.innerHeight;
    parallax.forEach(function (el) {
      var r = el.getBoundingClientRect();
      if (r.bottom < -100 || r.top > vh + 100) return;
      var offset = (r.top + r.height / 2 - vh / 2) * parseFloat(el.getAttribute('data-parallax'));
      el.style.setProperty('--py', offset.toFixed(1) + 'px');
    });
  }
  function requestFrame() {
    if (!ticking) { ticking = true; window.requestAnimationFrame(frame); }
  }
  window.addEventListener('scroll', requestFrame, { passive: true });
  window.addEventListener('resize', requestFrame);
  frame();

  // Count-up for stats
  function countUp(el) {
    var target = parseFloat(el.getAttribute('data-count'));
    var suffix = el.getAttribute('data-suffix') || '';
    if (reduceMotion || !target) return;
    var start = null, dur = 1400;
    function step(t) {
      if (!start) start = t;
      var k = Math.min((t - start) / dur, 1);
      var eased = 1 - Math.pow(1 - k, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (k < 1) window.requestAnimationFrame(step);
    }
    el.textContent = '0' + suffix;
    window.requestAnimationFrame(step);
  }
  var counters = document.querySelectorAll('[data-count]');
  if ('IntersectionObserver' in window && counters.length) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { countUp(e.target); cio.unobserve(e.target); }
      });
    }, { threshold: 0.6 });
    counters.forEach(function (el) { cio.observe(el); });
  }

  // Footer year
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  // Sticky header style on scroll
  var header = document.getElementById('header');
  // Hysteresis so the style can't flip back and forth around one threshold
  function onScroll() {
    var y = window.scrollY;
    if (y > 60) header.classList.add('scrolled');
    else if (y < 20) header.classList.remove('scrolled');
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Mobile menu
  var menu = document.getElementById('mobileMenu');
  var toggle = document.getElementById('menuToggle');
  var close = document.getElementById('mmClose');
  function openMenu() { menu.classList.add('open'); document.body.style.overflow = 'hidden'; }
  function closeMenu() { menu.classList.remove('open'); document.body.style.overflow = ''; }
  if (toggle) toggle.addEventListener('click', openMenu);
  if (close) close.addEventListener('click', closeMenu);
  if (menu) menu.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', closeMenu); });

  // Reveal on scroll
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }
})();
