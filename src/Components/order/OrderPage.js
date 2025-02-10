import React, { useEffect } from 'react';
import { Container, Row, Col, Alert, Badge } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

// Components
import CategorySection from './CategorySection';
import MenuItemsSection from './MenuItemsSection';
import CartSection from './CartSection';
import PaymentModal from './PaymentModal';

// Hooks
import { useOrderState } from './useOrderState';
import { useOrderHandlers } from './useOrderHandler';

// Data
import { categories, menuItems } from './menuData';

// Constants
import { BUSINESS_MOMO , validatePhoneNumber } from './orderUtils';

// Styles
import './OrderPage.css';

const OrderPage = () => {
const { categoryId } = useParams();
  const orderState = useOrderState(categoryId);
  const { handlePayment, handleAddToCart, handleRemoveFromCart, calculateTotal } = useOrderHandlers(orderState);

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

  const filteredMenuItems = menuItems.filter(item =>
    (item.category === selectedCategory) &&
    (item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getOrderStatus = () => {
    const orders = JSON.parse(localStorage.getItem('orders')) || {};
    return orders[orderId]?.status || 'Pending';
  };

  return (
    <Container className="py-5">
      <h1 className="text-center mb-5">Order Your Favorite Dishes</h1>
{orderPlaced && (
  <Alert variant="success" onClose={() => setOrderPlaced(false)} dismissible>
    Your order has been placed successfully! Delivery Will Arrive Shortly
    <div className="mt-2">
      <a href={`/order-status/${orderId}`} target="_blank" rel="noopener noreferrer">
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
        validatePhoneNumber={validatePhoneNumber}
        transactionId={transactionId}
        setTransactionId={setTransactionId}
        deliveryLocation={deliveryLocation}
        setDeliveryLocation={setDeliveryLocation}
        handlePayment={handlePayment}
        isSubmitting={isSubmitting}
      />
<div className="text-center mt-3">
  <Badge variant="info">Order Status: {getOrderStatus()}</Badge>
  <div className="mt-2">
    <a href={`/order-status/${orderId}`} target="_blank" rel="noopener noreferrer">
      Track Your Order
    </a>
  </div>
</div>
    </Container>
  );
};

export default OrderPage;
