"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

// ── Types & Data ───────────────────────────────────────────────────────────────
interface Series {
  id: string
  title: string
  status: "Complete" | "Ongoing"
  books: number
  desc: string
}

interface Book {
  title: string
  cover: string
}

const SERIES_DATA: Series[] = [
  { id: "shadows",  title: "Lord of the Shadows",   status: "Complete", books: 4, desc: "A dark empire of forbidden love and ancient curses." },
  { id: "midnight", title: "Whispers of Midnight",  status: "Ongoing",  books: 3, desc: "Secrets echo through moonlit corridors of desire." },
  { id: "crimson",  title: "Crimson Hearts",         status: "Ongoing",  books: 2, desc: "Passion bleeds into power in a fractured kingdom." },
  { id: "echoes",   title: "Echoes of Desire",       status: "Ongoing",  books: 4, desc: "What was lost returns, but at what cost?" },
  { id: "veil",     title: "Veil of Temptation",     status: "Ongoing",  books: 2, desc: "Behind every mask lies a truth too dangerous to face." },
]

const BOOKS_DATA: Record<string, Book[]> = {
  shadows:  [
    { title: "Book I: Lord of Shadows",  cover: "/images/front.jpg" },
    { title: "Book II: The Descent",   cover: "/images/lord-shadow.jpg" },
    { title: "Book III: Rising of the Lord",cover: "/images/cassie-book.jpg" },
    { title: "Book IV: Love that outlived Death",     cover: "/images/eBook-2.jpg" },
  ],
  midnight: [
    { title: "Book I: Moonlit Whispers", cover: "/shop-images/01_Moonlit_Whispers.png" },
    { title: "Book II: Shadows Dance",   cover: "/shop-images/02_Shadows_Dance.png" },
    { title: "Book III: The Silent Hour",cover: "/shop-images/03_The_Silent_Hour.png" },
  ],
  crimson:  [
    { title: "Book I: Blood & Roses",   cover: "/shop-images/04_Blood_and_Roses.png" },
    { title: "Book II: The Scarlet Pact",cover: "/shop-images/05_The_Scarlet_Pact.png" },
  ],
  echoes:   [
    { title: "Book I: Fading Memories", cover: "/shop-images/06_Fading_Memories.png" },
    { title: "Book II: The Return",     cover: "/shop-images/07_The_Return.png" },
    { title: "Book III: Broken Vows",   cover: "/shop-images/08_Broken_Vows.png" },
    { title: "Book IV: Eternal Echoes", cover: "/shop-images/09_Eternel_Echoes.png" },
  ],
  veil:     [
    { title: "Book I: The Masquerade",  cover: "/shop-images/10_The_Mosquerodo.png" },
    { title: "Book II: The Loves Art",  cover: "/shop-images/11_The_Loves_Art.png" },
  ],
}

// ══════════════════════════════════════════════════════════════════════════════
// THREE.JS — ETHEREAL EMBERS & DUST (Book/Magic Atmosphere)
// ══════════════════════════════════════════════════════════════════════════════

const PARTICLE_COUNT = 3500

