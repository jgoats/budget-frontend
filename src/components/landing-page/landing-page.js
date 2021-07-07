import React from "react";
import "./main-page.scss";
import BarGraph from "../../images/bar-graph.svg";
import Graph from "../graph/graph.js";


export default class LandingPage extends React.Component {
    render() {
        return (
            <div className="main-container">
                <nav className="nav-container">
                    <div className="logo-container">
                        <img className="logo" src={BarGraph} />
                    </div>
                    <ul className="nav-items">
                        <li className="nav-item"><a>Register</a></li>
                        <li className="nav-item"><a>Sign In</a></li>
                        <li className="nav-item"><a>Contact</a></li>
                    </ul>
                </nav>
                <div className="content-container">
                    <div className="message">
                        <div>
                            <h3 className="heading">A simple and fast way to create a monthly budget.</h3>
                            <p className="more-information">
                                Creating a budget can be a pain for a lot of people, including myself. Wouldn't it be nice to have a
                                simple to use and free budget plan that you can use to meet your financial goals? Well now you can!
                            </p>
                        </div>
                    </div>
                    <div className="prototype-graph">
                        <Graph />
                    </div>
                </div>
            </div>
        );
    }
}