import React from "react";
import Header from "../Header/header";

const Customers = () => {


    return <div>

        <Header />

        <div className="container">
            <h1 className="main-title"> List of Customers </h1>

            <div className="user-unit-wrapper">

                <div className="user-unit">User 1</div>
                <div className="user-unit">User 2</div>
                <div className="user-unit">User 3</div>
                <div className="user-unit">User 4</div>

            </div>
        </div>

    </div>
}

export default Customers;