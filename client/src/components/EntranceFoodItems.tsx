import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

// SVG graphics for our food items
const FoodSvgs = {
  pizza: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="45" fill="#FFB938" />
    <circle cx="30" cy="35" r="6" fill="#D62828" />
    <circle cx="45" cy="65" r="6" fill="#D62828" />
    <circle cx="65" cy="40" r="6" fill="#D62828" />
    <circle cx="25" cy="60" r="6" fill="#D62828" />
    <circle cx="60" cy="60" r="6" fill="#D62828" />
  </svg>`,
  
  shrimp: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path d="M70,35 C80,30 90,30 95,35 C90,50 75,55 70,50 C65,55 65,65 60,70 C55,75 50,77 45,77 C40,77 30,75 25,70 C20,65 15,55 15,50 C15,45 20,35 30,30 C40,25 50,25 55,30 C58,32 60,35 60,40 C60,45 65,40 70,35 Z" fill="#FF6B6B" />
    <circle cx="25" cy="45" r="3" fill="black" />
  </svg>`,
  
  octopus: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="40" r="25" fill="#9D4EDD" />
    <circle cx="42" cy="35" r="5" fill="white" />
    <circle cx="42" cy="35" r="2" fill="black" />
    <circle cx="58" cy="35" r="5" fill="white" />
    <circle cx="58" cy="35" r="2" fill="black" />
    <path d="M20,60 Q15,80 10,90 Q20,85 25,70" fill="#9D4EDD" />
    <path d="M30,60 Q25,80 20,95 Q30,90 35,75" fill="#9D4EDD" />
    <path d="M40,60 Q35,75 30,90 Q45,85 45,70" fill="#9D4EDD" />
    <path d="M60,60 Q65,75 70,90 Q55,85 55,70" fill="#9D4EDD" />
    <path d="M70,60 Q75,80 80,95 Q70,90 65,75" fill="#9D4EDD" />
    <path d="M80,60 Q85,80 90,90 Q80,85 75,70" fill="#9D4EDD" />
  </svg>`
};

interface FoodItemProps {
  type: keyof typeof FoodSvgs;
  finalX: number;
  finalY: number;
  delay: number;
  scale?: number;
  rotation?: number;
}

const FoodItem: React.FC<FoodItemProps> = ({ 
  type, 
  finalX, 
  finalY, 
  delay, 
  scale = 1, 
  rotation = 0 
}) => {
  const itemRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!itemRef.current) return;
    
    // Starting position (off-screen)
    gsap.set(itemRef.current, {
      x: Math.random() > 0.5 ? -100 : window.innerWidth + 100,
      y: -100,
      rotation: rotation - 120,
      scale: scale * 0.2,
      opacity: 0
    });
    
    // Animate to final position
    gsap.to(itemRef.current, {
      x: finalX,
      y: finalY,
      rotation,
      scale,
      opacity: 1,
      duration: 1.5,
      delay,
      ease: "elastic.out(1, 0.7)",
      onComplete: () => {
        // Add subtle floating animation after entrance
        gsap.to(itemRef.current, {
          y: finalY + 15,
          rotation: rotation + 5,
          duration: 2.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
      }
    });
    
  }, [finalX, finalY, delay, scale, rotation]);
  
  return (
    <div 
      ref={itemRef}
      className="absolute"
      style={{ 
        width: 100, 
        height: 100,
        filter: 'drop-shadow(0 5px 15px rgba(0,0,0,0.3))'
      }}
      dangerouslySetInnerHTML={{ __html: FoodSvgs[type] }}
    />
  );
};

const EntranceFoodItems: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      <FoodItem 
        type="pizza" 
        finalX={window.innerWidth * 0.8} 
        finalY={window.innerHeight * 0.25} 
        delay={0.5}
        scale={0.8}
        rotation={-15}
      />
      <FoodItem 
        type="shrimp" 
        finalX={window.innerWidth * 0.15} 
        finalY={window.innerHeight * 0.35} 
        delay={1}
        scale={0.9}
        rotation={20}
      />
      <FoodItem 
        type="octopus" 
        finalX={window.innerWidth * 0.7} 
        finalY={window.innerHeight * 0.65} 
        delay={1.5}
        scale={1.1}
        rotation={-5}
      />
    </div>
  );
};

export default EntranceFoodItems;