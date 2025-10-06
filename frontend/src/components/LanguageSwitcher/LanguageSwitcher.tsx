/**
 * Language Switcher Component
 */
import { useTranslation } from '../../i18n';
import './LanguageSwitcher.css';

export const LanguageSwitcher = () => {
  const { language, setLanguage } = useTranslation();

  const languages = [
    { code: 'en' as const, name: 'English', flag: '🇬🇧' },
    { code: 'uz' as const, name: 'O\'zbekcha', flag: '🇺🇿' },
    { code: 'ru' as const, name: 'Русский', flag: '🇷🇺' },
  ];

  return (
    <div className="language-switcher">
      {languages.map((lang) => (
        <button
          key={lang.code}
          className={`lang-button ${language === lang.code ? 'active' : ''}`}
          onClick={() => setLanguage(lang.code)}
          title={lang.name}
        >
          <span className="lang-flag">{lang.flag}</span>
          <span className="lang-code">{lang.code.toUpperCase()}</span>
        </button>
      ))}
    </div>
  );
};
