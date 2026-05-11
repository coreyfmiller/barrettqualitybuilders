import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

const fenceTypes = [
  {
    title: "Pressure Treated Fences",
    description:
      "Our most durable option. A typical pressure treated fence can last up to 35 years with minimal maintenance. Available in fortress style for full privacy or with wire mesh for visibility.",
    image: "/images/fence-pressure-treated.jpg",
  },
  {
    title: "Cedar Fences",
    description:
      "Cedar offers a beautiful natural look with excellent longevity. Built with treated posts for durability. Available in various heights and styles to suit your needs.",
    image: "/images/fence-cedar.jpg",
  },
]

const fenceFeatures = [
  "Fortress style for full privacy",
  "Options from 4ft to 6ft heights",
  "Double gate options available",
  "6x6 posts available for extra durability",
  "Up to 35 years lifespan with minimal maintenance",
  "Custom designs available",
]

const fenceStyles = [
  "Six foot fortress style pressure treated fence",
  "Six foot fortress style cedar fence with treated posts",
  "Four foot cedar fence with double gate",
  "Pressure treated fence with black wire mesh",
]

export default function FencesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-primary text-primary-foreground py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="max-w-3xl">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-balance">
                Barrett Quality Fences
              </h1>
              <p className="mt-6 text-lg text-primary-foreground/80 leading-relaxed">
                Wooden fence designs range from full privacy to ornamental. We
                can build any style to suit your property and preferences.
              </p>
              <p className="mt-4 text-lg text-primary-foreground/80 leading-relaxed">
                With over 250 fences built, we have the experience to deliver
                quality results every time.
              </p>
              <Button size="lg" variant="secondary" className="mt-8" asChild>
                <Link href="/contact">
                  Get a Free Quote
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Fence Types Section */}
        <section className="py-20 lg:py-28 bg-background">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <h2 className="text-3xl font-bold tracking-tight text-center sm:text-4xl mb-16">
              Our Fence Options
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {fenceTypes.map((fence) => (
                <div
                  key={fence.title}
                  className="bg-card rounded-lg overflow-hidden border border-border"
                >
                  <div className="aspect-[4/3] relative">
                    <Image
                      src={fence.image}
                      alt={fence.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold">{fence.title}</h3>
                    <p className="mt-2 text-muted-foreground leading-relaxed">
                      {fence.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 lg:py-28 bg-secondary">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-balance">
                  Built to Last
                </h2>
                <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
                  Our most common privacy fence is a fortress style fence,
                  available in various height options. For an extra rugged and
                  longer lasting fence, 6x6 posts can be used.
                </p>
                <ul className="mt-8 space-y-4">
                  {fenceFeatures.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
                        <Check className="h-4 w-4" />
                      </div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="aspect-square relative overflow-hidden rounded-lg bg-muted flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="text-6xl font-bold text-primary">250+</div>
                  <p className="mt-2 text-xl text-muted-foreground">
                    Fences Built
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Styles Section */}
        <section className="py-20 lg:py-28 bg-background">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <h2 className="text-3xl font-bold tracking-tight text-center sm:text-4xl mb-8">
              Popular Styles
            </h2>
            <p className="text-center text-muted-foreground text-lg max-w-2xl mx-auto mb-12">
              We offer a variety of fence styles to match your property and
              preferences.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
              {fenceStyles.map((style) => (
                <div
                  key={style}
                  className="flex items-center gap-3 p-4 bg-card rounded-lg border border-border"
                >
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground flex-shrink-0">
                    <Check className="h-4 w-4" />
                  </div>
                  <span className="text-sm">{style}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 lg:py-28 bg-primary text-primary-foreground">
          <div className="mx-auto max-w-7xl px-4 lg:px-8 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-balance">
              Ready for Your New Fence?
            </h2>
            <p className="mt-4 text-primary-foreground/80 text-lg max-w-2xl mx-auto">
              Contact us today for a free quote. We provide quotes, not
              estimates, so you know exactly what you&apos;ll be charged before
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
