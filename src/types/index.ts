export type ForkData = {
  position: [x: number, y: number, z: number];
  target: {
    distance: number;
    height: number;
    x_distance: number;
    rotation: number;
    dimensions?: {
      height: number;
      width: number;
    };
  };
};

export type ForkliftData = {
  forklift: {
    height: number;
  };
  target: {
    position: [x: number, y: number, z: number];
    horizontal: DistanceValueProps & {
      direction: "left" | "right";
    };
    vertical: DistanceValueProps & {
      direction: "up" | "down";
    };
    forward: DistanceValueProps & {
      direction: "forward" | "backward";
    };
    angle: DistanceValueProps & {
      direction: "left" | "right";
      radians_value: number;
    };
    distance: {
      value: number;
      angle_radians: number;
    };
    dimensions: {
      height: number;
      width: number;
    };
  };
};

type DistanceValueProps = {
  value: number;
  is_okay: boolean;
  raw_value: number;
};

export type LoadingCargoForkliftData = {
  forklift: {
    distance_to_pallet: {
      y: number;
      x: number;
    };
  };
  pallet: {
    position: [x: number, y: number, z: number];
    angle: number;
    dimensions: {
      height: number;
      width: number;
    };
  };
};

export enum AppState {
  LOADING,
  UNLOADING,
}
