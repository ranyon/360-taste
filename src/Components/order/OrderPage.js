import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Modal, Alert, Card } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingCart, Plus, Minus, Search, MapPin } from 'lucide-react';
import axios from 'axios';
import './OrderPage.css';
import Tilapia from './foodImg/tilapia.jpg';
import Pineapple from './foodImg/pineapple.jpg'
import LFries from './foodImg/loadedFries.jfif'
import Banku from './foodImg/banku.jfif'

const TELEGRAM_BOT_TOKEN = '7375994825:AAGyNzhEcLHAP4V8msySqi3SM63q_1HOzGg';
const TELEGRAM_CHAT_ID = '1431600455';
const BUSINESS_MOMO = '0598942315';

const categories = [
  { id: 1, name: 'Main Course' },
  { id: 2, name: 'Sides' },
  { id: 3, name: 'Proteins' },
  { id: 4, name: 'Drinks' },
];

const menuItems = [
  { id: 1, name: 'Loaded Fries', description: 'Loaded potato fries with 2 chicken wings', price: 85.00, category: 1, image: LFries },
  { id: 2, name: 'Loaded Fries', description: 'Loaded potato fries with 2 chicken wings', price: 85.00, category: 1, image: LFries },
  { id: 3, name: 'Banku', description: '3 Balls of banku with no protein', price: 30.00, category: 2, image: Banku},
  { id: 4, name: 'Banku', description: '3 Balls of banku with no protein', price: 30.00, category: 2, image: Banku},
  { id: 5, name: 'Grilled Tilapia', description: 'Jumbo Tilapia', price: 100.00, category: 3, image: Tilapia },
  { id: 6, name: 'Grilled Tilapia', description: 'Jumbo Tilapia', price: 100.00, category: 3, image: Tilapia },
  { id: 7, name: 'Pine Juice', description: 'Freshly Pressed Pineapple Juice', price: 24.00, category: 4, image: Pineapple },
];

const OrderPage = () => {
  const [selectedCategory, setSelectedCategory] = useState(1);
  const [cart, setCart] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [customerPhone, setCustomerPhone] = useState('');
  const [network, setNetwork] = useState('mtn');
  const [transactionId, setTransactionId] = useState('');
  const [deliveryLocation, setDeliveryLocation] = useState('');
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

  const sendToTelegram = async (orderData) => {
    const message = `
🆕 NEW ORDER RECEIVED!

📱 Customer Phone: ${orderData.customerPhone}
📍 Delivery Location: ${orderData.deliveryLocation}
💰 Total Amount: GHS ${orderData.totalAmount}
🔖 Transaction ID: ${orderData.transactionId}
📡 Network: ${orderData.network.toUpperCase()}

📋 Order Details:
${orderData.cart.map(item => `- ${item.name} x${item.quantity} (GHS ${item.price * item.quantity})`).join('\n')}

💵 Total: GHS ${orderData.totalAmount}
`;

    const telegramApiUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    
    await axios.post(telegramApiUrl, {
      chat_id: TELEGRAM_CHAT_ID,
      text: message
    });
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate delivery location
    if (!deliveryLocation.trim()) {
      alert('Please provide a delivery location');
      setIsSubmitting(false);
      return;
    }

    try {
      await sendToTelegram({
        cart,
        customerPhone,
        totalAmount: getTotalPrice(),
        transactionId,
        network,
        deliveryLocation
      });

      setOrderPlaced(true);
      setCart([]);
      setShowModal(false);
      setTransactionId('');
      setCustomerPhone('');
      setDeliveryLocation('');
    } catch (err) {
      console.error('Error submitting order:', err);
      alert('There was an error submitting your order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    navigate(`/order/${categoryId}`);
  };

  const filteredMenuItems = menuItems.filter(item =>
    (item.category === selectedCategory) &&
    (item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <Container className="py-5">
      <h1 className="text-center mb-5">Order Your Favorite Dishes</h1>
      {orderPlaced && (
        <Alert variant="success" onClose={() => setOrderPlaced(false)} dismissible>
          Your order has been placed successfully! Delivery Will Arrive Shortly 
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
          <Form.Control
            type="text"
            placeholder="Search food item"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-bar"
          />
          {filteredMenuItems.map(item => (
            <div key={item.id} className="menu-item">
              <img src={item.image} alt={item.name} className="menu-item-image" />
              <div className="menu-item-info">
                <h3 className="menu-item-name">{item.name}</h3>
                <p className="menu-item-description">{item.description}</p>
              </div>
              <span className="menu-item-price">₵{item.price.toFixed(2)}</span>
              <Button variant="outline-primary" onClick={() => addToCart(item)}>
                <Plus size={16} />
              </Button>
            </div>
          ))}
        </Col>
        <Col md={3}>
          <div className="cart-container">
            <h3><ShoppingCart className="me-2" />Your Order</h3>
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
              <strong>₵{getTotalPrice()}</strong>
            </div>
            <Button
              variant="success"
              className="w-100 mt-3"
              onClick={() => setShowModal(true)}
              disabled={cart.length === 0}
            >
              Proceed to Payment
            </Button>
          </div>
        </Col>
      </Row>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Complete Your Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Alert variant="info" className="mb-4">
            Please send GHS {getTotalPrice()} to our MoMo number: {BUSINESS_MOMO}  MoMo name:360 Taste. Before Confirming Order
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
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Transaction ID</Form.Label>
              <Form.Control
                type="text"
                value={transactionId}
                onChange={(e) => setTransactionId(e.target.value)}
                placeholder="Enter last 5 numbers of the transaction ID from your payment"
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
    </Container>
  );
};

export default OrderPage;