/* ============================================
   XTERMINATORAPPS - Site Interactions
   ============================================ */

(function () {
  'use strict';

  // --- Navbar scroll effect ---
  var navbar = document.getElementById('navbar');
  var lastScroll = 0;

  function handleScroll() {
    var scrollY = window.scrollY || window.pageYOffset;
    if (scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    lastScroll = scrollY;
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // --- Mobile nav toggle ---
  var navToggle = document.getElementById('nav-toggle');
  var navLinks = document.getElementById('nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      navLinks.classList.toggle('open');
      var spans = navToggle.querySelectorAll('span');
      if (navLinks.classList.contains('open')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });

    // Close mobile nav on link click
    var mobileLinks = navLinks.querySelectorAll('.nav-link');
    for (var i = 0; i < mobileLinks.length; i++) {
      mobileLinks[i].addEventListener('click', function () {
        navLinks.classList.remove('open');
        var spans = navToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      });
    }
  }

  // --- Smooth scroll for anchor links ---
  var anchors = document.querySelectorAll('a[href^="#"]');
  for (var j = 0; j < anchors.length; j++) {
    anchors[j].addEventListener('click', function (e) {
      var href = this.getAttribute('href');
      if (href === '#') return;
      var target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        var offset = navbar.offsetHeight + 20;
        var top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  }

  // --- Scroll-triggered fade-in animations ---
  function initFadeIn() {
    var elements = document.querySelectorAll(
      '.product-card, .contact-card, .about-value, .section-header, .about-content, .about-visual'
    );

    for (var k = 0; k < elements.length; k++) {
      elements[k].classList.add('fade-in');
    }

    var observer = new IntersectionObserver(
      function (entries) {
        for (var m = 0; m < entries.length; m++) {
          if (entries[m].isIntersecting) {
            entries[m].target.classList.add('visible');
            observer.unobserve(entries[m].target);
          }
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    for (var n = 0; n < elements.length; n++) {
      observer.observe(elements[n]);
    }
  }

  // --- Staggered animation delay for cards ---
  function staggerCards() {
    var cards = document.querySelectorAll('.product-card');
    for (var p = 0; p < cards.length; p++) {
      cards[p].style.transitionDelay = (p * 0.15) + 's';
    }

    var contactCards = document.querySelectorAll('.contact-card');
    for (var q = 0; q < contactCards.length; q++) {
      contactCards[q].style.transitionDelay = (q * 0.1) + 's';
    }

    var values = document.querySelectorAll('.about-value');
    for (var r = 0; r < values.length; r++) {
      values[r].style.transitionDelay = (r * 0.12) + 's';
    }
  }

  // --- Hero parallax on mouse move ---
  var hero = document.getElementById('hero');
  if (hero) {
    hero.addEventListener('mousemove', function (e) {
      var rect = hero.getBoundingClientRect();
      var x = (e.clientX - rect.left) / rect.width - 0.5;
      var y = (e.clientY - rect.top) / rect.height - 0.5;

      var greenGlow = hero.querySelector('.hero-glow--green');
      var purpleGlow = hero.querySelector('.hero-glow--purple');

      if (greenGlow) {
        greenGlow.style.transform = 'translate(' + (x * 40) + 'px, ' + (y * 40) + 'px)';
      }
      if (purpleGlow) {
        purpleGlow.style.transform = 'translate(' + (x * -30) + 'px, ' + (y * -30) + 'px)';
      }
    });
  }

  // --- Init ---
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      initFadeIn();
      staggerCards();
    });
  } else {
    initFadeIn();
    staggerCards();
  }

})();
