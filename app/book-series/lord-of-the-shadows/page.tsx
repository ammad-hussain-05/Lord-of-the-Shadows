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
    title: "Lord of the Shadows",
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
  const [isMobile, setIsMobile] = useState(false)
  const autoRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const checkSize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkSize()
    window.addEventListener("resize", checkSize)

    return () => window.removeEventListener("resize", checkSize)
  }, [])

  const goTo = (idx: number) => {
    if (animating || idx === currentBook) return

    setAnimating(true)

    setTimeout(() => {
      setCurrentBook(idx)
      setAnimating(false)
    }, 280)
  }

  const next = () => goTo((currentBook + 1) % seriesBooks.length)
  const prev = () =>
    goTo((currentBook - 1 + seriesBooks.length) % seriesBooks.length)

  useEffect(() => {
    autoRef.current = setInterval(() => {
      setCurrentBook((prev) => (prev + 1) % seriesBooks.length)
    }, 5000)

    return () => {
      if (autoRef.current) clearInterval(autoRef.current)
    }
  }, [])

  const getBookStyle = (index: number) => {
    const total = seriesBooks.length
    const position = (index - currentBook + total) % total

    const isActive = position === 0
    const isRight = position === 1
    const isBack = position === 2
    const isLeft = position === total - 1

    if (isMobile) {
      if (isActive) {
        return {
          transform: "translateX(0px) translateZ(90px) rotateY(0deg) scale(1)",
          zIndex: 40,
          opacity: 1,
          filter: "brightness(1)",
          pointerEvents: "auto" as const,
        }
      }

      if (isLeft) {
        return {
          transform:
            "translateX(-118px) translateZ(-70px) rotateY(36deg) scale(0.62)",
          zIndex: 15,
          opacity: 0.55,
          filter: "brightness(0.55) saturate(0.7)",
          pointerEvents: "auto" as const,
        }
      }

      if (isRight) {
        return {
          transform:
            "translateX(118px) translateZ(-70px) rotateY(-36deg) scale(0.62)",
          zIndex: 15,
          opacity: 0.55,
          filter: "brightness(0.55) saturate(0.7)",
          pointerEvents: "auto" as const,
        }
      }

      if (isBack) {
        return {
          transform:
            "translateX(0px) translateY(28px) translateZ(-120px) scale(0.48)",
          zIndex: 5,
          opacity: 0.18,
          filter: "brightness(0.35) saturate(0.55)",
          pointerEvents: "none" as const,
        }
      }
    }

    if (isActive) {
      return {
        transform: "translateX(0px) translateZ(120px) rotateY(0deg) scale(1)",
        zIndex: 40,
        opacity: 1,
        filter: "brightness(1)",
        pointerEvents: "auto" as const,
      }
    }

    if (isLeft) {
      return {
        transform:
          "translateX(-340px) translateZ(-60px) rotateY(42deg) scale(0.72) skewY(-2deg)",
        zIndex: 15,
        opacity: 0.65,
        filter: "brightness(0.55) saturate(0.7)",
        pointerEvents: "auto" as const,
      }
    }

    if (isRight) {
      return {
        transform:
          "translateX(340px) translateZ(-60px) rotateY(-42deg) scale(0.72) skewY(2deg)",
        zIndex: 15,
        opacity: 0.65,
        filter: "brightness(0.55) saturate(0.7)",
        pointerEvents: "auto" as const,
      }
    }

    return {
      transform: "translateX(0px) translateZ(-140px) scale(0.5)",
      zIndex: 5,
      opacity: 0,
      filter: "brightness(0.35)",
      pointerEvents: "none" as const,
    }
  }

  return (
    <div className="min-h-screen w-full max-w-full overflow-hidden bg-[#0a0a0a] text-white">
      <Navigation />

      {/* HERO SECTION */}
<section className="relative z-10 flex min-h-[100svh] w-full max-w-full items-center overflow-hidden px-4 pt-32 pb-16 sm:px-6 md:pt-28 md:pb-20 lg:h-screen lg:px-8">
<div className="mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* 3D Floating Book */}
          <div className="relative flex justify-center lg:justify-start">
            <style>{`
              @keyframes floatBook {
                0% { transform: rotateY(18deg) rotateX(12deg) translateZ(10px) translateY(0px); }
                25% { transform: rotateY(22deg) rotateX(8deg) translateZ(50px) translateY(-14px); }
                50% { transform: rotateY(14deg) rotateX(15deg) translateZ(40px) translateY(-22px); }
                75% { transform: rotateY(20deg) rotateX(10deg) translateZ(45px) translateY(-10px); }
                100% { transform: rotateY(18deg) rotateX(12deg) translateZ(40px) translateY(0px); }
              }

              @keyframes glowPulse {
                0%, 100% {
                  box-shadow: 0 48px 90px -24px rgba(234, 179, 8, 0.28), -20px 0 60px -10px rgba(0,0,0,0.8);
                }
                50% {
                  box-shadow: 0 70px 110px -18px rgba(234, 179, 8, 0.5), -20px 0 80px -5px rgba(0,0,0,0.9);
                }
              }

              .book-float {
                animation: floatBook 4s ease-in-out infinite, glowPulse 4s ease-in-out infinite;
              }
            `}</style>

            <div className="relative" style={{ perspective: "700px" }}>
              <div
className="book-float relative aspect-[2/3] w-[220px] sm:w-[270px] md:w-[320px] lg:w-[340px] xl:w-[360px]"
                style={{ transformStyle: "preserve-3d" }}
              >
                <Image
                  src="/images/lord-shadow.jpg"
                  alt="Lord of the Shadows"
                  fill
                  className="rounded-2xl border border-amber-400/20 object-cover"
                  priority
                />

                <div
                  className="pointer-events-none absolute inset-0 rounded-2xl"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 50%, rgba(0,0,0,0.15) 100%)",
                  }}
                />

                <div
                  className="absolute bottom-0 left-0 top-0 w-5 rounded-l-2xl md:w-6"
                  style={{
                    background: "linear-gradient(to right, #000, #1a1a1a)",
                    transform: "rotateY(200deg) translateZ(-12px)",
                    transformOrigin: "left center",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="space-y-6 text-center lg:text-left">
            <p className="font-serif text-xs font-medium uppercase tracking-[0.28em] text-amber-400 md:text-sm">
              New Series
            </p>

            <h1 className="font-display text-4xl leading-[1.05] tracking-tighter sm:text-5xl md:text-6xl lg:text-6xl">
              Shadows Awaken
              <br />
              A Tale of Love and Vengeance
            </h1>

            <p className="mx-auto max-w-2xl text-sm leading-7 text-gray-300 sm:text-base md:text-lg md:leading-8 lg:mx-0">
              In the mist-laden town of Bethlehem, the vampire Michael Vondrake
              lives behind silver gates and centuries of regret. Once a warrior
              of shadows, now a guardian of humanity, he longs only for peace.
              But fate has other plans. When the wounded fairy Elain and the
              fierce warrior Angel enter his world, Michael’s quiet existence
              erupts into chaos. The Underworld stirs, ancient debts resurface,
              and the dark lord Dragvon rises, hungry for vengeance. As love and
              loyalty intertwine across light and shadow, Michael must confront
              his greatest adversary: his own haunted past.
            </p>

            <div className="flex flex-col justify-center gap-4 pt-4 sm:flex-row lg:justify-start">
              <Link
                href="https://www.amazon.com/LORD-SHADOWS-Cassie-Hebein-ebook/dp/B0G26X883R/ref=sr_1_1?cri[%E2%80%A6]s+by+cassie+hebein&qid=1774978868&sprefix=%2Caps%2C323&sr=8-1"
                target="_blank"
                className="inline-flex items-center justify-center rounded-xl bg-amber-600 px-8 py-4 text-base font-semibold text-white shadow-xl shadow-amber-500/30 transition-all duration-300 hover:bg-amber-500 sm:px-10 md:text-lg"
              >
                Get Book 1 Now
              </Link>

              <Link
                href="/shop"
                className="inline-flex items-center justify-center rounded-xl border border-white/30 px-8 py-4 text-base transition-all duration-300 hover:border-amber-400 hover:text-amber-300 sm:px-10 md:text-lg"
              >
                View Series
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT THE SERIES */}
     <section
  className="relative z-10 flex min-h-screen w-full max-w-full items-center overflow-hidden px-4 py-20 sm:px-6 md:px-8 md:py-28 lg:h-screen lg:py-24"

        style={{
          backgroundImage: `url("/images/Orange Background.jpg")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-black/55" />

        <div className="relative z-10 mx-auto max-w-4xl">
          <h2 className="mb-8 text-center font-display text-4xl leading-tight sm:text-5xl md:text-6xl lg:text-7xl">
            About the Series
          </h2>

          <div className="space-y-5 text-sm leading-7 text-gray-300 sm:text-base md:text-lg md:leading-8">
            <p>
              In a world where darkness is not merely feared—but
              worshipped—power comes at a terrible cost. The Lord of the Shadows
              series is a sweeping dark fantasy saga that follows the rise of a
              force destined to reshape the boundaries between life, death, and
              destiny itself. As ancient magic stirs and forbidden relics
              awaken, a shadowy figure emerges—one whose fate is entwined with
              prophecy, vengeance, and a power that threatens to consume
              everything.
            </p>

            <p>
              From the rise of a feared ruler, to a love that defies even death,
              to the discovery of deadly artifacts capable of destroying worlds,
              each installment deepens the descent into a realm where loyalty is
              fragile and survival demands sacrifice.
            </p>

            <p>
              Across kingdoms haunted by secrets and realms ruled by unseen
              forces, heroes and villains blur into one as battles are fought
              not only with steel and sorcery—but with the heart. Dark,
              emotional, and relentlessly gripping, Lord of the Shadows is a
              tale of ambition, loss, and the haunting question{" "}
              <span className="font-medium text-amber-400">
                can one control the darkness… or will it claim them forever?
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* BOOKS SLIDER */}
      <section
        id="books"
        className="relative w-full max-w-full overflow-hidden bg-[#0a0a0a] px-4 py-20 sm:px-6 md:px-8 md:py-28"
      >
        <div
          className="pointer-events-none absolute inset-0 transition-all duration-1000"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 60%, rgba(212,120,40,0.12) 0%, transparent 80%)",
          }}
        />

        <div className="relative z-10 mx-auto max-w-7xl">
          <h2
            className="text-center text-4xl leading-tight tracking-tight sm:text-5xl md:text-7xl lg:text-8xl"
            style={{ fontFamily: "MedievalSharp" }}
          >
            Discover the{" "}
            <em className="text-[#d47828]" style={{ fontStyle: "italic" }}>
              Complete
            </em>{" "}
            Journey
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-center text-sm leading-7 tracking-wide text-gray-400 md:text-base">
            Dive into each volume of{" "}
            <span className="font-semibold text-[#d47828]">
              Lord of the Shadows
            </span>{" "}
            where every book uncovers new mysteries, darker challenges, and
            unforgettable characters. Scroll through and choose your next
            journey into the shadows.
          </p>

          {/* Slider Stage */}
          <div
            className="relative mt-10 flex items-center justify-center overflow-hidden md:mt-14 md:overflow-visible"
            style={{
              height: isMobile ? "500px" : "720px",
              perspective: "1400px",
              perspectiveOrigin: "50% 40%",
            }}
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
                    transition: "all 0.65s cubic-bezier(0.34, 1.56, 0.64, 1)",
                    transformStyle: "preserve-3d",
                  }}
                  onClick={() => goTo(index)}
                >
                  <div
                    className="relative"
                    style={{
                      width: isMobile
                        ? isActive
                          ? "210px"
                          : "150px"
                        : isActive
                        ? "300px"
                        : "220px",
                      aspectRatio: "2/3",
                      transition:
                        "width 0.65s cubic-bezier(0.34, 1.56, 0.64, 1)",
                      boxShadow: isActive
                        ? "0 50px 100px -10px rgba(212,120,40,0.28), 0 30px 60px -20px rgba(0,0,0,0.9)"
                        : "0 20px 40px -10px rgba(0,0,0,0.7)",
                    }}
                  >
                    <Image
                      src={book.src}
                      alt={book.title}
                      fill
                      className="rounded-xl object-cover"
                      sizes={
                        isMobile
                          ? isActive
                            ? "210px"
                            : "150px"
                          : isActive
                          ? "300px"
                          : "220px"
                      }
                      style={{
                        borderRadius: "12px",
                        border: isActive
                          ? "1px solid rgba(212,120,40,0.45)"
                          : "1px solid rgba(255,255,255,0.05)",
                      }}
                    />

                    {isActive && (
                      <div
                        className="pointer-events-none absolute inset-0 rounded-xl"
                        style={{
                          background:
                            "linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 50%, rgba(0,0,0,0.2) 100%)",
                        }}
                      />
                    )}

                    {!isActive && (
                      <div
                        className="pointer-events-none absolute inset-0 rounded-xl"
                        style={{
                          background:
                            "linear-gradient(to right, rgba(0,0,0,0.5) 0%, transparent 40%, rgba(0,0,0,0.5) 100%)",
                        }}
                      />
                    )}

                    {isActive && (
                      <div
                        className="absolute bottom-0 left-0 right-0 rounded-b-xl p-4 md:p-6"
                        style={{
                          background:
                            "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.7) 60%, transparent 100%)",
                        }}
                      >
                        <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-amber-400 md:text-xs">
                          {book.subtitle}
                        </p>

                        <h3 className="font-serif text-base leading-snug text-white md:text-lg">
                          {book.title}
                        </h3>

                        <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-gray-400 md:line-clamp-3 md:text-sm">
                          {book.desc}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}

            {/* Prev / Next arrows */}
            <button
              onClick={prev}
              className="absolute left-1 top-1/2 z-40 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] backdrop-blur-xl transition-all duration-300 hover:border-amber-400/60 hover:bg-amber-400/15 sm:left-4 md:left-8 md:h-12 md:w-12"
              aria-label="Previous book"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            <button
              onClick={next}
              className="absolute right-1 top-1/2 z-40 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] backdrop-blur-xl transition-all duration-300 hover:border-amber-400/60 hover:bg-amber-400/15 sm:right-4 md:right-8 md:h-12 md:w-12"
              aria-label="Next book"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>

          {/* Dots */}
          <div className="mt-8 flex justify-center gap-3 md:mt-10">
            {seriesBooks.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goTo(idx)}
                className="transition-all duration-300"
                style={{
                  width: idx === currentBook ? "32px" : "10px",
                  height: "10px",
                  borderRadius: "9999px",
                  background:
                    idx === currentBook ? "#d47828" : "rgba(255,255,255,0.25)",
                }}
                aria-label={`Go to book ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}