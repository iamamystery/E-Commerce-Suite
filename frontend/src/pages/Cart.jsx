import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, ShoppingCart } from 'lucide-react'
import { useCart } from '../context/CartContext'
import toast from 'react-hot-toast'
import AnimatedBackground from '../components/AnimatedBackground'

const Cart = () => {
  const navigate = useNavigate()
  const { cartItems, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart()

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast.error('Your cart is empty!')
      return
    }
    navigate('/checkout')
  }

  if (cartItems.length === 0) {
    return (
      <div className="relative min-h-screen pt-24 flex items-center justify-center">
        <AnimatedBackground />
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingCart className="w-12 h-12 text-gray-400" />
          </div>
          <h1 className="text-3xl font-bold text-white font-['Playfair_Display'] mb-4">Your Cart is Empty</h1>
          <p className="text-gray-400 mb-8">Discover our amazing products and add them to your cart!</p>
          <button
            onClick={() => navigate('/products')}
            className="glass-button"
          >
            Start Shopping
          </button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen pt-24 pb-12">
      <AnimatedBackground />
      
      <div className="relative z-10 section-padding">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold luxury-text font-['Playfair_Display'] mb-2">Shopping Cart</h1>
          <p className="text-gray-400">{cartItems.length} items in your cart</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence>
              {cartItems.map((item) => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="glass-card p-4 flex items-center gap-4"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="text-white font-semibold mb-1">{item.name}</h3>
                    <p className="text-gray-400 text-sm">{item.category}</p>
                    <p className="text-luxury-gold font-bold mt-1">${item.price}</p>
                  </div>
                  <div className="flex items-center bg-white/5 rounded-lg">
                    <button
                      onClick={() => updateQuantity(item._id, item.quantity - 1)}
                      className="p-2 hover:bg-white/10 rounded-l-lg transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-10 text-center text-white font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item._id, item.quantity + 1)}
                      className="p-2 hover:bg-white/10 rounded-r-lg transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="text-right min-w-[80px]">
                    <p className="text-white font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                  <button
                    onClick={() => {
                      removeFromCart(item._id)
                      toast.success('Item removed from cart')
                    }}
                    className="p-2 text-gray-400 hover:text-luxury-accent transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>

            <button
              onClick={() => {
                clearCart()
                toast.success('Cart cleared')
              }}
              className="text-gray-400 hover:text-luxury-accent transition-colors text-sm"
            >
              Clear all items
            </button>
          </div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="glass-card p-6 sticky top-24">
              <h2 className="text-xl font-bold text-white font-['Playfair_Display'] mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between text-gray-400">
                  <span>Subtotal</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between text-gray-400">
                  <span>Shipping</span>
                  <span>{cartTotal > 100 ? 'Free' : '$10.00'}</span>
                </div>
                <div className="flex items-center justify-between text-gray-400">
                  <span>Tax</span>
                  <span>${(cartTotal * 0.08).toFixed(2)}</span>
                </div>
                <div className="border-t border-white/10 pt-4">
                  <div className="flex items-center justify-between text-white">
                    <span className="font-semibold">Total</span>
                    <span className="text-2xl font-bold">
                      ${(cartTotal + (cartTotal > 100 ? 0 : 10) + cartTotal * 0.08).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full glass-button flex items-center justify-center space-x-2 py-4 mb-4"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={() => navigate('/products')}
                className="w-full py-3 border border-white/10 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all"
              >
                Continue Shopping
              </button>

              <div className="mt-6 space-y-2 text-sm text-gray-400">
                <p className="flex items-center">
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  Free shipping on orders over $100
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Cart
