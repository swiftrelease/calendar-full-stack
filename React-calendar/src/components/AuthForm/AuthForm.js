import React from 'react';
import classes from './AuthForm.module.css';

import Button from '../UI/Button/Button';

const authForm = (props) => {
    function onEnter(event) {
      if (event.key === 'Enter') props.authorize(event);
    }

    return (
      <div className={classes.Auth}>
        <h2>Log in or create a new account</h2>
        <label>Username:</label>
        <input type="text" id="uname" onKeyDown={onEnter} />
        {props.error && props.error.type === 'uname' ?
          <label className={classes.warning}>{props.error.message}</label> : null}
        <label>Password:</label>
        <input type="password" id="pass" onKeyDown={onEnter} />
        {props.error && props.error.type === 'pass' ?
          <label className={classes.warning}>{props.error.message}</label> : null}
        <Button classes={['White']} click={props.authorize}>Submit</Button>
      </div>
    );
};

export default authForm;
