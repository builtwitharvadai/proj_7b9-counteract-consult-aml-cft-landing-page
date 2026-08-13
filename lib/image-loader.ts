/**
 * Custom Next.js image loader that emits optimized CDN URLs.
 *
 * - Local paths (`/foo.jpg`) are routed through Next.js's built-in
 *   optimizer via `_next/image` on the current origin.
 * - Absolute URLs on known CDNs are rewritten with the CDN's native
 *   transformation syntax (Cloudinary today, easy to extend to others).
 * - Format is auto-negotiated (AVIF > WebP > original) using the
 *   browser's `Accept` hints where available, with a safe default of
 *   `auto` when running server-side.
 */

import { CDN_DOMAINS, IMAGE_QUALITY } from './image-config';

export interface ImageLoaderProps {
  src: string;
  width: number;
  quality?: number;
}

type NegotiatedFormat = 'avif' | 'webp' | 'auto';

const CLOUDINARY_HOST = 'res.cloudinary.com';

const clampQuality = (q?: number): number => {
  const value = typeof q === 'number' && Number.isFinite(q) ? q : IMAGE_QUALITY.default;
  return Math.min(100, Math.max(1, Math.round(value)));
};

const clampWidth = (w: number): number => {
  if (!Number.isFinite(w) || w <= 0) return 1080;
  return Math.min(3840, Math.max(16, Math.round(w)));
};

/**
 * Inspect the browser's Accept-header capability (client-side only) and
 * pick the best format. On the server we defer to `auto` so the CDN can
 * decide per request.
 */
export function negotiateFormat(): NegotiatedFormat {
  if (typeof document === 'undefined') return 'auto';
  const canvas = document.createElement('canvas');
  if (canvas.toDataURL && canvas.toDataURL('image/avif').startsWith('data:image/avif')) {
    return 'avif';
  }
  if (canvas.toDataURL && canvas.toDataURL('image/webp').startsWith('data:image/webp')) {
    return 'webp';
  }
  return 'auto';
}

const isAbsoluteUrl = (src: string): boolean =>
  /^https?:\/\//i.test(src) || src.startsWith('//');

const parseHost = (src: string): string | null => {
  try {
    const normalized = src.startsWith('//') ? `https:${src}` : src;
    return new URL(normalized).hostname;
  } catch {
    return null;
  }
};

const buildCloudinaryUrl = (
  src: string,
  width: number,
  quality: number,
  format: NegotiatedFormat,
): string => {
  const url = new URL(src.startsWith('//') ? `https:${src}` : src);
  const parts = url.pathname.split('/upload/');
  if (parts.length !== 2) {
    return src;
  }
  const transformations = [
    `w_${width}`,
    `q_${quality}`,
    `f_${format === 'auto' ? 'auto' : format}`,
    'c_limit',
    'dpr_auto',
  ].join(',');
  return `${url.origin}${parts[0]}/upload/${transformations}/${parts[1]}`;
};

const buildGenericCdnUrl = (
  src: string,
  width: number,
  quality: number,
  format: NegotiatedFormat,
): string => {
  const url = new URL(src.startsWith('//') ? `https:${src}` : src);
  url.searchParams.set('w', String(width));
  url.searchParams.set('q', String(quality));
  if (format !== 'auto') {
    url.searchParams.set('fm', format);
  } else {
    url.searchParams.set('auto', 'format,compress');
  }
  return url.toString();
};

const buildLocalUrl = (
  src: string,
  width: number,
  quality: number,
): string => {
  const normalized = src.startsWith('/') ? src : `/${src}`;
  const params = new URLSearchParams({
    url: normalized,
    w: String(width),
    q: String(quality),
  });
  return `/_next/image?${params.toString()}`;
};

/**
 * Primary loader entry point. Compatible with the `loader` prop on
 * `next/image` and the `images.loader` field in `next.config.js`.
 */
export default function imageLoader({ src, width, quality }: ImageLoaderProps): string {
  const finalWidth = clampWidth(width);
  const finalQuality = clampQuality(quality);
  const format = negotiateFormat();

  if (!src) {
    return '';
  }

  if (src.startsWith('data:') || src.startsWith('blob:')) {
    return src;
  }

  if (!isAbsoluteUrl(src)) {
    return buildLocalUrl(src, finalWidth, finalQuality);
  }

  const host = parseHost(src);
  if (!host) {
    return src;
  }

  if (!CDN_DOMAINS.includes(host)) {
    return src;
  }

  if (host === CLOUDINARY_HOST) {
    return buildCloudinaryUrl(src, finalWidth, finalQuality, format);
  }

  return buildGenericCdnUrl(src, finalWidth, finalQuality, format);
}

export { imageLoader };
