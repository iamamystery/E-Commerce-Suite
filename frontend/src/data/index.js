// Static product data
export const products = [
  {
    _id: "1",
    name: "Premium Wireless Headphones",
    price: 299,
    originalPrice: 399,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
    category: "Electronics",
    rating: 4.8,
    reviews: 124,
    inStock: true,
    stock: 15,
    description: "Experience crystal-clear audio with our premium wireless headphones. Featuring active noise cancellation, 30-hour battery life, and ultra-comfortable memory foam ear cushions.",
    features: ["Active Noise Cancellation", "30-hour Battery Life", "Bluetooth 5.0", "Memory Foam Cushions"],
    sales: 234,
    status: "active"
  },
  {
    _id: "2",
    name: "Luxury Leather Watch",
    price: 599,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
    category: "Accessories",
    rating: 4.9,
    reviews: 89,
    inStock: true,
    stock: 8,
    description: "Handcrafted leather watch with Swiss movement. A timeless piece for the modern professional.",
    features: ["Swiss Movement", "Genuine Leather", "Water Resistant", "Sapphire Crystal"],
    sales: 156,
    status: "active"
  },
  {
    _id: "3",
    name: "Designer Sunglasses",
    price: 249,
    originalPrice: 349,
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400",
    category: "Accessories",
    rating: 4.7,
    reviews: 156,
    inStock: true,
    stock: 23,
    description: "UV protection sunglasses with polarized lenses. Style meets functionality.",
    features: ["UV400 Protection", "Polarized Lenses", "Titanium Frame", "Case Included"],
    sales: 189,
    status: "active"
  },
  {
    _id: "4",
    name: "Smart Home Hub",
    price: 199,
    image: "https://images.unsplash.com/photo-1558089687-f282ffcbc126?w=400",
    category: "Electronics",
    rating: 4.6,
    reviews: 203,
    inStock: true,
    stock: 5,
    description: "Central hub for all your smart home devices. Control everything from one place.",
    features: ["Voice Control", "App Integration", "Compatible with 1000+ devices", "Easy Setup"],
    sales: 312,
    status: "low_stock"
  },
  {
    _id: "5",
    name: "Minimalist Desk Lamp",
    price: 129,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400",
    category: "Home & Living",
    rating: 4.5,
    reviews: 78,
    inStock: true,
    stock: 34,
    description: "Adjustable LED desk lamp with wireless charging pad. Perfect for your workspace.",
    features: ["Wireless Charging", "Adjustable Brightness", "USB Port", "Touch Controls"],
    sales: 145,
    status: "active"
  },
  {
    _id: "6",
    name: "Leather Messenger Bag",
    price: 349,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400",
    category: "Fashion",
    rating: 4.8,
    reviews: 134,
    inStock: false,
    stock: 0,
    description: "Premium leather bag for professionals. Fits laptops up to 15 inches.",
    features: ["Genuine Leather", "Laptop Compartment", "Multiple Pockets", "Adjustable Strap"],
    sales: 98,
    status: "out_of_stock"
  },
  {
    _id: "7",
    name: "Mechanical Keyboard",
    price: 189,
    image: "https://images.unsplash.com/photo-1595225476474-87563907a212?w=400",
    category: "Electronics",
    rating: 4.7,
    reviews: 267,
    inStock: true,
    stock: 42,
    description: "RGB mechanical keyboard with Cherry MX switches. For gaming and productivity.",
    features: ["Cherry MX Switches", "RGB Backlight", "Programmable Keys", "Aluminum Frame"],
    sales: 523,
    status: "active"
  },
  {
    _id: "8",
    name: "Ceramic Coffee Set",
    price: 89,
    image: "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?w=400",
    category: "Home & Living",
    rating: 4.6,
    reviews: 92,
    inStock: true,
    stock: 28,
    description: "Handcrafted ceramic coffee set. Includes 4 cups and a pot.",
    features: ["Handcrafted", "Microwave Safe", "Dishwasher Safe", "Elegant Design"],
    sales: 76,
    status: "active"
  },
  {
    _id: "9",
    name: "Running Sneakers",
    price: 159,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
    category: "Fashion",
    rating: 4.4,
    reviews: 189,
    inStock: true,
    stock: 56,
    description: "Lightweight running shoes with advanced cushioning technology.",
    features: ["Breathable Mesh", "Cushioned Sole", "Lightweight", "Durable"],
    sales: 234,
    status: "active"
  },
  {
    _id: "10",
    name: "Portable Charger",
    price: 49,
    image: "https://images.unsplash.com/photo-1609592424305-249a5c658e58?w=400",
    category: "Electronics",
    rating: 4.5,
    reviews: 445,
    inStock: true,
    stock: 78,
    description: "20000mAh power bank with fast charging. Charge your devices on the go.",
    features: ["20000mAh Capacity", "Fast Charging", "Dual USB Ports", "LED Display"],
    sales: 892,
    status: "active"
  },
  {
    _id: "11",
    name: "Yoga Mat Premium",
    price: 79,
    image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400",
    category: "Sports",
    rating: 4.7,
    reviews: 156,
    inStock: true,
    stock: 45,
    description: "Non-slip yoga mat with extra cushioning. Perfect for all yoga styles.",
    features: ["Non-slip Surface", "Extra Thick", "Eco-friendly", "Carrying Strap"],
    sales: 167,
    status: "active"
  },
  {
    _id: "12",
    name: "Stainless Steel Bottle",
    price: 39,
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400",
    category: "Sports",
    rating: 4.6,
    reviews: 234,
    inStock: true,
    stock: 67,
    description: "Insulated water bottle keeps drinks cold for 24 hours or hot for 12 hours.",
    features: ["Double Wall Insulation", "BPA Free", "Leak Proof", "Easy Clean"],
    sales: 445,
    status: "active"
  }
];

