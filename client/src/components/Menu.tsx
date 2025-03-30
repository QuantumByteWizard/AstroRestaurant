import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Flame, Leaf, AlertCircle } from "lucide-react";

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
  }
];

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState<MenuCategory>("seafood");

  return (
    <section id="menu" className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h2 className="font-poppins font-bold text-3xl md:text-4xl mb-6 inline-block relative">
            <span className="inline-block relative z-10">Our Menu</span>
            <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-2 bg-primary z-0"></span>
          </h2>
          <p className="text-lg max-w-3xl mx-auto">
            From the freshest seafood to delightful vegetarian dishes, our menu offers something for everyone. Available for lunch and dinner daily.
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <Button
            variant={activeCategory === "seafood" ? "default" : "outline"}
            className={activeCategory === "seafood" ? "bg-primary hover:bg-primary/90 text-dark" : ""}
            onClick={() => setActiveCategory("seafood")}
          >
            Seafood
          </Button>
          <Button
            variant={activeCategory === "vegetarian" ? "default" : "outline"}
            className={activeCategory === "vegetarian" ? "bg-primary hover:bg-primary/90 text-dark" : ""}
            onClick={() => setActiveCategory("vegetarian")}
          >
            Vegetarian
          </Button>
          <Button
            variant={activeCategory === "halal" ? "default" : "outline"}
            className={activeCategory === "halal" ? "bg-primary hover:bg-primary/90 text-dark" : ""}
            onClick={() => setActiveCategory("halal")}
          >
            Halal Options
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {menuItems.map((item) => (
            <Card key={item.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
              <div className="h-64 overflow-hidden relative">
                {item.isSignature && (
                  <Badge className="absolute top-4 right-4 bg-primary text-dark font-semibold z-10">
                    Signature
                  </Badge>
                )}
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-poppins font-semibold text-xl">{item.name}</h3>
                  <span className="text-accent font-bold">{item.price}</span>
                </div>
                <p className="text-gray-600 mb-4">
                  {item.description}
                </p>
                {item.tags && item.tags.length > 0 && (
                  <div className="flex items-center">
                    {item.tags[0].icon}
                    <span className="text-sm ml-2">{item.tags[0].text}</span>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button variant="outline" className="border-primary text-dark hover:bg-primary hover:text-dark">
            View Full Menu
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Menu;