function EmberField({ mouse }: { mouse: React.MutableRefObject<[number, number]> }) {
  const pointsRef = useRef<THREE.Points>(null!)
  const { size } = useThree()

  const [geometry, material] = useCallback(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3)
    const colors    = new Float32Array(PARTICLE_COUNT * 3)
    const sizes     = new Float32Array(PARTICLE_COUNT)
    const speeds    = new Float32Array(PARTICLE_COUNT)
    const offsets   = new Float32Array(PARTICLE_COUNT)

    const gold  = new THREE.Color("#d47828")
    const amber = new THREE.Color("#f5a623")
    const dim   = new THREE.Color("#8b4513")
    const white = new THREE.Color("#ffffff")

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // Volumetric spread (library/dust feel)
      const x = (Math.random() - 0.5) * 32
      const y = Math.random() * 24 - 4
      const z = (Math.random() - 0.5) * 20 - 6

      positions[i * 3]     = x
      positions[i * 3 + 1] = y
      positions[i * 3 + 2] = z

      // Color mix: warm embers, soft dust, rare sparks
      const t = Math.random()
      const c = t < 0.60 ? gold.clone().lerp(dim, Math.random() * 0.5)
               : t < 0.85 ? amber.clone().lerp(white, Math.random() * 0.4)
               : white.clone().lerp(gold, Math.random() * 0.3)
      colors[i * 3]     = c.r
      colors[i * 3 + 1] = c.g
      colors[i * 3 + 2] = c.b

      sizes[i]   = Math.random() * 3.2 + 0.4
      speeds[i]  = Math.random() * 0.35 + 0.05
      offsets[i] = Math.random() * Math.PI * 2
    }

    const geo = new THREE.BufferGeometry()
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3))
    geo.setAttribute("color",    new THREE.BufferAttribute(colors, 3))
    geo.userData = { speeds, offsets }

    const mat = new THREE.PointsMaterial({
      size: 0.1,
      vertexColors: true,
      transparent: true,
      opacity: 0.32,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
      depthWrite: true,
    })

    return [geo, mat] as const
  }, [])()

  useFrame(({ clock }) => {
    if (!pointsRef.current) return
    const t   = clock.elapsedTime
    const pos = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute
    const arr = pos.array as Float32Array
    const { speeds, offsets } = pointsRef.current.geometry.userData as {
      speeds: Float32Array; offsets: Float32Array
    }

    // Gentle upward drift + subtle swirl (like floating dust/embers)
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      arr[i * 3 + 1] += Math.sin(t * speeds[i] + offsets[i]) * 0.009
      arr[i * 3]     += Math.cos(t * speeds[i] * 0.4 + offsets[i]) * 0.00
      
      // Wrap around if out of bounds
      if (arr[i * 3 + 1] > 12) arr[i * 3 + 1] = -4
      if (arr[i * 3 + 1] < -4) arr[i * 3 + 1] = 12
    }
    pos.needsUpdate = true

    // Mouse parallax
    const [mx, my] = mouse.current
    pointsRef.current.rotation.y = t * 0.012 + mx * 0.15
    pointsRef.current.rotation.x = my * 0.08
  })

  return <points ref={pointsRef} geometry={geometry} material={material} />
}

function CameraRig({ mouse }: { mouse: React.MutableRefObject<[number, number]> }) {
  const { camera } = useThree()
  useFrame(() => {
    const [mx, my] = mouse.current
    camera.position.x += (mx * 1.0 - camera.position.x) * 0.04
    camera.position.y += (-my * 0.7 - camera.position.y) * 0.04
    camera.lookAt(0, 0, 0)
  })
  return null
}

