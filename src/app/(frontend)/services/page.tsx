import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight,
  Heart,
  Building2,
  PartyPopper,
  Church,
  Cake,
  Calendar,
  Users,
  CheckCircle,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Our Services',
  description:
    'Premium catering services for weddings, corporate events, private parties, and religious ceremonies. 27 years of culinary excellence in Delhi NCR.',
}

// Service categories with icons and descriptions
const services = [
  {
    slug: 'wedding-catering',
    title: 'Wedding Catering',
    icon: Heart,
    description:
      'Make your special day unforgettable with our exquisite wedding menus and impeccable service. From intimate ceremonies to grand celebrations.',
    features: [
      'Customized menus for all wedding events',
      'Mehendi, Sangeet, Reception packages',
      'Live counters and food stations',
      'Professional service staff',
      'Decoration coordination available',
    ],
    priceRange: '₹800 - ₹2,500',
    minGuests: 100,
    image: '/images/placeholders/wedding.jpg',
    popular: true,
  },
  {
    slug: 'corporate-events',
    title: 'Corporate Events',
    icon: Building2,
    description:
      'Professional catering solutions for meetings, conferences, product launches, and corporate celebrations that impress your clients and team.',
    features: [
      'Breakfast, lunch & dinner options',
      'Conference packages',
      'Cocktail & networking events',
      'On-time delivery guaranteed',
      'Branded presentation available',
    ],
    priceRange: '₹500 - ₹1,500',
    minGuests: 25,
    image: '/images/placeholders/corporate.jpg',
    popular: true,
  },
  {
    slug: 'private-parties',
    title: 'Private Parties',
    icon: PartyPopper,
    description:
      'From intimate gatherings to lavish celebrations, we cater to all your party needs with personalized menus and exceptional service.',
    features: [
      'Birthday & anniversary celebrations',
      'Housewarming parties',
      'Kitty parties',
      'Theme-based menus',
      'Flexible guest counts',
    ],
    priceRange: '₹600 - ₹1,800',
    minGuests: 25,
    image: '/images/placeholders/party.jpg',
    popular: false,
  },
  {
    slug: 'religious-ceremonies',
    title: 'Religious Ceremonies',
    icon: Church,
    description:
      'Traditional catering for pujas, havans, satyanarayan katha, and other religious ceremonies with pure vegetarian options.',
    features: [
      'Pure vegetarian menu',
      'Satvik food options',
      'Traditional North Indian cuisine',
      'Prasad preparation',
      'Religious event experience',
    ],
    priceRange: '₹400 - ₹1,200',
    minGuests: 50,
    image: '/images/placeholders/religious.jpg',
    popular: false,
  },
  {
    slug: 'birthday-celebrations',
    title: 'Birthday Celebrations',
    icon: Cake,
    description:
      'Make birthdays special with our delicious catering packages. From kids parties to milestone celebrations.',
    features: [
      'Kids-friendly menu options',
      'Adult birthday packages',
      'Theme-based food stations',
      'Custom cake coordination',
      'Entertainment-friendly setup',
    ],
    priceRange: '₹500 - ₹1,500',
    minGuests: 25,
    image: '/images/placeholders/birthday.jpg',
    popular: false,
  },
  {
    slug: 'engagement-ceremonies',
    title: 'Engagement & Roka',
    icon: Calendar,
    description:
      'Celebrate new beginnings with our specially curated engagement and roka ceremony catering packages.',
    features: [
      'Intimate ceremony menus',
      'Ring ceremony refreshments',
      'Family gathering packages',
      'Traditional & fusion options',
      'Sweet box arrangements',
    ],
    priceRange: '₹700 - ₹2,000',
    minGuests: 50,
    image: '/images/placeholders/engagement.jpg',
    popular: false,
  },
]

// Why choose us points
const whyChooseUs = [
  {
    title: 'Experienced Team',
    description: '27+ years of catering excellence with professional chefs and service staff',
  },
  {
    title: 'Customized Menus',
    description: 'Personalized menu planning based on your preferences and dietary requirements',
  },
  {
    title: 'Quality Ingredients',
    description: 'Fresh, premium ingredients sourced daily for authentic flavors',
  },
  {
    title: 'Reliable Service',
    description: 'On-time delivery and setup with trained professionals',
  },
]

export default function ServicesPage(): React.ReactElement {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-navy relative pt-32 pb-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-gold-500 mb-2 text-sm font-medium tracking-widest uppercase">
            What We Offer
          </p>
          <h1 className="mb-6 font-serif text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
            Catering Services
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-white/80">
            From intimate gatherings to grand celebrations, we bring 27 years of culinary excellence
            to every event. Discover our range of premium catering services.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="shadow-elegant hover:shadow-elegant-lg group relative overflow-hidden rounded-2xl bg-white transition-all hover:-translate-y-1"
              >
                {service.popular && (
                  <span className="bg-gold-500 text-navy-700 absolute top-4 right-4 z-10 rounded-full px-3 py-1 text-xs font-semibold">
                    Popular
                  </span>
                )}

                {/* Icon Header */}
                <div className="bg-navy-50 flex items-center gap-4 p-6">
                  <div className="bg-gold-500/10 flex h-14 w-14 items-center justify-center rounded-full">
                    <service.icon className="text-gold-600 h-7 w-7" />
                  </div>
                  <div>
                    <h3 className="text-navy-700 group-hover:text-gold-600 font-serif text-xl font-bold transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-navy-500 text-sm">From {service.priceRange}/person</p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <p className="text-navy-600/80 mb-4">{service.description}</p>

                  {/* Features preview */}
                  <ul className="mb-4 space-y-2">
                    {service.features.slice(0, 3).map((feature, index) => (
                      <li key={index} className="text-navy-600/70 flex items-center gap-2 text-sm">
                        <CheckCircle className="text-gold-500 h-4 w-4 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* Footer */}
                  <div className="border-cream-200 flex items-center justify-between border-t pt-4">
                    <div className="text-navy-500 flex items-center gap-1 text-sm">
                      <Users className="h-4 w-4" />
                      Min {service.minGuests} guests
                    </div>
                    <span className="text-gold-600 group-hover:text-gold-700 flex items-center gap-1 font-semibold">
                      Learn More
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-cream-100 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="text-gold-600 mb-2 text-sm font-medium tracking-widest uppercase">
              The Ada-e-Haandi Advantage
            </p>
            <h2 className="text-navy-700 font-serif text-3xl font-bold sm:text-4xl">
              Why Choose Our Catering?
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {whyChooseUs.map((item, index) => (
              <div key={index} className="text-center">
                <div className="bg-gold-500 shadow-gold mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full text-lg font-bold text-white">
                  {index + 1}
                </div>
                <h3 className="text-navy-700 mb-2 font-serif text-lg font-bold">{item.title}</h3>
                <p className="text-navy-600/70 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-navy-700 py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-6 font-serif text-3xl font-bold text-white sm:text-4xl">
            Ready to Plan Your Event?
          </h2>
          <p className="mb-10 text-lg text-white/80">
            Tell us about your requirements and let our team create a customized catering solution
            for you.
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
