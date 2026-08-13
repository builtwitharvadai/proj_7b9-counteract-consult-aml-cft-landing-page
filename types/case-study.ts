export type CaseStudyCategory =
  | 'AML'
  | 'CFT'
  | 'Fraud Detection'
  | 'Risk Assessment';

export type FilterCategory = 'all' | CaseStudyCategory;

export interface CaseStudyMetric {
  label: string;
  value: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  category: CaseStudyCategory;
  thumbnail: string;
  image: string;
  challenge: string;
  solution: string;
  results: string;
  metrics: CaseStudyMetric[];
  date: string;
  client?: string;
}
