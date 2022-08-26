import { FLTurnLeftSvg, FLTurnRightSvg } from "../../assets";
import { InfoIcon, InfoIconProps } from "../molecules";

type AngleDataIconProps = InfoIconProps & {
  direction?: "left" | "right";
};

const AngleDataIcon: React.FunctionComponent<AngleDataIconProps> = (props) => {
  const { direction = "right", ...others } = props;
  return (
    <InfoIcon
      {...others}
      iconUrl={direction === "right" ? FLTurnRightSvg : FLTurnLeftSvg}
    />
  );
};

export { AngleDataIcon };
