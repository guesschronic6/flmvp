export type Position = [x: number, y: number, z: number];
export type Dimensions = {
  height: number;
  width: number;
  length: number;
};

export type ForkData = {
  position: Position;
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
      length: number;
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
    position: Position;
    angle: {
      yaw: number;
    };
    dimensions: Dimensions;
    holes: {
      left: LoadingCargoPalletHolesData;
      right: LoadingCargoPalletHolesData;
    };
  };
};

export type LoadingCargoPalletHolesData = {
  position: Position;
  dimensions: Dimensions;
};

export type ForkliftConfig = {
  arm: {
    length: number;
    width: number;
    thickness: number;
  };
  threshold: {
    z: number;
    x: number;
    y: number;
    angle: {
      yaw: number;
    };
  };
  offset: {
    height?: number;
    left_arm: {
      x?: number;
      y?: number;
      z?: number;
    };
    right_arm: {
      x?: number;
      y?: number;
      z?: number;
    };
    angle: {
      pitch?: number;
      yaw?: number;
      roll?: number;
    };
  };
};

export type CameraConfig = {
  height: number;
  fov: {
    x: number;
    y: number;
  };
};

export type PalletConfig = {
  offset: {
    x?: number;
    y?: number;
    z?: number;
    hole: {
      width?: number;
      height?: number;
      length?: number;
    };
  };
};

export type DropPointConfig = {
  position: {
    x?: number;
    y?: number;
    z?: number;
  };
};

export type PalletBoundingBoxConfig = {
  left?: number;
  top?: number;
  width: number;
  height: number;
  holes: {
    left: PalletBoundingBoxHoleConfig;
    right: PalletBoundingBoxHoleConfig;
    width: number;
  };
};

export type PalletBoundingBoxHoleConfig = {
  top?: number;
  left?: number;
  height: number;
  width: number;
};

export enum AppState {
  LOADING,
  UNLOADING,
}
