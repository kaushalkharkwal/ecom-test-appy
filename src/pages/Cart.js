import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cart, removeFromCart } = useContext(CartContext);
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const handleRemove = (id) => {
    const item = cart.find(i => i.id === id);
    if (item) {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'remove_from_cart',
        ecommerce: {
          currency: 'USD',
          items: [{
            item_id: item.id,
            item_name: item.title,
            price: item.price
          }]
        }
      });
    }
    removeFromCart(id);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Your Cart</h2>
      {cart.map(item => (
        <div key={item.id} style={{ margin: '10px 0' }}>
          {item.title} - ${item.price.toFixed(2)}
          <button onClick={() => handleRemove(item.id)} style={{ marginLeft: '10px' }}>Remove</button>
        </div>
      ))}
      <h3>Total: ${total.toFixed(2)}</h3>
      <Link to="/checkout">Go to Checkout</Link>
    </div>
  );
};

export default Cart;
