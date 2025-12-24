import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import {
  ArrowRight,
  ArrowLeft,
  Heart,
  Building2,
  PartyPopper,
  Church,
  Cake,
  Calendar,
  Users,
  CheckCircle,
  Utensils,
  ChefHat,
  Star,
} from 'lucide-react'

// Service data - will be replaced with Payload CMS data
const servicesData: Record<string, ServiceData> = {
  'wedding-catering': {
    slug: 'wedding-catering',
    title: 'Wedding Catering',
    subtitle: 'Make Your Special Day Unforgettable',
    icon: Heart,
    description:
      'With 27 years of experience in wedding catering, Ada-e-Haandi brings culinary excellence to your most special day. From intimate ceremonies to grand celebrations, we create memorable dining experiences that your guests will cherish forever.',
    features: [
      'Customized menus for all wedding events (Mehendi, Sangeet, Reception)',
      'Live cooking counters and food stations',
      'Professional service staff in traditional attire',
      'Decoration coordination available',
      'Multiple cuisine options (North Indian, Mughlai, Chinese, Continental)',
      'Vegetarian and non-vegetarian packages',
      'Welcome drinks and mocktails',
      'Sweet and dessert counters',
    ],
    includedItems: [
      { item: 'Welcome Drinks', description: 'Fresh juices, mocktails, and traditional sharbat' },
      { item: 'Starters', description: '6-8 varieties of veg and non-veg appetizers' },
      { item: 'Main Course', description: '10-12 items including curries, rice, and breads' },
      { item: 'Live Counters', description: 'Chaat, tandoor, and pasta stations' },
      { item: 'Desserts', description: '4-6 traditional and modern desserts' },
      { item: 'Beverages', description: 'Tea, coffee, and cold drinks throughout' },
    ],
    pricing: {
      min: 800,
      max: 2500,
      note: 'Prices vary based on menu selection and guest count',
    },
    minimumGuests: 100,
    testimonial: {
      quote:
        'Ada-e-Haandi made our wedding reception absolutely perfect. The food was authentic, delicious, and our 500 guests are still talking about it!',
      author: 'Priya & Rahul',
      event: 'Wedding Reception, Delhi',
    },
  },
  'corporate-events': {
    slug: 'corporate-events',
    title: 'Corporate Events',
    subtitle: 'Professional Catering for Business Excellence',
    icon: Building2,
    description:
      'Impress your clients and team with our professional corporate catering services. From executive meetings to large conferences, we deliver on-time with impeccable presentation and taste.',
    features: [
      'Breakfast, lunch, and dinner options',
      'Conference and seminar packages',
      'Cocktail and networking event catering',
      'Product launch celebrations',
      'Annual day and team building events',
      'Boxed meal options for meetings',
      'Branded presentation available',
      'Dietary accommodation (vegan, gluten-free)',
    ],
    includedItems: [
      { item: 'Welcome Tea/Coffee', description: 'Served with cookies and biscuits' },
      { item: 'Working Lunch', description: 'Complete meal with starters and dessert' },
      { item: 'High Tea', description: 'Snacks, sandwiches, and beverages' },
      { item: 'Dinner Package', description: 'Full course meal with live counters' },
      { item: 'Service Staff', description: 'Professional servers in uniform' },
      { item: 'Setup & Cleanup', description: 'Complete setup and post-event cleanup' },
    ],
    pricing: {
      min: 500,
      max: 1500,
      note: 'Custom packages available for regular corporate clients',
    },
    minimumGuests: 25,
    testimonial: {
      quote:
        'We have been using Ada-e-Haandi for all our corporate events. Their professionalism and food quality is consistently excellent.',
      author: 'Corporate Client',
      event: 'Annual Conference, Gurgaon',
    },
  },
  'private-parties': {
    slug: 'private-parties',
    title: 'Private Parties',
    subtitle: 'Celebrate Every Moment in Style',
    icon: PartyPopper,
    description:
      'From intimate gatherings to lavish celebrations, we cater to all your party needs with personalized menus and exceptional service. Let us handle the food while you enjoy the party.',
    features: [
      'Birthday and anniversary celebrations',
      'Housewarming parties',
      'Kitty parties',
      'Baby shower and naming ceremonies',
      'Graduation parties',
      'Theme-based menu customization',
      'Flexible guest counts',
      'Outdoor and indoor venues',
    ],
    includedItems: [
      { item: 'Customized Menu', description: 'Tailored to your preferences and theme' },
      { item: 'Appetizers', description: 'Hot and cold starters selection' },
      { item: 'Main Course', description: '6-8 items with variety' },
      { item: 'Desserts', description: 'Sweet endings to your celebration' },
      { item: 'Beverages', description: 'Soft drinks and traditional drinks' },
      { item: 'Crockery & Cutlery', description: 'Premium disposable or steel options' },
    ],
    pricing: {
      min: 600,
      max: 1800,
      note: 'Package customization available based on requirements',
    },
    minimumGuests: 25,
    testimonial: {
      quote:
        "The food at my daughter's graduation party was amazing. Everyone loved the variety and the service was impeccable.",
      author: 'Sunita Sharma',
      event: 'Graduation Party, South Delhi',
    },
  },
  'religious-ceremonies': {
    slug: 'religious-ceremonies',
    title: 'Religious Ceremonies',
    subtitle: 'Traditional Catering with Devotion',
    icon: Church,
    description:
      'Experience the authenticity of traditional North Indian cuisine for your religious ceremonies. We specialize in pure vegetarian Satvik food prepared with utmost care and devotion.',
    features: [
      'Pure vegetarian menu options',
      'Satvik food preparation',
      'Traditional North Indian cuisine',
      'Prasad and bhog preparation',
      'Puja and havan catering',
      'Satyanarayan katha meals',
      'Jagran and bhajan events',
      'No onion-garlic options available',
    ],
    includedItems: [
      { item: 'Prasad/Bhog', description: 'Traditional offerings prepared with care' },
      { item: 'Breakfast', description: 'Poori-sabzi, halwa, and beverages' },
      { item: 'Lunch/Dinner', description: 'Complete Satvik thali' },
      { item: 'Sweets', description: 'Traditional mithai and kheer' },
      { item: 'Beverages', description: 'Chaas, nimbu pani, and chai' },
      { item: 'Leaf Plates', description: 'Traditional pattals if required' },
    ],
    pricing: {
      min: 400,
      max: 1200,
      note: 'Special rates for temple and gurudwara events',
    },
    minimumGuests: 50,
    testimonial: {
      quote:
        'The Satvik food for our Satyanarayan Puja was prepared with such devotion. Pure, delicious, and exactly what we wanted.',
      author: 'Gupta Family',
      event: 'Satyanarayan Puja, Dwarka',
    },
  },
  'birthday-celebrations': {
    slug: 'birthday-celebrations',
    title: 'Birthday Celebrations',
    subtitle: 'Make Birthdays Extra Special',
    icon: Cake,
    description:
      'From colorful kids parties to elegant milestone celebrations, our birthday catering packages are designed to make the day memorable. We offer theme-based menus and fun food stations.',
    features: [
      'Kids-friendly menu options',
      'Adult birthday packages',
      'Milestone celebration specials (25th, 50th, etc.)',
      'Theme-based food stations',
      'Custom cake coordination',
      'Entertainment-friendly setup',
      'Finger food and canapé options',
      'Indoor and outdoor party catering',
    ],
    includedItems: [
      { item: 'Fun Starters', description: 'Kid and adult-friendly appetizers' },
      { item: 'Main Course', description: 'Popular favorites for all ages' },
      { item: 'Live Counters', description: 'Pizza, pasta, or chaat stations' },
      { item: 'Dessert Bar', description: 'Ice cream, pastries, and sweets' },
      { item: 'Beverages', description: 'Mocktails, sodas, and juices' },
      { item: 'Party Setup', description: 'Food area decoration coordination' },
    ],
    pricing: {
      min: 500,
      max: 1500,
      note: 'Special kids party packages start at ₹400/person',
    },
    minimumGuests: 25,
    testimonial: {
      quote:
        "My son's 10th birthday party was a hit thanks to the amazing food and the fun live counters. Kids loved it!",
      author: 'Neha Kapoor',
      event: 'Kids Birthday Party, Noida',
    },
  },
  'engagement-ceremonies': {
    slug: 'engagement-ceremonies',
    title: 'Engagement & Roka',
    subtitle: 'Celebrate New Beginnings Beautifully',
    icon: Calendar,
    description:
      'Mark the beginning of a beautiful journey with our specially curated engagement and roka ceremony catering. We create intimate, elegant dining experiences for this special occasion.',
    features: [
      'Intimate ceremony menus',
      'Ring ceremony refreshments',
      'Roka celebration packages',
      'Family gathering catering',
      'Traditional and fusion options',
      'Sweet box arrangements',
      'Welcome drink stations',
      'Elegant presentation',
    ],
    includedItems: [
      { item: 'Welcome Drinks', description: 'Premium mocktails and sharbat' },
      { item: 'Appetizers', description: 'Elegant finger food and canapés' },
      { item: 'Main Course', description: '8-10 curated items' },
      { item: 'Desserts', description: 'Traditional and modern sweets' },
      { item: 'Sweet Boxes', description: 'Gift boxes for guests (optional)' },
      { item: 'Beverage Service', description: 'Throughout the ceremony' },
    ],
    pricing: {
      min: 700,
      max: 2000,
      note: 'Intimate packages for 50-100 guests available',
    },
    minimumGuests: 50,
    testimonial: {
      quote:
        'Our roka ceremony was made even more special with the beautiful food presentation and delicious taste.',
      author: 'Mehta Family',
      event: 'Roka Ceremony, Greater Kailash',
    },
  },
}

