import React, { Component } from 'react';
import './App.css';
import DiceRoller from './client/DiceRoller.js';
import SideMenu from './client/SideMenu.js';
import CapersAndHeists from './client/CapersAndHeists';
import Login from './client/Login';
import { BrowserRouter as Router, Route} from "react-router-dom";

class App extends Component {
  render() {
    return (
        <div>
          <Router>
            <div>
              <div className="App-header">D&D Utilities</div>
              <div className="Body">
                <SideMenu></SideMenu>
                <Route path="/diceRoller" component={DiceRoller}></Route>
                <Route path="/capersAndHeists" component={CapersAndHeists}></Route>
                <Route path="/login" component={Login}></Route>
              </div>
            </div>
          </Router>
        </div>
    );
  }
}

export default App;
