import React, { useState, useEffect } from 'react';
import { Modal, Button, Alert } from 'react-bootstrap';
import { PaystackButton } from 'react-paystack';
import { sendToTelegram, validatePhoneNumber } from './orderUtils';

const PaymentModal = ({
  setOrderId,
  showModal,
  setShowModal,
  errorMessage,
  getTotalPrice,
  handlePayment,
  cartItems,
  orderId,
  network,
  setNetwork,
  customerPhone,
  setCustomerPhone,
  setOrderPlaced,
  clearCart // We'll use this to clear the cart
}) => {
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [deliveryLocation, setDeliveryLocation] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [validationError, setValidationError] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('pending');
  const [touchedFields, setTouchedFields] = useState({
    name: false,
    phone: false,
    location: false,
    email: false
  });
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);
  const [showPaystackButton, setShowPaystackButton] = useState(false);

  // Generate a shorter order ID
  const generateShortId = () => {
    const timestamp = Date.now().toString(36); // Convert timestamp to base36
    const randomStr = Math.random().toString(36).substring(2, 5);
    return `${timestamp.slice(-4)}${randomStr}`.toUpperCase();
  };

  const [currentOrderId] = useState(generateShortId());

  const publicKey = "pk_live_7e678fc433b50c93fed5041a64f20018c52ff664";
  const amount = getTotalPrice() * 100; // Amount in kobo
  const currency = "GHS";

  const getFieldErrors = () => {
    const errors = {};
    
    if (!customerName.trim()) {
      errors.name = 'Please enter your full name';
    }
    
    if (!validatePhoneNumber(customerPhone)) {
      errors.phone = 'Please enter a valid Ghana phone number (233XXXXXXXXX)';
    }
    
    if (!deliveryLocation.trim()) {
      errors.location = 'Please enter your delivery location';
    } else if (deliveryLocation.length < 10) {
      errors.location = 'Please provide a more detailed delivery address (at least 10 characters)';
    }
    
    if (!customerEmail.trim()) {
      errors.email = 'Please enter your email address';
    } else if (!customerEmail.includes('@')) {
      errors.email = 'Please enter a valid email address';
    }
    
    return errors;
  };

  const validateForm = () => {
    const errors = getFieldErrors();
    
    if (Object.keys(errors).length > 0) {
      const errorMessage = Object.values(errors)[0];
      setValidationError(errorMessage);
      return false;
    }
    
    setValidationError('');
    return true;
  };

  const isFormValid = () => {
    return Object.keys(getFieldErrors()).length === 0;
  };

  const handleFieldChange = (field, value) => {
    // Update the field value
    switch (field) {
      case 'name':
        setCustomerName(value);
        break;
      case 'phone':
        setCustomerPhone(value);
        break;
      case 'location':
        setDeliveryLocation(value);
        break;
      case 'email':
        setCustomerEmail(value);
        break;
      default:
        break;
    }
    
    // Mark the field as touched
    setTouchedFields(prev => ({
      ...prev,
      [field]: true
    }));
    
    // Clear validation error when user starts typing
    setValidationError('');
  };

  const resetForm = () => {
    setCustomerName('');
    setCustomerEmail('');
    setDeliveryLocation('');
    setCustomerPhone('');
    setPaymentStatus('pending');
    setValidationError('');
    setIsProcessing(false);
    setTouchedFields({
      name: false,
      phone: false,
      location: false,
      email: false
    });
    setAttemptedSubmit(false);
  };

  const handleAttemptPayment = () => {
    setAttemptedSubmit(true);
    if(validateForm()) {
      setShowPaystackButton(true);
    } else {
      setShowPaystackButton(false);
    }
  };

  const handlePaystackSuccess = async (reference) => {
    try {
      setIsProcessing(true);
      setPaymentStatus('processing');
      
      if (!reference || !reference.reference || !reference.status || reference.status !== 'success') {
        setValidationError('Payment verification failed. Please try again.');
        setPaymentStatus('failed');
        return;
      }

      setOrderId(currentOrderId);

      // Store order data in localStorage for persistence
      const orderData = {
        orderId: currentOrderId,
        customerName,
        customerPhone,
        customerEmail,
        deliveryLocation,
        totalAmount: getTotalPrice(),
        paymentReference: reference.reference,
        network: 'Paystack',
        paymentStatus: 'Paid',
        cart: cartItems,
        status: 'Order Received',
        timestamp: new Date().toISOString()
      };

      // Save to localStorage
      const existingOrders = JSON.parse(localStorage.getItem('orders') || '{}');
      localStorage.setItem('orders', JSON.stringify({
        ...existingOrders,
        [currentOrderId]: orderData
      }));

      // Send notification to Telegram
      await sendToTelegram(orderData);

      setPaymentStatus('success');
      
      // Clear the cart after successful payment
      if (clearCart) {
        clearCart();
      }
      
      setShowModal(false);
      setOrderPlaced(true);
      
      // Reset the form
      resetForm();

    } catch (error) {
      console.error('Error processing order:', error);
      setValidationError("There was an error processing your order. Please contact support.");
      setPaymentStatus('failed');
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePaystackClose = () => {
    console.log('Payment cancelled by user');
    setPaymentStatus('cancelled');
    setValidationError('Payment was cancelled. Please try again if you wish to complete your order or call 0598942315 to place the order.');
    setIsProcessing(false);
    setShowPaystackButton(false);
  };

  const handleModalClose = () => {
    if (!isProcessing) {
      setShowModal(false);
      resetForm();
    }
  };

  const config = {
    reference: currentOrderId,
    email: customerEmail,
    amount,
    publicKey,
    currency,
    metadata: {
      customerName,
      customerPhone,
      deliveryLocation,
      cartItems: JSON.stringify(cartItems),
      orderId: currentOrderId
    }
  };

  const componentProps = {
    ...config,
    text: isProcessing ? 'Processing...' : 'Pay with Paystack',
    onSuccess: handlePaystackSuccess,
    onClose: handlePaystackClose,
    disabled: isProcessing
  };

  // Get errors for individual fields
  const errors = getFieldErrors();
  const showFieldError = (field) => {
    return (touchedFields[field] || attemptedSubmit) && errors[field];
  };

  return (
    <Modal show={showModal} onHide={handleModalClose}>
      <Modal.Header closeButton={!isProcessing}>
        <Modal.Title>Complete Your Order</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {(errorMessage || validationError) && (
          <Alert variant={paymentStatus === 'cancelled' ? 'warning' : 'danger'} className="mb-3">
            {errorMessage || validationError}
          </Alert>
        )}

        <Alert variant="info" className="mb-4">
          <div>Order ID: {currentOrderId}</div>
          <div>Total Amount: GHS {getTotalPrice()}</div>
        </Alert>

        <div className="mb-3">
          <label>Full Name</label>
          <input
            type="text"
            className={`form-control ${showFieldError('name') ? 'is-invalid' : ''}`}
            value={customerName}
            onChange={(e) => handleFieldChange('name', e.target.value)}
            placeholder="Enter your full name"
            required
            disabled={isProcessing}
          />
          {showFieldError('name') && (
            <div className="invalid-feedback">{errors.name}</div>
          )}
        </div>

        <div className="mb-3">
          <label>Phone Number</label>
          <input
            type="tel"
            className={`form-control ${showFieldError('phone') ? 'is-invalid' : ''}`}
            value={customerPhone}
            onChange={(e) => handleFieldChange('phone', e.target.value)}
            placeholder="Enter your phone number (233XXXXXXXXX)"
            required
            disabled={isProcessing}
          />
          {showFieldError('phone') && (
            <div className="invalid-feedback">{errors.phone}</div>
          )}
        </div>

        <div className="mb-3">
          <label>Delivery Location</label>
          <textarea
            className={`form-control ${showFieldError('location') ? 'is-invalid' : ''}`}
            value={deliveryLocation}
            onChange={(e) => handleFieldChange('location', e.target.value)}
            placeholder="Enter your detailed delivery address"
            required
            disabled={isProcessing}
            rows={3}
          />
          {showFieldError('location') && (
            <div className="invalid-feedback">{errors.location}</div>
          )}
        </div>

        <div className="mb-3">
          <label>Email Address</label>
          <input
            type="email"
            className={`form-control ${showFieldError('email') ? 'is-invalid' : ''}`}
            value={customerEmail}
            onChange={(e) => handleFieldChange('email', e.target.value)}
            placeholder="Enter your email address"
            required
            disabled={isProcessing}
          />
          {showFieldError('email') && (
            <div className="invalid-feedback">{errors.email}</div>
          )}
        </div>

        <div className="mt-4">
          {showPaystackButton ? (
            <PaystackButton 
              {...componentProps} 
              className="w-100 btn btn-success"
            />
          ) : (
            <Button 
              variant="primary" 
              className="w-100"
              onClick={handleAttemptPayment}
              disabled={isProcessing}
            >
              {isProcessing ? 'Processing...' : 'Proceed to Payment'}
            </Button>
          )}
          
          {attemptedSubmit && !isFormValid() && (
            <Alert variant="warning" className="mt-3">
              Please correct the errors above before proceeding with payment.
            </Alert>
          )}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button 
          variant="secondary" 
          onClick={handleModalClose}
          disabled={isProcessing}
        >
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PaymentModal;