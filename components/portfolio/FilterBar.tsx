'use client';

import { useCallback, useRef } from 'react';

import type { FilterCategory } from '../../types/case-study';

export interface FilterBarProps {
  activeCategory: FilterCategory;
  onFilterChange: (category: FilterCategory) => void;
  className?: string;
}

interface FilterOption {
  value: FilterCategory;
  label: string;
}

const FILTER_OPTIONS: readonly FilterOption[] = [
  { value: 'all', label: 'All' },
  { value: 'AML', label: 'AML' },
  { value: 'CFT', label: 'CFT' },
  { value: 'Fraud Detection', label: 'Fraud Detection' },
  { value: 'Risk Assessment', label: 'Risk Assessment' },
] as const;

const cx = (...classes: Array<string | false | null | undefined>): string =>
  classes.filter(Boolean).join(' ');

export function FilterBar({
  activeCategory,
  onFilterChange,
  className,
}: FilterBarProps): JSX.Element {
  const buttonRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const focusButton = useCallback((index: number): void => {
    const total = FILTER_OPTIONS.length;
    const wrapped = ((index % total) + total) % total;
    const target = buttonRefs.current[wrapped];
    if (target) {
      target.focus();
    }
  }, []);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLButtonElement>, index: number): void => {
      switch (event.key) {
        case 'ArrowRight':
        case 'ArrowDown':
          event.preventDefault();
          focusButton(index + 1);
          break;
        case 'ArrowLeft':
        case 'ArrowUp':
          event.preventDefault();
          focusButton(index - 1);
          break;
        case 'Home':
          event.preventDefault();
          focusButton(0);
          break;
        case 'End':
          event.preventDefault();
          focusButton(FILTER_OPTIONS.length - 1);
          break;
        default:
          break;
      }
    },
    [focusButton],
  );

  return (
    <div
      role="toolbar"
      aria-label="Filter case studies by category"
      className={cx(
        'flex flex-wrap items-center justify-center gap-2 sm:gap-3',
        className,
      )}
    >
      {FILTER_OPTIONS.map((option, index) => {
        const isActive = option.value === activeCategory;
        return (
          <button
            key={option.value}
            ref={(node) => {
              buttonRefs.current[index] = node;
            }}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-pressed={isActive}
            tabIndex={isActive ? 0 : -1}
            onClick={() => onFilterChange(option.value)}
            onKeyDown={(event) => handleKeyDown(event, index)}
            className={cx(
              'pixel-border font-mono text-xs sm:text-sm uppercase tracking-widest',
              'px-4 py-2 sm:px-5 sm:py-2.5 transition-colors duration-200 ease-out',
              'focus:outline-none focus-visible:ring-2 focus-visible:ring-cyber-green focus-visible:ring-offset-2 focus-visible:ring-offset-matrix-black',
              isActive
                ? 'bg-cyber-green/20 text-cyber-green border-cyber-green shadow-[0_0_0_2px_theme(colors.cyber-green)]'
                : 'bg-matrix-black/60 text-gray-200 border-gray-600 hover:text-cyber-green hover:border-cyber-green',
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

export default FilterBar;
