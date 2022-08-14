import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import store from "./store";
import { positions, transitions, Provider as AlertProvider} from "react-alert";

import { Provider } from "react-redux";
import AlertTemplate from "react-alert-template-basic";
// import { BrowserRouter, Routes, Route } from 'react-router-dom';

const options={
  timeout: 5000,
  position: positions.BOTTOM_CENTER,
  transition: transitions.SCALE,
  
};

ReactDOM.render(
  
  <Provider store={store}>
    <AlertProvider template = {AlertTemplate} {...options}>
    <App />
  </AlertProvider>
  </Provider>,

  document.getElementById("root")
);
