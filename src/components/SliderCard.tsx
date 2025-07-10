import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface SliderCardProps {
  coverImage: string;
  hoverImage: string;
  title: string;
}

const SliderCard: React.FC<SliderCardProps> = ({ coverImage, hoverImage, title }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="flex flex-col items-center select-none">
      {/* Carte animée */}
      <motion.div
        className="relative overflow-hidden rounded-xl bg-black/90 border border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.1)] cursor-pointer"
        style={{ width: 400, height: 250 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ scale: 1.03 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        layout
      >
        {/* Image normale */}
        <motion.img
          src={coverImage}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover rounded-xl"
          initial={{ opacity: 1, scale: 1 }}
          animate={{ opacity: isHovered ? 0 : 1, scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          loading="lazy"
          style={{ userSelect: 'none' }}
        />

        {/* Image au survol */}
        <motion.img
          src={hoverImage}
          alt={`${title} hover`}
          className="absolute inset-0 w-full h-full object-cover rounded-xl"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.95 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          loading="lazy"
          style={{ userSelect: 'none' }}
        />

        {/* Overlay sombre en dégradé */}
        <motion.div
          className="absolute inset-0 rounded-xl bg-gradient-to-t from-black/80 via-transparent to-transparent"
          initial={{ opacity: 0.75 }}
          animate={{ opacity: isHovered ? 0.9 : 0.75 }}
          transition={{ duration: 0.3 }}
        />

        {/* Effet de bordure lumineuse au survol */}
        <motion.div
          className="absolute inset-0 rounded-xl pointer-events-none border-2 border-transparent"
          animate={{
            borderColor: isHovered ? 'rgba(187, 187, 187, 0.3)' : 'transparent',
            boxShadow: isHovered
              ? '0 0 10px 2px rgba(187, 187, 187, 0.3)'
              : '0 0 0 rgba(0,0,0,0)',
          }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
        />
      </motion.div>

      {/* Titre */}
      <motion.h3
        className="mt-4 w-[400px] pl-3 text-left text-white text-lg font-semibold tracking-wide drop-shadow-lg"
        initial={{ y: 20, opacity: 0.8 }}
        animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0.8 }}
        transition={{ duration: 0.3 }}
      >
        {title}
      </motion.h3>
    </div>
  );
};

export default SliderCard;
