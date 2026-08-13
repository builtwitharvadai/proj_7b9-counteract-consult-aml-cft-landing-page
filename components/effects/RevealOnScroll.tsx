'use client';

import { useEffect } from 'react';

export function RevealOnScroll(): null {
  useEffect(() => {
    const revealElements = document.querySelectorAll('.reveal, .service-card');
    if (!revealElements.length) return;

    if (!('IntersectionObserver' in window)) {
      revealElements.forEach((el) => el.classList.add('active'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            obs.unobserve(entry.target);
          }
        });
      },
      { root: null, rootMargin: '0px 0px -10% 0px', threshold: 0.2 },
    );

    revealElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return null;
}
