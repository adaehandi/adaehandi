'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  ArrowLeft,
  Calendar,
  Users,
  Utensils,
  User,
  CheckCircle,
  Phone,
} from 'lucide-react'
import { cn } from '@/lib/utils'

// Step configuration
const steps = [
  { id: 1, title: 'Event Details', icon: Calendar },
  { id: 2, title: 'Menu Preferences', icon: Utensils },
  { id: 3, title: 'Services', icon: Users },
  { id: 4, title: 'Contact Info', icon: User },
]

// Event types
const eventTypes = [
  { value: 'wedding', label: 'Wedding', description: 'Reception, Sangeet, Mehendi' },
  { value: 'corporate', label: 'Corporate Event', description: 'Conference, Meeting, Annual Day' },
  { value: 'party', label: 'Private Party', description: 'Birthday, Anniversary, Celebration' },
  { value: 'religious', label: 'Religious Ceremony', description: 'Puja, Havan, Satyanarayan' },
  { value: 'other', label: 'Other', description: 'Tell us more in the message' },
]

// Cuisine preferences
const cuisineOptions = [
  { value: 'north-indian', label: 'North Indian' },
  { value: 'mughlai', label: 'Mughlai' },
  { value: 'chinese', label: 'Chinese' },
  { value: 'continental', label: 'Continental' },
  { value: 'mix', label: 'Mixed Cuisines' },
]

// Service options
const serviceOptions = [
  { value: 'buffet', label: 'Buffet Setup', description: 'Self-service buffet counters' },
  { value: 'live-counters', label: 'Live Counters', description: 'Chaat, tandoor, pasta stations' },
  { value: 'sit-down', label: 'Sit-down Dinner', description: 'Table service for guests' },
  { value: 'service-staff', label: 'Service Staff', description: 'Professional waiters' },
  { value: 'decoration', label: 'Food Decoration', description: 'Themed food displays' },
  { value: 'crockery', label: 'Crockery & Cutlery', description: 'Premium dining ware' },
]

interface FormData {
  // Step 1: Event Details
  eventType: string
  eventDate: string
  guestCount: string
  venue: string

  // Step 2: Menu Preferences
  cuisinePreference: string
  dietaryPreference: 'veg' | 'nonveg' | 'both'
  spiceLevel: 'mild' | 'medium' | 'spicy'
  specialRequirements: string

  // Step 3: Services
  services: string[]
  budget: string

  // Step 4: Contact Info
  name: string
  email: string
  phone: string
  alternatePhone: string
  message: string
}

interface FormErrors {
  [key: string]: string | undefined
}

