import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Alert, Badge, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

// Components
import CategorySection from './CategorySection';
import MenuItemsSection from './MenuItemsSection';
import CartSection from './CartSection';
import PaymentModal from './PaymentModal';

// Hooks
import { useOrderState } from './useOrderState';
import { useOrderHandlers } from './useOrderHandler';
import { getOrderStatus } from './orderUtils';

// Data
import { categories, menuItems } from './menuData';

// Styles
import './OrderPage.css';

// Constants
const BUSINESS_MOMO = "0598942315"; // Replace with your actual business mobile money number

const OrderPage = () => {
  const { categoryId } = useParams();
  const orderState = useOrderState(categoryId);
  const { handlePayment, handleAddToCart, handleRemoveFromCart, calculateTotal } = useOrderHandlers(orderState);
  const [currentStatus, setCurrentStatus] = useState('Pending');
  const [isRefreshing, setIsRefreshing] = useState(false);

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
  } = orderState;

  useEffect(() => {
    if (categoryId) {
      handleCategoryChange(parseInt(categoryId));
    }
  }, [categoryId, handleCategoryChange]);

  useEffect(() => {
    if (orderId) {
      refreshOrderStatus();
    }
  }, [orderId]);

  const refreshOrderStatus = async () => {
    if (!orderId) return;
    
    try {
      setIsRefreshing(true);
      const status = await getOrderStatus(orderId);
      setCurrentStatus(status || 'Pending');
    } catch (err) {
      console.error('Error refreshing status:', err);
    } finally {
      setIsRefreshing(false);
    }
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
      {orderPlaced && (
        <Alert variant="success" onClose={() => setOrderPlaced(false)} dismissible>
          Your order has been placed successfully! Delivery Will Arrive Shortly
          <div className="mt-2">
            <a href={trackOrderLink()} target="_blank" rel="noopener noreferrer">
              Track Your Order
            </a>
          </div>
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
        // Note: validatePhoneNumber is imported directly in PaymentModal.js
        // Note: deliveryLocation and setDeliveryLocation are handled internally in PaymentModal
      />
      
      {orderId && (
        <div className="text-center mt-4 p-3 border rounded">
          <h4>Current Order</h4>
          <Badge variant="info" className="p-2 mb-2">Order Status: {currentStatus}</Badge>
          <div className="d-flex justify-content-center mt-2">
            <Button 
              variant="outline-secondary" 
              size="sm" 
              onClick={refreshOrderStatus}
              disabled={isRefreshing}
              className="me-2"
            >
              {isRefreshing ? 'Refreshing...' : 'Refresh Status'}
            </Button>
            <a href={trackOrderLink()} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-primary btn-sm"
            >
              Track Order Details
            </a>
          </div>
        </div>
      )}
    </Container>
  );
};

export default OrderPage;