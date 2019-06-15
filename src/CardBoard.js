import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import cardFaces from "./cardFaces";
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

export default function CardBoard() {
  const classes = useStyles();

  // [cardIndex, cardFace]
  const [matchingCard, setMatchingCard] = useState(new Map());
  // [cardIndex]
  const [matchedCardIndex, setMatchedCardIndex] = useState(new Set());
  // [cardIndex]
  const [unmatchedCardIndex, setUnmatchedCardIndex] = useState(new Set());
  const [animation, setAnimation] = useState(null);

  const handleOpenCardClick = (currentIndex, currentFace) => {
    setMatchingCard(prevMatchingCard => {
      return new Map(prevMatchingCard).set(currentIndex, currentFace);
    });

    if (matchingCard.size > 0) {
      if (matchingCard.entries().next().value[1] === currentFace) {
        setMatchedCardIndex(prevMatchedCardIndex => {
          return new Set(prevMatchedCardIndex)
            .add(matchingCard.entries().next().value[0])
            .add(currentIndex);
        });
        setAnimation("match");
      } else {
        // define unmatched
        setUnmatchedCardIndex(prevUnmatchedCardIndex => {
          return new Set(prevUnmatchedCardIndex)
            .add(matchingCard.entries().next().value[0])
            .add(currentIndex);
        });
        setAnimation("unmatch");
      }
    }
  };

  return (
    <ul className={classes.CardBoard}>
      {cardFaces.map((face, index) => (
        <Card
          key={index}
          cardFace={face}
          cardIndex={index}
          animation={
            matchedCardIndex.has(index) || unmatchedCardIndex.has(index)
              ? animation
              : null
          }
          onOpenCardClick={handleOpenCardClick}
        />
      ))}
    </ul>
  );
}
