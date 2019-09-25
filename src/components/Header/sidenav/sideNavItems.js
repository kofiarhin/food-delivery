import React from "react";

const SideNavItems = () => {

    const items = [
        {
            type: "item",
            icon: "fa-user",
            text: "Profile",
            link: "/user/profile"
        },

        {
            type: "item",
            icon: "fa-user",
            text: "Orders",
            link: "/user/orders"
        },

        {
            type: "item",
            icon: "fa-user",
            text: "Profile",
            link: "/user/logout"
        }
    ]

    const renderLinks = () => {

        return items.map((item) => {

            return <p> {item.text} </p>
        })
    }

    return <div>  {renderLinks()} </div>
}

export default SideNavItems;