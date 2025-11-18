
import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label } from 'recharts';
import { Language, HistoricalDataPoint } from '../../types';

interface TrendChartProps {
  historicalData: HistoricalDataPoint[];
  lang: Language;
}

const TrendChart: React.FC<TrendChartProps> = ({ historicalData, lang }) => {
  const chartData = historicalData
    .map(d => {
        const clicks = d.clicks || 0;
        const impressions = d.impressions || 0;
        const purchases = d.purchases || 0;
        const spend = d.spend || 0;
        const revenue = d.revenue || 0;

        return {
          date: d.date,
          formattedDate: new Date(d.date).toLocaleDateString(lang === 'ar' ? 'ar-SA' : 'en-US', { month: 'short', day: 'numeric' }),
          CTR: impressions > 0 ? (clicks / impressions) * 100 : 0,
          'Conversion Rate': clicks > 0 ? (purchases / clicks) * 100 : 0,
          ROAS: spend > 0 ? revenue / spend : 0,
          'نسبة النقر': impressions > 0 ? (clicks / impressions) * 100 : 0,
          'معدل التحويل': clicks > 0 ? (purchases / clicks) * 100 : 0,
          'العائد': spend > 0 ? revenue / spend : 0,
        };
    })
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-900/80 p-2 border border-gray-600 rounded shadow-lg text-sm">
          <p className="label font-bold text-white">{`${label}`}</p>
          {payload.map((p: any) => {
             const name = p.name || '';
             const isPercentage = name.includes('Rate') || name.includes('CTR') || name.includes('نسبة') || name.includes('معدل');
             const unit = isPercentage ? '%' : (name.includes('ROAS') || name.includes('العائد') ? 'x' : '');
             return (
                <p key={name} style={{ color: p.color }}>
                    {`${name}: ${p.value.toFixed(2)}${unit}`}
                </p>
             )
          })}
        </div>
      );
    }
    return null;
  };
  
  const ctrKey = lang === 'ar' ? 'نسبة النقر' : 'CTR';
  const convRateKey = lang === 'ar' ? 'معدل التحويل' : 'Conversion Rate';
  const roasKey = lang === 'ar' ? 'العائد' : 'ROAS';

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
      <h3 className="text-2xl font-bold mb-6 text-cyan-400">{lang === 'ar' ? 'تحليل اتجاهات الأداء' : 'Performance Trend Analysis'}</h3>
       <div className="w-full">
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={chartData} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#4A5568" />
            <XAxis dataKey="formattedDate" tick={{ fill: '#A0AEC0', fontSize: 12 }} />
            <YAxis 
              yAxisId="left" 
              tickFormatter={(tick) => `${tick.toFixed(1)}%`} 
              tick={{ fill: '#A0AEC0', fontSize: 12 }}
              stroke="#A78BFA"
            >
               <Label value={lang === 'ar' ? 'نسبة مئوية' : 'Percentage'} angle={-90} position="insideLeft" style={{ textAnchor: 'middle', fill: '#A0AEC0' }} />
            </YAxis>
            <YAxis 
              yAxisId="right" 
              orientation="right" 
              tickFormatter={(tick) => `${tick.toFixed(1)}x`} 
              tick={{ fill: '#A0AEC0', fontSize: 12 }}
              stroke="#F472B6"
            >
                <Label value={lang === 'ar' ? 'مضاعف' : 'Multiplier'} angle={-90} position="insideRight" style={{ textAnchor: 'middle', fill: '#A0AEC0' }} />
            </YAxis>
            <Tooltip content={<CustomTooltip />} cursor={{fill: 'rgba(100, 116, 139, 0.1)'}} />
            <Legend wrapperStyle={{ color: '#E2E8F0', direction: lang === 'ar' ? 'rtl' : 'ltr', paddingTop: '10px' }} />
            <Line yAxisId="left" type="monotone" name={ctrKey} dataKey={ctrKey} stroke="#2DD4BF" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 8 }} />
            <Line yAxisId="left" type="monotone" name={convRateKey} dataKey={convRateKey} stroke="#A78BFA" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 8 }} />
            <Line yAxisId="right" type="monotone" name={roasKey} dataKey={roasKey} stroke="#F472B6" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TrendChart;
