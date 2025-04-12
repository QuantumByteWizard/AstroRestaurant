import { useRef, useEffect } from 'react';
import * as THREE from 'three';

interface InteractiveBackgroundProps {
  className?: string;
  color?: string;
  density?: number;
  interactivity?: number;
}

const InteractiveBackground: React.FC<InteractiveBackgroundProps> = ({
  className = "",
  color = "#fbbf24", // Amber-400
  density = 30,
  interactivity = 0.5
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    
    // Set up scene
    const scene = new THREE.Scene();
    
    // Set up camera
    const camera = new THREE.PerspectiveCamera(
      75,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    
    // Set up renderer with transparency
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true,
      antialias: true
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000000, 0); // Transparent background
    container.appendChild(renderer.domElement);
    
    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = density * 10;
    
    const positions = new Float32Array(particleCount * 3);
    const velocities: THREE.Vector3[] = [];
    const sizes = new Float32Array(particleCount);
    
    const colorObj = new THREE.Color(color);
    const colors = new Float32Array(particleCount * 3);
    
    // Generate random particles
    for (let i = 0; i < particleCount; i++) {
      // Position
      const x = Math.random() * 20 - 10;
      const y = Math.random() * 20 - 10;
      const z = Math.random() * 10 - 5;
      
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      
      // Velocity
      velocities.push(new THREE.Vector3(
        (Math.random() - 0.5) * 0.01,
        (Math.random() - 0.5) * 0.01,
        (Math.random() - 0.5) * 0.01
      ));
      
      // Size
      sizes[i] = Math.random() * 0.1 + 0.05;
      
      // Color with slight variation
      const hue = new THREE.Color(color);
      const variation = (Math.random() - 0.5) * 0.1;
      hue.offsetHSL(variation, variation, variation);
      
      colors[i * 3] = hue.r;
      colors[i * 3 + 1] = hue.g;
      colors[i * 3 + 2] = hue.b;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    particlesGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    
    // Create particle material
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.1,
      transparent: true,
      opacity: 0.7,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });
    
    // Create particle system
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);
    
    // Handle window resize
    const handleResize = () => {
      if (!container) return;
      
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Update particles
      const positions = particlesGeometry.attributes.position.array as Float32Array;
      
      for (let i = 0; i < particleCount; i++) {
        // Apply velocity
        positions[i * 3] += velocities[i].x;
        positions[i * 3 + 1] += velocities[i].y;
        positions[i * 3 + 2] += velocities[i].z;
        
        // Add some natural movement
        velocities[i].x += (Math.random() - 0.5) * 0.001;
        velocities[i].y += (Math.random() - 0.5) * 0.001;
        velocities[i].z += (Math.random() - 0.5) * 0.001;
        
        // Dampen velocity
        velocities[i].x *= 0.99;
        velocities[i].y *= 0.99;
        velocities[i].z *= 0.99;
        
        // Boundary check and wraparound
        if (positions[i * 3] > 10) positions[i * 3] = -10;
        if (positions[i * 3] < -10) positions[i * 3] = 10;
        if (positions[i * 3 + 1] > 10) positions[i * 3 + 1] = -10;
        if (positions[i * 3 + 1] < -10) positions[i * 3 + 1] = 10;
        if (positions[i * 3 + 2] > 5) positions[i * 3 + 2] = -5;
        if (positions[i * 3 + 2] < -5) positions[i * 3 + 2] = 5;
      }
      
      particlesGeometry.attributes.position.needsUpdate = true;
      
      // Gentle rotation of the entire particle system
      particles.rotation.x += 0.0003;
      particles.rotation.y += 0.0005;
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Cleanup
    return () => {
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      
      window.removeEventListener('resize', handleResize);
      
      // Dispose of resources
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      renderer.dispose();
    };
  }, [color, density, interactivity]);
  
  return (
    <div 
      ref={containerRef} 
      className={`absolute inset-0 ${className}`}
      style={{ pointerEvents: 'none', zIndex: -1 }}
    />
  );
};

export default InteractiveBackground;