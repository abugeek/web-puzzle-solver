/**
 * i18n Context for translations
 */
import { createContext, useContext, useState, ReactNode } from 'react';
import { en, uz, ru, Translation } from './languages';

type Language = 'en' | 'uz' | 'ru';

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translation;
}

const translations: Record<Language, Translation> = {
  en,
  uz,
  ru,
};

const I18nContext = createContext<I18nContextType | undefined>(undefined);

const STORAGE_KEY = 'puzzle-solver-language';

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    // Load from localStorage or default to English
    const saved = localStorage.getItem(STORAGE_KEY);
    return (saved as Language) || 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem(STORAGE_KEY, lang);
  };

  const value = {
    language,
    setLanguage,
    t: translations[language],
  };

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export const useTranslation = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useTranslation must be used within I18nProvider');
  }
  return context;
};
