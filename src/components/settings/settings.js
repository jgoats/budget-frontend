import React from 'react'
import "./settings.scss";
import UserNav from "../usernav/usernav.js";

export default function Settings(props) {
    const { user, token } = props;
    return (
        <div>
            <UserNav user={user} />
            Hello from Settings
        </div>
    )
}
