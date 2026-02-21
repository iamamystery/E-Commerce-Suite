# LuxeCart - Premium E-Commerce Suite

A highly premium, visually stunning, and functionally robust full-stack e-commerce solution with advanced AI-powered features.

![LuxeCart Banner](https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200)

## 🌟 Key Features

### Frontend (React + Tailwind CSS)
- **Premium UI/UX**: Elegant, modern, and clean design with luxury aesthetics
- **Animated Background**: Subtle animated particle background that enhances the overall aesthetic
- **Responsive Design**: Fully responsive across all devices (desktop, tablet, mobile)
- **Smooth Animations**: Framer Motion powered transitions and hover effects
- **Dark Theme**: Sophisticated dark theme with gold/silver accents

### Backend (Node.js + Express + MongoDB)
- **RESTful API**: Scalable and secure API architecture
- **Authentication**: JWT-based user authentication
- **Product Management**: Full CRUD operations for products
- **Order Processing**: Complete order lifecycle management
- **Database**: MongoDB with Mongoose ODM

### AI/ML Features
- **Smart Recommendations**: AI-powered product recommendations based on user behavior
- **Similar Products**: Find similar items using content-based filtering
- **Search Enhancement**: AI-enhanced product search capabilities
- **Analytics**: AI-generated insights for business intelligence

### Key Sections
- **Hero Section**: Captivating carousel with call-to-action
- **Product Listings**: Advanced filtering, sorting, and search
- **Shopping Cart**: Add/remove items with quantity management
- **Checkout Flow**: Multi-step checkout with payment integration
- **Inventory Dashboard**: Admin panel for product management
- **AI Recommendations**: Personalized product suggestions
- **Contact Section**: Professional contact form with FAQ

## 🚀 Tech Stack

### Frontend
- **Framework**: React 18 + Vite
- **Styling**: Tailwind CSS 3.4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **State Management**: Zustand
- **Notifications**: React Hot Toast
- **Charts**: Recharts

### Backend
- **Runtime**: Node.js 20
- **Framework**: Express.js
- **Database**: MongoDB 7.0
- **ODM**: Mongoose 8
- **Authentication**: JWT + bcryptjs
- **Security**: Helmet, CORS, Rate Limiting
- **Logging**: Morgan

### AI Service
- **Language**: Python 3.11
- **Framework**: FastAPI
- **ML Libraries**: scikit-learn, NumPy, Pandas
- **Embeddings**: TF-IDF with cosine similarity

### DevOps & Deployment
- **Containerization**: Docker + Docker Compose
- **Web Server**: Nginx (production)
- **Process Manager**: PM2 (production)

## 📁 Project Structure

```
E-Commerce Suite/
├── frontend/                  # React Frontend
│   ├── src/
│   │   ├── components/        # Reusable components
│   │   │   ├── AnimatedBackground.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── ProductCard.jsx
│   │   │   └── AIRecommendations.jsx
│   │   ├── pages/             # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── Products.jsx
│   │   │   ├── ProductDetail.jsx
│   │   │   ├── Cart.jsx
│   │   │   ├── Checkout.jsx
│   │   │   ├── Inventory.jsx
│   │   │   └── Contact.jsx
│   │   ├── context/           # React Context
│   │   │   ├── CartContext.jsx
│   │   │   └── AuthContext.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── Dockerfile
│
├── backend/                   # Node.js Backend
│   ├── config/
│   │   └── db.js
│   ├── models/
│   │   ├── Product.js
│   │   ├── User.js
│   │   └── Order.js
│   ├── routes/
│   │   ├── productRoutes.js
│   │   ├── userRoutes.js
│   │   ├── orderRoutes.js
│   │   └── aiRoutes.js
│   ├── server.js
│   ├── package.json
│   ├── .env.example
│   └── Dockerfile
│
├── ai-service/              # Python AI Service
│   ├── main.py
│   ├── requirements.txt
│   └── Dockerfile
│
├── docker-compose.yml        # Docker orchestration
├── package.json              # Root package.json
└── README.md                 # This file
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 20+
- MongoDB 7.0+
- Python 3.11+ (for AI service)
- Docker & Docker Compose (optional)

### Local Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/luxecart.git
   cd luxecart
   ```

