import React from "react";
import "./login.scss";
import axios from "axios";

export default class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
            token: "",
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
                console.log("user wasnt logged in");
            }
            if (user) {
                this.setState({
                    token: user.data.token
                });
                console.log(user);
            }

        }).catch((err) => {
            console.log(err);
        })
    }
    /* getData(e) {
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
     }*/

    render() {
        console.log(this.state.token);
        return (
            <div className='login-container'>
                <div>
                    <label className="label">Username</label>
                </div>
                <div>
                    <input onChange={(e) => this.getUsername(e)} type="text" name="username" />
                </div>
                <div>
                    <label className="label">Password</label>
                </div>
                <div>
                    <input onChange={(e) => this.getPassword(e)} type="text" name="password" />
                </div>

                <div>
                    <button className="login" onClick={(e) => this.login(e)}>Login</button>
                </div>
            </div>
        )
    }
}