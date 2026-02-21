import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ShoppingCart, Heart, Share2, Star, Truck, Shield, RefreshCw, ChevronLeft, Minus, Plus } from 'lucide-react'
import { useCart } from '../context/CartContext'
import toast from 'react-hot-toast'
import AnimatedBackground from '../components/AnimatedBackground'

const productData = {
  _id: "1",
  name: "Premium Wireless Headphones",
  price: 299,
  originalPrice: 399,
  image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800",
  category: "Electronics",
  rating: 4.8,
  reviews: 124,
  description: "Experience crystal-clear audio with our premium wireless headphones. Featuring active noise cancellation, 30-hour battery life, and ultra-comfortable memory foam ear cushions.",
  features: [
    "Active Noise Cancellation",
    "30-hour Battery Life",
    "Bluetooth 5.0 Connectivity",
    "Memory Foam Ear Cushions",
    "Foldable Design",
    "Carrying Case Included"
  ],
  specifications: {
    "Driver Size": "40mm",
    "Frequency Response": "20Hz - 20kHz",
    "Impedance": "32 ohms",
    "Weight": "250g",
    "Warranty": "2 Years"
  },
  inStock: true,
  stockCount: 15
}

const relatedProducts = [
  { _id: "2", name: "Premium Earbuds", price: 149, image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=300", rating: 4.6 },
  { _id: "7", name: "Mechanical Keyboard", price: 189, image: "https://images.unsplash.com/photo-1595225476474-87563907a212?w=300", rating: 4.7 },
  { _id: "10", name: "Portable Charger", price: 49, image: "https://images.unsplash.com/photo-1609592424305-249a5c658e58?w=300", rating: 4.5 },
]

const ProductDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState('description')
  const [isWishlisted, setIsWishlisted] = useState(false)

  const handleAddToCart = () => {
    addToCart(productData, quantity)
    toast.success(`${quantity}x ${productData.name} added to cart!`)
  }

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
    toast.success('Link copied to clipboard!')
  }

  return (
    <div className="relative min-h-screen pt-24 pb-12">
      <AnimatedBackground />
      
      <div className="relative z-10 section-padding">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors mb-6"
        >
          <ChevronLeft className="w-5 h-5" />
          <span>Back to Products</span>
        </motion.button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative"
          >
            <div className="glass-card overflow-hidden">
              <img
                src={productData.image}
                alt={productData.name}
                className="w-full aspect-square object-cover"
              />
            </div>
            {productData.originalPrice && (
              <div className="absolute top-4 left-4 px-4 py-2 bg-luxury-accent text-white font-semibold rounded-full">
                Save ${productData.originalPrice - productData.price}
              </div>
            )}
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div>
              <p className="text-luxury-gold text-sm uppercase tracking-wider mb-2">{productData.category}</p>
              <h1 className="text-3xl md:text-4xl font-bold text-white font-['Playfair_Display'] mb-4">{productData.name}</h1>
              
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(productData.rating)
                          ? 'text-luxury-gold fill-luxury-gold'
                          : 'text-gray-600'
                      }`}
                    />
                  ))}
                  <span className="text-white ml-2 font-semibold">{productData.rating}</span>
                </div>
                <span className="text-gray-400">({productData.reviews} reviews)</span>
              </div>

              <div className="flex items-center space-x-4">
                <span className="text-3xl font-bold text-white">${productData.price}</span>
                {productData.originalPrice && (
                  <span className="text-xl text-gray-500 line-through">${productData.originalPrice}</span>
                )}
              </div>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center space-x-2 text-gray-400 text-sm">
                <Truck className="w-4 h-4 text-luxury-gold" />
                <span>Free Shipping</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400 text-sm">
                <Shield className="w-4 h-4 text-luxury-gold" />
                <span>2-Year Warranty</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400 text-sm">
                <RefreshCw className="w-4 h-4 text-luxury-gold" />
                <span>30-Day Returns</span>
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center space-x-4">
              <span className="text-gray-400">Quantity:</span>
              <div className="flex items-center bg-white/5 rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 hover:bg-white/10 rounded-l-lg transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center text-white font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-3 hover:bg-white/10 rounded-r-lg transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <span className={`text-sm ${productData.stockCount < 5 ? 'text-luxury-accent' : 'text-green-400'}`}>
                {productData.stockCount < 5 ? `Only ${productData.stockCount} left!` : 'In Stock'}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 glass-button flex items-center justify-center space-x-2 py-4"
              >
                <ShoppingCart className="w-5 h-5" />
                <span>Add to Cart</span>
              </button>
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={`p-4 rounded-xl border transition-all ${
                  isWishlisted
                    ? 'bg-luxury-accent border-luxury-accent text-white'
                    : 'border-white/10 text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>
              <button
                onClick={handleShare}
                className="p-4 rounded-xl border border-white/10 text-gray-400 hover:text-white hover:bg-white/5 transition-all"
              >
                <Share2 className="w-5 h-5" />
              </button>
            </div>

            {/* Tabs */}
            <div className="border-t border-white/10 pt-6">
              <div className="flex space-x-6 mb-6">
                {['description', 'features', 'specifications'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-2 text-sm font-medium capitalize transition-colors ${
                      activeTab === tab
                        ? 'text-luxury-gold border-b-2 border-luxury-gold'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="text-gray-300">
                {activeTab === 'description' && <p>{productData.description}</p>}
                {activeTab === 'features' && (
                  <ul className="space-y-2">
                    {productData.features.map((feature, i) => (
                      <li key={i} className="flex items-center space-x-2">
                        <span className="w-1.5 h-1.5 bg-luxury-gold rounded-full" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {activeTab === 'specifications' && (
                  <dl className="grid grid-cols-2 gap-4">
                    {Object.entries(productData.specifications).map(([key, value]) => (
                      <div key={key}>
                        <dt className="text-gray-500 text-sm">{key}</dt>
                        <dd className="text-white font-medium">{value}</dd>
                      </div>
                    ))}
                  </dl>
                )}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Related Products */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <h2 className="text-2xl font-bold text-white font-['Playfair_Display'] mb-8">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((product, index) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card overflow-hidden group cursor-pointer"
                onClick={() => navigate(`/product/${product._id}`)}
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-white font-semibold mb-2 group-hover:text-luxury-gold transition-colors">
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-white">${product.price}</span>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-luxury-gold fill-luxury-gold" />
                      <span className="text-gray-400 text-sm ml-1">{product.rating}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default ProductDetail
