import { Button } from '@/components/ui/Button'
import { HeroImage } from '@/components/ui/BlurImage'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs: (string | undefined | null | false)[]): string {
  return twMerge(clsx(inputs))
}

interface CTABannerProps {
  headline: string
  subheadline?: string
  buttonText: string
  buttonHref: string
  backgroundImage?: string
  variant?: 'gold' | 'navy' | 'image'
  className?: string
}

export function CTABanner({
  headline,
  subheadline,
  buttonText,
  buttonHref,
  backgroundImage,
  variant = 'gold',
  className,
}: CTABannerProps): React.ReactElement {
  if (variant === 'image' && backgroundImage) {
    return (
      <section className={cn('relative py-20 sm:py-28', className)}>
        <HeroImage
          src={backgroundImage}
          alt="CTA background"
          overlay
          overlayOpacity={0.7}
          wrapperClassName="absolute inset-0"
        />
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-heading-lg sm:text-display-sm font-serif text-balance text-white">
            {headline}
          </h2>
          {subheadline && <p className="text-body-lg mt-4 text-white/90">{subheadline}</p>}
          <div className="mt-8">
            <Button href={buttonHref} size="lg">
              {buttonText}
            </Button>
          </div>
        </div>
      </section>
    )
  }

  const bgStyles = {
    gold: 'bg-gradient-to-br from-gold-400 via-gold-500 to-gold-600',
    navy: 'bg-gradient-navy',
  }

  const textStyles = {
    gold: 'text-navy-700',
    navy: 'text-white',
  }

  return (
    <section className={cn('py-16 sm:py-20', bgStyles[variant as 'gold' | 'navy'], className)}>
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <h2
          className={cn(
            'text-heading-lg sm:text-display-sm font-serif text-balance',
            textStyles[variant as 'gold' | 'navy']
          )}
        >
          {headline}
        </h2>
        {subheadline && (
          <p
            className={cn(
              'text-body-lg mt-4',
              variant === 'gold' ? 'text-navy-600' : 'text-white/90'
            )}
          >
            {subheadline}
          </p>
        )}
        <div className="mt-8">
          <Button
            href={buttonHref}
            size="lg"
            variant={variant === 'gold' ? 'secondary' : 'primary'}
          >
            {buttonText}
          </Button>
        </div>
      </div>
    </section>
  )
}

interface InlineCTAProps {
  text: string
  buttonText: string
  buttonHref: string
  className?: string
}

export function InlineCTA({
  text,
  buttonText,
  buttonHref,
  className,
}: InlineCTAProps): React.ReactElement {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-between gap-6 p-6 sm:flex-row sm:p-8',
        'bg-cream-100 rounded-2xl',
        className
      )}
    >
      <p className="text-heading-sm text-navy-700 text-center font-serif sm:text-left">{text}</p>
      <Button href={buttonHref} className="flex-shrink-0">
        {buttonText}
      </Button>
    </div>
  )
}
