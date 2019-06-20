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
    // In any cases, open the card first, this however will be opened in the next re-render
    setOpenedCardIndex(prevOpenedCardIndex => {
      return new Set(prevOpenedCardIndex).add(cardIndex);
    });
    // Then, check if at least one card is CURRENTLY opened then do the match
    if (openedCardIndex.size === 1) {
      props.onSetMoveCount(prevMoveCount => prevMoveCount + 1);

      if (isCardMatch(cardIndex)) {
        // In case, we find a match
        props.onSetMatchCount(prevMatchCount => prevMatchCount + 1);

        Promise.resolve().then(() => {
          // First, the re-rendering will occur, the card will be animated as opened
          // Then, after 400ms, the card will be animated as matched
          setTimeout(() => {
            setSolvedCardIndex(prevSolvedCardIndex => {
              return new Set(prevSolvedCardIndex)
                .add(openedCardIndex.values().next().value)
                .add(cardIndex);
            });
            setOpenedCardIndex(new Set());
          }, 400);
        });
      } else {
        // In case, they don't match
        props.onSetMissMatchCount(prevMissMatchCount => prevMissMatchCount + 1);

        Promise.resolve()
          .then(() => {
            // This variable below is important. It keeps the opened card index
            // which we will toggle it out to achieve correct transition effect
            const tempOpenedCardIndex = openedCardIndex;

            // First, again, the re-rendering will occur, the card will be animated as opened
            // Then, after 400ms, the card will be animated as mismatched
            return new Promise(resolve => {
              setTimeout(() => {
                setMisMatchCardIndex(
                  new Set()
                    .add(openedCardIndex.values().next().value)
                    .add(cardIndex)
                );
                // Notice here, we need to toggle it in order to show a correct transition
                setOpenedCardIndex(new Set());
                resolve();
              }, 400);
            }).then(() => {
              // Second, after 1000ms, the card done animated as mismatched
              return new Promise(resolve => {
                setTimeout(() => {
                  setMisMatchCardIndex(new Set());
                  // Second notice here, we toggle it with what we have just stored earlier
                  setOpenedCardIndex(
                    new Set(tempOpenedCardIndex).add(cardIndex)
                  );
                  resolve();
                }, 1000);
              });
            });
          })
          .then(() => {
            setTimeout(() => {
              setOpenedCardIndex(new Set());
            }, 0);
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
