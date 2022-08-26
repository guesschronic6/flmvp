import { Theme, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import clsx from "clsx";

export type InfoIconProps = {
  value: number | string;
  iconUrl?: string;
  status?: "alert" | "success";
};

const InfoIcon: React.FunctionComponent<InfoIconProps> = (props) => {
  const { value, iconUrl, status = "alert" } = props;
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography sx={{ fontWeight: 400 }} variant="body1">
        {value}
      </Typography>
      <main
        className={clsx(
          status === "alert" ? classes.alert : classes.success,
          classes.main
        )}
      >
        <img src={iconUrl}></img>
      </main>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  main: {
    borderRadius: "50%",
    position: "relative",
    height: 80,
    width: 80,
    boxSizing: "border-box",
    backdropFilter: "blur(4px)",
    background: "rgba(0,0,0,0.4)",
    "&>img": {
      height: "60%",
      width: "60%",
      objectFit: "contain",
      transform: "translate(-50%,-50%)",
      position: "absolute",
      top: "50%",
      left: "50%",
    },
  },
  success: {
    border: "3px solid",
    borderColor: theme.palette.success.main,
    boxShadow: "0px 0px 8px 1px #49CF0A",
  },
  alert: {
    border: "3px solid",
    borderColor: theme.palette.error.main,
    boxShadow: "0px 0px 8px 4px rgba(255, 16, 16, 0.51)",
    background: "rgba(137, 31, 31, 0.7)",
  },
}));

export { InfoIcon };
