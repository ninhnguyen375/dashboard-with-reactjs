import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import AddProduct from "./AddProduct";
import { Divider } from "@material-ui/core";
import ProductList from "./ProductList";
import { connect } from "react-redux";
import {
  getProductsWithRedux,
  closeAlertDeleted
} from "../../store/action/productAction";
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
export class Product extends Component {
  async componentDidMount() {
    const { dispatch } = this.props;
    await dispatch(getProductsWithRedux());
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
        messDeleted: `${nextProps.numDeleted} products has been deleted`
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
          <div className={classes.header}>Product Manager</div>
          <Divider variant="middle" className={classes.m_20} />
          {/* Add new Product */}
          <AddProduct />
          <Divider variant="middle" className={classes.m_20} />
          {/* List Product */}
          <div className={classes.header}>All Products</div>
          {this.props.products ? (
            <ProductList products={this.props.products.data} />
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

const mapStateToProps = (state) => {
  return {
    products: state.product.products,
    numDeleted: state.product.numDeleted
  };
};
export default withStyles(styles)(connect(mapStateToProps)(Product));
