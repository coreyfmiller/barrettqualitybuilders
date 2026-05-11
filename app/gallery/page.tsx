"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

const galleryImages = [
  "/downloaded-images-named/gallery/01-gallery.jpg",
  "/downloaded-images-named/gallery/02-gallery.jpg",
  "/downloaded-images-named/gallery/03-gallery.jpg",
  "/downloaded-images-named/gallery/04-gallery.jpg",
  "/downloaded-images-named/gallery/05-gallery.jpg",
  "/downloaded-images-named/gallery/06-gallery.png",
  "/downloaded-images-named/gallery/08-gallery.jpg",
  "/downloaded-images-named/gallery/11-gallery.jpg",
  "/downloaded-images-named/gallery/12-gallery.jpg",
  "/downloaded-images-named/gallery/13-gallery.jpg",
  "/downloaded-images-named/gallery/14-gallery.jpg",
  "/downloaded-images-named/gallery/15-gallery.jpg",
  "/downloaded-images-named/gallery/16-gallery.jpg",
  "/downloaded-images-named/gallery/17-gallery.jpg",
  "/downloaded-images-named/gallery/19-gallery.jpg",
  "/downloaded-images-named/gallery/20-gallery.jpg",
  "/downloaded-images-named/gallery/21-gallery.jpg",
  "/downloaded-images-named/gallery/22-gallery.jpg",
  "/downloaded-images-named/gallery/23-gallery.jpg",
  "/downloaded-images-named/gallery/26-gallery.jpg",
  "/downloaded-images-named/gallery/27-gallery.jpg",
  "/downloaded-images-named/gallery/28-gallery.jpg",
  "/downloaded-images-named/gallery/29-gallery.jpg",
  "/downloaded-images-named/gallery/31-gallery.jpg",
  "/downloaded-images-named/gallery/32-gallery.jpg",
  "/downloaded-images-named/gallery/33-gallery.jpg",
  "/downloaded-images-named/gallery/34-gallery.jpg",
  "/downloaded-images-named/gallery/36-gallery.jpg",
  "/downloaded-images-named/gallery/37-gallery.jpg",
  "/downloaded-images-named/gallery/41-gallery.jpg",
  "/downloaded-images-named/gallery/46-gallery.jpg",
  "/downloaded-images-named/gallery/47-gallery.jpg",
  "/downloaded-images-named/gallery/49-gallery.jpg",
  "/downloaded-images-named/gallery/53-gallery.jpg",
  "/downloaded-images-named/gallery/54-gallery.jpg",
]

export default function GalleryPage() {
  const [lightboxImage, setLightboxImage] = useState<string | null>(null)

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

        {/* Gallery Grid */}
        <section className="py-16 lg:py-24 bg-background">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {galleryImages.map((src, index) => (
                <button
                  key={index}
                  onClick={() => setLightboxImage(src)}
                  className="group relative aspect-[4/3] overflow-hidden rounded-lg cursor-pointer"
                >
                  <Image
                    src={src}
                    alt={`Project photo ${index + 1}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-colors" />
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
