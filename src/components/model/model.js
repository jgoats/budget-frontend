import React from "react";
import "./model.scss";
import Cancel from "../../images/cancel.svg";
import Check from "../../images/checkmark.svg";

export default class Model extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: "",
            input: ""
        }
        this.getInput = this.getInput.bind(this);
        this.validate = this.validate.bind(this);
        this.input = null;

    }
    getInput(e) {
        this.setState({
            input: e.target.value
        });
    }
    validate() {
        if (this.state.input == null) {
            this.setState({
                message: "please enter a dollar amount"
            })
        }
    }

    render() {
        const { question, turnOff } = this.props;
        return (
            <div className="model-main-container">
                <div className="model-question">{question}</div>
                <input onChange={(e) => this.getInput(e)} type="text" />
                <div>{this.state.message}</div>
                <button onClick={this.validate}>Enter</button>
                <div className="model-btn-container">

                </div>
            </div>
        )
    }
}