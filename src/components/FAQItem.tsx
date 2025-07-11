'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

interface FAQItemProps {
  question: string
  answer: string
  isOpen: boolean
  onToggle: () => void
}

export default function FAQItem({ question, answer, isOpen, onToggle }: FAQItemProps) {
  return (
    <li
      className="w-full border-b border-gray-300 p-4 cursor-pointer dark:border-gray-700"
      onClick={onToggle}
      aria-expanded={isOpen}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') onToggle()
      }}
    >
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
          {question}
        </h3>
        <ArrowUpRight
          className={`transform transition-transform duration-300 text-red-700 dark:text-red-700 ${
            isOpen ? 'rotate-180' : 'rotate-0'
          }`}
        />
      </div>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.p
            className="mt-2 text-gray-700 dark:text-gray-300"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
          >
            {answer}
          </motion.p>
        )}
      </AnimatePresence>
    </li>
  )
}
