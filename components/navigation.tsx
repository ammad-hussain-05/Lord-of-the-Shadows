"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Menu,
  X,
  ChevronDown,
  Sword,
  Shield,
  Crown,
  Flame,
  Star,
  Scroll,
  ShoppingCart,
} from "lucide-react"

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

  const navLinkClass =
    "relative text-[13px] font-semibold tracking-wide text-white/70 transition-all duration-300 hover:text-[#d47828] after:absolute after:-bottom-2 after:left-0 after:h-[1px] after:w-0 after:bg-[#d47828] after:transition-all after:duration-300 hover:after:w-full"

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 border-b border-[#d47828]/15 bg-black/85 backdrop-blur-xl">
      <div className="mx-auto max-w-[1500px] px-5 sm:px-6 lg:px-10">
        <div className="flex h-16 items-center justify-between md:grid md:h-20 md:grid-cols-[1fr_auto_1.15fr]">
          {/* LEFT NAVIGATION - DESKTOP */}
          <div className="hidden items-center gap-8 md:flex">
            <div className="relative">
              <button
                className="flex items-center gap-1 text-[13px] font-semibold tracking-wide text-white/70 transition-all duration-300 hover:text-[#d47828]"
                onMouseEnter={() => setSeriesDropdownOpen(true)}
                onMouseLeave={() => setSeriesDropdownOpen(false)}
              >
                Book Series
                <ChevronDown className="h-4 w-4" />
              </button>

              <div
                className={`absolute left-0 top-full mt-4 w-80 overflow-hidden rounded-2xl border border-[#d47828]/20 bg-black/90 shadow-[0_25px_80px_rgba(0,0,0,0.65)] backdrop-blur-xl transition-all duration-200 ${
                  seriesDropdownOpen
                    ? "visible translate-y-0 opacity-100"
                    : "invisible -translate-y-2 opacity-0"
                }`}
                onMouseEnter={() => setSeriesDropdownOpen(true)}
                onMouseLeave={() => setSeriesDropdownOpen(false)}
              >
                <div className="border-b border-white/10 bg-[#d47828]/10 px-5 py-4">
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#d47828]">
                    Story Realms
                  </p>
                </div>

                <div className="grid gap-1 p-3">
                  {bookSeries.map((series) => (
                    <Link
                      key={series.name}
                      href={series.href}
                      className="group flex items-center gap-3 rounded-xl p-3 transition-all duration-300 hover:bg-[#d47828]/10"
                    >
                      <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[#d47828]/25 bg-[#d47828]/10 text-[#d47828] transition group-hover:bg-[#d47828] group-hover:text-black">
                        <series.icon className="h-4 w-4" />
                      </div>

                      <span className="text-sm font-medium text-white/75 transition group-hover:text-white">
                        {series.name}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link href="/" className={navLinkClass}>
              Meet the Author
            </Link>

            <Link href="/advice-for-authors" className={navLinkClass}>
              Advice for Authors
            </Link>
          </div>

          {/* LOGO - LEFT ON MOBILE / CENTER ON DESKTOP */}
          <div className="flex items-center justify-start md:justify-center">
            <Link href="/" className="group flex items-center justify-center">
              <div
                className="relative shrink-0 transition duration-300 group-hover:scale-105"
                style={{
                  width: "clamp(54px, 6vw, 72px)",
                  height: "clamp(54px, 6vw, 72px)",
                }}
              >
                <svg
                  viewBox="0 0 200 200"
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute inset-0 h-full w-full"
                  style={{
                    animation: "lotrNavSpin 28s linear infinite",
                    filter: "drop-shadow(0 0 7px rgba(212,120,40,0.75))",
                  }}
                >
                  <defs>
                    <path
                      id="navRingPath"
                      d="M 100,100 m -75,0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0"
                    />
                  </defs>

                  <circle
                    cx="100"
                    cy="100"
                    r="98"
                    fill="rgba(0,0,0,0.25)"
                    stroke="#d47828"
                    strokeWidth="4"
                    opacity="0.8"
                  />

                  <circle
                    cx="100"
                    cy="100"
                    r="76"
                    fill="none"
                    stroke="#d47828"
                    strokeWidth="2"
                    opacity="0.35"
                  />

                  <text
                    fontSize="13"
                    fill="#d47828"
                    opacity="0.9"
                    fontFamily="serif"
                    letterSpacing="0.5"
                  >
                    <textPath href="#navRingPath">
                      ᚐᚋᚐᚌᚑᚅ · ᚋᚓᚂᚉᚑᚏ · ᚌᚑᚅᚇᚑᚏ · ᚐᚁᚐᚏᚈᚆ · ᚋᚑᚏᚇᚑᚏ ·
                    </textPath>
                  </text>
                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span
                    style={{
                      fontFamily: "'Palatino Linotype', Palatino, 'Book Antiqua', serif",
                      fontSize: "5px",
                      letterSpacing: "2px",
                      color: "#d47828",
                      textTransform: "uppercase",
                      lineHeight: 1,
                    }}
                  >
                    The
                  </span>

                  <span
                    style={{
                      fontFamily: "'Palatino Linotype', Palatino, 'Book Antiqua', serif",
                      fontSize: "12px",
                      fontWeight: 700,
                      color: "#d47828",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                      lineHeight: 1,
                      textShadow: "0 0 10px rgba(212,120,40,0.9)",
                    }}
                  >
                    Lord
                  </span>

                  <span
                    style={{
                      fontFamily: "'Palatino Linotype', Palatino, 'Book Antiqua', serif",
                      fontSize: "5px",
                      letterSpacing: "1.5px",
                      color: "#d47828",
                      textTransform: "uppercase",
                      lineHeight: 1.35,
                    }}
                  >
                    of the
                  </span>

                  <span
                    style={{
                      fontFamily: "'Palatino Linotype', Palatino, 'Book Antiqua', serif",
                      fontSize: "10px",
                      fontWeight: 700,
                      color: "#d47828",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                      lineHeight: 1,
                      textShadow: "0 0 10px rgba(212,120,40,0.9)",
                    }}
                  >
                    Shadows
                  </span>
                </div>
              </div>
            </Link>
          </div>

          {/* RIGHT NAVIGATION - DESKTOP */}
          <div className="hidden items-center justify-end gap-7 md:flex">
            <Link href="/newsletter" className={navLinkClass}>
              Newsletter
            </Link>

            <Link href="/contacts" className={navLinkClass}>
              Contact
            </Link>

            <Link href="/collection" className={navLinkClass}>
              Collection
            </Link>
<Link href="/shop" className="animated-shop-button ml-8">
  <ShoppingCart className="arr-2" />
  <span className="circle" />
  <span className="text">Shop</span>
  <ShoppingCart className="arr-1" />
</Link>
          </div>

          {/* MOBILE MENU BUTTON */}
          <div className="flex items-center justify-end md:hidden">
            <button
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[#d47828]/35 bg-black/55 text-[#d47828] shadow-[0_0_18px_rgba(212,120,40,0.15)] transition hover:bg-[#d47828] hover:text-black"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6 stroke-[2.6]" />
              ) : (
                <Menu className="h-6 w-6 stroke-[2.6]" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      <div
        className={`overflow-hidden border-t border-[#d47828]/15 bg-black/95 backdrop-blur-xl transition-all duration-300 md:hidden ${
          mobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="space-y-5 px-5 py-6">
          <div className="space-y-2">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#d47828]">
              Book Series
            </p>

            {bookSeries.map((series) => (
              <Link
                key={series.name}
                href={series.href}
                className="flex items-center gap-3 rounded-xl px-3 py-3 text-white/75 transition hover:bg-[#d47828]/10 hover:text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                <series.icon className="h-4 w-4 text-[#d47828]" />
                <span className="text-sm font-medium">{series.name}</span>
              </Link>
            ))}
          </div>

          <div className="space-y-3 border-t border-white/10 pt-5">
            <Link
              href="/"
              className="block rounded-xl px-3 py-3 text-sm font-medium text-white/75 transition hover:bg-white/5 hover:text-[#d47828]"
              onClick={() => setMobileMenuOpen(false)}
            >
              Meet the Author
            </Link>

            <Link
              href="/advice-for-authors"
              className="block rounded-xl px-3 py-3 text-sm font-medium text-white/75 transition hover:bg-white/5 hover:text-[#d47828]"
              onClick={() => setMobileMenuOpen(false)}
            >
              Advice for Authors
            </Link>

            <Link
              href="/newsletter"
              className="block rounded-xl px-3 py-3 text-sm font-medium text-white/75 transition hover:bg-white/5 hover:text-[#d47828]"
              onClick={() => setMobileMenuOpen(false)}
            >
              Newsletter
            </Link>

            <Link
              href="/contacts"
              className="block rounded-xl px-3 py-3 text-sm font-medium text-white/75 transition hover:bg-white/5 hover:text-[#d47828]"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>

            <Link
              href="/collection"
              className="block rounded-xl px-3 py-3 text-sm font-medium text-white/75 transition hover:bg-white/5 hover:text-[#d47828]"
              onClick={() => setMobileMenuOpen(false)}
            >
              Collection
            </Link>

            <Link
  href="/shop"
  className="animated-shop-button mobile-shop-button"
  onClick={() => setMobileMenuOpen(false)}
>
  <ShoppingCart className="arr-2" />
  <span className="circle" />
  <span className="text">Shop</span>
  <ShoppingCart className="arr-1" />
</Link>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes lotrNavSpin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </nav>
  )
}