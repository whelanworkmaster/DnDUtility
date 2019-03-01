import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link} from "react-router-dom";

class CapersAndHeists extends Component{

    constructor(props) {
        super(props)
        this.state = {
            heistType : "None"
        }
    }

    handleChange(value) {
        return e => {
            e.preventDefault();
            this.setState({
                [value]: e.target.value
            })
        }
    }

    render() {
        const heistType = this.state.heistType;
        let caperTypeText;
        switch(heistType) {
            case 'heist': caperTypeText = <p className="Heist-game">If the method is heist, you want to know where they're sneaking in and when.
                Ex: "We're hitting the wizards tower while everyone is distracted by the tournabment. A heist will involve stealth as the 
                primary skill the players will use. Try to plan skill encounters that involve stealth checks. </p>
                break;
            case 'workTheMark': caperTypeText = <p className="Heist-game">If the method is work the mark you need to know what offer they are making
                to their mark i.e. we are going to blackmail them to get what we want. </p>
                break;
            case 'conJob': caperTypeText = <p className="Heist-game">If the method is Con Job what is the method of deception? You want to broadly know
                what they are lying about but not every detail of the con. Ex: "We want her to think I am her long lost uncle". Don't need to know
                how they are deceiving, just the core con.</p>
                break;
            case 'hitJob': caperTypeText = <p className="Heist-game">If the method is hit job have them tell you the target and where they want
                the ambush to happen. Keep it loose ex: "We're hitting them at their house"; "We're attacking here when her convoy is moving".
                You just want to know what scene the players are expecting. Don't waste table time getting caught in specifics.</p>
                break;
        }
        return(
            <div className="Content">
                <div className="Heist-game">These are rules for running a heist or criminal act in a roleplaying game, 
                    so this should be used by the GM as they are planning with the players</div>
                <div className="Heist-game">
                    <p>Players will begin by choosing four possible choices that will form the basis of the caper.
                        Then, they will prep the approach. This phase guides the players through planning, making their
                        scheme specific enough that they influence the narrative, but still leaving room for suprises.
                    </p>
                    <p>Please select a type of Caper the players will run</p>
                </div>
                <form className="Heist-game">
                    <button value='heist' onClick={this.handleChange('heistType')}>Heist</button>
                    <button value='workTheMark' onClick={this.handleChange('heistType')}>Work the Mark</button>
                    <button value='conJob' onClick={this.handleChange('heistType')}>Con Job</button>
                    <button value='hitJob' onClick={this.handleChange('heistType')}>Hit Job</button>
                </form>
                <p> {caperTypeText}
                </p>
            </div>
        );
    }

}

export default CapersAndHeists;