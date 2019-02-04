import React, { Component } from 'react';
import classes from './Calendar.module.css';

import TimeSlice from '../../components/TimeSlice/TimeSlice';
import AddButton from '../../components/UI/AddButton/AddButton';

class Calendar extends Component {

  // {
  //   start: 15,
  //   duration: 10,
  //   title: "Brush teeth"
  // },

  state = {
    events: [{
      start: 0,
      duration: 15,
      title: "Exercise"
    }, {
      start: 25,
      duration: 30,
      title: "Travel to work"
    }, {
      start: 30,
      duration: 15,
      title: "Review stuff"
    }]
  };

  async componentDidMount() {
    const eventData = await fetch('http://localhost:5000/api/calendarEvents').then(res => {
      return res.json();
    });
    this.setState({events: eventData});
  }

  calcEventWidth(evnt) {
    let baseWidth = 100;
    let overlappingEventsNum = 0;
    for (let e of this.state.events) {
      if ( (evnt.start <= e.start && evnt.start + evnt.duration > e.start)
        || (e.start <= evnt.start && e.start + e.duration > evnt.start) ) {
             overlappingEventsNum++;
           }
    }
    return (baseWidth / overlappingEventsNum) + '%';
  }

  getSliceStart(time, small) {
    let sliceStart = (time > 5 ? (time - 8) * 60 : (time + 4) * 60);
    if (small) sliceStart += 30;
    return sliceStart;
  }

  getEventsForSlice(sliceStart) {
    let events = [];
    for (let e of this.state.events) {
      if (e.start >= sliceStart && e.start < sliceStart + 30) events.push(e);
    }
    events = events.map(e => ({ ...e, width: this.calcEventWidth(e) }) );
    return events;
  }

  setupTimeSlices() {
    const start = this.props.timeStart;
    const amount = this.props.timeSlicesAmount;
    let small = false;
    const timeSlices = [];
    for (let i = 0, time = start; i < amount; i++) {
      let sliceStart = this.getSliceStart(time, small);
      timeSlices.push((
        <TimeSlice
          events={this.getEventsForSlice(sliceStart)}
          small={small}
          time={`${time}:${small ? '30' : '00'}`}
          sliceStart={sliceStart}
          key={`${time}:${small ? '30' : '00'}`}
        />
      ));
      if (time === 12 && small) time = 0;
      if (small) time++;
      small = !small;
    }
    return timeSlices;
  }

  render() {
    const timeSlices = this.setupTimeSlices();
    return (
      <div className={classes.Calendar}>
        {timeSlices}
        <AddButton />
      </div>
    );
  }
}

export default Calendar;
