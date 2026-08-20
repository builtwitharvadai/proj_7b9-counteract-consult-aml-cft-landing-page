'use client';

import type { CSSProperties } from 'react';

import { OptimizedImage } from '../ui/OptimizedImage';
import { ParticleBackground } from './ParticleBackground';

export const SITE_BACKGROUND_IMAGE =
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2400&q=80';
export const SITE_BACKGROUND_ALT =
  'Modern financial district skyline representing institutional compliance and trust';

const OVERLAY_GRADIENT =
  'linear-gradient(180deg, rgba(19,19,19,0.92) 0%, rgba(26,11,104,0.55) 42%, rgba(19,19,19,0.70) 72%, rgba(19,19,19,0.78) 100%)';

export function SiteBackground(): JSX.Element {
  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
      <OptimizedImage
        src={SITE_BACKGROUND_IMAGE}
        alt={SITE_BACKGROUND_ALT}
        aspectRatio="16:9"
        priority
        fill
        sizes="100vw"
        wrapperClassName="absolute inset-0 h-full w-full aspect-auto"
        className="h-full w-full object-cover"
      />
      <div
        className="absolute inset-0"
        style={{ backgroundImage: OVERLAY_GRADIENT } satisfies CSSProperties}
      />
      <div
        className="absolute -right-16 top-0 h-[55%] w-[38%] bg-brand-blue/15"
        style={{ clipPath: 'polygon(40% 0, 100% 0, 100% 100%, 0 100%)' }}
      />
      <ParticleBackground className="z-10" />
    </div>
  );
}

export default SiteBackground;
