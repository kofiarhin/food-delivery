import React from "react";
import FontAwesome from "react-fontawesome";
import { Link } from "react-router-dom";

const SideNavItems = () => {
  const items = [
    {
      type: "nav-item",
      icon: "home",
      text: "Dashboard",
      link: "/user/dashboard",
      restricted: true
    },

    {
      type: "nav-item",
      icon: "home",
      text: "Register",
      link: "/register"
    },

    {
      type: "nav-item",
      icon: "user",
      text: "Profile",
      link: "/user/profile",
      restricted: true
    },

    {
      type: "nav-item",
      icon: "car",
      text: "Orders",
      link: "/user/orders",
      restricted: true
    },

    {
      type: "nav-item",
      icon: "car",
      text: "Customers",
      link: "/user/customers",
      restricted: true,
      role: "admin"
    },
    {
      type: "nav-item",
      icon: "car",
      text: "Riders",
      link: "/user/riders",
      restricted: true,
      role: "admin"
    },

    {
      type: "nav-item",
      icon: "home",
      text: "Logout",
      link: "/logout",
      restricted: true
    }
  ];

  const element = (item, i) => {
    const userId = sessionStorage.getItem("userId");

    if (item.restricted) {
      //check if user is logged in

      if (sessionStorage.getItem("userId")) {
        if (item.role) {
          const role = sessionStorage.getItem("role");

          return role === item.role ? (
            <li className={item.type}>
              {" "}
              <Link to={item.link}>
                <FontAwesome name={item.icon} /> {item.text}{" "}
              </Link>{" "}
            </li>
          ) : null;
          //check if userid matches role
        } else {
          //chec k if user is logged in

          return !userId ? (
            <li className={item.type}>
              {" "}
              <Link to={item.link}>
                <FontAwesome name={item.icon} /> {item.text}{" "}
              </Link>{" "}
            </li>
          ) : null;
        }
      }
    } else {
      return (
        <li className={item.type}>
          {" "}
          <Link to={item.link}>
            <FontAwesome name={item.icon} /> {item.text}{" "}
          </Link>{" "}
        </li>
      );
    }
  };

  const renderLinks = () => {
    return items.map((item, i) => {
      return element(item, i);
    });
  };

  return (
    <div>
      <ul className="nav-items">{renderLinks()}</ul>
    </div>
  );
};

export default SideNavItems;
