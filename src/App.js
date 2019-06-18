import React, { useState } from "react";
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

  return (
    <div className={classes.App}>
      <main className={classes.main}>
        <header className={classes.header}>
          <h1>Matching Game</h1>
        </header>
        <ScorePanel />
        <CardBoard cards={cards} />
      </main>
    </div>
  );
}
