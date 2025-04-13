// src/pages/Checkout.js
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const Checkout = () => {
  const { cart, setCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', address: '', paymentMethod: 'card' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.removeItem('cart');
    setCart([]);
    navigate('/thank-you');
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Checkout</h2>
      <form onSubmit={handleSubmit} style={{ maxWidth: '400px' }}>
        <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
        <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <textarea name="address" placeholder="Address" value={formData.address} onChange={handleChange} required />
        <select name="paymentMethod" value={formData.paymentMethod} onChange={handleChange}>
          <option value="card">Credit Card</option>
          <option value="paypal">PayPal</option>
          <option value="cod">Cash on Delivery</option>
        </select>

        <h3>Order Summary:</h3>
        <ul>
          {cart.map(item => (
            <li key={item.id}>{item.title} - ${item.price}</li>
          ))}
        </ul>
        <p><strong>Total: ${total.toFixed(2)}</strong></p>
        <button type="submit">Place Order</button>
      </form>
    </div>
  );
};

export default Checkout;
