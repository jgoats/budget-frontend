import React from "react";
import ReactDom from "react-dom";
import Main from "./components/main/main.js";

class App extends React.Component {
    render() {
        return (
            <Main />
        )

    }
}

const container = document.getElementsByClassName("app-container")[0];
ReactDom.render(React.createElement(App), container);