// LocalStorage utility for static site data persistence
export const storage = {
  get: (key, defaultValue = null) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch {
      return defaultValue;
    }
  },
  
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch {
      return false;
    }
  },
  
  remove: (key) => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch {
      return false;
    }
  }
};

// Generate unique ID for orders
export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Mock delay for realistic feel
export const mockDelay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

// Format currency
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
};

// Calculate order totals
export const calculateOrderTotals = (items) => {
  const itemsPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const taxPrice = itemsPrice * 0.08;
  const totalPrice = itemsPrice + shippingPrice + taxPrice;
  
  return {
    itemsPrice: Math.round(itemsPrice * 100) / 100,
    shippingPrice: Math.round(shippingPrice * 100) / 100,
    taxPrice: Math.round(taxPrice * 100) / 100,
    totalPrice: Math.round(totalPrice * 100) / 100
  };
};
