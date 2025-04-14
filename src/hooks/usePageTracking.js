import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const usePageTracking = () => {
  const location = useLocation();

  useEffect(() => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'routeChange',
      page_path: location.pathname,
      page_location: window.location.href
    });
    console.log('📦 routeChange:', location.pathname);
  }, [location]);
};

export default usePageTracking;
