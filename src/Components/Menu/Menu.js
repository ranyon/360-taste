import React, { useState } from 'react';
import { Container, Row, Col, Card, Modal } from 'react-bootstrap';

// Import your menu images
import foodMenuThumbnail from './food-menu-full.png';
import foodMenuFull from './food-menu-full.png';
import drinksMenuThumbnail from './drinks-menu-full.png';
import drinksMenuFull from './drinks-menu-full.png';

const Menu = () => {
  const [showFoodMenu, setShowFoodMenu] = useState(false);
  const [showDrinksMenu, setShowDrinksMenu] = useState(false);

  const MenuCard = ({ title, thumbnail, onClick }) => (
    <Card onClick={onClick} style={{ cursor: 'pointer' }}>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>Click to view full menu</Card.Text>
      </Card.Body>
      <Card.Img variant="top" src={thumbnail} alt={`${title} thumbnail`} />
    </Card>
  );

  const MenuModal = ({ show, onHide, title, image }) => (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <img src={image} alt={title} style={{ width: '100%', height: 'auto' }} />
      </Modal.Body>
    </Modal>
  );

  return (
    <Container>
      <Row>
        <Col md={6}>
          <MenuCard
            title="Food Menu"
            thumbnail={foodMenuThumbnail}
            onClick={() => setShowFoodMenu(true)}
          />
        </Col>
        <Col md={6}>
          <MenuCard
            title="Drinks & Smoothies"
            thumbnail={drinksMenuThumbnail}
            onClick={() => setShowDrinksMenu(true)}
          />
        </Col>
      </Row>

      <MenuModal
        show={showFoodMenu}
        onHide={() => setShowFoodMenu(false)}
        title="Food Menu"
        image={foodMenuFull}
      />

      <MenuModal
        show={showDrinksMenu}
        onHide={() => setShowDrinksMenu(false)}
        title="Drinks & Smoothies Menu"
        image={drinksMenuFull}
      />
    </Container>
  );
};

export default Menu;