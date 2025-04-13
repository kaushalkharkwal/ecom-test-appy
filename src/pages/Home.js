// src/pages/Home.js
import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [category, setCategory] = useState('all');
  const [search, setSearch] = useState('');
  const [sortOrder, setSortOrder] = useState('default');
  const [minRating, setMinRating] = useState(0);
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('wishlist');
    return saved ? JSON.parse(saved) : [];
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setFilteredProducts(data);
      });
  }, []);

  useEffect(() => {
    let temp = [...products];
    if (category !== 'all') {
      temp = temp.filter(p => p.category === category);
    }
    if (search.trim()) {
      temp = temp.filter(p => p.title.toLowerCase().includes(search.toLowerCase()));
    }
    if (minRating > 0) {
      temp = temp.filter(p => p.rating?.rate >= minRating);
    }
    if (sortOrder === 'asc') {
      temp.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'desc') {
      temp.sort((a, b) => b.price - a.price);
    }
    setFilteredProducts(temp);
    setCurrentPage(1);
  }, [category, search, sortOrder, minRating, products]);

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const toggleWishlist = (id) => {
    setWishlist(prev => prev.includes(id) ? prev.filter(w => w !== id) : [...prev, id]);
  };

  const categories = ['all', ...new Set(products.map(p => p.category))];
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  return (
    <div style={{ padding: '20px' }}>
      <h2>All Products</h2>

      {/* Filter Bar */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '20px', alignItems: 'center' }}>
        <select value={category} onChange={e => setCategory(e.target.value)}>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        <select value={sortOrder} onChange={e => setSortOrder(e.target.value)}>
          <option value="default">Sort by</option>
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
        </select>

        <select value={minRating} onChange={e => setMinRating(Number(e.target.value))}>
          <option value={0}>Rating: All</option>
          <option value={4}>4★ & up</option>
          <option value={3}>3★ & up</option>
        </select>

        <Link to="/wishlist" style={{ marginLeft: 'auto' }}>View Wishlist ❤️</Link>
      </div>

      {/* Product Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
        {currentItems.map(product => (
          <div key={product.id} style={{ border: '1px solid #ccc', padding: '10px', position: 'relative' }}>
            <span
              onClick={() => toggleWishlist(product.id)}
              title={wishlist.includes(product.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                cursor: 'pointer',
                fontSize: '20px',
                transition: 'transform 0.2s ease',
                color: wishlist.includes(product.id) ? 'red' : '#ccc'
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.3)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              ❤️
            </span>
            <h4>{product.title}</h4>
            <img src={product.image} alt={product.title} style={{ width: '100px', height: '100px', objectFit: 'contain' }} />
            <p><strong>${product.price}</strong></p>
            <p>⭐ {product.rating?.rate} / 5</p>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
            <br />
            <Link to={`/product/${product.id}`}>View Details</Link>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', gap: '10px' }}>
        <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
          Prev
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;
