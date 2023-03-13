import { useSpring, animated } from '@react-spring/three'
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { PerspectiveCamera, Scroll, ScrollControls, Preload, Html, useProgress } from "@react-three/drei";
import { useCallback, useEffect, useRef, Suspense } from "react";

function LookAtCube() {
    const meshRef = useRef();
    const {boxPositionY} = useSpring({
        from: {
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
        <animated.mesh ref={meshRef} position-x={-2.5} position-y={boxPositionY}>
            <boxGeometry />
            <meshStandardMaterial color="purple"/>
        </animated.mesh>
    )
}

function DroppingBox() {
    const meshRef = useRef();
    const {boxPositionY} = useSpring({
        from: {
            boxPositionY: -1
        }, to: [{
            boxPositionY: -3
        }],
        config: {
            mass: 10,
            friction: 30,
        },
        immediate: false,
    })
          
    return(
        <animated.mesh ref={meshRef} position-x={-2} position-y={boxPositionY}>
            <boxGeometry />
            <meshStandardMaterial color="purple"/>
        </animated.mesh>
    )
}

function ScrollableArea() {

}

function Loader() {
    const { progress } = useProgress()
    return <Html center>{progress} % loaded</Html>
}

export default function SceneHolder() {
    return(
        <Canvas>
            <PerspectiveCamera makeDefault position={[-1.3, -0.5, 2]}/>
            <ambientLight />
            <pointLight position={[10, 10, 10]}/>
            <Suspense fallback={<Loader />}>
                <ScrollControls damping={2} pages={2}>
                    <Scroll>
                        {/* Parametrize page positions so it's easier to handle here */}
                        <LookAtCube/>
                        <DroppingBox/>
                    </Scroll>
                </ScrollControls>
            </Suspense>
        </Canvas>
    );
}

/* 
Navbar on top when doing portfolio

Sections to have 
General information about myself (mascot on the left saying hi, textbox on the right)
Interests (mascot swimming through an area)
Previous work (horizontal ScrollControls)
Contact info at bottom
*/