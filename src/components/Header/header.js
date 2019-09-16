import React from "react";
import { Link } from "react-router-dom";
import "./header.sass";

import Fontawesome from "react-fontawesome";


const Header = () => {


    return <div>

        <header className="main-header">

            <div className="container">

                <Link to="/"><h1 className="logo">DziDzi</h1> </Link>


                <Fontawesome name="bars" className="menu" />

                <nav>
                    <Link to="/"> Home</Link>
                    <Link to="/login"> Login</Link>
                    <Link to="/register"> Register</Link>
                </nav>


            </div>
        </header>

    </div>
}

export default Header;