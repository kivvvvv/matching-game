import React, { useState } from "react";
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
    fontSize: 0,
    cursor: "pointer",
    background: "#2e3d49",
    color: "#ffffff",
    borderRadius: "8px",
    boxShadow: "5px 2.5px 20px 0 rgba(46, 61, 73, 0.5)",
    transition: "transform 0.4s"
  },
  "@global": {
    ".open": {
      fontSize: "2rem",
      backgroundColor: "#02b3e4",
      transform: "rotateY(180deg)",
      transformStyle: "preserve-3d",
      "& i": {
        transform: "rotateY(-180deg)"
      }
    }
  }
});

export default function Card(props) {
  const classes = useStyles();

  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <li
      className={`${classes.Card} ${isOpen ? "open" : ""}`}
      onClick={handleClick}
    >
      <i className={`fa fa-${props.cardFace}`} />
    </li>
  );
}
