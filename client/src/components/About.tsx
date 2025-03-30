const About = () => {
  return (
    <section id="about" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 mb-10 md:mb-0">
            <img 
              src="https://images.unsplash.com/photo-1521305916504-4a1121188589?ixlib=rb-4.0.3&auto=format&fit=crop&w=1480&q=80" 
              alt="Outdoor dining at Astro Restaurant" 
              className="rounded-lg shadow-xl w-full h-auto object-cover"
            />
          </div>
          <div className="w-full md:w-1/2 md:pl-12">
            <h2 className="font-poppins font-bold text-3xl md:text-4xl mb-6 relative">
              <span className="inline-block relative z-10">About Us</span>
              <span className="absolute -bottom-2 left-0 w-16 h-2 bg-primary z-0"></span>
            </h2>
            <p className="text-lg mb-6 leading-relaxed">
              Nestled in the heart of Thoddoo island, Astro Restaurant offers an authentic Maldivian seafood experience that celebrates the rich flavors of the Indian Ocean.
            </p>
            <p className="text-lg mb-6 leading-relaxed">
              Our menu features the freshest catch of the day, with our signature grilled octopus being a must-try! We pride ourselves on offering vegetarian and halal options to cater to all our guests.
            </p>
            <p className="text-lg leading-relaxed">
              Enjoy your meal in our cozy outdoor setup, where the gentle sea breeze and tropical atmosphere create the perfect dining environment for families and friends alike.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
