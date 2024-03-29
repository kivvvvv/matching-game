import React, { useState, useEffect } from "react";
import TimerMachine from "react-timer-machine";
import moment from "moment";
import momentDurationFormatSetup from "moment-duration-format";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import useStyles from "./styles/ScorePanelStyles";
import PogU from "./img/PogU.png";
import EZY from "./img/EZY.png";
import FeelsWeirdMan from "./img/FeelsWeirdMan.png";

momentDurationFormatSetup(moment);
const MySwal = withReactContent(Swal);

export default function ScorePanel(props) {
  const [activeTimerMachine, setActiveTimerMachine] = useState(false);
  const [timestamp, setTimestamp] = useState(null);
  const [isIntro, setIsIntro] = useState(true);

  const endMatchCount = 8;

  const classes = useStyles({ isIntro: isIntro });

  const { isGameStarted, onSetIsGameStarted } = props;
  console.log("isIntro: ", isIntro, ", isGameStarted: ", isGameStarted);
  useEffect(() => {
    if (!isGameStarted) {
      MySwal.fire({
        type: "info",
        title: "Welcome!",
        text: "Try to memorize all the cards after pressing 'START'",
        confirmButtonText: "START",
        allowOutsideClick: false
      }).then(() => {
        setActiveTimerMachine(true);
        onSetIsGameStarted(true);
      });
    }
  }, [isGameStarted, onSetIsGameStarted]);

  useEffect(() => {
    if (props.matchCount === endMatchCount) {
      setActiveTimerMachine(false);
    }
  }, [props.matchCount]);

  useEffect(() => {
    if (timestamp && props.matchCount === endMatchCount) {
      let imageUrl;

      const goodStarIconClass = "fas star";
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

      MySwal.fire({
        title: (
          <>
            {props.stars.map((star, starIndex) => (
              <FontAwesomeIcon
                key={starIndex}
                icon={[star.split(" ")[0], star.split(" ")[1]]}
              />
            ))}
          </>
        ),
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
          MySwal.fire({
            title: "Restarting..",
            timer: 1500,
            allowOutsideClick: false,
            onBeforeOpen: () => {
              MySwal.showLoading();
            },
            onClose: () => {
              resolve();
            }
          });
        });
      })
      .then(() => {
        props.onResetClick();
        setActiveTimerMachine(false);
        setTimestamp(null);
        setIsIntro(true);
      });
  };

  return (
    <div className={classes.ScorePanel}>
      <ul className={classes.star}>
        {props.stars.map((star, starIndex) => (
          <FontAwesomeIcon
            key={starIndex}
            icon={[star.split(" ")[0], star.split(" ")[1]]}
          />
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
          formatTimer={(time, ms) => {
            return moment.duration(ms, "milliseconds").format("h:mm:ss");
          }}
          onStop={time => {
            console.log(
              "In onStop | isIntro: ",
              isIntro,
              ", isGameStarted: ",
              isGameStarted
            );
            if (isIntro || !isGameStarted) return;
            setTimestamp(time);
          }}
          onComplete={() => {
            console.log("onComplete FIRE!");
            setIsIntro(false);
          }}
        />
      </div>
      <div className={classes.restart} onClick={handleClick}>
        <FontAwesomeIcon icon="redo" />
      </div>
    </div>
  );
}
