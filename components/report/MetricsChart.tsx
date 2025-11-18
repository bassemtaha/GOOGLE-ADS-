import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { AnalysisReport, Language } from '../../types';

interface MetricsChartProps {
  evaluations: AnalysisReport['metrics_evaluation'];
  lang: Language;
}

const MetricsChart: React.FC<MetricsChartProps> = ({ evaluations, lang }) => {
  const performanceChartData = [
    { 
      name: lang === 'ar' ? 'CTR' : 'CTR', 
      'Your Value': evaluations.ctr.value, 
      'Benchmark': evaluations.ctr.benchmark,
      'قيمتك': evaluations.ctr.value,
      'المعيار': evaluations.ctr.benchmark
    },
    { 
      name: lang === 'ar' ? 'معدل التحويل' : 'Conv. Rate', 
      'Your Value': evaluations.conversion_rate.value, 
      'Benchmark': evaluations.conversion_rate.benchmark,
      'قيمتك': evaluations.conversion_rate.value,
      'المعيار': evaluations.conversion_rate.benchmark
    },
    { 
      name: lang === 'ar' ? 'ROAS' : 'ROAS', 
      'Your Value': evaluations.roas.value, 
      'Benchmark': evaluations.roas.benchmark,
      'قيمتك': evaluations.roas.value,
      'المعيار': evaluations.roas.benchmark
    },
  ];

  const costChartData = [
     { 
      name: lang === 'ar' ? 'تكلفة النقرة' : 'CPC', 
      'Your Value': evaluations.cpc.value, 
      'Benchmark': evaluations.cpc.benchmark,
      'قيمتك': evaluations.cpc.value,
      'المعيار': evaluations.cpc.benchmark
    },
    { 
      name: lang === 'ar' ? 'تكلفة التحويل' : 'CPA', 
      'Your Value': evaluations.cpa.value, 
      'Benchmark': evaluations.cpa.benchmark,
      'قيمتك': evaluations.cpa.value,
      'المعيار': evaluations.cpa.benchmark
    },
  ];
  
  const yourValueKey = lang === 'ar' ? 'قيمتك' : 'Your Value';
  const benchmarkKey = lang === 'ar' ? 'المعيار' : 'Benchmark';

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-900/80 p-2 border border-gray-600 rounded shadow-lg text-sm">
          <p className="label font-bold text-white">{`${label}`}</p>
          <p className="intro text-cyan-400">{`${payload[0].name} : ${payload[0].value.toFixed(2)}`}</p>
          <p className="intro text-gray-400">{`${payload[1].name} : ${payload[1].value.toFixed(2)}`}</p>
        </div>
      );
    }
    return null;
  };

  const renderChart = (data: any[], title: string, titleAr: string) => (
    <div>
        <h4 className="text-lg font-semibold text-white mb-4 text-center">{lang === 'ar' ? titleAr : title}</h4>
        <ResponsiveContainer width="100%" height={250}>
            <BarChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#4A5568" />
                <XAxis dataKey="name" tick={{ fill: '#A0AEC0' }} />
                <YAxis tick={{ fill: '#A0AEC0' }} />
                <Tooltip content={<CustomTooltip />} cursor={{fill: 'rgba(100, 116, 139, 0.1)'}} />
                <Legend wrapperStyle={{ color: '#E2E8F0', direction: lang === 'ar' ? 'rtl' : 'ltr' }} />
                <Bar dataKey={yourValueKey} fill="#2DD4BF" />
                <Bar dataKey={benchmarkKey} fill="#718096" />
            </BarChart>
        </ResponsiveContainer>
    </div>
  );

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
      <h3 className="text-2xl font-bold mb-6 text-cyan-400">{lang === 'ar' ? 'المقارنة المرئية للمقاييس' : 'Visual Metric Comparison'}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {renderChart(performanceChartData, "Performance Metrics (Higher is better)", "مقاييس الأداء (الأعلى أفضل)")}
        {renderChart(costChartData, "Cost Metrics (Lower is better)", "مقاييس التكلفة (الأقل أفضل)")}
      </div>
    </div>
  );
};

export default MetricsChart;