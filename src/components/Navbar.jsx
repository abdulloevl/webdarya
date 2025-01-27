import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, Link } from 'react-router-dom';
import LanguageSwitcher from './LanguageSwitcher';

const Navbar = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState('home');

  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setIsScrolled(currentScrollY > 10);
      setLastScrollY(currentScrollY);

      // Update active section based on scroll position only on home page
      if (isHomePage) {
        const sections = ['home', 'services', 'portfolio', 'contact'];
        for (const section of sections.reverse()) {
          const element = document.getElementById(section);
          if (element) {
            const rect = element.getBoundingClientRect();
            if (rect.top <= 100) {
              setActiveSection(section);
              break;
            }
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, isHomePage]);

  const navItems = ['home', 'services', 'portfolio', 'contact'];

  const renderNavLink = (item) => {
    if (isHomePage) {
      return (
        <a
          href={'#' + item}
          className={`text-base transition-colors relative group px-6 py-5
                     ${activeSection === item 
                       ? 'text-ocean-300' 
                       : 'text-ocean-100 hover:text-ocean-300'}`}
        >
          {t('nav.' + item)}
          <span className={`absolute bottom-0 left-0 h-0.5 bg-ocean-400 transition-all duration-300
                          ${activeSection === item ? 'w-full' : 'w-0 group-hover:w-full'}`} />
        </a>
      );
    } else {
      return (
        <Link
          to={`/#${item}`}
          className="text-base text-ocean-100 hover:text-ocean-300 transition-colors relative group px-6 py-5"
        >
          {t('nav.' + item)}
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-ocean-400 transition-all duration-300 group-hover:w-full" />
        </Link>
      );
    }
  };

  const renderMobileNavLink = (item) => {
    if (isHomePage) {
      return (
        <a
          href={'#' + item}
          className={`block py-3 px-4 text-sm transition-colors relative
                     ${activeSection === item 
                       ? 'text-ocean-300 bg-ocean-800/30' 
                       : 'text-ocean-100 hover:text-ocean-300 hover:bg-ocean-800/20'}`}
          onClick={() => setIsOpen(false)}
        >
          <span className="relative z-10">{t('nav.' + item)}</span>
          {activeSection === item && (
            <motion.div
              layoutId="activeSection"
              className="absolute inset-0 bg-ocean-800/30"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
        </a>
      );
    } else {
      return (
        <Link
          to={`/#${item}`}
          className="block py-3 px-4 text-sm text-ocean-100 hover:text-ocean-300 transition-colors hover:bg-ocean-800/20"
          onClick={() => setIsOpen(false)}
        >
          <span className="relative z-10">{t('nav.' + item)}</span>
        </Link>
      );
    }
  };

  return (
    <motion.nav
      initial={{ y: 0 }}
      animate={{ 
        y: isVisible ? 0 : -100,
        transition: {
          type: "spring",
          stiffness: 260,
          damping: 20
        }
      }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-deep-900/95 backdrop-blur-lg shadow-lg shadow-deep-900/20'
          : 'bg-transparent'
      } ${!isVisible ? 'pointer-events-none' : 'pointer-events-auto'}`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center h-16">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center ml-4"
          >
            <Link 
              to="/" 
              className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-ocean-200 to-ocean-400 whitespace-nowrap"
            >
              Web Darya
            </Link>
          </motion.div>
          
          <div className="hidden md:flex items-center">
            {navItems.map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {renderNavLink(item)}
              </motion.div>
            ))}
            <div className="ml-4 mr-4">
              <LanguageSwitcher />
            </div>
          </div>

          <div className="md:hidden mr-4">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(!isOpen)}
              className="text-ocean-100 hover:text-ocean-300 transition-colors p-2"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </motion.button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-deep-800/95 backdrop-blur-lg border-t border-ocean-800/30"
          >
            <div className="divide-y divide-ocean-800/30">
              {navItems.map((item) => (
                <motion.div
                  key={item}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -20, opacity: 0 }}
                >
                  {renderMobileNavLink(item)}
                </motion.div>
              ))}
              <div className="py-3 px-4">
                <LanguageSwitcher />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar; 