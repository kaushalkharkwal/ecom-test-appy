// src/pages/Wishlist.js
import React, { useState, useEffect, useContext } from 'react';
import { CartContext } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import MasonryGrid from '../components/MasonryGrid';
import { Link } from 'react-router-dom';

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const { addToCart } = useContext(CartContext);

  const getStoredWishlist = () => JSON.parse(localStorage.getItem('wishlist')) || [];

  const fetchWishlistItems = () => {
    const wishlist = getStoredWishlist();
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => {
        const filtered = data.filter(product => wishlist.includes(product.id));
        setWishlistItems(filtered);
      });
  };

  useEffect(() => {
    fetchWishlistItems();
  }, []);

  const toggleWishlist = (id) => {
    const stored = getStoredWishlist();
    const updated = stored.includes(id)
      ? stored.filter(w => w !== id)
      : [...stored, id];

    localStorage.setItem('wishlist', JSON.stringify(updated));
    const newItems = wishlistItems.filter(item => updated.includes(item.id));
    if (!stored.includes(id)) {
      fetch(`https://fakestoreapi.com/products/${id}`)
        .then(res => res.json())
        .then(newProduct => {
          setWishlistItems([...newItems, newProduct]);
        });
    } else {
      setWishlistItems(newItems);
    }
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
          <button onClick={clearWishlist} style={{ marginBottom: '20px' }}>Clear Wishlist 🗑️</button>
          <MasonryGrid>
            {wishlistItems.map(item => (
              <ProductCard
                key={item.id}
                product={item}
                onAddToCart={addToCart}
                onToggleWishlist={toggleWishlist}
                isWishlisted={true}
              />
            ))}
          </MasonryGrid>
        </>
      )}

      <Link to="/" style={{ display: 'inline-block', marginTop: '30px' }}>
        ← Continue Shopping
      </Link>
    </div>
  );
};

export default Wishlist;
