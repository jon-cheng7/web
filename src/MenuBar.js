import React, { useState, useEffect } from 'react';
import './MenuBar.css';


const MenuBar = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    if (window.pageYOffset >= 1000) {
      setIsSticky(true);
      setTimeout(() => {
        setIsAnimating(true);
      }, 100);
    } else {
      setIsSticky(false);
      setIsAnimating(false);
    }
  };

  return (
    <div className={`menu-container ${isSticky ? "sticky" : ""} ${isAnimating ? "animating" : ""}`}>
      <h3>navigation menu</h3>
      <div className='nav-menu-options'>
        <h4>resume</h4>
        <h4>contact</h4>
        <h4>other</h4>
      </div>
    </div>
  );
};

export default MenuBar;
