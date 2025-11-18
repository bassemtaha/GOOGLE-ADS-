
import { GoogleGenAI, Type } from "@google/genai";
import { CampaignData, AnalysisReport } from './types';

const API_KEY = process.env.API_KEY;
if (!API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const analysisSchema = {
    type: Type.OBJECT,
    properties: {
        overall_score: { type: Type.INTEGER },
        status_en: { type: Type.STRING },
        status_ar: { type: Type.STRING },
        metrics_evaluation: {
            type: Type.OBJECT,
            properties: {
                ctr: { type: Type.OBJECT, properties: { value: {type: Type.NUMBER}, rating_en: {type: Type.STRING}, rating_ar: {type: Type.STRING}, score: {type: Type.INTEGER}, benchmark: {type: Type.NUMBER} } },
                conversion_rate: { type: Type.OBJECT, properties: { value: {type: Type.NUMBER}, rating_en: {type: Type.STRING}, rating_ar: {type: Type.STRING}, score: {type: Type.INTEGER}, benchmark: {type: Type.NUMBER} } },
                cpc: { type: Type.OBJECT, properties: { value: {type: Type.NUMBER}, rating_en: {type: Type.STRING}, rating_ar: {type: Type.STRING}, score: {type: Type.INTEGER}, benchmark: {type: Type.NUMBER} } },
                cpa: { type: Type.OBJECT, properties: { value: {type: Type.NUMBER}, rating_en: {type: Type.STRING}, rating_ar: {type: Type.STRING}, score: {type: Type.INTEGER}, benchmark: {type: Type.NUMBER} } },
                roas: { type: Type.OBJECT, properties: { value: {type: Type.NUMBER}, rating_en: {type: Type.STRING}, rating_ar: {type: Type.STRING}, score: {type: Type.INTEGER}, benchmark: {type: Type.NUMBER} } },
                impression_share: { type: Type.OBJECT, properties: { value: {type: Type.NUMBER}, rating_en: {type: Type.STRING}, rating_ar: {type: Type.STRING}, score: {type: Type.INTEGER}, benchmark: {type: Type.NUMBER} } },
            },
        },
        strengths: { type: Type.OBJECT, properties: { en: { type: Type.ARRAY, items: { type: Type.STRING } }, ar: { type: Type.ARRAY, items: { type: Type.STRING } } } },
        weaknesses: { type: Type.OBJECT, properties: { en: { type: Type.ARRAY, items: { type: Type.STRING } }, ar: { type: Type.ARRAY, items: { type: Type.STRING } } } },
        recommendations: { type: Type.OBJECT, properties: { en: { type: Type.ARRAY, items: { type: Type.STRING } }, ar: { type: Type.ARRAY, items: { type: Type.STRING } } } },
        priority_actions: { type: Type.OBJECT, properties: { en: { type: Type.ARRAY, items: { type: Type.STRING } }, ar: { type: Type.ARRAY, items: { type: Type.STRING } } } },
        detailed_insights: { type: Type.OBJECT, properties: { en: { type: Type.ARRAY, items: { type: Type.STRING } }, ar: { type: Type.ARRAY, items: { type: Type.STRING } } } },
        action_plan: {
            type: Type.OBJECT,
            properties: {
                immediate_actions: { type: Type.OBJECT, properties: { en: { type: Type.ARRAY, items: { type: Type.STRING } }, ar: { type: Type.ARRAY, items: { type: Type.STRING } } } },
                short_term_actions: { type: Type.OBJECT, properties: { en: { type: Type.ARRAY, items: { type: Type.STRING } }, ar: { type: Type.ARRAY, items: { type: Type.STRING } } } },
                long_term_actions: { type: Type.OBJECT, properties: { en: { type: Type.ARRAY, items: { type: Type.STRING } }, ar: { type: Type.ARRAY, items: { type: Type.STRING } } } },
                testing_priorities: { type: Type.OBJECT, properties: { en: { type: Type.ARRAY, items: { type: Type.STRING } }, ar: { type: Type.ARRAY, items: { type: Type.STRING } } } },
            }
        },
        final_summary_en: { type: Type.ARRAY, items: { type: Type.STRING } },
        final_summary_ar: { type: Type.ARRAY, items: { type: Type.STRING } },
        main_focus_en: { type: Type.ARRAY, items: { type: Type.STRING } },
        main_focus_ar: { type: Type.ARRAY, items: { type: Type.STRING } },
    }
};

const getAnalysisPrompt = (data: CampaignData): string => {
  return `
    You are a world-class Google Ads data analyst specializing in the Saudi Arabian market. Your task is to analyze the provided campaign data and generate a comprehensive, bilingual (English and Arabic) report in a structured JSON format.

    **Analysis Logic & Benchmarks (Saudi Market):**
    - Your analysis must be based on the following benchmarks for Search Ads in Saudi Arabia.
    - CTR: Excellent >10%, Good >6.66%, Average >4.0%, Poor <2.0%.
    - Conversion Rate: Excellent >7.52%, Good >2.81%, Average >1.5%, Poor <0.5%.
    - CPC (SAR): Excellent <1.5, Good <2.5, Average <4.0, Poor >6.0. (Lower is better)
    - CPA (SAR): Excellent <100, Good <170, Average <250, Poor >400. (Lower is better)
    - ROAS: Excellent >4.0, Good >2.5, Average >1.5, Poor <1.0.
    - Impression Share: Excellent >80%, Good >50%, Average >30%, Poor <10%.
    - For evaluation scores, use a 1-100 scale: Excellent=100, Good=75, Average=50, Below Average=30, Poor=10.
    - The overall score is the average of individual metric scores.
    - Generate specific, actionable recommendations tailored to the Saudi market (e.g., mention preferred communication channels like WhatsApp, cultural values, key holidays like Ramadan/Eid).
    - Provide a detailed action plan segmented into immediate, short-term, and long-term actions.

    **User Campaign Data:**
    ${JSON.stringify(data, null, 2)}

    Now, perform a deep analysis based on the provided data and benchmarks. Generate the full, comprehensive report in the required JSON format. Ensure all text fields (strengths, weaknesses, etc.) have both 'en' (English) and 'ar' (Arabic) versions.
    The final summary should give a clear verdict on the campaign's health. The main focus points should be the top 3 priorities for improvement.
  `;
};

export const analyzeCampaignWithGemini = async (data: CampaignData): Promise<AnalysisReport> => {
  const model = 'gemini-2.5-flash';
  const prompt = getAnalysisPrompt(data);

  const response = await ai.models.generateContent({
    model: model,
    contents: prompt,
    config: {
      responseMimeType: 'application/json',
      responseSchema: analysisSchema,
    },
  });

  try {
    const jsonText = response.text.trim();
    const result = JSON.parse(jsonText);
    return result as AnalysisReport;
  } catch (error) {
    console.error("Failed to parse Gemini response:", response.text);
    throw new Error("Could not parse the analysis report from the AI.");
  }
};
