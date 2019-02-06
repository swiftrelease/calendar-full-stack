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
    events: [],
    addingEvent: false,
    selectedEventId: null,
    addEventError: null,
    networkError: null
  };

  getEventData = async () => {
    const request = await fetch(apiUrl);
    if (request.status === 200) {
      const data = await request.json();
      return data;
    } else {
      this.setState({networkError: `Failed to connect to the server: ${request.status}.`});
    }
  }

  async componentDidMount() {
    const eventData = await this.getEventData();
    if (eventData) {
      this.setState({events: eventData});
    }
  }

  calcEventWidth(evnt) {
    let baseWidth = 100;
    let overlappingEventsNum = 0;
    let overlappingEvents = [];
    for (let e of this.state.events) {
      if (eventsOverlap(evnt, e)) {
             overlappingEvents.push(e);
             overlappingEventsNum++;
           }
    }
    for (let i = 0; i < overlappingEvents.length - 1; i++) {
      for (let j = i + 1; j < overlappingEvents.length; j++) {
        if (!eventsOverlap(overlappingEvents[i], overlappingEvents[j])) {
          overlappingEventsNum--;
        }
      }
    }

    function eventsOverlap(e1, e2) {
      return ( (e1.start <= e2.start && e1.start + e1.duration > e2.start)
        || (e2.start <= e1.start && e2.start + e2.duration > e1.start) );
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

  closeErrorModalHandler = () => {
    this.setState({ networkError: null });
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

    if (hours < 5) hours += 12;

    let start = (hours - 8) * 60 + minutes;

    let payload = JSON.stringify({start, duration, title});
    let resp = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: payload
    });
    if (resp.status === 200) {
      const eventData = await this.getEventData();
      this.setState({events: eventData, addingEvent: false, addEventError: null});
    } else {
      console.log("error with the request");
    }
  }

  render() {
    const timeSlices = this.setupTimeSlices();
    return (
      <div className={classes.Calendar} onClick={this.deselectEventHandler}>
        <Modal
          show={this.state.addingEvent || this.state.networkError}
          modalClosed={this.state.networkError ? this.closeErrorModalHandler : this.addEventCancelHandler}
        >
          {this.state.addingEvent ?
            <AddEventControls
              cancel={this.addEventCancelHandler}
              confirm={this.addEventHandler}
              error={this.state.addEventError}
            /> : null}

          {this.state.networkError ? <h3>{this.state.networkError}</h3> : null}
        </Modal>
        {timeSlices}
        <AddButton click={this.addEventButtonClickHandler} />
      </div>
    );
  }
}

export default Calendar;
