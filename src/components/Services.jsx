import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

const Services = () => {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;

  const services = [
    {
      id: 'landing',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
    },
    {
      id: 'business',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      id: 'ecommerce',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
  ];

  // Structured data for Services section
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": [
      {
        "@type": "Service",
        "position": 1,
        "name": t('services.landing.title'),
        "description": t('services.landing.description'),
        "provider": {
          "@type": "Organization",
          "name": "Web Darya"
        },
        "serviceType": "Landing Page Development"
      },
      {
        "@type": "Service",
        "position": 2,
        "name": t('services.business.title'),
        "description": t('services.business.description'),
        "provider": {
          "@type": "Organization",
          "name": "Web Darya"
        },
        "serviceType": "Business Website Development"
      },
      {
        "@type": "Service",
        "position": 3,
        "name": t('services.ecommerce.title'),
        "description": t('services.ecommerce.description'),
        "provider": {
          "@type": "Organization",
          "name": "Web Darya"
        },
        "serviceType": "E-commerce Development"
      }
    ]
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <section id="services" className="relative bg-gradient-to-b from-deep-800 to-deep-900 overflow-hidden">
        <div className="absolute inset-0 bg-wave-pattern opacity-5"></div>
        
        <div className="relative w-full min-h-screen flex items-center">
          <div className="w-full">
            <div className="text-center">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-4xl font-bold text-ocean-100"
              >
                {t('services.title')}
              </motion.h2>
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="w-24 h-1 bg-gradient-to-r from-ocean-400 to-ocean-200 rounded-full mx-auto mt-4"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto mt-16 px-4">
              {services.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  whileHover={{ y: -10 }}
                  className="relative group"
                >
                  <div className="relative z-10 p-6 bg-deep-700 rounded-xl backdrop-blur-xl 
                                border border-ocean-700/30 shadow-xl transition-all duration-300
                                group-hover:shadow-ocean-500/20 group-hover:border-ocean-500/50 h-full">
                    <div className="absolute inset-0 bg-gradient-to-br from-ocean-600/10 to-transparent rounded-xl"></div>
                    <div className="relative z-10">
                      <span className="inline-flex p-3 rounded-lg bg-ocean-500/10 text-ocean-300 mb-4
                                    group-hover:bg-ocean-500/20 transition-all duration-300">
                        {service.icon}
                      </span>
                      <h3 className="text-xl font-semibold text-ocean-100 mb-3">
                        {t(`services.${service.id}.title`)}
                      </h3>
                      <p className="text-ocean-300">
                        {t(`services.${service.id}.description`)}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <motion.div
          className="absolute top-1/3 left-5 w-48 h-48 bg-ocean-500 rounded-full opacity-10 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/3 right-5 w-64 h-64 bg-ocean-400 rounded-full opacity-10 blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.15, 0.1, 0.15],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </section>
    </>
  );
};

export default Services; 