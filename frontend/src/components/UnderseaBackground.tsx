import React, { useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Stars } from '@react-three/drei'
import * as THREE from 'three'

// Preload external GLTF assets for smoother entry
// useGLTF.preload('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/fish/scene.gltf')
// useGLTF.preload('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/clown_fish/scene.gltf')
// useGLTF.preload('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/shark/scene.gltf')

// Simple swaying seaweed using instanced cylinders
function SeaWeedField({ count = 200 }: { count?: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null!)
  const dummy = useMemo(() => new THREE.Object3D(), [])
  const offsets = useMemo(() => new Float32Array(count).map(() => Math.random() * Math.PI * 2), [count])

  useFrame(({ clock }) => {
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 120
      const z = (Math.random() - 0.5) * 120
      const h = 1.2 + Math.random() * 2.0
      const sway = Math.sin(clock.elapsedTime * 1.2 + offsets[i]) * 0.35
      dummy.position.set(x, -8.8, z)
      dummy.rotation.z = sway
      dummy.scale.set(1, h, 1)
      dummy.updateMatrix()
      meshRef.current.setMatrixAt(i, dummy.matrix)
    }
    meshRef.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={meshRef} args={[undefined as any, undefined as any, count]}>
      <cylinderGeometry args={[0.25, 0.45, 1, 6]} />
      <meshStandardMaterial color="#0b7d5a" roughness={0.9} metalness={0.0} />
    </instancedMesh>
  )
}

