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
      fontSize: "2rem",
      color: "#ffffff",
      backgroundColor: "#02b3e4"
    }
  }
});

export default function Card(props) {
  const classes = useStyles();

  const [isOpen, setIsOpen] = useState(false);
  const [isAnimate, setIsAnimate] = useState(false);

  const handleClick = () => {
    if (props.onOpenCardClick) {
      setIsOpen(!isOpen);
      props.onOpenCardClick(props.cardFace, props.index);
    }
  };

  return (
    <CSSTransition
      in={isOpen}
      timeout={400}
      classNames={{
        enter: "open",
        enterDone: "open-done"
      }}
      onEntered={() => setIsAnimate(true)}
      onExited={() => setIsAnimate(false)}
    >
      <CSSTransition
        in={isAnimate}
        timeout={1000}
        exit={false}
        classNames={{
          enterActive: props.animate
        }}
      >
        <li className={classes.Card} onClick={isOpen ? null : handleClick}>
          <i className={`fa fa-${props.cardFace}`} />
        </li>
      </CSSTransition>
    </CSSTransition>
  );
}
