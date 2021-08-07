import React from 'react'
import "./usernav.scss";
import { Link } from "react-router-dom";
import BarGraph from "../../images/bar-graph.svg";

export default class Usernav extends React.Component {
    constructor() {
        super();
        this.state = {
            hamburgerContent: "user-hamburger-content-container-off",
            position: 0
        }
        this.toggleUserHamburgerContainer = this.toggleUserHamburgerContainer.bind(this);
    }
    toggleUserHamburgerContainer() {
        if (this.state.position === 0) {
            this.setState({
                hamburgerContent: "user-hamburger-content-container-active",
                position: 1
            })
        }
        else if (this.state.position === 1) {
            this.setState({
                hamburgerContent: "user-hamburger-content-container-off",
                position: 0
            })
        }
    }
    render() {
        return (
            <div className="user-nav-main-container">
                <div onClick={this.toggleUserHamburgerContainer} className="user-hamburger-container">
                    <div className="user-hamburger-item"></div>
                    <div className="user-hamburger-item"></div>
                    <div className="user-hamburger-item"></div>
                    <div className="hamburger-user">{this.props.user}</div>
                </div>
                <div className={this.state.hamburgerContent}>
                    <li className="user-hamburger-content-item"><Link to="/viewbudgets">View Budgets</Link></li>
                    <li className="user-hamburger-content-item"><Link to="/createbudget">Create A Budget</Link></li>
                    <li className="user-hamburger-content-item"><Link to="/deletebudget">Delete A Budget</Link></li>
                </div>
                <ul className="user-navigation-container">
                    <li className="user-navigation-item"><Link to="/viewbudgets">View Budgets</Link></li>
                    <li className="user-navigation-item"><Link to="/createbudget">Create A Budget</Link></li>
                    <li className="user-navigation-item"><Link to="/deletebudget" >Delete A Budget</Link></li>
                    <li className="user-navigation-item"> <div>
                        <img className="logo" src={BarGraph} />
                    </div><div>{this.props.user}</div></li>
                </ul>
            </div>
        )
    }
}
