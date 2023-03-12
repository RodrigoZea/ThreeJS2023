import { useSpring, animated } from '@react-spring/three'
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useCallback, useEffect, useRef } from "react";

function LookAtCube() {
    const meshRef = useRef();
    const {boxPositionX, boxPositionY} = useSpring({
        from: {
            boxPositionX: -2.5,
            boxPositionY: -2
        }, to: [{
            boxPositionY: -1
        }],
        config: {
            mass: 5,
            friction: 30,
        },
        immediate: true,
    })
    
    useFrame(({ mouse, viewport }) => {
        if (!meshRef.current) {
          return;
        }

        const x = (mouse.x * viewport.width) / 2.5
        const y = (mouse.y * viewport.height) / 2.5
        meshRef.current.lookAt(x, y, 1)
    })
      
    return(
        <animated.mesh ref={meshRef} position-x={boxPositionX} position-y={boxPositionY}>
            <boxGeometry />
            <meshStandardMaterial color="purple"/>
        </animated.mesh>
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