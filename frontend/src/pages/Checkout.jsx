import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CreditCard, Truck, Shield, Check, ChevronRight, Lock } from 'lucide-react'
import { useCart } from '../context/CartContext'
import toast from 'react-hot-toast'
import AnimatedBackground from '../components/AnimatedBackground'

const Checkout = () => {
  const navigate = useNavigate()
  const { cartItems, cartTotal, clearCart } = useCart()
  const [step, setStep] = useState(1)
  const [isProcessing, setIsProcessing] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    zipCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: ''
  })

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (step < 3) {
      setStep(step + 1)
    } else {
      setIsProcessing(true)
      setTimeout(() => {
        setIsProcessing(false)
        clearCart()
        toast.success('Order placed successfully!')
        navigate('/')
      }, 3000)
    }
  }

  const subtotal = cartTotal
  const shipping = subtotal > 100 ? 0 : 10
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  const steps = [
    { number: 1, title: 'Contact Info', icon: null },
    { number: 2, title: 'Shipping', icon: Truck },
    { number: 3, title: 'Payment', icon: CreditCard }
  ]

  if (cartItems.length === 0) {
    navigate('/cart')
    return null
  }

  return (
    <div className="relative min-h-screen pt-24 pb-12">
      <AnimatedBackground />
      
      <div className="relative z-10 section-padding">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl font-bold luxury-text font-['Playfair_Display'] mb-8 text-center">Checkout</h1>

          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-12">
            {steps.map((s, index) => (
              <div key={s.number} className="flex items-center">
                <div className={`flex items-center space-x-2 px-4 py-2 rounded-full ${
                  step >= s.number
                    ? 'bg-luxury-gold text-luxury-dark'
                    : 'bg-white/5 text-gray-400'
                }`}>
                  {step > s.number ? (
                    <Check className="w-5 h-5" />
                  ) : s.icon ? (
                    <s.icon className="w-5 h-5" />
                  ) : (
                    <span className="w-5 h-5 flex items-center justify-center font-semibold">{s.number}</span>
                  )}
                  <span className="hidden sm:inline font-medium">{s.title}</span>
                </div>
                {index < steps.length - 1 && (
                  <ChevronRight className="w-5 h-5 text-gray-400 mx-2" />
                )}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-3">
              <form onSubmit={handleSubmit} className="space-y-6">
                {step === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="glass-card p-6"
                  >
                    <h2 className="text-xl font-bold text-white mb-6">Contact Information</h2>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm text-gray-400 mb-2">Email</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-luxury-gold"
                          placeholder="your@email.com"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm text-gray-400 mb-2">First Name</label>
                          <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-luxury-gold"
                            placeholder="John"
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-400 mb-2">Last Name</label>
                          <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-luxury-gold"
                            placeholder="Doe"
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="glass-card p-6"
                  >
                    <h2 className="text-xl font-bold text-white mb-6">Shipping Address</h2>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm text-gray-400 mb-2">Street Address</label>
                        <input
                          type="text"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-luxury-gold"
                          placeholder="123 Main Street"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm text-gray-400 mb-2">City</label>
                          <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-luxury-gold"
                            placeholder="New York"
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-400 mb-2">ZIP Code</label>
                          <input
                            type="text"
                            name="zipCode"
                            value={formData.zipCode}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-luxury-gold"
                            placeholder="10001"
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="glass-card p-6"
                  >
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-bold text-white">Payment Details</h2>
                      <div className="flex items-center space-x-2 text-green-400 text-sm">
                        <Lock className="w-4 h-4" />
                        <span>Secure SSL</span>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm text-gray-400 mb-2">Card Number</label>
                        <input
                          type="text"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                          required
                          placeholder="1234 5678 9012 3456"
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-luxury-gold"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-400 mb-2">Cardholder Name</label>
                        <input
                          type="text"
                          name="cardName"
                          value={formData.cardName}
                          onChange={handleInputChange}
                          required
                          placeholder="John Doe"
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-luxury-gold"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm text-gray-400 mb-2">Expiry Date</label>
                          <input
                            type="text"
                            name="expiryDate"
                            value={formData.expiryDate}
                            onChange={handleInputChange}
                            required
                            placeholder="MM/YY"
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-luxury-gold"
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-400 mb-2">CVV</label>
                          <input
                            type="text"
                            name="cvv"
                            value={formData.cvv}
                            onChange={handleInputChange}
                            required
                            placeholder="123"
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-luxury-gold"
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                <div className="flex items-center justify-between">
                  {step > 1 && (
                    <button
                      type="button"
                      onClick={() => setStep(step - 1)}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      ← Back
                    </button>
                  )}
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className={`ml-auto glass-button flex items-center space-x-2 ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {isProcessing ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        <span>{step === 3 ? 'Place Order' : 'Continue'}</span>
                        <ChevronRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-2">
              <div className="glass-card p-6 sticky top-24">
                <h3 className="text-lg font-bold text-white mb-6">Order Summary</h3>
                
                <div className="space-y-4 mb-6 max-h-60 overflow-y-auto">
                  {cartItems.map((item) => (
                    <div key={item._id} className="flex items-center space-x-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm font-medium truncate">{item.name}</p>
                        <p className="text-gray-400 text-xs">Qty: {item.quantity}</p>
                      </div>
                      <p className="text-white font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>

                <div className="border-t border-white/10 pt-4 space-y-2">
                  <div className="flex items-center justify-between text-gray-400 text-sm">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between text-gray-400 text-sm">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="flex items-center justify-between text-gray-400 text-sm">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-white/10 pt-4">
                    <div className="flex items-center justify-between text-white">
                      <span className="font-semibold">Total</span>
                      <span className="text-2xl font-bold">${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 space-y-2">
                  <div className="flex items-center text-gray-400 text-sm">
                    <Shield className="w-4 h-4 mr-2 text-luxury-gold" />
                    <span>Secure checkout</span>
                  </div>
                  <div className="flex items-center text-gray-400 text-sm">
                    <Truck className="w-4 h-4 mr-2 text-luxury-gold" />
                    <span>Free shipping over $100</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Checkout
