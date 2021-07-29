import React from 'react'
import UserNav from "../usernav/usernav.js";
import Graph from "../graph/graph.js";
import Model from "../model/model.js";
import "./viewbudget.scss";
import Bin from "../../images/bin.svg";

export default class Viewbudget extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            budgetTotal: 0,
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
            requirement: "length must be greater than 2 characters"
        }
        this.updateTotal = this.updateTotal.bind(this);
        this.updateCost = this.updateCost.bind(this);
        this.updateInput = this.updateInput.bind(this);
        this.addEnvelope = this.addEnvelope.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.getData = this.getData.bind(this);
        this.total = null;
        this.envelope = null;
        this.cost = null;
    }
    updateTotal(e) {
        this.total = e.target.value;
    }
    updateInput(e) {
        this.envelope = e.target.value;
    }
    updateCost(e) {
        this.cost = e.target.value;
    }
    addEnvelope() {
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
    handleDelete(e, index) {
        let string = e.target.parentNode.children[0].innerHTML;
        let arr = string.split("  ");
        let deletedCost = parseInt(arr[1].replace("$", ""));
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
        const { envelopes, budgetTotal, data, colors, name, borders } = this.state;
        if (this.state.modelOn) {
            return (
                <Model question={this.state.question}
                    requirement={this.state.requirement} getData={this.getData}> </Model>
            )
        } else {
            return (
                <div>
                    <UserNav user={user} />
                    <div className="view-budget-container">
                        <div className="envelopes">
                            <div className="form-label-container">
                                <div>{name}</div>
                                <div>{budgetTotal}</div>
                                <label>Add An Envelope</label>
                                <input className="envelope-input" onChange={(e) => this.updateInput(e)} type="text" />
                                <button onClick={this.addEnvelope}>Add</button>
                                <label>Add A Price</label>
                                <input className="envelope-input" onChange={(e) => this.updateCost(e)} type="text" />
                            </div>
                            <div className="main-label-container">
                                {
                                    envelopes.map((item, index) =>
                                        <div style={{ "backgroundColor": `${this.state.colors[index + 1]}` }} key={index} className="label-container">
                                            <p className="envelope-label">{`${item}  $${data[index + 1]}`}</p>
                                            <img onClick={(e) => this.handleDelete(e, index)} className="label-image" src={Bin} />
                                        </div>
                                    )

                                }
                            </div>
                        </div>
                        <div className="view-budget-graph">
                            <Graph blackBorder={borders} backgroundColor={colors} data={data} />
                        </div>
                    </div>
                </div>
            )
        }

    }

}

