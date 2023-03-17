import { useSpring, animated } from '@react-spring/three'
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { PerspectiveCamera, Scroll, ScrollControls, Preload, Html, useProgress } from "@react-three/drei";
import { useCallback, useEffect, useRef, Suspense } from "react";
import { BsTwitter, BsGithub } from "react-icons/bs";
import { HiMail } from "react-icons/hi";
import './index.scss'
import SVGComponent from './SVGComponent'

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

function Loader() {
    const { progress } = useProgress()
    return <Html center>{progress} % loaded</Html>
}

function Header() {
    var name = "rodrigo zea"
    var nameArr = useRef([])
    const nameArray = [...name].forEach(c => nameArr.current.push(c))
    
    return(
        <div id="header">
            <div id="name">
                {
                    nameArr.current.map((i, index) => {
                        if (index == 0 || index == 8) {
                            return(
                                <div id={"l"+index} ><span key={index}>{i}</span></div>
                            )
                        } else {
                            return(
                                <div className='animan' ><span key={index}>{i}</span></div>
                            ) 
                        }
                    })
                }
            </div>
            
            <div id="icons">
                <BsTwitter style={{marginRight:'0.3em'}}/>
                <BsGithub style={{marginRight:'0.3em'}}/>
                <HiMail/>
            </div>
            
        </div>
    )
}

export default function SceneHolder() {
    return(
        <div id="container">
            <Header/>
            <SVGComponent/>
            <Canvas>
                <PerspectiveCamera makeDefault position={[-1.3, -0.5, 2]}/>
                <ambientLight />
                <pointLight position={[10, 10, 10]}/>
                <Suspense fallback={<Loader />}>
                    <ScrollControls damping={2} pages={2}>
                        <Scroll>
                            {/* Parametrize page positions so it's easier to handle here */}
                            <LookAtCube/>
                            {/*<DroppingBox/>*/}
                        </Scroll>
                    </ScrollControls>
                </Suspense>
            </Canvas>
        </div>
    );
}

/* 
Navbar on top when doing portfolio

Sections to have 
Introductory screen with button and lookat
General information about myself (mascot on the left saying hi, textbox on the right)
Interests (mascot swimming through an area)
Previous work (horizontal ScrollControls)
Contact info at bottom
*/