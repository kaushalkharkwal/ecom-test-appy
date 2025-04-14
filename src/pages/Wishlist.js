// src/pages/Wishlist.js
import React, { useEffect, useState, useContext } from 'react';
import { CartContext } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import MasonryGrid from '../components/MasonryGrid';

const Wishlist = () => {
  const [products, setProducts] = useState([]);
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then(res => res.json())
      .then(data => setProducts(data.products))
      .catch(err => console.error('Failed to fetch products:', err));
  }, []);

  const toggleWishlist = (id) => {
    const updated = wishlist.includes(id)
      ? wishlist.filter(item => item !== id)
      : [...wishlist, id];
    setWishlist(updated);
    localStorage.setItem('wishlist', JSON.stringify(updated));
  };

  const wishlistItems = products.filter(product =>
    wishlist.includes(product.id)
  );

  return (
    <div>
      <h1>Your Wishlist</h1>
      <MasonryGrid>
        {wishlistItems.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={addToCart}
            onToggleWishlist={toggleWishlist}
            isWishlisted={true}
          />
        ))}
      </MasonryGrid>
    </div>
  );
};

export default Wishlist;
