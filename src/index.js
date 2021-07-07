import React from "react";
import ReactDom from "react-dom";
import "./index.scss";
import MainPage from "./components/main-page/main-page.js";

class BudgetApp extends React.Component {
    render() {
        return (
            <MainPage>

            </MainPage>
        )
    }
}

const container = document.getElementsByClassName("app-container")[0];
ReactDom.render(React.createElement(BudgetApp), container);