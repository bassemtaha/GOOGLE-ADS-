
import React from 'react';
import { ActionPlan as ActionPlanType, Language, BilingualContent } from '../../types';

interface ActionPlanProps {
  actionPlan: ActionPlanType;
  lang: Language;
}

const ActionPlanSection: React.FC<{title_en: string; title_ar: string; data: BilingualContent; lang: Language; icon: string}> = ({title_en, title_ar, data, lang, icon}) => {
    const items = lang === 'ar' ? data.ar : data.en;
    if (!items || items.length === 0) return null;

    return (
        <div>
            <h4 className="text-lg font-semibold text-white mb-3">{icon} {lang === 'ar' ? title_ar : title_en}</h4>
            <ul className="space-y-2 list-disc list-inside pl-2">
                {items.map((action, index) => (
                    <li key={index} className="text-gray-300">{action}</li>
                ))}
            </ul>
        </div>
    )
}

const ActionPlan: React.FC<ActionPlanProps> = ({ actionPlan, lang }) => {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
      <h3 className="text-2xl font-bold mb-6 text-cyan-400">{lang === 'ar' ? 'خطة العمل التفصيلية' : 'Detailed Action Plan'}</h3>
      <div className="space-y-8">
        <ActionPlanSection title_en="Immediate Actions (0-7 days)" title_ar="إجراءات فورية (0-7 أيام)" data={actionPlan.immediate_actions} lang={lang} icon="🔴"/>
        <ActionPlanSection title_en="Short-Term Actions (1-4 weeks)" title_ar="إجراءات قصيرة المدى (1-4 أسابيع)" data={actionPlan.short_term_actions} lang={lang} icon="🟡"/>
        <ActionPlanSection title_en="Long-Term Actions (1-3 months)" title_ar="إجراءات طويلة المدى (1-3 أشهر)" data={actionPlan.long_term_actions} lang={lang} icon="🟢"/>
        <ActionPlanSection title_en="Testing Priorities" title_ar="أولويات الاختبار" data={actionPlan.testing_priorities} lang={lang} icon="🔬"/>
      </div>
    </div>
  );
};

export default ActionPlan;
