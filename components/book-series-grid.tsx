"use client"

import { useEffect, useState } from "react"
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

export function BookSeriesGrid() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  const totalOriginal = originalSeries.length

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    handleResize()
    window.addEventListener("resize", handleResize)

    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    if (isHovered) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalOriginal)
    }, 4000)

    return () => clearInterval(interval)
  }, [isHovered, totalOriginal])

  const getCardStyle = (index: number) => {
    const position = (index - currentIndex + totalOriginal) % totalOriginal

    const isCenter = position === 0
    const isRight = position === 1
    const isBack = position === 2
    const isLeft = position === totalOriginal - 1

    if (isMobile) {
      if (isCenter) {
        return {
          transform: "translateX(0px) scale(1) rotateY(0deg)",
          opacity: 1,
          zIndex: 30,
          pointerEvents: "auto" as const,
        }
      }

      if (isRight) {
        return {
          transform: "translateX(92px) scale(0.78) rotateY(8deg)",
          opacity: 0.45,
          zIndex: 20,
          pointerEvents: "none" as const,
        }
      }

      if (isLeft) {
        return {
          transform: "translateX(-92px) scale(0.78) rotateY(-8deg)",
          opacity: 0.45,
          zIndex: 20,
          pointerEvents: "none" as const,
        }
      }

      return {
        transform: "translateX(0px) scale(0.62) translateY(20px)",
        opacity: 0,
        zIndex: 5,
        pointerEvents: "none" as const,
      }
    }

    if (isCenter) {
      return {
        transform: "scale(1) rotateY(0deg) translateZ(60px)",
        opacity: 1,
        zIndex: 30,
        pointerEvents: "auto" as const,
      }
    }

    if (isLeft) {
      return {
        transform: "scale(0.86) rotateY(-8deg) translateX(-300px) translateZ(-80px)",
        opacity: 0.75,
        zIndex: 15,
        pointerEvents: "none" as const,
      }
    }

    if (isRight) {
      return {
        transform: "scale(0.86) rotateY(8deg) translateX(300px) translateZ(-80px)",
        opacity: 0.75,
        zIndex: 15,
        pointerEvents: "none" as const,
      }
    }

    if (isBack) {
      return {
        transform: "scale(0.68) translateY(20px) translateZ(-140px)",
        opacity: 0.25,
        zIndex: 5,
        pointerEvents: "none" as const,
      }
    }

    return {
      transform: "scale(0.6) translateZ(-160px)",
      opacity: 0,
      zIndex: 1,
      pointerEvents: "none" as const,
    }
  }

  return (
    <section
      id="series"
      className="relative w-full max-w-full overflow-hidden px-4 py-20 sm:px-6 md:py-32 lg:px-8"
      style={{
        backgroundImage: `url("/images/Orange Background.jpg")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 z-0 bg-black/55" />

      <div className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-amber-900/20 via-amber-900/10 to-transparent blur-[40px] md:h-[1000px] md:w-[1000px]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-10 text-center md:mb-16">
          <p className="mb-3 font-serif text-xs uppercase tracking-[0.35em] text-amber-400 md:text-sm">
            EPIC REALMS
          </p>

          <h2 className="font-display text-4xl tracking-tighter text-white sm:text-5xl md:text-6xl lg:text-7xl">
            Book Series
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-gray-400 sm:text-base md:text-lg">
            Step into worlds of magic, power, and destiny
          </p>
        </div>

        <div
          className="relative mx-auto h-[430px] w-full overflow-hidden md:h-[540px] md:overflow-visible"
          style={{ perspective: "1800px" }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="absolute left-1/2 top-1/2 flex w-full -translate-x-1/2 -translate-y-1/2 items-center justify-center">
            {originalSeries.map((item, index) => {
              const cardStyle = getCardStyle(index)

              return (
                <Link
                  key={item.id}
                  href={`/book-series/${item.name
                    .toLowerCase()
                    .replace(/\s+/g, "-")}`}
                  className="absolute transition-all duration-700 ease-out"
                  style={cardStyle}
                >
                  <div className="group relative aspect-[2/3] w-[230px] overflow-hidden rounded-3xl border border-white/10 shadow-2xl transition hover:border-amber-400/40 sm:w-[260px] md:w-80 lg:w-96">
                    <Image
                      src={item.cover}
                      alt={item.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 640px) 230px, (max-width: 768px) 260px, (max-width: 1024px) 320px, 384px"
                    />

                    <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-black/45 to-black/85" />
                    <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-10`} />

                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/95 to-transparent p-5 sm:p-6 md:p-8">
                      <h3
                        className={`font-serif text-xl leading-tight sm:text-2xl ${
                          index === currentIndex ? "text-amber-300" : "text-white"
                        }`}
                      >
                        {item.name}
                      </h3>

                      <p className="mt-1 text-xs text-gray-300 sm:text-sm">
                        {item.books} Books in Series
                      </p>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>

        <div className="mt-8 flex justify-center gap-2 md:mt-12">
          {originalSeries.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              className={`h-[3px] rounded-full transition-all duration-500 ${
                idx === currentIndex ? "w-12 bg-amber-400" : "w-6 bg-white/25"
              }`}
              aria-label={`Go to book series ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}