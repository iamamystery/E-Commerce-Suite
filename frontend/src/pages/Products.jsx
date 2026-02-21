import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter, Grid3X3, List, ChevronDown, SlidersHorizontal, X } from 'lucide-react'
import ProductCard from '../components/ProductCard'
import AnimatedBackground from '../components/AnimatedBackground'

const allProducts = [
  { _id: "1", name: "Premium Wireless Headphones", price: 299, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400", category: "Electronics", rating: 4.8, reviews: 124, inStock: true },
  { _id: "2", name: "Luxury Leather Watch", price: 599, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400", category: "Accessories", rating: 4.9, reviews: 89, inStock: true },
  { _id: "3", name: "Designer Sunglasses", price: 249, image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400", category: "Accessories", rating: 4.7, reviews: 156, inStock: true },
  { _id: "4", name: "Smart Home Hub", price: 199, image: "https://images.unsplash.com/photo-1558089687-f282ffcbc126?w=400", category: "Electronics", rating: 4.6, reviews: 203, inStock: true },
  { _id: "5", name: "Minimalist Desk Lamp", price: 129, image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400", category: "Home & Living", rating: 4.5, reviews: 78, inStock: true },
  { _id: "6", name: "Leather Messenger Bag", price: 349, image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400", category: "Fashion", rating: 4.8, reviews: 134, inStock: false },
  { _id: "7", name: "Mechanical Keyboard", price: 189, image: "https://images.unsplash.com/photo-1595225476474-87563907a212?w=400", category: "Electronics", rating: 4.7, reviews: 267, inStock: true },
  { _id: "8", name: "Ceramic Coffee Set", price: 89, image: "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?w=400", category: "Home & Living", rating: 4.6, reviews: 92, inStock: true },
  { _id: "9", name: "Running Sneakers", price: 159, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400", category: "Fashion", rating: 4.4, reviews: 189, inStock: true },
  { _id: "10", name: "Portable Charger", price: 49, image: "https://images.unsplash.com/photo-1609592424305-249a5c658e58?w=400", category: "Electronics", rating: 4.5, reviews: 445, inStock: true },
  { _id: "11", name: "Yoga Mat Premium", price: 79, image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400", category: "Sports", rating: 4.7, reviews: 156, inStock: true },
  { _id: "12", name: "Stainless Steel Bottle", price: 39, image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400", category: "Sports", rating: 4.6, reviews: 234, inStock: true },
]

const categories = ["All", "Electronics", "Fashion", "Accessories", "Home & Living", "Sports"]
const sortOptions = ["Featured", "Price: Low to High", "Price: High to Low", "Best Rated", "Newest"]

const Products = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [sortBy, setSortBy] = useState("Featured")
  const [viewMode, setViewMode] = useState("grid")
  const [showFilters, setShowFilters] = useState(false)
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [filteredProducts, setFilteredProducts] = useState(allProducts)

  useEffect(() => {
    let filtered = allProducts

    if (searchQuery) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    if (selectedCategory !== "All") {
      filtered = filtered.filter(p => p.category === selectedCategory)
    }

    filtered = filtered.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1])

    switch (sortBy) {
      case "Price: Low to High":
        filtered = [...filtered].sort((a, b) => a.price - b.price)
        break
      case "Price: High to Low":
        filtered = [...filtered].sort((a, b) => b.price - a.price)
        break
      case "Best Rated":
        filtered = [...filtered].sort((a, b) => b.rating - a.rating)
        break
      default:
        break
    }

    setFilteredProducts(filtered)
  }, [searchQuery, selectedCategory, sortBy, priceRange])

  return (
    <div className="relative min-h-screen pt-24">
      <AnimatedBackground />
      
      <div className="relative z-10 section-padding">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold luxury-text font-['Playfair_Display'] mb-4">
            All Products
          </h1>
          <p className="text-gray-400">Discover our curated collection of premium items</p>
        </motion.div>

        {/* Search and Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-4 mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-luxury-gold transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedCategory === cat
                      ? 'bg-luxury-gold text-luxury-dark'
                      : 'bg-white/5 text-gray-300 hover:bg-white/10'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Controls */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  showFilters ? 'bg-luxury-gold text-luxury-dark' : 'bg-white/5 text-gray-300 hover:bg-white/10'
                }`}
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span>Filters</span>
              </button>

              <div className="flex items-center bg-white/5 rounded-lg p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-md transition-colors ${viewMode === "grid" ? 'bg-luxury-gold text-luxury-dark' : 'text-gray-400'}`}
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-md transition-colors ${viewMode === "list" ? 'bg-luxury-gold text-luxury-dark' : 'text-gray-400'}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>

              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none px-4 py-2 pr-10 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-luxury-gold cursor-pointer"
                >
                  {sortOptions.map((opt) => (
                    <option key={opt} value={opt} className="bg-luxury-dark">{opt}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 pt-4 border-t border-white/10"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Price Range: ${priceRange[0]} - ${priceRange[1]}</label>
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                    className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-luxury-gold"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Availability</label>
                  <div className="flex gap-2">
                    <button className="px-3 py-1 bg-luxury-gold/20 text-luxury-gold rounded-full text-sm">In Stock</button>
                    <button className="px-3 py-1 bg-white/5 text-gray-400 rounded-full text-sm hover:bg-white/10">Out of Stock</button>
                  </div>
                </div>
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Minimum Rating</label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button key={star} className="text-luxury-gold hover:scale-110 transition-transform">★</button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-400">
            Showing <span className="text-white font-semibold">{filteredProducts.length}</span> products
          </p>
        </div>

        {/* Products Grid */}
        <div className={`grid gap-6 ${
          viewMode === "grid" 
            ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" 
            : "grid-cols-1"
        }`}>
          {filteredProducts.map((product, index) => (
            <ProductCard key={product._id} product={product} index={index} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-gray-400 text-lg">No products found matching your criteria.</p>
            <button
              onClick={() => {
                setSearchQuery("")
                setSelectedCategory("All")
                setPriceRange([0, 1000])
              }}
              className="mt-4 text-luxury-gold hover:text-luxury-silver transition-colors"
            >
              Clear all filters
            </button>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default Products
