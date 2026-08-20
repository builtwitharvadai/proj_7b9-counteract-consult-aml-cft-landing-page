/**
 * Generate base64-encoded SVG blur placeholders (LQIP) for use with
 * Next.js `<Image placeholder="blur" blurDataURL={...} />`. Colors are
 * drawn from the CounterAct Consult brand palette so the placeholder
 * feels visually consistent with the pixel-aesthetic design.
 */

const BRAND = {
  matrixBlack: '#131313',
  cyberGreenDark: '#1A0B68',
  cyberGreen: '#2C3EF8',
  scanline: 'rgba(171, 178, 252, 0.18)',
} as const;

/**
 * Produce the raw SVG markup for a shimmering placeholder. Kept as a
 * pure string so callers can post-process, cache, or encode it however
 * they like.
 */
export function shimmer(width: number, height: number): string {
  const w = Math.max(1, Math.round(width));
  const h = Math.max(1, Math.round(height));
  return `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="${BRAND.matrixBlack}"/>
      <stop offset="45%" stop-color="${BRAND.cyberGreenDark}"/>
      <stop offset="50%" stop-color="${BRAND.cyberGreen}" stop-opacity="0.35"/>
      <stop offset="55%" stop-color="${BRAND.cyberGreenDark}"/>
      <stop offset="100%" stop-color="${BRAND.matrixBlack}"/>
    </linearGradient>
    <pattern id="p" width="4" height="4" patternUnits="userSpaceOnUse">
      <rect width="4" height="4" fill="${BRAND.matrixBlack}"/>
      <rect width="2" height="2" fill="${BRAND.scanline}"/>
    </pattern>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#p)"/>
  <rect width="${w}" height="${h}" fill="url(#g)">
    <animate attributeName="x" from="-${w}" to="${w}" dur="1.4s" repeatCount="indefinite"/>
  </rect>
</svg>`;
}

/**
 * Base64-encode a string in a way that works in both Node and browsers.
 */
export function toBase64(value: string): string {
  if (typeof window === 'undefined') {
    return Buffer.from(value).toString('base64');
  }
  return window.btoa(unescape(encodeURIComponent(value)));
}

/**
 * Convenience helper: returns a ready-to-use data URL for the shimmer
 * placeholder at the requested dimensions.
 */
export function getBlurDataURL(width = 16, height = 10): string {
  const svg = shimmer(width, height);
  return `data:image/svg+xml;base64,${toBase64(svg)}`;
}

export default getBlurDataURL;
