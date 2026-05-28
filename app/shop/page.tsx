import Link from "next/link"
import { ArrowRight, ShoppingBag, Sparkles, ShieldCheck } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { MerchGrid } from "@/components/merch-grid"

export default function ShopPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <Navigation />

    {/* Background Video */}
<div className="fixed inset-0 z-0 overflow-hidden">
  <video
    className="h-full w-full object-cover opacity-75 brightness-110 contrast-110 saturate-125"
    src="https://www.pexels.com/download/video/29718189/"
    autoPlay
    muted
    loop
    playsInline
  />

  {/* Softer dark overlay for text readability */}
  <div className="absolute inset-0 bg-black/35" />

  {/* Bottom fade only */}
  <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/85" />

  {/* Soft cinematic side vignette */}
  <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.55),transparent_35%,transparent_65%,rgba(0,0,0,0.55))]" />

  {/* Warm fantasy glow */}
  {/* <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,120,40,0.16),transparent_55%)]" /> */}
</div>

{/* Ambient Glow */}
{/* <div className="pointer-events-none fixed left-[-180px] top-20 z-0 h-[420px] w-[420px] rounded-full bg-[#d47828]/18 blur-[130px]" />
<div className="pointer-events-none fixed bottom-[-180px] right-[-160px] z-0 h-[520px] w-[520px] rounded-full bg-[#d47828]/12 blur-[150px]" /> */}

      {/* Hero Section */}
      <section className="relative z-10 flex min-h-screen items-center px-4 pt-24 sm:px-6 lg:px-8">
        <div className="mx-auto grid w-full max-w-7xl items-center gap-12 py-20 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#d47828]/30 bg-[#d47828]/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-[#d47828] backdrop-blur-xl">
              <Sparkles className="h-4 w-4" />
              Lord of the Shadows Store
            </div>

            <h1 className="font-display text-5xl font-black leading-[0.92] tracking-tight text-white sm:text-6xl lg:text-8xl">
              Wear the{" "}
              <span className="block italic text-[#d47828]">
                Shadows.
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-8 text-white/62 md:text-lg">
              Explore official character-inspired merchandise from the Lord of
              the Shadows universe. Discover mugs, t-shirts, and chains created
              for fans who want to carry the story beyond the page.
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <Link
                href="#merchandise"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#d47828] px-8 py-4 text-sm font-black uppercase tracking-[0.14em] text-black transition hover:-translate-y-1 hover:shadow-[0_0_42px_rgba(212,120,40,0.55)]"
              >
                Shop Merch
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/cart"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-8 py-4 text-sm font-bold uppercase tracking-[0.14em] text-white backdrop-blur-xl transition hover:-translate-y-1 hover:border-[#d47828]/70 hover:text-[#d47828]"
              >
                <ShoppingBag className="h-4 w-4" />
                View Cart
              </Link>
            </div>

            <div className="mt-12 grid gap-4 sm:grid-cols-3">
              <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl">
                <p className="text-3xl font-black text-white">03</p>
                <p className="mt-1 text-xs uppercase tracking-[0.18em] text-white/45">
                  Categories
                </p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl">
                <p className="text-3xl font-black text-white">24+</p>
                <p className="mt-1 text-xs uppercase tracking-[0.18em] text-white/45">
                  Merch Items
                </p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl">
                <p className="text-3xl font-black text-white">100%</p>
                <p className="mt-1 text-xs uppercase tracking-[0.18em] text-white/45">
                  Fan Inspired
                </p>
              </div>
            </div>
          </div>
{/* Hero Feature Card */}
<div className="shop-card-scene relative flex items-center justify-center">
  <div className="absolute inset-0 rounded-[42px] bg-[#d47828]/30 blur-[90px]" />

  <div className="shop-rotating-card relative w-full max-w-[580px] overflow-hidden rounded-[42px] border border-white/15 bg-white/[0.06] p-5 shadow-[0_35px_140px_rgba(0,0,0,0.75)] backdrop-blur-2xl">
    <div className="absolute inset-0 z-0 overflow-hidden rounded-[42px]">
      <video
        className="shop-card-video h-full w-full object-cover opacity-85 brightness-125 contrast-125 saturate-150"
        src="https://www.pexels.com/download/video/37641694/"
        autoPlay
        muted
        loop
        playsInline
      />

      {/* <div className="absolute inset-0 bg-black/20" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/55" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,120,40,0.10),transparent_62%)]" /> */}
    </div>

    <div className="relative z-10 overflow-hidden rounded-[32px] border border-[#d47828]/25 bg-black/35 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-md md:p-7">
      <div className="absolute right-[-90px] top-[-90px] h-64 w-64 rounded-full bg-[#d47828]/20 blur-[80px]" />
      <div className="absolute bottom-[-110px] left-[-90px] h-72 w-72 rounded-full bg-white/10 blur-[95px]" />

      <div className="relative z-10">
        <div className="mb-7 flex items-center justify-between">
          <div className="rounded-full border border-[#d47828]/40 bg-[#d47828]/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-[#d47828] shadow-[0_0_25px_rgba(212,120,40,0.18)]">
            Featured Drop
          </div>

          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d47828]/35 bg-black/45 text-[#d47828] shadow-[0_0_22px_rgba(212,120,40,0.18)]">
            <ShieldCheck className="h-5 w-5" />
          </div>
        </div>

        <h2 className="font-display text-3xl font-black leading-tight text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)] md:text-5xl">
          Character Merch Collection
        </h2>

        <p className="mt-5 text-sm leading-7 text-white/75">
          Filter by mugs, t-shirts, and chains. Each product is organized by
          character so fans can easily find their favorite design.
        </p>

        <div className="mt-8 grid gap-4">
          <div className="group flex items-center justify-between rounded-2xl border border-white/10 bg-black/45 p-4 transition hover:-translate-y-1 hover:border-[#d47828]/50 hover:bg-[#d47828]/10">
            <span className="text-sm font-semibold text-white">Mugs</span>
            <span className="rounded-full bg-[#d47828] px-3 py-1 text-xs font-bold text-black transition group-hover:scale-105">
              Shop Cups
            </span>
          </div>

          <div className="group flex items-center justify-between rounded-2xl border border-white/10 bg-black/45 p-4 transition hover:-translate-y-1 hover:border-[#d47828]/50 hover:bg-[#d47828]/10">
            <span className="text-sm font-semibold text-white">T-Shirts</span>
            <span className="rounded-full bg-[#d47828] px-3 py-1 text-xs font-bold text-black transition group-hover:scale-105">
              Wearable
            </span>
          </div>

          <div className="group flex items-center justify-between rounded-2xl border border-white/10 bg-black/45 p-4 transition hover:-translate-y-1 hover:border-[#d47828]/50 hover:bg-[#d47828]/10">
            <span className="text-sm font-semibold text-white">Chains</span>
            <span className="rounded-full bg-[#d47828] px-3 py-1 text-xs font-bold text-black transition group-hover:scale-105">
              Collectible
            </span>
          </div>
        </div>

        <Link
          href="#merchandise"
          className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-6 py-4 text-sm font-black uppercase tracking-[0.14em] text-black transition hover:-translate-y-1 hover:bg-[#d47828] hover:shadow-[0_0_35px_rgba(212,120,40,0.45)]"
        >
          Explore Collection
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  </div>
</div>
        </div>
      </section>

      {/* Merchandise Grid */}
      <div id="merchandise" className="relative z-10">
        <MerchGrid />
      </div>

      {/* Bottom CTA */}
      <section className="relative z-10 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[36px] border border-[#d47828]/20 bg-white/[0.045] p-8 text-center backdrop-blur-2xl md:p-14">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#d47828] text-black">
            <ShoppingBag className="h-7 w-7" />
          </div>

          <h2 className="font-display text-3xl font-bold text-white md:text-5xl">
            Build Your Shadow Collection
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-white/58 md:text-base">
            Add your favorite character merchandise to cart and review your
            selected items before checkout is connected in the next phase.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="#merchandise"
              className="inline-flex items-center justify-center rounded-full bg-[#d47828] px-8 py-4 text-sm font-black uppercase tracking-[0.14em] text-black transition hover:-translate-y-1 hover:shadow-[0_0_35px_rgba(212,120,40,0.45)]"
            >
              Continue Shopping
            </Link>

            <Link
              href="/cart"
              className="inline-flex items-center justify-center rounded-full border border-white/15 bg-black/35 px-8 py-4 text-sm font-bold uppercase tracking-[0.14em] text-white backdrop-blur-xl transition hover:border-[#d47828]/70 hover:text-[#d47828]"
            >
              View Cart
            </Link>
          </div>
        </div>
      </section>

      <div className="relative z-10 bg-black/80">
        <Footer />
      </div>
    </main>
  )
}