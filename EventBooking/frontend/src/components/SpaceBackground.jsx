import React from 'react';
import './SpaceBackground.css';

const SpaceBackground = () => {
  return (
    <div className="space-bg-container">
      <div className="star-layer"></div>
      <div className="star-layer star-layer-2"></div>
      
      {/* Animated Asteroids */}
      <div className="asteroid a1"></div>
      <div className="asteroid a2"></div>
      <div className="asteroid a3"></div>
      <div className="asteroid a4"></div>
      <div className="asteroid a5"></div>
    </div>
  );
};

export default SpaceBackground;
