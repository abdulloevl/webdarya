import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const Security = () => {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gray-900 text-white py-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">{t('security.title')}</h1>
        
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">{t('security.overview.title')}</h2>
            <p className="text-gray-300 leading-relaxed">
              {t('security.overview.description')}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">{t('security.measures.title')}</h2>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>{t('security.measures.point1')}</li>
              <li>{t('security.measures.point2')}</li>
              <li>{t('security.measures.point3')}</li>
              <li>{t('security.measures.point4')}</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">{t('security.data.title')}</h2>
            <p className="text-gray-300 leading-relaxed">
              {t('security.data.description')}
            </p>
            <ul className="mt-4 list-disc list-inside text-gray-300 space-y-2">
              <li>{t('security.data.point1')}</li>
              <li>{t('security.data.point2')}</li>
              <li>{t('security.data.point3')}</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">{t('security.access.title')}</h2>
            <p className="text-gray-300 leading-relaxed">
              {t('security.access.description')}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">{t('security.monitoring.title')}</h2>
            <p className="text-gray-300 leading-relaxed">
              {t('security.monitoring.description')}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">{t('security.incident.title')}</h2>
            <p className="text-gray-300 leading-relaxed">
              {t('security.incident.description')}
            </p>
          </section>

          <section className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">{t('security.contact.title')}</h2>
            <p className="text-gray-300 leading-relaxed">
              {t('security.contact.description')}
            </p>
            <div className="mt-4">
              <a 
                href="mailto:security@example.com" 
                className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors"
              >
                security@example.com
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800">
          <p className="text-sm text-gray-400">
            {t('security.lastUpdated')}: 2024
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default Security; 