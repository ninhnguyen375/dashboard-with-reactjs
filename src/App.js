import React, { Component } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Navbar from "./components/navbar/Navbar";
import Sidebar from "./components/sidebar/Sidebar";
import { Grid } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Product from "./components/product/Product";
import User from "./components/user/User";
import Bill from "./components/bill/Bill";
import Category from "./components/category/Category";
import EditProduct from "./components/product/EditProduct";
// import ToHome from "./components/ToHome";
import EditUser from "./components/user/EditUser";
import EditBill from "./components/bill/EditBill";
import EditCategory from "./components/category/EditCategory";
import Axios from "axios";
import SignIn from "./components/SignIn";
// import SignIn from "./components/SignIn";

const styles = () => ({
  root: {
    backgroundColor: "#dadada",
    padding: 20,
    overflow: "auto",
    margin: "63px 0 0 166px"
  }
});
class App extends Component {
  state = {
    isAdmin: false,
    checkAdminError: "",
    adminDetails: ""
  };
  async componentDidMount() {
    let admin = window.localStorage.getItem("adminPageAccess");
    admin = JSON.parse(admin);
    if (!admin) {
      // do something here
      return;
    }
    this.setState({ adminDetails: admin });
    const res = await Axios.get(
      `http://localhost:3001/api/users/checkAdmin/${admin.admin_key}`
    );
    if (res.data.err) {
      this.setState({ checkAdminError: res.data.err });
    } else if (res.data.isAdmin) {
      this.setState({ isAdmin: true });
    } else {
      this.setState({ isAdmin: false });
    }
  }
  render() {
    const { classes } = this.props;
    return (
      <div className="App">
        <BrowserRouter>
          {this.state.isAdmin ? (
            <>
              <Navbar
                adminName={
                  this.state.adminDetails && this.state.adminDetails.admin_name
                }
              />
              <Grid container>
                <Grid item xs={2} className="bg-dark full-height fixed-left">
                  <Sidebar />
                </Grid>
                <Grid item xs={12} className={classes.root}>
                  <Switch>
                    {/* index */}
                    <Route path="/admin" exact component={Dashboard} />
                    {/* Product manager */}
                    <Route path="/admin/product" exact component={Product} />
                    <Route path="/admin/product/:id" component={EditProduct} />
                    {/* User manager */}
                    <Route path="/admin/user" exact component={User} />
                    <Route path="/admin/user/:id" component={EditUser} />
                    {/* Bill manager */}
                    <Route path="/admin/bill" exact component={Bill} />
                    <Route path="/admin/bill/:id" component={EditBill} />
                    {/* Category manager */}
                    <Route path="/admin/category" exact component={Category} />
                    <Route
                      path="/admin/category/:id"
                      component={EditCategory}
                    />
                    {/* <Route path="/" exact component={ToHome} /> */}
                  </Switch>
                </Grid>
              </Grid>
            </>
          ) : (
            <SignIn />
          )}
        </BrowserRouter>
      </div>
    );
  }
}

export default withStyles(styles)(App);
