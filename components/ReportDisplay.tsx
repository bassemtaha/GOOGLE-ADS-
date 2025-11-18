
import React, { useState } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { AnalysisReport, CampaignData, Language } from '../types';
import OverallScore from './report/OverallScore';
import KeyMetricsSummary from './report/KeyMetricsSummary';
import BenchmarkComparison from './report/BenchmarkComparison';
import InsightsSection from './report/InsightsSection';
import ActionPlan from './report/ActionPlan';
import MetricsChart from './report/MetricsChart';
import TrendChart from './report/TrendChart';

interface ReportDisplayProps {
  report: AnalysisReport;
  lang: Language;
  campaignData: CampaignData;
}

const ReportDisplay: React.FC<ReportDisplayProps> = ({ report, lang, campaignData }) => {
  const [isExporting, setIsExporting] = useState(false);

  const handleExportPDF = () => {
    setIsExporting(true);
    const reportElement = document.getElementById('report-container');
    if (!reportElement) {
        setIsExporting(false);
        console.error("Report element not found!");
        return;
    }

    html2canvas(reportElement, {
        scale: 2, // Higher scale for better quality
        useCORS: true,
        backgroundColor: '#111827' 
    }).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
            orientation: 'p',
            unit: 'mm',
            format: 'a4',
        });

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;
        const ratio = canvasWidth / pdfWidth;
        const imgHeight = canvasHeight / ratio;
        
        let heightLeft = imgHeight;
        let position = 0;
        const pageHeight = pdf.internal.pageSize.getHeight();

        pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft > 0) {
            position = position - pageHeight;
            pdf.addPage();
            pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
            heightLeft -= pageHeight;
        }
        
        pdf.save('Google-Ads-Analysis-Report.pdf');
    }).catch(err => {
        console.error("Error generating PDF:", err);
    }).finally(() => {
        setIsExporting(false);
    });
  };


  return (
    <div className="space-y-8">
       <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 p-4 bg-gray-900/50 rounded-lg border border-gray-700">
        <h2 className="text-2xl md:text-3xl font-bold text-white">{lang === 'ar' ? 'تقرير التحليل الشامل' : 'Comprehensive Analysis Report'}</h2>
        <button
            onClick={handleExportPDF}
            disabled={isExporting}
            className="flex items-center justify-center gap-2 w-full sm:w-auto px-4 py-2 text-sm font-medium text-white bg-gray-700 rounded-md hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-cyan-500 transition-colors disabled:opacity-60 disabled:cursor-wait"
            aria-live="polite"
        >
            {isExporting ? (
                <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>{lang === 'ar' ? 'جاري التصدير...' : 'Exporting...'}</span>
                </>
            ) : (
                <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    <span>{lang === 'ar' ? 'تصدير PDF' : 'Export PDF'}</span>
                </>
            )}
        </button>
      </div>

      <div id="report-container" className="space-y-8 bg-gray-900 p-4 sm:p-6 rounded-lg">
          <OverallScore score={report.overall_score} status_en={report.status_en} status_ar={report.status_ar} lang={lang} />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <KeyMetricsSummary metrics={campaignData} evaluations={report.metrics_evaluation} lang={lang} />
            <BenchmarkComparison evaluations={report.metrics_evaluation} lang={lang} />
          </div>

          <MetricsChart evaluations={report.metrics_evaluation} lang={lang} />

          {campaignData.historicalData && campaignData.historicalData.length > 1 && (
            <TrendChart historicalData={campaignData.historicalData} lang={lang} />
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <InsightsSection title_en="Strengths" title_ar="نقاط القوة" data={report.strengths} lang={lang} icon="💪" color="text-green-400" />
            <InsightsSection title_en="Weaknesses" title_ar="نقاط الضعف" data={report.weaknesses} lang={lang} icon="⚠️" color="text-yellow-400" />
          </div>

           <InsightsSection title_en="Detailed Insights" title_ar="رؤى تفصيلية" data={report.detailed_insights} lang={lang} icon="💡" color="text-blue-400" />
           <InsightsSection title_en="Priority Actions" title_ar="إجراءات عاجلة ذات أولوية" data={report.priority_actions} lang={lang} icon="🔥" color="text-red-400" />
           <InsightsSection title_en="Recommendations" title_ar="التوصيات" data={report.recommendations} lang={lang} icon="✅" color="text-cyan-400" />
          
          <ActionPlan actionPlan={report.action_plan} lang={lang} />

          <div className="bg-gray-800/50 p-6 rounded-lg shadow-lg border border-gray-700">
            <h3 className="text-2xl font-bold mb-4 text-cyan-400">{lang === 'ar' ? 'الخلاصة النهائية' : 'Final Summary'}</h3>
            <div className={`space-y-4 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
                <p className="text-lg text-gray-300">
                    {(lang === 'ar' ? report.final_summary_ar : report.final_summary_en)?.join(' ') ?? ''}
                </p>
                <div className="border-t border-gray-600 pt-4">
                    <h4 className="font-bold text-lg text-white mb-2">{lang === 'ar' ? 'التركيز الرئيسي:' : 'Main Focus:'}</h4>
                    <ul className="list-disc list-inside space-y-2 text-gray-300">
                        {(lang === 'ar' ? report.main_focus_ar : report.main_focus_en)?.map((focus, index) => (
                            <li key={index}>{focus}</li>
                        ))}
                    </ul>
                </div>
            </div>
          </div>
      </div>
    </div>
  );
};

export default ReportDisplay;
