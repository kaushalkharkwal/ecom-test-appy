// src/components/Navbar.js
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const Navbar = () => {
  const { cart } = useContext(CartContext);

  return (
    <nav style={{ padding: '10px', background: '#eee' }}>
      <Link to="/">Home</Link> |{' '}
      <Link to="/cart">Cart ({cart.length})</Link>
    </nav>
  );
};

export default Navbar;