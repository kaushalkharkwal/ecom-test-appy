// src/pages/Home.js
import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import Pagination from '../components/Pagination';

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
      <div className="product-grid">
        {currentItems.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={addToCart}
            onToggleWishlist={toggleWishlist}
            isWishlisted={wishlist.includes(product.id)}
          />
        ))}
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default Home;