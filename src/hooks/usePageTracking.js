// src/hooks/usePageTracking.js
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const usePageTracking = () => {
  const location = useLocation();

  useEffect(() => {
    const page_path = location.pathname + location.search;

    // Debug logging
    console.log(`📍 Tracking pageview: ${page_path}`);

    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'pageview',
        page_path,
      });
    }
  }, [location]);
};

export default usePageTracking;
