import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const languages = [
    { code: 'tg', label: 'TJ', flag: '🇹🇯' },
    { code: 'ru', label: 'RU', flag: '🇷🇺' }
  ];

  const toggleLanguage = () => {
    const newLang = i18n.language === 'tg' ? 'ru' : 'tg';
    i18n.changeLanguage(newLang);
  };

  const currentLang = languages.find(lang => lang.code === i18n.language);

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleLanguage}
      className="relative px-4 py-2 rounded-lg bg-ocean-500/20 text-ocean-100 
                 border border-ocean-400/20 transition-all duration-300
                 hover:bg-ocean-500/30 hover:border-ocean-400/40
                 focus:outline-none focus:ring-2 focus:ring-ocean-400/50"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentLang.code}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="flex items-center space-x-2"
        >
          <span className="text-lg">{currentLang.flag}</span>
          <span className="font-medium">{currentLang.label}</span>
        </motion.div>
      </AnimatePresence>
      
      {/* Animated background indicator */}
      <motion.div
        layoutId="langIndicator"
        className="absolute inset-0 bg-ocean-500/10 rounded-lg -z-10"
        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
      />
    </motion.button>
  );
};

export default LanguageSwitcher; 