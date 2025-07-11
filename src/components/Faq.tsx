'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { FaWhatsapp } from 'react-icons/fa'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import FAQItem from '@/components/FAQItem'

gsap.registerPlugin(ScrollTrigger)

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqListRef = useRef<HTMLUListElement>(null)
  const stickyBoxRef = useRef<HTMLDivElement>(null)

  const faqs = [
    {
      question: "What are your focus areas as a UI/UX design agency?",
      answer: "We focus on user-centered design, usability testing, and creating intuitive interfaces.",
    },
    {
      question: "Why is UI/UX design important for your business growth?",
      answer: "Good design improves user engagement and conversion rates, driving business growth.",
    },
    {
      question: "My website isn't generating enough leads. How can your design help?",
      answer: "We analyze user behavior to optimize the design for better lead generation.",
    },
    {
      question: "What separates Wavespace from other top UI/UX design agencies?",
      answer: "Our personalized approach and deep understanding of client needs set us apart.",
    },
    {
      question: "How could you help us redesign our app, website, or enterprise/B2B software?",
      answer: "We provide end-to-end design services, from user research to prototyping and testing.",
    },
    {
      question: "Do you work with startups or only with B2B/enterprise companies?",
      answer: "We work with a range of clients including startups, SMBs, and enterprises.",
    },
    {
      question: "What are your focus areas as a UI/UX design agency?",
      answer: "We focus on user-centered design, usability testing, and creating intuitive interfaces.",
    },
    {
      question: "Why is UI/UX design important for your business growth?",
      answer: "Good design improves user engagement and conversion rates, driving business growth.",
    },
    {
      question: "My website isn't generating enough leads. How can your design help?",
      answer: "We analyze user behavior to optimize the design for better lead generation.",
    },
    {
      question: "What separates Wavespace from other top UI/UX design agencies?",
      answer: "Our personalized approach and deep understanding of client needs set us apart.",
    },
    {
      question: "How could you help us redesign our app, website, or enterprise/B2B software?",
      answer: "We provide end-to-end design services, from user research to prototyping and testing.",
    },
    {
      question: "Do you work with startups or only with B2B/enterprise companies?",
      answer: "We work with a range of clients including startups, SMBs, and enterprises.",
    }
  ]

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  useEffect(() => {
    if (faqListRef.current && stickyBoxRef.current) {
      const faqBox = stickyBoxRef.current
      const faqList = faqListRef.current

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: faqList,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
        },
      })

      timeline.fromTo(
        faqBox,
        { y: 0 },
        {
          y: () => {
            const diff = faqList.offsetHeight - faqBox.offsetHeight
            return diff > 0 ? diff : 0
          },
          ease: 'none',
        }
      )

      return () => {
        timeline.kill()
      }
    }
  }, [])

  return (
    <div className="min-h-screen dark:bg-black overflow-auto">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-black dark:text-white mb-6 leading-snug">
          Frequently Asked <br /> Questions
        </h1>
        <div className="flex flex-col md:flex-row gap-8">
          {/* FAQ list */}
          <div className="flex flex-col gap-8 relative md:w-2/3">
            <ul ref={faqListRef} className="space-y-4">
              {faqs.map((faq, index) => (
                <FAQItem
                  key={index}
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={openIndex === index}
                  onToggle={() => toggleFAQ(index)}
                />
              ))}
            </ul>
          </div>

          {/* Sticky scroll box */}
          <div
            ref={stickyBoxRef}
            className="md:w-1/3 self-start hidden md:block" // caché sur mobile
          >
            <div className="border dark:border-gray-500 border-gray-300 rounded-md p-4">
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
                className="flex items-center gap-3 bg-red-700 hover:bg-red-600 hover:shadow-lg text-white font-medium rounded-full p-3 my-4 w-fit"
              >
                Ask Questions
                <FaWhatsapp className="text-2xl text-white" />
              </a>
            </div>
          </div>

          {/* Mobile version en bas */}
          <div className="block md:hidden mt-8">
            <div className="border dark:border-gray-500 border-gray-300 rounded-md p-4">
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
                className="flex items-center gap-3 bg-red-700 hover:bg-red-600 hover:shadow-lg text-white font-medium rounded-full p-3 my-4 w-fit"
              >
                Ask Questions
                <FaWhatsapp className="text-2xl text-white" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
