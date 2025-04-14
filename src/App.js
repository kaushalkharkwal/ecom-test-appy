// src/App.js
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import ProductDetail from './pages/ProductDetail';
import ThankYou from './pages/ThankYou';
import Wishlist from './pages/Wishlist';
import { CartProvider } from './context/CartContext';
import usePageTracking from './hooks/usePageTracking';
import PageTracker from './components/PageTracker'; // 👈 import
const App = () => {
  return (
    <CartProvider>
      <Router>
  <PageTracker /> {/* ✅ Now safe and inside <Router> */}
  <Navbar />
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/product/:id" element={<ProductDetail />} />
    <Route path="/cart" element={<Cart />} />
    <Route path="/wishlist" element={<Wishlist />} />
    <Route path="/checkout" element={<Checkout />} />
    <Route path="/thankyou" element={<ThankYou />} />
  </Routes>
</Router>
    </CartProvider>
  );
};

export default App;
