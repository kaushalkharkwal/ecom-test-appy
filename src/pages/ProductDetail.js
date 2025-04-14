// src/pages/ProductDetail.js
import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Product not found');
        return res.json();
      })
      .then(data => setProduct(data))
      .catch(err => setError(err.message));
  }, [id]);

  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!product) return <p>Loading product details...</p>;

  return (
    <div className="product-detail">
      <img src={product.thumbnail || product.images[0]} alt={product.title} />
      <h2>{product.title}</h2>
      <p>{product.description}</p>
      <p><strong>${product.price}</strong></p>
      <button onClick={() => addToCart(product)}>Add to Cart</button>
    </div>
  );
};

export default ProductDetail;
