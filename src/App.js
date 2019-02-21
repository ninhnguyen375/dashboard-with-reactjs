import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Navbar from "./components/navbar/Navbar";
import Sidebar from "./components/sidebar/Sidebar";
import Product from "./components/product/Product";
import User from "./components/user/User";
import Bill from "./components/bill/Bill";
import Category from "./components/category/Category";
import EditProduct from "./components/product/EditProduct";
import EditUser from "./components/user/EditUser";
import EditBill from "./components/bill/EditBill";
import EditCategory from "./components/category/EditCategory";
import Axios from "axios";
import SignIn from "./components/SignIn";

class App extends Component {
  state = {
    isAdmin: false,
    checkAdminError: "",
    adminDetails: ""
  };
  async componentDidMount() {
    let admin = window.localStorage.getItem("adminPageAccess");
    admin = JSON.parse(admin);
    if (!admin) return;
    this.setState({ adminDetails: admin });
    const res = await Axios.get(`/api/users/checkAdmin/${admin.admin_key}`);
    if (res.data.err) {
      this.setState({ checkAdminError: res.data.err });
    } else if (res.data.isAdmin) {
      this.setState({ isAdmin: true });
    } else {
      this.setState({ isAdmin: false });
    }
  }
  render() {
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
              <Sidebar />
              <div>
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
                  <Route path="/admin/category/:id" component={EditCategory} />
                </Switch>
              </div>
            </>
          ) : (
            <SignIn />
          )}
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