2. **Install dependencies**
   ```bash
   # Install root dependencies
   npm install
   
   # Install frontend dependencies
   cd frontend && npm install
   
   # Install backend dependencies
   cd ../backend && npm install
   ```

3. **Environment Setup**
   ```bash
   cd backend
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start MongoDB**
   Make sure MongoDB is running on your local machine or use MongoDB Atlas

5. **Run the application**
   ```bash
   # From root directory
   npm run dev
   
   # Or run services separately
   npm run dev:backend
   npm run dev:frontend
   ```

### Docker Setup (Recommended)

1. **Using Docker Compose**
   ```bash
   docker-compose up --build
   ```

2. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000
   - AI Service: http://localhost:8000
   - MongoDB: localhost:27017

## 🔧 Environment Variables

### Backend (.env)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/luxecart
JWT_SECRET=your-super-secret-jwt-key
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
```

## 📊 API Endpoints

### Products
- `GET /api/products` - Get all products (with filters)
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)

### Users
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - User login
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/preferences` - Update preferences

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders/myorders/:userId` - Get user orders
- `GET /api/orders/:id` - Get order details
- `PUT /api/orders/:id/status` - Update order status (Admin)

### AI
- `GET /api/ai/recommendations/:userId` - Get AI recommendations
- `GET /api/ai/similar/:productId` - Get similar products
- `GET /api/ai/search?q=query` - AI-enhanced search
- `GET /api/ai/insights` - Get AI insights (Admin)

## 🎨 Design Features

### Visual Design
- **Color Palette**: Dark theme with gold (#d4af37) and silver (#c0c0c0) accents
- **Typography**: Playfair Display for headings, Inter for body text
- **Glassmorphism**: Frosted glass effect cards with backdrop blur
- **Gradients**: Subtle animated gradients for visual interest
- **Micro-interactions**: Hover effects, smooth transitions

### User Experience
- **Progressive Loading**: Skeleton screens and lazy loading
- **Toast Notifications**: Non-intrusive feedback with React Hot Toast
- **Animated Background**: Particle system with connection lines
- **Smooth Scrolling**: Native smooth scroll behavior
- **Responsive Images**: Optimized images for all screen sizes

## 🔒 Security Features

- **Helmet.js**: Security headers
- **Rate Limiting**: API abuse prevention
- **CORS**: Cross-origin request configuration
- **JWT Authentication**: Secure token-based auth
- **Password Hashing**: bcrypt with salt rounds
- **Input Validation**: Express Validator

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: 1024px - 1280px
- **Large**: > 1280px

## 🚀 Deployment

### Using Docker (Production)
```bash
docker-compose -f docker-compose.yml up -d
```

### Manual Deployment
1. Build frontend: `cd frontend && npm run build`
2. Set environment variables for production
3. Start backend: `cd backend && npm start`
4. Serve frontend build files via Nginx or similar

### Cloud Deployment (AWS/Heroku)
- Configure environment variables on platform
- Set up MongoDB Atlas for cloud database
- Deploy using platform-specific instructions
- Configure custom domain and SSL

## 🧪 Testing

```bash
# Frontend tests
cd frontend && npm run test

# Backend tests
cd backend && npm run test

# AI service tests
cd ai-service && pytest
```

## 📈 Future Enhancements

- [ ] Real-time inventory updates with WebSockets
- [ ] Multi-language support (i18n)
- [ ] Advanced analytics dashboard
- [ ] Social login integration
- [ ] Wishlist functionality
- [ ] Product reviews and ratings system
- [ ] Newsletter management
- [ ] Advanced search with Elasticsearch
- [ ] Mobile app (React Native)

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 👥 Team

- **Developer**: Muhammad Jawad
- **UI/UX Design**: Premium Design Studio
- **AI/ML**: TensorFlow & Scikit-learn

## 🙏 Acknowledgments

- Unsplash for product images
- Lucide for beautiful icons
- Tailwind CSS team for the amazing framework
- React and Node.js communities

---

**Built with ❤️ for the modern e-commerce experience**

For support, contact: support@luxecart.com
