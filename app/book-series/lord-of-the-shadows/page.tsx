"use client"

import Image from "next/image"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { useState, useEffect, useRef } from "react"

const seriesBooks = [
  {
    id: 1,
    title: "Lord of the Shadows",
    subtitle: "Book 1",
    desc: "Magnus awakens as the Tower Master, discovering forbidden love in a world shrouded in darkness.",
    src: "/images/lord-shadow.jpg",
  },
  {
    id: 2,
    title: "Lord of the shadows",
    subtitle: "Book 2",
    desc: "Amidst rising shadows, a tender bond blooms, testing loyalty and passion alike.",
    src: "/images/cassie-book.jpg",
  },
  {
    id: 3,
    title: "Lord of the Shadows",
    subtitle: "Book 3",
    desc: "Love faces its greatest trial as Magnus confronts threats that could tear hearts apart.",
    src: "/images/front.jpg",
  },
   {
    id: 4,
    title: "Lord of the Shadows",
    subtitle: "Book 4",
    desc: "Romance defies death itself, as love and loss collide on a battlefield of shadows.",
    src: "/images/eBook-2.jpg",
  },
]

export default function LordOfTheShadows() {
  const [currentBook, setCurrentBook] = useState(0)
  const [animating, setAnimating] = useState(false)
  const [direction, setDirection] = useState<'left' | 'right' | null>(null)
  const autoRef = useRef<NodeJS.Timeout | null>(null)

  const goTo = (idx: number) => {
    if (animating || idx === currentBook) return
    setDirection(idx > currentBook ? 'right' : 'left')
    setAnimating(true)
    setTimeout(() => {
      setCurrentBook(idx)
      setAnimating(false)
    }, 400)
  }

  const next = () => goTo((currentBook + 1) % seriesBooks.length)
  const prev = () => goTo((currentBook - 1 + seriesBooks.length) % seriesBooks.length)

  useEffect(() => {
    autoRef.current = setInterval(next, 5000)
    return () => { if (autoRef.current) clearInterval(autoRef.current) }
  }, [currentBook])

  const getBookStyle = (index: number) => {
    const offset = index - currentBook
    const absOffset = Math.abs(offset)

    if (absOffset > 1) return { display: 'none' }

    if (offset === 0) {
      return {
        transform: `translateX(0px) translateZ(120px) rotateY(0deg) scale(1)`,
        zIndex: 30,
        opacity: 1,
        filter: 'brightness(1)',
      }
    }

    // Side books — curved/angled
    const side = offset > 0 ? 1 : -1
    return {
      transform: `
        translateX(${side * 340}px)
        translateZ(-60px)
        rotateY(${side * -42}deg)
        scale(0.72)
        skewY(${side * 2}deg)
      `,
      zIndex: 10,
      opacity: 0.65,
      filter: 'brightness(0.55) saturate(0.7)',
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-hidden">
      <Navigation />

      {/* HERO SECTION */}
      {/* HERO SECTION */}
<section className="relative z-10 w-full min-h-screen py-20 md:py-33">
  <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">

    {/* 3D Floating Book - LEFT */}
    <div className="flex justify-center lg:justify-start relative">
      <style>{`
        @keyframes floatBook {
          0%   { transform: rotateY(18deg) rotateX(12deg) translateZ(10px) translateY(0px); }
          25%  { transform: rotateY(22deg) rotateX(8deg)  translateZ(50px) translateY(-14px); }
          50%  { transform: rotateY(14deg) rotateX(15deg) translateZ(40px) translateY(-22px); }
          75%  { transform: rotateY(20deg) rotateX(10deg) translateZ(45px) translateY(-10px); }
          100% { transform: rotateY(18deg) rotateX(12deg) translateZ(40px) translateY(0px); }
        }
        @keyframes glowPulse {
          0%, 100% { box-shadow: 0 60px 100px -20px rgba(234, 179, 8, 0.3), -20px 0 60px -10px rgba(0,0,0,0.8); }
          50%       { box-shadow: 0 80px 120px -10px rgba(234, 179, 8, 0.55), -20px 0 80px -5px rgba(0,0,0,0.9); }
        }
        .book-float {
          animation: floatBook 4s ease-in-out infinite, glowPulse 4s ease-in-out infinite;
        }
      `}</style>

      <div className="relative" style={{ perspective: '500px' }}>
        <div
          className="book-float relative w-80 md:w-96 lg:w-[360px] aspect-[2/3]"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <Image
            src="/images/lord-shadow.jpg"
            alt="Lord of the Shadows"
            fill
            className="object-cover rounded-2xl border border-amber-400/20"
            priority
          />
          {/* Shine overlay */}
          <div className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 50%, rgba(0,0,0,0.15) 100%)',
            }}
          />
          {/* Book spine */}
          <div
            className="absolute top-0 bottom-0 left-0 w-6 rounded-l-2xl"
            style={{
              background: 'linear-gradient(to right, #000, #1a1a1a)',
              transform: 'rotateY(200deg) translateZ(-12px)',
              transformOrigin: 'left center',
            }}
          />
        </div>
      </div>
    </div>

    {/* Right Content */}
    <div className="space-y-8 text-center lg:text-left">
      <p className="text-amber-400 font-serif tracking-[3px] text-sm uppercase font-medium">
        NEW SERIES
      </p>
     <h1 className="text-5xl md:text-6xl lg:text-6xl font-display leading-[1.05] tracking-tighter">
  Shadows Awaken<br />A Tale of Love and Vengeance
