import React from 'react';
import { Container } from 'react-bootstrap';
import styled from 'styled-components';
import './Hero.css'

const HeroContainer = styled(Container)`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const HeroTitle = styled.h1`
  font-size: 4rem;
  font-weight: bold;
  margin-bottom: 1rem;
  // text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

const HeroSubtitle = styled.p`
  font-size: 2rem;
  font-style: italic;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
`;

const HeroSection = () => {
  return (
    <HeroContainer>
      <HeroTitle>Welcome to <span className='gradient-text'>360 Taste</span></HeroTitle>
      <HeroSubtitle>A Taste Of Home...</HeroSubtitle>
    </HeroContainer>
  );
};

export default HeroSection;