"use client"

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
  const scrollSlider = (direction: "left" | "right") => {
    const slider = document.getElementById("explore-more-products-slider")

    if (!slider) return

    const scrollAmount = direction === "left" ? -360 : 360

    slider.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    })
  }

  const visibleProducts = products.filter(
    (product) => product.slug !== currentProductSlug
  )

  if (visibleProducts.length === 0) {
    return null
  }

  return (
    <section className="relative z-10 px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#d47828]/30 bg-[#d47828]/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-[#d47828] backdrop-blur-xl">
              <Sparkles className="h-4 w-4" />
              Explore More
            </div>

            <h2 className="font-display text-3xl font-black leading-tight text-white md:text-5xl">
              More From The{" "}
              <span className="italic text-[#d47828]">Collection</span>
            </h2>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/55 md:text-base">
              Discover more character-inspired merchandise from the Lord of the
              Shadows universe.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => scrollSlider("left")}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.045] text-white/70 backdrop-blur-xl transition hover:border-[#d47828]/60 hover:text-[#d47828]"
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <button
              type="button"
              onClick={() => scrollSlider("right")}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.045] text-white/70 backdrop-blur-xl transition hover:border-[#d47828]/60 hover:text-[#d47828]"
              aria-label="Scroll right"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div
          id="explore-more-products-slider"
          className="explore-products-scroll flex gap-6 overflow-x-auto scroll-smooth pb-4"
        >
          {visibleProducts.map((product) => (
            <Link
              key={product.id}
              href={`/shop/${product.slug}`}
              className="group relative min-w-[280px] max-w-[280px] overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.04] shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl transition duration-300 hover:-translate-y-2 hover:border-[#d47828]/50 hover:shadow-[0_25px_100px_rgba(212,120,40,0.16)] sm:min-w-[320px] sm:max-w-[320px]"
            >
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,120,40,0.18),transparent_45%)] opacity-0 transition duration-300 group-hover:opacity-100" />

              <div className="relative aspect-[4/4.6] overflow-hidden bg-black/45">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-110"
                  sizes="320px"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />

                <div className="absolute left-4 top-4 rounded-full border border-[#d47828]/40 bg-black/60 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[#d47828] backdrop-blur-md">
                  {product.category}
                </div>

                <div className="absolute bottom-4 right-4 flex h-10 w-10 translate-y-3 items-center justify-center rounded-full border border-[#d47828]/40 bg-black/70 text-[#d47828] opacity-0 backdrop-blur-md transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>

              <div className="relative z-10 p-5">
                <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-white/45">
                  {product.character}
                </p>

                <h3 className="text-lg font-bold leading-tight text-white transition group-hover:text-[#d47828]">
                  {product.title}
                </h3>

                <div className="mt-4 flex items-center justify-between gap-4">
                  <p className="text-sm leading-6 text-white/52 line-clamp-2">
                    {product.description}
                  </p>

                  <span className="shrink-0 rounded-full bg-[#d47828] px-3 py-1 text-xs font-black text-black">
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