/**
 * Global type definitions for Ada-e-Haandi website
 */

// Menu Item types
export interface MenuItem {
  id: string
  name: string
  nameHindi?: string
  slug: string
  description: string
  category: MenuCategory
  cuisine?: CuisineType
  dietaryInfo: DietaryTag[]
  images: ImageAsset[]
  price?: number
  servingSize?: string
  featured: boolean
  publishedAt?: string
}

export type MenuCategory =
  | 'tandoor'
  | 'curries-veg'
  | 'curries-nonveg'
  | 'biryani-rice'
  | 'breads'
  | 'chinese'
  | 'beverages'
  | 'desserts'

export type CuisineType = 'punjabi' | 'mughlai' | 'awadhi' | 'tandoori' | 'chinese'

export type DietaryTag = 'vegetarian' | 'vegan' | 'halal' | 'gluten-free' | 'spicy'

// Service Package types
export interface ServicePackage {
  id: string
  name: string
  slug: string
  type: ServiceType
  description: string
  priceRange: PriceRange
  minimumGuests: number
  features: string[]
  includedItems: string[]
  heroImage: ImageAsset
  galleryImages: ImageAsset[]
}

export type ServiceType =
  | 'wedding'
  | 'corporate'
  | 'private-party'
  | 'religious'
  | 'birthday'
  | 'festival'

export interface PriceRange {
  min: number
  max: number
}

// Testimonial types
export interface Testimonial {
  id: string
  clientName: string
  company?: string
  eventType: ServiceType
  quote: string
  rating: number
  clientPhoto?: ImageAsset
  featured: boolean
}

// Gallery types
export interface GalleryItem {
  id: string
  image: ImageAsset
  eventType: ServiceType
  date?: string
  venue?: string
  description?: string
}

// Inquiry/Contact form types
export interface InquiryFormData {
  name: string
  email: string
  phone: string
  eventType: ServiceType
  eventDate?: string
  guestCount?: number
  venue?: string
  budget?: string
  dietaryRequirements?: string[]
  additionalServices?: string[]
  message?: string
}

export type InquiryStatus = 'new' | 'contacted' | 'converted' | 'closed'

// Common types
export interface ImageAsset {
  id: string
  url: string
  alt: string
  width?: number
  height?: number
  caption?: string
}

// Site Settings
export interface SiteSettings {
  businessName: string
  tagline: string
  description: string
  phones: string[]
  email: string
  address: {
    street: string
    city: string
    state: string
    pincode: string
  }
  socialLinks: {
    instagram?: string
    facebook?: string
  }
  operatingHours: string
  fssaiNumber?: string
}

// Navigation
export interface NavItem {
  label: string
  href: string
  children?: NavItem[]
}
