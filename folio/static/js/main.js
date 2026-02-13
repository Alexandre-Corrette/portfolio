/**
 * Folio Theme — Main JavaScript
 * Navigation, burger menu, smooth scroll
 *
 * SECURITE : pas de eval(), pas de innerHTML avec contenu dynamique
 */

(function () {
  'use strict';

  /* — Navbar scroll behavior */
  var header = document.getElementById('site-header');
  if (header) {
    var onScroll = function () {
      if (window.scrollY > 50) {
        header.classList.add('is-scrolled');
      } else {
        header.classList.remove('is-scrolled');
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* — Burger menu toggle */
  var burger = document.getElementById('burger-toggle');
  var nav = document.getElementById('main-nav');

  if (burger && nav) {
    burger.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('is-open');
      burger.classList.toggle('is-active');
      burger.setAttribute('aria-expanded', String(isOpen));
    });

    // Fermer le menu au clic sur un lien
    nav.querySelectorAll('.header__nav-link').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('is-open');
        burger.classList.remove('is-active');
        burger.setAttribute('aria-expanded', 'false');
      });
    });

    // Fermer le menu au clic en dehors
    document.addEventListener('click', function (e) {
      if (!nav.contains(e.target) && !burger.contains(e.target) && nav.classList.contains('is-open')) {
        nav.classList.remove('is-open');
        burger.classList.remove('is-active');
        burger.setAttribute('aria-expanded', 'false');
      }
    });

    // Fermer avec Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) {
        nav.classList.remove('is-open');
        burger.classList.remove('is-active');
        burger.setAttribute('aria-expanded', 'false');
        burger.focus();
      }
    });
  }

  /* — No-JS flag removal */
  document.documentElement.classList.remove('no-js');

})();
