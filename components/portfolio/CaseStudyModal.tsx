'use client';

import { AnimatePresence, motion } from 'framer-motion';
import FocusLock from 'react-focus-lock';
import { useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import type { CaseStudy } from '../../types/case-study';
import { OptimizedImage } from '../ui/OptimizedImage';

export interface CaseStudyModalProps {
  caseStudy: CaseStudy | null;
  isOpen: boolean;
  onClose: () => void;
}

const cx = (...classes: Array<string | false | null | undefined>): string =>
  classes.filter(Boolean).join(' ');

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
} as const;

const contentVariants = {
  hidden: { opacity: 0, scale: 0.96, y: 12 },
  visible: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.98, y: 8 },
} as const;

export function CaseStudyModal({
  caseStudy,
  isOpen,
  onClose,
}: CaseStudyModalProps): JSX.Element | null {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return;
    }
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }
    const handleKey = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        event.stopPropagation();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  const handleBackdropClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>): void => {
      if (event.target === event.currentTarget) {
        onClose();
      }
    },
    [onClose],
  );

  if (!mounted || typeof document === 'undefined') {
    return null;
  }

  const modal = (
    <AnimatePresence>
      {isOpen && caseStudy && (
        <motion.div
          key="case-study-modal-backdrop"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          transition={{ duration: 0.2, ease: 'easeOut' }}
          onClick={handleBackdropClick}
          className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-matrix-black/80 p-4 backdrop-blur-md sm:p-8"
          role="presentation"
        >
          <FocusLock returnFocus autoFocus>
            <motion.div
              key="case-study-modal-content"
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.25, ease: 'easeOut' }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="case-study-modal-title"
              aria-describedby="case-study-modal-description"
              className={cx(
                'relative mx-auto my-4 w-full max-w-4xl',
                'pixel-border bg-matrix-black text-white',
                'shadow-[0_0_40px_rgba(0,0,0,0.6)]',
              )}
            >
              <button
                type="button"
                onClick={onClose}
                aria-label="Close case study"
                className={cx(
                  'absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center',
                  'pixel-border border-cyber-green bg-matrix-black text-cyber-green',
                  'font-mono text-lg leading-none',
                  'transition-colors duration-200 ease-out',
                  'hover:bg-cyber-green/10',
                  'focus:outline-none focus-visible:ring-2 focus-visible:ring-cyber-green focus-visible:ring-offset-2 focus-visible:ring-offset-matrix-black',
                )}
              >
                <span aria-hidden="true">×</span>
              </button>

              <div className="relative w-full">
                <OptimizedImage
                  key={caseStudy.id}
                  src={caseStudy.thumbnail}
                  alt={`${caseStudy.title} — case study hero image`}
                  aspectRatio="16:9"
                  priority
                  quality={75}
                  sizes="(max-width: 896px) 100vw, 896px"
                  pixelBorder={false}
                  wrapperClassName="w-full"
                  fallbackSrc={caseStudy.image}
                />
              </div>

              <div className="space-y-8 p-6 sm:p-8">
                <header className="space-y-4">
                  <span
                    className={cx(
                      'inline-flex w-fit items-center pixel-border',
                      'bg-cyber-green/20 border-cyber-green text-cyber-green',
                      'font-mono text-xs uppercase tracking-widest',
                      'px-3 py-1',
                    )}
                  >
                    {caseStudy.category}
                  </span>
                  <h2
                    id="case-study-modal-title"
                    className={cx(
                      'font-mono text-2xl sm:text-3xl leading-tight text-white',
                      'inline-block pb-2 border-b-2 border-cyber-green',
                    )}
                    style={{ borderImage: 'repeating-linear-gradient(90deg, #00ff41 0 6px, transparent 6px 10px) 1' }}
                  >
                    {caseStudy.title}
                  </h2>
                  {caseStudy.client && (
                    <p className="font-mono text-xs uppercase tracking-widest text-gray-400">
                      Client: {caseStudy.client}
                    </p>
                  )}
                </header>

                <p
                  id="case-study-modal-description"
                  className="sr-only"
                >
                  Detailed case study overview including challenge, solution, results and metrics.
                </p>

                <section aria-labelledby="challenge-heading" className="space-y-3">
                  <h3
                    id="challenge-heading"
                    className="font-mono text-sm uppercase tracking-widest text-cyber-green"
                  >
                    Challenge
                  </h3>
                  <p className="text-sm sm:text-base leading-relaxed text-gray-200">
                    {caseStudy.challenge}
                  </p>
                </section>

                <section aria-labelledby="solution-heading" className="space-y-3">
                  <h3
                    id="solution-heading"
                    className="font-mono text-sm uppercase tracking-widest text-cyber-green"
                  >
                    Solution
                  </h3>
                  <p className="text-sm sm:text-base leading-relaxed text-gray-200">
                    {caseStudy.solution}
                  </p>
                </section>

                <section aria-labelledby="results-heading" className="space-y-4">
                  <h3
                    id="results-heading"
                    className="font-mono text-sm uppercase tracking-widest text-cyber-green"
                  >
                    Results
                  </h3>
                  <p className="text-sm sm:text-base leading-relaxed text-gray-200">
                    {caseStudy.results}
                  </p>

                  {caseStudy.metrics.length > 0 && (
                    <ul
                      className="grid grid-cols-1 gap-3 sm:grid-cols-2"
                      aria-label="Outcome metrics"
                    >
                      {caseStudy.metrics.map((metric) => (
                        <li
                          key={`${metric.label}-${metric.value}`}
                          className={cx(
                            'pixel-border bg-matrix-black/70 border-cyber-green/60',
                            'p-4 flex flex-col gap-1',
                          )}
                        >
                          <span className="font-mono text-2xl text-cyber-green">
                            {metric.value}
                          </span>
                          <span className="font-mono text-[11px] uppercase tracking-widest text-gray-300">
                            {metric.label}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              </div>
            </motion.div>
          </FocusLock>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return createPortal(modal, document.body);
}

export default CaseStudyModal;
