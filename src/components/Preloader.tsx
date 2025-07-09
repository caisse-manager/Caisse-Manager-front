'use client'

import { useEffect, useRef } from "react"
import gsap from "gsap"
import Image from "next/image"

type PreloaderProps = {
  onFinish: () => void
}

export default function Preloader({ onFinish }: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const logoEntrepriseRef = useRef<HTMLDivElement>(null)
  const companyNameRef = useRef<HTMLDivElement>(null)
  const redEffectRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!redEffectRef.current || !containerRef.current || !logoEntrepriseRef.current || !companyNameRef.current) return

    // Calcul des positions en pixels (pour éviter mélange vw/vh et pixels)
    const centerX = (window.innerWidth / 2 - 125) * -1
    const centerY = window.innerHeight / 2 - 125

    // Initialisation du "light" rouge (halo lumineux)
    gsap.set(redEffectRef.current, {
      position: "fixed",
      top: 10,
      right: 10,
      width: 250,
      height: 250,
      borderRadius: "50%",
    //   backgroundColor: "rgba(248, 0, 0, 0.40)", // Rouge vif et visible
       background:
        "radial-gradient(circle at center, rgba(255, 40, 40, 0.60) 0%, rgba(255, 50, 40, 0.25) 30%, rgba(255, 40, 20, 0.15) 60%, transparent 100%)",
    //   boxShadow:
    //     "0 0 25px 8px rgba(255, 60, 60, 0.4), 0 0 50px 18px rgba(255, 50, 40, 0.25), 0 0 90px 35px rgba(255, 40, 20, 0.15)",
      opacity: 1,
      filter: "blur(50px)",
      transformOrigin: "center center",
      scale: 1.4,
      x: 0,
      y: 0,
      zIndex: 9998,
    })

    const tl = gsap.timeline()

    // 1. Apparition du logo
    tl.fromTo(
      logoEntrepriseRef.current,
      { opacity: 0, scale: 2, x: 0 },
      { opacity: 1, scale: 1, duration: 1.5, ease: "power2.out" }
    )

    // 2. Translation du logo vers la gauche
    tl.to(
      logoEntrepriseRef.current,
      { x: "-20px", duration: 1.2, ease: "power2.out" },
      "+=0"
    )

    // 3. Apparition du nom
    tl.fromTo(
      companyNameRef.current,
      { opacity: 0, x: -30 },
      { opacity: 1, x: -20, duration: 1.2, ease: "power2.out" },
      "<"
    )

    // 4. Apparition de la lumière + flou du texte
    tl.addLabel("blurAndLight")
    tl.to(
      companyNameRef.current,
      { filter: "blur(0.8px)", duration: 1.5, ease: "power3.inOut" },
      "blurAndLight"
    )
    tl.to(
      redEffectRef.current,
      {
        opacity: 1,
        duration: 1.5,
        ease: "power2.out",
        filter: "blur(40px)",
      },
      "blurAndLight"
    )

    // 5. Suppression du flou du texte
    tl.to(companyNameRef.current, {
      filter: "blur(0px)",
      duration: 0.8,
      ease: "power3.inOut",
    })

    // 6. À partir d'ici, on combine le glissement du "light" rouge en une seule animation fluide avec keyframes
    tl.to(redEffectRef.current, {
      duration: 8, // durée totale = somme des étapes
      ease: "power2.inOut",
      keyframes: [
        { x: "-70vw", duration: 1.2},
        { x: "-40vw", y: "60vh", duration: 2.5 },
        { x: 0, duration: 2.5 },
        { x: centerX, y: centerY, duration: 2 },
      ],
    })

    // 7. Transformation en rideau rouge plein écran
    tl.to(
      redEffectRef.current,
      {
        scale: 30,
        borderRadius: "0%",
        filter: "blur(0px)",
        backgroundColor: "#f80000",
        duration: 0.3,
        ease: "power3.out",
      },
      "+=0"
    )

    // 8. Animation finale de sortie vers le haut (container + lumière)
    tl.to(
      containerRef.current,
      {
        y: "-100vh",
        duration: 1,
        ease: "power3.inOut",
        delay: 1,
        onComplete: onFinish,
      },
      "+=0"
    )
    tl.to(
      redEffectRef.current,
      {
        y: "-100vh",
        duration: 1.5,
        ease: "power3.inOut",
      },
      "<"
    )
  }, [onFinish])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 bg-black flex items-center justify-center z-50"
      style={{ overflow: "hidden", transform: "translateY(0)" }}
    >
      {/* Logo + nom */}
      <div className="flex items-center space-x-0 relative z-20">
        <div ref={logoEntrepriseRef} className="w-40 h-40 -mr-0">
          <Image
            src="/caisse-manager-logo.png"
            alt="caisse-manager-logo"
            width={120}
            height={120}
            className="w-full h-full object-contain"
          />
        </div>
        <div
          ref={companyNameRef}
          className="text-white text-2xl font-semibold whitespace-pre-line relative"
        >
          Caisse{"\n"}Manager
        </div>
      </div>

      {/* Élément de lumière / rideau rouge */}
      <div
        ref={redEffectRef}
        className="absolute z-[9998] blur-3xl"
      />
    </div>
  )
}
