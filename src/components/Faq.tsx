'use client'

import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import { FaWhatsapp } from 'react-icons/fa'
import { motion, AnimatePresence } from 'framer-motion'

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    {
      question: "What are your focus areas as a UI/UX design agency?",
      answer:
        "We focus on user-centered design, usability testing, and creating intuitive interfaces.",
    },
    {
      question: "Why is UI/UX design important for your business growth?",
      answer:
        "Good design improves user engagement and conversion rates, driving business growth.",
    },
    {
      question: "My website isn't generating enough leads. How can your design help?",
      answer:
        "We analyze user behavior to optimize the design for better lead generation.",
    },
    {
      question: "What separates Wavespace from other top UI/UX design agencies?",
      answer:
        "Our personalized approach and deep understanding of client needs set us apart.",
    },
    {
      question:
        "How could you help us redesign our app, website, or enterprise/B2B software?",
      answer:
        "We provide end-to-end design services, from user research to prototyping and testing.",
    },
    {
      question: "Do you work with startups or only with B2B/enterprise companies?",
      answer:
        "We work with a range of clients including startups, SMBs, and enterprises.",
    },
    {
      question: "What are your focus areas as a UI/UX design agency?",
      answer:
        "We focus on user-centered design, usability testing, and creating intuitive interfaces.",
    },
    {
      question: "Why is UI/UX design important for your business growth?",
      answer:
        "Good design improves user engagement and conversion rates, driving business growth.",
    },
    {
      question: "My website isn't generating enough leads. How can your design help?",
      answer:
        "We analyze user behavior to optimize the design for better lead generation.",
    },
    {
      question: "What separates Wavespace from other top UI/UX design agencies?",
      answer:
        "Our personalized approach and deep understanding of client needs set us apart.",
    },
    {
      question:
        "How could you help us redesign our app, website, or enterprise/B2B software?",
      answer:
        "We provide end-to-end design services, from user research to prototyping and testing.",
    },
    {
      question: "Do you work with startups or only with B2B/enterprise companies?",
      answer:
        "We work with a range of clients including startups, SMBs, and enterprises.",
    },
  ]

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="p-4 container mx-auto min-h-screen">
      <h1 className="text-5xl lg:text-4xl font-bold text-black dark:text-white mb-6 leading-snug p-4">
        Frequently Asked <br /> Questions
      </h1>

      <div className="flex justify-between flex-wrap">
        <ul className="max-w-3xl w-full pt-4 mb-6">
          {faqs.map((faq, index) => (
            <li
              key={index}
              className="w-full border-b border-gray-300 p-4 cursor-pointer dark:border-gray-700"
              onClick={() => toggleFAQ(index)}
              aria-expanded={openIndex === index}
              aria-controls={`faq-answer-${index}`}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') toggleFAQ(index)
              }}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                  {faq.question}
                </h3>
                <ArrowUpRight
                  className={`transform transition-transform duration-300 text-red-700 dark:text-red-700 ${
                    openIndex === index ? 'rotate-180' : 'rotate-0'
                  }`}
                />
              </div>

              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.p
                    id={`faq-answer-${index}`}
                    className="mt-2 text-gray-700 dark:text-gray-300"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                  >
                    {faq.answer}
                  </motion.p>
                )}
              </AnimatePresence>
            </li>
          ))}
        </ul>

        <section className="max-w-4xl mx-auto flex justify-center h-full sticky top-5 self-start">
          <div className="border dark:border-gray-500 border-gray-700 rounded-md p-4">
            <Image
              src="/caisse-manager-logo.png"
              alt="caisse manager logo"
              width={100}
              height={100}
            />
            <p className="mt-2 text-gray-700 dark:text-gray-300 max-w-xs">
              Hi, I&apos;m Shahid, the CEO and Founder of Wavespace. Don&apos;t
              hesitate to reach out to me anytime - I&apos;m here to answer all
              your questions!
            </p>
            <a
              href="https://wa.me/..."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-red-700 hover:bg-red-600 hover:shadow-lg text-white dark:text-gray-300 font-medium rounded-full p-3 my-4 w-fit"
            >
              Ask Questions
              <FaWhatsapp className="text-2xl text-white" />
            </a>
          </div>
        </section>
      </div>
    </div>
  )
}
