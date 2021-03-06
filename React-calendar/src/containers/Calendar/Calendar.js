import React, { Component } from 'react';
import classes from './Calendar.module.css';

import TimeSlice from '../../components/TimeSlice/TimeSlice';
import Button from '../../components/UI/Button/Button';
import Modal from '../../components/UI/Modal/Modal';
import AddEventControls from '../../components/AddEventControls/AddEventControls';

const SOCKET_DEV = 'http://localhost:5000';
const SOCKET_PROD = 'https://rem-calendar.herokuapp.com'

const apiUrl = `${SOCKET_DEV}/api/calendar`;

class Calendar extends Component {

  state = {
    events: [],
    addingEvent: false,
    selectedEventId: null,
    addEventError: null,
    networkError: null
  };

  styledEvents = [];

  getEventData = async () => {
    const request = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'X-ApiToken': this.props.apiToken
      }
    });
    if (request.status === 200) {
      const data = await request.json();
      return data;
    } else {
      this.setState({networkError: `Failed to connect to the server: ${request.status}.`});
    }
  };

  componentDidMount = async () => {
    const eventData = await this.getEventData();

    if (eventData) {
      this.setState({events: eventData});
    }
  }

  eventsOverlap(e1, e2) {
    return ( (e1.start <= e2.start && e1.start + e1.duration > e2.start)
      || (e2.start <= e1.start && e2.start + e2.duration > e1.start) );
  }

  containsOffsetEvent = (evnt) => {
    for (let e of this.offsetEvents) {
      if (evnt._id === e._id) return true;
    }
    return false;
  };

  setStyledEvents = () => {
    let eventData = [...this.state.events];

    // Sort
    for (let i = 0; i < eventData.length - 1; i++) {
      for (let j = i + 1; j < eventData.length; j++) {
        if (eventData[i].start > eventData[j].start) {
          let temp = eventData[i];
          eventData[i] = eventData[j];
          eventData[j] = temp;
        }
      }
    }

    // Calculate width based on the number of overlapping events
    for (let evnt of eventData) {
      let overlappingEventsNum = 1;
      let overlappingEvents = [];
      for (let e of eventData) {
        if (this.eventsOverlap(evnt, e) && evnt._id !== e._id) {
           overlappingEvents.push(e);
           overlappingEventsNum++;
         }
      }
      for (let i = 0; i < overlappingEvents.length - 1; i++) {
        for (let j = i + 1; j < overlappingEvents.length; j++) {
          if (!this.eventsOverlap(overlappingEvents[i], overlappingEvents[j])) {
            overlappingEventsNum--;
          }
        }
      }
      evnt.widthPercent = 100 / overlappingEventsNum;
    }

    // Calculate the left position
    if (eventData[0]) {
      eventData[0].column = 0;
    }
    for (let i = 1; i < eventData.length; i++) {
      eventData[i].column = 0;
      for (let j = 0; j < i; j++) {
        if (this.eventsOverlap(eventData[i], eventData[j]) && eventData[i].column === eventData[j].column) {
          eventData[i].column++;
        }
      }
    }

    for (let e of eventData) {
      e.left = `${e.column * e.widthPercent}%`;
      e.width = `calc(${e.widthPercent}% - 12px)`;
    }
    this.styledEvents = eventData;
  }

  getSliceStart(time, small) {
    let sliceStart = (time > 5 ? (time - 8) * 60 : (time + 4) * 60);
    if (small) sliceStart += 30;
    return sliceStart;
  }

  getEventsForSlice(sliceStart) {
    let events = [];
    for (let e of this.styledEvents) {
      if (e.start >= sliceStart && e.start < sliceStart + 30) events.push(e);
    }
    events = events.map(e => {
      let ev = { ...e };
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
    if (this.state.selectedEventId) {
      this.setState({selectedEventId: null});
    }
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
        'Content-Type': 'application/json',
        'X-ApiToken': this.props.apiToken
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
      console.log("HTTP request error");
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
        'Content-Type': 'application/json',
        'X-ApiToken': this.props.apiToken
      },
      body: payload
    });
    if (resp.status === 200) {
      const eventData = await this.getEventData();
      this.setState({events: eventData, addingEvent: false, addEventError: null});
    } else {
      console.log("HTTP request error");
    }
  }

  exportJsonHandler = async () => {
    let events = [];
    for (let e of this.state.events) {
      events.push({
        start: e.start,
        duration: e.duration,
        title: e.title
      });
    }
    for (let i = 0; i < events.length - 1; i++) {
      for (let j = i + 1; j < events.length; j++) {
        if (events[j].start < events[i].start) {
          let tmp = events[i];
          events[i] = events[j];
          events[j] = tmp;
        }
      }
    }
    let data = encode(JSON.stringify(events, null, 2));
    let blob = new Blob([data], {type: 'application/octet-stream'});
    let url = URL.createObjectURL(blob);
    let link = document.createElement('a');
    link.href = url;
    link.download = 'events.json';
    link.click();

    function encode(s) {
      var out = [];
      for (let i = 0; i < s.length; i++) {
          out[i] = s.charCodeAt(i);
      }
      return new Uint8Array(out);
    }
  };

  render() {
    this.setStyledEvents();
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
        <Button click={this.props.signOut} classes={['White', 'SignOut']}> Sign Out </Button>
        <Button click={this.exportJsonHandler} classes={['White', 'Export']}> ⇩ </Button>
        <Button click={this.addEventButtonClickHandler} classes={['AddButton']}> + </Button>
      </div>
    );
  }
}

export default Calendar;
