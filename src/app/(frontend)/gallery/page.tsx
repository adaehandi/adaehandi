'use client'

import { useState, useMemo, useCallback, useEffect } from 'react'
import Link from 'next/link'
import { ArrowRight, X, ChevronLeft, ChevronRight, Camera } from 'lucide-react'
import { cn } from '@/lib/utils'

// Gallery categories
const categories = [
  { id: 'all', label: 'All Events' },
  { id: 'wedding', label: 'Weddings' },
  { id: 'corporate', label: 'Corporate' },
  { id: 'party', label: 'Parties' },
  { id: 'religious', label: 'Religious' },
  { id: 'food', label: 'Food' },
] as const

// Placeholder gallery items - will be replaced with Payload CMS data
const galleryItems = [
  {
    id: '1',
    category: 'wedding',
    title: 'Sharma Wedding Reception',
    description: 'Grand wedding reception for 500 guests at Taj Palace, Delhi',
    aspectRatio: 'landscape' as const,
  },
  {
    id: '2',
    category: 'food',
    title: 'Signature Butter Chicken',
    description: 'Our famous butter chicken served at corporate events',
    aspectRatio: 'square' as const,
  },
  {
    id: '3',
    category: 'corporate',
    title: 'Tech Conference 2024',
    description: 'Corporate lunch for 300 attendees at Gurugram',
    aspectRatio: 'landscape' as const,
  },
  {
    id: '4',
    category: 'wedding',
    title: 'Mehendi Ceremony Setup',
    description: 'Colorful mehendi celebration with live counters',
    aspectRatio: 'portrait' as const,
  },
  {
    id: '5',
    category: 'food',
    title: 'Live Tandoor Station',
    description: 'Fresh kebabs prepared at the venue',
    aspectRatio: 'square' as const,
  },
  {
    id: '6',
    category: 'party',
    title: '50th Birthday Celebration',
    description: 'Milestone birthday party with fusion menu',
    aspectRatio: 'landscape' as const,
  },
  {
    id: '7',
    category: 'religious',
    title: 'Satyanarayan Puja',
    description: 'Traditional satvik bhog for religious ceremony',
    aspectRatio: 'square' as const,
  },
  {
    id: '8',
    category: 'wedding',
    title: 'Sangeet Night Buffet',
    description: 'Elaborate buffet setup for sangeet ceremony',
    aspectRatio: 'landscape' as const,
  },
  {
    id: '9',
    category: 'food',
    title: 'Biryani Station',
    description: 'Aromatic dum biryani served fresh',
    aspectRatio: 'portrait' as const,
  },
  {
    id: '10',
    category: 'corporate',
    title: 'Annual Day Celebration',
    description: 'Company annual day dinner for 200 employees',
    aspectRatio: 'landscape' as const,
  },
  {
    id: '11',
    category: 'party',
    title: 'Garden Party Setup',
    description: 'Elegant outdoor party catering',
    aspectRatio: 'square' as const,
  },
  {
    id: '12',
    category: 'food',
    title: 'Dessert Counter',
    description: 'Traditional Indian sweets display',
    aspectRatio: 'square' as const,
  },
  {
    id: '13',
    category: 'wedding',
    title: 'Reception Dinner',
    description: 'Grand reception with multiple cuisines',
    aspectRatio: 'landscape' as const,
  },
  {
    id: '14',
    category: 'religious',
    title: 'Havan Ceremony',
    description: 'Pure vegetarian prasad for havan',
    aspectRatio: 'portrait' as const,
  },
  {
    id: '15',
    category: 'corporate',
    title: 'Product Launch Event',
    description: 'Cocktail and dinner for product launch',
    aspectRatio: 'landscape' as const,
  },
  {
    id: '16',
    category: 'food',
    title: 'Paneer Tikka Platter',
    description: 'Vegetarian tandoori delights',
    aspectRatio: 'square' as const,
  },
]

type GalleryItem = (typeof galleryItems)[number]

interface LightboxProps {
  items: GalleryItem[]
  currentIndex: number
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}

function Lightbox({
  items,
  currentIndex,
  onClose,
  onPrev,
  onNext,
}: LightboxProps): React.ReactElement | null {
  const item = items[currentIndex]

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrev()
      if (e.key === 'ArrowRight') onNext()
    }
    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [onClose, onPrev, onNext])

  // Guard against undefined item
  if (!item) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95">
      {/* Close button */}
      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 z-10 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20"
        aria-label="Close lightbox"
      >
        <X className="h-6 w-6" />
      </button>

      {/* Navigation buttons */}
      <button
        type="button"
        onClick={onPrev}
        className="absolute left-4 z-10 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20"
        aria-label="Previous image"
      >
        <ChevronLeft className="h-8 w-8" />
      </button>

      <button
        type="button"
        onClick={onNext}
        className="absolute right-4 z-10 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20"
        aria-label="Next image"
      >
        <ChevronRight className="h-8 w-8" />
      </button>

      {/* Image container */}
      <div className="flex max-h-[80vh] max-w-5xl flex-col items-center px-16">
        {/* Placeholder image */}
        <div className="bg-navy-800 flex aspect-video w-full max-w-4xl items-center justify-center rounded-lg">
          <Camera className="h-24 w-24 text-white/30" />
        </div>

        {/* Caption */}
        <div className="mt-6 text-center">
          <h3 className="text-xl font-semibold text-white">{item.title}</h3>
          <p className="mt-2 text-white/70">{item.description}</p>
          <p className="mt-4 text-sm text-white/50">
            {currentIndex + 1} of {items.length}
          </p>
        </div>
      </div>
    </div>
  )
}

