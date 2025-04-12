import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Menu from "@/components/Menu";
import Features from "@/components/Features";
import Gallery from "@/components/Gallery";
import BookingForm from "@/components/BookingForm";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { useEffect } from "react";
import { initAnimations, animateText } from "@/lib/animations";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

const Home = () => {
  // Initialize GSAP animations
  useGSAP(() => {
    // Apply initial animations to page elements
    gsap.set('.hero-title, .section-title', { opacity: 0, y: 30 });
    gsap.set('.fade-up', { opacity: 0, y: 20 });
    gsap.set('.scale-in', { opacity: 0, scale: 0.9 });
    
    // Reveal hero section immediately
    gsap.to('.hero-title', {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: "power3.out",
      delay: 0.3,
    });
    
    // Initialize all section and scroll animations
    initAnimations();
    
    // Apply text animations to headlines
    document.querySelectorAll('.animate-text').forEach(element => {
      animateText(element, 0.05, 0.3);
    });
  }, []);

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Menu />
        <Features />
        <Gallery />
        <BookingForm />
        <Contact />
      </main>
      <Footer />
      {/* Overlay for custom cursor interactions */}
      <div className="fixed inset-0 pointer-events-none z-[9998]"></div>
    </div>
  );
};

export default Home;
