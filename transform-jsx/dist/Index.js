require("@babel/register");

import React from 'react';
import Item from 'Item.jsx';

function Group() {
  return React.createElement("section", null, React.createElement("p", null, "ddddd"), React.createElement(Item, null));
}