import React, { Suspense, useMemo } from "react";
import forkliftPngSrc from "../../assets/backgrounds/forklift_view.png";
import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material";
import {
  AngleDataIcon,
  VerticalDataIcon,
  HorizontalDataIcon,
} from "../organisms";
import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, useGLTF } from "@react-three/drei";
import { ForkLiftArms, PalletGuide } from "../three";
import { useGeneralContext, useForkliftDataContext } from "../contexts";
import { AppState } from "../../types";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

type MainPageProps = {};

const MainPage: React.FunctionComponent<MainPageProps> = (props) => {
  const classes = useStyles();

  const { forklift_data, is_clear, is_far, is_very_far } =
    useForkliftDataContext();
  const { appState } = useGeneralContext();

  const arrowModel = useLoader(GLTFLoader, "/arrow.glb");

  return (
    <div className={classes.root}>
      <img src={forkliftPngSrc} />
      <div className="controlls-container">
        <AngleDataIcon
          direction={forklift_data.target.angle.direction}
          value={`${forklift_data.target.angle.value}°`}
          status={forklift_data.target.angle.is_okay ? "success" : "alert"}
        />
        <HorizontalDataIcon
          direction={forklift_data.target.horizontal.direction}
          value={`${forklift_data.target.horizontal.value}cm`}
          status={forklift_data.target.horizontal.is_okay ? "success" : "alert"}
        />
        <VerticalDataIcon
          direction={forklift_data.target.vertical.direction}
          value={`${forklift_data.target.vertical.value}cm`}
          status={forklift_data.target.vertical.is_okay ? "success" : "alert"}
        />
      </div>
      <Suspense>
        <Canvas>
          {/* <OrbitControls /> */}
          <directionalLight position={[100, 100, -100]} />
          <PerspectiveCamera makeDefault position={[0, 25, 50]} />
          <ambientLight />
          <pointLight
            intensity={1}
            color={"#d4ebff"}
            position={[0, 25, -50]}
            rotation={[0, -0.5 * Math.PI, 0]}
          />
          <PalletGuide
            data={forklift_data}
            variant={appState === AppState.LOADING ? "loading" : "unloading"}
            is_clear={is_clear}
          />
          <ForkLiftArms
            data={forklift_data}
            is_clear={is_clear}
            variant={appState === AppState.LOADING ? "loading" : "unloading"}
            is_very_far={is_very_far}
          />
          {(is_far || is_very_far) && (
            <primitive
              position={[0, 50, -50]}
              scale={50}
              object={arrowModel.scene}
              color="white"
              rotation={[0, forklift_data.target.distance.angle_radians, 0]}
            />
          )}
        </Canvas>
      </Suspense>
      {is_clear && (
        <h1 className={classes.ready_to_lift}>
          {appState === AppState.LOADING
            ? "Ready To Lift"
            : "Unloading Successful"}
        </h1>
      )}
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    position: "relative",
    height: "100vh",
    maxHeight: "100vh",
    overflow: "clip",

    "&>img": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      objectFit: "contain",
    },
    "& .controlls-container": {
      display: "flex",
      flexDirection: "column",
      position: "absolute",
      alignItems: "flex-end",
      gap: "6px",
      zIndex: 100,
      top: "15px",
      right: "15px",
    },
  },
  ready_to_lift: {
    position: "absolute",
    top: "35%",
    left: "50%",
    transform: "translate(-50%,-25%)",
    color: "white",
    fontWeight: "bolder",
    fontSize: "65px",
    zIndex: 1000,
    textShadow: "1px 1px #000",
  },
}));

export { MainPage };
