import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';

interface LobsterModelProps {
  className?: string;
}

const LobsterModel = ({ className = "" }: LobsterModelProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const lobsterRef = useRef<THREE.Group | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  
  // Initialize the 3D scene
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Set up scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    
    // Set up camera
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    cameraRef.current = camera;
    
    // Set up renderer with transparency
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true,
      antialias: true
    });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setClearColor(0x000000, 0); // Transparent background
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;
    
    // Create a simple lobster model using basic shapes
    const lobsterGroup = new THREE.Group();
    
    // Lobster body (main part)
    const bodyGeometry = new THREE.CapsuleGeometry(0.5, 1.2, 4, 8);
    const bodyMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xD32F2F, // Red color for lobster
      roughness: 0.7,
      metalness: 0.2
    });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.rotation.z = Math.PI / 2; // Rotate to horizontal position
    lobsterGroup.add(body);
    
    // Lobster head
    const headGeometry = new THREE.SphereGeometry(0.4, 16, 16);
    const headMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xC62828, // Slightly darker red
      roughness: 0.7,
      metalness: 0.2
    });
    const head = new THREE.Mesh(headGeometry, headMaterial);
    head.position.x = 0.9;
    head.scale.set(1.1, 0.8, 0.8);
    lobsterGroup.add(head);
    
    // Lobster tail
    const tailGeometry = new THREE.ConeGeometry(0.4, 1, 8);
    const tailMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xE53935, // Slightly lighter red
      roughness: 0.7,
      metalness: 0.2
    });
    const tail = new THREE.Mesh(tailGeometry, tailMaterial);
    tail.position.x = -1.1;
    tail.rotation.z = -Math.PI / 2;
    tail.scale.set(0.8, 1, 0.6);
    lobsterGroup.add(tail);
    
    // Lobster claws
    const clawGeometry = new THREE.BoxGeometry(0.4, 0.2, 0.15);
    const clawMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xB71C1C, // Deep red
      roughness: 0.6,
      metalness: 0.3
    });
    
    // Right claw
    const rightClaw = new THREE.Mesh(clawGeometry, clawMaterial);
    rightClaw.position.set(0.9, 0.5, 0);
    rightClaw.scale.set(1.5, 1, 1);
    lobsterGroup.add(rightClaw);
    
    // Left claw
    const leftClaw = new THREE.Mesh(clawGeometry, clawMaterial);
    leftClaw.position.set(0.9, -0.5, 0);
    leftClaw.scale.set(1.5, 1, 1);
    lobsterGroup.add(leftClaw);
    
    // Lobster legs (6 pairs)
    const legGeometry = new THREE.CylinderGeometry(0.05, 0.03, 0.8, 8);
    const legMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xC62828, 
      roughness: 0.8,
      metalness: 0.1
    });
    
    for (let i = 0; i < 6; i++) {
      // Right leg
      const rightLeg = new THREE.Mesh(legGeometry, legMaterial);
      rightLeg.position.set(0.2 - i * 0.3, 0.6, 0);
      rightLeg.rotation.z = Math.PI / 4; // Angle legs outward
      lobsterGroup.add(rightLeg);
      
      // Left leg
      const leftLeg = new THREE.Mesh(legGeometry, legMaterial);
      leftLeg.position.set(0.2 - i * 0.3, -0.6, 0);
      leftLeg.rotation.z = -Math.PI / 4; // Angle legs outward
      lobsterGroup.add(leftLeg);
    }
    
    // Antennae
    const antennaGeometry = new THREE.CylinderGeometry(0.02, 0.01, 1.2, 8);
    const antennaMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xC62828, 
      roughness: 0.8,
      metalness: 0.1
    });
    
    // Right antenna
    const rightAntenna = new THREE.Mesh(antennaGeometry, antennaMaterial);
    rightAntenna.position.set(1.2, 0.2, 0);
    rightAntenna.rotation.z = -Math.PI / 4;
    lobsterGroup.add(rightAntenna);
    
    // Left antenna
    const leftAntenna = new THREE.Mesh(antennaGeometry, antennaMaterial);
    leftAntenna.position.set(1.2, -0.2, 0);
    leftAntenna.rotation.z = Math.PI / 4;
    lobsterGroup.add(leftAntenna);
    
    // Initial position - outside the view
    lobsterGroup.position.x = -10; // Start from left side, off-screen
    lobsterGroup.position.y = -1;  // Slightly below center
    lobsterGroup.rotation.y = Math.PI / 6; // Slight rotation for 3D effect
    
    // Add to scene
    scene.add(lobsterGroup);
    lobsterRef.current = lobsterGroup;
    
    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);
    
    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current || !rendererRef.current || !cameraRef.current) return;
      
      cameraRef.current.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      if (lobsterRef.current) {
        // Gentle floating movement
        lobsterRef.current.rotation.z = Math.sin(Date.now() * 0.001) * 0.05;
        
        // Gentle up and down movement
        lobsterRef.current.position.y += Math.sin(Date.now() * 0.002) * 0.001;
      }
      
      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };
    
    animate();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      
      if (containerRef.current && rendererRef.current?.domElement) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }
      
      // Dispose of resources
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          
          if (object.material instanceof THREE.Material) {
            object.material.dispose();
          } else if (Array.isArray(object.material)) {
            object.material.forEach(material => material.dispose());
          }
        }
      });
      
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
    };
  }, []);
  
  // Animate the lobster into position using GSAP
  useGSAP(() => {
    if (lobsterRef.current) {
      // Animate the lobster coming in from left to right
      gsap.to(lobsterRef.current.position, {
        x: 2, // Final position slightly to the right of center
        duration: 2.5,
        ease: "power2.out",
        delay: 0.8 // Wait a bit after page load
      });
      
      // Add a slight bounce effect
      gsap.to(lobsterRef.current.rotation, {
        y: Math.PI / 12, // Final slight rotation
        duration: 2.8,
        ease: "elastic.out(1, 0.5)"
      });
      
      // Scale up from smaller size
      gsap.from(lobsterRef.current.scale, {
        x: 0.5,
        y: 0.5,
        z: 0.5,
        duration: 2,
        ease: "back.out(1.7)",
        delay: 0.8
      });
    }
  }, []);
  
  return (
    <div 
      ref={containerRef} 
      className={`absolute inset-0 ${className}`}
      style={{ pointerEvents: 'none' }}
    />
  );
};

export default LobsterModel;
