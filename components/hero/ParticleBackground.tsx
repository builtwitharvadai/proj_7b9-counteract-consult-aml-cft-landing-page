'use client';

import { useEffect, useMemo, useState, type CSSProperties } from 'react';

export interface ParticleBackgroundProps {
  className?: string;
  desktopCount?: number;
  mobileCount?: number;
}

interface Particle {
  readonly id: number;
  readonly left: number;
  readonly delay: number;
  readonly duration: number;
  readonly opacity: number;
  readonly drift: number;
  readonly size: number;
}

const MOBILE_BREAKPOINT_PX = 768;
const DEFAULT_DESKTOP_COUNT = 50;
const DEFAULT_MOBILE_COUNT = 20;

const KEYFRAMES = `
@keyframes counteract-particle-float {
  0% {
    transform: translate3d(0, 0, 0);
    opacity: 0;
  }
  10% {
    opacity: var(--particle-opacity, 0.5);
  }
  90% {
    opacity: var(--particle-opacity, 0.5);
  }
  100% {
    transform: translate3d(var(--particle-drift, 0px), -110vh, 0);
    opacity: 0;
  }
}
`;

function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) {
      return;
    }
    const query = window.matchMedia(
      `(max-width: ${MOBILE_BREAKPOINT_PX - 1}px)`,
    );
    const update = (): void => setIsMobile(query.matches);
    update();
    if (typeof query.addEventListener === 'function') {
      query.addEventListener('change', update);
      return () => query.removeEventListener('change', update);
    }
    query.addListener(update);
    return () => query.removeListener(update);
  }, []);

  return isMobile;
}

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) {
      return;
    }
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = (): void => setReduced(query.matches);
    update();
    if (typeof query.addEventListener === 'function') {
      query.addEventListener('change', update);
      return () => query.removeEventListener('change', update);
    }
    query.addListener(update);
    return () => query.removeListener(update);
  }, []);

  return reduced;
}

function pseudoRandom(seed: number): number {
  const x = Math.sin(seed * 9301 + 49297) * 233280;
  return x - Math.floor(x);
}

function buildParticles(count: number): ReadonlyArray<Particle> {
  const particles: Particle[] = [];
  for (let index = 0; index < count; index += 1) {
    const left = pseudoRandom(index + 1) * 100;
    const delay = pseudoRandom(index + 101) * 20;
    const duration = 10 + pseudoRandom(index + 201) * 10;
    const opacity = 0.3 + pseudoRandom(index + 301) * 0.4;
    const drift = (pseudoRandom(index + 401) - 0.5) * 40;
    const sizePick = pseudoRandom(index + 501);
    const size = sizePick > 0.85 ? 3 : 2;
    particles.push({
      id: index,
      left,
      delay,
      duration,
      opacity,
      drift,
      size,
    });
  }
  return particles;
}

export function ParticleBackground({
  className,
  desktopCount = DEFAULT_DESKTOP_COUNT,
  mobileCount = DEFAULT_MOBILE_COUNT,
}: ParticleBackgroundProps): JSX.Element {
  const isMobile = useIsMobile();
  const prefersReducedMotion = usePrefersReducedMotion();

  const count = isMobile ? mobileCount : desktopCount;

  const particles = useMemo(() => buildParticles(count), [count]);

  const wrapperClass = [
    'pointer-events-none absolute inset-0 overflow-hidden',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  if (prefersReducedMotion) {
    return <div aria-hidden="true" className={wrapperClass} />;
  }

  return (
    <div aria-hidden="true" className={wrapperClass}>
      <style>{KEYFRAMES}</style>
      {particles.map((particle) => {
        const style: CSSProperties = {
          position: 'absolute',
          left: `${particle.left}%`,
          bottom: `-${particle.size * 2}px`,
          width: `${particle.size}px`,
          height: `${particle.size}px`,
          backgroundColor: '#00FD00',
          opacity: 0,
          willChange: 'transform, opacity',
          animationName: 'counteract-particle-float',
          animationDuration: `${particle.duration}s`,
          animationDelay: `${particle.delay}s`,
          animationTimingFunction: 'linear',
          animationIterationCount: 'infinite',
          boxShadow: '0 0 4px rgba(0, 253, 0, 0.6)',
          ['--particle-opacity' as string]: particle.opacity.toFixed(2),
          ['--particle-drift' as string]: `${particle.drift.toFixed(2)}px`,
        };
        return <span key={particle.id} style={style} />;
      })}
    </div>
  );
}

export default ParticleBackground;
