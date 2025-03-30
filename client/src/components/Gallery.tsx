const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1578791503144-cdeeaaeae255?ixlib=rb-4.0.3&auto=format&fit=crop&w=1480&q=80",
    alt: "Restaurant outdoor seating"
  },
  {
    src: "https://images.unsplash.com/photo-1523032217284-d9e49d6c5f04?ixlib=rb-4.0.3&auto=format&fit=crop&w=1480&q=80",
    alt: "Fresh seafood platter"
  },
  {
    src: "https://images.unsplash.com/photo-1512604151263-f5c6981a9f20?ixlib=rb-4.0.3&auto=format&fit=crop&w=1480&q=80",
    alt: "Maldivian beach view"
  },
  {
    src: "https://images.unsplash.com/photo-1551059700-f5d79873a007?ixlib=rb-4.0.3&auto=format&fit=crop&w=1480&q=80",
    alt: "Chef preparing food"
  },
  {
    src: "https://images.unsplash.com/photo-1525857597365-5d81ae67eb2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1480&q=80",
    alt: "Live music evening"
  },
  {
    src: "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1480&q=80",
    alt: "Beach dinner setup"
  }
];

const Gallery = () => {
  return (
    <section id="gallery" className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h2 className="font-poppins font-bold text-3xl md:text-4xl mb-6 inline-block relative">
            <span className="inline-block relative z-10">Gallery</span>
            <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-2 bg-primary z-0"></span>
          </h2>
          <p className="text-lg max-w-3xl mx-auto">
            Experience the atmosphere and culinary delights of Astro Restaurant
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image, index) => (
            <div 
              key={index} 
              className="rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group"
            >
              <div className="overflow-hidden">
                <img 
                  src={image.src} 
                  alt={image.alt} 
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
