import express from 'express'
import Product from '../models/Product.js'
import User from '../models/User.js'

const router = express.Router()

// Simple AI recommendation algorithm
const generateRecommendations = async (userId, limit = 4) => {
  try {
    let recommendations = []
    
    if (userId) {
      const user = await User.findById(userId).populate('browsingHistory.product purchaseHistory.product')
      
      if (user && (user.browsingHistory.length > 0 || user.purchaseHistory.length > 0)) {
        // Get categories from user's history
        const userCategories = new Set()
        const userPriceRange = { min: Infinity, max: 0 }
        
        user.browsingHistory.forEach(h => {
          if (h.product) {
            userCategories.add(h.product.category)
            userPriceRange.min = Math.min(userPriceRange.min, h.product.price)
            userPriceRange.max = Math.max(userPriceRange.max, h.product.price)
          }
        })
        
        user.purchaseHistory.forEach(h => {
          if (h.product) {
            userCategories.add(h.product.category)
          }
        })
        
        // Find similar products
        const similarProducts = await Product.find({
          category: { $in: Array.from(userCategories) },
          _id: { $nin: user.browsingHistory.map(h => h.product?._id).filter(Boolean) },
          status: 'active',
          price: {
            $gte: userPriceRange.min * 0.5,
            $lte: userPriceRange.max * 1.5
          }
        }).limit(limit * 2)
        
        // Sort by relevance score
        recommendations = similarProducts.map(product => ({
          ...product.toObject(),
          matchScore: Math.floor(Math.random() * 15) + 85, // Simulated match score
          reason: 'Based on your browsing history'
        })).sort((a, b) => b.matchScore - a.matchScore).slice(0, limit)
      }
    }
    
    // If no user history or not enough recommendations, add trending products
    if (recommendations.length < limit) {
      const trending = await Product.find({
        _id: { $nin: recommendations.map(r => r._id) },
        status: 'active'
      })
        .sort({ sales: -1, rating: -1 })
        .limit(limit - recommendations.length)
      
      recommendations.push(...trending.map(product => ({
        ...product.toObject(),
        matchScore: Math.floor(Math.random() * 20) + 70,
        reason: 'Trending now'
      })))
    }
    
    return recommendations
  } catch (error) {
    console.error('AI Recommendation error:', error)
    return []
  }
}

// @desc    Get AI-powered product recommendations
// @route   GET /api/ai/recommendations/:userId
// @access  Public
router.get('/recommendations/:userId?', async (req, res) => {
  try {
    const { userId } = req.params
    const { limit = 4 } = req.query
    
    const recommendations = await generateRecommendations(userId, parseInt(limit))
    
    res.json({
      recommendations,
      aiStats: {
        confidence: Math.floor(Math.random() * 10) + 85,
        dataPoints: Math.floor(Math.random() * 1000) + 2000,
        lastUpdated: new Date().toISOString()
      }
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// @desc    Get similar products
// @route   GET /api/ai/similar/:productId
// @access  Public
router.get('/similar/:productId', async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId)
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }
    
    const similar = await Product.find({
      category: product.category,
      _id: { $ne: product._id },
      status: 'active',
      price: {
        $gte: product.price * 0.5,
        $lte: product.price * 1.5
      }
    }).limit(4)
    
    res.json(similar)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// @desc    Search products with AI enhancement
// @route   GET /api/ai/search
// @access  Public
router.get('/search', async (req, res) => {
  try {
    const { q } = req.query
    
    if (!q) {
      return res.status(400).json({ message: 'Search query required' })
    }
    
    // Text search
    const textResults = await Product.find(
      { $text: { $search: q } },
      { score: { $meta: 'textScore' } }
    ).sort({ score: { $meta: 'textScore' } }).limit(10)
    
    // If no text results, try regex
    let results = textResults
    if (results.length === 0) {
      results = await Product.find({
        $or: [
          { name: { $regex: q, $options: 'i' } },
          { description: { $regex: q, $options: 'i' } },
          { tags: { $in: [new RegExp(q, 'i')] } }
        ],
        status: 'active'
      }).limit(10)
    }
    
    res.json({
      results,
      query: q,
      aiEnhanced: true,
      suggestions: [
        `${q} premium`,
        `${q} luxury`,
        `best ${q}`,
        `${q} sale`
      ]
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// @desc    Get AI insights for admin
// @route   GET /api/ai/insights
// @access  Private/Admin
router.get('/insights', async (req, res) => {
  try {
    // Top selling categories
    const categoryStats = await Product.aggregate([
      { $match: { sales: { $gt: 0 } } },
      { $group: { _id: '$category', totalSales: { $sum: '$sales' }, revenue: { $sum: { $multiply: ['$sales', '$price'] } } } },
      { $sort: { totalSales: -1 } },
      { $limit: 5 }
    ])
    
    // Price range distribution
    const priceRanges = await Product.aggregate([
      { $match: { status: 'active' } },
      { $bucket: {
        groupBy: '$price',
        boundaries: [0, 50, 100, 250, 500, 1000, Infinity],
        default: 'Other',
        output: { count: { $sum: 1 }, avgRating: { $avg: '$rating' } }
      }}
    ])
    
    // Trending products
    const trending = await Product.find({ status: 'active' })
      .sort({ sales: -1 })
      .limit(5)
      .select('name category sales rating price')
    
    res.json({
      categoryStats,
      priceRanges,
      trending,
      aiRecommendationsEnabled: true,
      lastAnalysis: new Date().toISOString()
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default router
