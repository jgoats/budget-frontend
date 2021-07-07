import React from "react";
import "./registration.scss";
import axios from "axios";

export default class Registration extends React.Component {
    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
            email: ""
        }
        this.getUsername = this.getUsername.bind(this);
        this.getPassword = this.getPassword.bind(this);
        this.getEmail = this.getEmail.bind(this);
        this.register = this.register.bind(this);
    }
    getUsername(e) {
        this.setState({
            username: e.target.value
        })
    }
    getPassword(e) {
        this.setState({
            password: e.target.value
        })
    }
    getEmail(e) {
        this.setState({
            email: e.target.value
        })
    }
    register(e) {
        const { username, password, email } = this.state;
        e.preventDefault();
        let data = {
            username: username,
            password: password,
            email: email
        }
        axios({
            method: "post",
            url: "http://localhost:2500",
            headers: {
                'Content-Type': "application/json"
            },
            data: data
        }).then((user) => {
            if (!user) {
                comsole.log("user wasnt created")
            }
            console.log(user);
        }).catch((err) => {
            console.log(err);
        })
    }

    render() {
        return (
            <div className="form-container">
                <form>
                    <label>Username</label>
                    <input onChange={(e) => this.getUsername(e)} type="text" name="username" />
                    <label>Password</label>
                    <input onChange={(e) => this.getPassword(e)} type="text" name="password" />
                    <label>Username</label>
                    <input onChange={(e) => this.getEmail(e)} type="text" name="email" />
                </form>
                <button onClick={(e) => this.register(e)}>Register</button>
            </div>
        )
    }
}