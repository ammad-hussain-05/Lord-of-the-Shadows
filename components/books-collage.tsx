"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"

const booksData = [
  { id: 1, src: "/images/front.jpg", left: "-1%", top: "12%", rotY: 58, rotX: 0, scale: 1.05, link: "https://www.amazon.com/LORD-SHADOWS-Death-Cassie-Hebein-ebook/dp/B0G67R6V5S/ref=sr_1_3?dib=eyJ2IjoiMSJ9.jK-x_6szofKIP-hTxhinXphvx-EtisMUPBNFi7H6GCTGjHj071QN20LucGBJIEps.Mec2at4PMQcijEU6eicXIKI_qn612QVjoZhxE2N3PX8&dib_tag=se&qid=1774986244&refinements=p_27%3ACassie++Hebein&s=digital-text&sr=1-3&text=Cassie++Hebein" },
  { id: 2, src: "/images/lord-shadow.jpg",left: "26%", top: "58%", rotY: -32, rotX: 1, scale: 1.05, link: "https://www.amazon.com/LORD-SHADOWS-Cassie-Hebein-ebook/dp/B0G26X883R/ref=sr_1_1?cri[%E2%80%A6]s+by+cassie+hebein&qid=1774978868&sprefix=%2Caps%2C323&sr=8-1" },
  { id: 6, src: "/images/eBook-2.jpg", left: "52%", top: "12%", rotY: 37, rotX: 1, scale: 1.05, link: "https://www.amazon.com/LORD-SHADOWS-Love-Outlived-Death-ebook/dp/B0GNNZGV3T/ref=sr_1_2?dib=eyJ2IjoiMSJ9.jK-x_6szofKIP-hTxhinXphvx-EtisMUPBNFi7H6GCTGjHj071QN20LucGBJIEps.Mec2at4PMQcijEU6eicXIKI_qn612QVjoZhxE2N3PX8&dib_tag=se&qid=1774986244&refinements=p_27%3ACassie++Hebein&s=digital-text&sr=1-2&text=Cassie++Hebein" },
  { id: 7, src: "/images/cassie-book.jpg", left: "79%", top: "57%", rotY: -58, rotX: 1, scale: 1.05, link: "https://www.amazon.com/LORD-SHADOWS-Rising-Cassie-Hebein-ebook/dp/B0GKJ4148J/ref=sr_1_1?dib=eyJ2IjoiMSJ9.jK-x_6szofKIP-hTxhinXphvx-EtisMUPBNFi7H6GCTGjHj071QN20LucGBJIEps.Mec2at4PMQcijEU6eicXIKI_qn612QVjoZhxE2N3PX8&dib_tag=se&qid=1774986210&refinements=p_27%3ACassie++Hebein&s=digital-text&sr=1-1&text=Cassie++Hebein" },
]

export function BooksCollage() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-black/50" />
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gold/50 rounded-full blur-[80px]" />
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-gold/50 rounded-full blur-[70px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-display text-5xl md:text-6xl lg:text-7xl text-white tracking-tighter mb-4">
            A Journey Through{" "}
            <span className="text-gold">Love Stories</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-lg">
            Step into a beautifully crafted collection of romantic tales where every book captures raw emotions, intense relationships, and moments that define love in its truest form.
          </p>
        </div>

        {/* 3D Interactive Collage */}
        <div
          ref={containerRef}
          className="relative h-[620px] md:h-[720px] lg:h-[780px] mx-auto max-w-6xl"
          style={{ perspective: "1400px" }}
        >
          {booksData.map((book) => {
            const isHovered = hoveredId === book.id

            return (
              <Link
                href={book.link}
                target="_blank"
                key={book.id}
                className="absolute transition-all duration-700 ease-out cursor-pointer"
                style={{
                  left: book.left,
                  top: book.top,
                  zIndex: isHovered ? 50 : book.id,
                  transform: isHovered
                    ? `translateZ(80px) scale(1.57) rotateY(0deg) rotateX(5deg)`
                    : `translateZ(0px) scale(${book.scale}) rotateY(${book.rotY}deg) rotateX(${book.rotX}deg)`,
                }}
                onMouseEnter={() => setHoveredId(book.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <div className="relative w-44 md:w-52 lg:w-60 aspect-[2/3] group">

                  {/* Shadow */}
                  <div
                    className={`absolute -inset-8 bg-black/60 blur-2xl rounded-3xl transition-all duration-700 ${
                      isHovered ? "opacity-40 scale-110" : "opacity-20"
                    }`}
                  />

                  {/* Book */}
                  <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl border border-white/10 group-hover:border-white/20 transition-all duration-500">
                    <Image
                      src={book.src}
                      alt={book.title}
                      fill
                      className="object-cover"
                    />

                    {/* Shine */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-50 transition-opacity duration-700" />

                    {/* Hover Text */}
                    {isHovered && (
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4">
                        <p className="text-white text-sm font-medium text-center tracking-wide">
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

        <p className="text-center text-muted-foreground text-sm mt-20 tracking-widest">
          HOVER TO EXPLORE THE WORLDS
        </p>
      </div>
    </section>
  )
}