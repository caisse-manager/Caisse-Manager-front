'use client'

import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import StackCard from '@/components/StackCard'

gsap.registerPlugin(ScrollTrigger)

const cardsData = [
  {
    title: 'Design Intuitif',
    description: 'Concevez des interfaces qui parlent d\'elles-mêmes avec une approche centrée utilisateur et des interactions fluides.',
    image: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=800',
    direction: 'right' as const,
    bgColor: 'linear-gradient(135deg, #1a1a1a 0%, #333333 100%)',
    accentColor: '#ef4444',
  },
  {
    title: 'Développement Rapide',
    description: 'Optimisez la productivité avec des frameworks modernes et des outils de développement de pointe.',
    image: 'https://images.pexels.com/photos/3184318/pexels-photo-3184318.jpeg?auto=compress&cs=tinysrgb&w=800',
    direction: 'left' as const,
    bgColor: 'linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%)',
    accentColor: '#ffffff',
  },
  {
    title: 'Sécurité Renforcée',
    description: 'Protégez vos données avec les meilleures pratiques de sécurité et une architecture robuste.',
    image: 'https://images.pexels.com/photos/3184632/pexels-photo-3184632.jpeg?auto=compress&cs=tinysrgb&w=800',
    direction: 'right' as const,
    bgColor: 'linear-gradient(135deg, #1f1f1f 0%, #404040 100%)',
    accentColor: '#dc2626',
  },
]

export default function ScrollPage() {
  useEffect(() => {
    const cards = gsap.utils.toArray<HTMLElement>('.stackCard')
    const stickDistance = 0

    const firstCardST = ScrollTrigger.create({
      trigger: cards[0],
      start: 'center center',
    })

    const lastCardST = ScrollTrigger.create({
      trigger: cards[cards.length - 1],
      start: 'center center',
    })

    cards.forEach((card, index) => {
      card.style.zIndex = `${index + 1}`

      const scale = 1 - index * 0.025
      const scaleUp = gsap.to(card, {
        scale,
        transformOrigin: '50% 160%', // vient d’en bas
      })

      ScrollTrigger.create({
        trigger: card,
        start: 'center center',
        end: () => lastCardST.start + stickDistance,
        pin: true,
        markers: false,
        pinSpacing: false,
        ease: 'none',
        animation: scaleUp,
        toggleActions: 'restart none none reverse',
      })
    })
  }, [])

  return (
        <>
      {/* Spacer top */}
      <section className="h-[1000px] bg-black relative overflow-hidden">
        
      </section>

      {/* Card stacking section */}
      <section className="overflow-hidden py-[60px] bg-black text-white font-[Poppins] relative">
        {/* Subtle grid background */}
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full" style={{
            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}></div>
        </div>
        
        <div className="max-w-6xl mx-auto px-4 space-y-8 relative z-10">
          {[...cardsData].reverse().map((card, idx) => (
            <StackCard
              key={idx}
              index={idx + 1}
              title={card.title}
              description={card.description}
              image={card.image}
              direction={card.direction}
              bgColor={card.bgColor}
              accentColor={card.accentColor}
            />
          ))}
        </div>
      </section>

      {/* Spacer bottom */}
      <section className="h-[1000px] bg-black"></section>
    </>
  )
}
