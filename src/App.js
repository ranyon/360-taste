import React, { useEffect } from 'react';
import { Element } from 'react-scroll';
import AOS from 'aos';
import 'aos/dist/aos.css';
import NavbarComponent from './Components/Navbar/NavBarComponent';
import HeroSection from './Components/Home/HeroSection';
import Menu from './Components/Menu/Menu';
import Footer from './Components/Footer/Footer';
import './App.css';

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <div className="app-container">
      <div className="content">
        <NavbarComponent />
        <Element name="home">
          <div data-aos="fade-up">
            <HeroSection />
          </div>
        </Element>
        <Element name="menu">
          <div data-aos="fade-up">
            <Menu />
          </div>
        </Element>
        <Element name="footer">
          <div data-aos="fade-up">
            <Footer />
          </div>
        </Element>
      </div>
      <div className="background"></div>
      <div className="overlay"></div>
    </div>
  );
}

export default App;

//STABLE VERSION