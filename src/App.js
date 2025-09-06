import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import SplashScreen from './Components/SplashScreen/SplashScreen';
import AOS from 'aos';
import 'aos/dist/aos.css';
import NavbarComponent from './Components/Navbar/NavBarComponent';
import HeroSection from './Components/Home/HeroSection';
import Menu from './Components/Menu/Menu';
import OrderPage from './Components/order/OrderPage';
import OrderStatusPage from './Components/order/OrderStatusPage';
import UpdateOrderStatusPage from './Components/order/UpdateOrderStatusPage';
import CartPage from './Components/order/CartPage';
import Footer from './Components/Footer/Footer';
import './App.css';

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash === '') {
      window.scrollTo(0, 0);
    } else {
      const element = document.getElementById(hash.slice(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [pathname, hash]);

  return null;
}

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });

    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <Router>
      <ScrollToTop />
      <div className="app-container">
        <div className="content">
          <NavbarComponent />
          <Routes>
            <Route path="/" element={
              <>
                <div data-aos="fade-up" id="home">
                  <HeroSection />
                </div>
                <div data-aos="fade-up" id="menu">
                  <Menu />
                </div>
              </>
            } />
            <Route path="/order" element={<OrderPage />} />
            <Route path="/order/:categoryId" element={<OrderPage />} />
            <Route path="/order-status/:orderId" element={<OrderStatusPage />} />
            <Route path="/updateorderstatus" element={<UpdateOrderStatusPage />} />
            <Route path="/cart" element={<CartPage />} />
          </Routes>
          <div data-aos="fade-up" id="contact">
            <Footer />
          </div>
        </div>
        <div className="background"></div>
        <div className="overlay"></div>
      </div>
    </Router>
  );
}

export default App;
