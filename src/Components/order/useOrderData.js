// useOrderData.js

import { useState, useEffect } from 'react';

export const useOrderData = (orderId) => {
  const [order, setOrder] = useState(null);
  const [status, setStatus] = useState('Loading...');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!orderId) {
      setLoading(false);
      setError('No order ID provided');
      return;
    }

    const fetchOrderData = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log('Fetching order data for:', orderId);

        // Simulate fetching order data
        const orderData = {
          id: orderId,
          status: 'Order Received',
          items: [],
          total: 0,
        };

        console.log('Order data received:', orderData);

        setOrder(orderData);
        setStatus(orderData.status);
      } catch (err) {
        console.error('Error fetching order:', err);
        setError(err.message || 'Failed to load order details. Please try again later.');

        // Try to at least get the status from localStorage as fallback
        try {
          const orders = JSON.parse(localStorage.getItem('orders')) || {};
          if (orders[orderId]) {
            const fallbackStatus = orders[orderId].status || 'Unknown';
            console.log('Using fallback status from localStorage:', fallbackStatus);
            setStatus(fallbackStatus);
          }
        } catch (localStorageError) {
          console.error('Error reading from localStorage:', localStorageError);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchOrderData();
  }, [orderId]);

  const refreshStatus = async () => {
    if (!orderId) return;

    try {
      console.log('Refreshing status for order:', orderId);
      // Simulate refreshing order status
      const newStatus = 'Order Received';
      console.log('New status received:', newStatus);
      setStatus(newStatus);
    } catch (err) {
      console.error('Error refreshing order status:', err);
      setError('Failed to refresh order status. Please try again later.');
    }
  };

  return { order, status, loading, error, refreshStatus };
};
