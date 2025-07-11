'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import Image from 'next/image'

type PreloaderProps = {
  onFinish: () => void
}

export default function Preloader({ onFinish }: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const nameRef = useRef<HTMLDivElement>(null)
  const redRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current || !logoRef.current || !nameRef.current || !redRef.current) return

    const centerX = (window.innerWidth / 2 - 125) * -1
    const centerY = window.innerHeight / 2 - 125

    // Initial styles for red light
    gsap.set(redRef.current, {
      position: 'fixed',
      top: 10,
      right: 10,
      width: 250,
      height: 250,
      borderRadius: '50%',
      background:
        'radial-gradient(circle at center, rgba(255, 40, 40, 0.60) 0%, rgba(255, 50, 40, 0.25) 30%, rgba(255, 40, 20, 0.15) 60%, transparent 100%)',
      opacity: 0,
      filter: 'blur(50px)',
      transformOrigin: 'center center',
      scale: 1.4,
      x: 0,
      y: 0,
      zIndex: 9999,
    })

    const mainTimeline = gsap.timeline()

    // 1. Logo apparition
    mainTimeline.fromTo(
      logoRef.current,
      { opacity: 0, scale: 2, x: 0 },
      { opacity: 1, scale: 1, duration: 1.5, ease: 'power2.out' }
    )

    // 2. Logo translation
    mainTimeline.to(
      logoRef.current,
      { x: '-20px', duration: 1.2, ease: 'power2.out' },
      '+=0'
    )

    // 3. Nom de l'entreprise
    mainTimeline.fromTo(
      nameRef.current,
      { opacity: 0, x: -30 },
      { opacity: 1, x: -20, duration: 1.2, ease: 'power2.out' },
      '<'
    )

    // 4. Fade-in de la lumière rouge
    mainTimeline.to(
      redRef.current,
      { opacity: 0.5, duration: 0.5, ease: 'power2.out' },
      '+=0.2'
    )

    // 5. Flou du nom + intensification de la lumière
    mainTimeline.to(
      nameRef.current,
      { filter: 'blur(0.8px)', duration: 1, ease: 'power3.inOut' },
      '<'
    )
    mainTimeline.to(
      redRef.current,
      { opacity: 1, duration: 1.5, ease: 'power2.out' },
      '<'
    )

    // 6. Suppression du flou
    mainTimeline.to(
      nameRef.current,
      { filter: 'blur(0px)', duration: 0.5, ease: 'power3.inOut' },
      '<+0.5'
    )

    // 7. Animation du light vers le centre
    mainTimeline.to(
      redRef.current,
      {
        duration: 8,
        ease: 'power2.inOut',
        keyframes: [
          { x: '-70vw', duration: 1.2 },
          { x: '-40vw', y: '60vh', duration: 2.5 },
          { x: 0, duration: 2.5 },
          { x: centerX, y: centerY, duration: 2 },
        ],
      },
      '<+0.2'
    )

    // 8-9. Transition finale du light : intensification + rideau
    const redTransition = gsap.timeline()

    redTransition.to(redRef.current, {
      duration: 0.5,
      ease: 'power2.inOut',
      scale: 2.2,
      background:
        'radial-gradient(circle at center, rgba(248, 0, 0, 0.95) 0%, rgba(248, 0, 0, 0.8) 50%, rgba(248, 0, 0, 0.6) 80%, transparent 100%)',
      opacity: 1,
      filter: 'blur(40px)',
    })

    redTransition.to(redRef.current, {
      scale: 30,
      borderRadius: '0%',
      filter: 'blur(0px)',
      backgroundColor: '#f80000',
      duration: 0.3,
      ease: 'power3.out',
    })

    redTransition.to(
      [logoRef.current, nameRef.current],
      {
        opacity: 0,
        scale: 0.8,
        duration: 0.1,
        ease: 'power3.out',
      },
      '<'
    )

    mainTimeline.add(redTransition, '+=0')

    // 10. Sortie du container et rideau
    mainTimeline.to(
      containerRef.current,
      {
        y: '-100vh',
        duration: 1,
        ease: 'power3.inOut',
        delay: 1,
        onComplete: onFinish,
      },
      '+=0'
    )

    mainTimeline.to(
      redRef.current,
      {
        y: '-100vh',
        duration: 1.5,
        ease: 'power3.inOut',
      },
      '<'
    )
  }, [onFinish])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 bg-black flex items-center justify-center z-50"
      style={{ overflow: 'hidden', transform: 'translateY(0)' }}
    >
      {/* Logo + nom */}
      <div className="flex items-center space-x-0 relative z-20">
        <div ref={logoRef} className="w-40 h-40 -mr-0">
          <Image
            src="/caisse-manager-logo.png"
            alt="Caisse Manager Logo"
            width={120}
            height={120}
            className="w-full h-full object-contain"
          />
        </div>
        <div
          ref={nameRef}
          className="text-white text-2xl font-semibold whitespace-pre-line relative"
        >
          Caisse{"\n"}Manager
        </div>
      </div>

      {/* Effet rouge / rideau */}
      <div
        ref={redRef}
        className="absolute z-[9998] blur-3xl pointer-events-none"
      />
    </div>
  )
}
