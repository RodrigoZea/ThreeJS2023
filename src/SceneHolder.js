import { PerspectiveCamera } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useCallback, useEffect, useRef } from "react";
import { Mesh } from "three";

function LookAtCube() {
    const meshRef = useRef();

    useFrame(({ mouse, viewport }) => {
        if (!meshRef.current) {
          return;
        }


        const x = (mouse.x * viewport.width) / 2.5
        const y = (mouse.y * viewport.height) / 2.5
        meshRef.current.lookAt(x, y, 1)

        if (meshRef.current.position.y <= -1) {
            meshRef.current.position.y += 0.02;
        }
    })
      
    return(
        <mesh ref={meshRef} position={[-2.5, -2, 0]}>
            <boxGeometry />
            <meshStandardMaterial color="purple"/>
        </mesh>
    )
}

export default function SceneHolder() {
    return(
        <Canvas camera={{ position: [0, 0, 2] }}>
            <ambientLight />
            <pointLight position={[10, 10, 10]}/>
            <LookAtCube/>
        </Canvas>
    );
}