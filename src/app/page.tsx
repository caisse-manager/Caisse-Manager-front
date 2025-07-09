'use client'

import {useRef, useState } from "react"
import NavBar from "@/components/Navbar"
import Fonctionalites from "@/components/Fonctionalites"
import Contact from "@/components/Contact"
import PreviousWork from "@/components/PreviousWork"
import BrandShowcase from "@/components/BrandShowcase"
import DiscoverUs from "@/components/DiscoverUs"
import GetStart from "@/components/GetStart"
import OurValues from "@/components/OurValues"
import Footer from "@/components/Footer"
import Preloader from "@/components/Preloader"

export default function HomePageWrapper() {
  const [showHome, setShowHome] = useState(false)
  const homePageRef = useRef<HTMLDivElement>(null)

  const handleFinishPreloader = () => {
    setShowHome(true)
    
  }


  return (
    <>
      {!showHome && <Preloader onFinish={handleFinishPreloader} />}

      <div
        ref={homePageRef}
        className="min-h-screen bg-white dark:bg-black text-black dark:text-white"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          overflow: "auto",
        }}
      >
        <NavBar />
        <Contact />
        <PreviousWork />
        <DiscoverUs />
        <BrandShowcase />
        <GetStart />
        <OurValues />
        <Fonctionalites />
        <Footer />
      </div>
    </>

  )
}
