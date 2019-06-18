import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TimerMachine from "react-timer-machine";
import moment from "moment";
import momentDurationFormatSetup from "moment-duration-format";

import Star from "./Star";

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

  useEffect(() => {
    setActiveTimerMachine(true);
  }, []);

  return (
    <div className={classes.ScorePanel}>
      <ul className={classes.star}>
        {props.stars.map((star, starIndex) => (
          <i key={starIndex} className={star} />
        ))}
      </ul>
      <div className={classes.moves}>
        <span>13</span> Moves
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
          onStop={time =>
            console.info(`Timer stopped: ${JSON.stringify(time)}`)
          }
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
