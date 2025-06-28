import React, { Suspense, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, useGLTF } from '@react-three/drei';
import { Group as ThreeGroup } from 'three';

interface PikachuModelProps {
  isSleeping: boolean;
  expression?: 'normal' | 'excited';
}

function PikachuModel({ isSleeping, expression = 'normal' }: PikachuModelProps) {
  const meshRef = useRef<ThreeGroup>(null);

  // Load the Pikachu GLTF model from the correct path
  const { scene } = useGLTF('/modles/pikachu/pikachu.gltf');
  
  // Clone the scene to ensure each instance is independent
  const clonedScene = useMemo(() => {
    const cloned = scene.clone();
    // Ensure the model is properly positioned and scaled
    cloned.position.set(0, 0, 0);
    cloned.scale.set(1, 1, 1);
    return cloned;
  }, [scene]);

  useFrame((state) => {
    if (!meshRef.current) return;

    const time = state.clock.getElapsedTime();

    // Autoplay animations
    // Gentle floating animation
    meshRef.current.position.y = Math.sin(time * 1.5) * 0.15;

    // Gentle rotation animation
    meshRef.current.rotation.y = Math.sin(time * 0.5) * 0.1;

    // Expression-based animations
    if (expression === 'excited') {
      meshRef.current.rotation.y = Math.sin(time * 3) * 0.2;
      meshRef.current.position.y = Math.sin(time * 3) * 0.2;
    } else if (isSleeping) {
      meshRef.current.rotation.z = Math.sin(time * 0.8) * 0.08;
      meshRef.current.position.y = Math.sin(time * 0.8) * 0.1;
    }
  });

  return (
    <group ref={meshRef} scale={1.5}>
      {/* Render the loaded Pikachu GLTF model */}
      <primitive object={clonedScene} />
      
      {/* Expression indicators */}
      {expression === 'excited' && (
        <>
          {/* Excited sparkles with animation */}
          <mesh position={[0.4, 0.6, 0.3]}>
            <octahedronGeometry args={[0.06]} />
            <meshStandardMaterial color="#fbbf24" emissive="#fbbf24" emissiveIntensity={0.5} />
          </mesh>
          <mesh position={[-0.4, 0.5, 0.2]}>
            <octahedronGeometry args={[0.04]} />
            <meshStandardMaterial color="#fbbf24" emissive="#fbbf24" emissiveIntensity={0.5} />
          </mesh>
          <mesh position={[0.2, 0.8, 0.1]}>
            <octahedronGeometry args={[0.03]} />
            <meshStandardMaterial color="#fbbf24" emissive="#fbbf24" emissiveIntensity={0.5} />
          </mesh>
        </>
      )}
      
      {isSleeping && (
        <>
          {/* Animated Sleep Z's */}
          <mesh position={[0.5, 0.7, 0]} rotation={[0, 0, 0.3]}>
            <boxGeometry args={[0.1, 0.1, 0.02]} />
            <meshStandardMaterial color="#94a3b8" />
          </mesh>
          <mesh position={[0.6, 0.9, 0]} rotation={[0, 0, 0.3]}>
            <boxGeometry args={[0.08, 0.08, 0.02]} />
            <meshStandardMaterial color="#cbd5e1" />
          </mesh>
          <mesh position={[0.7, 1.1, 0]} rotation={[0, 0, 0.3]}>
            <boxGeometry args={[0.06, 0.06, 0.02]} />
            <meshStandardMaterial color="#e2e8f0" />
          </mesh>
        </>
      )}
    </group>
  );
}

interface LocalCharacter3DProps {
  isSleeping?: boolean;
  expression?: 'normal' | 'excited';
  size?: 'small' | 'medium' | 'large';
}

const LocalCharacter3D: React.FC<LocalCharacter3DProps> = ({ 
  isSleeping = false, 
  expression = 'normal',
  size = 'medium' 
}) => {
  const getSizeClasses = () => {
    switch (size) {
      case 'small':
        return 'w-16 h-20';
      case 'large':
        return 'w-32 h-40';
      default:
        return 'w-24 h-28';
    }
  };

  return (
    <div className={`relative ${getSizeClasses()} rounded-2xl overflow-hidden`}>
      {/* Pikachu-themed background */}
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 via-amber-400 to-orange-400 opacity-20"></div>
      
      <Canvas
        camera={{ position: [0, 0, 3], fov: 60 }}
        className="w-full h-full"
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          {/* Enhanced Lighting */}
          <ambientLight intensity={0.8} />
          <directionalLight position={[5, 5, 5]} intensity={1.2} />
          <directionalLight position={[-5, 5, -5]} intensity={0.8} />
          <pointLight position={[0, 5, 0]} intensity={0.5} />
          
          {/* Environment for better lighting */}
          <Environment preset="sunset" />
          
          {/* Pikachu Model */}
          <PikachuModel 
            isSleeping={isSleeping}
            expression={expression}
          />
          
          {/* Controls (disabled for production, enable for development) */}
          {/* <OrbitControls enableZoom={false} enablePan={false} /> */}
        </Suspense>
      </Canvas>

      {/* Overlay effects */}
      <div className="absolute inset-0 bg-gradient-to-t from-black from-0% to-transparent to-50% opacity-10 rounded-2xl pointer-events-none"></div>
      <div className="absolute top-1 left-1 w-3 h-3 bg-white bg-opacity-40 rounded-full blur-sm pointer-events-none"></div>
      
      {/* Character Shadow */}
      <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-3/4 h-2 bg-black bg-opacity-20 rounded-full blur-sm"></div>
    </div>
  );
};

// Preload Pikachu GLTF model for better performance
useGLTF.preload('/modles/pikachu/pikachu.gltf');

export default LocalCharacter3D;
