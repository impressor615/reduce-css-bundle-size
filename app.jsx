import style from './style';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';


const App = () => (
  <div>
    <div className={style.blue}>Hello World</div>
    <div className={style.red}>Hello World</div>
    <div className={style.green}>Hello World</div>
    <div className="black">Hello World</div>
  </div>
);

ReactDOM.render(<App />, document.getElementById("root"));
