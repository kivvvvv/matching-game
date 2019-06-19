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
    visibility: props => (props.isIntro ? "hidden" : "visible"),
    flexBasis: "30%",
    textAlign: "right",
    cursor: "pointer"
  }
});

export default function ScorePanel(props) {
  const [activeTimerMachine, setActiveTimerMachine] = useState(false);
  const [timestamp, setTimestamp] = useState(null);
  const [isIntro, setIsIntro] = useState(true);

  const endMatchCount = 8;

  const classes = useStyles({ isIntro: isIntro });

  useEffect(() => {
    if (!props.isGameStarted) {
      Swal.fire({
        type: "info",
        title: "Welcome!",
        text: "Try to memorize all the cards after pressing 'START'",
        confirmButtonText: "START",
        allowOutsideClick: false
      }).then(() => {
        setActiveTimerMachine(true);
        props.onSetIsGameStarted(true);
      });
    }
  }, [props.isGameStarted]);

  useEffect(() => {
    if (props.matchCount === endMatchCount) {
      setActiveTimerMachine(false);
    }
  }, [props.matchCount]);

  useEffect(() => {
    if (timestamp && props.matchCount === endMatchCount) {
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
        text: `Finished in ${props.moveCount} moves and ${timestamp.m * 60 +
          timestamp.s} seconds`
      });
    }
  }, [props.matchCount, timestamp, props.stars, props.moveCount]);

  const handleClick = () => {
    Promise.resolve()
      .then(() => {
        return new Promise(resolve => {
          Swal.fire({
            title: "Restarting..",
            timer: 1500,
            allowOutsideClick: false,
            onBeforeOpen: () => {
              Swal.showLoading();
            },
            onClose: () => {
              resolve();
            }
          });
        });
      })
      .then(() => {
        setActiveTimerMachine(false);
        setTimestamp(null);
        setIsIntro(true);
        props.onSetMatchCount(0);
        props.onSetMissMatchCount(0);
        props.onSetMoveCount(0);
        props.onSetIsGameStarted(false);
      });
  };

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
          timeStart={isIntro ? 5000 : 0}
          timeEnd={isIntro ? 0 : 3539999}
          countdown={isIntro}
          started={activeTimerMachine}
          paused={false}
          formatTimer={(time, ms) =>
            moment.duration(ms, "milliseconds").format("h:mm:ss")
          }
          onStop={time => setTimestamp(time)}
          onComplete={() => {
            Promise.resolve()
              .then(() => {
                return new Promise(resolve => {
                  setTimeout(() => {
                    setActiveTimerMachine(false);
                    setIsIntro(false);
                    resolve();
                  }, 0);
                });
              })
              .then(() => {
                setActiveTimerMachine(true);
              });
          }}
        />
      </div>
      <div className={classes.restart} onClick={handleClick}>
        <i className="fa fa-redo" />
      </div>
    </div>
  );
}
