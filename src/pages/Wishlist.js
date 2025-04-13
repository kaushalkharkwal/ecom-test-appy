// src/pages/Wishlist.js
import React, { useState, useEffect, useContext } from 'react';
import { CartContext } from '../context/CartContext';

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
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
          {wishlistItems.map(item => (
            <div key={item.id} style={{ border: '1px solid #ccc', padding: '10px' }}>
              <h4>{item.title}</h4>
              <img src={item.image} alt={item.title} style={{ width: '100px', height: '100px', objectFit: 'contain' }} />
              <p><strong>${item.price}</strong></p>
              <p>⭐ {item.rating?.rate} / 5</p>
              <button onClick={() => addToCart(item)}>Add to Cart</button>
              <button onClick={() => removeFromWishlist(item.id)} style={{ marginLeft: '10px' }}>
                Remove ❤️
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
