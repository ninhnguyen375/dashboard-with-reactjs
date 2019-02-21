import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Divider } from '@material-ui/core';
import UserList from './UserList';
import { connect } from 'react-redux';
import {
  getUsersWithRedux,
  closeAlertDeleted
} from '../../store/action/userAction';
import CustomizedSnackbars from '../snackbar/CustomizedSnackbars';
import Axios from 'axios';
import AddUser from './AddUser';

const styles = () => ({
  root: {
    backgroundColor: 'white',
    minHeight: '100vh',
    borderRadius: '7px',
    padding: 20
  },
  header: {
    fontSize: '1.7em',
    color: 'gray',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  m_20: {
    margin: 20
  }
});
export class User extends Component {
  async componentDidMount() {
    const admin_key = JSON.parse(window.localStorage.getItem('adminPageAccess'))
      .admin_key;
    const admin = await Axios.get(`/api/users/${admin_key}/adminPermission`);
    if (!admin.data.admin.user) {
      this.setState({ ...this.state, adminAccess: false });
      return;
    } else {
      this.setState({ ...this.state, adminAccess: true });
      const { dispatch } = this.props;
      await dispatch(getUsersWithRedux());
    }
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
        messDeleted: `${nextProps.numDeleted} users has been deleted`
      });
    }
  }
  state = {
    openSnackNumDeleted: false,
    messDeleted: '',
    adminAccess: true
  };
  render() {
    const { classes, numDeleted } = this.props;
    return (
      <>
        {this.state.adminAccess ? (
          <>
            <div className={`${classes.root} fadeIn`}>
              <div className={classes.header}>User Manager</div>
              <Divider variant="middle" className={classes.m_20} />
              {/* add user */}
              <AddUser />
              <Divider variant="middle" className={classes.m_20} />
              {/* List User */}
              {this.props.users ? (
                <UserList users={this.props.users.data} />
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
        ) : (
          <div className={`${classes.root} fadeIn`}>
            <div className={classes.header} style={{ color: 'red' }}>
              Permission Denied
            </div>
          </div>
        )}
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    users: state.user.users,
    numDeleted: state.user.numDeleted
  };
};
export default withStyles(styles)(connect(mapStateToProps)(User));
