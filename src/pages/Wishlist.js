import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import MasonryGrid from '../components/MasonryGrid';

const Wishlist = () => {
  const location = useLocation();
  const [wishlistItems, setWishlistItems] = useState([]);
  const { addToCart } = useContext(CartContext);

  const fetchWishlistItems = () => {
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => {
        const filtered = data.filter(product => wishlist.includes(product.id));
        setWishlistItems(filtered);
      });
  };

  useEffect(() => {
    fetchWishlistItems();
  }, [location]);

  const removeFromWishlist = (id) => {
    const updated = wishlistItems.filter(item => item.id !== id);
    setWishlistItems(updated);

    const stored = JSON.parse(localStorage.getItem('wishlist')) || [];
    const newList = stored.filter(w => w !== id);
    localStorage.setItem('wishlist', JSON.stringify(newList));
  };

  const clearWishlist = () => {
    localStorage.removeItem('wishlist');
    setWishlistItems([]);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Your Wishlist ❤️</h2>

      {wishlistItems.length === 0 ? (
        <p>No items in wishlist.</p>
      ) : (
        <>
          <button onClick={clearWishlist} style={{ marginBottom: '20px' }}>
            Clear Wishlist 🗑️
          </button>
          <MasonryGrid>
            {wishlistItems.map(item => (
              <ProductCard
                key={item.id}
                product={item}
                onAddToCart={addToCart}
                onToggleWishlist={removeFromWishlist}
                isWishlisted={true}
              />
            ))}
          </MasonryGrid>
        </>
      )}

      <button
        onClick={() => {
          window.location.href = '/';
        }}
        style={{ display: 'inline-block', marginTop: '30px' }}
      >
        ← Continue Shopping
      </button>
    </div>
  );
};

export default Wishlist;
