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

  const testAnimation = {
    matched: "animated rubberBand",
    unmatched: "animated wobble"
  };

  const [matchingCard, setMatchingCard] = useState(new Map());
  const [matchedCardIndex, setMatchedCardIndex] = useState(new Set());

  const handleOpenCardClick = (currentIndex, currentFace) => {
    if (matchingCard.size === 0) {
      setMatchingCard(new Map(matchingCard).set(currentIndex, currentFace));
    } else {
      if (matchingCard.has(currentFace)) {
        setMatchedCardIndex(
          matchedCardIndex.add(matchingCard.get(currentFace)).add(currentIndex)
        );
        console.log(`${matchingCard.get(currentFace)} matched ${currentIndex}`);
      } else {
        console.log(
          `${matchingCard.entries().next().value[1]} unmatched ${currentIndex}`
        );
      }
      setMatchingCard(new Map());
    }
    console.log(matchingCard);
    console.log(matchedCardIndex);
  };

  console.log(matchingCard);
  console.log(matchedCardIndex);

  return (
    <ul className={classes.CardBoard}>
      {cardFaces.map((face, index) => (
        <Card
          key={index}
          cardFace={face}
          cardIndex={index}
          animate={testAnimation.matched}
          isCardOpened={matchingCard.has(index)}
          isCardMatched={null}
          onOpenCardClick={handleOpenCardClick}
        />
      ))}
    </ul>
  );
}
