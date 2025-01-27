import React from 'react';
import { motion } from 'framer-motion';

const Preloader = () => {
  // Генерируем капли дождя с большей вариативностью
  const raindrops = Array.from({ length: 150 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    initialY: -(Math.random() * 100), // Начальная позиция выше экрана
    delay: Math.random() * 4, // Больше разброс в задержке
    duration: Math.random() * 2 + 3, // Разная скорость падения
    size: Math.random() * 2 + 1, // Немного уменьшили размер
    opacity: Math.random() * 0.3 + 0.2 // Разная прозрачность
  }));

  // Генерируем листья для эффекта ветра
  const leaves = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    initialX: Math.random() * 100,
    initialY: Math.random() * 100,
    size: Math.random() * 10 + 10,
    delay: Math.random() * 2,
    duration: Math.random() * 2 + 3
  }));

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-gradient-to-b from-gray-700 to-gray-900 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Контейнер для дождя */}
      <div className="absolute inset-0 z-10">
        {raindrops.map((drop) => (
          <motion.div
            key={drop.id}
            className="absolute bg-blue-200 rounded-full"
            style={{
              left: `${drop.x}%`,
              width: `${drop.size}px`,
              height: `${drop.size * 5}px`,
              top: `${drop.initialY}vh`,
              opacity: drop.opacity,
              willChange: 'transform'
            }}
            animate={{
              y: ['0vh', '120vh'],
              opacity: [drop.opacity, 0],
              skewX: -15
            }}
            transition={{
              duration: drop.duration,
              delay: drop.delay,
              repeat: Infinity,
              repeatDelay: Math.random() * 2,
              ease: 'linear'
            }}
          />
        ))}
      </div>

      {/* Листья на ветру */}
      <div className="absolute inset-0 z-20">
        {leaves.map((leaf) => (
          <motion.div
            key={leaf.id}
            className="absolute"
            style={{
              left: `${leaf.initialX}%`,
              top: `${leaf.initialY}%`
            }}
          >
            <motion.div
              className="w-4 h-4 bg-gradient-to-br from-yellow-600 to-orange-700 opacity-60"
              style={{
                width: `${leaf.size}px`,
                height: `${leaf.size}px`,
                clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
                willChange: 'transform'
              }}
              initial={{ scale: 0, rotate: 0, x: -100 }}
              animate={{
                scale: [1, 0.8, 1],
                rotate: [0, 360],
                x: [0, window.innerWidth + 100],
                y: [0, 50, -50, 0]
              }}
              transition={{
                duration: leaf.duration,
                delay: leaf.delay,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />
          </motion.div>
        ))}
      </div>

      {/* Эффект тумана */}
      <motion.div
        className="absolute inset-0 z-30 pointer-events-none bg-gradient-to-r from-gray-900/50 to-transparent"
        animate={{
          opacity: [0.3, 0.5, 0.3],
          x: [-100, 100, -100]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />

      {/* Логотип или текст */}
      <div className="absolute inset-0 z-40 flex items-center justify-center pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-4xl font-bold text-white text-center"
        >
          Web Darya
          <motion.div
            className="w-24 h-1 bg-gradient-to-r from-ocean-400 to-ocean-200 rounded-full mx-auto mt-4"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Preloader; 