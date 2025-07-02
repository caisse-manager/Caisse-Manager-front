"use client"

import Link from "next/link"
import { Instagram, Facebook, Linkedin, ArrowUp } from "lucide-react"
import { TikTok } from "./ui/tiktok-icon"
import Image from "next/image"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[#1a1a1a] text-white py-12 relative">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ml-6">
          <div>
            <div className="flex items-center mb-6 ">
              <div className="w-8 h-8 flex items-center justify-center rounded mr-2">
              <Image
                alt="Caisse Manager Logo"
                src="/caisse-manager-logo.png"
                width={32}
                height={32}
                className="h-8 w-auto"
                priority
              />
              </div>
              <div>
                <div className="font-bold text-lg">Caisse</div>
                <div className="font-bold text-lg -mt-1">Manager</div>
              </div>
            </div>
            <p className="mb-2">Av. Ennakhil, Riad 3, magasin n°1, Hay Riad, Rabat</p>
            <p className="mb-2">+212 661-696965</p>
            <p className="mb-2">
              <Link href="mailto:contact@caissemanager.com" className="hover:underline">
                contact@caissemanager.com
              </Link>
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-6">Réseaux Sociaux</h3>
            <ul className="space-y-4">
              <li>
                <Link href="#" className="flex items-center gap-2 hover:text-gray-300">
                  <Instagram size={20} />
                  <span>Instagram</span>
                </Link>
              </li>
              <li>
                <Link href="#" className="flex items-center gap-2 hover:text-gray-300">
                  <Facebook size={20} />
                  <span>Facebook</span>
                </Link>
              </li>
              <li>
                <Link href="#" className="flex items-center gap-2 hover:text-gray-300">
                  <TikTok size={20} />
                  <span>TikTok</span>
                </Link>
              </li>
              <li>
                <Link href="#" className="flex items-center gap-2 hover:text-gray-300">
                  <Linkedin size={20} />
                  <span>Linkedin</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Useful Links */}
          <div>
            <h3 className="text-lg font-medium mb-6">Liens Utiles</h3>
            <ul className="space-y-4">
              <li>
                <Link href="#" className="hover:text-gray-300">
                  Démo GRATUITE
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-300">
                  Politique de confidentialité
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-300">
                  Conditions d&apos;utilisation
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-6 text-center text-sm text-gray-400">
          © 2018 - {currentYear} Caisse Manager. Tous droits réservés.
        </div>
      </div>

      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="absolute bottom-4 right-4 bg-white text-black p-2 rounded-md hover:bg-gray-200 transition-colors"
        aria-label="Back to top"
      >
        <ArrowUp size={20} />
      </button>
    </footer>
  )
}
