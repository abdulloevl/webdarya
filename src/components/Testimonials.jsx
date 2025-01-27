import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const Testimonials = () => {
    const { t } = useTranslation();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const [isAutoplay, setIsAutoplay] = useState(true);
    const [showCompliment, setShowCompliment] = useState(false);
    const [currentCompliment, setCurrentCompliment] = useState('');
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isButtonCaught, setIsButtonCaught] = useState(false);

    const testimonials = [
        {
            id: 1,
            name: t('testimonials.client1.name'),
            company: t('testimonials.client1.company'),
            position: t('testimonials.client1.position'),
            text: t('testimonials.client1.text'),
            rating: 5,
            avatar: `https://api.dicebear.com/7.x/shapes/svg?seed=${encodeURIComponent(t('testimonials.client1.name'))}&backgroundColor=b6e3f4&colors=ocean`
        },
        {
            id: 2,
            name: t('testimonials.client2.name'),
            company: t('testimonials.client2.company'),
            position: t('testimonials.client2.position'),
            text: t('testimonials.client2.text'),
            rating: 5,
            avatar: `https://api.dicebear.com/7.x/identicon/svg?seed=${encodeURIComponent(t('testimonials.client2.name'))}&backgroundColor=c0aede&colors=ocean`
        },
        {
            id: 3,
            name: t('testimonials.client3.name'),
            company: t('testimonials.client3.company'),
            position: t('testimonials.client3.position'),
            text: t('testimonials.client3.text'),
            rating: 5,
            avatar: `https://api.dicebear.com/7.x/shapes/svg?seed=${encodeURIComponent(t('testimonials.client3.name'))}&backgroundColor=ffd5dc&colors=ocean`
        }
    ];

    const compliments = [
        "Вы сегодня особенно прекрасны! ✨",
        "Ваша улыбка освещает весь мир! 🌟",
        "С вами этот мир становится лучше! 🌍",
        "Вы источник вдохновения! 💫",
        "Ваша энергия заряжает всех вокруг! ⚡",
        "Вы невероятно талантливы! 🎯",
        "Ваше присутствие - настоящий подарок! 🎁",
        "Вы делаете этот мир ярче! 🌈"
    ];

    // Следим за движением мыши
    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!isButtonCaught) {
                // Добавляем небольшую задержку для плавности
                setTimeout(() => {
                    setMousePosition({
                        x: e.clientX,
                        y: e.clientY - window.scrollY
                    });
                }, 100);
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [isButtonCaught]);

    const getRandomCompliment = () => {
        setIsButtonCaught(true);
        const randomIndex = Math.floor(Math.random() * compliments.length);
        setCurrentCompliment(compliments[randomIndex]);
        setShowCompliment(true);
        setTimeout(() => setShowCompliment(false), 3000);
    };

    useEffect(() => {
        let interval;
        if (isAutoplay) {
            interval = setInterval(() => {
                setDirection(1);
                setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
        }, 5000);
        }
        return () => clearInterval(interval);
    }, [isAutoplay, testimonials.length]);

    const slideVariants = {
        enter: (direction) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1
        },
        exit: (direction) => ({
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0
        })
    };

    const swipeConfidenceThreshold = 10000;
    const swipePower = (offset, velocity) => {
        return Math.abs(offset) * velocity;
    };

    const paginate = (newDirection) => {
        setDirection(newDirection);
        setCurrentIndex((prevIndex) => (prevIndex + newDirection + testimonials.length) % testimonials.length);
    };

    return (
        <section id="testimonials" className="relative min-h-screen bg-gradient-to-b from-gray-800 to-gray-900 py-20 overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute inset-0 bg-dots-pattern opacity-5"></div>
            <motion.div
                className="absolute top-1/4 right-10 w-72 h-72 bg-indigo-500 rounded-full opacity-10 blur-3xl"
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
                className="absolute bottom-1/4 left-10 w-96 h-96 bg-purple-500 rounded-full opacity-10 blur-3xl"
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

            {/* Floating button that follows cursor */}
            {!isButtonCaught && (
                <motion.div
                    className="fixed z-50"
                    animate={{
                        x: mousePosition.x - 75, // Центрируем кнопку относительно курсора
                        y: mousePosition.y - 20
                    }}
                    transition={{
                        type: "spring",
                        damping: 15,
                        stiffness: 200,
                        mass: 0.8
                    }}
                >
                    <motion.button
                        onClick={getRandomCompliment}
                        className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full text-white font-medium
                                 shadow-lg hover:shadow-xl transform transition-all duration-300 whitespace-nowrap"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        animate={{
                            rotate: [0, -5, 5, -5, 0],
                        }}
                        transition={{
                            rotate: {
                                repeat: Infinity,
                                duration: 2,
                                ease: "easeInOut"
                            }
                        }}
                    >
                        ✨ Поймай меня!
                    </motion.button>
                </motion.div>
            )}

            {/* Static button after being caught */}
            {isButtonCaught && (
                <div className="absolute top-4 right-4 z-20">
                    <motion.button
                        onClick={getRandomCompliment}
                        className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full text-white font-medium
                                 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        ✨ Нажми на счастье
                    </motion.button>
                    <AnimatePresence>
                        {showCompliment && (
                            <motion.div
                                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -20, scale: 0.8 }}
                                className="absolute top-16 right-0 mt-4 p-4 bg-white rounded-lg shadow-xl w-64 text-center"
                            >
                                <p className="text-gray-800 font-medium">{currentCompliment}</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            )}

            <div className="relative container mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-4xl font-bold text-white mb-4"
                    >
                        {t('testimonials.title')}
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
                        className="text-gray-400 mt-4 max-w-2xl mx-auto"
                    >
                        {t('testimonials.description')}
                    </motion.p>
                </div>

                {/* Testimonials Carousel */}
                <div className="relative max-w-4xl mx-auto">
                    <div className="relative h-[400px] overflow-hidden">
                        <AnimatePresence initial={false} custom={direction}>
                        <motion.div
                            key={currentIndex}
                                custom={direction}
                                variants={slideVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{
                                    x: { type: "spring", stiffness: 300, damping: 30 },
                                    opacity: { duration: 0.2 }
                                }}
                                drag="x"
                                dragConstraints={{ left: 0, right: 0 }}
                                dragElastic={1}
                                onDragEnd={(e, { offset, velocity }) => {
                                    const swipe = swipePower(offset.x, velocity.x);
                                    if (swipe < -swipeConfidenceThreshold) {
                                        paginate(1);
                                    } else if (swipe > swipeConfidenceThreshold) {
                                        paginate(-1);
                                    }
                                }}
                                className="absolute w-full"
                            >
                                <div className="bg-gray-800/50 rounded-2xl p-8 backdrop-blur-sm">
                                    <div className="flex flex-col items-center text-center">
                                        {/* Avatar */}
                                        <div className="relative w-24 h-24 mb-6">
                                            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full blur-lg opacity-50"></div>
                                            <img
                                                src={testimonials[currentIndex].avatar}
                                                alt={testimonials[currentIndex].name}
                                                className="relative w-24 h-24 rounded-full border-4 border-gray-800 bg-gray-800"
                                        />
                                    </div>

                                        {/* Rating */}
                                        <div className="flex gap-1 mb-4">
                                            {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                                                <svg
                                                    key={i}
                                                    className="w-5 h-5 text-yellow-500"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                >
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                            ))}
                                    </div>

                                        {/* Testimonial Text */}
                                        <blockquote className="text-gray-300 text-lg italic mb-6">
                                            "{testimonials[currentIndex].text}"
                                        </blockquote>

                                        {/* Client Info */}
                                        <div>
                                            <h4 className="text-white font-semibold">
                                                {testimonials[currentIndex].name}
                                            </h4>
                                            <p className="text-gray-400 text-sm">
                                        {testimonials[currentIndex].position}, {testimonials[currentIndex].company}
                                    </p>
                                </div>
                            </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between px-4">
                    <button
                            onClick={() => {
                                setDirection(-1);
                                paginate(-1);
                                setIsAutoplay(false);
                            }}
                            className="p-2 rounded-full bg-gray-800/50 text-white hover:bg-gray-700/50 transition-colors"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button
                            onClick={() => {
                                setDirection(1);
                                paginate(1);
                                setIsAutoplay(false);
                            }}
                            className="p-2 rounded-full bg-gray-800/50 text-white hover:bg-gray-700/50 transition-colors"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                    </div>

                    {/* Pagination Dots */}
                    <div className="flex justify-center gap-2 mt-8">
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => {
                                    setDirection(index > currentIndex ? 1 : -1);
                                    setCurrentIndex(index);
                                    setIsAutoplay(false);
                                }}
                                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                    index === currentIndex
                                        ? 'w-6 bg-gradient-to-r from-indigo-500 to-purple-500'
                                        : 'bg-gray-600 hover:bg-gray-500'
                                }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials; 