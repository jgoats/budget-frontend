import React from 'react'
import "./usernav.scss";
import { Link } from "react-router-dom";
import BarGraph from "../../images/bar-graph.svg";

export default function Usernav(props) {
    const { user } = props;
    return (
        <ul className="user-navigation-container">
            <li className="user-navigation-item"><Link to="/viewbudgets">View Budgets</Link></li>
            <li className="user-navigation-item"><Link to="/createbudget">Create Budget</Link></li>
            <li className="user-navigation-item"><Link to="/deletebudget" >Delete A Budget</Link></li>
            <li className="user-navigation-item"> <div>
                <img className="logo" src={BarGraph} />
            </div><div><Link to="/viewbudgets">{user}</Link></div></li>
        </ul>
    )
}
