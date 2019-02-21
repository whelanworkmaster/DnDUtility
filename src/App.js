import React, { Component } from 'react';
import './App.css';
import DiceRoller from './DiceRoller.js'

class App extends Component {
  render() {
    return (
        <div>
          <div className='App-header'>Dice Roller!</div>
          <DiceRoller></DiceRoller>
        </div>
    );
  }
}

export default App;
