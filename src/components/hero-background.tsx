"use client";

import { useRef, useMemo, useEffect, useCallback } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Pipeline stage positions: Source → Ingest → Transform → Enrich → Load → Serve
const STAGES = [
  { x: -5.0, y: 1.2, z: 0, label: "source" },
  { x: -3.0, y: -0.5, z: 0.3, label: "ingest" },
  { x: -1.0, y: 0.8, z: -0.2, label: "transform" },
  { x: 1.0, y: -0.3, z: 0.4, label: "enrich" },
  { x: 3.0, y: 0.6, z: -0.3, label: "load" },
  { x: 5.0, y: -0.8, z: 0.1, label: "serve" },
];

// Branch paths: some data splits and merges
const PATHS = [
  [0, 1, 2, 3, 4, 5], // main pipeline
  [0, 1, 3, 4, 5],    // skip transform
  [2, 3, 4],           // mid-section loop
];

const PARTICLE_COUNT = 120;
const STAGE_COLOR = new THREE.Color("#3b82f6"); // blue for nodes
const PARTICLE_COLORS = [
  new THREE.Color("#3b82f6"), // blue
  new THREE.Color("#8b5cf6"), // purple
  new THREE.Color("#06b6d4"), // cyan
  new THREE.Color("#10b981"), // emerald
];

function createCircleTexture(soft = false) {
  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const center = size / 2;
  const gradient = ctx.createRadialGradient(center, center, 0, center, center, center);
  if (soft) {
    gradient.addColorStop(0, "rgba(255,255,255,0.9)");
    gradient.addColorStop(0.3, "rgba(255,255,255,0.4)");
    gradient.addColorStop(1, "rgba(255,255,255,0)");
  } else {
    gradient.addColorStop(0, "rgba(255,255,255,1)");
    gradient.addColorStop(0.5, "rgba(255,255,255,0.6)");
    gradient.addColorStop(1, "rgba(255,255,255,0)");
  }
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  return new THREE.CanvasTexture(canvas);
}

interface Particle {
  pathIndex: number;
  progress: number;
  speed: number;
  colorIndex: number;
  offset: THREE.Vector3;
}

