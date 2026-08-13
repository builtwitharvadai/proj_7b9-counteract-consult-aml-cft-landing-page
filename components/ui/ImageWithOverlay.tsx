'use client';

import type { CSSProperties, ReactNode } from 'react';

import type { BrandAspectRatioLabel } from '../../lib/image-config';
import { OptimizedImage } from './OptimizedImage';

export type OverlayContentPosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'center-left'
  | 'center'
  | 'center-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';

export interface ImageWithOverlayProps {
  src: string;
  alt: string;
  overlayGradient?: string;
  pixelBorder?: boolean;
  aspectRatio?: BrandAspectRatioLabel;
  priority?: boolean;
  sizes?: string;
  className?: string;
  overlayClassName?: string;
  contentClassName?: string;
  contentPosition?: OverlayContentPosition;
  children?: ReactNode;
}

const DEFAULT_OVERLAY_GRADIENT =
  'linear-gradient(180deg, rgba(19,19,19,0.15) 0%, rgba(19,19,19,0.55) 60%, rgba(19,19,19,0.85) 100%)';

const positionClassMap: Record<OverlayContentPosition, string> = {
  'top-left': 'items-start justify-start text-left',
  'top-center': 'items-start justify-center text-center',
  'top-right': 'items-start justify-end text-right',
  'center-left': 'items-center justify-start text-left',
  center: 'items-center justify-center text-center',
  'center-right': 'items-center justify-end text-right',
  'bottom-left': 'items-end justify-start text-left',
  'bottom-center': 'items-end justify-center text-center',
  'bottom-right': 'items-end justify-end text-right',
};

const cx = (
  ...classes: Array<string | false | null | undefined>
): string => classes.filter(Boolean).join(' ');

export function ImageWithOverlay({
  src,
  alt,
  overlayGradient = DEFAULT_OVERLAY_GRADIENT,
  pixelBorder = false,
  aspectRatio = '16:9',
  priority = false,
  sizes,
  className,
  overlayClassName,
  contentClassName,
  contentPosition = 'bottom-left',
  children,
}: ImageWithOverlayProps): JSX.Element {
  const wrapperClasses = cx(
    'relative isolate overflow-hidden',
    pixelBorder && 'pixel-border',
    className,
  );

  const overlayStyle: CSSProperties = {
    backgroundImage: overlayGradient,
  };

  const overlayClasses = cx(
    'pointer-events-none absolute inset-0 z-10',
    overlayClassName,
  );

  const contentClasses = cx(
    'absolute inset-0 z-20 flex flex-col p-4 sm:p-6 lg:p-8',
    positionClassMap[contentPosition],
    'text-white [text-shadow:_0_1px_2px_rgba(0,0,0,0.65)]',
    contentClassName,
  );

  return (
    <div
      className={wrapperClasses}
      data-pixel-border={pixelBorder || undefined}
    >
      <OptimizedImage
        src={src}
        alt={alt}
        aspectRatio={aspectRatio}
        priority={priority}
        {...(sizes ? { sizes } : {})}
        pixelBorder={false}
        wrapperClassName="relative z-0"
      />
      <div
        aria-hidden="true"
        className={overlayClasses}
        style={overlayStyle}
      />
      {children ? <div className={contentClasses}>{children}</div> : null}
    </div>
  );
}

export default ImageWithOverlay;
