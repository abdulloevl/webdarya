import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FloatingButton = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isButtonCaught, setIsButtonCaught] = useState(false);
    const [showCompliment, setShowCompliment] = useState(false);
    const [currentCompliment, setCurrentCompliment] = useState('');

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

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!isButtonCaught) {
                const maxDistance = 100; // Максимальное расстояние убегания
                const mouseX = e.clientX;
                const mouseY = e.clientY;
                const buttonX = mousePosition.x;
                const buttonY = mousePosition.y;

                // Вычисляем новую позицию кнопки, убегающую от курсора
                let newX = buttonX + (buttonX - mouseX) * 0.1;
                let newY = buttonY + (buttonY - mouseY) * 0.1;

                // Ограничиваем движение в пределах экрана
                newX = Math.max(100, Math.min(window.innerWidth - 100, newX));
                newY = Math.max(100, Math.min(window.innerHeight - 100, newY));

                setMousePosition({
                    x: newX,
                    y: newY
                });
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [isButtonCaught, mousePosition]);

    const getRandomCompliment = () => {
        setIsButtonCaught(true);
        const randomIndex = Math.floor(Math.random() * compliments.length);
        setCurrentCompliment(compliments[randomIndex]);
        setShowCompliment(true);
        setTimeout(() => setShowCompliment(false), 3000);
    };

    return (
        <>
            {!isButtonCaught && (
                <motion.div
                    className="fixed z-50"
                    animate={{
                        x: mousePosition.x,
                        y: mousePosition.y
                    }}
                    transition={{
                        type: "spring",
                        damping: 10,
                        stiffness: 100,
                        mass: 0.5
                    }}
                >
                    <motion.button
                        onClick={getRandomCompliment}
                        className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full text-white font-medium
                                 shadow-lg hover:shadow-xl transform transition-all duration-300 whitespace-nowrap"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        animate={{
                            rotate: [0, -5, 5, -5, 0],
                        }}
                        transition={{
                            rotate: {
                                repeat: Infinity,
                                duration: 1.5,
                                ease: "easeInOut"
                            }
                        }}
                    >
                        ✨ Поймай счастье!
                    </motion.button>
                </motion.div>
            )}

            {isButtonCaught && (
                <div className="fixed top-4 right-4 z-50">
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
        </>
    );
};

export default FloatingButton; 