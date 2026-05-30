"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles } from "lucide-react"
import type { MerchProduct } from "@/lib/merch-products"

type ExploreMoreProductsProps = {
  products: MerchProduct[]
  currentProductSlug: string
}

export default function ExploreMoreProducts({
  products,
  currentProductSlug,
}: ExploreMoreProductsProps) {
  const sliderRef = useRef<HTMLDivElement | null>(null)

  const visibleProducts = products.filter(
    (product) => product.slug !== currentProductSlug
  )

  const scrollSlider = (direction: "left" | "right") => {
    const slider = sliderRef.current
    if (!slider) return

    const firstCard = slider.querySelector("[data-product-card]") as HTMLElement | null
    const cardWidth = firstCard ? firstCard.offsetWidth : 320
    const gap = window.innerWidth >= 1024 ? 24 : 16

    const cardsToMove =
      window.innerWidth >= 1024 ? 4 : window.innerWidth >= 640 ? 2 : 1

    const scrollAmount = (cardWidth + gap) * cardsToMove

    slider.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    })
  }

  if (visibleProducts.length === 0) {
    return null
  }

  return (
    <section className="relative z-10 w-full max-w-full overflow-hidden px-4 py-16 sm:px-6 md:py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-6 md:mb-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#d47828]/30 bg-[#d47828]/10 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#d47828] backdrop-blur-xl sm:text-xs sm:tracking-[0.22em]">
              <Sparkles className="h-4 w-4" />
              Explore More
            </div>

            <h2 className="font-display text-3xl font-black leading-tight text-white sm:text-4xl md:text-5xl">
              More From The{" "}
              <span className="italic text-[#d47828]">Collection</span>
            </h2>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/55 sm:text-base">
              Discover more character-inspired merchandise from the Lord of the
              Shadows universe.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => scrollSlider("left")}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.045] text-white/70 backdrop-blur-xl transition hover:border-[#d47828]/60 hover:text-[#d47828] sm:h-12 sm:w-12"
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <button
              type="button"
              onClick={() => scrollSlider("right")}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.045] text-white/70 backdrop-blur-xl transition hover:border-[#d47828]/60 hover:text-[#d47828] sm:h-12 sm:w-12"
              aria-label="Scroll right"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Slider */}
        <div
          ref={sliderRef}
          className="explore-products-scroll flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-5 lg:gap-6"
        >
          {visibleProducts.map((product) => (
            <Link
              data-product-card
              key={product.id}
              href={`/shop/${product.slug}`}
              className="group relative shrink-0 snap-start overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.04] shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl transition duration-300 hover:-translate-y-2 hover:border-[#d47828]/50 hover:shadow-[0_25px_100px_rgba(212,120,40,0.16)]
              w-full
              sm:w-[calc((100%-16px)/2)]
              lg:w-[calc((100%-72px)/4)]"
            >
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,120,40,0.18),transparent_45%)] opacity-0 transition duration-300 group-hover:opacity-100" />

              <div className="relative aspect-[4/4.25] overflow-hidden bg-black/45 sm:aspect-[4/4.45] lg:aspect-[4/4.7]">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />

                <div className="absolute left-4 top-4 rounded-full border border-[#d47828]/40 bg-black/60 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[#d47828] backdrop-blur-md">
                  {product.category}
                </div>

                <div className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full border border-[#d47828]/40 bg-black/70 text-[#d47828] opacity-100 backdrop-blur-md transition duration-300 group-hover:bg-[#d47828] group-hover:text-black lg:translate-y-3 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100">
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>

              <div className="relative z-10 p-4 sm:p-5">
                <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.2em] text-white/45 sm:text-xs">
                  {product.character}
                </p>

                <h3 className="line-clamp-2 text-base font-bold leading-tight text-white transition group-hover:text-[#d47828] sm:text-lg">
                  {product.title}
                </h3>

                <div className="mt-4 flex flex-col gap-3">
                  <p className="line-clamp-2 text-sm leading-6 text-white/52">
                    {product.description}
                  </p>

                  <span className="w-fit rounded-full bg-[#d47828] px-3 py-1 text-xs font-black text-black">
                    ${product.price.toFixed(2)}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}