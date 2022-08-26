import { Line } from "@react-three/drei";
import { useEffect, useRef } from "react";
import { LineBasicMaterial } from "three";
import { ForkliftData } from "../../types";
import { useForkliftDataContext } from "../contexts";

type PalletGuideProps = {
  data: ForkliftData;
  variant?: "loading" | "unloading";
  is_clear?: boolean;
};

type PalletHoleProps = {
  position: "left" | "right";
  is_clear?: boolean;
};
const PalletHole: React.FunctionComponent<PalletHoleProps> = (props) => {
  const { position, is_clear } = props;
  const dimensions = {
    width: 17,
    height: 5,
  };

  useEffect(() => {
    console.log("[log]['is_clear value]", is_clear);
  }, [is_clear]);
  return (
    <group position={[position == "left" ? -23 : 23, 0, 0]}>
      <Line
        points={[
          [-dimensions.width / 2, dimensions.height / 2, 0.5],
          [dimensions.width / 2, dimensions.height / 2, 0.5],
          [dimensions.width / 2, -dimensions.height / 2, 0.5],
          [-dimensions.width / 2, -dimensions.height / 2, 0.5],
          [-dimensions.width / 2, dimensions.height / 2, 0.5],
        ]}
        color={"#53ff0a"}
        lineWidth={2}
        dashed
        dashSize={5}
      />
      <mesh position={[0, 0, 1]}>
        <boxGeometry args={[dimensions.width, dimensions.height, 0]} />
        <meshBasicMaterial
          color={is_clear ? "#00f508" : "black"}
          transparent
          opacity={0.5}
        />
      </mesh>
    </group>
  );
};

const PalletGuide: React.FunctionComponent<PalletGuideProps> = (props) => {
  const { data, variant = "loading", is_clear } = props;

  const dimensions = data.target.dimensions || { height: 15, width: 150 };
  const x_offset = 4 + data.target.horizontal.raw_value;

  const ref = useRef<THREE.Group>(null!);

  useEffect(() => {
    if (ref.current) {
      const translate_z =
        Math.tan(data.target.angle.raw_value) * (dimensions.width / 2);
      ref.current.rotation.y = data.target.angle.radians_value;
      ref.current.position.z = -data.target.forward.raw_value;
    }
  }, [data]);

  return (
    <group position={[x_offset, data.target.position[1], 0]} ref={ref}>
      <Line
        points={[
          [-dimensions.width / 2, dimensions.height / 2, 0.3],
          [dimensions.width / 2, dimensions.height / 2, 0.3],
          [dimensions.width / 2, -dimensions.height / 2, 0.3],
          [-dimensions.width / 2, -dimensions.height / 2, 0.3],
          [-dimensions.width / 2, dimensions.height / 2, 0.3],
        ]}
        color={"#53ff0a"}
        lineWidth={3}
        dashed
        dashSize={10}
      />
      <mesh>
        <boxGeometry args={[dimensions.width, dimensions.height, 0]} />
        <meshBasicMaterial
          color={variant === "unloading" && is_clear ? "#00f508" : "#0a450c"}
          transparent
          opacity={variant === "unloading" && is_clear ? 0.5 : 0.2}
        />
      </mesh>
      {variant === "loading" && (
        <group>
          <PalletHole is_clear={is_clear} position="left" />
          <PalletHole is_clear={is_clear} position="right" />
        </group>
      )}
    </group>
  );
};

export { PalletGuide };
