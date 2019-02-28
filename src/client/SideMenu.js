import React, { Component } from 'react';
import { Link } from "react-router-dom";

class SideMenu extends Component{

    render() {
        return(
            <div className='App-menu'>
                <Link to="/login" className="Menu-button">Login</Link>
                <Link to="/diceRoller" className="Menu-button">Dice Roller</Link>
                <Link to="/capersAndHeists" className="Menu-button">Heist Game</Link>    
            </div>
        );
    }

}

export default SideMenu;