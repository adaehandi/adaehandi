'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { ArrowRight, Download, X, ChefHat, Flame, Leaf } from 'lucide-react'
import { cn } from '@/lib/utils'

// Menu categories based on MenuItems collection
const categories = [
  { id: 'all', label: 'All' },
  { id: 'tandoor', label: 'Tandoor' },
  { id: 'curries-veg', label: 'Veg Curries' },
  { id: 'curries-nonveg', label: 'Non-Veg Curries' },
  { id: 'rice-biryani', label: 'Rice & Biryani' },
  { id: 'breads', label: 'Breads' },
  { id: 'starters', label: 'Starters' },
  { id: 'desserts', label: 'Desserts' },
  { id: 'beverages', label: 'Beverages' },
] as const

// Placeholder menu data - will be replaced with Payload CMS data
const menuItems = [
  // Tandoor
  {
    id: '1',
    name: 'Tandoori Chicken',
    description: 'Classic whole chicken marinated in yogurt and spices, cooked in clay tandoor',
    category: 'tandoor',
    isVegetarian: false,
    isSpicy: true,
    spiceLevel: 'medium' as const,
    featured: true,
  },
  {
    id: '2',
    name: 'Seekh Kebab',
    description: 'Minced lamb skewers with aromatic spices, grilled to perfection',
    category: 'tandoor',
    isVegetarian: false,
    isSpicy: true,
    spiceLevel: 'medium' as const,
    featured: true,
  },
  {
    id: '3',
    name: 'Paneer Tikka',
    description: 'Cottage cheese cubes marinated in spiced yogurt, chargrilled',
    category: 'tandoor',
    isVegetarian: true,
    isSpicy: false,
    spiceLevel: 'mild' as const,
    featured: true,
  },
  {
    id: '4',
    name: 'Malai Chicken Tikka',
    description: 'Creamy chicken tikka with cashew and cream marinade',
    category: 'tandoor',
    isVegetarian: false,
    isSpicy: false,
    spiceLevel: 'mild' as const,
    featured: false,
  },
  // Veg Curries
  {
    id: '5',
    name: 'Dal Makhani',
    description: 'Black lentils slow-cooked overnight with butter and cream',
    category: 'curries-veg',
    isVegetarian: true,
    isSpicy: false,
    spiceLevel: 'mild' as const,
    featured: true,
  },
  {
    id: '6',
    name: 'Paneer Butter Masala',
    description: 'Cottage cheese in rich tomato-butter gravy',
    category: 'curries-veg',
    isVegetarian: true,
    isSpicy: false,
    spiceLevel: 'mild' as const,
    featured: true,
  },
  {
    id: '7',
    name: 'Palak Paneer',
    description: 'Fresh spinach curry with cottage cheese cubes',
    category: 'curries-veg',
    isVegetarian: true,
    isSpicy: false,
    spiceLevel: 'mild' as const,
    featured: false,
  },
  {
    id: '8',
    name: 'Aloo Gobi',
    description: 'Potato and cauliflower cooked with aromatic spices',
    category: 'curries-veg',
    isVegetarian: true,
    isSpicy: true,
    spiceLevel: 'medium' as const,
    featured: false,
  },
  // Non-Veg Curries
  {
    id: '9',
    name: 'Butter Chicken',
    description: 'Tandoori chicken in creamy tomato-butter sauce - our signature dish',
    category: 'curries-nonveg',
    isVegetarian: false,
    isSpicy: false,
    spiceLevel: 'mild' as const,
    featured: true,
  },
  {
    id: '10',
    name: 'Mutton Rogan Josh',
    description: 'Kashmiri-style lamb curry with aromatic spices',
    category: 'curries-nonveg',
    isVegetarian: false,
    isSpicy: true,
    spiceLevel: 'medium' as const,
    featured: true,
  },
  {
    id: '11',
    name: 'Chicken Korma',
    description: 'Mild chicken curry with cashews, cream, and saffron',
    category: 'curries-nonveg',
    isVegetarian: false,
    isSpicy: false,
    spiceLevel: 'mild' as const,
    featured: false,
  },
  {
    id: '12',
    name: 'Keema Matar',
    description: 'Minced mutton cooked with green peas and spices',
    category: 'curries-nonveg',
    isVegetarian: false,
    isSpicy: true,
    spiceLevel: 'hot' as const,
    featured: false,
  },
  // Rice & Biryani
  {
    id: '13',
    name: 'Lucknowi Biryani',
    description: 'Aromatic basmati rice layered with tender mutton, dum-cooked',
    category: 'rice-biryani',
    isVegetarian: false,
    isSpicy: true,
    spiceLevel: 'medium' as const,
    featured: true,
  },
  {
    id: '14',
    name: 'Veg Biryani',
    description: 'Fragrant rice with mixed vegetables and saffron',
    category: 'rice-biryani',
    isVegetarian: true,
    isSpicy: true,
    spiceLevel: 'medium' as const,
    featured: true,
  },
  {
    id: '15',
    name: 'Jeera Rice',
    description: 'Cumin-tempered basmati rice',
    category: 'rice-biryani',
    isVegetarian: true,
    isSpicy: false,
    spiceLevel: 'mild' as const,
    featured: false,
  },
  // Breads
  {
    id: '16',
    name: 'Butter Naan',
    description: 'Soft leavened bread brushed with butter',
    category: 'breads',
    isVegetarian: true,
    isSpicy: false,
    spiceLevel: 'mild' as const,
    featured: true,
  },
  {
    id: '17',
    name: 'Garlic Naan',
    description: 'Naan topped with fresh garlic and coriander',
    category: 'breads',
    isVegetarian: true,
    isSpicy: false,
    spiceLevel: 'mild' as const,
    featured: false,
  },
  {
    id: '18',
    name: 'Laccha Paratha',
    description: 'Multi-layered flaky whole wheat bread',
    category: 'breads',
    isVegetarian: true,
    isSpicy: false,
    spiceLevel: 'mild' as const,
    featured: false,
  },
  // Starters
  {
    id: '19',
    name: 'Samosa',
    description: 'Crispy pastry filled with spiced potatoes and peas',
    category: 'starters',
    isVegetarian: true,
    isSpicy: true,
    spiceLevel: 'medium' as const,
    featured: true,
  },
  {
    id: '20',
    name: 'Chicken Tikka',
    description: 'Boneless chicken pieces in spiced yogurt marinade',
    category: 'starters',
    isVegetarian: false,
    isSpicy: true,
    spiceLevel: 'medium' as const,
    featured: true,
  },
  // Desserts
  {
    id: '21',
    name: 'Gulab Jamun',
    description: 'Soft milk dumplings soaked in rose-flavored sugar syrup',
    category: 'desserts',
    isVegetarian: true,
    isSpicy: false,
    spiceLevel: 'mild' as const,
    featured: true,
  },
  {
    id: '22',
    name: 'Kheer',
    description: 'Creamy rice pudding with cardamom and nuts',
    category: 'desserts',
    isVegetarian: true,
    isSpicy: false,
    spiceLevel: 'mild' as const,
    featured: false,
  },
  // Beverages
  {
    id: '23',
    name: 'Mango Lassi',
    description: 'Sweet yogurt drink blended with fresh mango',
    category: 'beverages',
    isVegetarian: true,
    isSpicy: false,
    spiceLevel: 'mild' as const,
    featured: true,
  },
  {
    id: '24',
    name: 'Masala Chai',
    description: 'Spiced Indian tea with cardamom and ginger',
    category: 'beverages',
    isVegetarian: true,
    isSpicy: false,
    spiceLevel: 'mild' as const,
    featured: false,
  },
]

