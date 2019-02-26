import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link} from "react-router-dom";


class Heist extends Component{

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
                        <div className="Heist-game">
                            <p>A heist will involve Stealth through the caper as the primary mechanical difficulty.</p>
                            <p>First you want to know where the players will be sneaking in and when.</p>
                        </div>
                    </div>
                </Router>
            </div>
        );
    }

}

export default Heist;