import React from "react";
import "./registration.scss";
import axios from "axios";
import Check from "../../images/checkmark.svg";
import Cancel from "../../images/cancel.svg";
import Nav from "../nav/nav.js";

export default class Registration extends React.Component {
    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
            email: "",
            error: "",
            user: "",
            usernameLength: Cancel,
            passwordLength: Cancel,
            passwordSpecialCharacter: Cancel,
            passwordCapitalLetter: Cancel
        }
        this.getUsername = this.getUsername.bind(this);
        this.getPassword = this.getPassword.bind(this);
        this.getEmail = this.getEmail.bind(this);
        this.register = this.register.bind(this);
    }
    getUsername(e) {
        let value = e.target.value;
        this.setState({
            username: value
        })
        if (value.length < 5) {
            this.setState({
                usernameLength: Cancel
            })
        }
        else {
            this.setState({
                usernameLength: Check
            })
        }
    }
    getPassword(e) {
        let value = e.target.value;
        var specialCharacter = /^(?=.*[0-9_\W]).+$/;
        var capitalCharacter = /^(?=.*[A-Z]).+$/;
        this.setState({
            password: value
        })
        if (value.length < 8) {
            this.setState({
                passwordLength: Cancel
            })
        }
        else {
            this.setState({
                passwordLength: Check
            })
        }
        if (value.match(specialCharacter)) {
            this.setState({
                passwordSpecialCharacter: Check
            })
        }
        else {
            this.setState({
                passwordSpecialCharacter: Cancel
            })
        }
        if (value.match(capitalCharacter)) {
            this.setState({
                passwordCapitalLetter: Check
            })
        }
        else {
            this.setState({
                passwordCapitalLetter: Cancel
            })
        }

    }
    getEmail(e) {
        this.setState({
            email: e.target.value
        })
    }
    register(e) {
        const { username, password, email, usernameLength,
            passwordLength, passwordCapitalLetter, passwordSpecialCharacter } = this.state;
        e.preventDefault();
        let data = {
            username: username,
            password: password,
            email: email
        }
        if (passwordLength !== Cancel && passwordCapitalLetter !== Cancel && usernameLength !== Cancel
            && passwordSpecialCharacter !== Cancel) {
            axios({
                method: "post",
                url: "https://budget-backend426.herokuapp.com/register",
                headers: {
                    'Content-Type': "application/json"
                },
                data: data
            }).then((user) => {
                if (!user) {
                    this.setState({
                        user: "error, profile wasn't created",
                        username: "",
                        password: ""
                    });
                    window.setTimeout(function () {
                        this.setState({
                            user: ""
                        })
                    }.bind(this), 5000);
                }
                if (user) {
                    if (user.data.error !== "user already exists") {
                        this.setState({
                            user: "success, profile was successfully created",
                            username: "",
                            password: ""
                        })
                        window.setTimeout(function () {
                            this.setState({
                                user: ""
                            })
                        }.bind(this), 5000)
                    } else {
                        this.setState({
                            user: "user already exists",
                            username: ""
                        })
                        window.setTimeout(function () {
                            this.setState({
                                user: ""
                            })

                        }.bind(this), 5000);
                    }


                }

            }).catch((err) => {
                if (err) {
                    console.log(err);
                    this.setState({
                        error: err
                    })
                    window.setTimeout(function () {
                        this.setState({
                            error: ""
                        })
                    }.bind(this), 5000);
                }
            })

        }
        else {
            this.setState({
                error: "please follow all requirements before submitting"
            })
            window.setTimeout(function () {
                this.setState({
                    error: ""
                })
            }.bind(this), 5000);
        }
    }

    render() {
        return (
            <div className="registration-main-container">
                <Nav />
                <div className="registration-container">
                    <div className='register-container'>
                        <div className="registration-item">
                            <label className="registration-label">Username</label><input className="registration-input" value={this.state.username} onChange={(e) => this.getUsername(e)} type="text" name="username" />
                        </div>
                        <div className="registration-item">
                            <label className="registration-label">Password</label><input className="registration-input" value={this.state.password} onChange={(e) => this.getPassword(e)} type="password" name="password" />
                        </div>

                        <div className="registration-item">
                            <button className="register" onClick={(e) => this.register(e)}>Register</button>
                        </div>
                        <div className="registration-item">
                            <p className="error">{this.state.error}</p>
                            <p className="userMessage">{this.state.user}</p>
                        </div>
                    </div>
                    <div className="validation-container">
                        <div className="center-content">
                            <div className="inline">
                                <p>Username length must be at least 5 characters long</p>
                                <img className="validation-icon" src={this.state.usernameLength} />
                            </div>
                            <div className="inline">
                                <p>Password length must be at least 8 characters long</p>
                                <img className="validation-icon" src={this.state.passwordLength} />
                            </div>
                            <div className="inline">
                                <p>Password must container a number or special character</p>
                                <img className="validation-icon" src={this.state.passwordSpecialCharacter} />
                            </div>
                            <div className="inline">
                                <p>Password must contain a capital letter</p>
                                <img className="validation-icon" src={this.state.passwordCapitalLetter} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}