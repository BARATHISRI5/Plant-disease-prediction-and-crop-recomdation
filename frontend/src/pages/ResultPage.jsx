import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, RefreshCw } from 'lucide-react';

import SeverityBadge from '../components/SeverityBadge';
import ConfidenceGauge from '../components/ConfidenceGauge';
import SymptomsList from '../components/SymptomsList';
import TreatmentTimeline from '../components/TreatmentTimeline';
import MedicineOptions from '../components/MedicineOptions';
import DosageCalculator from '../components/DosageCalculator';
import PreventionTips from '../components/PreventionTips';

export default function ResultPage() {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!location.state || !location.state.result) {
      navigate('/', { replace: true });
    }
  }, [location, navigate]);

  if (!location.state || !location.state.result) return null;

  const { result, imagePreview } = location.state;
  const isHealthy = result.disease_name?.toLowerCase() === 'healthy';

  return (
    <div className="animate-[fadeIn_0.5s_ease-out] pb-10">
      <button
        onClick={() => navigate('/')}
        className="flex items-center gap-2 text-primary-green hover:text-green-800 font-semibold mb-6 transition-colors"
      >
        <ArrowLeft size={20} />
        Back to Analysis
      </button>

      <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100 mb-8 overflow-hidden">
        {imagePreview && (
          <div className="mb-8 flex justify-center">
            <img 
              src={imagePreview} 
              alt="Analyzed leaf" 
              className="w-full max-w-md h-64 object-cover rounded-2xl shadow-inner border border-gray-100" 
            />
          </div>
        )}

        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2">
            {result.disease_name}
          </h1>
          <p className="text-lg font-medium text-gray-500">
            {t('plant')}: {result.plant_type}
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 mb-10 bg-gray-50 rounded-2xl p-6">
          <div className="flex flex-col items-center">
            <span className="text-sm font-semibold text-gray-500 mb-3">{t('severity')}</span>
            <SeverityBadge severity={result.severity} />
          </div>
          <div className="h-px w-full md:w-px md:h-20 bg-gray-200"></div>
          <ConfidenceGauge score={result.confidence_score} />
        </div>

        {isHealthy ? (
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center text-emerald-800 mt-8">
            <h2 className="text-2xl font-bold mb-2">🌿 {t('healthy')}</h2>
            <p className="opacity-90">{result.description}</p>
          </div>
        ) : (
          <div className="prose max-w-none mb-10">
            <p className="text-lg text-gray-700 leading-relaxed text-center max-w-3xl mx-auto">
              {result.description}
            </p>
          </div>
        )}
      </div>

      {!isHealthy && (
        <div className="space-y-8">
          <SymptomsList symptoms={result.symptoms} />
          <TreatmentTimeline timeline={result.treatment_timeline} />
          <MedicineOptions organic={result.organic_options} chemical={result.chemical_options} />
          <DosageCalculator organic={result.organic_options} chemical={result.chemical_options} />
        </div>
      )}

      {result.prevention_tips && result.prevention_tips.length > 0 && (
        <PreventionTips tips={result.prevention_tips} />
      )}

      <div className="mt-12 text-center">
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 bg-primary-green hover:bg-green-700 text-white font-bold py-4 px-10 rounded-xl shadow-lg transition-all hover:-translate-y-1 active:scale-95 text-lg"
        >
          <RefreshCw size={24} />
          {t('upload_new')}
        </button>
      </div>
    </div>
  );
}
