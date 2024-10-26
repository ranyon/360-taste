import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Modal, Form, Alert } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingCart, Plus, Minus } from 'lucide-react';

const categories = [
  { id: 1, name: 'Appetizers' },
  { id: 2, name: 'Main Courses' },
  { id: 3, name: 'Desserts' },
  { id: 4, name: 'Drinks' },
];

const menuItems = [
  { id: 1, name: 'Spring Rolls', price: 5.99, category: 1, image: 'https://via.placeholder.com/150' },
  { id: 1, name: 'Spring Rolls', price: 5.99, category: 1, image: 'https://via.placeholder.com/150' },
  { id: 1, name: 'Spring Rolls', price: 5.99, category: 1, image: 'https://via.placeholder.com/150' },
  { id: 2, name: 'Chicken Curry', price: 12.99, category: 2, image: 'https://via.placeholder.com/150' },
  { id: 3, name: 'Chocolate Cake', price: 6.99, category: 3, image: 'https://via.placeholder.com/150' },
  { id: 4, name: 'Iced Tea', price: 2.99, category: 4, image: 'https://via.placeholder.com/150' },
  // Add more menu items as needed
];

const OrderPage = () => {
  const [selectedCategory, setSelectedCategory] = useState(1);
  const [cart, setCart] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const { categoryId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (categoryId) {
      setSelectedCategory(parseInt(categoryId));
    }
  }, [categoryId]);

  const addToCart = (item) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        );
      } else {
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (item) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
      if (existingItem.quantity === 1) {
        return prevCart.filter(cartItem => cartItem.id !== item.id);
      } else {
        return prevCart.map(cartItem =>
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem
        );
      }
    });
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const handlePayment = (e) => {
    e.preventDefault();
    // Here you would typically integrate with a payment gateway
    setOrderPlaced(true);
    setCart([]);
    setShowModal(false);
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    navigate(`/order/${categoryId}`);
  };

  return (
    <Container className="py-5">
      <h1 className="text-center mb-5">Order Your Favorite Dishes</h1>
      {orderPlaced && (
        <Alert variant="success" onClose={() => setOrderPlaced(false)} dismissible>
          Your order has been placed successfully!
        </Alert>
      )}
      <Row>
        <Col md={3}>
          <Card className="mb-4">
            <Card.Header>Categories</Card.Header>
            <Card.Body>
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? 'primary' : 'outline-primary'}
                  className="mb-2 w-100"
                  onClick={() => handleCategoryChange(category.id)}
                >
                  {category.name}
                </Button>
              ))}
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Row>
            {menuItems
              .filter((item) => item.category === selectedCategory)
              .map((item) => (
                <Col md={6} key={item.id} className="mb-4">
                  <Card>
                    <Card.Img variant="top" src={item.image} />
                    <Card.Body>
                      <Card.Title>{item.name}</Card.Title>
                      <Card.Text>${item.price.toFixed(2)}</Card.Text>
                      <Button variant="primary" onClick={() => addToCart(item)}>
                        Add to Cart
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
          </Row>
        </Col>
        <Col md={3}>
          <Card>
            <Card.Header>
              <ShoppingCart className="me-2" />
              Your Order
            </Card.Header>
            <Card.Body>
              {cart.map((item) => (
                <div key={item.id} className="d-flex justify-content-between align-items-center mb-2">
                  <span>{item.name} x {item.quantity}</span>
                  <div>
                    <Button variant="outline-primary" size="sm" onClick={() => removeFromCart(item)}>
                      <Minus size={16} />
                    </Button>
                    <Button variant="outline-primary" size="sm" className="ms-1" onClick={() => addToCart(item)}>
                      <Plus size={16} />
                    </Button>
                  </div>
                </div>
              ))}
              <hr />
              <div className="d-flex justify-content-between">
                <strong>Total:</strong>
                <strong>${getTotalPrice()}</strong>
              </div>
              <Button
                variant="success"
                className="w-100 mt-3"
                onClick={() => setShowModal(true)}
                disabled={cart.length === 0}
              >
                Proceed to Payment
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Payment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handlePayment}>
            <Form.Group className="mb-3">
              <Form.Label>Card Number</Form.Label>
              <Form.Control type="text" placeholder="Enter card number" required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Expiration Date</Form.Label>
              <Form.Control type="text" placeholder="MM/YY" required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>CVV</Form.Label>
              <Form.Control type="text" placeholder="Enter CVV" required />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100">
              Pay ${getTotalPrice()}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default OrderPage;