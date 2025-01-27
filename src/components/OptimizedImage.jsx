import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { preloadImage, isImageCached } from '../services/imageCache';

const OptimizedImage = ({
  src,
  alt,
  className = '',
  width,
  height,
  priority = false,
  placeholder = 'blur',
  blurDataURL,
  onLoad,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(isImageCached(src));
  const [error, setError] = useState(false);
  const [currentView, setCurrentView] = useState(
    isLoaded ? 'image' : (blurDataURL && placeholder === 'blur' ? 'blur' : 'placeholder')
  );

  useEffect(() => {
    if (!priority && !isLoaded) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              loadImage();
              observer.disconnect();
            }
          });
        },
        {
          rootMargin: '50px',
        }
      );

      const element = document.getElementById(`image-${src}`);
      if (element) {
        observer.observe(element);
      }

      return () => observer.disconnect();
    } else if (priority && !isLoaded) {
      loadImage();
    }
  }, [src, priority, isLoaded]);

  const loadImage = async () => {
    try {
      await preloadImage(src);
      setIsLoaded(true);
      setCurrentView('image');
      onLoad?.();
    } catch (err) {
      console.error('Failed to load image:', err);
      setError(true);
      setCurrentView('error');
    }
  };

  const renderContent = () => {
    switch (currentView) {
      case 'blur':
        return (
          <motion.div
            key="blur"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat filter blur-lg transform scale-110"
            style={{
              backgroundImage: `url(${blurDataURL})`,
            }}
          />
        );
      case 'placeholder':
        return (
          <motion.div
            key="placeholder"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-gray-200 animate-pulse"
          />
        );
      case 'image':
        return (
          <motion.img
            key="image"
            src={src}
            alt={alt}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full object-cover"
            {...props}
          />
        );
      case 'error':
        return (
          <motion.div
            key="error"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 flex items-center justify-center bg-gray-200"
          >
            <span className="text-gray-500">Failed to load image</span>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div
      id={`image-${src}`}
      className={`relative overflow-hidden ${className}`}
      style={{
        width: width || '100%',
        height: height || '100%',
      }}
    >
      <AnimatePresence mode="wait">
        {renderContent()}
      </AnimatePresence>
    </div>
  );
};

export default OptimizedImage; 