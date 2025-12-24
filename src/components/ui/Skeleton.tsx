import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs: (string | undefined | null | false)[]): string {
  return twMerge(clsx(inputs))
}

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded'
  width?: string | number
  height?: string | number
  animation?: 'pulse' | 'shimmer' | 'none'
}

export function Skeleton({
  variant = 'text',
  width,
  height,
  animation = 'shimmer',
  className,
  style,
  ...props
}: SkeletonProps): React.ReactElement {
  const variantStyles = {
    text: 'rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-none',
    rounded: 'rounded-xl',
  }

  const animationStyles = {
    pulse: 'animate-pulse',
    shimmer:
      'animate-shimmer bg-gradient-to-r from-cream-200 via-cream-100 to-cream-200 bg-[length:200%_100%]',
    none: '',
  }

  return (
    <div
      className={cn(
        'bg-cream-200',
        variantStyles[variant],
        animationStyles[animation],
        variant === 'text' && 'h-4',
        className
      )}
      style={{
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
        ...style,
      }}
      aria-hidden="true"
      {...props}
    />
  )
}

export function SkeletonText({
  lines = 3,
  className,
}: {
  lines?: number
  className?: string
}): React.ReactElement {
  return (
    <div className={cn('space-y-2', className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton key={i} variant="text" width={i === lines - 1 ? '75%' : '100%'} />
      ))}
    </div>
  )
}

export function SkeletonCard({ className }: { className?: string }): React.ReactElement {
  return (
    <div className={cn('shadow-elegant rounded-2xl bg-white p-6', className)}>
      <Skeleton variant="rounded" height={200} className="mb-4" />
      <Skeleton variant="text" width="60%" height={24} className="mb-2" />
      <SkeletonText lines={2} />
      <div className="mt-4 flex gap-2">
        <Skeleton variant="rounded" width={80} height={32} />
        <Skeleton variant="rounded" width={80} height={32} />
      </div>
    </div>
  )
}

export function SkeletonMenuItem({ className }: { className?: string }): React.ReactElement {
  return (
    <div className={cn('shadow-elegant rounded-2xl bg-white p-4', className)}>
      <Skeleton variant="rounded" height={180} className="mb-4" />
      <div className="mb-2 flex items-center gap-2">
        <Skeleton variant="rounded" width={50} height={20} />
        <Skeleton variant="rounded" width={60} height={20} />
      </div>
      <Skeleton variant="text" width="80%" height={20} className="mb-2" />
      <Skeleton variant="text" width="100%" height={16} className="mb-1" />
      <Skeleton variant="text" width="60%" height={16} />
    </div>
  )
}
