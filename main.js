/* The Third Sourcers — interactions */
(function () {
  'use strict';

  // Theme Toggle
  var themeToggle = document.getElementById('themeToggle');
  var htmlElement = document.documentElement;
  
  // Check for saved theme preference or system preference
  var savedTheme = localStorage.getItem('theme');
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
    localStorage.setItem('theme', newTheme);
  }
  
  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }

  // Footer year
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  // Sticky header style on scroll
  var header = document.getElementById('header');
  function onScroll() {
    if (window.scrollY > 12) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
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
