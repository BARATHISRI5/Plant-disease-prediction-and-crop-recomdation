import React from 'react';
import { useTranslation } from 'react-i18next';
import { AlertCircle } from 'lucide-react';

export default function SymptomsList({ symptoms }) {
  const { t } = useTranslation();
  if (!symptoms || symptoms.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <h3 className="text-xl font-bold text-gray-800 mb-4">{t('symptoms')}</h3>
      <ul className="space-y-3">
        {symptoms.map((sym, i) => (
          <li key={i} className="flex items-start gap-3">
            <AlertCircle size={20} className="text-red-500 shrink-0 mt-0.5" />
            <span className="text-gray-700">{sym}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
