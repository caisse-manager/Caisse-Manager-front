'use client';

import React from 'react';
import { motion } from 'framer-motion';
import ImageColumn from './ImageColumn'; 

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 1 } },
};

const imagesLeft = [
  { src: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Personne 1' },
  { src: 'https://images.pexels.com/photos/3184318/pexels-photo-3184318.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Personne 2' },
  { src: 'https://images.pexels.com/photos/3184632/pexels-photo-3184632.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Personne 3' },
];

const imagesCenter = [
  { src: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Personne 4' },
  { src: 'https://images.pexels.com/photos/3184318/pexels-photo-3184318.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Personne 5' },
  { src: 'https://images.pexels.com/photos/3184632/pexels-photo-3184632.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Personne 6' },
];

const imagesRight = [
  { src: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Personne 7' },
  { src: 'https://images.pexels.com/photos/3184318/pexels-photo-3184318.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Personne 8' },
  { src: 'https://images.pexels.com/photos/3184632/pexels-photo-3184632.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Personne 9' },
];

const HeroSection = () => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex justify-between items-center gap-8 p-8 bg-black"
    >
      <div className="flex-1 text-center">
        <h1 className="text-4xl font-bold mb-4">
            <span className="block relative">
                Bienvenue sur la galerie
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 via-white/10 to-red-500/20 blur-xl -z-10 animate-pulse"></div>
            </span>
          </h1>
        <p className="text-gray-600">Découvrez nos images défilantes infinies avec animation.</p>
      </div>
      {/* gauche */}
      <div className="flex-1">
        <ImageColumn direction="down" images={imagesLeft} delay={3} />
      </div>

      {/* centre */}
      <div className="flex-1">
        <ImageColumn direction="up" images={imagesCenter} />
      </div>

      
      {/* droite */}
      <div className="flex-1">
        <ImageColumn direction="down" images={imagesRight} delay={3} />
      </div>
    </motion.div>
  );
};

export default HeroSection;
