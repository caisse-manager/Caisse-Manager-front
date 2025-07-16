'use client'

import ScrollPage from '@/components/ScrollPage'
import NavBar from "@/components/Navbar"
import Footer from "@/components/Footer"

export default function Home() {
  return (
    <>
      <NavBar />
      <main>
        <section className="min-h-screen flex flex-col items-center justify-center text-center px-4 md:px-8 lg:px-16 bg-black relative overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-red-600 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-white rounded-full blur-3xl animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-red-600 rounded-full blur-3xl animate-pulse delay-500"></div>
          </div>

          <div className="relative z-10">
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 text-white">
              <span className="block relative">
                Welcome to Our Vision
                <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 via-white/10 to-red-500/20 blur-xl -z-10 animate-pulse"></div>
              </span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-500 max-w-3xl leading-relaxed">
              Discover our process from idea to launch with immersive scroll storytelling.
            </p>
          </div>
        </section>

        <ScrollPage />
      </main>
      <Footer />
    </>
  )
}
