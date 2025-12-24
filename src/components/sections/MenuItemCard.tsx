import Image from 'next/image'
import { Badge, DietaryBadge, SpiceLevelBadge } from '@/components/ui/Badge'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs: (string | undefined | null | false)[]): string {
  return twMerge(clsx(inputs))
}

interface MenuItem {
  id: string
  name: string
  nameHindi?: string
  description?: string
  category: string
  cuisine: string
  isVegetarian: boolean
  isSpicy?: boolean
  spiceLevel?: 'mild' | 'medium' | 'hot' | 'very-hot'
  price?: number
  servingSize?: string
  image?: string
  featured?: boolean
}

interface MenuItemCardProps {
  item: MenuItem
  variant?: 'default' | 'compact' | 'featured'
  onClick?: (() => void) | undefined
  className?: string
}

const categoryLabels: Record<string, string> = {
  tandoor: 'Tandoor',
  'curries-veg': 'Veg Curry',
  'curries-nonveg': 'Non-Veg Curry',
  'rice-biryani': 'Rice & Biryani',
  breads: 'Breads',
  chinese: 'Chinese',
  starters: 'Starters',
  'soups-salads': 'Soups & Salads',
  desserts: 'Desserts',
  beverages: 'Beverages',
}

export function MenuItemCard({
  item,
  variant = 'default',
  onClick,
  className,
}: MenuItemCardProps): React.ReactElement {
  const {
    name,
    nameHindi,
    description,
    category,
    isVegetarian,
    isSpicy,
    spiceLevel,
    price,
    image,
    featured,
  } = item

  if (variant === 'compact') {
    return (
      <div
        className={cn(
          'shadow-elegant hover:shadow-elegant-lg flex items-center gap-4 rounded-xl bg-white p-4 transition-shadow',
          onClick && 'cursor-pointer',
          className
        )}
        onClick={onClick}
        role={onClick ? 'button' : undefined}
        tabIndex={onClick ? 0 : undefined}
      >
        {image && (
          <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg">
            <Image src={image} alt={name} fill className="object-cover" sizes="80px" />
          </div>
        )}
        <div className="min-w-0 flex-1">
          <div className="mb-1 flex items-center gap-2">
            <DietaryBadge isVegetarian={isVegetarian} size="sm" />
            {isSpicy && spiceLevel && <SpiceLevelBadge level={spiceLevel} size="sm" />}
          </div>
          <h3 className="text-navy-700 truncate font-semibold">{name}</h3>
          {nameHindi && <p className="text-navy-400 truncate text-sm">{nameHindi}</p>}
        </div>
        {price && <div className="text-gold-600 font-semibold">₹{price}</div>}
      </div>
    )
  }

  if (variant === 'featured') {
    return (
      <div
        className={cn(
          'group shadow-elegant hover:shadow-elegant-lg overflow-hidden rounded-2xl bg-white transition-all hover:-translate-y-1',
          onClick && 'cursor-pointer',
          className
        )}
        onClick={onClick}
        role={onClick ? 'button' : undefined}
        tabIndex={onClick ? 0 : undefined}
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          {image ? (
            <Image
              src={image}
              alt={name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="bg-cream-200 flex h-full w-full items-center justify-center">
              <span className="text-navy-300 text-4xl">🍛</span>
            </div>
          )}
          {featured && (
            <Badge variant="primary" className="absolute top-3 left-3">
              Signature
            </Badge>
          )}
          <div className="absolute bottom-3 left-3 flex gap-2">
            <DietaryBadge isVegetarian={isVegetarian} />
          </div>
        </div>
        <div className="p-5">
          <div className="mb-2 flex items-start justify-between gap-2">
            <div>
              <h3 className="text-heading-sm text-navy-700 font-serif">{name}</h3>
              {nameHindi && <p className="text-navy-400 text-sm">{nameHindi}</p>}
            </div>
            {price && (
              <span className="text-gold-600 font-semibold whitespace-nowrap">₹{price}</span>
            )}
          </div>
          {description && <p className="text-navy-500 text-body-sm line-clamp-2">{description}</p>}
          <div className="mt-3 flex items-center gap-2">
            <Badge variant="secondary" size="sm">
              {categoryLabels[category] || category}
            </Badge>
            {isSpicy && spiceLevel && <SpiceLevelBadge level={spiceLevel} size="sm" />}
          </div>
        </div>
      </div>
    )
  }

  // Default variant
  return (
    <div
      className={cn(
        'shadow-elegant hover:shadow-elegant-lg overflow-hidden rounded-2xl bg-white transition-shadow',
        onClick && 'cursor-pointer',
        className
      )}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      <div className="relative aspect-video overflow-hidden">
        {image ? (
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="bg-cream-200 flex h-full w-full items-center justify-center">
            <span className="text-navy-300 text-4xl">🍛</span>
          </div>
        )}
        <div className="absolute top-3 left-3">
          <DietaryBadge isVegetarian={isVegetarian} />
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-navy-700 mb-1 font-semibold">{name}</h3>
        {description && <p className="text-navy-500 mb-3 line-clamp-2 text-sm">{description}</p>}
        <div className="flex items-center justify-between">
          <Badge variant="secondary" size="sm">
            {categoryLabels[category] || category}
          </Badge>
          {price && <span className="text-gold-600 font-semibold">₹{price}</span>}
        </div>
      </div>
    </div>
  )
}

interface MenuGridProps {
  items: MenuItem[]
  variant?: 'default' | 'compact' | 'featured'
  columns?: 2 | 3 | 4
  onItemClick?: (item: MenuItem) => void
  className?: string
}

export function MenuGrid({
  items,
  variant = 'default',
  columns = 3,
  onItemClick,
  className,
}: MenuGridProps): React.ReactElement {
  const colStyles = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
  }

  return (
    <div className={cn('grid gap-6', colStyles[columns], className)}>
      {items.map((item) => (
        <MenuItemCard
          key={item.id}
          item={item}
          variant={variant}
          onClick={onItemClick ? () => onItemClick(item) : undefined}
        />
      ))}
    </div>
  )
}
