import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useOrderState } from './useOrderState';
import { useOrderHandlers } from './useOrderHandler';
import { useNavigate } from 'react-router-dom';
import PaymentModal from './PaymentModal';
import { BUSINESS_MOMO, validatePhoneNumber } from './orderUtils';

const CartPage = () => {
  const orderState = useOrderState();
  const { handlePayment, handleAddToCart, handleRemoveFromCart, calculateTotal } = useOrderHandlers(orderState);
  const navigate = useNavigate();

  const {
    cart,
    showModal,
    customerPhone,
    network,
    transactionId,
    deliveryLocation,
    errorMessage,
    isSubmitting,
    setShowModal,
    setCustomerPhone,
    setNetwork,
    setTransactionId,
    setDeliveryLocation,
  } = orderState;

  return (
    <Container className="py-5">
      <h1 className="text-center mb-5">Your Cart</h1>
      <Row>
        <Col md={8}>
          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <div>
              {cart.map((item, index) => (
                <div key={index} className="d-flex justify-content-between align-items-center mb-3">
                  <div>
                    <h6 className="mb-1">{item.name}</h6>
                    <small className="text-muted">Quantity: {item.quantity}</small>
                  </div>
                  <h6 className="mb-0">₵{(item.price * item.quantity).toFixed(2)}</h6>
                  <Button variant="danger" size="sm" onClick={() => handleRemoveFromCart(item)}>
                    Remove
                  </Button>
                </div>
              ))}
              <div className="border-top mt-3 pt-3">
                <div className="d-flex justify-content-between align-items-center">
                  <h6 className="mb-0">Total</h6>
                  <h6 className="mb-0">₵{calculateTotal().toFixed(2)}</h6>
                </div>
              </div>
            </div>
          )}
        </Col>
        <Col md={4}>
          <Button variant="primary" onClick={() => navigate('/order')}>
            Continue Shopping
          </Button>
          <Button variant="success" onClick={() => setShowModal(true)} disabled={cart.length === 0}>
            Checkout
          </Button>
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
    </Container>
  );
};

export default CartPage;
