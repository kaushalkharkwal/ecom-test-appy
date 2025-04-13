// src/pages/Checkout.js
import React, { useState } from 'react';

const Checkout = () => {
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
    alert('Order placed successfully!');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Checkout</h2>
      <form onSubmit={handleSubmit} style={{ maxWidth: '400px' }}>
        <div style={{ marginBottom: '10px' }}>
          <label>Name:</label><br />
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Email:</label><br />
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Address:</label><br />
          <textarea name="address" value={formData.address} onChange={handleChange} required />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Payment Method:</label><br />
          <select name="paymentMethod" value={formData.paymentMethod} onChange={handleChange}>
            <option value="card">Credit Card</option>
            <option value="paypal">PayPal</option>
            <option value="cod">Cash on Delivery</option>
          </select>
        </div>
        <button type="submit">Place Order</button>
      </form>
    </div>
  );
};

export default Checkout;