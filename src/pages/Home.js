// src/pages/Home.js
import React, { useState, useEffect, useContext } from 'react';
import { CartContext } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import MasonryGrid from '../components/MasonryGrid';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('wishlist');
    return saved ? JSON.parse(saved) : [];
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then(res => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then(data => {
        setProducts(data.products);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch products:', err);
        setError('Failed to load products. Please try again later.');
        setLoading(false);
      });
  }, []);

  const toggleWishlist = (id) => {
    setWishlist(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  if (loading) return <p>Loading products...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <h1>Featured Products</h1>
      <MasonryGrid>
        {products.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={addToCart}
            onToggleWishlist={toggleWishlist}
            isWishlisted={wishlist.includes(product.id)}
          />
        ))}
      </MasonryGrid>
    </div>
  );
};

export default Home;
