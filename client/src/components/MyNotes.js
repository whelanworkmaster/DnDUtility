import React, { Component } from 'react';

class MyNotes extends Component {

    constructor(props) {
        super(props)
        this.state = {
            
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
            if(this.state.password !== this.state.confirmPassword) {
                this.setState({data: 'passwords must match'})
                return;
            }
            let request = {username: this.state.username, 
                password: this.state.password}
            console.log(request);
            fetch('http://localhost:5000/api/addUser', {
                method: 'post',
                body: JSON.stringify(request),
                headers: {"content-type": "application/json"}
            })
            .then(response => {
                this.setState({ data: response.status })
                console.log(response.status);
            })
            .catch(err => console.log(err));
        }
    }

    render() {
        return(
            <div className="Content">
                <div className="Center-content">
                    <div>Create User</div>
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
                        <input type="password" 
                            name="password" 
                            placeholder="Confirm Password"
                            value={this.state.confirmPassword} 
                            onChange={this.handleChange("confirmPassword")}
                        />
                        <input type="submit" value="Create User"></input>
                    </form>
                    <div>{this.state.data}</div>
                </div>
            </div>
        )
    }

}

export default MyNotes;