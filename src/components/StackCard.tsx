'use client'
import Image from 'next/image'

interface StackCardProps {
  title: string
  description: string
  image: string
  direction: 'left' | 'right'
  index: number
  bgColor?: string
  accentColor?: string
}

export default function StackCard({
  title,
  description,
  image,
  direction,
  index,
  bgColor = 'linear-gradient(135deg, #1a1a1a 0%, #333333 100%)',
  accentColor = '#ef4444',
}: StackCardProps) {
  const isLeft = direction === 'left'

  return (
    <div
      className={`stackCard relative w-full min-h-[500px] py-12 px-6 md:px-10 lg:px-[40px] rounded-[30px] 
        flex flex-col md:flex-row ${isLeft ? 'md:flex-row-reverse' : 'md:flex-row'} 
        items-center justify-between shadow-2xl border border-white/10 overflow-hidden 
        group hover:border-red-500/30 transition-all duration-300`}
      style={{ background: bgColor }}
    >
      <div className="w-full flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
        <div className="flex-1 text-white space-y-6">
          <div className="flex items-center space-x-4">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center text-black font-bold text-lg"
              style={{ backgroundColor: accentColor }}
            >
              {index}
            </div>
            <div className="w-16 h-0.5" style={{ backgroundColor: accentColor }}></div>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight group-hover:text-red-100 transition-colors duration-300">
            {title}
          </h2>

          <p className="text-gray-300 text-base sm:text-lg leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
            {description}
          </p>

          <div className="flex space-x-2 pt-4">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
            <div className="w-2 h-2 rounded-full bg-white animate-pulse delay-200"></div>
            <div className="w-2 h-2 rounded-full bg-red-600 animate-pulse delay-400"></div>
          </div>
        </div>

        <div className="flex-1 relative group w-full">
          <div className="relative overflow-hidden rounded-2xl shadow-2xl border border-white/20 group-hover:border-red-500/50 transition-all duration-300">
            <Image
              src={image}
              width={400}
              height={400}
              alt={title}
              className="object-cover w-full h-[200px] sm:h-[300px] md:h-[350px] group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          <div
            className="absolute -top-4 -right-4 w-8 h-8 rounded-full opacity-80 animate-pulse"
            style={{ backgroundColor: accentColor }}
          ></div>
        </div>
      </div>
    </div>
  )
}
