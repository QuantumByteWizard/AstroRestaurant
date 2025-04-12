import { gsap } from "gsap";

// We'll import plugins directly from GSAP when we need them in the component
// For now, we'll use the basic functionality

// Custom GSAP easing functions
const easing = {
  smooth: "power3.out",
  smoothIn: "power3.in",
  smoothInOut: "power3.inOut",
  expo: "expo.out",
  expoIn: "expo.in",
  expoInOut: "expo.inOut",
  elastic: "elastic.out(1, 0.3)",
  bounce: "bounce.out",
};

// Text animation helpers
export const animateText = (
  element: string | Element,
  staggerTime = 0.03,
  delay = 0
) => {
  // Get all elements matching the selector if a string is provided
  const targets = typeof element === "string" ? document.querySelectorAll(element) : [element];
  
  targets.forEach((target) => {
    if (!target) return;
    
    // Split text into words
    const text = target.textContent || "";
    target.textContent = "";
    
    // Create spans for each word
    const words = text.split(" ");
    words.forEach((word, index) => {
      const wordSpan = document.createElement("span");
      wordSpan.textContent = word + (index < words.length - 1 ? " " : "");
      wordSpan.style.display = "inline-block";
      wordSpan.style.opacity = "0";
      wordSpan.style.transform = "translateY(20px)";
      target.appendChild(wordSpan);
    });
    
    // Animate each word
    gsap.to(target.children, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: staggerTime,
      ease: easing.expo,
      delay,
    });
  });
};

// Entrance animations for sections
export const animateSection = (selector: string) => {
  // Create an intersection observer for triggering animations
  const section = document.querySelector(selector);
  if (!section) return;
  
  // Hide initially
  gsap.set(section, { opacity: 0, y: 50 });
  
  // Get direct children to stagger animate
  const children = section.querySelectorAll(':scope > *');
  gsap.set(children, { opacity: 0, y: 30 });
  
  // Create intersection observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Animate the section container
        gsap.to(section, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: easing.smooth,
        });
        
        // Animate children with staggered effect
        gsap.to(children, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: easing.smooth,
        });
        
        // Unobserve after animation
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  
  // Start observing
  observer.observe(section);
};

// Hover animations for menu items
export const applyMenuItemHover = (item: Element) => {
  const timeline = gsap.timeline({ paused: true });
  
  // Enhanced scale and shadow effect
  timeline.to(item, {
    y: -8,
    scale: 1.02,
    duration: 0.4,
    ease: "back.out(1.7)",
    boxShadow: "0 15px 30px rgba(0, 200, 200, 0.1), 0 5px 15px rgba(0, 200, 200, 0.05)",
  });
  
  // Find image and info elements inside the menu item
  const image = item.querySelector('.menu-item-image img');
  const info = item.querySelector('.menu-item-info');
  const ingredient = item.querySelector('.menu-item-ingredients');
  const title = item.querySelector('h3');
  const price = item.querySelector('.menu-item-info span');
  
  if (image) {
    timeline.to(image, {
      scale: 1.1,
      rotate: 1,
      duration: 0.6,
      ease: "power2.out",
    }, 0); // start at the same time
  }
  
  if (info) {
    timeline.to(info, {
      y: -5,
      duration: 0.4,
      ease: easing.smooth,
    }, 0);
  }
  
  if (title) {
    timeline.to(title, {
      color: "#38b2ac", // teal-500
      duration: 0.3,
      ease: "sine.out",
    }, 0);
  }
  
  if (price) {
    timeline.to(price, {
      scale: 1.1,
      duration: 0.3,
      ease: "back.out(1.5)",
    }, 0.1);
  }
  
  if (ingredient) {
    timeline.to(ingredient, {
      opacity: 1,
      y: 0,
      duration: 0.4,
      ease: easing.smooth,
    }, 0.1); // slight delay
  }
  
  // Attach event listeners
  item.addEventListener('mouseenter', () => timeline.play());
  item.addEventListener('mouseleave', () => timeline.reverse());
};

