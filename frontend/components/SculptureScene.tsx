"use client";

import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

function LocalEnvironment() {
    const { scene, gl } = useThree();
    useEffect(() => {
        const pmrem = new THREE.PMREMGenerator(gl);
        const env = pmrem.fromScene(new RoomEnvironment(), 0.04);
        scene.environment = env.texture;
        return () => {
            scene.environment = null;
            env.dispose();
            pmrem.dispose();
        };
    }, [scene, gl]);
    return null;
}

const RINGS = [
    { radius: 2.0, tilt: [Math.PI / 2.2, 0.35, 0], speed: 0.28, color: "#25251F", nodes: 3 },
    { radius: 2.45, tilt: [Math.PI / 2.7, -0.55, 0.2], speed: -0.19, color: "#B9B5AA", nodes: 3 },
    { radius: 2.9, tilt: [Math.PI / 1.85, 0.95, -0.3], speed: 0.12, color: "#536BFA", nodes: 2 },
];

const RING_NODES = RINGS.map((ring) => {
    const euler = new THREE.Euler(ring.tilt[0], ring.tilt[1], ring.tilt[2]);
    return Array.from({ length: ring.nodes }, (_, j) => {
        const a = j * ((Math.PI * 2) / ring.nodes) + ring.radius;
        return new THREE.Vector3(Math.cos(a) * ring.radius, Math.sin(a) * ring.radius, 0).applyEuler(euler);
    });
});

function Ring({ radius, tilt, speed, color, ringIndex }: {
    radius: number; tilt: number[]; speed: number; color: string; ringIndex: number;
}) {
    const group = useRef<THREE.Group>(null);
    const isBlue = color === "#536BFA";
    useFrame((_, delta) => {
        if (group.current) group.current.rotation.z += delta * speed;
    });
    return (
        <group rotation={tilt as [number, number, number]}>
            <group ref={group}>
                <mesh>
                    <torusGeometry args={[radius, 0.011, 8, 160]} />
                    <meshStandardMaterial color={color} metalness={0.6} roughness={0.35} />
                </mesh>
                {RING_NODES[ringIndex].map((pos, j) => (
                    <mesh key={j} position={pos}>
                        <sphereGeometry args={[isBlue && j % 2 === 0 ? 0.064 : 0.05, 20, 20]} />
                        {isBlue && j % 2 === 0 ? (
                            <meshStandardMaterial color="#536BFA" emissive="#536BFA" emissiveIntensity={0.5} roughness={0.3} metalness={0.2} />
                        ) : (
                            <meshStandardMaterial color="#2E2E28" metalness={0.9} roughness={0.18} />
                        )}
                    </mesh>
                ))}
            </group>
        </group>
    );
}

function Connections() {
    const geometry = useMemo(() => {
        const pts = RING_NODES.flat();
        const verts: number[] = [];
        pts.forEach((p) => verts.push(0, 0, 0, p.x, p.y, p.z));
        pts.forEach((p, i) => {
            const q = pts[(i + 2) % pts.length];
            verts.push(p.x, p.y, p.z, q.x, q.y, q.z);
        });
        const geo = new THREE.BufferGeometry();
        geo.setAttribute("position", new THREE.Float32BufferAttribute(verts, 3));
        return geo;
    }, []);
    return (
        <lineSegments geometry={geometry}>
            <lineBasicMaterial color="#25251F" transparent opacity={0.15} />
        </lineSegments>
    );
}

function Particles({ count = 200 }: { count?: number }) {
    const ref = useRef<THREE.Points>(null);
    const positions = useMemo(() => {
        const arr = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            const r = 2.3 + Math.random() * 1.0;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
            arr[i * 3 + 1] = r * Math.cos(phi) * 0.7;
            arr[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
        }
        return arr;
    }, [count]);
    useFrame((state, delta) => {
        if (ref.current) {
            ref.current.rotation.y += delta * 0.02;
            ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.08) * 0.06;
        }
    });
    return (
        <points ref={ref}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" args={[positions, 3]} />
            </bufferGeometry>
            <pointsMaterial size={0.018} color="#25251F" transparent opacity={0.45} sizeAttenuation />
        </points>
    );
}

function Core() {
    const solid = useRef<THREE.Mesh>(null);
    const cage = useRef<THREE.Mesh>(null);
    useFrame((state, delta) => {
        if (solid.current) {
            solid.current.rotation.y -= delta * 0.1;
            solid.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
        }
        if (cage.current) {
            cage.current.rotation.y += delta * 0.05;
            cage.current.rotation.x += delta * 0.02;
        }
    });
    return (
        <group>
            <mesh ref={solid}>
                <icosahedronGeometry args={[1.02, 0]} />
                <meshStandardMaterial color="#2B2B25" metalness={0.92} roughness={0.25} flatShading />
            </mesh>
            <mesh ref={cage}>
                <icosahedronGeometry args={[1.5, 1]} />
                <meshBasicMaterial color="#25251F" wireframe transparent opacity={0.14} />
            </mesh>
        </group>
    );
}

function Rig({ children }: { children: React.ReactNode }) {
    const group = useRef<THREE.Group>(null);
    const scrollRef = useRef(0);
    useEffect(() => {
        const onScroll = () => {
            scrollRef.current = Math.min(1, Math.max(0, window.scrollY / Math.max(1, window.innerHeight)));
        };
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);
    useFrame((state, delta) => {
        if (!group.current) return;
        const p = state.pointer;
        const scroll = scrollRef.current;
        const k = 1 - Math.pow(0.001, delta);
        group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, p.x * 0.38 + scroll * 0.9, k);
        group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -p.y * 0.22 + scroll * 0.22, k);
        group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, scroll * 1.35, k);
        const s = 1 - scroll * 0.14;
        group.current.scale.setScalar(THREE.MathUtils.lerp(group.current.scale.x, s, k));
    });
    return <group ref={group}>{children}</group>;
}

export default function SculptureScene() {
    return (
        <Canvas
            camera={{ position: [0, 0.3, 7.3], fov: 42 }}
            dpr={[1, 1.75]}
            gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
            style={{ width: "100%", height: "100%" }}
        >
            <LocalEnvironment />
            <ambientLight intensity={0.5} />
            <directionalLight position={[4, 6, 5]} intensity={1.6} />
            <pointLight position={[-6, -3, -4]} intensity={22} color="#536BFA" />
            <pointLight position={[5, 2, 4]} intensity={8} color="#F1EEE7" />
            <Rig>
                <Core />
                {RINGS.map((r, i) => (
                    <Ring key={i} {...r} ringIndex={i} />
                ))}
                <Connections />
                <Particles />
            </Rig>
        </Canvas>
    );
}
