import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Header extends Component{

    render() {
        return(
            <div>
                <div className='App-header'>D&D Utility</div>
                <div className='App-menu'>
                    <Link to="/diceRoller" className="Header-button">Dice Roller</Link>
                    <Link to="/capersAndHeists" className="Header-button">Heist Game</Link>
                </div>
            </div>
        );
    }

}

export default Header;