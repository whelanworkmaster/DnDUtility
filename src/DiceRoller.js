import React, { Component } from 'react';

class DiceRoller extends Component{

    constructor(props) {
        super(props)
        this.state = {diceRollResult : null}
        this.rollDice = this.rollDice.bind(this)
    }

    rollDice() {
        var selectBox = document.getElementById("DiceSelect");
        var currentDie = selectBox.options[selectBox.selectedIndex].value;
        var diceType;
        switch(currentDie) {
            case "D20":
                diceType = 20;
                break;
            case "D12":
                diceType = 12;
                break;
            case "D10":
                diceType = 10;
                break;
            case "D8":
                diceType = 8;
                break;
            case "D6":
                diceType = 6;
                break;
            case "D4":
                diceType = 4;
                break;
            default:
                diceType = 0;
                break;
        }
        var diceRollResult = Math.floor(Math.random() * diceType + 1);
        this.setState({diceRollResult: diceRollResult})
    }

    render() {
        var diceRollResultDiv;
        if(this.state.diceRollResult) {
            diceRollResultDiv = (<div>Dice Roll Result: {this.state.diceRollResult}</div>)
        }
        return (
            <div>
                <div className="DiceRoller">
                    <div>Pick a die or dice to roll</div>
                    <select id="DiceSelect">
                        <option value='D20'>D20</option>
                        <option value='D12'>D12</option>
                        <option value='D10'>D10</option>
                        <option value='D8'>D8</option>
                        <option value='D6'>D6</option>
                        <option value='D4'>D4</option>
                    </select>
                    <button onClick={this.rollDice}>Enter</button>
                </div>
                <div className="DiceRoller">{diceRollResultDiv}</div>
            </div>
        );
    }
}

export default DiceRoller;