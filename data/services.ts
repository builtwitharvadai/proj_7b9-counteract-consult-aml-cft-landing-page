export interface Service {
  readonly id: string;
  readonly title: string;
  readonly summary: string;
  readonly highlights: ReadonlyArray<string>;
  readonly image: string;
  readonly imageAlt: string;
}

export const SERVICES: ReadonlyArray<Service> = [
  {
    id: 'aml-monitoring',
    title: 'AML Monitoring & Transaction Surveillance',
    summary:
      'Continuous transaction monitoring, typology tuning, and case-management design that surface real threats while cutting false-positive noise.',
    highlights: [
      'Risk-based rule libraries aligned to FATF typologies',
      'Model tuning informed by front-line investigations',
      'Regulator-ready audit trails and SAR quality reviews',
    ],
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    imageAlt:
      'Compliance analyst reviewing real-time transaction-monitoring dashboards in a modern financial-institution operations center',
  },
  {
    id: 'cft-prevention',
    title: 'CFT & Sanctions Screening',
    summary:
      'Threat-led counter-terrorist-financing programs, sanctions-list calibration, and cross-border payment risk controls that hold up to regulatory scrutiny.',
    highlights: [
      'Screening logic calibrated to jurisdictional risk',
      'Correspondent-banking risk reviews and remediation',
      'UN/OFAC/EU sanctions program design and testing',
    ],
    image:
      'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80',
    imageAlt:
      'Global-payments team collaborating on sanctions-screening controls to interdict terrorist-financing flows across correspondent banking corridors',
  },
  {
    id: 'fraud-detection',
    title: 'Fraud Detection & Behavioral Analytics',
    summary:
      'Data-driven fraud programs blending machine-learning models with expert investigator playbooks to detect emerging schemes early.',
    highlights: [
      'Behavioral analytics and anomaly detection design',
      'Model governance, drift monitoring, and validation',
      'Playbooks and MI to accelerate investigator throughput',
    ],
    image:
      'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80',
    imageAlt:
      'Data scientists and fraud investigators analyzing behavioral analytics on multiple screens to intercept sophisticated payment fraud',
  },
  {
    id: 'risk-assessment',
    title: 'Enterprise-Wide Risk Assessment',
    summary:
      'Structured enterprise-wide risk assessments that map inherent risk, control effectiveness, and residual exposure — with prioritized remediation roadmaps.',
    highlights: [
      'Inherent-risk scoring across products, channels, and geographies',
      'Control-effectiveness testing tied to regulator expectations',
      'Board-ready reporting and remediation planning',
    ],
    image:
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80',
    imageAlt:
      'Executive leadership team reviewing an enterprise-wide financial-crime risk assessment with prioritized remediation roadmaps',
  },
];

export default SERVICES;
