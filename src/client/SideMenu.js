import React, { Component } from 'react';
import { Link } from "react-router-dom";

class SideMenu extends Component{

    constructor(props) {
        super(props)
        this.state = {
            menuClass : "App-menu"
        }
    }

    render() {
        return(
            <div className={this.state.menuClass} onMouseOver={this.showMenu}>
                <Link to="/login" className="Menu-button">Login</Link>
                <Link to="/diceRoller" className="Menu-button">Dice Roller</Link>
                <Link to="/capersAndHeists" className="Menu-button">Heist Game</Link>    
            </div>
        );
    }

}

export default SideMenu;