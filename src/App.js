import React, { Component } from 'react';
import './App.css';
import DiceRoller from './client/DiceRoller.js'
import Header from './client/Header.js'
import CapersAndHeists from './client/CapersAndHeists'
import { BrowserRouter as Router, Route} from "react-router-dom";

class App extends Component {
  render() {
    return (
        <div>
          <Router>
            <div>
              <Header></Header>
              <Route path="/diceRoller" component={DiceRoller}></Route>
              <Route path="/capersAndHeists" component={CapersAndHeists}></Route>
            </div>
          </Router>
        </div>
    );
  }
}

export default App;
