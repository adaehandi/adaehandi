import Link from 'next/link'
import { ArrowRight, ChefHat, Users, Calendar, Award, Star, CheckCircle } from 'lucide-react'

// Stats data
const stats = [
  { value: '27+', label: 'Years of Excellence', icon: Calendar },
  { value: '5000+', label: 'Events Catered', icon: Users },
  { value: '100%', label: 'Client Satisfaction', icon: Award },
]

// Services overview
const services = [
  {
    title: 'Wedding Catering',
    description:
      'Make your special day unforgettable with our exquisite wedding menus and impeccable service.',
    href: '/services/wedding-catering',
    image: '/images/placeholders/wedding.jpg',
  },
  {
    title: 'Corporate Events',
    description:
      'Professional catering solutions for meetings, conferences, and corporate celebrations.',
    href: '/services/corporate-events',
    image: '/images/placeholders/corporate.jpg',
  },
  {
    title: 'Private Parties',
    description:
      'From intimate gatherings to grand celebrations, we cater to all your party needs.',
    href: '/services/private-parties',
    image: '/images/placeholders/party.jpg',
  },
]

// Why choose us points
const whyChooseUs = [
  'Authentic North Indian flavors with 27 years of expertise',
  'Fully customizable menus for all dietary preferences',
  'FSSAI certified with highest quality standards',
  'Flexible packages for events of all sizes (25+ guests)',
  'Complete event solutions including decoration & service',
]

