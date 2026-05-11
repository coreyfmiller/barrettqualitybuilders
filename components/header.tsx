"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { Menu, X, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"

const navigation = [
  { name: "Home", href: "/" },
  { name: "Decks", href: "/decks" },
  { name: "Fences", href: "/fences" },
  { name: "Interiors", href: "/interiors" },
  { name: "Gallery", href: "/gallery" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b border-border">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="Barrett Quality Builders"
            width={360}
            height={96}
            className="h-20 w-auto"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex lg:items-center lg:gap-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* CTA Button */}
        <div className="hidden lg:flex lg:items-center lg:gap-4">
          <a
            href="tel:506-647-5006"
            className="flex items-center gap-2 text-sm font-medium text-foreground"
          >
            <Phone className="h-4 w-4" />
            506-647-5006
          </a>
          <Button asChild>
            <Link href="/contact">Get a Quote</Link>
          </Button>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          className="lg:hidden inline-flex items-center justify-center rounded-md p-2 text-foreground"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span className="sr-only">Open main menu</span>
          {mobileMenuOpen ? (
            <X className="h-6 w-6" aria-hidden="true" />
          ) : (
            <Menu className="h-6 w-6" aria-hidden="true" />
          )}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-border">
          <div className="space-y-1 px-4 py-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block py-2 text-base font-medium text-foreground/80 hover:text-foreground"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-4 space-y-3">
              <a
                href="tel:506-647-5006"
                className="flex items-center gap-2 text-base font-medium text-foreground"
              >
                <Phone className="h-5 w-5" />
                506-647-5006
              </a>
              <Button asChild className="w-full">
                <Link href="/contact">Get a Quote</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
