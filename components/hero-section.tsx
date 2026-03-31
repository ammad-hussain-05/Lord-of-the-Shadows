"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"

export function HeroSection() {
  const sceneRef = useRef<HTMLDivElement>(null)
  const layerRefs = useRef<HTMLImageElement[]>([])

  // ── Parallax (Same rakha hai) ─────────────────────────────────
  useEffect(() => {
    const scene = sceneRef.current
    if (!scene) return
    let tX = 0, tY = 0, cX = 0, cY = 0, raf: number

    const onMove = (e: MouseEvent) => {
      const r = scene.getBoundingClientRect()
      tX = (e.clientX - r.left) - r.width / 2
      tY = (e.clientY - r.top) - r.height / 2
    }

    const tick = () => {
      cX += (tX - cX) * 0.20
      cY += (tY - cY) * 0.20

      layerRefs.current.forEach((el, i) => {
        if (!el) return
        const depth = [0.006, 0.018, 0.032, 0.015, 0.055][i] || 0.02
        el.style.transform = `translate(${cX * depth}px, ${cY * depth * 0.6}px)`
      })

      raf = requestAnimationFrame(tick)
    }

    scene.addEventListener('mousemove', onMove)
    tick()
    return () => {
      scene.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      {/* ==================== EXTENDED HERO SECTION (Ab 2 sections cover karega) ==================== */}
      <section
        ref={sceneRef}
        className="relative w-full overflow-hidden"
        style={{
          height: '180vh',           // ← Yeh badhaya hai (2 sections cover karega)
          minHeight: '1200px',
          background: '#0a0400',
        }}
      >
        {/* 5 Layers Merged */}
        <div className="absolute inset-0">

          {/* Layer 1 - Deep Background */}
          <Image
            ref={el => { layerRefs.current[0] = el! }}
            src="/images/Hero Banner 1.png"
            alt=""
            fill
            priority
            className="absolute inset-0 object-cover"
            style={{ zIndex: 1 }}
          />

          {/* Layer 2 */}
          <Image
            ref={el => { layerRefs.current[1] = el! }}
            src="/images/Hero Banner 2.png"
            alt=""
            fill
            className="absolute inset-0 object-cover"
            style={{ zIndex: 11 }}
          />

          {/* Layer 3 - Focal (Strongest Parallax) */}
          <Image
            ref={el => { layerRefs.current[2] = el! }}
            src="/images/Hero Banner 3.png"
            alt=""
            fill
            className="absolute inset-0 object-cover"
            style={{ zIndex: 11 }}
          />

          {/* Layer 4 */}
          <Image
            ref={el => { layerRefs.current[3] = el! }}
            src="/images/Hero Banner 4.png"
            alt=""
            fill
            className="absolute inset-0 object-cover"
            style={{ zIndex: 11 }}
          />

          {/* Layer 5 - Foreground / Mist */}
          <Image
            ref={el => { layerRefs.current[4] = el! }}
            src="/images/Hero Banner 5.png"
            alt=""
            fill
            className="absolute inset-0 object-cover"
            style={{ zIndex: 16 }}
          />
        </div>

        {/* Cinematic Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/90 z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#00000000_35%,#000000c0_85%)] z-20" />

        {/* Hero Text */}
<div className="absolute bottom-[35%] left-1/2 -translate-x-1/2 text-center z-30 w-full max-w-[820px] px-6">
          <p className="text-[#ffbf65] text-[clamp(9px,1vw,12px)] tracking-[0.36em] font-semibold uppercase mb-2 font-serif">
            THE SHADOW CHRONICLES
          </p>

          <h1 className="text-white text-[clamp(38px,8vw,108px)] font-black font-display leading-none tracking-[-0.025em] mb-3">
            LORD OF THE <br />
            <span className="bg-gradient-to-r from-[#e8a040] via-[#f5c165] to-[#d47828] bg-clip-text text-transparent">
              SHADOWS
            </span>
          </h1>

          <p className="text-[#ffd7a5a6] text-[clamp(13px,1.35vw,16px)] max-w-md mx-auto leading-relaxed">
            In a dying realm, one warrior will either claim the throne — or watch it consume him.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#c8872f] to-[#e8a040] text-white font-bold px-10 py-4 rounded-md text-sm tracking-widest hover:brightness-110 transition"
            >
              SPECIAL EDITION
            </Link>
            <Link
              href="/book-series/lord-of-the-shadows"
              className="inline-flex items-center gap-2 border border-[#c8872f80] text-[#ffcd8c] font-semibold px-10 py-4 rounded-md text-sm tracking-widest hover:border-[#e8a040] transition"
            >
              VIEW SERIES
            </Link>
          </div>
        </div>
      </section>

      {/* ==================== SECOND SECTION (Bilkul Untouched) ==================== */}
 <section
  className="relative z-10 w-full h-screen py-20 md:py-60"
  // style={{
  //   backgroundImage: `url("/images/orange Background.jpg")`,
  //   backgroundSize: "cover",
  //   backgroundPosition: "center",
  //   backgroundRepeat: "no-repeat",
  // }}
>
  <div className="grid lg:grid-cols-2 gap-12 items-center">
    
    {/* Book Cover */}
    <div className="relative order-2 lg:order-1 flex justify-center">
      <div className="relative group">
        <div className="absolute -inset-4 bg-gradient-to-r from-gold/30 via-amber/20 to-gold/50 rounded-lg blur-xl opacity-60 group-hover:opacity-80 transition-opacity" />
        <div className="relative w-74 md:w-80 aspect-[2/3] bg-card rounded-lg shadow-3xl overflow-hidden border border-border/50">
          <Image
            src="/images/lord-shadow.jpg"
            alt="The Shadow Chronicles - Book One"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
        </div>
        <div className="absolute -top-3 -right-3 px-3 py-1 bg-gold text-primary-foreground text-xs font-medium rounded-full shadow-lg">
          New Release
        </div>
      </div>
    </div>

    {/* Text Content */}
    <div className="order-1 lg:order-2 text-center lg:text-left">
      <p className="text-gold font-serif text-sm md:text-base tracking-widest uppercase mb-4">
        The Shadow Chronicles • Book One
      </p>
      <h1 className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-foreground mb-6 leading-tight text-balance">
        Lord of the
        <span className="block text-gold">Shadows</span>
      </h1>
      <p className="text-muted-foreground text-lg md:text-xl mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
        In a realm where darkness reigns supreme, one warrior must rise to challenge the throne. 
        An epic tale of magic, betrayal, and redemption.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
        <Link href="#shop" className="inline-flex items-center justify-center px-8 py-4 bg-gold text-primary-foreground font-medium rounded-md hover:bg-gold-light transition-all hover:shadow-[0_0_30px_rgba(201,168,76,0.3)] group">
          <span>Special Edition</span>
          <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
        <Link href="#series" className="inline-flex items-center justify-center px-8 py-4 border border-border text-foreground font-medium rounded-md hover:border-primary hover:text-primary transition-colors">
          View Series
        </Link>
      </div>
    </div>

  </div>
</section>
    </>
  )
}