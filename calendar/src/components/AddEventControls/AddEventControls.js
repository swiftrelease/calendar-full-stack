import React, { Component } from 'react';
import './AddEventControls.css';

import Aux from '../../hoc/Auxiliary';
import Button from '../UI/Button/Button';

class AddEventControls extends Component {
  render() {
    return (
      <Aux>
        <h3>Add event:</h3>
        <label>Time: </label>
        <input type="text" id="time" />
        <label>Duration: </label>
        <input type="text" id="duration" />
        <label>Title: </label>
        <input type="text" id="title" />
        <Button click={this.props.cancel} type="White"> Cancel </Button>
        <Button click={this.props.confirm} type="Green"> Add </Button>
      </Aux>
    );
  }
};

export default AddEventControls;
