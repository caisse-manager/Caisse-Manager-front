"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import AnimatedText from "./AnimatedText";
import Image from "next/image";
import gsap from "gsap";

export default function GetStart() {
  const heroRef = useRef<HTMLDivElement>(null);
  const brandTextRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 300, damping: 24 });
  const springY = useSpring(mouseY, { stiffness: 300, damping: 24 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;
    const maxOffset = 950;
    mouseX.set(Math.max(-maxOffset, Math.min(offsetX, maxOffset)));
    mouseY.set(Math.max(-maxOffset, Math.min(offsetY, maxOffset)));
  };
  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const GetStartedButton = () => (
    <motion.div
      className="absolute z-20"
      style={{
        left: '50%', 
        top: '18%',
        translateX: '120%',
        translateY: '70%',
        width: 180,
        height: 64,
        x: springX,
        y: springY,
      }}
    >
      <motion.button
        className="w-full h-full bg-red-500 text-white rounded-full font-semibold shadow-2xl text-lg cursor-pointer px-6"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        GET STARTED
      </motion.button>
    </motion.div>
  );

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 });
    tl.from(brandTextRef.current, {
      y: 100,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out"
    });
  }, []);

  return (
    <div
      ref={heroRef}
      className="h-[50vh] relative overflow-hidden bg-black text-white flex flex-col items-center justify-center mt-10"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <GetStartedButton />

      <div className="text-center space-y-4" ref={brandTextRef}>
        <div className="flex items-center justify-center space-x-4">
          <AnimatedText
            text="Caisse"
            className="text-6xl md:text-8xl lg:text-9xl font-bold"
          />
          <Image
            src="/caisse-manager-logo.png"
            alt="sample"
            width={80}
            height={80}
            className="rounded-md"
          />
          <AnimatedText
            text="Manager"
            className="text-6xl md:text-8xl lg:text-9xl font-bold italic"
          />
        </div>

        <p className="mt-8 text-gray-400 text-lg md:text-xl">
          Let&apos;s find your perfect match.
        </p>
      </div>
    </div>
  );
}
