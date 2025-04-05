import React, { useState, useEffect } from 'react';

const FoodSvgs = {
  fish: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path d="M92.5,50c0,0-15.8-25-42.5-25c-26.7,0-42.5,25-42.5,25s15.8,25,42.5,25C76.7,75,92.5,50,92.5,50z M20,50c0-2.8,2.2-5,5-5s5,2.2,5,5s-2.2,5-5,5S20,52.8,20,50z" fill="#ff9500" />
  </svg>`,
  shrimp: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path d="M80,55c-5.5,0-10-4.5-10-10c0-5.5,4.5-10,10-10s10,4.5,10,10C90,50.5,85.5,55,80,55z M30,65c-8.3,0-15-6.7-15-15s6.7-15,15-15s15,6.7,15,15S38.3,65,30,65z M70,40c0,0-25-10-50,5c0,0,15,15,40,10C60,55,70,40,70,40z" fill="#f25c54" />
  </svg>`,
  plate: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path d="M50,80c-16.6,0-30-13.4-30-30s13.4-30,30-30s30,13.4,30,30S66.6,80,50,80z M50,30c-11,0-20,9-20,20s9,20,20,20s20-9,20-20S61,30,50,30z" fill="#ffffff" />
  </svg>`
};

const FoodItem = ({ type, index }: { type: keyof typeof FoodSvgs; index: number }) => {
  const [position, setPosition] = useState({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const [rotation, setRotation] = useState(Math.random() * 360);
  const delay = index * 100 + 50; // Different delay for each item
  const scale = 0.5 + Math.random() * 0.8;
  
  // Add mouse event listener that updates position with a delay
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setTimeout(() => {
        setPosition({ x: e.clientX, y: e.clientY });
        setRotation(prev => prev + 2);
      }, delay);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [delay]);
  
  return (
    <div 
      style={{
        position: 'absolute',
        top: position.y - 25,
        left: position.x - 25,
        width: 50,
        height: 50,
        opacity: 0.7,
        transform: `scale(${scale}) rotate(${rotation}deg)`,
        transition: `top 0.3s ease-out, left 0.3s ease-out, transform 0.3s ease-out`,
        filter: 'drop-shadow(0 0 3px rgba(0,0,0,0.3))'
      }}
      dangerouslySetInnerHTML={{ __html: FoodSvgs[type] }}
    />
  );
};

const CursorFollowingFood: React.FC = () => {
  // Create an array of food items with different types
  const foodTypes: Array<keyof typeof FoodSvgs> = ['fish', 'shrimp', 'plate'];
  const items = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    type: foodTypes[i % foodTypes.length]
  }));
  
  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {items.map((item) => (
        <FoodItem key={item.id} type={item.type} index={item.id} />
      ))}
    </div>
  );
};

export default CursorFollowingFood;