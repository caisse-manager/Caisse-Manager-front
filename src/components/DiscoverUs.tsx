"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

const bgImageUrl = "/restaurant-bg.jpg";

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
  "l'histoire des commerçants",
  "qui veulent aller plus loin.",
];

export default function DiscoverUs() {
  const sectionRef = useRef(null);
  const backgroundRef = useRef(null);
  const textContainerRef = useRef(null);
  const servicesRef = useRef(null);
  const ctaRef = useRef(null);
  const paragraphRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      const background = backgroundRef.current;

      if (!section || !background) return;

      gsap.set(background, {
        opacity: 1,
        visibility: "visible"
      });

      gsap.to(background, {
        y: -50,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.set(".hero-line", { opacity: 0, y: 80 });
      gsap.to(".hero-line", {
        opacity: 1,
        y: 0,
        stagger: 0.3,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: textContainerRef.current,
          start: "top 80%",
          end: "bottom 60%",
          scrub: true,
        },
      });

      gsap.utils.toArray<HTMLElement>(".service-item").forEach((item) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 95%",
              end: "top 75%",
              scrub: true,
            },
          }
        );
      });

      gsap.fromTo(
        paragraphRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: servicesRef.current,
            start: "bottom bottom-=200",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 95%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative text-white bg-black overflow-hidden min-h-[120vh] mt-20"
      style={{ backgroundImage: `url(${bgImageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div
        ref={backgroundRef}
        className="absolute inset-0 -z-10 w-full h-full"
      >
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />
      </div>

      <div className="relative z-10 max-w-screen-xl mx-auto px-6 md:px-10 lg:px-20 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-start gap-12">
          <div
            ref={textContainerRef}
            className="space-y-4 sticky top-24 self-start"
          >
            {textLines.map((line, index) => (
              <motion.h1
                key={index}
                className="hero-line text-white text-[6vw] md:text-[4vw] lg:text-[3vw] font-extrabold leading-tight drop-shadow"
              >
                {line}
              </motion.h1>
            ))}
          </div>

            <div ref={servicesRef} className="space-y-4 mt-170 ml-10">
              {services.map((service, i) => (
                <div
                  key={i}
                  className="service-item border-b border-white/30 pb-2"
                >
                  <p className="text-lg font-medium">
                    {i + 1}. {service}
                  </p>
                </div>
              ))}
              <div ref={ctaRef} >
                  <button className="cta-button flex items-center gap-3 text-white hover:text-[#ff0000] font-medium text-lg transition-all duration-300">
                    <div className="w-8 h-8 rounded-full bg-[#ff0000] flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-red-500/25">
                      <ArrowRight className="w-5 h-5 text-white" />
                    </div>
                    See Our Services
                  </button>
              </div>
            </div>

            <div>
              <div ref={paragraphRef} className="pt-8 opacity-0">
                <p className="text-white text-sm md:text-base lg:text-lg max-w-md">
                  From talent discovery to advanced campaign analytics, our team
                  handles every step of the process for successful partnerships
                  with your brand.
                </p>
              </div>

              <div ref={ctaRef} className="pt-5">
                <button className="cta-button flex items-center gap-3 text-white hover:text-[#ff0000] font-medium text-lg transition-all duration-300">
                  <div className="w-8 h-8 rounded-full bg-[#ff0000] flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-red-500/25">
                    <ArrowRight className="w-5 h-5 text-white" />
                  </div>
                  See Our Services
                </button>
              </div>
            </div>
        </div>
      </div>
    </section>
  );
}