type MenuItem = (typeof menuItems)[number]

interface MenuItemModalProps {
  item: MenuItem
  onClose: () => void
}

function MenuItemModal({ item, onClose }: MenuItemModalProps): React.ReactElement {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        className="bg-navy-900/60 animate-fade-in fixed inset-0 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Content */}
      <div className="animate-scale-in shadow-elegant-lg relative w-full max-w-lg rounded-2xl bg-white">
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="text-navy-400 hover:text-navy-600 hover:bg-cream-100 absolute top-4 right-4 z-10 rounded-full p-2 transition-colors"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Image placeholder */}
        <div className="bg-navy-100 flex aspect-video items-center justify-center rounded-t-2xl">
          <ChefHat className="text-navy-200 h-20 w-20" />
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Badges */}
          <div className="mb-3 flex flex-wrap gap-2">
            {item.isVegetarian ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                <Leaf className="h-3 w-3" />
                Vegetarian
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700">
                Non-Veg
              </span>
            )}
            {item.isSpicy && (
              <span className="inline-flex items-center gap-1 rounded-full bg-orange-100 px-3 py-1 text-xs font-medium text-orange-700">
                <Flame className="h-3 w-3" />
                {item.spiceLevel === 'mild'
                  ? 'Mild'
                  : item.spiceLevel === 'medium'
                    ? 'Medium'
                    : item.spiceLevel === 'hot'
                      ? 'Hot'
                      : 'Very Hot'}
              </span>
            )}
          </div>

          <h3 className="text-navy-700 mb-2 font-serif text-2xl font-bold">{item.name}</h3>
          <p className="text-navy-600/80 mb-6 text-base leading-relaxed">{item.description}</p>

          {/* CTA */}
          <Link
            href="/get-quote"
            className="bg-gold-500 text-navy-700 shadow-gold hover:bg-gold-600 inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3 font-semibold transition-all hover:shadow-lg"
          >
            Include in Your Quote
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function MenuPage(): React.ReactElement {
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [showVegOnly, setShowVegOnly] = useState(false)
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null)

  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      const categoryMatch = activeCategory === 'all' || item.category === activeCategory
      const vegMatch = !showVegOnly || item.isVegetarian
      return categoryMatch && vegMatch
    })
  }, [activeCategory, showVegOnly])

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-navy relative pt-32 pb-16">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-gold-500 mb-2 text-sm font-medium tracking-widest uppercase">
            Our Culinary Offerings
          </p>
          <h1 className="mb-4 font-serif text-4xl font-bold text-white sm:text-5xl">Our Menu</h1>
          <p className="mx-auto max-w-2xl text-lg text-white/80">
            Authentic North Indian cuisine crafted with the finest ingredients and 27 years of
            culinary expertise. Perfect for weddings, corporate events, and celebrations.
          </p>
        </div>
      </section>

      {/* Filters Section */}
      <section className="border-cream-300 sticky top-20 z-40 border-b bg-white/95 py-4 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            {/* Category Tabs */}
            <div className="scrollbar-hide flex gap-2 overflow-x-auto pb-2 sm:pb-0">
              {categories.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => setActiveCategory(category.id)}
                  className={cn(
                    'shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-all',
                    activeCategory === category.id
                      ? 'bg-navy-500 shadow-elegant text-white'
                      : 'bg-cream-100 text-navy-600 hover:bg-cream-200'
                  )}
                >
                  {category.label}
                </button>
              ))}
            </div>

            {/* Veg Toggle */}
            <div className="flex items-center gap-3">
              <span className="text-navy-600 text-sm">Veg Only</span>
              <button
                type="button"
                onClick={() => setShowVegOnly(!showVegOnly)}
                className={cn(
                  'relative h-6 w-11 rounded-full transition-colors',
                  showVegOnly ? 'bg-green-500' : 'bg-cream-300'
                )}
                aria-pressed={showVegOnly}
              >
                <span
                  className={cn(
                    'absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform',
                    showVegOnly ? 'translate-x-5' : 'translate-x-0'
                  )}
                />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Grid */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {filteredItems.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelectedItem(item)}
                  className="shadow-elegant hover:shadow-elegant-lg group overflow-hidden rounded-2xl bg-white text-left transition-all hover:-translate-y-1"
                >
                  {/* Image placeholder */}
                  <div className="bg-navy-100 relative aspect-[4/3] overflow-hidden">
                    <div className="flex h-full items-center justify-center transition-transform duration-300 group-hover:scale-105">
                      <ChefHat className="text-navy-200 h-12 w-12" />
                    </div>
                    {item.featured && (
                      <span className="bg-gold-500 text-navy-700 absolute top-3 left-3 rounded-full px-2 py-1 text-xs font-semibold">
                        Signature
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    {/* Badges */}
                    <div className="mb-2 flex flex-wrap gap-1.5">
                      {item.isVegetarian ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
                          <Leaf className="h-3 w-3" />
                          Veg
                        </span>
                      ) : (
                        <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-700">
                          Non-Veg
                        </span>
                      )}
                      {item.isSpicy && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-orange-100 px-2 py-0.5 text-xs font-medium text-orange-700">
                          <Flame className="h-3 w-3" />
                        </span>
                      )}
                    </div>

                    <h3 className="text-navy-700 group-hover:text-gold-600 mb-1 font-serif text-lg font-bold transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-navy-600/70 line-clamp-2 text-sm">{item.description}</p>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="py-16 text-center">
              <ChefHat className="text-navy-200 mx-auto mb-4 h-16 w-16" />
              <h3 className="text-navy-700 mb-2 font-serif text-xl font-bold">No items found</h3>
              <p className="text-navy-600/70">
                Try adjusting your filters or browse all categories.
              </p>
              <button
                type="button"
                onClick={() => {
                  setActiveCategory('all')
                  setShowVegOnly(false)
                }}
                className="text-gold-600 hover:text-gold-700 mt-4 font-semibold"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Download & Custom Menu CTA */}
      <section className="border-cream-300 bg-cream-100 border-t py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-8 md:grid-cols-2">
            {/* Download PDF */}
            <div className="shadow-elegant rounded-2xl bg-white p-8">
              <div className="bg-gold-500/10 mb-4 inline-flex rounded-full p-3">
                <Download className="text-gold-600 h-6 w-6" />
              </div>
              <h3 className="text-navy-700 mb-2 font-serif text-xl font-bold">
                Download Full Menu
              </h3>
              <p className="text-navy-600/70 mb-6">
                Get our complete menu with detailed descriptions and pricing information.
              </p>
              <a
                href="/Ada E Haandi Menu-6x10.5-Nov - DIKSHA Madan.pdf"
                download
                className="border-navy-500 text-navy-500 hover:bg-navy-500 inline-flex items-center gap-2 rounded-full border-2 px-6 py-2.5 font-semibold transition-all hover:text-white"
              >
                <Download className="h-4 w-4" />
                Download PDF Menu
              </a>
            </div>

            {/* Custom Menu CTA */}
            <div className="bg-navy-700 shadow-elegant-lg rounded-2xl p-8 text-white">
              <h3 className="text-gold-500 mb-2 font-serif text-xl font-bold">
                Need a Custom Menu?
              </h3>
              <p className="mb-6 text-white/80">
                We specialize in creating personalized menus for your special occasions. Tell us
                your requirements and dietary preferences.
              </p>
              <Link
                href="/get-quote"
                className="bg-gold-500 text-navy-700 shadow-gold hover:bg-gold-600 inline-flex items-center gap-2 rounded-full px-6 py-2.5 font-semibold transition-all hover:shadow-lg"
              >
                Request Custom Menu
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      {selectedItem && <MenuItemModal item={selectedItem} onClose={() => setSelectedItem(null)} />}
    </>
  )
}
