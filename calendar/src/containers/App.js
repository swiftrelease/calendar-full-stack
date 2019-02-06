import React, { Component } from 'react';
import classes from './App.module.css';

import Calendar from './Calendar/Calendar';
import AuthForm from '../components/AuthForm/AuthForm';

class App extends Component {

  creds = { admin: 'changeit' };

  state = {
    authorized: false,
    authError: null
  };

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

    if (uname in this.creds && this.creds[uname] === pass) {
      this.setState({authorized: true, authError: null});
    } else if (uname in this.creds) {
      this.setState({authError: {type: 'pass', message: 'Incorrect password'}});
    } else {
      this.setState({authError: {type: 'uname', message: 'User does not exist'}});
    }
  };


  render() {
    return (
      <div className={classes.App}>
        { this.state.authorized ?
          <Calendar
            timeStart={8}
            timeSlicesAmount={19}
          /> :
          <AuthForm
            error={this.state.authError}
            authorize={this.authorizationHandler}
          /> }
      </div>
    );
  }
}

export default App;
