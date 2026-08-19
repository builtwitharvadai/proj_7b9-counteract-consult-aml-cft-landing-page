import React from 'react';
import styles from './Services.module.css';

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
}

export interface ServicesProps {
  heading?: string;
  services?: ServiceItem[];
}

const DEFAULT_SERVICES: ServiceItem[] = [
  {
    id: 'aml',
    title: 'AML Program Design',
    description:
      'End-to-end anti-money-laundering framework aligned with FATF and local regulatory expectations.',
  },
  {
    id: 'cft',
    title: 'CFT Advisory',
    description:
      'Counter-Financing-of-Terrorism controls, threat modeling, and typology-driven detection tuning.',
  },
  {
    id: 'risk',
    title: 'Risk Assessment',
    description:
      'Institution-wide inherent and residual risk assessments with regulator-ready evidence.',
  },
  {
    id: 'fraud',
    title: 'Fraud Detection',
    description:
      'Behavioral analytics, rule engineering, and case management to reduce false positives.',
  },
];

export function Services({
  heading = 'What we do',
  services = DEFAULT_SERVICES,
}: ServicesProps): JSX.Element {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className={`${styles.section} bg-matrix-black`}
    >
      <div className={styles.container}>
        <header className={styles.header}>
          <span
            className={`${styles.eyebrow} bg-brand-blue/15 border-brand-blue text-brand-blue`}
          >
            Services
          </span>
          <h2
            id="services-heading"
            className={`${styles.title} font-heading text-white`}
          >
            {heading}
          </h2>
        </header>
        <ul className={styles.grid}>
          {services.map((service) => (
            <li
              key={service.id}
              className={`${styles.card} border-brand-blue text-white`}
            >
              <h3 className={`${styles.cardTitle} text-brand-blue font-heading`}>
                {service.title}
              </h3>
              <p className={`${styles.cardBody} font-body`}>
                {service.description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Services;
