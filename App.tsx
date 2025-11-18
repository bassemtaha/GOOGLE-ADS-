
import React, { useState, useEffect } from 'react';
import { CampaignData, AnalysisReport, Language } from './types';
import { DEFAULT_CAMPAIGN_DATA } from './constants';
import { analyzeCampaignWithGemini } from './services/geminiService';
import Header from './components/Header';
import CampaignForm from './components/CampaignForm';
import ReportDisplay from './components/ReportDisplay';
import LoadingSpinner from './components/LoadingSpinner';

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('ar');
  const [campaignData, setCampaignData] = useState<CampaignData>(DEFAULT_CAMPAIGN_DATA);
  const [analysisResult, setAnalysisResult] = useState<AnalysisReport | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);
  
  const handleAnalyze = async () => {
    setIsLoading(true);
    setError(null);
    setAnalysisResult(null);
    try {
      const result = await analyzeCampaignWithGemini(campaignData);
      setAnalysisResult(result);
    } catch (e) {
      console.error(e);
      setError(lang === 'ar' ? 'حدث خطأ أثناء تحليل البيانات. يرجى المحاولة مرة أخرى.' : 'An error occurred during analysis. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`min-h-screen bg-gray-900 text-white ${lang === 'ar' ? 'font-cairo' : 'font-sans'}`}>
      <Header lang={lang} setLang={setLang} />
      <main className="container mx-auto p-4 md:p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-5xl font-bold text-cyan-400">
            {lang === 'ar' ? 'برنامج تحليل إعلانات Google الاحترافي' : 'Professional Google Ads Analyzer'}
          </h1>
          <p className="text-gray-400 mt-2 text-lg">
            {lang === 'ar' ? 'احصل على رؤى قابلة للتنفيذ لحملاتك في السوق السعودي' : 'Get actionable insights for your campaigns in the Saudi market'}
          </p>
        </div>

        <CampaignForm 
          campaignData={campaignData} 
          setCampaignData={setCampaignData}
          onAnalyze={handleAnalyze}
          isLoading={isLoading}
          lang={lang}
        />

        {isLoading && <LoadingSpinner lang={lang} />}
        
        {error && <div className="mt-8 text-center bg-red-900/50 border border-red-600 text-red-300 p-4 rounded-lg">{error}</div>}
        
        {analysisResult && !isLoading && (
          <div className="mt-8">
            <ReportDisplay report={analysisResult} lang={lang} campaignData={campaignData} />
          </div>
        )}
      </main>
      <footer className="text-center p-4 text-gray-500 text-sm">
        <p>Version 2.0 - Saudi Market Benchmarks</p>
      </footer>
    </div>
  );
};

export default App;
