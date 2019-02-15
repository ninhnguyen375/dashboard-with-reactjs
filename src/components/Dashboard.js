import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";

const styles = () => ({
  root: {
    backgroundColor: "white",
    borderRadius: "7px",
    padding: 20
  },
  header: {
    fontSize: "2em",
    color: "gray",
    fontWeight: "bold",
    textAlign: "center"
  }
});
export class Dashboard extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={`${classes.root} fadeIn`}>
        <div className={classes.header}>Hello Admin</div>
      </div>
    );
  }
}

export default withStyles(styles)(Dashboard);
