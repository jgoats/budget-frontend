import React from "react";
import "./main-page.scss";


export default class MainPage extends React.Component {

    render() {
        return (
            <div className="main-container">
                <nav className="nav-container">

                    <ul className="nav-items">
                        <li className="nav-item"><a>Register</a></li>
                        <li className="nav-item"><a>Sign In</a></li>
                        <li className="nav-item"><a>Contact</a></li>
                    </ul>
                </nav>
            </div>
        );
    }
}