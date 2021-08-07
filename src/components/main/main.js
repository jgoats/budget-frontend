import React from "react";
import LandingPage from "../landingpage/landingpage.js";
import Registration from "../registration-view/registration-view.js";
import Login from "../login-view/login-view.js";
import { useState } from "react";
import PrivateRoute from "../utils/PrivateRoute.js"
import { Route, withRouter } from "react-router-dom";
import "react-router-dom";
import "./main.scss";
import { useEffect } from "react";
import Viewbudgets from "../viewbudgets/viewbudgets.js";
import Createbudget from "../createbudget/createbudget.js";
import Deletebudget from "../deletebudget/deletebudget.js";


function Main(props) {
    const [isAuth, setAuth] = useState(false);
    const [user, setUser] = useState(false);

    function getData(data) {
        if (data[0] !== "" && data[1] !== "") {
            setAuth(data[1]);
            setUser(data[0]);
        }
    }

    useEffect(() => {
        if (isAuth) {
            props.history.push("/viewbudgets");
        }
    }, [isAuth]);





    return (
        <>
            <Route path="/register" exact render={props => <Registration />} />
            <Route path="/login" exact render={props => <Login getData={getData} />} />
            <Route path="/" exact render={props => <LandingPage />} />
            <PrivateRoute user={user} setUser={setUser} path="/viewbudgets" render={props => <Viewbudgets />} exact component={Viewbudgets} isAuth={isAuth} />
            <PrivateRoute user={user} setUser={setUser} path="/createbudget" render={props => <Createbudget />} exact component={Createbudget} isAuth={isAuth} />
            <PrivateRoute user={user} setUser={setUser} path="/deletebudget" render={props => <Deletebudget />} exact component={Deletebudget} isAuth={isAuth} />
        </>
    )
}

export default withRouter(Main);