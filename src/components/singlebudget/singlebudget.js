import React from "react";
import Graph from "../graph/graph.js"
import "./singlebudget.scss";
import { withRouter } from "react-router-dom";

class Singlebudget extends React.Component {
    constructor() {
        super();
        this.state = {
            colors: [`rgb(90,195,87)`, `rgb(87,134,175)`, `rgb(105,186,143)`,
                `rgb(227,242,21)`, `rgb(229,148,87)`, `rgb(186,105,197)`, `rgb(132,115,186)`,
                `rgb(21,152,148)`, `rgb(84,118,112)`, `rgb(191,178,129)`, `rgb(210,178,50)`,
                `rgb(31,188,110)`, `rgb(154,89,198)`, `rgb(153,146,174)`, `rgb(19,138,118)`,
                `rgb(87,175,96)`],
            graph: "Pie"
        }
        this.changeToPie = this.changeToPie.bind(this);
        this.changeToDough = this.changeToDough.bind(this);
        this.redirect = this.redirect.bind(this);
    }
    changeToPie() {
        this.setState({
            graph: "Pie"
        })
    }
    changeToDough() {
        this.setState({
            graph: "Dough"
        })
    }
    redirect() {
        this.props.redirect(false);
    }

    render() {
        const { name, data, envelopes, colors } = this.props;
        return (
            <div>
                <div className="single-budget-container">
                    <div className="single-budget-envelopes-container">
                        {
                            envelopes.map((item, index) =>
                                <div className="single-budget-envelope" style={{ "backgroundColor": `${colors[index]}` }} key={index}>
                                    <p className="single-budget-envelope-text">{`${item} ${"$"} ${data[index]}`}</p>
                                </div>
                            )
                        }
                    </div>
                    <div className="single-budget-graph-container">
                        <div>
                            <div onClick={this.changeToPie} className="pie-graph">Pie</div>
                            <div onClick={this.changeToDough} className="doughnut-graph">Doughnut</div>
                            <div onClick={this.redirect} className="single-budget-button">Back To Budgets</div>
                        </div>
                        <div className="single-budget-graph">
                            <Graph graph={this.state.graph} backgroundColor={colors} data={data} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Singlebudget);