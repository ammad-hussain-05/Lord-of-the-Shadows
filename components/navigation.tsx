"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, ChevronDown, Sword, Shield, Crown, Flame, Star, Scroll } from "lucide-react"

const bookSeries = [
  { name: "Lord of the Shadows", icon: Sword, href: "/book-series/lord-of-the-shadows" },
  { name: "Realm of Embers", icon: Flame, href: "#" },
  { name: "Crown of Thorns", icon: Crown, href: "#" },
  { name: "The Forgotten Kingdom", icon: Shield, href: "#" },
  { name: "Starfall Prophecy", icon: Star, href: "#" },
  { name: "The Ancient Scrolls", icon: Scroll, href: "#" },
]

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [seriesDropdownOpen, setSeriesDropdownOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* ── LEFT NAVIGATION ── */}
          <div className="hidden md:flex items-center gap-8 flex-1">
            {/* Book Series Dropdown */}
            <div className="relative">
              <button
                className="flex items-center gap-1 text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
                onMouseEnter={() => setSeriesDropdownOpen(true)}
                onMouseLeave={() => setSeriesDropdownOpen(false)}
              >
                Book Series
                <ChevronDown className="w-4 h-4" />
              </button>

              <div
                className={`absolute top-full left-0 mt-2 w-72 bg-card border border-border rounded-lg shadow-xl transition-all duration-200 ${
                  seriesDropdownOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"
                }`}
                onMouseEnter={() => setSeriesDropdownOpen(true)}
                onMouseLeave={() => setSeriesDropdownOpen(false)}
              >
                <div className="p-4 grid gap-2">
                  {bookSeries.map((series) => (
                    <Link
                      key={series.name}
                      href={series.href}
                      className="flex items-center gap-3 p-3 rounded-md hover:bg-secondary transition-colors group"
                    >
                      <series.icon className="w-5 h-5 text-primary group-hover:text-gold-light transition-colors" />
                      <span className="text-sm text-foreground/90 group-hover:text-primary transition-colors">
                        {series.name}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link href="/" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
              Meet the Author
            </Link>
            <Link href="/advice-for-authors" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
              Advice for Authors
            </Link>
          </div>

          {/* ── CENTER LOGO ── */}
          <div className="flex-shrink-0 flex items-center justify-center mx-6">
            <Link href="/" className="flex items-center justify-center group">
              <div
                style={{
                  width: "clamp(44px, 6vw, 69px)",
                  height: "clamp(74px, 8vw, 66px)",
                  position: "relative",
                  flexShrink: 0,
                }}
              >
                {/* Spinning elvish ring */}
                <svg
                  viewBox="0 0 200 200"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    animation: "lotrNavSpin 28s linear infinite",
                    filter: "drop-shadow(0 0 6px rgba(212,120,40,0.6))",
                  }}
                >
                  <defs>
                    <path
                      id="navRingPath"
                      d="M 100,100 m -75,0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0"
                    />
                  </defs>
                  <circle cx="100" cy="100" r="99" fill="rgba(0,0,0,0)" stroke="#d47828" strokeWidth="4" opacity="0.6" />
                  <circle cx="100" cy="100" r="76" fill="none" stroke="#d47828" strokeWidth="2" opacity="0.25" />
                  <text fontSize="13" fill="#d47828" opacity="0.85" fontFamily="serif" letterSpacing="0.5">
                    <textPath href="#navRingPath">
                      ᚐᚋᚐᚌᚑᚅ · ᚋᚓᚂᚉᚑᚏ · ᚌᚑᚅᚇᚑᚏ · ᚐᚁᚐᚏᚈᚆ · ᚋᚑᚏᚇᚑᚏ ·
                    </textPath>
                  </text>
                </svg>

                {/* Static text inside ring */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span style={{
                    fontFamily: "'Palatino Linotype', Palatino, 'Book Antiqua', serif",
                    fontSize: "clamp(4px, 0.7vw, 6px)",
                    letterSpacing: "2px",
                    color: "#d47828",
                    textTransform: "uppercase",
                    lineHeight: 1,
                  }}>The</span>
                  <span style={{
                    fontFamily: "'Palatino Linotype', Palatino, 'Book Antiqua', serif",
                    fontSize: "clamp(10px, 1.6vw, 12px)",
                    fontWeight: 700,
                    color: "#d47828",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                    lineHeight: 1,
                    textShadow: "0 0 10px rgba(212,120,40,0.9)",
                  }}>Lord</span>
                  <span style={{
                    fontFamily: "'Palatino Linotype', Palatino, 'Book Antiqua', serif",
                    fontSize: "clamp(3px, 0.6vw, 5px)",
                    letterSpacing: "1.5px",
                    color: "#d47828",
                    textTransform: "uppercase",
                    lineHeight: 1.4,
                  }}>of the</span>
                  <span style={{
                    fontFamily: "'Palatino Linotype', Palatino, 'Book Antiqua', serif",
                    fontSize: "clamp(9px, 1.4vw, 10px)",
                    fontWeight: 700,
                    color: "#d47828",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                    lineHeight: 1,
                    textShadow: "0 0 10px rgba(212,120,40,0.9)",
                  }}>Shadows</span>
                </div>
              </div>
            </Link>
          </div>

          {/* ── RIGHT NAVIGATION ── */}
          <div className="hidden md:flex items-center gap-8 flex-1 justify-end">
            <Link href="/newsletter" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
              Newsletter
            </Link>
            <Link href="/contacts" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
              Contact
            </Link>
            <Link
              href="/shop"
              className="px-4 py-2 bg-gold text-primary-foreground text-sm font-medium rounded-md hover:bg-gold-light transition-colors"
            >
              Shop
            </Link>
          </div>

          {/* ── MOBILE MENU BUTTON ── */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* ── MOBILE MENU ── */}
      <div
        className={`md:hidden bg-card border-t border-border transition-all duration-300 ${
          mobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="px-4 py-6 space-y-4">
          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Book Series</p>
            {bookSeries.map((series) => (
              <Link
                key={series.name}
                href={series.href}
                className="flex items-center gap-3 py-2 text-foreground/80 hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <series.icon className="w-4 h-4 text-primary" />
                <span className="text-sm">{series.name}</span>
              </Link>
            ))}
          </div>
          <div className="border-t border-border pt-4 space-y-3">
            <Link href="#about" className="block py-2 text-sm text-foreground/80 hover:text-primary transition-colors" onClick={() => setMobileMenuOpen(false)}>
              Meet the Author
            </Link>
            <Link href="#advice" className="block py-2 text-sm text-foreground/80 hover:text-primary transition-colors" onClick={() => setMobileMenuOpen(false)}>
              Advice for Authors
            </Link>
            <Link href="#newsletter" className="block py-2 text-sm text-foreground/80 hover:text-primary transition-colors" onClick={() => setMobileMenuOpen(false)}>
              Newsletter
            </Link>
            <Link href="#contact" className="block py-2 text-sm text-foreground/80 hover:text-primary transition-colors" onClick={() => setMobileMenuOpen(false)}>
              Contact
            </Link>
            <Link
              href="#shop"
              className="block w-full text-center px-4 py-3 bg-primary text-primary-foreground text-sm font-medium rounded-md hover:bg-gold-light transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Shop
            </Link>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes lotrNavSpin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
    </nav>
  )
}