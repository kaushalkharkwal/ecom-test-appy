// src/pages/ProductDetail.js
import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data));
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>{product.title}</h2>
      <img src={product.image} alt={product.title} style={{ width: '200px' }} />
      <p>{product.description}</p>
      <p><strong>${product.price}</strong></p>
      <button onClick={() => addToCart(product)}>Add to Cart</button>
    </div>
  );
};

export default ProductDetail;