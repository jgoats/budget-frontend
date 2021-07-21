import React from 'react'
import { withRouter } from "react-router-dom";
import "./profile.scss";
import UserNav from "../usernav/usernav.js";


function Profile(props) {
    const { user, token } = props;
    return (
        <div>
            <UserNav user={user} />
        </div>
    )
}

export default withRouter(Profile);
