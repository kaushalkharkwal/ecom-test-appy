// src/pages/Checkout.js
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const Checkout = () => {
  const { cart, setCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    paymentMethod: 'card'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      alert('Cart is empty!');
      return;
    }

    // Clear cart and redirect
    localStorage.removeItem('cart');
    setCart([]);
    navigate('/thank-you');
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Checkout</h2>
      <form onSubmit={handleSubmit} style={{ maxWidth: '400px' }}>
        <div>
          <label>Name:</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            style={{ width: '100%', marginBottom: '10px' }}
          />
        </div>

        <div>
          <label>Email:</label>
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{ width: '100%', marginBottom: '10px' }}
          />
        </div>

        <div>
          <label>Address:</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            style={{ width: '100%', marginBottom: '10px' }}
          />
        </div>

        <div>
          <label>Payment Method:</label>
          <select
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
            style={{ width: '100%', marginBottom: '10px' }}
          >
            <option value="card">Credit Card</option>
            <option value="paypal">PayPal</option>
            <option value="cod">Cash on Delivery</option>
          </select>
        </div>

        <div>
          <h3>Order Summary:</h3>
          <ul>
            {cart.map(item => (
              <li key={item.id}>{item.title} - ${item.price}</li>
            ))}
          </ul>
          <p><strong>Total: ${total.toFixed(2)}</strong></p>
        </div>

        <button type="submit">Place Order</button>
      </form>
    </div>
  );
};

export default Checkout;
