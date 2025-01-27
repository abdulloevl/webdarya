import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import tgTranslations from './locales/tg.json';
import ruTranslations from './locales/ru.json';

i18n.use(initReactI18next).init({
  resources: {
    tg: {
      translation: tgTranslations,
    },
    ru: {
      translation: ruTranslations,
    },
  },
  lng: 'tg', // default language
  fallbackLng: 'tg',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n; 