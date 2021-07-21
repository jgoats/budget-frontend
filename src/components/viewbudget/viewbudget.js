import React from 'react'
import UserNav from "../usernav/usernav.js";
import Graph from "../graph/graph.js";
import "./viewbudget.scss";
import { useState } from "react";
import Bin from "../../images/bin.svg";

export default function Viewbudget(props) {
    const { user, token } = props;
    const [budgetTotal, update] = useState(0);
    const [data, updateData] = useState([]);
    const [initialTotal, updateInitialTotal] = useState(0);
    let input;
    let cost;
    let total;
    const [envelopes, updateEnvelopes] = useState([]);

    function updateInput(e) {
        input = e.target.value;
    }
    function updateCost(e) {
        cost = e.target.value;
    }
    function updateTotal(e) {
        total = e.target.value;
    }
    function setMonthlyBudget() {
        update(total);
        updateInitialTotal(total);
        total = 0;
    }
    function handleDelete(e) {
        let item = e.target;
        let string = item.parentNode.firstChild.textContent;
        let arr = string.split(" ");
        let label = arr[0];
        let parent = item.parentNode;
        let total = parseInt(budgetTotal);
        update(total);
        parent.remove();
        let result = envelopes.filter(function (item) {
            if (!item.match(label)) {
                return item;
            }
        });
        updateEnvelopes(result);
    }
    function addEnvelope() {
        envelopes.push(input);
        let dataAmount = Math.floor((parseInt(cost) / parseInt(initialTotal)) * 100);
        updateData([...data, dataAmount]);
        update(budgetTotal - parseInt(cost));
        document.getElementsByClassName("envelope-input")[0].value = "";
        let currentEnvelopes = [...envelopes];
        updateEnvelopes(currentEnvelopes);
        let mainContainer = document.getElementsByClassName("main-label-container")[0];
        let container = document.createElement("div");
        container.setAttribute("class", "label-container");
        let text = document.createElement("p");
        text.setAttribute("class", "envelope-label");
        let textNode = document.createTextNode(`${envelopes[envelopes.length - 1]}  $ ${cost}`);
        document.getElementsByClassName("envelope-input")[1].value = "";
        text.append(textNode);
        let img = document.createElement("img");
        img.setAttribute("src", `${Bin}`);
        img.setAttribute("class", "label-image");
        img.addEventListener("click", (e) => { handleDelete(e) }, false);
        container.append(text, img);
        mainContainer.append(container);
    }
    return (
        <div>
            <UserNav user={user} />
            <div className="view-budget-container">
                <div className="envelopes">
                    <div className="form-label-container">
                        <div>{budgetTotal}</div>
                        <label>Monthly Income</label>
                        <input className="envelope-input" onChange={(e) => updateTotal(e)} type="text" />
                        <button onClick={setMonthlyBudget}>Set Monthly Budget</button>
                        <label>Add An Envelope</label>
                        <input className="envelope-input" onChange={(e) => updateInput(e)} type="text" />
                        <button onClick={addEnvelope}>Add</button>
                        <label>Add A Price</label>
                        <input className="envelope-input" onChange={(e) => updateCost(e)} type="text" />
                    </div>
                    <div className="main-label-container">

                    </div>
                </div>
                <div className="view-budget-graph">
                    <Graph labels={envelopes} data={data} />
                </div>
            </div>
        </div>
    )
}