interface ServiceData {
  slug: string
  title: string
  subtitle: string
  icon: typeof Heart
  description: string
  features: string[]
  includedItems: Array<{ item: string; description: string }>
  pricing: {
    min: number
    max: number
    note: string
  }
  minimumGuests: number
  testimonial: {
    quote: string
    author: string
    event: string
  }
}

type Params = Promise<{ slug: string }>

export async function generateStaticParams(): Promise<Array<{ slug: string }>> {
  return Object.keys(servicesData).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params
  const service = servicesData[slug]

  if (!service) {
    return {
      title: 'Service Not Found',
    }
  }

  return {
    title: service.title,
    description: service.description,
  }
}

export default async function ServicePage({
  params,
}: {
  params: Params
}): Promise<React.ReactElement> {
  const { slug } = await params
  const service = servicesData[slug]

  if (!service) {
    notFound()
  }

  const ServiceIcon = service.icon

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-navy relative pt-32 pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Back link */}
          <Link
            href="/services"
            className="mb-8 inline-flex items-center gap-2 text-white/70 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Services
          </Link>

          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <div className="bg-gold-500/20 mb-6 inline-flex rounded-full p-4">
                <ServiceIcon className="text-gold-500 h-10 w-10" />
              </div>
              <p className="text-gold-500 mb-2 text-sm font-medium tracking-widest uppercase">
                {service.subtitle}
              </p>
              <h1 className="mb-6 font-serif text-4xl font-bold text-white sm:text-5xl">
                {service.title}
              </h1>
              <p className="mb-8 text-lg text-white/80">{service.description}</p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/get-quote"
                  className="bg-gold-500 text-navy-700 shadow-gold hover:bg-gold-600 inline-flex items-center gap-2 rounded-full px-8 py-4 font-semibold transition-all hover:shadow-lg"
                >
                  Get a Quote
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <a
                  href="tel:+919999342322"
                  className="inline-flex items-center gap-2 rounded-full border-2 border-white/50 px-8 py-4 font-semibold text-white transition-all hover:border-white hover:bg-white/10"
                >
                  Call Us
                </a>
              </div>
            </div>

            {/* Pricing Card */}
            <div className="shadow-elegant-lg rounded-2xl bg-white p-8">
              <div className="mb-6">
                <p className="text-navy-500 mb-1 text-sm">Starting from</p>
                <p className="text-navy-700 font-serif text-4xl font-bold">
                  ₹{service.pricing.min}
                  <span className="text-navy-400 text-lg font-normal">/person</span>
                </p>
                <p className="text-navy-500 mt-2 text-sm">{service.pricing.note}</p>
              </div>

              <div className="border-cream-200 space-y-3 border-t pt-6">
                <div className="flex items-center gap-3">
                  <Users className="text-gold-500 h-5 w-5" />
                  <span className="text-navy-600">Minimum {service.minimumGuests} guests</span>
                </div>
                <div className="flex items-center gap-3">
                  <Utensils className="text-gold-500 h-5 w-5" />
                  <span className="text-navy-600">Customizable menu options</span>
                </div>
                <div className="flex items-center gap-3">
                  <ChefHat className="text-gold-500 h-5 w-5" />
                  <span className="text-navy-600">Professional service staff</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-gold-600 mb-2 text-sm font-medium tracking-widest uppercase">
              What We Offer
            </p>
            <h2 className="text-navy-700 font-serif text-3xl font-bold sm:text-4xl">
              Package Features
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {service.features.map((feature, index) => (
              <div
                key={index}
                className="border-cream-200 hover:border-gold-300 flex items-start gap-4 rounded-xl border bg-white p-5 transition-colors"
              >
                <CheckCircle className="text-gold-500 mt-0.5 h-5 w-5 flex-shrink-0" />
                <span className="text-navy-600">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="bg-cream-100 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="text-gold-600 mb-2 text-sm font-medium tracking-widest uppercase">
              Complete Package
            </p>
            <h2 className="text-navy-700 font-serif text-3xl font-bold sm:text-4xl">
              What&apos;s Included
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {service.includedItems.map((item, index) => (
              <div key={index} className="shadow-elegant rounded-2xl bg-white p-6">
                <div className="bg-gold-500/10 mb-4 flex h-12 w-12 items-center justify-center rounded-full">
                  <span className="text-gold-600 font-serif text-xl font-bold">{index + 1}</span>
                </div>
                <h3 className="text-navy-700 mb-2 font-serif text-lg font-bold">{item.item}</h3>
                <p className="text-navy-600/70 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="bg-navy-700 rounded-2xl p-8 text-center text-white lg:p-12">
            <div className="mb-6 flex justify-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="fill-gold-500 text-gold-500 h-6 w-6" />
              ))}
            </div>
            <blockquote className="mb-6 font-serif text-xl leading-relaxed text-white/90 italic lg:text-2xl">
              &ldquo;{service.testimonial.quote}&rdquo;
            </blockquote>
            <div>
              <p className="text-gold-500 font-semibold">{service.testimonial.author}</p>
              <p className="text-sm text-white/60">{service.testimonial.event}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-cream-100 py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-navy-700 mb-6 font-serif text-3xl font-bold sm:text-4xl">
            Ready to Book {service.title}?
          </h2>
          <p className="text-navy-600/80 mb-10 text-lg">
            Tell us about your event and let our team create a customized package for you.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/get-quote"
              className="bg-gold-500 text-navy-700 shadow-gold hover:bg-gold-600 inline-flex items-center gap-2 rounded-full px-8 py-4 text-lg font-semibold transition-all hover:shadow-lg"
            >
              Get a Free Quote
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="/menu"
              className="border-navy-700 text-navy-700 hover:bg-navy-700 inline-flex items-center gap-2 rounded-full border-2 px-8 py-4 text-lg font-semibold transition-all hover:text-white"
            >
              View Our Menu
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
