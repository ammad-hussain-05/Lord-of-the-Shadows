import Link from "next/link"
import { Instagram, Youtube, BookOpen } from "lucide-react"

const footerLinks = {
  books: [
    { name: "The Shadow Chronicles", href: "#" },
    { name: "Lord of the Shadows", href: "#" },
    { name: "Crown of Thorns", href: "#" },
    { name: "All Series", href: "#" },
  ],
  author: [
    { name: "About", href: "#about" },
    { name: "Writing Advice", href: "#advice" },
    { name: "Events", href: "#" },
    { name: "Press Kit", href: "#" },
  ],
  connect: [
    { name: "Newsletter", href: "#newsletter" },
    { name: "Contact", href: "#contact" },
    { name: "FAQ", href: "#" },
    { name: "Shop", href: "#" },
  ],
}

const socialLinks = [
  { name: "Instagram", icon: Instagram, href: "#" },
  { name: "YouTube", icon: Youtube, href: "#" },
  { name: "Goodreads", icon: BookOpen, href: "#" },
]

export function Footer() {
  return (
    <footer id="contact" className="relative pt-20 pb-8 border-t border-border/50">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#05050a] to-background" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">

          {/* Brand Column */}
          <div className="lg:col-span-2">
            {/* Logo */}
            <Link href="/" className="inline-flex items-center gap-3 mb-6">
              <div
                style={{
                  width: "108px",
                  height: "90px",
                  position: "relative",
                  flexShrink: 0,
                }}
              >
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
                      id="footerRingPath"
                      d="M 100,100 m -75,0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0"
                    />
                  </defs>
                  <circle cx="100" cy="100" r="92" fill="rgba(0,0,0,0)" stroke="#d47828" strokeWidth="4" opacity="0.6" />
                  <circle cx="100" cy="100" r="76" fill="none" stroke="#d47828" strokeWidth="2" opacity="0.25" />
                  <text fontSize="13" fill="#d47828" opacity="0.85" fontFamily="serif" letterSpacing="0.5">
                    <textPath href="#footerRingPath">
                      ᚐᚋᚐᚌᚑᚅ · ᚋᚓᚂᚉᚑᚏ · ᚌᚑᚅᚇᚑᚏ · ᚐᚁᚐᚏᚈᚆ · ᚋᚑᚏᚇᚑᚏ ·
                    </textPath>
                  </text>
                </svg>

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
                    fontSize: "8px",
                    letterSpacing: "1px",
                    color: "#d47828",
                    textTransform: "uppercase",
                  }}>The</span>
                  <span style={{
                    fontFamily: "'Palatino Linotype', Palatino, 'Book Antiqua', serif",
                    fontSize: "13px",
                    fontWeight: 700,
                    color: "#d47828",
                    textTransform: "uppercase",
                    textShadow: "0 0 10px rgba(212,120,40,0.9)",
                  }}>Lord</span>
                  <span style={{
                    fontFamily: "'Palatino Linotype', Palatino, 'Book Antiqua', serif",
                    fontSize: "6px",
                    letterSpacing: "1px",
                    color: "#d47828",
                    textTransform: "uppercase",
                  }}>of the</span>
                  <span style={{
                    fontFamily: "'Palatino Linotype', Palatino, 'Book Antiqua', serif",
                    fontSize: "10px",
                    fontWeight: 700,
                    color: "#d47828",
                    textTransform: "uppercase",
                    textShadow: "0 0 10px rgba(212,120,40,0.9)",
                  }}>Shadows</span>
                </div>
              </div>

              <span className="font-display text-2xl text-foreground">Lord of the Shadows</span>
            </Link>

            <p className="text-muted-foreground mb-6 max-w-sm">
              Crafting epic tales of darkness, magic, and redemption.
              Enter worlds where shadows whisper secrets and heroes rise from the ashes.
            </p>

            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  className="p-2 bg-card/50 border border-border rounded-md text-muted-foreground hover:text-primary hover:border-primary transition-colors"
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h4 className="font-serif text-sm font-medium text-foreground uppercase tracking-wider mb-4">
              Books
            </h4>
            <ul className="space-y-3">
              {footerLinks.books.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-sm font-medium text-foreground uppercase tracking-wider mb-4">
              Author
            </h4>
            <ul className="space-y-3">
              {footerLinks.author.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-sm font-medium text-foreground uppercase tracking-wider mb-4">
              Connect
            </h4>
            <ul className="space-y-3">
              {footerLinks.connect.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border/50">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Lord of the Shadows. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes lotrNavSpin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
    </footer>
  )
}