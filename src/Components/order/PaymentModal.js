import React from 'react';
import { Modal, Form, Button, Alert } from 'react-bootstrap';
import { MapPin } from 'lucide-react';

const PaymentModal = ({
  showModal,
  setShowModal,
  errorMessage,
  getTotalPrice,
  BUSINESS_MOMO,
  network,
  setNetwork,
  customerPhone,
  setCustomerPhone,
  validatePhoneNumber,
  transactionId,
  setTransactionId,
  deliveryLocation,
  setDeliveryLocation,
  handlePayment,
  isSubmitting
}) => {
  return (
    <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Complete Your Order</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {errorMessage && (
          <Alert variant="danger" className="mb-3">
            {errorMessage}
          </Alert>
        )}
        
        <Alert variant="info" className="mb-4">
          Please send GHS {getTotalPrice()} to our MoMo number: {BUSINESS_MOMO} (360 Taste) before confirming order
        </Alert>

        <Form onSubmit={handlePayment}>
          <Form.Group className="mb-3">
            <Form.Label>Select Network</Form.Label>
            <Form.Select 
              value={network}
              onChange={(e) => setNetwork(e.target.value)}
              required
            >
              <option value="mtn">MTN Mobile Money</option>
              <option value="vodafone">Vodafone Cash</option>
              <option value="airteltigo">AirtelTigo Money</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Your Phone Number</Form.Label>
            <Form.Control
              type="tel"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              placeholder="233XXXXXXXXX"
              required
              isInvalid={customerPhone && !validatePhoneNumber(customerPhone)}
            />
            <Form.Control.Feedback type="invalid">
              Please enter a valid Ghana phone number (233XXXXXXXXX)
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Transaction ID</Form.Label>
            <Form.Control
              type="text"
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
              placeholder="Enter last 5 digits of transaction ID"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>
              <MapPin size={18} className="me-1" />
              Delivery Location
            </Form.Label>
            <Form.Control
              type="text"
              value={deliveryLocation}
              onChange={(e) => setDeliveryLocation(e.target.value)}
              placeholder="Enter a nearby landmark or location"
              required
            />
            <Form.Text className="text-muted">
              Please provide a well-known landmark or location for accurate delivery
            </Form.Text>
          </Form.Group>

          <Button 
            variant="success" 
            type="submit" 
            className="w-100"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Processing...' : 'Confirm Order'}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default PaymentModal;