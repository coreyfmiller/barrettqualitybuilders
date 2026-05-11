import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

const deckTypes = [
  {
    title: "Pressure Treated Decks",
    description:
      "The most commonly used form of decking. We hand pick every piece of lumber for our decks to ensure a uniform colour and quality finish. A stain or clear protective finish is recommended 30-60 days after installation.",
    image: "/downloaded-images-named/decks/01-pressure-treated-decks.jpg",
  },
  {
    title: "Cedar Decks",
    description:
      "Cedar decking offers a more natural look and longevity. Western red cedar or locally sourced eastern cedar is available. Built on a pressure treated frame, our cedar decks offer beauty and durability.",
    image: "/downloaded-images-named/decks/10-cedar-decks.jpg",
  },
  {
    title: "Composite Decks",
    description:
      "A no maintenance alternative to wood decking. Available in a variety of colours and grades, these products offer excellent warranties and a high end look. Hidden fasteners provide a near seamless installation.",
    image: "/downloaded-images-named/decks/14-composite-decks.jpeg",
  },
]

const additionalServices = [
  {
    title: "Pool Decks",
    description: "From a full wrap around deck to basic access, we can do it all.",
    image: "/downloaded-images-named/decks/17-pool-decks.jpg",
  },
  {
    title: "Pergolas & Privacy Walls",
    description:
      "A great way to add shade to a deck or backyard. We offer many pergola designs and privacy screens.",
    image: "/downloaded-images-named/decks/31-pergolas-and-privacy-walls.jpg",
  },
]

const qualityFeatures = [
  "6x6 support posts for maximum stability",
  "Triple 2x10 beams for superior strength",
  "Engineered to exceed building code requirements",
  "Computer aided design available",
  "Custom designs to fit your vision",
  "Deck resurfacing options available",
]

export default function DecksPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-primary text-primary-foreground py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="max-w-3xl">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-balance">
                Barrett Quality Decks
              </h1>
              <p className="mt-6 text-lg text-primary-foreground/80 leading-relaxed">
                All of our decks are designed using the National Building Code
                of Canada and in accordance to your local municipality&apos;s
                bylaws. Safety and longevity are our top priorities and our end
                products often exceed building code requirements.
              </p>
              <p className="mt-4 text-lg text-primary-foreground/80 leading-relaxed">
                With over one hundred decks of experience we are not just
                another handyman.
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

        {/* Deck Types Section */}
        <section className="py-20 lg:py-28 bg-background">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <h2 className="text-3xl font-bold tracking-tight text-center sm:text-4xl mb-16">
              Our Deck Options
            </h2>

            <div className="space-y-20">
              {deckTypes.map((deck, index) => (
                <div
                  key={deck.title}
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                    index % 2 === 1 ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                    <div className="aspect-[4/3] relative overflow-hidden rounded-lg">
                      <Image
                        src={deck.image}
                        alt={deck.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                    <h3 className="text-2xl font-bold">{deck.title}</h3>
                    <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
                      {deck.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Additional Services */}
        <section className="py-20 lg:py-28 bg-secondary">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <h2 className="text-3xl font-bold tracking-tight text-center sm:text-4xl mb-16">
              Additional Services
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {additionalServices.map((service) => (
                <div
                  key={service.title}
                  className="bg-card rounded-lg overflow-hidden border border-border"
                >
                  <div className="aspect-[16/9] relative">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold">{service.title}</h3>
                    <p className="mt-2 text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quality Section */}
        <section className="py-20 lg:py-28 bg-background">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-balance">
                  What Is Holding You Up?
                </h2>
                <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
                  All of our decks are engineered to last. We only use 6x6
                  support posts and triple 2x10 beams. This provides a more
                  substantial support system compared to typical deck
                  construction.
                </p>
                <ul className="mt-8 space-y-4">
                  {qualityFeatures.map((feature) => (
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
                  <div className="text-6xl font-bold text-primary">100+</div>
                  <p className="mt-2 text-xl text-muted-foreground">
                    Decks Built
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 lg:py-28 bg-primary text-primary-foreground">
          <div className="mx-auto max-w-7xl px-4 lg:px-8 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-balance">
              Have Something in Mind?
            </h2>
            <p className="mt-4 text-primary-foreground/80 text-lg max-w-2xl mx-auto">
              Feel free to contact us for a consultation and we will work with
              you to design your dream project. Computer aided design can help
              you envision your project before construction begins.
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
