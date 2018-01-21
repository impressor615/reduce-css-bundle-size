// global less import
import './global' ;
// local less import
import './local.less';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';


const App = () => (
  <div>
    <div className="black">Hello World</div>
    <div className="yellow">Hello World</div>
    <div styleName="blue">Hello World</div>
    <div styleName="red">Hello World</div>
  </div>
);

ReactDOM.render(<App />, document.getElementById("root"));
