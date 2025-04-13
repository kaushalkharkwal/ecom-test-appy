// src/components/ProductCard.js
import React from 'react';
import './ProductCard.css'; // Optional: for scoped styles or use App.css

const ProductCard = ({ product, onAddToCart, onToggleWishlist, isWishlisted }) => {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.title} className="product-image" />
      <h2 className="product-title">{product.title}</h2>
      <p className="price">${product.price.toFixed(2)}</p>
      <div>
        <span
          className={`heart-icon ${isWishlisted ? 'active' : ''}`}
          onClick={() => onToggleWishlist(product.id)}
        >
          {isWishlisted ? '❤️' : '🤍'}
        </span>
      </div>
      <button className="add-to-cart" onClick={() => onAddToCart(product)}>
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;