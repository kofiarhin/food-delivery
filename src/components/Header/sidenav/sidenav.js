import React from "react";
import Sidenav from "react-simple-sidenav";
import SideNavItems from "./sideNavItems";
import "./sidenav.sass";

const Nav = props => {
  return (
    <Sidenav
      showNav={props.showNav}
      navStyle={{
        background: "#2980b9"
      }}
      onHideNav={props.onHideNav}
    >
      <SideNavItems />
    </Sidenav>
  );
};

export default Nav;
