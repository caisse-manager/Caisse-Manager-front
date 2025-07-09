"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ValuesSection(): React.ReactNode {
  const sectionRef = useRef(null);
  const textLinesRef = useRef<Array<HTMLSpanElement | null>>([]);
  const imagesRef = useRef<Array<HTMLImageElement | null>>([]);
  const imageContainersRef = useRef<Array<HTMLDivElement | null>>([]);
  const [isMobile, setIsMobile] = useState(false);

  const values = [
    {
      id: 1,
      text: "We build spaces that serve people first, ensuring inclusivity and accessibility.",
      image: "/OurValue/image1.jpg",
      alt: "Modern workspace with laptop and natural lighting",
    },
    {
      id: 2,
      text: "We connect across communities and collaborate with local stakeholders.",
      image: "/OurValue/image2.jpg",
      alt: "Collaborative workspace environment",
    },
    {
      id: 3,
      text: "We turn vision into vitality, creating transformative hubs that foster resilience, health, and thriving communities.",
      image: "/OurValue/image3.jpg",
      alt: "Modern office interior design",
    },
  ];

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      if (!section) return;

      values.forEach((_, i) => {
        const textEl = textLinesRef.current[i];
        const imageEl = imageContainersRef.current[i];

        if (textEl) {
          gsap.set(textEl, {
            color: i === 0 ? "#FFFFFF" : "#9CA3AF",
            fontWeight: i === 0 ? 700 : 400,
          });
        }

        if (imageEl) {
          gsap.set(imageEl, {
            filter:
              i === 0 ? "grayscale(0%) brightness(1.1)" : "grayscale(100%)",
            scale: i === 0 ? 1.02 : 1,
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

          let currentIndex = Math.floor(progress / step);
          if (currentIndex >= total) currentIndex = total - 1;

          values.forEach((_, i) => {
            const textEl = textLinesRef.current[i];
            const imageEl = imageContainersRef.current[i];

            if (textEl) {
              if (i === currentIndex) {
                gsap.to(textEl, {
                  color: "#FFFFFF",
                  fontWeight: 700,
                  duration: 0.5,
                  ease: "power2.out",
                });
              } else {
                gsap.to(textEl, {
                  color: "#9CA3AF",
                  fontWeight: 400,
                  duration: 0.5,
                  ease: "power2.out",
                });
              }
            }

            if (imageEl) {
              if (i === currentIndex) {
                gsap.to(imageEl, {
                  filter:
                    "grayscale(0%) brightness(1.1) contrast(1.1) saturate(1.2)",
                  scale: 1.02,
                  duration: 0.5,
                  ease: "power2.out",
                });
              } else {
                gsap.to(imageEl, {
                  filter: "grayscale(100%) brightness(0.8)",
                  scale: 1,
                  duration: 0.5,
                  ease: "power2.out",
                });
              }
            }
          });
        },
      });

      const handleResize = () => ScrollTrigger.refresh();
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
        ScrollTrigger.getAll().forEach((st) => st.kill());
      };
    }, sectionRef);

    return () => ctx.revert();
  }, [isMobile]);

  if (isMobile) {
    return (
      <section className="bg-black py-8 px-4 mt-14">
        <div className="max-w-4xl mx-auto">
          {/* Titre */}
          <h2 className="text-3xl font-bold text-white leading-tight mb-8">
            Designing impactful solutions.
          </h2>

          {/* Paragraphe d'intro */}
          <div className="mb-12">
            <h3 className="text-xl font-semibold text-white mb-6">
              Our Values
            </h3>
            <div className="text-gray-300 text-base leading-relaxed max-w-lg">
              {values.map((value, idx) => (
                <span key={value.id} className="inline">
                  {value.text}
                  {idx < values.length - 1 && " "}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            {values.map((value) => (
              <div
                key={value.id}
                className="w-full h-64 relative rounded-xl overflow-hidden"
              >
                <Image
                  src={value.image}
                  alt={value.alt}
                  fill
                  className="object-cover"
                  sizes="100vw"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="h-screen bg-black py-4 px-4 md:px-6 lg:px-4 overflow-hidden m-12"
    >
      <div className="max-w-[1220px] mx-auto h-full">
        <div className="grid md:grid-cols-2 gap-4 lg:gap-8 mb-4">
          <div>
            <h2 className="text-2xl md:text-5xl lg:text-8xl font-bold text-white leading-none">
              Designing impactful solutions.
            </h2>
          </div>

          <div className="space-y-2 mt-7">
            <h3 className="text-xl font-semibold text-white">Our Values</h3>
            <div className="text-gray-400 text-base leading-relaxed max-w-xl">
              {values.map((value, idx) => (
                <span
                  key={value.id}
                  ref={(el) => {
                    textLinesRef.current[idx] = el;
                  }}
                  className="inline transition-all duration-300"
                  style={{ fontWeight: idx === 0 ? 700 : 400 }}
                >
                  {value.text}
                  {idx < values.length - 1 && " "}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="relative w-[180vh] h-[60vh] mt-8">
          <div
            ref={(el) => {
              imageContainersRef.current[0] = el;
            }}
            className="absolute left-0 top-0 w-[65%] h-full overflow-hidden"
            style={{
              clipPath: "polygon(0% 0%, 99% 0%, 82% 100%, 0% 100%)",
              borderRadius: "20px",
            }}
          >
            <Image
              ref={(el) => {
                imagesRef.current[0] = el;
              }}
              src={values[0].image}
              alt={values[0].alt}
              fill
              className="object-cover transition-all duration-700"
              sizes="50vw"
              priority
            />
          </div>

          <div
            ref={(el) => {
              imageContainersRef.current[1] = el;
            }}
            className="absolute right-0 top-0 w-[42%] h-[46%] overflow-hidden"
            style={{
              clipPath: "polygon(20% 0%, 100% 0%, 100% 100%, 8% 100%)",
              borderRadius: "20px",
            }}
          >
            <Image
              ref={(el) => {
                imagesRef.current[1] = el;
              }}
              src={values[1].image}
              alt={values[1].alt}
              fill
              className="object-cover transition-all duration-700"
              sizes="37vw"
            />
          </div>

          <div
            ref={(el) => {
              imageContainersRef.current[2] = el;
            }}
            className="absolute right-0 bottom-0 w-[51%] h-[50%] overflow-hidden"
            style={{
              clipPath: "polygon(24% 0%, 100% 0%, 100% 100%, 13% 100%)",
              borderRadius: "20px",
            }}
          >
            <Image
              ref={(el) => {
                imagesRef.current[2] = el;
              }}
              src={values[2].image}
              alt={values[2].alt}
              fill
              className="object-cover transition-all duration-700"
              sizes="37vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
