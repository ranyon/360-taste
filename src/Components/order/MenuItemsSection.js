import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { Plus } from 'lucide-react';

const MenuItemsSection = ({ 
  searchTerm, 
  setSearchTerm, 
  filteredMenuItems, 
  addToCart 
}) => {
  return (
    <>
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
    </>
  );
};

export default MenuItemsSection;