'use client'

import { useState } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import ThemeToggle from './ThemeToggle'

const navigation = [
  { name: 'Home', href: '#' },
  { name: 'Nos clients', href: '#' },
  { name: 'Fonctionalités', href: '#' },
  { name: 'Analytics', href: '#' },
]

export default function NavBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="bg-white dark:bg-black text-black dark:text-white">
      <header className="inset-x-0 top-0 z-50 shadow-md dark:shadow-lg bg-white/90 dark:bg-black/80 backdrop-blur-md">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8 relative">
          <div className="flex lg:flex-1 items-center gap-2">
            <a href="#" className="-m-1.5 p-1.5">
              <Image
                alt="Caisse Manager Logo"
                src="/caisse-manager-logo.png"
                width={32}
                height={32}
                className="h-8 w-auto"
                priority
              />
            </a>
            <div>
              <div className="font-bold text-lg">Caisse</div>
              <div className="font-bold text-lg -mt-1">Manager</div>
            </div>
          </div>

          <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 gap-x-10">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm font-semibold hover:underline transition-colors text-black dark:text-white"
              >
                {item.name}
              </a>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-6">
            <a href="#" className="text-sm font-semibold hover:underline text-black dark:text-white">
              Log in <span aria-hidden="true">&rarr;</span>
            </a>
            <ThemeToggle />
          </div>

          <div className="flex lg:hidden items-center gap-2">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="inline-flex items-center justify-center rounded-md p-2.5 text-black dark:text-white"
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="size-6" />
            </button>
          </div>
        </nav>

        <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
          <div className="fixed inset-0 z-50 bg-black/50" />
          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full max-w-sm overflow-y-auto bg-white dark:bg-black text-black dark:text-white p-6 sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5 flex items-center gap-2">
                <Image
                  alt="Caisse Manager Logo"
                  src="/caisse-manager-logo.png"
                  width={32}
                  height={32}
                  className="h-8 w-auto"
                  priority
                />
                <span className="font-semibold text-lg">Caisse Manager</span>
              </a>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-md p-2.5 text-black dark:text-white"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>
            </div>
            <div className="mt-6 space-y-4">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block rounded-md px-3 py-2 text-base font-semibold hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  {item.name}
                </a>
              ))}
              <a
                href="#"
                className="block rounded-md px-3 py-2 text-base font-semibold hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                Log in →
              </a>
              <ThemeToggle />
            </div>
          </DialogPanel>
        </Dialog>
      </header>
    </div>
  )
}



