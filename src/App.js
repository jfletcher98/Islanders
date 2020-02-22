import React from 'react';
import logo from './logo.svg';
import './App.css';
import {button} from "bloomer"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Home } from "./Pages/home"


function App() {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
