import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

const interiorServices = [
  {
    title: "Flooring",
    description:
      "Professional hardwood, laminate, and vinyl flooring installation. We ensure precision cuts and seamless finishes for a beautiful result that will last for years.",
    image: "/images/interior-flooring.jpg",
  },
  {
    title: "Custom Furniture",
    description:
      "Handcrafted furniture pieces built to your specifications. From tables to entertainment centers, we create functional art for your home.",
    image: "/images/custom-shelving.jpg",
  },
  {
    title: "Custom Shelving",
    description:
      "Built-in shelving solutions designed to maximize your space. Perfect for home offices, living rooms, and closets.",
    image: "/images/custom-shelving.jpg",
  },
]

const interiorFeatures = [
  "Quality craftsmanship",
  "Custom designs to fit your space",
  "Professional installation",
  "Variety of wood options available",
  "Attention to detail",
  "Competitive pricing",
]

export default function InteriorsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-primary text-primary-foreground py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="max-w-3xl">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-balance">
                Interior Woodwork
              </h1>
              <p className="mt-6 text-lg text-primary-foreground/80 leading-relaxed">
                Bring the same quality craftsmanship that goes into our outdoor
                projects inside your home. From flooring to custom furniture, we
                create beautiful interior spaces.
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

        {/* Services Section */}
        <section className="py-20 lg:py-28 bg-background">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <h2 className="text-3xl font-bold tracking-tight text-center sm:text-4xl mb-16">
              Our Interior Services
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {interiorServices.map((service) => (
                <div
                  key={service.title}
                  className="bg-card rounded-lg overflow-hidden border border-border"
                >
                  <div className="aspect-[4/3] relative">
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

        {/* Features Section */}
        <section className="py-20 lg:py-28 bg-secondary">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-balance">
                  Same Quality, Indoors
                </h2>
                <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
                  The same attention to detail and quality craftsmanship that
                  goes into our deck and fence projects is applied to every
                  interior project we undertake.
                </p>
                <ul className="mt-8 space-y-4">
                  {interiorFeatures.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
                        <Check className="h-4 w-4" />
                      </div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="aspect-[4/3] relative overflow-hidden rounded-lg">
                <Image
                  src="/images/interior-flooring.jpg"
                  alt="Interior flooring"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 lg:py-28 bg-primary text-primary-foreground">
          <div className="mx-auto max-w-7xl px-4 lg:px-8 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-balance">
              Transform Your Interior
            </h2>
            <p className="mt-4 text-primary-foreground/80 text-lg max-w-2xl mx-auto">
              Contact us today to discuss your interior project. Whether
              it&apos;s new flooring or custom furniture, we&apos;re here to
              help.
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
