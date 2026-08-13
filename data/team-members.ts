import type { TeamMember } from '../types/team';

export const MISSION_STATEMENT =
  'At CounterAct Consult, our mission is to fortify financial institutions against money laundering and terrorist financing through world-class AML/CFT expertise. We combine deep regulatory knowledge, cutting-edge technology, and unwavering integrity to help our clients build trust, protect their reputations, and stay ahead of an ever-evolving threat landscape.';

export interface CoreValue {
  readonly title: string;
  readonly description: string;
}

export const CORE_VALUES: ReadonlyArray<CoreValue> = [
  {
    title: 'Integrity',
    description:
      'We hold ourselves to the highest ethical standards. Every recommendation, report, and remediation plan is built on transparent, evidence-based analysis our clients and regulators can trust.',
  },
  {
    title: 'Expertise',
    description:
      'Our consultants bring decades of combined experience in AML/CFT, fraud detection, and financial crime compliance — with credentials from leading regulators, banks, and technology firms.',
  },
  {
    title: 'Client-First',
    description:
      'We treat every engagement as a partnership. Our solutions are tailored to each institution’s risk profile, operational reality, and strategic ambitions — never templated or theoretical.',
  },
  {
    title: 'Innovation',
    description:
      'We continuously evaluate emerging RegTech, machine-learning models, and typologies so our clients benefit from the most effective controls available — not yesterday’s playbook.',
  },
];

export const TEAM_MEMBERS: ReadonlyArray<TeamMember> = [
  {
    id: 'elena-marsh',
    name: 'Elena Marsh',
    title: 'CEO & Founder',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
    bio: 'Elena founded CounterAct Consult after two decades leading AML programs at global tier-one banks and advising national financial intelligence units. She has designed enterprise risk frameworks reviewed favorably by FATF-style regional bodies and testified before regulators on complex laundering typologies. Elena holds a CAMS certification and an MSc in Financial Regulation from the London School of Economics.',
    expertise: ['AML', 'Regulatory Compliance', 'Risk Assessment'],
    linkedIn: 'https://www.linkedin.com/in/elena-marsh',
  },
  {
    id: 'marcus-okafor',
    name: 'Marcus Okafor',
    title: 'Head of CFT Advisory',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
    bio: 'Marcus specializes in counter-terrorist financing, sanctions screening, and cross-border payment risk. He previously led CFT strategy at a multilateral development bank and has advised regulators across three continents on implementing UN Security Council resolutions. His practical, threat-led approach has helped clients dismantle high-risk correspondent-banking relationships without disrupting legitimate flows.',
    expertise: ['CFT', 'Sanctions Screening', 'Financial Crime'],
    linkedIn: 'https://www.linkedin.com/in/marcus-okafor',
  },
  {
    id: 'priya-shah',
    name: 'Priya Shah',
    title: 'Fraud Detection Analyst',
    photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80',
    bio: 'Priya designs advanced transaction-monitoring and behavioral-analytics programs that separate real threats from noise. Her background blends data science with front-line investigations, and she has authored typologies now referenced by industry SARs training. Priya is a Certified Fraud Examiner (CFE) and a regular speaker on machine learning in financial crime detection.',
    expertise: ['Fraud Detection', 'Transaction Monitoring', 'Data Analytics'],
    linkedIn: 'https://www.linkedin.com/in/priya-shah',
  },
  {
    id: 'daniel-chen',
    name: 'Daniel Chen',
    title: 'Compliance Technology Lead',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=800&q=80',
    bio: 'Daniel bridges compliance and engineering, guiding clients through vendor selection, tuning, and end-to-end RegTech implementations. He has architected KYC and screening platforms for both challenger banks and legacy institutions, cutting false-positive rates while raising true-hit yields. Daniel is CAMS-certified and holds a background in cybersecurity engineering.',
    expertise: ['Compliance Technology', 'KYC', 'RegTech'],
    linkedIn: 'https://www.linkedin.com/in/daniel-chen',
  },
];

export default TEAM_MEMBERS;
