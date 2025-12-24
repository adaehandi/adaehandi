'use client'

import { useState } from 'react'
import Image from 'next/image'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs: (string | undefined | null | false)[]): string {
  return twMerge(clsx(inputs))
}

interface BlurImageProps extends Omit<React.ComponentProps<typeof Image>, 'onLoad'> {
  wrapperClassName?: string
}

export function BlurImage({
  src,
  alt,
  className,
  wrapperClassName,
  ...props
}: BlurImageProps): React.ReactElement {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div className={cn('overflow-hidden', wrapperClassName)}>
      <Image
        src={src}
        alt={alt}
        className={cn(
          'transition-all duration-500',
          isLoading ? 'scale-105 blur-lg' : 'blur-0 scale-100',
          className
        )}
        onLoad={() => setIsLoading(false)}
        {...props}
      />
    </div>
  )
}

interface AspectImageProps extends BlurImageProps {
  aspect?: 'square' | 'video' | 'wide' | 'portrait'
}

const aspectStyles = {
  square: 'aspect-square',
  video: 'aspect-video',
  wide: 'aspect-[21/9]',
  portrait: 'aspect-[3/4]',
}

export function AspectImage({
  aspect = 'video',
  wrapperClassName,
  ...props
}: AspectImageProps): React.ReactElement {
  return (
    <BlurImage
      wrapperClassName={cn('relative', aspectStyles[aspect], wrapperClassName)}
      fill
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      {...props}
    />
  )
}

interface HeroImageProps extends BlurImageProps {
  overlay?: boolean
  overlayOpacity?: number
}

export function HeroImage({
  overlay = true,
  overlayOpacity = 0.5,
  wrapperClassName,
  ...props
}: HeroImageProps): React.ReactElement {
  return (
    <div className={cn('relative h-full w-full', wrapperClassName)}>
      <BlurImage fill priority sizes="100vw" className="object-cover" {...props} />
      {overlay && (
        <div
          className="bg-navy-900 absolute inset-0"
          style={{ opacity: overlayOpacity }}
          aria-hidden="true"
        />
      )}
    </div>
  )
}
