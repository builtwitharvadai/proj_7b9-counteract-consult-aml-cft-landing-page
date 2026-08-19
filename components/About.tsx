import React from 'react';
import styles from './About.module.css';

export interface AboutStat {
  label: string;
  value: string;
}

export interface AboutProps {
  heading?: string;
  body?: string;
  stats?: AboutStat[];
}

const DEFAULT_STATS: AboutStat[] = [
  { label: 'Engagements delivered', value: '120+' },
  { label: 'Countries covered', value: '18' },
  { label: 'Avg. false-positive reduction', value: '35%' },
];

export function About({
  heading = 'About CounterAct Consult',
  body = 'We help financial institutions build regulator-ready AML, CFT, fraud, and risk-assessment programs. Compliance is our priority. Trust is our promise.',
  stats = DEFAULT_STATS,
}: AboutProps): JSX.Element {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className={`${styles.section} bg-matrix-black`}
    >
      <div className={styles.container}>
        <header className={styles.header}>
          <span
            className={`${styles.eyebrow} bg-brand-blue/15 border-brand-blue text-brand-blue`}
          >
            About
          </span>
          <h2
            id="about-heading"
            className={`${styles.title} font-heading text-white`}
          >
            {heading}
          </h2>
          <p className={`${styles.body} font-body`}>{body}</p>
        </header>

        <dl className={styles.stats}>
          {stats.map((stat) => (
            <div
              key={stat.label}
              className={`${styles.stat} border-brand-blue`}
            >
              <dt className={`${styles.statLabel} text-brand-blue`}>
                {stat.label}
              </dt>
              <dd className={`${styles.statValue} text-white font-heading`}>
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

export default About;