</h1>
      <p className="text-gray-300 text-lg md:text-xl max-w-lg mx-auto lg:mx-0 leading-relaxed">
In the mist-laden town of Bethlehem, the vampire Michael Vondrake lives behind silver gates and centuries of regret. Once a warrior of shadows, now a guardian of humanity, he longs only for peace.

But fate has other plans. When the wounded fairy Elain and the fierce warrior Angel enter his world, Michael’s quiet existence erupts into chaos. The Underworld stirs, ancient debts resurface, and the dark lord Dragvon rises, hungry for vengeance.

As love and loyalty intertwine across light and shadow, Michael must confront his greatest adversary his own haunted past.

The ultimate battle between darkness and redemption approaches and even immortals must face the dawn.      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-6">
        <Link
          href="https://www.amazon.com/LORD-SHADOWS-Cassie-Hebein-ebook/dp/B0G26X883R/ref=sr_1_1?cri[%E2%80%A6]s+by+cassie+hebein&qid=1774978868&sprefix=%2Caps%2C323&sr=8-1"
          target="_blank"
          className="bg-primary-100 hover:bg-amber-600 text-white font-semibold px-12 py-4 rounded-xl text-lg transition-all duration-300 shadow-xl shadow-amber-500/70"
        >
          Get Book 1 Now
        </Link>
        <Link
          href="/shop"
          className="border border-white/40 hover:border-amber-400 px-10 py-4 rounded-xl text-lg transition-all duration-300"
        >
          View Series
        </Link>
      </div>
    </div>

  </div>
</section>

      {/* ABOUT THE SERIES */}
<section
  className="relative z-10 w-full h-screen py-20 md:py-63"
  style={{
    backgroundImage: `url("/images/Orange Background.jpg")`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  }}
>
  <div className="max-w-4xl mx-auto px-2">
    <h2 className="text-7xl font-display text-center mb-10">About the Series</h2>
    <div className="prose prose-lg prose-invert max-w-none text-gray-300 leading-relaxed space-y-6 text-[19px]">
      <p>
       In a world where darkness is not merely feared—but worshipped—power comes at a terrible cost.
The Lord of the Shadows series is a sweeping dark fantasy saga that follows the rise of a force destined to reshape the boundaries between life, death, and destiny itself. As ancient magic stirs and forbidden relics awaken, a shadowy figure emerges—one whose fate is entwined with prophecy, vengeance, and a power that threatens to consume everything.

      </p>
      <p>
       From the rise of a feared ruler, to a love that defies even death, to the discovery of deadly artifacts capable of destroying worlds, each installment deepens the descent into a realm where loyalty is fragile and survival demands sacrifice.
       
      </p>
      <p>Across kingdoms haunted by secrets and realms ruled by unseen forces, heroes and villains blur into one as battles are fought not only with steel and sorcery—but with the heart.
Dark, emotional, and relentlessly gripping, Lord of the Shadows is a tale of ambition, loss, and the haunting question
        <span className="text-amber-400 font-medium"> Can one control the darkness… or will it claim them forever?</span>,
      </p>
    </div>
  </div>
