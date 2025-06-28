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

  // Load the Pikachu GLTF model
  const { scene } = useGLTF('/modles/pikachu/pikachu.gltf');
  
  // Clone the scene to ensure each instance is independent
  const clonedScene = useMemo(() => scene.clone(), [scene]);

  useFrame((state) => {
    if (!meshRef.current) return;

    // Gentle floating animation
    const time = state.clock.getElapsedTime();
    meshRef.current.position.y = Math.sin(time * 2) * 0.1;

    // Rotation based on expression
    if (expression === 'excited') {
      meshRef.current.rotation.y = Math.sin(time * 4) * 0.1;
    } else if (isSleeping) {
      meshRef.current.rotation.z = Math.sin(time * 1) * 0.05;
    }
  });

  return (
    <group ref={meshRef} scale={1.2}>
      {/* Render the loaded Pikachu GLTF model */}
      <primitive object={clonedScene} />
      
      {/* Expression indicators */}
      {expression === 'excited' && (
        <>
          {/* Excited sparkles */}
          <mesh position={[0.3, 0.5, 0.2]}>
            <octahedronGeometry args={[0.05]} />
            <meshStandardMaterial color="#fbbf24" emissive="#fbbf24" emissiveIntensity={0.3} />
          </mesh>
          <mesh position={[-0.3, 0.4, 0.1]}>
            <octahedronGeometry args={[0.03]} />
            <meshStandardMaterial color="#fbbf24" emissive="#fbbf24" emissiveIntensity={0.3} />
          </mesh>
        </>
      )}
      
      {isSleeping && (
        <>
          {/* Sleep Z's */}
          <mesh position={[0.4, 0.6, 0]} rotation={[0, 0, 0.3]}>
            <boxGeometry args={[0.08, 0.08, 0.02]} />
            <meshStandardMaterial color="#94a3b8" />
          </mesh>
          <mesh position={[0.5, 0.8, 0]} rotation={[0, 0, 0.3]}>
            <boxGeometry args={[0.06, 0.06, 0.02]} />
            <meshStandardMaterial color="#cbd5e1" />
          </mesh>
        </>
      )}
    </group>
  );
}

// Fallback component for when GLTF model fails to load
function PikachuFallback({ isSleeping, expression = 'normal' }: PikachuModelProps) {
  const meshRef = useRef<ThreeGroup>(null);

  useFrame((state) => {
    if (!meshRef.current) return;

    // Gentle floating animation
    const time = state.clock.getElapsedTime();
    meshRef.current.position.y = Math.sin(time * 2) * 0.1;

    // Rotation based on expression
    if (expression === 'excited') {
      meshRef.current.rotation.y = Math.sin(time * 4) * 0.1;
    } else if (isSleeping) {
      meshRef.current.rotation.z = Math.sin(time * 1) * 0.05;
    }
  });

  return (
    <group ref={meshRef} scale={1.2}>
      {/* Simple Pikachu-like fallback */}
      {/* Body */}
      <mesh position={[0, -0.3, 0]}>
        <sphereGeometry args={[0.4, 16, 16]} />
        <meshStandardMaterial color="#fbbf24" />
      </mesh>
      
      {/* Head */}
      <mesh position={[0, 0.2, 0]}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial color="#fbbf24" />
      </mesh>
      
      {/* Ears */}
      <mesh position={[-0.15, 0.5, 0]} rotation={[0, 0, -0.3]}>
        <cylinderGeometry args={[0.05, 0.05, 0.3, 8]} />
        <meshStandardMaterial color="#fbbf24" />
      </mesh>
      <mesh position={[0.15, 0.5, 0]} rotation={[0, 0, 0.3]}>
        <cylinderGeometry args={[0.05, 0.05, 0.3, 8]} />
        <meshStandardMaterial color="#fbbf24" />
      </mesh>
      
      {/* Cheeks */}
      <mesh position={[-0.25, 0.1, 0.1]}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshStandardMaterial color="#ef4444" />
      </mesh>
      <mesh position={[0.25, 0.1, 0.1]}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshStandardMaterial color="#ef4444" />
      </mesh>

      {/* Expression indicators */}
      {expression === 'excited' && (
        <>
          {/* Excited sparkles */}
          <mesh position={[0.3, 0.5, 0.2]}>
            <octahedronGeometry args={[0.05]} />
            <meshStandardMaterial color="#fbbf24" emissive="#fbbf24" emissiveIntensity={0.3} />
          </mesh>
          <mesh position={[-0.3, 0.4, 0.1]}>
            <octahedronGeometry args={[0.03]} />
            <meshStandardMaterial color="#fbbf24" emissive="#fbbf24" emissiveIntensity={0.3} />
          </mesh>
        </>
      )}
      
      {isSleeping && (
        <>
          {/* Sleep Z's */}
          <mesh position={[0.4, 0.6, 0]} rotation={[0, 0, 0.3]}>
            <boxGeometry args={[0.08, 0.08, 0.02]} />
            <meshStandardMaterial color="#94a3b8" />
          </mesh>
          <mesh position={[0.5, 0.8, 0]} rotation={[0, 0, 0.3]}>
            <boxGeometry args={[0.06, 0.06, 0.02]} />
            <meshStandardMaterial color="#cbd5e1" />
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
        camera={{ position: [0, 0, 4], fov: 50 }}
        className="w-full h-full"
      >
        <Suspense fallback={<PikachuFallback isSleeping={isSleeping} expression={expression} />}>
          {/* Lighting */}
          <ambientLight intensity={0.6} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <pointLight position={[-10, -10, -5]} intensity={0.5} />
          
          {/* Environment for better lighting */}
          <Environment preset="studio" />
          
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
