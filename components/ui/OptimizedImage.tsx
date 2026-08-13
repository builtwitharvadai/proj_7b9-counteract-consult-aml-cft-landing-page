'use client';

import Image, { type ImageLoaderProps, type ImageProps } from 'next/image';
import {
  Component,
  type ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import {
  BLUR_DATA_URL,
  BRAND_ASPECT_RATIOS,
  DEFAULT_IMAGE_SIZES,
  IMAGE_QUALITY,
  type BrandAspectRatioLabel,
} from '../../lib/image-config';
import { ImageSkeleton } from './ImageSkeleton';

type NextImageBaseProps = Omit<
  ImageProps,
  | 'alt'
  | 'src'
  | 'placeholder'
  | 'blurDataURL'
  | 'onLoad'
  | 'onError'
  | 'onLoadingComplete'
  | 'loader'
>;

export interface OptimizedImageProps extends NextImageBaseProps {
  src: string;
  alt: string;
  aspectRatio?: BrandAspectRatioLabel;
  pixelBorder?: boolean;
  quality?: number;
  priority?: boolean;
  sizes?: string;
  className?: string;
  wrapperClassName?: string;
  fallbackSrc?: string;
}

interface ErrorBoundaryProps {
  fallback: ReactNode;
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ImageErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error): void {
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.error('[OptimizedImage] Render error:', error);
    }
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

const aspectRatioClassMap: Record<BrandAspectRatioLabel, string> = {
  '16:9': 'aspect-video',
  '4:3': 'aspect-[4/3]',
  '1:1': 'aspect-square',
};

const cx = (...classes: Array<string | false | null | undefined>): string =>
  classes.filter(Boolean).join(' ');

const isUnsplashSrc = (src: string): boolean =>
  /images\.unsplash\.com/i.test(src);

/**
 * Hit Unsplash CDN directly — skips Next.js `/_next/image` proxy, which
 * was serializing/slowing every gallery thumbnail through the local optimizer.
 */
const unsplashLoader = ({ src, width, quality }: ImageLoaderProps): string => {
  try {
    const url = new URL(src);
    url.searchParams.set('auto', 'format');
    url.searchParams.set('fit', 'crop');
    url.searchParams.set('w', String(Math.min(width, 1600)));
    url.searchParams.set('q', String(quality ?? 70));
    return url.toString();
  } catch {
    return src;
  }
};

const ErrorState = ({ alt }: { alt: string }): JSX.Element => (
  <div
    role="img"
    aria-label={alt}
    className="flex h-full w-full items-center justify-center bg-matrix-black text-cyber-green"
  >
    <span className="font-mono text-xs uppercase tracking-widest">
      Image unavailable
    </span>
  </div>
);

export function OptimizedImage({
  src,
  alt,
  aspectRatio = '16:9',
  pixelBorder = false,
  quality = IMAGE_QUALITY.thumbnail,
  priority = false,
  sizes = DEFAULT_IMAGE_SIZES,
  className,
  wrapperClassName,
  fallbackSrc,
  fill,
  width,
  height,
  ...rest
}: OptimizedImageProps): JSX.Element {
  if (!alt || !alt.trim()) {
    throw new Error(
      'OptimizedImage: `alt` is required for accessibility. Provide descriptive alt text or an empty string for decorative images explicitly.',
    );
  }

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);
  const [currentSrc, setCurrentSrc] = useState<string>(src);
  const useCdnLoader = isUnsplashSrc(currentSrc);

  useEffect(() => {
    setCurrentSrc(src);
    setIsLoading(true);
    setHasError(false);
  }, [src]);

  // Never leave the skeleton up forever if a load event is missed.
  useEffect(() => {
    if (!isLoading) return;
    const timer = window.setTimeout(() => setIsLoading(false), 6000);
    return () => window.clearTimeout(timer);
  }, [isLoading, currentSrc]);

  const handleLoad = useCallback((): void => {
    setIsLoading(false);
  }, []);

  const handleError = useCallback((): void => {
    if (fallbackSrc && currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
      setIsLoading(true);
      return;
    }
    setHasError(true);
    setIsLoading(false);
  }, [currentSrc, fallbackSrc]);

  const ratio = BRAND_ASPECT_RATIOS[
    aspectRatio === '16:9'
      ? 'wide'
      : aspectRatio === '4:3'
        ? 'standard'
        : 'square'
  ];

  const blurDataURL = useMemo(
    () => BLUR_DATA_URL(ratio.width * 4, ratio.height * 4),
    [ratio.height, ratio.width],
  );

  const wrapperClasses = cx(
    'relative overflow-hidden',
    aspectRatioClassMap[aspectRatio],
    pixelBorder && 'pixel-border',
    wrapperClassName,
  );

  const imageClasses = cx(
    'object-cover transition-opacity duration-300 ease-out brand-photo',
    isLoading ? 'opacity-0' : 'opacity-100',
    className,
  );

  const useFill = fill ?? (width === undefined && height === undefined);

  return (
    <ImageErrorBoundary
      fallback={
        <div className={wrapperClasses}>
          <ErrorState alt={alt} />
        </div>
      }
    >
      <div className={wrapperClasses} data-pixel-border={pixelBorder || undefined}>
        {isLoading && !hasError && (
          <ImageSkeleton
            aspectRatio={aspectRatio}
            pixelBorder={pixelBorder}
            className="absolute inset-0 z-[1]"
          />
        )}
        {hasError ? (
          <ErrorState alt={alt} />
        ) : (
          <Image
            src={currentSrc}
            alt={alt}
            quality={quality}
            priority={priority}
            sizes={sizes}
            placeholder="blur"
            blurDataURL={blurDataURL}
            loader={useCdnLoader ? unsplashLoader : undefined}
            onLoadingComplete={handleLoad}
            onLoad={handleLoad}
            onError={handleError}
            className={imageClasses}
            {...(useFill
              ? { fill: true }
              : {
                  width: width ?? ratio.width * 100,
                  height: height ?? ratio.height * 100,
                })}
            {...rest}
          />
        )}
      </div>
    </ImageErrorBoundary>
  );
}

export default OptimizedImage;
