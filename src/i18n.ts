// Useful resources:
// https://lokalise.com/blog/how-to-internationalize-react-application-using-i18next/
// https://react.i18next.com/legacy-v9/step-by-step-guide#c-auto-detect-the-user-language

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import translationFR from '../public/locales/fr/translation.json';
import translationEN from '../public/locales/en/translation.json';

const resources = {
  en: {
    translation: translationEN
  },
  fr: {
    translation: translationFR
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
