import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';

const UpdateOrderStatusPage = () => {
  const [orderId, setOrderId] = useState('');
  const [status, setStatus] = useState('');
  const [message, setMessage] = useState('');
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem('orders')) || {};
    setOrders(Object.keys(storedOrders));
  }, []);

  const statusOptions = [
    { value: 'Order Received', label: 'Order Received' },
    { value: 'Preparing', label: 'Preparing' },
    { value: 'Ready', label: 'Ready' },
    { value: 'Completed', label: 'Completed' }
  ];

  const updateOrderStatus = () => {
    if (!orderId || !status) {
      setMessage('Please enter both order ID and status.');
      return;
    }

    const orders = JSON.parse(localStorage.getItem('orders')) || {};
    if (!orders[orderId]) {
      setMessage('Order ID not found.');
      return;
    }

    orders[orderId] = {
      ...orders[orderId],
      status: status,
      lastUpdated: new Date().toISOString()
    };

    localStorage.setItem('orders', JSON.stringify(orders));
    setMessage('Order status updated successfully.');
  };

  return (
    <Container className="py-5">
      <h1 className="text-center mb-5">Update Order Status</h1>
      {message && <Alert variant="info">{message}</Alert>}
      <Form>
        <Form.Group className="mb-3" controlId="orderId">
          <Form.Label>Order ID</Form.Label>
          <Form.Select
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
          >
            <option value="">Select Order ID</option>
            {orders.map((id) => (
              <option key={id} value={id}>
                {id}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="status">
          <Form.Label>Status</Form.Label>
          <Form.Select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">Select Status</option>
            {statusOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Button variant="primary" onClick={updateOrderStatus}>
          Update Status
        </Button>
      </Form>
    </Container>
  );
};

export default UpdateOrderStatusPage;
