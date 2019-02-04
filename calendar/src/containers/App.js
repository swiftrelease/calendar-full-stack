import React, { Component } from 'react';
import classes from './App.module.css';

import Calendar from './Calendar/Calendar';

class App extends Component {
  render() {
    return (
      <div className={classes.App}>
        <Calendar timeStart={8} timeSlicesAmount={19} />
      </div>
    );
  }
}

export default App;
