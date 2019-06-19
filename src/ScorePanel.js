import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TimerMachine from "react-timer-machine";
import moment from "moment";
import momentDurationFormatSetup from "moment-duration-format";
import Swal from "sweetalert2";

import PogU from "./img/PogU.png";
import EZY from "./img/EZY.png";
import FeelsWeirdMan from "./img/FeelsWeirdMan.png";

momentDurationFormatSetup(moment);

const useStyles = makeStyles({
  ScorePanel: {
    fontSize: "1rem",
    display: "flex",
    justifyContent: "space-around",
    width: "25rem",
    margin: "1rem 0 0.5rem"
  },
  star: {
    display: "flex",
    flexBasis: "20%",
    justifyContent: "space-evenly",
    padding: 0,
    margin: 0,
    listStyle: "none"
  },
  moves: {
    flexBasis: "20%",
    textAlign: "center"
  },
  timer: {
    flexBasis: "20%",
    textAlign: "center"
  },
  restart: {
    flexBasis: "30%",
    textAlign: "right",
    cursor: "pointer"
  }
});

export default function ScorePanel(props) {
  const classes = useStyles();

  const [activeTimerMachine, setActiveTimerMachine] = useState(false);
  const [timestamp, setTimestamp] = useState(null);

  useEffect(() => {
    if (props.matchCount === 2) {
      setActiveTimerMachine(false);
    } else {
      setActiveTimerMachine(true);
    }
  }, [props.matchCount]);

  useEffect(() => {
    if (timestamp) {
      let imageUrl;

      const goodStarIconClass = "fas fa-star";
      const countStar = props.stars.filter(star => star === goodStarIconClass)
        .length;

      switch (countStar) {
        case 3:
          imageUrl = PogU;
          break;
        case 2:
          imageUrl = EZY;
          break;
        default:
          imageUrl = FeelsWeirdMan;
          break;
      }

      Swal.fire({
        title: props.stars.map(star => `<i class='${star}' />`).join(""),
        imageUrl: imageUrl,
        text: `Finished in ${timestamp.m * 60 + timestamp.s} seconds and ${
          props.moveCount
        } moves`
      });
    }
  }, [timestamp, props.stars, props.moveCount]);

  return (
    <div className={classes.ScorePanel}>
      <ul className={classes.star}>
        {props.stars.map((star, starIndex) => (
          <i key={starIndex} className={star} />
        ))}
      </ul>
      <div className={classes.moves}>
        <span>{props.moveCount}</span> Moves
      </div>
      <div className={classes.timer}>
        <TimerMachine
          timeStart={0}
          timeEnd={3539999}
          started={activeTimerMachine}
          paused={false}
          formatTimer={(time, ms) =>
            moment.duration(ms, "milliseconds").format("h:mm:ss")
          }
          onStart={time =>
            console.info(`Timer started: ${JSON.stringify(time)}`)
          }
          onStop={time => setTimestamp(time)}
          onTick={time => console.info(`Timer ticked: ${JSON.stringify(time)}`)}
          onPause={time =>
            console.info(`Timer paused: ${JSON.stringify(time)}`)
          }
          onResume={time =>
            console.info(`Timer resumed: ${JSON.stringify(time)}`)
          }
          onComplete={time =>
            console.info(`Timer completed: ${JSON.stringify(time)}`)
          }
        />
      </div>
      <div className={classes.restart}>
        <i className="fa fa-redo" />
      </div>
    </div>
  );
}
