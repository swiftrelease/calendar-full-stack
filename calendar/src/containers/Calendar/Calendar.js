import React, { Component } from 'react';
import classes from './Calendar.module.css';

import TimeSlice from '../../components/TimeSlice/TimeSlice';
import CalendarEvent from '../../components/CalendarEvent/CalendarEvent';
import AddButton from '../../components/UI/Button/AddButton/AddButton';
import Modal from '../../components/UI/Modal/Modal';
import AddEventControls from '../../components/AddEventControls/AddEventControls';

const apiUrl = 'http://localhost:5000/api/calendarEvents';

class Calendar extends Component {

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

  selectEventHandler = (event, id) => {
    event.stopPropagation();
    if (this.state.selectedEventId === id) return;
    this.setState({selectedEventId: id});
  };

  deselectEventHandler = () => {
    this.setState({selectedEventId: null});
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
    });
    if (resp.status === 200) {
      let events = [...this.state.events];
      for (let i = 0; i < events.length; i++) {
        if (events[i]._id === id) {
          events.splice(i, 1);
          this.setState({events});
          break;
        }
      }
    } else {
      console.log("error with the request");
    }
  };

  addEventHandler = async () => {
    let hours = +document.querySelector('select#hours').value;
    let minutes = +document.querySelector('select#minutes').value;
    let duration = +document.querySelector('input#duration').value;
    let title = document.querySelector('input#title').value;


    if (isNaN(duration)) {
      this.setState({addEventError: {
        type: "duration",
        message: "Duration has to be a number"
      }});
      return;
    }
    if (!duration) {
      this.setState({addEventError: {
        type: "duration",
        message: "Please enter a duration greater than 0"
      }});
      return;
    }
    if (duration < 5 || duration > 300) {
      this.setState({addEventError: {
        type: "duration",
        message: "Duration has to be more than 5 and less than 300"
      }});
      return;
    }
    if (!title) {
      this.setState({addEventError: {
        type: "title",
        message: "Title cannot be empty"
      }});
      return;
    }

    let start = 0;

    let payload = JSON.stringify({start, duration, title});
    console.log(payload);
    let resp = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: payload
    });
    if (resp.status === 200) {
      let events = [...this.state.events];
      events.push({start, duration, title});
      this.setState({events, addingEvent: false});
      document.querySelector('input#time').value = "";
      document.querySelector('input#duration').value = "";
      document.querySelector('input#title').value = "";
    } else {
      console.log("error with the request");
    }
  }

  render() {
    const timeSlices = this.setupTimeSlices();
    return (
      <div className={classes.Calendar} onClick={this.deselectEventHandler}>
        <Modal show={this.state.addingEvent} modalClosed={this.addEventCancelHandler}>
          <AddEventControls
            cancel={this.addEventCancelHandler}
            confirm={this.addEventHandler}
            error={this.state.addEventError ? this.state.addEventError : null}
          />
        </Modal>
        {timeSlices}
        <AddButton click={this.addEventButtonClickHandler} />
      </div>
    );
  }
}

export default Calendar;
