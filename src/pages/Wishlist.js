// src/pages/Wishlist.js
import React, { useState, useEffect, useContext } from 'react';
import { CartContext } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import { Link } from 'react-router-dom';

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => {
        const filtered = data.filter(product => wishlist.includes(product.id));
        setWishlistItems(filtered);
      });
  }, []);

  const removeFromWishlist = (id) => {
    const updated = wishlistItems.filter(item => item.id !== id);
    setWishlistItems(updated);

    const stored = JSON.parse(localStorage.getItem('wishlist')) || [];
    const newList = stored.filter(w => w !== id);
    localStorage.setItem('wishlist', JSON.stringify(newList));
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Your Wishlist ❤️</h2>

      {wishlistItems.length === 0 ? (
        <p>No items in wishlist.</p>
      ) : (
        <div className="product-grid">
          {wishlistItems.map(item => (
            <ProductCard
              key={item.id}
              product={item}
              onAddToCart={addToCart}
              onToggleWishlist={removeFromWishlist}
              isWishlisted={true}
            />
          ))}
        </div>
      )}

      <Link to="/" style={{ display: 'inline-block', marginTop: '30px' }}>
        ← Continue Shopping
      </Link>
    </div>
  );
};

export default Wishlist;
