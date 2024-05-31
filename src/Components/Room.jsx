import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Plane, Box } from '@react-three/drei';
import './Room.css';  // Import the CSS file for Room component

const Room = () => {
    const [selectedObject, setSelectedObject] = useState(null);
    const [objects, setObjects] = useState([
        { id: 1, position: [2, 0.5, 2], color: 'red' },
        { id: 2, position: [-2, 0.5, -2], color: 'blue' },
    ]);

    const handlePointerDown = (id) => {
        setSelectedObject(id);
    };

    const handlePointerUp = () => {
        setSelectedObject(null);
    };

    const handlePointerMove = (event) => {
        if (selectedObject !== null) {
            const newPosition = event.point.toArray();
            setObjects((prevObjects) =>
                prevObjects.map((obj) =>
                    obj.id === selectedObject ? { ...obj, position: newPosition } : obj
                )
            );
        }
    };

    return (
        <Canvas className="room-canvas" camera={{ position: [0, 10, 10], fov: 50 }}>
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 20, 10]} angle={0.15} penumbra={1} />
            <pointLight position={[-10, -10, -10]} />

            <Plane
                rotation-x={-Math.PI / 2}
                args={[100, 100]}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
            >
                <meshStandardMaterial attach="material" color="darkgray" />
            </Plane>

            {objects.map((obj) => (
                <Box
                    key={obj.id}
                    position={obj.position}
                    args={[1, 1, 1]}
                    onPointerDown={() => handlePointerDown(obj.id)}
                    onPointerMove={handlePointerMove}
                    onPointerUp={handlePointerUp}
                >
                    <meshStandardMaterial attach="material" color={obj.color} />
                </Box>
            ))}

            <OrbitControls />
        </Canvas>
    );
};

export default Room;
