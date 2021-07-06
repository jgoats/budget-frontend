import React from "react";
import ReactDom from "react-dom";
import "./index.scss";

class BudgetApp extends React.Component {
    render() {
        return (
            <div>
                hello world
            </div>
        )
    }
}

const container = document.getElementsByClassName("app-container")[0];
ReactDom.render(React.createElement(BudgetApp), container);