"use client"

import Image from "next/image"
import Link from "next/link"
import { useMemo, useState } from "react"
import { ShoppingBag, Check, ArrowUpRight } from "lucide-react"
import type { MerchProduct } from "@/lib/merch-products"
import { useCartStore } from "@/store/cart-store"
import QuantitySelector from "@/components/quantity-selector"
import ProductOptionSelect from "@/components/product-option-select"

type MerchProductCardProps = {
  product: MerchProduct
}

export default function MerchProductCard({ product }: MerchProductCardProps) {
  const addToCart = useCartStore((state) => state.addToCart)

  const [quantity, setQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState("")
  const [selectedColor, setSelectedColor] = useState("")
  const [error, setError] = useState("")
  const [added, setAdded] = useState(false)

  const hasSizes = Boolean(product.sizes && product.sizes.length > 0)
  const hasColors = Boolean(product.colors && product.colors.length > 0)

  const formattedPrice = useMemo(() => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(product.price)
  }, [product.price])

  const productHref = `/shop/${product.slug}`

  const handleAddToCart = () => {
    setError("")

    if (hasSizes && !selectedSize) {
      setError("Please select a size before adding this item.")
      return
    }

    if (hasColors && !selectedColor) {
      setError("Please select a color before adding this item.")
      return
    }

    addToCart({
      product,
      quantity,
      selectedSize: selectedSize || undefined,
      selectedColor: selectedColor || undefined,
    })

    setAdded(true)

    window.setTimeout(() => {
      setAdded(false)
    }, 1400)
  }

  return (
    <article className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.035] shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl transition duration-300 hover:-translate-y-2 hover:border-[#d47828]/50 hover:shadow-[0_25px_100px_rgba(212,120,40,0.16)]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,120,40,0.20),transparent_42%)] opacity-0 transition duration-300 group-hover:opacity-100" />

      <div className="relative">
        <Link
          href={productHref}
          className="relative block aspect-[4/4.6] overflow-hidden bg-black/40"
          aria-label={`View details for ${product.title}`}
        >
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />

          <div className="absolute left-4 top-4 rounded-full border border-[#d47828]/40 bg-black/60 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[#d47828] backdrop-blur-md">
            {product.category}
          </div>

          {product.featured && (
            <div className="absolute right-4 top-4 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-md">
              Featured
            </div>
          )}

         
        </Link>

        <Link
  href={productHref}
  className="mx-5 mt-5 flex items-center justify-between gap-3 rounded-2xl border border-[#d47828]/35 bg-black/55 px-4 py-3 shadow-[0_12px_40px_rgba(0,0,0,0.35)] backdrop-blur-xl transition duration-300 hover:border-[#d47828]/70 hover:bg-[#d47828]/10"
>
  <span className="text-[11px] font-black uppercase tracking-[0.18em] text-[#d47828]">
    View Product Details
  </span>

  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#d47828] text-black transition hover:scale-105">
    <ArrowUpRight className="h-4 w-4 stroke-[2.8]" />
  </span>
</Link>

        <div className="relative z-10 space-y-5 p-5 md:p-6">
          <div>
            <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-white/45">
              {product.character}
            </p>

            <div className="flex items-start justify-between gap-4">
              <Link href={productHref} className="group/title">
                <h3 className="text-xl font-bold leading-tight text-white transition group-hover/title:text-[#d47828]">
                  {product.title}
                </h3>
              </Link>

              <p className="shrink-0 rounded-full bg-[#d47828] px-3 py-1 text-sm font-bold text-black">
                {formattedPrice}
              </p>
            </div>

            <p className="mt-3 line-clamp-2 text-sm leading-6 text-white/58">
              {product.description}
            </p>
          </div>

          <div className="grid gap-3">
            {hasSizes && (
              <ProductOptionSelect
                label="Size"
                value={selectedSize}
                options={product.sizes || []}
                placeholder="Choose size"
                onChange={setSelectedSize}
                required
              />
            )}

            {hasColors && (
              <ProductOptionSelect
                label="Color"
                value={selectedColor}
                options={product.colors || []}
                placeholder="Choose color"
                onChange={setSelectedColor}
                required
              />
            )}
          </div>

          <div className="flex items-center justify-between gap-4">
            <QuantitySelector value={quantity} onChange={setQuantity} />

            <button
              type="button"
              onClick={handleAddToCart}
              className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-full bg-[#d47828] px-5 text-sm font-bold text-black transition hover:-translate-y-0.5 hover:shadow-[0_0_30px_rgba(212,120,40,0.45)]"
            >
              {added ? (
                <>
                  <Check className="h-4 w-4" />
                  Added
                </>
              ) : (
                <>
                  <ShoppingBag className="h-4 w-4" />
                  Add to Cart
                </>
              )}
            </button>
          </div>

          {error && (
            <p className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-xs text-red-200">
              {error}
            </p>
          )}
        </div>
      </div>
    </article>
  )
}