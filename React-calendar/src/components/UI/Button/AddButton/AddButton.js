import React from 'react';

import Button from '../Button';

const addButton = (props) => (
  <Button click={props.click} classes={["AddButton"]}>
    +
  </Button>
);

export default addButton;
