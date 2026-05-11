import Link from "next/link"
import Image from "next/image"
import { ArrowRight, GraduationCap, Hammer, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

const stats = [
  { label: "Decks Built", value: "100+" },
  { label: "Fences Built", value: "250+" },
  { label: "Years Experience", value: "10+" },
  { label: "Satisfied Clients", value: "300+" },
]

const values = [
  {
    icon: GraduationCap,
    title: "Engineering Background",
    description:
      "A UNB Forest Engineering degree means every project is designed with safety and longevity in mind, exceeding building code requirements.",
  },
  {
    icon: Hammer,
    title: "Hands-On Experience",
    description:
      "Four years working for a reputable deck and fence contractor, plus years of independent work, ensures professional results every time.",
  },
  {
    icon: MapPin,
    title: "Local Service",
    description:
      "Proudly serving the greater Saint John and Fredericton areas, with flexibility to work in other parts of New Brunswick.",
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-primary text-primary-foreground py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="max-w-3xl">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-balance">
                About Us
              </h1>
              <p className="mt-6 text-lg text-primary-foreground/80 leading-relaxed">
                Barrett Quality Builders was created to provide our clients with
                quality craftsmanship for common household projects. Specializing
                in decks and fences, we have the experience and expertise to
                construct long lasting, well engineered structures.
              </p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-background border-b border-border">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-4xl font-bold text-primary">
                    {stat.value}
                  </div>
                  <div className="mt-2 text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About Michael Section */}
        <section className="py-20 lg:py-28 bg-background">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Michael Barrett, BScFE
                </h2>
                <p className="mt-6 text-muted-foreground text-lg leading-relaxed">
                  As a UNB Forest Engineering graduate, I have excelled in
                  several design courses including wood design and wood
                  technology. With this engineering background I am able to
                  ensure that all of my projects are built with safety and
                  longevity in mind.
                </p>
                <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
                  Having spent four years working for a reputable deck and fence
                  contractor, I have built over 100 decks and at least 250
                  fences. Now that I have branched out on my own, I am excited
                  to use my carpentry and design experience to provide clients
                  with a variety of services with quality construction.
                </p>
                <Button size="lg" className="mt-8" asChild>
                  <Link href="/contact">
                    Get in Touch
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <div className="aspect-square relative overflow-hidden rounded-lg">
                <Image
                  src="/downloaded-images-named/about/02-michael-barrett-bscfe.jpeg"
                  alt="Michael Barrett, BScFE - Forest Engineering Graduate"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 lg:py-28 bg-secondary">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <h2 className="text-3xl font-bold tracking-tight text-center sm:text-4xl mb-16">
              Why Choose Us
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {values.map((value) => (
                <div key={value.title} className="text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <value.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-6 text-lg font-semibold">{value.title}</h3>
                  <p className="mt-2 text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Service Area Section */}
        <section className="py-20 lg:py-28 bg-background">
          <div className="mx-auto max-w-7xl px-4 lg:px-8 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-balance">
              Serving New Brunswick
            </h2>
            <p className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto">
              We are happy to offer our services in the greater Saint John and
              Fredericton areas. We are always willing to branch out and offer
              our services in other parts of New Brunswick as well.
            </p>
            <div className="mt-8 flex flex-wrap gap-4 justify-center">
              <span className="px-4 py-2 bg-secondary rounded-full text-sm font-medium">
                Saint John
              </span>
              <span className="px-4 py-2 bg-secondary rounded-full text-sm font-medium">
                Fredericton
              </span>
              <span className="px-4 py-2 bg-secondary rounded-full text-sm font-medium">
                Greater New Brunswick
              </span>
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
            <Button size="lg" variant="secondary" className="mt-8" asChild>
              <Link href="/contact">Request a Free Quote</Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
