import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Star from "./Star";

const useStyles = makeStyles({
  ScorePanel: {
    fontSize: "1rem",
    display: "flex",
    justifyContent: "space-around",
    width: "25rem",
    margin: "1rem 0 0.5rem"
  },
  star: {
    display: "flex",
    flexBasis: "20%",
    justifyContent: "space-evenly",
    padding: 0,
    margin: 0,
    listStyle: "none"
  },
  moves: {
    flexBasis: "20%",
    textAlign: "center"
  },
  timer: {
    flexBasis: "20%",
    textAlign: "center"
  },
  restart: {
    flexBasis: "30%",
    textAlign: "right",
    cursor: "pointer"
  }
});

export default function ScorePanel() {
  const classes = useStyles();

  return (
    <div className={classes.ScorePanel}>
      <ul className={classes.star}>
        <Star />
        <Star />
        <Star />
      </ul>
      <div className={classes.moves}>
        <span>13</span> Moves
      </div>
      <div className={classes.timer}>00:00:00</div>
      <div className={classes.restart}>
        <i className="fa fa-redo" />
      </div>
    </div>
  );
}
