import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Flame, Leaf, AlertCircle } from "lucide-react";
import SpinningDish from "./SpinningDish";
import { useSpring, animated } from "react-spring";
import InteractiveBackground from "./InteractiveBackground";

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
  
  // Animation for title
  const titleSpring = useSpring({
    from: { opacity: 0, transform: "translateY(30px)" },
    to: { opacity: 1, transform: "translateY(0px)" },
    config: { tension: 100, friction: 14 }
  });
  
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
        <animated.div style={titleSpring} className="text-center mb-16">
          <h2 className="font-poppins font-bold text-3xl md:text-4xl mb-6 inline-block relative text-white">
            <span className="inline-block relative z-10">Our Menu</span>
            <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-2 bg-teal-500 z-0"></span>
          </h2>
          <p className="text-lg max-w-3xl mx-auto text-blue-100">
            From the freshest seafood to delightful vegetarian dishes, our menu offers something for everyone. Available for lunch and dinner daily.
          </p>
        </animated.div>
        
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => {
            // Animation spring for each card
            const isVisible = visibleItems.includes(item.id);
            
            return (
              <animated.div 
                key={item.id} 
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translateY(0px)" : "translateY(40px)",
                  transition: `opacity 0.5s ease-out ${item.id * 0.1}s, transform 0.5s ease-out ${item.id * 0.1}s`
                }}
              >
                <Card 
                  className="overflow-hidden shadow-lg bg-white/10 backdrop-blur-sm hover:shadow-teal-500/20 transition-all duration-300 hover:scale-105 border-0"
                  onMouseEnter={() => handleCardHover(item)}
                  onMouseLeave={handleCardLeave}
                >
                  <div className="h-64 overflow-hidden relative">
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
                  <CardContent className="p-6 text-white">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-poppins font-semibold text-xl">{item.name}</h3>
                      <span className="text-teal-400 font-bold">{item.price}</span>
                    </div>
                    <p className="text-gray-300 mb-4">
                      {item.description}
                    </p>
                    {item.tags && item.tags.length > 0 && (
                      <div className="flex items-center">
                        {item.tags[0].icon}
                        <span className="text-sm ml-2 text-gray-200">{item.tags[0].text}</span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </animated.div>
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
