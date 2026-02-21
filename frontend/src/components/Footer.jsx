import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'

const Footer = () => {
  const footerLinks = {
    shop: [
      { label: 'All Products', path: '/products' },
      { label: 'New Arrivals', path: '/products?filter=new' },
      { label: 'Best Sellers', path: '/products?filter=bestsellers' },
      { label: 'Sale Items', path: '/products?filter=sale' },
    ],
    support: [
      { label: 'Contact Us', path: '/contact' },
      { label: 'FAQ', path: '/faq' },
      { label: 'Shipping Info', path: '/shipping' },
      { label: 'Returns', path: '/returns' },
    ],
    company: [
      { label: 'About Us', path: '/about' },
      { label: 'Careers', path: '/careers' },
      { label: 'Press', path: '/press' },
      { label: 'Blog', path: '/blog' },
    ],
  }

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
  ]

  return (
    <footer className="mt-20 border-t border-white/10">
      {/* Newsletter Section */}
      <div className="section-padding py-16 border-b border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold luxury-text mb-4 font-['Playfair_Display']">
              Stay in the Loop
            </h3>
            <p className="text-gray-400 mb-8 max-w-lg mx-auto">
              Subscribe to our newsletter for exclusive deals, new arrivals, and insider-only discounts.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-luxury-gold transition-colors"
              />
              <button type="submit" className="glass-button whitespace-nowrap">
                Subscribe
              </button>
            </form>
          </motion.div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="section-padding py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-luxury-gold to-luxury-silver rounded-lg flex items-center justify-center">
                <span className="text-luxury-dark font-bold text-xl">L</span>
              </div>
              <span className="text-2xl font-bold luxury-text font-['Playfair_Display']">LuxeCart</span>
            </Link>
            <p className="text-gray-400 mb-6 max-w-sm">
              Experience the future of online shopping with AI-powered recommendations and premium products curated just for you.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center text-gray-400 hover:text-luxury-gold hover:bg-white/10 transition-all"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h4 className="text-white font-semibold mb-4">Shop</h4>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.label}>
                  <Link to={link.path} className="text-gray-400 hover:text-luxury-gold transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Link to={link.path} className="text-gray-400 hover:text-luxury-gold transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link to={link.path} className="text-gray-400 hover:text-luxury-gold transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Contact Bar */}
      <div className="border-t border-white/10">
        <div className="section-padding py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400">
              <a href="mailto:support@luxecart.com" className="flex items-center space-x-2 hover:text-luxury-gold transition-colors">
                <Mail className="w-4 h-4" />
                <span>support@luxecart.com</span>
              </a>
              <a href="tel:+1234567890" className="flex items-center space-x-2 hover:text-luxury-gold transition-colors">
                <Phone className="w-4 h-4" />
                <span>+1 (234) 567-890</span>
              </a>
              <span className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>123 Luxury Lane, New York, NY</span>
              </span>
            </div>
            <p className="text-sm text-gray-500">
              © 2024 LuxeCart. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
