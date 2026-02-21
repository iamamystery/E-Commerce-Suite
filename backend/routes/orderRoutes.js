import express from 'express'
import Order from '../models/Order.js'
import Product from '../models/Product.js'

const router = express.Router()

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
router.post('/', async (req, res) => {
  try {
    const { orderItems, shippingAddress, paymentInfo, userId } = req.body
    
    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ message: 'No order items' })
    }
    
    // Update product stock
    for (const item of orderItems) {
      const product = await Product.findById(item.product)
      if (product) {
        product.stock -= item.quantity
        product.sales += item.quantity
        await product.save()
      }
    }
    
    const order = new Order({
      user: userId,
      orderItems,
      shippingAddress,
      paymentInfo,
      isPaid: paymentInfo.status === 'completed'
    })
    
    const createdOrder = await order.save()
    res.status(201).json(createdOrder)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// @desc    Get orders by user
// @route   GET /api/orders/myorders
// @access  Private
router.get('/myorders/:userId', async (req, res) => {
  try {
    const orders = await Order.find({ user: req.params.userId })
      .populate('orderItems.product', 'name image')
      .sort({ createdAt: -1 })
    res.json(orders)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('user', 'name email')
    if (!order) {
      return res.status(404).json({ message: 'Order not found' })
    }
    res.json(order)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
router.put('/:id/status', async (req, res) => {
  try {
    const { status, trackingNumber } = req.body
    const order = await Order.findById(req.params.id)
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' })
    }
    
    order.status = status
    if (trackingNumber) order.trackingNumber = trackingNumber
    if (status === 'delivered') {
      order.deliveredAt = Date.now()
      order.shippingStatus = 'delivered'
    }
    
    const updatedOrder = await order.save()
    res.json(updatedOrder)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// @desc    Get all orders (admin)
// @route   GET /api/orders
// @access  Private/Admin
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate('user', 'name email')
      .sort({ createdAt: -1 })
    res.json(orders)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// @desc    Get order statistics
// @route   GET /api/orders/stats/summary
// @access  Private/Admin
router.get('/stats/summary', async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments()
    const totalRevenue = await Order.aggregate([
      { $match: { isPaid: true } },
      { $group: { _id: null, total: { $sum: '$prices.totalPrice' } } }
    ])
    
    const recentOrders = await Order.find({})
      .populate('user', 'name')
      .sort({ createdAt: -1 })
      .limit(5)
    
    res.json({
      totalOrders,
      totalRevenue: totalRevenue[0]?.total || 0,
      recentOrders
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default router
