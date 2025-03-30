import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FaFacebookF, FaInstagram, FaTripadvisor, FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  return (
    <footer className="bg-black text-white py-12">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="font-poppins font-bold text-xl mb-6">Astro Restaurant</h3>
            <p className="text-gray-300 mb-6">
              Authentic Maldivian seafood experience in the heart of Thoddoo.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-primary transition" aria-label="Facebook">
                <FaFacebookF className="text-lg" />
              </a>
              <a href="#" className="text-gray-300 hover:text-primary transition" aria-label="Instagram">
                <FaInstagram className="text-lg" />
              </a>
              <a href="#" className="text-gray-300 hover:text-primary transition" aria-label="Tripadvisor">
                <FaTripadvisor className="text-lg" />
              </a>
              <a href="#" className="text-gray-300 hover:text-primary transition" aria-label="WhatsApp">
                <FaWhatsapp className="text-lg" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-poppins font-semibold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {["About Us", "Menu", "Special Features", "Gallery", "Book a Table"].map((link, index) => (
                <li key={index}>
                  <a 
                    href={`#${link.toLowerCase().replace(/\s+/g, '')}`} 
                    className="text-gray-300 hover:text-primary transition"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-poppins font-semibold text-lg mb-6">Opening Hours</h4>
            <ul className="space-y-3 text-gray-300">
              {weekdays.map((day, index) => (
                <li key={index}>{day}: 11:00 AM - 10:00 PM</li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-poppins font-semibold text-lg mb-6">Newsletter</h4>
            <p className="text-gray-300 mb-4">Subscribe to get updates on special events and offers.</p>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <Input 
                  type="email" 
                  placeholder="Your email" 
                  className="bg-gray-900 border-gray-800 text-white"
                />
              </div>
              <Button 
                type="submit" 
                className="bg-primary hover:bg-primary/90 text-dark font-semibold"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-gray-900 mt-12 pt-8 text-center">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} Astro Restaurant. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
