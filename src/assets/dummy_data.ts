import { ForkliftData, LoadingCargoForkliftData } from "../types";

function createLoadingCargoForkliftData(): LoadingCargoForkliftData {
  return {
    forklift: {
      distance_to_pallet: {
        y: 50,
        x: 0,
      },
    },
    pallet: {
      position: [0, 0, 140],
      angle: 0,
      dimensions: {
        height: 9,
        width: 75,
        length: 40,
      },
    },
  };
}

function createDummyForkliftData(): ForkliftData {
  return {
    target: {
      position: [0, 0, 120],
      horizontal: {
        value: 20,
        direction: "left",
        is_okay: false,
        raw_value: 20,
      },
      vertical: {
        value: 20,
        direction: "down",
        is_okay: false,
        raw_value: 20,
      },
      forward: {
        value: 120,
        direction: "forward",
        is_okay: false,
        raw_value: 20,
      },
      distance: {
        value: 120,
        angle_radians: 2,
      },
      angle: {
        value: 9.5,
        direction: "left",
        radians_value: 2,
        is_okay: false,
        raw_value: 20,
      },
      dimensions: {
        height: 5,
        width: 63,
        length: 40,
      },
    },
    forklift: {
      height: 23,
    },
  };
}

export { createLoadingCargoForkliftData, createDummyForkliftData };
