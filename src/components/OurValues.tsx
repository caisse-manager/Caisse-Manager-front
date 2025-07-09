"use client"

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ValuesSection(): React.ReactNode {
  const sectionRef = useRef(null);
  const textLinesRef = useRef<Array<HTMLParagraphElement | null>>([]);
  const imagesRef = useRef<Array<HTMLImageElement | null>>([]);
  const imageContainersRef = useRef<Array<HTMLDivElement | null>>([]);

  const values = [
    {
      id: 1,
      text: "We build spaces that serve people first, ensuring inclusivity and accessibility.",
      image: "/OurValue/image1.jpg",
      alt: "Modern workspace with laptop and natural lighting"
    },
    {
      id: 2,
      text: "We connect across communities and collaborate with local stakeholders.",
      image: "/OurValue/image2.jpg",
      alt: "Collaborative workspace environment"
    },
    {
      id: 3,
      text: "We turn vision into vitality, creating transformative hubs that foster resilience, health, and thriving communities.",
      image: "/OurValue/image3.jpg",
      alt: "Modern office interior design"
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      if (!section) return;

      // Initial state: first element active, others inactive
      values.forEach((_, i) => {
        const textEl = textLinesRef.current[i];
        const imageEl = imageContainersRef.current[i];
        
        if (textEl) {
          gsap.set(textEl, { 
            color: i === 0 ? "#FFFFFF" : "#9CA3AF", 
            fontWeight: i === 0 ? 700 : 400 
          });
        }
        
        if (imageEl) {
          gsap.set(imageEl, { 
            filter: i === 0 ? "grayscale(0%) brightness(1.2)" : "grayscale(100%)",
            scale: i === 0 ? 1.05 : 1
          });
        }
      });

      const total = values.length;
      const step = 1 / total;

      ScrollTrigger.create({
        trigger: section,
        pin: true,
        start: "top top",
        end: `+=${window.innerHeight * 4.5}`,
        scrub: 1.5,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const progress = self.progress;
          
          // Calculate current active index
          let currentIndex = Math.floor(progress / step);
          if (currentIndex >= total) currentIndex = total - 1;

          // Update all elements
          values.forEach((_, i) => {
            const textEl = textLinesRef.current[i];
            const imageEl = imageContainersRef.current[i];
            
            if (textEl) {
              if (i === currentIndex) {
                // Active text: white and bold
                gsap.to(textEl, { 
                  color: "#FFFFFF", 
                  fontWeight: 700, 
                  duration: 0.5, 
                  ease: "power2.out" 
                });
              } else {
                // Inactive text: gray and normal
                gsap.to(textEl, { 
                  color: "#9CA3AF", 
                  fontWeight: 400, 
                  duration: 0.5, 
                  ease: "power2.out" 
                });
              }
            }
            
            if (imageEl) {
              if (i === currentIndex) {
                // Active image: color and zoomed
                gsap.to(imageEl, { 
                  filter: "grayscale(0%) brightness(1.2) sepia(0.3) hue-rotate(-10deg) saturate(1.5)",
                  scale: 1.05, 
                  duration: 0.5, 
                  ease: "power2.out" 
                });
              } else {
                // Inactive image: grayscale and normal scale
                gsap.to(imageEl, { 
                  filter: "grayscale(100%)",
                  scale: 1, 
                  duration: 0.5, 
                  ease: "power2.out" 
                });
              }
            }
          });
        }
      });

      const handleResize = () => ScrollTrigger.refresh();
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        ScrollTrigger.getAll().forEach(st => st.kill());
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="h-screen bg-black py-4 px-4 md:px-6 lg:px-4 overflow-hidden mt-14"
    >
      <div className="max-w-[1620px] mx-auto h-full">
        <div className="grid md:grid-cols-2 gap-4 lg:gap-8 mb-4">
          <div>
            <h2 className="text-2xl md:text-5xl lg:text-8xl font-bold text-white leading-none">
              Designing impactful solutions.
            </h2>
          </div>

          <div className="space-y-2 mt-7">
            <h3 className="text-xl font-semibold text-white">Our Values</h3>
            <div className="space-y-4">
              {values.map((value, index) => (
                <p
                  key={value.id}
                  ref={(el) => { textLinesRef.current[index] = el; }}
                  className="text-gray-400 text-base leading-relaxed transition-all duration-300"
                >
                  {value.text}
                </p>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-15 mt-15">
          <div className="lg:col-span-2">
            <div 
              ref={(el) => { imageContainersRef.current[0] = el; }}
              className="relative h-[50vh] md:h-[55vh] lg:h-[60vh] rounded-lg overflow-hidden shadow-2xl transition-all duration-700"
            >
              <Image
                ref={(el) => { imagesRef.current[0] = el; }}
                src={values[0].image}
                alt={values[0].alt}
                fill
                className="object-cover"
                sizes="(max-width: 968px) 100vw, (max-width: 1024px) 50vw, 66vw"
                priority
              />
            </div>
          </div>

          <div className="space-y-6">
            <div 
              ref={(el) => { imageContainersRef.current[1] = el; }}
              className="relative h-[68vh] md:h-[26vh] lg:h-[28vh] rounded-lg overflow-hidden shadow-2xl transition-all duration-700" 
            >
              <Image
                ref={(el) => { imagesRef.current[1] = el; }}
                src={values[1].image}
                alt={values[1].alt}
                fill
                className="object-cover"
                sizes="(max-width: 1068px) 120vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <div 
              ref={(el) => { imageContainersRef.current[2] = el; }}
              className="relative h-[68vh] md:h-[26vh] lg:h-[28vh] rounded-lg overflow-hidden shadow-2xl transition-all duration-700" 
            >
              <Image
                ref={(el) => { imagesRef.current[2] = el; }}
                src={values[2].image}
                alt={values[2].alt}
                fill
                className="object-cover"
                sizes="(max-width: 968px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
          </div>
          <div className="shrink-0" style={{ width: "120vw" }}></div>  
        </div>
      </div>
    </section>
  );
}