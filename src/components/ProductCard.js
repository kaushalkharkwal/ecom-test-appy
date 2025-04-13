// src/components/ProductCard.js
import React from 'react';
import './ProductCard.css';

const ProductCard = ({ product, onAddToCart, onToggleWishlist, isWishlisted }) => {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.title} className="product-image" />
      <h2 className="product-title">{product.title}</h2>
      <p className="price">${product.price.toFixed(2)}</p>
      <p className="rating">⭐ {product.rating?.rate || 4.0} / 5</p>
      <span
        className={`heart-icon ${isWishlisted ? 'active' : ''}`}
        onClick={() => onToggleWishlist(product.id)}
        title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
      >
        {isWishlisted ? '❤️' : '🤍'}
      </span>
      <button className="add-to-cart" onClick={() => onAddToCart(product)}>
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
