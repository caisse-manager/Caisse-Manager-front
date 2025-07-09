"use client"

import { useState, useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

interface MaterielItem {
  id: string
  title: string
  description: string
  price: string
  image: string
  category: "entree" | "haut"
}

const materielData: MaterielItem[] = [
  {
    id: "1",
    title: "POS WD15M",
    description: "POS Terminal, Ecran Tactile, Point de Vente",
    price: "2 200 DH",
    image: "/Material/WD15M.png",
    category: "entree",
  },
  {
    id: "2",
    title: "POS WD17M",
    description: "Objectif polyvalent 50mm f/1.8",
    price: "2 500 DH",
    image: "/placeholder.svg?height=300&width=400",
    category: "entree",
  },
  {
    id: "3",
    title: "Trépied Aluminium",
    description: "Trépied léger et stable",
    price: "600 DH",
    image: "/placeholder.svg?height=300&width=400",
    category: "entree",
  },
  {
    id: "4",
    title: "Caméra 4K Pro",
    description: "Caméra professionnelle 4K",
    price: "3500 DH",
    image: "/placeholder.svg?height=300&width=400",
    category: "haut",
  },
  {
    id: "5",
    title: "Objectif Cinéma",
    description: "Objectif cinéma 24-70mm f/2.8",
    price: "4200 DH",
    image: "/placeholder.svg?height=300&width=400",
    category: "haut",
  },
  {
    id: "6",
    title: "Stabilisateur Pro",
    description: "Gimbal professionnel 3 axes",
    price: "2800 DH",
    image: "/placeholder.svg?height=300&width=400",
    category: "haut",
  },
  {
    id: "7",
    title: "Éclairage LED",
    description: "Kit d'éclairage LED professionnel",
    price: "1500 DH",
    image: "/placeholder.svg?height=300&width=400",
    category: "entree",
  },
  {
    id: "8",
    title: "Drone Cinéma",
    description: "Drone professionnel pour prises aériennes",
    price: "5500 DH",
    image: "/placeholder.svg?height=300&width=400",
    category: "haut",
  },
]

export default function MaterielSection() {
  const [activeCategory, setActiveCategory] = useState<"all" | "entree" | "haut">("entree")
  const sectionRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const filteredData = materielData.filter((item) => activeCategory === "all" || item.category === activeCategory)

  useEffect(() => {
    const section = sectionRef.current
    const container = containerRef.current
    const scrollContainer = scrollContainerRef.current

    if (!section || !container || !scrollContainer) return

    const getScrollWidth = () => {
      const cards = scrollContainer.children
      let totalWidth = 0
      for (let i = 0; i < cards.length; i++) {
        totalWidth += (cards[i] as HTMLElement).offsetWidth + 32 
      }
      return totalWidth - window.innerWidth
    }

    let scrollTween: gsap.core.Tween

    const setupScrollTrigger = () => {
      const scrollWidth = getScrollWidth()

      scrollTween = gsap.to(scrollContainer, {
        x: -scrollWidth,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${scrollWidth + window.innerHeight}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })
    }

    const timer = setTimeout(setupScrollTrigger, 100)

    return () => {
      clearTimeout(timer)
      if (scrollTween) {
        scrollTween.kill()
      }
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === section) {
          trigger.kill()
        }
      })
    }
  }, [filteredData])

  return (
    <section ref={sectionRef} className="relative min-h-screen bg-black overflow-hidden">
      <div ref={containerRef} className="relative h-screen flex flex-col justify-center">
        <div className="text-center mb-8 px-8 mt-10">
          <h2 className="text-5xl md:text-6xl font-bold text-white">Our matériel</h2>
        </div>

        <div className="flex justify-center px-8">
          <div className="relative flex items-center justify-center">
            <div className="relative bg-white/10 backdrop-blur-sm rounded-full p-2 border border-white/20">
              <div className="flex relative">
                <div
                  className={`absolute top-0 h-full bg-white rounded-full transition-all duration-500 ease-out ${
                    activeCategory === "entree"
                      ? "left-0 w-1/2"
                      : activeCategory === "haut"
                        ? "left-1/2 w-1/2"
                        : "left-1/4 w-1/2"
                  }`}
                  style={{
                    filter: "url(#gooey)",
                  }}
                />

                <button
                  onClick={() => setActiveCategory("entree")}
                  className={`relative z-10 px-6 py-3 rounded-full font-medium transition-colors duration-300 ${
                    activeCategory === "entree" ? "text-black" : "text-white hover:text-white/80"
                  }`}
                >
                  Entrée de gamme
                </button>

                <button
                  onClick={() => setActiveCategory("haut")}
                  className={`relative z-10 px-6 py-3 rounded-full font-medium transition-colors duration-300 ${
                    activeCategory === "haut" ? "text-black" : "text-white hover:text-white/80"
                  }`}
                >
                  Haut de gamme
                </button>
              </div>
            </div>

            <svg className="absolute opacity-0 pointer-events-none">
              <defs>
                <filter id="gooey">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
                  <feColorMatrix
                    in="blur"
                    mode="matrix"
                    values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
                    result="gooey"
                  />
                  <feBlend in="SourceGraphic" in2="gooey" />
                </filter>
              </defs>
            </svg>
          </div>
        </div>

        <div className="flex-1 flex items-center mb-15 mt-15">
          <div ref={scrollContainerRef} className="flex items-center pl-8">
            {filteredData.map((item) => (
              <div
                key={`${item.id}-${activeCategory}`}
                className={`flex-shrink-0 w-130 h-156 mx-4 transition-all duration-500 ease-out`}
              >
                <div className="relative h-full bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden group hover:bg-white/10 transition-all duration-300">
                  {/* Image */}
                  <div className="relative h-108 overflow-hidden">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  </div>

                  <div className="p-6 h-48 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2 transition-all duration-500">
                        {item.title}
                      </h3>
                      <p className="text-gray-300 text-sm mb-4 transition-all duration-500 delay-100">
                        {item.description}
                      </p>
                    </div>

                    <div className="transition-all duration-500 delay-200">
                      <div className="text-2xl font-bold text-white mb-3">{item.price}</div>
                      <button className="w-full bg-white/10 hover:bg-white/20 text-white py-2 px-4 rounded-lg transition-all duration-300 border border-white/20 hover:border-white/40">
                        Voir détails
                      </button>
                    </div>
                  </div>

                  <div className="absolute top-4 right-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        item.category === "haut"
                          ? "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30"
                          : "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                      }`}
                    >
                      {item.category === "haut" ? "Premium" : "Standard"}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            
            <div className="flex-shrink-0  w-130 h-156 mx-4">
              <div className="h-full bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl border border-white/20 flex flex-col items-center justify-center text-center p-8 hover:from-white/15 hover:to-white/10 transition-all duration-300">
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Découvrir plus</h3>
                <p className="text-gray-300 mb-6">Explorez notre catalogue complet de matériel professionnel</p>
                <button className="bg-white text-black px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-300">
                  Voir tous nos matériels
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}