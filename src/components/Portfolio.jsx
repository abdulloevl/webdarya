import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const Portfolio = () => {
    const { t } = useTranslation();
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [hoveredProject, setHoveredProject] = useState(null);

    const categories = [
        { id: 'all', label: t('portfolio.categories.all') },
        { id: 'landing', label: t('portfolio.categories.landing') },
        { id: 'business', label: t('portfolio.categories.business') },
        { id: 'ecommerce', label: t('portfolio.categories.ecommerce') }
    ];

    const projects = [
        {
            id: 1,
            title: t('portfolio.projects.project1.title'),
            description: t('portfolio.projects.project1.description'),
            category: 'landing',
            image: '/images/portfolio/project1.jpg',
            technologies: ['React', 'TailwindCSS', 'Framer Motion'],
            link: 'https://example.com/project1'
        },
        {
            id: 2,
            title: t('portfolio.projects.project2.title'),
            description: t('portfolio.projects.project2.description'),
            category: 'business',
            image: '/images/portfolio/project2.jpg',
            technologies: ['Vue.js', 'Node.js', 'MongoDB'],
            link: 'https://example.com/project2'
        },
        {
            id: 3,
            title: t('portfolio.projects.project3.title'),
            description: t('portfolio.projects.project3.description'),
            category: 'ecommerce',
            image: '/images/portfolio/project3.jpg',
            technologies: ['Next.js', 'Stripe', 'PostgreSQL'],
            link: 'https://example.com/project3'
        }
    ];

    const filteredProjects = selectedCategory === 'all'
        ? projects
        : projects.filter(project => project.category === selectedCategory);

    return (
        <section id="portfolio" className="relative min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-20 overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
            <motion.div
                className="absolute top-1/4 left-10 w-72 h-72 bg-indigo-500 rounded-full opacity-10 blur-3xl"
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
                className="absolute bottom-1/4 right-10 w-96 h-96 bg-purple-500 rounded-full opacity-10 blur-3xl"
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
                        {t('portfolio.title')}
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
                        {t('portfolio.description')}
                    </motion.p>
                </div>

                {/* Category Filter */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className="flex flex-wrap justify-center gap-4 mb-12"
                >
                    {categories.map(category => (
                        <button
                            key={category.id}
                            onClick={() => setSelectedCategory(category.id)}
                            className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300
                                ${selectedCategory === category.id
                                    ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg shadow-indigo-500/25'
                                    : 'bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-800'
                            }`}
                        >
                            {category.label}
                        </button>
                    ))}
                </motion.div>

                {/* Projects Grid */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    <AnimatePresence mode="wait">
                        {filteredProjects.map(project => (
                            <motion.div
                                key={project.id}
                                layout
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.5 }}
                                className="relative group"
                                onHoverStart={() => setHoveredProject(project.id)}
                                onHoverEnd={() => setHoveredProject(null)}
                            >
                                <div className="relative overflow-hidden rounded-xl bg-gray-800/50 shadow-xl h-full">
                                    {/* Project Image */}
                                    <div className="aspect-video overflow-hidden">
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                                        />
                                    </div>

                                    {/* Project Info */}
                                    <div className="p-6 bg-gray-800/95">
                                        <h3 className="text-xl font-bold text-white mb-2">
                                            {project.title}
                                        </h3>
                                        <p className="text-gray-300 text-sm mb-4">
                                            {project.description}
                                        </p>
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {project.technologies.map((tech, index) => (
                                                <span
                                                    key={index}
                                                    className="px-2 py-1 text-xs font-medium bg-gray-700/50 text-gray-300 rounded"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                        <a
                                            href={project.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
                                        >
                                            {t('portfolio.viewProject')}
                                            <svg
                                                className="w-4 h-4 ml-2"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                                                />
                                            </svg>
                                        </a>
                                    </div>
                                </div>

                                {/* Hover Effect */}
                                <motion.div
                                    className="absolute -inset-1 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-30 blur transition-all duration-500"
                                    animate={{
                                        scale: hoveredProject === project.id ? 1 : 0.8,
                                    }}
                                    transition={{
                                        duration: 0.3,
                                    }}
                                />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    );
};

export default Portfolio; 