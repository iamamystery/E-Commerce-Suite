import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingCart, Menu, X, User, Package, Home, Phone, LayoutDashboard } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { cartCount } = useCart()
  const { isAuthenticated, isAdmin } = useAuth()
  const location = useLocation()

  const navLinks = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/products', label: 'Products', icon: Package },
    { path: '/contact', label: 'Contact', icon: Phone },
  ]

  if (isAdmin) {
    navLinks.push({ path: '/inventory', label: 'Inventory', icon: LayoutDashboard })
  }

  const isActive = (path) => location.pathname === path

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 glass-card mx-4 mt-4"
    >
      <div className="section-padding">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-luxury-gold to-luxury-silver rounded-lg flex items-center justify-center">
              <span className="text-luxury-dark font-bold text-xl">L</span>
            </div>
            <span className="text-xl font-bold luxury-text font-['Playfair_Display']">LuxeCart</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative text-sm font-medium transition-colors duration-300 ${
                  isActive(link.path) ? 'text-luxury-gold' : 'text-gray-300 hover:text-white'
                }`}
              >
                {link.label}
                {isActive(link.path) && (
                  <motion.div
                    layoutId="navbar-underline"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-luxury-gold"
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-4">
            <Link to="/cart" className="relative p-2 hover:bg-white/10 rounded-lg transition-colors">
              <ShoppingCart className="w-5 h-5 text-gray-300" />
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-luxury-accent text-white text-xs rounded-full flex items-center justify-center font-semibold"
                >
                  {cartCount}
                </motion.span>
              )}
            </Link>
            
            <button className="hidden md:flex items-center space-x-2 p-2 hover:bg-white/10 rounded-lg transition-colors">
              <User className="w-5 h-5 text-gray-300" />
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-white/10"
          >
            <div className="section-padding py-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                    isActive(link.path)
                      ? 'bg-luxury-gold/20 text-luxury-gold'
                      : 'text-gray-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <link.icon className="w-5 h-5" />
                  <span>{link.label}</span>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

export default Navbar
