import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs: (string | undefined | null | false)[]): string {
  return twMerge(clsx(inputs))
}

type BadgeVariant = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'veg' | 'nonveg'
type BadgeSize = 'sm' | 'md'

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
  size?: BadgeSize
  children: React.ReactNode
}

const variantStyles: Record<BadgeVariant, string> = {
  default: 'bg-cream-200 text-navy-600',
  primary: 'bg-gold-100 text-gold-700',
  secondary: 'bg-navy-100 text-navy-600',
  success: 'bg-green-100 text-green-700',
  warning: 'bg-orange-100 text-orange-700',
  veg: 'bg-green-100 text-green-700 border border-green-500',
  nonveg: 'bg-red-100 text-red-700 border border-red-500',
}

const sizeStyles: Record<BadgeSize, string> = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-3 py-1 text-sm',
}

export function Badge({
  variant = 'default',
  size = 'md',
  children,
  className,
  ...props
}: BadgeProps): React.ReactElement {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full font-medium whitespace-nowrap',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}

interface DietaryBadgeProps {
  isVegetarian: boolean
  size?: BadgeSize
  className?: string
}

export function DietaryBadge({
  isVegetarian,
  size = 'sm',
  className,
}: DietaryBadgeProps): React.ReactElement {
  return (
    <Badge variant={isVegetarian ? 'veg' : 'nonveg'} size={size} className={className}>
      <span
        className={cn('mr-1.5 h-2 w-2 rounded-full', isVegetarian ? 'bg-green-500' : 'bg-red-500')}
      />
      {isVegetarian ? 'Veg' : 'Non-Veg'}
    </Badge>
  )
}

interface SpiceLevelBadgeProps {
  level: 'mild' | 'medium' | 'hot' | 'very-hot'
  size?: BadgeSize
  className?: string
}

const spiceLevelLabels: Record<SpiceLevelBadgeProps['level'], string> = {
  mild: 'Mild',
  medium: 'Medium',
  hot: 'Hot',
  'very-hot': 'Very Hot',
}

const spiceLevelColors: Record<SpiceLevelBadgeProps['level'], string> = {
  mild: 'bg-yellow-100 text-yellow-700',
  medium: 'bg-orange-100 text-orange-700',
  hot: 'bg-red-100 text-red-700',
  'very-hot': 'bg-red-200 text-red-800',
}

export function SpiceLevelBadge({
  level,
  size = 'sm',
  className,
}: SpiceLevelBadgeProps): React.ReactElement {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full font-medium whitespace-nowrap',
        spiceLevelColors[level],
        sizeStyles[size],
        className
      )}
    >
      <span className="mr-1">🌶️</span>
      {spiceLevelLabels[level]}
    </span>
  )
}