export default function GalleryPage(): React.ReactElement {
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const filteredItems = useMemo(() => {
    if (activeCategory === 'all') return galleryItems
    return galleryItems.filter((item) => item.category === activeCategory)
  }, [activeCategory])

  const openLightbox = useCallback((index: number): void => {
    setLightboxIndex(index)
  }, [])

  const closeLightbox = useCallback((): void => {
    setLightboxIndex(null)
  }, [])

  const goToPrev = useCallback((): void => {
    setLightboxIndex((prev) => {
      if (prev === null) return null
      return prev === 0 ? filteredItems.length - 1 : prev - 1
    })
  }, [filteredItems.length])

  const goToNext = useCallback((): void => {
    setLightboxIndex((prev) => {
      if (prev === null) return null
      return prev === filteredItems.length - 1 ? 0 : prev + 1
    })
  }, [filteredItems.length])

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-navy relative pt-32 pb-16">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-gold-500 mb-2 text-sm font-medium tracking-widest uppercase">
            Our Work
          </p>
          <h1 className="mb-4 font-serif text-4xl font-bold text-white sm:text-5xl">
            Event Gallery
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-white/80">
            Browse through our portfolio of beautifully catered events. From grand weddings to
            intimate celebrations, see the Ada-e-Haandi difference.
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="border-cream-300 sticky top-20 z-40 border-b bg-white/95 py-4 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="scrollbar-hide flex justify-center gap-2 overflow-x-auto pb-2 sm:pb-0">
            {categories.map((category) => (
              <button
                key={category.id}
                type="button"
                onClick={() => setActiveCategory(category.id)}
                className={cn(
                  'shrink-0 rounded-full px-5 py-2 text-sm font-medium transition-all',
                  activeCategory === category.id
                    ? 'bg-navy-500 shadow-elegant text-white'
                    : 'bg-cream-100 text-navy-600 hover:bg-cream-200'
                )}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid - Masonry-like Layout */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {filteredItems.length > 0 ? (
            <div className="columns-1 gap-6 sm:columns-2 lg:columns-3 xl:columns-4">
              {filteredItems.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => openLightbox(index)}
                  className="group shadow-elegant hover:shadow-elegant-lg mb-6 block w-full overflow-hidden rounded-2xl bg-white text-left transition-all hover:-translate-y-1"
                >
                  {/* Image placeholder with different aspect ratios */}
                  <div
                    className={cn(
                      'bg-navy-100 relative flex items-center justify-center overflow-hidden',
                      item.aspectRatio === 'landscape' && 'aspect-video',
                      item.aspectRatio === 'portrait' && 'aspect-[3/4]',
                      item.aspectRatio === 'square' && 'aspect-square'
                    )}
                  >
                    <Camera className="text-navy-200 h-12 w-12 transition-transform duration-300 group-hover:scale-110" />

                    {/* Hover overlay */}
                    <div className="bg-navy-700/0 group-hover:bg-navy-700/60 absolute inset-0 flex items-center justify-center transition-colors duration-300">
                      <span className="text-gold-500 translate-y-4 font-semibold opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                        View Photo
                      </span>
                    </div>

                    {/* Category badge */}
                    <span className="bg-gold-500/90 text-navy-700 absolute top-3 left-3 rounded-full px-2 py-1 text-xs font-medium capitalize">
                      {item.category}
                    </span>
                  </div>

                  {/* Caption */}
                  <div className="p-4">
                    <h3 className="text-navy-700 group-hover:text-gold-600 font-serif text-lg font-bold transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-navy-600/70 mt-1 line-clamp-2 text-sm">{item.description}</p>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="py-16 text-center">
              <Camera className="text-navy-200 mx-auto mb-4 h-16 w-16" />
              <h3 className="text-navy-700 mb-2 font-serif text-xl font-bold">No photos found</h3>
              <p className="text-navy-600/70">Try selecting a different category.</p>
              <button
                type="button"
                onClick={() => setActiveCategory('all')}
                className="text-gold-600 hover:text-gold-700 mt-4 font-semibold"
              >
                View all photos
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-cream-100 border-cream-300 border-t py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-navy-700 mb-4 font-serif text-3xl font-bold">
            Want Your Event to Look This Good?
          </h2>
          <p className="text-navy-600/80 mb-8 text-lg">
            Let us bring the same level of excellence to your celebration. Contact us today to
            discuss your catering needs.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/get-quote"
              className="bg-gold-500 text-navy-700 shadow-gold hover:bg-gold-600 inline-flex items-center gap-2 rounded-full px-8 py-4 font-semibold transition-all hover:shadow-lg"
            >
              Get a Quote
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="/services"
              className="border-navy-700 text-navy-700 hover:bg-navy-700 inline-flex items-center gap-2 rounded-full border-2 px-8 py-4 font-semibold transition-all hover:text-white"
            >
              Explore Services
            </Link>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          items={filteredItems}
          currentIndex={lightboxIndex}
          onClose={closeLightbox}
          onPrev={goToPrev}
          onNext={goToNext}
        />
      )}
    </>
  )
}
