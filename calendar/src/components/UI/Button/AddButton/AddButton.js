import React from 'react';

import Button from '../Button';

const addButton = (props) => (
  <Button click={props.click} type="AddButton">
    +
  </Button>
);

export default addButton;
