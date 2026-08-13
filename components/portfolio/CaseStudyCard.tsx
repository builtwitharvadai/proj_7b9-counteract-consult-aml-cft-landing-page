'use client';

import { motion } from 'framer-motion';
import { useCallback, useRef } from 'react';

import type { CaseStudy } from '../../types/case-study';
import { OptimizedImage } from '../ui/OptimizedImage';

export interface CaseStudyCardProps {
  caseStudy: CaseStudy;
  onOpen: (caseStudy: CaseStudy) => void;
  className?: string;
}

const cx = (...classes: Array<string | false | null | undefined>): string =>
  classes.filter(Boolean).join(' ');

/** Warm Unsplash CDN cache for modal-sized display (no Next proxy). */
function preloadModalImage(src: string): void {
  if (typeof window === 'undefined' || !src) return;
  try {
    const url = new URL(src);
    url.searchParams.set('auto', 'format');
    url.searchParams.set('fit', 'crop');
    url.searchParams.set('w', '1080');
    url.searchParams.set('q', '70');
    const img = new window.Image();
    img.decoding = 'async';
    img.src = url.toString();
  } catch {
    const img = new window.Image();
    img.src = src;
  }
}

export function CaseStudyCard({
  caseStudy,
  onOpen,
  className,
}: CaseStudyCardProps): JSX.Element {
  const preloaded = useRef(false);

  const warmImage = useCallback((): void => {
    if (preloaded.current) return;
    preloaded.current = true;
    preloadModalImage(caseStudy.thumbnail);
  }, [caseStudy.thumbnail]);

  const handleOpen = useCallback((): void => {
    warmImage();
    onOpen(caseStudy);
  }, [caseStudy, onOpen, warmImage]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>): void => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        handleOpen();
      }
    },
    [handleOpen],
  );

  const ariaLabel = `Open case study: ${caseStudy.title}. Category: ${caseStudy.category}.`;

  return (
    <motion.div
      role="button"
      tabIndex={0}
      aria-label={ariaLabel}
      onClick={handleOpen}
      onKeyDown={handleKeyDown}
      onMouseEnter={warmImage}
      onFocus={warmImage}
      whileHover={{ scale: 1.02 }}
      whileFocus={{ scale: 1.02 }}
      whileTap={{ scale: 0.99 }}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      className={cx(
        'group relative block w-full cursor-pointer overflow-hidden',
        'pixel-border bg-matrix-black',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-cyber-green focus-visible:ring-offset-2 focus-visible:ring-offset-matrix-black',
        className,
      )}
    >
      <OptimizedImage
        src={caseStudy.thumbnail}
        alt={`${caseStudy.title} — ${caseStudy.category} case study thumbnail`}
        aspectRatio="4:3"
        pixelBorder={false}
        quality={70}
        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 400px"
        wrapperClassName="relative w-full"
      />

      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        whileFocus={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className={cx(
          'absolute inset-0 flex flex-col justify-end p-5 sm:p-6',
          'bg-gradient-to-t from-matrix-black/95 via-matrix-black/80 to-matrix-black/40',
          'opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100',
          'transition-opacity duration-300 ease-out',
        )}
        aria-hidden="true"
      >
        <span
          className={cx(
            'mb-2 inline-flex w-fit items-center pixel-border',
            'bg-cyber-green/20 border-cyber-green text-cyber-green',
            'font-mono text-[10px] sm:text-xs uppercase tracking-widest',
            'px-2 py-1',
          )}
        >
          {caseStudy.category}
        </span>
        <h3 className="mb-3 font-mono text-base sm:text-lg text-white leading-snug">
          {caseStudy.title}
        </h3>
        <span
          className={cx(
            'inline-flex w-fit items-center pixel-border',
            'border-cyber-green bg-matrix-black/70 text-cyber-green',
            'font-mono text-xs uppercase tracking-widest',
            'px-3 py-1.5',
            'group-hover:bg-cyber-green/10',
          )}
        >
          View Details →
        </span>
      </motion.div>
    </motion.div>
  );
}

export default CaseStudyCard;
