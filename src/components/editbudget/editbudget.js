import React from 'react'
import "./editbudget.scss";
import UserNav from "../usernav/usernav.js";

export default function Editbudget(props) {
    const { user, token } = props;

    return (
        <div>
            <UserNav user={user} />
            hello from Editbudget
        </div>
    )
}
