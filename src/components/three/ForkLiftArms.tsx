import { Cone, Line, Text } from "@react-three/drei";
import { useMemo } from "react";
import { ForkData, ForkliftData } from "../../types";
import { DoubleSide } from "three";
import { useForkliftDataContext } from "../contexts";

type ForkLiftArmsProps = {
  data: ForkliftData;
  is_clear?: boolean;
  variant?: "loading" | "unloading";
  is_very_far?: boolean;
};
type ForkProps = {
  position: "left" | "right";
  data: ForkliftData;
  is_clear?: boolean;
  variant?: "loading" | "unloading";
};

const dimensions = {
  thickness: 3.5,
  width: 8,
  length: 25,
  distanceGap: 25,
  offset: 4,
};
const Fork: React.FunctionComponent<ForkProps> = (props) => {
  const { position, data, is_clear, variant = "loading" } = props;
  const color = "#808080";

  const [forkGuideLength, forkGuideZPos] = useMemo(() => {
    const forkGuideLength = data.target.forward.raw_value - dimensions.length;
    const forkGuideZPos = -(dimensions.length / 2) - forkGuideLength / 2;
    return [forkGuideLength + 5, forkGuideZPos];
  }, [data]);

  return (
    <group
      position={[
        position == "left"
          ? -dimensions.distanceGap + dimensions.offset
          : dimensions.distanceGap + dimensions.offset,
        data.forklift.height,
        5,
      ]}
    >
      {variant == "loading" && (
        <mesh
          position={[
            0,
            0,
            Math.abs(-data.target.forward.raw_value - 2.5) >= 22.5
              ? -data.target.forward.raw_value - 2.5
              : -25.5,
          ]}
        >
          <boxGeometry args={[dimensions.width, dimensions.thickness, 1]} />
          <meshToonMaterial color={"#fff"} transparent opacity={1} />
        </mesh>
      )}

      <group position={[0, 0, -dimensions.length / 2]}>
        <mesh>
          <boxGeometry
            args={[dimensions.width, dimensions.thickness, dimensions.length]}
          />
          <meshToonMaterial color={"#fff"} transparent opacity={0.7} />
        </mesh>

        {variant === "loading" && (
          <mesh position={[0, 0, forkGuideZPos]}>
            <boxGeometry
              args={[dimensions.width, dimensions.thickness, forkGuideLength]}
            />
            <meshToonMaterial color={color} transparent opacity={0.3} />
          </mesh>
        )}
      </group>

      {!is_clear && (
        <group position={[0, 0, -dimensions.length / 2]}>
          <Line
            points={[
              [-4.5, data.target.vertical.raw_value, dimensions.length / 2],
              [4.5, data.target.vertical.raw_value, dimensions.length / 2],
            ]}
            color="#18A0FB"
            transparent
            opacity={0.7}
            lineWidth={5}
          />
          <Line
            points={[
              [0, dimensions.thickness / 2, dimensions.length / 2],
              [
                0,
                data.target.vertical.raw_value -
                  (data.target.vertical.direction == "up" ? 3.5 : -3.5),
                dimensions.length / 2,
              ],
            ]}
            color="#18A0FB"
            transparent
            opacity={0.8}
            lineWidth={15}
            dashed
            dashSize={5}
          />
          <Cone
            position={[
              0,
              data.target.vertical.raw_value +
                (data.target.vertical.direction === "down" ? 2.5 : -2.5),
              dimensions.length / 2,
            ]}
            args={[3, 4]}
            rotation={[
              data.target.vertical.direction === "down"
                ? (180 * Math.PI) / 180
                : 0,
              0,
              0,
            ]}
          >
            <meshBasicMaterial color="#18A0FB" />
          </Cone>

          <group
            position={[
              position == "left" ? -dimensions.width : dimensions.width,
              data.target.vertical.raw_value / 2,
              dimensions.length / 2,
            ]}
          >
            <mesh>
              <boxGeometry args={[8, 4, 0]} />
              <meshBasicMaterial color={"#000"} transparent opacity={0.6} />
            </mesh>
            <Text scale={15} color={"white"}>
              {`${data.target.vertical.value}cm`}
            </Text>

            <Text position={[0, 4, 0]} scale={13} color={"white"}>
              {data.target.vertical.direction === "down"
                ? "drop down"
                : "lift up"}
            </Text>
          </group>
        </group>
      )}
    </group>
  );
};

