// src/components/Navbar.js
import React, { useContext } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import './Navbar.css';

const Navbar = () => {
  const { cart } = useContext(CartContext);
  const location = useLocation();

  const generateBreadcrumb = () => {
    const pathnames = location.pathname.split('/').filter((x) => x);
    return (
      <nav className="breadcrumb">
        <NavLink to="/">Home</NavLink>
        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;
          return isLast ? (
            <span key={routeTo}> / {name}</span>
          ) : (
            <NavLink key={routeTo} to={routeTo}> / {name}</NavLink>
          );
        })}
      </nav>
    );
  };

  return (
    <header className="navbar">
      <div className="navbar-links">
        <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>🏠 Home</NavLink>
        <NavLink to="/wishlist" className={({ isActive }) => isActive ? 'active' : ''}>❤️ Wishlist</NavLink>
        <NavLink to="/cart" className={({ isActive }) => isActive ? 'active' : ''}>🛒 Cart ({cart.length})</NavLink>
      </div>
      {generateBreadcrumb()}
    </header>
  );
};

export default Navbar;