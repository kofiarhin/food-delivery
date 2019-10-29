import React from "react";
import { Link } from "react-router-dom";
import { defaultImage } from "../../../config";
import _ from "lodash";


const UserList = ({ users }) => {



    const renderAvatar = (user) => {

        const profileData = user.profileData;

        return (!_.isEmpty(profileData)) ? <div className="face" style={{
            backgroundImage: `url(${profileData.fileUrl})`
        }}></div> :
            <div className="face" style={{
                backgroundImage: `url(${defaultImage})`
            }}></div>
    }
    return <div className="user-unit-wrapper">

        {users.map((user) => {

            return <Link to={`user/${user.id}`} className="user-unit">

                {renderAvatar(user)}

                <div className="content">
                    <p className="name">Name: {user.name} </p>
                    <p className="email"> Email: {user.email}</p>
                    <p className="contact"> Contact: {user.contact}</p>
                    <p className="contact"> Role: {user.role}</p>
                </div>


            </Link>
        })}

    </div>
}

export default UserList;