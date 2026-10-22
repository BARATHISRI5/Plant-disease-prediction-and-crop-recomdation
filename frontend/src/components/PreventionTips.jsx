import React from 'react';
import { useTranslation } from 'react-i18next';
import { ShieldCheck } from 'lucide-react';

export default function PreventionTips({ tips }) {
  const { t } = useTranslation();
  if (!tips || tips.length === 0) return null;

  return (
    <div className="bg-green-50 rounded-2xl p-6 border border-green-100 mt-8">
      <div className="flex items-center gap-2 mb-4">
        <ShieldCheck className="text-primary-green" size={24} />
        <h3 className="text-xl font-bold text-gray-800">{t('prevention_tips')}</h3>
      </div>
      <ul className="space-y-3">
        {tips.map((tip, i) => (
          <li key={i} className="flex items-start gap-3">
            <div className="bg-white p-1 rounded-full flex-shrink-0 shadow-sm mt-1">
              <div className="w-2 h-2 bg-primary-green rounded-full"></div>
            </div>
            <span className="text-gray-700 font-medium">{tip}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
