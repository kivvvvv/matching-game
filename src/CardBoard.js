import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Card from "./Card";

const useStyles = makeStyles({
  CardBoard: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "100%",
    height: "100%",
    maxWidth: "624px",
    maxHeight: "624px",
    margin: 0,
    padding: "8px",
    borderRadius: "10px",
    boxShadow: "12px 15px 20px 0 rgba(46, 61, 73, 0.5)",
    background: "linear-gradient(160deg, #02ccba 0%, #aa7ecd 100%)"
  }
});

const cardFaces = [
  "gem",
  "gem",
  "paper-plane",
  "paper-plane",
  "anchor",
  "anchor",
  "bolt",
  "bolt",
  "cube",
  "cube",
  "leaf",
  "leaf",
  "bicycle",
  "bicycle",
  "bomb",
  "bomb"
];

export default function CardBoard() {
  const classes = useStyles();

  return (
    <ul className={classes.CardBoard}>
      {cardFaces.map((face, index) => (
        <Card key={index} cardFace={face} />
      ))}
    </ul>
  );
}
