import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Edit2, Trash2, Search, Package, TrendingUp, AlertTriangle, BarChart3, DollarSign, ShoppingBag } from 'lucide-react'
import toast from 'react-hot-toast'
import AnimatedBackground from '../components/AnimatedBackground'

const initialProducts = [
  { _id: "1", name: "Premium Wireless Headphones", price: 299, stock: 15, category: "Electronics", sales: 234, status: "active" },
  { _id: "2", name: "Luxury Leather Watch", price: 599, stock: 8, category: "Accessories", sales: 156, status: "active" },
  { _id: "3", name: "Designer Sunglasses", price: 249, stock: 23, category: "Accessories", sales: 189, status: "active" },
  { _id: "4", name: "Smart Home Hub", price: 199, stock: 5, category: "Electronics", sales: 312, status: "low_stock" },
  { _id: "5", name: "Minimalist Desk Lamp", price: 129, stock: 0, category: "Home & Living", sales: 78, status: "out_of_stock" },
  { _id: "6", name: "Leather Messenger Bag", price: 349, stock: 12, category: "Fashion", sales: 145, status: "active" },
]

const stats = [
  { title: "Total Products", value: "156", change: "+12", icon: Package },
  { title: "Total Sales", value: "$48,295", change: "+23%", icon: DollarSign },
  { title: "Orders", value: "1,284", change: "+18%", icon: ShoppingBag },
  { title: "Low Stock", value: "8", change: "-2", icon: AlertTriangle },
]

const Inventory = () => {
  const [products, setProducts] = useState(initialProducts)
  const [searchQuery, setSearchQuery] = useState("")
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    stock: '',
    category: 'Electronics'
  })

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleAddProduct = (e) => {
    e.preventDefault()
    const newProduct = {
      _id: Date.now().toString(),
      ...formData,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock),
      sales: 0,
      status: parseInt(formData.stock) > 10 ? 'active' : parseInt(formData.stock) > 0 ? 'low_stock' : 'out_of_stock'
    }
    setProducts([...products, newProduct])
    setShowAddModal(false)
    setFormData({ name: '', price: '', stock: '', category: 'Electronics' })
    toast.success('Product added successfully!')
  }

  const handleEditProduct = (e) => {
    e.preventDefault()
    const updated = products.map(p =>
      p._id === editingProduct._id
        ? {
            ...p,
            ...formData,
            price: parseFloat(formData.price),
            stock: parseInt(formData.stock),
            status: parseInt(formData.stock) > 10 ? 'active' : parseInt(formData.stock) > 0 ? 'low_stock' : 'out_of_stock'
          }
        : p
    )
    setProducts(updated)
    setEditingProduct(null)
    setFormData({ name: '', price: '', stock: '', category: 'Electronics' })
    toast.success('Product updated successfully!')
  }

  const handleDelete = (id) => {
    setProducts(products.filter(p => p._id !== id))
    toast.success('Product deleted!')
  }

  const openEditModal = (product) => {
    setEditingProduct(product)
    setFormData({
      name: product.name,
      price: product.price.toString(),
      stock: product.stock.toString(),
      category: product.category
    })
    setShowAddModal(true)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-500/20 text-green-400'
      case 'low_stock': return 'bg-yellow-500/20 text-yellow-400'
      case 'out_of_stock': return 'bg-red-500/20 text-red-400'
      default: return 'bg-gray-500/20 text-gray-400'
    }
  }

  return (
    <div className="relative min-h-screen pt-24 pb-12">
      <AnimatedBackground />
      
      <div className="relative z-10 section-padding">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold luxury-text font-['Playfair_Display'] mb-2">Inventory Management</h1>
          <p className="text-gray-400">Manage your products, track stock levels, and monitor sales</p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {stats.map((stat, index) => (
            <div key={stat.title} className="glass-card p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-luxury-gold/20 rounded-xl flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-luxury-gold" />
                </div>
                <span className={`text-sm font-medium ${stat.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                  {stat.change}
                </span>
              </div>
              <h3 className="text-gray-400 text-sm mb-1">{stat.title}</h3>
              <p className="text-2xl font-bold text-white">{stat.value}</p>
            </div>
          ))}
        </motion.div>

        {/* Actions Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-4 mb-6"
        >
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-luxury-gold"
              />
            </div>
            <button
              onClick={() => {
                setEditingProduct(null)
                setFormData({ name: '', price: '', stock: '', category: 'Electronics' })
                setShowAddModal(true)
              }}
              className="glass-button flex items-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>Add Product</span>
            </button>
          </div>
        </motion.div>

        {/* Products Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left p-4 text-gray-400 font-medium">Product</th>
                  <th className="text-left p-4 text-gray-400 font-medium">Category</th>
                  <th className="text-left p-4 text-gray-400 font-medium">Price</th>
                  <th className="text-left p-4 text-gray-400 font-medium">Stock</th>
                  <th className="text-left p-4 text-gray-400 font-medium">Sales</th>
                  <th className="text-left p-4 text-gray-400 font-medium">Status</th>
                  <th className="text-left p-4 text-gray-400 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product._id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-luxury-gold/20 rounded-lg flex items-center justify-center">
                          <Package className="w-5 h-5 text-luxury-gold" />
                        </div>
                        <span className="text-white font-medium">{product.name}</span>
                      </div>
                    </td>
                    <td className="p-4 text-gray-400">{product.category}</td>
                    <td className="p-4 text-white font-semibold">${product.price}</td>
                    <td className="p-4">
                      <span className={`font-medium ${product.stock < 5 ? 'text-red-400' : 'text-white'}`}>
                        {product.stock}
                      </span>
                    </td>
                    <td className="p-4 text-gray-400">{product.sales}</td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(product.status)}`}>
                        {product.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => openEditModal(product)}
                          className="p-2 text-gray-400 hover:text-luxury-gold hover:bg-white/5 rounded-lg transition-all"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(product._id)}
                          className="p-2 text-gray-400 hover:text-red-400 hover:bg-white/5 rounded-lg transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Add/Edit Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-card p-8 max-w-md w-full"
            >
              <h2 className="text-2xl font-bold text-white mb-6 font-['Playfair_Display']">
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </h2>
              <form onSubmit={editingProduct ? handleEditProduct : handleAddProduct} className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Product Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-luxury-gold"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Price</label>
                    <input
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      required
                      min="0"
                      step="0.01"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-luxury-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Stock</label>
                    <input
                      type="number"
                      value={formData.stock}
                      onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                      required
                      min="0"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-luxury-gold"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-luxury-gold"
                  >
                    <option value="Electronics">Electronics</option>
                    <option value="Fashion">Fashion</option>
                    <option value="Accessories">Accessories</option>
                    <option value="Home & Living">Home & Living</option>
                    <option value="Sports">Sports</option>
                  </select>
                </div>
                <div className="flex space-x-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 py-3 border border-white/10 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="flex-1 glass-button">
                    {editingProduct ? 'Update' : 'Add'} Product
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Inventory
