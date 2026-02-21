import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ShoppingCart, Star, Eye } from 'lucide-react'
import { useCart } from '../context/CartContext'
import toast from 'react-hot-toast'

const ProductCard = ({ product, index = 0 }) => {
  const { addToCart } = useCart()

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(product)
    toast.success(`${product.name} added to cart!`)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group glass-card overflow-hidden card-hover"
    >
      <Link to={`/product/${product._id}`}>
        <div className="relative aspect-square overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300" />
          
          {/* Quick Actions */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 space-x-3">
            <button
              onClick={handleAddToCart}
              className="p-3 bg-white rounded-full text-luxury-dark hover:bg-luxury-gold transition-colors transform hover:scale-110"
            >
              <ShoppingCart className="w-5 h-5" />
            </button>
            <Link
              to={`/product/${product._id}`}
              className="p-3 bg-white rounded-full text-luxury-dark hover:bg-luxury-gold transition-colors transform hover:scale-110"
            >
              <Eye className="w-5 h-5" />
            </Link>
          </div>

          {/* Badge */}
          {product.originalPrice && (
            <div className="absolute top-3 left-3 px-3 py-1 bg-luxury-accent text-white text-xs font-semibold rounded-full">
              Sale
            </div>
          )}
        </div>

        <div className="p-4">
          <p className="text-xs text-luxury-gold uppercase tracking-wider mb-1">{product.category}</p>
          <h3 className="text-white font-semibold mb-2 line-clamp-1 group-hover:text-luxury-gold transition-colors">
            {product.name}
          </h3>
          
          <div className="flex items-center mb-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(product.rating || 0)
                    ? 'text-luxury-gold fill-luxury-gold'
                    : 'text-gray-600'
                }`}
              />
            ))}
            <span className="text-gray-400 text-xs ml-2">({product.reviews || 0})</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold text-white">${product.price}</span>
              {product.originalPrice && (
                <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default ProductCard
