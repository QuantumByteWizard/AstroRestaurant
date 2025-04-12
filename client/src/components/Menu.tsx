import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Flame, Leaf, AlertCircle } from "lucide-react";
import SpinningDish from "./SpinningDish";
import InteractiveBackground from "./InteractiveBackground";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { applyMenuItemHover } from "@/lib/animations";

type MenuCategory = "seafood" | "vegetarian" | "halal";

interface MenuItem {
  id: number;
  name: string;
  price: string;
  description: string;
  image: string;
  category: MenuCategory;
  isSignature?: boolean;
  tags?: Array<{ icon: React.ReactNode; text: string }>;
}

const menuItems: MenuItem[] = [
  {
    id: 1,
    name: "Grilled Octopus",
    price: "$28",
    description: "Tender octopus marinated with herbs and spices, chargrilled to perfection and served with a side of local vegetables.",
    image: "https://images.unsplash.com/photo-1613391881246-c9b50e89f2ed?ixlib=rb-4.0.3&auto=format&fit=crop&w=1480&q=80",
    category: "seafood",
    isSignature: true,
    tags: [{ icon: <Flame className="text-primary" />, text: "Chef's Recommendation" }]
  },
  {
    id: 2,
    name: "Maldivian Tuna Curry",
    price: "$22",
    description: "Traditional Maldivian curry with fresh tuna, coconut milk, and aromatic spices, served with steamed rice.",
    image: "https://images.unsplash.com/photo-1527751171053-6ac5ec50000b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1480&q=80",
    category: "seafood",
    tags: [{ icon: <AlertCircle className="text-primary" />, text: "Medium Spicy" }]
  },
  {
    id: 3,
    name: "Vegetable Coconut Stew",
    price: "$18",
    description: "Fresh island vegetables simmered in creamy coconut milk with local herbs and spices.",
    image: "https://images.unsplash.com/photo-1614777986387-015c2a2859ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=1374&q=80",
    category: "vegetarian",
    tags: [{ icon: <Leaf className="text-primary" />, text: "Vegetarian" }]
  },
  {
    id: 4,
    name: "Spiced Reef Fish",
    price: "$26",
    description: "Local reef fish marinated in a blend of Maldivian spices, pan-seared and topped with tropical fruit salsa.",
    image: "https://images.unsplash.com/photo-1553557302-79b330875d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=1480&q=80",
    category: "seafood",
    tags: [{ icon: <AlertCircle className="text-primary" />, text: "Mild Spicy" }]
  },
  {
    id: 5,
    name: "Tropical Vegetable Curry",
    price: "$19",
    description: "Assorted tropical vegetables in a fragrant curry sauce, served with coconut rice and papadum.",
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1374&q=80",
    category: "vegetarian",
    tags: [{ icon: <Leaf className="text-primary" />, text: "Vegetarian" }]
  },
  {
    id: 6,
    name: "Halal Seafood Platter",
    price: "$32",
    description: "Assortment of grilled and fried seafood prepared according to Halal guidelines, served with saffron rice.",
    image: "https://images.unsplash.com/photo-1532980202620-1d2f9ce4b0fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1480&q=80",
    category: "halal",
    tags: [{ icon: <AlertCircle className="text-primary" />, text: "Halal Certified" }]
  }
];

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState<MenuCategory>("seafood");
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const sectionRef = useRef<HTMLElement>(null);
  const menuCardsRef = useRef<HTMLDivElement>(null);
  
  // Effect for revealing items on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // When section is visible, start revealing menu items
            const timer = setTimeout(() => {
              const filteredItems = menuItems
                .filter(item => item.category === activeCategory)
                .map(item => item.id);
              
              setVisibleItems(filteredItems);
            }, 300);
            
            return () => clearTimeout(timer);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [activeCategory]);
  
  // Reset visible items when category changes
  useEffect(() => {
    setVisibleItems([]);
    const timer = setTimeout(() => {
      const filteredItems = menuItems
        .filter(item => item.category === activeCategory)
        .map(item => item.id);
      
      setVisibleItems(filteredItems);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [activeCategory]);
  
  // Initialize GSAP animations
  useGSAP(() => {
    // Apply hover animations to menu cards
    document.querySelectorAll('.menu-item').forEach(item => {
      applyMenuItemHover(item);
    });
    
    // Create floating animations for decoration elements
    const floatElements = document.querySelectorAll('.menu-decoration');
    floatElements.forEach(el => {
      gsap.to(el, {
        y: gsap.utils.random(-15, 15),
        x: gsap.utils.random(-10, 10),
        rotation: gsap.utils.random(-5, 5),
        duration: gsap.utils.random(3, 5),
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: gsap.utils.random(0, 1),
      });
    });
    
    // Reveal elements that should be visible when the section appears
    const fadeElements = document.querySelectorAll('.fade-up:not(.revealed)');
    if (fadeElements.length > 0) {
      gsap.to(fadeElements, {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        }
      });
    }
  }, [activeCategory, visibleItems]); // Re-run when category or visible items change
  
  const filteredItems = menuItems.filter(item => 
    item.category === activeCategory
  );
  
  const handleCardHover = (item: MenuItem) => {
    setSelectedItem(item);
  };
  
  const handleCardLeave = () => {
    setSelectedItem(null);
  };
  
  return (
    <section 
      id="menu" 
      ref={sectionRef}
      className="py-16 md:py-24 relative overflow-hidden"
      style={{ backgroundColor: "#010B1E" }}
    >
      {/* Interactive background */}
      <InteractiveBackground />
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-16">
          <h2 className="menu-title font-poppins font-bold text-3xl md:text-4xl mb-6 inline-block relative text-white">
            <span className="menu-title-text inline-block relative z-10">Our Menu</span>
            <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-2 bg-teal-500 z-0"></span>
          </h2>
          <p className="menu-description fade-up text-lg max-w-3xl mx-auto text-blue-100 revealed">
            From the freshest seafood to delightful vegetarian dishes, our menu offers something for everyone. Available for lunch and dinner daily.
          </p>
        </div>
        
        {/* Decorative floating elements */}
        <div className="absolute top-20 left-10 menu-decoration w-8 h-8 rounded-full bg-teal-500/30 blur-sm"></div>
        <div className="absolute bottom-32 right-12 menu-decoration w-12 h-12 rounded-full bg-blue-500/20 blur-sm"></div>
        <div className="absolute top-1/3 right-16 menu-decoration w-6 h-6 rounded-full bg-yellow-500/20 blur-sm"></div>
        
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          <Button
            variant={activeCategory === "seafood" ? "default" : "outline"}
            className={activeCategory === "seafood" 
              ? "bg-teal-500 hover:bg-teal-600 text-white border-none" 
              : "text-white border-white hover:bg-white/10"}
            onClick={() => setActiveCategory("seafood")}
          >
            <span className="flex items-center">
              <SpinningDish type="seafood" size={32} className="mr-2" hoverEffect={false} />
              Seafood
            </span>
          </Button>
          <Button
            variant={activeCategory === "vegetarian" ? "default" : "outline"}
            className={activeCategory === "vegetarian" 
              ? "bg-teal-500 hover:bg-teal-600 text-white border-none" 
              : "text-white border-white hover:bg-white/10"}
            onClick={() => setActiveCategory("vegetarian")}
          >
            <span className="flex items-center">
              <SpinningDish type="vegetarian" size={32} className="mr-2" hoverEffect={false} />
              Vegetarian
            </span>
          </Button>
          <Button
            variant={activeCategory === "halal" ? "default" : "outline"}
            className={activeCategory === "halal" 
              ? "bg-teal-500 hover:bg-teal-600 text-white border-none" 
              : "text-white border-white hover:bg-white/10"}
            onClick={() => setActiveCategory("halal")}
          >
            <span className="flex items-center">
              <SpinningDish type="halal" size={32} className="mr-2" hoverEffect={false} />
              Halal Options
            </span>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" ref={menuCardsRef}>
          {filteredItems.map((item) => {
            // Animation spring for each card
            const isVisible = visibleItems.includes(item.id);
            
            return (
              <div 
                key={item.id} 
                className={`menu-item-container fade-up ${isVisible ? "revealed" : ""}`}
                style={{
                  transitionDelay: `${item.id * 0.1}s`
                }}
              >
                <Card 
                  className="menu-item overflow-hidden shadow-lg bg-white/10 backdrop-blur-sm border-0"
                  onMouseEnter={() => handleCardHover(item)}
                  onMouseLeave={handleCardLeave}
                >
                  <div className="menu-item-image h-64 overflow-hidden relative">
                    {item.isSignature && (
                      <Badge className="absolute top-4 right-4 bg-teal-500 text-white font-semibold z-10">
                        Signature
                      </Badge>
                    )}
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  </div>
                  <CardContent className="menu-item-info p-6 text-white">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-poppins font-semibold text-xl">{item.name}</h3>
                      <span className="text-teal-400 font-bold">{item.price}</span>
                    </div>
                    <p className="text-gray-300 mb-4">
                      {item.description}
                    </p>
                    {item.tags && item.tags.length > 0 && (
                      <div className="menu-item-ingredients flex items-center">
                        {item.tags[0].icon}
                        <span className="text-sm ml-2 text-gray-200">{item.tags[0].text}</span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>
        
        {/* 3D dish display area - showing selected item */}
        <div className="flex justify-center mt-16">
          <div className="relative h-40 w-full max-w-sm">
            {selectedItem && (
              <div className="absolute inset-0 flex items-center justify-center">
                <SpinningDish 
                  type={selectedItem.category} 
                  size={160} 
                  className="mr-6"
                />
                <div className="text-white">
                  <h4 className="text-xl font-semibold mb-2">{selectedItem.name}</h4>
                  <p className="text-teal-400 font-bold">{selectedItem.price}</p>
                </div>
              </div>
            )}
            {!selectedItem && (
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-gray-400 italic">Hover over a dish to see it here</p>
              </div>
            )}
          </div>
        </div>
        
        <div className="text-center mt-12">
          <Button 
            variant="outline" 
            className="border-teal-500 text-white hover:bg-teal-500 hover:text-white"
          >
            View Full Menu
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Menu;
