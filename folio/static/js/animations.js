/**
 * Folio Theme — GSAP Animations
 * Hero stagger, scroll reveals, counter animation, cards stagger
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

  // Attendre GSAP
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    // Fallback : rendre visible
    document.querySelectorAll('[data-animate]').forEach(function (el) {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  /* ============================================
     HERO — Stagger reveal
     ============================================ */
  var heroSection = document.querySelector('.hero');
  if (heroSection) {
    var heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    var heroBadge = heroSection.querySelector('.hero__badge');
    var heroTitle = heroSection.querySelector('.hero__title');
    var heroSubtitle = heroSection.querySelector('.hero__subtitle');
    var heroCta = heroSection.querySelector('.hero__cta');
    var heroScroll = heroSection.querySelector('.hero__scroll');

    // Empêcher le flash initial
    if (heroBadge) gsap.set(heroBadge, { opacity: 0, y: 20 });
    if (heroTitle) gsap.set(heroTitle, { opacity: 0, y: 30 });
    if (heroSubtitle) gsap.set(heroSubtitle, { opacity: 0, y: 20 });
    if (heroCta) gsap.set(heroCta, { opacity: 0, y: 20 });
    if (heroScroll) gsap.set(heroScroll, { opacity: 0 });

    heroTl.to(heroBadge || {}, { opacity: 1, y: 0, duration: 0.6 }, 0.2);
    heroTl.to(heroTitle || {}, { opacity: 1, y: 0, duration: 0.8 }, 0.4);
    heroTl.to(heroSubtitle || {}, { opacity: 1, y: 0, duration: 0.6 }, 0.8);
    heroTl.to(heroCta || {}, { opacity: 1, y: 0, duration: 0.6 }, 1.0);
    heroTl.to(heroScroll || {}, { opacity: 1, duration: 0.8 }, 1.4);
  }

  /* ============================================
     SCROLL REVEALS — Generic [data-animate]
     (exclut les éléments hero déjà animés)
     ============================================ */
  gsap.utils.toArray('[data-animate]').forEach(function (el) {
    // Ignorer les éléments du hero (déjà animés par la timeline)
    if (heroSection && heroSection.contains(el)) return;

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

  /* ============================================
     CARDS — Stagger entrée services + portfolio
     ============================================ */
  var cardGroups = ['.services__grid', '.portfolio__grid', '.team__grid'];

  cardGroups.forEach(function (selector) {
    var container = document.querySelector(selector);
    if (!container) return;

    var items = container.children;
    if (!items.length) return;

    gsap.fromTo(items,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: container,
          start: 'top 85%',
          once: true
        }
      }
    );
  });

  /* ============================================
     COUNTERS — Animation de 0 → valeur
     ============================================ */
  var counters = document.querySelectorAll('[data-count]');

  counters.forEach(function (counter) {
    var target = parseInt(counter.getAttribute('data-count'), 10);
    var valueEl = counter.querySelector('.counter__value');
    if (!valueEl || isNaN(target)) return;

    var obj = { val: 0 };

    gsap.to(obj, {
      val: target,
      duration: 2,
      ease: 'power1.out',
      scrollTrigger: {
        trigger: counter,
        start: 'top 85%',
        once: true
      },
      onUpdate: function () {
        valueEl.textContent = Math.round(obj.val);
      }
    });
  });

  /* ============================================
     TESTIMONIALS — Fade reveal
     ============================================ */
  var testimonialTrack = document.querySelector('.testimonials__track');
  if (testimonialTrack) {
    var testimonials = testimonialTrack.querySelectorAll('.testimonial');

    gsap.fromTo(testimonials,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: testimonialTrack,
          start: 'top 85%',
          once: true
        }
      }
    );
  }

  /* ============================================
     CLIENTS — Stagger logos
     ============================================ */
  var clientsGrid = document.querySelector('.clients__grid');
  if (clientsGrid) {
    var clientItems = clientsGrid.querySelectorAll('.clients__item');

    gsap.fromTo(clientItems,
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        stagger: 0.1,
        ease: 'back.out(1.4)',
        scrollTrigger: {
          trigger: clientsGrid,
          start: 'top 85%',
          once: true
        }
      }
    );
  }

  /* ============================================
     CTA BANNER — Reveal
     ============================================ */
  var ctaInner = document.querySelector('.cta-banner__inner');
  if (ctaInner) {
    gsap.fromTo(ctaInner,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: ctaInner,
          start: 'top 85%',
          once: true
        }
      }
    );
  }

})();
