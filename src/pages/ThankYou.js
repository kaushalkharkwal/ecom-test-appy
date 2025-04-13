// src/pages/ThankYou.js
import React from 'react';
import { Link } from 'react-router-dom';

const ThankYou = () => (
  <div style={{ padding: '20px' }}>
    <h2>Thank You!</h2>
    <p>Your order has been placed successfully. We appreciate your business!</p>
    <Link to="/">Continue Shopping</Link>
  </div>
);

export default ThankYou;