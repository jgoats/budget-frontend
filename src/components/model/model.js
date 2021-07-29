import React from "react";
import "./model.scss";
import Cancel from "../../images/cancel.svg";
import Check from "../../images/checkmark.svg";

export default class Model extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: "",
            input: "",
            img: Cancel
        }
        this.getInput = this.getInput.bind(this);
        this.validateInput = this.validateInput.bind(this);

    }
    getInput(e) {
        this.setState({
            input: e.target.value
        })
        if (this.props.question == "Name for your budget?") {
            if (e.target.value.length > 2) {
                this.setState({
                    img: Check
                })
            }
            else {
                this.setState({
                    img: Cancel
                })
            }
        }
        else if (this.props.question == "Input a budget total") {
            if (!isNaN(parseInt(e.target.value))) {
                this.setState({
                    input: parseInt(e.target.value)
                })
                if (parseInt(e.target.value) > 99) {
                    this.setState({
                        img: Check
                    })
                }
                else {
                    this.setState({
                        img: Cancel
                    })
                }
            }
            else {
                this.setState({
                    input: "",

                })
            }
        }

    }
    validateInput() {
        if (this.props.question == "Name for your budget?") {
            if (this.state.img === Cancel) {
                this.setState({
                    message: "please provide a length greater than 2 characters"
                })
            }
            else {
                let value = this.state.input;
                this.setState({
                    message: "",
                    input: "",
                    img: Cancel
                })
                this.props.getData([value, "off"]);
            }
        }
        else if (this.props.question == "Input a budget total") {
            if (this.state.img === Cancel) {
                this.setState({
                    message: "please input a number larger than 0"
                })
            }
            else {
                let value = this.state.input;
                this.setState({
                    message: "",
                    input: "",
                    img: Cancel
                })
                this.props.getData([value, "off"]);
            }
        }
    }


    render() {
        const { question, turnOff } = this.props;
        return (
            <div className="model-main-container">
                <div className="model-question">{question}</div>
                <input value={this.state.input} onChange={(e) => this.getInput(e)} type="text" />
                <div className="model-message">{this.state.message}</div>
                <button className="model-button" onClick={this.validateInput}>click</button>
                <div className="model-btn-container">
                    <div className="model-validation-container">
                        <div className="model-validation-technique">
                            <p>{this.props.requirement}</p>
                            <img src={this.state.img} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}