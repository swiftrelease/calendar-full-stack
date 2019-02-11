import React, { Component } from 'react';
import classes from './App.module.css';
import shajs from 'sha.js';

import Calendar from './Calendar/Calendar';
import AuthForm from '../components/AuthForm/AuthForm';

const SOCKET_DEV = 'http://localhost:5000';
const SOCKET_PROD = 'https://rem-calendar.herokuapp.com'

const authUrl = `${SOCKET_DEV}/auth`;

class App extends Component {

  state = {
    authorized: false,
    authError: null,
    apiToken: null,
    ready: false
  };

  componentDidMount = async () => {
    let cookies = document.cookie.split('; ');
    let authToken = null;
    for (let c of cookies) {
      if (c.split('=')[0] === 'authToken') {
        authToken = c.split('=')[1];
        break;
      }
    }
    if (!authToken) {
      this.setState({ready: true});
      return;
    }

    let resp = await fetch(authUrl, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({authToken})
    });
    if (resp.status === 200) {
      let data = await resp.json();
      if (data.uname && data.apiToken) {
        this.setState({authorized: true, apiToken: data.apiToken, ready: true});
      }
    } else {
      this.setState({ready: true});
    }
  }

  setAuthError = (condition, error) => {
    if (condition) {
      this.setState({authError: error});
      return true;
    }
    return false;
  };

  authorizationHandler = async () => {
    let uname = document.querySelector('input#uname').value;
    let pass = document.querySelector('input#pass').value;

    if (this.setAuthError(!uname, {type: 'uname', message: 'Username required'}) ||
        this.setAuthError(!pass, {type: 'pass', message: 'Password required'}) ||
        this.setAuthError(uname.length < 4, {type: 'uname', message: 'Username has to be at least 4 characters'}) ||
        this.setAuthError(pass.length < 6, {type: 'pass', message: 'Password has to be at least 6 characters'})) {
      return;
    }

    let passHash = shajs('sha256').update(pass).digest('hex');

    let resp = await fetch(authUrl, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({uname, pass: passHash})
    });
    if (resp.status === 200) {
      let data = await resp.json();
      if (!data.action || !data.authToken || !data.apiToken) {
        if (data.error) {
          this.setState({authError: {type: 'pass', message: data.error}});
        } else {
          this.setState({authError: {type: 'pass', message: 'Unknown auth error'}});
        }
      } else {
        if (data.action === 'register') {
          document.cookie = `authToken=${data.authToken}`;
          this.setState({authorized: true, apiToken: data.apiToken, uname});
        }
        if (data.action === 'login') {
          document.cookie = `authToken=${data.authToken}`;
          this.setState({authorized: true, apiToken: data.apiToken, uname});
        }
      }
    } else {
      let data = await resp.json();
      if (data.error) {
        this.setState({authError: {type: 'pass', message: data.error}});
      } else {
        this.setState({authError: {type: 'pass', message: 'Unknown auth error'}});
      }
      return;
    }
  };

  signOutHandler = () => {
    document.cookie = `authToken=;expires=${new Date(0).toUTCString()}`;
    this.setState({authorized: false, apiToken: null, authError: null});
  }


  render() {
    return (
      this.state.ready ? (
        <div className={classes.App}>
          { this.state.authorized ?
            <Calendar
              timeStart={8}
              timeSlicesAmount={19}
              apiToken={this.state.apiToken}
              signOut={this.signOutHandler}
            /> :
            <AuthForm
              error={this.state.authError}
              authorize={this.authorizationHandler}
            /> }
        </div>
      ) : null
    );
  }
}

export default App;
