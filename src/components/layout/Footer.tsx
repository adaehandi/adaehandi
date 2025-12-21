import Link from 'next/link'
import { Phone, Mail, MapPin, Clock, Instagram, Facebook } from 'lucide-react'

const quickLinks = [
  { name: 'Home', href: '/' },
  { name: 'Our Menu', href: '/menu' },
  { name: 'Services', href: '/services' },
  { name: 'Gallery', href: '/gallery' },
  { name: 'About Us', href: '/about' },
  { name: 'Contact', href: '/contact' },
]

const services = [
  { name: 'Wedding Catering', href: '/services/wedding-catering' },
  { name: 'Corporate Events', href: '/services/corporate-events' },
  { name: 'Private Parties', href: '/services/private-parties' },
  { name: 'Religious Ceremonies', href: '/services/religious-ceremonies' },
]

export function Footer(): React.ReactElement {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-navy-700 text-white">
      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <h3 className="text-gold-500 font-serif text-2xl font-bold">Ada-e-Haandi</h3>
              <p className="mt-1 text-xs tracking-wider text-white/60">NEW-AGE CATERING</p>
            </div>
            <p className="mb-6 text-sm leading-relaxed text-white/80">
              Serving authentic North Indian cuisine with passion and perfection since 1998. 27
              years of culinary excellence in Delhi NCR.
            </p>
            {/* Social Links */}
            <div className="flex gap-4">
              <a
                href="https://instagram.com/adaehaandi"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:bg-gold-500 hover:text-navy-700 rounded-full bg-white/10 p-2.5 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://facebook.com/adaehaandi"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:bg-gold-500 hover:text-navy-700 rounded-full bg-white/10 p-2.5 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-gold-500 mb-6 text-sm font-semibold tracking-wider uppercase">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="hover:text-gold-500 text-sm text-white/80 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-gold-500 mb-6 text-sm font-semibold tracking-wider uppercase">
              Our Services
            </h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.name}>
                  <Link
                    href={service.href}
                    className="hover:text-gold-500 text-sm text-white/80 transition-colors"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-gold-500 mb-6 text-sm font-semibold tracking-wider uppercase">
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="text-gold-500 mt-0.5 h-5 w-5 flex-shrink-0" />
                <span className="text-sm text-white/80">
                  141-142, South Moti Bagh Market,
                  <br />
                  New Delhi - 110021
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-gold-500 h-5 w-5 flex-shrink-0" />
                <div className="text-sm text-white/80">
                  <a href="tel:+919999342322" className="hover:text-gold-500">
                    +91 99993 42322
                  </a>
                  <br />
                  <a href="tel:01124672702" className="hover:text-gold-500">
                    011-24672702
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-gold-500 h-5 w-5 flex-shrink-0" />
                <a
                  href="mailto:info@adaehaandi.com"
                  className="hover:text-gold-500 text-sm text-white/80"
                >
                  info@adaehaandi.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="text-gold-500 h-5 w-5 flex-shrink-0" />
                <span className="text-sm text-white/80">Mon - Sun: 10:00 AM - 10:00 PM</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 sm:flex-row sm:px-6 lg:px-8">
          <p className="text-sm text-white/60">
            &copy; {currentYear} Ada-e-Haandi. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-sm text-white/60">
            <span>FSSAI Licensed</span>
            <span className="text-gold-500">•</span>
            <span>Since 1998</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
