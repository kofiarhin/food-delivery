import React from "react";
import { defaultImage } from "../../../config";

const userProfile = ({ user }) => {

    return <div className="profile-wrapper">
        <div className="face" style={{
            backgroundImage: `url(${defaultImage})`
        }}> </div>
        <div className="content">

            <p className="name">Name: {user.name}</p>
            <p className="email">Email: {user.email}</p>
            <p className="contact">Contact: {user.contact}</p>
            <p className="location"> Address: {user.location} </p>

        </div>

    </div>
}

export default userProfile;