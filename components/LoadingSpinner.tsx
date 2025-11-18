
import React from 'react';
import { Language } from '../types';

const LoadingSpinner: React.FC<{ lang: Language }> = ({ lang }) => (
  <div className="text-center p-8 mt-8 bg-gray-800/50 rounded-lg">
    <div className="flex justify-center items-center mb-4">
      <svg className="animate-spin -ml-1 mr-3 h-10 w-10 text-cyan-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    </div>
    <p className="text-xl font-semibold text-white">{lang === 'ar' ? 'يقوم الذكاء الاصطناعي بتحليل بياناتك...' : 'AI is analyzing your data...'}</p>
    <p className="text-gray-400">{lang === 'ar' ? 'قد يستغرق هذا بضع ثوانٍ.' : 'This might take a few seconds.'}</p>
  </div>
);

export default LoadingSpinner;
