"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"

const booksData = [
  {
    id: 1,
    title: "Lord of the Shadows: Orb of Death",
    src: "/images/front.jpg",
    desktop: { left: "-1%", top: "12%", rotY: 58, rotX: 0, scale: 1.05 },
    mobile: { left: "8%", top: "11%", rotY: 58, rotX: 0, scale: 1 },
    link: "https://www.amazon.com/LORD-SHADOWS-Death-Cassie-Hebein-ebook/dp/B0G67R6V5S/ref=sr_1_3?dib=eyJ2IjoiMSJ9.jK-x_6szofKIP-hTxhinXphvx-EtisMUPBNFi7H6GCTGjHj071QN20LucGBJIEps.Mec2at4PMQcijEU6eicXIKI_qn612QVjoZhxE2N3PX8&dib_tag=se&qid=1774986244&refinements=p_27%3ACassie++Hebein&s=digital-text&sr=1-3&text=Cassie++Hebein",
  },
  {
    id: 2,
    title: "Lord of the Shadows",
    src: "/images/lord-shadow.jpg",
    desktop: { left: "26%", top: "58%", rotY: -32, rotX: 1, scale: 1.05 },
    mobile: { left: "10%", top: "48%", rotY: 58 , rotX: 0, scale: 1 },
    link: "https://www.amazon.com/LORD-SHADOWS-Cassie-Hebein-ebook/dp/B0G26X883R/ref=sr_1_1?cri[%E2%80%A6]s+by+cassie+hebein&qid=1774978868&sprefix=%2Caps%2C323&sr=8-1",
  },
  {
    id: 6,
    title: "Lord of the Shadows: Love Outlived Death",
    src: "/images/eBook-2.jpg",
    desktop: { left: "52%", top: "12%", rotY: 37, rotX: 1, scale: 1.05 },
    mobile: { left: "56%", top: "12%", rotY: -58, rotX: 1, scale: 0.92 },
    link: "https://www.amazon.com/LORD-SHADOWS-Love-Outlived-Death-ebook/dp/B0GNNZGV3T/ref=sr_1_2?dib=eyJ2IjoiMSJ9.jK-x_6szofKIP-hTxhinXphvx-EtisMUPBNFi7H6GCTGjHj071QN20LucGBJIEps.Mec2at4PMQcijEU6eicXIKI_qn612QVjoZhxE2N3PX8&dib_tag=se&qid=1774986244&refinements=p_27%3ACassie++Hebein&s=digital-text&sr=1-2&text=Cassie++Hebein",
  },
  {
    id: 7,
    title: "Lord of the Shadows: Rising",
    src: "/images/cassie-book.jpg",
    desktop: { left: "79%", top: "57%", rotY: -58, rotX: 1, scale: 1.05 },
    mobile: { left: "54%", top: "48%", rotY: -58, rotX: 1, scale: 1 },
    link: "https://www.amazon.com/LORD-SHADOWS-Rising-Cassie-Hebein-ebook/dp/B0GKJ4148J/ref=sr_1_1?dib=eyJ2IjoiMSJ9.jK-x_6szofKIP-hTxhinXphvx-EtisMUPBNFi7H6GCTGjHj071QN20LucGBJIEps.Mec2at4PMQcijEU6eicXIKI_qn612QVjoZhxE2N3PX8&dib_tag=se&qid=1774986210&refinements=p_27%3ACassie++Hebein&s=digital-text&sr=1-1&text=Cassie++Hebein",
  },
]

export function BooksCollage() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const [activeMobileId, setActiveMobileId] = useState<number | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  return (
    <section className="relative w-full max-w-full overflow-hidden px-4 py-20 md:px-6 md:py-32 lg:px-8">
      <div className="absolute inset-0 bg-black/50" />
      <div className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-gold/50 blur-[80px]" />
      <div className="absolute bottom-1/4 right-1/4 h-48 w-48 rounded-full bg-gold/50 blur-[70px]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-12 text-center md:mb-16">
          <h2 className="font-display text-4xl tracking-tighter text-white sm:text-5xl md:text-6xl lg:text-7xl">
            A Journey Through{" "}
            <span className="text-gold">Love Stories</span>
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-gray-400 sm:text-base md:text-lg">
            Step into a beautifully crafted collection of romantic tales where
            every book captures raw emotions, intense relationships, and moments
            that define love in its truest form.
          </p>
        </div>

        <div
          className="relative mx-auto h-[680px] max-w-full overflow-hidden md:h-[720px] md:max-w-6xl md:overflow-visible lg:h-[780px]"
          style={{ perspective: "1400px" }}
        >
          {booksData.map((book) => {
            const isActive = isMobile
              ? activeMobileId === book.id
              : hoveredId === book.id

            const position = isMobile ? book.mobile : book.desktop

            return (
              <Link
                href={book.link}
                target="_blank"
                key={book.id}
                className="absolute cursor-pointer transition-all duration-700 ease-out"
                style={{
                  left: position.left,
                  top: position.top,
                  zIndex: isActive ? 50 : book.id,
                  transform: isActive
                    ? isMobile
                      ? "translateZ(80px) scale(1.28) rotateY(0deg) rotateX(5deg)"
                      : "translateZ(80px) scale(1.57) rotateY(0deg) rotateX(5deg)"
                    : `translateZ(0px) scale(${position.scale}) rotateY(${position.rotY}deg) rotateX(${position.rotX}deg)`,
                }}
                onMouseEnter={() => !isMobile && setHoveredId(book.id)}
                onMouseLeave={() => !isMobile && setHoveredId(null)}
                onClick={(event) => {
                  if (isMobile && activeMobileId !== book.id) {
                    event.preventDefault()
                    setActiveMobileId(book.id)
                  }
                }}
              >
                <div className="group relative aspect-[2/3] w-[118px] sm:w-[145px] md:w-52 lg:w-60">
                  <div
                    className={`absolute -inset-8 rounded-3xl bg-black/60 blur-2xl transition-all duration-700 ${
                      isActive ? "scale-110 opacity-40" : "opacity-20"
                    }`}
                  />

                  <div className="relative h-full w-full overflow-hidden rounded-2xl border border-white/10 shadow-2xl transition-all duration-500 group-hover:border-white/20">
                    <Image
                      src={book.src}
                      alt={book.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 118px, (max-width: 768px) 145px, 240px"
                    />

                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-50" />

                    {isActive && (
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-3 md:p-4">
                        <p className="text-center text-[10px] font-medium tracking-wide text-white md:text-sm">
                          {book.title}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        <p className="mt-10 text-center text-sm tracking-widest text-muted-foreground">
          {isMobile ? "TAP TO EXPLORE THE WORLDS" : "HOVER TO EXPLORE THE WORLDS"}
        </p>
      </div>
    </section>
  )
}