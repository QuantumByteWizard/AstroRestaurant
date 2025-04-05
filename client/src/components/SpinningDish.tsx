import { useRef, useEffect } from "react";
import { useSpring, animated } from "react-spring";

// SVG paths for different food types
const FOOD_SVGS = {
  seafood: `
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="45" fill="#f3f4f6" />
      <path d="M70,40 C65,25 35,25 30,40 C25,55 35,70 50,70 C65,70 75,55 70,40 Z" fill="#f97316" />
      <path d="M45,45 C45,45 40,50 45,55 C50,60 55,55 55,55" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" />
      <circle cx="40" cy="40" r="3" fill="#fff" />
    </svg>
  `,
  vegetarian: `
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="45" fill="#f3f4f6" />
      <path d="M30,30 C30,30 40,25 50,35 C60,45 70,40 70,40 L60,70 C60,70 50,75 40,70 L30,30 Z" fill="#22c55e" />
      <path d="M50,35 L50,65" fill="none" stroke="#fff" stroke-width="2" />
      <path d="M40,40 L60,60" fill="none" stroke="#fff" stroke-width="2" />
      <path d="M40,60 L60,40" fill="none" stroke="#fff" stroke-width="2" />
    </svg>
  `,
  halal: `
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="45" fill="#f3f4f6" />
      <path d="M30,35 C30,35 30,65 50,65 C70,65 70,35 50,35 C30,35 30,35 30,35 Z" fill="#8b5cf6" />
      <path d="M35,50 L65,50" fill="none" stroke="#fff" stroke-width="2" />
      <path d="M40,40 C40,40 50,60 60,40" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" />
    </svg>
  `
};

interface SpinningDishProps {
  type: 'seafood' | 'vegetarian' | 'halal';
  size?: number;
  className?: string;
  hoverEffect?: boolean;
}

const SpinningDish: React.FC<SpinningDishProps> = ({ 
  type, 
  size = 120, 
  className = "",
  hoverEffect = true
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [springs, api] = useSpring(() => ({
    rotation: 0,
    scale: 1,
    config: { tension: 120, friction: 14 }
  }));

  // Set up continuous rotation
  useEffect(() => {
    let lastTime = 0;
    let animationFrame: number;

    const animate = (time: number) => {
      if (!lastTime) lastTime = time;
      const delta = time - lastTime;
      lastTime = time;

      // Rotate at a consistent speed (20 degrees per second)
      api.start({
        rotation: springs.rotation.get() + (delta * 0.02),
        immediate: true
      });

      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [api, springs.rotation]);

  const handleMouseEnter = () => {
    if (hoverEffect) {
      api.start({ scale: 1.2 });
    }
  };

  const handleMouseLeave = () => {
    if (hoverEffect) {
      api.start({ scale: 1 });
    }
  };

  // Create a data URL from the SVG for the image
  const svgDataUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(FOOD_SVGS[type])}`;

  return (
    <div 
      ref={containerRef}
      className={`relative ${className}`}
      style={{ width: size, height: size }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <animated.div
        style={{
          width: '100%',
          height: '100%',
          transform: springs.rotation.to(r => `rotate(${r}deg) scale(${springs.scale.get()})`),
          transformOrigin: 'center center'
        }}
      >
        <img 
          src={svgDataUrl} 
          alt={`${type} dish`}
          className="w-full h-full drop-shadow-md"
          style={{ filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))' }}
        />
      </animated.div>
      
      {/* Add a plate shadow */}
      <div 
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-black/10 rounded-full" 
        style={{ 
          width: size * 0.8, 
          height: size * 0.1,
          filter: 'blur(4px)'
        }}
      />
    </div>
  );
};

export default SpinningDish;