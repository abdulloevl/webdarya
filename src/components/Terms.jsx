import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const Terms = () => {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gray-900 text-white py-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">{t('terms.title')}</h1>
        
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">{t('terms.acceptance.title')}</h2>
            <p className="text-gray-300 leading-relaxed">
              {t('terms.acceptance.description')}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">{t('terms.services.title')}</h2>
            <p className="text-gray-300 leading-relaxed">
              {t('terms.services.description')}
            </p>
            <ul className="mt-4 list-disc list-inside text-gray-300 space-y-2">
              <li>{t('terms.services.point1')}</li>
              <li>{t('terms.services.point2')}</li>
              <li>{t('terms.services.point3')}</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">{t('terms.intellectual.title')}</h2>
            <p className="text-gray-300 leading-relaxed">
              {t('terms.intellectual.description')}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">{t('terms.payment.title')}</h2>
            <p className="text-gray-300 leading-relaxed">
              {t('terms.payment.description')}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">{t('terms.termination.title')}</h2>
            <p className="text-gray-300 leading-relaxed">
              {t('terms.termination.description')}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">{t('terms.warranty.title')}</h2>
            <p className="text-gray-300 leading-relaxed">
              {t('terms.warranty.description')}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">{t('terms.liability.title')}</h2>
            <p className="text-gray-300 leading-relaxed">
              {t('terms.liability.description')}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">{t('terms.governing.title')}</h2>
            <p className="text-gray-300 leading-relaxed">
              {t('terms.governing.description')}
            </p>
          </section>

          <section className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
            <h2 className="text-2xl font-semibold mb-4">{t('terms.responsibility.title')}</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              {t('terms.responsibility.description')}
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>{t('terms.responsibility.points.point1')}</li>
              <li>{t('terms.responsibility.points.point2')}</li>
              <li>{t('terms.responsibility.points.point3')}</li>
            </ul>
          </section>

          <section className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">{t('terms.contact.title')}</h2>
            <p className="text-gray-300 leading-relaxed">
              {t('terms.contact.description')}
            </p>
            <div className="mt-4">
              <a 
                href="mailto:legal@webdarya.com" 
                className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors"
              >
                {t('terms.contact.email')}
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800">
          <p className="text-sm text-gray-400">
            {t('terms.lastUpdated')}: 2024
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default Terms; 