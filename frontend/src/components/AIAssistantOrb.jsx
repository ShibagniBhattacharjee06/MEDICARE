import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Float } from '@react-three/drei';

const Orb = () => {
  const sphereRef = useRef();

  useFrame((state) => {
    if (sphereRef.current) {
      sphereRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      sphereRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={2}>
      <Sphere ref={sphereRef} args={[1, 64, 64]} scale={1.2}>
        <MeshDistortMaterial
          color="#06b6d4"
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.2}
          metalness={0.8}
          transparent
          opacity={0.85}
          emissive="#0891b2"
          emissiveIntensity={0.5}
        />
      </Sphere>
    </Float>
  );
};

const AIAssistantOrb = ({ onClick }) => {
  return (
    <div 
      className="relative w-32 h-32 cursor-pointer drop-shadow-[0_0_15px_rgba(6,182,212,0.5)] transition-transform hover:scale-110 group"
      onClick={onClick}
      title="Click to interact with AI Assistant"
    >
      <Canvas camera={{ position: [0, 0, 4] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#0284c7" />
        <Orb />
      </Canvas>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-16 h-16 bg-cyan-400/20 rounded-full blur-xl animate-pulse group-hover:scale-125 transition-transform duration-500"></div>
      </div>
    </div>
  );
};

export default AIAssistantOrb;
