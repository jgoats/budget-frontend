import React from "react";
import "./login.scss";
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
        axios({
            method: "post",
            url: "http://localhost:2500/login",
            headers: {
                'Content-Type': "application/json"
            },
            data: data
        }).then((user) => {
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
    getData(e) {
        e.preventDefault();
        axios({
            method: "get",
            url: "http://localhost:2500/users",
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
        console.log(this.state.token);
        return (
            <div>
                <Nav />
                <div className='login-container'>
                    <div>
                        <label className="label">Username</label>
                    </div>
                    <div>
                        <input value={this.state.username} onChange={(e) => this.getUsername(e)} type="text" name="username" />
                    </div>
                    <div>
                        <label className="label">Password</label>
                    </div>
                    <div>
                        <input value={this.state.password} onChange={(e) => this.getPassword(e)} type="text" name="password" />
                    </div>

                    <div>
                        <button className="login" onClick={(e) => this.login(e)}>Login</button>
                    </div>
                    <div className="message-container">
                        <p className="error">{this.state.error}</p>
                        <p className="userMessage">{this.state.user}</p>
                    </div>
                </div>
            </div>
        )
    }
}