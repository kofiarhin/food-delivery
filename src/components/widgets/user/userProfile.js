import React from "react";
import { defaultImage } from "../../../config";
import _ from "lodash";
import { Link } from "react-router-dom";



const userProfile = ({ user }) => {


    console.log(user);
    const renderCta = () => {

        const loginId = sessionStorage.getItem("loginId");

        return (loginId === user.loginId) ? <Link to="/user/changeProfile" className="btn btn-success">Change Profile </Link> : null;


    }


    const renderAvatar = () => {

        const profileData = user.profileData;

        return (!_.isEmpty(profileData)) ?
            <div className="face" style={{
                backgroundImage: `url(${profileData.fileUrl})`
            }}> </div> : <div className="face" style={{
                backgroundImage: `url(${defaultImage})`
            }}> </div>
    }
    return <div className="profile-wrapper">
        {renderAvatar()}
        <div className="content">
            <p className="name">Name: {user.name}</p>
            <p className="email">Email: {user.email}</p>
            <p className="contact">Contact: {user.contact}</p>
            <p className="location"> Address: {user.location} </p>
            <p className="role"> Role: {user.role} </p>

            {renderCta()}
        </div>

    </div>
}

export default userProfile;