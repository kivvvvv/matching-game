import React, { useState, useEffect } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faGem,
  faPaperPlane,
  faAnchor,
  faBolt,
  faCube,
  faLeaf,
  faBicycle,
  faBomb,
  faStar,
  faRedo
} from "@fortawesome/free-solid-svg-icons";
import { faStar as farStar } from "@fortawesome/free-regular-svg-icons";

import ScorePanel from "./ScorePanel";
import CardBoard from "./CardBoard";
import cardFaces from "./cardFaces";

import useStyles from "./styles/AppStyles";
import "animate.css/animate.css";

export default function App() {
  const [cards, setCards] = useState(cardFaces);
  const [matchCount, setMatchCount] = useState(0);
  const [mismatchCount, setMissMatchCount] = useState(0);
  const [moveCount, setMoveCount] = useState(0);
  const [isGameStarted, setIsGameStarted] = useState(false);

  const classes = useStyles();
  library.add(
    faGem,
    faPaperPlane,
    faAnchor,
    faBolt,
    faCube,
    faLeaf,
    faBicycle,
    faBomb,
    faStar,
    farStar,
    faRedo
  );

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
    const goodStarIconClass = "fas star";
    const badStarIconClass = "far star";

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
