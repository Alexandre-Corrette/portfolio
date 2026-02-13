/**
 * Folio Theme — GSAP Animations
 * Implémentation complète en M3 (FOLIO-14)
 *
 * SECURITE : pas de eval(), pas de innerHTML
 */

(function () {
  'use strict';

  // Vérifier prefers-reduced-motion
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    // Rendre tous les éléments visibles sans animation
    document.querySelectorAll('[data-animate]').forEach(function (el) {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
    return;
  }

  // GSAP animations
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // Reveal basique en attendant M3
    gsap.utils.toArray('[data-animate]').forEach(function (el) {
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          once: true
        }
      });
    });
  }

})();
