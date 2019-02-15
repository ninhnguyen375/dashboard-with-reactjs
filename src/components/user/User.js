import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Divider } from "@material-ui/core";
import UserList from "./UserList";
import { connect } from "react-redux";
import {
  getUsersWithRedux,
  closeAlertDeleted
} from "../../store/action/userAction";
import CustomizedSnackbars from "../snackbar/CustomizedSnackbars";

const styles = () => ({
  root: {
    backgroundColor: "white",
    minHeight: "100vh",
    borderRadius: "7px",
    padding: 20
  },
  header: {
    fontSize: "1.7em",
    color: "gray",
    fontWeight: "bold",
    textAlign: "center"
  },
  m_20: {
    margin: 20
  }
});
export class User extends Component {
  async componentDidMount() {
    const { dispatch } = this.props;
    await dispatch(getUsersWithRedux());
  }
  handleClose = () => {
    this.setState({ openSnackNumDeleted: false });
    const { dispatch } = this.props;
    dispatch(closeAlertDeleted());
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.numDeleted) {
      this.setState({
        openSnackNumDeleted: true,
        messDeleted: `${nextProps.numDeleted} users has been deleted`
      });
    }
  }
  state = {
    openSnackNumDeleted: false,
    messDeleted: ""
  };
  render() {
    const { classes, numDeleted } = this.props;
    return (
      <>
        <div className={`${classes.root} fadeIn`}>
          <div className={classes.header}>User Manager</div>
          <Divider variant="middle" className={classes.m_20} />
          {/* List User */}
          {this.props.users ? (
            <UserList users={this.props.users.data} />
          ) : (
            <div className={`${classes.root} fadeIn`}>
              <div className={classes.header}>Loading...</div>
            </div>
          )}
        </div>

        {numDeleted && (
          <div onClick={this.handleClose}>
            <CustomizedSnackbars open={this.state.openSnackNumDeleted}>
              {this.state.messDeleted}
            </CustomizedSnackbars>
          </div>
        )}
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    users: state.user.users,
    numDeleted: state.user.numDeleted
  };
};
export default withStyles(styles)(connect(mapStateToProps)(User));
