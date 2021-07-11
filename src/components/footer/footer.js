import React from "react";
import BarGraph from "../../images/bar-graph.svg";
import { Link } from "react-router-dom";

import "./footer.scss";
export default class Footer extends React.Component {
    render() {
        return (
            <nav className="footer-container">
                <div className="logo-container">
                    <img className="logo" src={BarGraph} />
                </div>
                <ul className="nav-items">
                    <li className="nav-item"><Link to="/">Home</Link></li>
                    <li className="nav-item"><Link to="/register">Register</Link></li>
                    <li className="nav-item"><Link to="/login">Sign In</Link></li>
                    <li className="nav-item"><Link to="/contact">Contact</Link></li>
                </ul>
            </nav>
        )
    }
}