"use client"

import Image from "next/image"
import Link from "next/link"
import { useMemo, useState } from "react"
import {
  ArrowLeft,
  Check,
  CheckCircle2,
  ShoppingBag,
  Sparkles,
  ShieldCheck,
} from "lucide-react"
import type { MerchProduct } from "@/lib/merch-products"
import { useCartStore } from "@/store/cart-store"
import QuantitySelector from "@/components/quantity-selector"
import ProductOptionSelect from "@/components/product-option-select"

type ProductDetailViewProps = {
  product: MerchProduct
}

export default function ProductDetailView({ product }: ProductDetailViewProps) {
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
    }, 1500)
  }

  return (
    <section className="relative z-10 px-4 pb-20 pt-28 sm:px-6 lg:px-8 lg:pt-36">
      <div className="mx-auto max-w-7xl">
        <Link
          href="/shop"
          className="mb-10 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-white/70 backdrop-blur-xl transition hover:border-[#d47828]/50 hover:text-[#d47828]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Shop
        </Link>

        <div className="grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]">
          {/* Animated Product Visual */}
          <div className="product-detail-scene relative mx-auto flex w-full max-w-[560px] items-center justify-center">
            <div className="absolute inset-0 rounded-[46px] bg-[#d47828]/25 blur-[100px]" />

            <div className="product-detail-rotating-card relative w-full overflow-hidden rounded-[46px] border border-[#d47828]/25 bg-white/[0.045] p-5 shadow-[0_35px_140px_rgba(0,0,0,0.75)] backdrop-blur-2xl">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,120,40,0.22),transparent_55%)]" />
              <div className="absolute bottom-[-140px] left-1/2 h-[320px] w-[320px] -translate-x-1/2 rounded-full bg-[#d47828]/20 blur-[100px]" />

              <div className="relative overflow-hidden rounded-[36px] border border-white/10 bg-black/45">
                <div className="relative aspect-[4/4.8] overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    priority
                    className="product-detail-image object-cover"
                    sizes="(max-width: 1024px) 90vw, 520px"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/15" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_35%,rgba(0,0,0,0.45)_100%)]" />

                  <div className="absolute left-5 top-5 rounded-full border border-[#d47828]/40 bg-black/60 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-[#d47828] backdrop-blur-md">
                    {product.category}
                  </div>

                  {product.featured && (
                    <div className="absolute right-5 top-5 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-white backdrop-blur-md">
                      Featured
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Product Information */}
          <div className="relative">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#d47828]/30 bg-[#d47828]/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-[#d47828] backdrop-blur-xl">
              <Sparkles className="h-4 w-4" />
              Official Character Merchandise
            </div>

            <h1 className="font-display text-4xl font-black leading-[0.96] tracking-tight text-white sm:text-5xl lg:text-7xl">
              {product.title}
            </h1>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-sm font-semibold text-white/70 backdrop-blur-xl">
                Character: <span className="text-[#d47828]">{product.character}</span>
              </span>

              <span className="rounded-full bg-[#d47828] px-5 py-2 text-sm font-black text-black">
                {formattedPrice}
              </span>
            </div>

            <p className="mt-7 max-w-2xl text-base leading-8 text-white/64 md:text-lg">
              {product.longDescription}
            </p>

            <div className="mt-8 grid gap-3">
              {product.highlights.map((highlight) => (
                <div
                  key={highlight}
                  className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.035] p-4 backdrop-blur-xl"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#d47828]" />
                  <p className="text-sm leading-6 text-white/70">{highlight}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 grid gap-4 rounded-[28px] border border-white/10 bg-white/[0.035] p-5 backdrop-blur-xl sm:grid-cols-2">
              {product.details.map((detail) => (
                <div key={detail.label}>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/40">
                    {detail.label}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-white/80">
                    {detail.value}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-[30px] border border-[#d47828]/20 bg-black/45 p-5 shadow-[0_20px_90px_rgba(0,0,0,0.35)] backdrop-blur-xl">
              <div className="mb-5 flex items-center gap-2 text-sm font-bold text-white">
                <ShieldCheck className="h-5 w-5 text-[#d47828]" />
                Select Options
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
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

              <div className="mt-6 grid gap-4 sm:grid-cols-[auto_1fr] sm:items-center">
  <QuantitySelector value={quantity} onChange={setQuantity} className="w-full justify-center sm:w-auto" />

  <button
    type="button"
    onClick={handleAddToCart}
    className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#d47828] px-6 py-3 text-sm font-black uppercase tracking-[0.14em] text-black transition hover:-translate-y-0.5 hover:bg-[#f0a14a] hover:shadow-[0_0_35px_rgba(212,120,40,0.45)]"
  >
                  {added ? (
                    <>
                      <Check className="h-4 w-4" />
                      Added to Cart
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
                <p className="mt-4 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                  {error}
                </p>
              )}

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
  <Link
    href="/cart"
    className="inline-flex min-h-12 w-full items-center justify-center rounded-full border border-white/15 bg-white/[0.04] px-6 py-3 text-sm font-bold uppercase tracking-[0.14em] text-white/80 transition hover:border-[#d47828]/60 hover:text-[#d47828]"
  >
    View Cart
  </Link>

  <Link
    href="/shop"
    className="inline-flex min-h-12 w-full items-center justify-center rounded-full border border-white/15 bg-white/[0.04] px-6 py-3 text-sm font-bold uppercase tracking-[0.14em] text-white/80 transition hover:border-[#d47828]/60 hover:text-[#d47828]"
  >
    Continue Shopping
  </Link>
</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}