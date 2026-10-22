import React from 'react';
import { useTranslation } from 'react-i18next';
import { CheckCircle2, Circle } from 'lucide-react';

export default function TreatmentTimeline({ timeline }) {
  const { t } = useTranslation();
  if (!timeline || timeline.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <h3 className="text-xl font-bold text-gray-800 mb-6">{t('treatment_timeline')}</h3>
      <div className="relative border-l-2 border-green-200 ml-4 space-y-8">
        {timeline.map((step, idx) => {
          const isLast = idx === timeline.length - 1;
          return (
            <div key={idx} className="relative pl-6 transition-all duration-500 hover:translate-x-1">
              <div className="absolute -left-[17px] top-1 bg-white p-1">
                {isLast ? (
                  <CheckCircle2 className="text-primary-green bg-white rounded-full" size={24} />
                ) : (
                  <Circle className="text-green-400 bg-white rounded-full" size={24} strokeWidth={3} />
                )}
              </div>
              <div className="bg-green-50/50 rounded-xl p-4 border border-green-100 hover:border-green-300 transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-primary-green text-white text-xs font-bold px-2 py-1 rounded-md">
                    {t('day')} {step.day}
                  </span>
                  {step.product && step.product !== 'None' && (
                    <span className="bg-amber-100 text-amber-800 text-xs font-semibold px-2 py-1 rounded-md">
                      {step.product}
                    </span>
                  )}
                </div>
                <p className="text-gray-800 font-medium text-sm md:text-base mb-1">{step.action}</p>
                {step.notes && (
                  <p className="text-gray-500 text-sm italic">{step.notes}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
