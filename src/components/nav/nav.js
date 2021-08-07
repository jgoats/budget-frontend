import React from "react";
import BarGraph from "../../images/bar-graph.svg";
import { Link } from "react-router-dom";

import "./nav.scss";
export default class Nav extends React.Component {
    constructor() {
        super();
        this.state = {
            hamburgerContent: "hamburger-content-container-off",
            position: 0
        }
        this.toggleHamburger = this.toggleHamburger.bind(this);
    }
    toggleHamburger() {
        if (this.state.position === 0) {
            this.setState({
                hamburgerContent: "hamburger-content-container-active",
                position: 1
            })
        }
        else if (this.state.position == 1) {
            this.setState({
                hamburgerContent: "hamburger-content-container-off",
                position: 0
            })
        }
    }
    render() {
        return (
            <div className="nav-main-container">
                <div onClick={this.toggleHamburger} className="hamburger-container">
                    <div className="hamburger-item"></div>
                    <div className="hamburger-item"></div>
                    <div className="hamburger-item"></div>
                </div>
                <div className={this.state.hamburgerContent}>
                    <li onClick={this.toggleHamburger} className="hamburger-content-item"><Link to="/">Home</Link></li>
                    <li onClick={this.toggleHamburger} className="hamburger-content-item"><Link to="/register">Register</Link></li>
                    <li onClick={this.toggleHamburger} className="hamburger-content-item"><Link to="/login">Sign In</Link></li>
                </div>
                <nav className="nav-container">

                    <div className="logo-container">
                        <img className="logo" src={BarGraph} />
                    </div>
                    <ul className="nav-items">
                        <li className="nav-item"><Link to="/">Home</Link></li>
                        <li className="nav-item"><Link to="/register">Register</Link></li>
                        <li className="nav-item"><Link to="/login">Sign In</Link></li>
                    </ul>
                </nav>
            </div>
        )
    }
}