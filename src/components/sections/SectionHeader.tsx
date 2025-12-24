import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs: (string | undefined | null | false)[]): string {
  return twMerge(clsx(inputs))
}

interface SectionHeaderProps {
  title: string
  subtitle?: string
  description?: string
  align?: 'left' | 'center' | 'right'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  titleClassName?: string
  subtitleClassName?: string
  descriptionClassName?: string
}

const alignStyles = {
  left: 'text-left',
  center: 'text-center mx-auto',
  right: 'text-right ml-auto',
}

const titleSizeStyles = {
  sm: 'text-heading-sm sm:text-heading-md',
  md: 'text-heading-md sm:text-heading-lg',
  lg: 'text-heading-lg sm:text-display-sm',
}

export function SectionHeader({
  title,
  subtitle,
  description,
  align = 'center',
  size = 'md',
  className,
  titleClassName,
  subtitleClassName,
  descriptionClassName,
}: SectionHeaderProps): React.ReactElement {
  return (
    <div className={cn('mb-12 max-w-3xl', alignStyles[align], className)}>
      {subtitle && (
        <p
          className={cn(
            'text-gold-600 mb-3 text-sm font-medium tracking-wider uppercase',
            subtitleClassName
          )}
        >
          {subtitle}
        </p>
      )}
      <h2
        className={cn(
          'text-navy-700 font-serif text-balance',
          titleSizeStyles[size],
          titleClassName
        )}
      >
        {title}
      </h2>
      {description && (
        <p className={cn('text-body-lg text-navy-500 mt-4', descriptionClassName)}>{description}</p>
      )}
    </div>
  )
}

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode
  variant?: 'default' | 'cream' | 'navy' | 'gradient'
  padding?: 'sm' | 'md' | 'lg' | 'xl'
}

const sectionVariantStyles = {
  default: 'bg-white',
  cream: 'bg-cream-100',
  navy: 'bg-navy-700 text-white',
  gradient: 'bg-gradient-navy text-white',
}

const sectionPaddingStyles = {
  sm: 'py-12 sm:py-16',
  md: 'py-16 sm:py-20',
  lg: 'py-20 sm:py-28',
  xl: 'py-24 sm:py-32',
}

export function Section({
  children,
  variant = 'default',
  padding = 'lg',
  className,
  ...props
}: SectionProps): React.ReactElement {
  return (
    <section
      className={cn(sectionVariantStyles[variant], sectionPaddingStyles[padding], className)}
      {...props}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  )
}
