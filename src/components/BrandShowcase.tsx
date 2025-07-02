"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"

gsap.registerPlugin(ScrollTrigger)

const brands = [
  "/brands/Crusty.png",
  "/brands/Panda.png",
  "/brands/CTRChicken.png",
  "/brands/Lma3loma.png",
  "/brands/PaniniGrill.png",
  "/brands/ChickenAmira.png",
  "/brands/TheBurger.png",
]

const textLines = [
  "Ils ont boosté",
  "leur restaurant",
  "avec Caisse Manager",
]

export default function BrandShowcase() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const textRefs = useRef<(HTMLDivElement | null)[]>([])
  const listRef = useRef<HTMLDivElement | null>(null)
  const logoRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const section = sectionRef.current
    const list = listRef.current
    if (!section || !list) return

    ScrollTrigger.getAll().forEach(st => {
      if (st.vars && (st.vars.id === "brand-showcase" || st.vars.id === "brand-showcase-text")) {
        st.kill()
      }
    })

    gsap.set(section, { opacity: 1, visibility: "visible" })
    gsap.set(list, { y: 0 })
    textRefs.current.forEach((el) => el && gsap.set(el, { opacity: 0, y: 50 }))

    const textTl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        end: "top 50%",
        scrub: 1,
        id: "brand-showcase-text"
      }
    })

    textRefs.current.forEach((el, i) => {
      if (el) {
        textTl.to(el, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
        }, i * 0.2)
      }
    })

    const logoHeight = 145
    const extraScroll = 500
    const scrollLength = brands.length * logoHeight + extraScroll

    const mainTl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        id: "brand-showcase",
        start: "top top",
        end: `+=${scrollLength}`,
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    })

    mainTl.to(list, {
      y: -(brands.length - 1) * logoHeight,
      ease: "none",
      duration: 1,
    })

    logoRefs.current.forEach((el, i) => {
      const img = el?.querySelector("img")
      if (!img) return

      const startOffset = i * logoHeight
      const endOffset = (i + 1) * logoHeight

      gsap.fromTo(
        img,
        { filter: "grayscale(100%) brightness(0.9)" },
        {
          filter: "grayscale(0%) brightness(1.2) sepia(1) hue-rotate(-50deg) saturate(3)",
          scrollTrigger: {
            trigger: section,
            start: `top+=${startOffset} top`,
            end: `top+=${endOffset} top`,
            scrub: true,
            id: `logo-${i}`,
          },
          ease: "power2.out",
          duration: 0.5,
        }
      )
    })

    ScrollTrigger.refresh()

    const handleResize = () => {
      ScrollTrigger.refresh()
    }

    window.addEventListener("resize", handleResize)

    return () => {
      ScrollTrigger.getAll().forEach(st => {
        if (st.vars && (
          st.vars.id === "brand-showcase" ||
          st.vars.id === "brand-showcase-text" ||
          st.vars.id?.toString().startsWith("logo-")
        )) {
          st.kill()
        }
      })
      textTl.kill()
      mainTl.kill()
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="brand-showcase"
      className="h-screen w-full flex items-center justify-center bg-black dark:bg-black text-white overflow-hidden relative"
    >
      <div className="flex w-full h-full px-16 md:px-20 gap-8 items-center justify-center">
        <div className="w-1/2 flex flex-col justify-center items-start space-y-4">
          {textLines.map((line, i) => (
            <div
              key={i}
              ref={(el) => {
                textRefs.current[i] = el
              }}
              className="text-3xl md:text-5xl font-extrabold uppercase tracking-tight text-white dark:text-white"
            >
              {line}
            </div>
          ))}
        </div>

        <div className="w-1/2 h-full overflow-hidden flex items-center justify-center">
          <div ref={listRef} className="flex flex-col gap-4 py-10">
            <div className="shrink-0" style={{ width: "180vw" }}></div>
            {brands.map((src, index) => (
              <div className="shrink-0 h-32" key={index}>
                <div className="shrink-0" style={{ width: "40vw" }}></div>
                <div
                  ref={el => { logoRefs.current[index] = el }}
                  className="w-full flex justify-center py-6"
                >
                  <Image
                    src={src}
                    alt={`Brand ${index}`}
                    width={280}
                    height={180}
                    className="transition-all duration-500 grayscale filter brightness-90 object-contain"
                  />
                </div>
              </div>
            ))}
            <div className="shrink-0 h-32"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
