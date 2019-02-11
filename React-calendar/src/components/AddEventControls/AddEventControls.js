import React from 'react';
import './AddEventControls.css';

import Aux from '../../hoc/Auxiliary';
import Button from '../UI/Button/Button';

const addEventControls = (props) => {

  const hours = [8, 9, 10, 11, 12, 1, 2, 3, 4];
  const minutes = ['00', '05', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55'];

  function setupOptions(values) {
    return values.map(value => <option value={value} key={value}>{value}</option>);
  }

  function onEnter(event) {
    if (event.key === 'Enter') props.confirm();
  }

  return (
    <Aux>
      <h3>Add event</h3>
      <div className="add-event-controls">
        <select id="hours">
          {setupOptions(hours)}
        </select>
        <select id="minutes">
          {setupOptions(minutes)}
        </select>
        <label>Duration: </label>
        <input type="text" id="duration" onKeyDown={onEnter} placeholder="Duration in minutes" />
        {props.error && props.error.type === "duration" ?
          <label className="warning">{props.error.message}</label> : null}
        <label>Title: </label>
        <input type="text" id="title" onKeyDown={onEnter} placeholder="Event title" />
        {props.error && props.error.type === "title"
          ? <label className="warning">{props.error.message}</label> : null}
        <Button click={props.confirm} classes={["Green", "Controls"]}> Add </Button>
        <Button click={props.cancel} classes={["White", "Controls"]}> Cancel </Button>
      </div>
    </Aux>
  );

};

export default addEventControls;
