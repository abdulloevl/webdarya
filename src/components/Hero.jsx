import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

const WaveAnimation = () => (
  <div className="absolute inset-0 overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-b from-ocean-600 to-deep-900 opacity-90"></div>
    <div className="absolute bottom-0 left-0 right-0 h-64">
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-64 bg-ocean-400 opacity-20"
        initial={{ y: 0 }}
        animate={{ y: [-20, 0, -20] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        style={{ borderRadius: "100% 100% 0 0" }}
      />
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-48 bg-ocean-300 opacity-20"
        initial={{ y: 0 }}
        animate={{ y: [-15, 5, -15] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        style={{ borderRadius: "100% 100% 0 0" }}
      />
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-32 bg-ocean-200 opacity-20"
        initial={{ y: 0 }}
        animate={{ y: [-10, 10, -10] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        style={{ borderRadius: "100% 100% 0 0" }}
      />
    </div>
  </div>
);

const Hero = () => {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;

  // Structured data for Hero section
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPageElement",
    "name": t('hero.title'),
    "description": t('hero.description'),
    "mainEntity": {
      "@type": "Service",
      "name": "Web Development",
      "description": t('hero.subtitle'),
      "provider": {
        "@type": "Organization",
        "name": "Web Darya",
        "url": "https://webdarya.com"
      },
      "areaServed": "Tajikistan",
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Web Development Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": t('services.landing.title'),
              "description": t('services.landing.description')
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": t('services.business.title'),
              "description": t('services.business.description')
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": t('services.ecommerce.title'),
              "description": t('services.ecommerce.description')
            }
          }
        ]
      }
    }
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-deep-800">
        <WaveAnimation />
        
        <div className="relative z-10 w-full">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center"
            >
              <h1 className="text-5xl md:text-7xl font-bold text-white">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-ocean-200 to-ocean-400">
                  Web Darya
                </span>
              </h1>
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="w-24 h-1 bg-gradient-to-r from-ocean-400 to-ocean-200 rounded-full mt-6"
              />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-2xl md:text-4xl font-light text-ocean-100 mt-8"
            >
              {t('hero.title')}
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-lg md:text-xl text-ocean-200 max-w-3xl mx-auto mt-6"
            >
              {t('hero.subtitle')}
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="mt-8"
            >
              <a
                href="#contact"
                className="inline-flex px-8 py-4 bg-gradient-to-r from-ocean-400 to-ocean-600 text-white rounded-full
                          font-medium text-lg transition-transform duration-300 transform hover:scale-105
                          hover:shadow-lg hover:shadow-ocean-500/25"
              >
                {t('hero.cta')}
              </a>
            </motion.div>
          </div>
        </div>

        {/* Floating elements */}
        <motion.div
          className="absolute top-1/4 left-10 w-20 h-20 bg-ocean-400 rounded-full opacity-10"
          animate={{
            y: [0, 30, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-10 w-32 h-32 bg-ocean-300 rounded-full opacity-10"
          animate={{
            y: [0, -40, 0],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
    </>
  );
};

export default Hero; 