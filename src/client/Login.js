import React, { Component } from 'react';

class Login extends Component {

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
                this.setState({ data: response })
            })
            .catch(err => console.log(err));
        }
    }

    render() {
        return(
            <div className="Content">
                <div className="Center-content">
                    <p>Login Here</p>
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
                        <input type="submit"></input>
                    </form>
                </div>
            </div>
        )
    }

}

export default Login;