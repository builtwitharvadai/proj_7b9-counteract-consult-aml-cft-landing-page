'use client';

import { motion } from 'framer-motion';
import { useCallback } from 'react';

import type { CaseStudy } from '../../types/case-study';
import { OptimizedImage } from '../ui/OptimizedImage';

export interface CaseStudyCardProps {
  caseStudy: CaseStudy;
  onOpen: (caseStudy: CaseStudy) => void;
  className?: string;
}

const cx = (...classes: Array<string | false | null | undefined>): string =>
  classes.filter(Boolean).join(' ');

export function CaseStudyCard({
  caseStudy,
  onOpen,
  className,
}: CaseStudyCardProps): JSX.Element {
  const handleOpen = useCallback((): void => {
    onOpen(caseStudy);
  }, [caseStudy, onOpen]);

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
