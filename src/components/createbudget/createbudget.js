import React from 'react'
import "react-router-dom";
import UserNav from "../usernav/usernav.js";
import Graph from "../graph/graph.js";
import Model from "../model/model.js";
import "./createbudget.scss";
import Bin from "../../images/bin.svg";
import axios from "axios";
import { withRouter } from 'react-router-dom';

class Createbudget extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            budgetTotal: 2000,
            envelopes: [],
            data: [],
            borders: [`rgb(0,0,0)`],
            colors: [`rgb(90,195,87)`, `rgb(87,134,175)`, `rgb(105,186,143)`,
                `rgb(227,242,21)`, `rgb(229,148,87)`, `rgb(186,105,197)`, `rgb(132,115,186)`,
                `rgb(21,152,148)`, `rgb(84,118,112)`, `rgb(191,178,129)`, `rgb(210,178,50)`,
                `rgb(31,188,110)`, `rgb(154,89,198)`, `rgb(153,146,174)`, `rgb(19,138,118)`,
                `rgb(87,175,96)`],
            modelOn: true,
            name: "",
            inputData: [],
            question: "Name for your budget?",
            requirement: "length must be greater than 2 characters",
            message: "",
            result: "",
            graph: "Pie"
        }
        this.updateTotal = this.updateTotal.bind(this);
        this.updateCost = this.updateCost.bind(this);
        this.updateInput = this.updateInput.bind(this);
        this.addEnvelope = this.addEnvelope.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.getData = this.getData.bind(this);
        this.changeToPie = this.changeToPie.bind(this);
        this.changeToDough = this.changeToDough.bind(this);
        this.submitBudget = this.submitBudget.bind(this);
        this.total = null;
        this.envelope = null;
        this.cost = null;
    }
    changeToDough() {
        this.setState({
            graph: "Dough"
        })
    }
    changeToPie() {
        this.setState({
            graph: "Pie"
        })
    }
    submitBudget(e) {
        let dataClone = [...this.state.data];
        dataClone.shift();
        e.preventDefault();
        axios({
            method: "post",
            url: "https://budget-backend426.herokuapp.com/userdata",
            headers: {
                'Content-Type': "application/json",
                "Authorization": `${"Bearer"} ${this.props.token}`
            },
            data: {
                username: this.props.user,
                budgetname: this.state.name,
                data: dataClone,
                envelopes: this.state.envelopes
            }
        }).then((result) => {
            if (result) {
                this.setState({
                    result: "Your Budget Was Successfully Created",
                })
                window.setTimeout(function () {
                    this.setState({
                        modelOn: true,
                        result: "",
                        budgetTotal: 0,
                        envelopes: [],
                        data: [],
                        name: "",
                        inputData: [],
                        question: "Name for your budget?",
                        requirement: "length must be greater than 2 characters",
                    })
                    this.props.history.push("/viewbudgets");
                }.bind(this), 3000);
            }
            else {
                this.setState({
                    result: "error, please try again"
                })
            }
        })
    }
    updateTotal(e) {
        this.total = e.target.value;
    }
    updateInput(e) {
        this.envelope = e.target.value;
    }
    updateCost(e) {
        if (!isNaN(parseInt(e.target.value))) {
            this.cost = parseInt(e.target.value);
        }
        else {
            document.getElementsByClassName("envelope-input")[1].value = "";
        }
    }
    addEnvelope() {
        if (this.envelope !== "" && !isNaN(parseInt(this.cost))) {
            if (this.state.budgetTotal - this.cost == 0) {
                this.state.data[0] = this.state.budgetTotal - this.cost;
                this.setState({
                    envelopes: [...this.state.envelopes, this.envelope],
                    data: [...this.state.data, this.cost],
                    budgetTotal: 0
                })
                this.envelope = null;
                this.cost = null;
                document.getElementsByClassName("envelope-input")[0].value = "";
                document.getElementsByClassName("envelope-input")[1].value = "";
            }
            else {
                console.log("budget is not 0 yet")
                let newBorder = 'rgb(0,0,0)';
                this.state.data[0] = this.state.budgetTotal - this.cost;
                this.setState({
                    envelopes: [...this.state.envelopes, this.envelope],
                    data: [...this.state.data, this.cost],
                    budgetTotal: this.state.budgetTotal - this.cost,
                    borders: [...this.state.borders, newBorder]
                })
                this.envelope = null;
                this.cost = null;
                document.getElementsByClassName("envelope-input")[0].value = "";
                document.getElementsByClassName("envelope-input")[1].value = "";
            }
        }
        else {
            this.setState({
                message: "please fill out both forms correctly"
            })
            this.envelope = null;
            this.cost = null;
            window.setTimeout(function () {
                this.setState({
                    message: ""
                })
            }.bind(this), 4000);
        }
    }
    handleDelete(e, index) {
        let string = e.target.parentNode.children[0].innerHTML;
        let arr = string.split(" ");
        let deletedCost = parseInt(arr[2]);
        let envelopesClone = [...this.state.envelopes];
        let dataClone = [...this.state.data];
        dataClone[0] = dataClone[0] + deletedCost;
        envelopesClone.splice(index, 1);
        dataClone.splice(index + 1, 1);
        this.setState({
            envelopes: envelopesClone,
            data: dataClone,
            budgetTotal: this.state.budgetTotal + deletedCost
        })
    }
    getData(data) {
        const [input, onOrOff] = data;
        this.state.inputData.push(input);
        const { inputData } = this.state;
        if (onOrOff == "off") {
            for (let i = 0; i < inputData.length; i++) {
                if (inputData.length == 1) {
                    this.setState({
                        name: input,
                        question: "Input a budget total",
                        requirement: "Must be a number greater than 99"
                    });
                }
                else if (inputData.length == 2) {
                    const [budgetName, budgetAmount] = this.state.inputData;
                    this.setState({
                        modelOn: false,
                        budgetTotal: budgetAmount,
                        name: budgetName,
                        data: [budgetAmount]
                    });
                }
            }

        }
    }
    render() {
        const { user, token } = this.props;
        const { envelopes, budgetTotal, data, colors, name, borders, graph } = this.state;
        if (this.state.modelOn) {
            return (
                <div>
                    <UserNav user={user} />
                    <Model question={this.state.question}
                        requirement={this.state.requirement} getData={this.getData}> </Model>
                </div>
            )
        } else {
            return (
                <div className="create-budget-main">
                    <UserNav user={user} />
                    <div className="create-budget-data-container">
                        <div className="create-budget-data">{name} : ${budgetTotal}</div>
                    </div>
                    <div className="create-budget-container">
                        <div className="form-label-container">
                            <div>
                                <label className="model-message">Add An Envelope</label>
                                <input className="envelope-input" onChange={(e) => this.updateInput(e)} type="text" />
                                <label className="model-message">Envelope Cost</label>
                                <input className="envelope-input" placeholder="$" onChange={(e) => this.updateCost(e)} type="text" />
                                <div className="model-message">{this.state.message}</div>
                                <button className="model-button" onClick={this.addEnvelope}>Add</button>
                                {
                                    budgetTotal === 0 ? <div><div onClick={(e) => this.submitBudget(e)} className="create-budget-submit">Submit Your Budget</div><div className="create-budget-result">{this.state.result}</div> </div>
                                        : <div className="create-budget-hide"></div>
                                }
                            </div>
                        </div>

                        <div className="envelopes">
                            <div className="main-label-container">
                                {
                                    envelopes.map((item, index) =>
                                        <div style={{ "backgroundColor": `${this.state.colors[index + 1]}` }} key={index} className="label-container">
                                            <p className="envelope-label">{`${item} ${"$"} ${data[index + 1]}`}</p>
                                            <img onClick={(e) => this.handleDelete(e, index)} className="label-image" src={Bin} />
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                        <div className="create-budget-graph">
                            <div className="create-budget-button-container">
                                <div onClick={this.changeToPie} className="pie-graph">Pie</div>
                                <div onClick={this.changeToDough} className="doughnut-graph">Doughnut</div>
                            </div>
                            <div className="create-graph-container"><Graph graph={graph} blackBorder={borders} backgroundColor={colors} data={data} /></div>
                        </div>
                    </div>
                </div>
            )
        }

    }

}

export default withRouter(Createbudget);