// Categories
export const categories = [
  { name: "Electronics", image: "https://images.unsplash.com/photo-1498049860654-af1a5c5668ba?w=400", count: 4 },
  { name: "Fashion", image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400", count: 2 },
  { name: "Home & Living", image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=400", count: 2 },
  { name: "Accessories", image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=400", count: 2 },
  { name: "Sports", image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400", count: 2 }
];

// AI Recommendations
export const aiRecommendedProducts = [
  { _id: "ai1", name: "AI Pick: Wireless Earbuds Pro", price: 199, image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400", category: "Electronics", rating: 4.9, reviews: 334, matchScore: 98, reason: "Matches your tech preferences" },
  { _id: "ai2", name: "For You: Smart Watch Series 5", price: 399, image: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=400", category: "Electronics", rating: 4.8, reviews: 289, matchScore: 95, reason: "Popular in Electronics" },
  { _id: "ai3", name: "Trending: Designer Handbag", price: 499, image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400", category: "Fashion", rating: 4.9, reviews: 156, matchScore: 92, reason: "Trending now" },
  { _id: "ai4", name: "Recommended: Luxury Pen Set", price: 129, image: "https://images.unsplash.com/photo-1585336261022-681e348c5508?w=400", category: "Accessories", rating: 4.7, reviews: 98, matchScore: 90, reason: "Based on your browsing" }
];

// Featured products (subset)
export const featuredProducts = products.slice(0, 4);

// Testimonials
export const testimonials = [
  { name: "Sarah Johnson", role: "Fashion Enthusiast", text: "The AI recommendations are spot on! Found exactly what I was looking for.", rating: 5 },
  { name: "Michael Chen", role: "Tech Collector", text: "Premium quality products and exceptional service. Highly recommended!", rating: 5 },
  { name: "Emma Williams", role: "Interior Designer", text: "Beautiful curation and fast shipping. LuxeCart is my go-to store.", rating: 5 }
];

// LocalStorage keys
export const STORAGE_KEYS = {
  CART: 'luxecart_cart',
  ORDERS: 'luxecart_orders',
  USER: 'luxecart_user',
  WISHLIST: 'luxecart_wishlist',
  BROWSING_HISTORY: 'luxecart_history'
};
