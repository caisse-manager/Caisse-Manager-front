"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

import bgImage from "@/assets/restaurant-bg.jpg";

gsap.registerPlugin(ScrollTrigger);

const services = [
  "Strategy & Ideation",
  "Creator Discovery",
  "Creator Management",
  "Content Production",
  "Content Distribution",
  "Advanced Measurement",
  "Experiential",
  "Partnerships",
  "Consultation",
];

const textLines = [
  "On ne crée pas juste des caisses,",
  "on écrit chaque jour",
  "l’histoire des commerçants",
  "qui veulent aller plus loin.",
];

export default function DiscoverUs() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-line", {
        opacity: 0,
        y: 40,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      gsap.from(".service-item", {
        opacity: 0,
        y: 30,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden text-white bg-black"
    >
      <div className="absolute inset-0 -z-10">
        <Image
          src={bgImage}
          alt="Hero Background"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="relative z-10 container mx-auto px-6 lg:px-12 py-24 grid grid-cols-1 md:grid-cols-2 items-center gap-16">
        {/* Left Text */}
        <div className="space-y-3 text-left leading-tight">
          {textLines.map((line, index) => (
            <motion.h1
              key={index}
              className="hero-line text-3xl md:text-4xl lg:text-5xl font-extrabold text-white"
            >
              {line}
            </motion.h1>
          ))}
        </div>

        <div className="space-y-1">
          <div className="space-y-4">
            {services.map((service, i) => (
              <div
                key={i}
                className="service-item group border-b border-white/30 pb-2 hover:border-[#ff0000] transition-all duration-300"
              >
                <p className="text-lg font-light group-hover:text-[#ff0000] transition-colors">
                  {i + 1}. {service}
                </p>
              </div>
            ))}
          </div>

          <div className="pt-6">
            <button className="flex items-center gap-2 text-white hover:text-[#ff0000] font-medium">
              <div className="w-6 h-6 rounded-full bg-[#ff0000] flex items-center justify-center">
                <ArrowRight className="w-4 h-4" />
              </div>
              See Our Services
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
