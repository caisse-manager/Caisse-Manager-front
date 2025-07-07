import NavBar from "@/components/Navbar"
import Fonctionalites from "@/components/Fonctionalites"
import Contact from "@/components/Contact"
import PreviousWork from "@/components/PreviousWork"
import BrandShowcase from "@/components/BrandShowcase"
import DiscoverUs from "@/components/DiscoverUs"
import GetStart from "@/components/GetStart"
import OurValues from "@/components/OurValues"
import Footer from "@/components/Footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white max-x-screen">
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
  )
}