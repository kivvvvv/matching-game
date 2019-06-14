import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  Card: {
    flexBasis: "20vw",
    height: "20vw",
    maxWidth: "124px",
    maxHeight: "124px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    // fontSize: 0,
    fontSize: "2rem",
    cursor: "pointer",
    background: "#2e3d49",
    color: "#ffffff",
    borderRadius: "8px",
    boxShadow: "5px 2.5px 20px 0 rgba(46, 61, 73, 0.5)"
  }
});

export default function Card(props) {
  const classes = useStyles();

  return (
    <li className={classes.Card}>
      <i className={`fa fa-${props.cardFace}`} />
    </li>
  );
}
