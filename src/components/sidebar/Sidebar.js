import React, { Component } from "react";
import { List, ListItem, ListItemText } from "@material-ui/core";
import { Dashboard } from "@material-ui/icons";
import { Store, People, ListAlt, FeaturedPlayList } from "@material-ui/icons";
import { NavLink } from "react-router-dom";

export class Sidebar extends Component {
  render() {
    return (
      <div>
        <List className="sidebar">
          {/* Dashboard */}
          <NavLink to="/admin/" className="text-white">
            <ListItem button>
              <Dashboard />
              <ListItemText disableTypography primary="Dashboard" />
            </ListItem>
          </NavLink>
          {/* Product */}
          <NavLink to="/admin/product">
            <ListItem button>
              <Store />
              <ListItemText
                disableTypography
                className="text-white"
                primary="Product"
              />
            </ListItem>
          </NavLink>
          {/* User */}
          <NavLink to="/admin/user">
            <ListItem button>
              <People />
              <ListItemText
                disableTypography
                className="text-white"
                primary="User"
              />
            </ListItem>
          </NavLink>
          {/* Bill */}
          <NavLink to="/admin/bill">
            <ListItem button>
              <ListAlt />
              <ListItemText
                disableTypography
                className="text-white"
                primary="Bill"
              />
            </ListItem>
          </NavLink>
          {/* Category */}
          <NavLink to="/admin/category">
            <ListItem button>
              <FeaturedPlayList />
              <ListItemText
                disableTypography
                className="text-white"
                primary="Category"
              />
            </ListItem>
          </NavLink>
        </List>
      </div>
    );
  }
}

export default Sidebar;
