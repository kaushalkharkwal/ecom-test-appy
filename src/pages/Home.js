// src/pages/Home.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>All Products</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {products.map(product => (
          <div key={product.id} style={{ margin: '10px', border: '1px solid #ccc', padding: '10px', width: '200px' }}>
            <h4>{product.title}</h4>
            <img src={product.image} alt={product.title} style={{ width: '100px', height: '100px' }} />
            <p>${product.price}</p>
            <Link to={`/product/${product.id}`}>View</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;