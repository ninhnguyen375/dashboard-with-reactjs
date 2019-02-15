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
import { editUser, getUsersWithRedux } from "../../store/action/userAction";
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

class EditUser extends Component {
  state = {
    _id: "",
    user_name: "",
    user_password: "",
    user_permission: "",
    user_phone: "",
    user_email: "",
    onLoading: "",
    message: "",
    open: false,
    user: {}
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
        this.state.user_name,
        /[\w\s-]{1,}/,
        "user_name"
      ) ||
      !this.validated__input(
        this.state.user_password,
        /[\w\s-]{6,}/,
        "user_password"
      ) ||
      !this.validated__input(
        this.state.user_phone,
        /[0-9]{10,12}/,
        "user_phone"
      ) ||
      !this.validated__input(
        this.state.user_permission,
        /[\w]{1,20}/,
        "user_permission",
        "errSelection"
      ) ||
      !this.validated__input(
        this.state.user_email,
        /^[a-z][a-z0-9_.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/,
        "user_email"
      )
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
    await this.props.editUser(this.state);
    if (!this.props.editError) {
      this.setState({
        onLoading: false,
        open: true,
        message: `Edit ${this.state.user_email} success`
      });
    } else {
      this.setState({
        onLoading: false
      });
    }
  };
  async componentDidMount() {
    await this.props.getUsersWithRedux();
    if (this.props.haveUser) {
      const u = this.props.user;
      this.setState({
        user_name: u.user_name,
        user_password: u.user_password,
        user_permission: u.user_permission,
        user_phone: u.user_phone,
        user_email: u.user_email,
        _id: u._id
      });
    }
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={`${classes.root} fadeIn`}>
        <h2 className={classes.formTitle}>Edit User</h2>
        {this.props.haveUser ? (
          <Grid container>
            <Grid item xs={6}>
              <form
                id="addNewUser"
                autoComplete="off"
                onSubmit={this.handleSubmit}>
                {/* User Name */}
                <TextField
                  required
                  name="user_name"
                  label="User Name"
                  value={this.state.user_name}
                  className={classes.textField}
                  onChange={this.handleChange}
                />
                <br />
                {/* User Password */}
                <TextField
                  required
                  name="user_password"
                  label="Password"
                  className={classes.textField}
                  onChange={this.handleChange}
                  value={this.state.user_password}
                  helpText="Not less than 6 character"
                />
                <br />
                {/* Phone */}
                <TextField
                  required
                  value={this.state.user_phone}
                  name="user_phone"
                  label="Phone"
                  className={classes.textField}
                  onChange={this.handleChange}
                  type="number"
                />
                <br />
                {/* Permission */}
                <FormControl className={classes.textField}>
                  <InputLabel htmlFor="user_permission-select">
                    Permission
                  </InputLabel>
                  <Select
                    required
                    value={this.state.user_permission}
                    onChange={this.handleChange}
                    name="user_permission"
                    renderValue={value => value}
                    input={<Input id="user_permission-select" />}>
                    <MenuItem value="admin">Admin</MenuItem>
                    <MenuItem value="client">Client</MenuItem>
                  </Select>
                </FormControl>
                <br />
                {/* Email */}
                <TextField
                  required
                  value={this.state.user_email}
                  name="user_email"
                  label="Email"
                  className={classes.textField}
                  onChange={this.handleChange}
                  type="email"
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
                  form="addNewUser"
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
          <h1>Does not have this user.</h1>
        )}
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.match.params;
  const users = state.user.users;
  let user = null;
  let haveUser = false;
  if (users) {
    if (users.data) {
      user = users.data.find(u => u._id === id);
      if (user) {
        haveUser = true;
      }
    }
  }
  return {
    user: user,
    haveUser,
    editError: state.user.editError
  };
};
const mapDispatchToProps = dispatch => {
  return {
    editUser: user => dispatch(editUser(user)),
    getUsersWithRedux: () => dispatch(getUsersWithRedux())
  };
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(EditUser)
);
