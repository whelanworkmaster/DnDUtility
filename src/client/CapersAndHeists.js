import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link} from "react-router-dom";
import Heist from './Heist';


class CapersAndHeists extends Component{

    constructor(props) {
        super(props)
        this.state = {
            heistType : "None"
        }
    }

    handleChange(value) {
        return e => this.setState({
            [value]: e.target.value
        })
    }

    render() {
        return(
            <div>
                <Router>
                    <div>
                        <div className="Top-level">These are rules for running a heist or criminal act in a roleplaying game, 
                            so this should be used by the GM as they are planning with the players</div>
                        <div className="Heist-game">
                            <p>Players will begin by choosing four possible choices that will form the basis of the caper.
                                Then, they will prep the approach. This phase guides the players through planning, making their
                                scheme specific enough that they influence the narrative, but still leaving room for suprises.
                            </p>
                            <p>Please select a type of Caper the players will run</p>
                            <Link to="/heist" className="Header-button">Heist Mission</Link>
                            <Link to="/conJob" className="Header-button">Con Job</Link>
                        </div>
                        <Route path="/heist" component={Heist}></Route>
                    </div>
                </Router>
            </div>
        );
    }

}

export default CapersAndHeists;