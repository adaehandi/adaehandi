import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight,
  Calendar,
  Users,
  Award,
  Heart,
  ChefHat,
  Shield,
  Star,
  CheckCircle,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about Ada-e-Haandi - 27 years of culinary excellence in North Indian catering since 1998. Premium catering services in Delhi NCR.',
}

// Stats data
const stats = [
  { value: '27+', label: 'Years of Excellence', icon: Calendar },
  { value: '5000+', label: 'Events Catered', icon: Users },
  { value: '100%', label: 'Client Satisfaction', icon: Award },
  { value: '50+', label: 'Menu Items', icon: ChefHat },
]

// Values
const values = [
  {
    title: 'Quality First',
    description:
      'We never compromise on the quality of ingredients. Fresh produce, premium spices, and authentic recipes are the foundation of every dish we prepare.',
    icon: Star,
  },
  {
    title: 'Customer Focus',
    description:
      'Your satisfaction is our priority. We listen to your requirements, understand your preferences, and deliver beyond expectations.',
    icon: Heart,
  },
  {
    title: 'Reliability',
    description:
      'Count on us for on-time delivery, consistent quality, and professional service at every event, big or small.',
    icon: Shield,
  },
  {
    title: 'Innovation',
    description:
      'While we honor traditional recipes, we continuously innovate our presentations and service to meet modern expectations.',
    icon: Award,
  },
]

// Timeline milestones
const milestones = [
  {
    year: '1998',
    title: 'The Beginning',
    description:
      'Ada-e-Haandi was founded in South Moti Bagh, Delhi with a vision to bring authentic North Indian flavors to celebrations.',
  },
  {
    year: '2005',
    title: 'Expanding Horizons',
    description:
      'Extended our services to cover the entire Delhi NCR region, catering to weddings and corporate events.',
  },
  {
    year: '2010',
    title: 'FSSAI Certification',
    description:
      'Received FSSAI certification, reinforcing our commitment to food safety and quality standards.',
  },
  {
    year: '2015',
    title: '3000+ Events',
    description:
      'Celebrated the milestone of catering over 3000 successful events across Delhi NCR.',
  },
  {
    year: '2020',
    title: 'Modern Kitchen',
    description:
      'Upgraded to a state-of-the-art commercial kitchen with enhanced capacity and hygiene standards.',
  },
  {
    year: '2024',
    title: '5000+ Events & Counting',
    description:
      'Crossed 5000 events milestone, continuing to serve families and businesses with the same passion.',
  },
]

// What sets us apart
const differentiators = [
  '27 years of experience in North Indian cuisine',
  'Professional trained chefs with culinary expertise',
  'FSSAI certified commercial kitchen',
  'Customizable menus for all dietary requirements',
  'On-time delivery and setup guaranteed',
  'Complete event solutions including service staff',
  'Competitive pricing with no hidden costs',
  'Personal attention from inquiry to event completion',
]

