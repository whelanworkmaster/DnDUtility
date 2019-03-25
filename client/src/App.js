import React, { Component } from 'react';
import './css/App.css';
import DiceRoller from './components/DiceRoller.js';
import SideMenu from './components/SideMenu.js';
import CapersAndHeists from './components/CapersAndHeists';
import Login from './components/Login';
import NewUser from './components/NewUser';
import MyNotes from './components/MyNotes';
import UserLoggedIn from './components/UserLoggedIn';
import { BrowserRouter as Router, Route} from "react-router-dom";

class App extends Component {
  render() {
    return (
        <div>
          <Router>
            <div>
              <div className="App-header">D&D Utilities</div>
              <UserLoggedIn/>
              <div className="Body">
                <SideMenu></SideMenu>
                <Route path="/diceRoller" component={DiceRoller}/>
                <Route path="/capersAndHeists" component={CapersAndHeists}/>
                <Route path="/login" component={Login}/>
                <Route path="/newUser" component={NewUser}/>
                <Route path="/myNotes" component={MyNotes}/>
              </div>
            </div>
          </Router>
        </div>
    );
  }
}

export default App;
