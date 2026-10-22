import React from 'react';
import { useTranslation } from 'react-i18next';

const languages = [
  { code: 'en', label: 'EN' },
  { code: 'ta', label: 'தமிழ்' },
  { code: 'hi', label: 'हिंदी' },
  { code: 'te', label: 'తెలుగు' },
  { code: 'kn', label: 'ಕನ್ನಡ' },
  { code: 'ml', label: 'മലയാളം' }
];

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const handleLanguageChange = (e) => {
    const lang = e.target.value;
    i18n.changeLanguage(lang);
    localStorage.setItem('plant_app_lang', lang);
  };

  return (
    <select
      value={i18n.language || 'en'}
      onChange={handleLanguageChange}
      className="bg-green-800/20 hover:bg-green-800/40 text-white border border-white/30 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-white transition-colors cursor-pointer"
    >
      {languages.map((lang) => (
        <option key={lang.code} value={lang.code} className="text-gray-800">
          {lang.label}
        </option>
      ))}
    </select>
  );
}
