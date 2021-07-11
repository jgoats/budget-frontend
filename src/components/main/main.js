import React from "react";
import Nav from "../nav/nav.js"
import LandingPage from "../landingpage/landingpage.js";
import Registration from "../registration-view/registration-view.js";
import Login from "../login-view/login-view.js";
import Footer from "../footer/footer.js";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./main.scss";


export default class Main extends React.Component {
    render() {
        return (
            <Router>
                <Nav />
                <Route path="/register" exact component={Registration} />
                <Route path="/login" exact component={Login} />
                <Route path="/" exact component={LandingPage} />
            </Router>

        )
    }
}