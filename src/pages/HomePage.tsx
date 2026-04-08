import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Preloader } from '../components/preloader/Preloader';
import { HeroSection } from '../components/home/HeroSection';
import { ProjectNavigator } from '../components/home/ProjectNavigator';
import { Footer } from '../components/shared/Footer';

export const HomePage: React.FC = () => {
  const hasVisited = sessionStorage.getItem('kleem-visited');
  const [preloaderDone, setPreloaderDone] = useState(!!hasVisited);

  const handlePreloaderComplete = useCallback(() => {
    setPreloaderDone(true);
  }, []);

  return (
    <>
      {!preloaderDone && <Preloader onComplete={handlePreloaderComplete} />}
      <motion.div
        initial={{ opacity: preloaderDone ? 1 : 0 }}
        animate={{ opacity: preloaderDone ? 1 : 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <HeroSection />
        <ProjectNavigator />
        <Footer />
      </motion.div>
    </>
  );
};

export default HomePage;
