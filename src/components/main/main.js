import React from "react";
import LandingPage from "../landingpage/landingpage.js";
import Registration from "../registration-view/registration-view.js";
import Login from "../login-view/login-view.js";
import { useState } from "react";
import PrivateRoute from "../utils/PrivateRoute.js"
import Profile from "../profile/profile.js";
import { Route, withRouter } from "react-router-dom";
import "react-router-dom";
import "./main.scss";
import { useEffect } from "react";
import Viewbudget from "../viewbudget/viewbudget.js";
import Editbudget from "../editbudget/editbudget.js";
import Settings from "../settings/settings.js";


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
            props.history.push("/profile");
        }
    }, [isAuth]);





    return (
        <>
            <Route path="/register" exact render={props => <Registration />} />
            <Route path="/login" exact render={props => <Login getData={getData} />} />
            <Route path="/" exact render={props => <LandingPage />} />
            <Route path="/intro" exact render={props => <Profile />} />
            <Route path="/getbudget" exact render={props => <Viewbudget />} />
            <PrivateRoute user={user} setUser={setUser} path="/profile" render={props => <Profile />} exact component={Profile} isAuth={isAuth} />
            <PrivateRoute user={user} setUser={setUser} path="/viewbudget" render={props => <Viewbudget />} exact component={Viewbudget} isAuth={isAuth} />
            <PrivateRoute user={user} setUser={setUser} path="/editbudget" render={props => <Editbudget />} exact component={Editbudget} isAuth={isAuth} />
            <PrivateRoute user={user} setUser={setUser} path="/settings" render={props => <Settings />} exact component={Settings} isAuth={isAuth} />
        </>
    )
}

export default withRouter(Main);