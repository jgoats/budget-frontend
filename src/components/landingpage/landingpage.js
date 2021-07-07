import React from "react";
import "./landingpage.scss";
import Graph from "../graph/graph.js";
export default class LandingPage extends React.Component {
    render() {
        return (
            <div className="main-container">
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