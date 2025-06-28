import React, { Suspense, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, useGLTF } from '@react-three/drei';
import { Group as ThreeGroup, Mesh } from 'three';
import { Group } from '../types';

interface ModelProps {
  character: Group['character'];
  isSleeping: boolean;
}

function Model({ character, isSleeping }: ModelProps) {
  const meshRef = useRef<ThreeGroup>(null);

  // Load the Pikachu GLTF model from public/models/pikachu directory
  const { scene } = useGLTF('/models/pikachu/scene.gltf');
  
  // Clone the scene to ensure each instance is independent
  const clonedScene = useMemo(() => scene.clone(), [scene]);

  useFrame((state) => {
    if (!meshRef.current) return;

    // Gentle floating animation
    const time = state.clock.getElapsedTime();
    meshRef.current.position.y = Math.sin(time * 2) * 0.1;

    // Rotation based on character expression
    if (character.expression === 'excited') {
      meshRef.current.rotation.y = Math.sin(time * 4) * 0.1;
    } else if (isSleeping) {
      meshRef.current.rotation.z = Math.sin(time * 1) * 0.05;
    }
  });

  return (
    <group ref={meshRef} scale={0.8}>
      {/* Render the loaded Pikachu GLTF model */}
      <primitive object={clonedScene} />
      
      {/* Expression indicators - these remain as separate meshes */}
      {character.expression === 'excited' && (
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
function FallbackModel({ character, isSleeping }: ModelProps) {
  const meshRef = useRef<ThreeGroup>(null);
  const headRef = useRef<Mesh>(null);
  const bodyRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;

    // Gentle floating animation
    const time = state.clock.getElapsedTime();
    meshRef.current.position.y = Math.sin(time * 2) * 0.1;

    // Rotation based on character expression
    if (character.expression === 'excited') {
      meshRef.current.rotation.y = Math.sin(time * 4) * 0.1;
    } else if (isSleeping) {
      meshRef.current.rotation.z = Math.sin(time * 1) * 0.05;
    }

    // Head bobbing animation
    if (headRef.current) {
      headRef.current.rotation.x = Math.sin(time * 3) * 0.05;
    }
  });

  const getCharacterColors = () => {
    switch (character.type) {
      case 'athletic-woman':
        return { primary: '#ec4899', secondary: '#f472b6' };
      case 'athletic-men':
        return { primary: '#3b82f6', secondary: '#60a5fa' };
      case 'scholar':
        return { primary: '#f59e0b', secondary: '#fbbf24' };
      case 'trainer':
        return { primary: '#10b981', secondary: '#34d399' };
      case 'student':
        return { primary: '#8b5cf6', secondary: '#a78bfa' };
      case 'mentor':
        return { primary: '#6b7280', secondary: '#9ca3af' };
      default:
        return { primary: '#6366f1', secondary: '#818cf8' };
    }
  };

  const colors = getCharacterColors();

  return (
    <group ref={meshRef} scale={1.2}>
      {/* Body */}
      <mesh ref={bodyRef} position={[0, -0.5, 0]}>
        <cylinderGeometry args={[0.3, 0.4, 1, 8]} />
        <meshStandardMaterial color={colors.primary} />
      </mesh>
      
      {/* Head */}
      <mesh ref={headRef} position={[0, 0.3, 0]}>
        <sphereGeometry args={[0.25, 16, 16]} />
        <meshStandardMaterial color={colors.secondary} />
      </mesh>
      
      {/* Arms */}
      <mesh position={[-0.4, -0.2, 0]} rotation={[0, 0, 0.3]}>
        <cylinderGeometry args={[0.08, 0.08, 0.6, 8]} />
        <meshStandardMaterial color={colors.primary} />
      </mesh>
      <mesh position={[0.4, -0.2, 0]} rotation={[0, 0, -0.3]}>
        <cylinderGeometry args={[0.08, 0.08, 0.6, 8]} />
        <meshStandardMaterial color={colors.primary} />
      </mesh>
      
      {/* Legs */}
      <mesh position={[-0.15, -1.2, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 0.8, 8]} />
        <meshStandardMaterial color={colors.secondary} />
      </mesh>
      <mesh position={[0.15, -1.2, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 0.8, 8]} />
        <meshStandardMaterial color={colors.secondary} />
      </mesh>

      {/* Expression indicators */}
      {character.expression === 'excited' && (
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
  character: Group['character'];
  isSleeping: boolean;
  size?: 'small' | 'medium' | 'large';
}

const LocalCharacter3D: React.FC<LocalCharacter3DProps> = ({ 
  character, 
  isSleeping, 
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

  const getCharacterGradient = () => {
    switch (character.type) {
      case 'athletic-woman':
        return 'from-pink-400 via-purple-400 to-indigo-400';
      case 'athletic-men':
        return 'from-blue-400 via-cyan-400 to-teal-400';
      case 'scholar':
        return 'from-amber-400 via-orange-400 to-red-400';
      case 'trainer':
        return 'from-green-400 via-emerald-400 to-teal-400';
      case 'student':
        return 'from-violet-400 via-purple-400 to-fuchsia-400';
      case 'mentor':
        return 'from-slate-400 via-gray-400 to-zinc-400';
      default:
        return 'from-blue-400 via-purple-400 to-pink-400';
    }
  };

  return (
    <div className={`relative ${getSizeClasses()} rounded-2xl overflow-hidden`}>
      {/* 3D Canvas Background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${getCharacterGradient()} opacity-20`}></div>
      
      <Canvas
        camera={{ position: [0, 0, 4], fov: 50 }}
        className="w-full h-full"
      >
        <Suspense fallback={<FallbackModel character={character} isSleeping={isSleeping} />}>
          {/* Lighting */}
          <ambientLight intensity={0.6} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <pointLight position={[-10, -10, -5]} intensity={0.5} />
          
          {/* Environment for better lighting */}
          <Environment preset="studio" />
          
          {/* Pikachu 3D Model with error boundary fallback */}
          <Model 
            character={character}
            isSleeping={isSleeping}
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

// Preload the Pikachu GLTF model for better performance
useGLTF.preload('/models/pikachu/scene.gltf');

export default LocalCharacter3D;