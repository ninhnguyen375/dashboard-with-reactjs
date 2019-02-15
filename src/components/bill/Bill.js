import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Divider } from "@material-ui/core";
import BillList from "./BillList";
import { connect } from "react-redux";
import {
  getBillsWithRedux,
  closeAlertDeleted
} from "../../store/action/billAction";
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
export class Bill extends Component {
  async componentDidMount() {
    await this.props.getBillsWithRedux();
  }
  handleClose = () => {
    this.setState({ openSnackNumDeleted: false });
    this.props.closeAlertDeleted();
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.numDeleted) {
      this.setState({
        openSnackNumDeleted: true,
        messDeleted: `${nextProps.numDeleted} bills has been deleted`
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
          <div className={classes.header}>Bill Manager</div>
          <Divider variant="middle" className={classes.m_20} />
          {/* List Bill */}
          {this.props.bills ? (
            <BillList bills={this.props.bills.data} />
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
    bills: state.bill.bills,
    numDeleted: state.bill.numDeleted
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getBillsWithRedux: () => dispatch(getBillsWithRedux()),
    closeAlertDeleted: () => dispatch(closeAlertDeleted())
  };
};
export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Bill)
);
