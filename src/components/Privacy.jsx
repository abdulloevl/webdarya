import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const Privacy = () => {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gray-900 text-white py-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">{t('privacy.title')}</h1>
        
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">{t('privacy.collection.title')}</h2>
            <p className="text-gray-300 leading-relaxed">
              {t('privacy.collection.description')}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">{t('privacy.usage.title')}</h2>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>{t('privacy.usage.point1')}</li>
              <li>{t('privacy.usage.point2')}</li>
              <li>{t('privacy.usage.point3')}</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">{t('privacy.protection.title')}</h2>
            <p className="text-gray-300 leading-relaxed">
              {t('privacy.protection.description')}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">{t('privacy.cookies.title')}</h2>
            <p className="text-gray-300 leading-relaxed">
              {t('privacy.cookies.description')}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">{t('privacy.rights.title')}</h2>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>{t('privacy.rights.point1')}</li>
              <li>{t('privacy.rights.point2')}</li>
              <li>{t('privacy.rights.point3')}</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">{t('privacy.contact.title')}</h2>
            <p className="text-gray-300 leading-relaxed">
              {t('privacy.contact.description')}
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800">
          <p className="text-sm text-gray-400">
            {t('privacy.lastUpdated')}: 2024
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default Privacy; 