'use client';

import { useEffect, useRef, useState } from 'react';

import { CORE_VALUES, MISSION_STATEMENT } from '../../data/team-members';
import { ParallaxBackground } from './ParallaxBackground';
import { TeamGrid } from './TeamGrid';

export interface AboutSectionProps {
  className?: string;
  id?: string;
}

interface FadeInProps {
  children: React.ReactNode;
  delayMs?: number;
  className?: string;
}

function FadeIn({ children, delayMs = 0, className }: FadeInProps): JSX.Element {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (
      typeof window === 'undefined' ||
      typeof IntersectionObserver === 'undefined'
    ) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -10% 0px' },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition: 'opacity 700ms ease-out, transform 700ms ease-out',
        transitionDelay: `${delayMs}ms`,
      }}
    >
      {children}
    </div>
  );
}

function ValuePixelIcon(): JSX.Element {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className="h-8 w-8 flex-shrink-0"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="2" y="2" width="4" height="4" fill="#00ff41" />
      <rect x="10" y="2" width="4" height="4" fill="#00ff41" opacity="0.7" />
      <rect x="6" y="6" width="4" height="4" fill="#00ff41" />
      <rect x="2" y="10" width="4" height="4" fill="#00ff41" opacity="0.6" />
      <rect x="10" y="10" width="4" height="4" fill="#00ff41" />
    </svg>
  );
}

export function AboutSection({
  className,
  id = 'about',
}: AboutSectionProps): JSX.Element {
  const sectionClass = [
    'relative w-full overflow-hidden bg-matrix-black py-20 sm:py-24 lg:py-28',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <section
      id={id}
      aria-labelledby="about-heading"
      className={sectionClass}
      style={{
        backgroundImage:
          'linear-gradient(rgba(0,255,65,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,65,0.03) 1px, transparent 1px)',
        backgroundSize: '32px 32px',
      }}
    >
      <ParallaxBackground />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <header className="mb-12 text-center">
            <span className="mb-4 inline-block pixel-border border-cyber-green bg-cyber-green/10 px-3 py-1 font-mono text-xs uppercase tracking-widest text-cyber-green">
              Who We Are
            </span>
            <h2
              id="about-heading"
              className="font-mono text-3xl sm:text-4xl lg:text-5xl leading-tight text-white"
            >
              About CounterAct
            </h2>
            <div
              aria-hidden="true"
              className="mx-auto mt-4 h-1 w-24"
              style={{
                backgroundImage:
                  'linear-gradient(90deg, #00ff41 0 8px, transparent 8px 12px)',
                backgroundSize: '12px 4px',
                backgroundRepeat: 'repeat-x',
              }}
            />
          </header>
        </FadeIn>

        <FadeIn delayMs={100} className="mx-auto mb-20 max-w-3xl">
          <p className="text-center text-base sm:text-lg lg:text-xl leading-relaxed text-gray-200">
            <span className="text-cyber-green">&gt;</span> {MISSION_STATEMENT}
          </p>
        </FadeIn>

        <FadeIn delayMs={150} className="mb-20">
          <h3 className="mb-8 text-center font-mono text-xl sm:text-2xl uppercase tracking-widest text-white">
            Core Values
          </h3>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {CORE_VALUES.map((value, index) => (
              <FadeIn
                key={value.title}
                delayMs={200 + index * 100}
                className="h-full"
              >
                <article className="flex h-full items-start gap-4 bg-matrix-black/60 p-6 pixel-border border-cyber-green/50 transition-transform duration-300 hover:-translate-y-1">
                  <ValuePixelIcon />
                  <div>
                    <h4 className="mb-2 font-mono text-lg uppercase tracking-widest text-cyber-green">
                      {value.title}
                    </h4>
                    <p className="text-sm leading-relaxed text-gray-300">
                      {value.description}
                    </p>
                  </div>
                </article>
              </FadeIn>
            ))}
          </div>
        </FadeIn>

        <FadeIn delayMs={100}>
          <header className="mb-10 text-center">
            <h3 className="font-mono text-2xl sm:text-3xl leading-tight text-white">
              Meet the Team
            </h3>
            <p className="mx-auto mt-3 max-w-2xl text-sm sm:text-base leading-relaxed text-gray-300">
              Compliance leaders, investigators, and technologists who&apos;ve
              built the AML/CFT programs regulators trust.
            </p>
          </header>
        </FadeIn>

        <TeamGrid />
      </div>
    </section>
  );
}

export default AboutSection;
