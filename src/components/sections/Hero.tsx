import Link from 'next/link'
import { HeroImage } from '@/components/ui/BlurImage'
import { Button } from '@/components/ui/Button'
import { ChevronDown } from 'lucide-react'

interface HeroProps {
  headline: string
  subheadline?: string
  description?: string
  backgroundImage: string
  primaryCta?: {
    text: string
    href: string
  }
  secondaryCta?: {
    text: string
    href: string
  }
  showScrollIndicator?: boolean
  overlayOpacity?: number
  minHeight?: 'screen' | 'large' | 'medium'
}

const minHeightStyles = {
  screen: 'min-h-screen',
  large: 'min-h-[85vh]',
  medium: 'min-h-[70vh]',
}

export function Hero({
  headline,
  subheadline,
  description,
  backgroundImage,
  primaryCta,
  secondaryCta,
  showScrollIndicator = true,
  overlayOpacity = 0.55,
  minHeight = 'screen',
}: HeroProps): React.ReactElement {
  return (
    <section className={`relative ${minHeightStyles[minHeight]} flex items-center justify-center`}>
      {/* Background Image */}
      <HeroImage
        src={backgroundImage}
        alt="Hero background"
        overlay
        overlayOpacity={overlayOpacity}
        wrapperClassName="absolute inset-0"
      />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-32 text-center sm:px-6 lg:px-8">
        {subheadline && (
          <p className="text-gold-400 animate-fade-in mb-4 text-sm font-medium tracking-wider uppercase">
            {subheadline}
          </p>
        )}

        <h1 className="text-display-sm sm:text-display-md lg:text-display-lg animate-slide-up font-serif text-balance text-white">
          {headline}
        </h1>

        {description && (
          <p className="text-body-lg animate-slide-up stagger-1 mx-auto mt-6 max-w-2xl text-balance text-white/90">
            {description}
          </p>
        )}

        {(primaryCta || secondaryCta) && (
          <div className="animate-slide-up stagger-2 mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            {primaryCta && (
              <Button href={primaryCta.href} size="lg">
                {primaryCta.text}
              </Button>
            )}
            {secondaryCta && (
              <Button
                href={secondaryCta.href}
                variant="outline"
                size="lg"
                className="hover:text-navy-700 border-white text-white hover:bg-white"
              >
                {secondaryCta.text}
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Scroll Indicator */}
      {showScrollIndicator && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <Link
            href="#content"
            className="flex flex-col items-center text-white/70 transition-colors hover:text-white"
            aria-label="Scroll down"
          >
            <span className="mb-2 text-xs tracking-wider">SCROLL</span>
            <ChevronDown className="h-5 w-5" />
          </Link>
        </div>
      )}
    </section>
  )
}

interface PageHeroProps {
  title: string
  subtitle?: string
  backgroundImage?: string
}

export function PageHero({
  title,
  subtitle,
  backgroundImage = '/images/hero-default.jpg',
}: PageHeroProps): React.ReactElement {
  return (
    <section className="relative flex min-h-[40vh] items-center justify-center">
      <HeroImage
        src={backgroundImage}
        alt={title}
        overlay
        overlayOpacity={0.6}
        wrapperClassName="absolute inset-0"
      />
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <h1 className="text-display-sm sm:text-display-md animate-fade-in font-serif text-white">
          {title}
        </h1>
        {subtitle && <p className="text-body-lg animate-slide-up mt-4 text-white/90">{subtitle}</p>}
      </div>
    </section>
  )
}
