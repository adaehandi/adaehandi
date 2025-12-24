import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Users, Check } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs: (string | undefined | null | false)[]): string {
  return twMerge(clsx(inputs))
}

interface ServicePackage {
  id: string
  name: string
  slug: string
  type: string
  shortDescription: string
  priceRangeMin: number
  priceRangeMax?: number
  minimumGuests: number
  features?: string[]
  heroImage?: string
  featured?: boolean
}

interface ServiceCardProps {
  service: ServicePackage
  variant?: 'default' | 'compact' | 'featured'
  className?: string
}

const typeLabels: Record<string, string> = {
  wedding: 'Wedding',
  corporate: 'Corporate',
  'private-party': 'Private Party',
  religious: 'Religious',
  birthday: 'Birthday',
  festival: 'Festival',
  engagement: 'Engagement',
  anniversary: 'Anniversary',
}

const typeIcons: Record<string, string> = {
  wedding: '💒',
  corporate: '🏢',
  'private-party': '🎉',
  religious: '🕉️',
  birthday: '🎂',
  festival: '🪔',
  engagement: '💍',
  anniversary: '🎊',
}

export function ServiceCard({
  service,
  variant = 'default',
  className,
}: ServiceCardProps): React.ReactElement {
  const {
    name,
    slug,
    type,
    shortDescription,
    priceRangeMin,
    priceRangeMax,
    minimumGuests,
    features,
    heroImage,
    featured,
  } = service

  const href = `/services/${slug}`

  if (variant === 'compact') {
    return (
      <Link
        href={href}
        className={cn(
          'group shadow-elegant hover:shadow-elegant-lg flex items-center gap-4 rounded-xl bg-white p-4 transition-all',
          className
        )}
      >
        <div className="bg-gold-100 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full text-2xl">
          {typeIcons[type] || '🍽️'}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-navy-700 group-hover:text-gold-600 font-semibold transition-colors">
            {name}
          </h3>
          <p className="text-navy-400 text-sm">From ₹{priceRangeMin}/person</p>
        </div>
        <ArrowRight className="text-navy-300 group-hover:text-gold-500 h-5 w-5 transition-all group-hover:translate-x-1" />
      </Link>
    )
  }

  if (variant === 'featured') {
    return (
      <div
        className={cn(
          'group shadow-elegant hover:shadow-elegant-lg overflow-hidden rounded-2xl bg-white transition-all',
          className
        )}
      >
        <div className="relative aspect-[16/10] overflow-hidden">
          {heroImage ? (
            <Image
              src={heroImage}
              alt={name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="bg-gradient-navy flex h-full w-full items-center justify-center">
              <span className="text-6xl">{typeIcons[type] || '🍽️'}</span>
            </div>
          )}
          <div className="from-navy-900/80 via-navy-900/20 absolute inset-0 bg-gradient-to-t to-transparent" />
          {featured && (
            <Badge variant="primary" className="absolute top-4 left-4">
              Popular
            </Badge>
          )}
          <div className="absolute right-4 bottom-4 left-4">
            <Badge variant="default" className="text-navy-700 mb-2 bg-white/90">
              {typeLabels[type] || type}
            </Badge>
            <h3 className="text-heading-md font-serif text-white">{name}</h3>
          </div>
        </div>
        <div className="p-6">
          <p className="text-navy-500 mb-4">{shortDescription}</p>

          <div className="mb-4 flex items-center gap-4 text-sm">
            <div className="text-navy-600 flex items-center gap-1.5">
              <Users className="text-gold-500 h-4 w-4" />
              <span>Min. {minimumGuests} guests</span>
            </div>
            <div className="text-gold-600 font-semibold">
              ₹{priceRangeMin}
              {priceRangeMax && `–${priceRangeMax}`}/person
            </div>
          </div>

          {features && features.length > 0 && (
            <ul className="mb-6 space-y-2">
              {features.slice(0, 3).map((feature, index) => (
                <li key={index} className="text-navy-600 flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 flex-shrink-0 text-green-500" />
                  {feature}
                </li>
              ))}
            </ul>
          )}

          <Button href={href} fullWidth>
            View Package
          </Button>
        </div>
      </div>
    )
  }

  // Default variant
  return (
    <Link
      href={href}
      className={cn(
        'group shadow-elegant hover:shadow-elegant-lg block overflow-hidden rounded-2xl bg-white transition-all hover:-translate-y-1',
        className
      )}
    >
      <div className="relative aspect-video overflow-hidden">
        {heroImage ? (
          <Image
            src={heroImage}
            alt={name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="bg-gradient-navy flex h-full w-full items-center justify-center">
            <span className="text-5xl">{typeIcons[type] || '🍽️'}</span>
          </div>
        )}
        <div className="bg-navy-900/30 group-hover:bg-navy-900/40 absolute inset-0 transition-colors" />
        <div className="absolute bottom-3 left-3">
          <Badge variant="default" className="text-navy-700 bg-white/90">
            {typeLabels[type] || type}
          </Badge>
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-heading-sm text-navy-700 group-hover:text-gold-600 mb-2 font-serif transition-colors">
          {name}
        </h3>
        <p className="text-navy-500 mb-3 line-clamp-2 text-sm">{shortDescription}</p>
        <div className="flex items-center justify-between text-sm">
          <span className="text-navy-400">Min. {minimumGuests} guests</span>
          <span className="text-gold-600 font-semibold">From ₹{priceRangeMin}/person</span>
        </div>
      </div>
    </Link>
  )
}

interface ServiceGridProps {
  services: ServicePackage[]
  variant?: 'default' | 'compact' | 'featured'
  columns?: 2 | 3
  className?: string
}

export function ServiceGrid({
  services,
  variant = 'default',
  columns = 3,
  className,
}: ServiceGridProps): React.ReactElement {
  const colStyles = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  }

  return (
    <div className={cn('grid gap-6', colStyles[columns], className)}>
      {services.map((service) => (
        <ServiceCard key={service.id} service={service} variant={variant} />
      ))}
    </div>
  )
}
