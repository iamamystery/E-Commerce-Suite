import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Sparkles, Shield, Truck, Clock, Star, ChevronLeft, ChevronRight } from 'lucide-react'
import toast from 'react-hot-toast'
import AnimatedBackground from '../components/AnimatedBackground'
import ProductCard from '../components/ProductCard'
import AIRecommendations from '../components/AIRecommendations'
import { categories, featuredProducts, testimonials } from '../data'

const heroSlides = [
  {
    id: 1,
    title: "Discover Luxury",
    subtitle: "Curated Collection 2024",
    description: "Experience the finest selection of premium products, handpicked for the discerning connoisseur.",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200",
    cta: "Explore Collection"
  },
  {
    id: 2,
    title: "AI-Powered Shopping",
    subtitle: "Smart Recommendations",
    description: "Our advanced AI learns your preferences to deliver personalized product suggestions you'll love.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200",
    cta: "Try AI Recommendations"
  },
  {
    id: 3,
    title: "Premium Quality",
    subtitle: "Handcrafted Excellence",
    description: "Every item in our collection meets the highest standards of quality and craftsmanship.",
    image: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=1200",
    cta: "Shop Now"
  }
]

const features = [
  { icon: Sparkles, title: "AI Recommendations", description: "Personalized suggestions based on your preferences" },
  { icon: Shield, title: "Secure Shopping", description: "Bank-level encryption for all transactions" },
  { icon: Truck, title: "Fast Delivery", description: "Free shipping on orders over $100" },
  { icon: Clock, title: "24/7 Support", description: "Round-the-clock customer assistance" },
]

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)

  return (
    <div className="relative">
      <AnimatedBackground />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent z-10" />
            <img
              src={heroSlides[currentSlide].image}
              alt={heroSlides[currentSlide].title}
              className="w-full h-full object-cover"
            />
          </motion.div>
        </AnimatePresence>

        <div className="relative z-20 section-padding w-full">
          <div className="max-w-3xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.6 }}
              >
                <motion.span
                  className="inline-block text-luxury-gold text-sm font-semibold tracking-wider uppercase mb-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {heroSlides[currentSlide].subtitle}
                </motion.span>
                <motion.h1
                  className="text-5xl md:text-7xl font-bold text-white mb-6 font-['Playfair_Display'] leading-tight"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {heroSlides[currentSlide].title}
                </motion.h1>
                <motion.p
                  className="text-xl text-gray-300 mb-8 max-w-xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  {heroSlides[currentSlide].description}
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <Link to="/products" className="glass-button inline-flex items-center space-x-2 group">
                    <span>{heroSlides[currentSlide].cta}</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Slide Navigation */}
        <div className="absolute bottom-10 right-10 z-20 flex items-center space-x-4">
          <button onClick={prevSlide} className="p-3 glass-card hover:bg-white/10 transition-colors rounded-full">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div className="flex space-x-2">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  currentSlide === index ? 'w-8 bg-luxury-gold' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
          <button onClick={nextSlide} className="p-3 glass-card hover:bg-white/10 transition-colors rounded-full">
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass-card p-6 card-hover"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-luxury-gold/20 to-luxury-silver/20 rounded-xl flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-luxury-gold" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* AI Recommendations Section */}
      <AIRecommendations />

      {/* Categories Section */}
      <section className="section-padding py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold luxury-text font-['Playfair_Display'] mb-4">Shop by Category</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Explore our curated collections across different categories</p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-2xl cursor-pointer"
            >
              <div className="aspect-square">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl font-bold text-white mb-1">{category.name}</h3>
                  <p className="text-gray-300 text-sm">{category.count} products</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="section-padding py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-between mb-12"
        >
          <div>
            <h2 className="text-4xl font-bold luxury-text font-['Playfair_Display'] mb-2">Featured Products</h2>
            <p className="text-gray-400">Handpicked premium items just for you</p>
          </div>
          <Link to="/products" className="hidden md:flex items-center space-x-2 text-luxury-gold hover:text-luxury-silver transition-colors">
            <span>View All</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product, index) => (
            <ProductCard key={product._id} product={product} index={index} />
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section-padding py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold luxury-text font-['Playfair_Display'] mb-4">What Our Customers Say</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Real reviews from satisfied customers around the world</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass-card p-6"
            >
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-luxury-gold fill-luxury-gold" />
                ))}
              </div>
              <p className="text-gray-300 mb-4 italic">"{testimonial.text}"</p>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-luxury-gold to-luxury-silver rounded-full flex items-center justify-center">
                  <span className="text-luxury-dark font-semibold">{testimonial.name[0]}</span>
                </div>
                <div>
                  <h4 className="text-white font-semibold">{testimonial.name}</h4>
                  <p className="text-gray-400 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Home