function Scene({ mouse }: { mouse: React.MutableRefObject<[number, number]> }) {
  return (
    <>
      <ambientLight intensity={0.03} />
      <pointLight position={[0, 5, 2]} color="#d47828" intensity={0.5} distance={22} />
      <pointLight position={[-6, -2, 0]} color="#f5a623" intensity={0.3} distance={18} />
      <EmberField mouse={mouse} />
      <CameraRig mouse={mouse} />
    </>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ══════════════════════════════════════════════════════════════════════════════
export default function DarkFictionBookstore() {
  const [activeSeries, setActiveSeries]   = useState<string | null>(null)
  const [isRevealed,   setIsRevealed]     = useState(false)
  const [activeSlide,  setActiveSlide]    = useState(0)
  const sectionRef    = useRef<HTMLDivElement>(null)
  const heroRef       = useRef<HTMLDivElement>(null)
  const booksSectionRef = useRef<HTMLDivElement>(null)
  const mouseRef      = useRef<[number, number]>([0, 0])

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseRef.current = [
        (e.clientX / window.innerWidth)  * 2 - 1,
        (e.clientY / window.innerHeight) * 2 - 1,
      ]
    }
    window.addEventListener("mousemove", onMove)
    return () => window.removeEventListener("mousemove", onMove)
  }, [])

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setIsRevealed(true) },
      { threshold: 0.15 }
    )
    if (sectionRef.current) obs.observe(sectionRef.current)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    const hero = heroRef.current
    if (!hero) return
    let tX = 0, tY = 0, cX = 0, cY = 0, raf: number
    const onMove = (e: MouseEvent) => {
      const r = hero.getBoundingClientRect()
      tX = (e.clientX - r.left) - r.width / 2
      tY = (e.clientY - r.top) - r.height / 2
    }
    const tick = () => {
      cX += (tX - cX) * 0.12
      cY += (tY - cY) * 0.12
      hero.style.transform = `translate(${cX * 0.006}px, ${cY * 0.004}px)`
      raf = requestAnimationFrame(tick)
    }
    hero.addEventListener("mousemove", onMove)
    tick()
    return () => { hero.removeEventListener("mousemove", onMove); cancelAnimationFrame(raf) }
  }, [])

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el   = e.currentTarget
    const rect = el.getBoundingClientRect()
    const rotX = ((e.clientY - rect.top  - rect.height / 2) / (rect.height / 2)) * -6
    const rotY = ((e.clientX - rect.left - rect.width  / 2) / (rect.width  / 2)) *  6
    el.style.transform = `perspective(1200px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.01)`
  }, [])
  const handleMouseLeave = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = "perspective(1200px) rotateX(0) rotateY(0) scale(1)"
  }, [])

  const openSeries = (id: string) => {
    setActiveSeries(id); setActiveSlide(0)
    setTimeout(() => booksSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 150)
  }
  const closeSeries = () => {
    setActiveSeries(null)
    setTimeout(() => sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 150)
  }

  const isTouchDevice = typeof window !== "undefined" && ("ontouchstart" in window || navigator.maxTouchPoints > 0)
  const marqueeSeries = [...SERIES_DATA, ...SERIES_DATA, ...SERIES_DATA]
  const activeBooks = activeSeries ? BOOKS_DATA[activeSeries] ?? [] : []
  const prevSlide = () => setActiveSlide(p => (p - 1 + activeBooks.length) % activeBooks.length)
  const nextSlide = () => setActiveSlide(p => (p + 1) % activeBooks.length)

  return (
    <div ref={sectionRef} className="relative min-h-screen bg-[#000000] text-white overflow-x-hidden">
      <Navigation />

      {/* ══ WEBGL BACKGROUND ══ */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 14], fov: 60 }} gl={{ antialias: true, alpha: true }}>
          <Scene mouse={mouseRef} />
        </Canvas>
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 85% 80% at 50% 45%, transparent 15%, rgba(0,0,0,0.65) 65%, #000 100%)" }} />
        <div className="absolute bottom-0 left-0 right-0 h-56" style={{ background: "linear-gradient(to bottom, transparent, #000 90%)" }} />
      </div>

      {/* ══ HERO ══ */}
      <div ref={heroRef} className="relative z-10 flex flex-col items-center justify-center min-h-[75vh] px-6 text-center transition-opacity duration-1000">
        <p className="text-[#d47828] text-xs md:text-sm tracking-[0.4em] uppercase font-semibold mb-5 opacity-80">
          The Story Collection
        </p>
        <h1 className="text-4xl font-display md:text-6xl lg:text-8xl font-bold leading-[0.95] mb-6 tracking-tight">
  Step Into a World of <br />
  <span className="text-[#d47828] italic  lg:text-9xl ">Shadows & Obsession</span>
</h1>

<p className="text-gray-400 max-w-xl text-sm md:text-base mb-12 leading-relaxed">
  A curated shop of dark romantic series where every story is designed to captivate, seduce, and stay with you far beyond the final page.
