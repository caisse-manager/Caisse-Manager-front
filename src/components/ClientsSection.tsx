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
    video: "/clients/lma3loma.mp4",
    nom: "Lma3loma",
    ville: "Casablanca",
    adresse: "Maarif, Bd Zerktouni",
  },
  {
    video: "/clients/TheView360.mp4",
    nom: "The View 360",
    ville: "Casablanca",
    adresse: "ain sbaa, Bd Zerktouni",
  },
  {
    video: "/clients/videoplayback.mp4",
    nom: "Fried",
    ville: "Casablanca",
    adresse: "Maarif, Bd Zerktouni",
  }
];

export default function ClientsSection() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const trackRef = useRef<HTMLDivElement | null>(null)
  const [activeCardIndex, setActiveCardIndex] = useState<number | null>(null)

  useEffect(() => {
    const section = sectionRef.current
    const track = trackRef.current
    if (!section || !track) return

    ScrollTrigger.getAll().forEach(st => {
      if (st.vars.id === "clients-section-tl") {
        st.kill()
      }
    })

    const cards = gsap.utils.toArray(".client-card") as HTMLElement[]
    const ctaCard = document.querySelector(".cta-card") as HTMLElement

    const calculateTrackWidth = () => {
      const trackWidth = track.scrollWidth
      const viewportWidth = window.innerWidth
      return trackWidth - viewportWidth + 200 
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
        onUpdate: self => {
          if (self.progress > 0) {
            section.style.visibility = 'visible'
          }
        },
        markers: false 
      },
    })

    tl.to(track, {
      x: () => -(calculateTrackWidth()),
      ease: "none",
    })

    const restaurantCards = cards.filter((card) => !card.classList.contains("cta-card"))

    restaurantCards.forEach((card, index) => {
      const info = card.querySelector(".client-info") as HTMLElement
      const video = card.querySelector("video") as HTMLVideoElement

      if (index !== 0) {
        gsap.set(card, { scale: 1, y: 0 })
        gsap.set(info, { opacity: 0, y: 30 })
      }

      ScrollTrigger.create({
        trigger: card,
        containerAnimation: tl,
        start: "left center",
        end: "right center",
        onEnter: () => {
          setActiveCardIndex(index)
          gsap.to(card, { scale: 1.05, y: -50, duration: 0.8, ease: "power2.out" })
          gsap.fromTo(
            info,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", delay: 0.2 }
          )
          if (video) {
            video.play().catch(() => {})
            video.style.filter = "grayscale(0) brightness(1.1) contrast(1.1)"
          }
        },
        onLeave: () => {
          setActiveCardIndex(null)
          gsap.to(card, { scale: 1, y: 0, duration: 0.6, ease: "power2.inOut" })
          gsap.to(info, { opacity: 0, y: 20, duration: 0.4, ease: "power2.inOut" })
          if (video) {
            video.pause()
            video.style.filter = "grayscale(1) brightness(0.8)"
          }
        },
        onEnterBack: () => {
          setActiveCardIndex(index)
          gsap.to(card, { scale: 1.05, y: -50, duration: 0.8, ease: "power2.out" })
          gsap.to(info, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", delay: 0.2 })
          if (video) {
            video.currentTime = 0
            video.play().catch(() => {})
            video.style.filter = "grayscale(0) brightness(1.1) contrast(1.1)"
          }
        },
        onLeaveBack: () => {
          setActiveCardIndex(null)
          gsap.to(card, { scale: 1, y: 0, duration: 0.6, ease: "power2.inOut" })
          gsap.to(info, { opacity: 0, y: 20, duration: 0.4, ease: "power2.inOut" })
          if (video) {
            video.pause()
            video.style.filter = "grayscale(1) brightness(0.8)"
          }
        },
      })
    })

    if (ctaCard) {
      gsap.set(ctaCard, { scale: 1, y: 0 })
      ScrollTrigger.create({
        trigger: ctaCard,
        containerAnimation: tl,
        start: "left center",
        end: "right center",
        onEnter: () => {
          gsap.to(ctaCard, { scale: 1.05, y: -50, duration: 0.8, ease: "power2.out" })
        },
        onLeave: () => {
          gsap.to(ctaCard, { scale: 1, y: 0, duration: 0.6, ease: "power2.inOut" })
        },
        onEnterBack: () => {
          gsap.to(ctaCard, { scale: 1.05, y: -50, duration: 0.8, ease: "power2.out" })
        },
        onLeaveBack: () => {
          gsap.to(ctaCard, { scale: 1, y: 0, duration: 0.6, ease: "power2.inOut" })
        },
      })
    }

    ScrollTrigger.refresh(true)

    const handleResize = () => {
      ScrollTrigger.refresh(true)
    }

    window.addEventListener("resize", handleResize)

    const observer = new ResizeObserver(() => {
      ScrollTrigger.refresh(true)
    })

    if (track) {
      observer.observe(track)
    }

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
      className="relative h-screen bg-white dark:bg-black overflow-visible"
      style={{ visibility: "visible" }}
    >
      <h2 className="text-6xl font-black text-center text-black dark:text-white py-10 mb-10 tracking-tight">
        Nos Clients
      </h2>
      <div ref={trackRef} className="flex w-max items-center gap-15 px-20">
        <div className="shrink-0" style={{ width: "20vw" }}></div>
        {restaurants.map((restau, index) => (
          <div
            key={`${restau.nom}-${restau.ville}-${index}`}
            className="client-card min-w-[250px] h-[850px] px-6 py-8 bg-black rounded-3xl shadow-2xl flex flex-col items-center justify-between text-white text-xl font-semibold gap-6"
          >
            <div className="relative w-[400px] h-[850px] rounded-2xl overflow-hidden">
              <video
                ref={el => {
                  if (el) {
                    el.onloadedmetadata = () => {
                      const ratio = el.videoWidth / el.videoHeight
                      el.style.width = "100%"
                      el.style.height = `calc(100% / ${ratio})`
                    }
                  }
                }}
                src={restau.video}
                autoPlay={false}
                loop
                muted
                playsInline
                className="w-full h-full object-cover transition-all duration-500"
                style={{
                  filter: activeCardIndex === index
                    ? "grayscale(0) brightness(1.1) contrast(1.1)"
                    : "grayscale(1) brightness(0.8)"
                }}
                onLoadStart={e => {
                  const video = e.target as HTMLVideoElement
                  video.pause()
                }}
              >
                Your browser does not support the video tag.
              </video>
            </div>
            <div className="client-info text-center">
              <h3 className="text-3xl font-black text-white  tracking-tight leading-tight">{restau.nom}</h3>
              <p className="text-xl text-gray-300 font-semibold mb-12">
                <span className="font-bold text-white tracking-tight leading-tight">{restau.ville}</span>,{" "}
                {restau.adresse}
              </p>
            </div>
          </div>
        ))}
        <div className="client-card cta-card min-w-[400px] h-[600px] bg-[#111] dark:bg-[#111] rounded-3xl shadow-2xl cursor-pointer group overflow-hidden relative transition-colors duration-500 ease-in-out hover:bg-white dark:hover:bg-white">
          <div className="h-full flex items-center justify-center px-8 py-12">
            <a
              href="/case-studies"
              className="flex items-center gap-6 text-white font-medium transform transition-all duration-500 group-hover:text-black"
            >
              <div className="relative w-14 h-14 transition-all duration-700 group-hover:scale-150">
                <div className="absolute inset-0 rounded-full bg-red-500 flex items-center justify-center transition-all duration-700 group-hover:scale-1500" />
                <span className="absolute inset-0 flex items-center justify-center text-white text-2xl font-bold pointer-events-none">
                  →
                </span>
              </div>
              <span className="relative text-white text-xl font-semibold z-10 transition-all duration-500">
                Voir tous nos clients
              </span>
            </a>
          </div>
        </div>
        <div className="shrink-0" style={{ width: "20vw" }}></div>
      </div>
    </section>
  )
}