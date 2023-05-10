import React from 'react';

const Triangle = () => {
  return (
    <div style={{
      position: 'absolute',
      width: '0',
      height: '0',
      borderBottom: '100px solid yellow',
      borderLeft: '50px solid transparent',
      borderRight: '50px solid transparent',
      margin: '20px',
    }}></div>
  );
};

export default Triangle;
