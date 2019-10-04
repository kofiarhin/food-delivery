import React, { Component } from "react";
import { Link } from "react-router-dom";
import Sidenav from "./sidenav/sidenav";
import "./header.sass";


import Fontawesome from "react-fontawesome";


class Header extends Component {

    state = {
        showNav: false
    }
    renderLinks = () => {

        const userId = sessionStorage.getItem('loginId');

        if (userId) {

            return <nav>

                <Link to="/restaurants"> Restaurants</Link>
                <Link to="/dashboard"> Dashboard</Link>
                <Link to="/logout"> Logout</Link>

            </nav>
        } else {

            return <nav>

                <Link to="/"> Home</Link>
                <Link to="/login"> Login</Link>
                <Link to="/register"> Register</Link>
            </nav>
        }
    }

    render() {
        return <div>

            <header className="main-header">

                <Sidenav
                    showNav={this.state.showNav}
                    onHideNav={() => this.setState({ showNav: false })}
                />

                <div className="container">

                    <Link to="/"><h1 className="logo">DziDzi</h1> </Link>

                    <Fontawesome name="bars" className="menu" onClick={() => this.setState({ showNav: true })} />

                    <nav>
                        {this.renderLinks()}
                    </nav>


                </div>
            </header>

        </div>

    }



}

export default Header;