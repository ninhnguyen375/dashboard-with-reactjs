import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import BusinessSituation from './BusinessSituation';
import TopSellerProducts from './TopSellerProducts';
import { Divider } from '@material-ui/core';
import Overview from './Overview';
import TopUsers from './TopUsers';

const styles = () => ({
  root: {
    backgroundColor: 'white',
    borderRadius: '7px',
    padding: 50
  },
  header: {
    fontSize: '2em',
    color: 'gray',
    fontWeight: 'bold',
    textAlign: 'center'
  }
});

export class Dashboard extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={`${classes.root} fadeIn`}>
        <div className={classes.header}>Dash Board</div>
        <Divider style={{ margin: 30 }} />
        <Overview />
        <Divider style={{ margin: 30 }} />
        <BusinessSituation />
        <Divider style={{ margin: 30 }} />
        <TopSellerProducts />
        <Divider style={{ margin: 30 }} />
        <TopUsers />
      </div>
    );
  }
}

export default withStyles(styles)(Dashboard);
