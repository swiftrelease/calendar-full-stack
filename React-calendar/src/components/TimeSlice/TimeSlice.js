import React from 'react';
import classes from './TimeSlice.module.css';

import CalendarEvent from '../CalendarEvent/CalendarEvent';

const timeSlice = (props) => {

  let events = null;

  if (props.events) {
    let prevHeight = [];
    events = props.events.map((e, index) => {
      const top = (e.start - props.sliceStart) * 10 / 3 + '%';
      const height = e.duration * 10 / 3 + '%';
      let offsetTop = `calc(${top}`;
      for (let val of prevHeight) {
        offsetTop += ` - ${val}`;
      }
      offsetTop += ')';
      prevHeight.push(height);
      const width = e.width;
      const left = e.left;
      return (
        <CalendarEvent
          click={(event) => props.selectEvent(event, e._id)}
          duration={e.duration}
          key={index}
          style={{ offsetTop, height, width, left }}
          selected={e.selected ? e.selected : null}
          delete={e.selected ? (event) => e.deleteHandler(event, e._id) : null}
        >
          {e.title}
        </CalendarEvent>
      );
    });
  }

  return (
    <div
      className={classes.TimeSlice}
      style={ props.small ? null : {borderTop: "1px solid #ccc"} }
    >
      <div
        className={classes.TimeArea}
        style={ props.small ? {fontSize: "12px"} : null }
      >
        {props.time}
      </div>
      <div className={classes.EventArea}>
        {events}
      </div>
    </div>
  );
};

export default timeSlice;
