import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {BrowserRouter as Router} from 'react-router-dom';
import { App } from "./App";
import { MyProvider } from "./provider";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <MyProvider>
      <Router>
        <App />
      </Router>
    </MyProvider>
  </React.StrictMode>
);