</section>

      {/* BOOKS SLIDER */}
      <section id="books" className="py-28 bg-[#0a0a0a] relative overflow-hidden">
        {/* Ambient glow behind active book */}
        <div
          className="absolute inset-0 pointer-events-none transition-all duration-1000"
          style={{
            background: `radial-gradient(ellipse 60% 50% at 50% 60%, rgba(34,179,8,0.08) 0%, transparent 90%)`,
          }}
        />

        <div className="max-w-7xl mx-auto px-6">
          <h2
  className="text-4xl md:text-8xl text-center mb-3 tracking-tight leading-tight"
  style={{ fontFamily: 'MedievalSharp' }}
>
  Discover the{" "}
  <em style={{ color: '#d47828', fontStyle: 'italic' }}>Complete</em>{" "}
  Journey
</h2>
<p className="text-center text-gray-400 mb-12 max-w-xl mx-auto text-sm md:text-base leading-relaxed tracking-wide">
  Dive into each volume of <span className="text-[#d47828] font-semibold ">Lord of the Shadows</span> where every book uncovers new mysteries, darker challenges, and unforgettable characters. 
  Scroll through and choose your next journey into the shadows.
</p>

          {/* Slider Stage */}
          <div
            className="relative flex items-center justify-center"
            style={{ height: '720px', perspective: '1400px', perspectiveOrigin: '50% 40%' }}
          >
            {seriesBooks.map((book, index) => {
              const isActive = index === currentBook
              const bookStyle = getBookStyle(index)

              return (
                <div
                  key={book.id}
                  className="absolute cursor-pointer"
                  style={{
                    ...bookStyle,
                    transition: 'all 0.65s cubic-bezier(0.34, 1.56, 0.64, 1)',
                    transformStyle: 'preserve-3d',
                  }}
                  onClick={() => goTo(index)}
                >
                  {/* Book wrapper with shadow */}
                  <div
                    className="relative"
                    style={{
                      width: isActive ? '300px' : '220px',
                      aspectRatio: '2/3',
                      transition: 'width 0.65s cubic-bezier(0.34, 1.56, 0.64, 1)',
                      boxShadow: isActive
                        ? '0 50px 100px -10px rgba(234,179,8,0.25), 0 30px 60px -20px rgba(0,0,0,0.9)'
                        : '0 20px 40px -10px rgba(0,0,0,0.7)',
                    }}
                  >
                    <Image
                      src={book.src}
                      alt={book.title}
                      fill
                      className="object-cover rounded-xl"
                      style={{
                        borderRadius: '12px',
                        border: isActive ? '1px solid rgba(234,179,8,0.3)' : '1px solid rgba(255,255,255,0.05)',
                      }}
                    />

                    {/* Shine overlay */}
                    {isActive && (
                      <div
                        className="absolute inset-0 rounded-xl pointer-events-none"
                        style={{
                          background: 'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 50%, rgba(0,0,0,0.2) 100%)',
                        }}
                      />
                    )}

                    {/* Side books — curved dark overlay */}
                    {!isActive && (
                      <div
                        className="absolute inset-0 rounded-xl pointer-events-none"
                        style={{
                          background: 'linear-gradient(to right, rgba(0,0,0,0.5) 0%, transparent 40%, rgba(0,0,0,0.5) 100%)',
                        }}
                      />
                    )}

                    {/* Active book bottom info */}
                    {isActive && (
                      <div
                        className="absolute bottom-0 left-0 right-0 p-6 rounded-b-xl"
                        style={{
                          background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.7) 60%, transparent 100%)',
                        }}
                      >
                        <p className="text-amber-400 text-xs font-semibold tracking-[3px] uppercase mb-1">{book.subtitle}</p>
                        <h3 className="text-white text-lg font-serif leading-snug mb-2">{book.title}</h3>
                        <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">{book.desc}</p>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}

            {/* Prev / Next arrows */}
            <button
              onClick={prev}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-40 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300"
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.12)',
                backdropFilter: 'blur(12px)',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(234,179,8,0.15)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.06)')}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              onClick={next}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-40 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300"
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.12)',
                backdropFilter: 'blur(12px)',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(234,179,8,0.15)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.06)')}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-3 mt-10">
            {seriesBooks.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goTo(idx)}
                className="transition-all duration-300"
                style={{
                  width: idx === currentBook ? '32px' : '10px',
                  height: '10px',
                  borderRadius: '9999px',
                  background: idx === currentBook ? '#f59e0b' : 'rgba(255,255,255,0.25)',
                }}
              />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}