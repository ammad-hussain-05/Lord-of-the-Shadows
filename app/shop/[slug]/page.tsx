import { notFound } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import {
  getProductBySlug,
  getRelatedProducts,
  merchProducts,
} from "@/lib/merch-products"
import ProductDetailView from "@/components/product-detail-view"
import ExploreMoreProducts from "@/components/explore-more-products"

type ProductPageProps = {
  params: Promise<{
    slug: string
  }>
}

export function generateStaticParams() {
  return merchProducts.map((product) => ({
    slug: product.slug,
  }))
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params

  const product = getProductBySlug(slug)

  if (!product) {
    notFound()
  }

  const relatedProducts = getRelatedProducts(product.slug, product.category)

  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <Navigation />

      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(212,120,40,0.20),transparent_38%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(212,120,40,0.14),transparent_42%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black" />
      </div>

      <ProductDetailView product={product} />

      <ExploreMoreProducts
        products={relatedProducts}
        currentProductSlug={product.slug}
      />

      <div className="relative z-10 bg-black/80">
        <Footer />
      </div>
    </main>
  )
}