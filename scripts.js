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

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initRevealAnimations);
  } else {
    initRevealAnimations();
  }
})();
