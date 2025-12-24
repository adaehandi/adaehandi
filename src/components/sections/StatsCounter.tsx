'use client'

import { useEffect, useRef, useState } from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs: (string | undefined | null | false)[]): string {
  return twMerge(clsx(inputs))
}

interface Stat {
  value: string
  label: string
  prefix?: string
  suffix?: string
}

interface StatsCounterProps {
  stats: Stat[]
  variant?: 'default' | 'navy' | 'transparent'
  className?: string
}

const variantStyles = {
  default: 'bg-white shadow-elegant',
  navy: 'bg-navy-600 text-white',
  transparent: 'bg-transparent',
}

export function StatsCounter({
  stats,
  variant = 'default',
  className,
}: StatsCounterProps): React.ReactElement {
  return (
    <div
      className={cn('rounded-2xl px-6 py-8 sm:px-10 sm:py-12', variantStyles[variant], className)}
    >
      <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
        {stats.map((stat, index) => (
          <StatItem key={index} stat={stat} variant={variant} />
        ))}
      </div>
    </div>
  )
}

interface StatItemProps {
  stat: Stat
  variant: 'default' | 'navy' | 'transparent'
}

function StatItem({ stat, variant }: StatItemProps): React.ReactElement {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry && entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className="text-center">
      <div
        className={cn(
          'text-display-sm sm:text-display-md font-serif transition-all duration-700',
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0',
          variant === 'default' ? 'text-gold-500' : 'text-gold-400'
        )}
      >
        {stat.prefix}
        {stat.value}
        {stat.suffix}
      </div>
      <div
        className={cn(
          'text-body-sm sm:text-body-md mt-2 font-medium',
          variant === 'default' ? 'text-navy-600' : 'text-white/80'
        )}
      >
        {stat.label}
      </div>
    </div>
  )
}

interface FloatingStatsProps {
  stats: Stat[]
  className?: string
}

export function FloatingStats({ stats, className }: FloatingStatsProps): React.ReactElement {
  return (
    <div
      className={cn(
        'absolute bottom-0 left-1/2 z-20 w-[90%] max-w-4xl -translate-x-1/2 translate-y-1/2',
        className
      )}
    >
      <StatsCounter stats={stats} variant="default" />
    </div>
  )
}
