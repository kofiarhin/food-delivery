import React from "react";
import { Link } from "react-router-dom";
import { defaultImage } from "../../../config";


const UserList = ({ users }) => {


    return <div className="user-unit-wrapper">

        {users.map((user) => {

            return <Link to={`user/${user.id}`} className="user-unit">

                <div className="face" style={{
                    backgroundImage: `url(${defaultImage})`
                }}></div>

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