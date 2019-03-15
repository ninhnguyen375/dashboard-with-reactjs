import React, { Component } from 'react';
import { List, ListItem, ListItemText } from '@material-ui/core';
import { Dashboard } from '@material-ui/icons';
import { Store, People, ListAlt, FeaturedPlayList } from '@material-ui/icons';
import { NavLink } from 'react-router-dom';
import Axios from 'axios';

export class Sidebar extends Component {
  state = {
    adminPermission: ''
  };

  async componentDidMount() {
    const admin_key = JSON.parse(window.localStorage.getItem('adminPageAccess'))
      .admin_key;
    const admin = await Axios.get(`/api/users/${admin_key}/adminPermission`);
    this.setState({ adminPermission: admin.data.admin });
  }

  handleSidebarClick = () => {
    if (window.screen.width <= '538') {
      window.document.getElementsByClassName('sidebar')[0].style.display =
        'none';
      window.document.getElementsByClassName('App')[0].style.marginLeft = '0';
    }
  };

  render() {
    return (
      <div>
        <List className="sidebar">
          {/* Dashboard */}
          <NavLink
            to="/admin/"
            className="text-white"
            onClick={this.handleSidebarClick}
          >
            <ListItem button>
              <Dashboard />
              <ListItemText disableTypography primary="Dashboard" />
            </ListItem>
          </NavLink>
          {/* Product */}
          {this.state.adminPermission.product && (
            <NavLink to="/admin/product" onClick={this.handleSidebarClick}>
              <ListItem button>
                <Store />
                <ListItemText
                  disableTypography
                  className="text-white"
                  primary="Product"
                />
              </ListItem>
            </NavLink>
          )}
          {/* User */}
          {this.state.adminPermission.user && (
            <NavLink to="/admin/user" onClick={this.handleSidebarClick}>
              <ListItem button>
                <People />
                <ListItemText
                  disableTypography
                  className="text-white"
                  primary="User"
                />
              </ListItem>
            </NavLink>
          )}
          {/* Bill */}
          {this.state.adminPermission.bill && (
            <NavLink to="/admin/bill" onClick={this.handleSidebarClick}>
              <ListItem button>
                <ListAlt />
                <ListItemText
                  disableTypography
                  className="text-white"
                  primary="Bill"
                />
              </ListItem>
            </NavLink>
          )}
          {/* Category */}
          {this.state.adminPermission.category && (
            <NavLink to="/admin/category" onClick={this.handleSidebarClick}>
              <ListItem button>
                <FeaturedPlayList />
                <ListItemText
                  disableTypography
                  className="text-white"
                  primary="Category"
                />
              </ListItem>
            </NavLink>
          )}
        </List>
      </div>
    );
  }
}

export default Sidebar;
