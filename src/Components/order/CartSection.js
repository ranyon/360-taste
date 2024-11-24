import React from 'react';
import { Button } from 'react-bootstrap';
import { ShoppingCart, Plus, Minus } from 'lucide-react';

const CartSection = ({ 
  cart, 
  addToCart, 
  removeFromCart, 
  getTotalPrice, 
  setShowModal 
}) => {
  return (
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
  );
};

export default CartSection;