import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function Contact() {
  return (
    <section className="container mx-auto min-h-screen py-8 px-4 sm:py-12 md:py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center max-w-7xl mx-auto">
        {/* Image Section */}
        <div className="relative order-2 lg:order-1">
          <div className="absolute -inset-2 sm:-inset-4 bg-gradient-to-r from-red-900/20 to-red-600/20 rounded-xl blur-xl"></div>
          <div className="relative flex justify-center lg:justify-start">
            <Image
              src="/pack.png"
              width={600}
              height={400}
              alt="Caisse Manager POS System"
              className="rounded-lg w-full max-w-md sm:max-w-lg lg:max-w-full h-auto object-contain"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 600px"
            />
          </div>
        </div>

        {/* Form Section */}
        <div className="order-1 lg:order-2">
          <div className="bg-black/30 dark:bg-white/5 p-4 sm:p-6 lg:p-8 rounded-lg border border-gray-800 dark:border-gray-700 backdrop-blur-sm">
            <div className="mb-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-white dark:text-white mb-2">Demandez votre démo</h2>
              <p className="text-gray-300 dark:text-gray-400 text-sm sm:text-base">
                Découvrez comment notre solution peut transformer votre business
              </p>
            </div>

            <form className="space-y-4 sm:space-y-5">
              <div className="space-y-4">
                <Input
                  type="text"
                  placeholder="Nom de marque*"
                  className="bg-transparent border-gray-700 dark:border-gray-600 text-white placeholder:text-gray-400 h-11 sm:h-12 text-sm sm:text-base focus:border-red-500 focus:ring-red-500/20"
                  required
                />
                <Input
                  type="tel"
                  placeholder="06xx-xxxxx*"
                  className="bg-transparent border-gray-700 dark:border-gray-600 text-white placeholder:text-gray-400 h-11 sm:h-12 text-sm sm:text-base focus:border-red-500 focus:ring-red-500/20"
                  required
                />
                <Select>
                  <SelectTrigger className="bg-transparent border-gray-700 dark:border-gray-600 text-white h-11 sm:h-12 text-sm sm:text-base focus:border-red-500 focus:ring-red-500/20">
                    <SelectValue placeholder="Ville" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-gray-700">
                    <SelectItem value="casablanca" className="text-white hover:bg-gray-800">
                      Casablanca
                    </SelectItem>
                    <SelectItem value="rabat" className="text-white hover:bg-gray-800">
                      Rabat
                    </SelectItem>
                    <SelectItem value="marrakech" className="text-white hover:bg-gray-800">
                      Marrakech
                    </SelectItem>
                    <SelectItem value="tanger" className="text-white hover:bg-gray-800">
                      Tanger
                    </SelectItem>
                    <SelectItem value="fes" className="text-white hover:bg-gray-800">
                      Fès
                    </SelectItem>
                    <SelectItem value="agadir" className="text-white hover:bg-gray-800">
                      Agadir
                    </SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="bg-transparent border-gray-700 dark:border-gray-600 text-white h-11 sm:h-12 text-sm sm:text-base focus:border-red-500 focus:ring-red-500/20">
                    <SelectValue placeholder="Type d'activité" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-gray-700">
                    <SelectItem value="restaurant" className="text-white hover:bg-gray-800">
                      Restaurant
                    </SelectItem>
                    <SelectItem value="cafe" className="text-white hover:bg-gray-800">
                      Café
                    </SelectItem>
                    <SelectItem value="retail" className="text-white hover:bg-gray-800">
                      Commerce de détail
                    </SelectItem>
                    <SelectItem value="supermarket" className="text-white hover:bg-gray-800">
                      Supermarché
                    </SelectItem>
                    <SelectItem value="pharmacy" className="text-white hover:bg-gray-800">
                      Pharmacie
                    </SelectItem>
                    <SelectItem value="other" className="text-white hover:bg-gray-800">
                      Autre
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button className="w-full bg-red-600 hover:bg-red-700 text-white font-medium h-11 sm:h-12 text-sm sm:text-base transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]">
                Démo GRATUITE
              </Button>

              <p className="text-xs sm:text-sm text-gray-400 text-center mt-4">
                * Champs obligatoires. Nous vous contacterons sous 24h.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
