import React, { useState, useEffect } from 'react';
import { Container, Card, Badge, ListGroup, Alert, Button, Spinner } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import { useOrderData } from './useOrderData';

const OrderStatusPage = () => {
  const { orderId } = useParams();
  const { order, status, loading, error, refreshStatus } = useOrderData(orderId);
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    await refreshStatus();
    setRefreshing(false);
  };

  const getStatusBadgeVariant = (status) => {
    switch (status) {
      case 'Order Received': return 'info';
      case 'Preparing': return 'primary';
      case 'Out for Delivery': return 'warning';
      case 'Delivered': return 'success';
      case 'Cancelled': return 'danger';
      default: return 'secondary';
    }
  };

  return (
    <Container className="py-5">
      <Link to="/" className="btn btn-outline-secondary mb-4">← Back to Menu</Link>
      
      <h1 className="text-center mb-4">Order Status</h1>
      
      {error && (
        <Alert variant="danger">{error}</Alert>
      )}
      
      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : order ? (
        <Card className="shadow-sm">
          <Card.Header as="h5" className="d-flex justify-content-between align-items-center">
            <span>Order #{orderId}</span>
            <Badge bg={getStatusBadgeVariant(status)} className="p-2">{status}</Badge>
          </Card.Header>
          
          <Card.Body>
            <div className="mb-4">
              {/* <h6 className="mb-3">Customer Details</h6>
              <ListGroup variant="flush">
                <ListGroup.Item>Name: {order.customerName || 'N/A'}</ListGroup.Item>
                <ListGroup.Item>Phone: {order.customerPhone}</ListGroup.Item>
                <ListGroup.Item>Email: {order.customerEmail || 'N/A'}</ListGroup.Item>
                <ListGroup.Item>Delivery Location: {order.deliveryLocation}</ListGroup.Item>
              </ListGroup> */}
            </div>
            
            <div className="mb-4">
              <h6 className="mb-3">Order Items</h6>
              {order.cart && order.cart.length > 0 ? (
                <ListGroup variant="flush">
                  {order.cart.map((item, index) => (
                    <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
                      <div>
                        <span className="fw-bold">{item.name}</span>
                        {item.quantity > 1 && <span className="text-muted ms-2">× {item.quantity}</span>}
                      </div>
                      <span>GHS {(item.price * item.quantity).toFixed(2)}</span>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              ) : (
                <Alert variant="warning">No items found in this order</Alert>
              )}
            </div>
            
            <div className="mb-4">
              <h6 className="mb-3">Payment Information</h6>
              <ListGroup variant="flush">
                <ListGroup.Item>Total Amount: GHS {order.totalAmount}</ListGroup.Item>
                <ListGroup.Item>Payment Method: {order.network}</ListGroup.Item>
                <ListGroup.Item>Transaction ID: {order.transactionId}</ListGroup.Item>
                <ListGroup.Item>
                  Order Date: {new Date(order.timestamp).toLocaleString()}
                </ListGroup.Item>
              </ListGroup>
            </div>
          </Card.Body>
          
          <Card.Footer className="text-center">
            <Button 
              variant="primary" 
              onClick={handleRefresh} 
              disabled={refreshing}
            >
              {refreshing ? 'Refreshing...' : 'Refresh Status'}
            </Button>
          </Card.Footer>
        </Card>
      ) : (
        <Alert variant="warning">
          No order found with ID: {orderId}. Please check the order ID and try again.
        </Alert>
      )}
    </Container>
  );
};

export default OrderStatusPage;