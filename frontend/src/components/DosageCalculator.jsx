import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Calculator } from 'lucide-react';

export default function DosageCalculator({ organic = [], chemical = [] }) {
  const { t } = useTranslation();
  const [size, setSize] = useState('');
  const [unit, setUnit] = useState('acres');
  const [results, setResults] = useState(null);

  const allMeds = [
    ...(organic || []).map(m => ({ ...m, type: 'Organic' })),
    ...(chemical || []).map(m => ({ ...m, type: 'Chemical' }))
  ];

  if (allMeds.length === 0) return null;

  const handleCalculate = () => {
    const val = parseFloat(size);
    if (isNaN(val) || val <= 0) return;

    const acres = unit === 'hectares' ? val * 2.47105 : val;
    const water = Math.round(acres * 200);

    const calculated = allMeds.map(med => ({
      name: med.name,
      type: med.type,
      dose: (med.dose_per_acre * acres).toFixed(1) + ' ' + med.unit,
      water: water + ' Liters'
    }));
    setResults(calculated);
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mt-8">
      <div className="flex items-center gap-2 mb-6">
        <Calculator className="text-primary-green" size={24} />
        <h3 className="text-xl font-bold text-gray-800">{t('dosage_calculator')}</h3>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <input
            type="number"
            min="0.1"
            step="0.1"
            value={size}
            onChange={(e) => setSize(e.target.value)}
            placeholder={t('farm_size')}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-transparent transition-all"
          />
        </div>
        <div className="flex bg-gray-100 p-1 rounded-xl">
          <button
            onClick={() => setUnit('acres')}
            className={`px-6 py-2 rounded-lg text-sm font-semibold transition-colors ${unit === 'acres' ? 'bg-white text-primary-green shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
          >
            {t('acres')}
          </button>
          <button
            onClick={() => setUnit('hectares')}
            className={`px-6 py-2 rounded-lg text-sm font-semibold transition-colors ${unit === 'hectares' ? 'bg-white text-primary-green shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
          >
            {t('hectares')}
          </button>
        </div>
        <button
          onClick={handleCalculate}
          disabled={!size}
          className="bg-primary-green text-white font-bold px-6 py-3 rounded-xl hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {t('calculate')}
        </button>
      </div>

      {results && (
        <div className="overflow-x-auto animate-fade-in mt-6">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-green-50 text-green-800 border-b-2 border-green-200">
                <th className="p-3 font-semibold rounded-tl-lg">{t('medicine')}</th>
                <th className="p-3 font-semibold">Type</th>
                <th className="p-3 font-semibold">{t('quantity_needed')}</th>
                <th className="p-3 font-semibold rounded-tr-lg">{t('water_required')}</th>
              </tr>
            </thead>
            <tbody>
              {results.map((r, i) => (
                <tr key={i} className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                  <td className="p-3 font-medium text-gray-800">{r.name}</td>
                  <td className="p-3 text-sm text-gray-500">{r.type}</td>
                  <td className="p-3 font-bold text-primary-green">{r.dose}</td>
                  <td className="p-3 text-blue-600 font-medium">{r.water}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
