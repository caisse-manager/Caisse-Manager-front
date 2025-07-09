"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const restaurants = [
  {
    video: "/clients/crusty.mp4",
    nom: "Crusty",
    ville: "Rabat",
    adresse: "Hay Riad Avenue Annakhil",
  },
  {
    video: "/clients/panda.mp4",
    nom: "Panda",
    ville: "Rabat",
    adresse: "Hay Riad Avenue Annakhil",
  },
  {
    video: "/clients/Tratoria21.mp4",
    nom: "Tratoria21",
    ville: "Casablanca",
    adresse: "Rue Moutaz El Falaki, Mâarif",
  },
  {
    video: "/clients/Room21.mp4",
    nom: "Room 21",
    ville: "Casablanca",
    adresse: "18 Rue Normandie",
  },
  {
    video: "/clients/fried.mp4",
    nom: "Fried",
    ville: "Casablanca",
    adresse: "Maarif, Bd Zerktouni",
  },
]

export default function ClientsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [activeCardIndex, setActiveCardIndex] = useState<number | null>(null)
  const [ctaActive, setCtaActive] = useState(false);

  useEffect(() => {
    const section = sectionRef.current
    const track = trackRef.current
    if (!section || !track) return

    // S'assurer que le scroll horizontal est à zéro au chargement
    track.scrollLeft = 0;
    setActiveCardIndex(null);

    ScrollTrigger.getAll().forEach(st => {
      if (st.vars.id === "clients-section-tl") {
        st.kill()
      }
    })

    const cards = gsap.utils.toArray<HTMLElement>(".client-card")
    const ctaCard = section.querySelector<HTMLElement>(".cta-card")
    const redCircle = ctaCard?.querySelector<HTMLElement>(".cta-circle")

    if (!ctaCard || !redCircle) {
      console.warn("CTA card or red circle not found")
      return
    }

    const calculateTrackWidth = () => {
      const trackWidth = track.scrollWidth
      const viewportWidth = window.innerWidth
      // Ajout d'une marge pour permettre de centrer complètement la carte CTA
      return trackWidth - viewportWidth + (viewportWidth / 2) + 200
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        id: "clients-section-tl",
        start: "top top",
        end: () => `+=${calculateTrackWidth()}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          if (self.progress > 0) {
            section.style.visibility = "visible"
          }
          // Vérifie si aucune carte n'est active (centrée)
          if (!cards.some((card, idx) => activeCardIndex === idx)) {
            setActiveCardIndex(null);
          }
        },
        markers: false,
      },
    })

    tl.to(track, {
      x: () => -(calculateTrackWidth()),
      ease: "none",
    })

    const restaurantCards = cards.filter(
      card => !card.classList.contains("cta-card")
    )

    restaurantCards.forEach((card, index) => {
      const info = card.querySelector<HTMLElement>(".client-info")
      const video = card.querySelector<HTMLVideoElement>("video")

      if (!info || !video) {
        console.warn(`Card ${index}: Missing info or video element`)
        return
      }

      gsap.set(card, { scale: 1, y: 0 })
      gsap.set(info, { opacity: 0, y: 0 }) // y: 0 pour éviter le décalage

      video.style.filter = "grayscale(1) brightness(0.8)"
      video.pause()

      ScrollTrigger.create({
        trigger: card,
        containerAnimation: tl,
        start: "left center",
        end: "right center",
        onEnter: () => {
          setActiveCardIndex(index)
          gsap.to(card, { scale: 1.05, y: -50, duration: 0.8, ease: "power2.out" })
          gsap.to(info, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" })
          video.currentTime = 0
          video.play().catch(console.error)
          video.style.filter = "grayscale(0) brightness(1.1) contrast(1.1)"
        },
        onLeave: () => {
          setActiveCardIndex(null)
          gsap.to(card, { scale: 1, y: 0, duration: 0.6, ease: "power2.inOut" })
          gsap.to(info, { opacity: 0, y: 0, duration: 0.3, ease: "power2.inOut" })
          video.pause()
          video.style.filter = "grayscale(1) brightness(0.8)"
        },
        onEnterBack: () => {
          setActiveCardIndex(index)
          gsap.to(card, { scale: 1.05, y: -50, duration: 0.8, ease: "power2.out" })
          gsap.to(info, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" })
          video.currentTime = 0
          video.play().catch(console.error)
          video.style.filter = "grayscale(0) brightness(1.1) contrast(1.1)"
        },
        onLeaveBack: () => {
          setActiveCardIndex(null)
          gsap.to(card, { scale: 1, y: 0, duration: 0.6, ease: "power2.inOut" })
          gsap.to(info, { opacity: 0, y: 0, duration: 0.3, ease: "power2.inOut" })
          video.pause()
          video.style.filter = "grayscale(1) brightness(0.8)"
        },
      })
    })

    if (ctaCard && redCircle) {
      gsap.set(ctaCard, { scale: 1, y: 0 })
      gsap.set(redCircle, { scale: 1, boxShadow: "none" })
      // Correction: utiliser le bon sélecteur pour le texte CTA
      const ctaTextElement = ctaCard.querySelector<HTMLElement>('.cta-text')
      if (ctaTextElement) {
        gsap.set(ctaTextElement, { opacity: 0 })
      }

      ScrollTrigger.create({
        trigger: ctaCard,
        containerAnimation: tl,
        start: "left center",
        end: "right center",
        onEnter: () => {
          setCtaActive(true)
          gsap.to(ctaCard, { scale: 1.05, y: -50, duration: 0.8, ease: "power2.out" })
          gsap.to(redCircle, { scale: 20, boxShadow: "0 0 0 0 #f00", duration: 0.8, ease: "power2.out" })
          // Afficher le texte CTA quand la carte est centrée
          if (ctaTextElement) {
            gsap.to(ctaTextElement, { opacity: 1, duration: 0.4, delay: 0.2, ease: "power2.out" })
          }
        },
        onLeave: () => {
          setCtaActive(false)
          gsap.to(ctaCard, { scale: 1, y: 0, duration: 0.6, ease: "power2.inOut" })
          gsap.to(redCircle, { scale: 1, boxShadow: "none", duration: 0.6, ease: "power2.inOut" })
          // Masquer le texte CTA quand la carte n'est plus centrée
          if (ctaTextElement) {
            gsap.to(ctaTextElement, { opacity: 0, duration: 0.3, ease: "power2.inOut" })
          }
        },
        onEnterBack: () => {
          setCtaActive(true)
          gsap.to(ctaCard, { scale: 1.05, y: -50, duration: 0.8, ease: "power2.out" })
          gsap.to(redCircle, { scale: 20, boxShadow: "0 0 0 0 #f00", duration: 0.8, ease: "power2.out" })
          // Afficher le texte CTA quand la carte est centrée (retour arrière)
          if (ctaTextElement) {
            gsap.to(ctaTextElement, { opacity: 1, duration: 0.4, delay: 0.2, ease: "power2.out" })
          }
        },
        onLeaveBack: () => {
          setCtaActive(false)
          gsap.to(ctaCard, { scale: 1, y: 0, duration: 0.6, ease: "power2.inOut" })
          gsap.to(redCircle, { scale: 1, boxShadow: "none", duration: 0.6, ease: "power2.inOut" })
          // Masquer le texte CTA quand la carte n'est plus centrée (retour arrière)
          if (ctaTextElement) {
            gsap.to(ctaTextElement, { opacity: 0, duration: 0.3, ease: "power2.inOut" })
          }
        },
      })

      // Hover
      ctaCard.addEventListener('mouseenter', () => {
        if (ctaActive) {
          gsap.to(redCircle, { scale: 24, boxShadow: "0 0 40px 10px #f00", duration: 0.3 })
        }
      })
      ctaCard.addEventListener('mouseleave', () => {
        if (ctaActive) {
          gsap.to(redCircle, { scale: 20, boxShadow: "0 0 0 0 #f00", duration: 0.3 })
        }
      })
    }

    ScrollTrigger.refresh()

    const handleResize = () => {
      ScrollTrigger.refresh()
    }
    window.addEventListener("resize", handleResize)

    const observer = new ResizeObserver(() => {
      ScrollTrigger.refresh()
    })
    if (track) observer.observe(track)

    return () => {
      ScrollTrigger.getAll().forEach(st => {
        if (st.vars.id === "clients-section-tl") {
          st.kill()
        }
      })
      window.removeEventListener("resize", handleResize)
      observer.disconnect()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="clients-section"
      className="relative h-screen bg-black overflow-visible"
      style={{ visibility: "visible" }}
    >
      <h2 className="text-6xl font-black text-center text-white py-10 mb-10 tracking-tight">
        Previous Work
      </h2>
      <div ref={trackRef} className="flex w-max items-center gap-15 px-20">
        <div className="shrink-0" style={{ width: "20vw" }}></div>

        {restaurants.map((restau, index) => (
          <div
            key={`${restau.nom}-${restau.ville}-${index}`}
            className={`client-card min-w-[400px] h-[850px] px-6 py-8 rounded-3xl shadow-2xl flex flex-col items-center justify-between text-white text-xl font-semibold gap-6${activeCardIndex === index ? ' active-card' : ''}`}
          >
            <div className="relative w-[400px] h-[850px] rounded-2xl overflow-hidden">
              <video
                src={restau.video}
                autoPlay={false}
                loop
                playsInline
                muted
                className="w-full h-full object-cover transition-all duration-500"
                style={{
                  filter: "grayscale(1) brightness(0.8)"
                }}
                onLoadedMetadata={(e) => {
                  const video = e.target as HTMLVideoElement
                  const ratio = video.videoWidth / video.videoHeight
                  video.style.width = "100%"
                  video.style.height = `calc(100% / ${ratio})`
                }}
                onLoadStart={(e) => {
                  const video = e.target as HTMLVideoElement
                  video.pause()
                }}
              >
                Your browser does not support the video tag.
              </video>
            </div>
            <div className="client-info text-center opacity-0">
              <h3 className="text-3xl font-black text-white tracking-tight leading-tight">
                {restau.nom}
              </h3>
              <p className="text-xl text-gray-300 font-semibold mb-12">
                <span className="font-bold text-white tracking-tight leading-tight">
                  {restau.ville}
                </span>
                , {restau.adresse}
              </p>
            </div>
          </div>
        ))}
        
        <div className="client-card cta-card min-w-[400px] h-[600px] bg-[#111] dark:bg-[#111] rounded-3xl shadow-2xl cursor-pointer group overflow-hidden relative">
          <div className="h-full flex items-center justify-center px-8 py-12">
            <div className="relative flex items-center gap-6">
              <div className="relative w-14 h-14 z-0">
                <div className="cta-circle absolute inset-0 rounded-full bg-red-500 transition-all duration-700"></div>
                <span className="absolute inset-0 flex items-center justify-center text-white text-2xl font-bold z-10 pointer-events-none">
                  →
                </span>
              </div>
              <span className="cta-text relative text-white text-xl font-semibold z-10 opacity-0">
                Voir tous nos clients
              </span>
            </div>
          </div>
        </div>
          <div className="shrink-0" style={{ width: "10vw" }}></div>
      </div>
    </section>
  )
}