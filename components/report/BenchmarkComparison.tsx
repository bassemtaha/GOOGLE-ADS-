
import React from 'react';
import { AnalysisReport, Language, MetricEvaluation } from '../../types';

interface BenchmarkComparisonProps {
  evaluations: AnalysisReport['metrics_evaluation'];
  lang: Language;
}

const BenchmarkComparison: React.FC<BenchmarkComparisonProps> = ({ evaluations, lang }) => {
  
  const comparisons = [
    { metric_en: "CTR", metric_ar: "نسبة النقر", data: evaluations.ctr, unit: "%", higherIsBetter: true },
    { metric_en: "Conversion Rate", metric_ar: "معدل التحويل", data: evaluations.conversion_rate, unit: "%", higherIsBetter: true },
    { metric_en: "CPC", metric_ar: "تكلفة النقرة", data: evaluations.cpc, unit: "SAR", higherIsBetter: false },
    { metric_en: "CPA", metric_ar: "تكلفة التحويل", data: evaluations.cpa, unit: "SAR", higherIsBetter: false },
    { metric_en: "ROAS", metric_ar: "العائد على الإنفاق", data: evaluations.roas, unit: "x", higherIsBetter: true },
    ...(evaluations.impression_share ? [{ metric_en: "Impression Share", metric_ar: "حصة الظهور", data: evaluations.impression_share, unit: "%", higherIsBetter: true }] : []),
  ];
  
  const getIndicator = (value: number, benchmark: number, higherIsBetter: boolean) => {
    if (higherIsBetter) {
      return value >= benchmark ? { text_en: "Better", text_ar: "أفضل", color: "text-green-400" } : { text_en: "Worse", text_ar: "أسوأ", color: "text-red-400" };
    }
    return value <= benchmark ? { text_en: "Better", text_ar: "أفضل", color: "text-green-400" } : { text_en: "Worse", text_ar: "أسوأ", color: "text-red-400" };
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
      <h3 className="text-2xl font-bold mb-4 text-cyan-400">{lang === 'ar' ? 'مقارنة مع معايير السوق' : 'Market Benchmark Comparison'}</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-300">
          <thead className="text-xs text-gray-400 uppercase bg-gray-700">
            <tr>
              <th scope="col" className="px-4 py-3">{lang === 'ar' ? 'المقياس' : 'Metric'}</th>
              <th scope="col" className="px-4 py-3 text-center">{lang === 'ar' ? 'قيمتك' : 'Your Value'}</th>
              <th scope="col" className="px-4 py-3 text-center">{lang === 'ar' ? 'المعيار' : 'Benchmark'}</th>
              <th scope="col" className="px-4 py-3 text-center">{lang === 'ar' ? 'الأداء' : 'Performance'}</th>
            </tr>
          </thead>
          <tbody>
            {comparisons.map(({ metric_en, metric_ar, data, unit, higherIsBetter }) => {
                if (!data) return null;
                const indicator = getIndicator(data.value, data.benchmark, higherIsBetter);
                return (
                    <tr key={metric_en} className="border-b border-gray-700 hover:bg-gray-700/50">
                        <th scope="row" className="px-4 py-4 font-medium text-white whitespace-nowrap">{lang === 'ar' ? metric_ar : metric_en}</th>
                        <td className="px-4 py-4 text-center">{data.value.toFixed(2)} {unit}</td>
                        <td className="px-4 py-4 text-center">{data.benchmark.toFixed(2)} {unit}</td>
                        <td className={`px-4 py-4 text-center font-bold ${indicator.color}`}>{lang === 'ar' ? indicator.text_ar : indicator.text_en}</td>
                    </tr>
                );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BenchmarkComparison;
