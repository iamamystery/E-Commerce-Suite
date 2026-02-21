import express from 'express'
import Product from '../models/Product.js'

const router = express.Router()

// @desc    Get all products
// @route   GET /api/products
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { category, search, minPrice, maxPrice, sort, page = 1, limit = 12 } = req.query
    
    let query = { status: { $in: ['active', 'low_stock'] } }
    
    if (category && category !== 'All') {
      query.category = category
    }
    
    if (search) {
      query.$text = { $search: search }
    }
    
    if (minPrice || maxPrice) {
      query.price = {}
      if (minPrice) query.price.$gte = Number(minPrice)
      if (maxPrice) query.price.$lte = Number(maxPrice)
    }
    
    let sortOption = {}
    switch (sort) {
      case 'price_asc':
        sortOption = { price: 1 }
        break
      case 'price_desc':
        sortOption = { price: -1 }
        break
      case 'rating':
        sortOption = { rating: -1 }
        break
      case 'newest':
        sortOption = { createdAt: -1 }
        break
      default:
        sortOption = { sales: -1 }
    }
    
    const products = await Product.find(query)
      .sort(sortOption)
      .limit(limit * 1)
      .skip((page - 1) * limit)
    
    const count = await Product.countDocuments(query)
    
    res.json({
      products,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      total: count
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }
    res.json(product)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// @desc    Create new product
// @route   POST /api/products
// @access  Private/Admin
router.post('/', async (req, res) => {
  try {
    const product = new Product(req.body)
    const savedProduct = await product.save()
    res.status(201).json(savedProduct)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private/Admin
router.put('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }
    res.json(product)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private/Admin
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id)
    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }
    res.json({ message: 'Product removed' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// @desc    Get featured products
// @route   GET /api/products/featured/list
// @access  Public
router.get('/featured/list', async (req, res) => {
  try {
    const products = await Product.find({ status: 'active' })
      .sort({ sales: -1 })
      .limit(8)
    res.json(products)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// @desc    Get all categories
// @route   GET /api/products/categories/all
// @access  Public
router.get('/categories/all', async (req, res) => {
  try {
    const categories = await Product.distinct('category')
    res.json(categories)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default router
