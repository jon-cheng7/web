import React from 'react';
import './ListItem.css';

const ListItem = ({ items, fontColors, activeIndex, setActiveIndex }) => {
  const handleMouseEnter = (e, index) => {
    e.target.style.color = 'white';
  };

  const handleMouseLeave = (e, index) => {
    if (index !== activeIndex) {
      e.target.style.color = 'rgba(255, 255, 255, 0.174)';
    }
  };

  const handleClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <ul className="list-container">
      {items.map((item, index) => (
        <li
            key={index}
            style={{
            color: activeIndex === index ? fontColors[index] : 'rgba(255, 255, 255, 0.174)',
            }}
            onMouseEnter={(e) => handleMouseEnter(e, index)}
            onMouseLeave={(e) => handleMouseLeave(e, index)}
            onClick={() => handleClick(index)}
        >
            {item}
        </li>
        ))}
    </ul>
    );
};

export default ListItem;
