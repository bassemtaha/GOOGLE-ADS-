
import React from 'react';
import { BilingualContent, Language } from '../../types';

interface InsightsSectionProps {
  title_en: string;
  title_ar: string;
  data: BilingualContent;
  lang: Language;
  icon: string;
  color: string;
}

const InsightsSection: React.FC<InsightsSectionProps> = ({ title_en, title_ar, data, lang, icon, color }) => {
  const content = lang === 'ar' ? data.ar : data.en;

  if (!content || content.length === 0) {
    return null;
  }

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
      <h3 className={`text-2xl font-bold mb-4 ${color}`}>
        {icon} {lang === 'ar' ? title_ar : title_en}
      </h3>
      <ul className="space-y-3">
        {content.map((item, index) => (
          <li key={index} className="flex items-start">
            <span className={`mr-3 ${lang === 'ar' ? 'ml-3' : 'mr-3'}`}>{icon}</span>
            <p className="text-gray-300">{item}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InsightsSection;
