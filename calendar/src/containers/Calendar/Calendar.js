import React, { Component } from 'react';
import classes from './Calendar.module.css';

import TimeSlice from '../../components/TimeSlice/TimeSlice';
import AddButton from '../../components/UI/Button/AddButton/AddButton';
import Modal from '../../components/UI/Modal/Modal';
import AddEventControls from '../../components/AddEventControls/AddEventControls';

const apiUrl = 'http://localhost:5000/api/calendarEvents';

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
    }],
    addingEvent: false,
    selectedEventId: null
  };

  async componentDidMount() {
    const eventData = await fetch(apiUrl).then(res => {
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
    events = events.map(e => {
      let ev = { ...e, width: this.calcEventWidth(e) };
      if (ev._id === this.state.selectedEventId) {
        ev = { ...ev, selected: true, deleteHandler: this.deleteEventHandler };
      }
      return ev;
    });
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
          selectEvent={this.selectEventHandler}
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

  selectEventHandler = (id) => {
    if (this.state.selectedEventId === id) {
      this.setState({selectedEventId: null});
    } else {
      this.setState({selectedEventId: id});
    }
  };

  addEventButtonClickHandler = () => {
    this.setState({ addingEvent: true });
  };

  addEventCancelHandler = () => {
    this.setState({ addingEvent: false });
  };

  deleteEventHandler = async (event, id) => {
    event.stopPropagation();
    let resp = await fetch(apiUrl, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({id})
    }).then(res => res.text());
    console.log(resp);
  };

  async addEventHandler() {
    let start = +document.querySelector('input#time').value;
    let duration = +document.querySelector('input#duration').value;
    let title = document.querySelector('input#title').value;
    let payload = JSON.stringify({start, duration, title});
    console.log(payload);
    let resp = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: payload
    }).then(res => res.text());
    console.log(resp);
  }

  render() {
    const timeSlices = this.setupTimeSlices();
    return (
      <div className={classes.Calendar}>
        <Modal show={this.state.addingEvent} modalClosed={this.addEventCancelHandler}>
          <AddEventControls
            cancel={this.addEventCancelHandler}
            confirm={this.addEventHandler}
          />
        </Modal>
        {timeSlices}
        <AddButton click={this.addEventButtonClickHandler} />
      </div>
    );
  }
}

export default Calendar;
