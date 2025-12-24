'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs: (string | undefined | null | false)[]): string {
  return twMerge(clsx(inputs))
}

interface Testimonial {
  id: string
  clientName: string
  company?: string
  eventType: string
  quote: string
  rating: number
  clientPhoto?: string
  eventDate?: string
}

interface TestimonialCardProps {
  testimonial: Testimonial
  variant?: 'default' | 'compact'
  className?: string
}

export function TestimonialCard({
  testimonial,
  variant = 'default',
  className,
}: TestimonialCardProps): React.ReactElement {
  const { clientName, company, eventType, quote, rating, clientPhoto } = testimonial

  if (variant === 'compact') {
    return (
      <div className={cn('shadow-elegant rounded-2xl bg-white p-6', className)}>
        <div className="mb-3 flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={cn(
                'h-4 w-4',
                i < rating ? 'text-gold-500 fill-gold-500' : 'text-cream-300'
              )}
            />
          ))}
        </div>
        <p className="text-navy-600 text-body-md mb-4 line-clamp-4">&ldquo;{quote}&rdquo;</p>
        <div className="flex items-center gap-3">
          {clientPhoto ? (
            <Image
              src={clientPhoto}
              alt={clientName}
              width={40}
              height={40}
              className="rounded-full object-cover"
            />
          ) : (
            <div className="bg-navy-100 flex h-10 w-10 items-center justify-center rounded-full">
              <span className="text-navy-500 text-sm font-semibold">{clientName.charAt(0)}</span>
            </div>
          )}
          <div>
            <p className="text-navy-700 text-sm font-semibold">{clientName}</p>
            <p className="text-navy-400 text-xs">{eventType}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={cn('shadow-elegant relative rounded-2xl bg-white p-8', className)}>
      <Quote className="text-gold-200 absolute top-6 right-6 h-10 w-10" />
      <div className="mb-4 flex items-center gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={cn('h-5 w-5', i < rating ? 'text-gold-500 fill-gold-500' : 'text-cream-300')}
          />
        ))}
      </div>
      <p className="text-navy-600 text-body-lg mb-6 leading-relaxed">&ldquo;{quote}&rdquo;</p>
      <div className="border-cream-200 flex items-center gap-4 border-t pt-4">
        {clientPhoto ? (
          <Image
            src={clientPhoto}
            alt={clientName}
            width={56}
            height={56}
            className="rounded-full object-cover"
          />
        ) : (
          <div className="bg-navy-100 flex h-14 w-14 items-center justify-center rounded-full">
            <span className="text-navy-500 text-lg font-semibold">{clientName.charAt(0)}</span>
          </div>
        )}
        <div>
          <p className="text-navy-700 font-semibold">{clientName}</p>
          {company && <p className="text-navy-500 text-sm">{company}</p>}
          <p className="text-gold-600 text-sm font-medium">{eventType}</p>
        </div>
      </div>
    </div>
  )
}

interface TestimonialCarouselProps {
  testimonials: Testimonial[]
  autoPlay?: boolean
  autoPlayInterval?: number
  className?: string
}

export function TestimonialCarousel({
  testimonials,
  autoPlay = true,
  autoPlayInterval = 5000,
  className,
}: TestimonialCarouselProps): React.ReactElement {
  const [currentIndex, setCurrentIndex] = useState(0)

  const next = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }, [testimonials.length])

  const prev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }, [testimonials.length])

  useEffect(() => {
    if (!autoPlay) return

    const interval = setInterval(next, autoPlayInterval)
    return () => clearInterval(interval)
  }, [autoPlay, autoPlayInterval, next])

  return (
    <div className={cn('relative', className)}>
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
              <TestimonialCard testimonial={testimonial} />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="mt-8 flex items-center justify-center gap-4">
        <button
          onClick={prev}
          className="shadow-elegant hover:shadow-elegant-lg rounded-full bg-white p-2 transition-shadow"
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="text-navy-600 h-5 w-5" />
        </button>

        <div className="flex gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={cn(
                'h-2.5 w-2.5 rounded-full transition-colors',
                index === currentIndex ? 'bg-gold-500' : 'bg-cream-300'
              )}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        <button
          onClick={next}
          className="shadow-elegant hover:shadow-elegant-lg rounded-full bg-white p-2 transition-shadow"
          aria-label="Next testimonial"
        >
          <ChevronRight className="text-navy-600 h-5 w-5" />
        </button>
      </div>
    </div>
  )
}
