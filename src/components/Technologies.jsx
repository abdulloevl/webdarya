import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const Technologies = () => {
  const { t } = useTranslation();

  const techStacks = [
    {
      category: 'frontend',
      techs: [
        { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
        { name: 'Vue.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg' },
        { name: 'Next.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg' },
        { name: 'Tailwind CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg' },
      ],
    },
    {
      category: 'backend',
      techs: [
        { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
        { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
        { name: 'PHP', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg' },
        { name: 'Laravel', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-plain.svg' },
      ],
    },
    {
      category: 'database',
      techs: [
        { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
        { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
        { name: 'MySQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
        { name: 'Redis', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg' },
      ],
    },
    {
      category: 'tools',
      techs: [
        { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
        { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
        { name: 'AWS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg' },
        { name: 'Figma', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
      ],
    },
  ];

  return (
    <section className="relative bg-gradient-to-b from-deep-800 to-deep-900 overflow-hidden">
      <div className="absolute inset-0 bg-wave-pattern opacity-5"></div>
      
      <div className="relative w-full min-h-screen flex items-center py-20">
        <div className="w-full max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-4xl font-bold text-ocean-100"
            >
              {t('technologies.title')}
            </motion.h2>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="w-24 h-1 bg-gradient-to-r from-ocean-400 to-ocean-200 rounded-full mx-auto mt-4"
            />
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="mt-6 text-ocean-200 text-lg max-w-2xl mx-auto"
            >
              {t('technologies.description')}
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {techStacks.map((stack, stackIndex) => (
              <motion.div
                key={stack.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: stackIndex * 0.2 }}
                className="relative"
              >
                <div className="bg-deep-700/50 backdrop-blur-xl rounded-xl border border-ocean-700/30
                              p-6 transition-all duration-300 hover:border-ocean-500/50">
                  <h3 className="text-xl font-semibold text-ocean-100 mb-6">
                    {t(`technologies.categories.${stack.category}`)}
                  </h3>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                    {stack.techs.map((tech, techIndex) => (
                      <motion.div
                        key={tech.name}
                        initial={{ scale: 0.8, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: techIndex * 0.1 }}
                        whileHover={{ 
                          scale: 1.1,
                          rotateY: 180,
                          transition: { duration: 0.6 }
                        }}
                        className="flex flex-col items-center perspective-1000"
                      >
                        <div className="w-20 h-20 flex items-center justify-center bg-deep-800/50
                                      rounded-xl mb-3 p-3 shadow-lg transform-gpu transition-all duration-300
                                      hover:shadow-ocean-500/20 group">
                          <motion.img
                            src={tech.icon}
                            alt={tech.name}
                            className="w-full h-full object-contain transform-gpu transition-transform duration-500
                                     group-hover:scale-110"
                            style={{ 
                              transformStyle: 'preserve-3d',
                              backfaceVisibility: 'hidden'
                            }}
                          />
                        </div>
                        <span className="text-ocean-200 text-sm text-center font-medium">
                          {tech.name}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <motion.div
        className="absolute top-1/4 right-5 w-64 h-64 bg-ocean-400 rounded-full opacity-10 blur-3xl"
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
  );
};

export default Technologies; 