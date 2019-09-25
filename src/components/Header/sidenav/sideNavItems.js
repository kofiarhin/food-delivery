import React from "react";
import FontAwesome from "react-fontawesome";
import { Link } from "react-router-dom";

const SideNavItems = () => {

    const items = [
        {
            type: "nav-item",
            icon: "home",
            text: "Profile",
            link: "/user/profile"
        },

        {
            type: "nav-item",
            icon: "car",
            text: "Orders",
            link: "/user/orders"
        },

        {
            type: "nav-item",
            icon: "user",
            text: "Profile",
            link: "/user/logout"
        }
    ]

    const renderLinks = () => {

        return items.map((item) => {

            return <li className={item.type}>  <Link to={item.link}><FontAwesome name={item.icon} /> {item.text} </Link>   </li>
        })
    }

    return <div>

        <ul className="nav-items">

            {renderLinks()}
        </ul>

    </div>
}

export default SideNavItems;