// Floating animation for backgrounds
export const createFloatingAnimation = (element: string | Element, options = {}) => {
  const defaults = {
    duration: 3,
    amplitude: 15, // How far it moves
    randomFactor: 0.5, // Randomness in the movement
  };
  
  const config = { ...defaults, ...options };
  const target = typeof element === "string" ? document.querySelector(element) : element;
  
  if (!target) return;
  
  // Starting random position
  const startX = Math.random() * config.amplitude * config.randomFactor;
  const startY = Math.random() * config.amplitude * config.randomFactor;
  
  // Create random endpoints
  const endX = startX + (Math.random() * 2 - 1) * config.amplitude;
  const endY = startY + (Math.random() * 2 - 1) * config.amplitude;
  
  // Create timeline
  const tl = gsap.timeline({
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
  });
  
  tl.to(target, {
    x: endX,
    y: endY,
    duration: config.duration,
    ease: "sine.inOut",
  });
  
  return tl;
};

// Parallax effect for backgrounds using IntersectionObserver
export const createParallaxEffect = (element: string, amount = 0.1) => {
  const target = document.querySelector(element);
  if (!target) return;
  
  let lastScrollTop = 0;
  
  // Use window scroll event instead of ScrollTrigger
  const handleScroll = () => {
    const rect = target.getBoundingClientRect();
    const isInView = rect.top < window.innerHeight && rect.bottom > 0;
    
    if (isInView) {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const direction = scrollTop > lastScrollTop ? 1 : -1;
      const scrollDiff = Math.abs(scrollTop - lastScrollTop);
      const maxScroll = 20; // Cap the movement
      
      const moveAmount = Math.min(scrollDiff * amount, maxScroll) * direction;
      
      gsap.to(target, {
        y: `+=${moveAmount}`,
        duration: 0.5,
        ease: "power1.out",
        overwrite: "auto"
      });
      
      lastScrollTop = scrollTop;
    }
  };
  
  window.addEventListener('scroll', handleScroll);
  
  // Return cleanup function to remove event listener
  return () => window.removeEventListener('scroll', handleScroll);
};

// Cursor effect
export const initCustomCursor = () => {
  const cursor = document.createElement('div');
  cursor.className = 'custom-cursor';
  document.body.appendChild(cursor);
  
  // Default cursor styles
  gsap.set(cursor, {
    width: 20,
    height: 20,
    borderRadius: '50%',
    backgroundColor: 'rgba(var(--primary-rgb), 0.3)',
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: 'var(--primary)',
    position: 'fixed',
    pointerEvents: 'none',
    zIndex: 9999,
    mixBlendMode: 'difference',
  });
  
  // Move cursor with mouse
  window.addEventListener('mousemove', (e) => {
    gsap.to(cursor, {
      x: e.clientX - 10, // Center the cursor
      y: e.clientY - 10,
      duration: 0.1,
      ease: "power1.out"
    });
  });
  
  // Interactivity - scale up on hover over buttons, links, etc.
  const interactiveElements = document.querySelectorAll('a, button, [data-cursor-interact]');
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      gsap.to(cursor, {
        width: 40,
        height: 40,
        opacity: 0.8,
        duration: 0.3
      });
    });
    
    el.addEventListener('mouseleave', () => {
      gsap.to(cursor, {
        width: 20,
        height: 20,
        opacity: 1,
        duration: 0.3
      });
    });
  });
};

// Smooth scrolling for anchor links
export const initSmoothScrolling = () => {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      
      const element = e.currentTarget as HTMLAnchorElement;
      const targetId = element.getAttribute('href');
      if (!targetId || targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (!targetElement) return;
      
      const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
      
      // Simple smooth scroll without GSAP ScrollToPlugin
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    });
  });
};

// Initialize all animations
export const initAnimations = () => {
  // Initialize custom cursor and smooth scrolling
  initCustomCursor();
  initSmoothScrolling();
  
  // Apply section animations
  const sections = ['#about', '#menu', '#features', '#gallery', '#book', '#contact'];
  sections.forEach(section => {
    animateSection(section);
  });
  
  // Apply menu hover interactions
  document.querySelectorAll('.menu-item').forEach(item => {
    applyMenuItemHover(item);
  });
  
  // Apply floating animations to background elements
  document.querySelectorAll('.floating-element').forEach(el => {
    createFloatingAnimation(el);
  });
};