// Simple fish as animated instanced capsules
function FishSchool({ count = 150, speed = 0.6, area = 120, size = 0.8, color = '#66c2ff' }: { count?: number; speed?: number; area?: number; size?: number; color?: string }) {
  const meshRef = useRef<THREE.InstancedMesh>(null!)
  const dummy = useMemo(() => new THREE.Object3D(), [])
  const phases = useMemo(() => new Float32Array(count).map(() => Math.random() * Math.PI * 2), [count])
  const radii = useMemo(() => new Float32Array(count).map(() => 20 + Math.random() * (area / 2)), [count, area])
  const heights = useMemo(() => new Float32Array(count).map(() => -5 + Math.random() * 8), [count])

  useFrame(({ clock }) => {
    const t = clock.elapsedTime * speed
    for (let i = 0; i < count; i++) {
      const r = radii[i]
      const a = t + phases[i]
      const x = Math.cos(a) * r
      const z = Math.sin(a * 0.9) * r
      const y = heights[i] + Math.sin(a * 2) * 0.6
      dummy.position.set(x, y, z)
      dummy.rotation.y = Math.atan2(-Math.sin(a * 0.9) * r, -Math.cos(a) * r)
      const s = size * (0.6 + Math.sin(a * 3) * 0.05)
      dummy.scale.set(s, s, s * 2)
      dummy.updateMatrix()
      meshRef.current.setMatrixAt(i, dummy.matrix)
    }
    meshRef.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={meshRef} args={[undefined as any, undefined as any, count]}>
      <capsuleGeometry args={[0.35, 0.8, 6, 12]} />
      <meshStandardMaterial color={color} roughness={0.6} metalness={0.05} />
    </instancedMesh>
  )
}

// A couple of "whales" as bigger, slower fish
function Whales() {
  const ref1 = useRef<THREE.Mesh>(null!)
  const ref2 = useRef<THREE.Mesh>(null!)
  useFrame(({ clock }) => {
    const t = clock.elapsedTime * 0.12
    const y1 = -2 + Math.sin(t) * 0.4
    const y2 = -3 + Math.cos(t * 0.8) * 0.5
    if (ref1.current) {
      ref1.current.position.set(Math.sin(t) * 35, y1, Math.cos(t * 0.7) * 35)
      ref1.current.rotation.y = Math.atan2(-Math.cos(t * 0.7) * 35, -Math.cos(t) * 35)
    }
    if (ref2.current) {
      ref2.current.position.set(Math.cos(t * 0.9) * -40, y2, Math.sin(t * 0.6) * 40)
      ref2.current.rotation.y = Math.atan2(-Math.sin(t * 0.6) * 40, Math.sin(t * 0.9) * 40)
    }
  })
  return (
    <group>
      <mesh ref={ref1} castShadow receiveShadow>
        <capsuleGeometry args={[1.2, 5, 10, 16]} />
        <meshStandardMaterial color="#1b2a4a" roughness={0.7} />
      </mesh>
      <mesh ref={ref2} castShadow receiveShadow>
        <capsuleGeometry args={[1.1, 4.5, 10, 16]} />
        <meshStandardMaterial color="#21365e" roughness={0.7} />
      </mesh>
    </group>
  )
}

// Rising bubbles as small billboards
function Bubbles({ count = 200 }: { count?: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null!)
  const dummy = useMemo(() => new THREE.Object3D(), [])
  const seeds = useMemo(() => new Float32Array(count).map(() => Math.random()), [count])

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    for (let i = 0; i < count; i++) {
      const seed = seeds[i]
      const x = (seed - 0.5) * 120
      const z = (Math.sin(seed * 10 + t * 0.5) - 0.5) * 120
      const y = -8 + ((t * 0.7 + seed * 10) % 12)
      dummy.position.set(x, y, z)
      const s = 0.05 + (seed % 0.05)
      dummy.scale.set(s, s, s)
      dummy.updateMatrix()
      meshRef.current.setMatrixAt(i, dummy.matrix)
    }
    meshRef.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={meshRef} args={[undefined as any, undefined as any, count]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshStandardMaterial color="#cfefff" roughness={0.1} metalness={0.0} transparent opacity={0.5} />
    </instancedMesh>
  )
}

// The clickable surface: toggles refraction-like effect via uniforms
function WaterSurface({ active, onToggle }: { active: boolean; onToggle: () => void }) {
  const ref = useRef<THREE.Mesh>(null!)
  useFrame(({ clock }) => {
    if (!ref.current) return
    const t = clock.elapsedTime
    ref.current.position.y = 0 + Math.sin(t * 0.6) * 0.2
  })
  return (
    <mesh
      ref={ref}
      position={[0, 0, 0]}
      rotation={[-Math.PI / 2, 0, 0]}
      onClick={onToggle}
    >
      <planeGeometry args={[200, 200, 64, 64]} />
      <meshStandardMaterial
        color={active ? '#4ea5ff' : '#3a86ff'}
        transparent
        opacity={active ? 0.25 : 0.08}
        roughness={0.9}
        metalness={0.0}
      />
    </mesh>
  )
}

function UnderseaScene() {
  const [surfaceActive, setSurfaceActive] = useState(true)

  return (
    <>
      {/* Foggy blue ambience */}
      <fog attach="fog" args={[0x0b355e, 10, 140]} />

      {/* Lights */}
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 15, 5]} intensity={0.8} color={0x87bfff} castShadow />
      <pointLight position={[-10, 8, -10]} intensity={0.5} color={0x6eb5ff} />

      {/* Seabed */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -9, 0]} receiveShadow>
        <planeGeometry args={[400, 400]} />
        <meshStandardMaterial color="#0a2d3c" roughness={1} />
      </mesh>

      {/* Vegetation, fauna, particles */}
      <SeaWeedField count={220} />
      <FishSchool count={170} speed={0.7} color="#63d5ff" />
      <FishSchool count={90} speed={0.45} size={1.1} color="#9ee6ff" />
      <Whales />
      <Bubbles count={220} />

      {/* Water surface (click to toggle) */}
      <WaterSurface active={surfaceActive} onToggle={() => setSurfaceActive((s) => !s)} />

      {/* Stars add subtle parallax sparkles mimicking plankton */}
      <Stars radius={200} depth={30} count={1500} factor={2} fade speed={0.6} />

      {/* Environment tint */}
      <Environment preset="night" background={false} />
    </>
  )
}

export default function UnderseaBackground() {
  return (
    <div
      className="pointer-events-auto"
      style={{ position: 'fixed', inset: 0, zIndex: 0 }}
      aria-hidden
    >
      <Canvas
        gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
        camera={{ position: [0, 2, 14], fov: 60, near: 0.1, far: 400 }}
        shadows
      >
        <UnderseaScene />
      </Canvas>
      {/* Gradient overlay for depth feeling */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0, 40, 80, 0.30) 0%, rgba(0, 20, 40, 0.55) 60%, rgba(0, 10, 20, 0.75) 100%)', pointerEvents: 'none' }} />
    </div>
  )
}
