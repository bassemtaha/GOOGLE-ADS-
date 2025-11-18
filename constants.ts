
import { CampaignData, HistoricalDataPoint } from './types';

export const FORM_FIELDS = [
  // Basic Metrics
  { id: 'budget_daily', label_en: 'Daily Budget (SAR)', label_ar: 'الميزانية اليومية (ريال)', type: 'number', category_en: 'Campaign Setup', category_ar: 'إعداد الحملة' },
  { id: 'spend', label_en: 'Total Spend (SAR)', label_ar: 'الإنفاق الإجمالي (ريال)', type: 'number', category_en: 'Cost', category_ar: 'التكلفة' },
  { id: 'revenue', label_en: 'Total Revenue (SAR)', label_ar: 'الإيرادات الإجمالية (ريال)', type: 'number', category_en: 'Results', category_ar: 'النتائج' },
  { id: 'impressions', label_en: 'Impressions', label_ar: 'مرات الظهور', type: 'number', category_en: 'Traffic', category_ar: 'الزيارات' },
  { id: 'clicks', label_en: 'Clicks', label_ar: 'النقرات', type: 'number', category_en: 'Traffic', category_ar: 'الزيارات' },
  { id: 'purchases', label_en: 'Purchases', label_ar: 'المشتريات', type: 'number', category_en: 'Results', category_ar: 'النتائج' },
  
  // Calculated Metrics (often provided by Google Ads)
  { id: 'ctr', label_en: 'CTR (%)', label_ar: 'نسبة النقر (%)', type: 'number', step: '0.01', category_en: 'Performance', category_ar: 'الأداء' },
  { id: 'cpc', label_en: 'CPC (SAR)', label_ar: 'تكلفة النقرة (ريال)', type: 'number', step: '0.01', category_en: 'Cost', category_ar: 'التكلفة' },
  { id: 'conversion_rate', label_en: 'Conversion Rate (%)', label_ar: 'معدل التحويل (%)', type: 'number', step: '0.01', category_en: 'Performance', category_ar: 'الأداء' },
  { id: 'cpa', label_en: 'CPA (SAR)', label_ar: 'تكلفة التحويل (ريال)', type: 'number', step: '0.01', category_en: 'Cost', category_ar: 'التكلفة' },
  { id: 'roas', label_en: 'ROAS', label_ar: 'العائد على الإنفاق', type: 'number', step: '0.01', category_en: 'Performance', category_ar: 'الأداء' },
  { id: 'cpm', label_en: 'CPM (SAR)', label_ar: 'تكلفة الألف ظهور (ريال)', type: 'number', step: '0.01', category_en: 'Cost', category_ar: 'التكلفة' },

  // Advanced Metrics
  { id: 'impression_share', label_en: 'Impression Share (%)', label_ar: 'حصة الظهور (%)', type: 'number', step: '0.1', category_en: 'Advanced', category_ar: 'مقاييس متقدمة' },
  { id: 'lost_is_budget', label_en: 'Lost IS (Budget) (%)', label_ar: 'الفقد بسبب الميزانية (%)', type: 'number', step: '0.01', category_en: 'Advanced', category_ar: 'مقاييس متقدمة' },
  { id: 'lost_is_rank', label_en: 'Lost IS (Rank) (%)', label_ar: 'الفقد بسبب الترتيب (%)', type: 'number', step: '0.01', category_en: 'Advanced', category_ar: 'مقاييس متقدمة' },
  { id: 'optimization_score', label_en: 'Optimization Score (%)', label_ar: 'نقاط التحسين (%)', type: 'number', step: '0.1', category_en: 'Advanced', category_ar: 'مقاييس متقدمة' },

  // Additional Metrics
  { id: 'all_conversions', label_en: 'All Conversions', label_ar: 'إجمالي التحويلات', type: 'number', category_en: 'Additional', category_ar: 'مقاييس إضافية' },
  { id: 'all_conversion_rate', label_en: 'All Conversion Rate (%)', label_ar: 'معدل التحويل الشامل (%)', type: 'number', step: '0.01', category_en: 'Additional', category_ar: 'مقاييس إضافية' },
  { id: 'cost_per_all_conversions', label_en: 'Cost / All Conversions (SAR)', label_ar: 'التكلفة لكل تحويل شامل (ريال)', type: 'number', step: '0.01', category_en: 'Additional', category_ar: 'مقاييس إضافية' },
];

export const CATEGORIES = {
    'en': ['Campaign Setup', 'Traffic', 'Cost', 'Results', 'Performance', 'Advanced', 'Additional'],
    'ar': ['إعداد الحملة', 'الزيارات', 'التكلفة', 'النتائج', 'الأداء', 'مقاييس متقدمة', 'مقاييس إضافية']
};

export const DEFAULT_HISTORICAL_DATA: HistoricalDataPoint[] = [
    { date: '2024-05-01', impressions: 320, clicks: 30, spend: 70, purchases: 0, revenue: 0 },
    { date: '2024-05-02', impressions: 350, clicks: 35, spend: 80, purchases: 1, revenue: 250 },
    { date: '2024-05-03', impressions: 330, clicks: 38, spend: 85, purchases: 0, revenue: 0 },
    { date: '2024-05-04', impressions: 400, clicks: 45, spend: 100, purchases: 0, revenue: 0 },
    { date: '2024-05-05', impressions: 380, clicks: 42, spend: 95, purchases: 1, revenue: 350 },
    { date: '2024-05-06', impressions: 420, clicks: 50, spend: 110, purchases: 0, revenue: 0 },
    { date: '2024-05-07', impressions: 450, clicks: 55, spend: 120, purchases: 2, revenue: 699 },
];


export const DEFAULT_CAMPAIGN_DATA: CampaignData = {
  budget_daily: 125,
  campaign_type: "Search",
  impressions: 2400,
  clicks: 253,
  ctr: 10.54,
  spend: 550,
  purchases: 1,
  revenue: 699,
  cpc: 2.17,
  conversion_rate: 0.40,
  cpa: 550,
  roas: 1.27,
  cpm: 229.17,
  impression_share: 9.5,
  lost_is_budget: 5.11,
  lost_is_rank: 91,
  optimization_score: 73.5,
  all_conversions: 4,
  all_conversion_rate: 1.58,
  cost_per_all_conversions: 137.5,
  historicalData: DEFAULT_HISTORICAL_DATA,
};