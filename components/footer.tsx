import Link from "next/link"
import Image from "next/image"
import { Phone, Mail, MapPin, Facebook } from "lucide-react"

const navigation = {
  services: [
    { name: "Decks", href: "/decks" },
    { name: "Fences", href: "/fences" },
    { name: "Interiors", href: "/interiors" },
    { name: "Gallery", href: "/gallery" },
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
  ],
}

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Image
              src="/images/logo.png"
              alt="Barrett Quality Builders"
              width={180}
              height={48}
              className="h-10 w-auto brightness-0 invert"
            />
            <p className="mt-4 text-sm text-primary-foreground/70 leading-relaxed">
              Quality craftsmanship for decks, fences, and interior projects in
              the greater Saint John and Fredericton areas.
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold tracking-wide uppercase">
              Services
            </h3>
            <ul className="mt-4 space-y-3">
              {navigation.services.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold tracking-wide uppercase">
              Company
            </h3>
            <ul className="mt-4 space-y-3">
              {navigation.company.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold tracking-wide uppercase">
              Contact Us
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href="tel:506-647-5006"
                  className="flex items-center gap-2 text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  506-647-5006
                </a>
              </li>
              <li>
                <a
                  href="mailto:barrettqualitybuilders@gmail.com"
                  className="flex items-center gap-2 text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  barrettqualitybuilders@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-primary-foreground/70">
                <MapPin className="h-4 w-4 flex-shrink-0" />
                Saint John & Fredericton, NB
              </li>
              <li>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                >
                  <Facebook className="h-4 w-4" />
                  Follow us on Facebook
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-primary-foreground/10 pt-8">
          <p className="text-center text-sm text-primary-foreground/50">
            &copy; {new Date().getFullYear()} Barrett Quality Builders. All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
