import { makeStyles } from "@material-ui/styles";

export default makeStyles({
  Card: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexBasis: "20vw",
    height: "20vw",
    maxWidth: "124px",
    maxHeight: "124px",
    fontSize: 0,
    color: "#ffffff",
    cursor: "pointer",
    borderRadius: "8px",
    boxShadow: "5px 2.5px 20px 0 rgba(46, 61, 73, 0.5)",
    overflow: "hidden",
    background: "#2e3d49",
    transformStyle: "preserve-3d",
    transition: "all 400ms"
  },
  "@global": {
    ".open": {
      transform: "rotateY(180deg)",
      fontSize: "2rem",
      backgroundColor: "#02b3e4",
      cursor: "default",
      "& svg": {
        transform: "rotateY(180deg)"
      }
    },
    ".rubberBand": {
      backgroundColor: "#02ccba",
      fontSize: "2rem",
      cursor: "default"
    },
    ".wobble": {
      backgroundColor: "#f03434",
      fontSize: "2rem",
      cursor: "default"
    }
  }
});
