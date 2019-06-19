import React, { useState, useEffect } from "react";
import Card from "./Card";
import useStyles from "./styles/CardBoardStyles";

export default function CardBoard(props) {
  const classes = useStyles();

  useEffect(() => {
    if (props.isGameStarted) {
      Promise.resolve()
        .then(() => {
          setOpenedCardIndex(
            new Set(props.cards.map((card, cardIndex) => cardIndex))
          );
          setSolvedCardIndex(new Set());
          setMisMatchCardIndex(new Set());
        })
        .then(() => {
          setTimeout(() => {
            setOpenedCardIndex(new Set());
          }, 5000);
        });
    } else {
      setOpenedCardIndex(new Set());
      setSolvedCardIndex(new Set());
      setMisMatchCardIndex(new Set());
    }
  }, [props.isGameStarted, props.cards]);

  const [openedCardIndex, setOpenedCardIndex] = useState(new Set());
  const [solvedCardIndex, setSolvedCardIndex] = useState(new Set());
  const [mismatchCardIndex, setMisMatchCardIndex] = useState(new Set());

  const isCardMatch = cardIndex => {
    const currentCard = props.cards[cardIndex];
    const openedCard = props.cards[openedCardIndex.values().next().value];
    return currentCard === openedCard;
  };

  const handleOpenCardClick = cardIndex => {
    setOpenedCardIndex(prevOpenedCardIndex => {
      return new Set(prevOpenedCardIndex).add(cardIndex);
    });
    // Check if at least one card is opened then do the match
    if (openedCardIndex.size === 1) {
      props.onSetMoveCount(prevMoveCount => prevMoveCount + 1);

      if (isCardMatch(cardIndex)) {
        props.onSetMatchCount(prevMatchCount => prevMatchCount + 1);

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
        props.onSetMissMatchCount(prevMissMatchCount => prevMissMatchCount + 1);

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
