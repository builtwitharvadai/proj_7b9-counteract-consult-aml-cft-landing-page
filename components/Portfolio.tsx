import React from 'react';
import styles from './Portfolio.module.css';

export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  outcome: string;
}

export interface PortfolioProps {
  heading?: string;
  items?: PortfolioItem[];
}

const DEFAULT_ITEMS: PortfolioItem[] = [
  {
    id: 'tier1-bank',
    title: 'Tier-1 Bank AML Overhaul',
    category: 'AML',
    outcome: '38% reduction in false positives.',
  },
  {
    id: 'payments-cft',
    title: 'Cross-Border Payments CFT',
    category: 'CFT',
    outcome: 'Zero regulator findings post-audit.',
  },
  {
    id: 'fintech-fraud',
    title: 'Fintech Fraud Analytics',
    category: 'Fraud',
    outcome: '2.4x faster case resolution.',
  },
];

export function Portfolio({
  heading = 'Case studies',
  items = DEFAULT_ITEMS,
}: PortfolioProps): JSX.Element {
  return (
    <section
      id="portfolio"
      aria-labelledby="portfolio-heading"
      className={`${styles.section} bg-matrix-black`}
    >
      <div className={styles.container}>
        <header className={styles.header}>
          <span
            className={`${styles.eyebrow} bg-brand-blue/15 border-brand-blue text-brand-blue`}
          >
            Our Work
          </span>
          <h2
            id="portfolio-heading"
            className={`${styles.title} font-heading text-white`}
          >
            {heading}
          </h2>
        </header>
        <ul className={styles.grid}>
          {items.map((item) => (
            <li
              key={item.id}
              className={`${styles.card} border-brand-blue text-white`}
            >
              <span
                className={`${styles.tag} bg-brand-blue text-white`}
                aria-label={`Category ${item.category}`}
              >
                {item.category}
              </span>
              <h3
                className={`${styles.cardTitle} text-white font-heading`}
              >
                {item.title}
              </h3>
              <p className={`${styles.outcome} text-brand-blue font-body`}>
                {item.outcome}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Portfolio;
