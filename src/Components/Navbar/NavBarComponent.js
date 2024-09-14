import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import './Navbar.css';
import { Link } from 'react-scroll';

const NavbarComponent = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
      <Navbar.Brand as={Link} to="home" smooth={true} duration={500}>360 Taste</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link as={Link} to="home" smooth={true} duration={500}>Home</Nav.Link>
          <Nav.Link as={Link} to="menu" smooth={true} duration={500}>Menu</Nav.Link>
          <Nav.Link as={Link} to="footer" smooth={true} duration={500}>Contact</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarComponent;