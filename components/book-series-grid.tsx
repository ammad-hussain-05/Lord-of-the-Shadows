"use client"

import { useRef, useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"

const originalSeries = [
  {
    id: 1,
    name: "Lord of the Shadows",
    books: 4,
    cover: "/images/cassie-book.jpg",
    color: "from-purple-600 to-amber-500",
  },
  {
    id: 2,
    name: "Realm of Embers",
    books: 3,
    cover: "/images/eBook-2.jpg",
    color: "from-orange-500 to-red-600",
  },
  {
    id: 3,
    name: "Crown of Thorns",
    books: 4,
    cover: "/images/front.jpg",
    color: "from-emerald-500 to-cyan-500",
  },
  {
    id: 4,
    name: "The Forgotten Kingdom",
    books: 6,
    cover: "/images/lord-shadow.jpg",
    color: "from-blue-600 to-indigo-600",
  },
]

// Duplicate for seamless infinite loop
const series = [...originalSeries, ...originalSeries]

export function BookSeriesGrid() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  const totalOriginal = originalSeries.length

  // Auto Slide
  useEffect(() => {
    if (isHovered) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalOriginal)
    }, 4000)

    return () => clearInterval(interval)
  }, [isHovered, totalOriginal])

  return (
   <section
  id="series"
  className="py-24 md:py-32 relative overflow-hidden"
  style={{
    backgroundImage: `url("/images/Orange Background.jpg")`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  }}
>
  {/* Overlay for readability */}
  <div className="absolute inset-0 bg-black/50 z-0" />

  {/* Existing Glow Effect */}
  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-to-br from-amber-900/10 via-amber-900/10 to-transparent rounded-full blur-[30px]" />

  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
    
    <div className="text-center mb-16">
      <p className="text-amber-400 font-serif tracking-[4px] text-sm uppercase mb-3">
        EPIC REALMS
      </p>
      <h2 className="font-display text-5xl md:text-6xl lg:text-7xl text-white tracking-tighter mb-4">
        Book Series
      </h2>
      <p className="text-gray-400 max-w-xl mx-auto text-lg">
        Step into worlds of magic, power, and destiny
      </p>
    </div>

    {/* 3D Carousel */}
    <div 
      className="relative h-[520px] perspective-[1800px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-7xl">
        <div className="relative flex items-center justify-center">
          {series.map((item, index) => {
            const realIndex = index % totalOriginal
            const position = (realIndex - currentIndex + totalOriginal) % totalOriginal
            
            const isCenter = position === 0
            const isLeft = position === 1 || position === totalOriginal - 5
            const isRight = position === 2 || position === totalOriginal - 6

            return (
              <Link
                key={`${item.id}-${index}`}
              href={`/book-series/${item.name.toLowerCase().replace(/\s+/g, '-')}`}
// "Lord of the Shadows" → /book-series/lord-of-the-shadows ✅
                className={`absolute transition-all duration-1000 ease-out ${
                  isCenter ? 'z-30' : 'z-10'
                }`}
                style={{
                  transform: isCenter 
                    ? 'scale(1) rotateY(0deg) translateZ(60px)'
                    : isLeft 
                    ? 'scale(0.85) rotateY(-3deg) translateX(-280px) translateZ(-80px)'
                    : isRight
                    ? 'scale(0.9) rotateY(3deg) translateX(280px) translateZ(-80px)'
                    : 'scale(0.7) rotateY(0deg) translateZ(-120px)',
                  opacity: isCenter ? 1 : isLeft || isRight ? 0.85 : 0.4,
                }}
              >
                <div className="group w-72 md:w-80 lg:w-96 aspect-[2/3] relative rounded-3xl overflow-hidden shadow-2xl border border-white/10 hover:border-amber-400/30">
                  <Image
                    src={item.cover}
                    alt={item.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/50 to-black/80" />
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-10`} />

                  <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/90 to-transparent">
                    <h3 className={`text-2xl font-serif ${isCenter ? 'text-amber-300' : 'text-white'}`}>
                      {item.name}
                    </h3>
                    <p className="text-sm text-gray-300 mt-1">
                      {item.books} Books in Series
                    </p>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>

    {/* Progress */}
    <div className="flex justify-center gap-2 mt-12">
      {originalSeries.map((_, idx) => (
        <div
          key={idx}
          className={`h-[3px] rounded-full transition-all duration-700 ${
            idx === currentIndex 
              ? "w-12 bg-amber-400" 
              : "w-6 bg-white/20"
          }`}
        />
      ))}
    </div>

  </div>
</section>
  )
}