import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import MasonryGrid from '../components/MasonryGrid';

const Wishlist = () => {
  const location = useLocation();
  const [wishlistItems, setWishlistItems] = useState([]);
  const { addToCart } = useContext(CartContext);

  const fetchWishlistItems = () => {
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

    console.log('📥 Wishlist IDs from localStorage:', wishlist);

    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => {
        const filtered = data.filter(product => wishlist.includes(product.id));
        setWishlistItems(filtered);

        const mappedItems = filtered.map(item => ({
          item_id: item.id,
          item_name: item.title,
          price: item.price
        }));

        console.log('🛍 Wishlist items to send to GA4:', mappedItems);

        setTimeout(() => {
          console.log('🔥 Triggering view_wishlist event...');
          window.dataLayer = window.dataLayer || [];
          window.dataLayer.push({
            event: 'view_wishlist',
            ecommerce: {
              currency: 'USD',
              items: mappedItems
            }
          });
        }, 1500); // delay to allow GTM to initialize
      });
  };

  useEffect(() => {
    fetchWishlistItems();
  }, [location]);

  const removeFromWishlist = (id) => {
    const updated = wishlistItems.filter(item => item.id !== id);
    setWishlistItems(updated);

    const stored = JSON.parse(localStorage.getItem('wishlist')) || [];
    const newList = stored.filter(w => w !== id);
    localStorage.setItem('wishlist', JSON.stringify(newList));

    const removedItem = wishlistItems.find(item => item.id === id);
    if (removedItem) {
      const itemData = {
        item_id: removedItem.id,
        item_name: removedItem.title,
        price: removedItem.price
      };

      console.log('❌ remove_from_wishlist triggered for:', itemData);

      setTimeout(() => {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: 'remove_from_wishlist',
          ecommerce: {
            currency: 'USD',
            items: [itemData]
          }
        });
      }, 500);
    }
  };

  const clearWishlist = () => {
    localStorage.removeItem('wishlist');
    setWishlistItems([]);
    console.log('🧹 Wishlist cleared');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Your Wishlist ❤️</h2>

      {wishlistItems.length === 0 ? (
        <p>No items in wishlist.</p>
      ) : (
        <>
          <button onClick={clearWishlist} style={{ marginBottom: '20px' }}>
            Clear Wishlist 🗑️
          </button>
          <MasonryGrid>
            {wishlistItems.map(item => (
              <ProductCard
                key={item.id}
                product={item}
                onAddToCart={addToCart}
                onToggleWishlist={removeFromWishlist}
                isWishlisted={true}
              />
            ))}
          </MasonryGrid>
        </>
      )}

      <button
        onClick={() => {
          window.location.href = '/';
        }}
        style={{ display: 'inline-block', marginTop: '30px' }}
      >
        ← Continue Shopping
      </button>
    </div>
  );
};

export default Wishlist;
