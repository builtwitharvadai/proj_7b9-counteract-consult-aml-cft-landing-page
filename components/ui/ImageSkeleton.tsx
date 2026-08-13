import type { CSSProperties } from 'react';

export type ImageSkeletonAspectRatio = '16:9' | '4:3' | '1:1';

export interface ImageSkeletonProps {
  aspectRatio?: ImageSkeletonAspectRatio;
  pixelBorder?: boolean;
  className?: string;
  label?: string;
  style?: CSSProperties;
}

const aspectClassMap: Record<ImageSkeletonAspectRatio, string> = {
  '16:9': 'aspect-video',
  '4:3': 'aspect-[4/3]',
  '1:1': 'aspect-square',
};

const cx = (...classes: Array<string | false | null | undefined>): string =>
  classes.filter(Boolean).join(' ');

/**
 * Loading skeleton that visually matches the pixel-aesthetic design
 * system: a matrix-black base, a cyber-green shimmer band, and an
 * optional stepped pixel border. Consumers place it above the real
 * image while it loads.
 */
export function ImageSkeleton({
  aspectRatio = '16:9',
  pixelBorder = false,
  className,
  label = 'Loading image',
  style,
}: ImageSkeletonProps): JSX.Element {
  const containerClasses = cx(
    'relative w-full overflow-hidden bg-matrix-black animate-pulse',
    aspectClassMap[aspectRatio],
    pixelBorder && 'pixel-border',
    className,
  );

  const shimmerStyle: CSSProperties = {
    backgroundImage:
      'linear-gradient(90deg, rgba(19,19,19,0) 0%, rgba(0,253,0,0.18) 45%, rgba(0,253,0,0.35) 50%, rgba(0,253,0,0.18) 55%, rgba(19,19,19,0) 100%)',
    backgroundSize: '200% 100%',
  };

  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy="true"
      aria-label={label}
      className={containerClasses}
      data-pixel-border={pixelBorder || undefined}
      style={style}
    >
      <div
        className="absolute inset-0 opacity-70 image-skeleton-shimmer"
        style={shimmerStyle}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-25"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, rgba(0,253,0,0.08) 0 2px, transparent 2px 4px), repeating-linear-gradient(90deg, rgba(0,253,0,0.08) 0 2px, transparent 2px 4px)',
        }}
      />

      <span className="sr-only">{label}</span>
    </div>
  );
}

export default ImageSkeleton;
