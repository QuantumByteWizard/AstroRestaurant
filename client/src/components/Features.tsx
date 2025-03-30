import { Music, Umbrella, GlassWater } from "lucide-react";

const features = [
  {
    icon: <Music className="h-6 w-6 text-dark" />,
    title: "Live Music Evenings",
    description: "Enjoy soothing melodies during dinner hours on Friday and Saturday evenings, featuring local musicians."
  },
  {
    icon: <Umbrella className="h-6 w-6 text-dark" />,
    title: "Private Beach Dinners",
    description: "Experience a romantic dinner right on the beach with personalized service and a special menu. Advance reservation required."
  },
  {
    icon: <GlassWater className="h-6 w-6 text-dark" />,
    title: "Small Events Hosting",
    description: "Celebrate special occasions with us! We can host small events, birthdays, and intimate gatherings with customized menus."
  }
];

const Features = () => {
  return (
    <section id="features" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h2 className="font-poppins font-bold text-3xl md:text-4xl mb-6 inline-block relative">
            <span className="inline-block relative z-10">Special Features</span>
            <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-2 bg-primary z-0"></span>
          </h2>
          <p className="text-lg max-w-3xl mx-auto">
            Enhance your dining experience with our special offerings
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-gray-50 p-8 rounded-lg text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                {feature.icon}
              </div>
              <h3 className="font-poppins font-semibold text-xl mb-4">{feature.title}</h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
