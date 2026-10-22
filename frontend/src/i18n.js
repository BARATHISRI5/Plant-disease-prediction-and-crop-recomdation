import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslation from './locales/en/translation.json';
import taTranslation from './locales/ta/translation.json';
import hiTranslation from './locales/hi/translation.json';
import teTranslation from './locales/te/translation.json';
import knTranslation from './locales/kn/translation.json';
import mlTranslation from './locales/ml/translation.json';

const resources = {
  en: { translation: enTranslation },
  ta: { translation: taTranslation },
  hi: { translation: hiTranslation },
  te: { translation: teTranslation },
  kn: { translation: knTranslation },
  ml: { translation: mlTranslation }
};

const savedLang = localStorage.getItem('plant_app_lang') || 'en';

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: savedLang,
    fallbackLng: 'en',
    interpolation: { escapeValue: false }
  });

export default i18n;
