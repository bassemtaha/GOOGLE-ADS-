
export type Language = 'en' | 'ar';

export interface HistoricalDataPoint {
  date: string;
  impressions: number;
  clicks: number;
  spend: number;
  purchases: number;
  revenue: number;
}

export interface CampaignData {
  budget_daily: number;
  campaign_type: string;
  impressions: number;
  clicks: number;
  ctr: number;
  spend: number;
  purchases: number;
  revenue: number;
  cpc: number;
  conversion_rate: number;
  cpa: number;
  roas: number;
  cpm: number;
  impression_share: number;
  lost_is_budget: number;
  lost_is_rank: number;
  optimization_score: number;
  all_conversions: number;
  all_conversion_rate: number;
  cost_per_all_conversions: number;
  historicalData?: HistoricalDataPoint[];
}

export interface MetricEvaluation {
  value: number;
  rating_en: string;
  rating_ar: string;
  score: number;
  benchmark: number;
}

export interface BilingualContent {
  en: string[];
  ar: string[];
}

export interface ActionPlan {
    immediate_actions: BilingualContent;
    short_term_actions: BilingualContent;
    long_term_actions: BilingualContent;
    testing_priorities: BilingualContent;
}

export interface AnalysisReport {
  overall_score: number;
  status_en: string;
  status_ar: string;
  metrics_evaluation: {
    ctr: MetricEvaluation;
    conversion_rate: MetricEvaluation;
    cpc: MetricEvaluation;
    cpa: MetricEvaluation;
    roas: MetricEvaluation;
    impression_share?: MetricEvaluation;
  };
  strengths: BilingualContent;
  weaknesses: BilingualContent;
  recommendations: BilingualContent;
  priority_actions: BilingualContent;
  detailed_insights: BilingualContent;
  action_plan: ActionPlan;
  final_summary_en: string[];
  final_summary_ar: string[];
  main_focus_en: string[];
  main_focus_ar: string[];
}

// Validation Error Types
export type FormErrors = {
  [key: string]: string;
};

export type HistoricalDataErrors = Array<FormErrors>;

export interface AllErrors {
  main: FormErrors;
  historical: HistoricalDataErrors;
}
