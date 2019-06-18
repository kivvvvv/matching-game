import React, { useState } from "react";
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

export default function CardBoard(props) {
  const classes = useStyles();

  const [openedCardIndex, setOpenedCardIndex] = useState(new Set());
  console.log("openedCardIndex: ", JSON.stringify(Array.from(openedCardIndex)));
  const [solvedCardIndex, setSolvedCardIndex] = useState(new Set());
  console.log("solvedCardIndex: ", JSON.stringify(Array.from(solvedCardIndex)));
  const [mismatchCardIndex, setMisMatchCardIndex] = useState(new Set());

  const isCardMatch = cardIndex => {
    const currentCard = props.cards[cardIndex];
    const openedCard = props.cards[openedCardIndex.values().next().value];
    console.log(currentCard, openedCard);
    return currentCard === openedCard;
  };

  const handleOpenCardClick = cardIndex => {
    setOpenedCardIndex(prevOpenedCardIndex => {
      return new Set(prevOpenedCardIndex).add(cardIndex);
    });
    if (openedCardIndex.size === 1) {
      if (isCardMatch(cardIndex)) {
        Promise.resolve()
          .then(() => {
            return new Promise(resolve => {
              setTimeout(() => {
                setSolvedCardIndex(prevSolvedCardIndex => {
                  return new Set(prevSolvedCardIndex)
                    .add(openedCardIndex.values().next().value)
                    .add(cardIndex);
                });
                resolve();
              }, 400);
            });
          })
          .then(() => {
            setTimeout(() => {
              setOpenedCardIndex(new Set());
            }, 1000);
          });
      } else {
        Promise.resolve()
          .then(() => {
            return new Promise(resolve => {
              setTimeout(() => {
                setMisMatchCardIndex(
                  new Set()
                    .add(openedCardIndex.values().next().value)
                    .add(cardIndex)
                );
                resolve();
              }, 450);
            });
          })
          .then(() => {
            return new Promise(resolve => {
              setTimeout(() => {
                setMisMatchCardIndex(new Set());
                resolve();
              }, 1050);
            });
          })
          .then(() => {
            setTimeout(() => {
              setOpenedCardIndex(new Set());
            }, 50);
          });
      }
    }
  };

  return (
    <ul className={classes.CardBoard}>
      {props.cards.map((card, cardIndex) => (
        <Card
          key={cardIndex}
          cardIndex={cardIndex}
          cardFace={card}
          isCardOpened={openedCardIndex.has(cardIndex)}
          isCardSolved={solvedCardIndex.has(cardIndex)}
          isCardMismatch={mismatchCardIndex.has(cardIndex)}
          onOpenCardClick={handleOpenCardClick}
        />
      ))}
    </ul>
  );
}
