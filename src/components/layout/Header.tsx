'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, Phone } from 'lucide-react'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Menu', href: '/menu' },
  { name: 'Services', href: '/services' },
  { name: 'Gallery', href: '/gallery' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
]

export function Header(): React.ReactElement {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = (): void => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
        isScrolled ? 'shadow-elegant bg-white/95 backdrop-blur-sm' : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/images/logo/logo.png"
              alt="Ada-e-Haandi Logo"
              width={48}
              height={48}
              className="h-12 w-12 object-contain"
              priority
            />
            <div className="hidden sm:block">
              <p
                className={`font-serif text-xl font-bold transition-colors ${
                  isScrolled ? 'text-navy-500' : 'text-white'
                }`}
              >
                Ada-e-Haandi
              </p>
              <p
                className={`text-xs tracking-wider transition-colors ${
                  isScrolled ? 'text-navy-400' : 'text-white/80'
                }`}
              >
                NEW-AGE CATERING
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 lg:flex">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`hover:text-gold-500 text-sm font-medium transition-colors ${
                  isScrolled ? 'text-navy-600' : 'text-white'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden items-center gap-4 lg:flex">
            <a
              href="tel:+919999342322"
              className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                isScrolled ? 'text-navy-600' : 'text-white'
              }`}
            >
              <Phone className="h-4 w-4" />
              <span>+91 99993 42322</span>
            </a>
            <Link
              href="/get-quote"
              className="bg-gold-500 text-navy-700 shadow-gold hover:bg-gold-600 rounded-full px-6 py-2.5 text-sm font-semibold transition-all hover:shadow-lg"
            >
              Get Quote
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className={`h-6 w-6 ${isScrolled ? 'text-navy-600' : 'text-white'}`} />
            ) : (
              <Menu className={`h-6 w-6 ${isScrolled ? 'text-navy-600' : 'text-white'}`} />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="shadow-elegant absolute top-20 right-0 left-0 bg-white lg:hidden">
            <div className="space-y-1 px-4 py-6">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-navy-600 hover:bg-cream-100 hover:text-gold-600 block rounded-lg px-4 py-3 text-base font-medium transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <hr className="border-cream-300 my-4" />
              <a
                href="tel:+919999342322"
                className="text-navy-600 flex items-center gap-3 px-4 py-3"
              >
                <Phone className="text-gold-500 h-5 w-5" />
                <span>+91 99993 42322</span>
              </a>
              <Link
                href="/get-quote"
                className="bg-gold-500 text-navy-700 shadow-gold mt-4 block rounded-full px-6 py-3 text-center font-semibold"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Get Quote
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
