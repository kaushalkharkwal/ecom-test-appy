// src/components/ProductCard.js
import React from 'react';
import './ProductCard.css';

const ProductCard = ({ product, onAddToCart, onToggleWishlist, isWishlisted }) => {
  const {
    title,
    thumbnail,
    price,
    discountPercentage,
    rating,
    brand,
    stock,
    category
  } = product;

  const discountedPrice = (price - (price * discountPercentage) / 100).toFixed(2);

  return (
    <div className="product-card">
      <img
        src={thumbnail}
        alt={title}
        className="product-image"
        loading="lazy"
      />
      <h2 className="product-title">{title}</h2>
      <p className="product-brand"><strong>{brand}</strong> | {category}</p>
      <p className="product-stock">
        {stock > 0 ? `In Stock (${stock})` : 'Out of Stock'}
      </p>
      <p className="product-rating">⭐ {rating} / 5</p>
      <p className="product-price">
        <span className="discounted">${discountedPrice}</span>{' '}
        <span className="original">${price}</span>{' '}
        <span className="discount">({discountPercentage}% OFF)</span>
      </p>

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
