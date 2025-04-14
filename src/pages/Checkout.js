import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const Checkout = () => {
  const { cart, setCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const mappedItems = cart.map(item => ({
      item_id: item.id,
      item_name: item.title,
      price: item.price
    }));

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: 'begin_checkout', ecommerce: { currency: 'USD', items: mappedItems } });
    window.dataLayer.push({
      event: 'purchase',
      ecommerce: {
        currency: 'USD',
        transaction_id: 'T12345',
        value: cart.reduce((sum, i) => sum + i.price, 0),
        items: mappedItems
      }
    });

    setCart([]);
    localStorage.setItem('cart', '[]');
    navigate('/thank-you');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Checkout</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" required value={name} onChange={e => setName(e.target.value)} />
        <input type="text" placeholder="Address" required value={address} onChange={e => setAddress(e.target.value)} />
        <button type="submit">Place Order</button>
      </form>
    </div>
  );
};

export default Checkout;
