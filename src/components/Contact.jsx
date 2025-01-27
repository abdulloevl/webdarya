import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { sendToTelegram } from '../utils/telegram';

const Contact = () => {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showNotification, setShowNotification] = useState(false);
    const [notificationType, setNotificationType] = useState('success');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const success = await sendToTelegram(formData);
            
            if (success) {
                setNotificationType('success');
                setFormData({ name: '', phone: '', message: '' });
            } else {
                setNotificationType('error');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            setNotificationType('error');
        } finally {
            setShowNotification(true);
            setIsSubmitting(false);
            setTimeout(() => setShowNotification(false), 5000);
        }
    };

    return (
        <section id="contact" className="relative bg-gradient-to-b from-gray-900 to-deep-900 py-20 overflow-hidden">
            <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
            
            <div className="relative container mx-auto px-4">
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-12">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="text-4xl font-bold text-white mb-4"
                        >
                            {t('contact.title')}
                        </motion.h2>
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mx-auto"
                        />
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                            className="text-gray-400 mt-4"
                        >
                            {t('contact.description')}
                        </motion.p>
                    </div>

                    <motion.form
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                        onSubmit={handleSubmit}
                        className="bg-deep-800/50 backdrop-blur-lg rounded-2xl p-8 shadow-xl"
                    >
                        <div className="mb-6">
                            <label htmlFor="name" className="block text-gray-300 mb-2">
                                {t('contact.form.name')}
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 bg-deep-700/50 border border-gray-700 rounded-lg focus:outline-none focus:border-indigo-500 text-white"
                                placeholder={t('contact.form.namePlaceholder')}
                            />
                        </div>

                        <div className="mb-6">
                            <label htmlFor="phone" className="block text-gray-300 mb-2">
                                {t('contact.form.phone')}
                            </label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 bg-deep-700/50 border border-gray-700 rounded-lg focus:outline-none focus:border-indigo-500 text-white"
                                placeholder={t('contact.form.phonePlaceholder')}
                            />
                        </div>

                        <div className="mb-6">
                            <label htmlFor="message" className="block text-gray-300 mb-2">
                                {t('contact.form.message')}
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows="4"
                                className="w-full px-4 py-3 bg-deep-700/50 border border-gray-700 rounded-lg focus:outline-none focus:border-indigo-500 text-white resize-none"
                                placeholder={t('contact.form.messagePlaceholder')}
                            ></textarea>
                        </div>

                        <motion.button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full py-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium rounded-lg
                                     transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            {isSubmitting ? t('contact.form.sending') : t('contact.form.submit')}
                        </motion.button>
                    </motion.form>

                    <AnimatePresence>
                        {showNotification && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className={`fixed bottom-4 right-4 p-4 rounded-lg shadow-xl ${
                                    notificationType === 'success' 
                                        ? 'bg-green-500' 
                                        : 'bg-red-500'
                                }`}
                            >
                                <p className="text-white">
                                    {notificationType === 'success' 
                                        ? t('contact.form.success')
                                        : t('contact.form.error')
                                    }
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};

export default Contact; 