'use client';

import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import Image from 'next/image';

interface ImageItem {
  src: string;
  alt: string;
}

interface ImageColumnProps {
  direction: 'up' | 'down';
  images: ImageItem[];
  delay?: number;
}

const ImageColumn: React.FC<ImageColumnProps> = ({ direction, images, delay = 0 }) => {
  const controls = useAnimation();
  const [duplicatedImages, setDuplicatedImages] = useState<ImageItem[]>([]);

  useEffect(() => {
    const multipliedImages = Array(6).fill(images).flat();
    setDuplicatedImages(multipliedImages);
  }, [images]);

  useEffect(() => {
    const startAnimation = async () => {
      await new Promise(resolve => setTimeout(resolve, delay * 500));

      const imageHeight = 300; 
      const totalHeight = imageHeight * images.length;

      controls.start({
        y: direction === 'down' ? [0, -totalHeight] : [-totalHeight, 0],
        transition: {
          duration: 30,
          repeat: Infinity,
          ease: 'linear',
          repeatType: 'loop',
        },
      });
    };

    startAnimation();
  }, [controls, direction, delay, images.length]);

  return (
<div className="max-h-screen overflow-hidden relative">
      <motion.div
        animate={controls}
        className="flex flex-col space-y-4 py-4"
        style={{
          height: 'screen',
          y: direction === 'down' ? 0 : `-${300 * images.length}px`,
        }}
      >
        {duplicatedImages.map((image, index) => (
          <motion.div
            key={index}
            className="relative overflow-hidden rounded-lg aspect-[3/4] bg-black flex-shrink-0"
            style={{ height: 280, width: 210 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <Image
              src={image.src}
              alt={image.alt}
              height={300}
              width={210}
              className="w-full h-full object-cover"
              loading="lazy"
              priority={false}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default ImageColumn;
