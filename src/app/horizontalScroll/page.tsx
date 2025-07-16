'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'
import HorizontalScroll from '@/components/HorizontalScroll'

gsap.registerPlugin(ScrollTrigger)

export default function HorizontalScrollPage() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const cardsContainerRef = useRef<HTMLDivElement>(null)

  const [cardWidth, setCardWidth] = useState(0)

  useEffect(() => {
    const section = sectionRef.current
    const scrollContent = cardsContainerRef.current
    if (!section || !scrollContent) return

    // On attend que les cards soient rendues pour récupérer leur largeur
    const singleCard = scrollContent.querySelector('div')
    if (!singleCard) return

    const singleCardWidth = singleCard.clientWidth + 24 // padding/margin right or gap
    setCardWidth(singleCardWidth)

    const totalScrollWidth = scrollContent.scrollWidth
    const viewportWidth = window.innerWidth


    // → Le scrollDistance est le total à défiler, en excluant ce qui est visible (une card)
    const scrollDistance = totalScrollWidth - singleCardWidth
    console.log(viewportWidth)
    console.log(totalScrollWidth)
    console.log(scrollDistance)

    // Position initiale complètement à droite
    gsap.set(scrollContent, {
      x: scrollDistance-(totalScrollWidth-viewportWidth) ,
    })

    gsap.to(scrollContent, {
      x: -scrollDistance,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: () => `+=${scrollDistance * 2}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      },
    })

    return () => ScrollTrigger.getAll().forEach(t => t.kill())
  }, [])

  const features = [
    { title: 'Understands You Like A Human', description: 'AI that listens, learns, and responds with human-like intuition.' },
    { title: 'Interprets Visuals And Surroundings', description: 'Sees and understands the world around you using images and objects.' },
    { title: 'Remembers What Matters', description: 'Keeps track of your preferences and surfaces helpful info proactively.' },
    { title: 'Acts Proactively', description: 'Takes initiative based on your habits and needs before you even ask.' },
    { title: 'Understands You Like A Human', description: 'AI that listens, learns, and responds with human-like intuition.' },
    { title: 'Interprets Visuals And Surroundings', description: 'Sees and understands the world around you using images and objects.' },
    { title: 'Remembers What Matters', description: 'Keeps track of your preferences and surfaces helpful info proactively.' },
    { title: 'Acts Proactively', description: 'Takes initiative based on your habits and needs before you even ask.' },
  ]

  return (
    <div className="bg-black text-white">
      <div
        ref={sectionRef}
        className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden"
      >
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl md:text-6xl font-bold text-center mb-10 z-10"
        >
          Your Smartest Pal,<br />
          Anytime, Anywhere.
        </motion.h1>

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center mb-12 shadow-2xl z-10"
        >
          <div className="w-3 h-3 bg-white rounded-full mr-1" />
          <div className="w-3 h-3 bg-white rounded-full" />
        </motion.div>

        <div
          ref={cardsContainerRef}
          className="flex gap-6 px-10 will-change-transform z-10"
          style={{
            width: 'fit-content',
          }}
        >
          {features.map((f, i) => (
            <HorizontalScroll key={i} title={f.title} description={f.description} />
          ))}
        </div>
      </div>
    </div>
  )
}
