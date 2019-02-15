import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { TextField, Button, CircularProgress, Grid } from "@material-ui/core";
import {
  editCategory,
  getCategoriesWithRedux
} from "../../store/action/categoryAction";
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
    borderRadius: "7px",
    padding: 20
  }
});

class EditCategory extends Component {
  state = {
    _id: "",
    producer_name: "",
    producer_id: "",
    onLoading: "",
    message: "",
    open: false,
    category: {}
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
  valudated__form = () => {
    if (
      !this.validated__input(
        this.state.producer_name,
        /[\w\s-]{1,}/,
        "producer_name"
      ) ||
      !this.validated__input(this.state.producer_id, /[A-Z]{1,}/, "producer_id")
    ) {
      return false;
    }
    return true;
  };
  // submit edit
  handleSubmit = async e => {
    e.preventDefault();
    if (!this.valudated__form()) {
      return;
    }
    this.setState({ onLoading: true });
    await this.props.editCategory(this.state);
    if (!this.props.editError) {
      this.setState({
        onLoading: false,
        open: true,
        message: `Edit ${this.state.producer_id} success`
      });
    } else {
      this.setState({
        onLoading: false
      });
    }
  };
  async componentDidMount() {
    await this.props.getCategoriesWithRedux();
    if (this.props.haveCategory) {
      const u = this.props.category;
      this.setState({
        producer_name: u.producer_name,
        producer_id: u.producer_id,
        _id: u._id
      });
    }
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={`${classes.root} fadeIn`}>
        <h2 className={classes.formTitle}>Edit Category</h2>
        {this.props.haveCategory ? (
          <Grid container>
            <Grid item xs={6}>
              <form
                id="editCategory"
                autoComplete="off"
                onSubmit={this.handleSubmit}>
                {/* ID */}
                <TextField
                  required
                  name="producer_name"
                  label="Category Name"
                  value={this.state.producer_name}
                  className={classes.textField}
                  onChange={this.handleChange}
                />
                <br />
                {/* Name */}
                <TextField
                  required
                  name="producer_id"
                  label="ID"
                  className={classes.textField}
                  onChange={this.handleChange}
                  value={this.state.producer_id}
                />
                <br />
                {this.props.editError && (
                  <h4 style={{ color: "red" }}>{this.props.editError}</h4>
                )}
              </form>
              {this.state.onLoading ? (
                <Button variant="contained" color="primary">
                  <CircularProgress size={24} className={classes.bgWhite} />
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  form="editCategory"
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
          </Grid>
        ) : (
          <h1>Does not have this category.</h1>
        )}
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.match.params;
  const categories = state.category.categories;
  let category = null;
  let haveCategory = false;
  if (categories) {
    if (categories.data) {
      category = categories.data.find(u => u._id === id);
      if (category) {
        haveCategory = true;
      }
    }
  }
  return {
    category: category,
    haveCategory,
    editError: state.category.editError
  };
};
const mapDispatchToProps = dispatch => {
  return {
    editCategory: category => dispatch(editCategory(category)),
    getCategoriesWithRedux: () => dispatch(getCategoriesWithRedux())
  };
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(EditCategory)
);
