import React from "react";
import Nav from "../nav/nav.js"
import LandingPage from "../landingpage/landingpage.js";
import Registration from "../registration-view/registration-view.js";
import { BrowserRouter as Router, Route } from "react-router-dom";


export default class Main extends React.Component {
    render() {
        return (
            <Router>
                <Nav />
                <Route path="/register" exact component={Registration} />
                <Route path="/" exact component={LandingPage} />
            </Router>

        )
    }
}