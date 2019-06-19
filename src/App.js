import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";

import ScorePanel from "./ScorePanel";
import CardBoard from "./CardBoard";
import cardFaces from "./cardFaces";

import geometry2 from "./img/geometry2.png";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "animate.css/animate.css";

const useStyles = makeStyles({
  App: {
    fontFamily: '"Coda", cursive',
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: `#ffffff url("${geometry2}")`
  },
  main: {
    width: "100%",
    height: "100%",
    maxWidth: "624px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  header: {
    "& h1": {
      fontFamily: '"Coda", cursive',
      margin: "1rem 0 0.5rem"
    }
  }
});

export default function App() {
  const classes = useStyles();

  const [cards, setCards] = useState(cardFaces);
  const [matchCount, setMatchCount] = useState(0);
  const [mismatchCount, setMissMatchCount] = useState(0);
  const [moveCount, setMoveCount] = useState(0);
  const [isGameStarted, setIsGameStarted] = useState(false);

  useEffect(() => {
    setCards(prevCards => {
      let unShuffleCards = [...prevCards];
      shuffleArray(unShuffleCards);
      return unShuffleCards;
    });
  }, [isGameStarted]);

  const shuffleArray = array => {
    // From https://stackoverflow.com/questions/2450954
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  const rateStartScorePanel = () => {
    const goodStarIconClass = "fas fa-star";
    const badStarIconClass = "far fa-star";

    if (mismatchCount < 5)
      return [goodStarIconClass, goodStarIconClass, goodStarIconClass];
    else if (mismatchCount >= 5 && mismatchCount <= 10)
      return [goodStarIconClass, goodStarIconClass, badStarIconClass];
    else return [goodStarIconClass, badStarIconClass, badStarIconClass];
  };

  const handleResetClick = () => {
    setMatchCount(0);
    setMissMatchCount(0);
    setMoveCount(0);
    setIsGameStarted(false);
  };

  return (
    <div className={classes.App}>
      <main className={classes.main}>
        <header className={classes.header}>
          <h1>Matching Game</h1>
        </header>
        <ScorePanel
          stars={rateStartScorePanel()}
          matchCount={matchCount}
          moveCount={moveCount}
          isGameStarted={isGameStarted}
          onResetClick={handleResetClick}
          onSetIsGameStarted={setIsGameStarted}
        />
        <CardBoard
          cards={cards}
          onSetMatchCount={setMatchCount}
          onSetMissMatchCount={setMissMatchCount}
          onSetMoveCount={setMoveCount}
          isGameStarted={isGameStarted}
        />
      </main>
    </div>
  );
}
