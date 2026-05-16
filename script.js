(function () {
  'use strict';

  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  const header = document.querySelector('.site-header');
  const onScroll = () => {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 4);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const open = navMenu.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(open));
    });
    navMenu.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', () => {
        navMenu.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      status.className = 'form-status';
      status.textContent = '';

      if (!form.checkValidity()) {
        status.className = 'form-status error';
        status.textContent = 'Please provide your name, a valid email, and a message.';
        return;
      }

      const action = form.getAttribute('action') || '';
      if (action.includes('REPLACE_WITH_YOUR_FORMSPREE_ID')) {
        status.className = 'form-status error';
        status.textContent = 'Contact form is not yet configured. Please email info@luminousgroup.io directly.';
        return;
      }

      const submitBtn = form.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending…';

      try {
        const res = await fetch(action, {
          method: 'POST',
          body: new FormData(form),
          headers: { Accept: 'application/json' }
        });
        if (res.ok) {
          form.reset();
          status.className = 'form-status success';
          status.textContent = 'Thank you. Your message has been sent. We will be in touch shortly.';
        } else {
          const data = await res.json().catch(() => ({}));
          status.className = 'form-status error';
          status.textContent = (data && data.error) || 'Something went wrong. Please email info@luminousgroup.io.';
        }
      } catch {
        status.className = 'form-status error';
        status.textContent = 'Network error. Please email info@luminousgroup.io.';
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = originalBtnText;
      }
    });
  }
})();
