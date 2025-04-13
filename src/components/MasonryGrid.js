// src/components/MasonryGrid.js
import React from 'react';
import Masonry from 'react-masonry-css';
import './MasonryGrid.css';

const breakpointColumnsObj = {
  default: 3,
  1100: 2,
  768: 1,
};

const MasonryGrid = ({ children }) => (
  <Masonry
    breakpointCols={breakpointColumnsObj}
    className="masonry-grid"
    columnClassName="masonry-grid_column"
  >
    {children}
  </Masonry>
);

export default MasonryGrid;
