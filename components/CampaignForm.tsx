
import React, { useState, useEffect } from 'react';
import { CampaignData, Language, AllErrors } from '../types';
import { FORM_FIELDS, CATEGORIES, DEFAULT_CAMPAIGN_DATA } from '../constants';
import HistoricalDataForm from './HistoricalDataForm';
import { validateCampaignData } from '../utils/validation';

interface CampaignFormProps {
  campaignData: CampaignData;
  setCampaignData: React.Dispatch<React.SetStateAction<CampaignData>>;
  onAnalyze: () => void;
  isLoading: boolean;
  lang: Language;
}

const CampaignForm: React.FC<CampaignFormProps> = ({ campaignData, setCampaignData, onAnalyze, isLoading, lang }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [showHistorical, setShowHistorical] = useState(false);
  const [errors, setErrors] = useState<AllErrors>({ main: {}, historical: [] });

  useEffect(() => {
    const validationErrors = validateCampaignData(campaignData, lang);
    setErrors(validationErrors);
  }, [campaignData, lang]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type } = e.target;
    setCampaignData(prev => ({
      ...prev,
      [id]: type === 'number' ? parseFloat(value) || 0 : value,
    }));
  };
  
  const handleReset = () => {
    setCampaignData(DEFAULT_CAMPAIGN_DATA);
  };

  const hasErrors = Object.values(errors.main).some(e => !!e) || errors.historical.some(row => Object.values(row).some(e => !!e));

  return (
    <div className="bg-gray-800/60 p-6 rounded-2xl shadow-lg border border-gray-700">
      <div className="flex justify-between items-center cursor-pointer" onClick={() => setIsCollapsed(!isCollapsed)}>
        <h2 className="text-2xl font-bold text-white">
          {lang === 'ar' ? 'بيانات الحملة الإعلانية' : 'Campaign Data'}
        </h2>
        <button>
          <svg className={`w-6 h-6 text-gray-400 transition-transform transform ${isCollapsed ? '' : 'rotate-180'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
        </button>
      </div>
      
      {!isCollapsed && (
        <div className="mt-6">
          {CATEGORIES[lang].map((category) => (
            <div key={category} className="mb-8">
              <h3 className="text-xl font-semibold text-cyan-400 border-b-2 border-gray-600 pb-2 mb-4">
                {category}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
                {FORM_FIELDS.filter(f => (lang === 'ar' ? f.category_ar : f.category_en) === category).map(field => {
                  const fieldError = errors.main[field.id];
                  return (
                  <div key={field.id}>
                    <label htmlFor={field.id} className="block text-sm font-medium text-gray-300 mb-1">
                      {lang === 'ar' ? field.label_ar : field.label_en}
                    </label>
                    <input
                      type={field.type}
                      id={field.id}
                      step={field.step || 'any'}
                      value={campaignData[field.id as keyof CampaignData]}
                      onChange={handleChange}
                      className={`w-full bg-gray-700 border rounded-md shadow-sm py-2 px-3 text-white focus:outline-none transition-colors ${fieldError ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-600 focus:ring-cyan-500 focus:border-cyan-500'}`}
                      aria-invalid={!!fieldError}
                      aria-describedby={fieldError ? `${field.id}-error` : undefined}
                    />
                    {fieldError && <p id={`${field.id}-error`} className="mt-1 text-sm text-red-400">{fieldError}</p>}
                  </div>
                )})}
              </div>
            </div>
          ))}

          <div className="mt-6 border-t border-gray-700 pt-6">
            <button
              onClick={() => setShowHistorical(!showHistorical)}
              className="px-4 py-2 text-sm font-medium text-white bg-gray-700 rounded-md hover:bg-cyan-500 transition-colors flex items-center gap-2"
              aria-expanded={showHistorical}
            >
              {showHistorical ? (lang === 'ar' ? 'إخفاء البيانات التاريخية' : 'Hide Historical Data') : (lang === 'ar' ? 'إضافة بيانات تاريخية للاتجاهات' : 'Add Historical Data for Trends')}
              <svg className={`w-4 h-4 transition-transform transform ${showHistorical ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </button>
            {showHistorical && campaignData.historicalData && (
              <HistoricalDataForm 
                historicalData={campaignData.historicalData}
                setCampaignData={setCampaignData}
                lang={lang}
                errors={errors.historical}
              />
            )}
          </div>
        </div>
      )}
      
      <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-end">
        <button
          onClick={handleReset}
          disabled={isLoading}
          className="w-full sm:w-auto px-6 py-3 text-base font-semibold text-white bg-gray-600 rounded-lg shadow-md hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75 disabled:opacity-50 transition-colors"
        >
          {lang === 'ar' ? 'إعادة تعيين للبيانات المثال' : 'Reset to Example Data'}
        </button>
        <button
          onClick={onAnalyze}
          disabled={isLoading || hasErrors}
          className="w-full sm:w-auto px-8 py-3 text-base font-semibold text-gray-900 bg-cyan-400 rounded-lg shadow-md hover:bg-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-opacity-75 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? (lang === 'ar' ? 'جاري التحليل...' : 'Analyzing...') : (lang === 'ar' ? 'تحليل الأداء' : 'Analyze Performance')}
        </button>
      </div>
    </div>
  );
};

export default CampaignForm;
