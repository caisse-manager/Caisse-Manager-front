'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { gsap } from 'gsap';
import SliderCard from './SliderCard';

const ProjectSlider: React.FC = () => {
  const [itemsPerView, setItemsPerView] = useState(2);
  const [cardWidth, setCardWidth] = useState(390);
  const [gap, setGap] = useState(12);

  const sliderItems = [
    {
      id: 1,
      title: "Digital Innovation",
      coverImage: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800",
      hoverImage: "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
      id: 2,
      title: "Modern Architecture",
      coverImage: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800",
      hoverImage: "https://images.pexels.com/photos/3184466/pexels-photo-3184466.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
      id: 3,
      title: "Creative Design",
      coverImage: "https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg?auto=compress&cs=tinysrgb&w=800",
      hoverImage: "https://images.pexels.com/photos/3184288/pexels-photo-3184288.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
      id: 4,
      title: "Tech Solutions",
      coverImage: "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=800",
      hoverImage: "https://images.pexels.com/photos/3184340/pexels-photo-3184340.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
      id: 5,
      title: "Brand Identity",
      coverImage: "https://images.pexels.com/photos/3184317/pexels-photo-3184317.jpeg?auto=compress&cs=tinysrgb&w=800",
      hoverImage: "https://images.pexels.com/photos/3184318/pexels-photo-3184318.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
      id: 6,
      title: "Future Vision",
      coverImage: "https://images.pexels.com/photos/3184632/pexels-photo-3184632.jpeg?auto=compress&cs=tinysrgb&w=800",
      hoverImage: "https://images.pexels.com/photos/3184633/pexels-photo-3184633.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
      id: 7,
      title: "Digital Innovation",
      coverImage: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800",
      hoverImage: "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
      id: 8,
      title: "Modern Architecture",
      coverImage: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800",
      hoverImage: "https://images.pexels.com/photos/3184466/pexels-photo-3184466.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
      id: 9,
      title: "Creative Design",
      coverImage: "https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg?auto=compress&cs=tinysrgb&w=800",
      hoverImage: "https://images.pexels.com/photos/3184288/pexels-photo-3184288.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
      id: 10,
      title: "Tech Solutions",
      coverImage: "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=800",
      hoverImage: "https://images.pexels.com/photos/3184340/pexels-photo-3184340.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
      id: 11,
      title: "Brand Identity",
      coverImage: "https://images.pexels.com/photos/3184317/pexels-photo-3184317.jpeg?auto=compress&cs=tinysrgb&w=800",
      hoverImage: "https://images.pexels.com/photos/3184318/pexels-photo-3184318.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
      id: 12,
      title: "Future Vision",
      coverImage: "https://images.pexels.com/photos/3184632/pexels-photo-3184632.jpeg?auto=compress&cs=tinysrgb&w=800",
      hoverImage: "https://images.pexels.com/photos/3184633/pexels-photo-3184633.jpeg?auto=compress&cs=tinysrgb&w=800"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState<'next' | 'prev' | null>(null);

  const trackRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Responsive configuration
  useEffect(() => {
    const updateDimensions = () => {
      const width = window.innerWidth;
      
      if (width < 768) {
        // Mobile
        setItemsPerView(1);
        setCardWidth(Math.min(350, width - 40));
        setGap(8);
      } else if (width < 1024) {
        // Tablet
        setItemsPerView(1);
        setCardWidth(400);
        setGap(10);
      } else {
        // Desktop
        setItemsPerView(2);
        setCardWidth(390);
        setGap(12);
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const slide = (dir: 'next' | 'prev') => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection(dir);
    console.log(isAnimating)
    setCurrentIndex((prev) => {
      return dir === 'next'
        ? (prev + 1) % sliderItems.length
        : (prev - 1 + sliderItems.length) % sliderItems.length;
    });
  };

  useEffect(() => {
    if (!direction) return;

    // Utiliser les valeurs actuelles au moment de l'exécution
    const currentCardWidth = cardWidth;
    const currentGap = gap;
    const offsetX = direction === 'next' ? -(currentCardWidth + currentGap) : (currentCardWidth + currentGap);
    
    const tl = gsap.timeline({
      onComplete: () => {
        setIsAnimating(false);
        setDirection(null);
      }
    });

    // Animate out current cards
    cardsRef.current.forEach((card) => {
      if (card) {
        tl.to(card, {
          x: direction === 'next' ? -100 : 100,
          opacity: 0,
          scale: 0.6,
          autoAlpha: 0,
          duration: 1.2,
          ease: 'power2.inOut'
        }, 0);
      }
    });

    // Animate the track movement
    tl.to(trackRef.current, {
      x: `+=${offsetX}`,
      duration: 1.2,
      ease: 'power2.inOut'
    }, 0);

    // Reset position if looped
    tl.add(() => {
      if (!trackRef.current) return;
      const newX = parseFloat(gsap.getProperty(trackRef.current, "x") as string);

      if (direction === 'next' && currentIndex === 0) {
        gsap.set(trackRef.current, {
          x: newX + sliderItems.length * (currentCardWidth + currentGap)
        });
      } else if (direction === 'prev' && currentIndex === sliderItems.length - 1) {
        gsap.set(trackRef.current, {
          x: newX - sliderItems.length * (currentCardWidth + currentGap)
        });
      }
    });

    // Animate new cards in
    for (let i = 0; i < itemsPerView; i++) {
      const index = (currentIndex + i) % sliderItems.length;
      const card = cardsRef.current[index];

      if (card) {
        tl.fromTo(card,
          {
            x: direction === 'next' ? 100 : -200,
            opacity: 0,
            scale: 0.6,
            autoAlpha: 0
          },
          {
            x: 0,
            opacity: 1,
            scale: 1,
            autoAlpha: 1,
            duration: 1.5,
            ease: 'power2.out'
          },
          0
        );
      }
    }
  }, [currentIndex, direction, cardWidth, gap, itemsPerView]);

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Mobile & Tablet Layout */}
      <div className="block lg:hidden">
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
          {/* Text Section */}
          <div className="text-center mb-8 max-w-md">
            <h1 className="text-2xl md:text-3xl font-bold leading-tight tracking-tight mb-6 select-none">
              <span className="block relative">
                Taking digital experiences
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent blur-sm -z-10"></div>
              </span>
              <span className="block text-red-500 relative">
                to new heights
                <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-transparent blur-sm -z-10"></div>
              </span>
            </h1>

            <div className="w-20 h-1 bg-gradient-to-r from-red-500 to-red-600 mb-6 rounded-full shadow-lg shadow-red-500/50 mx-auto"></div>

            <p className="text-sm text-white/80 mb-8 leading-relaxed font-light">
              Notre expertise et notre expérience nous permettent de livrer des sites web de première classe pour pratiquement tous les secteurs.
            </p>

            <div className="flex gap-4 justify-center">
              <button
                onClick={() => slide('prev')}
                disabled={isAnimating}
                className={`p-3 rounded-full border-2 transition-all duration-300 ${
                  !isAnimating
                    ? 'border-red-500 text-red-500 hover:bg-red-500 hover:text-white'
                    : 'border-gray-600 text-gray-600'
                }`}
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={() => slide('next')}
                disabled={isAnimating}
                className={`p-3 rounded-full border-2 transition-all duration-300 ${
                  !isAnimating
                    ? 'border-red-500 text-red-500 hover:bg-red-500 hover:text-white'
                    : 'border-gray-600 text-gray-600'
                }`}
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          {/* Slider Section */}
          <div
            className="relative flex items-center justify-center overflow-visible"
            style={{ width: cardWidth, height: 280 }}
          >
            <div
              className="flex"
              ref={trackRef}
              style={{ 
                transform: 'translateX(0px)', 
                position: 'relative', 
                zIndex: 5,
                gap: `${gap}px`
              }}
            >
              {sliderItems.map((item, index) => (
                <div
                  key={item.id}
                  ref={(el) => (cardsRef.current[index] = el)}
                  style={{ width: cardWidth, height: 250 }}
                >
                  <SliderCard
                    title={item.title}
                    coverImage={item.coverImage}
                    hoverImage={item.hoverImage}
                    width={cardWidth}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:flex items-center min-h-screen">
        {/* Left Text Section */}
        <div className="relative z-30 flex-shrink-0 m-8 p-6 rounded-lg" style={{ maxWidth: 400, height: 260 }}>
          <h1 className="text-3xl xl:text-4xl font-bold leading-tight tracking-tight mb-6 select-none">
            <span className="block relative">
              Taking digital experiences
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent blur-sm -z-10"></div>
            </span>
            <span className="block text-red-500 relative">
              to new heights
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-transparent blur-sm -z-10"></div>
            </span>
          </h1>

          <div className="w-20 h-1 bg-gradient-to-r from-red-500 to-red-600 mb-8 rounded-full shadow-lg shadow-red-500/50"></div>

          <p className="text-sm text-white/80 mb-12 leading-relaxed font-light">
            Notre expertise et notre expérience nous permettent de livrer des sites web de première classe pour pratiquement tous les secteurs.
          </p>

          <div className="flex gap-4">
            <button
              onClick={() => slide('prev')}
              disabled={isAnimating}
              className={`p-3 rounded-full border-2 transition-all duration-300 ${
                !isAnimating
                  ? 'border-red-500 text-red-500 hover:bg-red-500 hover:text-white'
                  : 'border-gray-600 text-gray-600'
              }`}
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={() => slide('next')}
              disabled={isAnimating}
              className={`p-3 rounded-full border-2 transition-all duration-300 ${
                !isAnimating
                  ? 'border-red-500 text-red-500 hover:bg-red-500 hover:text-white'
                  : 'border-gray-600 text-gray-600'
              }`}
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        {/* Right Slider Section */}
        <div
          className="relative z-10 flex items-center overflow-visible"
          style={{ width: cardWidth * itemsPerView + gap * (itemsPerView - 1), height: 260 }}
        >
          <div
            className="flex"
            ref={trackRef}
            style={{ 
              transform: 'translateX(0px)', 
              position: 'relative', 
              zIndex: 5,
              gap: `${gap}px`
            }}
          >
            {sliderItems.map((item, index) => (
              <div
                key={item.id}
                ref={(el) => (cardsRef.current[index] = el)}
                style={{ width: cardWidth, height: 220 }}
              >
                <SliderCard
                  title={item.title}
                  coverImage={item.coverImage}
                  hoverImage={item.hoverImage}
                  width={cardWidth}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectSlider;