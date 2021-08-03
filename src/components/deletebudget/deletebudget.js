import React from 'react'
import "./deletebudget.scss";
import UserNav from "../usernav/usernav.js";
import axios from "axios";
import Graph from "../graph/graph.js";
import Delete from "../../images/delete.svg";
import HandleDelete from "../handledelete/handledelete.js";
import { withRouter } from 'react-router-dom';

class Deletebudget extends React.Component {
    constructor() {
        super();
        this.state = {
            user: "",
            data: null,
            userData: {},
            borders: [`rgb(0,0,0)`],
            colors: [`rgb(90,195,87)`, `rgb(87,134,175)`, `rgb(105,186,143)`,
                `rgb(227,242,21)`, `rgb(229,148,87)`, `rgb(186,105,197)`, `rgb(132,115,186)`,
                `rgb(21,152,148)`, `rgb(84,118,112)`, `rgb(191,178,129)`, `rgb(210,178,50)`,
                `rgb(31,188,110)`, `rgb(154,89,198)`, `rgb(153,146,174)`, `rgb(19,138,118)`,
                `rgb(87,175,96)`],
            deleteitem: false
        }
        this.deletebudget = this.deletebudget.bind(this);
        this.deleteData = this.deleteData.bind(this);
    }
    deletebudget(e, index) {
        let budgetname = e.target.parentNode.firstChild.innerHTML;
        let username = this.props.user;
        let budgetIndex = index;
        this.setState({
            deleteitem: true,
            userData: {
                name: budgetname,
                username: username,
                index: budgetIndex
            }
        })
    }
    deleteData(result) {
        if (result) {
            this.setState({
                deleteitem: false
            })
            const { name, username, index } = this.state.userData;
            axios({
                method: "post",
                url: `http://localhost:2500/deleteuserdata`,
                headers: {
                    'Content-Type': "application/json",
                    "Authorization": `${"Bearer"} ${this.props.token}`
                },
                data: {
                    username: username,
                    budget: this.state.data,
                    index: index
                }
            }).then((result) => {
                if (result) {
                    this.props.history.push("/viewbudgets");
                    let arr = result.data.obj.budget;
                    console.log(arr);
                    this.setState({
                        data: arr,
                        deleteitem: false,
                        userData: {}
                    })
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
        else {
            this.setState({
                deleteitem: false
            })
        }
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
        });
    }
    render() {
        const { user } = this.props;
        const { data, graph, borders, colors, deleteitem, userData } = this.state;

        if (data === null) {
            return (
                <div>
                    <UserNav user={user} />
                    <div className="view-budgets-text">No Budgets Created Yet...</div>
                </div>
            )
        }
        else {
            return (
                <div>
                    {!deleteitem ? <div></div> : <HandleDelete deleteData={this.deleteData} data={userData} />}
                    <UserNav user={user} />
                    <div className="delete-budgets-container">
                        {data.map((budget, index) =>
                            <div className="delete-budget-card">
                                <div className="delete-content-container">
                                    <p className="delete-budget-name">{budget.budgetname}</p>
                                    <img key={index} onClick={(e) => this.deletebudget(e, index)} className="delete-label-image" src={Delete} />
                                </div>
                                <div className="delete-budget-graph"><Graph graph={graph} blackBorder={borders} backgroundColor={colors} data={budget.data} /></div>
                            </div>
                        )}
                    </div>
                </div>
            )
        }


    }
}

export default withRouter(Deletebudget);