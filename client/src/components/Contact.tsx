import { MapPin, Clock, Phone } from "lucide-react";

const contactInfo = [
  {
    icon: <MapPin className="h-6 w-6 text-dark" />,
    title: "Location",
    details: ["Center of Thoddoo,", "Thoddoo Island, Maldives"],
    action: { text: "View on map", link: "#" }
  },
  {
    icon: <Clock className="h-6 w-6 text-dark" />,
    title: "Opening Hours",
    details: ["Daily", "11:00 AM - 10:00 PM"]
  },
  {
    icon: <Phone className="h-6 w-6 text-dark" />,
    title: "Contact",
    details: ["Phone: +960 XXX-XXXX", "WhatsApp: +960 XXX-XXXX", "Email: info@astrorestaurant.mv"]
  }
];

const Contact = () => {
  return (
    <section id="contact" className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h2 className="font-poppins font-bold text-3xl md:text-4xl mb-6 inline-block relative">
            <span className="inline-block relative z-10">Contact & Hours</span>
            <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-2 bg-primary z-0"></span>
          </h2>
          <p className="text-lg max-w-3xl mx-auto">
            We look forward to welcoming you to Astro Restaurant
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row justify-center space-y-8 md:space-y-0 md:space-x-12">
          {contactInfo.map((item, index) => (
            <div key={index} className="bg-white p-8 rounded-lg shadow-md text-center flex-1 max-w-sm mx-auto">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                {item.icon}
              </div>
              <h3 className="font-poppins font-semibold text-xl mb-4">{item.title}</h3>
              <p className="text-gray-600 mb-2">
                {item.details.map((detail, i) => (
                  <span key={i} className="block">{detail}</span>
                ))}
              </p>
              {item.action && (
                <a href={item.action.link} className="text-secondary hover:text-primary transition">
                  {item.action.text}
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Contact;
