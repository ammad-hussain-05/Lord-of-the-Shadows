"use client"

import Link from "next/link"
import {
  Instagram,
  Youtube,
  BookOpen,
  Mail,
  ArrowUpRight,
  ShoppingBag,
  Sparkles,
} from "lucide-react"

const footerLinks = {
  books: [
    { name: "The Shadow Chronicles", href: "/book-series/lord-of-the-shadows" },
    { name: "Lord of the Shadows", href: "/book-series/lord-of-the-shadows" },
    { name: "Crown of Thorns", href: "/book-series/crown-of-thorns" },
    { name: "All Series", href: "/collection" },
  ],
  author: [
    { name: "Meet the Author", href: "/#about" },
    { name: "Writing Advice", href: "/advice-for-authors" },
    { name: "Newsletter", href: "/newsletter" },
    { name: "Contact", href: "/contacts" },
  ],
  connect: [
    { name: "Shop", href: "/shop" },
    { name: "Collection", href: "/collection" },
    { name: "Book Series", href: "/book-series/lord-of-the-shadows" },
    { name: "Contact Us", href: "/contacts" },
  ],
}

const socialLinks = [
  { name: "Instagram", icon: Instagram, href: "https://www.instagram.com/" },
  { name: "YouTube", icon: Youtube, href: "https://www.youtube.com/" },
  { name: "Goodreads", icon: BookOpen, href: "https://www.goodreads.com/" },
]

