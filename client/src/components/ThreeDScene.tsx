import { useRef, useEffect, useState } from "react";
import * as THREE from "three";

interface ThreeDSceneProps {
  className?: string;
}

const ThreeDScene: React.FC<ThreeDSceneProps> = ({ className = "" }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Initialize scene, camera, and renderer
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a0a);
    
    const camera = new THREE.PerspectiveCamera(
      75, 
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    containerRef.current.appendChild(renderer.domElement);
    
    // Create food items
    const foodItems: THREE.Mesh[] = [];
    const foodGeometries = [
      new THREE.SphereGeometry(0.3, 32, 32), // Fish
      new THREE.CylinderGeometry(0.15, 0.15, 0.5, 32), // Shrimp
      new THREE.TorusGeometry(0.3, 0.1, 16, 100) // Calamari ring
    ];
    
    const foodMaterials = [
      new THREE.MeshStandardMaterial({ color: 0xff9500 }), // Orange
      new THREE.MeshStandardMaterial({ color: 0xf25c54 }), // Coral red
      new THREE.MeshStandardMaterial({ color: 0xffccd5 }) // Light pink
    ];
    
    // Create 12 random food items
    for (let i = 0; i < 12; i++) {
      const geometryIndex = Math.floor(Math.random() * foodGeometries.length);
      const materialIndex = Math.floor(Math.random() * foodMaterials.length);
      
      const food = new THREE.Mesh(
        foodGeometries[geometryIndex],
        foodMaterials[materialIndex]
      );
      
      // Random position
      food.position.x = (Math.random() - 0.5) * 10;
      food.position.y = (Math.random() - 0.5) * 10;
      food.position.z = (Math.random() - 0.5) * 5;
      
      scene.add(food);
      foodItems.push(food);
    }
    
    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    // Add point light
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);
    
    // Mouse movement handler
    const handleMouseMove = (event: MouseEvent) => {
      // Calculate mouse position in normalized device coordinates
      // (-1 to +1) for both components
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;
      
      setMousePosition({ x, y });
    };
    
    // Resize handler
    const handleResize = () => {
      if (!containerRef.current) return;
      
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };
    
    // Add event listeners
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Update food items to follow cursor with delay
      foodItems.forEach((food, index) => {
        // Each food item follows with different speed for nice effect
        const speed = 0.01 + (index % 5) * 0.003;
        
        // Move towards mouse position
        food.position.x += (mousePosition.x * 5 - food.position.x) * speed;
        food.position.y += (mousePosition.y * 5 - food.position.y) * speed;
        
        // Add some rotation for visual interest
        food.rotation.x += 0.005;
        food.rotation.y += 0.005;
      });
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Cleanup
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      
      // Dispose of Three.js resources
      foodGeometries.forEach(geometry => geometry.dispose());
      foodMaterials.forEach(material => material.dispose());
      
      renderer.dispose();
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);
  
  return (
    <div 
      ref={containerRef} 
      className={`absolute inset-0 z-0 ${className}`}
    />
  );
};

export default ThreeDScene;