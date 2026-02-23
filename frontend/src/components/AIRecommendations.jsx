import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, RefreshCw, TrendingUp } from 'lucide-react'
import ProductCard from './ProductCard'
import { aiRecommendedProducts } from '../data'
import { storage } from '../utils/storage'

const HISTORY_KEY = 'luxecart_browsing_history'

const AIRecommendations = () => {
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [products, setProducts] = useState(aiRecommendedProducts)
  const [aiStats, setAiStats] = useState({
    confidence: 94.2,
    dataPoints: 2847,
    lastUpdated: 'Just now'
  })

  // Simulate AI learning from browsing history
  useEffect(() => {
    const history = storage.get(HISTORY_KEY, [])
    if (history.length > 0) {
      const shuffled = [...aiRecommendedProducts].sort(() => Math.random() - 0.5)
      setProducts(shuffled.slice(0, 4))
      setAiStats(prev => ({
        ...prev,
        confidence: Math.floor(Math.random() * 10) + 90,
        dataPoints: prev.dataPoints + history.length
      }))
    }
  }, [])

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      const shuffled = [...aiRecommendedProducts].sort(() => Math.random() - 0.5)
      setProducts(shuffled)
      setAiStats(prev => ({
        ...prev,
        confidence: Math.floor(Math.random() * 5) + 92,
        lastUpdated: 'Just now'
      }))
      setIsRefreshing(false)
    }, 1500)
  }

  return (
    <section className="section-padding py-20 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary-900/20 via-luxury-dark/50 to-luxury-accent/10" />
      
      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6"
        >
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 bg-gradient-to-br from-luxury-gold to-primary-500 rounded-2xl flex items-center justify-center animate-pulse-slow">
              <Sparkles className="w-7 h-7 text-white" />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold font-['Playfair_Display']">
                <span className="luxury-text">AI-Powered</span>
                <span className="text-white ml-2">Recommendations</span>
              </h2>
              <p className="text-gray-400 flex items-center space-x-2 mt-1">
                <TrendingUp className="w-4 h-4 text-luxury-gold" />
                <span>Personalized for your unique preferences</span>
              </p>
            </div>
          </div>
          
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="flex items-center space-x-2 px-6 py-3 glass-card hover:bg-white/10 transition-all disabled:opacity-50 rounded-xl"
          >
            <RefreshCw className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>{isRefreshing ? 'Analyzing...' : 'Refresh Suggestions'}</span>
          </button>
        </motion.div>

        {/* AI Stats Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-4 mb-8 flex flex-wrap items-center justify-center gap-6 text-sm"
        >
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-gray-300">AI Model: <span className="text-luxury-gold">Active</span></span>
          </div>
          <div className="text-gray-500">|</div>
          <div className="text-gray-300">
            Confidence Score: <span className="text-luxury-gold font-semibold">94.2%</span>
          </div>
          <div className="text-gray-500">|</div>
          <div className="text-gray-300">
            Data Points Analyzed: <span className="text-luxury-gold font-semibold">2,847</span>
          </div>
          <div className="text-gray-500">|</div>
          <div className="text-gray-300">
            Last Updated: <span className="text-luxury-gold">Just now</span>
          </div>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <div key={product._id} className="relative">
              <div className="absolute -top-3 left-4 z-10">
                <div className="px-3 py-1 bg-gradient-to-r from-luxury-gold to-primary-500 text-white text-xs font-semibold rounded-full flex items-center space-x-1">
                  <Sparkles className="w-3 h-3" />
                  <span>{product.matchScore}% Match</span>
                </div>
              </div>
              <ProductCard product={product} index={index} />
            </div>
          ))}
        </div>

        {/* Why AI Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 glass-card p-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-luxury-gold/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-6 h-6 text-luxury-gold" />
              </div>
              <h4 className="text-white font-semibold mb-2">Smart Analysis</h4>
              <p className="text-gray-400 text-sm">Our AI analyzes your browsing patterns and purchase history to understand your preferences.</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-luxury-gold/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-6 h-6 text-luxury-gold" />
              </div>
              <h4 className="text-white font-semibold mb-2">Personalized Matches</h4>
              <p className="text-gray-400 text-sm">Get product recommendations tailored specifically to your unique style and needs.</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-luxury-gold/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <RefreshCw className="w-6 h-6 text-luxury-gold" />
              </div>
              <h4 className="text-white font-semibold mb-2">Continuous Learning</h4>
              <p className="text-gray-400 text-sm">The more you shop, the smarter our recommendations become. Always improving.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default AIRecommendations
