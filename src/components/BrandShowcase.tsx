"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"

gsap.registerPlugin(ScrollTrigger)

const brands = [
  { src: "/brands/ChickenAmira.png", name: "Chicken Amira" },
  { src: "/brands/Crusty.png", name: "Crusty" },
  { src: "/brands/CTRChicken.png", name: "CTR Chicken" },
  { src: "/brands/Lma3loma.png", name: "Lma3loma" },
  { src: "/brands/Panda.png", name: "Panda" },
  { src: "/brands/PaniniGrill.png", name: "Panini Grill" },
  { src: "/brands/Potchi.png", name: "Potchi" },
  { src: "/brands/PRIMUS.png", name: "Primus" },
  { src: "/brands/ROOM21.png", name: "Room 21" },
  { src: "/brands/TheBurger.png", name: "The Burger" },
]

export default function BrandShowcase() {
  const sectionRef = useRef<HTMLElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const logosContainerRef = useRef<HTMLDivElement>(null)
  const logoRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    if (!sectionRef.current || !logosContainerRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(textRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out"
        }
      )

      const textElements = textRef.current?.querySelectorAll('h2, p, .stats-item, button')
      if (textElements) {
        gsap.set(textElements, { opacity: 0.8 })

        ScrollTrigger.create({
          trigger: logosContainerRef.current,
          start: "top center",
          end: "bottom center",
          scrub: 1,
          onUpdate: (self) => {
            const progress = self.progress
            gsap.to(textElements, {
              opacity: 0.8 + (progress * 0.2),
              y: progress * -15,
              scale: 1 + (progress * 0.02),
              duration: 0.3,
              ease: "power1.out"
            })
          }
        })

        ScrollTrigger.create({
          trigger: logosContainerRef.current,
          start: "top top",
          end: "bottom bottom",
          pin: textRef.current,
          pinSpacing: false
        })
      }

      logoRefs.current.forEach((logo) => {
        if (!logo) return

        gsap.set(logo, {
          scale: 1,
          opacity: 1
        })

        const img = logo.querySelector('img')
        if (img) {
          gsap.set(img, {
            filter: 'grayscale(100%)',
            scale: 1
          })
        }
      })

      logoRefs.current.forEach((logo) => {
        if (!logo) return

        ScrollTrigger.create({
          trigger: logo,
          start: "top 80%",
          end: "bottom 20%",
          onEnter: () => {
            const img = logo.querySelector('img')
            if (img) {
              gsap.to(img, {
                scale: 1.2,
                filter: 'grayscale(0%)',
                duration: 0.6,
                ease: "power2.out"
              })
            }
          },
          onLeave: () => {
            const img = logo.querySelector('img')
            if (img) {
              gsap.to(img, {
                scale: 1,
                filter: 'grayscale(100%)',
                duration: 0.4,
                ease: "power2.out"
              })
            }
          },
          onEnterBack: () => {
            const img = logo.querySelector('img')
            if (img) {
              gsap.to(img, {
                scale: 1.2,
                filter: 'grayscale(0%)',
                duration: 0.6,
                ease: "power2.out"
              })
            }
          },
          onLeaveBack: () => {
            const img = logo.querySelector('img')
            if (img) {
              gsap.to(img, {
                scale: 1,
                filter: 'grayscale(100%)',
                duration: 0.4,
                ease: "power2.out"
              })
            }
          }
        })
      })

      gsap.fromTo(logoRefs.current.filter(Boolean),
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: logosContainerRef.current,
            start: "top 85%",
            once: true
          }
        }
      )

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="bg-black relative transition-colors duration-500 brandshow-section brandshow-synchronized"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-black dark:via-gray-900/50 dark:to-black transition-colors duration-500"></div>

      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-500 dark:bg-blue-500 rounded-full animate-pulse"></div>
        <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-purple-500 dark:bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-cyan-500 dark:bg-cyan-500 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 max-w-full">
        <div className="flex flex-col lg:flex-row max-w-7xl mx-auto px-4">

          <div className="lg:w-1/2 lg:fixed lg:top-20 lg:left-0 lg:h-screen flex items-center justify-center pl-8 lg:pl-16 xl:pl-24 brandshow-text-column lg:z-20">
            <div ref={textRef} className="space-y-8 text-left py-16 lg:py-0 px-6 lg:px-8 max-w-lg">
              <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-gray-900 dark:text-white leading-[0.9] tracking-tight text-left">
                Ils ont boosté
                <br />
                leur restaurant
                <br />
                avec Caisse Manager
              </h2>
            </div>
          </div>

          <div ref={logosContainerRef} className="space-y-16 lg:space-y-32 flex flex-col items-center py-16 lg:py-24 px-6 lg:px-12 lg:w-1/2 lg:ml-auto lg:mr-0 min-h-[400vh]">
            {brands.map((brand, index) => (
              <div
                key={brand.name}
                ref={(el) => { logoRefs.current[index] = el }}
                className="flex justify-center w-full"
              >
                <div className="relative group cursor-pointer">
                  <div className="relative w-64 h-32 sm:w-72 sm:h-40 md:w-80 md:h-44 lg:w-84 lg:h-48 xl:w-96 xl:h-52 flex items-center justify-center max-w-full">
                    <Image
                      src={brand.src}
                      alt={brand.name}
                      fill
                      className="object-contain transition-transform duration-300"
                      sizes="(max-width: 640px) 256px, (max-width: 768px) 288px, (max-width: 1024px) 320px, 384px"
                    />
                  </div>
                </div>
              </div>
            ))}

            <div className="h-32"></div>
          </div>
        </div>
      </div>
    </section>
  )
}