import React from 'react';

import classes from './Button.module.css';

const button = (props) => (
  <button
    type="button"
    className={[classes.Button, classes[props.type]].join(' ')}
    onClick={props.click}
  >
    {props.children}
  </button>
);

export default button;
