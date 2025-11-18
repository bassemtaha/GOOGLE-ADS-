
import { CampaignData, AllErrors, Language } from '../types';

export const validateCampaignData = (data: CampaignData, lang: Language): AllErrors => {
    const errors: AllErrors = { main: {}, historical: [] };

    const numericFields: (keyof CampaignData)[] = [
        'budget_daily', 'spend', 'revenue', 'impressions', 'clicks', 'purchases',
        'ctr', 'cpc', 'conversion_rate', 'cpa', 'roas', 'cpm',
        'impression_share', 'lost_is_budget', 'lost_is_rank', 'optimization_score',
        'all_conversions', 'all_conversion_rate', 'cost_per_all_conversions'
    ];

    numericFields.forEach(key => {
        const value = data[key];
        if (typeof value === 'number' && value < 0) {
            errors.main[key] = lang === 'ar' ? 'القيمة يجب ألا تكون سلبية.' : 'Value cannot be negative.';
        }
    });

    const percentageFields: (keyof CampaignData)[] = [
        'ctr', 'conversion_rate', 'impression_share', 'lost_is_budget', 
        'lost_is_rank', 'optimization_score', 'all_conversion_rate'
    ];

    percentageFields.forEach(key => {
        const value = data[key] as number;
        if (!errors.main[key] && (value < 0 || value > 100)) {
            errors.main[key] = lang === 'ar' ? 'النسبة يجب أن تكون بين 0 و 100.' : 'Percentage must be between 0 and 100.';
        }
    });
    
    if (!errors.main.clicks && !errors.main.impressions && data.clicks > data.impressions) {
        errors.main.clicks = lang === 'ar' ? 'النقرات لا يمكن أن تتجاوز مرات الظهور.' : 'Clicks cannot exceed impressions.';
    }
    if (!errors.main.purchases && !errors.main.clicks && data.purchases > data.clicks) {
        errors.main.purchases = lang === 'ar' ? 'المشتريات لا يمكن أن تتجاوز النقرات.' : 'Purchases cannot exceed clicks.';
    }
    if (!errors.main.all_conversions && !errors.main.clicks && data.all_conversions > data.clicks) {
      errors.main.all_conversions = lang === 'ar' ? 'إجمالي التحويلات لا يمكن أن يتجاوز النقرات.' : 'All conversions cannot exceed clicks.';
    }

    if (data.historicalData) {
        errors.historical = data.historicalData.map(row => {
            const rowErrors: { [key: string]: string } = {};
            
            Object.keys(row).forEach(key => {
                const value = row[key as keyof typeof row];
                 if (typeof value === 'number' && value < 0) {
                    rowErrors[key] = lang === 'ar' ? 'القيمة يجب أن تكون موجبة.' : 'Value must be non-negative.';
                 }
            });
            
            if (row.clicks > row.impressions) {
                rowErrors.clicks = lang === 'ar' ? 'النقرات لا يمكن أن تتجاوز مرات الظهور.' : 'Clicks cannot exceed impressions.';
            }
            if (row.purchases > row.clicks) {
                rowErrors.purchases = lang === 'ar' ? 'المشتريات لا يمكن أن تتجاوز النقرات.' : 'Purchases cannot exceed clicks.';
            }
            if (!row.date) {
                rowErrors.date = lang === 'ar' ? 'التاريخ مطلوب.' : 'Date is required.';
            }
            
            return rowErrors;
        });
    }

    return errors;
};
