import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslations from './locales/en.json';
import frTranslations from './locales/fr.json';

// Safely get language from localStorage with fallback
function getSavedLanguage(): string {
  if (typeof window === 'undefined') return 'en';
  
  try {
    return localStorage.getItem('mentalpath_language') || 'en';
  } catch (e) {
    // localStorage might not be available during SSR or in some environments
    return 'en';
  }
}

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslations },
      fr: { translation: frTranslations }
    },
    lng: getSavedLanguage(),
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  })
  .catch((error) => {
    console.error('Failed to initialize i18n:', error);
  });

export default i18n;