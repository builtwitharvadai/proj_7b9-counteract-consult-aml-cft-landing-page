'use client';

import { useEffect, useRef, useState } from 'react';

export interface ParallaxBackgroundProps {
  className?: string;
  factor?: number;
}

const MOBILE_BREAKPOINT_PX = 768;

function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) {
      return;
    }
    const query = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT_PX - 1}px)`);
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

export function ParallaxBackground({
  className,
  factor = 0.5,
}: ParallaxBackgroundProps): JSX.Element {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const layerRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const isMobile = useIsMobile();
  const prefersReducedMotion = usePrefersReducedMotion();

  const effectiveFactor = isMobile ? factor * 0.25 : factor;
  const parallaxDisabled = prefersReducedMotion;

  useEffect(() => {
    if (parallaxDisabled) {
      if (layerRef.current) {
        layerRef.current.style.transform = 'translate3d(0, 0, 0)';
      }
      return;
    }

    const update = (): void => {
      const container = containerRef.current;
      const layer = layerRef.current;
      if (!container || !layer) return;

      const rect = container.getBoundingClientRect();
      const viewportH =
        typeof window !== 'undefined' ? window.innerHeight : rect.height;

      const scrolled = viewportH - rect.top;
      const offset = -scrolled * effectiveFactor;
      layer.style.transform = `translate3d(0, ${offset.toFixed(2)}px, 0)`;
    };

    const onScroll = (): void => {
      if (frameRef.current !== null) return;
      frameRef.current = window.requestAnimationFrame(() => {
        frameRef.current = null;
        update();
      });
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
    };
  }, [effectiveFactor, parallaxDisabled]);

  const wrapperClass = [
    'pointer-events-none absolute inset-0 -z-10 overflow-hidden',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={wrapperClass}
    >
      <div
        ref={layerRef}
        className="absolute inset-x-0 -top-1/4 h-[150%] w-full"
        style={{
          willChange: 'transform',
          transform: 'translate3d(0, 0, 0)',
        }}
      >
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              'linear-gradient(rgba(0,255,65,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,65,0.12) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 30%, rgba(0,255,65,0.08) 0px, transparent 40%), radial-gradient(circle at 80% 70%, rgba(0,255,65,0.05) 0px, transparent 45%)',
          }}
        />
        <svg
          className="absolute left-[8%] top-[12%] h-24 w-24 opacity-30"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="0" y="0" width="8" height="8" fill="rgba(0,255,65,0.6)" />
          <rect x="12" y="4" width="6" height="6" fill="rgba(0,255,65,0.35)" />
          <rect x="22" y="10" width="8" height="8" fill="rgba(0,255,65,0.5)" />
          <rect x="4" y="20" width="6" height="6" fill="rgba(0,255,65,0.4)" />
          <rect x="18" y="22" width="10" height="10" fill="rgba(0,255,65,0.25)" />
        </svg>
        <svg
          className="absolute right-[10%] bottom-[18%] h-32 w-32 opacity-25"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="0" y="0" width="10" height="10" fill="rgba(0,255,65,0.35)" />
          <rect x="14" y="6" width="8" height="8" fill="rgba(0,255,65,0.5)" />
          <rect x="26" y="0" width="6" height="6" fill="rgba(0,255,65,0.4)" />
          <rect x="6" y="20" width="12" height="12" fill="rgba(0,255,65,0.2)" />
          <rect x="24" y="24" width="10" height="10" fill="rgba(0,255,65,0.45)" />
        </svg>
      </div>
    </div>
  );
}

export default ParallaxBackground;
