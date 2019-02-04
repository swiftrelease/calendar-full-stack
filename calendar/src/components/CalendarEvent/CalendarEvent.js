import React from 'react';
import classes from './CalendarEvent.module.css';

const calendarEvent = (props) => {
  return (
    <div
      className={classes.CalEvent}
      style={{
        width: props.style.width,
        height: props.style.height,
        top: props.style.offsetTop
      }}
    >
      {props.children}
    </div>
  );
};

export default calendarEvent;
