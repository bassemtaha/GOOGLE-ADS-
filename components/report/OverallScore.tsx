
import React from 'react';
import { Language } from '../../types';

interface OverallScoreProps {
  score: number;
  status_en: string;
  status_ar: string;
  lang: Language;
}

const OverallScore: React.FC<OverallScoreProps> = ({ score, status_en, status_ar, lang }) => {
  const getScoreColor = (s: number) => {
    if (s >= 80) return 'bg-green-500';
    if (s >= 60) return 'bg-emerald-500';
    if (s >= 40) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const scoreColor = getScoreColor(score);

  return (
    <div className="bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-700 text-center">
      <h3 className="text-lg font-semibold text-gray-400 uppercase tracking-wider">
        {lang === 'ar' ? 'النتيجة الإجمالية للأداء' : 'Overall Performance Score'}
      </h3>
      <div className="my-4">
        <span className="text-7xl font-bold text-white">{score}</span>
        <span className="text-3xl text-gray-500">/100</span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-4 mb-4">
        <div
          className={`${scoreColor} h-4 rounded-full transition-all duration-1000 ease-out`}
          style={{ width: `${score}%` }}
        ></div>
      </div>
      <p className="text-xl font-bold" style={{color: scoreColor.replace('bg-','').replace('-500','')}}>
        <span className={`${scoreColor.replace('bg-', 'text-')} font-bold text-xl`}>
          {lang === 'ar' ? status_ar : status_en}
        </span>
      </p>
    </div>
  );
};

export default OverallScore;
