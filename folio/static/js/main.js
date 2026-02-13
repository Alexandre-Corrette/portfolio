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

  /* — Portfolio tag filter */
  var filterBtns = document.querySelectorAll('.portfolio__filter');
  var portfolioItems = document.querySelectorAll('.portfolio__item');

  if (filterBtns.length && portfolioItems.length) {
    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var filter = btn.getAttribute('data-filter');

        // Active state
        filterBtns.forEach(function (b) { b.classList.remove('is-active'); });
        btn.classList.add('is-active');

        // Filter items
        portfolioItems.forEach(function (item) {
          var tags = item.getAttribute('data-tags') || '';
          if (filter === 'all' || tags.split(',').indexOf(filter) !== -1) {
            item.classList.remove('is-hidden');
            item.style.position = '';
          } else {
            item.classList.add('is-hidden');
          }
        });
      });
    });
  }

  /* — Contact form multi-mode */
  var contactForm = document.getElementById('contact-form');

  if (contactForm) {
    var submitBtn = document.getElementById('contact-submit');
    var feedback = document.getElementById('contact-feedback');
    var formMethod = contactForm.getAttribute('data-form-method');
    var formAction = contactForm.getAttribute('data-form-action') || contactForm.getAttribute('action');
    var rateLimitMs = 5000;
    var isSubmitting = false;

    // Charger les messages i18n depuis le JSON embed
    var i18nMessages = { success: 'Message sent!', error: 'An error occurred.' };
    var i18nEl = document.getElementById('contact-i18n');
    if (i18nEl) {
      try {
        i18nMessages = JSON.parse(i18nEl.textContent);
      } catch (e) {
        // Garde les defaults
      }
    }

    // Validation email basique
    function isValidEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    // Afficher le feedback (textContent, pas innerHTML)
    function showFeedback(type, message) {
      feedback.textContent = message;
      feedback.className = 'contact__feedback contact__feedback--' + type;
    }

    // État loading
    function setLoading(loading) {
      isSubmitting = loading;
      contactForm.classList.toggle('is-loading', loading);
      submitBtn.disabled = loading;
    }

    contactForm.addEventListener('submit', function (e) {
      if (isSubmitting) {
        e.preventDefault();
        return;
      }

      // Vérifier honeypot
      var honeypotInputs = contactForm.querySelectorAll('.contact__honeypot input');
      for (var i = 0; i < honeypotInputs.length; i++) {
        if (honeypotInputs[i].value) {
          e.preventDefault();
          // Rejet silencieux (simule succès pour le bot)
          showFeedback('success', i18nMessages.success);
          return;
        }
      }

      // Validation JS
      var nameVal = (contactForm.querySelector('[name="name"]').value || '').trim();
      var emailVal = (contactForm.querySelector('[name="email"]').value || '').trim();
      var messageVal = (contactForm.querySelector('[name="message"]').value || '').trim();

      if (!nameVal || !emailVal || !messageVal) {
        e.preventDefault();
        showFeedback('error', i18nMessages.error);
        return;
      }

      if (!isValidEmail(emailVal)) {
        e.preventDefault();
        showFeedback('error', i18nMessages.error);
        return;
      }

      // Mode Netlify et Formspree : soumission HTML native
      if (formMethod === 'netlify' || formMethod === 'formspree') {
        setLoading(true);
        // Laisser la soumission native se faire
        return;
      }

      // Mode API : fetch POST JSON
      e.preventDefault();
      setLoading(true);
      feedback.textContent = '';
      feedback.className = 'contact__feedback';

      var data = {};
      var formData = new FormData(contactForm);
      formData.forEach(function (value, key) {
        // Exclure le honeypot des données envoyées
        var honeypotName = contactForm.querySelector('.contact__honeypot input');
        if (honeypotName && key === honeypotName.name) return;
        data[key] = typeof value === 'string' ? value.trim() : value;
      });

      fetch(formAction, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      .then(function (response) {
        if (!response.ok) throw new Error('Server error');
        return response.json();
      })
      .then(function () {
        showFeedback('success', i18nMessages.success);
        contactForm.reset();
      })
      .catch(function () {
        showFeedback('error', i18nMessages.error);
      })
      .finally(function () {
        // Rate limit UI : désactiver 5s après soumission
        setTimeout(function () {
          setLoading(false);
        }, rateLimitMs);
      });
    });
  }

  /* — No-JS flag removal */
  document.documentElement.classList.remove('no-js');

})();
