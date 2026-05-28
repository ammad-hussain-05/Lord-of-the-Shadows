"use client"

import { useState } from "react"
import { Loader } from "@/components/loader"
import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { BookSeriesGrid } from "@/components/book-series-grid"
import { BooksCollage } from "@/components/books-collage"
import { AboutSection } from "@/components/about-section"
// import AdviceForAuthors from "@/components/advice-for-authors"
import { Footer } from "@/components/footer"


export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <>
      <Loader onComplete={() => setIsLoaded(true)} />
      
      <div
        className={`transition-opacity duration-500 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <Navigation />
        <main>
          <HeroSection />
          <BookSeriesGrid />
          <BooksCollage />
          <AboutSection />
        </main>
        <Footer />
      </div>
    </>
  )
}
