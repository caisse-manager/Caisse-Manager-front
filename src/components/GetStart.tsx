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
      className="absolute z-20 hidden md:block"
      style={{
        left: "50%",
        top: "18%",
        translateX: "115%",
        translateY: "75%",
        width: 180,
        height: 64,
        x: springX,
        y: springY,
        rotate: 6,
      }}
    >
      <motion.button
        className="w-full h-full bg-red-500 text-white rounded-full font-semibold shadow-2xl text-lg cursor-pointer px-6"
        whileHover={{ scale: 1.1, rotate: 0 }}
        whileTap={{ scale: 0.95 }}
      >
        GET STARTED
      </motion.button>
    </motion.div>
  );

  const MobileGetStartedButton = () => (
    <motion.div className="md:hidden mt-8">
      <motion.button
        className="bg-red-500 text-white rounded-full font-semibold shadow-xl text-sm cursor-pointer px-4 py-2"
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
      ease: "power3.out",
    });
  }, []);

  return (
    <div
      ref={heroRef}
      className="h-[60vh] md:h-[50vh] relative overflow-hidden bg-black text-white flex flex-col items-center justify-center mt-10"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <GetStartedButton />

      <div
        className="text-center space-y-2 md:space-y-4 px-4"
        ref={brandTextRef}
      >
        <div className="flex flex-col md:flex-row items-center justify-center md:space-x-4">
          <AnimatedText
            text="Caisse"
            className="text-4xl sm:text-5xl md:text-7xl lg:text-9xl font-bold italic"
          />
          <Image
            src="/caisse-manager-logo.png"
            alt="Caisse Manager Logo"
            width={60}
            height={60}
            className="rounded-md my-2 md:my-0 md:w-[80px] md:h-[80px] w-[60px] h-[60px]"
          />
          <AnimatedText
            text="Manager"
            className="text-4xl sm:text-5xl md:text-7xl lg:text-9xl font-bold italic"
          />
        </div>

        <p className="mt-4 md:mt-8 text-gray-400 text-base md:text-xl">
          Let&apos;s find your perfect match.
        </p>

        <MobileGetStartedButton />
      </div>
    </div>
  );
}
