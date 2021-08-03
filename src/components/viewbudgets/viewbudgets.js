import React from 'react'
import "./viewbudgets.scss";
import UserNav from "../usernav/usernav.js";
import axios from "axios";
import Graph from "../graph/graph.js";
import SingleBudget from "../singlebudget/singlebudget.js";

export default class Viewbudgets extends React.Component {
    constructor() {
        super();
        this.state = {
            user: "",
            data: null,
            singleBudgetData: {},
            graph: "Pie",
            borders: [`rgb(0,0,0)`],
            colors: [`rgb(90,195,87)`, `rgb(87,134,175)`, `rgb(105,186,143)`,
                `rgb(227,242,21)`, `rgb(229,148,87)`, `rgb(186,105,197)`, `rgb(132,115,186)`,
                `rgb(21,152,148)`, `rgb(84,118,112)`, `rgb(191,178,129)`, `rgb(210,178,50)`,
                `rgb(31,188,110)`, `rgb(154,89,198)`, `rgb(153,146,174)`, `rgb(19,138,118)`,
                `rgb(87,175,96)`],
            singleBudget: false,
        }
        this.viewbudget = this.viewbudget.bind(this);
        this.redirect = this.redirect.bind(this);
    }
    redirect(arg) {
        this.setState({
            singleBudget: false,
            singleBudgetData: {}
        })
    }
    viewbudget(e, index) {
        let name = e.target.firstChild.innerHTML;
        let data = this.state.data[index].data;
        let envelopes = this.state.data[index].envelopes;
        console.log(name, data, envelopes);
        this.setState({
            singleBudget: true,
            singleBudgetData: {
                name: name,
                data: data,
                envelopes: envelopes
            }
        })

    }
    componentDidMount() {
        this.setState({
            user: this.props.user
        })
        axios({
            method: "get",
            url: `http://localhost:2500/budgets/${this.props.user}`,
            headers: {
                'Content-Type': "application/json",
                "Authorization": `${"Bearer"} ${this.props.token}`
            },
        }).then((result) => {
            if (result) {
                let arr = result.data.obj.budget;
                if (arr.length > 0) {
                    this.setState({
                        data: arr
                    })
                }
                else {
                    this.setState({
                        data: null
                    })
                }
            }
            else {
                console.log("user not found")
            }
        }).catch((err) => {
            if (err) {
                console.log(err);
            }
        })

    }
    render() {
        const { user } = this.props;
        const { data, graph, borders, colors, singleBudget } = this.state;
        if (data === null) {
            return (
                <div>
                    <UserNav user={user} />
                    <div className="view-budgets-text">No Budgets Created Yet...</div>
                </div>
            )
        }
        else if (!singleBudget) {
            return (
                <div>
                    <UserNav user={user} />
                    <div className="view-budgets-container">
                        {data.map((budget, index) =>
                            <div key={index} onClick={(e) => this.viewbudget(e, index)} className="view-budget-card">
                                <div className="view-budget-name">{budget.budgetname}</div>
                                <div className="view-budget-graph"><Graph graph={graph} blackBorder={borders} backgroundColor={colors} data={budget.data} /></div>
                            </div>
                        )}
                    </div>
                </div>
            )
        }
        else {
            return (
                <div>
                    <UserNav user={user} />
                    <SingleBudget
                        redirect={this.redirect}
                        name={this.state.singleBudgetData.name}
                        data={this.state.singleBudgetData.data}
                        envelopes={this.state.singleBudgetData.envelopes}
                        colors={this.state.colors}
                        borders={this.state.borders}
                    />
                </div>
            )
        }

    }
}
