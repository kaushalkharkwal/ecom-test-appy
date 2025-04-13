// src/pages/Cart.js
import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cart, removeFromCart } = useContext(CartContext);

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <React.Fragment>
          {cart.map(item => (
            <div key={item.id} style={{ margin: '10px 0' }}>
              {item.title} - ${item.price}
              <button onClick={() => removeFromCart(item.id)} style={{ marginLeft: '10px' }}>Remove</button>
            </div>
          ))}
          <h3>Total: ${total.toFixed(2)}</h3>
          <Link to="/checkout">Go to Checkout</Link>
        </React.Fragment>
      )}
    </div>
  );
};

export default Cart;