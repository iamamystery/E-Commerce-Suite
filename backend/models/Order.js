import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  orderItems: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    name: {
      type: String,
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    },
    price: {
      type: Number,
      required: true
    },
    image: {
      type: String,
      required: true
    }
  }],
  shippingAddress: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    zipCode: { type: String, required: true },
    country: { type: String, default: 'USA' }
  },
  paymentInfo: {
    method: {
      type: String,
      enum: ['card', 'paypal', 'apple_pay', 'google_pay'],
      required: true
    },
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed', 'refunded'],
      default: 'pending'
    },
    transactionId: String,
    paidAt: Date
  },
  prices: {
    itemsPrice: {
      type: Number,
      required: true,
      default: 0
    },
    shippingPrice: {
      type: Number,
      required: true,
      default: 0
    },
    taxPrice: {
      type: Number,
      required: true,
      default: 0
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0
    }
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded'],
    default: 'pending'
  },
  shippingStatus: {
    type: String,
    enum: ['not_shipped', 'shipped', 'in_transit', 'delivered'],
    default: 'not_shipped'
  },
  trackingNumber: String,
  deliveredAt: Date,
  notes: String,
  isPaid: {
    type: Boolean,
    default: false
  },
  paidAt: Date
}, {
  timestamps: true
})

// Calculate prices before saving
orderSchema.pre('save', function(next) {
  this.prices.itemsPrice = this.orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
  this.prices.shippingPrice = this.prices.itemsPrice > 100 ? 0 : 10
  this.prices.taxPrice = Number((this.prices.itemsPrice * 0.08).toFixed(2))
  this.prices.totalPrice = Number((this.prices.itemsPrice + this.prices.shippingPrice + this.prices.taxPrice).toFixed(2))
  next()
})

const Order = mongoose.model('Order', orderSchema)

export default Order
