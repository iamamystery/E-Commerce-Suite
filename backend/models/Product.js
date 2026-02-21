import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
    maxlength: [100, 'Product name cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Product description is required'],
    maxlength: [2000, 'Description cannot exceed 2000 characters']
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative']
  },
  originalPrice: {
    type: Number,
    min: [0, 'Original price cannot be negative'],
    default: null
  },
  images: [{
    type: String,
    required: true
  }],
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['Electronics', 'Fashion', 'Accessories', 'Home & Living', 'Sports', 'Beauty', 'Books']
  },
  stock: {
    type: Number,
    required: [true, 'Stock is required'],
    min: [0, 'Stock cannot be negative'],
    default: 0
  },
  rating: {
    type: Number,
    min: [0, 'Rating cannot be less than 0'],
    max: [5, 'Rating cannot exceed 5'],
    default: 0
  },
  reviews: {
    type: Number,
    default: 0
  },
  features: [{
    type: String
  }],
  specifications: {
    type: Map,
    of: String
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'out_of_stock', 'low_stock'],
    default: 'active'
  },
  sales: {
    type: Number,
    default: 0
  },
  tags: [{
    type: String
  }],
  aiFeatures: {
    embeddings: [Number],
    category: String,
    priceRange: String,
    popularity: Number
  }
}, {
  timestamps: true
})

// Index for search
productSchema.index({ name: 'text', description: 'text', tags: 'text' })

// Update status based on stock
productSchema.pre('save', function(next) {
  if (this.stock === 0) {
    this.status = 'out_of_stock'
  } else if (this.stock < 10) {
    this.status = 'low_stock'
  } else {
    this.status = 'active'
  }
  next()
})

const Product = mongoose.model('Product', productSchema)

export default Product
