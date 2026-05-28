"use client"

import { useMemo, useState } from "react"
import { Check, ChevronDown, Filter, Sparkles } from "lucide-react"
import {
  merchCategories,
  merchProducts,
  type MerchCategory,
} from "@/lib/merch-products"
import MerchProductCard from "@/components/merch-product-card"

type SelectedCategory = "All" | MerchCategory

export function MerchGrid() {
  const [selectedCategory, setSelectedCategory] =
    useState<SelectedCategory>("All")
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const filteredProducts = useMemo(() => {
    if (selectedCategory === "All") {
      return merchProducts
    }

    return merchProducts.filter(
      (product) => product.category === selectedCategory
    )
  }, [selectedCategory])

  const handleCategoryChange = (category: SelectedCategory) => {
    setSelectedCategory(category)
    setIsDropdownOpen(false)
  }

  return (
    <section className="relative z-10 px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-6 md:mb-14 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#d47828]/30 bg-[#d47828]/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#d47828]">
              <Sparkles className="h-4 w-4" />
              Official Merchandise
            </div>

            <h2 className="font-display text-3xl font-bold leading-tight text-white md:text-5xl">
              Character-Based{" "}
              <span className="italic text-[#d47828]">Merchandise</span>
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-7 text-white/55 md:text-base">
              Browse exclusive mugs, t-shirts, and chains inspired by the
              characters of the Lord of the Shadows universe.
            </p>
          </div>

          {/* Modern Category Dropdown */}
          <div className="relative w-full md:w-[330px]">
            <label className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-white/45">
              <Filter className="h-4 w-4 text-[#d47828]" />
              Filter Category
            </label>

            <button
              type="button"
              onClick={() => setIsDropdownOpen((prev) => !prev)}
              className="group relative flex h-14 w-full items-center justify-between overflow-hidden rounded-2xl border border-white/10 bg-black/55 px-5 text-left text-sm font-bold text-white shadow-[0_16px_50px_rgba(0,0,0,0.35)] backdrop-blur-xl transition hover:border-[#d47828]/55 hover:bg-[#d47828]/10"
            >
              <span className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,120,40,0.18),transparent_45%)] opacity-0 transition group-hover:opacity-100" />

              <span className="relative flex items-center gap-3">
                <span className="h-2.5 w-2.5 rounded-full bg-[#d47828] shadow-[0_0_18px_rgba(212,120,40,0.75)]" />
                {selectedCategory}
              </span>

              <ChevronDown
                className={`relative h-5 w-5 text-[#d47828] transition duration-300 ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 top-[calc(100%+10px)] z-40 w-full overflow-hidden rounded-2xl border border-[#d47828]/25 bg-black/90 p-2 shadow-[0_25px_80px_rgba(0,0,0,0.7)] backdrop-blur-2xl">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,120,40,0.16),transparent_58%)]" />

                <div className="relative grid gap-1">
                  {merchCategories.map((category) => {
                    const isActive = selectedCategory === category

                    return (
                      <button
                        key={category}
                        type="button"
                        onClick={() =>
                          handleCategoryChange(category as SelectedCategory)
                        }
                        className={`group flex items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-semibold transition ${
                          isActive
                            ? "bg-[#d47828] text-black"
                            : "text-white/70 hover:bg-[#d47828]/10 hover:text-white"
                        }`}
                      >
                        <span className="flex items-center gap-3">
                          <span
                            className={`h-2 w-2 rounded-full ${
                              isActive
                                ? "bg-black"
                                : "bg-[#d47828] opacity-70 group-hover:opacity-100"
                            }`}
                          />
                          {category}
                        </span>

                        {isActive && <Check className="h-4 w-4" />}
                      </button>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mb-8 flex items-center justify-between border-y border-white/10 py-4">
          <p className="text-sm text-white/50">
            Showing{" "}
            <span className="font-semibold text-white">
              {filteredProducts.length}
            </span>{" "}
            product{filteredProducts.length === 1 ? "" : "s"}
          </p>

          <p className="text-sm text-white/45">
            Category:{" "}
            <span className="font-semibold text-[#d47828]">
              {selectedCategory}
            </span>
          </p>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {filteredProducts.map((product) => (
              <MerchProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="rounded-[28px] border border-white/10 bg-white/[0.035] px-6 py-16 text-center backdrop-blur-xl">
            <h3 className="text-2xl font-bold text-white">
              No products found
            </h3>
            <p className="mt-3 text-sm text-white/55">
              Please select another merchandise category.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}