import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';

const FAQ = () => {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    { id: 'process' },
    { id: 'time' },
    { id: 'price' },
    { id: 'support' },
    { id: 'technology' },
    { id: 'changes' },
  ];

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative bg-deep-800 overflow-hidden">
      <div className="absolute inset-0 bg-wave-pattern opacity-5"></div>
      
      <div className="relative w-full min-h-screen flex items-center py-20">
        <div className="w-full max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-4xl font-bold text-ocean-100"
            >
              {t('faq.title')}
            </motion.h2>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="w-24 h-1 bg-gradient-to-r from-ocean-400 to-ocean-200 rounded-full mx-auto mt-4"
            />
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative group"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full p-6 text-left bg-deep-700/50 backdrop-blur-xl rounded-xl
                           border border-ocean-700/30 transition-all duration-300
                           hover:border-ocean-500/50 focus:outline-none"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium text-ocean-100">
                      {t(`faq.items.${faq.id}.question`)}
                    </h3>
                    <span className="ml-6 flex-shrink-0">
                      <motion.svg
                        animate={{ rotate: openIndex === index ? 180 : 0 }}
                        className="w-6 h-6 text-ocean-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </motion.svg>
                    </span>
                  </div>
                  <AnimatePresence>
                    {openIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="mt-4 text-ocean-200">
                          {t(`faq.items.${faq.id}.answer`)}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="mt-12 text-center"
          >
            <p className="text-ocean-200 mb-6">
              {t('faq.moreQuestions')}
            </p>
            <a
              href="#contact"
              className="inline-flex px-8 py-4 bg-gradient-to-r from-ocean-400 to-ocean-600 text-white
                        rounded-full font-medium text-lg transition-transform duration-300 transform
                        hover:scale-105 hover:shadow-lg hover:shadow-ocean-500/25"
            >
              {t('faq.contactUs')}
            </a>
          </motion.div>
        </div>
      </div>

      {/* Decorative elements */}
      <motion.div
        className="absolute bottom-1/4 left-5 w-48 h-48 bg-ocean-500 rounded-full opacity-10 blur-3xl"
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
    </section>
  );
};

export default FAQ; 