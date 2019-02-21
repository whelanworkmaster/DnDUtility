import React, { Component } from 'react';

class DiceRoller extends Component{

    constructor(props) {
        super(props)
        this.state = {
            diceRollResult : null, 
            diceType : 20,
            diceRolls : [],
            numberOfDice : 1
        }
    }
    
    roll(e) {
        e.preventDefault();
        const numberOfDice = this.state.numberOfDice
        let currentResult = 0;
        const rolls = [];
        for(let i=0; i<numberOfDice; i++) {
            const currentRoll = this.rollDie();
            rolls.push(currentRoll)
            currentResult += currentRoll;
        }
        this.setState({diceRollResult : currentResult, diceRolls : rolls});
    }

    rollDie() {
        const currentDie = this.state.diceType;
        let diceRollResult = Math.floor(Math.random() * currentDie + 1);
        return diceRollResult;
    }

    handleChange(value) {
        return e => this.setState({
            [value]: e.target.value
        })
    }

    render() {
        const dice = [20,12,10,8,6,4]
        const diceOptions = dice.map((die, idx) => {
            return(
                <option key={idx} value={die}>D{die}</option>
            )
        })
        const numDiceOptions = [];
        for(let i=1; i<11; i++) {
            numDiceOptions.push(<option key={i} value={i}>{i}</option>)
        }
        return (
            <div id="DiceRollerContainer">
                <div className="DiceRoller">
                    <div>Pick a die or dice to roll</div>
                    <form className="DiceRoller" onSubmit={(e) => this.roll(e)}>
                        <select value={this.state.diceType} onChange={this.handleChange('diceType')}>
                            {diceOptions}
                        </select>
                        <select value={this.state.numberOfDice} onChange={this.handleChange('numberOfDice')}>
                            {numDiceOptions}
                        </select>
                        <button>Enter</button>
                    </form>
                </div>
                <div className="DiceRoller">{JSON.stringify(this.state.diceRolls)}</div>
                <div className="DiceRoller">Dice Roll Result: {this.state.diceRollResult}</div>
            </div>
        );
    }
}

export default DiceRoller;