import React, { Component } from 'react';
import Axios from 'axios';
import { Paper, Grid } from '@material-ui/core';
import {
  MonetizationOn,
  Store,
  ListAlt,
  FeaturedPlayList,
  People,
  Inbox
} from '@material-ui/icons';

export class Overview extends Component {
  state = {
    statistical: ''
  };
  async componentDidMount() {
    const statistical = await Axios.get('/api/dashboard');
    this.setState({ statistical: statistical.data });
  }
  render() {
    return (
      <div>
        {this.state.statistical ? (
          <Grid container spacing={16}>
            {/* Total Revenue */}
            <Grid
              item
              xs={'auto'}
              style={{ minWidth: '270px' }}
              lg={3}
              md={3}
              sm={12}
            >
              <Paper style={{ padding: 10, background: '#f86c6b' }}>
                <Grid container spacing={16}>
                  <Grid item xs={8}>
                    <div
                      style={{
                        color: 'white',
                        fontSize: 30,
                        textShadow: '0 0 5px white'
                      }}
                    >
                      ${this.state.statistical.totalRevenue}
                    </div>
                  </Grid>
                  <Grid item xs={4}>
                    <MonetizationOn
                      style={{ fontSize: 70, color: '#ffffff80' }}
                      color="inherit"
                    />
                  </Grid>
                  <Grid item xs={8}>
                    <b style={{ color: 'white' }}>Total Revenue ($)</b>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            {/* Total Products */}
            <Grid
              item
              xs={'auto'}
              style={{ minWidth: '270px' }}
              lg={3}
              md={3}
              sm={12}
            >
              <Paper style={{ padding: 10, background: 'rgb(79, 141, 255)' }}>
                <Grid container spacing={16}>
                  <Grid item xs={8}>
                    <div
                      style={{
                        color: 'white',
                        fontSize: 30,
                        textShadow: '0 0 5px white'
                      }}
                    >
                      {this.state.statistical.totalProducts}
                    </div>
                  </Grid>
                  <Grid item xs={4}>
                    <Store
                      style={{ fontSize: 70, color: '#ffffff80' }}
                      color="inherit"
                    />
                  </Grid>
                  <Grid item xs={8}>
                    <b style={{ color: 'white' }}>Total Products</b>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            {/* Total Bills */}
            <Grid
              item
              xs={'auto'}
              style={{ minWidth: '270px' }}
              lg={3}
              md={3}
              sm={12}
            >
              <Paper style={{ padding: 10, background: 'rgb(126, 79, 202)' }}>
                <Grid container spacing={16}>
                  <Grid item xs={8}>
                    <div
                      style={{
                        color: 'white',
                        fontSize: 30,
                        textShadow: '0 0 5px white'
                      }}
                    >
                      {this.state.statistical.totalBills}
                    </div>
                  </Grid>
                  <Grid item xs={4}>
                    <ListAlt
                      style={{ fontSize: 70, color: '#ffffff80' }}
                      color="inherit"
                    />
                  </Grid>
                  <Grid item xs={8}>
                    <b style={{ color: 'white' }}>Total Bills</b>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            {/* Total Categories */}
            <Grid
              item
              xs={'auto'}
              style={{ minWidth: '270px' }}
              lg={3}
              md={3}
              sm={12}
            >
              <Paper style={{ padding: 10, background: 'rgb(64, 138, 45)' }}>
                <Grid container spacing={16}>
                  <Grid item xs={8}>
                    <div
                      style={{
                        color: 'white',
                        fontSize: 30,
                        textShadow: '0 0 5px white'
                      }}
                    >
                      {this.state.statistical.totalCategories}
                    </div>
                  </Grid>
                  <Grid item xs={4}>
                    <FeaturedPlayList
                      style={{ fontSize: 70, color: '#ffffff80' }}
                      color="inherit"
                    />
                  </Grid>
                  <Grid item xs={8}>
                    <b style={{ color: 'white' }}>Total Categories</b>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            {/* Total Users */}
            <Grid
              item
              xs={'auto'}
              style={{ minWidth: '270px' }}
              lg={3}
              md={3}
              sm={12}
            >
              <Paper style={{ padding: 10, background: 'rgb(88, 98, 171)' }}>
                <Grid container spacing={16}>
                  <Grid item xs={8}>
                    <div
                      style={{
                        color: 'white',
                        fontSize: 30,
                        textShadow: '0 0 5px white'
                      }}
                    >
                      {this.state.statistical.totalUsers}
                    </div>
                  </Grid>
                  <Grid item xs={4}>
                    <People
                      style={{ fontSize: 70, color: '#ffffff80' }}
                      color="inherit"
                    />
                  </Grid>
                  <Grid item xs={8}>
                    <b style={{ color: 'white' }}>Total Users</b>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            {/* Total Products */}
            <Grid
              item
              xs={'auto'}
              style={{ minWidth: '270px' }}
              lg={3}
              md={3}
              sm={12}
            >
              <Paper style={{ padding: 10, background: 'rgb(39, 39, 39)' }}>
                <Grid container spacing={16}>
                  <Grid item xs={8}>
                    <div
                      style={{
                        color: 'white',
                        fontSize: 30,
                        textShadow: '0 0 5px white'
                      }}
                    >
                      {this.state.statistical.totalSoldProducts}
                    </div>
                  </Grid>
                  <Grid item xs={4}>
                    <Inbox
                      style={{ fontSize: 70, color: '#ffffff80' }}
                      color="inherit"
                    />
                  </Grid>
                  <Grid item xs={8}>
                    <b style={{ color: 'white' }}>Total Sold Products</b>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    );
  }
}

export default Overview;
