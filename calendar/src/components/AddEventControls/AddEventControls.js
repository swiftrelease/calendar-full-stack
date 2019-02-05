import React, { Component } from 'react';
import './AddEventControls.css';

import Aux from '../../hoc/Auxiliary';
import Button from '../UI/Button/Button';

class AddEventControls extends Component {

  hours = [8, 9, 10, 11, 12, 1, 2, 3, 4];
  minutes = ['00', '05', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55'];

  setupOptions(values) {
    return values.map(value => <option value={value} key={value}>{value}</option>);
  }

  render() {
    return (
      <Aux>
        <h3>Add event</h3>
        <div className="add-event-controls">
          <select id="hours">
            {this.setupOptions(this.hours)}
          </select>
          <select id="minutes">
            {this.setupOptions(this.minutes)}
          </select>
          <label>Duration: </label>
          <input type="text" id="duration" />
          {this.props.error && this.props.error.type === "duration" ?
            <label className="warning">{this.props.error.message}</label> : null}
          <label>Title: </label>
          <input type="text" id="title" />
          {this.props.error && this.props.error.type === "title"
            ? <label className="warning">{this.props.error.message}</label> : null}
          <Button click={this.props.confirm} classes={["Green", "Controls"]}> Add </Button>
          <Button click={this.props.cancel} classes={["White", "Controls"]}> Cancel </Button>
        </div>
      </Aux>
    );
  }
};

export default AddEventControls;
