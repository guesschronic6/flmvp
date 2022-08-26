import { FLLeftSvg, FLRightSvg } from "../../assets";
import { InfoIcon, InfoIconProps } from "../molecules";

type HorizontalDataIconProps = InfoIconProps & {
  direction?: "left" | "right";
};

const HorizontalDataIcon: React.FunctionComponent<HorizontalDataIconProps> = (
  props
) => {
  const { direction = "right", ...others } = props;
  return (
    <InfoIcon
      {...others}
      iconUrl={direction === "right" ? FLRightSvg : FLLeftSvg}
    />
  );
};

export { HorizontalDataIcon };
