import React from "react";
import clsx from "clsx";

import useStyles from "./styles/CardStyles";

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
      onClick={
        props.isCardOpened || props.isCardSolved || props.isCardMismatch
          ? null
          : handleClick
      }
    >
      <i className={`fa fa-${props.cardFace}`} />
    </li>
  );
}
