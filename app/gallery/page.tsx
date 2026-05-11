"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

const galleryItems = [
  {
    src: "/images/hero-deck.jpg",
    alt: "Beautiful custom deck",
    category: "Decks",
  },
  {
    src: "/images/pressure-treated-deck.jpg",
    alt: "Pressure treated deck",
    category: "Decks",
  },
  {
    src: "/images/composite-deck.jpg",
    alt: "Composite deck",
    category: "Decks",
  },
  {
    src: "/images/pool-deck.jpg",
    alt: "Pool deck",
    category: "Decks",
  },
  {
    src: "/images/pergola.jpg",
    alt: "Pergola",
    category: "Decks",
  },
  {
    src: "/images/fence-cedar.jpg",
    alt: "Cedar fence",
    category: "Fences",
  },
  {
    src: "/images/fence-pressure-treated.jpg",
    alt: "Pressure treated fence",
    category: "Fences",
  },
  {
    src: "/images/interior-flooring.jpg",
    alt: "Interior flooring",
    category: "Interiors",
  },
  {
    src: "/images/custom-shelving.jpg",
    alt: "Custom shelving",
    category: "Interiors",
  },
]

const categories = ["All", "Decks", "Fences", "Interiors"]

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [lightboxImage, setLightboxImage] = useState<string | null>(null)

  const filteredItems =
    activeCategory === "All"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory)

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-primary text-primary-foreground py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-4 lg:px-8 text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Our Work
            </h1>
            <p className="mt-6 text-lg text-primary-foreground/80 max-w-2xl mx-auto">
              Browse our portfolio of completed projects. Each project showcases
              our commitment to quality craftsmanship.
            </p>
          </div>
        </section>

        {/* Filter Tabs */}
        <section className="py-8 border-b border-border bg-background sticky top-[73px] z-40">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeCategory === category
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="py-16 lg:py-24 bg-background">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setLightboxImage(item.src)}
                  className="group relative aspect-[4/3] overflow-hidden rounded-lg cursor-pointer"
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/30 transition-colors flex items-end">
                    <div className="p-4 text-left opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-primary-foreground text-sm font-medium bg-primary/80 px-2 py-1 rounded">
                        {item.category}
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 lg:py-28 bg-secondary">
          <div className="mx-auto max-w-7xl px-4 lg:px-8 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-balance">
              Like What You See?
            </h2>
            <p className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto">
              Contact us today to discuss your project. We&apos;d love to add
              your project to our portfolio.
            </p>
            <Button size="lg" className="mt-8" asChild>
              <Link href="/contact">Request a Free Quote</Link>
            </Button>
          </div>
        </section>
      </main>

      {/* Lightbox */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 bg-primary/95 flex items-center justify-center p-4"
          onClick={() => setLightboxImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-primary-foreground hover:text-primary-foreground/80 transition-colors"
            onClick={() => setLightboxImage(null)}
          >
            <X className="h-8 w-8" />
            <span className="sr-only">Close</span>
          </button>
          <div className="relative w-full max-w-5xl aspect-[16/10]">
            <Image
              src={lightboxImage}
              alt="Gallery image"
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}
