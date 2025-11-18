
import React from 'react';
import { CampaignData, Language, HistoricalDataPoint, HistoricalDataErrors } from '../types';

interface HistoricalDataFormProps {
  historicalData: HistoricalDataPoint[];
  setCampaignData: React.Dispatch<React.SetStateAction<CampaignData>>;
  lang: Language;
  errors: HistoricalDataErrors;
}

const HistoricalDataForm: React.FC<HistoricalDataFormProps> = ({ historicalData, setCampaignData, lang, errors }) => {
  
  const handleDataChange = (index: number, field: keyof HistoricalDataPoint, value: string | number) => {
    const newData = [...historicalData];
    const target = newData[index];
    if (field === 'date') {
        target.date = value as string;
    } else {
        // @ts-ignore
        target[field] = parseFloat(value) || 0;
    }
    setCampaignData(prev => ({ ...prev, historicalData: newData }));
  };

  const addRow = () => {
    const lastDate = historicalData.length > 0 ? new Date(historicalData[historicalData.length - 1].date) : new Date();
    lastDate.setDate(lastDate.getDate() + 1);
    const newDate = lastDate.toISOString().split('T')[0];

    const newRow: HistoricalDataPoint = { date: newDate, impressions: 0, clicks: 0, spend: 0, purchases: 0, revenue: 0 };
    setCampaignData(prev => ({ ...prev, historicalData: [...(prev.historicalData || []), newRow] }));
  };

  const removeRow = (index: number) => {
    const newData = historicalData.filter((_, i) => i !== index);
    setCampaignData(prev => ({ ...prev, historicalData: newData }));
  };
  
  const headers = [
    { key: 'date', label_en: 'Date', label_ar: 'التاريخ', type: 'date' },
    { key: 'impressions', label_en: 'Impressions', label_ar: 'الظهور', type: 'number' },
    { key: 'clicks', label_en: 'Clicks', label_ar: 'النقرات', type: 'number' },
    { key: 'spend', label_en: 'Spend (SAR)', label_ar: 'الإنفاق (ريال)', type: 'number' },
    { key: 'purchases', label_en: 'Purchases', label_ar: 'المشتريات', type: 'number' },
    { key: 'revenue', label_en: 'Revenue (SAR)', label_ar: 'الإيرادات (ريال)', type: 'number' },
  ];

  return (
    <div className="mt-6 pt-6 border-t border-gray-700">
      <div className="overflow-x-auto rounded-lg">
        <table className="w-full min-w-[700px] text-sm text-left">
          <thead className="text-xs text-gray-400 uppercase bg-gray-900/50">
            <tr>
              {headers.map(h => <th key={h.key} scope="col" className="px-4 py-3">{lang === 'ar' ? h.label_ar : h.label_en}</th>)}
              <th scope="col" className="px-4 py-3 text-center" aria-label={lang === 'ar' ? 'إزالة' : 'Remove'}></th>
            </tr>
          </thead>
          <tbody>
            {historicalData.map((row, index) => {
              const rowErrors = errors[index] || {};
              return (
              <tr key={index} className="border-b border-gray-700 hover:bg-gray-700/50">
                {headers.map(h => {
                  const error = rowErrors[h.key];
                  return (
                  <td key={h.key} className="px-1 py-2">
                    <input
                      type={h.type}
                      value={row[h.key as keyof HistoricalDataPoint]}
                      onChange={(e) => handleDataChange(index, h.key as keyof HistoricalDataPoint, e.target.value)}
                      title={error || ''}
                      className={`w-full bg-gray-700 border rounded-md shadow-sm py-1.5 px-2 text-white focus:outline-none focus:ring-1 transition-colors ${error ? 'border-red-500 focus:ring-red-500' : 'border-gray-600 focus:ring-cyan-500 focus:border-cyan-500'}`}
                      min={h.type === 'number' ? '0' : undefined}
                      aria-invalid={!!error}
                    />
                  </td>
                )})}
                <td className="px-1 py-2 text-center">
                  <button onClick={() => removeRow(index)} className="text-gray-400 hover:text-red-400 font-bold text-xl" aria-label={`${lang === 'ar' ? 'إزالة الصف' : 'Remove row'} ${index + 1}`}>&times;</button>
                </td>
              </tr>
            )})}
          </tbody>
        </table>
      </div>
      <button onClick={addRow} className="mt-4 px-4 py-2 text-sm font-medium text-white bg-gray-600 rounded-md hover:bg-cyan-500 transition-colors">
        {lang === 'ar' ? 'إضافة صف' : 'Add Row'}
      </button>
    </div>
  );
};

export default HistoricalDataForm;
