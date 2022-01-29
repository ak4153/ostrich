import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./components/App";
import reducer, { initialState } from "./reducer";
import { StateProvider } from "./components/StateProvider";

import WithAuth from "./components/WithAuth";

ReactDOM.render(
  <React.StrictMode>
    <StateProvider reducer={reducer} initialState={initialState}>
      <BrowserRouter>
        <WithAuth />
      </BrowserRouter>
    </StateProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
