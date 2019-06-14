import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import CardBoard from "./CardBoard";

import geometry2 from "./img/geometry2.png";
import "@fortawesome/fontawesome-free/css/all.min.css";

const useStyles = makeStyles({
  App: {
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

  return (
    <div className={classes.App}>
      <main className={classes.main}>
        <header className={classes.header}>
          <h1>Matching Game</h1>
        </header>
        <CardBoard />
      </main>
    </div>
  );
}
