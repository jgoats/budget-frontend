import React from "react";
import ReactDom from "react-dom";
import "./index.scss";
import Main from "./components/main/main.js";

class BudgetApp extends React.Component {
    render() {
        return (
            <Main>

            </Main>
        )
    }
}

const container = document.getElementsByClassName("app-container")[0];
ReactDom.render(React.createElement(BudgetApp), container);