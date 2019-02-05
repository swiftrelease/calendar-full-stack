import React from 'react';
import classes from './CalendarEvent.module.css';

import Button from '../UI/Button/Button';

const calendarEvent = (props) => {
  let classNames = props.selected ?
    [classes.CalEvent, classes.Selected].join(" ") :
    classes.CalEvent;
  return (
    <div
      className={classNames}
      onClick={props.click}
      style={{
        width: props.style.width,
        height: props.style.height,
        top: props.style.offsetTop
      }}
    >
      {props.children}
      {props.selected ? <Button classes={["DeleteButton"]} click={props.delete}>x</Button> : null }
    </div>
  );
};

export default calendarEvent;