const ForkLiftArms: React.FunctionComponent<ForkLiftArmsProps> = (props) => {
  const { data, is_clear, variant = "loading", is_very_far } = props;

  return (
    <group>
      <Fork position="left" data={data} is_clear={is_clear} variant={variant} />
      {variant === "unloading" && (
        <group position={[4, data.forklift.height, -14.5]}>
          <mesh>
            <boxGeometry args={[70, 6.5, 35]} />
            <meshToonMaterial
              side={DoubleSide}
              color={"#D3B881"}
              transparent
              opacity={0.5}
            />
          </mesh>
          <mesh position={[-dimensions.distanceGap, 0, 0]}>
            <boxGeometry args={[15, 5, 35.3]} />
            <meshToonMaterial
              side={DoubleSide}
              color={"#4f4636"}
              transparent
              opacity={0.7}
            />
          </mesh>
          <mesh position={[dimensions.distanceGap, 0, 0]}>
            <boxGeometry args={[15, 5, 35.3]} />
            <meshToonMaterial
              side={DoubleSide}
              color={"#4f4636"}
              transparent
              opacity={0.7}
            />
          </mesh>
        </group>
      )}
      {!is_clear && !is_very_far && (
        <mesh
          position={[
            4 + data.target.horizontal.raw_value / 2,
            variant === "loading"
              ? data.forklift.height
              : data.forklift.height + 3.5,
            -data.target.forward.raw_value / 2,
          ]}
          rotation={[0, data.target.distance.angle_radians, 0]}
        >
          <boxGeometry args={[35, 1, data.target.distance.value]} />
          <meshToonMaterial
            side={DoubleSide}
            color={"#0653bf"}
            transparent
            opacity={0.65}
          />
        </mesh>
      )}
      <Fork
        position="right"
        data={data}
        is_clear={is_clear}
        variant={variant}
      />
      {!is_clear && (
        <group position={[0, 0, 3.5]}>
          <group>
            <Line
              points={[
                [0, 10, 0],
                [0, 40, 0],
              ]}
              color="white"
              lineWidth={1}
              dashed
              dashSize={4}
              transparent
              opacity={0.8}
            />

            <group
              position={[
                data.target.horizontal.direction === "right" ? -6 : 6,
                30,
                0,
              ]}
            >
              <mesh>
                <boxGeometry args={[6, 2.5, 0]} />
                <meshBasicMaterial color={"#000"} transparent opacity={0.6} />
              </mesh>
              <Text scale={10} color={"white"}>
                {`${data.target.horizontal.value}cm`}
              </Text>

              <Text position={[0, 2.5, 0]} scale={12} color={"white"}>
                {`move ${data.target.horizontal.direction}`}
              </Text>
              <Cone
                position={[
                  data.target.horizontal.direction === "right" ? 4.5 : -4.5,
                  0,
                  0,
                ]}
                args={[1.5, 2]}
                rotation={[
                  0,
                  0,
                  (data.target.horizontal.direction === "right" ? -90 : 90) *
                    (Math.PI / 180),
                ]}
              >
                <meshBasicMaterial color="#18A0FB" />
              </Cone>
            </group>
          </group>
          <Line
            points={[
              [data.target.horizontal.raw_value, 10, 0],
              [data.target.horizontal.raw_value, 40, 0],
            ]}
            color="#18A0FB"
            lineWidth={1}
            dashed
            dashSize={4}
            transparent
            opacity={0.8}
          />
        </group>
      )}
      {!is_clear && (
        <group
          position={[
            5 + data.target.horizontal.raw_value,
            data.forklift.height + 4 + (variant == "loading" ? 0 : 2.5),
            -data.target.forward.raw_value + 8,
          ]}
          // rotation={[0, data.target.distance.angle_radians, 0]}
          scale={0.9}
        >
          <mesh position={[0, 2, 0]}>
            <boxGeometry args={[16, 9.5, 0]} />
            <meshBasicMaterial color={"#000"} transparent opacity={0.6} />
          </mesh>
          <Text scale={35} color={"white"}>
            {`${Math.round(data.target.distance.value * 100) / 100}cm`}
          </Text>

          <Text position={[0, 3.5, 0]} scale={20} color={"white"}>
            distance
          </Text>
        </group>
      )}
    </group>
  );
};

export { ForkLiftArms };
