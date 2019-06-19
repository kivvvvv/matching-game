import { makeStyles } from "@material-ui/core/styles";

export default makeStyles({
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
