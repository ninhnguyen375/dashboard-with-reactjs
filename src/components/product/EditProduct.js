import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import {
  TextField,
  Button,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  CircularProgress,
  Grid,
  Input
} from "@material-ui/core";
import {
  editProduct,
  getProductsAndCategories
} from "../../store/action/productAction";
import { connect } from "react-redux";
import CustomizedSnackbars from "../snackbar/CustomizedSnackbars";
const styles = () => ({
  textField: {
    margin: 10,
    width: 400
  },
  formTitle: {
    color: "#4445"
  },
  bgWhite: {
    color: "white"
  },
  root: {
    backgroundColor: "white",
    // minHeight: "100%",
    borderRadius: "7px",
    padding: 20
  }
});

class EditProduct extends Component {
  state = {
    _id: "",
    product_name: "",
    product_price: 1,
    producer: "",
    quantity: 1,
    product_img: null,
    product_img_path: "",
    onLoading: false,
    message: "",
    open: false,
    product: {},
    stateImgPath: "",
    categories: []
  };
  handleChangeFile = e => {
    this.setState({
      product_img: e.target.files[0],
      product_img_path: e.target.files[0] ? e.target.files[0].name : null
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
    if (regex.exec(value)[0] !== regex.exec(value).input) {
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
        /^[1-9][0-9]{1,5}/,
        "product_price"
      ) ||
      !this.validated__input(
        this.state.quantity,
        /^[1-9][0-9]{1,5}/,
        "quantity"
      ) ||
      !this.validated__input(
        this.state.producer,
        /[\w]{1,20}/,
        "producer",
        "errSelection"
      )
    ) {
      return false;
    }
    return true;
  };
  // submit edit
  handleSubmit = async e => {
    const { editError, editProduct } = this.props;
    e.preventDefault();
    if (!this.valudated__form()) {
      return;
    }
    this.setState({ onLoading: true });
    await editProduct(this.state);
    if (!editError) {
      this.setState({
        onLoading: false,
        open: true,
        message: `Edit ${this.state.product_name} success`,
        stateImgPath: this.state.product_img_path
          ? `http://localhost:3001/uploads/${this.state.product_img_path.trim()}`
          : this.state.stateImgPath
      });
    }
  };
  async componentDidMount() {
    await this.props.getProductsAndCategories();
    if (this.props.haveProduct) {
      const pro = this.props.product;
      this.setState({
        product_name: pro.product_name,
        product_price: pro.product_price,
        producer: pro.producer,
        quantity: pro.quantity,
        product_img_path: pro.product_img,
        _id: pro._id,
        stateImgPath: `http://localhost:3001${pro.product_img}`
      });
    }
    if (this.props.categories) {
      this.setState({ categories: this.props.categories.data });
      console.log(this.state);
    }
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={`${classes.root} fadeIn`}>
        <h2 className={classes.formTitle}>Edit Product</h2>
        {this.props.haveProduct ? (
          <Grid container>
            <Grid item xs={6}>
              <form
                id="addNewProduct"
                autoComplete="off"
                onSubmit={this.handleSubmit}>
                {/* Product Name */}
                <TextField
                  required
                  name="product_name"
                  label="Product Name"
                  value={this.state.product_name}
                  className={classes.textField}
                  onChange={this.handleChange}
                />
                <br />
                {/* Product Price */}
                <TextField
                  required
                  name="product_price"
                  label="Price ($)"
                  className={classes.textField}
                  onChange={this.handleChange}
                  value={this.state.product_price}
                  type="number"
                  min={1}
                />
                <br />
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
                <br />
                {/* Producer - Catefory */}
                <FormControl className={classes.textField}>
                  <InputLabel htmlFor="producer-select">Category</InputLabel>
                  <Select
                    required
                    value={this.state.producer}
                    onChange={this.handleChange}
                    name="producer"
                    renderValue={value => value}
                    input={<Input id="producer-select" />}>
                    {this.state.categories &&
                      this.state.categories.map((item, index) => (
                        <MenuItem key={index} value={item.producer_id}>
                          {item.producer_name}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
                <br />
                {/* Input img */}
                <TextField
                  name="product_img"
                  label="Choose Image"
                  className={classes.textField}
                  onChange={this.handleChangeFile}
                  type="file"
                />
                <br />
                {this.props.createError && <h4>{this.props.createError}</h4>}
              </form>
              {this.state.onLoading ? (
                <Button variant="contained" color="primary">
                  <CircularProgress size={24} className={classes.bgWhite} />
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  form="addNewProduct"
                  type="submit">
                  Edit
                </Button>
              )}
              <div onClick={this.handleClose}>
                <CustomizedSnackbars open={this.state.open}>
                  {this.state.message}
                </CustomizedSnackbars>
              </div>
            </Grid>
            <Grid item xs={6}>
              <img alt="thisAlt" src={this.state.stateImgPath} width="310" />
            </Grid>
          </Grid>
        ) : (
          <h1>Does not have this product.</h1>
        )}
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  console.log(state);
  const { id } = ownProps.match.params;
  const products = state.product.products;
  let product = null;
  let haveProduct = false;
  if (products) {
    if (products.data) {
      product = products.data.find(pro => pro._id === id);
      if (product) {
        haveProduct = true;
      }
    }
  }
  return {
    product: product,
    haveProduct,
    editError: state.product.editError,
    categories: state.product.categories
  };
};
const mapDispatchToProps = dispatch => {
  return {
    editProduct: product => dispatch(editProduct(product)),
    getProductsAndCategories: () => dispatch(getProductsAndCategories())
  };
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(EditProduct)
);