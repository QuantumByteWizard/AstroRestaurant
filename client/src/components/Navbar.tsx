import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle navbar style change on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className={`py-4 px-6 md:px-10 fixed top-0 w-full z-30 transition-all duration-300 ease-in-out ${
      isScrolled 
        ? "bg-white/95 shadow-sm" 
        : "bg-transparent"
    }`}>
      <div className="container mx-auto flex justify-between items-center">
        <a href="#" className={`text-xl md:text-2xl font-poppins font-bold ${
          isScrolled ? "text-dark" : "text-white"
        }`}>
          Astro Restaurant
        </a>
        
        {/* Mobile Menu Button */}
        <Button 
          variant="ghost"
          size="icon"
          onClick={toggleMenu}
          className={`md:hidden ${isScrolled ? "text-dark" : "text-white"}`}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X /> : <Menu />}
        </Button>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8">
          {["About", "Menu", "Features", "Gallery", "Book", "Contact"].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`} 
              className={`hover:text-primary transition-colors ${
                isScrolled ? "text-dark" : "text-white"
              }`}
            >
              {item}
            </a>
          ))}
        </div>
      </div>
      
      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 bg-white rounded-lg shadow-lg p-4 absolute left-0 right-0 mx-4">
          <div className="flex flex-col space-y-3">
            {["About", "Menu", "Features", "Gallery", "Book", "Contact"].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                className="text-dark hover:text-primary transition-colors"
                onClick={closeMenu}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
