'use client';

import { AnimatePresence, motion } from 'framer-motion';
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import rawCaseStudies from '../../data/case-studies.json';
import type {
  CaseStudy,
  CaseStudyCategory,
  FilterCategory,
} from '../../types/case-study';
import { CaseStudyCard } from './CaseStudyCard';
import { CaseStudyModal } from './CaseStudyModal';
import { FilterBar } from './FilterBar';

const CASE_STUDIES = rawCaseStudies as CaseStudy[];

const cx = (...classes: Array<string | false | null | undefined>): string =>
  classes.filter(Boolean).join(' ');

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: Math.min(i * 0.06, 0.5),
      duration: 0.35,
      ease: 'easeOut' as const,
    },
  }),
  exit: { opacity: 0, y: 12, transition: { duration: 0.18, ease: 'easeIn' as const } },
} as const;

interface LazyCardProps {
  caseStudy: CaseStudy;
  index: number;
  onOpen: (caseStudy: CaseStudy) => void;
}

function LazyCard({ caseStudy, index, onOpen }: LazyCardProps): JSX.Element {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(index < 8);

  useEffect(() => {
    if (isVisible || typeof IntersectionObserver === 'undefined') {
      return;
    }
    const node = containerRef.current;
    if (!node) {
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
            break;
          }
        }
      },
      { rootMargin: '400px 0px', threshold: 0.01 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [isVisible]);

  return (
    <motion.div
      ref={containerRef}
      layout
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="h-full"
    >
      {isVisible ? (
        <CaseStudyCard caseStudy={caseStudy} onOpen={onOpen} className="h-full" />
      ) : (
        <div
          aria-hidden="true"
          className="pixel-border h-full min-h-[240px] w-full bg-matrix-black/40"
        />
      )}
    </motion.div>
  );
}

export interface PortfolioGalleryProps {
  className?: string;
}

export function PortfolioGallery({ className }: PortfolioGalleryProps): JSX.Element {
  const [activeCategory, setActiveCategory] = useState<FilterCategory>('all');
  const [selected, setSelected] = useState<CaseStudy | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const filtered = useMemo<CaseStudy[]>(() => {
    if (activeCategory === 'all') {
      return CASE_STUDIES;
    }
    const category: CaseStudyCategory = activeCategory;
    return CASE_STUDIES.filter((entry) => entry.category === category);
  }, [activeCategory]);

  const handleFilterChange = useCallback((next: FilterCategory): void => {
    setActiveCategory(next);
  }, []);

  const handleOpen = useCallback((caseStudy: CaseStudy): void => {
    setSelected(caseStudy);
    setIsModalOpen(true);
  }, []);

  const handleClose = useCallback((): void => {
    setIsModalOpen(false);
  }, []);

  return (
    <div className={cx('w-full', className)}>
      <FilterBar
        activeCategory={activeCategory}
        onFilterChange={handleFilterChange}
        className="mb-10"
      />

      {filtered.length === 0 ? (
        <p
          role="status"
          className="text-center font-mono text-sm uppercase tracking-widest text-gray-400"
        >
          No case studies match this filter yet.
        </p>
      ) : (
        <ul
          className="grid gap-6 list-none p-0 m-0"
          style={{
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          }}
          aria-label="Case studies"
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {filtered.map((caseStudy, index) => (
              <li key={caseStudy.id} className="h-full">
                <LazyCard
                  caseStudy={caseStudy}
                  index={index}
                  onOpen={handleOpen}
                />
              </li>
            ))}
          </AnimatePresence>
        </ul>
      )}

      <CaseStudyModal
        caseStudy={selected}
        isOpen={isModalOpen}
        onClose={handleClose}
      />
    </div>
  );
}

export default PortfolioGallery;
