import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Clock, Info, Droplets } from 'lucide-react';

export default function MedicineOptions({ organic = [], chemical = [] }) {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('organic');

  const hasOrganic = organic && organic.length > 0;
  const hasChemical = chemical && chemical.length > 0;

  if (!hasOrganic && !hasChemical) return null;

  // force change tab if current is empty
  React.useEffect(() => {
    if (activeTab === 'organic' && !hasOrganic && hasChemical) setActiveTab('chemical');
    if (activeTab === 'chemical' && !hasChemical && hasOrganic) setActiveTab('organic');
  }, [hasOrganic, hasChemical, activeTab]);

  const currentList = activeTab === 'organic' ? organic : chemical;

  return (
    <div className="mt-8">
      <h3 className="text-xl font-bold text-gray-800 mb-4">{t('medicine_options')}</h3>
      
      <div className="flex gap-2 mb-6">
        {hasOrganic && (
          <button
            onClick={() => setActiveTab('organic')}
            className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-colors ${activeTab === 'organic' ? 'bg-primary-green text-white shadow-md' : 'bg-white text-gray-600 border border-gray-200 hover:bg-green-50'}`}
          >
            {t('organic_tab')}
          </button>
        )}
        {hasChemical && (
          <button
            onClick={() => setActiveTab('chemical')}
            className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-colors ${activeTab === 'chemical' ? 'bg-primary-green text-white shadow-md' : 'bg-white text-gray-600 border border-gray-200 hover:bg-green-50'}`}
          >
            {t('chemical_tab')}
          </button>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {currentList.map((med, idx) => (
          <div key={idx} className="bg-white rounded-2xl p-5 shadow-sm border-l-4 border-l-primary-green border-y border-r border-gray-100 transition-transform hover:-translate-y-1">
            <h4 className="text-lg font-bold text-gray-800 mb-3">{med.name}</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2 text-gray-600">
                <Info size={18} className="text-primary-green shrink-0 mt-0.5" />
                <p>{med.usage}</p>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Clock size={18} className="text-amber-500 shrink-0" />
                <p>{med.when}</p>
              </div>
              <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-100">
                <span className="bg-green-100 text-green-800 px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5">
                  <Droplets size={16} />
                  {med.dose_per_acre} {med.unit} {t('per_acre')}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
