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
  
  const fadeOutTriggered = useRef(false);

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
      gsap.set(textLinesRef.current, {
        color: '#9CA3AF',
        fontWeight: 'normal'
      });

      gsap.set(imageContainersRef.current, {
        filter: 'grayscale(100%)',
        scale: 1
      });

      const calculateScrollDistance = () => {
        const vh = window.innerHeight;
        return `+=${vh * 4.5}px`;
      };

      const activateValue = (index: number, progress: number) => {
        if (fadeOutTriggered.current) return;
        
        const itemProgress = (progress - (index * 0.33)) * 3; 
        if (index > 0 && textLinesRef.current[index - 1] && imageContainersRef.current[index - 1]) {
          gsap.to(textLinesRef.current[index - 1], {
            color: '#9CA3AF',
            fontWeight: 'normal',
            duration: 0.3,
            ease: "power2.inOut"
          });

          gsap.to(imageContainersRef.current[index - 1], {
            filter: 'grayscale(100%)',
            scale: 1,
            duration: 0.3,
            ease: "power2.inOut"
          });
        }

        if (textLinesRef.current[index] && imageContainersRef.current[index]) {
          gsap.to(textLinesRef.current[index], {
            color: '#FFFFFF',
            fontWeight: 'bold',
            duration: 0.5,
            ease: "power2.out"
          });

          gsap.to(imageContainersRef.current[index], {
            filter: `grayscale(${gsap.utils.interpolate(100, 0, itemProgress)}%)`,
            scale: gsap.utils.interpolate(1, 1.05, itemProgress),
            duration: 0.5,
            ease: "power2.out"
          });
        }
      };

      const triggerFadeOut = (progress: number) => {
        if (!fadeOutTriggered.current) {
          fadeOutTriggered.current = true;
          
          const fadeProgress = gsap.utils.mapRange(0.9, 1.0, 0, 1, progress);
          
          gsap.to(imageContainersRef.current, {
            filter: 'grayscale(100%)',
            opacity: gsap.utils.interpolate(1, 0, fadeProgress),
            scale: gsap.utils.interpolate(1.05, 1, fadeProgress), 
            duration: 1,
            ease: "power2.inOut",
            stagger: 0.1
          });

          gsap.to(textLinesRef.current, {
            color: '#9CA3AF',
            opacity: gsap.utils.interpolate(1, 0, fadeProgress),
            fontWeight: 'normal',
            duration: 1,
            ease: "power2.inOut",
            stagger: 0.1
          });
        } else {
          const fadeProgress = gsap.utils.mapRange(0.9, 1.0, 0, 1, progress);
          
          gsap.set(imageContainersRef.current, {
            opacity: gsap.utils.interpolate(1, 0, fadeProgress),
            scale: gsap.utils.interpolate(1.05, 1, fadeProgress)
          });

          gsap.set(textLinesRef.current, {
            opacity: gsap.utils.interpolate(1, 0, fadeProgress)
          });
        }
      };

      const resetFadeOut = () => {
        if (fadeOutTriggered.current) {
          fadeOutTriggered.current = false;
          
          gsap.set(imageContainersRef.current, {
            opacity: 1,
            filter: 'grayscale(100%)',
            scale: 1
          });

          gsap.set(textLinesRef.current, {
            opacity: 1,
            color: '#9CA3AF',
            fontWeight: 'normal'
          });
        }
      };

      const pinnedSection = ScrollTrigger.create({
        trigger: sectionRef.current,
        pin: true,
        start: "top top",
        end: calculateScrollDistance(),
        scrub: 1.5, 
        anticipatePin: 1,
        invalidateOnRefresh: true, 
        onUpdate: (self) => {
          const progress = self.progress;
          
          if (progress >= 0.9) {
            triggerFadeOut(progress);
          } else {
            if (fadeOutTriggered.current) {
              resetFadeOut();
            }
            
            if (progress <= 0.33) {
              activateValue(0, progress * 3);
            } else if (progress <= 0.66) {
              activateValue(1, (progress - 0.33) * 3);
            } else {
              activateValue(2, (progress - 0.66) * 3);
            }
          }
        }
      });

      const handleResize = () => {
        ScrollTrigger.refresh();
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        pinnedSection.kill();
        fadeOutTriggered.current = false;
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="h-screen bg-black py-4 px-4 md:px-6 lg:px-4 overflow-hidden mt-14"
    >
      <div className="max-w-[1620px] mx-auto h-full ">
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