import React from "react";
import ReactDom from "react-dom";
import Main from "./components/main/main.js";
import { HashRouter as Router } from "react-router-dom";

class App extends React.Component {
    render() {
        return (
            <Router>
                <Main />
            </Router>
        )

    }
}

const container = document.getElementsByClassName("app-container")[0];
ReactDom.render(React.createElement(App), container);