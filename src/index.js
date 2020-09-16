import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App,{Contextvariables} from './App';
import {BrowserRouter} from "react-router-dom"
ReactDOM.render(
  <React.StrictMode>
  <Contextvariables>
  <BrowserRouter>
    <App />
    </BrowserRouter>
    </Contextvariables>
  </React.StrictMode>,
  document.getElementById('root')
);
