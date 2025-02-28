import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Alert, Badge, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

// Components
import CategorySection from './CategorySection';
import MenuItemsSection from './MenuItemsSection';
import CartSection from './CartSection';
import PaymentModal from './PaymentModal';
import FloatingCartButton from './FloatingCartButton';
import BackToTopButton from './BackToTopButton'; // Import the new component

// Hooks
import { useOrderState } from './useOrderState';
import { useOrderHandlers } from './useOrderHandler';
import { v4 as uuidv4 } from 'uuid';

// Data
import { categories, menuItems } from './menuData';

// Styles
import './OrderPage.css';

// Constants
const BUSINESS_MOMO = "0598942315"; // Replace with your actual business mobile money number

const OrderPage = () => {
  const generateOrderId = () => uuidv4();
  const { categoryId } = useParams();
  const orderState = useOrderState(categoryId);
  const { handlePayment, handleAddToCart, handleRemoveFromCart, calculateTotal } = useOrderHandlers(orderState);
  const [currentStatus, setCurrentStatus] = useState('Pending');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);

  const {
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
    handleCategoryChange,
    setSearchTerm,
    setOrderPlaced,
    setShowModal,
    setCustomerPhone,
    setNetwork,
    setTransactionId,
    setDeliveryLocation,
    orderId,
    setOrderId,
    clearCart // Get clearCart from orderState
  } = orderState;

  useEffect(() => {
    if (categoryId) {
      handleCategoryChange(parseInt(categoryId));
    }
  }, [categoryId, handleCategoryChange]);

  useEffect(() => {
    if (orderPlaced) {
      setShowThankYou(true);
    }
  }, [orderPlaced]);

  const handleDismissThankYou = () => {
    setShowThankYou(false);
    setOrderPlaced(false);
  };

  const filteredMenuItems = menuItems.filter(item =>
    (item.category === selectedCategory) &&
    (item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const trackOrderLink = () => {
    return orderId ? `/order-status/${orderId}` : '#';
  };

  return (
    <Container className="py-5">
      <h1 className="text-center mb-5">Order Your Favorite Dishes</h1>
      
      {showThankYou && (
        <Alert variant="success" className="text-center mb-4" onClose={handleDismissThankYou} dismissible>
          <h4 className="alert-heading">Thank You for Your Order!</h4>
          <p>We appreciate your business. Your order has been received and is being processed.</p>
          <p className="mb-0">Order ID: {orderId}</p>
          <hr />
          <p className="mb-0">
            You can track your order status using the ID above. We'll start preparing your delicious meal right away!
          </p>
        </Alert>
      )}

      <Row>
        <Col md={3}>
          <CategorySection
            categories={categories}
            selectedCategory={selectedCategory}
            handleCategoryChange={handleCategoryChange}
          />
        </Col>

        <Col md={6}>
          <MenuItemsSection
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            filteredMenuItems={filteredMenuItems}
            addToCart={handleAddToCart}
          />
        </Col>

        <Col md={3}>
          <CartSection
            cart={cart}
            addToCart={handleAddToCart}
            removeFromCart={handleRemoveFromCart}
            getTotalPrice={calculateTotal}
            setShowModal={setShowModal}
          />
        </Col>
      </Row>

      <PaymentModal
        showModal={showModal}
        setShowModal={setShowModal}
        errorMessage={errorMessage}
        getTotalPrice={calculateTotal}
        BUSINESS_MOMO={BUSINESS_MOMO}
        network={network}
        setNetwork={setNetwork}
        customerPhone={customerPhone}
        setCustomerPhone={setCustomerPhone}
        handlePayment={handlePayment}
        isSubmitting={isSubmitting}
        cartItems={cart}
        orderId={orderId}
        setOrderId={setOrderId}
        setOrderPlaced={setOrderPlaced}
        clearCart={clearCart} // Pass the clearCart function to the PaymentModal
      />

      {/* Add the floating cart button component */}
      <FloatingCartButton 
        cart={cart} 
        totalPrice={calculateTotal()}
      />
      
      {/* Add the back to top button */}
      <BackToTopButton />
    </Container>
  );
};

export default OrderPage;