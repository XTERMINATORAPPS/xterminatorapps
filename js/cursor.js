/* ============================================
   XTAPPS — Global mouse-cursor effects
   ============================================ */
(function () {
  'use strict';

  // Skip on touch devices
  if (window.matchMedia && window.matchMedia('(pointer: coarse)').matches) return;

  const body = document.body;

  // Respect tweaks toggle
  function isOff() { return body.dataset.cursor === 'off'; }
  const dot = document.querySelector('.cursor-dot');
  let raf = null;
  let mx = window.innerWidth / 2;
  let my = window.innerHeight / 2;

  function update() {
    body.style.setProperty('--mx', mx + 'px');
    body.style.setProperty('--my', my + 'px');
    raf = null;
  }

  document.addEventListener('mousemove', (e) => {
    if (isOff()) { body.classList.remove('cursor-active'); return; }
    mx = e.clientX;
    my = e.clientY;
    if (!body.classList.contains('cursor-active')) {
      body.classList.add('cursor-active');
    }
    if (!raf) raf = requestAnimationFrame(update);
  }, { passive: true });

  document.addEventListener('mouseleave', () => {
    body.classList.remove('cursor-active');
  });

  // Hover state on interactive elements
  if (dot) {
    const interactive = 'a, button, .knob, .blog-card, .rack-unit, .channel, .log-card, [role="button"]';
    document.addEventListener('mouseover', (e) => {
      if (e.target.closest(interactive)) dot.classList.add('hover');
    });
    document.addEventListener('mouseout', (e) => {
      if (e.target.closest(interactive)) dot.classList.remove('hover');
    });
  }
})();
