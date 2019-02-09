import React from 'react';

import classes from './Button.module.css';

const button = (props) => {
  let classNames = [classes.Button];
  if (props.classes) {
    for (let c of props.classes) {
      classNames.push(classes[c]);
    }
  }
  return (
    <button
      type="button"
      className={classNames.join(' ')}
      onClick={props.click}
    >
      {props.children}
    </button>
  );
}

export default button;
