import { useCallback } from 'react';
import { 
  validatePhoneNumber, 
  validateTransactionId, 
  validateDeliveryLocation,
  checkSpamming,
  updateCart,
  sendToTelegram
} from './orderUtils';

export const useOrderHandlers = (orderState) => {
  const {
    cart,
    customerPhone,
    network,
    transactionId,
    deliveryLocation,
    orderHistory,
    blockedNumbers,
    lastOrderTime,
    orderAttempts,
    setCart,
    setLastOrderTime,
    setBlockedNumbers,
    setOrderAttempts,
    setOrderHistory,
    setOrderPlaced,
    setErrorMessage,
    setIsSubmitting,
    resetOrderState
  } = orderState;

  const handlePayment = useCallback(async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      // Validation checks
      if (!validatePhoneNumber(customerPhone)) {
        throw new Error('Please enter a valid Ghana phone number (233XXXXXXXXX)');
      }

      if (!validateTransactionId(transactionId)) {
        throw new Error('Please enter a valid 5-digit transaction ID');
      }

      if (!validateDeliveryLocation(deliveryLocation)) {
        throw new Error('Please provide a detailed delivery location (minimum 10 characters)');
      }

      // Block checks
      if (blockedNumbers.has(customerPhone)) {
        throw new Error('This phone number has been blocked due to suspicious activity. Please contact support.');
      }

      // Spam checks
      if (checkSpamming(orderHistory, customerPhone)) {
        setBlockedNumbers(prev => new Set(prev).add(customerPhone));
        throw new Error('Too many orders in 24 hours. This number has been temporarily blocked.');
      }

      // Cooldown period check
      if (lastOrderTime) {
        const minutesSinceLastOrder = (new Date() - new Date(lastOrderTime)) / (1000 * 60);
        if (minutesSinceLastOrder < 5) {
          throw new Error('Please wait 5 minutes between orders');
        }
      }

      // Attempt limiting
      const newAttempts = orderAttempts + 1;
      setOrderAttempts(newAttempts);

      if (newAttempts > 5) {
        const waitTime = Math.min(Math.pow(2, newAttempts - 5) * 15, 120);
        throw new Error(`Too many attempts. Please wait ${waitTime} minutes before trying again.`);
      }

      // Process order
      const now = new Date();
      await sendToTelegram({
        cart,
        customerPhone,
        totalAmount: updateCart.calculateTotal(cart),
        transactionId,
        network,
        deliveryLocation
      });

      // Update order history
      setOrderHistory(prev => ({
        ...prev,
        [customerPhone]: {
          count: (prev[customerPhone]?.count || 0) + 1,
          lastOrder: now
        }
      }));

      setLastOrderTime(now);
      setOrderPlaced(true);
      resetOrderState();

    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsSubmitting(false);
    }
  }, [
    cart,
    customerPhone,
    network,
    transactionId,
    deliveryLocation,
    orderHistory,
    blockedNumbers,
    lastOrderTime,
    orderAttempts
  ]);

  const handleAddToCart = useCallback((item) => {
    setCart(updateCart.addItem(cart, item));
  }, [cart]);

  const handleRemoveFromCart = useCallback((item) => {
    setCart(updateCart.removeItem(cart, item));
  }, [cart]);

  return {
    handlePayment,
    handleAddToCart,
    handleRemoveFromCart,
    calculateTotal: () => updateCart.calculateTotal(cart)
  };
};