export default function AboutPage(): React.ReactElement {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-navy relative pt-32 pb-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-gold-500 mb-2 text-sm font-medium tracking-widest uppercase">
            Our Story
          </p>
          <h1 className="mb-6 font-serif text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
            27 Years of Culinary
            <span className="text-gold-500 block">Excellence</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-white/80">
            Since 1998, Ada-e-Haandi has been serving authentic North Indian cuisine with passion
            and perfection. From humble beginnings to becoming Delhi NCR&apos;s trusted catering
            partner.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 -mt-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="shadow-elegant-lg grid gap-6 rounded-2xl bg-white p-8 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="bg-gold-500/10 mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full">
                  <stat.icon className="text-gold-600 h-6 w-6" />
                </div>
                <p className="text-navy-600 font-serif text-3xl font-bold">{stat.value}</p>
                <p className="text-navy-400 mt-1 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Image placeholder */}
            <div className="relative">
              <div className="bg-navy-100 flex aspect-[4/3] items-center justify-center overflow-hidden rounded-2xl">
                <ChefHat className="text-navy-200 h-24 w-24" />
              </div>
              {/* Decorative element */}
              <div className="border-gold-500/30 absolute -right-6 -bottom-6 -z-10 h-full w-full rounded-2xl border-2" />
            </div>

            {/* Content */}
            <div>
              <p className="text-gold-600 mb-2 text-sm font-medium tracking-widest uppercase">
                How It All Began
              </p>
              <h2 className="text-navy-700 mb-6 font-serif text-3xl font-bold sm:text-4xl">
                From a Small Kitchen to Delhi&apos;s Trusted Caterer
              </h2>
              <div className="text-navy-600/80 space-y-4 text-lg leading-relaxed">
                <p>
                  Ada-e-Haandi was born in 1998 from a simple belief: that authentic North Indian
                  cuisine, prepared with love and the finest ingredients, could transform any
                  celebration into a memorable feast.
                </p>
                <p>
                  What started as a small catering operation in South Moti Bagh has grown into one
                  of Delhi NCR&apos;s most trusted catering services. Over 27 years, we have had the
                  privilege of being part of more than 5,000 celebrations – from intimate family
                  gatherings to grand weddings with 1000+ guests.
                </p>
                <p>
                  Our success is built on three pillars: uncompromising quality, authentic flavors,
                  and heartfelt service. These principles, established by our founders, continue to
                  guide every event we cater today.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="bg-cream-100 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <p className="text-gold-600 mb-2 text-sm font-medium tracking-widest uppercase">
              What Drives Us
            </p>
            <h2 className="text-navy-700 font-serif text-3xl font-bold sm:text-4xl">Our Values</h2>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <div
                key={value.title}
                className="shadow-elegant hover:shadow-elegant-lg rounded-2xl bg-white p-6 text-center transition-all hover:-translate-y-1"
              >
                <div className="bg-gold-500/10 mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full">
                  <value.icon className="text-gold-600 h-7 w-7" />
                </div>
                <h3 className="text-navy-700 mb-2 font-serif text-lg font-bold">{value.title}</h3>
                <p className="text-navy-600/70 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <p className="text-gold-600 mb-2 text-sm font-medium tracking-widest uppercase">
              Our Journey
            </p>
            <h2 className="text-navy-700 font-serif text-3xl font-bold sm:text-4xl">
              Milestones Along the Way
            </h2>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="bg-cream-300 absolute top-0 left-8 h-full w-0.5 sm:left-1/2 sm:-translate-x-0.5" />

            {/* Timeline items */}
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div
                  key={milestone.year}
                  className={`relative flex items-start gap-8 ${
                    index % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'
                  }`}
                >
                  {/* Year bubble */}
                  <div className="bg-gold-500 shadow-gold absolute left-8 z-10 flex h-16 w-16 -translate-x-1/2 items-center justify-center rounded-full font-serif text-sm font-bold text-white sm:left-1/2">
                    {milestone.year}
                  </div>

                  {/* Content */}
                  <div
                    className={`ml-20 sm:ml-0 sm:w-[calc(50%-3rem)] ${
                      index % 2 === 0 ? 'sm:text-right' : 'sm:text-left'
                    }`}
                  >
                    <h3 className="text-navy-700 mb-2 font-serif text-xl font-bold">
                      {milestone.title}
                    </h3>
                    <p className="text-navy-600/70">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-navy-700 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Content */}
            <div>
              <p className="text-gold-500 mb-2 text-sm font-medium tracking-widest uppercase">
                The Ada-e-Haandi Difference
              </p>
              <h2 className="mb-8 font-serif text-3xl font-bold text-white sm:text-4xl">
                What Sets Us Apart
              </h2>
              <ul className="grid gap-4 sm:grid-cols-2">
                {differentiators.map((point, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="text-gold-500 mt-0.5 h-5 w-5 flex-shrink-0" />
                    <span className="text-white/80">{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* FSSAI Badge */}
            <div className="text-center">
              <div className="inline-block rounded-2xl bg-white p-8">
                <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                  <Shield className="h-10 w-10 text-green-600" />
                </div>
                <h3 className="text-navy-700 mb-2 font-serif text-xl font-bold">FSSAI Certified</h3>
                <p className="text-navy-600/70 mb-4 text-sm">
                  Our kitchen and food handling processes are certified by the Food Safety and
                  Standards Authority of India.
                </p>
                <p className="bg-cream-100 text-navy-600 inline-block rounded-lg px-4 py-2 text-sm font-medium">
                  License No: XXXXXXXXXX
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <p className="text-gold-600 mb-2 text-sm font-medium tracking-widest uppercase">
              Meet The Team
            </p>
            <h2 className="text-navy-700 mb-4 font-serif text-3xl font-bold sm:text-4xl">
              The People Behind the Magic
            </h2>
            <p className="text-navy-600/70 mx-auto max-w-2xl">
              Our team of experienced chefs and dedicated professionals work together to create
              unforgettable dining experiences for every event.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Team member placeholder cards */}
            {[
              {
                role: 'Head Chef',
                description: 'Master of North Indian cuisine with 25+ years experience',
              },
              {
                role: 'Operations Manager',
                description: 'Ensuring seamless execution of every event',
              },
              {
                role: 'Client Relations',
                description: 'Your point of contact from inquiry to completion',
              },
            ].map((member, index) => (
              <div key={index} className="shadow-elegant rounded-2xl bg-white p-6 text-center">
                <div className="bg-navy-100 mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full">
                  <ChefHat className="text-navy-300 h-12 w-12" />
                </div>
                <h3 className="text-navy-700 mb-1 font-serif text-lg font-bold">{member.role}</h3>
                <p className="text-navy-600/70 text-sm">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-cream-100 py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-navy-700 mb-6 font-serif text-3xl font-bold sm:text-4xl">
            Ready to Experience the Difference?
          </h2>
          <p className="text-navy-600/80 mb-10 text-lg">
            Let us bring 27 years of culinary expertise to your next celebration. Contact us today
            for a customized catering solution.
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
              href="/contact"
              className="border-navy-700 text-navy-700 hover:bg-navy-700 inline-flex items-center gap-2 rounded-full border-2 px-8 py-4 text-lg font-semibold transition-all hover:text-white"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
