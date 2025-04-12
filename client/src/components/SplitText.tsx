import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface SplitTextProps {
  children: string;
  type?: 'chars' | 'words';
  className?: string;
  animation?: 'fadeUp' | 'fadeIn' | 'stagger';
  staggerAmount?: number;
  delay?: number;
}

const SplitText: React.FC<SplitTextProps> = ({
  children,
  type = 'words',
  className = '',
  animation = 'fadeUp',
  staggerAmount = 0.05,
  delay = 0,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const items = container.querySelectorAll('.split-text-item');
    
    // Initial state
    gsap.set(items, { opacity: 0, y: animation === 'fadeUp' ? 20 : 0, scale: animation === 'stagger' ? 0.9 : 1 });
    
    // Animation timeline
    const timeline = gsap.timeline({ delay });
    
    switch (animation) {
      case 'fadeUp':
        timeline.to(items, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: staggerAmount,
          ease: 'power3.out'
        });
        break;
        
      case 'fadeIn':
        timeline.to(items, {
          opacity: 1,
          duration: 0.8,
          stagger: staggerAmount,
          ease: 'power2.out'
        });
        break;
        
      case 'stagger':
        timeline.to(items, {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: staggerAmount,
          ease: 'back.out(1.2)'
        });
        break;
    }
    
    return () => {
      timeline.kill();
    };
  }, [children, type, animation, staggerAmount, delay]);
  
  // Split the text into spans
  const renderSplitText = () => {
    if (typeof children !== 'string') {
      return <span>{children}</span>;
    }
    
    if (type === 'chars') {
      return children.split('').map((char, index) => (
        <span
          key={index}
          className="split-text-item inline-block"
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ));
    } else { // words
      return children.split(' ').map((word, index) => (
        <span
          key={index}
          className="split-text-item inline-block"
        >
          {word}
          {index < children.split(' ').length - 1 ? '\u00A0' : ''}
        </span>
      ));
    }
  };
  
  return (
    <div ref={containerRef} className={className}>
      {renderSplitText()}
    </div>
  );
};

export default SplitText;