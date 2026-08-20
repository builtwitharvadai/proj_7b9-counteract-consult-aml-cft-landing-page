'use client';

import type { CSSProperties } from 'react';

export interface EnhancedHeroProps {
  headline?: string;
  subheadline?: string;
  primaryCtaLabel?: string;
  primaryCtaHref?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
  className?: string;
}

const DEFAULT_HEADLINE = 'Compliance is our priority. Trust is our promise.';
const DEFAULT_SUBHEADLINE =
  'World-class AML/CFT expertise for financial institutions — combining deep regulatory knowledge, cutting-edge technology, and unwavering integrity to fortify your defenses against financial crime.';

const STAGGER_KEYFRAMES = `
@keyframes counteract-hero-fade-in {
  0% {
    opacity: 0;
    transform: translate3d(0, 16px, 0);
  }
  100% {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .counteract-hero-stagger {
    animation: none !important;
    opacity: 1 !important;
    transform: none !important;
  }
}
`;

const cx = (
  ...classes: Array<string | false | null | undefined>
): string => classes.filter(Boolean).join(' ');

interface StaggerItemProps {
  delay: number;
  className?: string;
  children: React.ReactNode;
}

function StaggerItem({
  delay,
  className,
  children,
}: StaggerItemProps): JSX.Element {
  const style: CSSProperties = {
    opacity: 0,
    animationName: 'counteract-hero-fade-in',
    animationDuration: '0.7s',
    animationDelay: `${delay}s`,
    animationTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
    animationFillMode: 'forwards',
    willChange: 'transform, opacity',
  };
  return (
    <div className={cx('counteract-hero-stagger', className)} style={style}>
      {children}
    </div>
  );
}

export function EnhancedHero({
  headline = DEFAULT_HEADLINE,
  subheadline = DEFAULT_SUBHEADLINE,
  primaryCtaLabel = 'Get Started',
  primaryCtaHref = '#contact',
  secondaryCtaLabel = 'Learn More',
  secondaryCtaHref = '#about',
  className,
}: EnhancedHeroProps): JSX.Element {
  const sectionClasses = cx(
    'relative isolate z-10 flex w-full items-center overflow-hidden',
    'min-h-[60vh] sm:min-h-[75vh] lg:min-h-screen',
    className,
  );

  return (
    <section aria-labelledby="hero-heading" className={sectionClasses}>
      <style>{STAGGER_KEYFRAMES}</style>

      <div className="relative z-30 mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
        <div className="max-w-3xl">
          <StaggerItem delay={0.05}>
            <div className="mb-6 inline-flex items-center gap-2 pixel-border border-brand-blue bg-brand-blue/15 px-3 py-1 font-heading text-xs uppercase tracking-widest text-brand-light">
              <span aria-hidden="true">▮</span>
              <span>CounterAct Consult</span>
            </div>
          </StaggerItem>

          <StaggerItem delay={0.2}>
            <h1
              id="hero-heading"
              className="font-heading text-3xl leading-tight text-white sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl"
            >
              {headline}
            </h1>
          </StaggerItem>

          <StaggerItem delay={0.4} className="mt-6">
            <p className="max-w-2xl font-body text-sm leading-relaxed text-gray-200 sm:text-base md:text-lg">
              {subheadline}
            </p>
          </StaggerItem>

          <StaggerItem delay={0.6} className="mt-8">
            <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
              <a
                href={primaryCtaHref}
                className="pixel-border inline-flex items-center justify-center border-brand-blue bg-brand-blue px-6 py-3 font-heading text-sm font-semibold uppercase tracking-widest text-white transition-transform duration-150 ease-out hover:-translate-y-0.5 hover:bg-brand-blue/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-light"
              >
                {primaryCtaLabel}
              </a>
              <a
                href={secondaryCtaHref}
                className="pixel-border inline-flex items-center justify-center border-brand-light bg-transparent px-6 py-3 font-heading text-sm font-semibold uppercase tracking-widest text-brand-light transition-transform duration-150 ease-out hover:-translate-y-0.5 hover:border-brand-blue hover:bg-brand-blue/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
              >
                {secondaryCtaLabel}
              </a>
            </div>
          </StaggerItem>
        </div>
      </div>
    </section>
  );
}

export default EnhancedHero;
