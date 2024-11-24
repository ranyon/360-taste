import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

// Storage keys as constants
const STORAGE_KEYS = {
  ORDER_ATTEMPTS: 'orderAttempts',
  LAST_ORDER_TIME: 'lastOrderTime',
  BLOCKED_NUMBERS: 'blockedNumbers',
  ORDER_HISTORY: 'orderHistory'
};

// Move storage helpers outside component to prevent recreating on each render
const getStoredValue = (key, defaultValue) => {
  try {
    const item = window.localStorage.getItem(key);
    if (!item) return defaultValue;
    
    const parsed = JSON.parse(item);
    
    switch(key) {
      case STORAGE_KEYS.BLOCKED_NUMBERS:
        return new Set(parsed);
      case STORAGE_KEYS.LAST_ORDER_TIME:
        return parsed ? new Date(parsed) : null;
      default:
        return parsed;
    }
  } catch {
    return defaultValue;
  }
};

const setStoredValue = (key, value) => {
  try {
    const valueToStore = value instanceof Set ? [...value] :
                        value instanceof Date ? value.toISOString() :
                        value;
    localStorage.setItem(key, JSON.stringify(valueToStore));
  } catch (error) {
    console.error(`Storage error for ${key}:`, error);
  }
};

export const useOrderState = (initialCategoryId) => {
  const navigate = useNavigate();

  // Basic non-persistent state
  const [selectedCategory, setSelectedCategory] = useState(initialCategoryId || 1);
  const [cart, setCart] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [customerPhone, setCustomerPhone] = useState('');
  const [network, setNetwork] = useState('mtn');
  const [transactionId, setTransactionId] = useState('');
  const [deliveryLocation, setDeliveryLocation] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Initialize persistent state with stored values
  const [orderAttempts, setOrderAttempts] = useState(() => 
    getStoredValue(STORAGE_KEYS.ORDER_ATTEMPTS, 0)
  );
  
  const [lastOrderTime, setLastOrderTime] = useState(() => 
    getStoredValue(STORAGE_KEYS.LAST_ORDER_TIME, null)
  );
  
  const [blockedNumbers, setBlockedNumbers] = useState(() => 
    getStoredValue(STORAGE_KEYS.BLOCKED_NUMBERS, new Set())
  );
  
  const [orderHistory, setOrderHistory] = useState(() => 
    getStoredValue(STORAGE_KEYS.ORDER_HISTORY, {})
  );

  // Memoized update functions to prevent recreation on each render
  const updateOrderAttempts = useCallback((value) => {
    const newValue = typeof value === 'function' ? value(orderAttempts) : value;
    setOrderAttempts(newValue);
    setStoredValue(STORAGE_KEYS.ORDER_ATTEMPTS, newValue);
  }, [orderAttempts]);

  const updateLastOrderTime = useCallback((value) => {
    const newValue = typeof value === 'function' ? value(lastOrderTime) : value;
    setLastOrderTime(newValue);
    setStoredValue(STORAGE_KEYS.LAST_ORDER_TIME, newValue);
  }, [lastOrderTime]);

  const updateBlockedNumbers = useCallback((value) => {
    const newValue = typeof value === 'function' ? value(blockedNumbers) : value;
    setBlockedNumbers(newValue);
    setStoredValue(STORAGE_KEYS.BLOCKED_NUMBERS, newValue);
  }, [blockedNumbers]);

  const updateOrderHistory = useCallback((value) => {
    const newValue = typeof value === 'function' ? value(orderHistory) : value;
    setOrderHistory(newValue);
    setStoredValue(STORAGE_KEYS.ORDER_HISTORY, newValue);
  }, [orderHistory]);

  // Cleanup effect with stable dependencies
  useEffect(() => {
    const cleanupInterval = setInterval(() => {
      const now = new Date();
      const ONE_DAY = 24 * 60 * 60 * 1000;
      const TWO_HOURS = 2 * 60 * 60 * 1000;

      // Clean up old history entries
      const currentHistory = getStoredValue(STORAGE_KEYS.ORDER_HISTORY, {});
      const updatedHistory = Object.fromEntries(
        Object.entries(currentHistory).filter(([_, data]) => 
          now - new Date(data.lastOrder) <= ONE_DAY
        )
      );

      if (Object.keys(updatedHistory).length !== Object.keys(currentHistory).length) {
        updateOrderHistory(updatedHistory);
      }

      // Reset attempts if enough time has passed
      const lastAttemptTime = getStoredValue(STORAGE_KEYS.LAST_ORDER_TIME, null);
      if (lastAttemptTime && now - new Date(lastAttemptTime) > TWO_HOURS) {
        updateOrderAttempts(0);
        updateLastOrderTime(null);
      }
    }, 60 * 60 * 1000); // Run every hour

    return () => clearInterval(cleanupInterval);
  }, [updateOrderHistory, updateOrderAttempts, updateLastOrderTime]);

  // Navigation handler
  const handleCategoryChange = useCallback((categoryId) => {
    setSelectedCategory(categoryId);
    navigate(`/order/${categoryId}`);
  }, [navigate]);

  // Reset functions
  const resetOrderState = useCallback(() => {
    setCart([]);
    setShowModal(false);
    setTransactionId('');
    setCustomerPhone('');
    setDeliveryLocation('');
    updateOrderAttempts(0);
    setErrorMessage('');
  }, [updateOrderAttempts]);

  const clearPersistentData = useCallback(() => {
    Object.values(STORAGE_KEYS).forEach(key => localStorage.removeItem(key));
    updateOrderAttempts(0);
    updateLastOrderTime(null);
    updateBlockedNumbers(new Set());
    updateOrderHistory({});
  }, [updateOrderAttempts, updateLastOrderTime, updateBlockedNumbers, updateOrderHistory]);

  return {
    // States
    selectedCategory,
    cart,
    showModal,
    orderPlaced,
    searchTerm,
    isSubmitting,
    customerPhone,
    network,
    transactionId,
    deliveryLocation,
    errorMessage,
    orderAttempts,
    lastOrderTime,
    blockedNumbers,
    orderHistory,

    // Basic setters
    setSelectedCategory,
    setCart,
    setShowModal,
    setOrderPlaced,
    setSearchTerm,
    setIsSubmitting,
    setCustomerPhone,
    setNetwork,
    setTransactionId,
    setDeliveryLocation,
    setErrorMessage,

    // Persistent state updaters
    setOrderAttempts: updateOrderAttempts,
    setLastOrderTime: updateLastOrderTime,
    setBlockedNumbers: updateBlockedNumbers,
    setOrderHistory: updateOrderHistory,

    // Actions
    handleCategoryChange,
    resetOrderState,
    clearPersistentData,
  };
};