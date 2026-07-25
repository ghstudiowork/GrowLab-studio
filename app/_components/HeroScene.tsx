"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { DoubleSide, MathUtils, type Group } from "three";

const PANELS = [
  { position: [1.6, 0.6, -0.4] as const, rotation: [0.1, 0.5, 0.05] as const, size: [1.3, 0.85] as const, color: "#6ee7b7" },
  { position: [-1.5, -0.5, 0.3] as const, rotation: [-0.15, -0.4, -0.05] as const, size: [1.1, 0.7] as const, color: "#a1a1aa" },
  { position: [0.3, -1.2, -0.6] as const, rotation: [0.2, 0.2, 0.1] as const, size: [1.0, 0.65] as const, color: "#6ee7b7" },
] as const;

const POINTS: readonly [number, number, number][] = [
  [1.8, 0.9, 0.2],
  [-1.7, 0.8, -0.3],
  [1.5, -1.1, 0.4],
  [-1.6, -0.9, 0.1],
  [0.2, 1.6, -0.2],
  [-0.3, -1.7, 0.3],
  [2.0, -0.3, -0.5],
  [-2.0, 0.2, 0.5],
  [0.8, 1.3, 0.6],
  [-0.9, -1.3, -0.4],
];

const MAX_TILT = Math.PI / 36; // ~5deg

function SceneReady({ onReady }: { onReady: () => void }) {
  const called = useRef(false);

  useFrame(() => {
    if (called.current) return;
    called.current = true;

    requestAnimationFrame(() => {
      onReady();
    });
  });

  return null;
}

function CoreGroup() {
  const groupRef = useRef<Group>(null);

  useFrame((state) => {
    const group = groupRef.current;
    if (!group) return;
    const targetY = state.pointer.x * MAX_TILT;
    const targetX = -state.pointer.y * MAX_TILT;
    group.rotation.y = MathUtils.lerp(group.rotation.y, targetY, 0.05);
    group.rotation.x = MathUtils.lerp(group.rotation.x, targetX, 0.05);
  });

  const linePositions = useMemo(() => {
    const positions = new Float32Array(POINTS.length * 6);
    POINTS.forEach((point, i) => {
      const offset = i * 6;
      positions[offset] = 0;
      positions[offset + 1] = 0;
      positions[offset + 2] = 0;
      positions[offset + 3] = point[0];
      positions[offset + 4] = point[1];
      positions[offset + 5] = point[2];
    });
    return positions;
  }, []);

  return (
    <group ref={groupRef}>
      <mesh>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial color="#10b981" wireframe transparent opacity={0.85} />
      </mesh>

      {PANELS.map((panel, i) => (
        <mesh key={i} position={panel.position} rotation={panel.rotation}>
          <planeGeometry args={panel.size} />
          <meshStandardMaterial color={panel.color} transparent opacity={0.16} side={DoubleSide} />
        </mesh>
      ))}

      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#34d399" transparent opacity={0.35} />
      </lineSegments>

      {POINTS.map((point, i) => (
        <mesh key={i} position={point}>
          <sphereGeometry args={[0.045, 8, 8]} />
          <meshStandardMaterial color={i % 2 === 0 ? "#34d399" : "#a1a1aa"} />
        </mesh>
      ))}
    </group>
  );
}

export default function HeroScene({ onReady }: { onReady?: () => void }) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      camera={{ position: [0, 0, 6], fov: 42 }}
      frameloop="always"
      onCreated={({ gl }) => {
        gl.setClearAlpha(0);
      }}
      style={{ background: "transparent" }}
    >
      <SceneReady onReady={onReady ?? (() => {})} />
      <ambientLight intensity={0.7} />
      <directionalLight position={[3, 3, 4]} intensity={0.8} />
      <CoreGroup />
    </Canvas>
  );
}
