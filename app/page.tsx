import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Phone, Shield, Award, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

const services = [
  {
    title: "Decks",
    description:
      "Custom pressure treated, cedar, and composite decks built to exceed building code requirements.",
    image: "/images/hero-deck.jpg",
    href: "/decks",
  },
  {
    title: "Fences",
    description:
      "Privacy and ornamental fences in pressure treated or cedar, built to last up to 35 years.",
    image: "/images/fence-cedar.jpg",
    href: "/fences",
  },
  {
    title: "Interiors",
    description:
      "Quality flooring, custom furniture, and shelving solutions for your home.",
    image: "/images/interior-flooring.jpg",
    href: "/interiors",
  },
]

const features = [
  {
    icon: Shield,
    title: "Engineered for Safety",
    description:
      "All projects built to National Building Code standards with safety and longevity as top priorities.",
  },
  {
    icon: Award,
    title: "100+ Decks Built",
    description:
      "Extensive experience with over 100 decks and 250 fences constructed to the highest standards.",
  },
  {
    icon: Clock,
    title: "Quotes, Not Estimates",
    description:
      "Know exactly what you will be charged before work begins. No surprises, just quality work.",
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/images/hero-deck.jpg"
              alt="Beautiful custom deck"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/60" />
          </div>

          <div className="relative mx-auto max-w-7xl px-4 py-24 sm:py-32 lg:px-8 lg:py-40">
            <div className="max-w-2xl">
              <h1 className="text-4xl font-bold tracking-tight text-primary-foreground sm:text-5xl lg:text-6xl text-balance">
                Come Home to Quality
              </h1>
              <p className="mt-6 text-lg text-primary-foreground/80 leading-relaxed max-w-xl">
                Specializing in custom decks, fences, and interior woodwork.
                Serving the greater Saint John and Fredericton areas with
                quality craftsmanship you can trust.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Button size="lg" variant="secondary" asChild>
                  <Link href="/contact">
                    Get a Free Quote
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-transparent text-primary-foreground border-primary-foreground/30 hover:bg-primary-foreground/10"
                  asChild
                >
                  <a href="tel:506-647-5006">
                    <Phone className="mr-2 h-4 w-4" />
                    506-647-5006
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-20 lg:py-28 bg-background">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-balance">
                Our Services
              </h2>
              <p className="mt-4 text-muted-foreground text-lg">
                Quality craftsmanship for every project, big or small.
              </p>
            </div>

            <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
              {services.map((service) => (
                <Link
                  key={service.title}
                  href={service.href}
                  className="group relative overflow-hidden rounded-lg bg-card border border-border transition-all hover:shadow-lg"
                >
                  <div className="aspect-[4/3] relative overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold">{service.title}</h3>
                    <p className="mt-2 text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>
                    <span className="mt-4 inline-flex items-center text-sm font-medium text-foreground group-hover:underline">
                      Learn more
                      <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 lg:py-28 bg-secondary">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {features.map((feature) => (
                <div key={feature.title} className="text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-6 text-lg font-semibold">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 lg:py-28 bg-primary text-primary-foreground">
          <div className="mx-auto max-w-7xl px-4 lg:px-8 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-balance">
              Ready to Start Your Project?
            </h2>
            <p className="mt-4 text-primary-foreground/80 text-lg max-w-2xl mx-auto">
              Contact us today for a free quote. We provide quotes, not
              estimates, so you know exactly what you will be charged before
              work begins.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/contact">Request a Free Quote</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent text-primary-foreground border-primary-foreground/30 hover:bg-primary-foreground/10"
                asChild
              >
                <Link href="/gallery">View Our Work</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
