import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userLoggedIn } from '../actions/userAction'

function mapDispatchToProps(dispatch) {
    return {
        userLoggedIn: user => dispatch(userLoggedIn(user))
    };
}

class ConnectLogin extends Component {

    constructor(props) {
        super(props)
        this.state = {
            username : "",
            password : ""
        }
    }

    handleChange(name) {
        return e => {
            e.preventDefault();
            this.setState({
                [name]: e.target.value
            })
        }
    }

    handleSubmit() {
        return e => {
            e.preventDefault();
            fetch('http://localhost:5000/api/loginUser', {
                method: 'post',
                body: JSON.stringify(this.state),
                headers: {"content-type": "application/json"}
            })
            .then(response => {
                if(response.status === 200) {
                    this.props.userLoggedIn(this.state.username);
                }
                console.log(response.status);
            })
            .catch(err => console.log(err));
        }
    }

    render() {
        return(
            <div className="Content">
                <div className="Center-content">
                    <div>Sign In</div>
                    <form className="Login-form" onSubmit={this.handleSubmit()}>
                        <input type="text" 
                            name="username" 
                            placeholder="Username"
                            value={this.state.username} 
                            onChange={this.handleChange("username")}
                        />
                        <input type="password" 
                            name="password" 
                            placeholder="Password"
                            value={this.state.password} 
                            onChange={this.handleChange("password")}
                        />
                        <input type="submit" value="Sign In"></input>
                    </form>
                    <div>{this.state.data}</div>
                </div>
            </div>
        )
    }

}

const Login = connect(null, mapDispatchToProps) (ConnectLogin);

export default Login;