import React from 'react';
import classes from './AddButton.module.css';

const addButton = (props) => {
  return <button type="button" onClick={props.click} className={classes.AddButton}> + </button>;
};

export default addButton;
