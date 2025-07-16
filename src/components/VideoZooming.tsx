'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function VideoZooming() {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const footerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const video = videoRef.current
    const footer = footerRef.current
    if (!container || !video || !footer) return

    const isMobile = window.innerWidth <= 768

    // Style initial container
    gsap.set(container, {
      y: window.innerHeight + 200,
      opacity: 0,
      width: isMobile ? '90vw' : '60vw',
      height: isMobile ? '160vw' : '40vh',
      borderRadius: '1.5rem',
      scale: 1,
    })

    // Style initial footer
    gsap.set(footer, {
      y: 100,
      opacity: 0,
    })

    // Animation entrée vidéo
    gsap.to(container, {
      y: 0,
      opacity: 1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: container,
        start: 'top bottom+=200',
        end: 'top center',
        scrub: 1.2,
        onLeaveBack: () => {
          if (!video.paused) {
            video.pause()
            video.currentTime = 0
          }
        },
      },
    })

    let hasPlayed = false

    // Zoom vidéo
    gsap.to(container, {
      width: '100vw',
      height: isMobile ? '177vw' : '100vh',
      borderRadius: '0rem',
      ease: 'power2.inOut',
      scrollTrigger: {
        trigger: container,
        start: 'top center',
        end: 'top 10%',
        scrub: 1.8,
        onUpdate: self => {
          if (self.progress > 0.01 && !hasPlayed) {
            hasPlayed = true
            video.play()
          }
        },
        onLeaveBack: () => {
          hasPlayed = false
          if (!video.paused) {
            video.pause()
            video.currentTime = 0
          }
        },
      },
    })

    // Animation apparition du footer
    gsap.to(footer, {
      y: 0,
      opacity: 1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: container,
        start: 'top 15%',
        end: 'top 5%',
        scrub: 1.2,
      },
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <section className="h-[400vh] bg-black relative overflow-hidden">
      {/* VIDEO */}
      <div
        ref={containerRef}
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 overflow-hidden"
        style={{
          width: '60vw',
          height: '40vh',
          borderRadius: '1.5rem',
        }}
      >
        <video
          ref={videoRef}
          src="/video.mov"
          className="w-full h-full object-cover"
          muted
          playsInline
          preload="auto"
        />
      </div>

      <div
        ref={footerRef}
        className="absolute bottom-0 left-0 w-full z-20 flex justify-center"
      >
        <div
          className="backdrop-blur-md bg-white/10 text-white px-6 py-10 rounded-t-3xl shadow-xl w-full max-w-5xl mx-auto"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center text-sm">
            <div>
              <h4 className="text-lg font-semibold mb-3 uppercase tracking-wide">Sections</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:underline">Accueil</a></li>
                <li><a href="#" className="hover:underline">Services</a></li>
                <li><a href="#" className="hover:underline">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-3 uppercase tracking-wide">À propos</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:underline">Notre équipe</a></li>
                <li><a href="#" className="hover:underline">Carrières</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-3 uppercase tracking-wide">Support</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:underline">FAQ</a></li>
                <li><a href="#" className="hover:underline">Assistance</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-3 uppercase tracking-wide">Suivez-nous</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:underline">Facebook</a></li>
                <li><a href="#" className="hover:underline">Instagram</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
