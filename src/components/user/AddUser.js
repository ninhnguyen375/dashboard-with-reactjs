import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import {
  TextField,
  Button,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  CircularProgress
} from "@material-ui/core";
import {
  createProduct,
  getProductsWithRedux
} from "../../store/action/productAction";
import { connect } from "react-redux";
import CustomizedSnackbars from "../snackbar/CustomizedSnackbars";
const styles = () => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    margin: 10,
    width: 200
  },
  dense: {
    marginTop: 19
  },
  menu: {
    width: 200
  },
  formTitle: {
    color: "#4445"
  },
  bgWhite: {
    color: "white"
  }
});

class AddProduct extends Component {
  state = {
    product_name: "",
    product_price: "",
    producer: "",
    quantity: "",
    product_img: "",
    product_img_path: "",
    isAdding: false,
    message: "",
    open: false,
    err: {
      errSelection: false
    }
  };
  handleChangeFile = e => {
    this.setState({
      product_img: e.target.files[0],
      product_img_path: e.target.files[0].name
    });
  };
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  validated__input = (stateValue, regex, inputName, setError) => {
    const value = stateValue;
    const input = document.getElementsByName(inputName)[0];
    if (setError) this.setState({ err: { [setError]: true } });
    
    if (!input) {
      return false;
    }
    if (!regex.exec(value)) {
      input.focus();
      input.click();
      return false;
    }
    if (regex.exec(value)[0] !== value) {
      input.focus();
      return false;
    }
    if (setError) this.setState({ err: { [setError.key]: false } });
    return true;
  }; 
  validated__input_file = (inputName, setError) => {
    const input = document.getElementsByName(inputName)[0];
    if (setError) this.setState({ err: { [setError]: true } });
    if (!input || !input.value) {
      input.click();
      return false;
    }
    if (setError) this.setState({ err: { [setError.key]: false } });
    return true;
  };
  valudated__form = () => {
    if (
      !this.validated__input(
        this.state.product_name,
        /[\w\s-]{1,}/,
        "product_name"
      ) ||
      !this.validated__input(
        this.state.product_price,
        /[1-9]{1,5}/,
        "product_price"
      ) ||
      !this.validated__input(this.state.quantity, /[1-9]{1,5}/, "quantity") ||
      !this.validated__input(
        this.state.producer,
        /[\w]{1,20}/,
        "producer",
        "errSelection"
      ) ||
      !this.validated__input_file(
        "product_img"
      )
    ) {
      return false;
    }
    return true;
  };
  handleSubmit = async e => {
    const { createError, createProduct, getProductsWithRedux } = this.props;
    e.preventDefault();
    if (!this.valudated__form()) {
      return;
    }
    this.setState({ isAdding: true });
    await createProduct(this.state);
    if (!createError) {
      getProductsWithRedux();
      this.setState({
        isAdding: false,
        open: true,
        message: `Adding ${this.state.product_name} success`
      });
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <>
        <h2 className={classes.formTitle}>Add new Product</h2>
        <form
          encType="multipart/form-data"
          id="addNewProduct"
          className={classes.container}
          noValidate
          autoComplete="off"
          onSubmit={this.handleSubmit}
        >
          {/* Product Name */}
          <TextField
            required
            name="product_name"
            label="Product Name"
            className={classes.textField}
            onChange={this.handleChange}
          />
          {/* Product Price */}
          <TextField
            required
            name="product_price"
            label="Price ($)"
            className={classes.textField}
            onChange={this.handleChange}
            type="number"
          />
          {/* Quantity */}
          <TextField
            required
            value={this.state.quantity}
            name="quantity"
            label="Quantity"
            className={classes.textField}
            onChange={this.handleChange}
            type="number"
          />
          {/* Producer - Catefory */}
          <FormControl className={classes.textField}>
            <InputLabel htmlFor="select-producer">Catefory</InputLabel>
            <Select
              error={this.state.err.errSelection}
              value={this.state.producer}
              onChange={this.handleChange}
              inputProps={{
                name: "producer",
                id: "select-producer"
              }}
            >
              <MenuItem selected value="N">
                Nokia
              </MenuItem>
              <MenuItem value="SS">Samsung</MenuItem>
            </Select>
          </FormControl>
          {/* Input img */}
          <TextField
            required
            name="product_img"
            label="Choose Image"
            className={classes.textField}
            onChange={this.handleChangeFile}
            type="file"
          />
          {this.props.createError && <h4>{this.props.createError}</h4>}
        </form>
        <Button
          variant="contained"
          color="primary"
          form="addNewProduct"
          type="submit"
        >
          {this.state.isAdding ? (
            <CircularProgress size={24} className={classes.bgWhite} />
          ) : (
            <span>Add New Product</span>
          )}
        </Button>
        <div onClick={this.handleClose}>
          <CustomizedSnackbars open={this.state.open}>
            {this.state.message}
          </CustomizedSnackbars>
        </div>
      </>
    );
  }
}
const mapStateToProps = state => {
  return {
    createError: state.product.createError
  };
};
const mapDispatchToProps = dispatch => {
  return {
    createProduct: product => dispatch(createProduct(product)),
    getProductsWithRedux: () => dispatch(getProductsWithRedux())
  };
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AddProduct)
);
