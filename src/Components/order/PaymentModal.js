import React, { useState } from 'react';
import { Modal, Button, Alert } from 'react-bootstrap';
import { PaystackButton } from 'react-paystack';
import { sendToTelegram, validatePhoneNumber, updateOrder } from './orderUtils';

const PaymentModal = ({
  showModal,
  setShowModal,
  errorMessage,
  getTotalPrice,
  handlePayment,
  cartItems,
  orderId,
  BUSINESS_MOMO,
  network,
  setNetwork,
  customerPhone,
  setCustomerPhone,
}) => {
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [deliveryLocation, setDeliveryLocation] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [validationError, setValidationError] = useState('');

  const publicKey = "pk_test_09fb34c6079b2a0a158d3a377d8b43bdbfaa2026";
  const amount = getTotalPrice() * 100; // Amount in kobo
  const currency = "GHS";

  const validateForm = () => {
    if (!customerName.trim()) {
      setValidationError('Please enter your name');
      return false;
    }
    if (!validatePhoneNumber(customerPhone)) {
      setValidationError('Please enter a valid Ghana phone number (233XXXXXXXXX)');
      return false;
    }
    if (!deliveryLocation.trim() || deliveryLocation.length < 10) {
      setValidationError('Please enter a detailed delivery location (minimum 10 characters)');
      return false;
    }
    if (!customerEmail.trim() || !customerEmail.includes('@')) {
      setValidationError('Please enter a valid email address');
      return false;
    }
    setValidationError('');
    return true;
  };

  const canShowPaystackButton = () => {
    return customerName.trim() && 
           validatePhoneNumber(customerPhone) && 
           deliveryLocation.trim().length >= 10 && 
           customerEmail.trim().includes('@');
  };

  const handlePaystackSuccess = async (reference) => {
    if (!validateForm()) {
      return;
    }

    try {
      setIsProcessing(true);
      
      // Prepare order data for database and notification
      const orderData = {
        customerName,
        customerPhone,
        customerEmail,
        deliveryLocation,
        totalAmount: getTotalPrice(),
        transactionId: reference.reference,
        network: 'Paystack',
        paymentStatus: 'Paid',
        cart: cartItems,
        status: 'Order Received'
      };

      // Update the order in Supabase with customer details
      if (orderId) {
        await updateOrder(orderId, orderData);
      }

      // Send notification to Telegram
      await sendToTelegram({
        ...orderData,
        orderId
      });

      // Call the original handlePayment function
      await handlePayment({ preventDefault: () => {} });
      
      // Show success message and redirect
      alert(`Thank you for your order! Your order ID is ${orderId}. You can track your order status anytime using this ID.`);
      window.location.href = `/order-status/${orderId}`;
      
    } catch (error) {
      console.error('Error processing order:', error);
      alert("Payment successful, but there was an error processing your order. Please contact support.");
    } finally {
      setIsProcessing(false);
      setShowModal(false);
    }
  };

  const handlePaystackClose = () => {
    console.log('Payment cancelled');
  };

  const config = {
    reference: `ORDER-${orderId || 'NEW'}-${Date.now()}`,
    email: customerEmail,
    amount,
    publicKey,
    currency,
  };

  const componentProps = {
    ...config,
    text: isProcessing ? 'Processing...' : 'Pay with Paystack',
    onSuccess: handlePaystackSuccess,
    onClose: handlePaystackClose,
    disabled: isProcessing || !canShowPaystackButton()
  };

  return (
    <Modal show={showModal} onHide={() => !isProcessing && setShowModal(false)}>
      <Modal.Header closeButton={!isProcessing}>
        <Modal.Title>Complete Your Order</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {(errorMessage || validationError) && (
          <Alert variant="danger" className="mb-3">
            {errorMessage || validationError}
          </Alert>
        )}

        <Alert variant="info" className="mb-4">
          Please fill in your details to complete your order.
          Total Amount: GHS {getTotalPrice()}
        </Alert>

        <div className="mb-3">
          <label>Full Name</label>
          <input
            type="text"
            className="form-control"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            placeholder="Enter your full name"
            required
            disabled={isProcessing}
          />
        </div>

        <div className="mb-3">
          <label>Phone Number</label>
          <input
            type="tel"
            className="form-control"
            value={customerPhone}
            onChange={(e) => setCustomerPhone(e.target.value)}
            placeholder="Enter your phone number (233XXXXXXXXX)"
            required
            disabled={isProcessing}
          />
        </div>

        <div className="mb-3">
          <label>Delivery Location</label>
          <textarea
            className="form-control"
            value={deliveryLocation}
            onChange={(e) => setDeliveryLocation(e.target.value)}
            placeholder="Enter your detailed delivery address"
            required
            disabled={isProcessing}
            rows={3}
          />
        </div>

        <div className="mb-3">
          <label>Email Address</label>
          <input
            type="email"
            className="form-control"
            value={customerEmail}
            onChange={(e) => setCustomerEmail(e.target.value)}
            placeholder="Enter your email address"
            required
            disabled={isProcessing}
          />
        </div>

        {!canShowPaystackButton() && (
          <Alert variant="warning">
            Please fill in all required fields correctly to proceed with payment.
          </Alert>
        )}

        {canShowPaystackButton() && (
          <PaystackButton {...componentProps} className="w-100 btn btn-primary" />
        )}
      </Modal.Body>
    </Modal>
  );
};

export default PaymentModal;