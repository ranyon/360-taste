import React, { useState, useEffect } from 'react';
import { Container, Card, Row, Col, Alert } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { Clock, ChefHat, Clipboard, CheckCircle } from 'lucide-react';

const OrderStatusPage = () => {
  const { orderId } = useParams();
  const [status, setStatus] = useState('Order Received');
  const [message, setMessage] = useState('');
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = () => {
      const orders = JSON.parse(localStorage.getItem('orders')) || {};
      if (orders[orderId]) {
        setStatus(orders[orderId].status);
        setOrderDetails(orders[orderId]);
      } else {
        setMessage('Order ID not found.');
      }
    };

    fetchOrderDetails();
    const interval = setInterval(fetchOrderDetails, 1000);
    return () => clearInterval(interval);
  }, [orderId]);

  const steps = [
    { id: 1, title: 'Order Received', subtitle: 'Order received', icon: Clock, color: '#4285f4' },
    { id: 2, title: 'Preparing', subtitle: 'Being prepared', icon: ChefHat, color: 'grey' },
    { id: 3, title: 'Ready', subtitle: 'Ready for pickup', icon: Clipboard, color: 'grey' },
    { id: 4, title: 'Completed', subtitle: 'Order completed', icon: CheckCircle, color: 'grey' }
  ];

  const getCurrentStep = () => {
    switch (status) {
      case 'Order Received': return 1;
      case 'Preparing': return 2;
      case 'Ready': return 3;
      case 'Completed': return 4;
      default: return 1;
    }
  };

  const currentStep = getCurrentStep();

  return (
    <Container className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="mb-0">Your Orders</h1>
      </div>

      {message && <Alert variant="info">{message}</Alert>}

      <Card className="shadow-sm">
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h5 className="mb-1">Order #{orderId}</h5>
              <small className="text-muted">
                {orderDetails?.timestamp ? new Date(orderDetails.timestamp).toLocaleString() : ''}
              </small>
            </div>
          </div>

          <div className="position-relative mb-5">
            <div className="progress" style={{ height: '2px', backgroundColor: '#e9ecef' }}>
              <div
                className="progress-bar"
                style={{
                  width: `${(currentStep - 1) * 33.33}%`,
                  backgroundColor: '#4285f4'
                }}
              />
            </div>

            <Row className="position-relative" style={{ marginTop: '-1.5rem' }}>
              {steps.map((step, index) => (
                <Col key={step.id} className="text-center">
                  <div
                    className={`rounded-circle d-flex align-items-center justify-content-center mx-auto mb-2`}
                    style={{
                      width: '3rem',
                      height: '3rem',
                      backgroundColor: currentStep >= step.id ? '#4285f4' : '#e9ecef',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <step.icon
                      size={20}
                      color={currentStep >= step.id ? 'white' : '#6c757d'}
                    />
                  </div>
                  <div>
                    <strong className="d-block" style={{ color: currentStep >= step.id ? '#4285f4' : '#6c757d' }}>
                      {step.title}
                    </strong>
                    <small className="text-muted">{step.subtitle}</small>
                    {step.time && <small className="d-block text-muted">{step.time}</small>}
                  </div>
                </Col>
              ))}
            </Row>
          </div>

{orderDetails && (
  <div className="border-top pt-3">
    <div className="mb-3">
      <h6 className="mb-1">Phone Number</h6>
      <small className="text-muted">{orderDetails.customerPhone}</small>
    </div>
    <div className="mb-3">
      <h6 className="mb-1">Delivery Location</h6>
      <small className="text-muted">{orderDetails.deliveryLocation}</small>
    </div>
    {orderDetails.cart.map((item, index) => (
      <div key={index} className="d-flex justify-content-between align-items-center mb-2">
        <div>
          <h6 className="mb-1">{item.name}</h6>
          <small className="text-muted">Quantity: {item.quantity}</small>
        </div>
        <h6 className="mb-0">₵{(item.price * item.quantity).toFixed(2)}</h6>
      </div>
    ))}
    <div className="border-top mt-3 pt-3">
      <div className="d-flex justify-content-between align-items-center">
        <h6 className="mb-0">Total</h6>
<h6 className="mb-0">₵{orderDetails.cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2)}</h6>
      </div>
    </div>
  </div>
)}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default OrderStatusPage;
