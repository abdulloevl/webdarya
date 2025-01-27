import { motion } from 'framer-motion';

const LoadingIndicator = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed top-0 left-0 w-full h-1 bg-ocean-900 z-50"
    >
      <motion.div
        className="h-full bg-gradient-to-r from-ocean-400 via-ocean-500 to-ocean-600"
        initial={{ width: "0%" }}
        animate={{ 
          width: "100%",
          transition: {
            duration: 1,
            ease: "easeInOut"
          }
        }}
      />
    </motion.div>
  );
};

export default LoadingIndicator; 