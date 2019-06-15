import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { CSSTransition } from "react-transition-group";

const useStyles = makeStyles({
  Card: {
    flexBasis: "20vw",
    height: "20vw",
    maxWidth: "124px",
    maxHeight: "124px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 0,
    cursor: "pointer",
    background: "#2e3d49",
    borderRadius: "8px",
    boxShadow: "5px 2.5px 20px 0 rgba(46, 61, 73, 0.5)",
    transition: "all 400ms"
  },
  "@global": {
    ".open": {
      transform: "rotateY(180deg)",
      backgroundColor: "#02b3e4"
    },
    ".open-done": {
      transform: "rotateY(180deg)",
      fontSize: "2rem",
      color: "#ffffff",
      backgroundColor: "#02b3e4"
    }
  }
});

export default function Card(props) {
  const classes = useStyles();

  const [cardDisplayedAction, setCardDisplayedAction] = useState("close");

  const handleOpenClick = () => {
    setCardDisplayedAction("open");
  };

  return (
    <CSSTransition
      in={cardDisplayedAction === "open"}
      timeout={400}
      classNames={{
        enter: "open",
        enterDone: "open-done"
      }}
      onEntered={() => props.onOpenCardClick(props.cardIndex, props.cardFace)}
    >
      <CSSTransition
        in={Boolean(props.animation)}
        timeout={1000}
        exit={false}
        classNames={{
          enterActive:
            props.animation === "match"
              ? "animated rubberBand"
              : "animated wobble"
        }}
        onEntered={() => {
          if (props.animation === "unmatch") {
            setCardDisplayedAction("close");
          }
        }}
      >
        <li className={classes.Card} onClick={handleOpenClick}>
          <i className={`fa fa-${props.cardFace}`} />
        </li>
      </CSSTransition>
    </CSSTransition>
  );
}
