import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import ThreeDScene from "./ThreeDScene";
import { useSpring, animated } from "react-spring";
import LobsterModel from "./LobsterModel";

const Hero = () => {
  const [scrollY, setScrollY] = useState(0);
  
  // Track scroll position for parallax effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  // Animated heading
  const headingSpring = useSpring({
    from: { opacity: 0, transform: "translateY(40px)" },
    to: { opacity: 1, transform: "translateY(0px)" },
    delay: 200,
    config: { tension: 120, friction: 14 }
  });
  
  // Animated subheading
  const subheadingSpring = useSpring({
    from: { opacity: 0, transform: "translateY(30px)" },
    to: { opacity: 1, transform: "translateY(0px)" },
    delay: 400,
    config: { tension: 120, friction: 14 }
  });
  
  // Animated button
  const buttonSpring = useSpring({
    from: { opacity: 0, transform: "translateY(20px)" },
    to: { opacity: 1, transform: "translateY(0px)" },
    delay: 600,
    config: { tension: 120, friction: 14 }
  });
  
  return (
    <section className="relative h-screen overflow-hidden">
      {/* Gradient background instead of image */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-black to-blue-900"
        style={{ 
          transform: `translateY(${scrollY * 0.3}px)`,
          opacity: 1 - scrollY * 0.001
        }}
      />
      
      {/* 3D Scene */}
      <ThreeDScene className="opacity-60" />
      
      {/* 3D Lobster Model */}
      <LobsterModel className="z-20" />
      
      {/* Content */}
      <div className="container mx-auto px-6 md:px-12 relative z-10 flex items-center h-full">
        <div className="text-white text-center md:text-left w-full md:w-2/3">
          <animated.h1 
            style={headingSpring}
            className="font-poppins font-bold text-5xl md:text-6xl lg:text-7xl mb-4 text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500"
          >
            Astro Restaurant
          </animated.h1>
          
          <animated.p 
            style={subheadingSpring}
            className="text-xl md:text-2xl lg:text-3xl mb-8 font-light text-blue-100"
          >
            Authentic Maldivian seafood experience in the heart of Thoddoo
          </animated.p>
          
          <animated.div style={buttonSpring}>
            <Button 
              size="lg" 
              className="bg-teal-500 hover:bg-teal-600 text-white font-semibold px-8 py-6 rounded-full text-lg shadow-lg"
              onClick={() => {
                const bookingSection = document.getElementById('book');
                if (bookingSection) {
                  window.scrollTo({
                    top: bookingSection.offsetTop - 80,
                    behavior: 'smooth'
                  });
                }
              }}
            >
              Reserve a Table
            </Button>
          </animated.div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div 
        className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-blue-900/80 to-transparent"
        style={{ zIndex: 5 }}
      />
    </section>
  );
};

export default Hero;
