import React from 'react';
import { useTranslation } from 'react-i18next';
import { AlertCircle } from 'lucide-react';

export default function ConfidenceGauge({ score }) {
  const { t } = useTranslation();
  
  if (score === undefined || score === null) return null;
  
  let color = '#ef4444'; // red
  if (score >= 80) color = '#22c55e'; // green
  else if (score >= 50) color = '#f59e0b'; // amber

  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-24 h-24 flex items-center justify-center">
        {/* Background circle */}
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="48"
            cy="48"
            r={radius}
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            className="text-gray-200"
          />
          {/* Progress circle */}
          <circle
            cx="48"
            cy="48"
            r={radius}
            stroke={color}
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute flex items-center justify-center">
          <span className="text-2xl font-bold text-gray-800">{score}%</span>
        </div>
      </div>
      <span className="mt-2 text-sm font-medium text-gray-600">{t('confidence')}</span>
      
      {score < 50 && (
        <div className="mt-3 flex items-start gap-2 text-xs text-red-600 bg-red-50 p-2 rounded-lg max-w-[200px]">
          <AlertCircle size={16} className="shrink-0 mt-0.5" />
          <span>{t('low_confidence_warning')}</span>
        </div>
      )}
    </div>
  );
}