export default function HomePage(): React.ReactElement {
  return (
    <>
      {/* Hero Section */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <div className="from-navy-700/70 via-navy-700/50 to-navy-700/80 absolute inset-0 z-10 bg-gradient-to-b" />
          {/* Placeholder background - replace with actual hero image */}
          <div className="bg-navy-600 h-full w-full" />
        </div>

        {/* Hero Content */}
        <div className="relative z-20 mx-auto max-w-7xl px-4 py-32 text-center sm:px-6 lg:px-8">
          <p className="text-gold-500 mb-4 text-sm font-medium tracking-widest uppercase">
            Since 1998 • Delhi NCR
          </p>
          <h1 className="mb-6 font-serif text-4xl font-bold text-white sm:text-5xl md:text-6xl lg:text-7xl">
            New-Age
            <span className="text-gold-500 block">Catering</span>
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-lg text-white/90 sm:text-xl">
            Authentic North Indian cuisine crafted with passion and perfection. From intimate
            gatherings to grand celebrations, we bring culinary excellence to every event.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/menu"
              className="bg-gold-500 text-navy-700 shadow-gold hover:bg-gold-600 inline-flex items-center gap-2 rounded-full px-8 py-4 text-lg font-semibold transition-all hover:shadow-lg"
            >
              Explore Our Menu
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="/get-quote"
              className="hover:text-navy-700 inline-flex items-center gap-2 rounded-full border-2 border-white px-8 py-4 text-lg font-semibold text-white transition-all hover:bg-white"
            >
              Get a Quote
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2">
          <div className="flex flex-col items-center gap-2 text-white/60">
            <span className="text-xs tracking-widest uppercase">Scroll</span>
            <div className="h-12 w-0.5 animate-pulse bg-gradient-to-b from-white/60 to-transparent" />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-30 -mt-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="shadow-elegant-lg grid gap-6 rounded-2xl bg-white p-8 sm:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="bg-gold-500/10 mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full">
                  <stat.icon className="text-gold-600 h-6 w-6" />
                </div>
                <p className="text-navy-600 font-serif text-3xl font-bold sm:text-4xl">
                  {stat.value}
                </p>
                <p className="text-navy-400 mt-1 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Preview Section */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Image */}
            <div className="relative">
              <div className="bg-navy-100 aspect-[4/3] overflow-hidden rounded-2xl">
                {/* Placeholder - replace with actual image */}
                <div className="flex h-full items-center justify-center">
                  <ChefHat className="text-navy-200 h-24 w-24" />
                </div>
              </div>
              {/* Decorative element */}
              <div className="border-gold-500/30 absolute -right-6 -bottom-6 -z-10 h-full w-full rounded-2xl border-2" />
            </div>

            {/* Content */}
            <div>
              <p className="text-gold-600 mb-2 text-sm font-medium tracking-widest uppercase">
                Our Story
              </p>
              <h2 className="text-navy-700 mb-6 font-serif text-3xl font-bold sm:text-4xl">
                27 Years of Culinary Excellence
              </h2>
              <p className="text-navy-600/80 mb-6 text-lg leading-relaxed">
                Ada-e-Haandi has been a pioneer in the catering business since 1998. With over two
                decades of perfection, steady growth, and mouth-watering cuisine, we have built a
                reputation for delivering excellence.
              </p>
              <p className="text-navy-600/80 mb-8 text-lg leading-relaxed">
                Our team of professional chefs brings the highest culinary skills, combining
                traditional recipes with authentic Indian spices to create unforgettable dining
                experiences.
              </p>
              <Link
                href="/about"
                className="text-gold-600 hover:text-gold-700 inline-flex items-center gap-2 font-semibold transition-colors"
              >
                Learn More About Us
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-navy-50/50 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <p className="text-gold-600 mb-2 text-sm font-medium tracking-widest uppercase">
              What We Offer
            </p>
            <h2 className="text-navy-700 font-serif text-3xl font-bold sm:text-4xl">
              Catering for Every Occasion
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {services.map((service) => (
              <Link
                key={service.title}
                href={service.href}
                className="group shadow-elegant hover:shadow-elegant-lg overflow-hidden rounded-2xl bg-white transition-all"
              >
                <div className="bg-navy-100 aspect-[4/3] overflow-hidden">
                  {/* Placeholder - replace with actual images */}
                  <div className="flex h-full items-center justify-center transition-transform duration-300 group-hover:scale-105">
                    <Users className="text-navy-200 h-16 w-16" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-navy-700 group-hover:text-gold-600 mb-2 font-serif text-xl font-bold">
                    {service.title}
                  </h3>
                  <p className="text-navy-600/70 mb-4">{service.description}</p>
                  <span className="text-gold-600 inline-flex items-center gap-1 text-sm font-semibold">
                    Learn More
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/services"
              className="border-navy-700 text-navy-700 hover:bg-navy-700 inline-flex items-center gap-2 rounded-full border-2 px-8 py-3 font-semibold transition-all hover:text-white"
            >
              View All Services
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Content */}
            <div>
              <p className="text-gold-600 mb-2 text-sm font-medium tracking-widest uppercase">
                Why Choose Us
              </p>
              <h2 className="text-navy-700 mb-8 font-serif text-3xl font-bold sm:text-4xl">
                The Ada-e-Haandi Difference
              </h2>
              <ul className="space-y-4">
                {whyChooseUs.map((point, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="text-gold-500 mt-0.5 h-6 w-6 flex-shrink-0" />
                    <span className="text-navy-600/80 text-lg">{point}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-10">
                <Link
                  href="/get-quote"
                  className="bg-gold-500 text-navy-700 shadow-gold hover:bg-gold-600 inline-flex items-center gap-2 rounded-full px-8 py-4 font-semibold transition-all hover:shadow-lg"
                >
                  Request a Quote
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </div>
            </div>

            {/* Testimonial */}
            <div className="bg-navy-700 rounded-2xl p-8 text-white lg:p-12">
              <div className="mb-6 flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="fill-gold-500 text-gold-500 h-6 w-6" />
                ))}
              </div>
              <blockquote className="mb-6 font-serif text-xl leading-relaxed text-white/90 italic lg:text-2xl">
                "Ada-e-Haandi made our wedding reception absolutely perfect. The food was authentic,
                delicious, and our guests are still talking about it!"
              </blockquote>
              <div>
                <p className="text-gold-500 font-semibold">Happy Client</p>
                <p className="text-sm text-white/60">Wedding Reception, Delhi</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-navy py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-6 font-serif text-3xl font-bold text-white sm:text-4xl">
            Ready to Create an Unforgettable Event?
          </h2>
          <p className="mb-10 text-lg text-white/80">
            Let us bring our 27 years of culinary expertise to your next celebration. Contact us
            today for a customized catering solution.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/get-quote"
              className="bg-gold-500 text-navy-700 shadow-gold hover:bg-gold-600 inline-flex items-center gap-2 rounded-full px-8 py-4 text-lg font-semibold transition-all hover:shadow-lg"
            >
              Get a Free Quote
              <ArrowRight className="h-5 w-5" />
            </Link>
            <a
              href="tel:+919999342322"
              className="hover:text-navy-700 inline-flex items-center gap-2 rounded-full border-2 border-white px-8 py-4 text-lg font-semibold text-white transition-all hover:bg-white"
            >
              Call +91 99993 42322
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