// Character-by-character text animation
export const animateCharacters = (element: string | Element, options = {}) => {
  const defaults = {
    staggerTime: 0.02,
    duration: 0.5,
    ease: easing.smooth,
    delay: 0,
    y: 20,
    opacity: 0
  };
  
  const config = { ...defaults, ...options };
  const targets = typeof element === "string" ? document.querySelectorAll(element) : [element];
  
  targets.forEach(target => {
    if (!target) return;
    
    // Get the original text
    const text = target.textContent || "";
    target.textContent = "";
    
    // Create a span for each character
    const chars = text.split("");
    chars.forEach(char => {
      const charSpan = document.createElement("span");
      charSpan.textContent = char;
      charSpan.classList.add("char");
      target.appendChild(charSpan);
    });
    
    // Create animation for each character
    gsap.from(target.querySelectorAll('.char'), {
      opacity: config.opacity,
      y: config.y,
      duration: config.duration,
      stagger: config.staggerTime,
      ease: config.ease,
      delay: config.delay,
    });
  });
};

// Split text into lines and animate
export const splitTextIntoLines = (element: string | Element, options = {}) => {
  const defaults = {
    staggerTime: 0.15,
    duration: 0.8,
    ease: easing.smooth,
    delay: 0
  };
  
  const config = { ...defaults, ...options };
  const target = typeof element === "string" ? document.querySelector(element) : element;
  
  if (!target) return;
  
  // Get original text and container width
  const text = target.textContent || "";
  const containerWidth = target.clientWidth;
  target.textContent = "";
  
  // Create container for lines
  const linesContainer = document.createElement("div");
  linesContainer.style.position = "relative";
  linesContainer.style.overflow = "hidden";
  target.appendChild(linesContainer);
  
  // Create a temporary element to measure words
  const tempEl = document.createElement("div");
  tempEl.style.position = "absolute";
  tempEl.style.visibility = "hidden";
  tempEl.style.whiteSpace = "nowrap";
  document.body.appendChild(tempEl);
  
  const words = text.split(" ");
  let lines: string[] = [];
  let currentLine = "";
  
  // Calculate where line breaks should occur
  words.forEach(word => {
    tempEl.textContent = currentLine + " " + word;
    if (tempEl.clientWidth > containerWidth && currentLine !== "") {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine += (currentLine ? " " : "") + word;
    }
  });
  
  if (currentLine) {
    lines.push(currentLine);
  }
  
  // Clean up temp element
  document.body.removeChild(tempEl);
  
  // Create line elements with reveal animation
  lines.forEach((line, index) => {
    const lineEl = document.createElement("div");
    lineEl.className = "text-reveal-line";
    lineEl.style.overflow = "hidden";
    lineEl.style.position = "relative";
    
    const textEl = document.createElement("div");
    textEl.textContent = line;
    textEl.style.display = "inline-block";
    textEl.style.transform = "translateY(100%)";
    
    lineEl.appendChild(textEl);
    linesContainer.appendChild(lineEl);
    
    // Animate each line with staggered timing
    gsap.to(textEl, {
      y: 0,
      duration: config.duration,
      delay: config.delay + index * config.staggerTime,
      ease: config.ease,
    });
  });
};

// Reveal elements as they enter viewport
export const createScrollRevealAnimation = (selector: string, options = {}) => {
  const defaults = {
    origin: 'bottom',
    distance: '30px',
    duration: 0.8,
    delay: 0,
    interval: 0.1,
  };
  
  const config = { ...defaults, ...options };
  const elements = document.querySelectorAll(selector);
  
  if (elements.length === 0) return;
  
  elements.forEach((el, index) => {
    // Initial state
    let startProps: any = { opacity: 0 };
    
    switch (config.origin) {
      case 'left':
        startProps.x = `-${config.distance}`;
        break;
      case 'right':
        startProps.x = config.distance;
        break;
      case 'top':
        startProps.y = `-${config.distance}`;
        break;
      default: // bottom
        startProps.y = config.distance;
    }
    
    gsap.set(el, startProps);
    
    // Create IntersectionObserver to trigger animation
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const delay = config.delay + (index * config.interval);
            
            gsap.to(entry.target, {
              opacity: 1,
              x: 0,
              y: 0,
              duration: config.duration,
              delay,
              ease: "power2.out",
              onComplete: () => observer.unobserve(entry.target)
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    
    observer.observe(el);
  });
};

export default {
  easing,
  animateText,
  animateSection,
  applyMenuItemHover,
  createFloatingAnimation,
  createParallaxEffect,
  initAnimations,
  animateCharacters,
  splitTextIntoLines,
  createScrollRevealAnimation
};