export default function GetQuotePage(): React.ReactElement {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    eventType: '',
    eventDate: '',
    guestCount: '',
    venue: '',
    cuisinePreference: 'north-indian',
    dietaryPreference: 'both',
    spiceLevel: 'medium',
    specialRequirements: '',
    services: [],
    budget: '',
    name: '',
    email: '',
    phone: '',
    alternatePhone: '',
    message: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const validateStep = (step: number): boolean => {
    const newErrors: FormErrors = {}

    switch (step) {
      case 1:
        if (!formData.eventType) newErrors.eventType = 'Please select an event type'
        if (!formData.eventDate) newErrors.eventDate = 'Please select a date'
        if (!formData.guestCount) {
          newErrors.guestCount = 'Please enter guest count'
        } else if (parseInt(formData.guestCount) < 25) {
          newErrors.guestCount = 'Minimum 25 guests required'
        }
        break

      case 2:
        // No required fields in step 2
        break

      case 3:
        // No required fields in step 3
        break

      case 4:
        if (!formData.name.trim()) newErrors.name = 'Name is required'
        if (!formData.email.trim()) {
          newErrors.email = 'Email is required'
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          newErrors.email = 'Please enter a valid email'
        }
        if (!formData.phone.trim()) {
          newErrors.phone = 'Phone number is required'
        } else if (!/^[+]?[\d\s-]{10,}$/.test(formData.phone)) {
          newErrors.phone = 'Please enter a valid phone number'
        }
        break
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = (): void => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 4))
    }
  }

  const handlePrev = (): void => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  const handleSubmit = async (): Promise<void> => {
    if (!validateStep(4)) return

    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ): void => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleServiceToggle = (service: string): void => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter((s) => s !== service)
        : [...prev.services, service],
    }))
  }

  if (isSubmitted) {
    return (
      <>
        <section className="bg-gradient-navy relative pt-32 pb-16">
          <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
            <p className="text-gold-500 mb-2 text-sm font-medium tracking-widest uppercase">
              Thank You
            </p>
            <h1 className="mb-4 font-serif text-4xl font-bold text-white sm:text-5xl">
              Quote Request Received!
            </h1>
          </div>
        </section>

        <section className="py-20">
          <div className="mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
            <div className="shadow-elegant rounded-2xl bg-white p-12">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
              <h2 className="text-navy-700 mb-4 font-serif text-2xl font-bold">
                We&apos;ve Got Your Request!
              </h2>
              <p className="text-navy-600/70 mb-8">
                Thank you for choosing Ada-e-Haandi. Our team will review your requirements and get
                back to you within 24 hours with a customized quote.
              </p>

              <div className="bg-cream-100 mb-8 rounded-xl p-6 text-left">
                <h3 className="text-navy-700 mb-4 font-semibold">What happens next?</h3>
                <ul className="text-navy-600/80 space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="bg-gold-500 mt-1.5 h-2 w-2 flex-shrink-0 rounded-full" />
                    Our team will review your event requirements
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="bg-gold-500 mt-1.5 h-2 w-2 flex-shrink-0 rounded-full" />
                    We&apos;ll prepare a customized quote based on your preferences
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="bg-gold-500 mt-1.5 h-2 w-2 flex-shrink-0 rounded-full" />
                    You&apos;ll receive a call or email within 24 hours
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="bg-gold-500 mt-1.5 h-2 w-2 flex-shrink-0 rounded-full" />
                    We can schedule a tasting session if you&apos;d like
                  </li>
                </ul>
              </div>

              <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <Link
                  href="/"
                  className="bg-gold-500 text-navy-700 shadow-gold hover:bg-gold-600 inline-flex items-center gap-2 rounded-full px-8 py-3 font-semibold transition-all hover:shadow-lg"
                >
                  Back to Home
                </Link>
                <a
                  href="tel:+919999342322"
                  className="border-navy-500 text-navy-500 hover:bg-navy-500 inline-flex items-center gap-2 rounded-full border-2 px-8 py-3 font-semibold transition-all hover:text-white"
                >
                  <Phone className="h-4 w-4" />
                  Call Us Now
                </a>
              </div>
            </div>
          </div>
        </section>
      </>
    )
  }

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-navy relative pt-32 pb-8">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-gold-500 mb-2 text-sm font-medium tracking-widest uppercase">
            Free Quote
          </p>
          <h1 className="mb-4 font-serif text-4xl font-bold text-white sm:text-5xl">
            Get a Customized Quote
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-white/80">
            Tell us about your event and we&apos;ll create a personalized catering package for you.
          </p>
        </div>
      </section>

      {/* Progress Steps */}
      <section className="bg-navy-600 py-6">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={cn(
                      'flex h-10 w-10 items-center justify-center rounded-full transition-colors sm:h-12 sm:w-12',
                      currentStep >= step.id
                        ? 'bg-gold-500 text-navy-700'
                        : 'bg-navy-400 text-white/60'
                    )}
                  >
                    {currentStep > step.id ? (
                      <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6" />
                    ) : (
                      <step.icon className="h-5 w-5 sm:h-6 sm:w-6" />
                    )}
                  </div>
                  <p
                    className={cn(
                      'mt-2 hidden text-xs font-medium sm:block',
                      currentStep >= step.id ? 'text-gold-500' : 'text-white/60'
                    )}
                  >
                    {step.title}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={cn(
                      'mx-2 h-0.5 w-8 sm:mx-4 sm:w-16',
                      currentStep > step.id ? 'bg-gold-500' : 'bg-navy-400'
                    )}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="shadow-elegant rounded-2xl bg-white p-8">
            {/* Step 1: Event Details */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <h2 className="text-navy-700 font-serif text-2xl font-bold">
                  Tell Us About Your Event
                </h2>

                {/* Event Type */}
                <div>
                  <label className="text-navy-700 mb-3 block text-sm font-medium">
                    Event Type <span className="text-red-500">*</span>
                  </label>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {eventTypes.map((type) => (
                      <button
                        key={type.value}
                        type="button"
                        onClick={() => {
                          setFormData((prev) => ({ ...prev, eventType: type.value }))
                          setErrors((prev) => ({ ...prev, eventType: undefined }))
                        }}
                        className={cn(
                          'rounded-xl border-2 p-4 text-left transition-all',
                          formData.eventType === type.value
                            ? 'border-gold-500 bg-gold-500/5'
                            : 'border-cream-300 hover:border-cream-400'
                        )}
                      >
                        <p className="text-navy-700 font-semibold">{type.label}</p>
                        <p className="text-navy-500 text-sm">{type.description}</p>
                      </button>
                    ))}
                  </div>
                  {errors.eventType && (
                    <p className="mt-2 text-sm text-red-600">{errors.eventType}</p>
                  )}
                </div>

                {/* Date and Guest Count */}
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="eventDate"
                      className="text-navy-700 mb-1.5 block text-sm font-medium"
                    >
                      Event Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      id="eventDate"
                      name="eventDate"
                      value={formData.eventDate}
                      onChange={handleChange}
                      min={new Date().toISOString().split('T')[0]}
                      className={cn(
                        'text-navy-700 w-full rounded-xl border bg-white px-4 py-3',
                        'focus:ring-gold-500 focus:border-transparent focus:ring-2 focus:outline-none',
                        errors.eventDate
                          ? 'border-red-500'
                          : 'border-cream-300 hover:border-cream-400'
                      )}
                    />
                    {errors.eventDate && (
                      <p className="mt-1.5 text-sm text-red-600">{errors.eventDate}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="guestCount"
                      className="text-navy-700 mb-1.5 block text-sm font-medium"
                    >
                      Number of Guests <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      id="guestCount"
                      name="guestCount"
                      value={formData.guestCount}
                      onChange={handleChange}
                      min="25"
                      placeholder="Min 25 guests"
                      className={cn(
                        'text-navy-700 w-full rounded-xl border bg-white px-4 py-3',
                        'placeholder:text-navy-300',
                        'focus:ring-gold-500 focus:border-transparent focus:ring-2 focus:outline-none',
                        errors.guestCount
                          ? 'border-red-500'
                          : 'border-cream-300 hover:border-cream-400'
                      )}
                    />
                    {errors.guestCount && (
                      <p className="mt-1.5 text-sm text-red-600">{errors.guestCount}</p>
                    )}
                  </div>
                </div>

                {/* Venue */}
                <div>
                  <label htmlFor="venue" className="text-navy-700 mb-1.5 block text-sm font-medium">
                    Venue/Location (optional)
                  </label>
                  <input
                    type="text"
                    id="venue"
                    name="venue"
                    value={formData.venue}
                    onChange={handleChange}
                    placeholder="e.g., Hotel, Farmhouse, Home"
                    className="text-navy-700 border-cream-300 hover:border-cream-400 focus:ring-gold-500 placeholder:text-navy-300 w-full rounded-xl border bg-white px-4 py-3 focus:border-transparent focus:ring-2 focus:outline-none"
                  />
                </div>
              </div>
            )}

            {/* Step 2: Menu Preferences */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <h2 className="text-navy-700 font-serif text-2xl font-bold">Menu Preferences</h2>

                {/* Cuisine Preference */}
                <div>
                  <label className="text-navy-700 mb-3 block text-sm font-medium">
                    Preferred Cuisine
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {cuisineOptions.map((cuisine) => (
                      <button
                        key={cuisine.value}
                        type="button"
                        onClick={() =>
                          setFormData((prev) => ({ ...prev, cuisinePreference: cuisine.value }))
                        }
                        className={cn(
                          'rounded-full px-4 py-2 text-sm font-medium transition-all',
                          formData.cuisinePreference === cuisine.value
                            ? 'bg-navy-500 text-white'
                            : 'bg-cream-100 text-navy-600 hover:bg-cream-200'
                        )}
                      >
                        {cuisine.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Dietary Preference */}
                <div>
                  <label className="text-navy-700 mb-3 block text-sm font-medium">
                    Dietary Preference
                  </label>
                  <div className="flex gap-4">
                    {[
                      { value: 'veg', label: 'Vegetarian Only' },
                      { value: 'nonveg', label: 'Non-Vegetarian Only' },
                      { value: 'both', label: 'Both Veg & Non-Veg' },
                    ].map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            dietaryPreference: option.value as 'veg' | 'nonveg' | 'both',
                          }))
                        }
                        className={cn(
                          'flex-1 rounded-xl border-2 py-3 text-sm font-medium transition-all',
                          formData.dietaryPreference === option.value
                            ? 'border-gold-500 bg-gold-500/5 text-navy-700'
                            : 'border-cream-300 text-navy-600 hover:border-cream-400'
                        )}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Spice Level */}
                <div>
                  <label className="text-navy-700 mb-3 block text-sm font-medium">
                    Preferred Spice Level
                  </label>
                  <div className="flex gap-4">
                    {[
                      { value: 'mild', label: 'Mild' },
                      { value: 'medium', label: 'Medium' },
                      { value: 'spicy', label: 'Spicy' },
                    ].map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            spiceLevel: option.value as 'mild' | 'medium' | 'spicy',
                          }))
                        }
                        className={cn(
                          'flex-1 rounded-xl border-2 py-3 text-sm font-medium transition-all',
                          formData.spiceLevel === option.value
                            ? 'border-gold-500 bg-gold-500/5 text-navy-700'
                            : 'border-cream-300 text-navy-600 hover:border-cream-400'
                        )}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Special Requirements */}
                <div>
                  <label
                    htmlFor="specialRequirements"
                    className="text-navy-700 mb-1.5 block text-sm font-medium"
                  >
                    Special Requirements (optional)
                  </label>
                  <textarea
                    id="specialRequirements"
                    name="specialRequirements"
                    value={formData.specialRequirements}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Any allergies, specific dishes, or dietary restrictions..."
                    className="text-navy-700 border-cream-300 hover:border-cream-400 focus:ring-gold-500 placeholder:text-navy-300 w-full resize-y rounded-xl border bg-white px-4 py-3 focus:border-transparent focus:ring-2 focus:outline-none"
                  />
                </div>
              </div>
            )}

            {/* Step 3: Services */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <h2 className="text-navy-700 font-serif text-2xl font-bold">Additional Services</h2>

                {/* Service Options */}
                <div>
                  <label className="text-navy-700 mb-3 block text-sm font-medium">
                    Select services you need (optional)
                  </label>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {serviceOptions.map((service) => (
                      <button
                        key={service.value}
                        type="button"
                        onClick={() => handleServiceToggle(service.value)}
                        className={cn(
                          'flex items-start gap-3 rounded-xl border-2 p-4 text-left transition-all',
                          formData.services.includes(service.value)
                            ? 'border-gold-500 bg-gold-500/5'
                            : 'border-cream-300 hover:border-cream-400'
                        )}
                      >
                        <div
                          className={cn(
                            'mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded border-2 transition-colors',
                            formData.services.includes(service.value)
                              ? 'border-gold-500 bg-gold-500'
                              : 'border-cream-400'
                          )}
                        >
                          {formData.services.includes(service.value) && (
                            <CheckCircle className="h-3 w-3 text-white" />
                          )}
                        </div>
                        <div>
                          <p className="text-navy-700 font-semibold">{service.label}</p>
                          <p className="text-navy-500 text-sm">{service.description}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Budget */}
                <div>
                  <label
                    htmlFor="budget"
                    className="text-navy-700 mb-1.5 block text-sm font-medium"
                  >
                    Budget per person (optional)
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="text-navy-700 border-cream-300 hover:border-cream-400 focus:ring-gold-500 w-full cursor-pointer appearance-none rounded-xl border bg-white px-4 py-3 focus:border-transparent focus:ring-2 focus:outline-none"
                  >
                    <option value="">Select a budget range</option>
                    <option value="500-800">₹500 - ₹800 per person</option>
                    <option value="800-1200">₹800 - ₹1,200 per person</option>
                    <option value="1200-1800">₹1,200 - ₹1,800 per person</option>
                    <option value="1800-2500">₹1,800 - ₹2,500 per person</option>
                    <option value="2500+">₹2,500+ per person</option>
                  </select>
                </div>
              </div>
            )}

            {/* Step 4: Contact Info */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <h2 className="text-navy-700 font-serif text-2xl font-bold">
                  Your Contact Information
                </h2>

                <div className="grid gap-6 sm:grid-cols-2">
                  {/* Name */}
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="name"
                      className="text-navy-700 mb-1.5 block text-sm font-medium"
                    >
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      className={cn(
                        'text-navy-700 w-full rounded-xl border bg-white px-4 py-3',
                        'placeholder:text-navy-300',
                        'focus:ring-gold-500 focus:border-transparent focus:ring-2 focus:outline-none',
                        errors.name ? 'border-red-500' : 'border-cream-300 hover:border-cream-400'
                      )}
                    />
                    {errors.name && <p className="mt-1.5 text-sm text-red-600">{errors.name}</p>}
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="text-navy-700 mb-1.5 block text-sm font-medium"
                    >
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className={cn(
                        'text-navy-700 w-full rounded-xl border bg-white px-4 py-3',
                        'placeholder:text-navy-300',
                        'focus:ring-gold-500 focus:border-transparent focus:ring-2 focus:outline-none',
                        errors.email ? 'border-red-500' : 'border-cream-300 hover:border-cream-400'
                      )}
                    />
                    {errors.email && <p className="mt-1.5 text-sm text-red-600">{errors.email}</p>}
                  </div>

                  {/* Phone */}
                  <div>
                    <label
                      htmlFor="phone"
                      className="text-navy-700 mb-1.5 block text-sm font-medium"
                    >
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 99999 99999"
                      className={cn(
                        'text-navy-700 w-full rounded-xl border bg-white px-4 py-3',
                        'placeholder:text-navy-300',
                        'focus:ring-gold-500 focus:border-transparent focus:ring-2 focus:outline-none',
                        errors.phone ? 'border-red-500' : 'border-cream-300 hover:border-cream-400'
                      )}
                    />
                    {errors.phone && <p className="mt-1.5 text-sm text-red-600">{errors.phone}</p>}
                  </div>

                  {/* Message */}
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="message"
                      className="text-navy-700 mb-1.5 block text-sm font-medium"
                    >
                      Additional Message (optional)
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Any other details you'd like to share..."
                      className="text-navy-700 border-cream-300 hover:border-cream-400 focus:ring-gold-500 placeholder:text-navy-300 w-full resize-y rounded-xl border bg-white px-4 py-3 focus:border-transparent focus:ring-2 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="border-cream-200 mt-8 flex items-center justify-between border-t pt-6">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={handlePrev}
                  className="text-navy-600 hover:text-navy-700 inline-flex items-center gap-2 font-semibold"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Previous
                </button>
              ) : (
                <div />
              )}

              {currentStep < 4 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="bg-gold-500 text-navy-700 shadow-gold hover:bg-gold-600 inline-flex items-center gap-2 rounded-full px-8 py-3 font-semibold transition-all hover:shadow-lg"
                >
                  Next Step
                  <ArrowRight className="h-4 w-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="bg-gold-500 text-navy-700 shadow-gold hover:bg-gold-600 inline-flex items-center gap-2 rounded-full px-8 py-3 font-semibold transition-all hover:shadow-lg disabled:cursor-wait disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit Request
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
