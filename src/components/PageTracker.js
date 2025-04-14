// src/components/PageTracker.js
import React from 'react';
import usePageTracking from '../hooks/usePageTracking';

const PageTracker = () => {
  usePageTracking();
  return null; // no UI, just tracking
};

export default PageTracker;
