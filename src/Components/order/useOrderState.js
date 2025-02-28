// useOrderState.js

import { useState } from 'react';

export const useOrderState = (initialCategory = 1) => {
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchTerm, setSearchTerm] = useState('');
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [cart, setCart] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [customerPhone, setCustomerPhone] = useState('');
  const [network, setNetwork] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [deliveryLocation, setDeliveryLocation] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderId, setOrderId] = useState(null);

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    setSearchTerm('');
  };

  const clearCart = () => {
    setCart([]);
  };

  const addToCart = (item) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (item) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
      if (existingItem.quantity === 1) {
        return prevCart.filter(cartItem => cartItem.id !== item.id);
      }
      return prevCart.map(cartItem =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity - 1 }
          : cartItem
      );
    });
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const resetOrderState = () => {
    setOrderPlaced(false);
    setCart([]);
    setShowModal(false);
    setCustomerPhone('');
    setNetwork('');
    setTransactionId('');
    setDeliveryLocation('');
    setErrorMessage('');
    setIsSubmitting(false);
    setOrderId(null);
  };

  return {
    // State
    selectedCategory,
    searchTerm,
    orderPlaced,
    cart,
    showModal,
    customerPhone,
    network,
    transactionId,
    deliveryLocation,
    errorMessage,
    isSubmitting,
    orderId,

    // Setters
    setSelectedCategory,
    setSearchTerm,
    setOrderPlaced,
    setCart,
    setShowModal,
    setCustomerPhone,
    setNetwork,
    setTransactionId,
    setDeliveryLocation,
    setErrorMessage,
    setIsSubmitting,
    setOrderId,

    // Handlers
    handleCategoryChange,
    clearCart,
    addToCart,
    removeFromCart,
    calculateTotal,
    resetOrderState
  };
};

export default useOrderState;