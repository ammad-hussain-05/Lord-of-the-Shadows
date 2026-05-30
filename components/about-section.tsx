"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"

export function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.15 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full max-w-full overflow-hidden px-4 py-20 sm:px-6 md:px-8 md:py-28 lg:py-32"
    >
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url("/images/orange Background.jpg")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          zIndex: 0,
        }}
      />

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 z-[1] bg-black/65" />

      {/* Decorative line */}
      <div className="absolute left-1/2 top-0 z-[2] h-24 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-border to-transparent md:h-32" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Author Photo */}
          <div
            className={`relative transition-all duration-1000 ${
              isVisible
                ? "translate-x-0 opacity-100"
                : "-translate-x-8 opacity-0"
            }`}
          >
            <div className="relative mx-auto aspect-[4/5] w-full max-w-[300px] sm:max-w-[360px] md:max-w-md lg:mx-0">
              {/* Glow effect */}
              <div className="absolute -inset-4 rounded-lg bg-gradient-to-br from-accent/20 via-transparent to-primary/20 opacity-60 blur-2xl" />

              {/* Frame decoration */}
              <div className="absolute -inset-2 rounded-lg border border-border/30" />

              {/* Photo container */}
              <div className="relative h-full w-full overflow-hidden rounded-lg bg-card">
                <Image
                  src="/images/author.jpg"
                  alt="Author portrait"
                  fill
                  className="object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
              </div>

              {/* Floating quote decoration */}
              <div className="absolute -bottom-5 -right-3 rounded-lg border border-border bg-card p-3 shadow-xl sm:-right-6 sm:p-4">
                <svg
                  className="h-7 w-7 text-primary sm:h-8 sm:w-8"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Bio Content */}
          <div
            className={`relative transition-all delay-300 duration-1000 ${
              isVisible
                ? "translate-x-0 opacity-100"
                : "translate-x-8 opacity-0"
            }`}
          >
            <p className="mb-3 font-serif text-xs uppercase tracking-[0.22em] text-gold sm:text-sm">
              Meet the Author
            </p>

            <h2 className="mb-5 font-display text-4xl leading-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
              Lord of the
              <span className="block text-gold">Shadows</span>
            </h2>

            <div className="mb-8 space-y-4 text-sm leading-7 text-white/75 sm:text-base md:text-lg md:leading-8">
              <p>
                This is the story of Cassie and Michelle, a creative aunt-niece
                duo behind The Lord of the Shadows.
              </p>

              <p>
                Cassie, a stay-at-home mom, loves art, anime, gaming, and
                caring for animals. Writing has always been her passion, shaped
                by a vivid imagination and family inspiration. Michelle began
                working at 15, gaining experience in retail, nursing, and prison
                kitchens. Though she loved helping others, something always felt
                missing until Cassie shared a story that reignited her creative
                spark.
              </p>

              <p>
                Together, they blended their talents and vision to craft a world
                of darkness, magic, and resilience — a world that reflects not
                only their creativity, but the deep bond and storytelling spirit
                they share.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap">
              <Link
                href="/contacts"
                className="inline-flex items-center justify-center rounded-md bg-gold px-6 py-3 font-medium text-primary-foreground transition-colors hover:bg-gold-light"
              >
                Get in Touch
              </Link>

              <Link
                href="/newsletter"
                className="inline-flex items-center justify-center rounded-md border border-border px-6 py-3 font-medium text-foreground transition-colors hover:border-gold hover:text-gold"
              >
                Writing Advice
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-10 grid grid-cols-1 gap-5 border-t border-border/50 pt-6 sm:grid-cols-3 md:mt-12">
              <div className="rounded-2xl border border-white/10 bg-black/25 p-4 text-center backdrop-blur-md sm:text-left">
                <p className="font-display text-3xl text-gold md:text-4xl">
                  23
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Books Published
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/25 p-4 text-center backdrop-blur-md sm:text-left">
                <p className="font-display text-3xl text-gold md:text-4xl">
                  5M+
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Copies Sold
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/25 p-4 text-center backdrop-blur-md sm:text-left">
                <p className="font-display text-3xl text-gold md:text-4xl">
                  6
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Epic Series
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}