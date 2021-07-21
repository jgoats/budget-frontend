import React from 'react'
import { Route, Redirect, withRouter } from "react-router-dom";
import Viewbudget from "../viewbudget/viewbudget.js";

function PrivateRoute({ isAuth: isAuth, component: Component, user: user, setUser: setUser, ...rest }) {
    return (
        <div>
            <Route {...rest} render={(props) => {
                if (isAuth) {
                    return (
                        <>
                            <Component user={user} token={isAuth} />
                        </>
                    );
                }
                else {
                    return <Redirect to={{ pathname: "/", state: { from: props.location } }} />
                }
            }} />
        </div>
    )
}

export default PrivateRoute;
