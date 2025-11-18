
import React from 'react';
import { CampaignData, Language, AnalysisReport } from '../../types';

interface KeyMetricsSummaryProps {
  metrics: CampaignData;
  evaluations: AnalysisReport['metrics_evaluation'];
  lang: Language;
}

const getRatingColor = (rating: string | undefined) => {
  switch (rating?.toLowerCase()) {
    case 'excellent': return 'text-green-400';
    case 'good': return 'text-emerald-400';
    case 'average': return 'text-yellow-400';
    case 'below average': return 'text-orange-400';
    case 'poor': return 'text-red-400';
    default: return 'text-gray-400';
  }
};

const KeyMetricsSummary: React.FC<KeyMetricsSummaryProps> = ({ metrics, evaluations, lang }) => {

  const keyMetricsConfig = [
    { key: 'spend', label_en: 'Total Spend', label_ar: 'الإنفاق الإجمالي', format: (v: number) => `${v.toFixed(2)} SAR` },
    { key: 'revenue', label_en: 'Total Revenue', label_ar: 'الإيرادات', format: (v: number) => `${v.toFixed(2)} SAR` },
    { key: 'impressions', label_en: 'Impressions', label_ar: 'مرات الظهور', format: (v: number) => v.toLocaleString() },
    { key: 'clicks', label_en: 'Clicks', label_ar: 'النقرات', format: (v: number) => v.toLocaleString() },
    { key: 'purchases', label_en: 'Purchases', label_ar: 'المشتريات', format: (v: number) => v.toLocaleString() },
    { key: 'ctr', label_en: 'CTR', label_ar: 'نسبة النقر', format: (v: number) => `${v.toFixed(2)}%`, evalKey: 'ctr' },
    { key: 'cpc', label_en: 'CPC', label_ar: 'تكلفة النقرة', format: (v: number) => `${v.toFixed(2)} SAR`, evalKey: 'cpc' },
    { key: 'conversion_rate', label_en: 'Conversion Rate', label_ar: 'معدل التحويل', format: (v: number) => `${v.toFixed(2)}%`, evalKey: 'conversion_rate' },
    { key: 'cpa', label_en: 'CPA', label_ar: 'تكلفة التحويل', format: (v: number) => `${v.toFixed(2)} SAR`, evalKey: 'cpa' },
    { key: 'roas', label_en: 'ROAS', label_ar: 'العائد على الإنفاق', format: (v: number) => `${v.toFixed(2)}x`, evalKey: 'roas' },
  ];

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
      <h3 className="text-2xl font-bold mb-4 text-cyan-400">{lang === 'ar' ? 'ملخص المقاييس الرئيسية' : 'Key Metrics Summary'}</h3>
      <div className="grid grid-cols-2 gap-4">
        {keyMetricsConfig.map(({ key, label_en, label_ar, format, evalKey }) => {
          const value = metrics[key as keyof CampaignData];
          const evaluation = evalKey ? evaluations[evalKey as keyof typeof evaluations] : undefined;
          const ratingText = evaluation ? (lang === 'ar' ? evaluation.rating_ar : evaluation.rating_en) : '';
          const ratingColor = getRatingColor(evaluation?.rating_en);

          return (
            <div key={key} className="bg-gray-700/50 p-3 rounded-md">
              <p className="text-sm text-gray-400">{lang === 'ar' ? label_ar : label_en}</p>
              <p className="text-xl font-bold text-white">{format(value)}</p>
              {evaluation && (
                 <p className={`text-sm font-semibold ${ratingColor}`}>{ratingText}</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default KeyMetricsSummary;
