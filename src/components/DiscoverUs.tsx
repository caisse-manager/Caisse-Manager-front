"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
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
  { text: "A ", style: "regular" },
  { text: "TALENT", style: "regular" },
  { text: " FIRST", style: "regular" },
  { text: "APPROACH TO", style: "regular" },
  { text: "FULL ", style: "regular" },
  { text: "SERVICE", style: "regular" },
  { text: ".", style: "regular" },
  { text: "WORKING WITH", style: "regular" },
  { text: "CONTENT CREATORS", style: "regular" },
  { text: "TO ", style: "regular" },
  { text: "BRING", style: "regular" },
  { text: " BRAND", style: "regular " },
  { text: "STORIES", style: "regular" },
  { text: " TO LIFE.", style: "regular" },
];

export default function DiscoverUs() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      const background = backgroundRef.current;
      const textContainer = textContainerRef.current;
      const carousel = carouselRef.current;

      if (!section || !background || !textContainer || !carousel) return;

      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom-=50% top",
        pin: true,
        pinSpacing: false,
      });

      gsap.to(background, {
        backgroundPosition: "50% 100%",
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.set(".hero-line", { 
        opacity: 0, 
        y: 80,
        rotationX: 15
      });

      gsap.to(".hero-line", {
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.5, 
        scrollTrigger: {
          trigger: textContainer,
          start: "top 70%",
          end: "bottom 40%",
          scrub: 1,
        },
      });

      gsap.set(".service-item", {
        opacity: 0,
        y: 50,
        scale: 0.95
      });

      gsap.to(".service-item", {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
        delay: 0.6,
        scrollTrigger: {
          trigger: carousel,
          start: "top center+=100",
          toggleActions: "play none none reverse",
          once: false,
        },
      });

      gsap.set(".cta-button", {
        opacity: 0,
        y: 30,
        scale: 0.9
      });

      gsap.to(".cta-button", {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: ".cta-button",
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const getTextStyle = (style: string) => {
    const baseClasses = "hero-line inline";
    
    if (style === "script") {
      return `${baseClasses} font-script italic`;
    }
    if (style === "purple") {
      return `${baseClasses} text-purple-400`;
    }
    if (style === "script purple") {
      return `${baseClasses} font-script italic text-purple-400`;
    }
    return baseClasses;
  };

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden text-white bg-black"
      style={{ height: "100vh" }}
    >
      <div 
        ref={backgroundRef}
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage: `url(${bgImage.src})`,
          backgroundSize: 'cover',
          backgroundPosition: '50% 0%',
          backgroundAttachment: 'fixed',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="relative z-10 h-full flex">
        <div className="w-full max-w-screen-xl mx-25 px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div 
              ref={textContainerRef}
              className="space-y-0 text-left "
            >
              <h1 className="text-white text-[8vw] md:text-[5.5vw] lg:text-[4.2vw] xl:text-[3.8vw] font-black leading-[0.9] tracking-tight">
                {textLines.map((item, index) => (
                  <span
                    key={index}
                    className={getTextStyle(item.style)}
                  >
                    {item.text}
                  </span>
                ))}
              </h1>
            </div>

            <div className="flex flex-col justify-center h-full ml-60 mt-12">
              <div 
                ref={carouselRef}
                className="space-y-6"
              >
                {services.map((service, i) => (
                  <div
                    key={i}
                    className="service-item group pb-6 border-b border-white/20 hover:border-white/40 transition-all duration-500 cursor-pointer transform hover:translate-x-2"
                  >
                    <p className="text-xl lg:text-2xl font-light tracking-wide group-hover:text-white text-white/90 transition-colors duration-300 flex items-center">
                      <span className="text-white/60 mr-4 font-normal text-lg">
                        {String(i + 1).padStart(2, '0')}.
                      </span>
                      {service}
                    </p>
                  </div>
                ))}
              </div>

              <div className="pt-5">
                <button className="cta-button flex items-center gap-4 text-white hover:text-red-500 font-medium text-lg transition-all duration-300 hover:gap-6 group">
                  <div className="w-9 h-9 rounded-full bg-red-500 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-red-500group-hover:shadow-lg group-hover:shadow-red-500/25">
                    <ArrowRight className="w-5 h-5 text-white" />
                  </div>
                  See Our Services
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .font-script {
          font-family: 'Dancing Script', cursive, system-ui;
          font-weight: 600;
        }
      `}</style>
    </section>
  );
}