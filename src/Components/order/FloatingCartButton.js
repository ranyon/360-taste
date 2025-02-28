import React, { useEffect, useState, useRef } from 'react';
import { Button, Badge } from 'react-bootstrap';
import { ShoppingCart } from 'lucide-react';

const FloatingCartButton = ({ cart, totalPrice }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isNewItem, setIsNewItem] = useState(false);
  const prevCartLength = useRef(0);
  const prevTotalItems = useRef(0);
  
  // Calculate total quantity of items in cart
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  
  useEffect(() => {
    // Show the floating button only on mobile when cart has items
    const checkVisibility = () => {
      const isMobile = window.innerWidth < 768; // Bootstrap md breakpoint
      const hasItems = cart.length > 0;
      setIsVisible(isMobile && hasItems);
    };
    
    // Initial check
    checkVisibility();
    
    // Check on resize
    window.addEventListener('resize', checkVisibility);
    
    return () => {
      window.removeEventListener('resize', checkVisibility);
    };
  }, [cart]);
  
  // Check if items were added to trigger animation
  useEffect(() => {
    if (totalItems > prevTotalItems.current) {
      setIsNewItem(true);
      
      // Reset animation state after it plays
      const timer = setTimeout(() => {
        setIsNewItem(false);
      }, 500);
      
      return () => clearTimeout(timer);
    }
    
    prevTotalItems.current = totalItems;
  }, [totalItems]);
  
  // Function to scroll to the cart section
  const scrollToCart = () => {
    const cartElement = document.querySelector('.cart-container');
    if (cartElement) {
      cartElement.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  if (!isVisible) return null;
  
  return (
    <Button 
      onClick={scrollToCart}
      className={`floating-cart-button ${isNewItem ? 'new-item' : ''}`}
      variant="primary"
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 1000,
        borderRadius: '50%',
        width: '60px',
        height: '60px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)'
      }}
    >
      <div className="position-relative">
        <ShoppingCart size={24} />
        <Badge 
          bg="danger" 
          pill 
          className="position-absolute"
          style={{ 
            top: '-10px', 
            right: '-10px'
          }}
        >
          {totalItems}
        </Badge>
      </div>
    </Button>
  );
};

export default FloatingCartButton;