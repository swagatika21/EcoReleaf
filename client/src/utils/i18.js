// i18n.js

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enTranslation from '../../public/Plants.json';
import hiTranslation from '../../public/plantsHindi.json';
import odTranslation from '../../public/PlantsOdia.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslation },
      hi: { translation: hiTranslation },
      od: { translation: odTranslation }
    },
    lng: 'en', // Default language
    fallbackLng: 'en', // Fallback language
    interpolation: {
      escapeValue: false // React already protects from XSS
    }
  });

export default i18n;
