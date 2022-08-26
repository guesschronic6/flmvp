import { FLDownSvg, FLUpSvg } from "../../assets";
import { InfoIcon, InfoIconProps } from "../molecules";

type VerticalDataIconProps = InfoIconProps & {
  direction?: "up" | "down";
};

const VerticalDataIcon: React.FunctionComponent<VerticalDataIconProps> = (
  props
) => {
  const { direction = "up", ...others } = props;
  return (
    <InfoIcon {...others} iconUrl={direction === "up" ? FLUpSvg : FLDownSvg} />
  );
};

export { VerticalDataIcon };
