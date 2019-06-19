import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

const useStyles = makeStyles({
  Card: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexBasis: "20vw",
    height: "20vw",
    maxWidth: "124px",
    maxHeight: "124px",
    fontSize: 0,
    color: "#ffffff",
    cursor: "pointer",
    borderRadius: "8px",
    boxShadow: "5px 2.5px 20px 0 rgba(46, 61, 73, 0.5)",
    overflow: "hidden",
    background: "#2e3d49",
    transformStyle: "preserve-3d",
    transition: "all 400ms"
  },
  "@global": {
    ".open": {
      transform: "rotateY(180deg)",
      fontSize: "2rem",
      backgroundColor: "#02b3e4",
      cursor: "default",
      "& i": {
        transform: "rotateY(180deg)"
      }
    },
    ".rubberBand": {
      fontSize: "2rem",
      backgroundColor: "#02ccba"
    },
    ".wobble": {
      backgroundColor: "#f03434"
    }
  }
});

export default function Card(props) {
  const classes = useStyles();

  const handleClick = () => {
    props.onOpenCardClick(props.cardIndex);
  };

  return (
    <li
      className={clsx(
        classes.Card,
        { open: props.isCardOpened },
        { "animated rubberBand": props.isCardSolved },
        { "animated wobble": props.isCardMismatch }
      )}
      onClick={props.isCardOpened || props.isCardMismatch ? null : handleClick}
    >
      <i className={`fa fa-${props.cardFace}`} />
    </li>
  );
}
