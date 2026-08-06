(function () {
  'use strict';

  function activateAll(elements) {
    elements.forEach(function (el) {
      el.classList.add('active');
    });
  }

  function initRevealAnimations() {
    var revealElements = document.querySelectorAll('.reveal, .service-card');

    if (!revealElements.length) {
      return;
    }

    if (!('IntersectionObserver' in window)) {
      activateAll(revealElements);
      return;
    }

    var options = {
      root: null,
      rootMargin: '0px 0px -10% 0px',
      threshold: 0.2
    };

    var observer = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          obs.unobserve(entry.target);
        }
      });

      var stillObserved = false;
      revealElements.forEach(function (el) {
        if (!el.classList.contains('active')) {
          stillObserved = true;
        }
      });

      if (!stillObserved) {
        obs.disconnect();
      }
    }, options);

    revealElements.forEach(function (el) {
      observer.observe(el);
    });
  }

  var EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  var CHECKMARK_SVG = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z"/></svg>';
  var ERROR_SVG = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>';

  function setFieldError(field, message) {
    if (!field) {
      return;
    }
    field.setAttribute('aria-invalid', message ? 'true' : 'false');
    var errorEl = field.parentNode ? field.parentNode.querySelector('.field-error') : null;
    if (message) {
      if (!errorEl) {
        errorEl = document.createElement('span');
        errorEl.className = 'field-error';
        errorEl.setAttribute('role', 'alert');
        errorEl.style.color = '#991b1b';
        errorEl.style.fontSize = '0.875rem';
        errorEl.style.marginTop = '0.25rem';
        errorEl.style.display = 'block';
        field.parentNode.appendChild(errorEl);
      }
      errorEl.textContent = message;
    } else if (errorEl) {
      errorEl.textContent = '';
    }
  }

  function clearErrors(form) {
    var invalidFields = form.querySelectorAll('[aria-invalid="true"]');
    invalidFields.forEach(function (field) {
      setFieldError(field, '');
    });
  }

  function validateForm(form) {
    var errors = [];
    var nameField = form.querySelector('#name');
    var emailField = form.querySelector('#email');
    var messageField = form.querySelector('#message');

    if (nameField && !nameField.value.trim()) {
      setFieldError(nameField, 'Please enter your name.');
      errors.push('name');
    } else if (nameField) {
      setFieldError(nameField, '');
    }

    if (emailField) {
      var emailValue = emailField.value.trim();
      if (!emailValue) {
        setFieldError(emailField, 'Please enter your email address.');
        errors.push('email');
      } else if (!EMAIL_REGEX.test(emailValue)) {
        setFieldError(emailField, 'Please enter a valid email address.');
        errors.push('email');
      } else {
        setFieldError(emailField, '');
      }
    }

    if (messageField && !messageField.value.trim()) {
      setFieldError(messageField, 'Please enter a message.');
      errors.push('message');
    } else if (messageField) {
      setFieldError(messageField, '');
    }

    return errors;
  }

  function setButtonState(button, state) {
    if (!button) {
      return;
    }
    button.classList.remove('loading', 'success', 'error', 'skeleton');
    var textEl = button.querySelector('.btn-text') || button.querySelector('span');
    var originalText = button.getAttribute('data-original-text');
    if (originalText === null && textEl) {
      button.setAttribute('data-original-text', textEl.textContent);
      originalText = textEl.textContent;
    }

    if (state === 'loading') {
      button.classList.add('loading', 'skeleton');
      button.disabled = true;
      button.setAttribute('aria-busy', 'true');
      if (textEl) {
        textEl.textContent = 'Sending...';
      }
    } else if (state === 'success') {
      button.classList.add('success');
      button.disabled = true;
      button.removeAttribute('aria-busy');
      if (textEl) {
        textEl.innerHTML = '<span class="btn-icon">' + CHECKMARK_SVG + '</span>Sent!';
      }
    } else if (state === 'error') {
      button.classList.add('error');
      button.disabled = false;
      button.removeAttribute('aria-busy');
      if (textEl) {
        textEl.innerHTML = '<span class="btn-icon">' + ERROR_SVG + '</span>Failed - Retry';
      }
    } else {
      button.disabled = false;
      button.removeAttribute('aria-busy');
      if (textEl && originalText !== null) {
        textEl.textContent = originalText;
      }
    }
  }

  function showFormMessage(messageEl, type, text) {
    if (!messageEl) {
      return;
    }
    messageEl.classList.remove('success', 'error', 'visible');
    if (!type) {
      messageEl.textContent = '';
      return;
    }
    var icon = type === 'success' ? CHECKMARK_SVG : ERROR_SVG;
    messageEl.classList.add(type, 'visible');
    messageEl.innerHTML = '<span class="message-icon">' + icon + '</span>' + text;
  }

  function setFormDisabled(form, disabled) {
    var fields = form.querySelectorAll('input, textarea, button');
    fields.forEach(function (field) {
      field.disabled = disabled;
    });
  }

  function initContactForm() {
    var form = document.getElementById('contact-form');
    if (!form) {
      return;
    }

    var submitButton = form.querySelector('.submit-btn') || form.querySelector('button[type="submit"]');
    var messageEl = document.getElementById('form-message');

    if (submitButton && !submitButton.querySelector('.btn-text')) {
      var existingSpan = submitButton.querySelector('span');
      if (existingSpan) {
        existingSpan.classList.add('btn-text');
      } else {
        var span = document.createElement('span');
        span.className = 'btn-text';
        span.textContent = submitButton.textContent.trim() || 'Send Message';
        submitButton.textContent = '';
        submitButton.appendChild(span);
      }
    }

    form.addEventListener('submit', function (event) {
      event.preventDefault();

      clearErrors(form);
      showFormMessage(messageEl, null, '');

      var errors = validateForm(form);
      if (errors.length > 0) {
        showFormMessage(messageEl, 'error', 'Please fix the highlighted fields and try again.');
        return;
      }

      setButtonState(submitButton, 'loading');
      setFormDisabled(form, true);

      var endpoint = form.getAttribute('action');
      var formData = new FormData(form);

      fetch(endpoint, {
        method: form.getAttribute('method') || 'POST',
        body: formData,
        headers: {
          Accept: 'application/json'
        }
      })
        .then(function (response) {
          if (response.status >= 200 && response.status < 300) {
            setButtonState(submitButton, 'success');
            showFormMessage(messageEl, 'success', 'Thank you! Your message has been sent successfully.');
            setTimeout(function () {
              form.reset();
              setButtonState(submitButton, 'idle');
              setFormDisabled(form, false);
              showFormMessage(messageEl, null, '');
            }, 3000);
          } else {
            throw new Error('Submission failed with status ' + response.status);
          }
        })
        .catch(function (error) {
          if (window.console && console.error) {
            console.error('Contact form submission error:', error);
          }
          setButtonState(submitButton, 'error');
          setFormDisabled(form, false);
          if (submitButton) {
            submitButton.disabled = false;
          }
          showFormMessage(messageEl, 'error', 'Something went wrong. Please try again or email us directly.');
          setTimeout(function () {
            setButtonState(submitButton, 'idle');
            showFormMessage(messageEl, null, '');
          }, 3000);
        });
    });
  }

  function init() {
    initRevealAnimations();
    initContactForm();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