function DataPipeline() {
  const stagePointsRef = useRef<THREE.Points>(null);
  const particlePointsRef = useRef<THREE.Points>(null);
  const pipelineLinesRef = useRef<THREE.LineSegments>(null);
  const groupRef = useRef<THREE.Group>(null);
  const mouse = useRef({ x: 0, y: 0 });

  const stageTexture = useMemo(() => createCircleTexture(false), []);
  const particleTexture = useMemo(() => createCircleTexture(true), []);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 0.3;
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 0.3;
    };
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  // Stage node positions
  const stagePositions = useMemo(() => {
    const pos = new Float32Array(STAGES.length * 3);
    STAGES.forEach((s, i) => {
      pos[i * 3] = s.x;
      pos[i * 3 + 1] = s.y;
      pos[i * 3 + 2] = s.z;
    });
    return pos;
  }, []);

  // Stage node colors (brighter at center of pipeline)
  const stageColors = useMemo(() => {
    const colors = new Float32Array(STAGES.length * 3);
    STAGES.forEach((_, i) => {
      const intensity = 0.3 + 0.4 * (1 - Math.abs(i - 2.5) / 2.5);
      STAGE_COLOR.toArray(colors, i * 3);
      colors[i * 3] *= intensity;
      colors[i * 3 + 1] *= intensity;
      colors[i * 3 + 2] *= intensity;
    });
    return colors;
  }, []);

  // Pipeline connection lines
  const linePositions = useMemo(() => {
    const lines: number[] = [];
    for (const path of PATHS) {
      for (let i = 0; i < path.length - 1; i++) {
        const a = STAGES[path[i]];
        const b = STAGES[path[i + 1]];
        lines.push(a.x, a.y, a.z, b.x, b.y, b.z);
      }
    }
    return new Float32Array(lines);
  }, []);

  // Flowing particles
  const particles = useRef<Particle[]>([]);
  const particlePositions = useRef(new Float32Array(PARTICLE_COUNT * 3));
  const particleColors = useRef(new Float32Array(PARTICLE_COUNT * 3));
  const particleSizes = useRef(new Float32Array(PARTICLE_COUNT));

  // Initialize particles
  useMemo(() => {
    const p: Particle[] = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      p.push({
        pathIndex: Math.floor(Math.random() * PATHS.length),
        progress: Math.random(),
        speed: 0.08 + Math.random() * 0.12,
        colorIndex: Math.floor(Math.random() * PARTICLE_COLORS.length),
        offset: new THREE.Vector3(
          (Math.random() - 0.5) * 0.3,
          (Math.random() - 0.5) * 0.3,
          (Math.random() - 0.5) * 0.15
        ),
      });
    }
    particles.current = p;
  }, []);

  const getPositionOnPath = useCallback((pathIndex: number, progress: number) => {
    const path = PATHS[pathIndex];
    const segCount = path.length - 1;
    const totalProgress = progress * segCount;
    const segIndex = Math.min(Math.floor(totalProgress), segCount - 1);
    const segProgress = totalProgress - segIndex;

    const a = STAGES[path[segIndex]];
    const b = STAGES[path[segIndex + 1]];

    // Smooth cubic interpolation for curved paths
    const t = segProgress;
    const ease = t * t * (3 - 2 * t); // smoothstep

    return new THREE.Vector3(
      a.x + (b.x - a.x) * ease,
      a.y + (b.y - a.y) * ease + Math.sin(t * Math.PI) * 0.3,
      a.z + (b.z - a.z) * ease
    );
  }, []);

  useFrame(({ clock }) => {
    const dt = clock.getDelta();
    const time = clock.getElapsedTime();

    // Update particles
    const pos = particlePositions.current;
    const cols = particleColors.current;
    const sizes = particleSizes.current;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const p = particles.current[i];
      p.progress += p.speed * dt;

      if (p.progress >= 1) {
        p.progress = 0;
        p.pathIndex = Math.floor(Math.random() * PATHS.length);
        p.colorIndex = Math.floor(Math.random() * PARTICLE_COLORS.length);
        p.offset.set(
          (Math.random() - 0.5) * 0.3,
          (Math.random() - 0.5) * 0.3,
          (Math.random() - 0.5) * 0.15
        );
      }

      const worldPos = getPositionOnPath(p.pathIndex, p.progress);
      pos[i * 3] = worldPos.x + p.offset.x;
      pos[i * 3 + 1] = worldPos.y + p.offset.y;
      pos[i * 3 + 2] = worldPos.z + p.offset.z;

      // Color shifts slightly based on position in pipeline
      const color = PARTICLE_COLORS[p.colorIndex];
      const brightness = 0.5 + 0.5 * Math.sin(p.progress * Math.PI);
      cols[i * 3] = color.r * brightness;
      cols[i * 3 + 1] = color.g * brightness;
      cols[i * 3 + 2] = color.b * brightness;

      // Size pulses — larger in middle of path
      sizes[i] = 0.03 + 0.04 * Math.sin(p.progress * Math.PI);
    }

    if (particlePointsRef.current) {
      particlePointsRef.current.geometry.attributes.position.needsUpdate = true;
      particlePointsRef.current.geometry.attributes.color.needsUpdate = true;
      particlePointsRef.current.geometry.attributes.size.needsUpdate = true;
    }

    // Gentle mouse parallax on the whole scene
    if (groupRef.current) {
      groupRef.current.rotation.y = mouse.current.x * 0.3 + Math.sin(time * 0.05) * 0.1;
      groupRef.current.rotation.x = mouse.current.y * 0.2;
    }

    // Pulse stage nodes
    if (stagePointsRef.current) {
      const mat = stagePointsRef.current.material as THREE.PointsMaterial;
      mat.size = 0.15 + 0.02 * Math.sin(time * 1.5);
    }
  });

  return (
    <group ref={groupRef}>
      {/* Pipeline connection lines */}
      <lineSegments ref={pipelineLinesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#1e3a5f" transparent opacity={0.3} />
      </lineSegments>

      {/* Stage nodes (hub points) */}
      <points ref={stagePointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[stagePositions, 3]} />
          <bufferAttribute attach="attributes-color" args={[stageColors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.15}
          sizeAttenuation
          transparent
          map={stageTexture}
          depthWrite={false}
          vertexColors
        />
      </points>

      {/* Flowing data particles */}
      <points ref={particlePointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[particlePositions.current, 3]} />
          <bufferAttribute attach="attributes-color" args={[particleColors.current, 3]} />
          <bufferAttribute attach="attributes-size" args={[particleSizes.current, 1]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.05}
          sizeAttenuation
          transparent
          map={particleTexture}
          depthWrite={false}
          vertexColors
        />
      </points>
    </group>
  );
}

export function HeroBackground() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 55 }}
        style={{ background: "transparent" }}
        gl={{ alpha: true, antialias: true }}
      >
        <DataPipeline />
      </Canvas>
    </div>
  );
}
