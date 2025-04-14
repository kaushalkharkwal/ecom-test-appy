import React, { useContext } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate
} from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import ThankYou from './pages/ThankYou';
import Wishlist from './pages/Wishlist';
import { CartProvider, CartContext } from './context/CartContext';
import usePageTracking from './hooks/usePageTracking';

const ProtectedRoute = ({ children }) => {
  const { cart } = useContext(CartContext);
  return cart.length === 0 ? <Navigate to="/" replace /> : children;
};

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
        <Route path="/wishlist" element={<PageWrapper><Wishlist /></PageWrapper>} />
        <Route path="/product/:id" element={<PageWrapper><ProductDetail /></PageWrapper>} />
        <Route path="/cart" element={<PageWrapper><Cart /></PageWrapper>} />
        <Route path="/checkout" element={<PageWrapper><ProtectedRoute><Checkout /></ProtectedRoute></PageWrapper>} />
        <Route path="/thank-you" element={<PageWrapper><ProtectedRoute><ThankYou /></ProtectedRoute></PageWrapper>} />
        <Route path="*" element={<PageWrapper><h2>404 - Page Not Found</h2></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
};

const PageWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.3 }}
  >
    {children}
  </motion.div>
);

const App = () => (
  <CartProvider>
    <Router>
      {usePageTracking()}
      <Navbar />
      <AnimatedRoutes />
    </Router>
  </CartProvider>
);

export default App;
