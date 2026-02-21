import express from 'express'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const router = express.Router()

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'your-secret-key', {
    expiresIn: '30d'
  })
}

// @desc    Register new user
// @route   POST /api/users/register
// @access  Public
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body
    
    const userExists = await User.findOne({ email })
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' })
    }
    
    const user = await User.create({
      name,
      email,
      password
    })
    
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id)
    })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// @desc    Login user
// @route   POST /api/users/login
// @access  Public
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    
    const user = await User.findOne({ email }).select('+password')
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }
    
    const isMatch = await user.comparePassword(password)
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }
    
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id)
    })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
router.get('/profile', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) {
      return res.status(401).json({ message: 'Not authorized' })
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key')
    const user = await User.findById(decoded.id).populate('wishlist')
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    
    res.json(user)
  } catch (error) {
    res.status(401).json({ message: 'Not authorized' })
  }
})

// @desc    Update user preferences
// @route   PUT /api/users/preferences
// @access  Private
router.put('/preferences', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key')
    
    const user = await User.findByIdAndUpdate(
      decoded.id,
      { preferences: req.body },
      { new: true }
    )
    
    res.json(user.preferences)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// @desc    Add to browsing history
// @route   POST /api/users/history
// @access  Private
router.post('/history', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key')
    const { productId, timeSpent } = req.body
    
    await User.findByIdAndUpdate(decoded.id, {
      $push: {
        browsingHistory: {
          product: productId,
          timeSpent,
          viewedAt: new Date()
        }
      }
    })
    
    res.json({ message: 'History updated' })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// @desc    Get all users (admin only)
// @route   GET /api/users
// @access  Private/Admin
router.get('/', async (req, res) => {
  try {
    const users = await User.find({}).select('-password')
    res.json(users)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default router
