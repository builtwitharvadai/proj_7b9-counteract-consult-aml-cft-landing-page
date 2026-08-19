import React from 'react';
import styles from './Hero.module.css';

export interface HeroProps {
  title?: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
}

export function Hero({
  title = 'Compliance is our priority. Trust is our promise.',
  subtitle = 'AML, CFT, fraud detection, and risk assessment programs — engineered to be regulator-ready.',
  ctaLabel = 'Book a consultation',
  ctaHref = '#contact',
}: HeroProps): JSX.Element {
  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className={`${styles.hero} bg-matrix-black text-white`}
    >
      <div className={styles.container}>
        <span
          className={`${styles.eyebrow} bg-brand-blue/15 border-brand-blue text-brand-blue`}
        >
          CounterAct Consult
        </span>
        <h1
          id="hero-heading"
          className={`${styles.title} font-heading text-white`}
        >
          {title}
        </h1>
        <p className={`${styles.subtitle} font-body`}>{subtitle}</p>
        <a
          href={ctaHref}
          className={`${styles.cta} bg-brand-blue hover:bg-brand-blue-dark focus-visible:ring-brand-blue-light border-brand-blue text-white`}
        >
          {ctaLabel}
        </a>
      </div>
    </section>
  );
}

export default Hero;
