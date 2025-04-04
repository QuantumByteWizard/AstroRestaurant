import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section 
      className="relative h-screen bg-cover bg-center" 
      style={{ 
        backgroundImage: `url('https://images.unsplash.com/photo-1540202404-1b927e27fa8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80')`
      }}
    >
      <div className="absolute inset-0 bg-black/40"></div>
      <div className="container mx-auto px-6 md:px-12 relative z-10 flex items-center h-full">
        <div className="text-white text-center md:text-left w-full md:w-2/3">
          <h1 className="font-poppins font-bold text-4xl md:text-5xl lg:text-6xl mb-4">
            Astro Restaurant
          </h1>
          <p className="text-xl md:text-2xl mb-8 font-light">
            Authentic Maldivian seafood experience in the heart of Thoddoo
          </p>
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
        </div>
      </div>
    </section>
  );
};

export default Hero;
