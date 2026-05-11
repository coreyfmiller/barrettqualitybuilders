"use client"

import { useState } from "react"
import { Phone, Mail, MapPin, Send, Facebook } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

const contactInfo = [
  {
    icon: Phone,
    label: "Phone / Text",
    value: "506-647-5006",
    href: "tel:506-647-5006",
  },
  {
    icon: Mail,
    label: "Email",
    value: "barrettqualitybuilders@gmail.com",
    href: "mailto:barrettqualitybuilders@gmail.com",
  },
  {
    icon: MapPin,
    label: "Service Area",
    value: "Saint John & Fredericton, NB",
    href: null,
  },
  {
    icon: Facebook,
    label: "Facebook",
    value: "Follow us on Facebook",
    href: "https://facebook.com",
  },
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsSubmitting(false)
    setIsSubmitted(true)
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      message: "",
    })
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-primary text-primary-foreground py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="max-w-3xl">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-balance">
                Get in Touch
              </h1>
              <p className="mt-6 text-lg text-primary-foreground/80 leading-relaxed">
                Interested in a quote? Fill out our contact form, send us an
                email, call, or text. We provide quotes, not estimates, so you
                know exactly what you will be charged before work begins.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-20 lg:py-28 bg-background">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
              {/* Contact Info */}
              <div>
                <h2 className="text-2xl font-bold">Contact Information</h2>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  Need some guidance on your construction project? Feel free to
                  contact us with any questions you may have.
                </p>

                <div className="mt-8 space-y-6">
                  {contactInfo.map((item) => (
                    <div key={item.label} className="flex items-start gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-secondary-foreground flex-shrink-0">
                        <item.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">
                          {item.label}
                        </div>
                        {item.href ? (
                          <a
                            href={item.href}
                            target={item.href.startsWith("http") ? "_blank" : undefined}
                            rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                            className="text-foreground font-medium hover:underline"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <div className="text-foreground font-medium">
                            {item.value}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-12 p-6 bg-secondary rounded-lg">
                  <h3 className="font-semibold">Why Choose Us?</h3>
                  <ul className="mt-4 space-y-2 text-muted-foreground">
                    <li>• Over 100 decks and 250 fences built</li>
                    <li>• Engineering background ensures quality</li>
                    <li>• Quotes, not estimates</li>
                    <li>• Free consultations</li>
                  </ul>
                </div>
              </div>

              {/* Contact Form */}
              <div>
                <h2 className="text-2xl font-bold">Request a Free Quote</h2>
                <p className="mt-4 text-muted-foreground">
                  Please provide a brief description of the project you have in
                  mind and we will contact you with a quote.
                </p>

                {isSubmitted ? (
                  <div className="mt-8 p-6 bg-secondary rounded-lg text-center">
                    <div className="text-4xl mb-4">✓</div>
                    <h3 className="text-xl font-semibold">Thank You!</h3>
                    <p className="mt-2 text-muted-foreground">
                      We&apos;ve received your message and will get back to you
                      shortly.
                    </p>
                    <Button
                      className="mt-4"
                      variant="outline"
                      onClick={() => setIsSubmitted(false)}
                    >
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">
                          First Name <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="firstName"
                          required
                          value={formData.firstName}
                          onChange={(e) =>
                            setFormData({ ...formData, firstName: e.target.value })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">
                          Last Name <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="lastName"
                          required
                          value={formData.lastName}
                          onChange={(e) =>
                            setFormData({ ...formData, lastName: e.target.value })
                          }
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">
                        Email <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">
                        Project Description{" "}
                        <span className="text-destructive">*</span>
                      </Label>
                      <Textarea
                        id="message"
                        required
                        rows={5}
                        placeholder="Please describe the project you have in mind..."
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        "Sending..."
                      ) : (
                        <>
                          Submit Request
                          <Send className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
