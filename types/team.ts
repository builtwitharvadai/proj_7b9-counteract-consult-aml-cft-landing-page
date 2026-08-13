export type ExpertiseArea =
  | 'AML'
  | 'CFT'
  | 'Fraud Detection'
  | 'Risk Assessment'
  | 'Regulatory Compliance'
  | 'Sanctions Screening'
  | 'KYC'
  | 'Transaction Monitoring'
  | 'Compliance Technology'
  | 'Financial Crime'
  | 'Data Analytics'
  | 'RegTech';

export interface TeamMember {
  id: string;
  name: string;
  title: string;
  photo: string;
  bio: string;
  expertise: ReadonlyArray<ExpertiseArea | string>;
  linkedIn?: string;
}
