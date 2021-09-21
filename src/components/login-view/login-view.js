import React from "react";
import "./login.scss";
import "../spinner/spinner.scss";
import axios from "axios";
import Nav from "../nav/nav.js";
import "react-router-dom";

export default class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
            token: "",
            user: "",
            error: "",
            spinner: false
        }
        this.getUsername = this.getUsername.bind(this);
        this.getPassword = this.getPassword.bind(this);
        this.login = this.login.bind(this);
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
    login(e) {
        const { username, password } = this.state;
        e.preventDefault();
        let data = {
            username: username,
            password: password
        }
        if (username !== "" || password !== "") {
            // start here
            document.getElementsByClassName("spinner")[0].classList.add("animateSpinner");
            this.setState({
                spinner: true
            })
            axios({
                method: "post",
                url: "https://budget-backend426.herokuapp.com/login",
                headers: {
                    'Content-Type': "application/json",
                },
                data: data
            }).then((user) => {
                //end spinner here
                document.getElementsByClassName("spinner")[0].classList.remove("animateSpinner");
                console.log(user);
                if (!user) {
                    window.setTimeout(function () {
                        this.setState({
                            user: "",
                            username: "",
                            password: ""
                        })
                    }.bind(this), 5000)
                    this.setState({
                        user: "User does not exist"
                    });
                }
                if (user) {
                    console.log(user.data.user);
                    if (user.data.user === false) {
                        this.setState({
                            user: "user does not exist",
                            username: "",
                            password: ""
                        })
                        window.setTimeout(function () {
                            this.setState({
                                user: ""
                            })
                        }.bind(this), 5000);
                    } else if (user.data.password === false) {
                        this.setState({
                            user: "password is incorrect",
                            username: "",
                            password: ""
                        })
                        window.setTimeout(function () {
                            this.setState({
                                user: ""
                            })
                        }.bind(this), 5000);
                    }
                    else {
                        window.setTimeout(function () {
                            this.setState({
                                user: "",
                            })
                        }.bind(this), 5000);
                        this.setState({
                            user: `${user.data.username} is logged in`,
                            token: user.data.token,
                            username: "",
                            password: ""
                        });
                        this.props.getData([user.data.username, user.data.token]);
                    }
                }

            }).catch((err) => {
                window.setTimeout(function () {
                    this.setState({
                        error: ""
                    })
                }.bind(this), 5000);
                console.log(err)

            })
        }
        else {
            window.setTimeout(function () {
                this.setState({
                    user: "",
                    username: "",
                    password: ""
                })
            }.bind(this), 5000)
            this.setState({
                user: "Please fill out all fields"
            });
        }
    }
    getData(e) {
        e.preventDefault();
        axios({
            method: "get",
            url: "https://budget-backend426.herokuapp.com/users",
            headers: { "Authorization": `Bearer ` + this.state.token },
        }).then((result) => {
            if (result) console.log(result);
            else {
                console.log("no result");
            }
        }).catch((err) => {
            console.log("authorization denied");
        })
    }

    render() {
        return (
            <div className="main-login-container">
                <Nav />
                <div className='login-container'>
                    <div className="login-item">
                        <label className="label">Username</label>
                    </div>
                    <div className="login-item">
                        <input className="login-input" value={this.state.username} onChange={(e) => this.getUsername(e)} type="text" name="username" />
                    </div>
                    <div className="login-item">
                        <label className="label">Password</label>
                    </div>
                    <div className="login-item">
                        <input className="login-input" value={this.state.password} onChange={(e) => this.getPassword(e)} type="password" name="password" />
                    </div>

                    <div className="login-item">
                        <button className="login" onClick={(e) => this.login(e)}>Login</button>
                        <svg className="spinner" version="1.1" xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 16 16">
                            <path fill="#444444" d="M12.9 3.1c1.3 1.2 2.1 3 2.1 4.9 0 3.9-3.1 7-7 7s-7-3.1-7-7c0-1.9 0.8-3.7 2.1-4.9l-0.8-0.8c-1.4 1.5-2.3 3.5-2.3 5.7 0 4.4 3.6 8 8 8s8-3.6 8-8c0-2.2-0.9-4.2-2.3-5.7l-0.8 0.8z"></path>
                        </svg>
                    </div>
                    <div className="login-item" className="message-container">
                        <p className="error">{this.state.error}</p>
                        <p className="userMessage">{this.state.user}</p>
                    </div>
                </div>
            </div>
        )
    }
}