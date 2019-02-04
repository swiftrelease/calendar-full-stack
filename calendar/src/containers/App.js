import React, { Component } from 'react';
import classes from './App.module.css';

import Calendar from './Calendar/Calendar';
import TimeSlice from '../components/TimeSlice/TimeSlice';

class App extends Component {
  render() {
    return (
      <div className={classes.App}>
        <Calendar timeStart={8} timeSlicesAmount={19} />
        {/*<TimeSlice
          events={[{
            title: "Doctor",
            duration: 1
          }]}
          time="8:00"
        />
        <TimeSlice
          time="8:30"
          small
        />*/}
      </div>
    );
  }
}

export default App;
