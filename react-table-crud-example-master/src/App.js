import React from "react";
import { Switch, Route, Link } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";
import "./App.css";

import TutorialsList from "./components/TutorialsList";

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/tutorials" className="navbar-brand">
          Genotechies
        </a>
        <div className="navbar-nav mr-auto"></div>
      </nav>

      <div className="container mt-3">
        <Switch>
          <Route exact path={["/"]} component={TutorialsList} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
