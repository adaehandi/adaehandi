import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs: (string | undefined | null | false)[]): string {
  return twMerge(clsx(inputs))
}

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'outlined'
  padding?: 'none' | 'sm' | 'md' | 'lg'
  hover?: boolean
  children: React.ReactNode
}

const variantStyles = {
  default: 'bg-white',
  elevated: 'bg-white shadow-elegant',
  outlined: 'bg-white border border-cream-400',
}

const paddingStyles = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
}

export function Card({
  variant = 'elevated',
  padding = 'md',
  hover = false,
  children,
  className,
  ...props
}: CardProps): React.ReactElement {
  return (
    <div
      className={cn(
        'overflow-hidden rounded-2xl transition-all duration-300',
        variantStyles[variant],
        paddingStyles[padding],
        hover && 'hover:shadow-elegant-lg cursor-pointer hover:-translate-y-1',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export function CardHeader({ children, className, ...props }: CardHeaderProps): React.ReactElement {
  return (
    <div className={cn('mb-4', className)} {...props}>
      {children}
    </div>
  )
}

interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: 'h2' | 'h3' | 'h4'
  children: React.ReactNode
}

export function CardTitle({
  as: Component = 'h3',
  children,
  className,
  ...props
}: CardTitleProps): React.ReactElement {
  return (
    <Component className={cn('text-heading-sm text-navy-700 font-serif', className)} {...props}>
      {children}
    </Component>
  )
}

interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode
}

export function CardDescription({
  children,
  className,
  ...props
}: CardDescriptionProps): React.ReactElement {
  return (
    <p className={cn('text-body-md text-navy-500', className)} {...props}>
      {children}
    </p>
  )
}

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export function CardContent({
  children,
  className,
  ...props
}: CardContentProps): React.ReactElement {
  return (
    <div className={cn('', className)} {...props}>
      {children}
    </div>
  )
}

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export function CardFooter({ children, className, ...props }: CardFooterProps): React.ReactElement {
  return (
    <div className={cn('border-cream-200 mt-4 border-t pt-4', className)} {...props}>
      {children}
    </div>
  )
}
