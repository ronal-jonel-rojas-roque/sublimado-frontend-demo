import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const PARTICLE_COUNT = 6000;
const SPHERE_RADIUS = 3.2;

export default function ParticleField() {
    const pointsRef = useRef<THREE.Points>(null);

    const { mouse, viewport } = useThree();

    const dataRef = useRef<{
        positions: Float32Array;
        originalPositions: Float32Array;
        velocities: Float32Array;
    } | null>(null);

    if (!dataRef.current) {
        const positions = new Float32Array(PARTICLE_COUNT * 3);
        const originalPositions = new Float32Array(PARTICLE_COUNT * 3);
        const velocities = new Float32Array(PARTICLE_COUNT * 3);

        for (let i = 0; i < PARTICLE_COUNT; i++) {
            const phi = Math.acos(2 * Math.random() - 1);
            const theta = Math.random() * Math.PI * 2;

            const radius =
                SPHERE_RADIUS + (Math.random() - 0.5) * 0.5;

            const x =
                radius * Math.sin(phi) * Math.cos(theta);

            const y =
                radius * Math.sin(phi) * Math.sin(theta);

            const z =
                radius * Math.cos(phi);

            positions[i * 3] = x;
            positions[i * 3 + 1] = y;
            positions[i * 3 + 2] = z;

            originalPositions[i * 3] = x;
            originalPositions[i * 3 + 1] = y;
            originalPositions[i * 3 + 2] = z;
        }

        dataRef.current = {
            positions,
            originalPositions,
            velocities,
        };
    }

    const {
        positions,
        originalPositions,
        velocities,
    } = dataRef.current;

    useFrame((state) => {
        if (!pointsRef.current) return;

        const geometry = pointsRef.current.geometry;

        const pos =
            geometry.attributes.position
                .array as Float32Array;

        const mouseX =
            mouse.x * viewport.width * 0.5;

        const mouseY =
            mouse.y * viewport.height * 0.5;

        const time = state.clock.elapsedTime;

        for (let i = 0; i < PARTICLE_COUNT; i++) {
            const index = i * 3;

            let x = pos[index];
            let y = pos[index + 1];
            let z = pos[index + 2];

            const ox = originalPositions[index];
            const oy = originalPositions[index + 1];
            const oz = originalPositions[index + 2];

            const dx = x - mouseX;
            const dy = y - mouseY;

            const distance = Math.sqrt(
                dx * dx + dy * dy
            );

            const influenceRadius = 1.2;

            if (distance < influenceRadius) {
                const influence =
                    1 - distance / influenceRadius;

                const force =
                    influence *
                    influence *
                    0.12;

                velocities[index] +=
                    dx * force;

                velocities[index + 1] +=
                    dy * force;
            }

            velocities[index] *= 0.95;
            velocities[index + 1] *= 0.95;
            velocities[index + 2] *= 0.95;

            x += velocities[index];
            y += velocities[index + 1];
            z += velocities[index + 2];

            x += (ox - x) * 0.006;
            y += (oy - y) * 0.006;
            z += (oz - z) * 0.006;

            x +=
                Math.sin(time + i * 0.01) *
                0.0008;

            y +=
                Math.cos(time + i * 0.01) *
                0.0008;

            pos[index] = x;
            pos[index + 1] = y;
            pos[index + 2] = z;
        }

        geometry.attributes.position.needsUpdate =
            true;

        pointsRef.current.rotation.y +=
            0.00025;
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    args={[positions, 3]}
                />
            </bufferGeometry>

            <pointsMaterial
                color="#ffffff"
                size={0.015}
                transparent
                opacity={0.75}
                depthWrite={false}
                blending={
                    THREE.AdditiveBlending
                }
            />
        </points>
    );
}