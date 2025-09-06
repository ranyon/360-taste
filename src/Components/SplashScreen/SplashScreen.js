import React from 'react';
import './SplashScreen.css';
import splashImage from '../images/360AnniEdit.png';

const SplashScreen = () => {
  return (
    <div className="splash-screen">
      <img src={splashImage} alt="Splash Screen" className="splash-image" />
    </div>
  );
};

export default SplashScreen;
