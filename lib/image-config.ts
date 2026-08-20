/**
 * Centralized image configuration constants for the CounterAct Consult
 * AML/CFT landing page. Provides brand-compliant aspect ratios, quality
 * presets, responsive breakpoints, LQIP generation, and the CDN domain
 * allow-list consumed by Next.js image optimization.
 */

export const BRAND_ASPECT_RATIOS = {
  wide: { label: '16:9', ratio: 16 / 9, width: 16, height: 9 },
  standard: { label: '4:3', ratio: 4 / 3, width: 4, height: 3 },
  square: { label: '1:1', ratio: 1, width: 1, height: 1 },
} as const;

export type BrandAspectRatioKey = keyof typeof BRAND_ASPECT_RATIOS;
export type BrandAspectRatioLabel =
  (typeof BRAND_ASPECT_RATIOS)[BrandAspectRatioKey]['label'];

export const IMAGE_QUALITY = {
  default: 85,
  thumbnail: 75,
  hero: 90,
} as const;

export type ImageQualityKey = keyof typeof IMAGE_QUALITY;

/**
 * Breakpoint widths in pixels — kept aligned with the Tailwind config so
 * that `sizes` strings and CSS media queries stay in sync.
 */
export const BREAKPOINT_SIZES = {
  xs: 480,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

export type BreakpointKey = keyof typeof BREAKPOINT_SIZES;

/**
 * Whitelist of hostnames that Next.js is allowed to optimize images from.
 * Must match the `images.domains` array in `next.config.js`.
 */
export const CDN_DOMAINS: readonly string[] = [
  'res.cloudinary.com',
  'images.unsplash.com',
  'cdn.counteractconsult.com',
  'assets.counteractconsult.com',
] as const;

/**
 * Brand colors reused by the shimmer LQIP so placeholders match the
 * pixel-aesthetic design system.
 */
const BRAND_COLORS = {
  matrixBlack: '#131313',
  cyberGreenDark: '#1A0B68',
  cyberGreen: '#2C3EF8',
} as const;

const toBase64 = (value: string): string =>
  typeof window === 'undefined'
    ? Buffer.from(value).toString('base64')
    : window.btoa(value);

/**
 * Produce a pixel-styled shimmer SVG that acts as a low-quality
 * image placeholder while the real asset loads.
 */
const shimmerSVG = (width: number, height: number): string => `
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}">
  <defs>
    <linearGradient id="grad" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="${BRAND_COLORS.matrixBlack}"/>
      <stop offset="50%" stop-color="${BRAND_COLORS.cyberGreenDark}"/>
      <stop offset="100%" stop-color="${BRAND_COLORS.matrixBlack}"/>
    </linearGradient>
  </defs>
  <rect width="${width}" height="${height}" fill="${BRAND_COLORS.matrixBlack}"/>
  <rect width="${width}" height="${height}" fill="url(#grad)" opacity="0.9"/>
</svg>`.trim();

/**
 * BLUR_DATA_URL is a factory that returns a base64 data URL for the
 * shimmer SVG at the requested dimensions. Consumers pass it directly
 * to `<Image blurDataURL={...} placeholder="blur" />`.
 */
export const BLUR_DATA_URL = (width = 16, height = 10): string => {
  const w = Math.max(1, Math.round(width));
  const h = Math.max(1, Math.round(height));
  return `data:image/svg+xml;base64,${toBase64(shimmerSVG(w, h))}`;
};

/**
 * Generate a responsive `sizes` string for a container that spans the
 * given viewport percentages at each breakpoint. Falls back to a
 * sensible default when no overrides are supplied.
 */
export const buildResponsiveSizes = (
  overrides?: Partial<Record<BreakpointKey, string>>,
): string => {
  const defaults: Record<BreakpointKey, string> = {
    xs: '100vw',
    sm: '100vw',
    md: '50vw',
    lg: '33vw',
    xl: '33vw',
    '2xl': '25vw',
  };
  const merged = { ...defaults, ...overrides };
  const orderedKeys: BreakpointKey[] = ['2xl', 'xl', 'lg', 'md', 'sm'];
  const clauses = orderedKeys.map(
    (key) => `(min-width: ${BREAKPOINT_SIZES[key]}px) ${merged[key]}`,
  );
  return [...clauses, merged.xs].join(', ');
};

export const DEFAULT_IMAGE_SIZES = buildResponsiveSizes();

export const isAllowedCdnHost = (url: string): boolean => {
  try {
    const parsed = new URL(url);
    return CDN_DOMAINS.includes(parsed.hostname);
  } catch {
    return false;
  }
};
