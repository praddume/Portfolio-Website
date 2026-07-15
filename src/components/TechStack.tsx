import * as THREE from "three";
import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Billboard, Html } from "@react-three/drei";

const textureLoader = new THREE.TextureLoader();
textureLoader.crossOrigin = "anonymous";

const imageUrls = [
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
];
const textures = imageUrls.map((url) => textureLoader.load(url));

const techNodes = [
  { name: "Python", textureIndex: 0, orbit: 4.5, speed: 0.4, angleOffset: 0 },
  { name: "C++", textureIndex: 1, orbit: 4.5, speed: 0.4, angleOffset: Math.PI },
  
  { name: "PyTorch", textureIndex: 2, orbit: 7.0, speed: 0.25, angleOffset: 0 },
  { name: "Pandas", textureIndex: 3, orbit: 7.0, speed: 0.25, angleOffset: (2 * Math.PI) / 3 },
  { name: "Figma", textureIndex: 4, orbit: 7.0, speed: 0.25, angleOffset: (4 * Math.PI) / 3 },
  
  { name: "MySQL", textureIndex: 5, orbit: 9.5, speed: 0.15, angleOffset: 0 },
  { name: "PostgreSQL", textureIndex: 6, orbit: 9.5, speed: 0.15, angleOffset: (2 * Math.PI) / 3 },
  { name: "Git", textureIndex: 7, orbit: 9.5, speed: 0.15, angleOffset: (4 * Math.PI) / 3 },
];

function Nucleus({ isActive }: { isActive: boolean }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!isActive) return;
    const scale = 1 + Math.sin(state.clock.getElapsedTime() * 1.5) * 0.06;
    if (ref.current) {
      ref.current.scale.set(scale, scale, scale);
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.2;
    }
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[1.1, 32, 32]} />
      <meshPhysicalMaterial
        color="#00828a"
        emissive="#00828a"
        emissiveIntensity={1.2}
        roughness={0.1}
        metalness={0.8}
        transmission={0.3}
        thickness={0.5}
      />
    </mesh>
  );
}

function OrbitRing({ radius }: { radius: number }) {
  return (
    <mesh rotation={[Math.PI / 2, 0, 0]}>
      <ringGeometry args={[radius - 0.015, radius + 0.015, 64]} />
      <meshBasicMaterial
        color="#ffffff"
        transparent
        opacity={0.06}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

interface OrbitNodeProps {
  name: string;
  texture: THREE.Texture;
  orbitRadius: number;
  speed: number;
  angleOffset: number;
  index: number;
  hoveredNode: number | null;
  setHoveredNode: (index: number | null) => void;
  isActive: boolean;
}

function OrbitNode({
  name,
  texture,
  orbitRadius,
  speed,
  angleOffset,
  index,
  hoveredNode,
  setHoveredNode,
  isActive,
}: OrbitNodeProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [localHovered, setLocalHovered] = useState(false);

  useFrame((state) => {
    if (!isActive) return;
    const isAnyHovered = hoveredNode !== null;
    const speedMultiplier = isAnyHovered ? 0.15 : 1.0;
    const time = state.clock.getElapsedTime();
    const angle = time * speed * speedMultiplier + angleOffset;

    if (groupRef.current) {
      groupRef.current.position.x = Math.cos(angle) * orbitRadius;
      groupRef.current.position.y = Math.sin(angle) * orbitRadius;
      groupRef.current.position.z = 0;
    }
  });

  const handlePointerOver = (e: any) => {
    e.stopPropagation();
    setLocalHovered(true);
    setHoveredNode(index);
  };

  const handlePointerOut = () => {
    setLocalHovered(false);
    setHoveredNode(null);
  };

  return (
    <group ref={groupRef}>
      <Billboard>
        {/* Core Logo Image Badge */}
        <mesh
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
        >
          <circleGeometry args={[0.65, 32]} />
          <meshBasicMaterial map={texture} transparent depthWrite />
        </mesh>
        
        {/* Glow Ring/Bezel */}
        <mesh position={[0, 0, -0.01]}>
          <circleGeometry args={[0.72, 32]} />
          <meshPhysicalMaterial
            color={localHovered ? "#38b2ac" : "#1a161f"}
            roughness={0.1}
            transmission={0.6}
            thickness={0.5}
            transparent
            opacity={0.85}
          />
        </mesh>

        {/* Outer glowing border ring */}
        <mesh position={[0, 0, -0.02]}>
          <ringGeometry args={[0.71, 0.74, 32]} />
          <meshBasicMaterial
            color={localHovered ? "#38b2ac" : "rgba(255, 255, 255, 0.1)"}
            transparent
            opacity={localHovered ? 1 : 0.2}
          />
        </mesh>

        {/* HTML Tooltip */}
        {localHovered && (
          <Html distanceFactor={15} position={[0, 1.0, 0]} center>
            <div
              style={{
                background: "rgba(11, 8, 12, 0.95)",
                backdropFilter: "blur(6px)",
                border: "1px solid rgba(56, 178, 172, 0.4)",
                color: "#eae5ec",
                padding: "6px 12px",
                borderRadius: "6px",
                fontFamily: "'Geist', sans-serif",
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.8px",
                whiteSpace: "nowrap",
                pointerEvents: "none",
                boxShadow: "0 4px 16px rgba(0, 0, 0, 0.6)",
                textTransform: "uppercase",
              }}
            >
              {name}
            </div>
          </Html>
        )}
      </Billboard>
    </group>
  );
}

const TechStack = () => {
  const [isActive, setIsActive] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
        setIsActive(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <div className="techstack" ref={containerRef}>
      <h2>My Techstack</h2>

      <Canvas
        shadows
        gl={{ alpha: true, stencil: false, depth: true, antialias: true }}
        camera={{ position: [0, 0, 20], fov: 32.5, near: 1, far: 100 }}
        onCreated={(state) => (state.gl.toneMappingExposure = 1.5)}
        className="tech-canvas"
        frameloop={isVisible ? "always" : "never"}
      >
        <ambientLight intensity={1} />
        <spotLight
          position={[20, 20, 25]}
          penumbra={1}
          angle={0.2}
          color="white"
          castShadow
          shadow-mapSize={[512, 512]}
        />
        <directionalLight position={[0, 5, -4]} intensity={2} />

        <group rotation={[0.4, 0, 0]}>
          {/* Central Beating Nucleus */}
          <Nucleus isActive={isActive} />

          {/* Orbit Rings */}
          <OrbitRing radius={4.5} />
          <OrbitRing radius={7.0} />
          <OrbitRing radius={9.5} />

          {/* Orbiting Nodes */}
          {techNodes.map((node, i) => (
            <OrbitNode
              key={i}
              name={node.name}
              texture={textures[node.textureIndex]}
              orbitRadius={node.orbit}
              speed={node.speed}
              angleOffset={node.angleOffset}
              index={i}
              hoveredNode={hoveredNode}
              setHoveredNode={setHoveredNode}
              isActive={isActive}
            />
          ))}
        </group>

        <Environment
          files="/models/char_enviorment.hdr"
          environmentIntensity={0.5}
          environmentRotation={[0, 4, 2]}
        />
      </Canvas>
    </div>
  );
};

export default TechStack;
