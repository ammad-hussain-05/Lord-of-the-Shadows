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
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id="about" ref={sectionRef} className="relative  w-full h-screen py-20 md:py-19">
      {/* Background */}
      <div className="absolute inset-0"
      style={{
      backgroundImage: `url("/images/orange Background.jpg")`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      zIndex: 0,
    }}
     />
      
      {/* Decorative line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-32 bg-gradient-to-b from-transparent via-border to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Author Photo */}
          <div
            className={`relative transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
            }`}
          >
            <div className="relative aspect-[4/5] max-w-md mx-auto lg:mx-0">
              {/* Glow effect */}
              <div className="absolute -inset-4 bg-gradient-to-br from-accent/20 via-transparent to-primary/20 rounded-lg blur-2xl opacity-60" />
              
              {/* Frame decoration */}
              <div className="absolute -inset-2 border border-border/30 rounded-lg" />
              <div className="absolute -inset-4  rounded-lg" />
              
              {/* Photo container */}
              <div className="relative w-full h-full bg-card rounded-lg overflow-hidden">
                <Image
                  src="/images/author.jpg"
                  alt="Author portrait"
                  fill
                  className="object-cover"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
              </div>

              {/* Floating quote decoration */}
              <div className="absolute -bottom-6 -right-6 p-4 bg-card border border-border rounded-lg shadow-xl">
                <svg className="w-8 h-8 text-primary" fill="accent" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Bio Content */}
          <div
            className={`transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
            }`}
          >
            <p className="text-gold font-serif text-sm tracking-widest uppercase mb-2">
              Meet the Author
            </p>
            
            {/* <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground mb-6 text-balance">
              Weaving Worlds from Shadows
            </h2> */}

             <h2 className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-foreground mb-3 leading-tight text-balance">
        Lord of the<span className="block text-gold">Shadows</span>
      </h2>
            
            <div className="space-y-4 text-accent-foreground leading-relaxed mb-8">
              <p>
This is the story of Cassie and Michelle a creative aunt-niece duo behind The Load of the Shadows.
              </p>
              <p>
Cassie, a stay at home mom, loves art, anime, gaming, and caring for animals. Writing has always been her passion, shaped by a vivid imagination and family inspiration. Michelle began working at 15, gaining experience in retail, nursing, and prison kitchens. Though she loved helping others, something always felt missing until Cassie shared a story that reignited her creative spark.

              </p>
              <p>
              Together, they blended their talents and vision to craft a world of darkness, magic, and resilience a world that reflects not only their creativity, but the deep bond and storytelling spirit they share.

              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/contacts"
                className="inline-flex items-center px-6 py-3 bg-gold text-primary-foreground font-medium rounded-md hover:bg-gold-light transition-colors"
              >
                Get in Touch
              </Link>
              <Link
                href="/newsletter"
                className="inline-flex items-center px-6 py-3 border border-border text-foreground font-medium rounded-md hover:border-gold hover:text-gold transition-colors"
              >
                Writing Advice
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-12 pt-3 border-t border-border/50 grid grid-cols-3 gap-8">
              <div>
                <p className="font-display text-3xl md:text-4xl text-gold">23</p>
                <p className="text-sm text-muted-foreground">Books Published</p>
              </div>
              <div>
                <p className="font-display text-3xl md:text-4xl text-gold">5M+</p>
                <p className="text-sm text-muted-foreground">Copies Sold</p>
              </div>
              <div>
                <p className="font-display text-3xl md:text-4xl text-gold">6</p>
                <p className="text-sm text-muted-foreground">Epic Series</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
