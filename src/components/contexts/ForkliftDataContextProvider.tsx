import { useSnackbar } from "notistack";
import React, { createContext, useMemo, useState } from "react";
import { createDummyForkliftData } from "../../assets";
import { ForkliftData, LoadingCargoForkliftData } from "../../types";

type ForkliftDataContextProps = {
  forklift_data: ForkliftData;
  is_clear: boolean;
  is_far?: boolean;
  is_very_far?: boolean;
};

type ForkliftDataContextProviderProps = {
  children?: React.ReactNode;
};

const ForkliftDataContext = createContext<ForkliftDataContextProps>({
  forklift_data: createDummyForkliftData(),

  is_clear: false,
});

const ForkliftDataContextProvider: React.FunctionComponent<
  ForkliftDataContextProviderProps
> = (props) => {
  const [data, setData] = useState<LoadingCargoForkliftData>({
    forklift: {
      distance_to_pallet: {
        y: 25,
        x: 30,
      },
    },
    pallet: {
      position: [0, 25, 140],
      angle: 0,
      dimensions: {
        height: 9,
        width: 75,
      },
    },
  });
  const { enqueueSnackbar } = useSnackbar();

  const forklift_data: ForkliftData = useMemo(() => {
    const { forklift, pallet } = data;
    return {
      forklift: {
        height: pallet.position[1] - forklift.distance_to_pallet.y,
      },
      target: {
        position: [
          forklift.distance_to_pallet.x,
          pallet.position[1],
          pallet.position[2],
        ],
        horizontal: {
          value: Math.abs(forklift.distance_to_pallet.x),
          raw_value: forklift.distance_to_pallet.x,
          is_okay: Math.abs(forklift.distance_to_pallet.x) < 1,
          direction: forklift.distance_to_pallet.x > 0 ? "right" : "left",
        },
        vertical: {
          value: Math.abs(forklift.distance_to_pallet.y),
          raw_value: forklift.distance_to_pallet.y,
          is_okay: Math.abs(forklift.distance_to_pallet.y) < 1,
          direction: forklift.distance_to_pallet.y > 0 ? "up" : "down",
        },
        forward: {
          value: Math.abs(pallet.position[2]),
          raw_value: pallet.position[2],
          is_okay: Math.abs(pallet.position[2]) < 1,
          direction: pallet.position[2] > 0 ? "forward" : "backward",
        },
        distance: {
          value: Math.sqrt(
            Math.pow(forklift.distance_to_pallet.x, 2) +
              Math.pow(pallet.position[2], 2)
          ),
          angle_radians:
            Math.atan(
              Math.abs(forklift.distance_to_pallet.x) / pallet.position[2]
            ) * (forklift.distance_to_pallet.x > 0 ? -1 : 1),
        },
        angle: {
          value: Math.abs(pallet.angle),
          raw_value: pallet.angle,
          is_okay: Math.abs(pallet.angle) < 1,
          direction: Math.abs(pallet.angle) > 1 ? "right" : "left",
          radians_value: (pallet.angle * Math.PI) / 180,
        },
        dimensions: pallet.dimensions,
      },
    };
  }, [data]);

  const is_far = useMemo(() => {
    return (
      forklift_data.target.forward.value >= 120 &&
      forklift_data.target.horizontal.value >= 80
    );
  }, [forklift_data]);

  const is_very_far = useMemo(() => {
    return forklift_data.target.horizontal.value >= 100;
  }, [forklift_data]);

  const is_clear = useMemo(() => {
    if (!forklift_data.target.forward.is_okay) {
      enqueueSnackbar("distance not clear", {
        variant: "error",
        id: "distance_error",
      });
    }

    if (!forklift_data.target.angle.is_okay) {
      enqueueSnackbar("rotation angle not clear", {
        variant: "error",
        id: "rotation_error",
      });
    }

    if (!forklift_data.target.vertical.is_okay) {
      enqueueSnackbar("vertical height not clear", {
        variant: "error",
        id: "vertical_error",
      });
    }

    if (!forklift_data.target.horizontal.is_okay) {
      enqueueSnackbar("horizontal distance not clear", {
        variant: "error",
        id: "horizontal_error",
      });
    }

    return (
      forklift_data.target.forward.is_okay &&
      forklift_data.target.horizontal.is_okay &&
      forklift_data.target.vertical.is_okay &&
      forklift_data.target.angle.is_okay
    );
  }, [forklift_data]);

  return (
    <ForkliftDataContext.Provider
      value={{ forklift_data, is_clear, is_far, is_very_far }}
    >
      {props.children}
    </ForkliftDataContext.Provider>
  );
};

export { ForkliftDataContextProvider, ForkliftDataContext };
