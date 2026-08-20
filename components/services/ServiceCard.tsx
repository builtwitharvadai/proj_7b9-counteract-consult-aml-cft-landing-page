'use client';

import type { Service } from '../../data/services';
import { ImageWithOverlay } from '../ui/ImageWithOverlay';

export interface ServiceCardProps {
  service: Service;
  index?: number;
  imagePosition?: 'left' | 'right' | 'auto';
  className?: string;
}

const cx = (
  ...classes: Array<string | false | null | undefined>
): string => classes.filter(Boolean).join(' ');

const SUBTLE_OVERLAY_GRADIENT =
  'linear-gradient(135deg, rgba(19,19,19,0.55) 0%, rgba(19,19,19,0.20) 55%, rgba(44,62,248,0.18) 100%)';

export function ServiceCard({
  service,
  index = 0,
  imagePosition = 'auto',
  className,
}: ServiceCardProps): JSX.Element {
  const resolvedPosition: 'left' | 'right' =
    imagePosition === 'auto'
      ? index % 2 === 0
        ? 'left'
        : 'right'
      : imagePosition;

  const hasImage = Boolean(service.image);

  const imageBlock = hasImage ? (
    <div className="w-full lg:w-2/5">
      <ImageWithOverlay
        src={service.image}
        alt={service.imageAlt}
        aspectRatio="4:3"
        pixelBorder
        overlayGradient={SUBTLE_OVERLAY_GRADIENT}
        className="h-full"
      />
    </div>
  ) : null;

  const contentBlock = (
    <div
      className={cx(
        'flex flex-col justify-center gap-4 p-6 sm:p-8',
        hasImage ? 'w-full lg:w-3/5' : 'w-full',
      )}
    >
      <h3 className="font-mono text-xl leading-tight text-white sm:text-2xl">
        {service.title}
      </h3>
      <p className="text-sm leading-relaxed text-gray-300 sm:text-base">
        {service.summary}
      </p>
      {service.highlights.length > 0 ? (
        <ul className="mt-2 space-y-2">
          {service.highlights.map((highlight) => (
            <li
              key={highlight}
              className="flex items-start gap-3 text-sm leading-snug text-gray-200"
            >
              <span
                aria-hidden="true"
                className="mt-1 inline-block h-2 w-2 shrink-0 bg-cyber-green"
              />
              <span>{highlight}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );

  return (
    <article
      aria-labelledby={`service-${service.id}-heading`}
      className={cx(
        'group relative w-full overflow-hidden bg-matrix-black',
        'pixel-border border-cyber-green/40',
        'transition-transform duration-200 ease-out hover:-translate-y-1 hover:border-cyber-green',
        'focus-within:-translate-y-1 focus-within:border-cyber-green',
        className,
      )}
    >
      <span id={`service-${service.id}-heading`} className="sr-only">
        {service.title}
      </span>
      <div
        className={cx(
          'flex flex-col',
          hasImage && resolvedPosition === 'left'
            ? 'lg:flex-row'
            : hasImage && resolvedPosition === 'right'
              ? 'lg:flex-row-reverse'
              : '',
        )}
      >
        {imageBlock}
        {contentBlock}
      </div>
    </article>
  );
}

export default ServiceCard;
