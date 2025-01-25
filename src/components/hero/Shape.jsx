import { MeshDistortMaterial, Sphere } from "@react-three/drei";
import React from "react";

const Shape = () => {
  return (
    <>
      <Sphere args={[1, 100, 500]} scale={(1, 3)}>
        <MeshDistortMaterial
          color="#DB8B9B"
          attach="material"
          distort={0.4}
          speed={2}
        />
      </Sphere>
      <ambientLight intensity={2} />
      <directionalLight position={[1, 2, 3]} />
    </>
  );
};

export default Shape;
