import React from 'react'
import UserNav from "../usernav/usernav.js";
import Graph from "../graph/graph.js";
import "./viewbudget.scss";
import Bin from "../../images/bin.svg";

export default class Viewbudget extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            budgetTotal: 0,
            envelopes: [],
            data: []
        }
        this.updateTotal = this.updateTotal.bind(this);
        this.updateCost = this.updateCost.bind(this);
        this.updateInput = this.updateInput.bind(this);
        this.addEnvelope = this.addEnvelope.bind(this);
        this.setMonthlyBudget = this.setMonthlyBudget.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
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
        this.setState({
            envelopes: [...this.state.envelopes, this.envelope],
            data: [...this.state.data, this.cost],
            budgetTotal: this.state.budgetTotal - this.cost
        })
        this.envelope = null;
        this.cost = null;
        document.getElementsByClassName("envelope-input")[1].value = "";
        document.getElementsByClassName("envelope-input")[2].value = "";
    }
    setMonthlyBudget() {
        this.setState({
            budgetTotal: this.total,
        })
        this.total = null;
        document.getElementsByClassName("envelope-input")[0].value = "";
    }
    handleDelete(e, index) {
        let string = e.target.parentNode.children[0].innerHTML;
        let arr = string.split("  ");
        let deletedCost = parseInt(arr[1].replace("$", ""));
        let envelopesClone = [...this.state.envelopes];
        let dataClone = [...this.state.data];
        envelopesClone.splice(index, 1);
        dataClone.splice(index, 1);
        this.setState({
            envelopes: envelopesClone,
            data: dataClone,
            budgetTotal: this.state.budgetTotal + deletedCost
        })
    }
    render() {
        const { user, token } = this.props;
        const { budgetTotal, envelopes, data } = this.state;
        return (
            <div>
                <UserNav user={user} />
                <div className="view-budget-container">
                    <div className="envelopes">
                        <div className="form-label-container">
                            <div>{budgetTotal}</div>
                            <label>Monthly Income</label>
                            <input className="envelope-input" type="text" onChange={(e) => this.updateTotal(e)} />
                            <button onClick={this.setMonthlyBudget}>Set Monthly Budget</button>
                            <label>Add An Envelope</label>
                            <input className="envelope-input" onChange={(e) => this.updateInput(e)} type="text" />
                            <button onClick={this.addEnvelope}>Add</button>
                            <label>Add A Price</label>
                            <input className="envelope-input" onChange={(e) => this.updateCost(e)} type="text" />
                        </div>
                        <div className="main-label-container">
                            {
                                envelopes.map((item, index) =>
                                    <div key={index} className="label-container">
                                        <p className="envelope-label">{`${item}  $${data[index]}`}</p>
                                        <img onClick={(e) => this.handleDelete(e, index)} className="label-image" src={Bin} />
                                    </div>)
                            }
                        </div>
                    </div>
                    <div className="view-budget-graph">
                        <Graph labels={envelopes} data={data} />
                    </div>
                </div>
            </div>
        )
    }
}