export function Footer() {
  return (
    <footer
      id="contact"
      className="relative w-full max-w-full overflow-hidden border-t border-[#d47828]/20 bg-black px-4 pb-8 pt-20 sm:px-6 lg:px-8"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(212,120,40,0.16),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(212,120,40,0.12),transparent_35%),linear-gradient(to_bottom,#070301,#000000)]" />
      <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-[#d47828]/60 to-transparent" />
      <div className="absolute left-[-180px] top-12 h-[420px] w-[420px] rounded-full bg-[#d47828]/15 blur-[130px]" />
      <div className="absolute bottom-[-180px] right-[-160px] h-[460px] w-[460px] rounded-full bg-[#d47828]/12 blur-[150px]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Modern CTA Card */}
        <div className="mb-14 overflow-hidden rounded-[34px] border border-[#d47828]/25 bg-white/[0.04] shadow-[0_28px_110px_rgba(0,0,0,0.55)] backdrop-blur-2xl">
          <div className="relative p-6 sm:p-8 lg:p-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,120,40,0.18),transparent_45%)]" />

            <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-3xl">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#d47828]/30 bg-[#d47828]/10 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-[#d47828]">
                  <Sparkles className="h-4 w-4" />
                  Lord of the Shadows
                </div>

                <h3 className="font-display text-3xl font-black leading-tight text-white sm:text-4xl lg:text-5xl">
                  Step deeper into the world of shadows.
                </h3>

                <p className="mt-4 max-w-2xl text-sm leading-7 text-white/60 sm:text-base">
                  Explore the official book collection, merchandise shop, author
                  updates, and the expanding dark fantasy universe.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row lg:shrink-0">
                <Link
                  href="/shop"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#d47828] px-7 py-4 text-sm font-black uppercase tracking-[0.16em] text-black transition hover:-translate-y-0.5 hover:bg-[#f0a14a] hover:shadow-[0_0_35px_rgba(212,120,40,0.48)]"
                >
                  <ShoppingBag className="h-4 w-4" />
                  Shop
                </Link>

                <Link
                  href="/collection"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-black/40 px-7 py-4 text-sm font-bold uppercase tracking-[0.16em] text-white/85 backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-[#d47828]/60 hover:text-[#d47828]"
                >
                  Collection
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Main Footer Grid */}
        <div className="grid gap-10 border-b border-white/10 pb-12 lg:grid-cols-[1.45fr_0.8fr_0.8fr_0.8fr] lg:gap-12">
          {/* Brand */}
          <div className="text-center sm:text-left">
            <Link href="/" className="mb-6 inline-flex items-center gap-4">
              <FooterLogo />

              <div>
                <p className="font-display text-2xl font-black leading-tight text-white">
                  Lord of the Shadows
                </p>
                <p className="mt-1 text-xs font-bold uppercase tracking-[0.22em] text-[#d47828]">
                  Dark Fantasy Series
                </p>
              </div>
            </Link>

            <p className="mx-auto max-w-md text-sm leading-7 text-white/58 sm:mx-0 sm:text-base">
              Crafting epic tales of darkness, magic, and redemption. Enter
              worlds where shadows whisper secrets and heroes rise from the
              ashes.
            </p>

            <div className="mt-7 flex justify-center gap-3 sm:justify-start">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/55 backdrop-blur-xl transition hover:-translate-y-1 hover:border-[#d47828]/60 hover:bg-[#d47828] hover:text-black hover:shadow-[0_0_28px_rgba(212,120,40,0.35)]"
                  aria-label={social.name}
                >
                  <social.icon className="h-5 w-5 transition group-hover:scale-110" />
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile links layout: Books + Connect left, Author right */}
          <div className="grid grid-cols-2 gap-8 lg:contents">
            <div className="space-y-8 lg:contents">
              <FooterColumn title="Books" links={footerLinks.books} />
              <FooterColumn title="Connect" links={footerLinks.connect} />
            </div>

            <div className="text-right lg:text-left">
              <FooterColumn title="Author" links={footerLinks.author} alignRightOnMobile />
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col gap-5 pt-8 text-center md:flex-row md:items-center md:justify-between md:text-left">
          <p className="text-sm text-white/45">
            &copy; {new Date().getFullYear()} Lord of the Shadows. All rights
            reserved.
          </p>

          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-6">
            <Link
              href="/privacy-policy"
              className="text-sm text-white/45 transition hover:text-[#d47828]"
            >
              Privacy Policy
            </Link>

            <Link
              href="/terms-of-service"
              className="text-sm text-white/45 transition hover:text-[#d47828]"
            >
              Terms of Service
            </Link>

            <Link
              href="mailto:info@thelibertybookpublisher.com"
              className="inline-flex items-center justify-center gap-2 text-sm text-white/45 transition hover:text-[#d47828]"
            >
              <Mail className="h-4 w-4" />
              Email Us
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
    </footer>
  )
}

function FooterColumn({
  title,
  links,
  alignRightOnMobile = false,
}: {
  title: string
  links: { name: string; href: string }[]
  alignRightOnMobile?: boolean
}) {
  return (
    <div className={alignRightOnMobile ? "text-right lg:text-left" : ""}>
      <h4 className="mb-5 text-xs font-black uppercase tracking-[0.24em] text-[#d47828]">
        {title}
      </h4>

      <ul className="space-y-3">
        {links.map((link) => (
          <li key={`${title}-${link.name}`}>
            <Link
              href={link.href}
              className={`group inline-flex items-center gap-2 text-sm font-medium text-white/58 transition hover:text-white ${
                alignRightOnMobile ? "justify-end lg:justify-start" : ""
              }`}
            >
              {!alignRightOnMobile && (
                <span className="h-px w-0 bg-[#d47828] transition-all duration-300 group-hover:w-5" />
              )}

              {link.name}

              {alignRightOnMobile && (
                <span className="h-px w-0 bg-[#d47828] transition-all duration-300 group-hover:w-5" />
              )}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

function FooterLogo() {
  return (
    <div
      className="relative shrink-0"
      style={{
        width: "78px",
        height: "78px",
      }}
    >
      <svg
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 h-full w-full"
        style={{
          animation: "lotrNavSpin 28s linear infinite",
          filter: "drop-shadow(0 0 8px rgba(212,120,40,0.65))",
        }}
      >
        <defs>
          <path
            id="footerRingPath"
            d="M 100,100 m -75,0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0"
          />
        </defs>

        <circle
          cx="100"
          cy="100"
          r="94"
          fill="rgba(0,0,0,0.25)"
          stroke="#d47828"
          strokeWidth="4"
          opacity="0.75"
        />

        <circle
          cx="100"
          cy="100"
          r="76"
          fill="none"
          stroke="#d47828"
          strokeWidth="2"
          opacity="0.3"
        />

        <text
          fontSize="13"
          fill="#d47828"
          opacity="0.85"
          fontFamily="serif"
          letterSpacing="0.5"
        >
          <textPath href="#footerRingPath">
            ᚐᚋᚐᚌᚑᚅ · ᚋᚓᚂᚉᚑᚏ · ᚌᚑᚅᚇᚑᚏ · ᚐᚁᚐᚏᚈᚆ · ᚋᚑᚏᚇᚑᚏ ·
          </textPath>
        </text>
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span
          style={{
            fontFamily: "'Palatino Linotype', Palatino, 'Book Antiqua', serif",
            fontSize: "6px",
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
            fontSize: "13px",
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
            lineHeight: 1.3,
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
  )
}