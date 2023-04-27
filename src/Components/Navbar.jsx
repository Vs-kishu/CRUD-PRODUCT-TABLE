import React from "react";
import { AppBar, makeStyles, Toolbar } from "@material-ui/core";
import { NavLink } from "react-router-dom";

const useStyles = makeStyles({
  header: {
    backgroundColor: "#212121",
  },
  spacing: {
    paddingLeft: 20,
    color: "#fff",
    fontSize: "18px",
    textDecoration: "none",
  },
});

const Navbar = () => {
  const classes = useStyles();
  return (
    <AppBar className={classes.header} position="static">
      <Toolbar>
        <NavLink
          style={{ display: "flex", textAlign: "center" }}
          to="/"
          className={classes.spacing}
        >
          {" "}
          Product Table
        </NavLink>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