</p>
        <div className="flex flex-col sm:flex-row gap-5">
          <Link href="#series" className="px-9 py-4 bg-[#d47828] text-black font-semibold rounded-full hover:shadow-[0_0_35px_rgba(212,120,40,0.6)] transition-all duration-300 hover:-translate-y-1">
            Explore Collections
          </Link>
          <Link href="#latest" className="px-9 py-4 border border-white/20 text-white font-medium rounded-full hover:border-[#d47828] hover:text-[#d47828] transition-all duration-300 hover:-translate-y-1">
            Latest Releases
          </Link>
        </div>
      </div>

      {/* ══ MARQUEE SERIES ══ */}
      <section id="series" className={`relative z-10 py-24 transition-all duration-700 ${isRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
      <h2 className="font-display text-3xl md:text-8xl text-center mb-16 tracking-tight">
  Explore the <span className="text-[#d47828] italic">Story Realms</span>
</h2>
        <div className="marquee-wrapper">
          <div className="marquee-track">
            {marqueeSeries.map((series, idx) => (
              <div
                key={`${series.id}-${idx}`}
                onClick={() => openSeries(series.id)}
                onMouseMove={!isTouchDevice ? handleMouseMove : undefined}
                onMouseLeave={!isTouchDevice ? handleMouseLeave : undefined}
                className="marquee-card"
              >
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-5">
                    <span className={`px-4 py-1.5 text-xs font-bold rounded-full border backdrop-blur-md ${
                      series.status === "Complete"
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                        : "bg-[#d47828]/15 text-[#d47828] border-[#d47828]/40"
                    }`}>
                      {series.status} • {series.books} Books
                    </span>
                    <svg className="w-5 h-5 text-[#d47828]/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                  <h3 className="font-serif text-2xl md:text-3xl font-bold mb-3 text-white leading-tight">{series.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{series.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ BOOK SHOWCASE — CINEMATIC SLIDER ══ */}
      <section
        ref={booksSectionRef}
        className={`relative z-10 py-24 px-4 md:px-8 transition-all duration-500 ${
          activeSeries ? "opacity-100 translate-y-0" : "opacity-0 pointer-events-none absolute inset-0"
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <button onClick={closeSeries} className="flex items-center gap-2 text-gray-400 hover:text-[#d47828] transition-colors mb-10 text-sm font-medium group">
            <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Series
          </button>

          <h2 className="font-display text-3xl md:text-5xl text-center mb-16 tracking-tight">
            <span className="text-[#d47828] italic">
              {activeSeries ? SERIES_DATA.find(s => s.id === activeSeries)?.title : ""}
            </span>{" "}Collection
          </h2>

          {activeSeries && activeBooks.length > 0 && (
            <div className="relative flex items-center justify-center gap-0 min-h-[620px]">
              <button onClick={prevSlide} className="slider-arrow left-arrow" aria-label="Previous">
                <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <div className="slider-stage">
                {activeBooks.map((book, idx) => {
                  const total  = activeBooks.length
                  const offset = ((idx - activeSlide) % total + total) % total
                  const isCenter = offset === 0
                  const isRight  = offset === 1
                  const isLeft   = offset === total - 1
                  const isVisible = isCenter || isRight || isLeft

                  let tx = "0px", scale = "0.72", zIdx = 0, opacity = "0", blur = "4px"
                  if (isCenter) { tx = "0px";    scale = "1";    zIdx = 30; opacity = "1";   blur = "0px" }
                  if (isRight)  { tx = "58%";    scale = "0.78"; zIdx = 20; opacity = "0.65"; blur = "2px" }
                  if (isLeft)   { tx = "-58%";   scale = "0.78"; zIdx = 20; opacity = "0.65"; blur = "2px" }

                  return (
                    <div
                      key={idx}
                      onClick={() => !isCenter && setActiveSlide(idx)}
                      style={{
                        transform: `translateX(${tx}) scale(${scale})`,
                        zIndex: zIdx,
                        opacity,
                        filter: `blur(${blur})`,
                        display: isVisible ? "block" : "none",
                        transition: "all 0.55s cubic-bezier(0.25,0.46,0.45,0.94)",
                        cursor: isCenter ? "default" : "pointer",
                      }}
                      className="slider-card"
                    >
                      <div className="relative w-full" style={{ aspectRatio: "2/3.2" }}>
                        <Image src={book.cover} alt={book.title} fill className="object-cover" sizes="(max-width: 768px) 90vw, 420px" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent" />
                        <div className="absolute top-4 right-4 w-9 h-9 rounded-full border border-[#d47828]/60 bg-black/60 flex items-center justify-center">
                          <span className="text-[#d47828] text-xs font-bold">{idx + 1}</span>
                        </div>
                      </div>
                      <div className="slider-info" style={{ opacity: isCenter ? 1 : 0, transition: "opacity 0.4s ease 0.15s" }}>
                        <h4 className="font-display text-xl md:text-2xl font-bold mb-5 text-white leading-snug">{book.title}</h4>
                        <div className="flex gap-3">
                          <button className="flex-1 py-3 bg-[#d47828] text-black text-xs font-bold rounded-xl hover:shadow-[0_0_24px_rgba(212,120,40,0.5)] transition-all hover:-translate-y-0.5">Read Now</button>
                          <button className="flex-1 py-3 border border-white/20 text-white text-xs font-medium rounded-xl hover:border-[#d47828] hover:text-[#d47828] transition-all hover:-translate-y-0.5">Buy</button>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              <button onClick={nextSlide} className="slider-arrow right-arrow" aria-label="Next">
                <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}

          {activeSeries && (
            <div className="flex justify-center gap-2.5 mt-10">
              {activeBooks.map((_, i) => (
                <button key={i} onClick={() => setActiveSlide(i)} className="transition-all duration-300" style={{
                  width: i === activeSlide ? "28px" : "8px", height: "8px", borderRadius: "4px",
                  background: i === activeSlide ? "#d47828" : "rgba(212,120,40,0.25)", border: "none", cursor: "pointer"
                }} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ══ FOOTER SPACER & FOOTER ══ */}
      <div className="relative z-10 mt-24 pt-16 pb-8 bg-gradient-to-t from-black via-black/95 to-transparent">
        <Footer />
      </div>

      {/* ══ GLOBAL STYLES ══ */}
      <style jsx global>{`
        @keyframes scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-33.333%); } }
        .marquee-wrapper { overflow: hidden; mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent); -webkit-mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent); }
        .marquee-track { display: flex; gap: 2rem; animation: scroll 50s linear infinite; width: max-content; }
        .marquee-track:hover { animation-play-state: paused; }
        .marquee-card { flex: 0 0 400px; background: rgba(255,255,255,0.03); backdrop-filter: blur(20px); border: 1px solid rgba(212,120,40,0.12); border-radius: 28px; padding: 2.2rem; cursor: pointer; transition: all 0.45s cubic-bezier(0.25,0.46,0.45,0.94); position: relative; overflow: hidden; }
        .marquee-card::before { content: ''; position: absolute; inset: 0; background: radial-gradient(circle at top right, rgba(212,120,40,0.18), transparent 65%); opacity: 0; transition: opacity 0.4s ease; }
        .marquee-card:hover { transform: translateY(-10px) scale(1.02); border-color: rgba(212,120,40,0.6); box-shadow: 0 25px 60px rgba(0,0,0,0.6), 0 0 40px rgba(212,120,40,0.25); }
        .marquee-card:hover::before { opacity: 1; }

        .slider-stage { position: relative; width: min(420px, 85vw); height: 580px; display: flex; align-items: flex-start; justify-content: center; }
        .slider-card { position: absolute; width: 100%; background: rgba(10,6,0,0.88); border: 1px solid rgba(212,120,40,0.18); border-radius: 20px; overflow: hidden; box-shadow: 0 40px 100px rgba(0,0,0,0.9), 0 0 0 1px rgba(212,120,40,0.08); top: 0; left: 50%; transform-origin: top center; margin-left: calc(-50%); }
        .slider-info { padding: 1.6rem 1.8rem 1.8rem; background: linear-gradient(to bottom, rgba(10,6,0,0.92), #000); }

        .slider-arrow { position: relative; z-index: 40; flex-shrink: 0; width: 48px; height: 48px; border-radius: 50%; border: 1px solid rgba(212,120,40,0.3); background: rgba(0,0,0,0.6); color: #d47828; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.3s ease; backdrop-filter: blur(8px); }
        .slider-arrow:hover { border-color: #d47828; background: rgba(212,120,40,0.12); box-shadow: 0 0 20px rgba(212,120,40,0.3); }
        .left-arrow  { margin-right: calc(min(420px,85vw) * 0.62 + 16px); }
        .right-arrow { margin-left:  calc(min(420px,85vw) * 0.62 + 16px); }

        @media (max-width: 600px) {
          .marquee-card { flex: 0 0 300px; }
          .slider-stage { height: 520px; }
          .left-arrow  { margin-right: calc(min(420px,85vw) * 0.55 + 10px); }
          .right-arrow { margin-left:  calc(min(420px,85vw) * 0.55 + 10px); }
        }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  )
}